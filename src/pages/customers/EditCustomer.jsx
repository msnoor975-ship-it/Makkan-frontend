import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import CustomerForm from './CustomerForm'
import client from '../../api/client'

function EditCustomer() {
  const { id } = useParams()

  const { data: customer, isLoading, error } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      const response = await client.get(`/api/customers/${id}`)
      return response.data
    },
  })

  if (isLoading) {
    return <div>Loading customer...</div>
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error loading customer: {error.message}</div>
  }

  return <CustomerForm customer={customer} isEdit={true} />
}

export default EditCustomer
