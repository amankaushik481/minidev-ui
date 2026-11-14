"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * EmailLayout — the 560px email shell that holds header, body, cards and footer.
 *
 * Compose an email preview from `EmailHeader`, `EmailCard`, `EmailButton` and
 * `EmailFooter` inside it, and wrap the whole thing in `EmailPreviewFrame` to
 * show subject and sender. These parts render a preview in the app; inline
 * the styles before sending real mail.
 *
 * @example
 * <EmailLayout>
 *   <EmailHeader brand="Lumen" />
 *   <EmailCard title="Invoice INV-2041">$12,400.00 due Nov 30.</EmailCard>
 *   <div className="px-6 pb-6"><EmailButton href="https://app.example.com">Pay invoice</EmailButton></div>
 *   <EmailFooter />
 * </EmailLayout>
 */
type EmailLayoutProps = {
  /** Email sections, top to bottom. */
  children: React.ReactNode
  className?: string
}

function EmailLayout({ children, className }: EmailLayoutProps) {
  return (
    <div
      data-slot="email-layout"
      className={cn("mx-auto w-full max-w-[560px] overflow-hidden rounded-xl border border-border bg-surface text-fg shadow-highlight", className)}
    >
      {children}
    </div>
  )
}
export { EmailLayout }
export type { EmailLayoutProps }
