"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Text with small four point stars that twinkle around it, placed at
 * random and replaced as they fade. The stars are decorative and hidden
 * from assistive tech; the text stays a normal text node.
 */
type SparklesTextProps = {
  children?: React.ReactNode
  /** How many stars are alive at once. */
  count?: number
  className?: string
}

type Star = { id: number; x: number; y: number; size: number; delay: number; color: string }

function SparklesText({ children = "Magic, but tasteful", count = 8, className }: SparklesTextProps) {
  const reduce = useReducedMotion()
  const [stars, setStars] = React.useState<Star[]>([])
  const n = React.useRef(0)
  React.useEffect(() => {
    if (reduce) return
    const make = (): Star => ({ id: n.current++, x: Math.random() * 100, y: Math.random() * 100, size: 8 + Math.random() * 10, delay: Math.random() * 0.6, color: Math.random() > 0.5 ? "var(--accent)" : "var(--accent-2)" })
    setStars(Array.from({ length: count }, make))
    const id = window.setInterval(() => setStars((s) => [...s.slice(1), make()]), 420)
    return () => window.clearInterval(id)
  }, [count, reduce])
  return (
    <span data-slot="sparkles-text" className={cn("relative inline-block text-4xl font-semibold tracking-[-0.045em] text-fg sm:text-5xl", className)}>
      {stars.map((s) => (
        <svg
          key={s.id}
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, color: s.color, animation: `sparkle 1.4s ease-in-out ${s.delay}s both` }}
        >
          <path d="M12 0c.6 5.6 6.4 11.4 12 12-5.6.6-11.4 6.4-12 12-.6-5.6-6.4-11.4-12-12C5.6 11.4 11.4 5.6 12 0Z" fill="currentColor" />
        </svg>
      ))}
      <span className="relative">{children}</span>
      <style>{`@keyframes sparkle{0%,100%{transform:translate(-50%,-50%) scale(0) rotate(0deg);opacity:0}50%{transform:translate(-50%,-50%) scale(1) rotate(90deg);opacity:1}}`}</style>
    </span>
  )
}

export { SparklesText }
export type { SparklesTextProps }
