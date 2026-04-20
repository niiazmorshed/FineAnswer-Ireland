import { useEffect, useRef, useState } from "react";
import "./Globe.css";

// ══ ORIGIN COUNTRIES ═══════════════════════════════════════════
const ORIGINS = [
  { name: "Dhaka", countryName: "Bangladesh", stat: "120+ Students", lat: 23.7, lng: 90.4, color: "#64c850", flag: "🇧🇩", code: "BD" },
  { name: "Mumbai", countryName: "India", stat: "Top origin", lat: 19.1, lng: 72.9, color: "#ff9933", flag: "🇮🇳", code: "IN" },
  { name: "Karachi", countryName: "Pakistan", stat: "98+ Students", lat: 24.9, lng: 67.0, color: "#4ade80", flag: "🇵🇰", code: "PK" },
  { name: "Dubai", countryName: "UAE", stat: "86+ Students", lat: 25.2, lng: 55.3, color: "#ffda32", flag: "🇦🇪", code: "AE" },
  { name: "Riyadh", countryName: "Saudi Arabia", stat: "45+ Students", lat: 24.7, lng: 46.7, color: "#fbbf24", flag: "🇸🇦", code: "SA" },
  { name: "Kuwait City", countryName: "Kuwait", stat: "32+ Students", lat: 29.4, lng: 47.9, color: "#38bdf8", flag: "🇰🇼", code: "KW" },
  { name: "Doha", countryName: "Qatar", stat: "28+ Students", lat: 25.3, lng: 51.5, color: "#c084fc", flag: "🇶🇦", code: "QA" },
  { name: "Manama", countryName: "Bahrain", stat: "19+ Students", lat: 26.2, lng: 50.6, color: "#fb923c", flag: "🇧🇭", code: "BH" },
  { name: "New York", countryName: "United States", stat: "41+ Students", lat: 40.7, lng: -74.0, color: "#e879f9", flag: "🇺🇸", code: "US" },
  { name: "London", countryName: "United Kingdom", stat: "67+ Students", lat: 51.5, lng: -0.12, color: "#a3cfff", flag: "🇬🇧", code: "UK" },
];

const DUBLIN = { lat: 53.33, lng: -6.25 };

/** Inter-card network edges (indices into ORIGINS) — regional + hub feel */
const NETWORK_EDGES = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [3, 6],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [8, 9],
  [9, 3],
];

// ══ HELPERS ══════════════════════════════════════════════════
function project3d(lat, lng, rotDeg, R, cx, cy) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lng + rotDeg) * Math.PI / 180;
  const x = R * Math.sin(phi) * Math.cos(theta);
  const y = R * Math.cos(phi);
  const z = R * Math.sin(phi) * Math.sin(theta);
  return { x: cx + x, y: cy - y, z, vis: z > -R * 0.05 };
}

function bezierAt(p0, cp, p1, t) {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * cp.x + t * t * p1.x,
    y: u * u * p0.y + 2 * u * t * cp.y + t * t * p1.y,
  };
}

function ctrlPt(p0, p1, cx, cy, push) {
  const mx = (p0.x + p1.x) / 2;
  const my = (p0.y + p1.y) / 2;
  const dx = mx - cx;
  const dy = my - cy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: mx + (dx / len) * push, y: my + (dy / len) * push };
}

/** Outward from globe centre + perpendicular fan by index (unsticks Gulf / South Asia clusters) */
function cardOffsetFromProjection(src, index, n, spreadR, cx, cy) {
  const dx = src.x - cx;
  const dy = src.y - cy;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const fan = (index - (n - 1) * 0.5) * (spreadR * 0.45);
  const outward = spreadR * 1.05;
  return {
    ox: ux * outward + px * fan,
    oy: uy * outward * 0.68 + py * fan * 0.52,
  };
}

/** Push overlapping card anchors apart (screen space), then clamp to canvas */
function relaxAnchorPositions(points, canvasSize, minDist, margin = 12, iterations = 12) {
  const n = points.length;
  for (let iter = 0; iter < iterations; iter++) {
    for (let a = 0; a < n; a++) {
      for (let b = a + 1; b < n; b++) {
        const dx = points[b].x - points[a].x;
        const dy = points[b].y - points[a].y;
        const dist = Math.hypot(dx, dy) || 0.001;
        if (dist >= minDist) continue;
        const push = (minDist - dist) * 0.55;
        const nx = (dx / dist) * push;
        const ny = (dy / dist) * push;
        points[a].x -= nx;
        points[a].y -= ny;
        points[b].x += nx;
        points[b].y += ny;
      }
    }
  }
  for (const p of points) {
    p.x = Math.max(margin, Math.min(canvasSize - margin, p.x));
    p.y = Math.max(margin, Math.min(canvasSize - margin, p.y));
  }
}

