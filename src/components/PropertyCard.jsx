import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square, TrendingUp, Star, Heart } from 'lucide-react'
import { useState } from 'react'
import formatINR from '../utils/formatINR'
import './PropertyCard.css'

export default function PropertyCard({ property, style }) {
  const [liked, setLiked] = useState(false)

  const formatPrice = (price) => formatINR(price, property.status === 'For Rent')

  return (
    <Link to={`/property/${property.id}`} className="property-card glass-card" style={style} id={`property-card-${property.id}`}>
      <div className="property-card-image">
        <img src={property.images[0]} alt={property.title} loading="lazy" />
        <div className="property-card-overlay">
          <span className={`property-status-badge ${property.status === 'For Rent' ? 'rent' : 'sale'}`}>
            {property.status}
          </span>
          <button
            className={`property-like-btn ${liked ? 'liked' : ''}`}
            onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
          >
            <Heart size={16} fill={liked ? 'var(--danger)' : 'none'} />
          </button>
        </div>
        {property.featured && <div className="featured-ribbon">Featured</div>}
      </div>

      <div className="property-card-body">
        <div className="property-card-price-row">
          <span className="property-card-price">{formatPrice(property.price)}</span>
          {property.roi && (
            <span className="property-roi badge-success badge">
              <TrendingUp size={10} /> {property.roi}% ROI
            </span>
          )}
        </div>

        <h3 className="property-card-title">{property.title}</h3>

        <div className="property-card-location">
          <MapPin size={13} />
          <span>{property.location}</span>
        </div>

        <div className="property-card-features">
          <div className="feature-item">
            <Bed size={14} />
            <span>{property.beds} Beds</span>
          </div>
          <div className="feature-item">
            <Bath size={14} />
            <span>{property.baths} Baths</span>
          </div>
          <div className="feature-item">
            <Square size={14} />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        <div className="property-card-footer">
          <div className="property-card-agent">
            <div className="agent-dot" />
            <span>{property.agent}</span>
          </div>
          {property.trustScore && (
            <div className="trust-score" data-tooltip="Trust Score">
              <Star size={11} fill="var(--gold)" color="var(--gold)" />
              <span>{property.trustScore}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
