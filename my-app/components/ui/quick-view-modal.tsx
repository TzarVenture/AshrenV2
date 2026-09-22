"use client";

import React from "react";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { useWeather } from "@/lib/weather-context";
import { X, Check, Shield, ArrowRight, Radio } from "lucide-react";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, openWhatsAppOrder, formatPrice } = useStore();
  const { config } = useWeather();

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0b0e14] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 grid grid-cols-1 md:grid-cols-12 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/60 border border-white/15 text-white/70 hover:text-white hover:bg-black/90 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Column */}
        <div className="md:col-span-6 relative min-h-[320px] md:min-h-[500px] bg-gradient-to-b from-[#141824] to-[#080a0f] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
          {/* Subtle atmospheric glow behind product */}
          <div
            className="absolute w-[280px] h-[280px] rounded-full blur-[80px] pointer-events-none opacity-40"
            style={{ backgroundColor: config.accent }}
          />

          <div className="relative w-full h-full max-h-[360px] flex items-center justify-center">
            <Image
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              fill
              className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Telemetry Tag */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md">
            <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
            <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
              {quickViewProduct.badge || "AUTONOMOUS SYSTEM"}
            </span>
          </div>
        </div>

        {/* Technical Specs & Action Column */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase block mb-1">
                {quickViewProduct.series}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {quickViewProduct.name}
              </h3>
              <p className="text-xs font-mono text-white/60 mt-1">
                {quickViewProduct.tagline}
              </p>
            </div>

            <div className="text-xl font-bold font-mono" style={{ color: config.accent }}>
              {formatPrice(quickViewProduct.priceINR, quickViewProduct.priceUSD)}
            </div>

            <p className="text-xs text-white/60 leading-relaxed font-sans">
              {quickViewProduct.description}
            </p>

            {/* Hardware Telemetry Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono">
                <span className="text-[9px] text-white/40 uppercase block">RESOLUTION</span>
                <span className="text-xs font-bold text-white tracking-wide">
                  {quickViewProduct.specs.resolution}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono">
                <span className="text-[9px] text-white/40 uppercase block">STABILIZATION</span>
                <span className="text-xs font-bold text-white tracking-wide">
                  {quickViewProduct.specs.stabilization}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono">
                <span className="text-[9px] text-white/40 uppercase block">SENSOR ARRAY</span>
                <span className="text-xs font-bold text-white tracking-wide">
                  {quickViewProduct.specs.sensor}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono">
                <span className="text-[9px] text-white/40 uppercase block">WEATHER SEAL</span>
                <span className="text-xs font-bold text-white tracking-wide">
                  {quickViewProduct.specs.weatherRating}
                </span>
              </div>
            </div>

            {/* Highlights List */}
            <ul className="space-y-1.5 pt-1">
              {quickViewProduct.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2 text-[11px] text-white/70">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                addToCart(quickViewProduct);
                setQuickViewProduct(null);
              }}
              className="w-full py-3.5 px-6 rounded-full text-black font-extrabold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-xl transition-transform hover:scale-[1.01] active:scale-[0.99]"
              style={{ backgroundColor: config.accent }}
            >
              <span>ACQUIRE INSTRUMENT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openWhatsAppOrder(quickViewProduct)}
              className="w-full py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-medium text-xs tracking-wider uppercase transition-colors"
            >
              ORDER DIRECT VIA WHATSAPP →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
