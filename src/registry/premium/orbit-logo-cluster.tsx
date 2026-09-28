"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function OrbitLogoCluster({
  center = "MD",
  logos = ["Acme", "Nova", "Orbit", "Pulse", "Stack", "Voxel"],
  className,
}: {
  center?: string
  logos?: string[]
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <div
      data-slot="orbit-logo-cluster"
      data-tier="premium"
      className={cn("relative mx-auto aspect-square w-full max-w-md", className)}
    >
      <div className="absolute inset-[18%] rounded-full border border-border" aria-hidden />
      <div className="absolute inset-[32%] rounded-full border border-border/70" aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-sm font-medium text-fg shadow-highlight">
          {center}
        </div>
      </div>
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {logos.map((logo, i) => {
          const a = (i / logos.length) * Math.PI * 2
          const r = 42
          const x = 50 + Math.cos(a) * r
          const y = 50 + Math.sin(a) * r
          return (
            <div
              key={logo}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-fg"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.span
                animate={reduce ? undefined : { rotate: -360 }}
                transition={reduce ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }}
                className="block"
              >
                {logo}
              </motion.span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
export { OrbitLogoCluster }
