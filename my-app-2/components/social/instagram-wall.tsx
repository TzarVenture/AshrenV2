"use client";

import React from "react";
import Image from "next/image";
import { Camera, MapPin, ExternalLink } from "lucide-react";

export default function InstagramWall() {
  const posts = [
    {
      creator: "@ashren.dispatch",
      location: "Icelandic Highlands",
      equipment: "Ashren G-1 Pro 8K",
      caption: "Cutting through volcanic steam at 60 knots. 8K RAW ProRes.",
      image: "/assets/elena_portrait.jpg",
      cols: "lg:col-span-4",
      height: "h-[460px]",
    },
    {
      creator: "@tokyo.neon.horology",
      location: "Shibuya Crossing",
      equipment: "Mark IV Skeleton",
      caption: "Titanium column-wheel reflection under rainy midnight neon.",
      image: "/assets/category_cinematography.jpg",
      cols: "lg:col-span-8",
      height: "h-[320px]",
    },
    {
      creator: "@arctic.creators",
      location: "Lofoten Archipelago",
      equipment: "Horizon X Heavy-Lift",
      caption: "Sub-zero flight test at 4,000 meters elevation.",
      image: "/assets/landscape_bg.jpg",
      cols: "lg:col-span-7",
      height: "h-[320px]",
    },
    {
      creator: "@atelier.ashren",
      location: "Florence Studio",
      equipment: "Solaris 18K Torc",
      caption: "Master jeweler hand-setting 2.4ct VVS1 diamonds.",
      image: "/assets/lens.jpg",
      cols: "lg:col-span-5",
      height: "h-[320px]",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-36 px-4 sm:px-8 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/10 pb-6 gap-4 font-mono">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#eaa838] block mb-1 font-bold">
              COMMUNITY CURATION // 09
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
              THE HAUTE ARCHIVE
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono tracking-wider text-white/70 hover:text-white uppercase transition-colors"
          >
            <span>DISCOVER ON INSTAGRAM @ASHREN.HAUTE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Irregular Masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className={`${post.cols} ${post.height} relative rounded-3xl overflow-hidden border border-white/10 bg-[#0c0e14] group`}
            >
              <Image
                src={post.image}
                alt={post.creator}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end space-y-2 font-mono">
                <span className="text-xs font-bold text-white tracking-wide">
                  {post.creator}
                </span>
                <p className="text-xs text-white/70 font-sans italic line-clamp-2">
                  “{post.caption}”
                </p>
                <div className="flex items-center gap-3 text-[10px] text-white/40 pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1 text-[#eaa838]">
                    <Camera className="w-3 h-3" />
                    {post.equipment}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {post.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
