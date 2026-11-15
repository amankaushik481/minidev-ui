"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A small inline chip that cites a source in an AI answer: an optional numbered index plus the source name.
 *
 * Place it inline after the sentence it supports. It renders a button (open a SourceCard or side panel in `onClick`),
 * or a link when `href` is set. Other props (`onClick`, `aria-label`, `id`…) reach either element. For a full source preview use SourceCard; for attached files in a prompt use ContextPill.
 *
 * @example
 * <p>Refunds settle in 5-10 days <CitationChip index={1} href="https://docs.acme.example/refunds">Refund policy</CitationChip></p>
 */
type CitationChipProps = React.ComponentProps<"button"> & {
  /** Footnote number shown in accent before the label. */
  index?: number
  /** Renders an external link (opens in a new tab) instead of a button. */
  href?: string
}

const chip = cn(
  "inline-flex h-6 items-center gap-1 rounded-md border border-border bg-surface px-2 align-middle text-xs text-fg-muted",
  "outline-none transition-[border-color,color] duration-[70ms] ease-hairline",
  "hover:border-fg-subtle hover:text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
)

function CitationChip({ children, className, index, href, ...props }: CitationChipProps) {
  const content = (
    <>
      {index != null ? <span className="font-mono tabular-nums text-accent-fg">{index}</span> : null}
      {children}
    </>
  )
  if (href)
    return (
      <a {...(props as React.ComponentProps<"a">)} data-slot="citation-chip" href={href} target="_blank" rel="noreferrer" className={cn(chip, className)}>
        {content}
      </a>
    )
  return (
    <button type="button" data-slot="citation-chip" className={cn(chip, className)} {...props}>
      {content}
    </button>
  )
}
export { CitationChip }
export type { CitationChipProps }
