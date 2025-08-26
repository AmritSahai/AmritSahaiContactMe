import React, { useState, useEffect } from 'react'
import './App.css'
import Moon from './Moon'
import Stars from './Stars'
import Success from './Success'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '05ad063a-a74c-4d2e-b691-113f8fb25175',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Contact Form Submission',
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        // Start transition
        setIsTransitioning(true)
        
        // Wait for fade out, then show success
        setTimeout(() => {
          setShowSuccess(true)
          setFormData({ name: '', email: '', message: '' })
          // Wait for next frame, then fade in
          requestAnimationFrame(() => {
            setIsTransitioning(false)
          })
        }, 300)
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoBack = () => {
    // Start transition
    setIsTransitioning(true)
    
    // Wait for fade out, then go back
    setTimeout(() => {
      setShowSuccess(false)
      // Wait for next frame, then fade in
      requestAnimationFrame(() => {
        setIsTransitioning(false)
      })
    }, 300)
  }

  return (
    <div className="app">
      <Stars />
      <Moon />
      <div className={`page-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        {showSuccess ? (
          <Success onGoBack={handleGoBack} />
        ) : (
          <>
            <div className="contact-container">
              <div className="contact-form-section">
                <h1 className="contact-title">Contact Me</h1>

                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="form-textarea"
                    />
                  </div>
                  
                  <button type="submit" className="send-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              <div className="info-section">
                <h2 className="info-title">Let's Get to Work!</h2>
                <p className="info-text">Feel free to send me a message.</p>
                <a href="tel:602-358-3212" className="info-link">Phone Number: 602-358-3212</a>
              </div>
            </div>
            
            <div className="footer-section">
              <p className="developer-credit">Developed by Amrit Sahai</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
