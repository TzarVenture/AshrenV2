"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useWeather } from "@/lib/weather-context";
import { useStore } from "@/lib/store";
import { Search, ShoppingBag, Heart, SlidersHorizontal, CloudRain, Sun, CloudLightning, Moon, Cloud, Snowflake, Wind, X } from "lucide-react";
import { WeatherCondition } from "@/services/products/types";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { weather, theme, temperature, locationName, setWeather } = useWeather();
  const { totalCount, setIsCartOpen, wishlist, currency, toggleCurrency, compareList, setIsCompareOpen } = useStore();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getWeatherIcon = () => {
    switch (weather) {
      case "RAIN":
      case "HEAVY_RAIN":
        return <CloudRain className="w-3.5 h-3.5 text-sky-400" />;
      case "STORM":
        return <CloudLightning className="w-3.5 h-3.5 text-violet-400" />;
      case "CLEAR":
        return <Sun className="w-3.5 h-3.5 text-amber-400" />;
      case "SNOW":
        return <Snowflake className="w-3.5 h-3.5 text-cyan-200" />;
      case "FOG":
        return <Wind className="w-3.5 h-3.5 text-slate-300" />;
      case "NIGHT":
        return <Moon className="w-3.5 h-3.5 text-blue-300" />;
      default:
        return <Cloud className="w-3.5 h-3.5 text-gray-300" />;
    }
  };

  const cycleWeather = () => {
    const list: WeatherCondition[] = ["CLEAR", "RAIN", "STORM", "NIGHT", "SNOW", "FOG", "CLOUDY"];
    const nextIdx = (list.indexOf(weather) + 1) % list.length;
    setWeather(list[nextIdx]);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-4 sm:px-8 pt-4 pb-3 flex justify-center pointer-events-none">
      <div
        className={`w-full max-w-7xl flex items-center justify-between pointer-events-auto transition-all duration-500 rounded-full px-5 py-3 ${
          scrolled
            ? "bg-[#080a10]/85 backdrop-blur-2xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
            : "bg-transparent border border-transparent"
        }`}
      >
        {/* Brand Monogram & Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg border border-white/20 bg-white/[0.04] flex items-center justify-center transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(234,168,56,0.3)]">
            <div className="w-3 h-3 rotate-45 border-t-2 border-r-2" style={{ borderColor: theme.accent }} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-[0.35em] text-white uppercase font-display">
              ASHREN
            </span>
            <span className="text-[7.5px] font-mono tracking-[0.25em] text-[#eaa838] uppercase font-bold">
              HAUTE MARKETPLACE
            </span>
          </div>
        </Link>

        {/* Category Universe Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-[11px] tracking-[0.2em] uppercase">
          <Link href="/category/electronics" className="text-white/60 hover:text-white transition-colors">
            OPTICS & DRONES
          </Link>
          <Link href="/category/fashion" className="text-white/60 hover:text-white transition-colors">
            HAUTE APPAREL
          </Link>
          <Link href="/category/watches" className="text-white/60 hover:text-white transition-colors">
            HOROLOGY
          </Link>
          <Link href="/category/jewelry" className="text-white/60 hover:text-white transition-colors">
            JOAILLERIE
          </Link>
          <Link href="/category/lifestyle" className="text-white/60 hover:text-white transition-colors">
            LIFESTYLE
          </Link>
        </nav>

        {/* Right Matrix: Weather, Currency, Search, Wishlist, Cart */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Live Weather Capsule */}
          <div
            title="Click to cycle atmospheric state"
            onClick={cycleWeather}
            className="cursor-pointer hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all text-[11px] font-mono"
          >
            <span className="animate-pulse">{getWeatherIcon()}</span>
            <span className="text-white/80 font-medium truncate max-w-[95px]">
              {locationName.split(",")[0]}
            </span>
            <span className="text-white/30">•</span>
            <span style={{ color: theme.accent }} className="font-bold">
              {temperature}°C
            </span>
          </div>

          {/* Currency Toggle */}
          <button
            onClick={toggleCurrency}
            className="hidden sm:inline-block px-2.5 py-1 text-[10px] font-mono rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            title="Toggle Currency"
          >
            {currency === "INR" ? "₹ INR" : "$ USD"}
          </button>

          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-[#0d1017] border border-white/20 rounded-full px-3 py-1 animate-in fade-in zoom-in-95 duration-200">
                <Search className="w-3.5 h-3.5 text-white/40 mr-2" />
                <input
                  type="text"
                  placeholder="Search 25k+ products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
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
                title="Search Products"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Compare Indicator */}
          {compareList.length > 0 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors relative"
              title="Compare Products"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
            </button>
          )}

          {/* Wishlist */}
          <Link
            href="/account"
            className="p-2 rounded-full text-white/60 hover:text-red-400 hover:bg-white/[0.06] transition-colors relative"
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? "fill-white/10 text-white/60" : ""}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-400" />
            )}
          </Link>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white transition-all hover:scale-105 active:scale-95 shadow-md"
            title="Open Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            <span className="text-[11px] font-mono tracking-wider font-bold hidden sm:inline">
              BAG
            </span>
            <span
              className="text-[10px] font-mono font-black px-1.5 py-0.2 rounded-full text-black"
              style={{ backgroundColor: theme.accent }}
            >
              {totalCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
