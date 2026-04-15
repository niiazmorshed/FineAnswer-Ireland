const express = require("express");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3Client, S3_BUCKET } = require("../config/s3");
const { asyncHandler } = require("../middleware/auth");

const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/upload/serve?key=images/...  or  documents/...
// Streams the object from S3 using server credentials (works when objects are
// private — browser <img> cannot use presigned GET without expiring URLs).
// ─────────────────────────────────────────────────────────────────────────────
router.get(
  "/serve",
  asyncHandler(async (req, res) => {
    const rawKey = req.query.key;
    if (!rawKey || typeof rawKey !== "string") {
      return res.status(400).send("key is required");
    }
    const key = decodeURIComponent(rawKey.trim());
    if (!key.startsWith("images/") && !key.startsWith("documents/")) {
      return res.status(400).send("Invalid key");
    }
    if (key.includes("..") || key.includes("//")) {
      return res.status(400).send("Invalid key");
    }
    if (!S3_BUCKET) {
      return res.status(500).send("S3 not configured");
    }

    const out = await s3Client.send(
      new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }),
    );

    const ct = out.ContentType || "application/octet-stream";
    res.setHeader("Content-Type", ct);
    res.setHeader("Cache-Control", "public, max-age=86400");

    const body = out.Body;
    if (body && typeof body.pipe === "function") {
      body.pipe(res);
      return;
    }
    if (body?.transformToByteArray) {
      const arr = await body.transformToByteArray();
      return res.send(Buffer.from(arr));
    }
    return res.status(502).send("Unable to read object body");
  }),
);

// Allowed MIME types — prevent arbitrary file uploads
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_DOC_TYPES   = ["application/pdf"];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOC_TYPES];

// Max sizes
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;  // 5 MB
const MAX_DOC_BYTES   = 20 * 1024 * 1024; // 20 MB

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/upload/presigned-url
// Query params:
//   contentType  — MIME type  (required)
//   filename     — original filename (required, used to derive extension)
//   folder       — "images" | "documents" (default: "images")
//   fileSize     — bytes (optional, used for size validation)
// Returns: { uploadUrl, fileUrl }
// ─────────────────────────────────────────────────────────────────────────────
router.get(
  "/presigned-url",
  asyncHandler(async (req, res) => {
    const { contentType, filename, folder = "images", fileSize } = req.query;

    // ── Validate ──────────────────────────────────────────────────────────────
    if (!contentType || !filename) {
      return res.status(400).json({
        success: false,
        message: "contentType and filename are required",
      });
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return res.status(400).json({
        success: false,
        message: `File type not allowed. Allowed: ${ALLOWED_TYPES.join(", ")}`,
      });
    }

    const isDoc = ALLOWED_DOC_TYPES.includes(contentType);
    const maxBytes = isDoc ? MAX_DOC_BYTES : MAX_IMAGE_BYTES;

    if (fileSize && Number(fileSize) > maxBytes) {
      return res.status(400).json({
        success: false,
        message: `File too large. Max ${maxBytes / (1024 * 1024)} MB for this file type.`,
      });
    }

    if (!S3_BUCKET) {
      return res.status(500).json({
        success: false,
        message: "S3 bucket is not configured on the server (AWS_BUCKET_NAME missing in server/.env).",
      });
    }

    // ── Build S3 key ──────────────────────────────────────────────────────────
    const ext = filename.split(".").pop()?.toLowerCase() || "bin";
    const safeName = filename
      .replace(/\.[^.]+$/, "")                 // strip extension
      .replace(/[^a-zA-Z0-9_-]/g, "_")        // sanitise
      .slice(0, 60);
    const timestamp = Date.now();
    const key = `${folder}/${timestamp}_${safeName}.${ext}`;

    // ── Generate presigned PUT URL (valid for 5 minutes) ──────────────────────
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

    // Client builds display URL: `${API_BASE_URL}/upload/serve?key=...` so it always
    // matches the API host (local vs prod). Direct S3 URLs often 403 for private objects.
    return res.json({ success: true, uploadUrl, key });
  }),
);

module.exports = router;
