"use client"
import { PageHeader } from "@/registry/ui/page-header"
import { Button } from "@/registry/ui/button"
import { StatusBadge } from "@/registry/ui/status-badge"
function ProjectList() {
  const projects = [
    { id: "1", name: "MiniDev UI", status: "active" },
    { id: "2", name: "Agency site", status: "paused" },
  ]
  return (
    <div data-slot="project-list" className="space-y-4">
      <PageHeader title="Projects" actions={<Button size="sm">New project</Button>} />
      <div className="divide-y divide-border rounded-xl border border-border">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between px-3 py-3 text-sm">
            <span className="font-medium text-fg">{p.name}</span>
            <StatusBadge tone={p.status === "active" ? "success" : "warning"}>{p.status}</StatusBadge>
          </div>
        ))}
      </div>
    </div>
  )
}
export { ProjectList }