// ══ GLOBE + HTML CARDS OVERLAY ════════════════════════════════
export default function Globe({ size = 500 }) {
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const dublinCardRef = useRef(null);
  const rotRef = useRef(0);
  const particlesRef = useRef(
    ORIGINS.map((_, i) => ({ t: (i * 0.19) % 1, speed: 0.0016 + i * 0.00025 }))
  );
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.4;
    const cardLift = Math.max(52, size * 0.12);
    let cancelled = false;

    function draw(rot) {
      ctx.clearRect(0, 0, size, size);

      const atm = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.06);
      atm.addColorStop(0, "rgba(80,200,80,0)");
      atm.addColorStop(1, "rgba(80,200,80,.10)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.06, 0, Math.PI * 2);
      ctx.fillStyle = atm;
      ctx.fill();

      const sphr = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.28, R * 0.04, cx, cy, R);
      sphr.addColorStop(0, "rgba(60,180,70,.04)");
      sphr.addColorStop(0.6, "rgba(20,80,30,.08)");
      sphr.addColorStop(1, "rgba(5,30,12,.22)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphr;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 0.5, 0, Math.PI * 2);
      ctx.clip();

      for (let lat = -80; lat <= 80; lat += 20) {
        const phi = (90 - lat) * Math.PI / 180;
        const r2 = R * Math.sin(phi);
        const yy = cy - R * Math.cos(phi);
        ctx.beginPath();
        ctx.ellipse(cx, yy, r2, r2 * 0.22, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(80,200,80,.13)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      for (let lng = 0; lng < 180; lng += 20) {
        const a = (lng + rot) * Math.PI / 180;
        const rX = R * Math.abs(Math.cos(a));
        ctx.beginPath();
        ctx.ellipse(cx, cy, rX, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(80,200,80,.13)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(cx, cy, R, R * 0.22, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(80,200,80,.22)";
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      const borderGrd = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      borderGrd.addColorStop(0, "rgba(80,210,90,.75)");
      borderGrd.addColorStop(0.5, "rgba(80,210,90,.28)");
      borderGrd.addColorStop(1, "rgba(80,210,90,.60)");
      ctx.strokeStyle = borderGrd;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot * 0.005);
      ctx.scale(1, 0.26);
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.12, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(80,200,80,.14)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 9]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      const dub = project3d(DUBLIN.lat, DUBLIN.lng, rot, R, cx, cy);
      const projs = ORIGINS.map((o) => project3d(o.lat, o.lng, rot, R, cx, cy));
      const push = R * 0.52;
      const dashPhase = (performance.now() / 40) % 24;

      // ── Flight arcs + particles ──
      ORIGINS.forEach((orig, i) => {
        const src = projs[i];
        if (!src.vis || !dub.vis) return;
        const cp = ctrlPt(src, dub, cx, cy, push);

        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.quadraticCurveTo(cp.x, cp.y, dub.x, dub.y);
        ctx.strokeStyle = `${orig.color}28`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        const p = particlesRef.current[i];
        p.t = (p.t + p.speed) % 1;
        const TRAIL = 10;
        for (let j = TRAIL; j >= 0; j--) {
          const tt = p.t - j * 0.014;
          if (tt < 0) continue;
          const pt = bezierAt(src, cp, dub, tt);
          const alpha = ((TRAIL - j) / TRAIL) * 0.9;
          const radius = j === 0 ? 3.5 : 1.6 * (1 - j / TRAIL);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = orig.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
          if (j === 0) {
            ctx.shadowColor = orig.color;
            ctx.shadowBlur = 12;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      const tPulse = performance.now() / 1000;

      // ── Card anchors: radial fan + physics-style separation (no stacked labels) ──
      const nOrig = ORIGINS.length;
      const baseSpread = Math.max(36, Math.min(58, size * 0.078));
      const zShow = R * 0.032;

      const layout = [];
      for (let i = 0; i < nOrig; i++) {
        const src = projs[i];
        if (!src.vis || src.z < zShow) continue;
        const { ox, oy } = cardOffsetFromProjection(src, i, nOrig, baseSpread, cx, cy);
        layout.push({
          kind: "origin",
          index: i,
          srcX: src.x,
          srcY: src.y,
          x: src.x + ox,
          y: src.y - cardLift + oy,
          color: ORIGINS[i].color,
        });
      }
      if (dub.vis && dub.z > zShow) {
        const dx = dub.x - cx;
        const dy = dub.y - cy;
        const len = Math.hypot(dx, dy) || 1;
        const ux = dx / len;
        const uy = dy / len;
        const ex = baseSpread * 1.4;
        layout.push({
          kind: "dublin",
          srcX: dub.x,
          srcY: dub.y,
          x: dub.x + ux * ex,
          y: dub.y - cardLift + uy * ex * 0.72,
          color: "#facc15",
        });
      }

      const minGap = Math.max(104, size * 0.205);
      const work = layout.map((L) => ({ x: L.x, y: L.y, L }));
      relaxAnchorPositions(work, size, minGap, 14, 14);
      work.forEach((p) => {
        p.L.x = p.x;
        p.L.y = p.y;
      });

      const originAnchor = [];
      let dublinPos = null;
      for (const L of layout) {
        if (L.kind === "origin") originAnchor[L.index] = { x: L.x, y: L.y };
        else if (L.kind === "dublin") dublinPos = { x: L.x, y: L.y };
      }

      // ── Network lines (after separation) ──
      ctx.save();
      ctx.setLineDash([4, 6]);
      ctx.lineDashOffset = -dashPhase;
      for (const [ai, bi] of NETWORK_EDGES) {
        const pa = projs[ai];
        const pb = projs[bi];
        if (!pa?.vis || !pb?.vis) continue;
        if (pa.z < zShow || pb.z < zShow) continue;
        const A = originAnchor[ai];
        const B = originAnchor[bi];
        if (!A || !B) continue;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.strokeStyle = "rgba(0, 100, 65, 0.5)";
        ctx.lineWidth = 1.35;
        ctx.stroke();
      }
      ctx.restore();

      // ── Connectors: surface dot → card bottom (matches HTML anchor) ──
      layout.forEach((L) => {
        ctx.save();
        ctx.setLineDash([4, 5]);
        ctx.lineDashOffset = -dashPhase * 1.1;
        ctx.beginPath();
        ctx.moveTo(L.srcX, L.srcY);
        ctx.lineTo(L.x, L.y);
        ctx.strokeStyle = L.kind === "dublin" ? "rgba(234, 179, 8, 0.95)" : `${L.color}dd`;
        ctx.lineWidth = L.kind === "dublin" ? 1.55 : 1.42;
        ctx.stroke();
        ctx.restore();
      });

      // ── Origin nodes: pulse ring + dot ──
      ORIGINS.forEach((orig, i) => {
        const src = projs[i];
        if (!src.vis) return;

        const pulse = Math.sin(tPulse * 3.2 + i * 0.7) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(src.x, src.y, 6 + pulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `${orig.color}${Math.round((0.15 + pulse * 0.2) * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        const halo = ctx.createRadialGradient(src.x, src.y, 0, src.x, src.y, 11);
        halo.addColorStop(0, `${orig.color}45`);
        halo.addColorStop(1, `${orig.color}00`);
        ctx.beginPath();
        ctx.arc(src.x, src.y, 11, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(src.x, src.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = orig.color;
        ctx.shadowColor = orig.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ── Dublin hub dot ──
      if (dub.vis) {
        const pulse = Math.sin(tPulse * 2.5) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(dub.x, dub.y, 10 + pulse * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,218,50,${0.16 + pulse * 0.14})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const dGlow = ctx.createRadialGradient(dub.x, dub.y, 0, dub.x, dub.y, 15);
        dGlow.addColorStop(0, "rgba(255,218,50,.62)");
        dGlow.addColorStop(1, "rgba(255,218,50,0)");
        ctx.beginPath();
        ctx.arc(dub.x, dub.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = dGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dub.x, dub.y, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffda32";
        ctx.shadowColor = "#ffda32";
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── HTML cards (bottom-center at relaxed anchor) ──
      ORIGINS.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const A = originAnchor[i];
        if (A) {
          el.style.left = `${A.x}px`;
          el.style.top = `${A.y}px`;
          el.classList.add("is-visible");
        } else {
          el.classList.remove("is-visible");
        }
      });

      const dEl = dublinCardRef.current;
      if (dEl) {
        if (dublinPos) {
          dEl.style.left = `${dublinPos.x}px`;
          dEl.style.top = `${dublinPos.y}px`;
          dEl.classList.add("is-visible");
        } else {
          dEl.classList.remove("is-visible");
        }
      }
    }

    function loop() {
      if (cancelled) return;
      rotRef.current = (rotRef.current + 0.09) % 360;
      draw(rotRef.current);
      rafRef.current = requestAnimationFrame(loop);
    }

    loop();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [size]);

  return (
    <div className="globe-stack" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} className="globe-stack__canvas" />
      <div className="globe-stack__cards" aria-hidden="true">
        {ORIGINS.map((orig, i) => (
          <div
            key={orig.code}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="globe-node-card"
            style={{ transitionDelay: `${0.04 + i * 0.03}s`, zIndex: 20 + i }}
          >
            <span className="globe-node-card__flag">{orig.flag}</span>
            <div className="globe-node-card__name">{orig.countryName}</div>
            <div className="globe-node-card__stat">{orig.stat}</div>
          </div>
        ))}
        <div
          ref={dublinCardRef}
          className="globe-node-card globe-node-card--dublin"
          style={{ transitionDelay: "0.08s", zIndex: 80 }}
        >
          <span className="globe-node-card__flag">🇮🇪</span>
          <div className="globe-node-card__name">Dublin, Ireland</div>
          <div className="globe-node-card__stat">Hub · 500+ guided</div>
        </div>
      </div>
    </div>
  );
}

/** Responsive wrapper — 580px desktop / 420px tablet / 320px mobile */
export function ResponsiveGlobe() {
  const getSize = () => {
    if (typeof window === "undefined") return 580;
    const w = window.innerWidth;
    if (w >= 1024) return 580;
    if (w >= 640) return 420;
    return 320;
  };

  const [size, setSize] = useState(getSize);

  useEffect(() => {
    const update = () => setSize(getSize());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return <Globe size={size} />;
}
