import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ChevronDown, ChevronUp } from 'lucide-react'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How do I search for properties?',
      answer: 'You can search for properties using our search bar on the Properties page. Filter by location, price range, property type, and listing type (sale or rent) to find properties that match your criteria.'
    },
    {
      question: 'How do I schedule a property viewing?',
      answer: 'Once you find a property you\'re interested in, click on the property card to view details. From there, you can contact our agents via phone or email to schedule a viewing appointment.'
    },
    {
      question: 'What documents do I need to buy a property?',
      answer: 'To purchase a property in Saudi Arabia, you typically need your national ID (for Saudi citizens) or Iqama (for residents), proof of income, bank statements, and a valid address. Our agents will guide you through the complete documentation process.'
    },
    {
      question: 'Can I rent a property if I\'m not a Saudi citizen?',
      answer: 'Yes, expatriates with valid Iqama can rent properties in Saudi Arabia. The rental process may require additional documentation such as employer verification and proof of income.'
    },
    {
      question: 'What are your service fees?',
      answer: 'Our service fees vary depending on the type of transaction. For property sales, we charge a percentage of the sale price. For rentals, we charge a fixed fee. Contact us for specific fee information for your transaction.'
    },
    {
      question: 'How long does the buying process take?',
      answer: 'The property buying process in Saudi Arabia typically takes 2-4 weeks from offer acceptance to final transfer, depending on the complexity of the transaction and documentation requirements.'
    },
    {
      question: 'Do you offer property management services?',
      answer: 'Yes, we offer comprehensive property management services for landlords, including tenant screening, rent collection, maintenance coordination, and regular property inspections.'
    },
    {
      question: 'Can I list my property with Makkan?',
      answer: 'Absolutely! We help property owners list their properties for sale or rent. Contact us to schedule a property valuation and discuss marketing options for your property.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-ink font-heading font-bold text-4xl lg:text-5xl mb-6">Frequently Asked Questions</h1>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            Find answers to common questions about buying, renting, and selling properties in Saudi Arabia
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-100 transition-colors"
                >
                  <span className="text-ink font-semibold text-lg pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-neutral-600 text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center bg-primary-50 rounded-xl p-8">
            <h2 className="text-ink font-heading font-bold text-2xl mb-4">Still have questions?</h2>
            <p className="text-neutral-600 text-lg mb-6">
              Our team is here to help you with any questions you may have.
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

export default FAQ
