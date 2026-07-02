import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import client from '../../api/client'

const ALLOWED_CATEGORIES = ['utilities', 'wages', 'household_expenses', 'tenant_expenses']

function FinancialReport() {
  const [categoryFilter, setCategoryFilter] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const { data: finances, isLoading, error } = useQuery({
    queryKey: ['finance', categoryFilter, startDate, endDate],
    queryFn: async () => {
      const params = {}
      if (categoryFilter) params.category = categoryFilter
      if (startDate) params.startDate = startDate
      if (endDate) params.endDate = endDate
      const response = await client.get('/api/finance', { params })
      return response.data
    },
  })

  if (isLoading) {
    return <div className="text-center py-8 text-neutral-600">Loading financial entries...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading financial entries: {error.message}</div>
  }

  const totalAmount = finances?.reduce((sum, entry) => sum + Number(entry.amount), 0) || 0

  return (
    <div className="bg-surface rounded-xl shadow-card p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-ink font-heading font-bold text-3xl">Financial Report</h1>
        <Link to="/finance/add" className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2.5 font-semibold text-sm transition-colors">
          Add Entry
        </Link>
      </div>

      <div className="mb-6 p-6 bg-neutral-50 rounded-lg">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="font-semibold text-neutral-700 text-sm">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-surface"
          >
            <option value="">All Categories</option>
            {ALLOWED_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>

          <span className="font-semibold text-neutral-700 text-sm">Start Date:</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
          />

          <span className="font-semibold text-neutral-700 text-sm">End Date:</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
          />
        </div>
      </div>

      {finances && finances.length > 0 && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <strong className="text-green-800">Total Amount: SAR {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-neutral-50 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-neutral-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Entry Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Recorded By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {finances?.map((entry) => (
              <tr key={entry.id} className="hover:bg-neutral-100 transition-colors">
                <td className="px-6 py-4 text-sm text-neutral-600">{entry.id.slice(0, 8)}...</td>
                <td className="px-6 py-4 text-sm text-neutral-600">
                  {entry.category.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-primary-500">SAR {Number(entry.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="px-6 py-4 text-sm text-neutral-600">{entry.description || '-'}</td>
                <td className="px-6 py-4 text-sm text-neutral-600">
                  {new Date(entry.entryDate).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-neutral-600">{entry.recordedByUser?.fullName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {finances?.length === 0 && (
        <div className="text-center py-12 text-muted">
          No financial entries found
        </div>
      )}
    </div>
  )
}

export default FinancialReport
