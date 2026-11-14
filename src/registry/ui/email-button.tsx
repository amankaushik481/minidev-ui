"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * EmailButton — the primary call-to-action link inside an email template, styled as an ink button.
 *
 * It is an <a>, because email clients follow links, not buttons. Use one per
 * email inside `EmailLayout`. For buttons in the app use `Button`.
 *
 * @example
 * <EmailButton href="https://app.example.com/invoices/2041">View invoice</EmailButton>
 */
type EmailButtonProps = {
  /** Button text. */
  children: React.ReactNode
  /** Absolute URL the email links to. */
  href?: string
  className?: string
}

function EmailButton({ children, href = "#", className }: EmailButtonProps) {
  return (
    <a
      data-slot="email-button"
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg bg-ink px-4 text-sm font-medium text-on-ink shadow-ink outline-none",
        "transition-[background-color] duration-[70ms] hover:bg-ink-hover",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
    >
      {children}
    </a>
  )
}
export { EmailButton }
export type { EmailButtonProps }
