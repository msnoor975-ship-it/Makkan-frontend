import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import client from '../../api/client'

const ALLOWED_CATEGORIES = ['utilities', 'wages', 'household_expenses', 'tenant_expenses']

function AddFinancialEntry() {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    entryDate: new Date().toISOString().slice(0, 16),
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const validate = () => {
    const newErrors = {}

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await client.post('/api/finance', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['finance'])
      navigate('/finance/report')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      mutation.mutate({
        ...formData,
        amount: parseFloat(formData.amount),
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const inputStyles = {
    width: '100%',
    padding: '0.75rem 1rem',
    marginTop: '0.25rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    boxSizing: 'border-box',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s ease',
    outline: 'none'
  }

  const labelStyles = {
    display: 'block',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#334155',
    fontSize: '0.875rem'
  }

  const errorStyles = {
    color: '#dc2626',
    fontSize: '0.875rem',
    marginTop: '-0.75rem',
    marginBottom: '1rem',
    fontWeight: '500'
  }

  const buttonStyles = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '0.5rem',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease'
  }

  const cancelButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#64748b',
  }

  return (
    <div style={{ 
      maxWidth: '650px', 
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2.5rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{
        marginBottom: '2rem',
        color: '#1e293b',
        fontSize: '1.875rem',
        fontWeight: '700',
        letterSpacing: '-0.025em'
      }}>Add Financial Entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category" style={labelStyles}>
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={inputStyles}
          >
            <option value="">Select a category</option>
            {ALLOWED_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>
          {errors.category && <div style={errorStyles}>{errors.category}</div>}
        </div>

        <div>
          <label htmlFor="amount" style={labelStyles}>
            Amount *
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            style={inputStyles}
          />
          {errors.amount && <div style={errorStyles}>{errors.amount}</div>}
        </div>

        <div>
          <label htmlFor="description" style={labelStyles}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={inputStyles}
            rows={3}
          />
          {errors.description && <div style={errorStyles}>{errors.description}</div>}
        </div>

        <div>
          <label htmlFor="entryDate" style={labelStyles}>
            Entry Date
          </label>
          <input
            id="entryDate"
            name="entryDate"
            type="datetime-local"
            value={formData.entryDate}
            onChange={handleChange}
            style={inputStyles}
          />
          {errors.entryDate && <div style={errorStyles}>{errors.entryDate}</div>}
        </div>

        {mutation.error && (
          <div style={{ 
            color: '#dc2626',
            marginBottom: '1.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            {mutation.error.message || 'An error occurred'}
          </div>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          style={{
            ...buttonStyles,
            backgroundColor: mutation.isPending ? '#94a3b8' : '#3b82f6',
            cursor: mutation.isPending ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => !mutation.isPending && (e.target.style.backgroundColor = '#2563eb')}
          onMouseLeave={(e) => !mutation.isPending && (e.target.style.backgroundColor = '#3b82f6')}
        >
          {mutation.isPending ? 'Saving...' : 'Create Entry'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/finance/report')}
          style={cancelButtonStyles}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default AddFinancialEntry
