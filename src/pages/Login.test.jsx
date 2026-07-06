import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './Login'
import { useAuthStore } from '../store/authStore'
import client from '../api/client'
import { useNavigate } from 'react-router-dom'

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

// Mock react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

// Mock Navbar and Footer components
vi.mock('../components/Navbar', () => ({
  default: () => <div>Mock Navbar</div>,
}))

vi.mock('../components/Footer', () => ({
  default: () => <div>Mock Footer</div>,
}))

describe('Login Component', () => {
  const mockQueryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  const mockLogin = vi.fn()
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuthStore).mockImplementation((selector) => selector({
      login: mockLogin,
    }))
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  it('renders login form', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </QueryClientProvider>
    )

    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('shows error message on failed login', async () => {
    vi.mocked(client).post.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    })

    render(
      <QueryClientProvider client={mockQueryClient}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </QueryClientProvider>
    )

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const loginButton = screen.getByRole('button', { name: 'Sign In' })

    fireEvent.change(usernameInput, { target: { value: 'wronguser' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })

  it('calls login and redirects on successful login', async () => {
    vi.mocked(client).post.mockResolvedValue({
      data: {
        token: 'fake-token',
        user: { id: '1', username: 'testuser', fullName: 'Test User', role: 'sales_employee' },
      },
    })

    render(
      <QueryClientProvider client={mockQueryClient}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </QueryClientProvider>
    )

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const loginButton = screen.getByRole('button', { name: 'Sign In' })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        'fake-token',
        { id: '1', username: 'testuser', fullName: 'Test User', role: 'sales_employee' },
        'sales_employee'
      )
    })
  })

  it('disables button and shows loading state during login', async () => {
    vi.mocked(client).post.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: { token: 'token', user: { role: 'sales_employee' }, role: 'sales_employee' } }), 100)
        )
    )

    render(
      <QueryClientProvider client={mockQueryClient}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </QueryClientProvider>
    )

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const loginButton = screen.getByRole('button', { name: 'Sign In' })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(loginButton)

    expect(screen.getByRole('button', { name: 'Logging in...' })).toBeDisabled()
  })
})
