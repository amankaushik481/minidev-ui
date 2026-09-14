"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function PressQuote({
  quote,
  source,
  className,
}: {
  quote: string
  source: string
  className?: string
}) {
  return (
    <figure data-slot="press-quote" className={cn("rounded-xl border border-border bg-sunken px-6 py-8 text-center", className)}>
      <blockquote className="text-lg font-medium tracking-[-0.008em] text-fg">“{quote}”</blockquote>
      <figcaption className="mt-3 text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{source}</figcaption>
    </figure>
  )
}
export { PressQuote }
