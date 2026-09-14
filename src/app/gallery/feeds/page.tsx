"use client"
import { Timeline } from "@/registry/ui/timeline"
import { ActivityFeed } from "@/registry/ui/activity-feed"
import { DescriptionList } from "@/registry/ui/description-list"
import { TreeView } from "@/registry/ui/tree-view"
import { KanbanBoard } from "@/registry/ui/kanban-board"
import { StatusDot } from "@/registry/ui/status-dot"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Feeds & structure">
      <GallerySection title="Timeline">
        <Timeline className="max-w-md" items={[
          { title: "Deployed v0.1", description: "Batch A shipped", time: "2h ago" },
          { title: "Audit green", description: "All gallery routes passed", time: "3h ago" },
          { title: "Scaffold", description: "Next + shadcn", time: "5h ago" },
        ]} />
      </GallerySection>
      <GallerySection title="Activity">
        <ActivityFeed className="w-full max-w-md" items={[
          { id: "1", user: "Aman", action: "opened a PR", time: "1m" },
          { id: "2", user: "Jordan", action: "commented on design", time: "12m" },
        ]} />
      </GallerySection>
      <GallerySection title="Description list">
        <DescriptionList className="max-w-lg" items={[
          { label: "Workspace", value: "MiniDev" },
          { label: "Plan", value: "Agency" },
          { label: "Region", value: "us-east-1" },
          { label: "Status", value: <span className="inline-flex items-center gap-2"><StatusDot tone="success" /> Healthy</span> },
        ]} />
      </GallerySection>
      <GallerySection title="Tree">
        <TreeView className="max-w-sm rounded-xl border border-border p-2" nodes={[
          { id: "app", label: "app", children: [
            { id: "gallery", label: "gallery" },
            { id: "docs", label: "docs" },
          ]},
          { id: "registry", label: "registry", children: [
            { id: "ui", label: "ui" },
            { id: "blocks", label: "blocks" },
          ]},
        ]} />
      </GallerySection>
      <GallerySection title="Kanban">
        <KanbanBoard columns={[
          { id: "todo", title: "Todo", cards: [{ id: "a", title: "Multi-select polish", meta: "Batch A" }] },
          { id: "doing", title: "Doing", cards: [{ id: "b", title: "Data table", meta: "Batch B" }] },
          { id: "done", title: "Done", cards: [{ id: "c", title: "Dropdown fix", meta: "Shipped" }] },
        ]} />
      </GallerySection>
    </GalleryPage>
  )
}
