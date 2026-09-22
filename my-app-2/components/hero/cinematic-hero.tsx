"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWeather } from "@/lib/weather-context";
import { useStore } from "@/lib/store";
import { MOCK_PRODUCTS } from "@/data/products.mock";
import { Play, ArrowRight, Shield, Zap, Crosshair, ChevronDown, Sparkles } from "lucide-react";

export default function CinematicHero() {
  const { theme, isStormFlash } = useWeather();
  const { addToCart, setQuickViewProduct, formatPrice } = useStore();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const heroProduct = MOCK_PRODUCTS[0]; // Ashren G-1 Pro

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

  const categories = [
    { number: "01", name: "OPTICS & DRONES", slug: "electronics" },
    { number: "02", name: "HAUTE APPAREL", slug: "fashion" },
    { number: "03", name: "FINE HOROLOGY", slug: "watches" },
    { number: "04", name: "JOAILLERIE", slug: "jewelry" },
    { number: "05", name: "EXPEDITION LIVING", slug: "lifestyle" },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center pt-24 sm:pt-28 pb-10 px-4 sm:px-8 overflow-hidden select-none">
      {/* 1. ATMOSPHERIC BACKDROP WITH PARALLAX DEPTH */}
      <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none">
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
            background: `radial-gradient(ellipse 90% 70% at 50% 30%, ${theme.ambientLight} 0%, transparent 70%)`,
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
        <span className="text-[16vw] font-black tracking-[-0.04em] text-white/[0.035] leading-none uppercase select-none font-display">
          ASHREN
        </span>
      </div>

      {/* 3. TOP TELEMETRY & SERIES BADGE */}
      <div className="w-full max-w-7xl flex items-center justify-between z-10 pt-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono tracking-[0.25em] text-[#eaa838] uppercase font-bold">
            HAUTE MARKETPLACE // SERIES 04
          </span>
          <span className="hidden sm:inline text-xs font-mono text-white/40 tracking-widest uppercase">
            AUTONOMOUS 8K FLIGHT & ATELIER COMMERCE
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
          <span className="text-white/60 uppercase">{theme.conditionDescription}</span>
        </div>
      </div>

      {/* 4. CENTRAL COMPOSITION: HERO PRODUCT + FLOATING TELEMETRY */}
      <div className="relative w-full max-w-6xl my-auto py-3 sm:py-5 flex flex-col items-center justify-center z-10">
        {/* Ambient Halo behind product */}
        <div
          className="absolute w-[360px] sm:w-[560px] h-[360px] sm:h-[560px] rounded-full blur-[100px] pointer-events-none opacity-40 transition-colors duration-1000"
          style={{
            backgroundColor: theme.accent,
            transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`,
          }}
        />

        {/* FLOATING TELEMETRY CALLOUTS (DESKTOP) */}
        <div className="hidden xl:block absolute inset-0 pointer-events-none">
          {/* Top-Left: Optics */}
          <div
            className="absolute top-4 left-4 p-3 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md transition-transform duration-500 font-mono text-left shadow-2xl max-w-[210px]"
            style={{ transform: `translate3d(${-mouseOffset.x * 0.3}px, ${-mouseOffset.y * 0.3}px, 0)` }}
          >
            <div className="flex items-center gap-1.5 text-[9px] text-[#eaa838] uppercase tracking-widest font-bold">
              <Crosshair className="w-3 h-3 text-[#eaa838]" />
              <span>PRIMARY OPTIC SENSOR</span>
            </div>
            <div className="text-sm font-bold text-white tracking-wide mt-0.5">
              8K 60FPS RAW PRORES
            </div>
            <div className="text-[10px] text-white/50">Dual 1-Inch Sony Dual-Native ISO</div>
          </div>

          {/* Top-Right: Gimbal */}
          <div
            className="absolute top-4 right-4 p-3 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md transition-transform duration-500 font-mono text-right shadow-2xl max-w-[210px]"
            style={{ transform: `translate3d(${mouseOffset.x * 0.3}px, ${-mouseOffset.y * 0.3}px, 0)` }}
          >
            <div className="flex items-center justify-end gap-1.5 text-[9px] text-[#eaa838] uppercase tracking-widest font-bold">
              <span>TITANIUM GIMBAL</span>
              <Zap className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-white tracking-wide mt-0.5">
              3-AXIS 0.001° DECOUPLING
            </div>
            <div className="text-[10px] text-white/50">Brushless Direct-Drive Encoders</div>
          </div>

          {/* Bottom-Left: Weather Seal */}
          <div
            className="absolute bottom-16 left-6 p-3 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md transition-transform duration-500 font-mono text-left shadow-2xl max-w-[210px]"
            style={{ transform: `translate3d(${-mouseOffset.x * 0.25}px, ${mouseOffset.y * 0.25}px, 0)` }}
          >
            <div className="flex items-center gap-1.5 text-[9px] text-cyan-400 uppercase tracking-widest font-bold">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>WEATHER ARMOR</span>
            </div>
            <div className="text-sm font-bold text-white tracking-wide mt-0.5">
              IPX8 ACTIVE MONSOON SEAL
            </div>
            <div className="text-[10px] text-white/50">Submersion & Gale Class 8 Hold</div>
          </div>

          {/* Bottom-Right: Envelope */}
          <div
            className="absolute bottom-16 right-6 p-3 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md transition-transform duration-500 font-mono text-right shadow-2xl max-w-[210px]"
            style={{ transform: `translate3d(${mouseOffset.x * 0.25}px, ${mouseOffset.y * 0.25}px, 0)` }}
          >
            <div className="flex items-center justify-end gap-1.5 text-[9px] text-[#eaa838] uppercase tracking-widest font-bold">
              <span>FLIGHT ENVELOPE</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-white tracking-wide mt-0.5">
              48 MIN • 85 KM/H SPEED
            </div>
            <div className="text-[10px] text-white/50">15 km AES-256 Neural Telemetry</div>
          </div>
        </div>

        {/* HERO PRODUCT VISUAL (CONTAINED WITH SEAMLESS BLENDING) */}
        <div
          className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl h-[240px] sm:h-[320px] md:h-[380px] transition-transform duration-300 ease-out flex items-center justify-center cursor-pointer group my-1 sm:my-2"
          onClick={() => setQuickViewProduct(heroProduct)}
          data-cursor="view"
          style={{
            transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0) rotateX(${
              -mouseOffset.y * 0.15
            }deg) rotateY(${mouseOffset.x * 0.15}deg)`,
            maskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, black 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, black 60%, transparent 100%)",
          }}
        >
          <Image
            src={heroProduct.images[0]}
            alt={heroProduct.name}
            fill
            priority
            className="object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* 5. EDITORIAL HEADLINES & TYPOGRAPHY OVERLAY */}
        <div className="text-center mt-3 sm:mt-5 z-20 space-y-3">
          <p className="text-xs sm:text-sm font-mono tracking-[0.4em] uppercase text-white/60">
            ENGINEERED FOR THE UNEXPECTED • HAUTE CURATION
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none uppercase font-display drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
            YOUR STORY <span className="text-gold-shimmer">ANYWHERE</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-white/60 max-w-xl mx-auto font-sans leading-relaxed pt-1">
            Ashren brings you premium gadgets, autonomous cinema flight platforms, haute apparel, and fine horology. Scaled for creators across 25,000+ curated pieces.
          </p>
        </div>

        {/* 6. PRIMARY ACTIONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-7 z-20">
          <button
            onClick={() => addToCart(heroProduct)}
            className="group relative px-8 py-4 rounded-full text-black font-extrabold text-xs tracking-[0.25em] uppercase flex items-center gap-3 shadow-[0_0_35px_rgba(234,168,56,0.5)] transition-all hover:scale-105 active:scale-95 bg-gold-gradient hover:bg-gold-gradient-hover"
          >
            <span>SHOP NOW ({formatPrice(heroProduct.price, heroProduct.priceUSD)})</span>
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

      {/* 7. INTEGRATED CATEGORY PORTAL RAIL (MULTI-CATEGORY DISCOVERY) */}
      <div className="w-full max-w-7xl z-10 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <span className="text-white/40 tracking-[0.25em] uppercase text-[10px] shrink-0">
          DISCOVER UNIVERSES [05 DOMAINS]:
        </span>

        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar justify-start md:justify-end">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.09] border border-white/5 hover:border-[#eaa838]/50 text-white/70 hover:text-white transition-all whitespace-nowrap text-[11px] tracking-wider"
            >
              <span className="text-[#eaa838] mr-1.5">{c.number}</span>
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
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
                    ASHREN CINEMA DIVISION // 4K PRORES LAUNCH FOOTAGE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white">
                    ICELANDIC STORM EXPEDITION
                  </h3>
                  <p className="text-xs text-white/60 max-w-md font-mono mt-2">
                    Shot entirely on the Ashren G-1 Pro in torrential 60-knot sub-zero gales without stabilization rig post-processing.
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
