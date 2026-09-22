"use client";

import React from "react";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { useWeather } from "@/lib/weather-context";
import { X, Check, ShoppingBag, ArrowRight } from "lucide-react";

export default function CompareDrawer() {
  const { compareList, removeFromCompare, isCompareOpen, setIsCompareOpen, addToCart, formatPrice } = useStore();
  const { theme } = useWeather();

  if (!isCompareOpen || compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div
        onClick={() => setIsCompareOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
      />

      <div className="relative w-full max-w-5xl bg-[#0a0d14] border border-white/15 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl overflow-x-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6 font-mono">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#eaa838] uppercase block">
              HARDWARE & ATELIER METROLOGY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase font-display">
              PRODUCT COMPARISON MATRIX ({compareList.length}/4)
            </h3>
          </div>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-w-[600px]">
          {compareList.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-4"
            >
              <div className="relative w-full h-36 bg-black/40 rounded-xl overflow-hidden p-2">
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black/60 text-white/50 hover:text-red-400"
                  title="Remove from comparison"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <Image
                  src={product.images[0] || "/assets/hero_drone.jpg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#eaa838] uppercase block">
                  {product.category}
                </span>
                <h4 className="text-sm font-bold text-white font-display truncate">
                  {product.name}
                </h4>
                <div className="text-sm font-bold font-mono mt-1" style={{ color: theme.accent }}>
                  {formatPrice(product.price, product.priceUSD)}
                </div>
              </div>

              {/* Attributes Comparison */}
              <div className="space-y-2 font-mono text-[11px] border-t border-white/5 pt-3">
                <div className="text-white/40">
                  <span className="block text-[9px] uppercase">RATING</span>
                  <span className="text-white font-bold">★ {product.rating} ({product.reviewCount} reviews)</span>
                </div>

                <div className="text-white/40">
                  <span className="block text-[9px] uppercase">AVAILABILITY</span>
                  <span className="text-emerald-400 font-semibold capitalize">
                    {product.availability.replace("_", " ")}
                  </span>
                </div>

                {Object.entries(product.attributes).slice(0, 3).map(([key, val]) => (
                  <div key={key} className="text-white/40">
                    <span className="block text-[9px] uppercase">{key}</span>
                    <span className="text-white truncate block">{String(val)}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  setIsCompareOpen(false);
                }}
                className="w-full py-2.5 rounded-full text-black font-extrabold text-[11px] font-mono tracking-wider uppercase flex items-center justify-center gap-1.5 transition-transform hover:scale-105"
                style={{ backgroundColor: theme.accent }}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ACQUIRE</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
