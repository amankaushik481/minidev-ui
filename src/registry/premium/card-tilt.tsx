"use client"
import * as React from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A card that tilts in 3D toward a mouse pointer, with an accent glare that follows it.
 *
 * Tilt and glare run on motion values, so moving the pointer never re-renders
 * React. Mouse only: touch and keyboard see a flat card, and reduced motion
 * keeps it flat too. Pass `children` for your own content, or `title` and
 * `body` for the built-in layout. Use it for a featured card or showcase
 * tile on marketing pages; for a flat spotlight panel use
 * CursorSpotlightPanel, and keep it out of product UI.
 *
 * @example
 * <CardTilt title="Crafted details" body="Every pixel, accounted for." />
 *
 * @example
 * <CardTilt maxTilt={6}><img src="/shot.png" alt="Dashboard" /></CardTilt>
 */
type CardTiltProps = {
  /** Heading of the built-in layout. Ignored when children are passed. */
  title?: string
  /** Body text of the built-in layout. Ignored when children are passed. */
  body?: string
  /** Replaces the built-in eyebrow, title and body. */
  children?: React.ReactNode
  /** Largest tilt in degrees at the card's edge. */
  maxTilt?: number
  className?: string
}

/** Pointer-follow spring: fast enough to track, damped so the card never wobbles. */
const FOLLOW = { stiffness: 260, damping: 28, mass: 0.9 }

function CardTilt({ title = "Crafted details", body = "Tilt responds to pointer. Reduced motion stays flat.", children, maxTilt = 10, className }: CardTiltProps) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt * 0.8, -maxTilt * 0.8]), FOLLOW)
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), FOLLOW)
  const glareX = useTransform(x, [-0.5, 0.5], [20, 80])
  const glareY = useTransform(y, [-0.5, 0.5], [20, 80])
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, color-mix(in oklch, var(--accent) 16%, transparent), transparent 55%)`

  return (
    <motion.div
      data-slot="card-tilt"
      data-tier="premium"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width - 0.5)
        y.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn("relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-raised", className)}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={reduce ? undefined : { background: glare }} />
      {children !== undefined ? (
        <div className="relative">{children}</div>
      ) : (
        <>
          <p className="relative text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Featured</p>
          <h3 className="relative mt-2 text-xl font-medium tracking-[-0.014em] text-fg">{title}</h3>
          <p className="relative mt-2 text-sm leading-[1.55] text-fg-muted">{body}</p>
        </>
      )}
    </motion.div>
  )
}
export { CardTilt }
export type { CardTiltProps }
