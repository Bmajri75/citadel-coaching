import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LangProvider } from './context/LangContext'
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import Home            from './pages/Home'
import Programmes      from './pages/Programmes'
import ProgrammeDetail from './pages/ProgrammeDetail'
import Blog            from './pages/Blog'
import BlogPost        from './pages/BlogPost'
import Succes          from './pages/Succes'
import SuccesProgramme from './pages/SuccesProgramme'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/"                 element={<Home />} />
          <Route path="/programmes"       element={<Programmes />} />
          <Route path="/programmes/:id"   element={<ProgrammeDetail />} />
          <Route path="/blog"             element={<Blog />} />
          <Route path="/blog/:slug"       element={<BlogPost />} />
          <Route path="/succes"           element={<Succes />} />
          <Route path="/succes-programme" element={<SuccesProgramme />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LangProvider>
  )
}
