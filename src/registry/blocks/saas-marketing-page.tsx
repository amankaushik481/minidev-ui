"use client"
import { HeroClientPitch } from "@/registry/premium/hero-client-pitch"
import { FeatureBentoMotion } from "@/registry/premium/feature-bento-motion"
import { FreePremiumCompare } from "@/registry/premium/free-premium-compare"
import { LogoWallMotion } from "@/registry/premium/logo-wall-motion"
import { TestimonialCarousel } from "@/registry/premium/testimonial-carousel"
import { MagneticCta } from "@/registry/premium/magnetic-cta"

function SaasMarketingPage() {
  return (
    <div data-slot="saas-marketing-page" data-tier="premium" className="space-y-16">
      <HeroClientPitch />
      <LogoWallMotion />
      <FeatureBentoMotion />
      <FreePremiumCompare />
      <TestimonialCarousel />
      <div className="flex justify-center"><MagneticCta size="lg">Start free</MagneticCta></div>
    </div>
  )
}
export { SaasMarketingPage }
