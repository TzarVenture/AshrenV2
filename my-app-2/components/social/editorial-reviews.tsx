"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useWeather } from "@/lib/weather-context";
import { Quote, ArrowRight, ArrowLeft } from "lucide-react";

interface EditorialProfile {
  name: string;
  role: string;
  location: string;
  quote: string;
  image: string;
  gear: string;
  coordinates: string;
}

const PROFILES: EditorialProfile[] = [
  {
    name: "Elena Rostova",
    role: "National Geographic Expedition Filmmaker",
    location: "Vatnajökull Glacier, Iceland",
    quote: "In -18°C sub-zero gale winds across the glacier, any other gimbal's lubricant freezes and the motors stutter. The Ashren G-1 Pro held its horizon lock without a single millisecond of flutter.",
    image: "/assets/elena_portrait.jpg",
    gear: "ASHREN G-1 PRO + MK III ANAMORPHIC",
    coordinates: "64.1466° N, 16.7491° W",
  },
  {
    name: "Kai Takahashi",
    role: "Nocturnal Street Cinematographer",
    location: "Shinjuku, Tokyo",
    quote: "The Pocket C-2 has completely replaced my heavy B-cam rig for unscripted midnight shoots. The micro OLED histogram and dual-native ISO deliver organic shadows straight out of camera.",
    image: "/assets/category_cinematography.jpg",
    gear: "POCKET C-2 // OBSIDIAN GOLD EDITION",
    coordinates: "35.6938° N, 139.7034° E",
  },
  {
    name: "Marcus Vance",
    role: "Aerospace Documentary Director",
    location: "Great Rift Valley, Kenya",
    quote: "Chasing dust devils and sudden equatorial storms demands gear that laughs at the elements. Ashren's sealed titanium chassis is the first platform that feels genuinely military grade.",
    image: "/assets/landscape_bg.jpg",
    gear: "HORIZON X CINEMA RIG",
    coordinates: "0.4162° N, 36.0800° E",
  },
];

export default function EditorialReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useWeather();

  const profile = PROFILES[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % PROFILES.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + PROFILES.length) % PROFILES.length);

  return (
    <section className="relative w-full py-24 sm:py-36 px-4 sm:px-8 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/10 pb-6 gap-4 font-mono">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#eaa838] block mb-1 font-bold">
              EXPEDITION VOICES // 08
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
              FIELD TESTIMONIALS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/50 tracking-wider">
              PROFILE [0{currentIndex + 1} // 0{PROFILES.length}]
            </span>
            <button
              onClick={prev}
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Magazine Frame */}
        <div className="rounded-3xl bg-gradient-to-br from-[#10131c] to-[#07090e] border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          <div className="lg:col-span-5 relative min-h-[400px] sm:min-h-[520px] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
            <Image
              src={profile.image}
              alt={profile.name}
              fill
              className="object-cover object-top filter brightness-90 contrast-110"
            />
            <div className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md font-mono text-[10px] text-white/80">
              <span className="text-[#eaa838] block text-[8px] uppercase font-bold">COORDINATES</span>
              {profile.coordinates}
            </div>
          </div>

          <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Quote className="w-8 h-8 opacity-35" style={{ color: theme.accent }} />
                <span className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
                  DISPATCH LOG ENTRY
                </span>
              </div>

              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed font-sans italic">
                “{profile.quote}”
              </blockquote>
            </div>

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

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-left sm:text-right">
                <span className="text-[9px] text-[#eaa838] uppercase block font-bold">DEPLOYED SYSTEM</span>
                <span className="text-xs font-bold font-mono tracking-wider text-white">
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
