import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import client from '../api/client'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const response = await client.post('/api/auth/register', {
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
      })

      navigate('/')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-md mx-auto px-6 lg:px-8">
          <div className="bg-surface rounded-2xl shadow-medium p-8 border border-neutral-200">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2">
                <Building2 className="w-10 h-10 text-primary-500" />
                <span className="text-ink font-heading font-bold text-2xl">Makkan</span>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-ink font-heading font-bold text-2xl mb-2">Create Account</h1>
              <p className="text-neutral-600">Join Makkan and start your journey to finding your dream home</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  placeholder="Confirm your password"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-400 text-white rounded-lg px-6 py-3 font-semibold transition-colors"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center mt-6 text-neutral-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Signup
