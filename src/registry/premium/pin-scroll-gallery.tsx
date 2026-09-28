"use client"
import * as React from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

const frames = [
  { title: "Compose", body: "Free primitives for product UI." },
  { title: "Elevate", body: "Motion that earns the first screen." },
  { title: "Ship", body: "Preview, approve and publish in one flow." },
]

function PinScrollGallery({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(frames.length - 1) * 100}%`])

  if (reduce) {
    return (
      <div data-slot="pin-scroll-gallery" data-tier="premium" className={cn("grid gap-4 md:grid-cols-3", className)}>
        {frames.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-xl font-medium text-fg">{f.title}</h3>
            <p className="mt-2 text-sm text-fg-muted">{f.body}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} data-slot="pin-scroll-gallery" data-tier="premium" className={cn("relative h-[220vh]", className)}>
      <div className="sticky top-20 overflow-hidden">
        <motion.div style={{ x }} className="flex w-full">
          {frames.map((f) => (
            <div key={f.title} className="w-full shrink-0 px-2">
              <div className="rounded-2xl border border-border bg-surface p-10 shadow-highlight">
                <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Pinned story</p>
                <h3 className="mt-3 text-4xl font-medium tracking-[-0.026em] text-fg">{f.title}</h3>
                <p className="mt-3 max-w-md text-base leading-[1.55] text-fg-muted">{f.body}</p>
                <div className="mt-8 aspect-[16/9] rounded-xl border border-border bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--accent)_20%,transparent),transparent_60%)] bg-sunken" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
export { PinScrollGallery }
