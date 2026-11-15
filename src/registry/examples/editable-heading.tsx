"use client"
import * as React from "react"
import { EditableHeading } from "@/registry/ui/editable-heading"
import type { Example } from "./types"

function ReportTitle() {
  const [title, setTitle] = React.useState("Q4 revenue review")
  const [saved, setSaved] = React.useState(title)
  return (
    <div className="flex w-full max-w-md flex-col gap-1">
      <EditableHeading aria-label="Report title" value={title} onChange={setTitle} onKeyDown={(e) => e.key === "Enter" && setSaved(e.currentTarget.value)} />
      <p className="text-xs text-fg-muted">{title === saved ? "Saved" : "Enter saves, Escape undoes"}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Save on Enter",
    description: "onChange runs per keystroke. Save on Enter; Escape puts back the text from when editing began.",
    code: `function ReportTitle() {
  const [title, setTitle] = React.useState("Q4 revenue review")
  const [saved, setSaved] = React.useState(title)
  return (
    <div className="flex w-full max-w-md flex-col gap-1">
      <EditableHeading aria-label="Report title" value={title} onChange={setTitle} onKeyDown={(e) => e.key === "Enter" && setSaved(e.currentTarget.value)} />
      <p className="text-xs text-fg-muted">{title === saved ? "Saved" : "Enter saves, Escape undoes"}</p>
    </div>
  )
}`,
    node: <ReportTitle />,
  },
  {
    title: "Untitled dashboard",
    description: "Uncontrolled and empty, it shows the placeholder. Size it down with className.",
    code: `<EditableHeading aria-label="Dashboard name" placeholder="Untitled dashboard" className="max-w-md text-lg" />`,
    node: <EditableHeading aria-label="Dashboard name" placeholder="Untitled dashboard" className="max-w-md text-lg" />,
  },
]
