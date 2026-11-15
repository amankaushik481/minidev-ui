"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { MetricDelta } from "@/registry/ui/metric-delta"

/**
 * A customer-story card: company eyebrow, headline, one big result figure and an optional delta chip.
 *
 * Use on marketing and customers pages, one outcome per card. For a live dashboard number use StatCard; for a quote use Testimonial.
 * Only show results the customer has approved; never invent figures.
 *
 * @example
 * <CaseStudyCard company="Northwind" title="Month-end close in two days" result="2 days" delta={-60} invertDelta />
 */
type CaseStudyCardProps = {
  /** Customer name, shown as a small uppercase eyebrow. */
  company: string
  /** Headline describing the outcome. Rendered as an h3. */
  title: string
  /** The headline figure, pre-formatted (e.g. "2 days", "$1.2M"). */
  result: string
  /** Optional percent change shown beside the result; negative values render as a decrease. */
  delta?: number
  /** Show a fall in `delta` as good (green), for figures like close time or cost. */
  invertDelta?: boolean
  /** Wraps the card in a link when set, so the whole card opens the full story. */
  href?: string
  className?: string
}

function CaseStudyCard({ company, title, result, delta, invertDelta = false, href, className }: CaseStudyCardProps) {
  const body = (
    <>
      <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{company}</p>
      <h3 className="mt-2 text-base font-medium text-balance text-fg">{title}</h3>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-2xl font-medium tracking-[-0.018em] tabular-nums text-fg">{result}</p>
        {delta != null ? <MetricDelta value={delta} invert={invertDelta} /> : null}
      </div>
    </>
  )
  const base = "block rounded-xl border border-border bg-surface p-5"
  return href ? (
    <a
      data-slot="case-study-card"
      href={href}
      className={cn(
        base,
        "outline-none transition-[border-color] duration-[70ms] hover:border-border-strong",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
    >
      {body}
    </a>
  ) : (
    <article data-slot="case-study-card" className={cn(base, className)}>
      {body}
    </article>
  )
}
export { CaseStudyCard }
export type { CaseStudyCardProps }
