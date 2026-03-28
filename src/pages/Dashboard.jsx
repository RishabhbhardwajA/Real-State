import { Link } from 'react-router-dom'
import { Building2, Heart, Calendar, FileText, TrendingUp, Bell, Eye, MapPin, ArrowRight, Clock, Star } from 'lucide-react'
import properties from '../data/properties.json'
import './Dashboard.css'

const savedProperties = properties.slice(0, 3)
const recentViews = properties.slice(3, 6)

const notifications = [
  { id: 1, text: 'Your tour for "The Ivory Grand Penthouse" has been confirmed for March 30.', time: '2 hours ago', type: 'success' },
  { id: 2, text: 'New price drop on "Oceanfront Villa Serenity" — now $8.5M.', time: '5 hours ago', type: 'info' },
  { id: 3, text: 'Document verification is pending for your recent application.', time: '1 day ago', type: 'warning' },
]

const upcomingTours = [
  { property: 'The Ivory Grand Penthouse', date: 'Mar 30, 2026', time: '2:00 PM', agent: 'Victoria Sterling' },
  { property: 'Skyline Tower Residence', date: 'Apr 2, 2026', time: '10:00 AM', agent: 'Victoria Sterling' },
]

export default function Dashboard() {
  return (
    <div className="page-enter dashboard-page">
      <section className="dashboard-hero">
        <div className="container">
          <div className="dashboard-welcome">
            <div>
              <h1>Welcome back, <span className="gold-text">John</span></h1>
              <p>Here's what's happening with your property journey.</p>
            </div>
            <Link to="/properties" className="btn btn-primary">
              <Building2 size={14} /> Browse Properties
            </Link>
          </div>
        </div>
      </section>

      <section className="container dashboard-content">
        {/* Quick Stats */}
        <div className="dash-stats-grid">
          {[
            { icon: Heart, label: 'Saved Properties', value: '3', color: 'var(--danger)' },
            { icon: Eye, label: 'Total Views', value: '47', color: 'var(--info)' },
            { icon: Calendar, label: 'Upcoming Tours', value: '2', color: 'var(--success)' },
            { icon: FileText, label: 'Documents', value: '5', color: 'var(--gold)' },
          ].map((stat, i) => (
            <div key={i} className="dash-stat-card glass-card">
              <div className="dash-stat-icon" style={{ color: stat.color, background: `${stat.color}15` }}>
                <stat.icon size={20} />
              </div>
              <div className="dash-stat-info">
                <span className="dash-stat-value">{stat.value}</span>
                <span className="dash-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="dash-grid">
          <div className="dash-main">
            {/* Notifications */}
            <div className="dash-section glass-card">
              <div className="dash-section-header">
                <h3><Bell size={16} /> Notifications</h3>
              </div>
              <div className="notif-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notif-item ${n.type}`}>
                    <div className="notif-dot" />
                    <div className="notif-content">
                      <p>{n.text}</p>
                      <span className="notif-time"><Clock size={10} /> {n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Properties */}
            <div className="dash-section glass-card">
              <div className="dash-section-header">
                <h3><Heart size={16} /> Saved Properties</h3>
                <Link to="/properties" className="btn btn-ghost btn-small">View All</Link>
              </div>
              <div className="dash-property-list">
                {savedProperties.map(p => (
                  <Link key={p.id} to={`/property/${p.id}`} className="dash-property-item">
                    <img src={p.images[0]} alt={p.title} />
                    <div className="dash-property-info">
                      <strong>{p.title}</strong>
                      <span><MapPin size={10} /> {p.location}</span>
                      <span className="dash-property-price">${p.price >= 1000000 ? `${(p.price / 1000000).toFixed(1)}M` : `${p.price.toLocaleString()}/mo`}</span>
                    </div>
                    {p.trustScore && <div className="dash-trust"><Star size={10} fill="var(--gold)" color="var(--gold)" /> {p.trustScore}</div>}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="dash-sidebar">
            {/* Upcoming Tours */}
            <div className="dash-section glass-card">
              <div className="dash-section-header">
                <h3><Calendar size={16} /> Upcoming Tours</h3>
              </div>
              <div className="tour-list">
                {upcomingTours.map((t, i) => (
                  <div key={i} className="tour-item">
                    <div className="tour-date-badge">
                      <span className="tour-day">{t.date.split(' ')[1].replace(',', '')}</span>
                      <span className="tour-month">{t.date.split(' ')[0]}</span>
                    </div>
                    <div className="tour-info">
                      <strong>{t.property}</strong>
                      <span>{t.time} · {t.agent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="dash-section glass-card">
              <div className="dash-section-header">
                <h3>Quick Links</h3>
              </div>
              <div className="quick-links">
                <Link to="/dashboard/documents" className="quick-link"><FileText size={16} /> My Documents <ArrowRight size={12} /></Link>
                <Link to="/calculator" className="quick-link"><TrendingUp size={16} /> EMI Calculator <ArrowRight size={12} /></Link>
                <Link to="/contact" className="quick-link"><Building2 size={16} /> Contact Agent <ArrowRight size={12} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
