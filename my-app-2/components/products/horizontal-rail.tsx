"use client";

import React, { useRef } from "react";
import { Product } from "@/services/products/types";
import ProductCard from "./product-card";
import { useWeather } from "@/lib/weather-context";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface HorizontalRailProps {
  title: string;
  subtitle: string;
  sectionNumber: string;
  products: Product[];
}

export default function HorizontalRail({ title, subtitle, sectionNumber, products }: HorizontalRailProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useWeather();

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -440 : 440;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-[#eaa838] mb-2 font-bold">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
            <span>COLLECTION SHOWCASE // {sectionNumber}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
            {title}
          </h2>
          <p className="text-xs text-white/50 font-mono mt-1 tracking-wider">
            {subtitle}
          </p>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-white/40 tracking-wider mr-2 hidden sm:inline">
            DRAG OR NAVIGATE ↔
          </span>
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white/70 hover:text-white transition-all"
            title="Previous"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white/70 hover:text-white transition-all"
            title="Next"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Rail */}
      <div
        ref={scrollRef}
        data-cursor="drag"
        className="flex gap-6 overflow-x-auto px-4 sm:px-8 pb-8 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
      >
        {products.map((product) => (
          <div key={product.id} className="flex-none w-[310px] sm:w-[380px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
