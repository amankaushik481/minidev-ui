"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const tones = {
  admin: "border-border bg-surface text-fg",
  write: "border-border bg-sunken text-fg",
  read: "border-border bg-surface text-fg",
} as const

function PermissionChip({
  level = "read",
  className,
}: {
  level?: keyof typeof tones
  className?: string
}) {
  return (
    <span
      data-slot="permission-chip"
      className={cn(
        "inline-flex h-6 items-center rounded-md border px-2 text-[11px] font-medium tracking-[0.01em] uppercase",
        tones[level],
        className
      )}
    >
      {level}
    </span>
  )
}
export { PermissionChip }
