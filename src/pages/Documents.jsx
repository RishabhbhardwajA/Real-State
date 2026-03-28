import { useState } from 'react'
import { FileText, Upload, Check, Clock, AlertTriangle, Download, Eye, Trash2, Plus, File, Image } from 'lucide-react'
import './Documents.css'

const mockDocs = [
  { id: 1, name: 'Identity Proof - Passport', type: 'PDF', size: '2.4 MB', status: 'Verified', date: '2026-03-20', icon: FileText },
  { id: 2, name: 'Income Verification Letter', type: 'PDF', size: '1.1 MB', status: 'Verified', date: '2026-03-18', icon: FileText },
  { id: 3, name: 'Bank Statement - March 2026', type: 'PDF', size: '3.2 MB', status: 'Pending', date: '2026-03-25', icon: File },
  { id: 4, name: 'Property Insurance Quote', type: 'PDF', size: '890 KB', status: 'Pending', date: '2026-03-27', icon: FileText },
  { id: 5, name: 'Pre-Approval Letter', type: 'PDF', size: '560 KB', status: 'Rejected', date: '2026-03-15', icon: File },
  { id: 6, name: 'Property Photos - Inspection', type: 'ZIP', size: '15.8 MB', status: 'Verified', date: '2026-03-22', icon: Image },
]

const statusConfig = {
  Verified: { color: 'var(--success)', icon: Check, bg: 'var(--success-bg)' },
  Pending: { color: 'var(--warning)', icon: Clock, bg: 'var(--warning-bg)' },
  Rejected: { color: 'var(--danger)', icon: AlertTriangle, bg: 'var(--danger-bg)' },
}

export default function Documents() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? mockDocs : mockDocs.filter(d => d.status === filter)

  return (
    <div className="page-enter documents-page">
      <section className="documents-hero">
        <div className="container">
          <div className="documents-header">
            <div>
              <h1>My <span className="gradient-text">Documents</span></h1>
              <p>Upload, track, and manage your property documents securely.</p>
            </div>
            <button className="btn btn-primary"><Upload size={14} /> Upload Document</button>
          </div>
        </div>
      </section>

      <section className="container documents-content">
        <div className="doc-stats-row">
          {['All', 'Verified', 'Pending', 'Rejected'].map(s => {
            const count = s === 'All' ? mockDocs.length : mockDocs.filter(d => d.status === s).length
            return (
              <button key={s} className={`doc-filter-btn ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
                {s} <span className="doc-count">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="doc-table glass-card">
          <div className="doc-table-header">
            <span>Document</span>
            <span>Size</span>
            <span>Status</span>
            <span>Date</span>
            <span>Actions</span>
          </div>
          {filtered.map(doc => {
            const status = statusConfig[doc.status]
            const StatusIcon = status.icon
            return (
              <div key={doc.id} className="doc-row">
                <div className="doc-name">
                  <div className="doc-icon"><doc.icon size={16} /></div>
                  <div>
                    <strong>{doc.name}</strong>
                    <span>{doc.type}</span>
                  </div>
                </div>
                <span className="doc-size">{doc.size}</span>
                <span className="doc-status" style={{ color: status.color, background: status.bg }}>
                  <StatusIcon size={12} /> {doc.status}
                </span>
                <span className="doc-date">{doc.date}</span>
                <div className="doc-actions">
                  <button className="doc-action-btn" title="View"><Eye size={14} /></button>
                  <button className="doc-action-btn" title="Download"><Download size={14} /></button>
                  <button className="doc-action-btn danger" title="Delete"><Trash2 size={14} /></button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Upload Area */}
        <div className="upload-zone glass-card">
          <div className="upload-zone-content">
            <Plus size={32} />
            <h4>Drag & Drop files here</h4>
            <p>or click to browse. Supports PDF, JPG, PNG, ZIP (Max 25MB)</p>
            <button className="btn btn-secondary btn-small">Browse Files</button>
          </div>
        </div>
      </section>
    </div>
  )
}
