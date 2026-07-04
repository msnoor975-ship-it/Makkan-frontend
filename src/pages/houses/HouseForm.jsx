import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import client from '../../api/client'

function HouseForm({ house, isEdit }) {
  const [formData, setFormData] = useState({
    address: house?.address || '',
    specifications: house?.specifications || '',
    price: house?.price || '',
    listingType: house?.listingType || 'sale',
    status: house?.status || 'available',
    homeownerId: house?.homeownerId || '',
    imageUrl: house?.imageUrl || '',
  })
  const [errors, setErrors] = useState({})
  const [homeownerSearch, setHomeownerSearch] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(house?.imageUrl || '')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: homeowners } = useQuery({
    queryKey: ['homeowners'],
    queryFn: async () => {
      const response = await client.get('/api/homeowners')
      return response.data
    },
  })

  const validate = () => {
    const newErrors = {}

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0'
    }

    if (!formData.homeownerId.trim()) {
      newErrors.homeownerId = 'Homeowner is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (isEdit) {
        const response = await client.put(`/api/houses/${house.id}`, data)
        return response.data
      } else {
        const response = await client.post('/api/houses', data)
        return response.data
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['houses'])
      navigate('/houses')
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    let imageUrl = formData.imageUrl
    if (imageFile) {
      imageUrl = await handleUpload()
    }

    if (validate()) {
      const submitData = {
        ...formData,
        imageUrl,
        price: parseFloat(formData.price),
      }
      console.log('Submitting house data:', submitData)
      mutation.mutate(submitData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      const maxSize = 5 * 1024 * 1024

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG, JPG, PNG, GIF, and WEBP files are allowed')
        e.target.value = ''
        return
      }

      if (file.size > maxSize) {
        alert('File size must be less than 5MB')
        e.target.value = ''
        return
      }

      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!imageFile) return

    setUploading(true)
    setUploadProgress(0)
    const formData = new FormData()
    formData.append('image', imageFile)
    formData.append('type', 'house')

    try {
      const response = await client.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(progress)
        },
      })
      console.log('Upload successful:', response.data.imageUrl)
      setFormData((prev) => ({ ...prev, imageUrl: response.data.imageUrl }))
      setUploading(false)
      setUploadProgress(0)
      return response.data.imageUrl
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload image. Please try again.')
      setUploading(false)
      setUploadProgress(0)
      throw error
    }
  }

  const filteredHomeowners = homeowners?.filter((h) =>
    h.fullName.toLowerCase().includes(homeownerSearch.toLowerCase())
  )

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
      }}>{isEdit ? 'Edit House' : 'Add House'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address" style={labelStyles}>
            Address *
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            style={inputStyles}
          />
          {errors.address && <div style={errorStyles}>{errors.address}</div>}
        </div>

        <div>
          <label htmlFor="specifications" style={labelStyles}>
            Specifications
          </label>
          <textarea
            id="specifications"
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            style={inputStyles}
            rows={3}
          />
          {errors.specifications && <div style={errorStyles}>{errors.specifications}</div>}
        </div>

        <div>
          <label htmlFor="price" style={labelStyles}>
            Price *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            style={inputStyles}
          />
          {errors.price && <div style={errorStyles}>{errors.price}</div>}
        </div>

        <div>
          <label htmlFor="listingType" style={labelStyles}>
            Listing Type *
          </label>
          <select
            id="listingType"
            name="listingType"
            value={formData.listingType}
            onChange={handleChange}
            style={inputStyles}
          >
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
          {errors.listingType && <div style={errorStyles}>{errors.listingType}</div>}
        </div>

        <div>
          <label htmlFor="status" style={labelStyles}>
            Status *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={inputStyles}
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
          {errors.status && <div style={errorStyles}>{errors.status}</div>}
        </div>

        <div>
          <label style={labelStyles}>
            House Image
          </label>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.875rem',
                cursor: uploading ? 'not-allowed' : 'pointer',
                opacity: uploading ? 0.6 : 1
              }}
            />
            {uploading && (
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{
                  width: '100%',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '8px',
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${uploadProgress}%`,
                    backgroundColor: '#0EA97B',
                    height: '100%',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <div style={{
                  marginTop: '0.25rem',
                  color: '#64748b',
                  fontSize: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>Uploading image...</span>
                  <span>{uploadProgress}%</span>
                </div>
              </div>
            )}
          </div>
          {imagePreview && (
            <div style={{ marginBottom: '1rem' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '2px solid #cbd5e1'
                }}
              />
            </div>
          )}
          <input
            type="hidden"
            name="imageUrl"
            value={formData.imageUrl}
          />
        </div>

        <div>
          <label htmlFor="homeownerId" style={labelStyles}>
            Homeowner *
          </label>
          <input
            type="text"
            placeholder="Search homeowners..."
            value={homeownerSearch}
            onChange={(e) => setHomeownerSearch(e.target.value)}
            style={inputStyles}
          />
          <select
            id="homeownerId"
            name="homeownerId"
            value={formData.homeownerId}
            onChange={handleChange}
            style={inputStyles}
          >
            <option value="">Select a homeowner</option>
            {filteredHomeowners?.map((h) => (
              <option key={h.id} value={h.id}>
                {h.fullName} {h.phone ? `(${h.phone})` : ''}
              </option>
            ))}
          </select>
          {errors.homeownerId && <div style={errorStyles}>{errors.homeownerId}</div>}
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
          {mutation.isPending ? 'Saving...' : isEdit ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/houses')}
          style={cancelButtonStyles}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default HouseForm
