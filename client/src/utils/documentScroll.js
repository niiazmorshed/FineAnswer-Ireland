/**
 * Hard reset window + document scroll. Also clears nested overflow scrollers under #root.
 * Global `scroll-behavior: smooth` breaks route changes when document height shrinks
 * (browser clamps old scrollTop → you land at the bottom of the new page).
 */
export function forceNavigateScrollTop() {
  const html = document.documentElement;
  const body = document.body;
  const prevHtml = html.style.scrollBehavior;
  const prevBody = body.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";

  const root = document.getElementById("root");
  if (root) {
    const candidates = [root, ...root.querySelectorAll("*")];
    for (const el of candidates) {
      try {
        const y = getComputedStyle(el).overflowY;
        if (y === "auto" || y === "scroll" || y === "overlay") {
          el.scrollTop = 0;
        }
      } catch {
        /* ignore */
      }
    }
  }

  window.scrollTo(0, 0);
  const se = document.scrollingElement;
  if (se) se.scrollTop = 0;
  html.scrollTop = 0;
  body.scrollTop = 0;

  html.style.scrollBehavior = prevHtml;
  body.style.scrollBehavior = prevBody;
}

/**
 * The elements that actually scroll the page.
 *
 * `index.css` sets `overflow-x: hidden` on `#root`, and per spec a hidden value
 * on one axis computes the other to `auto` — so #root is a scroll container and
 * the document itself never scrolls. That is why `window.scrollTo()` alone is a
 * no-op here.
 *
 * Small widgets (a dropdown, a carousel) are excluded by the height guard: a
 * page scroller is at least half the viewport tall.
 */
function pageScrollers() {
  const out = [];
  const se = document.scrollingElement;
  if (se) out.push(se);

  const root = document.getElementById("root");
  if (root) {
    const minHeight = window.innerHeight * 0.5;
    for (const el of [root, ...root.querySelectorAll("*")]) {
      try {
        const oy = getComputedStyle(el).overflowY;
        const scrollable = oy === "auto" || oy === "scroll" || oy === "overlay";
        if (scrollable && el.scrollHeight > el.clientHeight && el.clientHeight >= minHeight) {
          out.push(el);
        }
      } catch {
        /* ignore */
      }
    }
  }
  return out;
}

/**
 * Scroll the page back to the top, smoothly.
 *
 * Unlike forceNavigateScrollTop() — which is a hard reset for route changes —
 * this animates, so it suits an in-page action like clicking "Home" while
 * already on the landing page. Honours prefers-reduced-motion.
 */
export function smoothScrollPageTop() {
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const behavior = reduced ? "auto" : "smooth";

  window.scrollTo({ top: 0, left: 0, behavior });
  for (const el of pageScrollers()) {
    if (!el.scrollTop) continue;
    if (typeof el.scrollTo === "function") el.scrollTo({ top: 0, left: 0, behavior });
    else el.scrollTop = 0;
  }
}
