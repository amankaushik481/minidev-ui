"use client"
import * as React from "react"
import { motion, useReducedMotion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A centred hero whose headline ends in a word that rotates through a list ("Ship beautiful dashboards", "… AI apps"), sliding up as each one swaps.
 *
 * Screen readers and search engines get one stable sentence listing every
 * word; the rotating word is hidden from them. Rotation pauses while the
 * pointer is over the headline and stops for reduced motion, which shows the
 * first word. Use it to name several audiences or use cases in one line; for
 * multi-line kinetic type use HeroKineticType.
 *
 * @example
 * <HeroTypedHeadline prefix="Invoice" words={["freelancers", "agencies", "studios"]} />
 */
type HeroTypedHeadlineProps = {
  /** Fixed start of the headline. */
  prefix?: string
  /** Words that rotate at the end of the headline. */
  words?: string[]
  /** Milliseconds each word stays. */
  interval?: number
  className?: string
}

const WORDS = ["dashboards", "AI apps", "billing flows", "marketing sites"]

function listOf(words: string[]) {
  return words.length < 2 ? words.join("") : `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`
}

function HeroTypedHeadline({ prefix = "Ship beautiful", words = WORDS, interval = 2200, className }: HeroTypedHeadlineProps) {
  const reduce = useReducedMotion()
  const [index, setIndex] = React.useState(0)
  const [held, setHeld] = React.useState(false)
  React.useEffect(() => {
    if (reduce || held || words.length < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [reduce, held, words.length, interval])
  const word = words[index % Math.max(1, words.length)] ?? ""
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
      <h1
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        className="mx-auto mt-3 max-w-3xl text-[clamp(1.5rem,3.2vw+0.9rem,3rem)] font-medium tracking-[-0.028em] text-balance text-fg"
      >
        <span className="sr-only">{`${prefix} ${listOf(words)}`}</span>
        <span aria-hidden>{prefix} </span>
        <span aria-hidden className="relative inline-flex h-[1.2em] min-w-[9ch] max-w-full items-baseline justify-center overflow-hidden align-baseline text-accent-fg sm:min-w-[12ch]">
          <AnimatePresence mode="wait">
            <motion.span
              key={word}
              initial={reduce ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: -16, opacity: 0, transition: { duration: 0.16, ease: [0.3, 0, 0.8, 0.15] } }}
              transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
              className="absolute inset-x-0 whitespace-nowrap"
            >
              {word}
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
export type { HeroTypedHeadlineProps }
