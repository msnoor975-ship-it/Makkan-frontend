import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Phone, Mail, MapPin } from 'lucide-react'

function Agents() {
  const agents = [
    {
      name: 'Sarah Johnson',
      title: 'Senior Real Estate Agent',
      phone: '+966 50 123 4567',
      email: 'sarah@makanrealestate.com',
      image: null,
      properties: 150
    },
    {
      name: 'Ahmed Al-Rashid',
      title: 'Property Consultant',
      phone: '+966 50 234 5678',
      email: 'ahmed@makanrealestate.com',
      image: null,
      properties: 120
    },
    {
      name: 'Fatima Hassan',
      title: 'Rental Specialist',
      phone: '+966 50 345 6789',
      email: 'fatima@makanrealestate.com',
      image: null,
      properties: 95
    },
    {
      name: 'Khalid Ibrahim',
      title: 'Investment Advisor',
      phone: '+966 50 456 7890',
      email: 'khalid@makanrealestate.com',
      image: null,
      properties: 80
    },
    {
      name: 'Nour Al-Saud',
      title: 'Residential Agent',
      phone: '+966 50 567 8901',
      email: 'nour@makanrealestate.com',
      image: null,
      properties: 110
    },
    {
      name: 'Omar Farooq',
      title: 'Commercial Agent',
      phone: '+966 50 678 9012',
      email: 'omar@makanrealestate.com',
      image: null,
      properties: 75
    }
  ]

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-ink font-heading font-bold text-4xl lg:text-5xl mb-6">Our Agents</h1>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            Meet our team of experienced real estate professionals dedicated to helping you find your perfect property
          </p>
        </div>
      </section>

      {/* Agents Content */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-xl overflow-hidden hover:shadow-card transition-shadow"
              >
                {/* Agent Image */}
                <div className="h-48 bg-neutral-200 flex items-center justify-center">
                  {agent.image ? (
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-neutral-400 text-lg">Agent Photo</div>
                  )}
                </div>

                {/* Agent Info */}
                <div className="p-6">
                  <h3 className="text-ink font-heading font-semibold text-xl mb-1">{agent.name}</h3>
                  <p className="text-primary-500 text-sm mb-4">{agent.title}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-neutral-600 text-sm">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{agent.phone}</span>
                    </div>
                    <div className="flex items-center text-neutral-600 text-sm">
                      <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{agent.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-muted text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{agent.properties} Properties Listed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Join Our Team CTA */}
          <div className="mt-16 bg-primary-50 rounded-xl p-8 lg:p-12 text-center">
            <h2 className="text-ink font-heading font-bold text-2xl lg:text-3xl mb-4">Join Our Team</h2>
            <p className="text-neutral-600 text-lg mb-8 max-w-2xl mx-auto">
              Are you a passionate real estate professional? Join Makkan Real Estate and grow your career with us.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-8 py-3 font-semibold transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Agents
