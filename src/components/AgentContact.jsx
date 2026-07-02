import { Phone, Calendar } from 'lucide-react'

function AgentContact({ agent }) {
  // Use provided agent data or fallback to default
  const agentData = agent || {
    name: 'Sarah Johnson',
    title: 'Senior Real Estate Agent',
    phone: '+966 50 123 4567',
    image: '/images/agents/default-agent.jpg',
    description: 'Our certified agents are here to help you find your perfect property. With years of experience and deep market knowledge, we provide personalized service to match your needs.'
  }

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Agent Image */}
          <div className="flex justify-center">
            <div className="bg-primary-50 rounded-2xl p-8 lg:p-12">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-neutral-200">
                  {agentData.image ? (
                    <img
                      src={agentData.image}
                      alt={agentData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                      <span className="text-neutral-400 text-lg">Agent Photo</span>
                    </div>
                  )}
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-ink font-heading font-bold text-3xl lg:text-4xl leading-tight mb-4">
                Contact With Our
                <br />
                Certified Agent
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed">
                {agentData.description}
              </p>
            </div>

            {/* Agent Info */}
            {agent && (
              <div className="space-y-2">
                <p className="text-ink font-heading font-semibold text-xl">{agentData.name}</p>
                <p className="text-muted">{agentData.title}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={`tel:${agentData.phone}`}
                className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-3 font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Make A Call</span>
              </a>
              <a
                href="#appointment"
                className="bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg px-6 py-3 font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Get Appointment</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentContact
