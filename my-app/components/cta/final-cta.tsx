"use client";

import React from "react";
import Image from "next/image";
import { useWeather } from "@/lib/weather-context";
import { useStore } from "@/lib/store";
import { PRODUCTS } from "@/lib/data";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function FinalCTA() {
  const { config } = useWeather();
  const { addToCart, setQuickViewProduct, formatPrice } = useStore();
  const flagship = PRODUCTS[0];

  return (
    <section className="relative w-full min-h-[90vh] py-28 sm:py-36 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden select-none border-t border-white/5 text-center">
      {/* Background Glow */}
      <div
        className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: config.accent }}
      />

      {/* Ghost product silhouette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-[16/9] opacity-15 filter blur-[1px] pointer-events-none">
        <Image
          src="/assets/hero_drone.jpg"
          alt="Atmospheric Silhouette"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative max-w-4xl mx-auto z-10 space-y-8 flex flex-col items-center">
        {/* Label */}
        <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-[0.3em] uppercase text-white/60">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>SERIES 04 ALLOCATION NOW OPEN</span>
        </div>

        {/* Massive Headline */}
        <h2 className="text-4xl sm:text-7xl md:text-8xl font-black font-display tracking-tight text-white uppercase leading-[0.92] drop-shadow-2xl">
          THE SKY DOES <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">
            NOT WAIT.
          </span>
        </h2>

        <p className="text-xs sm:text-base text-white/60 max-w-lg font-sans leading-relaxed">
          Crafted in limited production batches. Direct aerospace-grade allocation includes complimentary express air freight and 3-year full component replacement.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => addToCart(flagship)}
            className="px-8 py-4 rounded-full text-black font-extrabold text-xs tracking-[0.25em] uppercase flex items-center gap-3 shadow-[0_0_40px_rgba(229,169,60,0.5)] transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: config.accent }}
          >
            <span>ACQUIRE G-1 PRO ({formatPrice(flagship.priceINR, flagship.priceUSD)})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setQuickViewProduct(flagship)}
            className="px-7 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-mono font-bold text-xs tracking-wider uppercase transition-colors"
          >
            INSPECT TELEMETRY
          </button>
        </div>

        {/* Footnote assurance */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono text-white/40">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
            DGCA & FCC CATEGORY A COMPLIANT
          </span>
          <span>•</span>
          <span>DISPATCH WINDOW: 24-48 HOURS</span>
          <span>•</span>
          <span>ENCRYPTED DIRECT ESCROW</span>
        </div>
      </div>
    </section>
  );
}
