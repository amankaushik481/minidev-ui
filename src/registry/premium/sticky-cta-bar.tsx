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
        "fixed inset-x-0 bottom-3 z-40 mx-auto flex w-[min(640px,calc(100%-1.5rem))] flex-col gap-2 rounded-2xl border border-border bg-surface/95 px-3 py-3 shadow-highlight backdrop-blur-sm sm:bottom-4 sm:w-[min(640px,calc(100%-2rem))] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4",
        className
      )}
    >
      <p className="text-center text-sm font-medium text-fg sm:text-left">{title}</p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1 sm:flex-none">Docs</Button>
        <MagneticCta size="sm" className="flex-1 sm:flex-none [&_button]:w-full">Get Premium</MagneticCta>
      </div>
    </motion.div>
  )
}
export { StickyCtaBar }
