import { useRef, useEffect, useState } from "react";

// ══ ORIGIN COUNTRIES (flag, code, color, lat/lng) ════════════
const ORIGINS = [
  { name: "Dhaka",        lat: 23.7,  lng: 90.4,  color: "#64c850", flag: "🇧🇩", code: "BD" },
  { name: "Mumbai",       lat: 19.1,  lng: 72.9,  color: "#ff9933", flag: "🇮🇳", code: "IN" },
  { name: "Karachi",      lat: 24.9,  lng: 67.0,  color: "#4ade80", flag: "🇵🇰", code: "PK" },
  { name: "Dubai",        lat: 25.2,  lng: 55.3,  color: "#ffda32", flag: "🇦🇪", code: "AE" },
  { name: "Riyadh",       lat: 24.7,  lng: 46.7,  color: "#fbbf24", flag: "🇸🇦", code: "SA" },
  { name: "Kuwait City",  lat: 29.4,  lng: 47.9,  color: "#38bdf8", flag: "🇰🇼", code: "KW" },
  { name: "Doha",         lat: 25.3,  lng: 51.5,  color: "#c084fc", flag: "🇶🇦", code: "QA" },
  { name: "Manama",       lat: 26.2,  lng: 50.6,  color: "#fb923c", flag: "🇧🇭", code: "BH" },
  { name: "New York",     lat: 40.7,  lng: -74.0, color: "#e879f9", flag: "🇺🇸", code: "US" },
  { name: "London",       lat: 51.5,  lng: -0.12, color: "#a3cfff", flag: "🇬🇧", code: "UK" },
];

const DUBLIN = { lat: 53.33, lng: -6.25 };

// ══ HELPERS ══════════════════════════════════════════════════
function project3d(lat, lng, rotDeg, R, cx, cy) {
  const phi   = (90 - lat) * Math.PI / 180;
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
  const dx = mx - cx, dy = my - cy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: mx + (dx / len) * push, y: my + (dy / len) * push };
}

/** Manual rounded-rect path (ctx.roundRect has limited browser support) */
function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/** Draw a flag-chip label near an origin city dot. */
function drawChip(ctx, dotX, dotY, flag, code, color, globeCx, canvasSize) {
  const label = `${flag} ${code}`;
  ctx.save();
  ctx.font = `bold ${Math.max(9, canvasSize * 0.022)}px Mulish,sans-serif`;
  const tw = ctx.measureText(label).width;
  const pad = 7;
  const cw = tw + pad * 2;
  const ch = Math.max(20, canvasSize * 0.044);

  // Position chip to the outer side of the globe
  const facingRight = dotX > globeCx;
  const chipX = facingRight ? dotX + 10 : dotX - cw - 10;
  const chipY = dotY - ch / 2 - 4;

  // Clamp within canvas
  const clampedX = Math.max(2, Math.min(canvasSize - cw - 2, chipX));
  const clampedY = Math.max(2, Math.min(canvasSize - ch - 2, chipY));

  // Connector line
  ctx.beginPath();
  ctx.moveTo(dotX, dotY);
  ctx.lineTo(clampedX + (facingRight ? 0 : cw), clampedY + ch / 2);
  ctx.strokeStyle = `${color}55`;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Chip background
  roundRectPath(ctx, clampedX, clampedY, cw, ch, 5);
  ctx.fillStyle = "rgba(4,18,8,0.78)";
  ctx.fill();
  ctx.strokeStyle = `${color}99`;
  ctx.lineWidth = 0.9;
  ctx.stroke();

  // Label
  ctx.fillStyle = "#f0fdf4";
  ctx.fillText(label, clampedX + pad, clampedY + ch * 0.68);
  ctx.restore();
}

