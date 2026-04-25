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
