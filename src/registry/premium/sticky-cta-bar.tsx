"use client"
import * as React from "react"
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { Button } from "@/registry/ui/button"

/**
 * A floating call-to-action bar that springs up from the bottom of the screen once the visitor has scrolled past the hero, and tucks away again at the top.
 * While hidden it is inert, so keyboard and screen-reader users never land on
 * buttons they cannot see. It moves on the snappy spring; reduced motion
 * shows and hides it instantly.
 *
 * Use it on long marketing pages where the hero CTA scrolls away. Reach for
 * the free StickyBar or PublishBar for in-product action bars, and
 * AnnouncementBar for a message pinned to the top.
 *
 * @example
 * <StickyCtaBar title="Close your books in a day" threshold={480} actions={<Button render={<a href="/signup" />}>Start free</Button>} />
 */
type StickyCtaBarProps = {
  /** Message on the left of the bar. */
  title?: string
  /** Pixels scrolled from the top before the bar appears. */
  threshold?: number
  /** Your buttons or links. Defaults to a sample Docs + Get started pair. */
  actions?: React.ReactNode
  className?: string
}

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const

function StickyCtaBar({ title = "Ready when you are", threshold = 320, actions, className }: StickyCtaBarProps) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [show, setShow] = React.useState(false)
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > threshold))
  return (
    <motion.div
      data-slot="sticky-cta-bar"
      data-tier="premium"
      data-state={show ? "open" : "closed"}
      role="region"
      aria-label={title}
      aria-hidden={!show}
      inert={!show}
      initial={false}
      animate={{ y: show ? "0%" : "130%" }}
      transition={reduce ? { duration: 0 } : SNAPPY}
      className={cn(
        "fixed inset-x-0 bottom-3 z-40 mx-auto flex w-[min(640px,calc(100%-1.5rem))] flex-col gap-2 rounded-2xl border border-border bg-raised px-3 py-3 shadow-lg sm:bottom-4 sm:w-[min(640px,calc(100%-2rem))] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4",
        className
      )}
    >
      <p className="text-center text-sm font-medium text-fg sm:text-left">{title}</p>
      <div className="flex gap-2">
        {actions ?? (
          <>
            <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
              Docs
            </Button>
            <MagneticCta size="sm" className="flex-1 sm:flex-none [&_button]:w-full">
              Get started
            </MagneticCta>
          </>
        )}
      </div>
    </motion.div>
  )
}
export { StickyCtaBar }
export type { StickyCtaBarProps }
