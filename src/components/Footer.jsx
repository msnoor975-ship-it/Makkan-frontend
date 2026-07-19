import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ChevronRight, ArrowUp } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import client from '../api/client'
import ImagePlaceholder from './ImagePlaceholder'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-medium flex items-center justify-center transition-colors z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  )
}

function Footer() {
  const [email, setEmail] = useState('')

  // Fetch recent properties for photo gallery
  const { data: recentProperties } = useQuery({
    queryKey: ['recent-properties'],
    queryFn: async () => {
      const response = await client.get('/api/houses?limit=6')
      const data = Array.isArray(response.data) ? response.data : []
      return data.slice(0, 6)
    },
  })

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const quickLinks = [
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Our Services', to: '/services' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
  ]

  const bottomLinks = [
    { label: 'Home', to: '/' },
    { label: 'Cookies', to: '/cookies' },
    { label: 'Help', to: '/help' },
    { label: 'FAQs', to: '/faq' },
  ]

  const socialLinks = [
    { name: 'FB', href: '#', label: 'Facebook' },
    { name: 'TW', href: '#', label: 'Twitter' },
    { name: 'IG', href: '#', label: 'Instagram' },
    { name: 'LI', href: '#', label: 'LinkedIn' },
  ]

  return (
    <>
      <footer className="bg-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Column 1: Get In Touch */}
            <div>
              <h3 className="font-heading font-bold text-xl mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-1" />
                  <span className="text-neutral-300 text-sm leading-relaxed">
                    123 Real Estate Street, Riyadh, Saudi Arabia
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-neutral-300 text-sm">+966 50 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-neutral-300 text-sm">info@suzrealestate.com</span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-3 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full border-2 border-neutral-400 flex items-center justify-center hover:border-primary-400 hover:text-primary-400 transition-colors text-sm font-semibold"
                    aria-label={social.label}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-heading font-bold text-xl mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="flex items-center text-neutral-300 hover:text-primary-400 transition-colors text-sm"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 flex-shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Photo Gallery */}
            <div>
              <h3 className="font-heading font-bold text-xl mb-6">Photo Gallery</h3>
              <div className="grid grid-cols-3 gap-2">
                {recentProperties?.slice(0, 6).map((property) => (
                  <div
                    key={property.id}
                    className="aspect-square rounded-lg overflow-hidden bg-neutral-600"
                  >
                    {property.imageUrl ? (
                      <img
                        src={property.imageUrl}
                        alt={property.address}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full" style={{ display: property.imageUrl ? 'none' : 'flex' }}>
                      <ImagePlaceholder type="house" size="large" />
                    </div>
                  </div>
                ))}
                {/* Fallback placeholders if no data */}
                {!recentProperties && [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg"
                  >
                    <ImagePlaceholder type="house" size="large" />
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h3 className="font-heading font-bold text-xl mb-6">Newsletter</h3>
              <p className="text-neutral-300 text-sm mb-4 leading-relaxed">
                Subscribe to our newsletter to get the latest property updates and offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-neutral-700 border border-neutral-600 text-white placeholder-neutral-400 focus:outline-none focus:border-primary-400 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r-lg font-semibold text-sm transition-colors"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-neutral-400 text-sm">
                © 2024 Makkan Real Estate. All rights reserved.
              </p>
              <div className="flex space-x-6">
                {bottomLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </>
  )
}

export default Footer
