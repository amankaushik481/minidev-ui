"use client"
import * as React from "react"
import { OrgSwitcher } from "@/registry/ui/org-switcher"
import type { Example } from "./types"

const ORGS = [
  { id: "northwind", name: "Northwind Traders", plan: "Business" },
  { id: "halcyon", name: "Halcyon Health", plan: "Scale" },
  { id: "kestrel", name: "Kestrel Labs", plan: "Trial" },
]

function ControlledSwitcher() {
  const [org, setOrg] = React.useState("halcyon")
  const current = ORGS.find((o) => o.id === org)
  return (
    <div className="flex flex-col items-start gap-2">
      <OrgSwitcher orgs={ORGS} value={org} onChange={setOrg} />
      <p className="text-xs text-fg-muted">Loading the {current?.name} dashboard…</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled with value and onChange",
    description: "Keep the org id in state (or the URL) and react to onChange, for example by loading that org's dashboard.",
    code: `const ORGS = [
  { id: "northwind", name: "Northwind Traders", plan: "Business" },
  { id: "halcyon", name: "Halcyon Health", plan: "Scale" },
  { id: "kestrel", name: "Kestrel Labs", plan: "Trial" },
]

function ControlledSwitcher() {
  const [org, setOrg] = React.useState("halcyon")
  const current = ORGS.find((o) => o.id === org)
  return (
    <div className="flex flex-col items-start gap-2">
      <OrgSwitcher orgs={ORGS} value={org} onChange={setOrg} />
      <p className="text-xs text-fg-muted">Loading the {current?.name} dashboard…</p>
    </div>
  )
}`,
    node: <ControlledSwitcher />,
  },
  {
    title: "Top of a sidebar",
    description: "Stretch the trigger to the sidebar width with className; the role or plan shows on the right of each option.",
    code: `<div className="w-60 rounded-xl border border-border bg-surface p-2">
  <OrgSwitcher
    className="w-full"
    defaultValue="personal"
    orgs={[
      { id: "personal", name: "Maya Chen", plan: "Owner" },
      { id: "acme", name: "Acme Studio", plan: "Admin" },
      { id: "fabrikam", name: "Fabrikam", plan: "Viewer" },
    ]}
  />
</div>`,
    node: (
      <div className="w-60 rounded-xl border border-border bg-surface p-2">
        <OrgSwitcher
          className="w-full"
          defaultValue="personal"
          orgs={[
            { id: "personal", name: "Maya Chen", plan: "Owner" },
            { id: "acme", name: "Acme Studio", plan: "Admin" },
            { id: "fabrikam", name: "Fabrikam", plan: "Viewer" },
          ]}
        />
      </div>
    ),
  },
]
