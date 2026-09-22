"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useWeather } from "@/lib/weather-context";
import { ArrowRight, Compass, Eye, ShieldAlert } from "lucide-react";

interface CategoryWorld {
  number: string;
  title: string;
  tagline: string;
  statement: string;
  image: string;
  telemetry: string;
  focalLength: string;
  elevation: string;
}

const WORLDS: CategoryWorld[] = [
  {
    number: "01",
    title: "EXPEDITION // ARCTIC & UNGOVERNED FRONTIERS",
    tagline: "GO BEYOND CIVILIZATION",
    statement: "Engineered for sub-zero blizzards, salt-spray coastal ridges, and high-altitude mountain winds. Dual heated battery modules ensure autonomous launch down to -30°C.",
    image: "/assets/landscape_bg.jpg",
    telemetry: "LAT 64.14° N • SUB-ZERO FLIGHT MATRIX",
    focalLength: "24mm f/1.8 Ultra-Wide Sapphire",
    elevation: "4,200m Operating Ceiling",
  },
  {
    number: "02",
    title: "CINEMATOGRAPHY // NOCTURNAL NEON METROPOLIS",
    tagline: "THE EYE OF THE NIGHT",
    statement: "Dual-native ISO 12,800 sensor matrix turns low-light neon rains into organic cinematic tapestries without digital chroma noise or grain crushing.",
    image: "/assets/category_cinematography.jpg",
    telemetry: "SHINJUKU SECTOR 4 • 120FPS PRORES 422 HQ",
    focalLength: "Anamorphic 1.33x Flare Prime",
    elevation: "Low-Altitude 1.2m Ground Shave",
  },
  {
    number: "03",
    title: "DOCUMENTARY // INTIMATE HUMAN CHRONICLES",
    tagline: "CAPTURE THE FLEETING",
    statement: "Featherweight 164g handheld pocket instruments with instant 180° rotation and directional beamforming acoustic arrays for spontaneous cinematic portraiture.",
    image: "/assets/elena_portrait.jpg",
    telemetry: "FIELD DISPATCH • NATURAL REFLECTION CURVE",
    focalLength: "35mm Equivalent Portrait Prime",
    elevation: "Eye-Level HorizonLock",
  },
];

export default function CategoryWorlds() {
  const [activeWorldIndex, setActiveWorldIndex] = useState(0);
  const { config } = useWeather();

  return (
    <section
      id="expedition"
      className="relative w-full py-24 sm:py-36 px-4 sm:px-8 border-t border-white/5 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/10 pb-6 gap-4 font-mono">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block mb-1">
              CATEGORY EXPERIENCES // 06
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
              WORLDS OF CAPTURE
            </h2>
          </div>
          <div className="text-xs text-white/50 tracking-widest uppercase">
            ENTER THE DISCIPLINE [03 DOMAINS]
          </div>
        </div>

        {/* Giant Visual Panels Stack */}
        <div className="space-y-12 sm:space-y-20">
          {WORLDS.map((world, idx) => (
            <div
              key={world.number}
              onMouseEnter={() => setActiveWorldIndex(idx)}
              className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 bg-[#0a0c12] min-h-[460px] sm:min-h-[580px] flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 group shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
            >
              {/* Full Bleed Background Image with Atmospheric Dimming */}
              <div className="absolute inset-0 -z-20 overflow-hidden">
                <Image
                  src={world.image}
                  alt={world.title}
                  fill
                  className="object-cover filter brightness-[0.45] contrast-125 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07080b]/80 via-transparent to-transparent" />
              </div>

              {/* Top Panel Telemetry */}
              <div className="flex items-center justify-between z-10 font-mono">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full text-black"
                    style={{ backgroundColor: config.accent }}
                  >
                    WORLD {world.number}
                  </span>
                  <span className="text-[11px] text-white/70 tracking-widest uppercase hidden sm:inline">
                    {world.telemetry}
                  </span>
                </div>

                <div className="text-[10px] text-white/50 tracking-wider hidden md:flex items-center gap-4">
                  <span>OPTIC: {world.focalLength}</span>
                  <span>•</span>
                  <span>ENVELOPE: {world.elevation}</span>
                </div>
              </div>

              {/* Center / Bottom Editorial Statement */}
              <div className="z-10 max-w-2xl space-y-4 my-auto pt-16">
                <span className="text-xs sm:text-sm font-mono tracking-[0.4em] uppercase text-white/60 block">
                  {world.tagline}
                </span>

                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight uppercase leading-none drop-shadow-lg">
                  {world.title.split("//")[0]}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed pt-1 max-w-xl">
                  {world.statement}
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <a
                    href="#instruments"
                    className="px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 font-mono font-bold text-xs tracking-[0.2em] uppercase flex items-center gap-2 transition-transform hover:scale-105"
                  >
                    <span>EXPLORE DOMAIN GEAR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
