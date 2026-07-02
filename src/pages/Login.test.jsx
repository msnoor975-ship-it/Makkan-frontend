import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'

// Mock the auth store
vi.mock('../store/authStore', () => ({
  useAuthStore: vi.fn(),
}))

// Mock the API client
vi.mock('../api/client', () => ({
  default: {
    post: vi.fn(),
  },
}))

describe('Login Component', () => {
  const mockLogin = vi.fn()
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(require('../store/authStore').useAuthStore).mockReturnValue({
      login: mockLogin,
    })
    vi.mocked(require('react-router-dom').useNavigate).mockReturnValue(mockNavigate)
  })

  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('shows error message on failed login', async () => {
    const mockClient = require('../api/client').default
    mockClient.post.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    })

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(usernameInput, { target: { value: 'wronguser' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })

  it('calls login and redirects on successful login', async () => {
    const mockClient = require('../api/client').default
    mockClient.post.mockResolvedValue({
      data: {
        token: 'fake-token',
        user: { id: '1', username: 'testuser', fullName: 'Test User' },
        role: 'sales_employee',
      },
    })

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        'fake-token',
        { id: '1', username: 'testuser', fullName: 'Test User' },
        'sales_employee'
      )
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('disables button and shows loading state during login', async () => {
    const mockClient = require('../api/client').default
    mockClient.post.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: { token: 'token', user: {}, role: 'sales_employee' } }), 100)
        )
    )

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(loginButton)

    expect(screen.getByRole('button', { name: 'Logging in...' })).toBeDisabled()
  })
})
