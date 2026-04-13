const express = require("express");
const Stripe = require("stripe");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const { collections } = require("../config/db");
const { asyncHandler, JWT_SECRET } = require("../middleware/auth");

const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// ── Helper: extract authenticated user ID from optional Bearer token ──────────
const getUserIdFromToken = async (authHeader) => {
  if (!authHeader?.startsWith("Bearer ") || !collections.users) return null;
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await collections.users.findOne({
      _id: new ObjectId(decoded.userId),
    });
    return user ? user._id.toString() : null;
  } catch {
    return null;
  }
};

// ── Generate a unique transaction ID ─────────────────────────────────────────
const makeTranId = () =>
  "TXN" + Date.now() + Math.random().toString(36).slice(2, 8).toUpperCase();

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/create-payment
// Creates a Stripe Checkout Session and saves a pending record to paymentCollection
// amount must be in the smallest currency unit (cents for EUR)
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  "/create-payment",
  asyncHandler(async (req, res) => {
    const {
      amount,
      currency = "EUR",
      cus_name,
      cus_email,
      purpose,
      userId,
    } = req.body;

    // Stripe minimum is 50 cents
    if (!amount || Number(amount) < 50) {
      return res.status(400).json({
        success: false,
        message: "Amount is required (minimum €0.50)",
      });
    }

    const paidByUserId =
      (await getUserIdFromToken(req.headers["authorization"])) ||
      userId ||
      null;

    const name = cus_name || "Customer";
    const email = cus_email || undefined;
    const purposeLabel = purpose || "Study Abroad Application Fee";
    const tranId = makeTranId();
    const cur = String(currency).toLowerCase();

    // Create Stripe Checkout Session (hosted payment page)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: cur,
            product_data: {
              name: purposeLabel,
              description: `FineAnswer Ireland — ${purposeLabel}`,
            },
            unit_amount: Number(amount), // already in smallest unit (cents)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `${FRONTEND_URL.replace(/\/$/, "")}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL.replace(/\/$/, "")}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        tranId,
        userId: paidByUserId || "",
        purpose: purposeLabel,
        cus_name: name,
      },
    });

    // Persist pending payment record
    const paymentDoc = {
      paymentId: tranId,
      stripeSessionId: session.id,
      amount: Number(amount),
      currency: String(currency).toUpperCase(),
      status: "pending",
      cus_name: name,
      cus_email: email || null,
      userId: paidByUserId,
      purpose: purposeLabel,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (collections.payment) {
      await collections.payment.insertOne(paymentDoc);
    }

    return res.json({ success: true, url: session.url });
  }),
);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/payment/verify?session_id=...
// Called by PaymentSuccess page — verifies the Checkout Session with Stripe,
// updates paymentCollection status, and returns payment details to the frontend
// ─────────────────────────────────────────────────────────────────────────────
router.get(
  "/payment/verify",
  asyncHandler(async (req, res) => {
    const { session_id } = req.query;
    if (!session_id) {
      return res
        .status(400)
        .json({ success: false, message: "session_id is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      if (collections.payment) {
        await collections.payment.updateOne(
          { stripeSessionId: session_id },
          {
            $set: {
              status: "success",
              stripePaymentIntent: session.payment_intent,
              updatedAt: new Date(),
            },
          },
        );
      }

      return res.json({
        success: true,
        paymentStatus: "paid",
        amount: session.amount_total,
        currency: session.currency?.toUpperCase(),
        customerEmail: session.customer_email,
        purpose: session.metadata?.purpose,
        cus_name: session.metadata?.cus_name,
        paymentIntent: session.payment_intent,
      });
    }

    return res.json({
      success: false,
      paymentStatus: session.payment_status,
      message: "Payment is not yet confirmed.",
    });
  }),
);

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/payment/update-status
// Called by PaymentCancel page to mark a session as cancelled in the DB
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  "/payment/update-status",
  asyncHandler(async (req, res) => {
    const { session_id, status } = req.body;
    const allowed = ["cancelled", "failed"];
    if (!session_id || !allowed.includes(status)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "session_id and valid status required",
        });
    }
    if (collections.payment) {
      await collections.payment.updateOne(
        { stripeSessionId: session_id },
        { $set: { status, updatedAt: new Date() } },
      );
    }
    return res.json({ success: true });
  }),
);

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/stripe/webhook
// Handles Stripe webhook events — reliable async confirmation
// Requires STRIPE_WEBHOOK_SECRET in .env for signature verification.
// NOTE: This route must receive the raw body — make sure to mount this router
//       BEFORE express.json() in index.js, or use express.raw() per-route.
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = webhookSecret
        ? stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
        : JSON.parse(req.body.toString());
    } catch (err) {
      console.error("[Stripe Webhook] Signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      if (collections.payment) {
        collections.payment
          .updateOne(
            { stripeSessionId: session.id },
            {
              $set: {
                status: "success",
                stripePaymentIntent: session.payment_intent,
                updatedAt: new Date(),
              },
            },
          )
          .catch((e) => console.error("[Stripe Webhook] DB update error:", e));
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      if (collections.payment) {
        collections.payment
          .updateOne(
            { stripeSessionId: session.id },
            { $set: { status: "expired", updatedAt: new Date() } },
          )
          .catch(console.error);
      }
    }

    res.json({ received: true });
  },
);

module.exports = router;
