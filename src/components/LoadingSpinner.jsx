function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: '#6c757d',
      }}
    >
      <div
        style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
        }}
      />
      <p style={{ marginTop: '1rem' }}>{message}</p>
    </div>
  )
}

export default LoadingSpinner
