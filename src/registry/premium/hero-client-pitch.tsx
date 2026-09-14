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
      className={cn("relative overflow-hidden rounded-2xl border border-border bg-bg px-6 py-16 sm:px-12 sm:py-24", className)}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.48_0.17_285/0.55),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-accent/10" />
      <div className="relative mx-auto max-w-4xl">
        <motion.p
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          className="text-xs font-medium uppercase tracking-[0.01em] text-accent"
        >
          MiniDev UI · Client-ready registry
        </motion.p>
        <h1 className="mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.030em] text-fg sm:text-6xl sm:tracking-[-0.034em]">
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
              className="inline-block bg-[linear-gradient(105deg,oklch(0.32_0.16_285),oklch(0.38_0.14_310))] bg-clip-text text-transparent"
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
          className="mt-6 max-w-xl text-base leading-[1.55] text-fg-muted"
        >
          Free MIT product UI for the app. Premium kinetic launch moments for the pages that win deals.
          Same Geist, hue 285, Hairline — no theme drift between tiers.
        </motion.p>
        <motion.div
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button size="lg" render={<Link href="/showcase" />}>Open client showcase</Button>
          <Button size="lg" variant="outline" render={<Link href="/gallery" />}>Browse gallery</Button>
        </motion.div>
        <motion.dl
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.58 }}
          className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6"
        >
          {stats.map(([v, l]) => (
            <div key={l}>
              <dt className="text-2xl font-medium tabular-nums tracking-[-0.018em] text-fg">{v}</dt>
              <dd className="mt-0.5 text-xs text-fg-muted">{l}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
export { HeroClientPitch }
