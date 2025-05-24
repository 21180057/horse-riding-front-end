import './App.css'
import AboutUs from './components/about-us/AboutUs'
import Gallery from './components/gallery/Gallery'
import OurHorses from './components/our-horses/OurHorses'
import OurInstructors from './components/our-instructors/OurInstructors'
import NavBar from './components/ui/navbar/NavBar'
import Welcome from './components/welcome/Welcome'
import Footer from './components/ui/footer/Footer'

function App() {
  return (
    <>
      <NavBar />
      <Welcome />
      <OurHorses />
      <OurInstructors />
      <AboutUs />
      <Gallery />
      <Footer />
    </>
  )
}

export default App
