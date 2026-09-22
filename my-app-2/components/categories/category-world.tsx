"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWeather } from "@/lib/weather-context";
import { ArrowRight } from "lucide-react";

interface CategoryRealm {
  number: string;
  name: string;
  tagline: string;
  statement: string;
  image: string;
  telemetry: string;
  slug: string;
  itemCount: string;
}

const REALMS: CategoryRealm[] = [
  {
    number: "01",
    name: "OPTICS & FLIGHT SYSTEMS",
    tagline: "AUTONOMOUS EXPEDITION & 8K SKY CAPTURE",
    statement: "Engineered for sub-zero blizzards, salt-spray coastal ridges, and high-altitude mountain winds. Dual heated battery modules ensure autonomous launch down to -30°C.",
    image: "/assets/landscape_bg.jpg",
    telemetry: "LAT 64.14° N • 4,200M ENVELOPE",
    slug: "electronics",
    itemCount: "4,280 PIECES",
  },
  {
    number: "02",
    name: "HAUTE APPAREL & OUTERWEAR",
    tagline: "ARCHITECTURAL MEMBRANES & RUNWAY TAILORING",
    statement: "Weather-sealed Japanese wool trench coats and Italian double-georgette evening column dresses engineered for dramatic presence across rain-slicked city boulevards.",
    image: "/assets/elena_portrait.jpg",
    telemetry: "20,000MM HYDROSTATIC HEAD • TAPED SEAMS",
    slug: "fashion",
    itemCount: "8,940 PIECES",
  },
  {
    number: "03",
    name: "HAUTE HOROLOGY & CHRONOMETRY",
    tagline: "SKELETONIZED CALIBRES & METROLOGICAL RIGOR",
    statement: "Grade 5 titanium open-worked chronographs and 300-meter forged carbon dive instruments calibrated to chronometer precision standards.",
    image: "/assets/category_cinematography.jpg",
    telemetry: "COSC CERTIFIED • 72-HR POWER RESERVE",
    slug: "watches",
    itemCount: "3,120 PIECES",
  },
  {
    number: "04",
    name: "HAUTE JOAILLERIE & LIVING",
    tagline: "PRECIOUS METALS & SPATIAL ACOUSTIC MONUMENTS",
    statement: "Solid 18K recycled gold torcs hand-set with VVS1 diamonds, paired with single-block milled aluminum lossless spatial studio monitors.",
    image: "/assets/lens.jpg",
    telemetry: "18K SOLID GOLD • 24-BIT 192KHZ LOSSLESS",
    slug: "jewelry",
    itemCount: "8,660 PIECES",
  },
];

export default function CategoryWorld() {
  const { theme } = useWeather();

  return (
    <section className="relative w-full py-24 sm:py-36 px-4 sm:px-8 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/10 pb-6 gap-4 font-mono">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#eaa838] block mb-1 font-bold">
              CATEGORY EXPERIENCES // 06
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
              WORLDS OF DISCOVERY
            </h2>
          </div>
          <div className="text-xs text-white/50 tracking-widest uppercase">
            ENTER THE DISCIPLINE [04 REALMS]
          </div>
        </div>

        {/* Large Visual Panels Stack */}
        <div className="space-y-12 sm:space-y-16">
          {REALMS.map((realm) => (
            <div
              key={realm.number}
              className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 bg-[#0a0c12] min-h-[440px] sm:min-h-[540px] flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 group shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
            >
              {/* Full Bleed Background Image */}
              <div className="absolute inset-0 -z-20 overflow-hidden">
                <Image
                  src={realm.image}
                  alt={realm.name}
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
                    className="text-xs font-bold px-3 py-1 rounded-full text-black bg-gold-gradient"
                  >
                    REALM {realm.number}
                  </span>
                  <span className="text-[11px] text-white/70 tracking-widest uppercase hidden sm:inline">
                    {realm.telemetry}
                  </span>
                </div>

                <div className="text-[10px] text-white/50 tracking-wider">
                  {realm.itemCount}
                </div>
              </div>

              {/* Bottom Statement & Enter Link */}
              <div className="z-10 max-w-2xl space-y-4 my-auto pt-16">
                <span className="text-xs sm:text-sm font-mono tracking-[0.4em] uppercase text-[#eaa838] block font-bold">
                  {realm.tagline}
                </span>

                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight uppercase leading-none drop-shadow-lg">
                  {realm.name}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed pt-1 max-w-xl">
                  {realm.statement}
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <Link
                    href={`/category/${realm.slug}`}
                    className="px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 font-mono font-bold text-xs tracking-[0.2em] uppercase flex items-center gap-2 transition-transform hover:scale-105 shadow-xl"
                  >
                    <span>ENTER REALM</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
