"use client";

import React from "react";
import Image from "next/image";
import { useWeather } from "@/lib/weather-context";
import { SOCIAL_WALL_ITEMS } from "@/lib/data";
import { Camera, MapPin, ExternalLink } from "lucide-react";

export default function SocialWall() {
  const { config } = useWeather();

  return (
    <section className="relative w-full py-24 sm:py-36 px-4 sm:px-8 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/10 pb-6 gap-4 font-mono">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block mb-1">
              COMMUNITY CURATION // 08
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
              THE COLLECTIVE FRAME
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono tracking-wider text-white/70 hover:text-white uppercase transition-colors"
          >
            <span>JOIN THE ARCHIVE @AETHERIA.OPTICS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Irregular Editorial Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          {/* Item 1: Tall Editorial Portrait (4 Cols) */}
          <div className="lg:col-span-4 relative h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-[#0c0e14] group">
            <Image
              src={SOCIAL_WALL_ITEMS[0].image}
              alt={SOCIAL_WALL_ITEMS[0].creator}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Hover Data Capsule */}
            <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end space-y-2 font-mono">
              <span className="text-xs font-bold text-white tracking-wide">
                {SOCIAL_WALL_ITEMS[0].creator}
              </span>
              <p className="text-xs text-white/70 font-sans italic">
                “{SOCIAL_WALL_ITEMS[0].caption}”
              </p>
              <div className="flex items-center gap-3 text-[10px] text-white/40 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  {SOCIAL_WALL_ITEMS[0].camera}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {SOCIAL_WALL_ITEMS[0].location}
                </span>
              </div>
            </div>
          </div>

          {/* Item 2: Wide Cinematic Night Scene (8 Cols) */}
          <div className="lg:col-span-8 relative h-[320px] rounded-3xl overflow-hidden border border-white/10 bg-[#0c0e14] group">
            <Image
              src={SOCIAL_WALL_ITEMS[1].image}
              alt={SOCIAL_WALL_ITEMS[1].creator}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-115"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 font-mono">
              <div className="space-y-1">
                <span className="text-xs font-bold text-white tracking-wide">
                  {SOCIAL_WALL_ITEMS[1].creator}
                </span>
                <p className="text-xs text-white/70 font-sans italic max-w-md">
                  “{SOCIAL_WALL_ITEMS[1].caption}”
                </p>
              </div>

              <div className="flex items-center gap-3 text-[10px] text-white/50 shrink-0">
                <span className="flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  {SOCIAL_WALL_ITEMS[1].camera}
                </span>
                <span>•</span>
                <span>{SOCIAL_WALL_ITEMS[1].location}</span>
              </div>
            </div>
          </div>

          {/* Item 3: Panoramic Mountain Landscape (7 Cols) */}
          <div className="lg:col-span-7 relative h-[340px] rounded-3xl overflow-hidden border border-white/10 bg-[#0c0e14] group">
            <Image
              src={SOCIAL_WALL_ITEMS[2].image}
              alt={SOCIAL_WALL_ITEMS[2].creator}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-120"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end space-y-1 font-mono">
              <span className="text-xs font-bold text-white">
                {SOCIAL_WALL_ITEMS[2].creator}
              </span>
              <p className="text-xs text-white/70 font-sans italic">
                “{SOCIAL_WALL_ITEMS[2].caption}”
              </p>
              <div className="flex items-center gap-3 text-[10px] text-white/40 pt-1">
                <span>{SOCIAL_WALL_ITEMS[2].camera}</span>
                <span>•</span>
                <span>{SOCIAL_WALL_ITEMS[2].location}</span>
              </div>
            </div>
          </div>

          {/* Item 4: Macro Product Optics (5 Cols) */}
          <div className="lg:col-span-5 relative h-[340px] rounded-3xl overflow-hidden border border-white/10 bg-[#0c0e14] group">
            <Image
              src={SOCIAL_WALL_ITEMS[3].image}
              alt={SOCIAL_WALL_ITEMS[3].creator}
              fill
              className="object-contain p-6 transition-transform duration-700 group-hover:scale-105 filter drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85" />

            <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end space-y-1 font-mono">
              <span className="text-xs font-bold text-white">
                {SOCIAL_WALL_ITEMS[3].creator}
              </span>
              <p className="text-xs text-white/70 font-sans italic">
                “{SOCIAL_WALL_ITEMS[3].caption}”
              </p>
              <div className="flex items-center gap-3 text-[10px] text-white/40 pt-1">
                <span>{SOCIAL_WALL_ITEMS[3].camera}</span>
                <span>•</span>
                <span>{SOCIAL_WALL_ITEMS[3].location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
