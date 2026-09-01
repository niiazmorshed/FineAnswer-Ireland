const express = require("express");
const { ObjectId } = require("mongodb");
const { collections } = require("../config/db");
const {
  asyncHandler,
  authenticateToken,
  requireAdmin,
} = require("../middleware/auth");

const router = express.Router();

// A scholarship is a listing only — students read it and follow `link` to the
// provider. There is no application flow on this site, so no student-facing
// write routes exist here.
const FIELDS = [
  "name",
  "provider",
  "amount",
  "level",
  "deadline",
  "eligibility",
  "link",
  // Both optional, and both are S3 display URLs produced by the admin uploader
  // (`/api/upload/serve?key=images/...`) — the same path Success Stories use.
  // `image` is the card's photo header; the client falls back to bundled
  // university photography when it is unset, so a listing never renders empty.
  // `logo` is the provider's mark, shown beside the scholarship name.
  "image",
  "logo",
];

const trimmed = (value) =>
  typeof value === "string" ? value.trim() : value ?? null;

// GET /api/scholarships - List scholarships (Public)
// Newest first; the landing page shows a slice of this.
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const scholarships = await collections.scholarships
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json({ success: true, data: scholarships });
  }),
);

// GET /api/scholarships/:id - Get a single scholarship (Public)
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid scholarship ID format" });
    }
    const scholarship = await collections.scholarships.findOne({
      _id: new ObjectId(id),
    });
    if (!scholarship) {
      return res
        .status(404)
        .json({ success: false, message: "Scholarship not found" });
    }
    res.status(200).json({ success: true, data: scholarship });
  }),
);

// POST /api/scholarships - Create a scholarship (ADMIN ONLY)
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { name, provider } = req.body;
    if (!name || !name.trim() || !provider || !provider.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and provider are required",
      });
    }

    const newScholarship = {
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user._id,
    };
    FIELDS.forEach((field) => {
      newScholarship[field] = trimmed(req.body[field]);
    });

    const result = await collections.scholarships.insertOne(newScholarship);
    const saved = await collections.scholarships.findOne({
      _id: result.insertedId,
    });
    res.status(201).json({
      success: true,
      message: "Scholarship created successfully",
      data: saved,
    });
  }),
);

// PUT /api/scholarships/:id - Update a scholarship (ADMIN ONLY)
router.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid scholarship ID format" });
    }

    const updateFields = { updatedAt: new Date() };
    FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateFields[field] = trimmed(req.body[field]);
      }
    });

    if (updateFields.name === null || updateFields.name === "") {
      return res
        .status(400)
        .json({ success: false, message: "Name cannot be empty" });
    }

    const updated = await collections.scholarships.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: "after" },
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Scholarship not found" });
    }
    res.status(200).json({
      success: true,
      message: "Scholarship updated successfully",
      data: updated,
    });
  }),
);

// DELETE /api/scholarships/:id - Delete a scholarship (ADMIN ONLY)
router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid scholarship ID format" });
    }
    const deleted = await collections.scholarships.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Scholarship not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Scholarship deleted successfully" });
  }),
);

module.exports = router;
