"use client"
import * as React from "react"
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, TriangleAlertIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const icons = {
  neutral: InfoIcon,
  success: CheckCircle2Icon,
  warning: TriangleAlertIcon,
  danger: AlertCircleIcon,
} as const

function InlineAlert({
  title,
  children,
  tone = "neutral",
  className,
}: {
  title?: React.ReactNode
  children?: React.ReactNode
  tone?: keyof typeof icons
  className?: string
}) {
  const Icon = icons[tone]
  return (
    <div
      data-slot="inline-alert"
      role="alert"
      className={cn(
        "flex gap-3 rounded-xl border border-border bg-surface p-3 text-sm shadow-[inset_0_1px_0_oklch(1_0_0/0.45)]",
        tone === "danger" && "border-danger",
        tone === "warning" && "border-warning",
        tone === "success" && "border-success",
        className
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0 text-fg" aria-hidden />
      <div className="min-w-0">
        {title ? <p className="font-medium text-fg">{title}</p> : null}
        {children ? <p className={cn("text-fg", title && "mt-1")}>{children}</p> : null}
      </div>
    </div>
  )
}
export { InlineAlert }
