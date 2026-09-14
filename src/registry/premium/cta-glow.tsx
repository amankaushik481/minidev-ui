"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { Button } from "@/registry/ui/button"

function CtaGlow({
  title,
  description,
  className,
}: {
  title: string
  description?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      data-slot="cta-glow"
      data-tier="premium"
      initial={reduce ? false : { y: 12 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-sunken p-5 text-center shadow-[inset_0_1px_0_oklch(1_0_0/0.55)] sm:p-8",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.48_0.17_285/0.22),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.48_0.17_285/0.55),transparent)]"
        aria-hidden
      />
      <h3 className="relative text-2xl font-medium tracking-[-0.018em] text-fg">{title}</h3>
      {description ? (
        <p className="relative mx-auto mt-2 max-w-md text-sm text-fg-muted">{description}</p>
      ) : null}
      <div className="relative mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <MagneticCta>Get Premium</MagneticCta>
        <Button variant="outline">Stay free</Button>
      </div>
    </motion.div>
  )
}
export { CtaGlow }
