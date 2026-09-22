"use client";

import React, { useState } from "react";
import { useWeather } from "@/lib/weather-context";
import { WeatherCondition, TimeOfDay } from "@/services/products/types";
import { CloudRain, Sun, CloudLightning, Moon, Cloud, Snowflake, Wind, Compass, ChevronDown, Sliders } from "lucide-react";

export default function DevWeatherBar() {
  const {
    weather,
    setWeather,
    timeOfDay,
    setTimeOfDay,
    theme,
    temperature,
    locationName,
    isAuto,
    fetchRealWeather,
  } = useWeather();
  const [isOpen, setIsOpen] = useState(false);

  const weatherOptions: { type: WeatherCondition; label: string; icon: React.ReactNode }[] = [
    { type: "CLEAR", label: "CLEAR / SUN", icon: <Sun className="w-3 h-3" /> },
    { type: "RAIN", label: "MONSOON", icon: <CloudRain className="w-3 h-3" /> },
    { type: "HEAVY_RAIN", label: "TORRENTIAL", icon: <CloudRain className="w-3 h-3" /> },
    { type: "STORM", label: "THUNDERSTORM", icon: <CloudLightning className="w-3 h-3" /> },
    { type: "FOG", label: "VALLEY MIST", icon: <Wind className="w-3 h-3" /> },
    { type: "SNOW", label: "ARCTIC SNOW", icon: <Snowflake className="w-3 h-3" /> },
    { type: "NIGHT", label: "NOCTURNE", icon: <Moon className="w-3 h-3" /> },
    { type: "CLOUDY", label: "OVERCAST", icon: <Cloud className="w-3 h-3" /> },
  ];

  const timeOptions: TimeOfDay[] = ["MORNING", "AFTERNOON", "EVENING", "NIGHT"];

  return (
    <aside aria-label="Dev Weather Simulation Controls" className="fixed bottom-5 right-5 z-[90] font-sans">
      <div className="flex flex-col items-end">
        {isOpen && (
          <div className="mb-2 p-3.5 rounded-2xl bg-[#0a0c12]/95 border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col gap-2.5 min-w-[280px] animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.accent }} />
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase font-tech">
                  WEATHER & TIME SIMULATOR
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white p-1 transition-colors"
                title="Collapse toolbar"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Current status */}
            <div className="text-[11px] text-white/70 flex items-center justify-between font-mono bg-white/[0.04] p-1.5 rounded-lg border border-white/5">
              <span className="truncate max-w-[140px] text-white/90">{locationName}</span>
              <span className="font-bold" style={{ color: theme.accent }}>
                {temperature}°C • {weather}
              </span>
            </div>

            {/* Time of Day Switcher */}
            <div>
              <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block mb-1">
                TIME OF DAY
              </span>
              <div className="grid grid-cols-4 gap-1">
                {timeOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeOfDay(t)}
                    className={`py-1 text-[9px] font-mono rounded-md uppercase transition-all ${
                      timeOfDay === t
                        ? "bg-white text-black font-extrabold shadow"
                        : "bg-white/[0.04] text-white/50 hover:text-white"
                    }`}
                  >
                    {t.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Weather Buttons */}
            <div>
              <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block mb-1">
                ATMOSPHERIC CONDITION
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {weatherOptions.map((opt) => {
                  const isActive = weather === opt.type && !isAuto;
                  return (
                    <button
                      key={opt.type}
                      onClick={() => setWeather(opt.type)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-medium transition-all text-left ${
                        isActive
                          ? "bg-white/15 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                          : "bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white border border-transparent"
                      }`}
                    >
                      <span style={{ color: isActive ? theme.accent : "inherit" }}>{opt.icon}</span>
                      <span className="truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Real Geolocation Weather Sync Button */}
            <button
              onClick={() => fetchRealWeather()}
              className={`w-full mt-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[10px] font-semibold tracking-wider uppercase transition-all ${
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
            <Sliders className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            <span className="text-xs font-mono tracking-wider font-semibold">
              WEATHER: {weather} ({temperature}°C)
            </span>
          </button>
        )}
      </div>
    </aside>
  );
}
