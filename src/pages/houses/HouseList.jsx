import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import client from '../../api/client'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import ConfirmDialog from '../../components/ConfirmDialog'

function HouseList() {
  const [statusFilter, setStatusFilter] = useState('')
  const [listingTypeFilter, setListingTypeFilter] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const queryClient = useQueryClient()

  const { data: houses, isLoading, error } = useQuery({
    queryKey: ['houses', statusFilter, listingTypeFilter],
    queryFn: async () => {
      const params = {}
      if (statusFilter) params.status = statusFilter
      if (listingTypeFilter) params.listingType = listingTypeFilter
      const response = await client.get('/api/houses', { params })
      return response.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await client.delete(`/api/houses/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['houses'])
      setShowDeleteDialog(false)
      setDeleteId(null)
    },
  })

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId)
    }
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading houses..." />
  }

  if (error) {
    return <ErrorMessage message={`Error loading houses: ${error.message}`} />
  }

  return (
    <div className="bg-surface rounded-xl shadow-card p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-ink font-heading font-bold text-3xl">Houses</h1>
        <Link
          to="/houses/add"
          className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2.5 font-semibold text-sm transition-colors"
        >
          Add House
        </Link>
      </div>

      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-surface"
        >
          <option value="">All Statuses</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>

        <select
          value={listingTypeFilter}
          onChange={(e) => setListingTypeFilter(e.target.value)}
          className="px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-surface"
        >
          <option value="">All Types</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses?.map((house) => (
          <div
            key={house.id}
            className="bg-neutral-50 rounded-xl p-6 hover:shadow-medium transition-shadow"
          >
            {house.imageUrl ? (
              <img
                src={house.imageUrl}
                alt={house.address}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-full h-48 bg-primary-500 rounded-lg mb-4 flex items-center justify-center text-white font-semibold">
                No Image
              </div>
            )}
            <h3 className="text-ink font-heading font-semibold text-lg mb-2">{house.address}</h3>
            <p className="text-primary-500 font-bold text-xl mb-4">SAR {Number(house.price).toLocaleString()}</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                house.status === 'available' ? 'bg-green-100 text-green-700' :
                house.status === 'reserved' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {house.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize bg-primary-100 text-primary-700">
                {house.listingType}
              </span>
            </div>
            <div className="flex gap-2">
              <Link to={`/houses/${house.id}`} className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                View
              </Link>
              <Link to={`/houses/${house.id}/edit`} className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                Edit
              </Link>
              <button
                onClick={() => {
                  setDeleteId(house.id)
                  setShowDeleteDialog(true)
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this house?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}

export default HouseList
