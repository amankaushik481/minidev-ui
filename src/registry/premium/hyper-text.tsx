"use client"
import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Text that decodes itself: every character cycles through random glyphs and locks into place from left to right.
 * A violet scanning head marks the letter about to settle. It runs once
 * when it scrolls into view and again on hover, set in monospace so nothing
 * shifts while it runs. Screen readers only ever get the final text, and
 * reduced motion shows it at once.
 */
type HyperTextProps = {
  text?: string
  /** Milliseconds for the whole line to settle. */
  duration?: number
  /** The pool of glyphs characters cycle through before they lock. */
  characters?: string
  /** When to run: the first time it is in view, on hover, or both. */
  trigger?: "mount" | "hover" | "both"
  className?: string
}

/** How much of the run the first character spends scrambling before anything locks. */
const LEAD = 0.25

function HyperText({ text = "Close the books in 24 hours", duration = 1100, characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<=>?@", trigger = "both", className }: HyperTextProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  // How many characters have locked; everything past it is still scrambling. -1 means settled.
  const [head, setHead] = React.useState(-1)
  const [glyphs, setGlyphs] = React.useState<string[]>([])
  const raf = React.useRef(0)
  const chars = React.useMemo(() => Array.from(text), [text])
  const pool = characters.length ? characters : "#"

  const run = React.useCallback(() => {
    if (reduce) return
    window.cancelAnimationFrame(raf.current)
    const n = chars.length
    const start = performance.now()
    let tick = 0
    const roll = () => setGlyphs(chars.map((c) => (c === " " ? " " : pool[Math.floor(Math.random() * pool.length)])))
    roll()
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / Math.max(1, duration))
      // Characters lock one after another from the left, after a short lead where everything churns.
      const locked = p >= 1 ? n : Math.floor(Math.max(0, (p - LEAD) / (1 - LEAD)) * (n + 1))
      // A glyph changes every third frame: fast enough to read as churn, slow enough to read at all.
      if (tick++ % 3 === 0) roll()
      setHead(locked >= n ? -1 : locked)
      if (p < 1) raf.current = window.requestAnimationFrame(step)
    }
    raf.current = window.requestAnimationFrame(step)
  }, [chars, pool, duration, reduce])

  React.useEffect(() => () => window.cancelAnimationFrame(raf.current), [])

  React.useEffect(() => {
    if (inView && trigger !== "hover") run()
  }, [inView, trigger, run])

  // Each word keeps its trailing space and wraps as a unit, so lines break where the real text would.
  const words: { start: number; chars: string[] }[] = []
  chars.forEach((c, i) => {
    if (!words.length || chars[i - 1] === " ") words.push({ start: i, chars: [] })
    words[words.length - 1].chars.push(c)
  })

  return (
    <span
      ref={ref}
      data-slot="hyper-text"
      onPointerEnter={(e) => {
        if (trigger !== "mount" && e.pointerType !== "touch") run()
      }}
      className={cn("mx-auto block w-fit max-w-full font-mono text-2xl font-medium tracking-[-0.01em] text-fg sm:text-3xl", className)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, wi) => (
          <span key={wi} className="inline-block whitespace-pre">
            {w.chars.map((c, ci) => {
              const i = w.start + ci
              const settled = reduce || head === -1 || i < head || c === " "
              return (
                <span key={ci} className={cn("inline-block", !settled && (i === head ? "text-accent-fg" : "text-fg-subtle"))}>
                  {settled ? c : (glyphs[i] ?? c)}
                </span>
              )
            })}
          </span>
        ))}
      </span>
    </span>
  )
}

export { HyperText }
export type { HyperTextProps }
