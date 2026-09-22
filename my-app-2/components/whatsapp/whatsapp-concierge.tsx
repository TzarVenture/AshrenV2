"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { useWeather } from "@/lib/weather-context";
import { ArrowRight, X, Shield, Clock, MessageSquare } from "lucide-react";

export default function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const { openWhatsAppOrder } = useStore();
  const { theme } = useWeather();

  return (
    <div className="fixed bottom-5 left-5 z-[80] font-sans">
      {isOpen && (
        <div className="mb-3 p-5 rounded-2xl bg-[#0a0c12]/95 border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-w-sm w-[90vw] animate-in slide-in-from-bottom-3 duration-300 font-mono">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#eaa838] uppercase">
                ASHREN ATELIER CONCIERGE
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-white/70 font-sans leading-relaxed mb-4">
            Connect directly with an Ashren specialist for customized drone payload kits, enterprise fleet licensing, tailored garment sizing, or priority international dispatch.
          </p>

          <div className="space-y-2 text-[10px] text-white/50 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-white/40" />
              <span>AVERAGE RESPONSE: &lt; 2 MINUTES</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-white/40" />
              <span>DIRECT ENCRYPTED TELEMETRY CHAT</span>
            </div>
          </div>

          <button
            onClick={() => {
              openWhatsAppOrder();
              setIsOpen(false);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>START CONCIERGE DIALOGUE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0d0f17]/90 hover:bg-[#151822] border border-white/15 text-white/80 hover:text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-105 active:scale-95 group font-mono text-xs"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
        <span className="tracking-wider font-semibold">ORDER VIA WHATSAPP</span>
        <ArrowRight className="w-3 h-3 text-white/50 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
