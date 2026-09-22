"use client";

import React, { useEffect, useRef } from "react";
import { useWeather } from "@/lib/weather-context";

interface RainParticle {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  thickness: number;
}

interface StarParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
}

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
}

interface FogBlob {
  x: number;
  y: number;
  radius: number;
  vx: number;
  alpha: number;
}

export default function WeatherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { weather, isStormFlash } = useWeather();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize particles based on weather
    const rainCount = weather === "STORM" ? 180 : weather === "RAIN" ? 110 : 0;
    const rainParticles: RainParticle[] = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 22 + (weather === "STORM" ? 28 : 14),
      speed: Math.random() * 12 + (weather === "STORM" ? 18 : 10),
      opacity: Math.random() * 0.45 + (weather === "STORM" ? 0.25 : 0.15),
      thickness: Math.random() * 1.5 + (weather === "STORM" ? 1.2 : 0.8),
    }));

    // Night stars
    const starCount = weather === "NIGHT" ? 65 : 0;
    const starParticles: StarParticle[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.7),
      radius: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    // Sun motes
    const dustCount = weather === "CLEAR" ? 45 : 0;
    const dustParticles: DustParticle[] = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.2,
    }));

    // Fog drifting blobs
    const fogCount = weather === "FOG" ? 12 : 0;
    const fogBlobs: FogBlob[] = Array.from({ length: fogCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 250 + 150,
      vx: Math.random() * 0.3 + 0.1,
      alpha: Math.random() * 0.08 + 0.03,
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. STORM LIGHTNING FLASH
      if (isStormFlash) {
        ctx.fillStyle = "rgba(230, 240, 255, 0.25)";
        ctx.fillRect(0, 0, width, height);
      }

      // 2. RAIN / STORM PARTICLES
      if (weather === "RAIN" || weather === "STORM") {
        const windAngle = weather === "STORM" ? 0.35 : 0.15;
        ctx.strokeStyle = weather === "STORM" ? "rgba(200, 220, 255, 0.6)" : "rgba(160, 200, 240, 0.45)";

        for (let i = 0; i < rainParticles.length; i++) {
          const p = rainParticles[i];
          ctx.lineWidth = p.thickness;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.length * windAngle, p.y + p.length);
          ctx.stroke();

          p.y += p.speed;
          p.x += p.speed * windAngle;

          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * (width + 100) - 50;
          }
          if (p.x > width) {
            p.x = -20;
          }
        }
      }

      // 3. NIGHT STARS
      if (weather === "NIGHT") {
        for (let i = 0; i < starParticles.length; i++) {
          const s = starParticles[i];
          s.phase += s.twinkleSpeed;
          const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
          ctx.fillStyle = `rgba(220, 235, 255, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. CLEAR / SUN PARTICLES
      if (weather === "CLEAR") {
        for (let i = 0; i < dustParticles.length; i++) {
          const d = dustParticles[i];
          d.x += d.vx;
          d.y += d.vy;

          if (d.y < -10) d.y = height + 10;
          if (d.x < -10) d.x = width + 10;
          if (d.x > width + 10) d.x = -10;

          ctx.fillStyle = `rgba(235, 185, 90, ${d.alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. FOG / MIST BLOBS
      if (weather === "FOG") {
        for (let i = 0; i < fogBlobs.length; i++) {
          const f = fogBlobs[i];
          f.x += f.vx;
          if (f.x - f.radius > width) {
            f.x = -f.radius;
            f.y = Math.random() * height;
          }

          const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
          grad.addColorStop(0, `rgba(180, 195, 215, ${f.alpha})`);
          grad.addColorStop(1, "rgba(180, 195, 215, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [weather, isStormFlash]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{
        opacity: weather === "CLOUDY" ? 0.2 : 0.85,
        transition: "opacity 1.2s ease",
      }}
    />
  );
}
