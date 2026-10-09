const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

export interface Product {
  id: number;
  name: string;
  slug?: string;
  emoji?: string;
  category: string;
  category_slug?: string;
  unit: string;
  price: number;
  previous_price?: number;
  change_percent?: number;
  min_price?: number;
  max_price?: number;
  avg_price?: number;
  description?: string;
  markets?: MarketPrice[];
}

export interface MarketPrice {
  market_name: string;
  price: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  emoji?: string;
  product_count?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

async function fetchWithFallback(path: string): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL_1}${path}`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json) return json;
    throw new Error("Empty response");
  } catch (err1) {
    try {
      const res2 = await fetch(`${BASE_URL_2}${path}`, {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });
      if (!res2.ok) throw new Error(`HTTP ${res2.status}`);
      return await res2.json();
    } catch (err2) {
      throw new Error("Both API endpoints failed");
    }
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await fetchWithFallback("/products");
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.products && Array.isArray(data.products)) return data.products;
  return [];
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const data = await fetchWithFallback(`/products?category=${slug}`);
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.products && Array.isArray(data.products)) return data.products;
  return [];
}

export async function getSingleProduct(id: string): Promise<Product | null> {
  const data = await fetchWithFallback(`/products/${id}`);
  if (data && !Array.isArray(data)) {
    return data?.data || data?.product || data;
  }
  return null;
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await fetchWithFallback("/categories");
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.categories && Array.isArray(data.categories)) return data.categories;
  return [];
}

export async function getSingleCategory(slug: string): Promise<Category | null> {
  try {
    const data = await fetchWithFallback(`/categories/${slug}`);
    if (data && !Array.isArray(data)) {
      return data?.data || data?.category || data;
    }
    return null;
  } catch {
    return null;
  }
}

export function getProductSlug(product: Product): string {
  if (product.slug) return product.slug;
  return String(product.id);
}

export function getEmojiForProduct(name: string): string {
  const lowerName = name.toLowerCase();
  const emojiMap: Record<string, string> = {
    "চাল": "🍚",
    "ডাল": "🫘",
    "তেল": "🫙",
    "আলু": "🥔",
    "পেঁয়াজ": "🧅",
    "মরিচ": "🌶️",
    "মাছ": "🐟",
    "মুরগি": "🍗",
    "ডিম": "🥚",
    "আদা": "🫚",
    "রসুন": "🧄",
    "ছোল": "🫘",
    "চিনি": "🍬",
    "লবণ": "🧂",
    "আটা": "🌾",
    "দুধ": "🥛",
    "ময়দা": "🌾",
    "ব্রেড": "🍞",
    "কলা": "🍌",
    "আপেল": "🍎",
    "কাঁচা": "🥬",
    "শাক": "🥬",
    "সবজি": "🥕",
    "টমেট": "🍅",
    "ফুল": "🥦",
    "বরবটি": "🫛",
    "মিষ্টি": "🍠",
    "ভুট্ট": "🌽",
    "পেরে": "🍐",
    "লেবু": "🍋",
    "নারক": "🥥",
    "কাঠ": "🥥",
    "পান": "🫓",
  };

  for (const key in emojiMap) {
    if (lowerName.includes(key.toLowerCase()) || name.includes(key)) {
      return emojiMap[key];
    }
  }
  return "📦";
}

export function getChangePercent(product: Product): number {
  if (product.change_percent !== undefined) return product.change_percent;
  if (product.previous_price && product.price) {
    return ((product.price - product.previous_price) / product.previous_price) * 100;
  }
  return 0;
}
