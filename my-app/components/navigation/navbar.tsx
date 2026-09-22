"use client";

import React, { useState, useEffect } from "react";
import { useWeather } from "@/lib/weather-context";
import { useStore } from "@/lib/store";
import { ShoppingBag, Search, Compass, CloudRain, Sun, CloudLightning, Moon, Cloud, X, Heart } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { weather, config, temperature, locationName, setWeather } = useWeather();
  const { totalCount, setIsCartOpen, wishlist } = useStore();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getWeatherIcon = () => {
    switch (weather) {
      case "RAIN": return <CloudRain className="w-3.5 h-3.5 text-sky-400" />;
      case "STORM": return <CloudLightning className="w-3.5 h-3.5 text-violet-400" />;
      case "CLEAR": return <Sun className="w-3.5 h-3.5 text-amber-400" />;
      case "NIGHT": return <Moon className="w-3.5 h-3.5 text-blue-300" />;
      default: return <Cloud className="w-3.5 h-3.5 text-gray-300" />;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-4 sm:px-8 pt-4 pb-3 flex justify-center pointer-events-none">
      <div
        className={`w-full max-w-7xl flex items-center justify-between pointer-events-auto transition-all duration-500 rounded-full px-5 py-3 ${
          scrolled
            ? "bg-[#0a0c12]/80 backdrop-blur-2xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            : "bg-transparent border border-transparent"
        }`}
      >
        {/* Brand Logo & Editorial Monogram */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-lg border border-white/20 bg-white/[0.04] flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-2.5 h-2.5 rotate-45 border-t-2 border-r-2" style={{ borderColor: config.accent }} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-[0.35em] text-white uppercase font-display">
              AETHERIA
            </span>
            <span className="text-[8px] font-mono tracking-[0.25em] text-white/40 uppercase">
              OPTICAL SYSTEMS
            </span>
          </div>
        </a>

        {/* Minimal Editorial Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#instruments"
            className="text-xs font-mono tracking-[0.2em] text-white/60 hover:text-white uppercase transition-colors"
          >
            INSTRUMENTS
          </a>
          <a
            href="#story"
            className="text-xs font-mono tracking-[0.2em] text-white/60 hover:text-white uppercase transition-colors"
          >
            ARCHITECTURE
          </a>
          <a
            href="#weather-curated"
            className="text-xs font-mono tracking-[0.2em] text-white/60 hover:text-white uppercase transition-colors"
          >
            ELEMENTS
          </a>
          <a
            href="#expedition"
            className="text-xs font-mono tracking-[0.2em] text-white/60 hover:text-white uppercase transition-colors"
          >
            WORLDS
          </a>
          <a
            href="#reviews"
            className="text-xs font-mono tracking-[0.2em] text-white/60 hover:text-white uppercase transition-colors"
          >
            DISPATCHES
          </a>
        </nav>

        {/* Right Utility Matrix */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Weather Location Capsule */}
          <div
            title="Click to cycle atmospheric condition"
            onClick={() => {
              const modes: ("CLEAR" | "RAIN" | "STORM" | "FOG" | "NIGHT" | "CLOUDY")[] = [
                "RAIN", "STORM", "CLEAR", "NIGHT", "FOG", "CLOUDY"
              ];
              const nextIndex = (modes.indexOf(weather) + 1) % modes.length;
              setWeather(modes[nextIndex]);
            }}
            className="cursor-pointer hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all text-[11px] font-mono"
          >
            <span className="animate-pulse">{getWeatherIcon()}</span>
            <span className="text-white/80 font-medium truncate max-w-[110px]">
              {locationName.split(",")[0]}
            </span>
            <span className="text-white/40">•</span>
            <span style={{ color: config.accent }} className="font-bold">
              {temperature}°C
            </span>
          </div>

          {/* Minimal Search Toggle */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-[#0d1017] border border-white/20 rounded-full px-3 py-1 animate-in fade-in zoom-in-95 duration-200">
                <Search className="w-3.5 h-3.5 text-white/40 mr-2" />
                <input
                  type="text"
                  placeholder="Search 8K, titanium, pocket..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-white/40 focus:outline-none w-36 sm:w-48 font-mono"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-white/40 hover:text-white ml-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
                title="Search equipment"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist Indicator */}
          <a
            href="#instruments"
            className="hidden sm:flex p-2 rounded-full text-white/60 hover:text-red-400 hover:bg-white/[0.06] transition-colors relative"
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? "fill-white/10 text-white/60" : ""}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-400" />
            )}
          </a>

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white transition-all hover:scale-105 active:scale-95 shadow-md"
            title="Open Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" style={{ color: config.accent }} />
            <span className="text-[11px] font-mono tracking-wider font-bold">
              BAG
            </span>
            <span
              className="text-[10px] font-mono font-black px-1.5 py-0.2 rounded-full text-black"
              style={{ backgroundColor: config.accent }}
            >
              {totalCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
