"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { WeatherCondition, TimeOfDay } from "@/services/products/types";

export interface WeatherThemeConfig {
  name: WeatherCondition;
  label: string;
  tagline: string;
  accent: string;
  accentGlow: string;
  bgGradStart: string;
  bgGradEnd: string;
  ambientLight: string;
  defaultTemp: number;
  conditionDescription: string;
}

export const ASHREN_WEATHER_THEMES: Record<WeatherCondition, WeatherThemeConfig> = {
  CLEAR: {
    name: "CLEAR",
    label: "Solar Gold",
    tagline: "Natural daylight. Calibrated 5600K optical brilliance.",
    accent: "#EAA838",
    accentGlow: "rgba(234, 168, 56, 0.45)",
    bgGradStart: "#14110b",
    bgGradEnd: "#07080b",
    ambientLight: "rgba(234, 168, 56, 0.12)",
    defaultTemp: 29,
    conditionDescription: "Optimal 8K HDR and haute fabric clarity",
  },
  CLOUDY: {
    name: "CLOUDY",
    label: "Overcast Slate",
    tagline: "Diffused sky illumination. Zero specular glare.",
    accent: "#D4D4D8",
    accentGlow: "rgba(212, 212, 216, 0.35)",
    bgGradStart: "#101218",
    bgGradEnd: "#07080b",
    ambientLight: "rgba(212, 212, 216, 0.08)",
    defaultTemp: 24,
    conditionDescription: "Balanced ambient lighting across all silhouettes",
  },
  RAIN: {
    name: "RAIN",
    label: "Monsoon Mist",
    tagline: "Hydrophobic seals active. Wet asphalt reflections.",
    accent: "#60A5FA",
    accentGlow: "rgba(96, 165, 250, 0.45)",
    bgGradStart: "#0a101a",
    bgGradEnd: "#05070c",
    ambientLight: "rgba(96, 165, 250, 0.12)",
    defaultTemp: 22,
    conditionDescription: "IPX8 waterproof optics & membrane outerwear",
  },
  HEAVY_RAIN: {
    name: "HEAVY_RAIN",
    label: "Torrential Rain",
    tagline: "Dense precipitation. Gale shear compensation engaged.",
    accent: "#38BDF8",
    accentGlow: "rgba(56, 189, 248, 0.5)",
    bgGradStart: "#070d18",
    bgGradEnd: "#04060a",
    ambientLight: "rgba(56, 189, 248, 0.16)",
    defaultTemp: 20,
    conditionDescription: "Extreme weather sealing and thermal protection",
  },
  STORM: {
    name: "STORM",
    label: "Thunderstorm Front",
    tagline: "Atmospheric lightning & turbulence. Decoupled horizon lock.",
    accent: "#A78BFA",
    accentGlow: "rgba(167, 139, 250, 0.6)",
    bgGradStart: "#0d091a",
    bgGradEnd: "#040308",
    ambientLight: "rgba(167, 139, 250, 0.2)",
    defaultTemp: 18,
    conditionDescription: "Class 8 gale stabilization and emergency envelopes",
  },
  FOG: {
    name: "FOG",
    label: "Valley Mist",
    tagline: "Low-hanging clouds. LiDAR active scanning.",
    accent: "#94A3B8",
    accentGlow: "rgba(148, 163, 184, 0.4)",
    bgGradStart: "#0f131a",
    bgGradEnd: "#07090e",
    ambientLight: "rgba(148, 163, 184, 0.1)",
    defaultTemp: 16,
    conditionDescription: "LiDAR depth sensors & spectral contrast filters",
  },
  SNOW: {
    name: "SNOW",
    label: "Arctic Frost",
    tagline: "Sub-zero flight. Heated carbon battery bays active.",
    accent: "#E0F2FE",
    accentGlow: "rgba(224, 242, 254, 0.5)",
    bgGradStart: "#0c131d",
    bgGradEnd: "#05080e",
    ambientLight: "rgba(224, 242, 254, 0.15)",
    defaultTemp: -4,
    conditionDescription: "Sub-zero -30°C heated flight envelope",
  },
  NIGHT: {
    name: "NIGHT",
    label: "Nocturne Graphite",
    tagline: "Starlight & city bokeh. Dual-native ISO 12,800 active.",
    accent: "#F59E0B",
    accentGlow: "rgba(245, 158, 11, 0.4)",
    bgGradStart: "#060812",
    bgGradEnd: "#030408",
    ambientLight: "rgba(245, 158, 11, 0.1)",
    defaultTemp: 19,
    conditionDescription: "Low-light cinema sensors and luminous horology",
  },
};

