"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getProductsByCategory,
  getSingleCategory,
  Product,
  Category,
} from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import SortDropdown, { SortOption } from "@/components/SortDropdown";
import Skeleton from "@/components/Skeleton";

interface Props {
  slug: string;
}

export default function CategoryClient({ slug }: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>("default");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [cat, prods] = await Promise.all([
          getSingleCategory(slug),
          getProductsByCategory(slug),
        ]);
        setCategory(cat);
        setProducts(prods);
        setSortedProducts(prods);
      } catch (err) {
        setCategory(null);
        setProducts([]);
        setSortedProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  useEffect(() => {
    if (products.length === 0) {
      setSortedProducts([]);
      return;
    }

    if (sortOption === "default") {
      setSortedProducts(products);
    } else {
      const sorted = [...products].sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        if (sortOption === "low-to-high") {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });
      setSortedProducts(sorted);
    }
  }, [sortOption, products]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="skeleton-box h-10 w-48 mb-2 rounded"></div>
          <div className="skeleton-box h-4 w-64 rounded"></div>
        </div>
        <Skeleton />
      </div>
    );
  }

  if (products.length === 0 && !loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-4">📭</div>
          <h1 className="text-2xl font-bold mb-2">এই ক্যাটাগরিতে কোনো পণ্য নেই</h1>
          <p className="text-base-content/60 mb-6">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য উপলব্ধ নয়।
          </p>
          <Link href="/" className="btn btn-primary">
            হোম পেজে ফিরে যাও
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            {category?.emoji || "📦"} {category?.name || slug}
          </h1>
          <p className="text-base-content/60 text-sm">
            মোট {products.length} টি পণ্য
          </p>
        </div>
        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
