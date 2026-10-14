"use client"
import * as React from "react"
import { animate, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useTransform, type AnimationPlaybackControls } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A headline that cycles through phrases by melting each one into the next with a blur and crossfade on two stacked layers.
 * The old words blur and spread like wet ink while the new ones condense
 * into focus. It holds the tallest phrase's height so nothing below it
 * jumps, pauses off screen, and shows the first phrase for reduced motion.
 * Screen readers get the whole list once.
 */
type MorphingTextProps = {
  words?: string[]
  /** Milliseconds each phrase is held before it melts into the next. */
  interval?: number
  /** Seconds one morph takes. */
  duration?: number
  className?: string
}

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1]

function MorphingText({
  words = ["Invoices that close themselves", "Reports that write themselves", "Reminders that send themselves", "Books that balance themselves"],
  interval = 2600,
  duration = 1,
  className,
}: MorphingTextProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  // Index of the phrase on screen. Phrases alternate between two stacked layers, so the hidden layer can be swapped without a flash.
  const [front, setFront] = React.useState(0)
  // 0 means layer A is in focus, 1 means layer B is. The morph animates between them.
  const t = useMotionValue(0)
  const n = Math.max(1, words.length)

  const blurA = useTransform(t, [0, 1], [0, 14])
  const blurB = useTransform(t, [0, 1], [14, 0])
  const opacityA = useTransform(t, [0, 0.72], [1, 0])
  const opacityB = useTransform(t, [0.28, 1], [0, 1])
  // The leaving phrase spreads a touch as it blurs, the arriving one condenses, like ink drying.
  const scaleA = useTransform(t, [0, 1], [1, 1.04])
  const scaleB = useTransform(t, [0, 1], [0.96, 1])
  const filterA = useMotionTemplate`blur(${blurA}px)`
  const filterB = useMotionTemplate`blur(${blurB}px)`

  React.useEffect(() => {
    if (reduce || !inView || n < 2) return
    let live = true
    let controls: AnimationPlaybackControls | undefined
    const target = front % 2 === 0 ? 1 : 0
    // If we were paused mid morph, finish it now instead of holding a half melted word.
    const wait = t.get() === 1 - target ? interval : 0
    const id = window.setTimeout(() => {
      controls = animate(t, target, {
        duration,
        ease: EASE,
        onComplete: () => {
          if (live) setFront((f) => f + 1)
        },
      })
    }, wait)
    return () => {
      live = false
      window.clearTimeout(id)
      controls?.stop()
    }
  }, [front, inView, reduce, interval, duration, n, t])

  const wordA = words[(front % 2 === 0 ? front : front + 1) % n] ?? ""
  const wordB = words[(front % 2 === 1 ? front : front + 1) % n] ?? ""

  return (
    <p ref={ref} data-slot="morphing-text" className={cn("mx-auto max-w-3xl text-center text-4xl font-medium tracking-[-0.045em] text-balance text-fg sm:text-5xl", className)}>
      <span className="sr-only">{words.join(". ")}</span>
      <span aria-hidden className="inline-grid w-full">
        {/* Every phrase sits invisibly in the same cell, so the slot is always tall enough for the longest one at this width. */}
        {words.map((w, i) => (
          <span key={i} className="invisible col-start-1 row-start-1">
            {w}
          </span>
        ))}
        {reduce ? (
          <span className="col-start-1 row-start-1">{words[0]}</span>
        ) : (
          <>
            <motion.span className="col-start-1 row-start-1 will-change-[filter,opacity]" style={{ filter: filterA, opacity: opacityA, scale: scaleA }}>
              {wordA}
            </motion.span>
            <motion.span className="col-start-1 row-start-1 will-change-[filter,opacity]" style={{ filter: filterB, opacity: opacityB, scale: scaleB }}>
              {wordB}
            </motion.span>
          </>
        )}
      </span>
    </p>
  )
}

export { MorphingText }
export type { MorphingTextProps }
