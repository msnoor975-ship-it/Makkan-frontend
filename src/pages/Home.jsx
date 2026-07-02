import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CategoryCard from '../components/CategoryCard'
import PropertyListing from '../components/PropertyListing'
import AgentContact from '../components/AgentContact'
import Footer from '../components/Footer'

function Home() {
  const categories = [
    { name: 'Building', count: 150, icon: 'building', to: '/properties?category=building' },
    { name: 'Townhouse', count: 200, icon: 'townhouse', to: '/properties?category=townhouse' },
    { name: 'Shop', count: 80, icon: 'shop', to: '/properties?category=shop' },
    { name: 'Garage', count: 70, icon: 'garage', to: '/properties?category=garage' },
  ]

  return (
    <div>
      <Navbar />
      <Hero />
      
      {/* Category Cards Section */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-ink font-heading font-bold text-3xl mb-4">Browse by Category</h2>
            <p className="text-neutral-600 text-lg">Find the perfect property type for your needs</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                count={category.count}
                icon={category.icon}
                to={category.to}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Property Listing Section */}
      <PropertyListing />

      {/* Agent Contact Section */}
      <AgentContact />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
