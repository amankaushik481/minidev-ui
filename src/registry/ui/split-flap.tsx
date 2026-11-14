"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A departure-board display where each character flips through the alphabet to its target, rippling across the row like a Solari board.
 *
 * Top half falls over the bottom with a staggered start per column.
 * Screen readers get the final text once; the flipping is decoration.
 *
 * The board is always dark (it scopes the dark tokens to itself). Supported
 * characters: A-Z, 0-9, space and : . - ' / ·; anything else shows blank.
 * Use it for a headline status or a launch moment; for a changing number
 * in a dashboard use NumberRoll, which is quieter.
 *
 * @example
 * <SplitFlap value="GATE 12" length={8} tone="accent" />
 */

const CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.-'/·"

type SplitFlapProps = {
  /** Text to flip to. Change it to flip again from the current characters. */
  value?: string
  /** Pad or cut to this many cells. */
  length?: number
  /** Milliseconds per single flip. */
  speed?: number
  /** Extra delay per column, for the ripple. */
  stagger?: number
  /** Cell size: 24px, 32px or 48px tall. */
  size?: "sm" | "default" | "lg"
  /** Colour of the characters. */
  tone?: "default" | "accent" | "success" | "warning" | "danger"
  className?: string
}

const SIZE = {
  sm: "h-6 w-[18px] text-sm rounded-[4px]",
  default: "h-8 w-[22px] text-lg rounded-[4px]",
  lg: "h-12 w-8 text-[26px] rounded-[6px]",
}
const TONE = {
  default: "text-fg",
  accent: "text-accent-fg",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
}

function idx(c: string) {
  const i = CHARSET.indexOf(c.toUpperCase())
  return i < 0 ? 0 : i
}

function Cell({ target, speed, delay, size, tone }: { target: string; speed: number; delay: number; size: keyof typeof SIZE; tone: keyof typeof TONE }) {
  const reduce = useReducedMotion()
  const [curState, setCur] = React.useState(" ")
  const [nextState, setNext] = React.useState(" ")
  const [flip, setFlip] = React.useState(0)
  const curRef = React.useRef(" ")

  const goal = CHARSET[idx(target)]

  React.useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (reduce) {
      // render shows the goal directly; sync state after paint so a later motion change starts from it
      curRef.current = goal
      t = setTimeout(() => {
        setCur(goal)
        setNext(goal)
      })
      return () => clearTimeout(t)
    }
    const step = () => {
      const c = curRef.current
      if (c === goal) return
      const n = CHARSET[(idx(c) + 1) % CHARSET.length]
      setNext(n)
      setFlip((f) => f + 1)
      t = setTimeout(() => {
        curRef.current = n
        setCur(n)
        t = setTimeout(step, 8)
      }, speed)
    }
    t = setTimeout(step, delay)
    return () => clearTimeout(t)
  }, [goal, speed, delay, reduce])

  const half = "absolute inset-x-0 h-1/2 overflow-hidden bg-linear-to-b from-raised to-surface"
  const glyph = (c: string, bottom?: boolean) => (
    <span className={cn("absolute inset-x-0 flex h-[200%] items-center justify-center", bottom ? "-top-full" : "top-0")}>{c}</span>
  )
  const cur = reduce ? goal : curState
  const next = reduce ? goal : nextState
  const animating = cur !== next
  return (
    <span className={cn("relative inline-block shrink-0 font-mono leading-none font-semibold [perspective:260px]", SIZE[size], TONE[tone])} aria-hidden>
      {/* static: next top, current bottom */}
      <span className={cn(half, "top-0 rounded-t-[inherit]")}>{glyph(next)}</span>
      <span className={cn(half, "bottom-0 rounded-b-[inherit] from-surface to-sunken")}>{glyph(cur, true)}</span>
      {animating ? (
        <>
          <span
            key={`t${flip}`}
            className={cn(half, "top-0 origin-bottom rounded-t-[inherit] [backface-visibility:hidden]")}
            style={{ animation: `flap-top ${speed * 0.55}ms cubic-bezier(0.4,0,1,1) forwards` }}
          >
            {glyph(cur)}
          </span>
          <span
            key={`b${flip}`}
            className={cn(half, "bottom-0 origin-top rounded-b-[inherit] from-surface to-sunken [backface-visibility:hidden]")}
            style={{ animation: `flap-bottom ${speed * 0.45}ms cubic-bezier(0,0,0.3,1.4) ${speed * 0.55}ms both` }}
          >
            {glyph(next, true)}
          </span>
        </>
      ) : null}
      {/* hinge */}
      <span className="absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-bg" />
      <span className="absolute inset-0 rounded-[inherit] shadow-raised" />
    </span>
  )
}

function SplitFlap({ value = "NOW BOARDING", length, speed = 70, stagger = 28, size = "default", tone = "default", className }: SplitFlapProps) {
  const text = length ? value.toUpperCase().padEnd(length, " ").slice(0, length) : value.toUpperCase()
  return (
    // `dark` scopes the dark tokens: a flap board reads as a dark object in either theme
    <span data-slot="split-flap" className={cn("dark inline-flex gap-0.5", className)}>
      <span className="sr-only">{value}</span>
      {text.split("").map((c, i) => (
        <Cell key={i} target={c} speed={speed} delay={i * stagger} size={size} tone={tone} />
      ))}
      <style>{`@keyframes flap-top{from{transform:rotateX(0)}to{transform:rotateX(-90deg)}}@keyframes flap-bottom{from{transform:rotateX(90deg)}to{transform:rotateX(0)}}`}</style>
    </span>
  )
}

export { SplitFlap }
export type { SplitFlapProps }
