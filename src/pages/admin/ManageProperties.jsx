import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye, MapPin } from 'lucide-react'
import properties from '../../data/properties.json'
import './Admin.css'

export default function ManageProperties() {
  const [search, setSearch] = useState('')
  const filtered = properties.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="admin-page">
      <div className="admin-section-header">
        <h3>Manage Properties ({properties.length})</h3>
        <button className="btn btn-primary btn-small"><Plus size={14} /> Add Property</button>
      </div>

      <div className="admin-table-card glass-card">
        <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--border)' }}>
          <div className="properties-search-wrap" style={{ maxWidth: '400px' }}>
            <Search size={16} />
            <input type="text" placeholder="Search properties..." value={search} onChange={e => setSearch(e.target.value)}
              className="properties-search-input" />
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Status</th>
                <th>Price</th>
                <th>Agent</th>
                <th>Demand</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="cell-main">
                      <img src={p.images[0]} alt={p.title} />
                      <div>
                        <strong>{p.title}</strong>
                        <span><MapPin size={10} /> {p.location}</span>
                      </div>
                    </div>
                  </td>
                  <td>{p.type}</td>
                  <td><span className={`badge ${p.status === 'For Sale' ? 'badge-gold' : 'badge-info'}`}>{p.status}</span></td>
                  <td style={{ fontWeight: 600 }}>${p.price >= 1000000 ? `${(p.price / 1000000).toFixed(1)}M` : p.price.toLocaleString()}</td>
                  <td>{p.agent}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: 4, background: 'var(--bg-elevated)', borderRadius: 2 }}>
                        <div style={{ width: `${p.demandScore}%`, height: '100%', borderRadius: 2, background: p.demandScore > 90 ? 'var(--danger)' : 'var(--gold)' }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600 }}>{p.demandScore}</span>
                    </div>
                  </td>
                  <td>
                    <div className="doc-actions">
                      <button className="doc-action-btn"><Eye size={14} /></button>
                      <button className="doc-action-btn"><Edit size={14} /></button>
                      <button className="doc-action-btn danger"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
