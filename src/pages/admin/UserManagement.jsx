import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import client from '../../api/client'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'

function UserManagement() {
  const [search, setSearch] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    fullName: '',
    role: 'sales_employee',
  })
  const queryClient = useQueryClient()
  const role = useAuthStore((state) => state.role)

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users', search],
    queryFn: async () => {
      const response = await client.get('/api/users')
      return response.data
    },
    enabled: role === 'manager',
  })

  const createMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await client.post('/api/users', userData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', search] })
      setShowCreateModal(false)
      setNewUser({
        username: '',
        password: '',
        fullName: '',
        role: 'sales_employee',
      })
    },
    onError: (error) => {
      console.error('Error creating user:', error)
      const errorMessage = error.response?.data?.message || error.message
      alert(`Failed to create user: ${errorMessage}`)
      setNewUser((prev) => ({ ...prev, password: '' }))
    },
  })

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }) => {
      const response = await client.patch(`/api/users/${userId}/role`, { role })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', search] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (userId) => {
      await client.delete(`/api/users/${userId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', search] })
    },
  })

  const handleCreateUser = (e) => {
    e.preventDefault()
    createMutation.mutate(newUser)
  }

  const handleRoleChange = (userId, newRole) => {
    updateRoleMutation.mutate({ userId, role: newRole })
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(userId)
    }
  }

  if (role !== 'manager') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message="Access denied. Manager privileges required." />
      </div>
    )
  }

  if (isLoading) return <LoadingSpinner message="Loading users..." />
  if (error) return <ErrorMessage message={error.message} />

  const filteredUsers = users?.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.fullName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-ink">User Management</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Create User
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredUsers?.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">{user.fullName}</div>
                      <div className="text-sm text-neutral-500">{user.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="text-sm border border-neutral-300 rounded px-2 py-1"
                    >
                      <option value="manager">Manager</option>
                      <option value="sales_employee">Sales Employee</option>
                      <option value="rental_employee">Rental Employee</option>
                      <option value="secretary">Secretary</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create New User</h2>
              <form onSubmit={handleCreateUser}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500"
                  >
                    <option value="manager">Manager</option>
                    <option value="sales_employee">Sales Employee</option>
                    <option value="rental_employee">Rental Employee</option>
                    <option value="secretary">Secretary</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
                  >
                    {createMutation.isPending ? 'Creating...' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserManagement
