import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import client from '../../api/client'

function HomeownerForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    imageUrl: '',
  })
  const [errors, setErrors] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const validate = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await client.post('/api/homeowners', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['homeowners'])
      navigate('/homeowners')
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
      }
      console.log('Submitting homeowner data:', submitData)
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
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!imageFile) return

    setUploading(true)
    const formData = new FormData()
    formData.append('image', imageFile)
    formData.append('type', 'homeowner')

    try {
      const response = await client.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Upload successful:', response.data.imageUrl)
      setFormData((prev) => ({ ...prev, imageUrl: response.data.imageUrl }))
      setUploading(false)
      return response.data.imageUrl
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload image. Please try again.')
      setUploading(false)
      throw error
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
      }}>Add Homeowner</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName" style={labelStyles}>
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            style={inputStyles}
          />
          {errors.fullName && <div style={errorStyles}>{errors.fullName}</div>}
        </div>

        <div>
          <label htmlFor="phone" style={labelStyles}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyles}
          />
          {errors.phone && <div style={errorStyles}>{errors.phone}</div>}
        </div>

        <div>
          <label style={labelStyles}>
            Profile Image
          </label>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.875rem'
              }}
            />
            {imageFile && (
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: uploading ? '#94a3b8' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            )}
          </div>
          {imagePreview && (
            <div style={{ marginBottom: '1rem' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '50%',
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
          {mutation.isPending ? 'Saving...' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/homeowners')}
          style={cancelButtonStyles}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default HomeownerForm
