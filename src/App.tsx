import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/ui/navbar/NavBar'
import AboutUsPage from './routes/about-us/AboutUsPage'
import GalleryPage from './routes/gallery/GalleryPage'
import HomePage from './routes/home/HomePage'
import HorsesPage from './routes/horses/HorsesPage'
import InstructorsPage from './routes/instructors/InstructorsPage'
import ServicesPage from './routes/services/ServicesPage'
import ReservationForm from './components/forms/reservation/ReservationForm'
import CampRegistrationForm from './components/forms/camp/CampForm'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/horses" element={<HorsesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/instructors" element={<InstructorsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path='/reservation' element={<ReservationForm />} />
        <Route path='/campform' element={<CampRegistrationForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
