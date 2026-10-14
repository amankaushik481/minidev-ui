"use client"
import * as React from "react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A row of overlapping avatars where hovering or focusing one pops up a name and role card that leans and slides with the pointer.
 * The card rises on a spring, tilts a few degrees toward the pointer as it
 * crosses the face, and settles back when it leaves. Keyboard focus opens
 * the same card centred; Escape closes it. Reduced motion shows and hides
 * the card instantly with no tilt.
 */
type AnimatedTooltipPerson = {
  name: string
  role: string
  /** Avatar image. Initials are shown without one. */
  src?: string
  /** Override the initials derived from the name. */
  initials?: string
}

type AnimatedTooltipProps = {
  people?: AnimatedTooltipPerson[]
  /** Avatar diameter in pixels. */
  size?: number
  /** Index of a card to show before any hover. Defaults to the second person for the built-in sample only. */
  defaultActive?: number
  /** Called when an avatar is clicked or activated with the keyboard. */
  onSelect?: (person: AnimatedTooltipPerson, index: number) => void
  className?: string
}

const TEAM: AnimatedTooltipPerson[] = [
  { name: "Maya Chen", role: "Founder, Lumen" },
  { name: "Theo Okafor", role: "Head of Engineering" },
  { name: "Priya Raman", role: "Product Designer" },
  { name: "Sam Lowe", role: "Finance Lead" },
  { name: "Noor Haddad", role: "Customer Success" },
]

const TINTS = ["bg-accent-soft text-accent-fg", "bg-ink text-on-ink", "bg-sunken text-fg", "bg-accent text-on-accent", "bg-surface text-fg-muted border border-border"]

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const
const LEAN = { stiffness: 300, damping: 24, mass: 0.7 }

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("")
}

function AnimatedTooltip({ people, size = 44, defaultActive, onSelect, className }: AnimatedTooltipProps) {
  const reduce = useReducedMotion()
  const list = people ?? TEAM
  const id = React.useId()
  const [active, setActive] = React.useState<number | null>(defaultActive ?? (people === undefined ? 1 : null))
  // -0.5 at the left edge of the face, 0.5 at the right. One set of values serves every card, since only one is open.
  const x = useMotionValue(0)
  const rotate = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), LEAN)
  const shift = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), LEAN)

  return (
    <div data-slot="animated-tooltip" data-tier="premium" className={cn("mx-auto flex w-fit items-center", className)}>
      {list.map((p, i) => {
        const open = active === i
        const tipId = `${id}-${i}`
        return (
          <span key={`${p.name}-${i}`} className="relative" style={{ marginLeft: i ? -Math.round(size * 0.22) : 0, zIndex: open ? 20 : undefined }}>
            <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2.5 -translate-x-1/2">
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.span
                    key="card"
                    id={tipId}
                    role="tooltip"
                    data-slot="animated-tooltip-card"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.9 }}
                    transition={reduce ? { duration: 0 } : SNAPPY}
                    style={reduce ? undefined : { rotate, x: shift }}
                    className="relative block origin-bottom rounded-lg bg-ink px-3 py-1.5 text-left whitespace-nowrap shadow-overlay"
                  >
                    <span className="block text-xs font-medium text-on-ink">{p.name}</span>
                    <span className="block text-[11px] text-on-ink/70">{p.role}</span>
                    <span aria-hidden className="absolute top-full left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[1px] bg-ink" />
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </span>
            <motion.button
              type="button"
              aria-label={`${p.name}, ${p.role}`}
              aria-describedby={open ? tipId : undefined}
              data-slot="animated-tooltip-avatar"
              data-state={open ? "open" : "closed"}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActive(i)
              }}
              onPointerMove={(e) => {
                if (reduce || e.pointerType !== "mouse") return
                const r = e.currentTarget.getBoundingClientRect()
                x.set(Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5)))
              }}
              onPointerLeave={(e) => {
                if (e.pointerType !== "mouse") return
                x.set(0)
                setActive((a) => (a === i ? null : a))
              }}
              onFocus={() => {
                x.set(0)
                setActive(i)
              }}
              onBlur={() => setActive((a) => (a === i ? null : a))}
              onKeyDown={(e) => {
                if (e.key === "Escape") setActive(null)
              }}
              onClick={() => {
                setActive((a) => (a === i ? null : i))
                onSelect?.(p, i)
              }}
              whileHover={reduce ? undefined : { scale: 1.1 }}
              transition={reduce ? { duration: 0 } : SNAPPY}
              className={cn(
                "relative grid shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full font-medium ring-2 ring-bg outline-none select-none",
                "focus-visible:ring-accent",
                !p.src && TINTS[i % TINTS.length]
              )}
              style={{ width: size, height: size, fontSize: Math.round(size * 0.32) }}
            >
              {p.src ? (
                <img src={p.src} alt="" className="size-full object-cover" />
              ) : (
                <span aria-hidden>{p.initials ?? initialsOf(p.name)}</span>
              )}
            </motion.button>
          </span>
        )
      })}
    </div>
  )
}

export { AnimatedTooltip }
export type { AnimatedTooltipProps, AnimatedTooltipPerson }
