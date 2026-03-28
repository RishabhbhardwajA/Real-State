import { Link } from 'react-router-dom'
import { Building2, Users, Award, Globe, Target, Heart, Shield, Sparkles, ArrowRight } from 'lucide-react'
import agents from '../data/agents.json'
import './About.css'

const values = [
  { icon: Shield, title: 'Trust & Transparency', desc: 'Every property is verified, every agent is vetted. Our trust score system ensures complete transparency.' },
  { icon: Sparkles, title: 'Innovation First', desc: 'From 3D city navigation to AI-powered insights, we leverage cutting-edge technology to transform real estate.' },
  { icon: Heart, title: 'Client-Centric', desc: 'Your dream home journey is our priority. We provide 24/7 AI support and dedicated agent assistance.' },
  { icon: Target, title: 'Data-Driven', desc: 'Make informed decisions with ROI calculators, demand heatmaps, and market trend analysis.' },
]

export default function About() {
  return (
    <div className="page-enter about-page">
      <section className="about-hero">
        <div className="container">
          <div className="section-label"><Building2 size={12} /> Our Story</div>
          <h1>Redefining <span className="gradient-text">Real Estate</span></h1>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '650px' }}>
            PropEase was built with a single mission: to make buying, selling, and managing luxury properties as seamless as possible through technology and human expertise.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-mission-grid">
            <div className="about-mission-content">
              <h2>Our <span className="gold-text">Mission</span></h2>
              <p>We believe everyone deserves a world-class real estate experience. By combining artificial intelligence with deep market expertise, we've created a platform that empowers buyers, sellers, and agents alike.</p>
              <p>Since our founding, we've facilitated over ₹15,000 Crores in transactions across 45+ cities, helping more than 15,000 clients find their perfect property.</p>
              <div className="mission-stats">
                <div><strong>₹15K+ Cr</strong><span>Total Transactions</span></div>
                <div><strong>15K+</strong><span>Happy Clients</span></div>
                <div><strong>45+</strong><span>Cities</span></div>
              </div>
            </div>
            <div className="about-mission-visual">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600" alt="Modern building" />
              <div className="visual-overlay-badge">
                <Award size={20} />
                <span>Award-Winning Platform</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header center">
            <div className="section-label"><Heart size={12} /> What We Stand For</div>
            <h2>Our Core Values</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="value-icon"><v.icon size={24} /></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header center">
            <div className="section-label"><Users size={12} /> Our Team</div>
            <h2>Meet Our Top Agents</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Industry leaders with decades of combined experience in luxury real estate.
            </p>
          </div>
          <div className="agents-grid">
            {agents.map(agent => (
              <div key={agent.id} className="agent-about-card glass-card">
                <img src={agent.photo} alt={agent.name} />
                <h4>{agent.name}</h4>
                <p className="agent-about-title">{agent.title}</p>
                <div className="agent-about-stats">
                  <span>{agent.experience} yrs</span>
                  <span>{agent.deals} deals</span>
                  <span>⭐ {agent.rating}</span>
                </div>
                <p className="agent-about-bio">{agent.bio.substring(0, 120)}...</p>
                <div className="agent-about-specs">
                  {agent.specializations.slice(0, 2).map(s => (
                    <span key={s} className="badge badge-gold">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Ready to Work <span className="gradient-text">With Us?</span></h2>
              <p>Whether you're buying your first home or managing a portfolio, PropEase has you covered.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">Get In Touch <ArrowRight size={16} /></Link>
                <Link to="/properties" className="btn btn-secondary btn-large">Browse Properties</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
