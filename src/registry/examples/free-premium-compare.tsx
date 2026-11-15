"use client"
import { FreePremiumCompare } from "@/registry/premium/free-premium-compare"
import { FeatureComparison } from "@/registry/premium/feature-comparison"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "In a pricing section",
    description: "Give the section its own heading; the cards' tier names are h3s that sit under it.",
    code: `<section className="w-full max-w-4xl space-y-8">
  <div className="space-y-2 text-center">
    <h2 className="text-2xl font-medium tracking-[-0.02em] text-fg">Start free, upgrade for launch day</h2>
    <p className="text-sm text-fg-muted">Product UI is free. Premium adds the motion pieces.</p>
  </div>
  <FreePremiumCompare />
</section>`,
    node: (
      <section className="w-full max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-fg">Start free, upgrade for launch day</h2>
          <p className="text-sm text-fg-muted">Product UI is free. Premium adds the motion pieces.</p>
        </div>
        <FreePremiumCompare />
      </section>
    ),
  },
  {
    title: "With a feature table below",
    description: "The cards sell the two tiers; FeatureComparison underneath answers the detailed questions.",
    code: `<div className="w-full max-w-4xl space-y-6">
  <FreePremiumCompare />
  <FeatureComparison
    rows={[
      { feature: "Product UI components", free: true, premium: true },
      { feature: "Kinetic heroes", free: false, premium: true },
      { feature: "Page kits", free: false, premium: true },
    ]}
  />
</div>`,
    node: (
      <div className="w-full max-w-4xl space-y-6">
        <FreePremiumCompare />
        <FeatureComparison
          rows={[
            { feature: "Product UI components", free: true, premium: true },
            { feature: "Kinetic heroes", free: false, premium: true },
            { feature: "Page kits", free: false, premium: true },
          ]}
        />
      </div>
    ),
  },
]
