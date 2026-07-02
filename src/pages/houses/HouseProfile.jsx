import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import client from '../../api/client'

function HouseProfile() {
  const { id } = useParams()

  const { data: house, isLoading, error } = useQuery({
    queryKey: ['house', id],
    queryFn: async () => {
      const response = await client.get(`/api/houses/${id}`)
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

  const buttonStyles = {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    marginRight: '0.5rem',
    display: 'inline-block',
  }

  if (isLoading) {
    return <div>Loading house...</div>
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error loading house: {error.message}</div>
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/houses" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Back to Houses
        </Link>
      </div>

      <div style={cardStyles}>
        <h1 style={{ marginBottom: '1.5rem' }}>House Profile</h1>

        {house.imageUrl && (
          <div style={{ marginBottom: '2rem' }}>
            <img
              src={house.imageUrl}
              alt={house.address}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div>
            <div style={labelStyles}>Address</div>
            <div style={valueStyles}>{house.address}</div>
          </div>

          <div>
            <div style={labelStyles}>Price</div>
            <div style={valueStyles}>${Number(house.price).toLocaleString()}</div>
          </div>

          <div>
            <div style={labelStyles}>Listing Type</div>
            <div style={valueStyles}>{house.listingType}</div>
          </div>

          <div>
            <div style={labelStyles}>Status</div>
            <div style={valueStyles}>{house.status}</div>
          </div>

          <div>
            <div style={labelStyles}>Homeowner</div>
            <div style={valueStyles}>
              {house.homeowner?.fullName || '-'}
              {house.homeowner?.phone && ` (${house.homeowner.phone})`}
            </div>
          </div>

          <div>
            <div style={labelStyles}>Added By</div>
            <div style={valueStyles}>{house.addedByUser?.fullName || '-'}</div>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <div style={labelStyles}>Specifications</div>
            <div style={valueStyles}>{house.specifications || '-'}</div>
          </div>

          <div>
            <div style={labelStyles}>Created At</div>
            <div style={valueStyles}>
              {new Date(house.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to={`/houses/${house.id}/edit`} style={buttonStyles}>
            Edit House
          </Link>
        </div>
      </div>

      {house.reservations && house.reservations.length > 0 && (
        <div style={cardStyles}>
          <h2>Reservations</h2>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={thStyles}>ID</th>
                <th style={thStyles}>Customer</th>
                <th style={thStyles}>Reservation Date</th>
                <th style={thStyles}>Status</th>
                <th style={thStyles}>Handled By</th>
              </tr>
            </thead>
            <tbody>
              {house.reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td style={tdStyles}>{reservation.id.slice(0, 8)}...</td>
                  <td style={tdStyles}>{reservation.customer?.fullName || '-'}</td>
                  <td style={tdStyles}>
                    {new Date(reservation.reservationDate).toLocaleDateString()}
                  </td>
                  <td style={tdStyles}>{reservation.status}</td>
                  <td style={tdStyles}>{reservation.handledByUser?.fullName || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default HouseProfile
