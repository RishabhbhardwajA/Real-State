import { useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Building2, CheckCircle, Users, UserCircle,
  Megaphone, BarChart3, Settings, ChevronLeft, Menu, LogOut, Bell
} from 'lucide-react'
import './AdminLayout.css'

const sidebarLinks = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/admin/properties', icon: Building2, label: 'Properties' },
  { path: '/admin/approvals', icon: CheckCircle, label: 'Approvals' },
  { path: '/admin/leads', icon: Users, label: 'Leads CRM' },
  { path: '/admin/agents', icon: UserCircle, label: 'Agents' },
  { path: '/admin/marketing', icon: Megaphone, label: 'Marketing' },
  { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const currentPage = sidebarLinks.find(l =>
    l.end ? location.pathname === l.path : location.pathname.startsWith(l.path) && l.path !== '/admin'
  ) || sidebarLinks[0]

  return (
    <div className="admin-layout">
      {mobileOpen && <div className="admin-mobile-overlay" onClick={() => setMobileOpen(false)} />}

      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <div className="brand-icon"><Building2 size={20} /></div>
            {!collapsed && <span className="brand-text">Prop<span className="gold-text">Ease</span></span>}
          </Link>
          <button className="sidebar-collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeft size={16} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {sidebarLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <link.icon size={18} />
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link">
            <LogOut size={18} />
            {!collapsed && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-left">
            <button className="admin-mobile-toggle" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className="topbar-title">{currentPage.label}</h2>
          </div>
          <div className="topbar-right">
            <button className="topbar-icon-btn" id="admin-notif-btn">
              <Bell size={18} />
              <span className="notif-badge">3</span>
            </button>
            <div className="topbar-user">
              <div className="topbar-user-avatar">A</div>
              <div className="topbar-user-info">
                <span className="topbar-user-name">Admin User</span>
                <span className="topbar-user-role">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
