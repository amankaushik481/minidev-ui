"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { inputVariants } from "@/registry/ui/input"
import { SocialProof } from "@/registry/ui/social-proof"

function WaitlistHero({
  onSubmit,
  className,
}: {
  onSubmit?: (email: string) => void
  className?: string
}) {
  const reduce = useReducedMotion()
  const [email, setEmail] = React.useState("")
  return (
    <section
      data-slot="waitlist-hero"
      data-tier="premium"
      className={cn("relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-24 text-center", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--accent)_25%,transparent),transparent_70%)]"
        animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <div className="relative mx-auto max-w-xl">
        <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Coming soon</p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.026em] text-fg">Join the waitlist</h1>
        <p className="mt-3 text-sm text-fg-muted">Be first to the motion pack, landing templates, and launch kits.</p>
        <form
          className="mt-6 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit?.(email)
          }}
        >
          <input
            type="email"
            required
            aria-label="Email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(inputVariants({ size: "default" }), "flex-1")}
          />
          <Button type="submit">Request access</Button>
        </form>
        <div className="mt-6 flex justify-center">
          <SocialProof
            countLabel="1,800+ already waiting"
            people={[{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }]}
          />
        </div>
      </div>
    </section>
  )
}
export { WaitlistHero }
