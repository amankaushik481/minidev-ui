"use client"
import { Button } from "@/registry/ui/button"
import { EmptyState } from "@/registry/ui/empty-state"
import { PageHeader } from "@/registry/ui/page-header"

function EmptyWorkspace() {
  return (
    <div data-slot="empty-workspace" className="space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-highlight">
      <PageHeader title="Workspace" description="Projects, agents, and shared libraries for this org." />
      <EmptyState
        title="No projects yet"
        description="Spin up a project to unlock agents, registries, and audit history."
        actionLabel="New project"
      />
      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        <Button size="sm">Import from Git</Button>
        <Button size="sm" variant="outline">Invite teammates</Button>
      </div>
    </div>
  )
}
export { EmptyWorkspace }
