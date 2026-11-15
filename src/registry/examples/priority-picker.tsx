"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { PriorityPicker, type Priority } from "@/registry/ui/priority-picker"
import type { Example } from "./types"

function NewIssueForm() {
  const [priority, setPriority] = React.useState<Priority>("medium")
  const [sent, setSent] = React.useState("")
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(String(new FormData(e.currentTarget).get("priority")))
      }}
    >
      <PriorityPicker name="priority" value={priority} onChange={setPriority} aria-label="Issue priority" />
      <Button type="submit" size="sm" className="self-start">Create issue</Button>
      {sent ? <p className="text-xs text-fg-muted">Submitted priority: {sent}</p> : null}
    </form>
  )
}

function ClearablePriority() {
  const [priority, setPriority] = React.useState("none")
  return (
    <div className="flex flex-wrap items-center gap-2">
      <PriorityPicker value={priority} onChange={setPriority} />
      <Button size="sm" variant="ghost" onClick={() => setPriority("none")}>
        Clear
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "In a form",
    description: "Pass name and the picker renders a hidden input, so the value reaches FormData.",
    code: `function NewIssueForm() {
  const [priority, setPriority] = React.useState<Priority>("medium")
  const [sent, setSent] = React.useState("")
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(String(new FormData(e.currentTarget).get("priority")))
      }}
    >
      <PriorityPicker name="priority" value={priority} onChange={setPriority} aria-label="Issue priority" />
      <Button type="submit" size="sm" className="self-start">Create issue</Button>
      {sent ? <p className="text-xs text-fg-muted">Submitted priority: {sent}</p> : null}
    </form>
  )
}`,
    node: <NewIssueForm />,
  },
  {
    title: "Clearing the priority",
    description: "Pass a value that matches no level, here none, to show nothing selected.",
    code: `function ClearablePriority() {
  const [priority, setPriority] = React.useState("none")
  return (
    <div className="flex flex-wrap items-center gap-2">
      <PriorityPicker value={priority} onChange={setPriority} />
      <Button size="sm" variant="ghost" onClick={() => setPriority("none")}>
        Clear
      </Button>
    </div>
  )
}`,
    node: <ClearablePriority />,
  },
]
