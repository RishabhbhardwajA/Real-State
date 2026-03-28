import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Building2, ChevronDown, User, LayoutDashboard } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/properties', label: 'Properties' },
  { path: '/calculator', label: 'EMI Calculator' },
  { path: '/about', label: 'About' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} id="main-navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand" id="navbar-brand">
          <div className="brand-icon">
            <Building2 size={24} />
          </div>
          <span className="brand-text">Prop<span className="gold-text">Ease</span></span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="navbar-links-mobile-extra">
            <Link to="/login" className="btn btn-secondary btn-small">Sign In</Link>
            <Link to="/admin" className="btn btn-ghost btn-small"><LayoutDashboard size={14} /> Admin</Link>
          </div>
        </div>

        <div className="navbar-actions">
          <Link to="/admin" className="btn btn-ghost btn-small" id="nav-admin-link">
            <LayoutDashboard size={14} /> Admin
          </Link>
          <Link to="/dashboard" className="btn btn-ghost btn-small" id="nav-dashboard-link">
            <User size={14} /> Dashboard
          </Link>
          <Link to="/login" className="btn btn-primary btn-small" id="nav-login-btn">
            Sign In
          </Link>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="navbar-toggle-btn"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}
    </nav>
  )
}
