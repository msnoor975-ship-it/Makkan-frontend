import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import client from '../../api/client'

function HomeownerProfile() {
  const { id } = useParams()

  const { data: homeowner, isLoading, error } = useQuery({
    queryKey: ['homeowner', id],
    queryFn: async () => {
      const response = await client.get(`/api/homeowners/${id}`)
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
    return <div>Loading homeowner...</div>
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error loading homeowner: {error.message}</div>
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/homeowners" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Back to Homeowners
        </Link>
      </div>

      <div style={cardStyles}>
        <h1 style={{ marginBottom: '1.5rem' }}>Homeowner Profile</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div>
            <div style={labelStyles}>Full Name</div>
            <div style={valueStyles}>{homeowner.fullName}</div>
          </div>

          <div>
            <div style={labelStyles}>Phone</div>
            <div style={valueStyles}>{homeowner.phone || '-'}</div>
          </div>

          <div>
            <div style={labelStyles}>Added By</div>
            <div style={valueStyles}>{homeowner.addedByUser?.fullName || '-'}</div>
          </div>

          <div>
            <div style={labelStyles}>Created At</div>
            <div style={valueStyles}>
              {new Date(homeowner.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {homeowner.houses && homeowner.houses.length > 0 && (
        <div style={cardStyles}>
          <h2>Houses</h2>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={thStyles}>ID</th>
                <th style={thStyles}>Address</th>
                <th style={thStyles}>Price</th>
                <th style={thStyles}>Type</th>
                <th style={thStyles}>Status</th>
              </tr>
            </thead>
            <tbody>
              {homeowner.houses.map((house) => (
                <tr key={house.id}>
                  <td style={tdStyles}>{house.id.slice(0, 8)}...</td>
                  <td style={tdStyles}>{house.address}</td>
                  <td style={tdStyles}>${Number(house.price).toLocaleString()}</td>
                  <td style={tdStyles}>{house.listingType}</td>
                  <td style={tdStyles}>{house.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default HomeownerProfile
