"use client"
import { cn } from "@/lib/utils"
import { CtaBanner } from "@/registry/ui/cta-banner"
import { FeatureGrid } from "@/registry/ui/feature-grid"
import { Hero } from "@/registry/ui/hero"
import { LogoCloud } from "@/registry/ui/logo-cloud"
import { StatsStrip } from "@/registry/ui/stats-strip"

/**
 * MarketingLanding — a plain, fast landing page from free sections: hero, logo cloud, stats, feature grid and a CTA banner.
 *
 * Use for a simple product or docs home with no motion budget. For a richer launch page use HeroSpotlight, BentoLive,
 * PricingPlans, FaqSection and CtaBand together; for premium motion use PremiumLanding or SaasMarketingPage. Logos,
 * stats and features fall back to each section's Lumen sample data, which is fictional: replace it with your own.
 *
 * @example
 * <MarketingLanding onStart={() => router.push("/signup")} />
 */
type MarketingLandingProps = {
  /** Called by the hero's primary button and the closing banner's button. */
  onStart?: () => void
  className?: string
}

function MarketingLanding({ onStart, className }: MarketingLandingProps) {
  return (
    <div data-slot="marketing-landing" className={cn("space-y-16 py-10", className)}>
      <Hero
        eyebrow="Lumen for finance teams"
        title="Know what changed in your numbers, and why"
        description="Lumen watches revenue, churn and refunds around the clock and explains every move in plain English."
        primaryAction={{ label: "Start free", onClick: onStart }}
        secondaryAction={{ label: "Book a demo" }}
      />
      <LogoCloud />
      <StatsStrip />
      <FeatureGrid />
      <CtaBanner title="Your first digest arrives tomorrow" description="Connect Stripe in two clicks. Free for 14 days, no card." action={{ label: "Start free", onClick: onStart }} />
    </div>
  )
}

export { MarketingLanding }
export type { MarketingLandingProps }
