import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-ink font-heading font-bold text-4xl lg:text-5xl mb-6">About Makkan</h1>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            Your trusted partner in finding the perfect property in Saudi Arabia
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div>
              <h2 className="text-ink font-heading font-bold text-3xl mb-6">Our Story</h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                Founded with a vision to revolutionize the real estate experience in Saudi Arabia, Makkan has grown to become one of the most trusted names in the industry. We believe that finding your dream home should be an exciting journey, not a stressful one.
              </p>
              <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                Our team of experienced professionals combines deep local knowledge with modern technology to provide you with the best property options tailored to your needs. Whether you're looking to buy, rent, or sell, we're here to guide you every step of the way.
              </p>
              <p className="text-neutral-600 text-lg leading-relaxed">
                With a commitment to transparency, integrity, and customer satisfaction, we've helped thousands of families find their perfect homes across the Kingdom.
              </p>
            </div>
            <div className="bg-primary-50 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-500 mb-2">500+</div>
                  <div className="text-neutral-600">Properties Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-500 mb-2">1000+</div>
                  <div className="text-neutral-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-500 mb-2">50+</div>
                  <div className="text-neutral-600">Expert Agents</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-500 mb-2">10+</div>
                  <div className="text-neutral-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-neutral-50 rounded-xl p-8">
              <h3 className="text-ink font-heading font-bold text-2xl mb-4">Our Mission</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                To provide exceptional real estate services that make property transactions simple, transparent, and enjoyable for everyone in Saudi Arabia.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-8">
              <h3 className="text-ink font-heading font-bold text-2xl mb-4">Our Vision</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                To be the leading real estate platform in the Kingdom, known for innovation, trust, and customer-centric solutions that transform how people buy, sell, and rent properties.
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-ink font-heading font-bold text-3xl mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-ink font-heading font-semibold text-xl mb-3">Integrity</h3>
                <p className="text-neutral-600">We conduct business with honesty and transparency, building trust with every interaction.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💡</span>
                </div>
                <h3 className="text-ink font-heading font-semibold text-xl mb-3">Innovation</h3>
                <p className="text-neutral-600">We embrace technology and new ideas to continuously improve our services.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-ink font-heading font-semibold text-xl mb-3">Customer First</h3>
                <p className="text-neutral-600">Our clients' needs are at the heart of everything we do.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
