/**
 * File upload utilities — AWS S3 via backend presigned URLs.
 *
 * Flow:
 *   1. Ask the backend for a presigned S3 PUT URL
 *   2. PUT the file directly to S3 from the browser (credentials never leave the server)
 *   3. Return the public S3 URL to the caller for saving in the database
 */

import { API_BASE_URL } from "../config/api";

// ── Internal helpers ──────────────────────────────────────────────────────────
// (API_BASE_URL includes /api — e.g. http://localhost:5000/api)

const getPresignedUrl = async (file, folder) => {
  const params = new URLSearchParams({
    contentType: file.type,
    filename:    file.name,
    folder,
    fileSize:    String(file.size),
  });

  const res  = await fetch(`${API_BASE_URL}/upload/presigned-url?${params}`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to get upload URL from server.");
  }
  if (!data.key) {
    throw new Error("Server did not return object key.");
  }
  return { uploadUrl: data.uploadUrl, key: data.key };
};

const putFileToS3 = async (uploadUrl, file) => {
  const res = await fetch(uploadUrl, {
    method:  "PUT",
    headers: { "Content-Type": file.type },
    body:    file,
  });
  if (!res.ok) {
    throw new Error(`S3 upload failed: ${res.status} ${res.statusText}`);
  }
};

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Upload an image to AWS S3.
 * @param   {File}    file  JPEG / PNG / WebP / GIF, max 5 MB
 * @returns {Promise<string>} public S3 URL
 */
export const uploadImageToS3 = async (file) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    throw new Error(`Unsupported image type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF.`);
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image is too large. Maximum size is 5 MB.");
  }
  try {
    const { uploadUrl, key } = await getPresignedUrl(file, "images");
    await putFileToS3(uploadUrl, file);
    return `${API_BASE_URL}/upload/serve?key=${encodeURIComponent(key)}`;
  } catch (err) {
    console.error("[S3] Image upload error:", err);
    throw err.message ? err : new Error("Failed to upload image. Please try again.");
  }
};

/**
 * Upload a PDF document to AWS S3.
 * @param   {File}    file  PDF only, max 20 MB
 * @returns {Promise<string>} public S3 URL
 */
export const uploadDocumentToS3 = async (file) => {
  if (file.type !== "application/pdf") {
    throw new Error(`Unsupported document type: ${file.type}. Only PDF is allowed.`);
  }
  if (file.size > 20 * 1024 * 1024) {
    throw new Error("Document is too large. Maximum size is 20 MB.");
  }
  try {
    const { uploadUrl, key } = await getPresignedUrl(file, "documents");
    await putFileToS3(uploadUrl, file);
    return `${API_BASE_URL}/upload/serve?key=${encodeURIComponent(key)}`;
  } catch (err) {
    console.error("[S3] Document upload error:", err);
    throw err.message ? err : new Error("Failed to upload document. Please try again.");
  }
};
