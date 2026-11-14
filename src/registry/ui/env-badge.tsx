"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * EnvBadge — a tiny uppercase label naming the deployment environment; production gets a danger edge.
 *
 * Use beside API keys, deploy rows and headers so nobody mistakes prod for
 * staging. To switch environments use `EnvSwitcher`; for general status use
 * `StatusBadge`.
 *
 * @example
 * <EnvBadge env="production" />
 */
const tones = {
  production: "border-danger bg-surface text-fg",
  staging: "border-border bg-surface text-fg",
  development: "border-border bg-sunken text-fg",
} as const

type Environment = keyof typeof tones

type EnvBadgeProps = {
  /** Which environment to name. */
  env?: "production" | "staging" | "development"
  className?: string
}

function EnvBadge({ env = "development", className }: EnvBadgeProps) {
  return (
    <span
      data-slot="env-badge"
      data-env={env}
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
export type { EnvBadgeProps, Environment }
