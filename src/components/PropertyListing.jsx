import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import client from '../api/client'
import PropertyCard from './PropertyCard'
import PropertyCardSkeleton from './PropertyCardSkeleton'
import EmptyState from './EmptyState'

function PropertyListing() {
  const [filter, setFilter] = useState('featured')

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties', filter],
    queryFn: async () => {
      let url = '/api/houses?status=available'
      if (filter === 'sale') url += '&listingType=sale'
      if (filter === 'rent') url += '&listingType=rent'
      const response = await client.get(url)
      const data = Array.isArray(response.data) ? response.data : []
      return data.slice(0, 6)
    },
  })

  const filters = [
    { id: 'featured', label: 'Featured' },
    { id: 'sale', label: 'For Sale' },
    { id: 'rent', label: 'For Rent' },
  ]

  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-ink font-heading font-bold text-3xl mb-2">Property Listing</h2>
            <p className="text-neutral-600 text-lg">
              Explore our handpicked selection of premium properties
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                  filter === f.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-surface border-2 border-neutral-200 text-neutral-600 hover:border-primary-500 hover:text-primary-500'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <EmptyState 
            message="Failed to load properties" 
            subMessage="Please try again later." 
          />
        ) : properties?.length === 0 ? (
          <EmptyState 
            message="No properties found" 
            subMessage="Try adjusting your filters or check back later." 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* View All Button */}
        {!isLoading && properties?.length > 0 && (
          <div className="text-center mt-12">
            <a
              href="/houses"
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-8 py-3 font-semibold transition-colors"
            >
              View All Properties
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default PropertyListing
