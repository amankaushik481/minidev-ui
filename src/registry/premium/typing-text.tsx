"use client"
import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A typewriter that types a phrase, holds, deletes and moves to the next,
 * with a blinking caret. Starts when it scrolls into view, and screen
 * readers get the phrases as plain text instead of the keystrokes.
 */
type TypingTextProps = {
  phrases?: string[]
  /** Milliseconds per typed character. */
  speed?: number
  /** Milliseconds to hold a finished phrase. */
  hold?: number
  loop?: boolean
  className?: string
}

function TypingText({ phrases = ["Build the MVP.", "Ship it in 30 days.", "Own every line of code."], speed = 55, hold = 1400, loop = true, className }: TypingTextProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { amount: 0.6 })
  const [i, setI] = React.useState(0)
  const [n, setN] = React.useState(0)
  const [deleting, setDeleting] = React.useState(false)
  const phrase = phrases[i % phrases.length] ?? ""

  React.useEffect(() => {
    if (reduce || !inView) return
    let t: number
    if (!deleting && n < phrase.length) t = window.setTimeout(() => setN(n + 1), speed + (phrase[n] === " " ? 40 : Math.random() * 40))
    else if (!deleting && n === phrase.length) {
      if (!loop && i === phrases.length - 1) return
      t = window.setTimeout(() => setDeleting(true), hold)
    } else if (deleting && n > 0) t = window.setTimeout(() => setN(n - 1), speed * 0.45)
    else {
      setDeleting(false)
      setI((x) => (x + 1) % phrases.length)
    }
    return () => window.clearTimeout(t)
  }, [n, deleting, phrase, speed, hold, loop, i, phrases.length, reduce, inView])

  const shown = reduce ? phrase : phrase.slice(0, n)
  return (
    <span ref={ref} data-slot="typing-text" className={cn("inline-flex items-baseline text-3xl font-medium tracking-[-0.04em] text-fg sm:text-4xl", className)}>
      <span className="sr-only">{phrases.join(" ")}</span>
      <span aria-hidden className="whitespace-pre">{shown || "​"}</span>
      <span aria-hidden className="ml-0.5 inline-block h-[0.95em] w-[0.08em] translate-y-[0.12em] rounded-full bg-accent" style={{ animation: reduce ? undefined : "typing-caret 1s steps(1) infinite" }} />
      <style>{`@keyframes typing-caret{50%{opacity:0}}`}</style>
    </span>
  )
}

export { TypingText }
export type { TypingTextProps }
