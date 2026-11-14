"use client"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { PageHeader } from "@/registry/ui/page-header"
import { StatusBadge } from "@/registry/ui/status-badge"

/**
 * ProjectList — an index page: title with "New project", then one linked row per project with owner, freshness and status.
 *
 * Use for short lists (under ~30 items) where each row opens a detail page (see ProjectDetail). For sortable,
 * selectable or long lists use UsersTablePage / DataTable. Rows are real links, so they work with the keyboard,
 * middle-click and screen readers.
 *
 * @example
 * <ProjectList />
 */
type ProjectListProps = {
  className?: string
}

type ProjectStatus = "on-track" | "at-risk" | "paused"

const TONE: Record<ProjectStatus, { tone: "success" | "warning" | "neutral"; label: string }> = {
  "on-track": { tone: "success", label: "On track" },
  "at-risk": { tone: "warning", label: "At risk" },
  paused: { tone: "neutral", label: "Paused" },
}

const PROJECTS: { id: string; name: string; owner: string; updated: string; status: ProjectStatus }[] = [
  { id: "q4-board-pack", name: "Q4 board pack", owner: "Priya Raman", updated: "12m ago", status: "on-track" },
  { id: "churn-review", name: "Starter churn review", owner: "Marcus Webb", updated: "2h ago", status: "at-risk" },
  { id: "eu-migration", name: "EU data residency", owner: "Aisha Karim", updated: "Yesterday", status: "on-track" },
  { id: "pricing-test", name: "Annual pricing test", owner: "Leo Brandt", updated: "Oct 28", status: "paused" },
]

function ProjectList({ className }: ProjectListProps) {
  return (
    <div data-slot="project-list" className={cn("space-y-4", className)}>
      <PageHeader title="Projects" description="Reports and reviews in the Northwind workspace." actions={<Button size="sm">New project</Button>} />
      <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
        {PROJECTS.map((p) => (
          <li key={p.id}>
            <a
              href={`#${p.id}`}
              className="group/row flex items-center gap-3 px-4 py-3 text-sm outline-none transition-colors duration-[70ms] hover:bg-sunken focus-visible:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-fg">{p.name}</span>
                <span className="block truncate text-xs text-fg-muted">
                  {p.owner} · updated {p.updated}
                </span>
              </span>
              <StatusBadge tone={TONE[p.status].tone}>{TONE[p.status].label}</StatusBadge>
              <ChevronRightIcon aria-hidden className="size-4 shrink-0 text-fg-subtle transition-colors group-hover/row:text-fg" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ProjectList }
export type { ProjectListProps, ProjectStatus }
