import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import client from '../../api/client'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'

function ApprovalQueue() {
  const queryClient = useQueryClient()
  const role = useAuthStore((state) => state.role)

  const { data: pendingUsers, isLoading, error } = useQuery({
    queryKey: ['pending-users'],
    queryFn: async () => {
      const response = await client.get('/api/users/pending')
      return response.data
    },
    enabled: role === 'manager',
  })

  const approveMutation = useMutation({
    mutationFn: async (userId) => {
      const response = await client.patch(`/api/users/${userId}/status`, { status: 'active' })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-users'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: async (userId) => {
      const response = await client.patch(`/api/users/${userId}/status`, { status: 'deleted' })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-users'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleApprove = (userId) => {
    if (window.confirm('Are you sure you want to approve this user?')) {
      approveMutation.mutate(userId)
    }
  }

  const handleReject = (userId) => {
    if (window.confirm('Are you sure you want to reject this user?')) {
      rejectMutation.mutate(userId)
    }
  }

  if (role !== 'manager') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message="Access denied. Manager privileges required." />
      </div>
    )
  }

  if (isLoading) return <LoadingSpinner message="Loading pending approvals..." />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-ink mb-8">Approval Queue</h1>

        {pendingUsers?.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-neutral-500">
            No pending approvals
          </div>
        ) : (
          <div className="space-y-4">
            {pendingUsers?.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{user.fullName}</h3>
                    <p className="text-neutral-500">@{user.username}</p>
                    {user.email && <p className="text-neutral-400 text-sm">{user.email}</p>}
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span>The role: <span className="font-medium">{user.role}</span></span>
                      <span>Applied: {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApprove(user.id)}
                      disabled={approveMutation.isPending}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(user.id)}
                      disabled={rejectMutation.isPending}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ApprovalQueue
