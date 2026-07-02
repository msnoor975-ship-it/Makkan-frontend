import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = useAuthStore((state) => state.token)
  const role = useAuthStore((state) => state.role)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" replace />
  }

  return children
}

export default ProtectedRoute
