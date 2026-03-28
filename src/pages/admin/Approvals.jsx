import { Check, X, Clock, Eye, MapPin } from 'lucide-react'
import properties from '../../data/properties.json'
import './Admin.css'

const pendingApprovals = properties.slice(0, 5).map((p, i) => ({
  ...p,
  submittedBy: ['Agent Victoria', 'Agent Marcus', 'Agent Sarah', 'Agent James', 'Agent Elena'][i],
  submittedDate: ['2026-03-27', '2026-03-26', '2026-03-25', '2026-03-24', '2026-03-23'][i],
  approvalStatus: i < 2 ? 'Pending' : i < 4 ? 'Under Review' : 'Needs Revision',
}))

export default function Approvals() {
  return (
    <div className="admin-page">
      <div className="admin-section-header">
        <h3>Property Approval Queue</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-warning"><Clock size={10} /> 2 Pending</span>
          <span className="badge badge-info"><Eye size={10} /> 2 Under Review</span>
          <span className="badge badge-danger"><X size={10} /> 1 Needs Revision</span>
        </div>
      </div>

      <div className="admin-table-card glass-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Submitted By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map(p => (
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
                  <td style={{ fontSize: 'var(--text-sm)' }}>{p.submittedBy}</td>
                  <td style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{p.submittedDate}</td>
                  <td>
                    <span className={`badge ${p.approvalStatus === 'Pending' ? 'badge-warning' : p.approvalStatus === 'Under Review' ? 'badge-info' : 'badge-danger'}`}>
                      {p.approvalStatus}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn btn-primary btn-small" style={{ padding: '6px 12px' }}>
                        <Check size={12} /> Approve
                      </button>
                      <button className="btn btn-secondary btn-small" style={{ padding: '6px 12px' }}>
                        <Eye size={12} /> Review
                      </button>
                      <button className="doc-action-btn danger"><X size={14} /></button>
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
