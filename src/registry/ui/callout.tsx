"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A tinted note inside content: optional title and body, in info, success, warning or danger.
 *
 * Use in docs, forms and settings to point out something the reader should know. Prefer `Banner`
 * for page-level notices, `InlineAlert` for form errors and status with an icon, and `Toast` for
 * transient feedback. It is a static `role="note"`, not a live region.
 *
 * @example
 * <Callout tone="warning" title="Invoices are final">Sent invoices cannot be edited, only voided.</Callout>
 */
type CalloutTone = "info" | "success" | "warning" | "danger"

type CalloutProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Tint of the border and background. */
  tone?: CalloutTone
  /** Bold first line. */
  title?: React.ReactNode
}

const tones: Record<CalloutTone, string> = {
  info: "border-border bg-sunken text-fg",
  success: "border-success/30 bg-success/5 text-fg",
  warning: "border-warning/30 bg-warning/5 text-fg",
  danger: "border-danger/30 bg-danger/5 text-fg",
}

function Callout({ className, tone = "info", title, children, ...props }: CalloutProps) {
  return (
    <div
      data-slot="callout"
      data-tone={tone}
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
export type { CalloutProps, CalloutTone }
