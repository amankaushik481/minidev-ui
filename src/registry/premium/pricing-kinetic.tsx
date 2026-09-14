"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MorphPrice } from "@/registry/premium/morph-price"
import { FeatureComparison } from "@/registry/premium/feature-comparison"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { TypographicMarquee } from "@/registry/premium/typographic-marquee"

function PricingKinetic({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="pricing-kinetic" data-tier="premium" className={cn("space-y-12", className)}>
      <div className="space-y-3 text-center">
        <motion.h2 initial={reduce ? false : { y: 10 }} animate={{ y: 0 }} className="text-4xl font-medium tracking-[-0.030em] text-fg">
          Price the moment
        </motion.h2>
        <p className="text-sm text-fg-muted">Morphing price, comparison, magnetic close.</p>
      </div>
      <TypographicMarquee />
      <div className="mx-auto max-w-md"><MorphPrice /></div>
      <FeatureComparison
        rows={[
          { feature: "Product UI", free: true, premium: true },
          { feature: "Kinetic heroes", free: false, premium: true },
          { feature: "Page kits", free: false, premium: true },
          { feature: "Audit gate", free: true, premium: true },
        ]}
      />
      <div className="flex justify-center"><MagneticCta size="lg">Upgrade Premium</MagneticCta></div>
    </div>
  )
}
export { PricingKinetic }
