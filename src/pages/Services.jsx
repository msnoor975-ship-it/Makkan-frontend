import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Home, Search, FileText, Users, Shield, TrendingUp } from 'lucide-react'

function Services() {
  const services = [
    {
      icon: Home,
      title: 'Property Sales',
      description: 'We help you find and purchase your dream property with expert guidance throughout the buying process, from property search to final transfer.'
    },
    {
      icon: Search,
      title: 'Property Rentals',
      description: 'Whether you\'re looking for a short-term rental or long-term lease, we have a wide selection of rental properties to suit your needs and budget.'
    },
    {
      icon: FileText,
      title: 'Property Valuation',
      description: 'Get accurate property valuations from our certified appraisers to ensure you make informed decisions when buying or selling.'
    },
    {
      icon: Users,
      title: 'Property Management',
      description: 'Comprehensive property management services including tenant screening, rent collection, maintenance, and regular inspections.'
    },
    {
      icon: Shield,
      title: 'Legal Assistance',
      description: 'Our legal experts help with all documentation and legal requirements for property transactions in Saudi Arabia.'
    },
    {
      icon: TrendingUp,
      title: 'Investment Advisory',
      description: 'Expert advice on real estate investment opportunities to help you build a profitable property portfolio.'
    }
  ]

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-ink font-heading font-bold text-4xl lg:text-5xl mb-6">Our Services</h1>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            Comprehensive real estate services tailored to meet all your property needs in Saudi Arabia
          </p>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-xl p-8 hover:shadow-card transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="text-ink font-heading font-semibold text-xl mb-4">{service.title}</h3>
                <p className="text-neutral-600 text-lg leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-primary-50 rounded-xl p-8 lg:p-12 text-center">
            <h2 className="text-ink font-heading font-bold text-2xl lg:text-3xl mb-4">Ready to Get Started?</h2>
            <p className="text-neutral-600 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss how we can help you with your real estate needs.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-8 py-3 font-semibold transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Services
