import { API_BASE_URL } from "../config/api";

/**
 * Turn stored file URLs into URLs the browser can load.
 *
 * - Already proxied (/api/upload/serve) → unchanged
 * - Direct S3 virtual-host URLs → same-origin API proxy (private buckets return 403 otherwise)
 * - Cloudinary → unchanged
 */
export function resolveMediaUrl(url) {
  if (!url || typeof url !== "string") return url;
  const u = url.trim();
  if (u.includes("/upload/serve?key=")) return u;
  if (u.startsWith("https://res.cloudinary.com/")) return u;

  try {
    const parsed = new URL(u);
    if (!parsed.hostname.includes("amazonaws.com")) return u;
    const key = parsed.pathname.replace(/^\//, "");
    if (!key || (!key.startsWith("images/") && !key.startsWith("documents/"))) {
      return u;
    }
    return `${API_BASE_URL}/upload/serve?key=${encodeURIComponent(key)}`;
  } catch {
    return u;
  }
}
