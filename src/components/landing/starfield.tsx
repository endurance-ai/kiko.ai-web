"use client";

import {useEffect, useRef} from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkle: number;
  dir: 1 | -1;
};

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let raf = 0;

    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 1800);
      stars = Array.from({ length: count }, () => {
        const r = Math.random();
        return {
          x: rand(0, canvas.width),
          y: rand(0, canvas.height),
          radius:
            r < 0.75 ? rand(0.2, 0.8) : r < 0.95 ? rand(0.8, 1.6) : rand(1.6, 2.8),
          alpha:
            r < 0.75 ? rand(0.15, 0.55) : r < 0.95 ? rand(0.45, 0.85) : rand(0.75, 1.0),
          twinkle: rand(0.002, 0.008),
          dir: Math.random() > 0.5 ? 1 : -1,
        };
      });
    };

    const draw = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.alpha += s.twinkle * s.dir;
        if (s.alpha >= 1 || s.alpha <= 0.05) s.dir = (s.dir * -1) as 1 | -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
