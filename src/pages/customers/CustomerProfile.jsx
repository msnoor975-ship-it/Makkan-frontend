import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import client from '../../api/client'
import ImagePlaceholder from '../../components/ImagePlaceholder'

function CustomerProfile() {
  const { id } = useParams()
  const role = useAuthStore((state) => state.role)

  const { data: customer, isLoading, error } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      const response = await client.get(`/api/customers/${id}`)
      return response.data
    },
  })

  const cardStyles = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  }

  const labelStyles = {
    fontWeight: '500',
    color: '#495057',
    marginBottom: '0.25rem',
  }

  const valueStyles = {
    marginBottom: '1rem',
    color: '#212529',
  }

  const buttonStyles = {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    marginRight: '0.5rem',
    display: 'inline-block',
  }

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  }

  const thStyles = {
    padding: '0.75rem',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
    backgroundColor: '#f8f9fa',
  }

  const tdStyles = {
    padding: '0.75rem',
    borderBottom: '1px solid #dee2e6',
  }

  if (isLoading) {
    return <div>Loading customer...</div>
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error loading customer: {error.message}</div>
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/customers" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Back to Customers
        </Link>
      </div>

      <div style={cardStyles}>
        <h1 style={{ marginBottom: '1.5rem' }}>Customer Profile</h1>

        {customer.imageUrl ? (
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            <img
              src={customer.imageUrl}
              alt={customer.fullName}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div style={{ width: '150px', height: '150px', display: 'none' }}>
              <ImagePlaceholder type="user" size="large" />
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '150px', height: '150px' }}>
              <ImagePlaceholder type="user" size="large" />
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div>
            <div style={labelStyles}>Full Name</div>
            <div style={valueStyles}>{customer.fullName}</div>
          </div>

          <div>
            <div style={labelStyles}>Phone</div>
            <div style={valueStyles}>{customer.phone || '-'}</div>
          </div>

          <div>
            <div style={labelStyles}>Email</div>
            <div style={valueStyles}>{customer.email || '-'}</div>
          </div>

          <div>
            <div style={labelStyles}>Status</div>
            <div style={valueStyles}>{customer.status}</div>
          </div>

          <div>
            <div style={labelStyles}>Added By</div>
            <div style={valueStyles}>{customer.addedByUser?.fullName || '-'}</div>
          </div>

          <div>
            <div style={labelStyles}>Created At</div>
            <div style={valueStyles}>
              {new Date(customer.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          {role !== 'secretary' && (
            <Link to={`/customers/${customer.id}/edit`} style={buttonStyles}>
              Edit Customer
            </Link>
          )}
        </div>
      </div>

      {customer.reservations && customer.reservations.length > 0 && (
        <div style={cardStyles}>
          <h2>Reservations</h2>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={thStyles}>ID</th>
                <th style={thStyles}>House</th>
                <th style={thStyles}>Reservation Date</th>
                <th style={thStyles}>Status</th>
              </tr>
            </thead>
            <tbody>
              {customer.reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td style={tdStyles}>{reservation.id.slice(0, 8)}...</td>
                  <td style={tdStyles}>{reservation.house?.address || '-'}</td>
                  <td style={tdStyles}>
                    {new Date(reservation.reservationDate).toLocaleDateString()}
                  </td>
                  <td style={tdStyles}>{reservation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default CustomerProfile
