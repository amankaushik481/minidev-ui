"use client"
import * as React from "react"
import { AuditFilterBar } from "@/registry/ui/audit-filter-bar"
import { AuditTrail, type AuditEntry } from "@/registry/ui/audit-trail"
import type { Example } from "./types"

const auditLog: AuditEntry[] = [
  { id: "a1", actor: "Maya Chen", action: "approved refund on", target: "INV-2041", time: "2026-11-14T09:12:00Z" },
  { id: "a2", actor: "System", action: "rotated the signing key for", target: "Webhooks", time: "2026-11-14T03:00:00Z" },
  { id: "a3", actor: "Theo Okafor", action: "changed the role of", target: "Sam Lowe to Admin", time: "2026-11-13T16:40:00Z" },
  { id: "a4", actor: "System", action: "suspended an API key unused for", target: "90 days", time: "2026-11-12T03:00:00Z" },
  { id: "a5", actor: "Priya Raman", action: "exported customers to CSV", time: "2026-11-11T11:25:00Z" },
]
const ADMINS = ["Maya Chen", "Theo Okafor"]

function FilteredAuditLog() {
  const [query, setQuery] = React.useState("")
  const [actor, setActor] = React.useState("all")
  const [range, setRange] = React.useState<{ from?: string; to?: string }>({})
  const q = query.trim().toLowerCase()
  const rows = auditLog.filter((e) => {
    const day = e.time.slice(0, 10)
    if (actor === "admins" && !ADMINS.includes(e.actor)) return false
    if (actor === "system" && e.actor !== "System") return false
    if (range.from && day < range.from) return false
    if (range.to && day > range.to) return false
    return !q || [e.actor, e.action, e.target].join(" ").toLowerCase().includes(q)
  })
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <AuditFilterBar actor={actor} onActorChange={setActor} onSearchChange={setQuery} onRangeChange={setRange} />
      {rows.length ? (
        <AuditTrail entries={rows} className="max-w-none" />
      ) : (
        <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-fg-muted">No events match these filters.</p>
      )}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Filtering a trail",
    description: "Wire every callback into state and filter the entries by text, actor and day.",
    code: `const auditLog: AuditEntry[] = [
  { id: "a1", actor: "Maya Chen", action: "approved refund on", target: "INV-2041", time: "2026-11-14T09:12:00Z" },
  { id: "a2", actor: "System", action: "rotated the signing key for", target: "Webhooks", time: "2026-11-14T03:00:00Z" },
  { id: "a3", actor: "Theo Okafor", action: "changed the role of", target: "Sam Lowe to Admin", time: "2026-11-13T16:40:00Z" },
  { id: "a4", actor: "System", action: "suspended an API key unused for", target: "90 days", time: "2026-11-12T03:00:00Z" },
  { id: "a5", actor: "Priya Raman", action: "exported customers to CSV", time: "2026-11-11T11:25:00Z" },
]
const ADMINS = ["Maya Chen", "Theo Okafor"]

function FilteredAuditLog() {
  const [query, setQuery] = React.useState("")
  const [actor, setActor] = React.useState("all")
  const [range, setRange] = React.useState<{ from?: string; to?: string }>({})
  const q = query.trim().toLowerCase()
  const rows = auditLog.filter((e) => {
    const day = e.time.slice(0, 10)
    if (actor === "admins" && !ADMINS.includes(e.actor)) return false
    if (actor === "system" && e.actor !== "System") return false
    if (range.from && day < range.from) return false
    if (range.to && day > range.to) return false
    return !q || [e.actor, e.action, e.target].join(" ").toLowerCase().includes(q)
  })
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <AuditFilterBar actor={actor} onActorChange={setActor} onSearchChange={setQuery} onRangeChange={setRange} />
      {rows.length ? (
        <AuditTrail entries={rows} className="max-w-none" />
      ) : (
        <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-fg-muted">No events match these filters.</p>
      )}
    </div>
  )
}`,
    node: <FilteredAuditLog />,
  },
  {
    title: "Custom actor chips",
    description: "Pass your own actor options and start on one that is not first with defaultActor.",
    code: `<AuditFilterBar
  actorOptions={[
    { value: "everyone", label: "Everyone" },
    { value: "owners", label: "Owners" },
    { value: "api", label: "API keys" },
  ]}
  defaultActor="api"
/>`,
    node: (
      <AuditFilterBar
        actorOptions={[
          { value: "everyone", label: "Everyone" },
          { value: "owners", label: "Owners" },
          { value: "api", label: "API keys" },
        ]}
        defaultActor="api"
      />
    ),
  },
]
