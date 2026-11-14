"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Link — an inline text link in the accent text colour, underlined on hover, with a visible focus ring.
 *
 * Use it for navigation in running text and help copy. For an action styled as
 * a link use Button with variant="link"; for a link that looks like a button
 * use Button with render={<a href="…" />}; for "back" navigation use BackLink.
 * With target="_blank" it adds rel="noopener noreferrer" unless you pass rel.
 * It renders a plain <a>; for client-side routing use your router's link with
 * the same classes.
 *
 * @example
 * <Link href="/docs/billing">Billing docs</Link>
 */
type LinkProps = React.ComponentProps<"a">

function Link({ className, target, rel, ...props }: LinkProps) {
  return (
    <a
      data-slot="link"
      target={target}
      rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
      className={cn(
        "rounded-sm text-sm font-medium text-accent-fg underline-offset-4 outline-none",
        "hover:underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
      {...props}
    />
  )
}
export { Link }
export type { LinkProps }
