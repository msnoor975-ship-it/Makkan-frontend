import { Home, User, Building, Image as ImageIcon } from 'lucide-react'

function ImagePlaceholder({ type = 'default', size = 'medium' }) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  }

  const iconSizes = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-14 h-14',
  }

  const getIcon = () => {
    switch (type) {
      case 'house':
        return <Home className={iconSizes[size]} />
      case 'user':
        return <User className={iconSizes[size]} />
      case 'building':
        return <Building className={iconSizes[size]} />
      default:
        return <ImageIcon className={iconSizes[size]} />
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'house':
        return 'No House Image'
      case 'user':
        return 'No Photo'
      case 'building':
        return 'No Building Image'
      default:
        return 'No Image'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-neutral-100 rounded-lg">
      <div className="text-neutral-400">
        {getIcon()}
      </div>
      <span className="text-neutral-400 text-xs mt-2 font-medium">
        {getLabel()}
      </span>
    </div>
  )
}

export default ImagePlaceholder
