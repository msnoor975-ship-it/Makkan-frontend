import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import client from '../../api/client'

function SearchAndReserve() {
  const [formData, setFormData] = useState({
    customerId: '',
    listingType: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    reservationDate: new Date().toISOString().slice(0, 16),
  })
  const [errors, setErrors] = useState({})
  const [customerSearch, setCustomerSearch] = useState('')
  const [success, setSuccess] = useState(false)
  const [reservedHouse, setReservedHouse] = useState(null)
  const queryClient = useQueryClient()

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await client.get('/api/customers')
      return response.data
    },
  })

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await client.post('/api/reservations/search-and-reserve', data)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
      setSuccess(true)
      setReservedHouse(data.house)
      setFormData({
        customerId: '',
        listingType: '',
        minPrice: '',
        maxPrice: '',
        location: '',
        reservationDate: new Date().toISOString().slice(0, 16),
      })
      setCustomerSearch('')
    },
  })

  const validate = () => {
    const newErrors = {}

    if (!formData.customerId.trim()) {
      newErrors.customerId = 'Customer is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(false)
    setReservedHouse(null)

    if (validate()) {
      const payload = {
        customerId: formData.customerId,
      }

      if (formData.listingType) payload.listingType = formData.listingType
      if (formData.minPrice) payload.minPrice = parseFloat(formData.minPrice)
      if (formData.maxPrice) payload.maxPrice = parseFloat(formData.maxPrice)
      if (formData.location) payload.location = formData.location
      if (formData.reservationDate) payload.reservationDate = formData.reservationDate

      mutation.mutate(payload)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const filteredCustomers = customers?.filter((c) =>
    c.fullName.toLowerCase().includes(customerSearch.toLowerCase())
  )

  const inputStyles = {
    width: '100%',
    padding: '0.75rem 1rem',
    marginTop: '0.25rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    boxSizing: 'border-box',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s ease',
    outline: 'none'
  }

  const labelStyles = {
    display: 'block',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#334155',
    fontSize: '0.875rem'
  }

  const errorStyles = {
    color: '#dc2626',
    fontSize: '0.875rem',
    marginTop: '-0.75rem',
    marginBottom: '1rem',
    fontWeight: '500'
  }

  const buttonStyles = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease'
  }

  const cardStyles = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  }

  const successCardStyles = {
    ...cardStyles,
    backgroundColor: '#f0fdf4',
    border: '1px solid #86efac',
  }

  const errorCardStyles = {
    ...cardStyles,
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
  }

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <h1 style={{
        marginBottom: '2rem',
        color: '#1e293b',
        fontSize: '1.875rem',
        fontWeight: '700',
        letterSpacing: '-0.025em'
      }}>Search and Reserve House</h1>

      {success && reservedHouse && (
        <div style={successCardStyles}>
          <h2 style={{ color: '#166534', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>
            Reservation Successful!
          </h2>
          <div>
            <p>
              <strong>House:</strong> {reservedHouse.address}
            </p>
            <p>
              <strong>Price:</strong> ${Number(reservedHouse.price).toLocaleString()}
            </p>
            <p>
              <strong>Type:</strong> {reservedHouse.listingType}
            </p>
            <p>
              <strong>Homeowner:</strong> {reservedHouse.homeowner?.fullName}
            </p>
          </div>
        </div>
      )}

      {mutation.error && (
        <div style={errorCardStyles}>
          <h2 style={{ color: '#dc2626', marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '700' }}>
            {mutation.error.status === 404
              ? 'No Matching House Found'
              : 'Error'}
          </h2>
          <p style={{ color: '#dc2626', fontSize: '0.95rem' }}>
            {mutation.error.message || 'An error occurred'}
          </p>
        </div>
      )}

      <div style={cardStyles}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="customerId" style={labelStyles}>
              Customer *
            </label>
            <input
              type="text"
              placeholder="Search customers..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              style={inputStyles}
            />
            <select
              id="customerId"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              style={inputStyles}
            >
              <option value="">Select a customer</option>
              {filteredCustomers?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.fullName} {c.email ? `(${c.email})` : ''}
                </option>
              ))}
            </select>
            {errors.customerId && <div style={errorStyles}>{errors.customerId}</div>}
          </div>

          <div>
            <label htmlFor="listingType" style={labelStyles}>
              Listing Type
            </label>
            <select
              id="listingType"
              name="listingType"
              value={formData.listingType}
              onChange={handleChange}
              style={inputStyles}
            >
              <option value="">Any</option>
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="minPrice" style={labelStyles}>
                Min Price
              </label>
              <input
                id="minPrice"
                name="minPrice"
                type="number"
                step="0.01"
                value={formData.minPrice}
                onChange={handleChange}
                style={inputStyles}
              />
            </div>

            <div>
              <label htmlFor="maxPrice" style={labelStyles}>
                Max Price
              </label>
              <input
                id="maxPrice"
                name="maxPrice"
                type="number"
                step="0.01"
                value={formData.maxPrice}
                onChange={handleChange}
                style={inputStyles}
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" style={labelStyles}>
              Location Keyword
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Main St, downtown"
              style={inputStyles}
            />
          </div>

          <div>
            <label htmlFor="reservationDate" style={labelStyles}>
              Reservation Date
            </label>
            <input
              id="reservationDate"
              name="reservationDate"
              type="datetime-local"
              value={formData.reservationDate}
              onChange={handleChange}
              style={inputStyles}
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            style={{
              ...buttonStyles,
              backgroundColor: mutation.isPending ? '#94a3b8' : '#3b82f6',
              cursor: mutation.isPending ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => !mutation.isPending && (e.target.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => !mutation.isPending && (e.target.style.backgroundColor = '#3b82f6')}
          >
            {mutation.isPending ? 'Searching...' : 'Search and Reserve'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SearchAndReserve
