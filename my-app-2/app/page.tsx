"use client";

import React, { useEffect, useState } from "react";
import { WeatherProvider } from "@/lib/weather-context";
import { StoreProvider } from "@/lib/store";
import WeatherCanvas from "@/components/weather/weather-canvas";
import CustomCursor from "@/components/ui/custom-cursor";
import DevWeatherBar from "@/components/weather/dev-weather-bar";
import CartDrawer from "@/components/cart/cart-drawer";
import QuickViewModal from "@/components/products/quick-view-modal";
import CompareDrawer from "@/components/products/compare-drawer";
import Navbar from "@/components/navigation/navbar";
import CinematicHero from "@/components/hero/cinematic-hero";
import StatementSection from "@/components/editorial/statement-section";
import ProductStory from "@/components/editorial/product-story";
import MidnightDrop from "@/components/deals/midnight-drop";
import HorizontalRail from "@/components/products/horizontal-rail";
import WeatherCurated from "@/components/products/weather-curated";
import CategoryWorld from "@/components/categories/category-world";
import ProductGrid from "@/components/products/product-grid";
import EditorialReviews from "@/components/social/editorial-reviews";
import InstagramWall from "@/components/social/instagram-wall";
import FinalCTA from "@/components/cta/final-cta";
import WhatsAppConcierge from "@/components/whatsapp/whatsapp-concierge";
import CinematicFooter from "@/components/footer/cinematic-footer";
import { ProductService } from "@/services/products/productService";
import { Product } from "@/services/products/types";

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductService.getTrendingProducts(6).then(setTrendingProducts);
  }, []);

  return (
    <WeatherProvider>
      <StoreProvider>
        <div className="relative min-h-screen bg-[#07080b] text-[#e8eaf0] selection:bg-[#eaa838]/30 selection:text-white font-sans overflow-x-hidden">
          {/* Custom Desktop Magnetic Cursor */}
          <CustomCursor />

          {/* Procedural Atmospheric Weather Simulation */}
          <WeatherCanvas />

          {/* Floating Dev Weather & Time Simulator */}
          <DevWeatherBar />

          {/* Luxury WhatsApp Concierge Capsule */}
          <WhatsAppConcierge />

          {/* Slide-over Allocation Bag */}
          <CartDrawer />

          {/* Quick-View Hardware Spec Modal */}
          <QuickViewModal />

          {/* Multi-Product Comparison Matrix */}
          <CompareDrawer />

          {/* Minimal Frosted Header Navigation */}
          <Navbar />

          {/* Main Cinematic Experience Sequence */}
          <main className="relative z-20 flex flex-col">
            {/* 01: Full-Screen Cinematic Hero & Category Portal */}
            <CinematicHero />

            {/* 02: Large Editorial Campaign Statement */}
            <StatementSection />

            {/* 03: Scroll Storytelling & Exploded Architecture */}
            <ProductStory />

            {/* 04: Midnight Flash Drop with Live Countdown */}
            <MidnightDrop />

            {/* 05: Trending Haute Drops Horizontal Rail */}
            {trendingProducts.length > 0 && (
              <HorizontalRail
                title="TRENDING ALLOCATIONS"
                subtitle="HIGH-DEMAND CREATOR OPTICS & RUNWAY PIECES"
                sectionNumber="04"
                products={trendingProducts}
              />
            )}

            {/* 06: Environmental Adaptation ("Selected for Right Now") */}
            <WeatherCurated />

            {/* 07: Immersive Category Realms */}
            <CategoryWorld />

            {/* 08: Multi-Column Filtered Product Grid */}
            <ProductGrid />

            {/* 09: Magazine-Style Field Testimonials */}
            <EditorialReviews />

            {/* 10: Irregular Editorial Community Wall */}
            <InstagramWall />

            {/* 11: Final Campaign Call to Action */}
            <FinalCTA />
          </main>

          {/* 12: Technical Certifications & Footer */}
          <CinematicFooter />
        </div>
      </StoreProvider>
    </WeatherProvider>
  );
}
