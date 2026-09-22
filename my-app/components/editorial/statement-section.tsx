"use client";

import React from "react";
import Image from "next/image";
import { useWeather } from "@/lib/weather-context";

export default function StatementSection() {
  const { config } = useWeather();

  return (
    <section
      id="statement"
      className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden py-32 px-6 sm:px-12 select-none border-y border-white/5"
    >
      {/* 1. LAYERED CINEMATIC PHOTOGRAPHIC BACKDROP WITH PARALLAX DEPTH */}
      <div className="absolute inset-0 -z-30 pointer-events-none">
        <div className="relative w-full h-full opacity-20 filter brightness-75 contrast-150 scale-110">
          <Image
            src="/assets/landscape_bg.jpg"
            alt="Editorial Background Landscape"
            fill
            className="object-cover object-center"
          />
        </div>
        {/* Dark radial glow */}
        <div
          className="absolute inset-0 opacity-40 transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${config.ambientLight} 0%, transparent 65%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-[#07080b]" />
      </div>

      {/* 2. REVEALED PRODUCT SILHOUETTE FLOATING IN MIDGROUND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 w-full max-w-4xl aspect-[16/9] opacity-25 filter blur-[0.5px] pointer-events-none">
        <Image
          src="/assets/hero_drone.jpg"
          alt="Ghost Silhouette"
          fill
          className="object-contain"
        />
      </div>

      {/* 3. EDITORIAL CONTAINER */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col justify-between h-full z-10">
        {/* Top Micro-Metadata Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 gap-4 font-mono">
          <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-white/50">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.accent }} />
            <span>EDITORIAL DISPATCH // SECTION 02</span>
          </div>
          <div className="text-[11px] tracking-[0.25em] text-white/40 uppercase text-right">
            OPERATIONAL ENVELOPE: ARCTIC TUNDRA • MONSOON • STRATOSPHERE
          </div>
        </div>

        {/* MASSIVE CAMPAIGN HEADLINE */}
        <div className="my-16 sm:my-24 flex flex-col items-start font-display">
          <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase text-white tracking-[-0.03em] leading-[0.88] drop-shadow-2xl">
            BUILT
          </span>
          <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase text-white/90 tracking-[-0.03em] leading-[0.88] drop-shadow-2xl flex items-center gap-4 sm:gap-8">
            FOR THE
            <span
              className="hidden sm:inline-block h-[2px] w-24 lg:w-48 self-center rounded-full"
              style={{ backgroundColor: config.accent }}
            />
          </span>
          <span
            className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.03em] leading-[0.88] drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30"
          >
            UNGOVERNED
          </span>
        </div>

        {/* Bottom Technical Specifications Footnote */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10 font-mono text-white/70">
          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1">
              01 // STRUCTURAL INTEGRITY
            </span>
            <p className="text-xs leading-relaxed text-white/60 font-sans">
              Hot-isostatically pressed titanium alloy lattice eliminates micro-flex under 14G flight maneuvers and high-frequency propeller resonance.
            </p>
          </div>

          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1">
              02 // SENSOR GRADATION
            </span>
            <p className="text-xs leading-relaxed text-white/60 font-sans">
              14.2 stops of calibrated dynamic range captures deep twilight shadows and blazing cloud specular highlights with zero digital clipping.
            </p>
          </div>

          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1">
              03 // ATMOSPHERIC IMMUNITY
            </span>
            <p className="text-xs leading-relaxed text-white/60 font-sans">
              Sub-micron hydrophobic coatings on optical surfaces bead rainfall instantly, keeping optical paths pristine through heavy precipitation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
