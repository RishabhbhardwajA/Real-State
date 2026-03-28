import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, Sparkles, Crown, Building2, ArrowRight, Zap } from 'lucide-react'
import './Pricing.css'

const plans = [
  {
    name: 'Starter',
    icon: Building2,
    price: { monthly: 49, annual: 39 },
    desc: 'Perfect for individual agents getting started.',
    features: [
      { text: 'Up to 25 listings', included: true },
      { text: 'Basic CRM', included: true },
      { text: 'Lead management', included: true },
      { text: 'Email support', included: true },
      { text: 'AI Chatbot', included: false },
      { text: 'ROI Calculator', included: false },
      { text: 'Marketing tools', included: false },
      { text: 'Custom branding', included: false },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    icon: Zap,
    price: { monthly: 129, annual: 99 },
    desc: 'For growing teams with advanced needs.',
    features: [
      { text: 'Up to 200 listings', included: true },
      { text: 'Advanced CRM + Pipeline', included: true },
      { text: 'Lead scoring & automation', included: true },
      { text: 'Priority support', included: true },
      { text: 'AI Chatbot', included: true },
      { text: 'ROI Calculator', included: true },
      { text: 'Marketing tools', included: false },
      { text: 'Custom branding', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: { monthly: 349, annual: 279 },
    desc: 'Full-featured for large agencies & brokerages.',
    features: [
      { text: 'Unlimited listings', included: true },
      { text: 'Full CRM + Pipeline + Reports', included: true },
      { text: 'AI-powered everything', included: true },
      { text: '24/7 dedicated support', included: true },
      { text: 'AI Chatbot + Custom Training', included: true },
      { text: 'ROI + Market Analytics', included: true },
      { text: 'Marketing campaign manager', included: true },
      { text: 'White-label custom branding', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="page-enter pricing-page">
      <section className="pricing-hero">
        <div className="container">
          <div className="section-label"><Crown size={12} /> Simple Pricing</div>
          <h1>Choose Your <span className="gradient-text">Plan</span></h1>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Start free. Scale as you grow. No hidden fees, ever.
          </p>

          <div className="billing-toggle" id="billing-toggle">
            <span className={!annual ? 'active' : ''}>Monthly</span>
            <button className={`toggle-switch ${annual ? 'on' : ''}`} onClick={() => setAnnual(!annual)}>
              <div className="toggle-thumb" />
            </button>
            <span className={annual ? 'active' : ''}>Annual <span className="save-badge">Save 20%</span></span>
          </div>
        </div>
      </section>

      <section className="container pricing-cards-section">
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div key={i} className={`pricing-card glass-card ${plan.popular ? 'popular' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
              {plan.popular && <div className="popular-tag"><Sparkles size={12} /> Most Popular</div>}
              <div className="pricing-card-header">
                <div className="pricing-icon"><plan.icon size={24} /></div>
                <h3>{plan.name}</h3>
                <p>{plan.desc}</p>
              </div>
              <div className="pricing-price">
                <span className="price-amount">${annual ? plan.price.annual : plan.price.monthly}</span>
                <span className="price-period">/month</span>
              </div>
              <ul className="pricing-features">
                {plan.features.map((f, j) => (
                  <li key={j} className={f.included ? 'included' : 'not-included'}>
                    {f.included ? <Check size={14} /> : <X size={14} />}
                    {f.text}
                  </li>
                ))}
              </ul>
              <Link to="/login" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-large`} style={{ width: '100%' }}>
                {plan.cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
