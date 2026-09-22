"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { WeatherProvider } from "@/lib/weather-context";
import { StoreProvider, useStore } from "@/lib/store";
import Navbar from "@/components/navigation/navbar";
import CinematicFooter from "@/components/footer/cinematic-footer";
import CartDrawer from "@/components/cart/cart-drawer";
import QuickViewModal from "@/components/products/quick-view-modal";
import CompareDrawer from "@/components/products/compare-drawer";
import WhatsAppConcierge from "@/components/whatsapp/whatsapp-concierge";
import CustomCursor from "@/components/ui/custom-cursor";
import ProductCard from "@/components/products/product-card";
import { ProductService } from "@/services/products/productService";
import { RecommendationService } from "@/services/recommendations/recommendationService";
import { Product } from "@/services/products/types";
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Heart, ShoppingBag, MessageSquare, SlidersHorizontal, Plus, Star } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [bundleProducts, setBundleProducts] = useState<Product[]>([]);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductService.getProductBySlug(slug).then((p) => {
      if (p) {
        setProduct(p);
        if (p.variants.length > 0) setSelectedVariant(p.variants[0].value);
        RecommendationService.getRecommendations({ type: "frequently-bought", productId: p.id }).then(setBundleProducts);
        RecommendationService.getRecommendations({ type: "similar", productId: p.id, limit: 3 }).then(setSimilarProducts);
      }
    });
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#07080b] flex items-center justify-center text-white font-mono text-sm">
        INITIALIZING SENSOR TELEMETRY...
      </div>
    );
  }

  return (
    <WeatherProvider>
      <StoreProvider>
        <ProductDetailInner
          product={product}
          activeImageIndex={activeImageIndex}
          setActiveImageIndex={setActiveImageIndex}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          bundleProducts={bundleProducts}
          similarProducts={similarProducts}
        />
      </StoreProvider>
    </WeatherProvider>
  );
}

