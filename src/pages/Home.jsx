import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, ArrowRight, Building2, Users, TrendingUp, Shield,
  Star, Play, Sparkles, Globe, Award, Handshake, Key
} from 'lucide-react'
import { ScrollReveal } from '../hooks/useScrollReveal'
import PropertyCard from '../components/PropertyCard'
import properties from '../data/properties.json'
import testimonials from '../data/testimonials.json'
import buildingTall from '../assets/images/building-tall.png'
import buildingMed from '../assets/images/building-medium.png'
import buildingSmall from '../assets/images/building-small.png'
import handshakeImg from '../assets/images/handshake.png'
import cityImg from '../assets/images/3d-city.png'
import './Home.css'

const stats = [
  { icon: Building2, value: '2,500+', label: 'Premium Listings' },
  { icon: Users, value: '15,000+', label: 'Happy Clients' },
  { icon: TrendingUp, value: '$2.1B', label: 'In Transactions' },
  { icon: Globe, value: '45+', label: 'Cities Covered' },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const featured = properties.filter(p => p.featured).slice(0, 4)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="page-enter home-page">

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero" id="hero-section">
        {/* Stars */}
        <div className="hero-stars">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="star" style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              width: `${1 + Math.random() * 2}px`, height: `${1 + Math.random() * 2}px`,
            }} />
          ))}
        </div>
        {/* Gold particles */}
        <div className="hero-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="gold-particle" style={{
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }} />
          ))}
        </div>

        <div className="container hero-grid">
          {/* Left: text */}
          <div className="hero-text" style={{ transform: `translateY(${scrollY * -0.08}px)` }}>
            <div className="section-label shimmer-label">
              <Sparkles size={12} /> AI-Powered Real Estate Platform
            </div>
            <h1 className="hero-title">
              Discover Your <br />
              <span className="gradient-text">Dream Property</span>
            </h1>
            <p className="hero-subtitle">
              Experience the future of real estate with 3D city exploration, AI-powered insights,
              and seamless transactions across 45+ premium markets.
            </p>
            <div className="hero-search" id="hero-search">
              <div className="search-icon"><Search size={18} /></div>
              <input type="text" placeholder="Search city, neighborhood, or property..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="search-input" id="hero-search-input" />
              <Link to={`/properties${searchQuery ? `?q=${searchQuery}` : ''}`} className="btn btn-primary">
                Search <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-tags">
              <span>Popular:</span>
              {['Manhattan Penthouse', 'Malibu Villa', 'Miami Waterfront'].map(tag => (
                <Link key={tag} to={`/properties?q=${tag}`} className="hero-tag">{tag}</Link>
              ))}
            </div>
          </div>

          {/* Right: 3 Buildings — small, medium, tall (left to right) */}
          <div className="hero-buildings" style={{ transform: `translateY(${scrollY * -0.04}px)` }}>
            <img src={buildingSmall} alt="Small Building" className="hb hb-small" />
            <img src={buildingMed} alt="Medium Building" className="hb hb-medium" />
            <img src={buildingTall} alt="Tall Building" className="hb hb-tall" />
            <div className="hb-ground-glow" />
          </div>
        </div>

        {/* City panorama + cars */}
        <div className="hero-city" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
          <img src={cityImg} alt="3D City" className="city-panorama" />
          <div className="city-fade" />
          <div className="road-cars">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className={`car car-${n} ${n > 3 ? 'going-left' : ''}`}>
                <div className="car-body" /><div className="headlight" /><div className="taillight" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="stats-bar" id="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} animation="flipUp" delay={i * 0.1}>
                <div className="stat-item">
                  <div className="stat-icon-wrap"><stat.icon size={22} /></div>
                  <div>
                    <div className="stat-number">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED ═══════════ */}
      <section className="section" id="featured-section">
        <div className="container">
          <ScrollReveal animation="fadeUp">
            <div className="section-header">
              <div>
                <div className="section-label"><Award size={12} /> Handpicked For You</div>
                <h2 className="section-title">Featured Properties</h2>
                <p className="section-subtitle">
                  Explore our curated selection of premium properties, each verified and rated by our expert team.
                </p>
              </div>
              <Link to="/properties" className="btn btn-secondary">View All <ArrowRight size={14} /></Link>
            </div>
          </ScrollReveal>
          <div className="featured-grid">
            {featured.map((prop, i) => (
              <ScrollReveal key={prop.id} animation={i % 2 === 0 ? 'flyInLeft' : 'flyInRight'} delay={i * 0.08}>
                <PropertyCard property={prop} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HANDSHAKE ═══════════ */}
      <section className="section handshake-section" id="handshake-section">
        <div className="container">
          <div className="handshake-layout">
            <ScrollReveal animation="flyInLeft">
              <div className="handshake-text">
                <div className="section-label"><Handshake size={12} /> Trusted Partnerships</div>
                <h2 className="section-title">Where Deals <span className="gradient-text">Come Alive</span></h2>
                <p className="section-subtitle">
                  Every transaction is a partnership. Our platform connects verified dealers with genuine
                  customers for seamless, trust-verified real estate deals.
                </p>
                <div className="hs-stats-row">
                  <div className="hs-stat-box"><strong>98%</strong><span>Deal Success</span></div>
                  <div className="hs-stat-box"><strong>24h</strong><span>Response Time</span></div>
                  <div className="hs-stat-box"><strong>4.9★</strong><span>Trust Rating</span></div>
                </div>
                <Link to="/contact" className="btn btn-primary btn-large">
                  Start Your Deal <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="zoomIn" delay={0.15}>
              <div className="handshake-visual">
                <img src={handshakeImg} alt="Dealer Customer Handshake" className="handshake-img" />
                <div className="handshake-glow" />
                <div className="deal-badge"><Key size={14} /> DEAL DONE</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="section how-it-works" id="how-it-works">
        <div className="container">
          <ScrollReveal animation="fadeUp">
            <div className="section-header center">
              <div className="section-label"><Sparkles size={12} /> Seamless Experience</div>
              <h2 className="section-title">How PropEase Works</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                From discovery to keys-in-hand, our platform guides you through every step.
              </p>
            </div>
          </ScrollReveal>
          <div className="steps-grid">
            {[
              { num: '01', title: 'Explore & Discover', desc: 'Browse our 3D city map, use AI-powered search, and filter properties by your exact criteria.', icon: Search },
              { num: '02', title: 'Schedule & Tour', desc: 'Book virtual or in-person tours with verified agents. View 360° galleries and get AI insights.', icon: Play },
              { num: '03', title: 'Analyze & Compare', desc: 'Use ROI calculators, demand heatmaps, and trust scores for data-driven decisions.', icon: TrendingUp },
              { num: '04', title: 'Close & Move In', desc: 'Complete document verification, e-signatures, and manage your transaction on one platform.', icon: Shield },
            ].map((step, i) => (
              <ScrollReveal key={i} animation="buildingRise" delay={i * 0.1}>
                <div className="step-card glass-card">
                  <div className="step-num">{step.num}</div>
                  <div className="step-icon"><step.icon size={24} /></div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="section testimonials-section" id="testimonials-section">
        <div className="container">
          <ScrollReveal animation="fadeUp">
            <div className="section-header center">
              <div className="section-label"><Star size={12} /> Client Stories</div>
              <h2 className="section-title">What Our Clients Say</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="zoomIn" delay={0.1}>
            <div className="testimonial-carousel">
              {testimonials.map((t, i) => (
                <div key={t.id} className={`testimonial-card glass-card ${i === currentTestimonial ? 'active' : ''}`}>
                  <div className="testimonial-stars">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} fill="var(--gold)" color="var(--gold)" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                    <div><strong>{t.name}</strong><span>{t.role}</span></div>
                  </div>
                </div>
              ))}
              <div className="testimonial-dots">
                {testimonials.map((_, i) => (
                  <button key={i} className={`dot ${i === currentTestimonial ? 'active' : ''}`}
                    onClick={() => setCurrentTestimonial(i)} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="cta-section" id="cta-section">
        <div className="container">
          <ScrollReveal animation="flipUp">
            <div className="cta-card">
              <div className="cta-left">
                <h2>Ready to Find Your <span className="gradient-text">Dream Home?</span></h2>
                <p>Join 15,000+ satisfied clients who found their perfect property through PropEase.</p>
                <div className="cta-buttons">
                  <Link to="/properties" className="btn btn-primary btn-large">Explore Properties <ArrowRight size={16} /></Link>
                  <Link to="/contact" className="btn btn-secondary btn-large">Talk to an Agent</Link>
                </div>
              </div>
              <div className="cta-right">
                <img src={buildingTall} alt="3D Building" className="cta-building" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
