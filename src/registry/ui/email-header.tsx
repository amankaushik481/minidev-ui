"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * EmailHeader — the top band of an email template with the sender's brand name.
 *
 * Use as the first child of `EmailLayout`, above the body and any `EmailCard`. Pass `children`
 * to replace the brand text with a logo image (absolute URL, fixed width and height, and `alt`
 * set to the brand name). Its 24px side padding lines up with `EmailCard` and `EmailFooter`.
 *
 * @example
 * <EmailHeader brand="Lumen" />
 */
type EmailHeaderProps = {
  /** Brand name shown when no children are passed. */
  brand?: string
  /** Custom content, such as a logo image. Replaces the brand text. */
  children?: React.ReactNode
  className?: string
}

function EmailHeader({ brand = "MiniDev", children, className }: EmailHeaderProps) {
  return (
    <div data-slot="email-header" className={cn("border-b border-border bg-sunken px-6 py-5", className)}>
      {children ?? <p className="text-sm font-medium tracking-[0.005em] text-fg">{brand}</p>}
    </div>
  )
}
export { EmailHeader }
export type { EmailHeaderProps }
