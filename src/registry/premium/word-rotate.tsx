"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Cycles through a list of words in place: the old word lifts and blurs out,
 * the next rises in. The slot keeps the width of the longest word so the
 * sentence around it never jumps. Screen readers hear the full list once.
 */
type WordRotateProps = {
  words?: string[]
  /** Milliseconds each word stays. */
  interval?: number
  className?: string
  /** Text before the rotating word. */
  prefix?: React.ReactNode
}

function WordRotate({ words = ["startups", "agencies", "fintech", "health", "AI products"], interval = 2200, className, prefix = "Interfaces for" }: WordRotateProps) {
  const reduce = useReducedMotion()
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    if (reduce || words.length < 2) return
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [words.length, interval, reduce])
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "")
  return (
    <span data-slot="word-rotate" className={cn("inline-flex flex-wrap items-baseline gap-x-[0.28em] text-4xl font-medium tracking-[-0.045em] text-fg sm:text-5xl", className)}>
      {prefix ? <span>{prefix}</span> : null}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="relative inline-grid">
        <span className="invisible col-start-1 row-start-1">{longest}</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[i]}
            className="col-start-1 row-start-1 text-accent-fg"
            initial={{ y: "0.6em", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-0.6em", opacity: 0, filter: "blur(6px)" }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.55 }}
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

export { WordRotate }
export type { WordRotateProps }
