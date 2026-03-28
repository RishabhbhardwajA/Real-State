import { useState } from 'react'
import { Plus, Play, Pause, Eye, MousePointer, Target, Calendar, Mail, Share2, Megaphone } from 'lucide-react'
import './Admin.css'

const campaigns = [
  { id: 1, name: 'Spring Luxury Collection', type: 'Email', status: 'Active', sent: 2450, opened: 1820, clicks: 478, conversions: 32, budget: '$5,000', startDate: '2026-03-01' },
  { id: 2, name: 'Manhattan Penthouse Spotlight', type: 'Social', status: 'Active', sent: 15200, opened: 8900, clicks: 2100, conversions: 89, budget: '$3,200', startDate: '2026-03-10' },
  { id: 3, name: 'First-Time Buyer Guide', type: 'Email', status: 'Paused', sent: 1800, opened: 1200, clicks: 340, conversions: 18, budget: '$2,000', startDate: '2026-02-15' },
  { id: 4, name: 'Investment Property Webinar', type: 'Event', status: 'Scheduled', sent: 0, opened: 0, clicks: 0, conversions: 0, budget: '$4,500', startDate: '2026-04-05' },
  { id: 5, name: 'Malibu Villa Launch', type: 'Social', status: 'Completed', sent: 22000, opened: 14500, clicks: 3200, conversions: 156, budget: '$8,000', startDate: '2026-02-01' },
]

const statusColors = { Active: 'badge-success', Paused: 'badge-warning', Scheduled: 'badge-info', Completed: 'badge-gold' }

export default function Marketing() {
  return (
    <div className="admin-page">
      <div className="admin-section-header">
        <h3>Marketing Campaigns</h3>
        <button className="btn btn-primary btn-small"><Plus size={14} /> New Campaign</button>
      </div>

      {/* Campaign Stats */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-xl)' }}>
        {[
          { icon: Megaphone, label: 'Active Campaigns', value: '2' },
          { icon: Eye, label: 'Total Reach', value: '41.4K' },
          { icon: MousePointer, label: 'Total Clicks', value: '6.1K' },
          { icon: Target, label: 'Conversions', value: '295' },
        ].map((s, i) => (
          <div key={i} className="kpi-card glass-card">
            <div className="kpi-icon-wrap"><s.icon size={20} /></div>
            <div className="kpi-info">
              <span className="kpi-label">{s.label}</span>
              <span className="kpi-value">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="admin-table-card glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Type</th>
              <th>Status</th>
              <th>Reach</th>
              <th>Clicks</th>
              <th>Conversions</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => (
              <tr key={c.id}>
                <td>
                  <div>
                    <strong style={{ display: 'block', fontSize: 'var(--text-sm)' }}>{c.name}</strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}><Calendar size={10} /> Started {c.startDate}</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-gold">
                    {c.type === 'Email' ? <Mail size={10} /> : c.type === 'Social' ? <Share2 size={10} /> : <Megaphone size={10} />}
                    {c.type}
                  </span>
                </td>
                <td><span className={`badge ${statusColors[c.status]}`}>{c.status}</span></td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{c.sent > 0 ? c.sent.toLocaleString() : '—'}</td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{c.clicks > 0 ? c.clicks.toLocaleString() : '—'}</td>
                <td style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--success)' }}>{c.conversions > 0 ? c.conversions : '—'}</td>
                <td style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{c.budget}</td>
                <td>
                  <div className="doc-actions">
                    <button className="doc-action-btn">
                      {c.status === 'Active' ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button className="doc-action-btn"><Eye size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
