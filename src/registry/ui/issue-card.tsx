"use client"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

function IssueCard({
  id = "MD-241",
  title = "Raise Premium craft for client demos",
  status = "In progress",
  priority = "High",
  className,
}: {
  id?: string
  title?: string
  status?: string
  priority?: string
  className?: string
}) {
  return (
    <article data-slot="issue-card" className={cn("rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-fg-muted">{id}</span>
        <Badge variant="outline">{status}</Badge>
        <Badge variant="outline">{priority}</Badge>
      </div>
      <h3 className="mt-2 text-sm font-medium text-fg">{title}</h3>
      <p className="mt-1 text-xs text-fg-muted">Assigned to Design Eng · updated 12m ago</p>
    </article>
  )
}
export { IssueCard }
