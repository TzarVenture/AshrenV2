"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/services/products/types";
import { useStore } from "@/lib/store";
import { useWeather } from "@/lib/weather-context";
import { Eye, Heart, ShoppingBag, SlidersHorizontal, MessageSquare } from "lucide-react";

interface ProductCardProps {
  product: Product;
  featuredSpan?: boolean;
}

export default function ProductCard({ product, featuredSpan = false }: ProductCardProps) {
  const { addToCart, setQuickViewProduct, toggleWishlist, isWishlisted, addToCompare, openWhatsAppOrder, formatPrice } = useStore();
  const { theme } = useWeather();
  const wishlisted = isWishlisted(product.id);

  // Category-adaptive metadata pill
  const getPrimaryPill = () => {
    if (product.category === "electronics") {
      return product.attributes.resolution ? String(product.attributes.resolution) : "4K HDR";
    }
    if (product.category === "fashion") {
      return product.attributes.material ? String(product.attributes.material) : "Haute Atelier";
    }
    if (product.category === "watches") {
      return product.attributes.movement ? String(product.attributes.movement) : "Mechanical";
    }
    if (product.category === "jewelry") {
      return product.attributes.gemstone ? String(product.attributes.gemstone) : "18K Gold";
    }
    return product.subcategory;
  };

  return (
    <div
      className={`relative rounded-3xl bg-gradient-to-b from-[#11141d]/90 to-[#090b10]/95 border border-white/10 hover:border-white/30 overflow-hidden flex flex-col justify-between transition-all duration-500 group shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.95)] hover:-translate-y-1 ${
        featuredSpan ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Top Bar */}
      <div className="p-5 flex items-center justify-between z-10 font-mono">
        <span className="text-[10px] tracking-widest text-[#eaa838] uppercase font-bold">
          {product.brand}
        </span>

        <div className="flex items-center gap-2">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-[9px] text-white/80 font-mono tracking-wider">
              {product.badge}
            </span>
          )}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="p-1.5 rounded-full bg-black/40 text-white/50 hover:text-red-400 transition-colors"
            title="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
      </div>

      {/* Visual Image Area */}
      <div
        className="relative w-full h-56 sm:h-64 p-6 flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => setQuickViewProduct(product)}
        data-cursor="view"
      >
        {/* Hover Ambient Radial Flare */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${theme.accent} 0%, transparent 70%)`,
          }}
        />

        <div className="relative w-full h-full">
          <Image
            src={product.images[0] || "/assets/hero_drone.jpg"}
            alt={product.name}
            fill
            className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-transform duration-700 group-hover:scale-108"
          />
        </div>

        {/* Quick Action Floating Bar on Hover */}
        <div className="absolute bottom-3 inset-x-6 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="px-3 py-1.5 rounded-full bg-black/80 hover:bg-black border border-white/20 text-white text-[10px] font-mono tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md"
            title="Quick View"
          >
            <Eye className="w-3 h-3" />
            <span>QUICK VIEW</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCompare(product);
            }}
            className="p-1.5 rounded-full bg-black/80 hover:bg-black border border-white/20 text-white/70 hover:text-white shadow-lg backdrop-blur-md"
            title="Compare"
          >
            <SlidersHorizontal className="w-3 h-3" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openWhatsAppOrder(product);
            }}
            className="p-1.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 shadow-lg backdrop-blur-md"
            title="WhatsApp Order"
          >
            <MessageSquare className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Meta & Price Footnote */}
      <div className="p-5 bg-black/40 border-t border-white/5 space-y-3 z-10">
        <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
          <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-white/70">
            {getPrimaryPill()}
          </span>
          <span className="capitalize">{product.availability.replace("_", " ")}</span>
        </div>

        <div>
          <Link href={`/products/${product.slug}`} className="hover:text-amber-300 transition-colors">
            <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight uppercase line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-white/50 font-sans mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing & Acquisition */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold font-mono" style={{ color: theme.accent }}>
              {formatPrice(product.price, product.priceUSD)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs line-through text-white/30 font-mono">
                {formatPrice(product.compareAtPrice, Math.round(product.compareAtPrice / 83))}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white text-white hover:text-black font-mono font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all shadow active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ACQUIRE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
