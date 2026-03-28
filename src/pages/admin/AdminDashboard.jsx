import { Building2, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Eye, Clock, Target, Layers } from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import properties from '../../data/properties.json'
import leads from '../../data/leads.json'
import agents from '../../data/agents.json'
import './Admin.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler)

const kpis = [
  { label: 'Total Revenue', value: '$4.2M', change: '+12.5%', up: true, icon: DollarSign },
  { label: 'Active Listings', value: properties.length.toString(), change: '+3', up: true, icon: Building2 },
  { label: 'Total Leads', value: leads.length.toString(), change: '+8', up: true, icon: Users },
  { label: 'Conversion Rate', value: '24%', change: '-2.1%', up: false, icon: Target },
]

const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Revenue',
    data: [280, 320, 410, 380, 520, 490, 620, 580, 710, 650, 780, 850],
    borderColor: '#d4a853',
    backgroundColor: 'rgba(212, 168, 83, 0.1)',
    tension: 0.4,
    fill: true,
    pointBackgroundColor: '#d4a853',
    pointRadius: 3,
  }]
}

const leadsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'New Leads',
    data: [12, 19, 8, 15, 22, 14, 9],
    backgroundColor: 'rgba(212, 168, 83, 0.6)',
    borderRadius: 6,
  }]
}

const chartOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6a6a7a', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6a6a7a', font: { size: 11 } } },
  },
}

export default function AdminDashboard() {
  const recentLeads = leads.slice(0, 5)

  return (
    <div className="admin-page">
      {/* KPIs */}
      <div className="kpi-grid">
        {kpis.map((kpi, i) => (
          <div key={i} className="kpi-card glass-card">
            <div className="kpi-icon-wrap"><kpi.icon size={20} /></div>
            <div className="kpi-info">
              <span className="kpi-label">{kpi.label}</span>
              <span className="kpi-value">{kpi.value}</span>
              <span className={`kpi-change ${kpi.up ? 'up' : 'down'}`}>
                {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card glass-card">
          <h4>Revenue Overview</h4>
          <div className="chart-container"><Line data={revenueData} options={chartOpts} /></div>
        </div>
        <div className="chart-card glass-card">
          <h4>Weekly Leads</h4>
          <div className="chart-container"><Bar data={leadsData} options={chartOpts} /></div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-tables-grid">
        <div className="admin-table-card glass-card">
          <div className="admin-table-header">
            <h4>Recent Leads</h4>
            <span className="badge badge-gold">{leads.length} total</span>
          </div>
          <div className="admin-table-body">
            {recentLeads.map(lead => (
              <div key={lead.id} className="admin-table-row">
                <div className="lead-info">
                  <strong>{lead.name}</strong>
                  <span>{lead.interest}</span>
                </div>
                <span className={`badge badge-${lead.status === 'Won' ? 'success' : lead.status === 'Lost' ? 'danger' : lead.status === 'New' ? 'info' : 'gold'}`}>
                  {lead.status}
                </span>
                <span className="table-meta">{lead.budget}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-table-card glass-card">
          <div className="admin-table-header">
            <h4>Top Agents</h4>
            <span className="badge badge-gold">{agents.length} active</span>
          </div>
          <div className="admin-table-body">
            {agents.map(agent => (
              <div key={agent.id} className="admin-table-row agent-row">
                <img src={agent.photo} alt={agent.name} className="agent-table-photo" />
                <div className="lead-info">
                  <strong>{agent.name}</strong>
                  <span>{agent.deals} deals · ${(agent.totalSales / 1000000).toFixed(0)}M sales</span>
                </div>
                <span className="agent-rating">⭐ {agent.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
