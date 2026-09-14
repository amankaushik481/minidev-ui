"use client"
import * as React from "react"
import { motion, useReducedMotion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

const WORDS = ["dashboards", "AI apps", "billing flows", "marketing sites"]

function HeroTypedHeadline({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = React.useState(0)
  React.useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2200)
    return () => clearInterval(id)
  }, [reduce])
  return (
    <section
      data-slot="hero-typed-headline"
      data-tier="premium"
      className={cn("rounded-2xl border border-border bg-bg px-6 py-24 text-center", className)}
    >
      <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Premium</p>
      <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-medium tracking-[-0.030em] text-fg sm:text-5xl">
        Ship beautiful{" "}
        <span className="relative inline-flex h-[1.15em] min-w-[8ch] items-baseline justify-center overflow-hidden align-baseline text-accent">
          <AnimatePresence mode="wait">
            <motion.span
              key={WORDS[index]}
              initial={reduce ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: -16, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="absolute inset-x-0"
            >
              {WORDS[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-sm text-fg-muted">
        One registry. Free primitives. Premium motion blocks when you need the wow.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button>Explore Premium</Button>
        <Button variant="outline">Free components</Button>
      </div>
    </section>
  )
}
export { HeroTypedHeadline }
