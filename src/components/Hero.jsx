import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

function Hero() {
  const isAuthenticated = useAuthStore((state) => !!state.token)

  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image with accent shape */}
          <div className="relative">
            {/* Primary accent shape */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-primary-500 rounded-2xl transform rotate-3 opacity-10"></div>
            <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 bg-primary-500 rounded-2xl transform -rotate-6 opacity-5"></div>
            
            {/* Main image */}
            <div className="relative bg-surface rounded-2xl shadow-medium overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                alt="Featured Property"
                className="w-full h-auto object-cover"
                style={{ minHeight: '400px' }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary-500/90 to-transparent p-6">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <h1 className="text-ink font-heading font-bold text-4xl lg:text-5xl leading-tight">
              Find Your Dream Home Today
            </h1>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Discover the perfect property for sale or rent. Browse our curated collection of premium homes and find your ideal living space with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-8 py-3 font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/properties"
                    className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-8 py-3 font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Browse Properties</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/login"
                    className="bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg px-8 py-3 font-semibold transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
              <div>
                <div className="text-2xl font-bold text-primary-500">500+</div>
                <div className="text-sm text-neutral-600">Properties</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-500">1000+</div>
                <div className="text-sm text-neutral-600">Happy Clients</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-500">50+</div>
                <div className="text-sm text-neutral-600">Expert Agents</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
