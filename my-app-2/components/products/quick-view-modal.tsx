"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { useWeather } from "@/lib/weather-context";
import { X, Check, ArrowRight, Radio, ShoppingBag, SlidersHorizontal, MessageSquare } from "lucide-react";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, openWhatsAppOrder, formatPrice, addToCompare } = useStore();
  const { theme } = useWeather();
  const [selectedVariant, setSelectedVariant] = useState<string>("");

  if (!quickViewProduct) return null;

  const currentVariant = selectedVariant || quickViewProduct.variants[0]?.value || "";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div
        onClick={() => setQuickViewProduct(null)}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
      />

      <div className="relative w-full max-w-4xl bg-[#0b0e14] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 grid grid-cols-1 md:grid-cols-12 animate-in zoom-in-95 duration-300 max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/60 border border-white/15 text-white/70 hover:text-white hover:bg-black/90 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Column */}
        <div className="md:col-span-6 relative min-h-[300px] md:min-h-[480px] bg-gradient-to-b from-[#141824] to-[#080a0f] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
          <div
            className="absolute w-[280px] h-[280px] rounded-full blur-[80px] pointer-events-none opacity-40"
            style={{ backgroundColor: theme.accent }}
          />

          <div className="relative w-full h-full max-h-[360px] flex items-center justify-center">
            <Image
              src={quickViewProduct.images[0] || "/assets/hero_drone.jpg"}
              alt={quickViewProduct.name}
              fill
              className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
            />
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md">
            <Radio className="w-3 h-3 animate-pulse text-amber-400" />
            <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
              {quickViewProduct.badge || quickViewProduct.subcategory}
            </span>
          </div>
        </div>

        {/* Specifications & Actions Column */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#eaa838] uppercase block mb-1 font-bold">
                {quickViewProduct.brand} • {quickViewProduct.category.toUpperCase()}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {quickViewProduct.name}
              </h3>
              <p className="text-xs font-mono text-white/50 mt-1">
                {quickViewProduct.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl font-bold font-mono" style={{ color: theme.accent }}>
                {formatPrice(quickViewProduct.price, quickViewProduct.priceUSD)}
              </span>
              {quickViewProduct.compareAtPrice && (
                <span className="text-xs line-through text-white/40 font-mono">
                  {formatPrice(quickViewProduct.compareAtPrice, Math.round(quickViewProduct.compareAtPrice / 83))}
                </span>
              )}
            </div>

            <p className="text-xs text-white/60 leading-relaxed font-sans">
              {quickViewProduct.description}
            </p>

            {/* Variant Selector */}
            {quickViewProduct.variants.length > 0 && (
              <div className="space-y-2 pt-1 font-mono">
                <span className="text-[10px] text-white/50 uppercase tracking-widest block">
                  SELECT VARIANT ({quickViewProduct.variants[0].type.toUpperCase()})
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs tracking-wider transition-all ${
                        currentVariant === v.value
                          ? "bg-white text-black font-extrabold shadow"
                          : "bg-white/[0.04] text-white/60 hover:text-white border border-white/10"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {quickViewProduct.specifications[0]?.items.slice(0, 4).map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono">
                  <span className="text-[9px] text-white/40 uppercase block truncate">{item.label}</span>
                  <span className="text-xs font-bold text-white tracking-wide truncate block">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                addToCart(quickViewProduct, 1, currentVariant);
                setQuickViewProduct(null);
              }}
              className="w-full py-3.5 px-6 rounded-full text-black font-extrabold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-xl transition-transform hover:scale-[1.01] active:scale-[0.99]"
              style={{ backgroundColor: theme.accent }}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ACQUIRE PIECE</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => openWhatsAppOrder(quickViewProduct, currentVariant)}
                className="py-2.5 px-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 font-medium text-[11px] font-mono tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WHATSAPP ORDER</span>
              </button>

              <button
                onClick={() => addToCompare(quickViewProduct)}
                className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white font-medium text-[11px] font-mono tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>COMPARE</span>
              </button>
            </div>

            <Link
              href={`/products/${quickViewProduct.slug}`}
              onClick={() => setQuickViewProduct(null)}
              className="block text-center text-[11px] font-mono text-white/40 hover:text-white tracking-widest uppercase pt-1"
            >
              VIEW FULL PRODUCT PAGE & REVIEWS →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
