"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/*
 * SplitFlap: a departure-board display. Each character flips through the
 * alphabet to its target, top half falling over the bottom like a real
 * Solari board, with a staggered start per column so a whole row ripples.
 * Screen readers get the final text once; the flipping is decoration.
 */

const CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.-'/·"

type SplitFlapProps = {
  value?: string
  /** Pad or cut to this many cells. */
  length?: number
  /** Milliseconds per single flip. */
  speed?: number
  /** Extra delay per column, for the ripple. */
  stagger?: number
  size?: "sm" | "default" | "lg"
  /** Colour of the characters. */
  tone?: "default" | "accent" | "success" | "warning" | "danger"
  className?: string
}

const SIZE = {
  sm: "h-6 w-[17px] text-[13px] rounded-[3px]",
  default: "h-8 w-[22px] text-[17px] rounded-[4px]",
  lg: "h-12 w-8 text-[26px] rounded-[5px]",
}
const TONE = {
  default: "text-[oklch(0.96_0.01_90)]",
  accent: "text-accent",
  success: "text-[oklch(0.82_0.16_150)]",
  warning: "text-[oklch(0.86_0.15_85)]",
  danger: "text-[oklch(0.74_0.17_28)]",
}

function idx(c: string) {
  const i = CHARSET.indexOf(c.toUpperCase())
  return i < 0 ? 0 : i
}

function Cell({ target, speed, delay, size, tone }: { target: string; speed: number; delay: number; size: keyof typeof SIZE; tone: keyof typeof TONE }) {
  const reduce = useReducedMotion()
  const [cur, setCur] = React.useState(" ")
  const [next, setNext] = React.useState(" ")
  const [flip, setFlip] = React.useState(0)
  const curRef = React.useRef(" ")

  React.useEffect(() => {
    const goal = CHARSET[idx(target)]
    if (reduce) {
      curRef.current = goal
      setCur(goal)
      setNext(goal)
      return
    }
    let t: ReturnType<typeof setTimeout>
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
  }, [target, speed, delay, reduce])

  const half = "absolute inset-x-0 h-1/2 overflow-hidden bg-[linear-gradient(oklch(0.24_0.008_260),oklch(0.19_0.008_260))]"
  const glyph = (c: string, bottom?: boolean) => (
    <span className={cn("absolute inset-x-0 flex h-[200%] items-center justify-center", bottom ? "-top-full" : "top-0")}>{c}</span>
  )
  const animating = cur !== next
  return (
    <span className={cn("relative inline-block shrink-0 font-mono leading-none font-semibold [perspective:260px]", SIZE[size], TONE[tone])} aria-hidden>
      {/* static: next top, current bottom */}
      <span className={cn(half, "top-0 rounded-t-[inherit]")}>{glyph(next)}</span>
      <span className={cn(half, "bottom-0 rounded-b-[inherit] bg-[linear-gradient(oklch(0.2_0.008_260),oklch(0.16_0.008_260))]")}>{glyph(cur, true)}</span>
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
            className={cn(half, "bottom-0 origin-top rounded-b-[inherit] bg-[linear-gradient(oklch(0.2_0.008_260),oklch(0.16_0.008_260))] [backface-visibility:hidden]")}
            style={{ animation: `flap-bottom ${speed * 0.45}ms cubic-bezier(0,0,0.3,1.4) ${speed * 0.55}ms both` }}
          >
            {glyph(next, true)}
          </span>
        </>
      ) : null}
      {/* hinge */}
      <span className="absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-black/70" />
      <span className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_oklch(1_0_0/0.08),0_1px_2px_oklch(0_0_0/0.4)]" />
    </span>
  )
}

function SplitFlap({ value = "NOW BOARDING", length, speed = 70, stagger = 28, size = "default", tone = "default", className }: SplitFlapProps) {
  const text = length ? value.toUpperCase().padEnd(length, " ").slice(0, length) : value.toUpperCase()
  return (
    <span data-slot="split-flap" className={cn("inline-flex gap-[2px]", className)}>
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
