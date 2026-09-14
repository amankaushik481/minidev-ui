"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function EmailPreviewFrame({
  subject,
  from = "hello@minidev.pro",
  children,
  className,
}: {
  subject: string
  from?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="email-preview-frame" className={cn("overflow-hidden rounded-2xl border border-border bg-sunken", className)}>
      <div className="space-y-1 border-b border-border bg-surface px-4 py-3">
        <p className="text-xs text-fg-muted">From <span className="text-fg">{from}</span></p>
        <p className="text-sm font-medium text-fg">{subject}</p>
      </div>
      <div className="bg-bg p-4">{children}</div>
    </div>
  )
}
export { EmailPreviewFrame }
