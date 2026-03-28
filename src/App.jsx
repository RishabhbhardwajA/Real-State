import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Calculator from './pages/Calculator'
import About from './pages/About'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Documents from './pages/Documents'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageProperties from './pages/admin/ManageProperties'
import Approvals from './pages/admin/Approvals'
import LeadsCRM from './pages/admin/LeadsCRM'
import Agents from './pages/admin/Agents'
import Marketing from './pages/admin/Marketing'
import Reports from './pages/admin/Reports'
import Settings from './pages/admin/Settings'
import AdminLayout from './components/AdminLayout'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin routes - separate layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="properties" element={<ManageProperties />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="leads" element={<LeadsCRM />} />
          <Route path="agents" element={<Agents />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Public routes */}
        <Route path="*" element={
          <>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/documents" element={<Documents />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
          </>
        } />
      </Routes>
    </>
  )
}

export default App
