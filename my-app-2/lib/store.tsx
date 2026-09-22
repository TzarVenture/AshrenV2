"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/services/products/types";
import { MOCK_PRODUCTS } from "@/data/products.mock";
import { WhatsAppService } from "@/services/whatsapp/whatsappService";
import { AnalyticsService } from "@/services/analytics/analyticsService";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPriceINR: number;
  totalPriceUSD: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Currency
  currency: "INR" | "USD";
  toggleCurrency: () => void;
  formatPrice: (inr: number, usd: number) => string;

  // Quick View
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Compare
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  // Recently Viewed Personalization
  recentlyViewed: Product[];
  recordView: (product: Product) => void;

  // WhatsApp Concierge Order
  openWhatsAppOrder: (product?: Product, variant?: string) => void;
  openWhatsAppCartOrder: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 1, selectedVariant: "Obsidian Black" },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(["prod-ashren-g1-pro"]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([MOCK_PRODUCTS[1], MOCK_PRODUCTS[2]]);

  const addToCart = (product: Product, quantity = 1, selectedVariant?: string) => {
    setCart((prev) => {
      const matchIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === selectedVariant
      );
      if (matchIndex > -1) {
        const next = [...prev];
        next[matchIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedVariant }];
    });
    setIsCartOpen(true);
    AnalyticsService.track("add_to_cart", { productId: product.id, price: product.price, quantity });
  };

  const removeFromCart = (productId: string, variant?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedVariant === variant))
    );
    AnalyticsService.track("remove_from_cart", { productId });
  };

  const updateQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedVariant === variant
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceINR = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalPriceUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "INR" ? "USD" : "INR"));
  };

  const formatPrice = (inr: number, usd: number) => {
    if (currency === "INR") {
      return `₹${inr.toLocaleString("en-IN")}`;
    }
    return `$${usd.toLocaleString("en-US")}`;
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        AnalyticsService.track("wishlist_remove", { productId });
        return prev.filter((id) => id !== productId);
      } else {
        AnalyticsService.track("wishlist_add", { productId });
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const addToCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) return;
    if (compareList.length >= 4) {
      alert("Comparison limit reached (max 4 products).");
      return;
    }
    setCompareList((prev) => [...prev, product]);
    setIsCompareOpen(true);
    AnalyticsService.track("compare_add", { productId: product.id });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const recordView = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
    AnalyticsService.track("product_view", { productId: product.id });
  };

  const openWhatsAppOrder = (product?: Product, variant?: string) => {
    const target = product || (cart[0]?.product ?? MOCK_PRODUCTS[0]);
    const url = WhatsAppService.generateProductOrderUrl(target, variant, currency === "INR" ? "₹" : "$");
    AnalyticsService.track("whatsapp_order", { productId: target.id, isSingle: true });
    window.open(url, "_blank");
  };

  const openWhatsAppCartOrder = () => {
    const totalFormatted = formatPrice(totalPriceINR, totalPriceUSD);
    const url = WhatsAppService.generateCartOrderUrl(cart, totalFormatted);
    AnalyticsService.track("whatsapp_order", { totalValuation: totalPriceINR, isCart: true });
    window.open(url, "_blank");
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPriceINR,
        totalPriceUSD,
        isCartOpen,
        setIsCartOpen,
        currency,
        toggleCurrency,
        formatPrice,
        quickViewProduct,
        setQuickViewProduct,
        wishlist,
        toggleWishlist,
        isWishlisted,
        compareList,
        addToCompare,
        removeFromCompare,
        isCompareOpen,
        setIsCompareOpen,
        recentlyViewed,
        recordView,
        openWhatsAppOrder,
        openWhatsAppCartOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
