"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useWeather } from "@/lib/weather-context";
import { EDITORIAL_PROFILES } from "@/lib/data";
import { Quote, ArrowRight, ArrowLeft } from "lucide-react";

export default function EditorialReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { config } = useWeather();

  const profile = EDITORIAL_PROFILES[currentIndex];

  const nextProfile = () => {
    setCurrentIndex((prev) => (prev + 1) % EDITORIAL_PROFILES.length);
  };

  const prevProfile = () => {
    setCurrentIndex((prev) => (prev - 1 + EDITORIAL_PROFILES.length) % EDITORIAL_PROFILES.length);
  };

  return (
    <section
      id="reviews"
      className="relative w-full py-24 sm:py-36 px-4 sm:px-8 border-t border-white/5 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/10 pb-6 gap-4 font-mono">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block mb-1">
              FIELD TESTIMONIALS // 07
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
              EXPEDITION VOICES
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/50 tracking-wider">
              PROFILE [0{currentIndex + 1} // 0{EDITORIAL_PROFILES.length}]
            </span>
            <button
              onClick={prevProfile}
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextProfile}
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Magazine Profile Frame */}
        <div className="rounded-3xl bg-gradient-to-br from-[#10131c] to-[#07090e] border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          {/* Portrait Column (Left 5 Cols) */}
          <div className="lg:col-span-5 relative min-h-[420px] sm:min-h-[540px] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
            <Image
              src={profile.image}
              alt={profile.name}
              fill
              className="object-cover object-top filter brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent lg:hidden" />

            {/* Coordinates Badge */}
            <div className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md font-mono text-[10px] text-white/80">
              <span className="text-white/40 block text-[8px] uppercase">COORDINATES</span>
              {profile.coordinates}
            </div>
          </div>

          {/* Editorial Text Column (Right 7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Quote className="w-8 h-8 opacity-30" style={{ color: config.accent }} />
                <span className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
                  DISPATCH LOG ENTRY
                </span>
              </div>

              {/* Massive Magazine Quote */}
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed font-sans italic">
                “{profile.quote}”
              </blockquote>
            </div>

            {/* Author Attribution */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 font-mono">
              <div>
                <h3 className="text-2xl font-bold font-display text-white uppercase tracking-tight">
                  {profile.name}
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  {profile.role}
                </p>
                <p className="text-[11px] text-white/40 mt-1">
                  {profile.location}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-right sm:text-right">
                <span className="text-[9px] text-white/40 uppercase block">DEPLOYED SYSTEM</span>
                <span className="text-xs font-bold font-mono tracking-wider text-white" style={{ color: config.accent }}>
                  {profile.gear}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
