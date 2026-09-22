"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductItem, PRODUCTS } from "./data";

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: ProductItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPriceINR: number;
  totalPriceUSD: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Currency
  currency: "INR" | "USD";
  setCurrency: (c: "INR" | "USD") => void;
  toggleCurrency: () => void;
  formatPrice: (inr: number, usd: number) => string;

  // Quick View
  quickViewProduct: ProductItem | null;
  setQuickViewProduct: (product: ProductItem | null) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // WhatsApp Order
  openWhatsAppOrder: (product?: ProductItem) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(["g1-pro"]);

  const addToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceINR = cart.reduce(
    (sum, item) => sum + item.product.priceINR * item.quantity,
    0
  );
  const totalPriceUSD = cart.reduce(
    (sum, item) => sum + item.product.priceUSD * item.quantity,
    0
  );

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
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const openWhatsAppOrder = (product?: ProductItem) => {
    const targetProduct = product || (cart[0]?.product ?? PRODUCTS[0]);
    const price = formatPrice(targetProduct.priceINR, targetProduct.priceUSD);
    const message = encodeURIComponent(
      `Hello Aetheria Concierge, I would like to inquire about acquiring the ${targetProduct.name} (${targetProduct.series}) priced at ${price}. Please share allocation details and expedited shipping terms.`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
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
        setCurrency,
        toggleCurrency,
        formatPrice,
        quickViewProduct,
        setQuickViewProduct,
        wishlist,
        toggleWishlist,
        isWishlisted,
        openWhatsAppOrder,
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
