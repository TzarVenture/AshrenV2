"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useWeather } from "@/lib/weather-context";
import { useStore } from "@/lib/store";
import { MOCK_PRODUCTS } from "@/data/products.mock";
import { Clock, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";

export default function MidnightDrop() {
  const { theme } = useWeather();
  const { addToCart, setQuickViewProduct, formatPrice } = useStore();

  // Live ticking countdown
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 39 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProduct = MOCK_PRODUCTS[1]; // Pocket C-2 or Horology

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-8 border-t border-white/5 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-[#12151f] via-[#0d0f17] to-[#07080c] border border-white/10 p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        {/* Glow ambient */}
        <div
          className="absolute -right-20 -top-20 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none opacity-30"
          style={{ backgroundColor: theme.accent }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Text & Countdown Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono tracking-[0.25em] text-[#eaa838] uppercase font-bold flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#eaa838]" />
                LIMITED ALLOCATION WINDOW
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white uppercase tracking-tight leading-none">
              MIDNIGHT DROP <br />
              <span className="text-gold-shimmer">// SERIES ALLOCATION</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/60 font-sans max-w-lg leading-relaxed">
              Curated flash allocation for the Ashren Pocket C-2 with complimentary Anamorphic MK III lens mount and 2-year expedited warranty.
            </p>

            {/* Premium Countdown Numbers */}
            <div className="flex items-center gap-4 sm:gap-6 font-mono pt-2">
              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-black/60 border border-white/10 min-w-[70px] sm:min-w-[85px]">
                <span className="text-2xl sm:text-4xl font-extrabold text-white">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest mt-1">HOURS</span>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-white/30">:</span>
              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-black/60 border border-white/10 min-w-[70px] sm:min-w-[85px]">
                <span className="text-2xl sm:text-4xl font-extrabold text-white">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest mt-1">MINUTES</span>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-white/30">:</span>
              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-black/60 border border-white/10 min-w-[70px] sm:min-w-[85px]">
                <span className="text-2xl sm:text-4xl font-extrabold text-[#eaa838]">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest mt-1">SECONDS</span>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => addToCart(dealProduct)}
                className="px-7 py-3.5 rounded-full text-black font-extrabold text-xs tracking-[0.2em] uppercase flex items-center gap-2.5 shadow-xl transition-transform hover:scale-105 bg-gold-gradient hover:bg-gold-gradient-hover"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>SECURE DROP ({formatPrice(dealProduct.price, dealProduct.priceUSD)})</span>
              </button>

              <button
                onClick={() => setQuickViewProduct(dealProduct)}
                className="text-xs font-mono text-white/60 hover:text-white uppercase tracking-wider py-2"
              >
                TELEMETRY →
              </button>
            </div>
          </div>

          {/* Product Visual Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[280px] sm:min-h-[380px]">
            <div className="relative w-full h-72 sm:h-96">
              <Image
                src={dealProduct.images[0]}
                alt={dealProduct.name}
                fill
                className="object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
