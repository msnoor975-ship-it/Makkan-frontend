import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import client from '../../api/client'

function SearchAndReserve() {
  const [formData, setFormData] = useState({
    listingType: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  })
  const [errors, setErrors] = useState({})
  const [customerSearch, setCustomerSearch] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [selectedHouse, setSelectedHouse] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [showCustomerSelect, setShowCustomerSelect] = useState(false)
  const [success, setSuccess] = useState(false)
  const [reservedHouse, setReservedHouse] = useState(null)
  const [reservationData, setReservationData] = useState({
    customerId: '',
    reservationDate: new Date().toISOString().slice(0, 16),
  })
  const queryClient = useQueryClient()

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await client.get('/api/customers')
      return response.data
    },
  })

  const searchHousesMutation = useMutation({
    mutationFn: async (data) => {
      const params = {}
      if (data.listingType) params.listingType = data.listingType
      if (data.minPrice) params.minPrice = parseFloat(data.minPrice)
      if (data.maxPrice) params.maxPrice = parseFloat(data.maxPrice)
      if (data.location) params.location = data.location
      const response = await client.get('/api/houses/search', { params })
      return response.data
    },
    onSuccess: (data) => {
      setSearchResults(data)
      setShowResults(true)
    },
  })

  const reserveMutation = useMutation({
    mutationFn: async (data) => {
      const response = await client.post('/api/reservations', data)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['reservations'])
      queryClient.invalidateQueries(['houses'])
      setSuccess(true)
      setReservedHouse(data.house)
      setShowCustomerSelect(false)
      setShowResults(false)
      setSearchResults(null)
      setSelectedHouse(null)
      setFormData({
        listingType: '',
        minPrice: '',
        maxPrice: '',
        location: '',
      })
      setReservationData({
        customerId: '',
        reservationDate: new Date().toISOString().slice(0, 16),
      })
      setCustomerSearch('')
    },
  })

  const validateReservation = () => {
    const newErrors = {}

    if (!reservationData.customerId.trim()) {
      newErrors.customerId = 'Customer is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSuccess(false)
    setReservedHouse(null)
    setShowResults(false)
    setSearchResults(null)

    searchHousesMutation.mutate(formData)
  }

  const handleReserveClick = (house) => {
    setSelectedHouse(house)
    setShowCustomerSelect(true)
  }

  const handleReserveSubmit = (e) => {
    e.preventDefault()

    if (validateReservation()) {
      const payload = {
        customerId: reservationData.customerId,
        houseId: selectedHouse.id,
        reservationDate: reservationData.reservationDate,
      }

      reserveMutation.mutate(payload)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleReservationChange = (e) => {
    const { name, value } = e.target
    setReservationData((prev) => ({ ...prev, [name]: value }))
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

      {(searchHousesMutation.error || reserveMutation.error) && (
        <div style={errorCardStyles}>
          <h2 style={{ color: '#dc2626', marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '700' }}>
            {reserveMutation.error?.status === 404
              ? 'No Matching House Found'
              : 'Error'}
          </h2>
          <p style={{ color: '#dc2626', fontSize: '0.95rem' }}>
            {reserveMutation.error?.message || searchHousesMutation.error?.message || 'An error occurred'}
          </p>
        </div>
      )}

      {showCustomerSelect && selectedHouse && (
        <div style={cardStyles}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>
            Complete Reservation
          </h2>
          <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#0369a1' }}>
              Selected House
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              <strong>Address:</strong> {selectedHouse.address}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              <strong>Price:</strong> ${Number(selectedHouse.price).toLocaleString()}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              <strong>Type:</strong> {selectedHouse.listingType}
            </p>
          </div>
          <form onSubmit={handleReserveSubmit}>
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
                value={reservationData.customerId}
                onChange={handleReservationChange}
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
              <label htmlFor="reservationDate" style={labelStyles}>
                Reservation Date
              </label>
              <input
                id="reservationDate"
                name="reservationDate"
                type="datetime-local"
                value={reservationData.reservationDate}
                onChange={handleReservationChange}
                style={inputStyles}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setShowCustomerSelect(false)}
                style={{
                  ...buttonStyles,
                  backgroundColor: '#64748b',
                  flex: 1,
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#475569'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#64748b'}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={reserveMutation.isPending}
                style={{
                  ...buttonStyles,
                  backgroundColor: reserveMutation.isPending ? '#94a3b8' : '#10b981',
                  flex: 1,
                  cursor: reserveMutation.isPending ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => !reserveMutation.isPending && (e.target.style.backgroundColor = '#059669')}
                onMouseLeave={(e) => !reserveMutation.isPending && (e.target.style.backgroundColor = '#10b981')}
              >
                {reserveMutation.isPending ? 'Reserving...' : 'Confirm Reservation'}
              </button>
            </div>
          </form>
        </div>
      )}

      {showResults && searchResults && (
        <div style={cardStyles}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>
            Search Results ({searchResults.length} houses found)
          </h2>
          {searchResults.length === 0 ? (
            <p style={{ color: '#64748b' }}>No houses match your search criteria.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {searchResults.map((house) => (
                <div
                  key={house.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
                      {house.address}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      <strong>Price:</strong> ${Number(house.price).toLocaleString()}
                    </p>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      <strong>Type:</strong> {house.listingType}
                    </p>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                      <strong>Homeowner:</strong> {house.homeowner?.fullName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleReserveClick(house)}
                    style={{
                      ...buttonStyles,
                      backgroundColor: '#10b981',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => setShowResults(false)}
            style={{
              ...buttonStyles,
              backgroundColor: '#64748b',
              marginTop: '1rem',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#475569'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#64748b'}
          >
            Back to Search
          </button>
        </div>
      )}

      <div style={cardStyles}>
        <form onSubmit={handleSearch}>
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

          <button
            type="submit"
            disabled={searchHousesMutation.isPending}
            style={{
              ...buttonStyles,
              backgroundColor: searchHousesMutation.isPending ? '#94a3b8' : '#3b82f6',
              cursor: searchHousesMutation.isPending ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => !searchHousesMutation.isPending && (e.target.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => !searchHousesMutation.isPending && (e.target.style.backgroundColor = '#3b82f6')}
          >
            {searchHousesMutation.isPending ? 'Searching...' : 'Search Houses'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SearchAndReserve
