import { useAuthStore } from '../store/authStore'

function Help() {
  const role = useAuthStore((state) => state.role)

  const containerStyles = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
  }

  const sectionStyles = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  }

  const headingStyles = {
    marginBottom: '1rem',
    color: '#212529',
  }

  const listStyles = {
    paddingLeft: '1.5rem',
    lineHeight: '1.8',
  }

  const roleInstructions = {
    sales_employee: {
      title: 'Sales Employee Guide',
      permissions: [
        'Manage customers (add, view, edit)',
        'Manage homeowners (add, view, delete)',
        'Manage houses for sale (add, view, edit, delete)',
        'Create reservations for sales',
        'View reservation history',
      ],
    },
    rental_employee: {
      title: 'Rental Employee Guide',
      permissions: [
        'Manage customers (add, view, edit)',
        'Manage homeowners (add, view, delete)',
        'Manage houses for rent (add, view, edit, delete)',
        'Create reservations for rentals',
        'View reservation history',
      ],
    },
    manager: {
      title: 'Manager Guide',
      permissions: [
        'View all customer profiles',
        'View all homeowner profiles',
        'View all house listings',
        'View all reservations',
        'Access financial reports',
        'Delete customers (with proper authorization)',
        'Manage user accounts (create, update roles, delete)',
      ],
    },
    secretary: {
      title: 'Secretary Guide',
      permissions: [
        'Add financial entries',
        'Record expenses and income',
        'Track utility bills, wages, and other expenses',
      ],
    },
  }

  const currentRole = roleInstructions[role]

  return (
    <div style={containerStyles}>
      <h1 style={{ marginBottom: '2rem' }}>Help & Documentation</h1>

      <div style={sectionStyles}>
        <h2 style={headingStyles}>Your Role: {role ? role.replace(/_/g, ' ').toUpperCase() : 'Not Logged In'}</h2>
        {currentRole ? (
          <>
            <h3 style={{ marginBottom: '0.75rem' }}>{currentRole.title}</h3>
            <ul style={listStyles}>
              {currentRole.permissions.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>{role ? 'No specific permissions configured for your role.' : 'Please log in to see your role-specific permissions.'}</p>
        )}
      </div>

      <div style={sectionStyles}>
        <h2 style={headingStyles}>General Navigation</h2>
        <ul style={listStyles}>
          <li>
            <strong>Customers:</strong> Manage customer information and view their
            reservation history
          </li>
          <li>
            <strong>Houses:</strong> Browse and manage house listings with filters
            for status and listing type
          </li>
          <li>
            <strong>Homeowners:</strong> Manage homeowner profiles and their
            associated properties
          </li>
          <li>
            <strong>Reservations:</strong> Search for available houses and create
            reservations, or view existing reservations
          </li>
          <li>
            <strong>Finance:</strong> Access financial reports (manager) or add
            financial entries (secretary)
          </li>
        </ul>
      </div>

      <div style={sectionStyles}>
        <h2 style={headingStyles}>Common Tasks</h2>
        <ul style={listStyles}>
          <li>
            <strong>Adding a Customer:</strong> Go to Customers → Add Customer,
            fill in the required fields (full name, status), and optionally add
            phone and email
          </li>
          <li>
            <strong>Adding a House:</strong> First add a homeowner, then go to
            Houses → Add House, select the homeowner, and fill in the property
            details
          </li>
          <li>
            <strong>Creating a Reservation:</strong> Go to Reservations → Search
            and Reserve, select a customer, set search criteria, and submit to
            find and reserve an available house
          </li>
          <li>
            <strong>Filtering Lists:</strong> Use the filter controls above each
            list to narrow down results by category, status, date range, or
            search terms
          </li>
        </ul>
      </div>

      <div style={sectionStyles}>
        <h2 style={headingStyles}>Account Management</h2>
        <ul style={listStyles}>
          <li>
            <strong>Change Password:</strong> Use the Change Password option in
            the navigation menu to update your password
          </li>
          <li>
            <strong>Logout:</strong> Click the Logout button in the top right
            corner to securely end your session
          </li>
        </ul>
      </div>

      <div style={sectionStyles}>
        <h2 style={headingStyles}>Support</h2>
        <p>
          If you encounter any issues or have questions, please contact your
          system administrator or IT support team.
        </p>
      </div>
    </div>
  )
}

export default Help
