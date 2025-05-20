export const CategoryTreeSkeleton = () => (
  <div className="animate-pulse space-y-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
    ))}
  </div>
);