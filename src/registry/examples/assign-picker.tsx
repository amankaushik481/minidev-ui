"use client"
import * as React from "react"
import { AssignPicker } from "@/registry/ui/assign-picker"
import { Button } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import type { Example } from "./types"

const ticketTeam = [
  { id: "none", name: "Unassigned" },
  { id: "maya", name: "Maya Chen" },
  { id: "theo", name: "Theo Okafor" },
  { id: "priya", name: "Priya Raman" },
]

function AssignTicket() {
  const [assignee, setAssignee] = React.useState("none")
  const person = ticketTeam.find((p) => p.id === assignee)
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-fg-muted">
        LUM-418 · <span className="text-fg">{assignee === "none" ? "No one assigned" : "Assigned to " + person?.name}</span>
      </p>
      <AssignPicker people={ticketTeam} value={assignee} onChange={setAssignee} label="Assign LUM-418" />
    </div>
  )
}

const reviewers = [
  { id: "maya", name: "Maya Chen" },
  { id: "priya", name: "Priya Raman" },
  { id: "sam", name: "Sam Lowe" },
]

function AssignPopover() {
  const [open, setOpen] = React.useState(false)
  const [reviewer, setReviewer] = React.useState("priya")
  const name = reviewers.find((p) => p.id === reviewer)?.name
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>Reviewer: {name}</PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-1">
        <AssignPicker
          people={reviewers}
          value={reviewer}
          onChange={(id) => {
            setReviewer(id)
            setOpen(false)
          }}
          label="Reviewer"
          className="border-0 bg-transparent p-0"
        />
      </PopoverContent>
    </Popover>
  )
}

export const examples: Example[] = [
  {
    title: "With an Unassigned option",
    description: "Add an entry for no assignee and read it back from the controlled value.",
    code: `const ticketTeam = [
  { id: "none", name: "Unassigned" },
  { id: "maya", name: "Maya Chen" },
  { id: "theo", name: "Theo Okafor" },
  { id: "priya", name: "Priya Raman" },
]

function AssignTicket() {
  const [assignee, setAssignee] = React.useState("none")
  const person = ticketTeam.find((p) => p.id === assignee)
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-fg-muted">
        LUM-418 · <span className="text-fg">{assignee === "none" ? "No one assigned" : "Assigned to " + person?.name}</span>
      </p>
      <AssignPicker people={ticketTeam} value={assignee} onChange={setAssignee} label="Assign LUM-418" />
    </div>
  )
}`,
    node: <AssignTicket />,
  },
  {
    title: "In a popover",
    description: "Open the list from a button and close it when someone is picked.",
    code: `const reviewers = [
  { id: "maya", name: "Maya Chen" },
  { id: "priya", name: "Priya Raman" },
  { id: "sam", name: "Sam Lowe" },
]

function AssignPopover() {
  const [open, setOpen] = React.useState(false)
  const [reviewer, setReviewer] = React.useState("priya")
  const name = reviewers.find((p) => p.id === reviewer)?.name
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>Reviewer: {name}</PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-1">
        <AssignPicker
          people={reviewers}
          value={reviewer}
          onChange={(id) => {
            setReviewer(id)
            setOpen(false)
          }}
          label="Reviewer"
          className="border-0 bg-transparent p-0"
        />
      </PopoverContent>
    </Popover>
  )
}`,
    node: <AssignPopover />,
  },
]
