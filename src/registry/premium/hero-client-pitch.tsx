"use client"
import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function HeroClientPitch({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const stats: [string, string][] = [
    ["450+", "components"],
    ["60+", "premium"],
    ["100%", "audit gate"],
  ]
  return (
    <section
      data-slot="hero-client-pitch"
      data-tier="premium"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-bg px-4 py-12 sm:px-12 sm:py-24",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--accent)_55%,transparent),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 top-10 hidden size-72 rounded-full bg-accent/10 sm:block" />
      <div className="relative mx-auto max-w-4xl">
        <motion.p
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          className="text-xs font-medium uppercase tracking-[0.01em] text-accent"
        >
          MiniDev UI · Client-ready registry
        </motion.p>
        <h1 className="mt-4 text-[clamp(1.75rem,4.2vw+1rem,3.75rem)] font-medium leading-[1.08] tracking-[-0.028em] text-fg sm:leading-[1.05] sm:tracking-[-0.034em]">
          {["Interfaces", "that", "look"].map((w, i) => (
            <span key={w} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block pr-[0.28em]"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <motion.span
              className="inline-block bg-[linear-gradient(100deg,var(--fg)_0%,var(--accent)_60%,var(--accent-2)_100%)] bg-clip-text text-transparent"
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              expensive on purpose.
            </motion.span>
          </span>
        </h1>
        <motion.p
          initial={reduce ? false : { y: 12 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 max-w-xl text-sm leading-[1.55] text-fg-muted sm:mt-6 sm:text-base"
        >
          Free MIT product UI for the app. Premium kinetic launch moments for the pages that win deals.
          Same Geist, hue 285, Hairline — no theme drift between tiers.
        </motion.p>
        <motion.div
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
        >
          <Button size="lg" className="w-full sm:w-auto" render={<Link href="/showcase" />}>
            Open client showcase
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" render={<Link href="/gallery" />}>
            Browse gallery
          </Button>
        </motion.div>
        <motion.dl
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.58 }}
          className="mt-10 grid max-w-lg grid-cols-3 gap-2 border-t border-border pt-5 sm:mt-12 sm:gap-4 sm:pt-6"
        >
          {stats.map(([v, l]) => (
            <div key={l} className="min-w-0">
              <dt className="text-lg font-medium tabular-nums tracking-[-0.018em] text-fg sm:text-2xl">{v}</dt>
              <dd className="mt-0.5 text-[10px] text-fg-muted sm:text-xs">{l}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
export { HeroClientPitch }
