import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CustomerList from './CustomerList'

// Mock the auth store
vi.mock('../../store/authStore', () => ({
  useAuthStore: vi.fn(),
}))

// Mock the API client
vi.mock('../../api/client', () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}))

// Mock the reusable components
vi.mock('../../components/LoadingSpinner', () => ({
  default: ({ message }) => <div>{message}</div>,
}))

vi.mock('../../components/ErrorMessage', () => ({
  default: ({ message }) => <div>{message}</div>,
}))

vi.mock('../../components/ConfirmDialog', () => ({
  default: ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null
    return (
      <div data-testid="confirm-dialog">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    )
  },
}))

describe('CustomerList Component', () => {
  const mockQueryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(require('../../store/authStore').useAuthStore).mockReturnValue({
      role: 'manager',
    })
  })

  it('renders customer list with data', async () => {
    const mockClient = require('../../api/client').default
    mockClient.get.mockResolvedValue({
      data: [
        {
          id: '1',
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          status: 'active',
          addedByUser: { fullName: 'Admin' },
        },
      ],
    })

    render(
      <QueryClientProvider client={mockQueryClient}>
        <BrowserRouter>
          <CustomerList />
        </BrowserRouter>
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Customers')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })

  it('renders empty state when no customers', async () => {
    const mockClient = require('../../api/client').default
    mockClient.get.mockResolvedValue({ data: [] })

    render(
      <QueryClientProvider client={mockQueryClient}>
        <BrowserRouter>
          <CustomerList />
        </BrowserRouter>
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Customers')).toBeInTheDocument()
    })
  })

  it('filters customers by search term', async () => {
    const mockClient = require('../../api/client').default
    mockClient.get.mockResolvedValue({
      data: [
        {
          id: '1',
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          status: 'active',
          addedByUser: { fullName: 'Admin' },
        },
      ],
    })

    render(
      <QueryClientProvider client={mockQueryClient}>
        <BrowserRouter>
          <CustomerList />
        </BrowserRouter>
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Customers')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search by name or ID...')
    fireEvent.change(searchInput, { target: { value: 'John' } })

    await waitFor(() => {
      expect(mockClient.get).toHaveBeenCalledWith('/api/customers', {
        params: { search: 'John' },
      })
    })
  })

  it('shows delete button only for manager role', async () => {
    const mockClient = require('../../api/client').default
    mockClient.get.mockResolvedValue({
      data: [
        {
          id: '1',
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          status: 'active',
          addedByUser: { fullName: 'Admin' },
        },
      ],
    })

    vi.mocked(require('../../store/authStore').useAuthStore).mockReturnValue({
      role: 'manager',
    })

    render(
      <QueryClientProvider client={mockQueryClient}>
        <BrowserRouter>
          <CustomerList />
        </BrowserRouter>
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })
  })

  it('hides delete button for non-manager roles', async () => {
    const mockClient = require('../../api/client').default
    mockClient.get.mockResolvedValue({
      data: [
        {
          id: '1',
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          status: 'active',
          addedByUser: { fullName: 'Admin' },
        },
      ],
    })

    vi.mocked(require('../../store/authStore').useAuthStore).mockReturnValue({
      role: 'sales_employee',
    })

    render(
      <QueryClientProvider client={mockQueryClient}>
        <BrowserRouter>
          <CustomerList />
        </BrowserRouter>
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    })
  })

  it('opens delete confirmation dialog when delete button clicked', async () => {
    const mockClient = require('../../api/client').default
    mockClient.get.mockResolvedValue({
      data: [
        {
          id: '1',
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          status: 'active',
          addedByUser: { fullName: 'Admin' },
        },
      ],
    })

    vi.mocked(require('../../store/authStore').useAuthStore).mockReturnValue({
      role: 'manager',
    })

    render(
      <QueryClientProvider client={mockQueryClient}>
        <BrowserRouter>
          <CustomerList />
        </BrowserRouter>
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Delete'))

    expect(screen.getByTestId('confirm-dialog')).toBeInTheDocument()
  })
})
