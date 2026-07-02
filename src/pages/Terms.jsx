import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Terms() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-ink font-heading font-bold text-4xl lg:text-5xl mb-6">Terms & Conditions</h1>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Acceptance of Terms</h2>
              <p className="text-neutral-600 leading-relaxed">
                By accessing and using Makkan Real Estate services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">User Accounts</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                To access certain features of our services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>You must provide accurate and complete information</li>
                <li>You must notify us immediately of any unauthorized use</li>
                <li>You are responsible for all activities under your account</li>
                <li>You may not share your account credentials with others</li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Property Listings</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Property listings on our platform are provided for informational purposes. While we strive for accuracy, we do not guarantee:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>The completeness or accuracy of property information</li>
                    <li>The availability of listed properties</li>
                    <li>The current pricing or terms</li>
                    <li>The condition of properties</li>
              </ul>
              <p className="text-neutral-600 leading-relaxed mt-4">
                Users should independently verify all property information before making any decisions.
              </p>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Service Fees</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Our services may be subject to fees. These fees will be clearly communicated before any transaction. By using our services, you agree to pay all applicable fees.
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>Sales commission: Percentage of sale price</li>
                <li>Rental fees: Fixed fee per transaction</li>
                <li>Property management: Monthly percentage of rent</li>
                <li>Additional services: As agreed upon</li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Prohibited Activities</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Users may not:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>Use the platform for fraudulent purposes</li>
                <li>Submit false or misleading information</li>
                <li>Interfere with the operation of the platform</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Limitation of Liability</h2>
              <p className="text-neutral-600 leading-relaxed">
                Makkan Real Estate shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the fees paid by you for our services.
              </p>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Termination</h2>
              <p className="text-neutral-600 leading-relaxed">
                We reserve the right to terminate or suspend your account at any time for violation of these terms or for any other reason at our sole discretion.
              </p>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Governing Law</h2>
              <p className="text-neutral-600 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of Saudi Arabia. Any disputes shall be resolved in the courts of Saudi Arabia.
              </p>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Changes to Terms</h2>
              <p className="text-neutral-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Contact Us</h2>
              <p className="text-neutral-600 leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at legal@makanrealestate.com or call +966 50 123 4567.
              </p>
            </div>

            <div>
              <p className="text-neutral-500 text-sm">
                Last updated: January 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Terms
