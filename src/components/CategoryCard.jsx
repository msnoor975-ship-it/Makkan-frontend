import { Link } from 'react-router-dom'
import { Building, Home, Store, Warehouse } from 'lucide-react'

const categoryIcons = {
  building: Building,
  townhouse: Home,
  shop: Store,
  garage: Warehouse,
}

function CategoryCard({ name, count, icon, to }) {
  const IconComponent = categoryIcons[icon] || Building

  return (
    <Link
      to={to || `/properties?category=${name.toLowerCase()}`}
      className="bg-surface shadow-card rounded-xl p-6 hover:shadow-medium transition-shadow group"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Circular icon */}
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
          <IconComponent className="w-8 h-8 text-primary-500" />
        </div>

        {/* Category name */}
        <h3 className="text-ink font-heading font-semibold text-lg">{name}</h3>

        {/* Property count */}
        <p className="text-primary-500 font-medium text-sm">{count} Properties</p>
      </div>
    </Link>
  )
}

export default CategoryCard
