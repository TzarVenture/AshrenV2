"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { SearchService, SearchResult } from "@/services/search/searchService";
import { Search, X, Sparkles, ArrowRight } from "lucide-react";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07080b] flex items-center justify-center text-white font-mono">LOADING SEARCH MATRIX...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult>({
    products: [],
    categories: [],
    brands: [],
    suggestions: [],
  });

  useEffect(() => {
    SearchService.search(query).then(setResults);
  }, [query]);

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
            {/* Search Header & Input Bar */}
            <div className="space-y-4 max-w-3xl mx-auto text-center font-mono">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#eaa838] font-bold block">
                CATALOG DISCOVERY // 25,000+ INDEXED PIECES
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
                SEARCH THE ARCHIVE
              </h1>

              {/* Input Box */}
              <div className="relative mt-6 flex items-center bg-[#0d0f17] border border-white/20 rounded-full px-5 py-3.5 shadow-2xl focus-within:border-[#eaa838] transition-all">
                <Search className="w-5 h-5 text-white/40 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search 8K drones, waterproof trenches, titanium tourbillons..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base text-white placeholder-white/40 focus:outline-none font-mono"
                  autoFocus
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-white/40 hover:text-white p-1">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Suggestions */}
              {results.suggestions.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span className="text-[10px] text-white/40 uppercase mr-1">POPULAR:</span>
                  {results.suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(s)}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/70 hover:text-white transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Matched Categories & Brands */}
            {(results.categories.length > 0 || results.brands.length > 0) && (
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 font-mono">
                {results.categories.length > 0 && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] text-[#eaa838] uppercase font-bold tracking-widest">
                      MATCHED DOMAINS:
                    </span>
                    {results.categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/category/${c.slug}`}
                        className="px-3 py-1 rounded-full bg-[#eaa838]/10 border border-[#eaa838]/30 text-[#eaa838] text-xs hover:bg-[#eaa838]/20 transition-colors flex items-center gap-1.5"
                      >
                        <span>{c.name}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}

                {results.brands.length > 0 && (
                  <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-white/5">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">
                      ATELIERS:
                    </span>
                    {results.brands.map((b) => (
                      <span key={b} className="px-2.5 py-0.5 rounded-md bg-white/5 text-white/80 text-xs">
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Results Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-white/50 border-b border-white/10 pb-4">
                <span>INDEXED MATCHES ({results.products.length})</span>
                {query && <span>QUERY: “{query}”</span>}
              </div>

              {results.products.length === 0 ? (
                <div className="py-20 text-center font-mono text-white/40 space-y-3">
                  <p className="text-sm uppercase tracking-wider">ZERO SPECIMENS MATCHING CURRENT QUERY</p>
                  <p className="text-xs text-white/30 max-w-sm mx-auto font-sans">
                    Try searching for "Drone", "Trench", "Titanium", "Tourbillon", or "Emerald".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </main>

          <CinematicFooter />
        </div>
      </StoreProvider>
    </WeatherProvider>
  );
}
