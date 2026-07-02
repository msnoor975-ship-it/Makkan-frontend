import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Home, Calendar, DollarSign, Phone, Mail } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import client from '../api/client'

function PropertyDetail() {
  const { id } = useParams()

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const response = await client.get(`/api/houses/${id}`)
      return response.data
    },
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-neutral-200 rounded w-1/3"></div>
              <div className="h-64 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div>
        <Navbar />
        <div className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-ink font-heading font-bold text-2xl mb-4">Property Not Found</h1>
            <Link to="/properties" className="text-primary-500 hover:text-primary-600">
              Back to Properties
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = () => {
    if (property.listingType === 'sale') return 'bg-primary-500'
    if (property.listingType === 'rent') return 'bg-secondary-500'
    return 'bg-primary-500'
  }

  const getStatusText = () => {
    if (property.listingType === 'sale') return 'For Sale'
    if (property.listingType === 'rent') return 'For Rent'
    return property.listingType
  }

  return (
    <div>
      <Navbar />
      
      {/* Hero Image */}
      <div className="relative h-96 lg:h-[500px] bg-neutral-200">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.address}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-neutral-300 flex items-center justify-center">
            <span className="text-neutral-500 text-lg">No Image Available</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className={`${getStatusColor()} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-ink font-heading font-bold text-3xl lg:text-4xl mb-4">
                  {property.address}
                </h1>
                <div className="flex items-center text-muted space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>{property.address}</span>
                </div>
              </div>

              <div className="flex items-baseline space-x-4">
                <span className="text-primary-500 font-bold text-4xl">
                  SAR {property.price?.toLocaleString()}
                </span>
                {property.listingType === 'rent' && (
                  <span className="text-neutral-600 text-lg">/ month</span>
                )}
              </div>

              {/* Specifications */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <h2 className="text-ink font-heading font-semibold text-xl mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Home className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="text-neutral-500 text-sm">Type</p>
                      <p className="text-ink font-medium">Property</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="text-neutral-500 text-sm">Status</p>
                      <p className="text-ink font-medium capitalize">{property.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="text-neutral-500 text-sm">Listing Type</p>
                      <p className="text-ink font-medium capitalize">{property.listingType}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-ink font-heading font-semibold text-xl mb-4">Description</h2>
                <p className="text-neutral-600 text-lg leading-relaxed">
                  {property.specifications || 'No description available for this property.'}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <h2 className="text-ink font-heading font-semibold text-xl mb-4">Contact Agent</h2>
                <div className="space-y-4">
                  <a
                    href="tel:+966501234567"
                    className="flex items-center space-x-3 text-neutral-600 hover:text-primary-500 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+966 50 123 4567</span>
                  </a>
                  <a
                    href="mailto:info@makanrealestate.com"
                    className="flex items-center space-x-3 text-neutral-600 hover:text-primary-500 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>info@makanrealestate.com</span>
                  </a>
                </div>
                <Link
                  to="/contact"
                  className="block w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-3 font-semibold text-center transition-colors"
                >
                  Send Inquiry
                </Link>
              </div>

              {/* Quick Info */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <h2 className="text-ink font-heading font-semibold text-xl mb-4">Quick Info</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Property ID</span>
                    <span className="text-ink font-medium">#{property.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Listed</span>
                    <span className="text-ink font-medium">Recently</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Views</span>
                    <span className="text-ink font-medium">--</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PropertyDetail
