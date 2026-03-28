import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { Download, Calendar, TrendingUp, DollarSign, Users, Building2 } from 'lucide-react'
import './Admin.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const revenueByMonth = {
  labels: months,
  datasets: [
    { label: 'Revenue', data: [280, 320, 410, 380, 520, 490, 620, 580, 710, 650, 780, 850], borderColor: '#d4a853', backgroundColor: 'rgba(212,168,83,0.1)', tension: 0.4, fill: true },
    { label: 'Expenses', data: [180, 200, 250, 220, 300, 280, 350, 320, 380, 340, 400, 420], borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.05)', tension: 0.4, fill: true },
  ]
}

const propertyTypes = {
  labels: ['House', 'Condo', 'Villa', 'Apartment', 'Townhouse', 'Penthouse'],
  datasets: [{ data: [35, 20, 15, 15, 10, 5], backgroundColor: ['#d4a853', '#3b82f6', '#22c55e', '#8b5cf6', '#f59e0b', '#ec4899'], borderWidth: 0 }]
}

const leadSources = {
  labels: ['Website', 'Referral', 'Social Media', 'Open House'],
  datasets: [{ data: [45, 25, 20, 10], backgroundColor: ['#d4a853', '#22c55e', '#3b82f6', '#f59e0b'], borderWidth: 0 }]
}

const conversionData = {
  labels: months,
  datasets: [{ label: 'Conversion Rate %', data: [18, 22, 24, 20, 26, 28, 25, 30, 28, 32, 30, 34], backgroundColor: 'rgba(212,168,83,0.6)', borderRadius: 6 }]
}

const chartOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { color: '#6a6a7a', font: { size: 11 }, padding: 16 } } },
  scales: { x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6a6a7a', font: { size: 11 } } }, y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6a6a7a', font: { size: 11 } } } },
}

const doughnutOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { color: '#6a6a7a', font: { size: 11 }, padding: 12 } } },
  cutout: '65%',
}

export default function Reports() {
  return (
    <div className="admin-page">
      <div className="admin-section-header">
        <h3>Reports & Analytics</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-small"><Calendar size={14} /> Last 12 Months</button>
          <button className="btn btn-primary btn-small"><Download size={14} /> Export</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        {[
          { icon: DollarSign, label: 'Total Revenue', value: '$6.4M', change: '+18%', up: true },
          { icon: Building2, label: 'Properties Sold', value: '89', change: '+12', up: true },
          { icon: Users, label: 'New Leads', value: '342', change: '+24%', up: true },
          { icon: TrendingUp, label: 'Avg. Days to Close', value: '28', change: '-3 days', up: true },
        ].map((kpi, i) => (
          <div key={i} className="kpi-card glass-card">
            <div className="kpi-icon-wrap"><kpi.icon size={20} /></div>
            <div className="kpi-info">
              <span className="kpi-label">{kpi.label}</span>
              <span className="kpi-value">{kpi.value}</span>
              <span className="kpi-change up">{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-card glass-card">
          <h4>Revenue vs Expenses</h4>
          <div className="chart-container"><Line data={revenueByMonth} options={chartOpts} /></div>
        </div>
        <div className="chart-card glass-card">
          <h4>Monthly Conversion Rate</h4>
          <div className="chart-container"><Bar data={conversionData} options={chartOpts} /></div>
        </div>
      </div>

      <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="chart-card glass-card">
          <h4>Properties by Type</h4>
          <div className="chart-container" style={{ maxWidth: 260, margin: '0 auto' }}><Doughnut data={propertyTypes} options={doughnutOpts} /></div>
        </div>
        <div className="chart-card glass-card">
          <h4>Lead Sources</h4>
          <div className="chart-container" style={{ maxWidth: 260, margin: '0 auto' }}><Doughnut data={leadSources} options={doughnutOpts} /></div>
        </div>
      </div>
    </div>
  )
}
