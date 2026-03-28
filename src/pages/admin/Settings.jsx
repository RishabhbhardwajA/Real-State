import { useState } from 'react'
import { Building2, User, Bell, Shield, Palette, Globe, CreditCard, Database, Save } from 'lucide-react'
import './Admin.css'

const settingsTabs = [
  { id: 'general', icon: Building2, label: 'General' },
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'branding', icon: Palette, label: 'Branding' },
  { id: 'billing', icon: CreditCard, label: 'Billing' },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div className="admin-page">
      <div className="admin-section-header">
        <h3>Settings</h3>
        <button className="btn btn-primary btn-small"><Save size={14} /> Save Changes</button>
      </div>

      <div className="settings-grid">
        <div className="settings-nav">
          {settingsTabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="glass-card settings-section">
              <h4>Agency Information</h4>
              <div className="settings-row">
                <div className="input-group">
                  <label>Agency Name</label>
                  <input type="text" className="input" defaultValue="PropEase Realty Group" />
                </div>
                <div className="input-group">
                  <label>Website</label>
                  <input type="url" className="input" defaultValue="https://propease.com" />
                </div>
              </div>
              <div className="settings-row">
                <div className="input-group">
                  <label>Phone</label>
                  <input type="tel" className="input" defaultValue="+1 (212) 555-0100" />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" className="input" defaultValue="hello@propease.com" />
                </div>
              </div>
              <div className="input-group" style={{ marginBottom: 'var(--space-md)' }}>
                <label>Address</label>
                <input type="text" className="input" defaultValue="432 Park Avenue, New York, NY 10022" />
              </div>
              <div className="input-group">
                <label>Agency Description</label>
                <textarea className="input" rows="3" defaultValue="Premium real estate agency specializing in luxury properties across the nation's most desirable markets." />
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="glass-card settings-section">
              <h4>Admin Profile</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-2xl)', fontWeight: 700 }}>A</div>
                <div>
                  <strong style={{ display: 'block' }}>Admin User</strong>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Super Admin</span>
                </div>
                <button className="btn btn-secondary btn-small" style={{ marginLeft: 'auto' }}>Change Photo</button>
              </div>
              <div className="settings-row">
                <div className="input-group"><label>First Name</label><input type="text" className="input" defaultValue="Admin" /></div>
                <div className="input-group"><label>Last Name</label><input type="text" className="input" defaultValue="User" /></div>
              </div>
              <div className="settings-row">
                <div className="input-group"><label>Email</label><input type="email" className="input" defaultValue="admin@propease.com" /></div>
                <div className="input-group"><label>Phone</label><input type="tel" className="input" defaultValue="+1 (212) 555-0001" /></div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-card settings-section">
              <h4>Notification Preferences</h4>
              {['New lead notifications', 'Property approval requests', 'Tour schedule updates', 'Weekly performance reports', 'System maintenance alerts', 'Marketing campaign results'].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-md) 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 'var(--text-sm)' }}>{item}</span>
                  <button className="toggle-switch on" style={{ width: 44, height: 24 }}>
                    <div className="toggle-thumb" style={{ width: 18, height: 18 }} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="glass-card settings-section">
              <h4>Security Settings</h4>
              <div className="input-group" style={{ marginBottom: 'var(--space-md)' }}>
                <label>Current Password</label>
                <input type="password" className="input" placeholder="••••••••" />
              </div>
              <div className="settings-row">
                <div className="input-group"><label>New Password</label><input type="password" className="input" placeholder="••••••••" /></div>
                <div className="input-group"><label>Confirm Password</label><input type="password" className="input" placeholder="••••••••" /></div>
              </div>
              <div style={{ padding: 'var(--space-lg)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: 'var(--text-sm)' }}>Two-Factor Authentication</strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Add an extra layer of security</span>
                  </div>
                  <button className="btn btn-secondary btn-small">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="glass-card settings-section">
              <h4>Brand Customization</h4>
              <div className="settings-row">
                <div className="input-group">
                  <label>Primary Color</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input type="color" defaultValue="#d4a853" style={{ width: 40, height: 40, border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} />
                    <input type="text" className="input" defaultValue="#d4a853" style={{ flex: 1 }} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Background Color</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input type="color" defaultValue="#0a0a0f" style={{ width: 40, height: 40, border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} />
                    <input type="text" className="input" defaultValue="#0a0a0f" style={{ flex: 1 }} />
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label>Logo Upload</label>
                <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                  Click or drag to upload logo (PNG, SVG)
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="glass-card settings-section">
              <h4>Billing & Subscription</h4>
              <div style={{ padding: 'var(--space-lg)', background: 'linear-gradient(135deg, rgba(212,168,83,0.1), rgba(212,168,83,0.03))', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="badge badge-gold" style={{ marginBottom: '8px', display: 'inline-block' }}>Enterprise Plan</span>
                    <div style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>$279<span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>/month</span></div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Billed annually · Next billing: Apr 1, 2026</span>
                  </div>
                  <button className="btn btn-secondary btn-small">Change Plan</button>
                </div>
              </div>
              <div className="settings-row">
                <div className="input-group"><label>Card Number</label><input type="text" className="input" defaultValue="•••• •••• •••• 4242" disabled /></div>
                <div className="input-group"><label>Expiry</label><input type="text" className="input" defaultValue="12/28" disabled /></div>
              </div>
              <button className="btn btn-secondary btn-small">Update Payment Method</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
