"use client"
import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function TextScramble({
  text = "PREMIUM MOTION",
  className,
}: {
  text?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const [display, setDisplay] = React.useState(text)

  React.useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(text)
      return
    }
    let frame = 0
    const total = text.length * 3
    const id = window.setInterval(() => {
      frame += 1
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " "
            if (frame > i * 3 + 8) return text[i]
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join("")
      )
      if (frame > total) {
        setDisplay(text)
        window.clearInterval(id)
      }
    }, 28)
    return () => window.clearInterval(id)
  }, [inView, text, reduce])

  return (
    <p
      ref={ref}
      data-slot="text-scramble"
      data-tier="premium"
      className={cn("font-mono text-2xl font-medium tracking-[0.08em] text-fg sm:text-3xl", className)}
      aria-label={text}
    >
      {display}
    </p>
  )
}
export { TextScramble }
