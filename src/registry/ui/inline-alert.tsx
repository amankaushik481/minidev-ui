"use client"
import * as React from "react"
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, TriangleAlertIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * InlineAlert — a bordered message inside the page flow, with a tone icon, an optional title and body text.
 *
 * Use it next to the thing it is about (a form, a settings section). For a
 * tinted aside in prose use Callout, for a page-wide strip use Banner or
 * AnnouncementBar, and for a transient confirmation use Toast.
 *
 * Danger and warning alerts use role="alert" so screen readers announce them
 * when they appear; neutral and success use role="status", which is polite.
 *
 * @example
 * <InlineAlert tone="warning" title="Action needed">Add a payment method to keep access.</InlineAlert>
 */
const icons = {
  neutral: InfoIcon,
  success: CheckCircle2Icon,
  warning: TriangleAlertIcon,
  danger: AlertCircleIcon,
} as const

type InlineAlertTone = keyof typeof icons

type InlineAlertProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Bold first line. */
  title?: React.ReactNode
  /** Body text or inline content. */
  children?: React.ReactNode
  /** Sets the icon, the icon colour and the border colour. */
  tone?: InlineAlertTone
}

const ICON_TONE: Record<InlineAlertTone, string> = {
  neutral: "text-fg-muted",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
}

function InlineAlert({ title, children, tone = "neutral", className, ...props }: InlineAlertProps) {
  const Icon = icons[tone]
  return (
    <div
      data-slot="inline-alert"
      data-tone={tone}
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-xl border border-border bg-surface p-3 text-sm shadow-highlight",
        tone === "danger" && "border-danger",
        tone === "warning" && "border-warning",
        tone === "success" && "border-success",
        className
      )}
      {...props}
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", ICON_TONE[tone])} aria-hidden />
      <div className="min-w-0">
        {title ? <p className="font-medium text-fg">{title}</p> : null}
        {children ? <div className={cn("text-pretty text-fg", title && "mt-1")}>{children}</div> : null}
      </div>
    </div>
  )
}
export { InlineAlert }
export type { InlineAlertProps, InlineAlertTone }
