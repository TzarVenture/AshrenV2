"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useWeather } from "@/lib/weather-context";
import { useStore } from "@/lib/store";
import { MOCK_PRODUCTS } from "@/data/products.mock";
import { ArrowRight, Crosshair } from "lucide-react";

interface ArchitectureStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  hotspot: { x: string; y: string; label: string };
  scale: number;
  rotate: number;
}

const STEPS: ArchitectureStep[] = [
  {
    id: "step-1",
    stepNumber: "01",
    title: "THE MONOLITH",
    subtitle: "FORGED CARBON UNIBODY CHASSIS",
    description: "Milled from aerospace-grade structural carbon prepreg and titanium hardware. Delivers structural rigidity capable of surviving 14G accelerations while reducing all-up weight to just 890 grams.",
    specs: [
      { label: "MATERIAL", value: "T1000 Forged Carbon + Titanium" },
      { label: "TORSIONAL STIFFNESS", value: "34.8 kNm/rad" },
      { label: "WIND TOLERANCE", value: "Class 8 Gale (74 km/h)" },
    ],
    hotspot: { x: "28%", y: "42%", label: "CARBON MONOCOQUE SPAN" },
    scale: 1,
    rotate: 0,
  },
  {
    id: "step-2",
    stepNumber: "02",
    title: "THE 4K OPTIC",
    subtitle: "1-INCH DUAL-NATIVE ISO SENSOR",
    description: "Equipped with custom sapphire glass and 16-element coated optics. Dual-native ISO architecture captures full-spectrum color fidelity at high noon or under pitch-black midnight skies.",
    specs: [
      { label: "SENSOR RESOLUTION", value: "8K 60FPS / 4K 120FPS ProRes" },
      { label: "DYNAMIC RANGE", value: "14.2 Stops Calibrated" },
      { label: "APERTURE RANGE", value: "f/1.8 - f/11 Stepless" },
    ],
    hotspot: { x: "65%", y: "55%", label: "8K SAPPHIRE DUAL-OPTIC" },
    scale: 1.18,
    rotate: 4,
  },
  {
    id: "step-3",
    stepNumber: "03",
    title: "THE BALANCE",
    subtitle: "TRI-AXIS DECOUPLED BRUSHLESS GIMBAL",
    description: "Direct-drive magnetic core motors sample positional error 4,000 times per second. Even during erratic turbulence, optical horizon tilt variance remains under 0.001 degrees.",
    specs: [
      { label: "ANGULAR JITTER", value: "±0.001° Micro-deviation" },
      { label: "RESPONSE LATENCY", value: "0.25 Milliseconds" },
      { label: "MECHANICAL RANGE", value: "-135° to +45° Pitch" },
    ],
    hotspot: { x: "58%", y: "62%", label: "SUB-MILLIRADIAN MOTOR" },
    scale: 1.15,
    rotate: -6,
  },
  {
    id: "step-4",
    stepNumber: "04",
    title: "THE NEURAL VPU",
    subtitle: "40 TOPS OMNIDIRECTIONAL AUTONOMY",
    description: "Six optical stereo cameras coupled with long-range LiDAR create a real-time 3D voxel map of the surrounding terrain at 120Hz, ensuring seamless high-speed trajectory navigation.",
    specs: [
      { label: "AI ENGINE", value: "40 TOPS Neural Processor" },
      { label: "MAPPING REFRESH", value: "120Hz Real-Time Voxel" },
      { label: "AVOIDANCE ENVELOPE", value: "360° Omnidirectional" },
    ],
    hotspot: { x: "52%", y: "30%", label: "LIDAR STEREO ARRAY" },
    scale: 1.08,
    rotate: 2,
  },
  {
    id: "step-5",
    stepNumber: "05",
    title: "THE SHIELD",
    subtitle: "HERMETIC IPX8 HYDROPHOBIC BARRIER",
    description: "Internally pressurized cavity with micro-gasket seals and nanocoated electronics allows the flight platform to take off and capture pristine cinema footage in torrential monsoons.",
    specs: [
      { label: "INGRESS RATING", value: "IPX8 Active Monsoon" },
      { label: "COATING", value: "Superhydrophobic Nano-layer" },
      { label: "THERMAL ENVELOPE", value: "-30°C to +55°C" },
    ],
    hotspot: { x: "72%", y: "50%", label: "HYDROPHOBIC LENS COAT" },
    scale: 1.1,
    rotate: -3,
  },
];

export default function ProductStory() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { theme } = useWeather();
  const { addToCart, setQuickViewProduct } = useStore();

  const step = STEPS[activeStepIndex];
  const product = MOCK_PRODUCTS[0];

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 mb-12 gap-4 font-mono">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#eaa838] block font-bold">
            ARCHITECTURE BREAKDOWN // 03
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white uppercase mt-1">
            ANATOMY OF AUTONOMY
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span>INTERACTIVE HARDWARE TELEMETRY</span>
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.accent }} />
        </div>
      </div>

      {/* Main Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* Visual Showcase (7 Cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[500px]">
          <div
            className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full blur-[90px] opacity-35 transition-colors duration-1000 pointer-events-none"
            style={{ backgroundColor: theme.accent }}
          />

          <motion.div
            key={step.id}
            initial={{ opacity: 0.7, scale: 0.95 }}
            animate={{ opacity: 1, scale: step.scale, rotate: step.rotate }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl aspect-[16/9] flex items-center justify-center cursor-pointer"
            onClick={() => setQuickViewProduct(product)}
            data-cursor="view"
          >
            <Image
              src="/assets/hero_drone.jpg"
              alt="Ashren Anatomy"
              fill
              className="object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            />

            {/* Pulsing Interactive Hotspot */}
            <div
              className="absolute z-30 flex items-center gap-2 pointer-events-none"
              style={{ top: step.hotspot.y, left: step.hotspot.x }}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="absolute w-6 h-6 rounded-full animate-ping opacity-75"
                  style={{ backgroundColor: theme.accent }}
                />
                <span
                  className="relative w-3.5 h-3.5 rounded-full border-2 border-black flex items-center justify-center"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-black/85 border border-white/20 text-[9px] font-mono font-bold tracking-widest text-white backdrop-blur-md whitespace-nowrap shadow-lg">
                {step.hotspot.label}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Technical Specs (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Step selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {STEPS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all uppercase whitespace-nowrap ${
                  activeStepIndex === idx
                    ? "bg-gold-gradient text-black font-extrabold shadow-md scale-105"
                    : "bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {s.stepNumber} // {s.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <span
                className="text-[11px] font-mono tracking-[0.25em] font-bold uppercase block"
                style={{ color: theme.accent }}
              >
                STEP {step.stepNumber} // {step.subtitle}
              </span>

              <h3 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white uppercase leading-tight">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
                {step.description}
              </p>

              <div className="grid grid-cols-1 gap-2 pt-2">
                {step.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 font-mono"
                  >
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">
                      {spec.label}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-4 border-t border-white/10 flex items-center gap-4">
            <button
              onClick={() => addToCart(product)}
              className="px-6 py-3 rounded-full text-black font-extrabold text-xs tracking-[0.2em] uppercase flex items-center gap-2 shadow-lg transition-transform hover:scale-105 bg-gold-gradient hover:bg-gold-gradient-hover"
            >
              <span>ACQUIRE G-1 PRO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setQuickViewProduct(product)}
              className="text-xs font-mono text-white/60 hover:text-white uppercase tracking-wider py-2"
            >
              FULL SPECIFICATIONS →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
