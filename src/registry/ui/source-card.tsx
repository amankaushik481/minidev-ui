"use client"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

function SourceCard({
  title = "DESIGN.md",
  url = "local://DESIGN.md",
  snippet = "Hairline · Geist Sans · accent hue 285 · zero blur shadows outside overlays.",
  className,
}: {
  title?: string
  url?: string
  snippet?: string
  className?: string
}) {
  return (
    <article data-slot="source-card" className={cn("rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-fg">{title}</h3>
        <Badge variant="outline">source</Badge>
      </div>
      <p className="mt-1 truncate font-mono text-[11px] text-fg-muted">{url}</p>
      <p className="mt-2 text-sm leading-[1.55] text-fg-muted">{snippet}</p>
    </article>
  )
}
export { SourceCard }
