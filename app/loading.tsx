import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="skeleton-box h-8 w-48 mb-2 rounded"></div>
        <div className="skeleton-box h-4 w-64 rounded"></div>
      </div>
      <Skeleton />
    </div>
  );
}
