import AboutUs from "../../components/about-us/AboutUs";
import Gallery from "../../components/gallery/Gallery";
import OurHorses from "../../components/our-horses/OurHorses";
import OurInstructors from "../../components/our-instructors/OurInstructors";
import Footer from "../../components/ui/footer/Footer";
import Welcome from "../../components/welcome/Welcome";

export default function HomePage() {
  return (
    <>
      <Welcome />
      <OurHorses />
      <OurInstructors />
      <AboutUs />
      <Gallery />
      <Footer />
    </>
  )
}
