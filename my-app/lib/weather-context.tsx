"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type WeatherType = "CLEAR" | "RAIN" | "STORM" | "FOG" | "NIGHT" | "CLOUDY";

export interface WeatherThemeConfig {
  name: string;
  label: string;
  tagline: string;
  accent: string;
  accentGlow: string;
  bgGradStart: string;
  bgGradEnd: string;
  ambientLight: string;
  temperature: number;
  conditionDescription: string;
}

export const WEATHER_CONFIGS: Record<WeatherType, WeatherThemeConfig> = {
  CLEAR: {
    name: "CLEAR",
    label: "Golden Horizon",
    tagline: "Natural sunlight. Pure optical clarity.",
    accent: "#E5A93C",
    accentGlow: "rgba(229, 169, 60, 0.45)",
    bgGradStart: "#12110e",
    bgGradEnd: "#07080b",
    ambientLight: "rgba(229, 169, 60, 0.12)",
    temperature: 28,
    conditionDescription: "Optimal conditions for 8K HDR capture",
  },
  RAIN: {
    name: "RAIN",
    label: "Atmospheric Rain",
    tagline: "Hydrophobic seals engaged. Cinematic reflections.",
    accent: "#6BA5E7",
    accentGlow: "rgba(107, 165, 231, 0.45)",
    bgGradStart: "#0a111a",
    bgGradEnd: "#06080e",
    ambientLight: "rgba(107, 165, 231, 0.12)",
    temperature: 21,
    conditionDescription: "IPX8 waterproof optics active",
  },
  STORM: {
    name: "STORM",
    label: "Thunderstorm Front",
    tagline: "Heavy precipitation & gusts. High-torque gyro stabilization.",
    accent: "#A78BFA",
    accentGlow: "rgba(167, 139, 250, 0.55)",
    bgGradStart: "#0d0a18",
    bgGradEnd: "#050508",
    ambientLight: "rgba(167, 139, 250, 0.18)",
    temperature: 19,
    conditionDescription: "Turbulence compensation enabled",
  },
  FOG: {
    name: "FOG",
    label: "Valley Mist",
    tagline: "Diffused lighting. Deep shadow gradation.",
    accent: "#94A3B8",
    accentGlow: "rgba(148, 163, 184, 0.4)",
    bgGradStart: "#10141a",
    bgGradEnd: "#08090d",
    ambientLight: "rgba(148, 163, 184, 0.1)",
    temperature: 17,
    conditionDescription: "LiDAR penetration active",
  },
  NIGHT: {
    name: "NIGHT",
    label: "Deep Obsidian",
    tagline: "Dual-native ISO 12,800. Starlight illumination.",
    accent: "#60A5FA",
    accentGlow: "rgba(96, 165, 250, 0.45)",
    bgGradStart: "#060914",
    bgGradEnd: "#040508",
    ambientLight: "rgba(96, 165, 250, 0.1)",
    temperature: 15,
    conditionDescription: "Ultra-low-noise sensor array",
  },
  CLOUDY: {
    name: "CLOUDY",
    label: "Overcast Slate",
    tagline: "Balanced ambient lighting. Zero harsh glares.",
    accent: "#CBD5E1",
    accentGlow: "rgba(203, 213, 225, 0.35)",
    bgGradStart: "#0e1117",
    bgGradEnd: "#07080b",
    ambientLight: "rgba(203, 213, 225, 0.08)",
    temperature: 23,
    conditionDescription: "Uniform color temperature 5600K",
  },
};

interface WeatherContextType {
  weather: WeatherType;
  setWeather: (w: WeatherType) => void;
  config: WeatherThemeConfig;
  temperature: number;
  locationName: string;
  isAuto: boolean;
  setIsAuto: (auto: boolean) => void;
  fetchRealWeather: () => Promise<void>;
  isStormFlash: boolean;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weather, setWeatherState] = useState<WeatherType>("RAIN");
  const [temperature, setTemperature] = useState<number>(24);
  const [locationName, setLocationName] = useState<string>("Mumbai, IN");
  const [isAuto, setIsAuto] = useState<boolean>(false);
  const [isStormFlash, setIsStormFlash] = useState<boolean>(false);

  const setWeather = useCallback((newWeather: WeatherType) => {
    setWeatherState(newWeather);
    setIsAuto(false);
  }, []);

  // Storm lightning periodic trigger
  useEffect(() => {
    if (weather !== "STORM") {
      setIsStormFlash(false);
      return;
    }

    const interval = setInterval(() => {
      // Random lightning flash every 6 to 14 seconds
      if (Math.random() > 0.4) {
        setIsStormFlash(true);
        setTimeout(() => setIsStormFlash(false), 120);
        setTimeout(() => {
          if (Math.random() > 0.5) {
            setIsStormFlash(true);
            setTimeout(() => setIsStormFlash(false), 80);
          }
        }, 180);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [weather]);

  // Real weather fetcher from Open-Meteo
  const fetchRealWeather = useCallback(async () => {
    try {
      if (!("geolocation" in navigator)) {
        setLocationName("Mumbai, IN (Default)");
        setWeatherState("RAIN");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          try {
            // 1. Fetch weather from Open-Meteo free API
            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&current=temperature_2m,weather_code,is_day&timezone=auto`
            );
            if (!res.ok) throw new Error("Weather API error");
            const data = await res.json();
            const current = data.current;

            if (current) {
              setTemperature(Math.round(current.temperature_2m));
              const code = current.weather_code;
              const isDay = current.is_day === 1;

              // Map WMO weather codes
              let mappedWeather: WeatherType = "CLEAR";
              if (code >= 95) mappedWeather = "STORM";
              else if (code >= 51 || code >= 80) mappedWeather = "RAIN";
              else if (code === 45 || code === 48) mappedWeather = "FOG";
              else if (code >= 2) mappedWeather = "CLOUDY";
              else mappedWeather = isDay ? "CLEAR" : "NIGHT";

              setWeatherState(mappedWeather);
              setIsAuto(true);
            }

            // 2. Reverse geocode city name
            try {
              const geoRes = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`,
                { headers: { "User-Agent": "Aetheria-Optics-App" } }
              );
              if (geoRes.ok) {
                const geoData = await geoRes.json();
                const city =
                  geoData.address?.city ||
                  geoData.address?.town ||
                  geoData.address?.village ||
                  geoData.address?.state ||
                  "Local Coordinates";
                const country = geoData.address?.country_code?.toUpperCase() || "";
                setLocationName(`${city}${country ? `, ${country}` : ""}`);
              }
            } catch {
              setLocationName(`${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`);
            }
          } catch {
            setWeatherState("RAIN");
            setLocationName("Reykjavík, IS");
          }
        },
        () => {
          // On permission denied or timeout
          setLocationName("Mumbai, IN (Preset)");
          setWeatherState("RAIN");
        },
        { timeout: 8000 }
      );
    } catch {
      setWeatherState("RAIN");
      setLocationName("Mumbai, IN");
    }
  }, []);

  const config = WEATHER_CONFIGS[weather];

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        config,
        temperature,
        locationName,
        isAuto,
        setIsAuto,
        fetchRealWeather,
        isStormFlash,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
