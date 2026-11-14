"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A sunken, bordered box that sets content back from the page: notes, code samples, read-only summaries.
 *
 * Accepts every `<div>` prop. Use `Card` for raised, primary content, `Callout` or `InlineAlert` for messages with a tone, and `Inset` for padding without a frame.
 *
 * @example
 * <Well>Payouts land in your bank 2 business days after an invoice is paid.</Well>
 */
type WellProps = React.ComponentProps<"div">

function Well({ className, ...props }: WellProps) {
  return (
    <div
      data-slot="well"
      className={cn("rounded-xl border border-border bg-sunken p-4 text-sm leading-[1.55] text-fg shadow-highlight", className)}
      {...props}
    />
  )
}
export { Well }
export type { WellProps }
