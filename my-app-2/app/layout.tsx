import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashren | Haute Marketplace — Pocket 4K Gimbal Camera & Drone",
  description: "Ashren brings you premium gadgets, autonomous 4K flight systems, haute apparel, and fine horology. Discover 4K Ultra HD cameras with 180° rotation and AI stabilization.",
  keywords: ["Ashren", "Haute Marketplace", "Pocket 4K Gimbal", "Camera Drone", "Luxury Electronics", "Haute Fashion"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${spaceGrotesk.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#07080b] text-[#e8eaf0] selection:bg-[#eaa838]/30 selection:text-white font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
