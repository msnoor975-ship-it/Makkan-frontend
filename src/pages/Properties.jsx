import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams, useNavigate } from 'react-router-dom'
import client from '../api/client'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'
import PropertyCardSkeleton from '../components/PropertyCardSkeleton'
import EmptyState from '../components/EmptyState'

function Properties() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const categoryFilter = searchParams.get('category') || 'all'
  const typeFilter = searchParams.get('type') || 'all'

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties', categoryFilter, typeFilter],
    queryFn: async () => {
      let url = '/api/houses?status=available'
      if (typeFilter === 'sale') url += '&listingType=sale'
      if (typeFilter === 'rent') url += '&listingType=rent'
      const response = await client.get(url)
      const data = Array.isArray(response.data) ? response.data : []
      return data
    },
  })

  const filters = [
    { id: 'all', label: 'All Properties' },
    { id: 'sale', label: 'For Sale' },
    { id: 'rent', label: 'For Rent' },
  ]

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-ink font-heading font-bold text-4xl lg:text-5xl mb-6">Properties</h1>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            Browse our extensive collection of properties for sale and rent
          </p>
        </div>
      </section>

      {/* Properties Content */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams)
                  if (filter.id === 'all') {
                    newParams.delete('type')
                  } else {
                    newParams.set('type', filter.id)
                  }
                  navigate(`/properties?${newParams.toString()}`)
                }}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
                  typeFilter === filter.id || (filter.id === 'all' && !typeFilter)
                    ? 'bg-primary-500 text-white'
                    : 'bg-surface border-2 border-neutral-200 text-neutral-600 hover:border-primary-500 hover:text-primary-500'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Property Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
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
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Properties
