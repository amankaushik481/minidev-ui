"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Three small window frames that fan out from a stack into a tilted spread as they scroll into view.
 *
 * Decorative: the frames are skeletons, so the whole stack is one image to
 * screen readers, named by `label`. Frames spring into place once; reduced
 * motion shows the spread at once. Use it beside a hero headline (see
 * HeroEditorialSplit); to frame a real screenshot use BrowserMockup.
 *
 * @example
 * <DeviceFrameStack frames={["Mobile", "App", "Docs"]} label="Lumen on phone, web and docs" />
 */
type DeviceFrameStackProps = {
  /** Titles of the left, centre and right frames. */
  frames?: [string, string, string]
  /** Accessible description of the stack as a whole. */
  label?: string
  className?: string
}

const SPREAD = [
  { rotate: -5, x: -22, y: 14, z: 0 },
  { rotate: 0, x: 0, y: 0, z: 1 },
  { rotate: 4, x: 26, y: 16, z: 0 },
]

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function DeviceFrameStack({ frames = ["Mobile", "App", "Docs"], label = "Product previews on mobile, app and docs", className }: DeviceFrameStackProps) {
  const reduce = useReducedMotion()
  return (
    <div
      data-slot="device-frame-stack"
      data-tier="premium"
      role="img"
      aria-label={label}
      className={cn("relative mx-auto flex h-64 w-full max-w-lg items-center justify-center overflow-hidden sm:h-72", className)}
    >
      {SPREAD.map((f, i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={reduce ? false : { x: 0, y: 30, rotate: 0 }}
          whileInView={{ x: f.x, y: f.y, rotate: f.rotate }}
          viewport={{ once: true }}
          // whileInView still animates with initial={false}, so reduced motion needs an instant transition too.
          transition={reduce ? { duration: 0 } : { ...MORPH, delay: 0.1 + i * 0.08 }}
          style={{ zIndex: f.z + 1 }}
          className="absolute w-36 overflow-hidden rounded-xl border border-border bg-surface shadow-raised sm:w-44"
        >
          <div className="flex h-7 items-center gap-1 border-b border-border bg-sunken px-2">
            <span className="size-1.5 rounded-full bg-fg-subtle/50" />
            <span className="size-1.5 rounded-full bg-fg-subtle/50" />
            <span className="size-1.5 rounded-full bg-fg-subtle/50" />
            <span className="ml-2 truncate text-[10px] text-fg-muted">{frames[i]}</span>
          </div>
          <div className="space-y-2 p-3">
            <div className="h-2 w-3/4 rounded-sm bg-fg/10" />
            <div className="h-2 w-1/2 rounded-sm bg-fg/5" />
            <div className="mt-2 aspect-video rounded-md border border-border bg-sunken bg-[radial-gradient(circle_at_40%_30%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_65%)]" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
export { DeviceFrameStack }
export type { DeviceFrameStackProps }
