"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WeatherProvider } from "@/lib/weather-context";
import { StoreProvider, useStore } from "@/lib/store";
import Navbar from "@/components/navigation/navbar";
import CinematicFooter from "@/components/footer/cinematic-footer";
import CustomCursor from "@/components/ui/custom-cursor";
import ProductCard from "@/components/products/product-card";
import { MOCK_PRODUCTS } from "@/data/products.mock";
import { Package, Heart, MapPin, User, CheckCircle2, Clock, Truck, ShieldCheck, ArrowRight, ShoppingBag } from "lucide-react";

export default function AccountPage() {
  return (
    <WeatherProvider>
      <StoreProvider>
        <AccountInner />
      </StoreProvider>
    </WeatherProvider>
  );
}

function AccountInner() {
  const { wishlist, recentlyViewed, addToCart, formatPrice } = useStore();
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "recent">("orders");

  const wishlistedProducts = MOCK_PRODUCTS.filter((p) => wishlist.includes(p.id));

  // Order Timeline Steps
  const orderSteps = [
    { title: "ORDER PLACED", time: "Sep 22, 10:14 AM", status: "complete" },
    { title: "CONFIRMED & ESCROW LOCKED", time: "Sep 22, 10:18 AM", status: "complete" },
    { title: "PACKED & HERMETIC SEALED", time: "Sep 22, 02:40 PM", status: "complete" },
    { title: "SHIPPED VIA AIR CARRIER", time: "Sep 22, 05:15 PM", status: "active" },
    { title: "OUT FOR WHITE-GLOVE DELIVERY", time: "Estimated Tomorrow", status: "pending" },
    { title: "DELIVERED TO CLIENT", time: "Pending Signature", status: "pending" },
  ];

  return (
    <div className="relative min-h-screen bg-[#07080b] text-[#e8eaf0] font-sans overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      <main className="relative z-20 pt-28 pb-32 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        {/* Account Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-6 gap-6 font-mono">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#eaa838] uppercase font-bold tracking-[0.25em] mb-1">
              <User className="w-3.5 h-3.5" />
              <span>CLIENT PROFILE // PRIVATE CLIENT NUMBER #ASH-8819</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
              ELENA ROSTOVA
            </h1>
            <p className="text-xs text-white/50 mt-1">
              National Geographic Expedition Account • Verified Haute Allocator
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: "orders", label: "LIVE ORDERS (1)", icon: <Package className="w-3.5 h-3.5" /> },
              { id: "wishlist", label: `SAVED PIECES (${wishlist.length})`, icon: <Heart className="w-3.5 h-3.5" /> },
              { id: "recent", label: "RECENTLY VIEWED", icon: <Clock className="w-3.5 h-3.5" /> },
              { id: "addresses", label: "DISPATCH ADDRESSES", icon: <MapPin className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all uppercase flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-gold-gradient text-black font-extrabold shadow-md scale-105"
                    : "bg-white/[0.04] text-white/60 hover:text-white border border-white/10"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Live Orders & Animated Tracking Timeline */}
        {activeTab === "orders" && (
          <div className="space-y-8 font-mono">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#0c0e16] border border-white/10 space-y-8 shadow-2xl">
              {/* Order Meta Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-[#eaa838] uppercase font-bold tracking-widest block">
                    REQUISITION #ASH-8942-IN
                  </span>
                  <h3 className="text-lg font-bold text-white font-display mt-0.5">
                    Ashren G-1 Pro // 8K Drone (Obsidian Black)
                  </h3>
                  <span className="text-white/40">Air Express Dispatch • Track #EXP-772910</span>
                </div>

                <div className="text-right">
                  <span className="text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] uppercase">
                    IN FLIGHT TRANSIT
                  </span>
                  <div className="text-sm font-bold text-white mt-1">₹34,999 ($419)</div>
                </div>
              </div>

              {/* Animated Timeline */}
              <div className="space-y-4">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block">
                  EXPEDITION TRANSIT TIMELINE
                </span>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                  {orderSteps.map((stepItem, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Step node */}
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                          stepItem.status === "complete"
                            ? "bg-emerald-400 text-black font-bold"
                            : stepItem.status === "active"
                            ? "bg-[#eaa838] text-black font-bold animate-pulse shadow-[0_0_12px_#eaa838]"
                            : "bg-white/10 text-white/30"
                        }`}
                      >
                        {stepItem.status === "complete" ? "✓" : idx + 1}
                      </div>

                      <div className="space-y-0.5">
                        <h4
                          className={`text-xs font-bold uppercase tracking-wider ${
                            stepItem.status === "active"
                              ? "text-[#eaa838]"
                              : stepItem.status === "complete"
                              ? "text-white"
                              : "text-white/30"
                          }`}
                        >
                          {stepItem.title}
                        </h4>
                        <span className="text-[10px] text-white/40 block font-mono">{stepItem.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Saved Wishlist Pieces */}
        {activeTab === "wishlist" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-white/50 border-b border-white/10 pb-4">
              <span>SAVED ALLOCATIONS ({wishlistedProducts.length})</span>
            </div>

            {wishlistedProducts.length === 0 ? (
              <div className="py-20 text-center font-mono text-white/40">
                NO PIECES CURRENTLY SAVED TO WISHLIST.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlistedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Recently Viewed Personalization */}
        {activeTab === "recent" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-white/50 border-b border-white/10 pb-4">
              <span>EXPLORATION HISTORY ({recentlyViewed.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentlyViewed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Dispatch Addresses */}
        {activeTab === "addresses" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-6 rounded-3xl bg-[#0c0e16] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#eaa838] uppercase font-bold text-[10px]">PRIMARY HEADQUARTERS</span>
                <span className="text-[10px] text-emerald-400 font-bold">DEFAULT</span>
              </div>
              <h4 className="text-sm font-bold text-white">Elena Rostova</h4>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                74 Haute Boulevard, Horizon Tower, Penthouse B<br />
                Mumbai, Maharashtra 400001, India<br />
                Phone: +91 98765 43210
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0c0e16] border border-white/10 space-y-3 opacity-70">
              <div className="flex items-center justify-between">
                <span className="text-white/40 uppercase font-bold text-[10px]">ICELAND FIELD BASE</span>
              </div>
              <h4 className="text-sm font-bold text-white">Elena Rostova // Expedition Rig</h4>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Vatnajökull Research Base Camp 4<br />
                Höfn, 780, Iceland<br />
                Satellite Link: +354 892 1042
              </p>
            </div>
          </div>
        )}
      </main>

      <CinematicFooter />
    </div>
  );
}
