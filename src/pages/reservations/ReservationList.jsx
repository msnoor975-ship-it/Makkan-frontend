import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import client from '../../api/client'

function ReservationList() {
  const [customerIdFilter, setCustomerIdFilter] = useState('')
  const [houseIdFilter, setHouseIdFilter] = useState('')
  const [customerSearch, setCustomerSearch] = useState('')
  const [houseSearch, setHouseSearch] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newReservation, setNewReservation] = useState({
    customerId: '',
    houseId: '',
    reservationDate: new Date().toISOString().slice(0, 16),
  })
  const [createError, setCreateError] = useState('')
  const queryClient = useQueryClient()

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await client.get('/api/customers')
      return response.data
    },
  })

  const { data: houses } = useQuery({
    queryKey: ['houses'],
    queryFn: async () => {
      const response = await client.get('/api/houses')
      return response.data
    },
  })

  const { data: reservations, isLoading, error } = useQuery({
    queryKey: ['reservations', customerIdFilter, houseIdFilter],
    queryFn: async () => {
      const params = {}
      if (customerIdFilter) params.customerId = customerIdFilter
      if (houseIdFilter) params.houseId = houseIdFilter
      const response = await client.get('/api/reservations', { params })
      return response.data
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await client.post('/api/reservations', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reservations', customerIdFilter, houseIdFilter])
      queryClient.invalidateQueries(['houses'])
      setShowCreateModal(false)
      setNewReservation({
        customerId: '',
        houseId: '',
        reservationDate: new Date().toISOString().slice(0, 16),
      })
      setCreateError('')
    },
    onError: (error) => {
      console.error('Error creating reservation:', error)
      const errorMessage = error.response?.data?.message || error.message
      setCreateError(errorMessage)
    },
  })

  const filteredCustomers = customers?.filter((c) =>
    c.fullName.toLowerCase().includes(customerSearch.toLowerCase())
  )

  const filteredHouses = houses?.filter((h) =>
    h.address.toLowerCase().includes(houseSearch.toLowerCase()) && h.status === 'available'
  )

  const handleCreateReservation = (e) => {
    e.preventDefault()
    createMutation.mutate(newReservation)
  }

  if (isLoading) {
    return <div className="text-center py-8 text-neutral-600">Loading reservations...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading reservations: {error.message}</div>
  }

  return (
    <div className="bg-surface rounded-xl shadow-card p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-ink font-heading font-bold text-3xl">Reservations</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Create Reservation
        </button>
      </div>

      <div className="mb-6 p-6 bg-neutral-50 rounded-lg">
        <div className="mb-4">
          <span className="font-semibold text-neutral-700 text-sm mr-2">Filter by Customer:</span>
          <input
            type="text"
            placeholder="Search customers..."
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all mr-2"
          />
          <select
            value={customerIdFilter}
            onChange={(e) => setCustomerIdFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-surface"
          >
            <option value="">All Customers</option>
            {filteredCustomers?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.fullName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="font-semibold text-neutral-700 text-sm mr-2">Filter by House:</span>
          <input
            type="text"
            placeholder="Search houses..."
            value={houseSearch}
            onChange={(e) => setHouseSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all mr-2"
          />
          <select
            value={houseIdFilter}
            onChange={(e) => setHouseIdFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-surface"
          >
            <option value="">All Houses</option>
            {filteredHouses?.map((h) => (
              <option key={h.id} value={h.id}>
                {h.address}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-neutral-50 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-neutral-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">House</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Reservation Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Handled By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {reservations?.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-neutral-100 transition-colors">
                <td className="px-6 py-4 text-sm text-neutral-600">{reservation.id.slice(0, 8)}...</td>
                <td className="px-6 py-4 text-sm text-neutral-600">
                  {reservation.customer?.fullName || '-'}
                  {reservation.customer?.email && <span className="text-muted text-xs"> ({reservation.customer.email})</span>}
                </td>
                <td className="px-6 py-4 text-sm text-neutral-600">
                  {reservation.house?.address || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-neutral-600">
                  {new Date(reservation.reservationDate).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                    reservation.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {reservation.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-600">{reservation.handledByUser?.fullName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reservations?.length === 0 && (
        <div className="text-center py-12 text-muted">
          No reservations found
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Reservation</h2>
            {createError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{createError}</p>
              </div>
            )}
            <form onSubmit={handleCreateReservation}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Customer *
                </label>
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500 mb-2"
                />
                <select
                  value={newReservation.customerId}
                  onChange={(e) => setNewReservation({ ...newReservation, customerId: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500"
                  required
                >
                  <option value="">Select a customer</option>
                  {filteredCustomers?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  House *
                </label>
                <input
                  type="text"
                  placeholder="Search houses..."
                  value={houseSearch}
                  onChange={(e) => setHouseSearch(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500 mb-2"
                />
                <select
                  value={newReservation.houseId}
                  onChange={(e) => setNewReservation({ ...newReservation, houseId: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500"
                  required
                >
                  <option value="">Select an available house</option>
                  {filteredHouses?.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.address} - ${Number(h.price).toLocaleString()} ({h.listingType})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Reservation Date
                </label>
                <input
                  type="datetime-local"
                  value={newReservation.reservationDate}
                  onChange={(e) => setNewReservation({ ...newReservation, reservationDate: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    setCreateError('')
                    setCustomerSearch('')
                    setHouseSearch('')
                  }}
                  className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
                >
                  {createMutation.isPending ? 'Creating...' : 'Create Reservation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReservationList
