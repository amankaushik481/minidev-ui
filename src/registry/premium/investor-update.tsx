"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { FlipStatBoard } from "@/registry/premium/flip-stat-board"
import { MaskedGradientHeadline } from "@/registry/premium/masked-gradient-headline"
import { CursorSpotlightPanel } from "@/registry/premium/cursor-spotlight-panel"
import { HorizontalProductRail } from "@/registry/premium/horizontal-product-rail"

function InvestorUpdate({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <article
      data-slot="investor-update"
      data-tier="premium"
      className={cn("mx-auto max-w-3xl space-y-12 px-6 py-16", className)}
    >
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Investor update · Q3</p>
        <MaskedGradientHeadline>Building the kit teams refuse to leave.</MaskedGradientHeadline>
        <motion.p
          initial={reduce ? false : { y: 8 }}
          animate={{ y: 0 }}
          className="text-base leading-[1.55] text-fg-muted"
        >
          MiniDev UI is a Hairline registry: free product primitives, Premium launch moments, and an audit gate that keeps screenshots honest.
        </motion.p>
      </header>
      <FlipStatBoard
        stats={[
          { value: 400, label: "Registry items" },
          { value: 49, label: "Galleries" },
          { value: 3, label: "Waves shipped" },
        ]}
      />
      <section className="space-y-3">
        <h2 className="text-xl font-medium tracking-[-0.014em] text-fg">What shipped</h2>
        <ul className="space-y-2 text-sm leading-[1.55] text-fg-muted">
          <li className="border-l border-accent/40 pl-3">Email + admin density for real product consoles</li>
          <li className="border-l border-accent/40 pl-3">Premium kinetic layer: sticky story, magnetic CTA, wipe compares</li>
          <li className="border-l border-accent/40 pl-3">Gallery UX with Free/Premium filters — not a flat dump</li>
        </ul>
      </section>
      <HorizontalProductRail ariaLabel="Update product surfaces" />
      <CursorSpotlightPanel
        title="Ask"
        body="Extending Premium page kits and motion atoms while keeping free MIT forever. Reach out if you want a Studio seat walkthrough."
      />
    </article>
  )
}
export { InvestorUpdate }
