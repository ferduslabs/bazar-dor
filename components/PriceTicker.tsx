"use client";

import { useState, useEffect } from "react";
import { Product, getChangePercent, getEmojiForProduct } from "@/lib/api";
import { formatBengaliPrice, formatBengaliPercent, getChangeBadge } from "@/lib/bengali";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { getAllProducts } = await import("@/lib/api");
        const data = await getAllProducts();
        setProducts(data.slice(0, 20));
      } catch (err) {
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="bg-base-300 py-2 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-base-content/60">
          দাম লোड হচ্ছে...
        </div>
      </div>
    );
  }

  const tickerItems = [...products, ...products];

  return (
    <div className="bg-base-300 border-b border-base-300 overflow-hidden">
      <div className="marquee-container py-2">
        <div className="marquee-track">
          {tickerItems.map((product, index) => {
            const change = getChangePercent(product);
            const badge = getChangeBadge(change);
            const emoji = product.emoji || getEmojiForProduct(product.name);

            return (
              <div key={index} className="inline-flex items-center gap-2 px-4 text-sm whitespace-nowrap">
                <span className="text-lg">{emoji}</span>
                <span className="font-medium">{product.name}</span>
                <span className="text-base-content/70">
                  {formatBengaliPrice(product.price)}
                </span>
                <span className={`font-semibold ${badge.color}`}>
                  {badge.symbol} {badge.text}
                </span>
                <span className="text-base-300 mx-2">|</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
