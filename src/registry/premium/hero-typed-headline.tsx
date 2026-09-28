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
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-bg px-4 py-14 text-center sm:px-6 sm:py-24",
        className
      )}
    >
      <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Introducing Lumen 2.0</p>
      <h1 className="mx-auto mt-3 max-w-3xl text-[clamp(1.5rem,3.2vw+0.9rem,3rem)] font-medium tracking-[-0.028em] text-fg">
        Ship beautiful{" "}
        <span className="relative inline-flex h-[1.2em] min-w-[9ch] max-w-full items-baseline justify-center overflow-hidden align-baseline text-accent sm:min-w-[12ch]">
          <AnimatePresence mode="wait">
            <motion.span
              key={WORDS[index]}
              initial={reduce ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: -16, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="absolute inset-x-0 whitespace-nowrap"
            >
              {WORDS[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-sm text-fg-muted">
        One workspace for plans, docs and releases, fast enough that it disappears.
      </p>
      <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center">
        <Button className="w-full sm:w-auto">Explore the product</Button>
        <Button variant="outline" className="w-full sm:w-auto">Free components</Button>
      </div>
    </section>
  )
}
export { HeroTypedHeadline }
