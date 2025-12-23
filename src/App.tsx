import { useState } from 'react'
import './App.css'
import { fillPdfTemplate } from './pdfService'

interface FormData {
  name: string
  address: string
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
  })
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setIsProcessing(true)

    try {
      await fillPdfTemplate(formData)
      setStatus({
        type: 'success',
        message: 'PDF generated and downloaded successfully!',
      })
      setFormData({ name: '', address: '' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to generate PDF',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="app">
      <h1>PDF Fill POC</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            placeholder="Enter your address"
          />
        </div>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? 'Generating PDF...' : 'Generate PDF'}
        </button>
      </form>
      {status && (
        <div className={`status ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  )
}

export default App
