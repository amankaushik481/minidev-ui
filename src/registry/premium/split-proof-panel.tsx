"use client"
import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"

/**
 * A two-column proof section: a pitch with a checklist and a call to action on one side, a stack of short proof cards rising in on the other.
 * The proof column rises once on the morph spring; reduced motion shows it in
 * place. Copy the file and replace the sample pitch and proof points with
 * real, checkable ones.
 *
 * Use it to back a claim right after a hero ("built to survive a client tab
 * share"). Reach for FreePremiumCompare for a side-by-side tier comparison,
 * and MetricTickerBoard when the proof is numbers.
 *
 * @example
 * <SplitProofPanel />
 */
const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function SplitProofPanel({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const proofs: [string, string][] = [
    ["Gallery", "53 categorized routes"],
    ["Registry", "500+ paste-ready items"],
    ["Gate", "build + axe + shots"],
  ]
  return (
    <section
      data-slot="split-proof-panel"
      data-tier="premium"
      className={cn("grid overflow-hidden rounded-2xl border border-border lg:grid-cols-2", className)}
    >
      <div className="space-y-4 bg-surface p-5 shadow-highlight sm:p-8">
        <Badge variant="outline">Proof</Badge>
        <h3 className="text-xl font-medium tracking-[-0.018em] text-fg sm:text-2xl">Built to survive a client tab share</h3>
        <p className="text-sm leading-[1.55] text-fg-muted">
          Walk a client through the product surface, the component gallery and the docs. Every screen they see is the real, shippable component.
        </p>
        <ul className="space-y-2 text-sm text-fg">
          {["Site chrome on every major surface", "One token set across every page", "Contrast and keyboard checked in both themes"].map((t) => (
            <li key={t} className="flex gap-2"><span aria-hidden className="text-accent-fg">▹</span>{t}</li>
          ))}
        </ul>
        <Button size="sm" className="w-full sm:w-auto" render={<Link href="/showcase" />}>Open /showcase</Button>
      </div>
      <motion.div
        initial={reduce ? false : { y: 12 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={reduce ? { duration: 0 } : MORPH}
        className="flex flex-col justify-center gap-3 bg-sunken p-5 sm:p-8"
      >
        {proofs.map(([k, v]) => (
          <div key={k} className="rounded-xl border border-border bg-surface px-4 py-3 shadow-highlight">
            <p className="text-[11px] uppercase tracking-[0.01em] text-fg-muted">{k}</p>
            <p className="mt-1 text-sm font-medium text-fg">{v}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
export { SplitProofPanel }
