export interface ProductItem {
  id: string;
  name: string;
  series: string;
  category: "drone" | "pocket-gimbal" | "lens" | "accessory";
  priceINR: number;
  priceUSD: number;
  tagline: string;
  description: string;
  image: string;
  badge?: string;
  specs: {
    resolution: string;
    stabilization: string;
    sensor: string;
    batteryOrWeight: string;
    weatherRating: string;
  };
  highlights: string[];
  weatherAffinity: ("RAIN" | "STORM" | "CLEAR" | "NIGHT" | "FOG" | "CLOUDY")[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "g1-pro",
    name: "AETHERIA G-1 PRO",
    series: "SERIES 04 // FLAGSHIP",
    category: "drone",
    priceINR: 34999,
    priceUSD: 419,
    tagline: "Autonomous 8K Dual-Gimbal Cinematic Flight Instrument",
    description: "Constructed with forged carbon fiber and aerospace-grade titanium, the G-1 Pro delivers cinema-grade 8K ProRes capture with active dual-axis gimbal decoupling and real-time wind shear cancellation.",
    image: "/assets/hero_drone.jpg",
    badge: "FLAGSHIP ARCHITECTURE",
    specs: {
      resolution: "8K 60FPS RAW",
      stabilization: "Tri-Decoupled 0.001° Gyro",
      sensor: "1-inch CMOS Dual-Native ISO",
      batteryOrWeight: "48 Min Flight Envelope",
      weatherRating: "IPX8 Submersion Proof",
    },
    highlights: [
      "Aerospace titanium alloy structural frame",
      "Neural obstacle tracking up to 85 km/h",
      "Sub-milliradian brushless motor response",
      "Encrypted 10-bit HDR low-latency link",
    ],
    weatherAffinity: ["RAIN", "STORM", "CLEAR", "NIGHT", "CLOUDY"],
  },
  {
    id: "pocket-c2",
    name: "AETHERIA POCKET C-2",
    series: "SERIES 02 // COMPACT",
    category: "pocket-gimbal",
    priceINR: 21999,
    priceUSD: 264,
    tagline: "Handheld 4K Pocket Gimbal with 180° Rotating Optic",
    description: "An intimate documentary tool machined from solid obsidian aluminum. Features an ultra-responsive mechanical gimbal, knurled manual focus wheel, and micro OLED histogram monitor.",
    image: "/assets/pocket_gimbal.jpg",
    badge: "CREATOR ESSENTIAL",
    specs: {
      resolution: "4K 120FPS D-Log",
      stabilization: "Micro 3-Axis HorizonLock",
      sensor: "1/1.3\" Custom Low-Noise CMOS",
      batteryOrWeight: "164 Grams Unladen",
      weatherRating: "IP54 Weather Sealed",
    },
    highlights: [
      "Instant 180° rotation for vertical cinematic formats",
      "High-fidelity directional stereo beam microphones",
      "OLED telemetry screen with real-time waveform",
      "Magnetic modular accessory shoe",
    ],
    weatherAffinity: ["CLEAR", "NIGHT", "CLOUDY"],
  },
  {
    id: "anamorphic-mk3",
    name: "ANAMORPHIC MK III",
    series: "OPTICS // CINEMA",
    category: "lens",
    priceINR: 14999,
    priceUSD: 179,
    tagline: "1.33x Cylindrical Cinema Flare Anamorphic Glass",
    description: "Engineered specifically for Aetheria gimbals. Yields an authentic 2.39:1 widescreen cinemascope ratio with signature horizontal sapphire flares and oval bokeh rendering.",
    image: "/assets/lens.jpg",
    badge: "OPTICAL PRECISION",
    specs: {
      resolution: "Ultra-Resist Multi-Coating",
      stabilization: "Zero Optical Distortion",
      sensor: "Full Sensor Area Utilization",
      batteryOrWeight: "42 Grams Featherweight",
      weatherRating: "Hydrophobic Sapphire Outer",
    },
    highlights: [
      "Custom anti-reflective nano diamond coating",
      "Magnetic precision bayonet mounting",
      "Authentic organic blue horizontal streak flare",
      "Zero vignetting at maximum aperture",
    ],
    weatherAffinity: ["NIGHT", "CLEAR", "STORM"],
  },
  {
    id: "horizon-x",
    name: "AETHERIA HORIZON X",
    series: "EXPEDITION // HEAVY-LIFT",
    category: "drone",
    priceINR: 58999,
    priceUSD: 709,
    tagline: "High-Altitude Storm-Penetrating Cinema Platform",
    description: "Built for extreme meteorological exploration. Quad-motor redundancy, heated carbon flight surfaces for sub-zero operation, and dual LiDAR terrain mapping.",
    image: "/assets/hero_drone.jpg",
    badge: "EXTREME OPERATIONS",
    specs: {
      resolution: "Dual Cinema Rig Mount",
      stabilization: "Extreme Gale Class 8 Hold",
      sensor: "LiDAR + Optical Multi-Spectrum",
      batteryOrWeight: "Dual Redundant Hot-Swap",
      weatherRating: "IPX8 Extreme Monsoon",
    },
    highlights: [
      "Heated battery bays operational down to -30°C",
      "Emergency parachute deployment module",
      "15 km military-grade encrypted RF transmission",
      "Quick-release dual camera payload bay",
    ],
    weatherAffinity: ["STORM", "FOG", "RAIN"],
  },
];

