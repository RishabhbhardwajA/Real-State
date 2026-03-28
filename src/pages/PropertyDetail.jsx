import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import {
  MapPin, Bed, Bath, Square, Calendar, Car, TrendingUp, Star, Shield,
  Heart, Share2, ChevronLeft, ChevronRight, X, Phone, Mail, Send,
  Home, Wifi, Dumbbell, Trees, Award, ArrowRight
} from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import properties from '../data/properties.json'
import agents from '../data/agents.json'
import './PropertyDetail.css'

export default function PropertyDetail() {
  const { id } = useParams()
  const property = properties.find(p => p.id === parseInt(id))
  const [activeImage, setActiveImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [roiYears, setRoiYears] = useState(5)
  const [liked, setLiked] = useState(false)

  if (!property) return (
    <div className="page-enter" style={{ paddingTop: '120px', textAlign: 'center' }}>
      <h2>Property Not Found</h2>
      <Link to="/properties" className="btn btn-primary" style={{ marginTop: '20px' }}>Browse Properties</Link>
    </div>
  )

  const agent = agents.find(a => a.id === property.agentId) || agents[0]
  const similar = properties.filter(p => p.id !== property.id && (p.type === property.type || p.city === property.city)).slice(0, 3)

  const formatPrice = (price) => {
    if (property.status === 'For Rent') return `$${price.toLocaleString()}/mo`
    return price >= 1000000 ? `$${(price / 1000000).toFixed(1)}M` : `$${price.toLocaleString()}`
  }

  const futureValue = property.price * Math.pow(1 + (property.roi || 10) / 100, roiYears)

  return (
    <div className="page-enter property-detail-page">
      {/* Fullscreen Gallery Modal */}
      {showGallery && (
        <div className="gallery-modal overlay" onClick={() => setShowGallery(false)}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <button className="gallery-close" onClick={() => setShowGallery(false)}><X size={20} /></button>
            <img src={property.images[activeImage]} alt={`${property.title} ${activeImage + 1}`} />
            <button className="gallery-nav prev" onClick={() => setActiveImage(i => (i - 1 + property.images.length) % property.images.length)}>
              <ChevronLeft size={24} />
            </button>
            <button className="gallery-nav next" onClick={() => setActiveImage(i => (i + 1) % property.images.length)}>
              <ChevronRight size={24} />
            </button>
            <div className="gallery-counter">{activeImage + 1} / {property.images.length}</div>
          </div>
        </div>
      )}

      <section className="container detail-container">
        {/* Image Gallery */}
        <div className="detail-gallery" id="detail-gallery">
          <div className="gallery-main" onClick={() => setShowGallery(true)}>
            <img src={property.images[activeImage]} alt={property.title} />
            <div className="gallery-overlay-hint">Click to view full gallery</div>
          </div>
          <div className="gallery-thumbs">
            {property.images.map((img, i) => (
              <button
                key={i}
                className={`gallery-thumb ${i === activeImage ? 'active' : ''}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={img} alt={`View ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="detail-grid">
          <div className="detail-main">
            {/* Header */}
            <div className="detail-header">
              <div className="detail-badges">
                <span className={`property-status-badge ${property.status === 'For Rent' ? 'rent' : 'sale'}`}>
                  {property.status}
                </span>
                {property.featured && <span className="badge badge-gold">Featured</span>}
                {property.trustScore >= 95 && <span className="badge badge-success"><Shield size={10} /> Verified</span>}
              </div>
              <h1 className="detail-title">{property.title}</h1>
              <div className="detail-location"><MapPin size={16} /> {property.address}, {property.location}</div>
              <div className="detail-price-row">
                <span className="detail-price">{formatPrice(property.price)}</span>
                {property.pricePerSqft && <span className="detail-price-sqft">${property.pricePerSqft}/sqft</span>}
                <div className="detail-actions">
                  <button className={`action-btn ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)}>
                    <Heart size={18} fill={liked ? 'var(--danger)' : 'none'} />
                  </button>
                  <button className="action-btn"><Share2 size={18} /></button>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="detail-features glass-card">
              <div className="feature-box"><Bed size={20} /><span className="feature-val">{property.beds}</span><span className="feature-lbl">Bedrooms</span></div>
              <div className="feature-box"><Bath size={20} /><span className="feature-val">{property.baths}</span><span className="feature-lbl">Bathrooms</span></div>
              <div className="feature-box"><Square size={20} /><span className="feature-val">{property.sqft.toLocaleString()}</span><span className="feature-lbl">Sq Ft</span></div>
              <div className="feature-box"><Calendar size={20} /><span className="feature-val">{property.yearBuilt}</span><span className="feature-lbl">Year Built</span></div>
              <div className="feature-box"><Car size={20} /><span className="feature-val">{property.parking}</span><span className="feature-lbl">Parking</span></div>
              <div className="feature-box"><Home size={20} /><span className="feature-val">{property.type}</span><span className="feature-lbl">Type</span></div>
            </div>

            {/* Description */}
            <div className="detail-section">
              <h3>About This Property</h3>
              <p>{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="detail-section">
              <h3>Amenities & Features</h3>
              <div className="amenities-grid">
                {property.amenities.map((a, i) => (
                  <div key={i} className="amenity-item">
                    <Award size={14} />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Calculator */}
            {property.roi && (
              <div className="detail-section">
                <h3>Investment ROI Calculator</h3>
                <div className="roi-calculator glass-card" id="roi-calculator">
                  <div className="roi-slider-group">
                    <label>Investment Period: <strong>{roiYears} years</strong></label>
                    <input type="range" min="1" max="15" value={roiYears} onChange={e => setRoiYears(parseInt(e.target.value))} className="roi-slider" />
                  </div>
                  <div className="roi-results">
                    <div className="roi-result-item">
                      <span className="roi-label">Current Value</span>
                      <span className="roi-value">${property.price.toLocaleString()}</span>
                    </div>
                    <div className="roi-result-item">
                      <span className="roi-label">Annual Growth</span>
                      <span className="roi-value gold-text">{property.roi}%</span>
                    </div>
                    <div className="roi-result-item">
                      <span className="roi-label">Projected Value ({roiYears}yr)</span>
                      <span className="roi-value">${Math.round(futureValue).toLocaleString()}</span>
                    </div>
                    <div className="roi-result-item highlight">
                      <span className="roi-label">Total Gain</span>
                      <span className="roi-value" style={{ color: 'var(--success)' }}>
                        <TrendingUp size={14} /> +${Math.round(futureValue - property.price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Trust Score */}
            <div className="detail-section">
              <h3>Trust & Verification</h3>
              <div className="trust-panel glass-card">
                <div className="trust-score-big">
                  <div className="trust-circle" style={{ '--score': property.trustScore }}>
                    <span>{property.trustScore}</span>
                  </div>
                  <div>
                    <strong>Trust Score</strong>
                    <p>Based on agent ratings, transaction history, and verification status</p>
                  </div>
                </div>
                <div className="trust-items">
                  <div className="trust-item"><Shield size={14} /> Property Verified</div>
                  <div className="trust-item"><Star size={14} /> Agent Top-Rated</div>
                  <div className="trust-item"><Award size={14} /> Documents Checked</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="detail-sidebar">
            {/* Agent Card */}
            <div className="agent-card glass-card" id="agent-card">
              <img src={agent.photo} alt={agent.name} className="agent-photo" />
              <h4>{agent.name}</h4>
              <p className="agent-title-text">{agent.title}</p>
              <div className="agent-stats">
                <div><strong>{agent.experience}</strong><span>Years Exp</span></div>
                <div><strong>{agent.deals}</strong><span>Deals</span></div>
                <div><strong>{agent.rating}</strong><span>Rating</span></div>
              </div>
              <a href={`tel:${agent.phone}`} className="btn btn-primary" style={{ width: '100%' }}>
                <Phone size={14} /> Call Agent
              </a>
              <a href={`mailto:${agent.email}`} className="btn btn-secondary" style={{ width: '100%' }}>
                <Mail size={14} /> Email Agent
              </a>
            </div>

            {/* Inquiry Form */}
            <div className="inquiry-card glass-card" id="inquiry-form">
              <h4>Schedule a Tour</h4>
              <div className="input-group">
                <input type="text" placeholder="Your Name" className="input" />
              </div>
              <div className="input-group">
                <input type="email" placeholder="Email Address" className="input" />
              </div>
              <div className="input-group">
                <input type="tel" placeholder="Phone Number" className="input" />
              </div>
              <div className="input-group">
                <input type="date" className="input" />
              </div>
              <div className="input-group">
                <textarea className="input" placeholder="Message (optional)" rows="3" />
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={14} /> Request Tour
              </button>
            </div>

            {/* Demand Score */}
            <div className="demand-card glass-card">
              <h4>Market Demand</h4>
              <div className="demand-meter">
                <div className="demand-fill" style={{ width: `${property.demandScore}%` }} />
              </div>
              <div className="demand-info">
                <span className="demand-score-val">{property.demandScore}/100</span>
                <span className="demand-label">{property.demandScore > 90 ? 'Very High' : property.demandScore > 80 ? 'High' : 'Moderate'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="detail-section similar-section">
            <div className="section-header">
              <h2>Similar Properties</h2>
              <Link to="/properties" className="btn btn-secondary btn-small">View All <ArrowRight size={14} /></Link>
            </div>
            <div className="similar-grid">
              {similar.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
