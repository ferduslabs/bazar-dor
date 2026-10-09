export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="card bg-base-200 rounded-xl border border-base-300">
          <div className="card-body p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="skeleton-box w-16 h-16 rounded-xl"></div>
              <div className="flex-1">
                <div className="skeleton-box h-4 w-3/4 mb-2 rounded"></div>
                <div className="skeleton-box h-3 w-1/2 rounded"></div>
              </div>
            </div>
            <div className="mt-2">
              <div className="skeleton-box h-3 w-20 mb-2 rounded"></div>
              <div className="flex justify-between items-center">
                <div className="skeleton-box h-6 w-24 rounded"></div>
                <div className="skeleton-box h-6 w-16 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
