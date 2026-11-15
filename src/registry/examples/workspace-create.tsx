"use client"
import * as React from "react"
import { WorkspaceCreate } from "@/registry/ui/workspace-create"
import type { Example } from "./types"

function CreateWithPending() {
  const [pending, setPending] = React.useState(false)
  const [created, setCreated] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <WorkspaceCreate
        pending={pending}
        onCreate={({ name, slug }) => {
          setPending(true)
          // Stands in for the request that creates the workspace.
          setTimeout(() => {
            setPending(false)
            setCreated(name + " is live at lumen.app/" + slug)
          }, 1200)
        }}
      />
      {created ? <p role="status" className="text-xs text-success">{created}</p> : null}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Pending while it saves",
    description: "Set pending while your request runs; the button disables and reads Creating…",
    code: `function CreateWithPending() {
  const [pending, setPending] = React.useState(false)
  const [created, setCreated] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <WorkspaceCreate
        pending={pending}
        onCreate={({ name, slug }) => {
          setPending(true)
          // Stands in for the request that creates the workspace.
          setTimeout(() => {
            setPending(false)
            setCreated(name + " is live at lumen.app/" + slug)
          }, 1200)
        }}
      />
      {created ? <p role="status" className="text-xs text-success">{created}</p> : null}
    </div>
  )
}`,
    node: <CreateWithPending />,
  },
  {
    title: "In a card",
    description: "Type a name with accents or spaces to see the slug follow it until you edit the URL.",
    code: `<div className="w-full max-w-sm rounded-xl border border-border bg-surface p-5 shadow-raised">
  <WorkspaceCreate onCreate={(w) => console.log(w)} />
</div>`,
    node: (
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-5 shadow-raised">
        <WorkspaceCreate onCreate={(w) => console.log(w)} />
      </div>
    ),
  },
]