function ProductDetailInner({
  product,
  activeImageIndex,
  setActiveImageIndex,
  selectedVariant,
  setSelectedVariant,
  bundleProducts,
  similarProducts,
}: {
  product: Product;
  activeImageIndex: number;
  setActiveImageIndex: (i: number) => void;
  selectedVariant: string;
  setSelectedVariant: (v: string) => void;
  bundleProducts: Product[];
  similarProducts: Product[];
}) {
  const { addToCart, toggleWishlist, isWishlisted, addToCompare, openWhatsAppOrder, formatPrice } = useStore();
  const wishlisted = isWishlisted(product.id);

  // Bundle calculations
  const bundleTotalPriceINR = product.price + bundleProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleTotalPriceUSD = product.priceUSD + bundleProducts.reduce((sum, p) => sum + p.priceUSD, 0);

  const addEntireBundle = () => {
    addToCart(product, 1, selectedVariant);
    bundleProducts.forEach((p) => addToCart(p, 1));
  };

  return (
    <div className="relative min-h-screen bg-[#07080b] text-[#e8eaf0] font-sans overflow-x-hidden">
      <CustomCursor />
      <CartDrawer />
      <QuickViewModal />
      <CompareDrawer />
      <WhatsAppConcierge />
      <Navbar />

      <main className="relative z-20 pt-28 pb-32 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-white/40">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/category/${product.category}`} className="hover:text-white transition-colors uppercase">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#eaa838] uppercase font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Top Product Presentation (Gallery + Meta/Actions) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Gallery Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative w-full aspect-[4/3] rounded-3xl bg-gradient-to-b from-[#11141f] to-[#08090d] border border-white/10 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              />
              <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-black/60 border border-white/10 font-mono text-[10px] text-[#eaa838] uppercase font-bold">
                {product.badge || product.subcategory}
              </span>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-[#0c0e14] border transition-all ${
                      activeImageIndex === idx ? "border-[#eaa838] ring-1 ring-[#eaa838]" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumb" fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Actions Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
                <span className="text-[#eaa838] font-bold uppercase tracking-widest">{product.brand}</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-white font-bold">{product.rating}</span>
                  <span>({product.reviewCount} reviews)</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white uppercase tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs font-mono text-white/50 mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-gold-shimmer">
                {formatPrice(product.price, product.priceUSD)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm line-through text-white/30 font-mono">
                  {formatPrice(product.compareAtPrice, Math.round(product.compareAtPrice / 83))}
                </span>
              )}
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="space-y-2 pt-2 font-mono">
                <span className="text-[10px] text-white/50 uppercase tracking-widest block">
                  CHOOSE {product.variants[0].type.toUpperCase()}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.value)}
                      className={`px-3.5 py-2 rounded-xl text-xs tracking-wider transition-all ${
                        selectedVariant === v.value
                          ? "bg-gold-gradient text-black font-extrabold shadow"
                          : "bg-white/[0.04] text-white/70 hover:text-white border border-white/10"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Acquisition Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                onClick={() => addToCart(product, 1, selectedVariant)}
                className="w-full py-4 px-6 rounded-full text-black font-extrabold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(234,168,56,0.4)] transition-transform hover:scale-105 bg-gold-gradient hover:bg-gold-gradient-hover"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ACQUIRE PIECE ({formatPrice(product.price, product.priceUSD)})</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => openWhatsAppOrder(product, selectedVariant)}
                  className="py-3 px-4 rounded-full bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 font-mono font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WHATSAPP DIRECT</span>
                </button>

                <button
                  onClick={() => addToCompare(product)}
                  className="py-3 px-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white font-mono font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>COMPARE</span>
                </button>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-[10px] font-mono text-white/50">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#eaa838]" />
                <span>AIR EXPRESS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#eaa838]" />
                <span>3-YR WARRANTY</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#eaa838]" />
                <span>14-DAY ESCROW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        {bundleProducts.length > 0 && (
          <div className="p-8 rounded-3xl bg-[#0c0e16] border border-white/10 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#eaa838] font-bold">
              <span>CURATED COMPATIBLE BUNDLE</span>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-4">
                {/* Main Item */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="relative w-14 h-14 bg-black/40 rounded-xl overflow-hidden p-1">
                    <Image src={product.images[0]} alt={product.name} fill className="object-contain" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-display max-w-[150px] truncate">{product.name}</h4>
                    <span className="text-[11px] font-mono text-[#eaa838]">{formatPrice(product.price, product.priceUSD)}</span>
                  </div>
                </div>

                <Plus className="w-4 h-4 text-white/40" />

                {/* Bundle Item 1 */}
                {bundleProducts.map((bp) => (
                  <div key={bp.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="relative w-14 h-14 bg-black/40 rounded-xl overflow-hidden p-1">
                      <Image src={bp.images[0]} alt={bp.name} fill className="object-contain" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-display max-w-[150px] truncate">{bp.name}</h4>
                      <span className="text-[11px] font-mono text-[#eaa838]">{formatPrice(bp.price, bp.priceUSD)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bundle Action */}
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-white/40 block">COMBINED ALLOCATION</span>
                  <span className="text-lg font-bold font-mono text-[#eaa838]">{formatPrice(bundleTotalPriceINR, bundleTotalPriceUSD)}</span>
                </div>
                <button
                  onClick={addEntireBundle}
                  className="px-5 py-3 rounded-full text-black font-extrabold text-xs font-mono tracking-wider uppercase bg-gold-gradient hover:bg-gold-gradient-hover transition-transform hover:scale-105 shadow-md"
                >
                  ACQUIRE BUNDLE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Technical Specifications Accordions/Tables */}
        <div className="space-y-6 pt-6 border-t border-white/10 font-mono">
          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase font-display">
            TECHNICAL SPECIFICATIONS & METROLOGY
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.specifications.map((specGroup, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <span className="text-[10px] text-[#eaa838] uppercase font-bold tracking-widest block">
                  {specGroup.group}
                </span>
                <div className="space-y-2">
                  {specGroup.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                      <span className="text-white/40">{item.label}</span>
                      <span className="text-white font-semibold text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Recommendations */}
        {similarProducts.length > 0 && (
          <div className="space-y-8 pt-12 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase font-display">
              COMPLEMENTARY ALLOCATIONS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <CinematicFooter />
    </div>
  );
}
