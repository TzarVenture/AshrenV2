"use client";

import React, { useState, useEffect } from "react";
import { ProductService } from "@/services/products/productService";
import { Product } from "@/services/products/types";
import ProductCard from "./product-card";
import { useWeather } from "@/lib/weather-context";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { theme } = useWeather();

  const filterTabs = [
    { id: "all", label: "ALL DOMAINS" },
    { id: "electronics", label: "OPTICS & DRONES" },
    { id: "fashion", label: "HAUTE APPAREL" },
    { id: "watches", label: "HOROLOGY" },
    { id: "jewelry", label: "FINE JEWELRY" },
    { id: "lifestyle", label: "EXPEDITION LIVING" },
  ];

  useEffect(() => {
    const filters = activeCategory === "all" ? {} : { category: activeCategory };
    ProductService.getProducts(filters).then((res) => setProducts(res.products));
  }, [activeCategory]);

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-8 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header & Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between border-b border-white/10 pb-6 gap-6 font-mono">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#eaa838] block mb-1 font-bold">
              CURATED DISCOVERY // 07
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
              THE HAUTE CATALOG
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all uppercase ${
                  activeCategory === tab.id
                    ? "bg-gold-gradient text-black font-extrabold shadow-md scale-105"
                    : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
