"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * EmailCard — a bordered content block inside an email body, with an optional title.
 *
 * Use inside `EmailLayout` to group a receipt summary, a sign-in code or a callout. It has
 * `mx-6 my-4` built in to line up with `EmailHeader` and `EmailFooter`, so place it directly in
 * the layout, not inside another padded block. For the call to action use `EmailButton`; for
 * cards in the app use `Card`.
 *
 * @example
 * <EmailCard title="Invoice INV-2041">$12,400.00 due Nov 30.</EmailCard>
 */
type EmailCardProps = {
  /** Heading of the block. */
  title?: string
  /** Body text or markup. */
  children: React.ReactNode
  className?: string
}

function EmailCard({ title, children, className }: EmailCardProps) {
  return (
    <div data-slot="email-card" className={cn("mx-6 my-4 rounded-xl border border-border bg-bg p-4", className)}>
      {title ? <h3 className="mb-2 text-sm font-medium text-fg">{title}</h3> : null}
      <div className="text-sm leading-[1.55] text-fg-muted">{children}</div>
    </div>
  )
}
export { EmailCard }
export type { EmailCardProps }
