"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { LiveCursorsBar } from "@/registry/ui/live-cursors-bar"
import type { Example } from "./types"

function PresenceDemo() {
  const [adaHere, setAdaHere] = React.useState(false)
  const people = [
    { name: "Maya Chen", color: "var(--chart-1)" },
    ...(adaHere ? [{ name: "Ada Novak", color: "var(--chart-5)" }] : []),
  ]
  return (
    <div className="flex items-center gap-4">
      <LiveCursorsBar people={people} />
      <Button size="sm" variant="outline" onClick={() => setAdaHere((v) => !v)}>
        {adaHere ? "Ada leaves" : "Ada joins"}
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "In a document header",
    description: "Each person gets a chart token, the same colour as their cursor.",
    code: `<div className="flex w-full max-w-xl items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
  <div className="min-w-0">
    <p className="truncate text-sm font-medium text-fg">Q4 pricing proposal</p>
    <p className="text-xs text-fg-muted">Edited just now</p>
  </div>
  <LiveCursorsBar
    people={[
      { name: "Maya Chen", color: "var(--chart-1)" },
      { name: "Theo Okafor", color: "var(--chart-2)" },
      { name: "Priya Raman", color: "var(--chart-3)" },
    ]}
  />
</div>`,
    node: (
      <div className="flex w-full max-w-xl items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-fg">Q4 pricing proposal</p>
          <p className="text-xs text-fg-muted">Edited just now</p>
        </div>
        <LiveCursorsBar
          people={[
            { name: "Maya Chen", color: "var(--chart-1)" },
            { name: "Theo Okafor", color: "var(--chart-2)" },
            { name: "Priya Raman", color: "var(--chart-3)" },
          ]}
        />
      </div>
    ),
  },
  {
    title: "People joining and leaving",
    description: "Pass a new people array whenever presence changes; the count follows it.",
    code: `function PresenceDemo() {
  const [adaHere, setAdaHere] = React.useState(false)
  const people = [
    { name: "Maya Chen", color: "var(--chart-1)" },
    ...(adaHere ? [{ name: "Ada Novak", color: "var(--chart-5)" }] : []),
  ]
  return (
    <div className="flex items-center gap-4">
      <LiveCursorsBar people={people} />
      <Button size="sm" variant="outline" onClick={() => setAdaHere((v) => !v)}>
        {adaHere ? "Ada leaves" : "Ada joins"}
      </Button>
    </div>
  )
}`,
    node: <PresenceDemo />,
  },
]
