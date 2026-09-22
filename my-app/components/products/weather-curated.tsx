"use client";

import React from "react";
import Image from "next/image";
import { useWeather } from "@/lib/weather-context";
import { useStore } from "@/lib/store";
import { PRODUCTS, ProductItem } from "@/lib/data";
import { ShieldCheck, CloudRain, Sun, CloudLightning, Moon, Cloud, ArrowRight, ShoppingBag } from "lucide-react";

export default function WeatherCurated() {
  const { weather, config, temperature, locationName } = useWeather();
  const { addToCart, setQuickViewProduct, formatPrice } = useStore();

  const getWeatherTitle = () => {
    switch (weather) {
      case "RAIN":
        return {
          headline: "RAIN READY",
          subtitle: "HYDROPHOBIC OPTICS & SEALS CURATED FOR CURRENT MONSOON",
          icon: <CloudRain className="w-5 h-5 text-sky-400" />,
        };
      case "STORM":
        return {
          headline: "BUILT FOR THE ELEMENTS",
          subtitle: "HIGH-TORQUE GALE STABILIZATION & EMERGENCY PARACHUTE ENVELOPES",
          icon: <CloudLightning className="w-5 h-5 text-violet-400" />,
        };
      case "CLEAR":
        return {
          headline: "OUTSIDE TODAY",
          subtitle: "HIGH-CONTRAST DYNAMIC RANGE & POLARIZED CINEMA FLARES",
          icon: <Sun className="w-5 h-5 text-amber-400" />,
        };
      case "NIGHT":
        return {
          headline: "AFTER DARK",
          subtitle: "DUAL-NATIVE ISO 12,800 SENSORS FOR DEEP TWILIGHT CAPTURE",
          icon: <Moon className="w-5 h-5 text-blue-300" />,
        };
      default:
        return {
          headline: "SELECTED FOR RIGHT NOW",
          subtitle: "OPTIMIZED IMAGING INSTRUMENTS ADAPTED TO CURRENT SENSOR CONDITIONS",
          icon: <Cloud className="w-5 h-5 text-slate-300" />,
        };
    }
  };

  const currentTheme = getWeatherTitle();

  // Filter products by weather affinity, fallback to all
  const curatedProducts = PRODUCTS.filter((p) => p.weatherAffinity.includes(weather));
  const displayProducts = curatedProducts.length > 0 ? curatedProducts : PRODUCTS;

  return (
    <section
      id="weather-curated"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 border-t border-white/5 select-none transition-colors duration-1000"
      style={{
        background: `linear-gradient(180deg, transparent 0%, ${config.bgGradStart} 50%, transparent 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header telemetry badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/10 pb-6 mb-12 gap-4 font-mono">
          <div>
            <div className="flex items-center gap-2.5 text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: config.accent }}>
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
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: config.accent }} />
            <span className="text-white/70 font-mono">
              LOCAL TELEMETRY: {locationName.split(",")[0]} • {temperature}°C • {config.label}
            </span>
          </div>
        </div>

        {/* Curated Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="relative rounded-3xl bg-[#0d0f16]/90 border border-white/10 hover:border-white/30 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] group"
            >
              {/* Weather affinity pill */}
              <div className="p-6 flex items-center justify-between border-b border-white/5">
                <span
                  className="text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase font-bold"
                  style={{ backgroundColor: `${config.accent}20`, color: config.accent }}
                >
                  OPTIMIZED FOR {weather}
                </span>
                <span className="text-xs font-mono text-white/40">
                  {product.specs.weatherRating}
                </span>
              </div>

              {/* Product Visual */}
              <div
                className="relative w-full h-56 p-6 flex items-center justify-center cursor-pointer"
                onClick={() => setQuickViewProduct(product)}
                data-cursor="view"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${config.accent} 0%, transparent 70%)`,
                  }}
                />
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Details & CTA */}
              <div className="p-6 bg-black/40 border-t border-white/5 space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-white uppercase tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/50 font-sans mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-base font-bold font-mono" style={{ color: config.accent }}>
                    {formatPrice(product.priceINR, product.priceUSD)}
                  </span>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ACQUIRE</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
