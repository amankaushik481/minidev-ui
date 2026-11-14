"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * EmailPreviewFrame — an inbox-style frame around an email preview showing the sender and subject line.
 *
 * Use in template editors and notification settings to show what a message
 * will look like. Put an `EmailLayout` inside it.
 *
 * @example
 * <EmailPreviewFrame subject="Your invoice from Lumen" from="billing@lumen.dev">
 *   <EmailLayout>...</EmailLayout>
 * </EmailPreviewFrame>
 */
type EmailPreviewFrameProps = {
  /** Subject line. */
  subject: string
  /** Sender address. */
  from?: string
  /** The email body, usually an `EmailLayout`. */
  children: React.ReactNode
  className?: string
}

function EmailPreviewFrame({ subject, from = "hello@minidev.pro", children, className }: EmailPreviewFrameProps) {
  return (
    <div data-slot="email-preview-frame" className={cn("overflow-hidden rounded-2xl border border-border bg-sunken", className)}>
      <div className="space-y-1 border-b border-border bg-surface px-4 py-3">
        <p className="text-xs text-fg-muted">
          From <span className="text-fg">{from}</span>
        </p>
        <p className="text-sm font-medium text-fg">
          <span className="sr-only">Subject: </span>
          {subject}
        </p>
      </div>
      <div className="bg-bg p-4">{children}</div>
    </div>
  )
}
export { EmailPreviewFrame }
export type { EmailPreviewFrameProps }
