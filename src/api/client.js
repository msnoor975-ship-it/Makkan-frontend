import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - logout and redirect
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/'
      return Promise.reject({
        message: 'Session expired. Please login again.',
        status: 401,
      })
    }

    // Handle network errors (no response from server)
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Unable to connect to the server. Please check if the backend is running.',
        status: 0,
      })
    }

    // Handle server errors (5xx)
    if (error.response?.status >= 500) {
      return Promise.reject({
        message: 'Server error. Please try again later.',
        status: error.response.status,
      })
    }

    // Handle client errors (4xx) - use backend error message if available
    const backendMessage = error.response?.data?.error || error.response?.data?.message
    if (backendMessage) {
      return Promise.reject({
        message: backendMessage,
        status: error.response.status,
      })
    }

    // Default error message
    return Promise.reject({
      message: `Request failed with status ${error.response?.status}`,
      status: error.response?.status,
    })
  }
)

export default client
