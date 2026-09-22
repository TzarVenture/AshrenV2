"use client";

import React, { useState } from "react";
import { useWeather, WeatherType } from "@/lib/weather-context";
import { Cloud, CloudLightning, CloudRain, Eye, Compass, Moon, Sun, Sparkles, Sliders, ChevronDown } from "lucide-react";

export default function DevWeatherBar() {
  const { weather, setWeather, config, temperature, locationName, isAuto, fetchRealWeather } = useWeather();
  const [isOpen, setIsOpen] = useState(true);

  const weatherOptions: { type: WeatherType; label: string; icon: React.ReactNode }[] = [
    { type: "CLEAR", label: "CLEAR / SUN", icon: <Sun className="w-3.5 h-3.5" /> },
    { type: "RAIN", label: "RAIN", icon: <CloudRain className="w-3.5 h-3.5" /> },
    { type: "STORM", label: "STORM", icon: <CloudLightning className="w-3.5 h-3.5" /> },
    { type: "FOG", label: "FOG", icon: <Cloud className="w-3.5 h-3.5" /> },
    { type: "NIGHT", label: "NIGHT", icon: <Moon className="w-3.5 h-3.5" /> },
    { type: "CLOUDY", label: "CLOUDY", icon: <Cloud className="w-3.5 h-3.5" /> },
  ];

  return (
    <aside aria-label="Weather Environment Studio" className="fixed bottom-5 right-5 z-[90] font-sans">
      <div className="flex flex-col items-end">
        {isOpen && (
          <div className="mb-2 p-3 rounded-2xl bg-[#0b0d13]/90 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-2.5 min-w-[260px] animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: config.accent }} />
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase font-tech">
                  WEATHER ENGINE PREVIEW
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors p-1"
                title="Collapse toolbar"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Current status */}
            <div className="text-[11px] text-white/70 flex items-center justify-between font-mono bg-white/[0.04] p-1.5 rounded-lg border border-white/5">
              <span className="truncate max-w-[140px] text-white/90">{locationName}</span>
              <span className="font-bold" style={{ color: config.accent }}>
                {temperature}°C • {config.name}
              </span>
            </div>

            {/* Weather Buttons */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {weatherOptions.map((opt) => {
                const isActive = weather === opt.type && !isAuto;
                return (
                  <button
                    key={opt.type}
                    onClick={() => setWeather(opt.type)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-all text-left ${
                      isActive
                        ? "bg-white/15 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        : "bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white border border-transparent"
                    }`}
                  >
                    <span style={{ color: isActive ? config.accent : "inherit" }}>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Real Geolocation Weather Sync Button */}
            <button
              onClick={() => fetchRealWeather()}
              className={`w-full mt-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[11px] font-semibold tracking-wider uppercase transition-all ${
                isAuto
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{isAuto ? "LIVE GPS SYNC ACTIVE" : "DETECT LIVE WEATHER (GPS)"}</span>
            </button>
          </div>
        )}

        {/* Minimal Toggle Pill */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0d0f17]/90 border border-white/20 text-white/80 hover:text-white shadow-2xl backdrop-blur-xl transition-transform hover:scale-105"
          >
            <Sliders className="w-3.5 h-3.5" style={{ color: config.accent }} />
            <span className="text-xs font-mono tracking-wider font-semibold">
              WEATHER: {weather} ({temperature}°C)
            </span>
          </button>
        )}
      </div>
    </aside>
  );
}
