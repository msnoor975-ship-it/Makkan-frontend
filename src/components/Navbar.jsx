import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Building2, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false)
  const [isPagesOpen, setIsPagesOpen] = useState(false)
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const role = useAuthStore((state) => state.role)

  const isActive = (path) => location.pathname === path
  const isPropertiesActive = location.pathname.startsWith('/properties') || location.pathname.startsWith('/houses')
  const isPagesActive = ['/agents', '/blog', '/faq'].some(path => location.pathname.startsWith(path))

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-neutral-200 shadow-soft">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-primary-500" />
            <span className="text-ink font-heading font-bold text-xl">Makkan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-primary-500' : 'text-neutral-600 hover:text-primary-500'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive('/about') ? 'text-primary-500' : 'text-neutral-600 hover:text-primary-500'
              }`}
            >
              About
            </Link>

            {/* Properties Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center space-x-1 font-medium transition-colors ${
                  isPropertiesActive ? 'text-primary-500' : 'text-neutral-600 hover:text-primary-500'
                }`}
                onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
              >
                <span>Properties</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isPropertiesOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-surface rounded-lg shadow-medium border border-neutral-200 py-2">
                  <Link to="/properties?type=sale" className="block px-4 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-500">
                    For Sale
                  </Link>
                  <Link to="/properties?type=rent" className="block px-4 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-500">
                    For Rent
                  </Link>
                  <Link to="/properties" className="block px-4 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-500">
                    All Properties
                  </Link>
                </div>
              )}
            </div>

            {/* Pages Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center space-x-1 font-medium transition-colors ${
                  isPagesActive ? 'text-primary-500' : 'text-neutral-600 hover:text-primary-500'
                }`}
                onClick={() => setIsPagesOpen(!isPagesOpen)}
              >
                <span>Pages</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isPagesOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-surface rounded-lg shadow-medium border border-neutral-200 py-2">
                  <Link to="/agents" className={`block px-4 py-2 ${isActive('/agents') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-500'}`}>
                    Our Agents
                  </Link>
                  <Link to="/blog" className={`block px-4 py-2 ${isActive('/blog') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-500'}`}>
                    Blog
                  </Link>
                  <Link to="/faq" className={`block px-4 py-2 ${isActive('/faq') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-500'}`}>
                    FAQ
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-primary-500' : 'text-neutral-600 hover:text-primary-500'
              }`}
            >
              Contact
            </Link>

            {/* Dashboard Link for logged-in users */}
            {user && (
              <Link
                to="/dashboard"
                className={`font-medium transition-colors ${
                  location.pathname.startsWith('/dashboard') ? 'text-primary-500' : 'text-neutral-600 hover:text-primary-500'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            {user ? (
              <Link
                to={role === 'manager' || role === 'sales_employee' ? '/houses/add' : '/dashboard'}
                className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2.5 font-semibold transition-colors"
              >
                {role === 'manager' || role === 'sales_employee' ? 'Add Property' : 'Dashboard'}
              </Link>
            ) : (
              <Link
                to="/signup"
                className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2.5 font-semibold transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-surface">
          <div className="px-6 py-4 space-y-3">
            <Link
              to="/"
              className={`block font-medium transition-colors ${
                isActive('/') ? 'text-primary-500' : 'text-neutral-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block font-medium transition-colors ${
                isActive('/about') ? 'text-primary-500' : 'text-neutral-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="space-y-2">
              <button
                className={`flex items-center justify-between w-full font-medium ${isPropertiesActive ? 'text-primary-500' : 'text-neutral-600'}`}
                onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
              >
                <span>Properties</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isPropertiesOpen && (
                <div className="pl-4 space-y-2">
                  <Link to="/properties?type=sale" className="block text-neutral-600 hover:text-primary-500" onClick={() => setIsMenuOpen(false)}>
                    For Sale
                  </Link>
                  <Link to="/properties?type=rent" className="block text-neutral-600 hover:text-primary-500" onClick={() => setIsMenuOpen(false)}>
                    For Rent
                  </Link>
                  <Link to="/properties" className="block text-neutral-600 hover:text-primary-500" onClick={() => setIsMenuOpen(false)}>
                    All Properties
                  </Link>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <button
                className={`flex items-center justify-between w-full font-medium ${isPagesActive ? 'text-primary-500' : 'text-neutral-600'}`}
                onClick={() => setIsPagesOpen(!isPagesOpen)}
              >
                <span>Pages</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isPagesOpen && (
                <div className="pl-4 space-y-2">
                  <Link to="/agents" className={`block ${isActive('/agents') ? 'text-primary-500' : 'text-neutral-600 hover:text-primary-500'}`} onClick={() => setIsMenuOpen(false)}>
                    Our Agents
                  </Link>
                  <Link to="/blog" className={`block ${isActive('/blog') ? 'text-primary-500' : 'text-neutral-600 hover:text-primary-500'}`} onClick={() => setIsMenuOpen(false)}>
                    Blog
                  </Link>
                  <Link to="/faq" className={`block ${isActive('/faq') ? 'text-primary-500' : 'text-neutral-600 hover:text-primary-500'}`} onClick={() => setIsMenuOpen(false)}>
                    FAQ
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/contact"
              className={`block font-medium transition-colors ${
                isActive('/contact') ? 'text-primary-500' : 'text-neutral-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {/* Dashboard Link for logged-in users */}
            {user && (
              <Link
                to="/dashboard"
                className={`block font-medium transition-colors ${
                  location.pathname.startsWith('/dashboard') ? 'text-primary-500' : 'text-neutral-600 hover:text-primary-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <div className="pt-4">
              {user ? (
                <Link
                  to={role === 'manager' || role === 'sales_employee' ? '/houses/add' : '/dashboard'}
                  className="block w-full bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2.5 font-semibold transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {role === 'manager' || role === 'sales_employee' ? 'Add Property' : 'Dashboard'}
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="block w-full bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2.5 font-semibold transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
