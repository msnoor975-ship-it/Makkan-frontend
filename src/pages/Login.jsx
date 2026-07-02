import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import client from '../api/client'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      const response = await client.post('/api/auth/login', {
        username,
        password,
      })

      const { token, user } = response.data
      const role = user.role
      login(token, user, role)

      setSuccess(true)
      
      // Redirect to homepage after successful login
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || 'Login failed. Please try again.'
      setError(errorMessage)
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
              <h1 className="text-ink font-heading font-bold text-2xl mb-2">Welcome Back</h1>
              <p className="text-neutral-600">Sign in to your account to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm text-center">
                  ✓ Login successful! Redirecting to homepage...
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-400 text-white rounded-lg px-6 py-3 font-semibold transition-colors"
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center mt-6 text-neutral-600 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-500 hover:text-primary-600 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Login
