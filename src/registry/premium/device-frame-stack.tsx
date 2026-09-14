"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function DeviceFrameStack({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const frames = [
    { rotate: -5, x: -22, y: 14, z: 0, label: "Mobile" },
    { rotate: 0, x: 0, y: 0, z: 1, label: "App" },
    { rotate: 4, x: 26, y: 16, z: 0, label: "Docs" },
  ]
  return (
    <div
      data-slot="device-frame-stack"
      data-tier="premium"
      className={cn(
        "relative mx-auto flex h-64 w-full max-w-lg items-center justify-center overflow-hidden sm:h-72",
        className
      )}
    >
      {frames.map((f, i) => (
        <motion.div
          key={f.label}
          initial={reduce ? false : { y: 30, rotate: 0 }}
          whileInView={{ y: f.y, rotate: f.rotate, x: f.x }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 120, damping: 16 }}
          style={{ zIndex: f.z + 1 }}
          className="absolute w-36 overflow-hidden rounded-xl border border-border bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.55)] sm:w-44"
        >
          <div className="flex h-7 items-center gap-1 border-b border-border bg-sunken px-2">
            <span className="size-1.5 rounded-full bg-fg-subtle/50" />
            <span className="size-1.5 rounded-full bg-fg-subtle/50" />
            <span className="size-1.5 rounded-full bg-fg-subtle/50" />
            <span className="ml-2 truncate text-[10px] text-fg-muted">{f.label}</span>
          </div>
          <div className="space-y-2 p-3">
            <div className="h-2 w-3/4 rounded bg-fg/10" />
            <div className="h-2 w-1/2 rounded bg-fg/5" />
            <div className="mt-2 aspect-video rounded-md border border-border bg-[radial-gradient(circle_at_40%_30%,oklch(0.48_0.17_285/0.22),transparent_65%)] bg-sunken" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
export { DeviceFrameStack }
