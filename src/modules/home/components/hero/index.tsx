import HeroCarousel from "@/components/ui/hero-carousel"
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <HeroCarousel></HeroCarousel>
      
    </div>
  )
}

export default Hero
