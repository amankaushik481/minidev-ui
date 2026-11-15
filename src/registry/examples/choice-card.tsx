"use client"
import * as React from "react"
import { DatabaseIcon, FileSpreadsheetIcon, PlugIcon, UserIcon, UsersIcon } from "lucide-react"
import { ChoiceCard } from "@/registry/ui/choice-card"
import type { Example } from "./types"

function WorkspaceType() {
  const [type, setType] = React.useState("team")
  return (
    <div role="group" aria-label="Workspace type" className="grid w-full max-w-sm gap-2">
      <ChoiceCard icon={<UserIcon />} title="Personal" description="Just you. Invoices go out under your own name." selected={type === "solo"} onClick={() => setType("solo")} />
      <ChoiceCard icon={<UsersIcon />} title="Team" description="Invite up to 10 people and share one customer list." selected={type === "team"} onClick={() => setType("team")} />
    </div>
  )
}

function ImportSource() {
  const [source, setSource] = React.useState("csv")
  return (
    <div role="group" aria-label="Import customers from" className="grid w-full max-w-md gap-2 sm:grid-cols-3">
      <ChoiceCard icon={<FileSpreadsheetIcon />} title="CSV file" description="Up to 5,000 rows." selected={source === "csv"} onClick={() => setSource("csv")} />
      <ChoiceCard icon={<DatabaseIcon />} title="Database" description="Read-only Postgres access." selected={source === "db"} onClick={() => setSource("db")} />
      <ChoiceCard icon={<PlugIcon />} title="API" description="Available on the Pro plan." disabled />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Pick one workspace type",
    description: "Keep the choice in state and wrap the cards in a named role=\"group\".",
    code: `function WorkspaceType() {
  const [type, setType] = React.useState("team")
  return (
    <div role="group" aria-label="Workspace type" className="grid w-full max-w-sm gap-2">
      <ChoiceCard icon={<UserIcon />} title="Personal" description="Just you. Invoices go out under your own name." selected={type === "solo"} onClick={() => setType("solo")} />
      <ChoiceCard icon={<UsersIcon />} title="Team" description="Invite up to 10 people and share one customer list." selected={type === "team"} onClick={() => setType("team")} />
    </div>
  )
}`,
    node: <WorkspaceType />,
  },
  {
    title: "Import source with a locked option",
    description: "A disabled card stays visible to explain what an upgrade unlocks, but leaves the Tab order.",
    code: `function ImportSource() {
  const [source, setSource] = React.useState("csv")
  return (
    <div role="group" aria-label="Import customers from" className="grid w-full max-w-md gap-2 sm:grid-cols-3">
      <ChoiceCard icon={<FileSpreadsheetIcon />} title="CSV file" description="Up to 5,000 rows." selected={source === "csv"} onClick={() => setSource("csv")} />
      <ChoiceCard icon={<DatabaseIcon />} title="Database" description="Read-only Postgres access." selected={source === "db"} onClick={() => setSource("db")} />
      <ChoiceCard icon={<PlugIcon />} title="API" description="Available on the Pro plan." disabled />
    </div>
  )
}`,
    node: <ImportSource />,
  },
]
