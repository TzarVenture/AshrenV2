"use client";

import React from "react";
import Link from "next/link";
import { useWeather } from "@/lib/weather-context";
import { useStore } from "@/lib/store";

export default function CinematicFooter() {
  const { weather, theme, temperature, locationName } = useWeather();
  const { currency, toggleCurrency } = useStore();

  return (
    <footer className="w-full bg-[#050608] border-t border-white/5 py-16 sm:py-24 px-4 sm:px-8 font-mono select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-start">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md border border-white/20 bg-white/[0.04] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rotate-45 border-t-2 border-r-2" style={{ borderColor: theme.accent }} />
              </div>
              <span className="text-base font-black tracking-[0.35em] text-white uppercase font-display">
                ASHREN
              </span>
              <span className="text-[9px] font-mono text-[#eaa838] uppercase font-bold tracking-widest">
                HAUTE MARKETPLACE
              </span>
            </div>

            <p className="text-xs text-white/50 font-sans leading-relaxed max-w-sm">
              Scalable multi-category ecommerce platform spanning autonomous 8K cinema flight systems, haute couture apparel, fine horology, and precious jewelry.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-white/40">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
              <span>STATION: {locationName} • {temperature}°C • {weather}</span>
            </div>
          </div>

          {/* Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] text-[#eaa838] uppercase tracking-[0.25em] block font-bold">
              UNIVERSES
            </span>
            <ul className="space-y-2 text-xs text-white/70 font-sans">
              <li><Link href="/category/electronics" className="hover:text-white transition-colors">Optics & Drones</Link></li>
              <li><Link href="/category/fashion" className="hover:text-white transition-colors">Haute Apparel</Link></li>
              <li><Link href="/category/watches" className="hover:text-white transition-colors">Fine Horology</Link></li>
              <li><Link href="/category/jewelry" className="hover:text-white transition-colors">Precious Joaillerie</Link></li>
              <li><Link href="/category/lifestyle" className="hover:text-white transition-colors">Expedition Living</Link></li>
            </ul>
          </div>

          {/* Account & Orders (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] text-[#eaa838] uppercase tracking-[0.25em] block font-bold">
              CLIENT SERVICES
            </span>
            <ul className="space-y-2 text-xs text-white/70 font-sans">
              <li><Link href="/account" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link href="/account" className="hover:text-white transition-colors">Client Wishlist</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Catalog Search</Link></li>
              <li><Link href="/checkout" className="hover:text-white transition-colors">Direct Allocation</Link></li>
            </ul>
          </div>

          {/* Preferences (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] text-[#eaa838] uppercase tracking-[0.25em] block font-bold">
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
            © {new Date().getFullYear()} ASHREN HAUTE MARKETPLACE LLC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span>DGCA CATEGORY A CERTIFIED</span>
            <span>•</span>
            <span>COSC CHRONOMETER SPECS</span>
            <span>•</span>
            <span>TERMS OF DISPATCH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
