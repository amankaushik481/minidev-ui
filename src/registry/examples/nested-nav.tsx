"use client"
import * as React from "react"
import { NestedNav } from "@/registry/ui/nested-nav"
import type { Example } from "./types"

const SETTINGS = [
  { id: "profile", label: "Profile" },
  {
    id: "workspace",
    label: "Workspace",
    children: [
      { id: "general", label: "General" },
      { id: "members", label: "Members" },
      { id: "billing", label: "Billing", children: [{ id: "plan", label: "Plan" }, { id: "invoices", label: "Invoices" }] },
    ],
  },
  { id: "security", label: "Security", children: [{ id: "sso", label: "Single sign-on" }, { id: "audit", label: "Audit log" }] },
]

function SettingsNav() {
  const [active, setActive] = React.useState("invoices")
  return (
    <div className="flex w-full max-w-lg gap-6">
      <nav aria-label="Settings" className="w-52 shrink-0">
        <NestedNav nodes={SETTINGS} activeId={active} onSelect={(node) => setActive(node.id)} />
      </nav>
      <p className="text-sm text-fg-muted">Showing: {active}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Settings sidebar with state",
    description: "Leaves without href are buttons; onSelect moves activeId, which marks the row aria-current.",
    code: `const SETTINGS = [
  { id: "profile", label: "Profile" },
  {
    id: "workspace",
    label: "Workspace",
    children: [
      { id: "general", label: "General" },
      { id: "members", label: "Members" },
      { id: "billing", label: "Billing", children: [{ id: "plan", label: "Plan" }, { id: "invoices", label: "Invoices" }] },
    ],
  },
  { id: "security", label: "Security", children: [{ id: "sso", label: "Single sign-on" }, { id: "audit", label: "Audit log" }] },
]

function SettingsNav() {
  const [active, setActive] = React.useState("invoices")
  return (
    <div className="flex w-full max-w-lg gap-6">
      <nav aria-label="Settings" className="w-52 shrink-0">
        <NestedNav nodes={SETTINGS} activeId={active} onSelect={(node) => setActive(node.id)} />
      </nav>
      <p className="text-sm text-fg-muted">Showing: {active}</p>
    </div>
  )
}`,
    node: <SettingsNav />,
  },
  {
    title: "Docs navigation with links",
    description: "Give leaves an href and they render as links; wrap the list in a labelled nav landmark.",
    code: `<nav aria-label="Docs" className="w-56">
  <NestedNav
    activeId="webhooks"
    nodes={[
      { id: "start", label: "Getting started", children: [{ id: "install", label: "Install", href: "#install" }, { id: "auth", label: "Authentication", href: "#auth" }] },
      { id: "guides", label: "Guides", children: [{ id: "webhooks", label: "Webhooks", href: "#webhooks" }, { id: "retries", label: "Retries", href: "#retries" }] },
      { id: "changelog", label: "Changelog", href: "#changelog" },
    ]}
  />
</nav>`,
    node: (
      <nav aria-label="Docs" className="w-56">
        <NestedNav
          activeId="webhooks"
          nodes={[
            { id: "start", label: "Getting started", children: [{ id: "install", label: "Install", href: "#install" }, { id: "auth", label: "Authentication", href: "#auth" }] },
            { id: "guides", label: "Guides", children: [{ id: "webhooks", label: "Webhooks", href: "#webhooks" }, { id: "retries", label: "Retries", href: "#retries" }] },
            { id: "changelog", label: "Changelog", href: "#changelog" },
          ]}
        />
      </nav>
    ),
  },
]
