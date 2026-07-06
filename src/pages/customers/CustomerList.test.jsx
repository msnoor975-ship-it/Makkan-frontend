import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CustomerList from './CustomerList'
import { useAuthStore } from '../../store/authStore'
import client from '../../api/client'

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
    vi.mocked(useAuthStore).mockImplementation((selector) => selector({
      role: 'manager',
    }))
  })

  it('renders customer list with data', async () => {
    vi.mocked(client).get.mockResolvedValue({
      data: [
        {
          id: '1',
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          status: 'active',
          addedByUser: { fullName: 'Manager' },
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
    vi.mocked(client).get.mockResolvedValue({ data: [] })

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
    vi.mocked(client).get.mockResolvedValue({
      data: [
        {
          id: '1',
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          status: 'active',
          addedByUser: { fullName: 'Manager' },
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
      expect(vi.mocked(client).get).toHaveBeenCalledWith('/api/customers', {
        params: { search: 'John' },
      })
    })
  })

  it('shows delete button for manager role', async () => {
    vi.mocked(client).get.mockResolvedValue({
      data: [
        {
          id: '1',
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          status: 'active',
          addedByUser: { fullName: 'Manager' },
        },
      ],
    })

    vi.mocked(useAuthStore).mockImplementation((selector) => selector({
      role: 'manager',
    }))

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

  it('shows delete button for sales_employee role', async () => {
    vi.mocked(client).get.mockResolvedValue({
      data: [
        {
          id: '1',
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          status: 'active',
          addedByUser: { fullName: 'Manager' },
        },
      ],
    })

    vi.mocked(useAuthStore).mockImplementation((selector) => selector({
      role: 'sales_employee',
    }))

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

  it('hides delete button for secretary role', async () => {
    vi.mocked(client).get.mockResolvedValue({
      data: [
        {
          id: '1',
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          status: 'active',
          addedByUser: { fullName: 'Manager' },
        },
      ],
    })

    vi.mocked(useAuthStore).mockImplementation((selector) => selector({
      role: 'secretary',
    }))

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
    vi.mocked(client).get.mockResolvedValue({
      data: [
        {
          id: '1',
          fullName: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
          status: 'active',
          addedByUser: { fullName: 'Manager' },
        },
      ],
    })

    vi.mocked(useAuthStore).mockImplementation((selector) => selector({
      role: 'manager',
    }))

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
