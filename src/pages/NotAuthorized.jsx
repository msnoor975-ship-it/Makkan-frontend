import { useNavigate } from 'react-router-dom'

function NotAuthorized() {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1>Not Authorized</h1>
      <p style={{ marginBottom: '2rem' }}>
        You don't have permission to access this page.
      </p>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginRight: '1rem',
        }}
      >
        Go Back
      </button>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Home
      </button>
    </div>
  )
}

export default NotAuthorized
