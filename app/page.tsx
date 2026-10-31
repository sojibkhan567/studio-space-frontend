import CategorySection from "@/components/home/CategorySection"
import HeroSlider from "@/components/home/HeroBanner"
import FeaturedStudio from "@/components/home/FeturedStudio"
import HowItWorks from "@/components/home/WorkSection"

export default function Page() {
  return (
    <>
      <HeroSlider />
      <CategorySection />
      <FeaturedStudio />
      <HowItWorks />
    </>
  )
}
