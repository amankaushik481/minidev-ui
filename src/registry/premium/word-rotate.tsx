"use client"
import * as React from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A sentence with one word that rotates through a list in place, lifting and blurring out as the next rises in.
 * The slot holds every word invisibly, so it is always as wide as the widest
 * one and the sentence around it never jumps. The new word arrives on the
 * morph spring and the old one leaves faster than it came. It pauses off
 * screen, shows the first word for reduced motion, and screen readers hear
 * the full list once.
 *
 * Use it for a hero line like "Interfaces for <rotating word>". Reach for
 * MorphingText to cycle whole phrases, TypingText for a typewriter, and
 * HyperText or TextScramble for a one-off decode.
 *
 * @example
 * <WordRotate prefix="Invoicing for" words={["agencies", "studios", "consultants"]} interval={2400} />
 */
type WordRotateProps = {
  /** Words to cycle through, in order. */
  words?: string[]
  /** Milliseconds each word stays. */
  interval?: number
  className?: string
  /** Text before the rotating word. */
  prefix?: React.ReactNode
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const EXIT = { duration: 0.16, ease: [0.3, 0, 0.8, 0.15] } as const

function WordRotate({ words = ["startups", "agencies", "fintech", "health", "AI products"], interval = 2200, className, prefix = "Interfaces for" }: WordRotateProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    if (reduce || !inView || words.length < 2) return
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [words.length, interval, reduce, inView])
  const word = words[i % Math.max(1, words.length)] ?? ""
  return (
    <span ref={ref} data-slot="word-rotate" className={cn("inline-flex flex-wrap items-baseline gap-x-[0.28em] text-4xl font-medium tracking-[-0.045em] text-fg sm:text-5xl", className)}>
      {prefix ? <span>{prefix}</span> : null}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="relative inline-grid">
        {words.map((w, k) => (
          <span key={k} className="invisible col-start-1 row-start-1">
            {w}
          </span>
        ))}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={`${i}-${word}`}
            className="col-start-1 row-start-1 text-accent-fg"
            initial={reduce ? false : { y: "0.6em", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { y: "-0.6em", opacity: 0, filter: "blur(6px)", transition: EXIT }}
            transition={reduce ? { duration: 0 } : MORPH}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

export { WordRotate }
export type { WordRotateProps }
