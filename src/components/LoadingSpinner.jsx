import { Home, User, Building } from 'lucide-react'

function LoadingSpinner({ message = 'Loading...', type = 'default' }) {
  const getIcon = () => {
    switch (type) {
      case 'house':
        return <Home className="w-12 h-12" />
      case 'user':
        return <User className="w-12 h-12" />
      case 'building':
        return <Building className="w-12 h-12" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-neutral-500">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center text-primary-500 animate-pulse">
          {getIcon()}
        </div>
        <div
          className="border-4 border-neutral-200 border-t-primary-500 rounded-full w-16 h-16 animate-spin"
        />
      </div>
      <p className="mt-4 text-sm font-medium">{message}</p>
    </div>
  )
}

export default LoadingSpinner
