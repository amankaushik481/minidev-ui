"use client"
import { Badge } from "@/registry/ui/badge"

const ENTRIES = [
  { version: "0.9.0", date: "Sep 14", tag: "Premium", title: "Client showcase + OS mock", body: "Pitch kit, scroll chapters, free/premium compare, metric ticker." },
  { version: "0.8.0", date: "Sep 14", tag: "Craft", title: "Docs, playground, data-slot", body: "Every free UI ships data-slot. Curated playground demos expanded." },
  { version: "0.7.0", date: "Sep 14", tag: "Motion", title: "Kinetic Premium elevation", body: "Sticky stories, magnetic CTA, wipe, device stack, countdown." },
]

function ChangelogPage() {
  return (
    <div data-slot="changelog-page" className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-highlight">
      <div>
        <h3 className="text-xl font-medium tracking-[-0.014em] text-fg">Changelog</h3>
        <p className="mt-1 text-sm text-fg-muted">What shipped recently in the local craft loop.</p>
      </div>
      <ul className="space-y-4">
        {ENTRIES.map((e) => (
          <li key={e.version} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm tabular-nums text-fg">{e.version}</span>
              <Badge variant="outline">{e.tag}</Badge>
              <span className="text-xs text-fg-muted">{e.date}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-fg">{e.title}</p>
            <p className="mt-1 text-sm text-fg-muted">{e.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { ChangelogPage }
