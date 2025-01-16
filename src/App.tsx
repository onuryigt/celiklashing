import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import About from './pages/About'
import Gallery from './pages/Gallery'
import ServiceDetail from './pages/ServiceDetail'
import CookiePolicy from './pages/CookiePolicy'
import KVKK from './pages/KVKK'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminGallery from './pages/admin/Gallery'
import AdminCategories from './pages/admin/Categories'
import ChangePassword from './pages/admin/ChangePassword'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="hizmetler" element={<Services />} />
            <Route path="hizmetler/:serviceId" element={<ServiceDetail />} />
            <Route path="hakkimizda" element={<About />} />
            <Route path="iletisim" element={<Contact />} />
            <Route path="galeri" element={<Gallery />} />
            <Route path="cerez-politikasi" element={<CookiePolicy />} />
            <Route path="kvkk" element={<KVKK />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
