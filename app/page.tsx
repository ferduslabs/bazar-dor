import { getAllProducts, getChangePercent, Product } from "@/lib/api";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Skeleton from "@/components/Skeleton";
import { Suspense } from "react";

export const dynamic = "force-static";

async function ProductSections() {
  let products: Product[] = [];

  try {
    products = await getAllProducts();
  } catch (err) {
    products = [];
  }

  if (products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-center text-base-content/60 py-8">
          ডেটা লোড করা যায়নি। পুনরায় চেষ্টা করুন।
        </p>
        <Skeleton />
      </div>
    );
  }

  const risers = [...products]
    .sort((a, b) => getChangePercent(b) - getChangePercent(a))
    .slice(0, 6);

  const fallers = [...products]
    .sort((a, b) => getChangePercent(a) - getChangePercent(b))
    .slice(0, 6);

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-1 text-success">
          আজ দাম বেড়েছে ▲
        </h2>
        <p className="text-base-content/60 mb-4 text-sm">
          শীর্ষ ৬টি পণ্য যাদের দাম সবচেয়ে বেশি বেড়েছে
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {risers.map((product) => (
            <ProductCard key={`riser-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 bg-error/5 rounded-xl">
        <h2 className="text-2xl font-bold mb-1 text-error">
          আজ দাম কমেছে ▼
        </h2>
        <p className="text-base-content/60 mb-4 text-sm">
          শীর্ষ ৬টি পণ্য যাদের দাম সবচেয়ে বেশি কমেছে
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {fallers.map((product) => (
            <ProductCard key={`faller-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="max-w-6xl mx-auto px-4 py-8 scroll-mt-32">
        <h2 className="text-2xl font-bold mb-1">সব পণ্য</h2>
        <p className="text-base-content/60 mb-4 text-sm">
          সকল পণ্যের বর্তমান দাম দেখুন
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={`all-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Skeleton />
        </div>
      }>
        <ProductSections />
      </Suspense>
    </>
  );
}
