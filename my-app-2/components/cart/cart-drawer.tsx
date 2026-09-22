"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { useWeather } from "@/lib/weather-context";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, MessageSquare } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalCount,
    totalPriceINR,
    totalPriceUSD,
    currency,
    toggleCurrency,
    formatPrice,
    openWhatsAppCartOrder,
  } = useStore();
  const { theme } = useWeather();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end font-sans">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#0a0c12] border-l border-white/10 h-full flex flex-col z-10 shadow-[0_0_80px_rgba(0,0,0,0.9)] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-[0.25em] text-white/50 uppercase font-tech">
              ASHREN ALLOCATION
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-white/10 text-white font-bold">
              {totalCount} {totalCount === 1 ? "PIECE" : "PIECES"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCurrency}
              className="text-xs font-mono px-2.5 py-1 rounded-lg border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              {currency === "INR" ? "₹ INR" : "$ USD"}
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 text-white/40">
              <span className="text-sm font-mono tracking-wider uppercase mb-2">
                BAG CURRENTLY EMPTY
              </span>
              <p className="text-xs text-white/30 max-w-xs mb-6">
                Discover our 4K gimbal optics, haute apparel, and fine horology to begin your allocation.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
              >
                RETURN TO CATALOG
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity, selectedVariant }) => (
              <div
                key={`${product.id}-${selectedVariant || ""}`}
                className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 relative group"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                  <Image
                    src={product.images[0] || "/assets/hero_drone.jpg"}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
                        {product.subcategory}
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-wide truncate">
                        {product.name}
                      </h4>
                      {selectedVariant && (
                        <span className="text-[10px] font-mono text-amber-300/80 block mt-0.5">
                          Variant: {selectedVariant}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id, selectedVariant)}
                      className="text-white/30 hover:text-red-400 p-1 transition-colors"
                      title="Remove piece"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-bold font-mono" style={{ color: theme.accent }}>
                      {formatPrice(product.price * quantity, product.priceUSD * quantity)}
                    </span>

                    <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-black/50">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1, selectedVariant)}
                        className="px-2 py-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-mono text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1, selectedVariant)}
                        className="px-2 py-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#07080c] space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-white/50 font-mono">
                <span>INSURED EXPEDITION FREIGHT</span>
                <span className="text-emerald-400 font-bold">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-sm text-white font-bold font-mono">
                <span>SUBTOTAL VALUATION</span>
                <span className="text-base" style={{ color: theme.accent }}>
                  {formatPrice(totalPriceINR, totalPriceUSD)}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 px-5 rounded-full text-black font-extrabold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
                style={{ backgroundColor: theme.accent }}
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={openWhatsAppCartOrder}
                className="w-full py-3 px-5 rounded-full bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>ORDER CURATED COLLECTION VIA WHATSAPP</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-2 border-t border-white/5">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
                WHITE-GLOVE DISPATCH
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-white/60" />
                AIR EXPRESS FREIGHT
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
