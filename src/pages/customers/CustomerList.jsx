import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import client from '../../api/client'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import ConfirmDialog from '../../components/ConfirmDialog'

function CustomerList() {
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const queryClient = useQueryClient()
  const role = useAuthStore((state) => state.role)

  const { data: customers, isLoading, error } = useQuery({
    queryKey: ['customers', search],
    queryFn: async () => {
      const params = search ? { search } : {}
      const response = await client.get('/api/customers', { params })
      return response.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await client.delete(`/api/customers/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['customers'])
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
    return <LoadingSpinner message="Loading customers..." />
  }

  if (error) {
    return <ErrorMessage message={`Error loading customers: ${error.message}`} />
  }

  return (
    <div className="bg-surface rounded-xl shadow-card p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-ink font-heading font-bold text-3xl">Customers</h1>
        <Link
          to="/customers/add"
          className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2.5 font-semibold text-sm transition-colors"
        >
          Add Customer
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by name or ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {customers?.map((customer) => (
          <div
            key={customer.id}
            className="bg-neutral-50 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-medium transition-shadow"
          >
            {customer.imageUrl ? (
              <img
                src={customer.imageUrl}
                alt={customer.fullName}
                className="w-20 h-20 object-cover rounded-full mb-4 shadow-soft"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-20 h-20 bg-primary-500 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-soft">
                {customer.fullName.charAt(0).toUpperCase()}
              </div>
            )}
            <h3 className="text-ink font-heading font-semibold text-lg mb-2">{customer.fullName}</h3>
            <p className="text-muted text-sm mb-1">{customer.phone || 'No phone'}</p>
            <p className="text-muted text-sm mb-4">{customer.email || 'No email'}</p>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize mb-4 ${
              customer.status === 'active' ? 'bg-green-100 text-green-700' :
              customer.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {customer.status}
            </span>
            <div className="mt-auto flex gap-2">
              <Link to={`/customers/${customer.id}`} className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                View
              </Link>
              <Link to={`/customers/${customer.id}/edit`} className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                Edit
              </Link>
              {role === 'manager' && (
                <button
                  onClick={() => {
                    setDeleteId(customer.id)
                    setShowDeleteDialog(true)
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this customer?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}

export default CustomerList
