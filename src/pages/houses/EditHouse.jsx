import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import HouseForm from './HouseForm'
import client from '../../api/client'

function EditHouse() {
  const { id } = useParams()

  const { data: house, isLoading, error } = useQuery({
    queryKey: ['house', id],
    queryFn: async () => {
      const response = await client.get(`/api/houses/${id}`)
      return response.data
    },
  })

  if (isLoading) {
    return <div>Loading house...</div>
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error loading house: {error.message}</div>
  }

  return <HouseForm house={house} isEdit={true} />
}

export default EditHouse
