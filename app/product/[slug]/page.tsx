"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getSingleProduct,
  getEmojiForProduct,
  getChangePercent,
  Product,
} from "@/lib/api";
import {
  formatBengaliPrice,
  formatBengaliPercent,
  getChangeBadge,
} from "@/lib/bengali";
import Skeleton from "@/components/Skeleton";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("প্রথমে লগইন করুন");
      router.push("/signin");
      return;
    }
    setAuthChecked(true);
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;

    async function fetchProduct() {
      setLoading(true);
      try {
        const data = await getSingleProduct(slug);
        if (!data) {
          setProduct(null);
        } else {
          setProduct(data);
        }
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug, authChecked]);

  if (!authChecked) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="skeleton-box h-8 w-48 mb-2 rounded"></div>
          <div className="skeleton-box h-4 w-64 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card bg-base-200 p-6 rounded-xl">
              <div className="skeleton-box h-6 w-32 mb-3 rounded"></div>
              <div className="skeleton-box h-10 w-24 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-4">📦</div>
          <h1 className="text-2xl font-bold mb-2">পণ্য খুঁজে পাওয়া যায়নি</h1>
          <p className="text-base-content/60 mb-6">
            এই পণ্যটি আর উপলব্ধ নাও থাকতে পারে।
          </p>
          <Link href="/" className="btn btn-primary">
            হোম পেজে ফিরে যাও
          </Link>
        </div>
      </div>
    );
  }

  const emoji = product.emoji || getEmojiForProduct(product.name);
  const change = getChangePercent(product);
  const badge = getChangeBadge(change);

  const minPrice = product.min_price || product.price;
  const maxPrice = product.max_price || product.price;
  const avgPrice = product.avg_price || Math.round((minPrice + maxPrice) / 2);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-sm text-base-content/60 hover:text-primary">
          ← হোমে ফিরে যাও
        </Link>
      </div>

      <div className="bg-base-100 rounded-xl shadow-md border border-base-300 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="text-7xl md:text-8xl flex-shrink-0">{emoji}</div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-base-content/60 mb-3">
              {product.description || `বাজারে বর্তমান দাম এবং পরিবর্তন`}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.category && (
                <span className="badge badge-primary badge-sm">{product.category}</span>
              )}
              {product.category_slug && (
                <Link href={`/category/${product.category_slug}`}>
                  <span className="badge badge-outline badge-sm">{product.category_slug}</span>
                </Link>
              )}
            </div>
            <p className="text-sm text-base-content/60">
              একক: {product.unit || "প্রতি কেজি"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-base-100 border border-base-300 shadow-sm rounded-xl">
          <div className="card-body p-5 text-center">
            <h3 className="text-sm text-base-content/60 mb-1">ন্যূনতম দাম</h3>
            <p className="text-2xl font-bold text-success">
              {formatBengaliPrice(minPrice)}
            </p>
          </div>
        </div>
        <div className="card bg-base-100 border border-base-300 shadow-sm rounded-xl">
          <div className="card-body p-5 text-center">
            <h3 className="text-sm text-base-content/60 mb-1">সর্বোচ্চ দাম</h3>
            <p className="text-2xl font-bold text-error">
              {formatBengaliPrice(maxPrice)}
            </p>
          </div>
        </div>
        <div className="card bg-base-100 border border-base-300 shadow-sm rounded-xl">
          <div className="card-body p-5 text-center">
            <h3 className="text-sm text-base-content/60 mb-1">গড় দাম</h3>
            <p className="text-2xl font-bold text-primary">
              {formatBengaliPrice(avgPrice)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-base-100 rounded-xl shadow-md border border-base-300 p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">বাজারভিত্তিক আজকের দাম</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-base-content/60">বর্তমান দাম</p>
            <p className="text-3xl font-bold">{formatBengaliPrice(product.price)}</p>
          </div>
          <div>
            <p className="text-sm text-base-content/60 mb-1">পরিবর্তন</p>
            <span className={`inline-flex items-center gap-1 px-3 py-2 rounded-md font-semibold ${badge.color} bg-base-200`}>
              {badge.symbol} {badge.text}
            </span>
          </div>
        </div>

        {product.markets && product.markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>বাজারের নাম</th>
                  <th className="text-right">দাম</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market, idx) => (
                  <tr key={idx}>
                    <td>{market.market_name}</td>
                    <td className="text-right font-medium">
                      {formatBengaliPrice(market.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-base-200 rounded-lg p-4">
            <p className="text-base-content/60 text-center text-sm">
              বর্তমান দাম: {formatBengaliPrice(product.price)} ({product.unit || "প্রতি কেজি"})
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Link href="/" className="btn btn-primary">
          হোমে ফিরে যাও
        </Link>
        {product.category_slug && (
          <Link href={`/category/${product.category_slug}`} className="btn btn-outline">
            এই ক্যাটাগরির সব পণ্য
          </Link>
        )}
      </div>
    </div>
  );
}