// ══ GLOBE CANVAS COMPONENT ═══════════════════════════════════
export default function Globe({ size = 500 }) {
  const canvasRef    = useRef(null);
  const rotRef       = useRef(0);
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
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2, R = size * 0.4;
    let cancelled = false;

    function draw(rot) {
      ctx.clearRect(0, 0, size, size);

      // ── Atmosphere glow (tight inner rim only, no white blob) ──
      const atm = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.06);
      atm.addColorStop(0, "rgba(80,200,80,0)");
      atm.addColorStop(1, "rgba(80,200,80,.10)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.06, 0, Math.PI * 2);
      ctx.fillStyle = atm;
      ctx.fill();

      // ── Glass sphere — nearly transparent, slight green tint ──
      const sphr = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.28, R * 0.04, cx, cy, R);
      sphr.addColorStop(0,   "rgba(60,180,70,.04)");
      sphr.addColorStop(0.6, "rgba(20,80,30,.08)");
      sphr.addColorStop(1,   "rgba(5,30,12,.22)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphr;
      ctx.fill();

      // ── Wireframe (clipped to sphere) ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 0.5, 0, Math.PI * 2);
      ctx.clip();

      for (let lat = -80; lat <= 80; lat += 20) {
        const phi = (90 - lat) * Math.PI / 180;
        const r2  = R * Math.sin(phi);
        const yy  = cy - R * Math.cos(phi);
        ctx.beginPath();
        ctx.ellipse(cx, yy, r2, r2 * 0.22, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(80,200,80,.13)";
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }
      for (let lng = 0; lng < 180; lng += 20) {
        const a  = (lng + rot) * Math.PI / 180;
        const rX = R * Math.abs(Math.cos(a));
        ctx.beginPath();
        ctx.ellipse(cx, cy, rX, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(80,200,80,.13)";
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }
      // Equator highlight
      ctx.beginPath();
      ctx.ellipse(cx, cy, R, R * 0.22, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(80,200,80,.22)";
      ctx.lineWidth   = 1.1;
      ctx.stroke();
      ctx.restore();

      // ── Globe border — crisp green ring ──
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      const borderGrd = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      borderGrd.addColorStop(0,   "rgba(80,210,90,.75)");
      borderGrd.addColorStop(0.5, "rgba(80,210,90,.28)");
      borderGrd.addColorStop(1,   "rgba(80,210,90,.60)");
      ctx.strokeStyle = borderGrd;
      ctx.lineWidth   = 2;
      ctx.stroke();

      // ── Orbit ring (decorative) ──
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot * 0.005);
      ctx.scale(1, 0.26);
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.12, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(80,200,80,.14)";
      ctx.lineWidth   = 1;
      ctx.setLineDash([3, 9]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // ── Dublin destination dot ──
      const dub  = project3d(DUBLIN.lat, DUBLIN.lng, rot, R, cx, cy);
      const push = R * 0.52;

      // ── Flight arcs + particles ──
      ORIGINS.forEach((orig, i) => {
        const src = project3d(orig.lat, orig.lng, rot, R, cx, cy);
        if (!src.vis || !dub.vis) return;
        const cp = ctrlPt(src, dub, cx, cy, push);

        // Dashed arc
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.quadraticCurveTo(cp.x, cp.y, dub.x, dub.y);
        ctx.strokeStyle = `${orig.color}28`;
        ctx.lineWidth   = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Moving particle trail
        const p = particlesRef.current[i];
        p.t = (p.t + p.speed) % 1;
        const TRAIL = 10;
        for (let j = TRAIL; j >= 0; j--) {
          const tt = p.t - j * 0.014;
          if (tt < 0) continue;
          const pt     = bezierAt(src, cp, dub, tt);
          const alpha  = ((TRAIL - j) / TRAIL) * 0.9;
          const radius = j === 0 ? 3.5 : 1.6 * (1 - j / TRAIL);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = orig.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
          if (j === 0) { ctx.shadowColor = orig.color; ctx.shadowBlur = 12; }
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Origin city: halo + dot
        const halo = ctx.createRadialGradient(src.x, src.y, 0, src.x, src.y, 10);
        halo.addColorStop(0, `${orig.color}40`);
        halo.addColorStop(1, `${orig.color}00`);
        ctx.beginPath();
        ctx.arc(src.x, src.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(src.x, src.y, 4, 0, Math.PI * 2);
        ctx.fillStyle   = orig.color;
        ctx.shadowColor = orig.color;
        ctx.shadowBlur  = 10;
        ctx.fill();
        ctx.shadowBlur  = 0;

        // Flag chip — only when city is clearly facing the viewer
        if (src.z > R * 0.22) {
          drawChip(ctx, src.x, src.y, orig.flag, orig.code, orig.color, cx, size);
        }
      });

      // ── Dublin dot (gold, pulsing) ──
      if (dub.vis) {
        const t     = Date.now() / 1000;
        const pulse = Math.sin(t * 2.5) * 0.5 + 0.5;

        ctx.beginPath();
        ctx.arc(dub.x, dub.y, 9 + pulse * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,218,50,${0.14 + pulse * 0.12})`;
        ctx.lineWidth   = 1.4;
        ctx.stroke();

        const dGlow = ctx.createRadialGradient(dub.x, dub.y, 0, dub.x, dub.y, 14);
        dGlow.addColorStop(0, "rgba(255,218,50,.60)");
        dGlow.addColorStop(1, "rgba(255,218,50,0)");
        ctx.beginPath();
        ctx.arc(dub.x, dub.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = dGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dub.x, dub.y, 5.5, 0, Math.PI * 2);
        ctx.fillStyle   = "#ffda32";
        ctx.shadowColor = "#ffda32";
        ctx.shadowBlur  = 16;
        ctx.fill();
        ctx.shadowBlur  = 0;

        // Dublin chip
        ctx.save();
        ctx.font = `bold ${Math.max(9, size * 0.02)}px Mulish,sans-serif`;
        const dlabel = "● Dublin";
        const dtw = ctx.measureText(dlabel).width;
        const dpad = 8, dcw = dtw + dpad * 2, dch = Math.max(20, size * 0.044);
        const dx = dub.x + 12, dy = dub.y - dch / 2;
        roundRectPath(ctx, dx, dy, dcw, dch, 5);
        ctx.fillStyle   = "rgba(60,40,0,0.82)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,218,50,0.8)";
        ctx.lineWidth   = 1;
        ctx.stroke();
        ctx.fillStyle = "#ffda32";
        ctx.fillText(dlabel, dx + dpad, dy + dch * 0.68);
        ctx.restore();
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

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}

/** Responsive wrapper — 580px desktop / 420px tablet / 320px mobile */
export function ResponsiveGlobe() {
  const getSize = () => {
    if (typeof window === "undefined") return 580;
    const w = window.innerWidth;
    if (w >= 1024) return 580;
    if (w >= 640)  return 420;
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
