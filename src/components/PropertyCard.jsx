import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'

function PropertyCard({ property }) {
  const { id, address, price, listingType, specifications, imageUrl, status } = property

  const getStatusColor = () => {
    if (listingType === 'sale') return 'bg-primary-500'
    if (listingType === 'rent') return 'bg-secondary-500'
    return 'bg-primary-500'
  }

  const getStatusText = () => {
    if (listingType === 'sale') return 'For Sale'
    if (listingType === 'rent') return 'For Rent'
    return listingType
  }

  const getCategory = () => {
    if (specifications?.toLowerCase().includes('apartment')) return 'Apartment'
    if (specifications?.toLowerCase().includes('villa')) return 'Villa'
    if (specifications?.toLowerCase().includes('office')) return 'Office'
    if (specifications?.toLowerCase().includes('building')) return 'Building'
    return 'Property'
  }

  return (
    <Link
      to={`/houses/${id}`}
      className="block group"
    >
      <div className="bg-surface rounded-xl shadow-card hover:shadow-medium transition-shadow duration-200 overflow-hidden">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={address}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
          ) : null}
          <div className="w-full h-full" style={{ display: imageUrl ? 'none' : 'flex' }}>
            <ImagePlaceholder type="house" size="large" />
          </div>

          {/* Status tag */}
          <div className="absolute top-3 left-3">
            <span className={`${getStatusColor()} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
              {getStatusText()}
            </span>
          </div>

          {/* Category tag */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {getCategory()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Price */}
          <div className="mb-2">
            <span className="text-primary-500 font-bold text-xl">
              SAR {price?.toLocaleString()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-ink font-heading font-semibold text-lg mb-2 line-clamp-2">
            {address}
          </h3>

          {/* Location */}
          <div className="flex items-center text-muted text-sm">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{address}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PropertyCard
