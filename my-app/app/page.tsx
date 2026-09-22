"use client";

import React from "react";
import { WeatherProvider } from "@/lib/weather-context";
import { StoreProvider } from "@/lib/store";
import WeatherCanvas from "@/components/ui/weather-canvas";
import CustomCursor from "@/components/ui/custom-cursor";
import DevWeatherBar from "@/components/ui/dev-weather-bar";
import CartDrawer from "@/components/ui/cart-drawer";
import QuickViewModal from "@/components/ui/quick-view-modal";
import Navbar from "@/components/navigation/navbar";
import CinematicHero from "@/components/hero/cinematic-hero";
import StatementSection from "@/components/editorial/statement-section";
import ProductBreakdown from "@/components/editorial/product-breakdown";
import HorizontalShowcase from "@/components/products/horizontal-showcase";
import WeatherCurated from "@/components/products/weather-curated";
import CategoryWorlds from "@/components/categories/category-worlds";
import EditorialReviews from "@/components/social/editorial-reviews";
import SocialWall from "@/components/social/social-wall";
import FinalCTA from "@/components/cta/final-cta";
import WhatsAppConcierge from "@/components/whatsapp/whatsapp-concierge";
import CinematicFooter from "@/components/footer/cinematic-footer";

export default function Home() {
  return (
    <WeatherProvider>
      <StoreProvider>
        <div className="relative min-h-screen bg-[#07080b] text-[#e8eaf0] selection:bg-[#e5a93c]/30 selection:text-white font-sans overflow-x-hidden">
          {/* Custom Desktop Cursor */}
          <CustomCursor />

          {/* Procedural Canvas Weather Simulation */}
          <WeatherCanvas />

          {/* Floating Dev Weather Preview Switcher */}
          <DevWeatherBar />

          {/* WhatsApp Luxury Concierge */}
          <WhatsAppConcierge />

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Quick View Hardware Spec Modal */}
          <QuickViewModal />

          {/* Minimal Frosted Header Navigation */}
          <Navbar />

          {/* Main Visual Sequence */}
          <main className="relative z-20 flex flex-col">
            {/* 01: Full-Screen Cinematic Hero */}
            <CinematicHero />

            {/* 02: Massive Campaign Editorial Statement */}
            <StatementSection />

            {/* 03: Scroll Storytelling & Interactive Architecture Breakdown */}
            <ProductBreakdown />

            {/* 04: Horizontal Product Rail Collection */}
            <HorizontalShowcase />

            {/* 05: Environmental Adaptation ("Selected for Right Now") */}
            <WeatherCurated />

            {/* 06: Immersive Category Worlds */}
            <CategoryWorlds />

            {/* 07: Magazine-Style Field Testimonials */}
            <EditorialReviews />

            {/* 08: Irregular Editorial Community Wall */}
            <SocialWall />

            {/* 09: Final Cinematic Call to Action */}
            <FinalCTA />
          </main>

          {/* 10: Technical Certifications & Footer */}
          <CinematicFooter />
        </div>
      </StoreProvider>
    </WeatherProvider>
  );
}
