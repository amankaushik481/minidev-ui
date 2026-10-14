"use client"
import * as React from "react"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { ArrowRightIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A card that tilts toward the pointer in 3D, with a sliding glare and parallax children, and springs flat when the pointer leaves.
 * The glare moves across the face like light on a foil print. Children
 * marked `data-depth` float at their own parallax rate. Touch scrolls
 * straight through it; reduced motion keeps it flat.
 */
type TiltCardProps = {
  children?: React.ReactNode
  /** Maximum rotation in degrees on either axis. */
  maxTilt?: number
  /** Glare strength from 0 (off) to 1. */
  glare?: number
  /** Perspective distance in pixels; smaller is more dramatic. */
  perspective?: number
  /** Pixels of travel for a child with `data-depth="1"`; scale the number for more or less. */
  parallax?: number
  className?: string
}

/** The roll spring from the design spec: enough mass that the card settles rather than snaps. */
const ROLL = { stiffness: 260, damping: 28, mass: 0.9 }

function TiltCard({ children, maxTilt = 12, glare = 0.6, perspective = 900, parallax = 10, className }: TiltCardProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  // Pointer position across the card, -0.5 to 0.5 on each axis; the springs give it mass.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const lit = useMotionValue(0)
  const sx = useSpring(px, ROLL)
  const sy = useSpring(py, ROLL)
  const shine = useSpring(lit, ROLL)
  // The side under the pointer sinks, like a card pressed on a table.
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt])
  const gx = useTransform(sx, [-0.5, 0.5], [0, 100])
  const gy = useTransform(sy, [-0.5, 0.5], [0, 100])
  const glareLayer = useMotionTemplate`radial-gradient(ellipse 70% 60% at ${gx}% ${gy}%, var(--tilt-glare), transparent 70%)`
  const glareOpacity = useTransform(shine, (v) => v * Math.min(1, Math.max(0, glare)))

  // Parallax: every descendant with data-depth is moved straight on the DOM as the springs settle, no re-render.
  React.useEffect(() => {
    const root = ref.current
    if (!root) return
    const layers = () => Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"))
    if (reduce) {
      for (const el of layers()) el.style.transform = ""
      return
    }
    // Layers slide with the pointer and lift out of the card while it is lit, then settle back flat.
    const update = () => {
      const x = sx.get()
      const y = sy.get()
      const z = shine.get()
      for (const el of layers()) {
        const d = Number.parseFloat(el.dataset.depth ?? "0") || 0
        el.style.transform = `translate3d(${(x * parallax * d).toFixed(2)}px, ${(y * parallax * d).toFixed(2)}px, ${(z * d * 14).toFixed(1)}px)`
      }
    }
    update()
    const offX = sx.on("change", update)
    const offY = sy.on("change", update)
    const offZ = shine.on("change", update)
    return () => {
      offX()
      offY()
      offZ()
    }
  }, [sx, sy, shine, parallax, reduce])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(Math.min(0.5, Math.max(-0.5, (e.clientX - r.left) / r.width - 0.5)))
    py.set(Math.min(0.5, Math.max(-0.5, (e.clientY - r.top) / r.height - 0.5)))
    lit.set(1)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
    lit.set(0)
  }

  return (
    <motion.div
      ref={ref}
      data-slot="tilt-card"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerCancel={onLeave}
      style={
        reduce
          ? undefined
          : ({
              rotateX,
              rotateY,
              transformPerspective: perspective,
              transformStyle: "preserve-3d",
              "--tilt-glare": "light-dark(color-mix(in oklch, var(--accent) 30%, transparent), color-mix(in oklch, var(--ink) 22%, transparent))",
            } as React.CSSProperties)
      }
      className={cn("relative mx-auto w-[340px] max-w-full rounded-2xl border border-border bg-surface p-6 shadow-raised", className)}
    >
      {!reduce ? (
        <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glareLayer, opacity: glareOpacity }} />
      ) : null}
      <div className="relative [transform-style:preserve-3d]">
        {children ?? (
          <>
            <div data-depth="0.5" className="flex items-center justify-between">
              <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">Lumen Pro</span>
              <span className="text-xs text-fg-subtle">Billed yearly</span>
            </div>
            <p data-depth="1" className="mt-5 text-4xl font-medium tracking-[-0.04em] text-fg tabular-nums">
              $24<span className="text-base font-normal tracking-normal text-fg-muted"> / month</span>
            </p>
            <p className="mt-1 text-sm leading-[1.6] text-fg-muted">For teams closing more than 100 invoices a month.</p>
            <ul data-depth="0.5" className="mt-5 space-y-2.5">
              {["Unlimited invoices and customers", "Reminders that send themselves", "Multi-currency with live rates", "Priority support, 2h response"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-fg">
                  <CheckIcon className="size-4 shrink-0 text-accent-fg" strokeWidth={2.25} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div data-depth="1.2" className="mt-6">
              <Button className="w-full">
                Start free trial <ArrowRightIcon />
              </Button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export { TiltCard }
export type { TiltCardProps }
