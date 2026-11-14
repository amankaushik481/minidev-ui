"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * PressQuote — a centred pull quote from a publication, with the source in small caps underneath.
 *
 * Use it for one line of real press coverage on a landing page. For a customer quote with a name,
 * role and avatar use a testimonial card. Only quote coverage you actually have.
 *
 * @example
 * <PressQuote quote="The calmest component kit we have used." source="Design Weekly" />
 */
function PressQuote({
  quote,
  source,
  cite,
  className,
}: {
  /** The quoted sentence, without quotation marks; they are added for you. */
  quote: string
  /** Publication or person the quote comes from. */
  source: string
  /** URL of the original article, set as the blockquote's `cite`. */
  cite?: string
  className?: string
}) {
  return (
    <figure data-slot="press-quote" className={cn("rounded-xl border border-border bg-sunken px-6 py-8 text-center", className)}>
      <blockquote cite={cite} className="text-lg font-medium tracking-[-0.008em] text-balance text-fg">“{quote}”</blockquote>
      <figcaption className="mt-3 text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{source}</figcaption>
    </figure>
  )
}
export { PressQuote }
