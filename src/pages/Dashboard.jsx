import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const role = useAuthStore((state) => state.role)

  const roleColors = {
    manager: 'text-primary-500',
    sales_employee: 'text-primary-500',
    rental_employee: 'text-primary-500',
    secretary: 'text-primary-500'
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Welcome Card */}
      <div className="bg-surface rounded-xl shadow-card p-8 mb-8">
        <h1 className="text-ink font-heading font-bold text-3xl mb-4">
          Welcome back, {user?.fullName || 'User'}!
        </h1>
        <p className="text-neutral-600 text-lg mb-4">
          You are logged in as <strong className={roleColors[role] || 'text-primary-500'}>{role?.replace('_', ' ').toUpperCase()}</strong>
        </p>
        <p className="text-neutral-600 leading-relaxed">
          Use the navigation menu above to manage customers, homeowners, houses, reservations, and financial records.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-neutral-50 rounded-xl p-6 text-center">
            <h3 className="text-primary-500 font-heading font-bold text-2xl mb-2">
              {role === 'manager' ? 'Full Access' : 'Limited Access'}
            </h3>
            <p className="text-muted text-sm">Your permission level</p>
          </div>
          <div className="bg-neutral-50 rounded-xl p-6 text-center">
            <h3 className="text-primary-500 font-heading font-bold text-2xl mb-2">
              Active
            </h3>
            <p className="text-muted text-sm">Account status</p>
          </div>
          <div className="bg-neutral-50 rounded-xl p-6 text-center">
            <h3 className="text-primary-500 font-heading font-bold text-2xl mb-2">
              {role === 'manager' ? 'Manager' : role === 'secretary' ? 'Support' : 'Staff'}
            </h3>
            <p className="text-muted text-sm">User type</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-xl shadow-card p-8">
        <h2 className="text-ink font-heading font-bold text-2xl mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(role === 'manager' || role === 'sales_employee' || role === 'rental_employee') && (
            <>
              <div className="bg-neutral-50 rounded-xl p-6 text-center">
                <h3 className="text-ink font-heading font-semibold text-xl mb-2">
                  Customers
                </h3>
                <p className="text-muted text-sm mb-4">
                  Manage customer records
                </p>
                <Link
                  to="/customers"
                  className="inline-block bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2 font-semibold text-sm transition-colors"
                >
                  View Customers
                </Link>
              </div>
              <div className="bg-neutral-50 rounded-xl p-6 text-center">
                <h3 className="text-ink font-heading font-semibold text-xl mb-2">
                  Houses
                </h3>
                <p className="text-muted text-sm mb-4">
                  Browse property listings
                </p>
                <Link
                  to="/houses"
                  className="inline-block bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2 font-semibold text-sm transition-colors"
                >
                  View Houses
                </Link>
              </div>
            </>
          )}
          {(role === 'manager' || role === 'sales_employee' || role === 'rental_employee') && (
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <h3 className="text-ink font-heading font-semibold text-xl mb-2">
                Reservations
              </h3>
              <p className="text-muted text-sm mb-4">
                Manage bookings
              </p>
              <Link
                to="/reservations"
                className="inline-block bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2 font-semibold text-sm transition-colors"
              >
                View Reservations
              </Link>
            </div>
          )}
          {role === 'manager' && (
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <h3 className="text-ink font-heading font-semibold text-xl mb-2">
                Finance
              </h3>
              <p className="text-muted text-sm mb-4">
                View financial reports
              </p>
              <Link
                to="/finance/report"
                className="inline-block bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2 font-semibold text-sm transition-colors"
              >
                View Reports
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
