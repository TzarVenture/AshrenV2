"use client";

import React, { useEffect, useState } from "react";
import { useWeather } from "@/lib/weather-context";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const { config } = useWeather();

  useEffect(() => {
    // Disable on touch devices or screens smaller than 1024px
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Inspect hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, input, select, textarea, [data-cursor]");
      const cursorAttr = interactive?.getAttribute("data-cursor");

      if (cursorAttr === "view") {
        setCursorType("view");
      } else if (cursorAttr === "drag") {
        setCursorType("drag");
      } else if (interactive) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  // Smooth lerp for outer follower ring
  useEffect(() => {
    if (isMobile) return;
    let animId: number;
    const followSpeed = 0.22;

    const loop = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * followSpeed,
        y: prev.y + (pos.y - prev.y) * followSpeed,
      }));
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [pos, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Central crisp dot */}
      <div
        className="fixed w-1.5 h-1.5 rounded-full bg-white transition-opacity duration-200"
        style={{
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`,
          opacity: cursorType === "view" || cursorType === "drag" ? 0 : 0.9,
        }}
      />

      {/* Trailing follower circle */}
      <div
        className="fixed rounded-full flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%) scale(${
            cursorType === "view" || cursorType === "drag"
              ? 1.8
              : cursorType === "pointer"
              ? 1.35
              : 1
          })`,
          width: cursorType === "view" || cursorType === "drag" ? "52px" : "32px",
          height: cursorType === "view" || cursorType === "drag" ? "52px" : "32px",
          backgroundColor:
            cursorType === "view" || cursorType === "drag"
              ? "rgba(10, 12, 18, 0.85)"
              : "transparent",
          border: `1px solid ${
            cursorType === "view" || cursorType === "drag"
              ? config.accent
              : "rgba(255, 255, 255, 0.35)"
          }`,
          boxShadow:
            cursorType === "view" || cursorType === "drag"
              ? `0 0 20px ${config.accentGlow}`
              : "none",
          backdropFilter:
            cursorType === "view" || cursorType === "drag" ? "blur(8px)" : "none",
        }}
      >
        {cursorType === "view" && (
          <span className="text-[9px] font-bold tracking-widest text-white uppercase font-tech">
            VIEW ↗
          </span>
        )}
        {cursorType === "drag" && (
          <span className="text-[9px] font-bold tracking-widest text-white uppercase font-tech">
            DRAG ↔
          </span>
        )}
      </div>
    </div>
  );
}
