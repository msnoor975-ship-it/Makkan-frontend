import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Cookies() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-ink font-heading font-bold text-4xl lg:text-5xl mb-6">Cookie Policy</h1>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            This policy explains how we use cookies and similar technologies on our website.
          </p>
        </div>
      </section>

      {/* Cookies Content */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">What Are Cookies?</h2>
              <p className="text-neutral-600 leading-relaxed">
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">How We Use Cookies</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-ink font-semibold text-lg mb-2">Essential Cookies</h3>
                  <p className="text-neutral-600">These cookies are necessary for the website to function. They enable basic functions like page navigation and access to secure areas.</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-ink font-semibold text-lg mb-2">Performance Cookies</h3>
                  <p className="text-neutral-600">These cookies help us understand how visitors interact with our website by collecting information about pages visited, time spent, and error messages.</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-ink font-semibold text-lg mb-2">Functionality Cookies</h3>
                  <p className="text-neutral-600">These cookies remember your choices and preferences to provide enhanced features, such as remembering your login details or location.</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-ink font-semibold text-lg mb-2">Targeting Cookies</h3>
                  <p className="text-neutral-600">These cookies track your browsing habits to deliver relevant advertisements and measure the effectiveness of ad campaigns.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Managing Cookies</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>Browser settings to accept or reject cookies</li>
                <li>Deleting cookies from your browser</li>
                <li>Using our cookie consent banner to customize preferences</li>
              </ul>
              <p className="text-neutral-600 leading-relaxed mt-4">
                Please note that disabling essential cookies may affect the functionality of our website.
              </p>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Third-Party Cookies</h2>
              <p className="text-neutral-600 leading-relaxed">
                We may allow third-party services to place cookies on your device for analytics, advertising, and other purposes. These third parties have their own privacy policies and we are not responsible for their practices.
              </p>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Updates to This Policy</h2>
              <p className="text-neutral-600 leading-relaxed">
                We may update this cookie policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </div>

            <div>
              <h2 className="text-ink font-heading font-semibold text-2xl mb-4">Contact Us</h2>
              <p className="text-neutral-600 leading-relaxed">
                If you have any questions about our use of cookies, please contact us at privacy@makanrealestate.com or call +966 50 123 4567.
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

export default Cookies
