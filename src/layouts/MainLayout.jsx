import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)
  const role = useAuthStore((state) => state.role)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <div>
      <header className="flex justify-between items-center px-6 lg:px-8 py-4 bg-surface border-b border-neutral-200 shadow-soft flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Link 
            to="/" 
            className="text-ink font-heading font-bold text-xl mr-8 hover:text-primary-500 transition-colors"
          >
            Makkan
          </Link>
          {role === 'manager' && (
            <>
              <Link to="/dashboard" className={`${isActive('/dashboard') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Dashboard
              </Link>
              <Link to="/customers" className={`${isActive('/customers') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Customers
              </Link>
              <Link to="/homeowners" className={`${isActive('/homeowners') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Homeowners
              </Link>
              <Link to="/houses" className={`${isActive('/houses') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Houses
              </Link>
              <Link to="/reservations" className={`${isActive('/reservations') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Reservations
              </Link>
              <Link to="/reservations/search" className={`${isActive('/reservations/search') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Search
              </Link>
              <Link to="/finance/report" className={`${isActive('/finance') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Finance
              </Link>
            </>
          )}
          {(role === 'sales_employee' || role === 'rental_employee') && (
            <>
              <Link to="/dashboard" className={`${isActive('/dashboard') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Dashboard
              </Link>
              <Link to="/customers" className={`${isActive('/customers') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Customers
              </Link>
              <Link to="/houses" className={`${isActive('/houses') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Houses
              </Link>
              <Link to="/reservations" className={`${isActive('/reservations') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Reservations
              </Link>
              <Link to="/reservations/search" className={`${isActive('/reservations/search') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Search
              </Link>
            </>
          )}
          {role === 'secretary' && (
            <>
              <Link to="/dashboard" className={`${isActive('/dashboard') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Dashboard
              </Link>
              <Link to="/customers" className={`${isActive('/customers') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Customers
              </Link>
              <Link to="/homeowners" className={`${isActive('/homeowners') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Homeowners
              </Link>
              <Link to="/finance/report" className={`${isActive('/finance') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
                Finance
              </Link>
            </>
          )}
          <Link to="/help" className={`${isActive('/help') ? 'text-primary-500 bg-neutral-50' : 'text-neutral-600 hover:text-primary-500 hover:bg-neutral-50'} px-4 py-2 rounded-lg font-medium text-sm transition-colors`}>
            Help
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-primary-500 font-semibold text-sm">
            Welcome, {user?.username || 'User'}
          </span>
          <button 
            onClick={handleLogout} 
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="p-8 min-h-[calc(100vh-80px)] bg-neutral-50">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
