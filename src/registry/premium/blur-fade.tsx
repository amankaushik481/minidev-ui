"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { BellIcon, CircleCheckIcon, FileTextIcon, ReceiptIcon, ShieldCheckIcon, WalletIcon, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Reveals its children as they scroll into view, rising out of a soft blur and settling into focus on a spring.
 * Wrap each item of a list and grow the `delay` to stagger them. Reduced
 * motion shows everything in place at once.
 */
type BlurFadeProps = {
  children?: React.ReactNode
  /** Seconds to wait before the reveal starts; grow it per item to stagger a list. */
  delay?: number
  /** Seconds the reveal takes. */
  duration?: number
  /** Which way the content travels as it settles. */
  direction?: "up" | "down" | "left" | "right" | "none"
  /** Pixels of travel. */
  offset?: number
  /** Blur in pixels the content starts from. */
  blur?: number
  /** Reveal once, or again every time it enters the viewport. */
  once?: boolean
  /** How much of the element has to be visible before it reveals, 0 to 1. */
  amount?: number
  className?: string
}

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: ReceiptIcon, title: "Invoices that close themselves", body: "Send once. Lumen chases, reconciles and marks it paid." },
  { icon: WalletIcon, title: "Live cash view", body: "Every account and currency, one number you can trust." },
  { icon: FileTextIcon, title: "Reports on a schedule", body: "Board packs on the first Monday, written for you." },
  { icon: BellIcon, title: "Reminders with manners", body: "Polite, timed and escalating. Customers pay 9 days sooner." },
  { icon: CircleCheckIcon, title: "Approvals anywhere", body: "Approve a bill from your phone in one tap." },
  { icon: ShieldCheckIcon, title: "A full audit trail", body: "Every change, who made it and why, kept forever." },
]

function BlurFade({ children, delay = 0, duration = 0.5, direction = "up", offset = 16, blur = 8, once = true, amount = 0.3, className }: BlurFadeProps) {
  const reduce = useReducedMotion()
  const from = {
    opacity: 0,
    filter: `blur(${blur}px)`,
    x: direction === "left" ? offset : direction === "right" ? -offset : 0,
    y: direction === "up" ? offset : direction === "down" ? -offset : 0,
  }
  const to = { opacity: 1, filter: "blur(0px)", x: 0, y: 0 }
  // Position settles on the morph spring; opacity and blur are tweened so they never overshoot.
  const transition = reduce
    ? { duration: 0 }
    : {
        x: { type: "spring" as const, bounce: 0.16, duration: Math.max(0.1, duration * 1.4), delay },
        y: { type: "spring" as const, bounce: 0.16, duration: Math.max(0.1, duration * 1.4), delay },
        opacity: { duration, delay, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
        filter: { duration, delay, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
      }

  if (children === undefined) {
    return (
      <div data-slot="blur-fade" className={cn("mx-auto grid w-full max-w-4xl gap-3 sm:grid-cols-3", className)}>
        {FEATURES.map((f, i) => (
          <BlurFade key={f.title} delay={delay + i * 0.08} duration={duration} direction={direction} offset={offset} blur={blur} once={once} amount={amount}>
            <div className="h-full rounded-2xl border border-border bg-surface p-5 shadow-raised">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent-fg">
                <f.icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
              </span>
              <p className="mt-4 text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">{f.title}</p>
              <p className="mt-1 text-[0.8125rem] leading-[1.55] text-fg-muted">{f.body}</p>
            </div>
          </BlurFade>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      data-slot="blur-fade"
      initial={reduce ? false : from}
      whileInView={to}
      viewport={{ once, amount }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export { BlurFade }
export type { BlurFadeProps }
