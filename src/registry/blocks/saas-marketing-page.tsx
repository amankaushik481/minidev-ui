"use client"
import { cn } from "@/lib/utils"
import { HeroClientPitch } from "@/registry/premium/hero-client-pitch"
import { FeatureBentoMotion } from "@/registry/premium/feature-bento-motion"
import { FreePremiumCompare } from "@/registry/premium/free-premium-compare"
import { LogoWallMotion } from "@/registry/premium/logo-wall-motion"
import { TestimonialCarousel } from "@/registry/premium/testimonial-carousel"
import { MagneticCta } from "@/registry/premium/magnetic-cta"

/**
 * SaasMarketingPage — a premium SaaS home page stacked from motion sections: pitch hero, logo wall, bento, compare, quotes, CTA.
 *
 * Use as a starting point for a pitch or launch page built from premium sections. For the free-tier equivalent use
 * MarketingLanding; for a lighter premium page use PremiumLanding. Each section is its own registry component, so
 * remove or reorder lines freely. The sample logos and quotes are fictional; replace them with your own.
 *
 * @example
 * <SaasMarketingPage />
 */
type SaasMarketingPageProps = {
  className?: string
}

function SaasMarketingPage({ className }: SaasMarketingPageProps) {
  return (
    <div data-slot="saas-marketing-page" data-tier="premium" className={cn("space-y-16", className)}>
      <HeroClientPitch />
      <LogoWallMotion />
      <FeatureBentoMotion />
      <FreePremiumCompare />
      <TestimonialCarousel />
      <div className="flex justify-center">
        <MagneticCta size="lg">Start free</MagneticCta>
      </div>
    </div>
  )
}

export { SaasMarketingPage }
export type { SaasMarketingPageProps }
