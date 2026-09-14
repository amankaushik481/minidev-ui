"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const tones = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-danger",
  offline: "bg-fg-subtle",
} as const

function PresenceDot({
  status = "offline",
  className,
  label,
}: {
  status?: keyof typeof tones
  className?: string
  label?: string
}) {
  return (
    <span
      data-slot="presence-dot"
      role="status"
      aria-label={label ?? status}
      className={cn("inline-block size-2.5 rounded-full", tones[status], className)}
    />
  )
}
export { PresenceDot }
