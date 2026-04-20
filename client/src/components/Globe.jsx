import { useRef, useEffect, useState } from "react";

// ══ GLOBE DATA ═══════════════════════════════════════════════
const ORIGINS = [
  { name: "Dhaka",   country: "BD", lat: 23.7,  lng: 90.4,  color: "#64c850", label: "BD" },
  { name: "Mumbai",  country: "IN", lat: 19.1,  lng: 72.9,  color: "#ff9933", label: "IN" },
  { name: "Karachi", country: "PK", lat: 24.9,  lng: 67.0,  color: "#4ade80", label: "PK" },
  { name: "Dubai",   country: "AE", lat: 25.2,  lng: 55.3,  color: "#ffda32", label: "AE" },
  { name: "London",  country: "UK", lat: 51.5,  lng: -0.12, color: "#a3cfff", label: "UK" },
];

const DUBLIN = { name: "Dublin", lat: 53.33, lng: -6.25 };

// ══ HELPER FUNCTIONS ═════════════════════════════════════════
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
  const dx = mx - cx;
  const dy = my - cy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: mx + (dx / len) * push, y: my + (dy / len) * push };
}

// ══ GLOBE CANVAS ══════════════════════════════════════════
export default function Globe({ size = 430 }) {
  const canvasRef    = useRef(null);
  const rotRef       = useRef(0);
  const particlesRef = useRef(
    ORIGINS.map((_, i) => ({ t: (i * 0.19) % 1, speed: 0.0018 + i * 0.0003 }))
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

    const cx = size / 2;
    const cy = size / 2;
    const R  = size * 0.4;
    let cancelled = false;

    function draw(rot) {
      ctx.clearRect(0, 0, size, size);

      // Outer atmosphere glow
      const atm = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.35);
      atm.addColorStop(0,   "rgba(100,200,80,0)");
      atm.addColorStop(0.7, "rgba(100,200,80,.04)");
      atm.addColorStop(1,   "rgba(100,200,80,.09)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = atm;
      ctx.fill();

      // Globe sphere
      const sphr = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.3, R * 0.05, cx, cy, R);
      sphr.addColorStop(0, "rgba(20,42,23,.85)");
      sphr.addColorStop(1, "rgba(5,13,7,.95)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphr;
      ctx.fill();

      // Wireframe (clipped to sphere)
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
        ctx.strokeStyle = "rgba(100,200,80,.07)";
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      }

      for (let lng = 0; lng < 180; lng += 20) {
        const a  = (lng + rot) * Math.PI / 180;
        const rX = R * Math.abs(Math.cos(a));
        ctx.beginPath();
        ctx.ellipse(cx, cy, rX, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(100,200,80,.07)";
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.ellipse(cx, cy, R, R * 0.22, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(100,200,80,.14)";
      ctx.lineWidth   = 1;
      ctx.stroke();
      ctx.restore();

      // Globe border
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      const borderGrd = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      borderGrd.addColorStop(0,   "rgba(100,200,80,.35)");
      borderGrd.addColorStop(0.5, "rgba(100,200,80,.12)");
      borderGrd.addColorStop(1,   "rgba(100,200,80,.28)");
      ctx.strokeStyle = borderGrd;
      ctx.lineWidth   = 1.2;
      ctx.stroke();

      const dub  = project3d(DUBLIN.lat, DUBLIN.lng, rot, R, cx, cy);
      const push = R * 0.52;

      ORIGINS.forEach((orig, i) => {
        const src = project3d(orig.lat, orig.lng, rot, R, cx, cy);
        if (!src.vis || !dub.vis) return;

        const cp = ctrlPt(src, dub, cx, cy, push);

        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.quadraticCurveTo(cp.x, cp.y, dub.x, dub.y);
        ctx.strokeStyle = `${orig.color}28`;
        ctx.lineWidth   = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        const p = particlesRef.current[i];
        p.t = (p.t + p.speed) % 1;
        const TRAIL = 10;
        for (let j = TRAIL; j >= 0; j--) {
          const tt = p.t - j * 0.014;
          if (tt < 0) continue;
          const pt     = bezierAt(src, cp, dub, tt);
          const alpha  = ((TRAIL - j) / TRAIL) * 0.85;
          const radius = j === 0 ? 3.2 : 1.5 * (1 - j / TRAIL);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = orig.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
          if (j === 0) { ctx.shadowColor = orig.color; ctx.shadowBlur = 10; }
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        if (src.vis) {
          const halo = ctx.createRadialGradient(src.x, src.y, 0, src.x, src.y, 9);
          halo.addColorStop(0, `${orig.color}44`);
          halo.addColorStop(1, `${orig.color}00`);
          ctx.beginPath();
          ctx.arc(src.x, src.y, 9, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(src.x, src.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle   = orig.color;
          ctx.shadowColor = orig.color;
          ctx.shadowBlur  = 8;
          ctx.fill();
          ctx.shadowBlur  = 0;

          ctx.font      = "bold 8px Mulish,sans-serif";
          ctx.fillStyle = `${orig.color}cc`;
          ctx.fillText(orig.label, src.x + 6, src.y - 4);
        }
      });

      if (dub.vis) {
        const t     = Date.now() / 1000;
        const pulse = Math.sin(t * 2.5) * 0.5 + 0.5;

        ctx.beginPath();
        ctx.arc(dub.x, dub.y, 8 + pulse * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,218,50,${0.12 + pulse * 0.1})`;
        ctx.lineWidth   = 1.2;
        ctx.stroke();

        const dGlow = ctx.createRadialGradient(dub.x, dub.y, 0, dub.x, dub.y, 12);
        dGlow.addColorStop(0, "rgba(255,218,50,.55)");
        dGlow.addColorStop(1, "rgba(255,218,50,0)");
        ctx.beginPath();
        ctx.arc(dub.x, dub.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = dGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dub.x, dub.y, 5, 0, Math.PI * 2);
        ctx.fillStyle   = "#ffda32";
        ctx.shadowColor = "#ffda32";
        ctx.shadowBlur  = 14;
        ctx.fill();
        ctx.shadowBlur  = 0;

        ctx.font      = "bold 9px Mulish,sans-serif";
        ctx.fillStyle = "#ffda32cc";
        ctx.fillText("● Dublin", dub.x + 7, dub.y - 5);
      }

      // Orbit ring (decorative)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot * 0.0055);
      ctx.scale(1, 0.28);
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.14, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(100,200,80,.12)";
      ctx.lineWidth   = 1;
      ctx.setLineDash([3, 9]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
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

/** Responsive wrapper: 430px desktop / 300px tablet / 250px mobile */
export function ResponsiveGlobe() {
  const [size, setSize] = useState(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    if (w >= 1024) return 430;
    if (w >= 640)  return 300;
    return 250;
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setSize(430);
      else if (w >= 640) setSize(300);
      else setSize(250);
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return <Globe size={size} />;
}
