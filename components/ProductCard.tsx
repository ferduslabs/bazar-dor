import Link from "next/link";
import { Product, getChangePercent, getEmojiForProduct, getProductSlug } from "@/lib/api";
import { formatBengaliPrice, getChangeBadge } from "@/lib/bengali";

export default function ProductCard({ product }: { product: Product }) {
  const change = getChangePercent(product);
  const badge = getChangeBadge(change);
  const emoji = product.emoji || getEmojiForProduct(product.name);
  const slug = getProductSlug(product);

  return (
    <Link href={`/product/${slug}`} className="block">
      <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow rounded-xl border border-base-300">
        <div className="card-body p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{emoji}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-base leading-tight">{product.name}</h3>
              <p className="text-sm text-base-content/60">{product.unit || "প্রতি কেজি"}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-xs text-base-content/50">আজকের দাম</p>
              <p className="text-lg font-bold text-primary">
                {formatBengaliPrice(product.price)}
              </p>
            </div>
            <div className={`text-right`}>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-semibold ${badge.color} bg-base-200`}>
                {badge.symbol} {badge.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
