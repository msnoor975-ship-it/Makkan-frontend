import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Privacy() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-ink font-heading font-bold text-4xl lg:text-5xl mb-6">Privacy Policy</h1>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Information We Collect</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you create an account, contact us, or use our services. This may include:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Property preferences and search history</li>
                  <li>Communication with our agents</li>
                  <li>Payment information (processed securely)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-ink font-heading font-semibold text-2xl mb-4">How We Use Your Information</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Communicate with you about properties and services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                </ul>
              </div>

              <div>
                <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Information Sharing</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                  <li>With service providers who perform services on our behalf</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With your consent for specific purposes</li>
                </ul>
              </div>

              <div>
                <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Data Security</h2>
                <p className="text-neutral-600 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Your Rights</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to processing of your personal information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Contact Us</h2>
                <p className="text-neutral-600 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at privacy@makanrealestate.com or call +966 50 123 4567.
                </p>
              </div>

              <div>
                <p className="text-neutral-500 text-sm">
                  Last updated: January 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Privacy
