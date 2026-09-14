"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const tones = {
  production: "border-danger bg-surface text-fg",
  staging: "border-border bg-surface text-fg",
  development: "border-border bg-sunken text-fg",
} as const

function EnvBadge({
  env = "development",
  className,
}: {
  env?: keyof typeof tones
  className?: string
}) {
  return (
    <span
      data-slot="env-badge"
      className={cn(
        "inline-flex h-5 items-center rounded-md border px-1.5 text-[11px] font-medium tracking-[0.01em] uppercase",
        tones[env],
        className
      )}
    >
      {env}
    </span>
  )
}
export { EnvBadge }
