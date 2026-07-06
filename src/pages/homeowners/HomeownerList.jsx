import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import client from '../../api/client'
import ConfirmDialog from '../../components/ConfirmDialog'

function HomeownerList() {
  const [deleteId, setDeleteId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const queryClient = useQueryClient()
  const role = useAuthStore((state) => state.role)

  const { data: homeowners, isLoading, error } = useQuery({
    queryKey: ['homeowners'],
    queryFn: async () => {
      const response = await client.get('/api/homeowners')
      return response.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await client.delete(`/api/homeowners/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['homeowners'])
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
    return <div className="text-center py-8 text-neutral-600">Loading homeowners...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading homeowners: {error.message}</div>
  }

  return (
    <div className="bg-surface rounded-xl shadow-card p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-ink font-heading font-bold text-3xl">Homeowners</h1>
        {role !== 'secretary' && (
          <Link
            to="/homeowners/add"
            className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2.5 font-semibold text-sm transition-colors"
          >
            Add Homeowner
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-neutral-50 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-neutral-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Added By</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Houses</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {homeowners?.map((homeowner) => (
              <tr key={homeowner.id} className="hover:bg-neutral-100 transition-colors">
                <td className="px-6 py-4 text-sm text-neutral-600">{homeowner.id.slice(0, 8)}...</td>
                <td className="px-6 py-4 text-sm font-medium text-ink">{homeowner.fullName}</td>
                <td className="px-6 py-4 text-sm text-neutral-600">{homeowner.phone || '-'}</td>
                <td className="px-6 py-4 text-sm text-neutral-600">{homeowner.addedByUser?.fullName || '-'}</td>
                <td className="px-6 py-4 text-sm text-neutral-600">{homeowner.houses?.length || 0}</td>
                <td className="px-6 py-4 text-sm">
                  <Link to={`/homeowners/${homeowner.id}`} className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors mr-2">
                    View
                  </Link>
                  {role !== 'secretary' && (
                    <button
                      onClick={() => {
                        setDeleteId(homeowner.id)
                        setShowDeleteDialog(true)
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this homeowner?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}

export default HomeownerList
