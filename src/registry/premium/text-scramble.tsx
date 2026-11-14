"use client"
import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A short monospace line that decodes from random glyphs into the real text, left to right, the first time it scrolls into view.
 * The real text is in the page from the first paint and is what screen
 * readers and search engines read; the scrambled glyphs are hidden from
 * them. Monospace keeps the width steady while it decodes. It plays once;
 * reduced motion shows the text straight away.
 *
 * Use it for a short label, eyebrow or code-flavoured headline (two or three
 * words). Reach for HyperText for a scramble on hover, TypingText for a
 * typewriter, and WordRotate or MorphingText for cycling phrases.
 *
 * @example
 * <TextScramble text="RECONCILED" />
 */
type TextScrambleProps = {
  /** The final text. Short, uppercase lines decode best. */
  text?: string
  /** Characters drawn while decoding. */
  glyphs?: string
  className?: string
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function TextScramble({ text = "PREMIUM MOTION", glyphs = GLYPHS, className }: TextScrambleProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const [display, setDisplay] = React.useState(text)

  React.useEffect(() => {
    if (!inView || reduce) return
    let frame = 0
    const total = text.length * 3 + 8
    const id = window.setInterval(() => {
      frame += 1
      if (frame > total) {
        setDisplay(text)
        window.clearInterval(id)
        return
      }
      setDisplay(
        text
          .split("")
          .map((ch, i) => (ch === " " || frame > i * 3 + 8 ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join("")
      )
    }, 28)
    return () => {
      window.clearInterval(id)
      setDisplay(text)
    }
  }, [inView, text, glyphs, reduce])

  return (
    <p
      ref={ref}
      data-slot="text-scramble"
      data-tier="premium"
      className={cn("font-mono text-2xl font-medium tracking-[0.08em] text-fg sm:text-3xl", className)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>{display}</span>
    </p>
  )
}
export { TextScramble }
export type { TextScrambleProps }
