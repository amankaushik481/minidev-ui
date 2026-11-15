"use client"
import * as React from "react"
import { SessionList } from "@/registry/ui/session-list"
import type { Example } from "./types"

function RevokeDemo() {
  const [sessions, setSessions] = React.useState([
    { id: "s1", device: "Linux laptop · Firefox", location: "Lisbon, PT · active now", current: true },
    { id: "s2", device: "Android phone · Northwind app", location: "Lisbon, PT · 20 minutes ago" },
    { id: "s3", device: "Windows desktop · Chrome", location: "Warsaw, PL · 3 days ago" },
  ])
  return sessions.length > 1 ? (
    <SessionList sessions={sessions} onRevoke={(id) => setSessions((s) => s.filter((x) => x.id !== id))} />
  ) : (
    <div className="flex w-full max-w-md flex-col gap-2">
      <SessionList sessions={sessions} />
      <p className="text-xs text-fg-muted">You are only signed in on this device.</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Revoke other devices",
    description: "Remove the row once revoking succeeds. The current session has no Revoke button, so add your own note when it is the only one left.",
    code: `function RevokeDemo() {
  const [sessions, setSessions] = React.useState([
    { id: "s1", device: "Linux laptop · Firefox", location: "Lisbon, PT · active now", current: true },
    { id: "s2", device: "Android phone · Northwind app", location: "Lisbon, PT · 20 minutes ago" },
    { id: "s3", device: "Windows desktop · Chrome", location: "Warsaw, PL · 3 days ago" },
  ])
  return sessions.length > 1 ? (
    <SessionList sessions={sessions} onRevoke={(id) => setSessions((s) => s.filter((x) => x.id !== id))} />
  ) : (
    <div className="flex w-full max-w-md flex-col gap-2">
      <SessionList sessions={sessions} />
      <p className="text-xs text-fg-muted">You are only signed in on this device.</p>
    </div>
  )
}`,
    node: <RevokeDemo />,
  },
]
