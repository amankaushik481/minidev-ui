"use client"
import * as React from "react"
import { ArrowLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A quiet "← Back" link to the parent page, placed above a page title.
 *
 * Use on detail pages ("← Invoices"). Prefer `Breadcrumb` when the hierarchy is deeper than one
 * level. It is a real link (`<a href>`), so it works without JavaScript and opens in a new tab;
 * for Next.js client navigation pass `onClick` with `router.push`, or wrap your own `Link`.
 * The arrow nudges left on hover.
 *
 * @example
 * <BackLink href="/invoices">Invoices</BackLink>
 */
type BackLinkProps = React.ComponentProps<"a"> & {
  /** Parent page URL. */
  href?: string
  /** Link text; name the destination ("Invoices"), not just "Back". */
  children?: React.ReactNode
}

function BackLink({ href = "#", children = "Back", className, ...props }: BackLinkProps) {
  return (
    <a
      data-slot="back-link"
      href={href}
      className={cn(
        "group/back inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-fg-muted outline-none transition-[color] duration-[70ms]",
        "hover:text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
      {...props}
    >
      <ArrowLeftIcon className="size-3.5 transition-transform duration-[140ms] ease-hairline group-hover/back:-translate-x-0.5" aria-hidden />
      {children}
    </a>
  )
}
export { BackLink }
export type { BackLinkProps }
