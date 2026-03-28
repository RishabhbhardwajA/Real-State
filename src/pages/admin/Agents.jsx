import { Plus, Mail, Phone, Award, Star, TrendingUp, DollarSign } from 'lucide-react'
import agentsData from '../../data/agents.json'
import './Admin.css'

export default function Agents() {
  return (
    <div className="admin-page">
      <div className="admin-section-header">
        <h3>Manage Agents ({agentsData.length})</h3>
        <button className="btn btn-primary btn-small"><Plus size={14} /> Add Agent</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 'var(--space-md)' }}>
        {agentsData.map(agent => (
          <div key={agent.id} className="glass-card" style={{ padding: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
              <img src={agent.photo} alt={agent.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-gold)' }} />
              <div>
                <h4 style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)' }}>{agent.name}</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--gold)' }}>{agent.title}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{agent.region}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
              <div style={{ textAlign: 'center', padding: 'var(--space-sm)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--gold)' }}>{agent.deals}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Deals</div>
              </div>
              <div style={{ textAlign: 'center', padding: 'var(--space-sm)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--success)' }}>${(agent.totalSales / 1000000).toFixed(0)}M</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Sales</div>
              </div>
              <div style={{ textAlign: 'center', padding: 'var(--space-sm)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>⭐ {agent.rating}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Rating</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: 'var(--space-md)' }}>
              {agent.specializations.map(s => (
                <span key={s} className="badge badge-gold">{s}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={10} /> Commission: ${(agent.commission / 1000000).toFixed(1)}M</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={10} /> {agent.certifications.join(', ')}</span>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <a href={`mailto:${agent.email}`} className="btn btn-secondary btn-small" style={{ flex: 1 }}><Mail size={12} /> Email</a>
              <a href={`tel:${agent.phone}`} className="btn btn-primary btn-small" style={{ flex: 1 }}><Phone size={12} /> Call</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
