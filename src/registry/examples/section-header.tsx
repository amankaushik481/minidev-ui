"use client"
import { Button } from "@/registry/ui/button"
import { SectionHeader } from "@/registry/ui/section-header"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Settings group with an action",
    description: "An h2 by default, with the action aligned right.",
    code: `<div className="w-full max-w-lg">
  <SectionHeader title="Members" description="People with access to this workspace." actions={<Button size="sm" variant="outline">Invite</Button>} />
  <div className="rounded-xl border border-border bg-surface p-4 text-sm text-fg-muted">12 members, 3 invites pending.</div>
</div>`,
    node: (
      <div className="w-full max-w-lg">
        <SectionHeader title="Members" description="People with access to this workspace." actions={<Button size="sm" variant="outline">Invite</Button>} />
        <div className="rounded-xl border border-border bg-surface p-4 text-sm text-fg-muted">12 members, 3 invites pending.</div>
      </div>
    ),
  },
  {
    title: "Labelled danger zone",
    description: "level={3} nests it under a page section, and an id on the title node labels the section.",
    code: `<section aria-labelledby="danger-heading" className="w-full max-w-lg">
  <SectionHeader level={3} title={<span id="danger-heading">Danger zone</span>} description="These actions cannot be undone." />
  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-danger/30 p-4">
    <p className="text-sm text-fg">Delete this workspace and every invoice in it.</p>
    <Button size="sm" variant="destructive">Delete workspace</Button>
  </div>
</section>`,
    node: (
      <section aria-labelledby="danger-heading" className="w-full max-w-lg">
        <SectionHeader level={3} title={<span id="danger-heading">Danger zone</span>} description="These actions cannot be undone." />
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-danger/30 p-4">
          <p className="text-sm text-fg">Delete this workspace and every invoice in it.</p>
          <Button size="sm" variant="destructive">Delete workspace</Button>
        </div>
      </section>
    ),
  },
]