interface WeatherContextType {
  weather: WeatherCondition;
  setWeather: (w: WeatherCondition) => void;
  timeOfDay: TimeOfDay;
  setTimeOfDay: (t: TimeOfDay) => void;
  theme: WeatherThemeConfig;
  temperature: number;
  locationName: string;
  isAuto: boolean;
  setIsAuto: (auto: boolean) => void;
  fetchRealWeather: () => Promise<void>;
  isStormFlash: boolean;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weather, setWeatherState] = useState<WeatherCondition>("CLEAR");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("AFTERNOON");
  const [temperature, setTemperature] = useState<number>(27);
  const [locationName, setLocationName] = useState<string>("Mumbai, IN");
  const [isAuto, setIsAuto] = useState<boolean>(false);
  const [isStormFlash, setIsStormFlash] = useState<boolean>(false);

  const setWeather = useCallback((newWeather: WeatherCondition) => {
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
      if (Math.random() > 0.35) {
        setIsStormFlash(true);
        setTimeout(() => setIsStormFlash(false), 120);
        setTimeout(() => {
          if (Math.random() > 0.5) {
            setIsStormFlash(true);
            setTimeout(() => setIsStormFlash(false), 90);
          }
        }, 180);
      }
    }, 6500);

    return () => clearInterval(interval);
  }, [weather]);

  // Open-Meteo real weather fetcher
  const fetchRealWeather = useCallback(async () => {
    try {
      if (!("geolocation" in navigator)) {
        setLocationName("Mumbai, IN (Default)");
        setWeatherState("CLEAR");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          try {
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

              // Map Open-Meteo WMO weather codes
              let mappedWeather: WeatherCondition = "CLEAR";
              if (code >= 95) mappedWeather = "STORM";
              else if (code >= 80 || (code >= 61 && code <= 67)) mappedWeather = "HEAVY_RAIN";
              else if (code >= 51 && code <= 57) mappedWeather = "RAIN";
              else if (code >= 71 && code <= 77) mappedWeather = "SNOW";
              else if (code === 45 || code === 48) mappedWeather = "FOG";
              else if (code >= 2) mappedWeather = "CLOUDY";
              else mappedWeather = isDay ? "CLEAR" : "NIGHT";

              setWeatherState(mappedWeather);
              setTimeOfDay(isDay ? "AFTERNOON" : "NIGHT");
              setIsAuto(true);
            }

            // Reverse geocode city name
            try {
              const geoRes = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`,
                { headers: { "User-Agent": "Ashren-Haute-Platform" } }
              );
              if (geoRes.ok) {
                const geoData = await geoRes.json();
                const city =
                  geoData.address?.city ||
                  geoData.address?.town ||
                  geoData.address?.state ||
                  "Local Station";
                const country = geoData.address?.country_code?.toUpperCase() || "";
                setLocationName(`${city}${country ? `, ${country}` : ""}`);
              }
            } catch {
              setLocationName(`${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`);
            }
          } catch {
            setWeatherState("CLEAR");
            setLocationName("Mumbai, IN");
          }
        },
        () => {
          setLocationName("Mumbai, IN (Preset)");
          setWeatherState("CLEAR");
        },
        { timeout: 7000 }
      );
    } catch {
      setWeatherState("CLEAR");
      setLocationName("Mumbai, IN");
    }
  }, []);

  const theme = ASHREN_WEATHER_THEMES[weather];

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        timeOfDay,
        setTimeOfDay,
        theme,
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
