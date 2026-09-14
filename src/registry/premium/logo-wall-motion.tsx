"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function LogoWallMotion({
  logos = ["Acme", "Globex", "Initech", "Umbrella", "Stark", "Wayne"],
  className,
}: {
  logos?: string[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const row = [...logos, ...logos]
  return (
    <div data-slot="logo-wall-motion" data-tier="premium" className={cn("space-y-3", className)}>
      <p className="text-center text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Trusted by product teams</p>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-sunken py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,var(--color-sunken),transparent)]" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,var(--color-sunken),transparent)]" aria-hidden />
        <motion.div
          className="flex w-max gap-3 px-4"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={reduce ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {row.map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="inline-flex h-11 min-w-28 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-medium text-fg shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]"
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
export { LogoWallMotion }
