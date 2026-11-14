"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Inset — a sunken, bordered well that sets content below the surrounding surface.
 *
 * Use it inside a card or panel to hold secondary content (a code sample, an
 * embedded preview, read-only details). For a raised container use Card, and
 * for a padded note block with body text styles use Well.
 *
 * @example
 * <Inset><p className="text-sm text-fg-muted">No payouts yet.</p></Inset>
 */
type InsetProps = React.ComponentProps<"div">

function Inset({ children, className, ...props }: InsetProps) {
  return (
    <div data-slot="inset" className={cn("rounded-xl border border-border bg-sunken p-4 md:p-6", className)} {...props}>
      {children}
    </div>
  )
}
export { Inset }
export type { InsetProps }
