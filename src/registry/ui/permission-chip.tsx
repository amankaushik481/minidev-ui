"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * PermissionChip — a small uppercase chip showing an access level: admin, write or read.
 *
 * Admin is accent-tinted, write is filled, read is quiet, so levels scan at a glance
 * in member tables. Screen readers hear "admin access". For arbitrary labels use
 * Badge; for live status use StatusBadge.
 *
 * @example
 * <PermissionChip level="write" />
 */
const tones = {
  admin: "border-accent-line bg-accent-soft text-accent-fg",
  write: "border-border bg-sunken text-fg",
  read: "border-border bg-surface text-fg-muted",
} as const

type PermissionLevel = keyof typeof tones

type PermissionChipProps = {
  /** Access level shown on the chip. */
  level?: PermissionLevel
  className?: string
}

function PermissionChip({ level = "read", className }: PermissionChipProps) {
  return (
    <span
      data-slot="permission-chip"
      data-level={level}
      className={cn(
        "inline-flex h-6 items-center rounded-md border px-2 text-[11px] font-medium tracking-[0.01em] uppercase",
        tones[level],
        className
      )}
    >
      {level}
      <span className="sr-only"> access</span>
    </span>
  )
}
export { PermissionChip }
export type { PermissionChipProps, PermissionLevel }
