import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Blog() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-ink font-heading font-bold text-4xl lg:text-5xl mb-6">Blog</h1>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            Stay updated with the latest real estate news, tips, and market insights
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-neutral-50 rounded-xl p-12">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📝</span>
            </div>
            <h2 className="text-ink font-heading font-bold text-2xl mb-4">Coming Soon</h2>
            <p className="text-neutral-600 text-lg mb-8 max-w-2xl mx-auto">
              Our blog is currently under construction. We're working on bringing you valuable insights about the Saudi Arabian real estate market, buying tips, investment advice, and more.
            </p>
            <p className="text-neutral-600 text-lg mb-8">
              In the meantime, feel free to explore our properties or contact our team for expert advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/properties"
                className="inline-block bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-8 py-3 font-semibold transition-colors"
              >
                Browse Properties
              </a>
              <a
                href="/contact"
                className="inline-block bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg px-8 py-3 font-semibold transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Blog
