import AboutLanding from "../Components/About/About"
import FooterLanding from "../Components/Footer/FooterLanding"
import NavbarLanding from "../Components/Nav/NavbarLanding"


const AboutPage = () => {
  return (
    <div>
      <NavbarLanding />
      <AboutLanding />
      {/* <Testimonials /> */}
      <FooterLanding />
    </div>
  )
}

export default AboutPage