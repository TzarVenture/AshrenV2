"use client";

import React from "react";
import { useWeather } from "@/lib/weather-context";
import { useStore } from "@/lib/store";

export default function CinematicFooter() {
  const { weather, config, temperature, locationName } = useWeather();
  const { currency, toggleCurrency } = useStore();

  return (
    <footer className="w-full bg-[#050608] border-t border-white/5 py-16 sm:py-24 px-4 sm:px-8 font-mono select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-start">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md border border-white/20 bg-white/[0.04] flex items-center justify-center">
                <div className="w-2 h-2 rotate-45 border-t-2 border-r-2" style={{ borderColor: config.accent }} />
              </div>
              <span className="text-base font-black tracking-[0.35em] text-white uppercase font-display">
                AETHERIA
              </span>
            </div>

            <p className="text-xs text-white/50 font-sans leading-relaxed max-w-sm">
              Haute optical engineering and autonomous cinematic flight systems. Designed for creators operating beyond conventional boundaries and weather extremes.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-white/40">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.accent }} />
              <span>STATION: {locationName} • {temperature}°C • {weather}</span>
            </div>
          </div>

          {/* Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] text-white/40 uppercase tracking-[0.25em] block">
              INSTRUMENTATION
            </span>
            <ul className="space-y-2 text-xs text-white/70 font-sans">
              <li><a href="#instruments" className="hover:text-white transition-colors">Aetheria G-1 Pro 8K</a></li>
              <li><a href="#instruments" className="hover:text-white transition-colors">Pocket C-2 Gimbal</a></li>
              <li><a href="#instruments" className="hover:text-white transition-colors">Horizon X Expedition Platform</a></li>
              <li><a href="#instruments" className="hover:text-white transition-colors">Anamorphic MK III Optics</a></li>
              <li><a href="#instruments" className="hover:text-white transition-colors">Hydrophobic Filter Array</a></li>
            </ul>
          </div>

          {/* Worlds Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] text-white/40 uppercase tracking-[0.25em] block">
              DOMAINS
            </span>
            <ul className="space-y-2 text-xs text-white/70 font-sans">
              <li><a href="#expedition" className="hover:text-white transition-colors">Arctic & Desert</a></li>
              <li><a href="#expedition" className="hover:text-white transition-colors">Nocturnal Cinema</a></li>
              <li><a href="#expedition" className="hover:text-white transition-colors">Human Chronicles</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Expedition Logs</a></li>
            </ul>
          </div>

          {/* Preferences (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] text-white/40 uppercase tracking-[0.25em] block">
              PREFERENCES
            </span>
            <div className="space-y-2">
              <button
                onClick={toggleCurrency}
                className="w-full text-left px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-white/80 transition-colors"
              >
                CURRENCY: {currency === "INR" ? "₹ INR" : "$ USD"}
              </button>
              <div className="text-[10px] text-white/40 pt-1">
                COMPLIMENTARY AIR FREIGHT WORLDWIDE
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/30">
          <div>
            © {new Date().getFullYear()} AETHERIA OPTICAL SYSTEMS LLC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span>DGCA CATEGORY A CERTIFIED</span>
            <span>•</span>
            <span>FCC & CE CONFORMITY</span>
            <span>•</span>
            <span>TERMS OF DISPATCH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
