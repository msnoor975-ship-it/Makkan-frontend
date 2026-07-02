function ErrorMessage({ message }) {
  return (
    <div
      style={{
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        color: '#721c24',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1rem',
      }}
    >
      {message}
    </div>
  )
}

export default ErrorMessage
