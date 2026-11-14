"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { PartyPopperIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A button that bursts confetti from itself on click, for celebrating a finished action.
 *
 * A few dozen paper pieces with gravity, drag and spin are drawn on a
 * throwaway canvas and cleaned up when they land; physics are time based, so
 * 60 and 120Hz screens fall at the same speed. No library. Reduced motion
 * skips the burst and keeps the click. It takes every native button prop.
 * Use it for "you did it" moments (first invoice sent, plan upgraded), not
 * for routine saves; for a normal action use Button.
 *
 * @example
 * <ConfettiButton onClick={publish}>Publish</ConfettiButton>
 */
type ConfettiButtonProps = React.ComponentProps<"button"> & {
  /** Number of pieces per burst. */
  count?: number
  /** Piece colours, any CSS colour. Defaults to the accent, accent-2, success, warning and info tokens. */
  colors?: string[]
}

function burst(el: HTMLElement, count: number, colors: string[]) {
  const r = el.getBoundingClientRect()
  const c = document.createElement("canvas")
  const dpr = window.devicePixelRatio || 1
  c.width = innerWidth * dpr
  c.height = innerHeight * dpr
  Object.assign(c.style, { position: "fixed", inset: "0", width: "100vw", height: "100vh", pointerEvents: "none", zIndex: "9999" })
  document.body.appendChild(c)
  const ctx = c.getContext("2d")!
  ctx.scale(dpr, dpr)
  const ox = r.left + r.width / 2
  const oy = r.top + r.height / 2
  const parts = Array.from({ length: count }, () => {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.6
    const v = 7 + Math.random() * 7
    return { x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: 6 + Math.random() * 5, h: 8 + Math.random() * 8, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, color: colors[Math.floor(Math.random() * colors.length)], life: 0 }
  })
  let raf = 0
  let last = 0
  const tick = (now: number) => {
    // Steps are in 60fps frames, so the fall looks the same at any refresh rate. Capped after a tab switch.
    const k = last ? Math.min(3, (now - last) / (1000 / 60)) : 1
    last = now
    const drag = Math.pow(0.985, k)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    let alive = 0
    for (const p of parts) {
      p.life += k
      p.vy += 0.28 * k
      p.vx *= drag
      p.vy *= drag
      p.x += p.vx * k
      p.y += p.vy * k
      p.rot += p.vr * k
      if (p.y < innerHeight + 40 && p.life < 240) alive++
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = Math.max(0, 1 - p.life / 240)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.w / 2, (-p.h / 2) * Math.abs(Math.cos(p.rot * 2)), p.w, p.h * Math.abs(Math.cos(p.rot * 2)) + 1)
      ctx.restore()
    }
    if (alive) raf = requestAnimationFrame(tick)
    else c.remove()
  }
  raf = requestAnimationFrame(tick)
  return () => {
    cancelAnimationFrame(raf)
    c.remove()
  }
}

function ConfettiButton({ children = <><PartyPopperIcon className="size-4" /> Celebrate</>, count = 70, colors, className, onClick, ...props }: ConfettiButtonProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLButtonElement>(null)
  return (
    <button
      ref={ref}
      type="button"
      data-slot="confetti-button"
      onClick={(e) => {
        onClick?.(e)
        if (reduce || !ref.current) return
        const css = getComputedStyle(ref.current)
        const tokens = ["--accent", "--accent-2", "--success", "--warning", "--info"].map((v) => css.getPropertyValue(v).trim()).filter(Boolean)
        // No tokens in scope (e.g. styles not loaded): fall back to the button's own text colour.
        const palette = colors?.length ? colors : tokens.length ? tokens : [css.color]
        burst(ref.current, count, palette)
      }}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-[0.625rem] bg-ink px-5 text-[0.9375rem] font-medium text-on-ink shadow-ink outline-none transition-[background-color,translate] duration-150 hover:bg-ink-hover active:translate-y-[0.5px] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { ConfettiButton }
export type { ConfettiButtonProps }
