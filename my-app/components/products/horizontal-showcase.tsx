"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useWeather } from "@/lib/weather-context";
import { useStore } from "@/lib/store";
import { PRODUCTS } from "@/lib/data";
import { ArrowLeft, ArrowRight, Eye, ShoppingBag, Radio } from "lucide-react";

export default function HorizontalShowcase() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { config } = useWeather();
  const { addToCart, setQuickViewProduct, formatPrice } = useStore();

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -440 : 440;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section
      id="instruments"
      className="relative w-full py-24 sm:py-32 overflow-hidden border-t border-white/5 select-none"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.accent }} />
            <span>COLLECTION SHOWCASE // 04</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
            PRECISION INSTRUMENTS
          </h2>
        </div>

        {/* Scroll Arrows */}
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

      {/* Large Horizontal Scrolling Rail */}
      <div
        ref={scrollRef}
        data-cursor="drag"
        className="flex gap-6 overflow-x-auto px-4 sm:px-8 pb-8 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
      >
        {PRODUCTS.map((product, idx) => (
          <div
            key={product.id}
            className="relative flex-none w-[320px] sm:w-[420px] rounded-3xl bg-gradient-to-b from-[#11141c]/90 to-[#090b10]/95 border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-500 group flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
          >
            {/* Top Bar inside Card */}
            <div className="p-6 flex items-center justify-between border-b border-white/5 z-10">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                {product.series}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] text-white/70 border border-white/10">
                0{idx + 1}
              </span>
            </div>

            {/* Product Visual Area */}
            <div
              className="relative w-full h-64 sm:h-72 p-6 flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => setQuickViewProduct(product)}
              data-cursor="view"
            >
              {/* Card Ambient Glow on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${config.accent} 0%, transparent 70%)`,
                }}
              />

              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-transform duration-700 group-hover:scale-108"
                />
              </div>

              {/* Floating Quick View Hint */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Product Meta & Information */}
            <div className="p-6 bg-black/40 border-t border-white/5 flex flex-col justify-between space-y-4 z-10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight uppercase group-hover:text-white transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-white/50 font-mono mt-1 line-clamp-1">
                  {product.tagline}
                </p>
              </div>

              {/* Quick Spec Highlights */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-white/40 border-y border-white/5 py-2.5">
                <div>
                  <span className="text-white/30 block">RESOLVE</span>
                  <span className="text-white/80 font-semibold">{product.specs.resolution.split(" ")[0]}</span>
                </div>
                <div>
                  <span className="text-white/30 block">RATING</span>
                  <span className="text-white/80 font-semibold">{product.specs.weatherRating.split(" ")[0]}</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[9px] font-mono text-white/40 uppercase block">DIRECT ACQUISITION</span>
                  <span className="text-base sm:text-lg font-bold font-mono" style={{ color: config.accent }}>
                    {formatPrice(product.priceINR, product.priceUSD)}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2.5 rounded-full bg-white/[0.08] hover:bg-white text-white hover:text-black font-mono font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ACQUIRE</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
