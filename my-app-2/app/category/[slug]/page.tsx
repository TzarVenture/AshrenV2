"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { WeatherProvider } from "@/lib/weather-context";
import { StoreProvider } from "@/lib/store";
import Navbar from "@/components/navigation/navbar";
import CinematicFooter from "@/components/footer/cinematic-footer";
import CartDrawer from "@/components/cart/cart-drawer";
import QuickViewModal from "@/components/products/quick-view-modal";
import CompareDrawer from "@/components/products/compare-drawer";
import WhatsAppConcierge from "@/components/whatsapp/whatsapp-concierge";
import CustomCursor from "@/components/ui/custom-cursor";
import ProductCard from "@/components/products/product-card";
import { ProductService } from "@/services/products/productService";
import { Category, Product, PaginatedProductsResponse } from "@/services/products/types";
import { Filter, SlidersHorizontal, ChevronRight, X, ArrowUpDown } from "lucide-react";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [category, setCategory] = useState<Category | null>(null);
  const [data, setData] = useState<PaginatedProductsResponse | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating" | "newest">("featured");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    ProductService.getCategoryBySlug(slug).then(setCategory);
  }, [slug]);

  useEffect(() => {
    ProductService.getProducts({
      category: slug,
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      attributes: selectedAttributes,
      sortBy,
    }).then(setData);
  }, [slug, selectedBrands, selectedAttributes, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleAttribute = (key: string, val: string) => {
    setSelectedAttributes((prev) => {
      const current = prev[key] || [];
      const updated = current.includes(val) ? current.filter((v) => v !== val) : [...current, val];
      return { ...prev, [key]: updated };
    });
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedAttributes({});
  };

  return (
    <WeatherProvider>
      <StoreProvider>
        <div className="relative min-h-screen bg-[#07080b] text-[#e8eaf0] font-sans overflow-x-hidden">
          <CustomCursor />
          <CartDrawer />
          <QuickViewModal />
          <CompareDrawer />
          <WhatsAppConcierge />
          <Navbar />

          <main className="relative z-20 pt-28 pb-32 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-white/40">
              <Link href="/" className="hover:text-white transition-colors">HOME</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/60">UNIVERSES</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#eaa838] uppercase font-bold">{category?.name || slug}</span>
            </div>

            {/* Cinematic Category Banner */}
            {category && (
              <div className="relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[380px] p-8 sm:p-14 flex flex-col justify-end border border-white/10 shadow-2xl">
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={category.bannerImage}
                    alt={category.name}
                    fill
                    className="object-cover filter brightness-[0.4] contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/60 to-transparent" />
                </div>

                <div className="space-y-3 z-10 max-w-2xl">
                  <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#eaa838] font-bold">
                    {category.tagline}
                  </span>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white uppercase tracking-tight leading-none">
                    {category.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    {category.description}
                  </p>
                  <div className="text-[11px] font-mono text-white/40 pt-1">
                    INDEXED CATALOG: {category.productCount.toLocaleString()} CURATED ALLOCATIONS
                  </div>
                </div>
              </div>
            )}

            {/* Filter & Sort Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 font-mono text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFilterDrawerOpen((prev) => !prev)}
                  className="px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white flex items-center gap-2 transition-colors"
                >
                  <Filter className="w-3.5 h-3.5 text-[#eaa838]" />
                  <span>FILTER CRITERIA</span>
                  {(selectedBrands.length > 0 || Object.values(selectedAttributes).some((arr) => arr.length > 0)) && (
                    <span className="w-2 h-2 rounded-full bg-[#eaa838]" />
                  )}
                </button>

                {(selectedBrands.length > 0 || Object.values(selectedAttributes).some((arr) => arr.length > 0)) && (
                  <button
                    onClick={clearFilters}
                    className="text-white/40 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>RESET</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 text-white/60">
                <span>SHOWING {data?.total || 0} PIECES</span>
                <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                  <ArrowUpDown className="w-3.5 h-3.5 text-white/40" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-white border-none focus:outline-none cursor-pointer"
                  >
                    <option value="featured" className="bg-[#0b0e14]">FEATURED FIRST</option>
                    <option value="price-asc" className="bg-[#0b0e14]">PRICE: LOW TO HIGH</option>
                    <option value="price-desc" className="bg-[#0b0e14]">PRICE: HIGH TO LOW</option>
                    <option value="rating" className="bg-[#0b0e14]">HIGHEST RATED</option>
                    <option value="newest" className="bg-[#0b0e14]">NEW RELEASES</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main Layout: Filters Drawer + Product Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Category-Specific Dynamic Filters */}
              {isFilterDrawerOpen && category && (
                <div className="lg:col-span-3 p-6 rounded-3xl bg-[#0d0f17] border border-white/10 space-y-6 font-mono text-xs animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[10px] text-[#eaa838] uppercase font-bold tracking-widest">
                      CATEGORY PARAMETERS
                    </span>
                    <button onClick={() => setIsFilterDrawerOpen(false)} className="text-white/40 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Dynamic Category Attributes */}
                  {category.availableAttributes.map((attr) => (
                    <div key={attr.key} className="space-y-2">
                      <span className="text-[11px] text-white/80 uppercase font-semibold block">
                        {attr.label}
                      </span>
                      <div className="space-y-1.5 pl-1">
                        {attr.options.map((opt) => {
                          const checked = selectedAttributes[attr.key]?.includes(opt) || false;
                          return (
                            <label
                              key={opt}
                              onClick={() => toggleAttribute(attr.key, opt)}
                              className="flex items-center gap-2 cursor-pointer text-white/60 hover:text-white text-[11px]"
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                                  checked ? "bg-[#eaa838] border-[#eaa838] text-black" : "border-white/20"
                                }`}
                              >
                                {checked && <span className="text-[9px] font-bold">✓</span>}
                              </div>
                              <span>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Product Grid Area */}
              <div className={`${isFilterDrawerOpen ? "lg:col-span-9" : "lg:col-span-12"} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
                {data?.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </main>

          <CinematicFooter />
        </div>
      </StoreProvider>
    </WeatherProvider>
  );
}
