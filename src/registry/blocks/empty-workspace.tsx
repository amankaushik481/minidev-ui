"use client"
import { FolderPlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { EmptyState } from "@/registry/ui/empty-state"
import { PageHeader } from "@/registry/ui/page-header"

/**
 * EmptyWorkspace — the first-run screen of a new workspace: page title, an empty state with one primary action, then two shortcuts.
 *
 * Use when a list or workspace has no data yet and the next step is obvious. For an empty search result use
 * EmptySearch; for a multi-step first-run setup use OnboardingFlow. Composes PageHeader and EmptyState.
 *
 * @example
 * <EmptyWorkspace onCreate={() => router.push("/projects/new")} />
 */
type EmptyWorkspaceProps = {
  /** Called by the primary "New report" button. */
  onCreate?: () => void
  className?: string
}

function EmptyWorkspace({ onCreate, className }: EmptyWorkspaceProps) {
  return (
    <div data-slot="empty-workspace" className={cn("space-y-6 rounded-2xl border border-border bg-surface p-4 shadow-raised sm:p-6", className)}>
      <PageHeader title="Northwind workspace" description="Reports, alerts and data sources for your finance team." />
      <EmptyState
        icon={<FolderPlusIcon aria-hidden />}
        title="No reports yet"
        description="Start a report from a template, or connect Stripe and Lumen drafts your first one overnight."
        actionLabel="New report"
        onAction={onCreate}
      />
      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        <Button size="sm" variant="outline">
          Connect a data source
        </Button>
        <Button size="sm" variant="ghost">
          Invite teammates
        </Button>
      </div>
    </div>
  )
}

export { EmptyWorkspace }
export type { EmptyWorkspaceProps }
