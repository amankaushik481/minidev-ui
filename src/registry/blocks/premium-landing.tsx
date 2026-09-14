"use client"
import * as React from "react"
import { HeroAurora } from "@/registry/premium/hero-aurora"
import { AnimatedFeatureRow } from "@/registry/premium/animated-feature-row"
import { PricingMotion } from "@/registry/premium/pricing-motion"
import { CtaGlow } from "@/registry/premium/cta-glow"

function PremiumLanding() {
  return (
    <div data-slot="premium-landing" data-tier="premium" className="space-y-16 py-8">
      <HeroAurora />
      <AnimatedFeatureRow features={[
        { title: "Motion heroes", description: "Aurora, mesh, typed, bento." },
        { title: "Same tokens", description: "Premium still speaks Hairline." },
        { title: "Soft gate", description: "Free forever primitives underneath." },
      ]} />
      <PricingMotion plans={[
        { name: "Free", price: "$0", blurb: "MIT kit", features: ["All free UI", "Blocks", "Audit"] },
        { name: "Premium", price: "$49", blurb: "Launch pack", featured: true, features: ["Motion heroes", "Marketing sections", "Updates"] },
        { name: "Studio", price: "$199", blurb: "Agency", features: ["Team seats", "Custom themes", "Support"] },
      ]} />
      <CtaGlow title="Make the first screen unforgettable" />
    </div>
  )
}
export { PremiumLanding }
