"use client"
import * as React from "react"
import { SavedViews } from "@/registry/ui/saved-views"
import type { Example } from "./types"

const issueViews = [
  { id: "mine", name: "My open", count: 12 },
  { id: "review", name: "Needs review", count: 4 },
  { id: "blocked", name: "Blocked", count: 2 },
  { id: "all", name: "All issues", count: 128 },
]

function IssueSidebar() {
  const [view, setView] = React.useState("mine")
  const current = issueViews.find((v) => v.id === view)
  return (
    <div className="flex w-full max-w-lg gap-4 rounded-xl border border-border bg-surface p-3">
      <SavedViews views={issueViews} value={view} onChange={setView} aria-label="Issue views" className="w-44 shrink-0" />
      <div className="min-w-0 flex-1 border-l border-border pl-4">
        <h3 className="text-sm font-medium text-fg">{current?.name}</h3>
        <p className="mt-1 text-xs text-fg-muted tabular-nums">{current?.count} issues</p>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Issue tracker sidebar",
    description: "Control the selected view and show its content beside the list.",
    code: `const issueViews = [
  { id: "mine", name: "My open", count: 12 },
  { id: "review", name: "Needs review", count: 4 },
  { id: "blocked", name: "Blocked", count: 2 },
  { id: "all", name: "All issues", count: 128 },
]

function IssueSidebar() {
  const [view, setView] = React.useState("mine")
  const current = issueViews.find((v) => v.id === view)
  return (
    <div className="flex w-full max-w-lg gap-4 rounded-xl border border-border bg-surface p-3">
      <SavedViews views={issueViews} value={view} onChange={setView} aria-label="Issue views" className="w-44 shrink-0" />
      <div className="min-w-0 flex-1 border-l border-border pl-4">
        <h3 className="text-sm font-medium text-fg">{current?.name}</h3>
        <p className="mt-1 text-xs text-fg-muted tabular-nums">{current?.count} issues</p>
      </div>
    </div>
  )
}`,
    node: <IssueSidebar />,
  },
  {
    title: "Mailbox views",
    description: "Counts are optional; defaultValue picks the starting view.",
    code: `<SavedViews
  aria-label="Mailbox views"
  defaultValue="unread"
  className="w-48"
  views={[
    { id: "all", name: "All mail" },
    { id: "unread", name: "Unread", count: 9 },
    { id: "flagged", name: "Flagged", count: 3 },
    { id: "sent", name: "Sent" },
  ]}
/>`,
    node: (
      <SavedViews
        aria-label="Mailbox views"
        defaultValue="unread"
        className="w-48"
        views={[
          { id: "all", name: "All mail" },
          { id: "unread", name: "Unread", count: 9 },
          { id: "flagged", name: "Flagged", count: 3 },
          { id: "sent", name: "Sent" },
        ]}
      />
    ),
  },
]
