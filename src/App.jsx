// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Disciplines from './components/Disciplines';
import APropos from './components/APropos';
import Tarif from './components/Tarif';
import ProgrammesTeaser from './components/ProgrammesTeaser';
import Temoignages from './components/Temoignages';
import Reservation from './components/Reservation';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RetourPaiement from './components/RetourPaiement';
import Succes from './components/Succes';
import Programmes from './components/Programmes';
import ProgrammeDetail from './components/ProgrammeDetail';
import SuccesProgramme from './components/SuccesProgramme';
import SEO from './components/SEO';

function HomePage() {
  return (
    <div className="min-h-screen bg-secondary">
      <SEO />
      <Header />
      <main>
        <Hero />
        <Disciplines />
        <APropos />
        <Tarif />
        <Temoignages />
        <ProgrammesTeaser />
        <Reservation />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/confirmation" element={<RetourPaiement />} />
        <Route path="/succes" element={<Succes />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/programmes/:id" element={<ProgrammeDetail />} />
        <Route path="/succes-programme" element={<SuccesProgramme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
