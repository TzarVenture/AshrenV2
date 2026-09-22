"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useWeather } from "@/lib/weather-context";
import { useStore } from "@/lib/store";
import { PRODUCTS } from "@/lib/data";
import { Play, ArrowRight, Shield, Zap, Crosshair, ChevronDown, Sparkles } from "lucide-react";

export default function CinematicHero() {
  const { weather, config, isStormFlash } = useWeather();
  const { addToCart, setQuickViewProduct, formatPrice } = useStore();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const heroProduct = PRODUCTS[0]; // Aetheria G-1 Pro

  // Subtle interactive parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center pt-24 sm:pt-28 pb-12 px-4 sm:px-8 overflow-hidden select-none">
      {/* 1. ATMOSPHERIC BACKDROP LAYERS */}
      <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none">
        {/* Darkened Scandinavian landscape base */}
        <div className="relative w-full h-full opacity-35 filter brightness-[0.6] contrast-125 scale-105">
          <Image
            src="/assets/landscape_bg.jpg"
            alt="Atmospheric Landscape"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Dynamic Weather Radial Tint */}
        <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: `radial-gradient(ellipse 90% 70% at 50% 30%, ${config.ambientLight} 0%, transparent 70%)`,
          }}
        />

        {/* Deep Black/Graphite Edge Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-[#07080b]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080b] via-transparent to-[#07080b]" />

        {/* Storm Lightning Ambient Flash Overlay */}
        {isStormFlash && (
          <div className="absolute inset-0 bg-white/20 transition-opacity duration-75" />
        )}
      </div>

      {/* 2. OVERSIZED BACKGROUND TYPOGRAPHY (OVERLAPPING BEHIND PRODUCT) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 w-full text-center pointer-events-none flex flex-col items-center">
        <span className="text-[15vw] font-black tracking-[-0.04em] text-white/[0.04] leading-none uppercase select-none font-display">
          AETHERIA
        </span>
      </div>

      {/* 3. TOP TELEMETRY & SERIES BADGE */}
      <div className="w-full max-w-7xl flex items-center justify-between z-10 pt-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-mono tracking-[0.25em] text-white/70 uppercase">
            {heroProduct.series}
          </span>
          <span className="hidden sm:inline text-xs font-mono text-white/30 tracking-widest uppercase">
            AUTONOMOUS 8K FLIGHT PLATFORM
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.accent }} />
          <span className="text-white/60 uppercase">{config.conditionDescription}</span>
        </div>
      </div>

      {/* 4. CENTRAL COMPOSITION: HERO PRODUCT + FLOATING TELEMETRY */}
      <div className="relative w-full max-w-6xl my-auto py-8 flex flex-col items-center justify-center z-10">
        {/* Ambient Halo behind drone */}
        <div
          className="absolute w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] rounded-full blur-[100px] pointer-events-none opacity-40 transition-colors duration-1000"
          style={{
            backgroundColor: config.accent,
            transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`,
          }}
        />

        {/* FLOATING TELEMETRY CALLOUTS (DESKTOP) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {/* Top-Left Callout: Optics */}
          <div
            className="absolute top-12 left-6 p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md transition-transform duration-500 font-mono text-left"
            style={{ transform: `translate3d(${-mouseOffset.x * 0.8}px, ${-mouseOffset.y * 0.8}px, 0)` }}
          >
            <div className="flex items-center gap-1.5 text-[9px] text-white/40 uppercase tracking-widest">
              <Crosshair className="w-3 h-3 text-white/60" />
              <span>PRIMARY OPTIC SENSOR</span>
            </div>
            <div className="text-sm font-bold text-white tracking-wide mt-0.5">
              8K 60FPS RAW PRORES
            </div>
            <div className="text-[10px] text-white/50">1-Inch Dual-Native ISO 12,800</div>
          </div>

          {/* Top-Right Callout: Gimbal */}
          <div
            className="absolute top-12 right-6 p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md transition-transform duration-500 font-mono text-right"
            style={{ transform: `translate3d(${mouseOffset.x * 0.8}px, ${-mouseOffset.y * 0.8}px, 0)` }}
          >
            <div className="flex items-center justify-end gap-1.5 text-[9px] text-white/40 uppercase tracking-widest">
              <span>TITANIUM GIMBAL</span>
              <Zap className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-white tracking-wide mt-0.5">
              3-AXIS 0.001° HORIZON LOCK
            </div>
            <div className="text-[10px] text-white/50">Brushless Magnetic Encoders</div>
          </div>

          {/* Bottom-Left Callout: Weather Seal */}
          <div
            className="absolute bottom-16 left-8 p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md transition-transform duration-500 font-mono text-left"
            style={{ transform: `translate3d(${-mouseOffset.x * 0.6}px, ${mouseOffset.y * 0.6}px, 0)` }}
          >
            <div className="flex items-center gap-1.5 text-[9px] text-white/40 uppercase tracking-widest">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>ATMOSPHERIC DEFENSE</span>
            </div>
            <div className="text-sm font-bold text-white tracking-wide mt-0.5">
              IPX8 ALL-WEATHER MONSOON
            </div>
            <div className="text-[10px] text-white/50">Submersion & Gale Class 8 Certified</div>
          </div>

          {/* Bottom-Right Callout: Flight Envelope */}
          <div
            className="absolute bottom-16 right-8 p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md transition-transform duration-500 font-mono text-right"
            style={{ transform: `translate3d(${mouseOffset.x * 0.6}px, ${mouseOffset.y * 0.6}px, 0)` }}
          >
            <div className="flex items-center justify-end gap-1.5 text-[9px] text-white/40 uppercase tracking-widest">
              <span>VELOCITY & RANGE</span>
              <Sparkles className="w-3 h-3 text-white/60" />
            </div>
            <div className="text-sm font-bold text-white tracking-wide mt-0.5">
              48 MIN • 85 KM/H SPEED
            </div>
            <div className="text-[10px] text-white/50">Dual Encrypted 15KM Neural Link</div>
          </div>
        </div>

        {/* HERO PRODUCT VISUAL */}
        <div
          className="relative w-full max-w-2xl sm:max-w-3xl aspect-[16/9] transition-transform duration-300 ease-out flex items-center justify-center cursor-pointer group"
          onClick={() => setQuickViewProduct(heroProduct)}
          data-cursor="view"
          style={{
            transform: `translate3d(${mouseOffset.x * 0.7}px, ${mouseOffset.y * 0.7}px, 0) rotateX(${
              -mouseOffset.y * 0.25
            }deg) rotateY(${mouseOffset.x * 0.25}deg)`,
          }}
        >
          <Image
            src={heroProduct.image}
            alt={heroProduct.name}
            fill
            priority
            className="object-contain filter drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)] transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* 5. CINEMATIC HEADLINES & TYPOGRAPHY OVERLAY */}
        <div className="text-center mt-4 sm:mt-6 z-20 space-y-3">
          <p className="text-xs sm:text-sm font-mono tracking-[0.4em] uppercase text-white/60">
            ENGINEERED FOR UNGOVERNED SKY & LIGHT
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none uppercase font-display drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            VISION <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">UNBOUND</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-white/60 max-w-xl mx-auto font-sans leading-relaxed pt-1">
            Aerospace forged carbon chassis, 8K dual-sensor imaging, and weather-reactive stabilization that laughs at gales, monsoons, and twilight.
          </p>
        </div>

        {/* 6. PRIMARY ACTIONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 z-20">
          <button
            onClick={() => addToCart(heroProduct)}
            className="group relative px-8 py-4 rounded-full text-black font-extrabold text-xs tracking-[0.25em] uppercase flex items-center gap-3 shadow-[0_0_35px_rgba(229,169,60,0.4)] transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: config.accent }}
          >
            <span>ACQUIRE G-1 PRO ({formatPrice(heroProduct.priceINR, heroProduct.priceUSD)})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="px-7 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white font-semibold text-xs tracking-[0.2em] uppercase flex items-center gap-2.5 backdrop-blur-xl transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <Play className="w-3 h-3 fill-white text-white ml-0.5" />
            </div>
            <span>WATCH FILM</span>
          </button>
        </div>
      </div>

      {/* 7. BOTTOM COORDINATES & SCROLL INDICATOR */}
      <div className="w-full max-w-7xl flex items-center justify-between z-10 pt-4 border-t border-white/5 text-[10px] font-mono text-white/40">
        <div className="flex items-center gap-2">
          <span>LAT 64.1466° N, 16.7491° W</span>
          <span>•</span>
          <span>ARCTIC FIELD PROVEN</span>
        </div>

        <a
          href="#statement"
          className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <span>SCROLL TO COMMENCE [01 // 07]</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>

      {/* VIDEO MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl">
          <div className="relative w-full max-w-5xl aspect-[16/9] bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-5 right-5 z-30 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-white hover:bg-white/20 transition-colors"
            >
              CLOSE [ESC]
            </button>
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/category_cinematography.jpg"
                  alt="Cinema Film Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-4">
                    <Play className="w-6 h-6 fill-white text-white ml-1" />
                  </div>
                  <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/80">
                    AETHERIA CINEMA DIVISION // 4K PRORES LAUNCH FOOTAGE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white">
                    ICELANDIC STORM EXPEDITION
                  </h3>
                  <p className="text-xs text-white/60 max-w-md font-mono mt-2">
                    Shot entirely on the Aetheria G-1 Pro in torrential 60-knot sub-zero gales without stabilization rig post-processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
