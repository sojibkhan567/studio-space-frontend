import BrowseCategories from "@/components/home/CategorySection"
import HeroSlider from "@/components/home/HeroBanner"
import FeaturedStudio from "@/components/home/FeturedStudio"
import HowItWorks from "@/components/home/WorkSection"
import TrustSection from "@/components/home/TrustSection"

export default function Page() {
  return (
    <>
      <HeroSlider />
      <BrowseCategories />
      <FeaturedStudio />
      <HowItWorks />
      <TrustSection />
    </>
  )
}
