function PropertyCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl shadow-card overflow-hidden">
      {/* Image skeleton */}
      <div className="h-48 bg-neutral-200 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        {/* Price skeleton */}
        <div className="h-7 bg-neutral-200 rounded animate-pulse w-1/2" />
        
        {/* Title skeleton */}
        <div className="h-6 bg-neutral-200 rounded animate-pulse w-3/4" />
        
        {/* Location skeleton */}
        <div className="h-4 bg-neutral-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  )
}

export default PropertyCardSkeleton
