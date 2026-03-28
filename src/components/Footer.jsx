import { Link } from 'react-router-dom'
import { Building2, Mail, Phone, MapPin, ArrowUpRight, Camera, MessageCircle, Briefcase, Play } from 'lucide-react'
import './Footer.css'

const footerLinks = {
  'Properties': [
    { label: 'Luxury Homes', to: '/properties' },
    { label: 'Penthouses', to: '/properties' },
    { label: 'Waterfront', to: '/properties' },
    { label: 'New Developments', to: '/properties' },
  ],
  'Company': [
    { label: 'About Us', to: '/about' },
    { label: 'Our Agents', to: '/about' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Contact', to: '/contact' },
  ],
  'Resources': [
    { label: 'EMI Calculator', to: '/calculator' },
    { label: 'Market Reports', to: '/admin/reports' },
    { label: 'Investment Guide', to: '/about' },
    { label: 'FAQ', to: '/about' },
  ],
}

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="navbar-brand">
              <div className="brand-icon">
                <Building2 size={24} />
              </div>
              <span className="brand-text">Prop<span className="gold-text">Ease</span></span>
            </Link>
            <p className="footer-tagline">
              Redefining luxury real estate with AI-powered insights, immersive experiences, and seamless transactions.
            </p>
            <div className="footer-contact-list">
              <a href="mailto:hello@propease.com" className="footer-contact-item">
                <Mail size={14} /> hello@propease.com
              </a>
              <a href="tel:+12125550100" className="footer-contact-item">
                <Phone size={14} /> +1 (212) 555-0100
              </a>
              <span className="footer-contact-item">
                <MapPin size={14} /> 432 Park Ave, New York, NY
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-column">
              <h4 className="footer-column-title">{title}</h4>
              <ul className="footer-column-list">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer-link">
                      {link.label} <ArrowUpRight size={12} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} PropEase. All rights reserved.</p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Instagram"><Camera size={18} /></a>
            <a href="#" className="social-link" aria-label="Twitter"><MessageCircle size={18} /></a>
            <a href="#" className="social-link" aria-label="LinkedIn"><Briefcase size={18} /></a>
            <a href="#" className="social-link" aria-label="YouTube"><Play size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
