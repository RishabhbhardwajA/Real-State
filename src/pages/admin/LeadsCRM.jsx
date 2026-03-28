import { useState } from 'react'
import { Plus, Phone, Mail, Star } from 'lucide-react'
import leads from '../../data/leads.json'
import './Admin.css'

const stages = [
  { key: 'New', color: '#3b82f6', leads: leads.filter(l => l.status === 'New') },
  { key: 'Contacted', color: '#d4a853', leads: leads.filter(l => l.status === 'Contacted') },
  { key: 'Qualified', color: '#8b5cf6', leads: leads.filter(l => l.status === 'Qualified') },
  { key: 'Tour Scheduled', color: '#22c55e', leads: leads.filter(l => l.status === 'Tour Scheduled') },
  { key: 'Negotiating', color: '#f59e0b', leads: leads.filter(l => l.status === 'Negotiating') },
  { key: 'Won', color: '#10b981', leads: leads.filter(l => l.status === 'Won') },
  { key: 'Lost', color: '#ef4444', leads: leads.filter(l => l.status === 'Lost') },
]

export default function LeadsCRM() {
  return (
    <div className="admin-page">
      <div className="admin-section-header">
        <h3>Lead Pipeline ({leads.length} leads)</h3>
        <button className="btn btn-primary btn-small"><Plus size={14} /> Add Lead</button>
      </div>

      <div className="pipeline-board">
        {stages.map(stage => (
          <div key={stage.key} className="pipeline-column">
            <div className="pipeline-column-header">
              <h4><span className="pipeline-dot" style={{ background: stage.color }} /> {stage.key}</h4>
              <span className="pipeline-count">{stage.leads.length}</span>
            </div>
            <div className="pipeline-cards">
              {stage.leads.map(lead => (
                <div key={lead.id} className="pipeline-card">
                  <span className="pipeline-card-name">{lead.name}</span>
                  <span className="pipeline-card-detail">{lead.interest}</span>
                  <span className="pipeline-card-detail" style={{ display: 'flex', gap: '8px' }}>
                    <Phone size={10} /> {lead.source}
                  </span>
                  <div className="pipeline-card-footer">
                    <span className="pipeline-card-budget">{lead.budget}</span>
                    <span className="pipeline-card-score" style={{
                      background: lead.score >= 90 ? 'var(--success-bg)' : lead.score >= 70 ? 'var(--warning-bg)' : 'var(--danger-bg)',
                      color: lead.score >= 90 ? 'var(--success)' : lead.score >= 70 ? 'var(--warning)' : 'var(--danger)',
                    }}>Score: {lead.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
