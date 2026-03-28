import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Globe2 } from 'lucide-react'
import './Login.css'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPass, setShowPass] = useState(false)

  return (
    <div className="page-enter login-page">
      <div className="login-container">
        <div className="login-side">
          <div className="login-side-content">
            <Link to="/" className="navbar-brand">
              <div className="brand-icon"><Building2 size={24} /></div>
              <span className="brand-text">Prop<span className="gold-text">Ease</span></span>
            </Link>
            <h2>Welcome to the Future of <span className="gradient-text">Real Estate</span></h2>
            <p>Access your personalized dashboard, track your properties, manage documents, and more.</p>
            <div className="login-stats-mini">
              <div><strong>2,500+</strong><span>Listings</span></div>
              <div><strong>15K+</strong><span>Users</span></div>
              <div><strong>98%</strong><span>Satisfaction</span></div>
            </div>
          </div>
        </div>

        <div className="login-form-side">
          <div className="login-form-wrap">
            <div className="login-form-header">
              <h3>{isLogin ? 'Sign In' : 'Create Account'}</h3>
              <p>{isLogin ? 'Welcome back! Please enter your details.' : 'Join thousands of satisfied property seekers.'}</p>
            </div>

            <button className="google-btn">
              <Globe2 size={18} /> Continue with Google
            </button>

            <div className="divider"><span>or</span></div>

            <form className="login-form" id="login-form" onSubmit={e => e.preventDefault()}>
              {!isLogin && (
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" className="input" placeholder="John Doe" />
                </div>
              )}
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" className="input" placeholder="john@email.com" />
              </div>
              <div className="input-group">
                <label>Password</label>
                <div className="password-wrap">
                  <input type={showPass ? 'text' : 'password'} className="input" placeholder="••••••••" />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {isLogin && (
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
              )}
              <Link to="/dashboard" className="btn btn-primary btn-large" style={{ width: '100%' }}>
                {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={16} />
              </Link>
            </form>

            <p className="login-switch">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? ' Sign up' : ' Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
