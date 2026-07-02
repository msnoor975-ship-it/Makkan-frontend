import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

// Mock the auth store
vi.mock('../store/authStore', () => ({
  useAuthStore: vi.fn(),
}))

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects to login when no token is present', () => {
    vi.mocked(require('../store/authStore').useAuthStore).mockReturnValue({
      token: null,
      role: null,
    })

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </BrowserRouter>
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('renders children when token is present and no role restriction', () => {
    vi.mocked(require('../store/authStore').useAuthStore).mockReturnValue({
      token: 'fake-token',
      role: 'sales_employee',
    })

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('redirects to not-authorized when role is not in allowedRoles', () => {
    vi.mocked(require('../store/authStore').useAuthStore).mockReturnValue({
      token: 'fake-token',
      role: 'secretary',
    })

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'manager']}>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/not-authorized" element={<div>Not Authorized</div>} />
        </Routes>
      </BrowserRouter>
    )

    expect(screen.getByText('Not Authorized')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('renders children when role is in allowedRoles', () => {
    vi.mocked(require('../store/authStore').useAuthStore).mockReturnValue({
      token: 'fake-token',
      role: 'manager',
    })

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'manager']}>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('renders children when role is in allowedRoles with single role', () => {
    vi.mocked(require('../store/authStore').useAuthStore).mockReturnValue({
      token: 'fake-token',
      role: 'manager',
    })

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })
})
