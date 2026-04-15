import React, { useMemo } from "react";

function mulberry32(seed) {
  return function rand() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ParticlesBackground({ count = 26, seed = 20260413 }) {
  const particles = useMemo(() => {
    const r = mulberry32(seed);
    return Array.from({ length: count }).map((_, i) => {
      const size = 12 + Math.round(r() * 26);
      const x = Math.round(r() * 100);
      const y = Math.round(r() * 100);
      const drift = 14 + Math.round(r() * 26);
      const dur = 10 + Math.round(r() * 18);
      const delay = Math.round(r() * 8000) / 1000;
      const blur = 0;
      const alpha = 0.06 + r() * 0.12;
      const hue = r() > 0.72 ? "purple" : r() > 0.44 ? "blue" : "green";
      return {
        key: `${seed}-${i}`,
        style: {
          "--p-size": `${size}px`,
          "--p-x": `${x}%`,
          "--p-y": `${y}%`,
          "--p-drift": `${drift}px`,
          "--p-dur": `${dur}s`,
          "--p-delay": `${delay}s`,
          "--p-blur": `${blur}px`,
          "--p-alpha": alpha.toFixed(3),
        },
        hue,
      };
    });
  }, [count, seed]);

  return (
    <div className="particles-bg" aria-hidden="true">
      <div className="particles-bg__layer">
        {particles.map((p) => (
          <span
            key={p.key}
            className={`particle particle--${p.hue}`}
            style={p.style}
          />
        ))}
      </div>
    </div>
  );
}

