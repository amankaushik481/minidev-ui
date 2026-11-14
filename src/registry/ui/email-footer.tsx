"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/registry/ui/link"

/**
 * EmailFooter — the closing band of an email: sender address plus unsubscribe and preferences links.
 *
 * Use as the last child of `EmailLayout`. Marketing email must carry a
 * working unsubscribe link, so pass real URLs.
 *
 * @example
 * <EmailFooter
 *   address="Lumen Inc. · 548 Market St, San Francisco"
 *   unsubscribeHref="https://app.example.com/unsubscribe?t=abc"
 *   preferencesHref="https://app.example.com/settings/email"
 * />
 */
type EmailFooterProps = {
  /** Postal address or sender line. */
  address?: string
  /** URL of the one-click unsubscribe page. */
  unsubscribeHref?: string
  /** URL of the email preferences page. */
  preferencesHref?: string
  className?: string
}

function EmailFooter({ address = "MiniDev · San Francisco", unsubscribeHref = "#", preferencesHref = "#", className }: EmailFooterProps) {
  return (
    <div data-slot="email-footer" className={cn("space-y-2 border-t border-border bg-sunken px-6 py-5 text-center", className)}>
      <p className="text-xs text-fg-muted">{address}</p>
      <div className="flex justify-center gap-3 text-xs">
        <Link href={unsubscribeHref}>Unsubscribe</Link>
        <Link href={preferencesHref}>Preferences</Link>
      </div>
    </div>
  )
}
export { EmailFooter }
export type { EmailFooterProps }
