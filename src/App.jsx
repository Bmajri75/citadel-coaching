import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LangProvider }    from './context/LangContext'
import { AuthProvider }    from './context/AuthContext'
import ProtectedRoute      from './components/ProtectedRoute'
import Navbar              from './components/Navbar'
import Footer              from './components/Footer'

// Pages publiques
import Home                from './pages/Home'
import Programmes          from './pages/Programmes'
import ProgrammeDetail     from './pages/ProgrammeDetail'
import Blog                from './pages/Blog'
import BlogPost            from './pages/BlogPost'
import Succes              from './pages/Succes'
import SuccesProgramme     from './pages/SuccesProgramme'
import Coachs              from './pages/Coachs'
import DemandeCoaching     from './pages/DemandeCoaching'

// Auth
import Login               from './pages/Login'
import Activation          from './pages/Activation'

// Admin
import AdminDashboard      from './pages/admin/Dashboard'
import AdminRequests       from './pages/admin/Requests'
import AdminRequestDetail  from './pages/admin/RequestDetail'
import AdminCoaches        from './pages/admin/Coaches'
import AdminCoachDetail    from './pages/admin/CoachDetail'
import AdminInvitations    from './pages/admin/Invitations'

// Coach
import CoachDashboard      from './pages/coach/Dashboard'
import CoachRequests       from './pages/coach/Requests'
import CoachProfile        from './pages/coach/Profile'

const ROUTES_PRIVEES = ['/login', '/activation', '/admin', '/coach']

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children }) {
  const { pathname } = useLocation()
  const estPrive = ROUTES_PRIVEES.some(r => pathname.startsWith(r))
  return (
    <>
      {!estPrive && <Navbar />}
      {children}
      {!estPrive && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <LangProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              {/* Public */}
              <Route path="/"                   element={<Home />} />
              <Route path="/programmes"         element={<Programmes />} />
              <Route path="/programmes/:id"     element={<ProgrammeDetail />} />
              <Route path="/blog"               element={<Blog />} />
              <Route path="/blog/:slug"         element={<BlogPost />} />
              <Route path="/succes"             element={<Succes />} />
              <Route path="/succes-programme"   element={<SuccesProgramme />} />
              <Route path="/coachs"             element={<Coachs />} />
              <Route path="/demande-coaching"   element={<DemandeCoaching />} />

              {/* Auth */}
              <Route path="/login"              element={<Login />} />
              <Route path="/activation"         element={<Activation />} />

              {/* Admin */}
              <Route path="/admin"              element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/demandes"     element={<ProtectedRoute requiredRole="admin"><AdminRequests /></ProtectedRoute>} />
              <Route path="/admin/demandes/:id" element={<ProtectedRoute requiredRole="admin"><AdminRequestDetail /></ProtectedRoute>} />
              <Route path="/admin/coachs"       element={<ProtectedRoute requiredRole="admin"><AdminCoaches /></ProtectedRoute>} />
              <Route path="/admin/coachs/:id"   element={<ProtectedRoute requiredRole="admin"><AdminCoachDetail /></ProtectedRoute>} />
              <Route path="/admin/invitations"  element={<ProtectedRoute requiredRole="admin"><AdminInvitations /></ProtectedRoute>} />

              {/* Coach */}
              <Route path="/coach"              element={<ProtectedRoute requiredRole="coach"><CoachDashboard /></ProtectedRoute>} />
              <Route path="/coach/demandes"     element={<ProtectedRoute requiredRole="coach"><CoachRequests /></ProtectedRoute>} />
              <Route path="/coach/profil"       element={<ProtectedRoute requiredRole="coach"><CoachProfile /></ProtectedRoute>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LangProvider>
    </AuthProvider>
  )
}
