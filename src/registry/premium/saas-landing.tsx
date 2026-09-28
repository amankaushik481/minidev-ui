"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { HeroAurora } from "@/registry/premium/hero-aurora"
import { AnimatedFeatureRow } from "@/registry/premium/animated-feature-row"
import { LogoWallMotion } from "@/registry/premium/logo-wall-motion"
import { PricingMotion } from "@/registry/premium/pricing-motion"
import { TestimonialCarousel } from "@/registry/premium/testimonial-carousel"
import { CtaGlow } from "@/registry/premium/cta-glow"
import { StatsCounter } from "@/registry/premium/stats-counter"
import { FaqList } from "@/registry/ui/faq-list"

function SaasLanding({ className }: { className?: string }) {
  return (
    <div data-slot="saas-landing" data-tier="premium" className={cn("space-y-20 py-6", className)}>
      <HeroAurora
        eyebrow="Introducing Lumen 2.0"
        title="The UI kit your launch page deserves"
        description="Compose free product primitives. Drop Premium motion when the first screen has to convert."
        primaryLabel="Start free"
        secondaryLabel="See pricing"
      />
      <LogoWallMotion logos={["Acme", "Globex", "Initech", "Umbrella", "Stark", "Wayne", "Oscorp", "Cyberdyne"]} />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <StatsCounter value={347} label="Components" />
        <StatsCounter value={44} label="Galleries" />
        <StatsCounter value={15} label="Premium blocks" />
        <StatsCounter value={100} label="A11y gate" />
      </div>
      <AnimatedFeatureRow
        features={[
          { title: "Hairline system", description: "1px structure, semantic OKLCH, Geist." },
          { title: "Motion that respects users", description: "Framer Motion with reduced-motion baked in." },
          { title: "Audit-gated", description: "Screenshots + axe before anything ships." },
        ]}
      />
      <PricingMotion
        plans={[
          { name: "Free", price: "$0", blurb: "MIT forever", features: ["All free UI", "Blocks", "Gallery"] },
          { name: "Premium", price: "$49", blurb: "Launch pack", featured: true, features: ["Motion heroes", "Landing templates", "Updates"] },
          { name: "Studio", price: "$199", blurb: "Teams", features: ["Seats", "Custom themes", "Support"] },
        ]}
      />
      <TestimonialCarousel
        items={[
          { quote: "We replaced three landing experiments with one Premium template.", name: "Riley Ng", role: "Growth" },
          { quote: "Same tokens as the product kit — finally consistent.", name: "Jordan Blake", role: "Design Eng" },
          { quote: "Motion without the generic Framer template look.", name: "Sam Ortiz", role: "Founder" },
        ]}
      />
      <FaqList
        items={[
          { q: "Is free forever?", a: "Yes. Free UI and blocks stay MIT." },
          { q: "What is Premium?", a: "Motion heroes and marketing templates that soft-gate commercially." },
          { q: "Dark mode?", a: "Tokenized light and dark across both tiers." },
        ]}
      />
      <CtaGlow title="Ship the page that matches the product" description="Start free. Upgrade the moments that matter." />
    </div>
  )
}
export { SaasLanding }
