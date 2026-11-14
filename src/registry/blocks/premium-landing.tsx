"use client"
import { cn } from "@/lib/utils"
import { HeroAurora } from "@/registry/premium/hero-aurora"
import { AnimatedFeatureRow } from "@/registry/premium/animated-feature-row"
import { PricingMotion } from "@/registry/premium/pricing-motion"
import { CtaGlow } from "@/registry/premium/cta-glow"

/**
 * PremiumLanding — a short premium launch page: aurora hero, animated feature row, motion pricing and a glowing CTA.
 *
 * Use for a product launch or waitlist page that should feel alive. For a full SaaS home with logos, compare and
 * quotes use SaasMarketingPage; for the free-tier equivalent use MarketingLanding. Every section falls back to
 * its own Lumen sample copy; pass props to the sections to change it.
 *
 * @example
 * <PremiumLanding />
 */
type PremiumLandingProps = {
  className?: string
}

function PremiumLanding({ className }: PremiumLandingProps) {
  return (
    <div data-slot="premium-landing" data-tier="premium" className={cn("space-y-16 py-8", className)}>
      <HeroAurora title="Close your books every day" />
      <AnimatedFeatureRow />
      <PricingMotion />
      <CtaGlow title="Your next close could take an afternoon" description="Connect Stripe and your bank. Lumen reconciles the rest overnight." />
    </div>
  )
}

export { PremiumLanding }
export type { PremiumLandingProps }
