"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WeatherProvider } from "@/lib/weather-context";
import { StoreProvider, useStore } from "@/lib/store";
import Navbar from "@/components/navigation/navbar";
import CinematicFooter from "@/components/footer/cinematic-footer";
import CustomCursor from "@/components/ui/custom-cursor";
import { Check, ShieldCheck, Truck, ArrowRight, CreditCard, Smartphone, Building, CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  return (
    <WeatherProvider>
      <StoreProvider>
        <CheckoutInner />
      </StoreProvider>
    </WeatherProvider>
  );
}

function CheckoutInner() {
  const { cart, totalPriceINR, totalPriceUSD, formatPrice, clearCart } = useStore();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [form, setForm] = useState({
    firstName: "Elena",
    lastName: "Rostova",
    email: "elena.rostova@natgeo-expedition.org",
    phone: "+91 98765 43210",
    address: "74 Haute Boulevard, Horizon Tower",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    deliveryMethod: "express",
    paymentMethod: "upi",
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
    } else if (step === 3) {
      setOrderConfirmed(true);
      setStep(4);
      clearCart();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07080b] text-[#e8eaf0] font-sans overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      <main className="relative z-20 pt-28 pb-32 px-4 sm:px-8 max-w-5xl mx-auto space-y-12">
        {/* Header & Steps Tracker */}
        <div className="space-y-6 font-mono">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#eaa838] font-bold block">
                ESCROW ALLOCATION PORTAL
              </span>
              <h1 className="text-2xl sm:text-4xl font-black font-display text-white uppercase mt-1">
                SECURE CHECKOUT
              </h1>
            </div>

            <span className="text-xs text-white/40">
              DISPATCH STEP [0{step} // 04]
            </span>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-4 gap-2 text-[10px] tracking-wider uppercase font-semibold">
            {[
              { num: 1, label: "01 // DISPATCH ADDRESS" },
              { num: 2, label: "02 // FREIGHT SPEED" },
              { num: 3, label: "03 // ESCROW PAYMENT" },
              { num: 4, label: "04 // CONFIRMATION" },
            ].map((s) => (
              <div
                key={s.num}
                className={`p-3 rounded-xl border text-center transition-all ${
                  step === s.num
                    ? "bg-[#eaa838]/10 border-[#eaa838] text-[#eaa838]"
                    : step > s.num
                    ? "bg-white/[0.04] border-white/10 text-emerald-400"
                    : "bg-white/[0.02] border-white/5 text-white/30"
                }`}
              >
                {step > s.num ? `✓ ${s.label.split("// ")[1]}` : s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Step Forms (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0c0e16] border border-white/10 space-y-6 font-mono text-xs">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white uppercase font-display border-b border-white/10 pb-2">
                  CLIENT & DELIVERY DESTINATION
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/50 uppercase">FIRST NAME</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#eaa838]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/50 uppercase">LAST NAME</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#eaa838]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 uppercase">EMAIL DISPATCH RECORD</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#eaa838]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 uppercase">DESTINATION ADDRESS</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#eaa838]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/50 uppercase">CITY</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#eaa838]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/50 uppercase">STATE</label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#eaa838]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/50 uppercase">POSTAL CODE</label>
                    <input
                      type="text"
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#eaa838]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white uppercase font-display border-b border-white/10 pb-2">
                  EXPEDITION FREIGHT METHOD
                </h3>

                <div className="space-y-3">
                  <label
                    onClick={() => setForm({ ...form, deliveryMethod: "express" })}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      form.deliveryMethod === "express" ? "bg-[#eaa838]/10 border-[#eaa838]" : "bg-white/[0.02] border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#eaa838]" />
                      <div>
                        <span className="font-bold text-white uppercase block">COMPLIMENTARY AIR EXPRESS</span>
                        <span className="text-[11px] text-white/50">Dispatched within 24-48 hours via insured courier.</span>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold uppercase text-[11px]">FREE</span>
                  </label>

                  <label
                    onClick={() => setForm({ ...form, deliveryMethod: "white-glove" })}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      form.deliveryMethod === "white-glove" ? "bg-[#eaa838]/10 border-[#eaa838]" : "bg-white/[0.02] border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                      <div>
                        <span className="font-bold text-white uppercase block">WHITE-GLOVE CONCIERGE HAND-DELIVERY</span>
                        <span className="text-[11px] text-white/50">Dedicated armored courier with on-site inspection.</span>
                      </div>
                    </div>
                    <span className="text-white font-bold text-[11px]">₹2,500</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white uppercase font-display border-b border-white/10 pb-2">
                  ENCRYPTED ESCROW PAYMENT GATEWAY
                </h3>

                <div className="space-y-3">
                  {[
                    { id: "upi", title: "INSTANT UPI / QR CODE (ZERO CHARGES)", icon: <Smartphone className="w-4 h-4 text-[#eaa838]" /> },
                    { id: "cards", title: "CREDIT / DEBIT / AMEX CARDS", icon: <CreditCard className="w-4 h-4 text-white/60" /> },
                    { id: "netbanking", title: "PRIORITY NET BANKING / ESCROW", icon: <Building className="w-4 h-4 text-white/60" /> },
                  ].map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setForm({ ...form, paymentMethod: method.id })}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        form.paymentMethod === method.id ? "bg-[#eaa838]/10 border-[#eaa838]" : "bg-white/[0.02] border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {method.icon}
                        <span className="font-bold text-white text-[11px]">{method.title}</span>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border ${form.paymentMethod === method.id ? "bg-[#eaa838] border-[#eaa838]" : "border-white/30"}`} />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white uppercase">
                  ALLOCATION SECURED
                </h3>
                <p className="text-xs text-white/70 max-w-md mx-auto font-sans leading-relaxed">
                  Your dispatch requisition <span className="font-mono text-[#eaa838] font-bold">#ASH-8942-IN</span> has been received. Our concierge team has verified your escrow allocation.
                </p>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 max-w-sm mx-auto font-mono text-[11px] text-white/60 text-left space-y-1">
                  <div>DISPATCH DESTINATION: {form.city}, {form.state}</div>
                  <div>TRACKING CARRIER: Air Express Freight</div>
                  <div>CLIENT CONTACT: {form.email}</div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/account"
                    className="px-6 py-3 rounded-full text-black font-extrabold text-xs tracking-wider uppercase bg-gold-gradient hover:bg-gold-gradient-hover inline-flex items-center gap-2"
                  >
                    <span>VIEW LIVE ORDER TIMELINE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Step Action Button */}
            {step < 4 && (
              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                {step > 1 ? (
                  <button
                    onClick={() => setStep((prev) => (prev - 1) as any)}
                    className="text-white/50 hover:text-white uppercase text-[11px]"
                  >
                    ← PREVIOUS STEP
                  </button>
                ) : <div />}

                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-full text-black font-extrabold text-xs tracking-wider uppercase bg-gold-gradient hover:bg-gold-gradient-hover flex items-center gap-2 shadow-lg"
                >
                  <span>{step === 3 ? "AUTHORIZE ALLOCATION" : "CONTINUE NEXT"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Column (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#090b10] border border-white/10 space-y-5 font-mono text-xs">
            <h3 className="text-xs text-[#eaa838] uppercase font-bold tracking-widest border-b border-white/10 pb-3">
              REQUISITION VALUATION
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cart.map(({ product, quantity, selectedVariant }) => (
                <div key={`${product.id}-${selectedVariant || ""}`} className="flex items-center justify-between py-1 border-b border-white/5">
                  <div>
                    <h4 className="font-bold text-white truncate max-w-[200px]">{product.name}</h4>
                    <span className="text-[10px] text-white/40">Qty: {quantity} {selectedVariant ? `• ${selectedVariant}` : ""}</span>
                  </div>
                  <span className="text-[#eaa838] font-bold">
                    {formatPrice(product.price * quantity, product.priceUSD * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <div className="flex justify-between text-white/50">
                <span>EXPEDITION FREIGHT</span>
                <span className="text-emerald-400 font-bold">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>INSURED ESCROW</span>
                <span>INCLUDED</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                <span>TOTAL VALUATION</span>
                <span className="text-base text-gold-shimmer">
                  {formatPrice(totalPriceINR, totalPriceUSD)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
}