export const EDITORIAL_PROFILES = [
  {
    name: "Elena Rostova",
    role: "National Geographic Expedition Filmmaker",
    location: "Vatnajökull Glacier, Iceland",
    quote: "In -18°C sub-zero gale winds across the glacier, any other gimbal's lubricant freezes and the motors stutter. The G-1 Pro held its horizon lock without a single millisecond of flutter.",
    image: "/assets/elena_portrait.jpg",
    gear: "G-1 PRO + MK III ANAMORPHIC",
    coordinates: "64.1466° N, 16.7491° W",
  },
  {
    name: "Kai Takahashi",
    role: "Nocturnal Street Cinematographer",
    location: "Shinjuku, Tokyo",
    quote: "The Pocket C-2 has completely replaced my full-cage cinema camera for unscripted midnight shoots. The micro OLED histogram and low-light sensor gradation deliver organic shadows straight out of camera.",
    image: "/assets/category_cinematography.jpg",
    gear: "POCKET C-2 // OBSIDIAN EDITION",
    coordinates: "35.6938° N, 139.7034° E",
  },
  {
    name: "Marcus Vance",
    role: "Aerospace Documentary Director",
    location: "Great Rift Valley, Kenya",
    quote: "Chasing dust devils and sudden equatorial storms demands gear that laughs at the elements. Aetheria’s sealed titanium chassis is the first platform that feels genuinely military grade.",
    image: "/assets/landscape_bg.jpg",
    gear: "HORIZON X CINEMA RIG",
    coordinates: "0.4162° N, 36.0800° E",
  },
];

export const SOCIAL_WALL_ITEMS = [
  {
    id: "post-1",
    creator: "@rostova.film",
    location: "Iceland Highlands",
    camera: "Aetheria G-1 Pro",
    lens: "Anamorphic 1.33x",
    aspect: "tall",
    caption: "Chasing the volcanic plume through twilight fog. 8K RAW.",
    image: "/assets/elena_portrait.jpg",
  },
  {
    id: "post-2",
    creator: "@tokyo.neon.drift",
    location: "Shibuya Crossing",
    camera: "Aetheria Pocket C-2",
    lens: "f/1.8 Prime",
    aspect: "wide",
    caption: "Rain soaked reflections at 120fps. Zero gimbal jitter on wet asphalt.",
    image: "/assets/category_cinematography.jpg",
  },
  {
    id: "post-3",
    creator: "@norway_peaks",
    location: "Lofoten Islands",
    camera: "Aetheria Horizon X",
    lens: "Dual Sensor",
    aspect: "tall",
    caption: "Midnight sun cutting through arctic mist. 6,000 meters elevation.",
    image: "/assets/landscape_bg.jpg",
  },
  {
    id: "post-4",
    creator: "@vance_cinema",
    location: "Atacama Salt Flats",
    camera: "Aetheria G-1 Pro",
    lens: "Cinema Flare MK III",
    aspect: "square",
    caption: "The cleanest shadow dynamic range I've recorded in 12 years of filming.",
    image: "/assets/hero_drone.jpg",
  },
];
