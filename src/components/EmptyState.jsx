import { Home } from 'lucide-react'

function EmptyState({ message = 'No properties found', subMessage = 'Try adjusting your filters or check back later.' }) {
  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center">
          <Home className="w-8 h-8 text-muted" />
        </div>
      </div>
      <h3 className="text-ink font-heading font-semibold text-xl mb-2">{message}</h3>
      <p className="text-muted text-base">{subMessage}</p>
    </div>
  )
}

export default EmptyState
