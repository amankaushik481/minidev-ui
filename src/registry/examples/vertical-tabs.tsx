"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { VerticalTabs } from "@/registry/ui/vertical-tabs"
import type { Example } from "./types"

const PROFILE_TABS = [
  {
    id: "profile",
    label: "Profile",
    content: <p className="rounded-xl border border-border bg-surface p-4 text-sm text-fg-muted">Name, photo and the email Lumen sends receipts to.</p>,
  },
  {
    id: "notifications",
    label: "Notifications",
    content: <p className="rounded-xl border border-border bg-surface p-4 text-sm text-fg-muted">Email me when an invoice is paid or 7 days overdue.</p>,
  },
  {
    id: "sessions",
    label: "Sessions",
    content: <p className="rounded-xl border border-border bg-surface p-4 text-sm text-fg-muted">Signed in on 2 devices. Last active: Lisbon, 4 minutes ago.</p>,
  },
]

function ControlledTabs() {
  const [tab, setTab] = React.useState("notifications")
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setTab("sessions")}>Review sessions</Button>
      </div>
      <VerticalTabs aria-label="Account settings" tabs={PROFILE_TABS} value={tab} onChange={setTab} />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Workspace settings",
    description: "With no props it shows Lumen's workspace settings; defaultValue picks the first tab shown.",
    code: `<VerticalTabs defaultValue="billing" className="max-w-2xl" />`,
    node: <VerticalTabs defaultValue="billing" className="max-w-2xl" />,
  },
  {
    title: "Controlled from outside",
    description: "Keep the tab in state so another control, such as a security prompt, can open a specific section.",
    code: `const PROFILE_TABS = [
  {
    id: "profile",
    label: "Profile",
    content: <p className="rounded-xl border border-border bg-surface p-4 text-sm text-fg-muted">Name, photo and the email Lumen sends receipts to.</p>,
  },
  {
    id: "notifications",
    label: "Notifications",
    content: <p className="rounded-xl border border-border bg-surface p-4 text-sm text-fg-muted">Email me when an invoice is paid or 7 days overdue.</p>,
  },
  {
    id: "sessions",
    label: "Sessions",
    content: <p className="rounded-xl border border-border bg-surface p-4 text-sm text-fg-muted">Signed in on 2 devices. Last active: Lisbon, 4 minutes ago.</p>,
  },
]

function ControlledTabs() {
  const [tab, setTab] = React.useState("notifications")
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setTab("sessions")}>Review sessions</Button>
      </div>
      <VerticalTabs aria-label="Account settings" tabs={PROFILE_TABS} value={tab} onChange={setTab} />
    </div>
  )
}`,
    node: <ControlledTabs />,
  },
]
