"use client"
import * as React from "react"
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { Button } from "@/registry/ui/button"

function StickyCtaBar({
  title = "Ready when you are",
  className,
}: {
  title?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [show, setShow] = React.useState(false)
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 320))
  return (
    <motion.div
      data-slot="sticky-cta-bar"
      data-tier="premium"
      initial={false}
      animate={reduce ? { y: show ? 0 : 80 } : { y: show ? 0 : 96 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={cn(
        "fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[min(640px,calc(100%-2rem))] items-center justify-between gap-3 rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)] backdrop-blur-sm",
        className
      )}
    >
      <p className="text-sm font-medium text-fg">{title}</p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline">Docs</Button>
        <MagneticCta size="sm">Get Premium</MagneticCta>
      </div>
    </motion.div>
  )
}
export { StickyCtaBar }
