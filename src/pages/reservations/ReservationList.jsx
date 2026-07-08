import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import client from '../../api/client'

function ReservationList() {
  const [customerIdFilter, setCustomerIdFilter] = useState('')
  const [houseIdFilter, setHouseIdFilter] = useState('')
  const [customerSearch, setCustomerSearch] = useState('')
  const [houseSearch, setHouseSearch] = useState('')

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

  const filteredCustomers = customers?.filter((c) =>
    c.fullName.toLowerCase().includes(customerSearch.toLowerCase())
  )

  const filteredHouses = houses?.filter((h) =>
    h.address.toLowerCase().includes(houseSearch.toLowerCase())
  )

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
        <Link
          to="/reservations/search-and-reserve"
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Search and Reserve House
        </Link>
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
                <td className="px-6 py-4 text-sm">
                  <Link to={`/houses/${reservation.houseId}`} className="text-primary-500 hover:text-primary-600 font-medium">
                    {reservation.house?.address || '-'}
                  </Link>
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
    </div>
  )
}

export default ReservationList
