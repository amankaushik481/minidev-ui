"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const tones = {
  info: "border-border bg-sunken text-fg",
  success: "border-success/30 bg-success/5 text-fg",
  warning: "border-warning/30 bg-warning/5 text-fg",
  danger: "border-danger/30 bg-danger/5 text-fg",
} as const

function Callout({
  className,
  tone = "info",
  title,
  children,
  ...props
}: React.ComponentProps<"div"> & { tone?: keyof typeof tones; title?: string }) {
  return (
    <div
      data-slot="callout"
      role="note"
      className={cn("rounded-xl border px-4 py-3 text-sm", tones[tone], className)}
      {...props}
    >
      {title ? <p className="mb-1 font-medium text-fg">{title}</p> : null}
      <div className="text-fg-muted">{children}</div>
    </div>
  )
}
export { Callout }
