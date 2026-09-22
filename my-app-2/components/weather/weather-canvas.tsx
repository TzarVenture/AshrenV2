"use client";

import React, { useEffect, useRef } from "react";
import { useWeather } from "@/lib/weather-context";

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  thickness: number;
}

interface SnowFlake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  alpha: number;
}

interface DustMote {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
}

interface StarPoint {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
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

    // Rain particles
    const rainCount = weather === "STORM" ? 190 : weather === "HEAVY_RAIN" ? 140 : weather === "RAIN" ? 95 : 0;
    const rainDrops: RainDrop[] = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 24 + (weather === "STORM" ? 28 : 14),
      speed: Math.random() * 12 + (weather === "STORM" ? 18 : 10),
      opacity: Math.random() * 0.45 + 0.15,
      thickness: Math.random() * 1.5 + (weather === "STORM" ? 1.4 : 0.8),
    }));

    // Snowflakes
    const snowCount = weather === "SNOW" ? 85 : 0;
    const snowflakes: SnowFlake[] = Array.from({ length: snowCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speed: Math.random() * 1.6 + 0.6,
      drift: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.6 + 0.3,
    }));

    // Sun motes
    const dustCount = weather === "CLEAR" ? 40 : 0;
    const dustMotes: DustMote[] = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.45 + 0.1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.4 - 0.2,
    }));

    // Night stars
    const starCount = weather === "NIGHT" ? 60 : 0;
    const stars: StarPoint[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.65),
      radius: Math.random() * 1.2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. STORM LIGHTNING AMBIENT FLASH
      if (isStormFlash) {
        ctx.fillStyle = "rgba(225, 235, 255, 0.25)";
        ctx.fillRect(0, 0, width, height);
      }

      // 2. PROCEDURAL RAIN & STORM
      if (weather === "RAIN" || weather === "HEAVY_RAIN" || weather === "STORM") {
        const windAngle = weather === "STORM" ? 0.35 : 0.16;
        ctx.strokeStyle = weather === "STORM" ? "rgba(210, 225, 255, 0.65)" : "rgba(165, 205, 245, 0.45)";

        for (let i = 0; i < rainDrops.length; i++) {
          const drop = rainDrops[i];
          ctx.lineWidth = drop.thickness;
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x + drop.length * windAngle, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;
          drop.x += drop.speed * windAngle;

          if (drop.y > height) {
            drop.y = -20;
            drop.x = Math.random() * (width + 100) - 50;
          }
          if (drop.x > width) drop.x = -20;
        }
      }

      // 3. PROCEDURAL SNOW
      if (weather === "SNOW") {
        ctx.fillStyle = "rgba(230, 245, 255, 0.75)";
        for (let i = 0; i < snowflakes.length; i++) {
          const flake = snowflakes[i];
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          ctx.fill();

          flake.y += flake.speed;
          flake.x += flake.drift;

          if (flake.y > height) {
            flake.y = -10;
            flake.x = Math.random() * width;
          }
        }
      }

      // 4. SUN GOLDEN MOTES
      if (weather === "CLEAR") {
        for (let i = 0; i < dustMotes.length; i++) {
          const mote = dustMotes[i];
          mote.x += mote.vx;
          mote.y += mote.vy;

          if (mote.y < -10) mote.y = height + 10;
          if (mote.x < -10) mote.x = width + 10;
          if (mote.x > width + 10) mote.x = -10;

          ctx.fillStyle = `rgba(245, 210, 130, ${mote.alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. NIGHT CELESTIAL STARS
      if (weather === "NIGHT") {
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.phase += s.twinkleSpeed;
          const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
          ctx.fillStyle = `rgba(230, 240, 255, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
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
        opacity: weather === "CLOUDY" ? 0.25 : 0.85,
        transition: "opacity 1.2s ease",
      }}
    />
  );
}
