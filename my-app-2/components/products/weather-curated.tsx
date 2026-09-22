"use client";

import React, { useEffect, useState } from "react";
import { useWeather } from "@/lib/weather-context";
import { ProductService } from "@/services/products/productService";
import { Product } from "@/services/products/types";
import ProductCard from "./product-card";
import { CloudRain, Sun, CloudLightning, Moon, Cloud, Snowflake, Wind } from "lucide-react";

export default function WeatherCurated() {
  const { weather, theme, temperature, locationName } = useWeather();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductService.getWeatherAdaptiveProducts(weather, 3).then(setProducts);
  }, [weather]);

  const getWeatherTitle = () => {
    switch (weather) {
      case "RAIN":
      case "HEAVY_RAIN":
        return {
          headline: "RAIN READY",
          subtitle: "HYDROPHOBIC OPTICS & SEALS CURATED FOR ACTIVE MONSOON CONDITIONS",
          icon: <CloudRain className="w-5 h-5 text-sky-400" />,
        };
      case "STORM":
        return {
          headline: "BUILT FOR THE ELEMENTS",
          subtitle: "CLASS 8 GALE STABILIZATION & EMERGENCY PARACHUTE ENVELOPES",
          icon: <CloudLightning className="w-5 h-5 text-violet-400" />,
        };
      case "CLEAR":
        return {
          headline: "OUTSIDE TODAY",
          subtitle: "HIGH-CONTRAST DYNAMIC RANGE & POLARIZED ANAMORPHIC FLARES",
          icon: <Sun className="w-5 h-5 text-amber-400" />,
        };
      case "SNOW":
        return {
          headline: "SUB-ZERO EXPEDITION",
          subtitle: "HEATED CARBON CELLS OPERATIONAL DOWN TO -30°C",
          icon: <Snowflake className="w-5 h-5 text-cyan-200" />,
        };
      case "NIGHT":
        return {
          headline: "AFTER DARK",
          subtitle: "DUAL-NATIVE ISO 12,800 LOW-NOISE SENSORS & LUMINOUS METROLOGY",
          icon: <Moon className="w-5 h-5 text-amber-400" />,
        };
      default:
        return {
          headline: "SELECTED FOR RIGHT NOW",
          subtitle: "OPTIMIZED PIECES ADAPTED TO CURRENT SENSOR TELEMETRY",
          icon: <Cloud className="w-5 h-5 text-slate-300" />,
        };
    }
  };

  const currentTheme = getWeatherTitle();

  return (
    <section
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 border-t border-white/5 select-none transition-colors duration-1000"
      style={{
        background: `linear-gradient(180deg, transparent 0%, ${theme.bgGradStart} 50%, transparent 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/10 pb-6 mb-12 gap-4 font-mono">
          <div>
            <div className="flex items-center gap-2.5 text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: theme.accent }}>
              {currentTheme.icon}
              <span>ENVIRONMENTAL ADAPTATION // 05</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
              {currentTheme.headline}
            </h2>
            <p className="text-xs text-white/50 font-mono mt-2 tracking-wider">
              {currentTheme.subtitle}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md flex items-center gap-3 text-xs">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.accent }} />
            <span className="text-white/70 font-mono">
              TELEMETRY: {locationName.split(",")[0]} • {temperature}°C • {theme.label}
            </span>
          </div>
        </div>

        {/* Curated Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
