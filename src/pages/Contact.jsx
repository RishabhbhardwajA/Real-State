import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, ArrowRight } from 'lucide-react'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="page-enter contact-page">
      <section className="contact-hero">
        <div className="container">
          <div className="section-label"><MessageCircle size={12} /> Get In Touch</div>
          <h1>Contact <span className="gradient-text">Us</span></h1>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Have a question or ready to start your property journey? We're here to help.
          </p>
        </div>
      </section>

      <section className="container contact-content">
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Let's Start a <span className="gold-text">Conversation</span></h3>
            <p>Whether you're looking for your dream home, want to list a property, or need expert advice — our team is ready to assist you.</p>

            <div className="contact-details">
              <div className="contact-item glass-card">
                <div className="contact-item-icon"><Mail size={20} /></div>
                <div>
                  <strong>Email Us</strong>
                  <a href="mailto:hello@propease.com">hello@propease.com</a>
                </div>
              </div>
              <div className="contact-item glass-card">
                <div className="contact-item-icon"><Phone size={20} /></div>
                <div>
                  <strong>Call Us</strong>
                  <a href="tel:+12125550100">+1 (212) 555-0100</a>
                </div>
              </div>
              <div className="contact-item glass-card">
                <div className="contact-item-icon"><MapPin size={20} /></div>
                <div>
                  <strong>Visit Us</strong>
                  <span>432 Park Avenue, New York, NY 10022</span>
                </div>
              </div>
              <div className="contact-item glass-card">
                <div className="contact-item-icon"><Clock size={20} /></div>
                <div>
                  <strong>Office Hours</strong>
                  <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form glass-card" onSubmit={handleSubmit} id="contact-form">
            <h3>Send a Message</h3>
            <div className="form-row">
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" className="input" placeholder="John Doe" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" className="input" placeholder="john@email.com" required
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>Phone</label>
                <input type="tel" className="input" placeholder="+1 (555) 000-0000"
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Subject</label>
                <select className="input" value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}>
                  <option value="">Select a topic</option>
                  <option>Buying a Property</option>
                  <option>Selling a Property</option>
                  <option>Investment Advice</option>
                  <option>Agent Partnership</option>
                  <option>Platform Demo</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="input-group">
              <label>Message</label>
              <textarea className="input" placeholder="Tell us about your needs..." rows="5" required
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }}>
              {submitted ? '✓ Message Sent!' : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
