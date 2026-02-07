import NavigationBar from "../components/landing/NavigationBar"
import { TopHeroSection, LastHeroSection } from "../components/landing/HeroSections"
import HowItWorks from "../components/landing/HowItWorks"
import WhyToUseIt from "../components/landing/WhyToUseIt"
import Footer from "../components/landing/Footer"

const Landing = () => {
  return (
    <section>
      
      {/* Navigation bar */}
      <NavigationBar />

      {/* Hero section */}
      <TopHeroSection />

      {/* "How it works" section */}
      <HowItWorks />

      {/* "Why to use" section */}
      <WhyToUseIt />

      {/* End hero section */}
      <LastHeroSection />

      {/* Footer section */}
      <Footer />

    </section>
  )
}

export default Landing