"use client"
import * as React from "react"
import { FileTextIcon, GlobeIcon, TableIcon } from "lucide-react"
import { ContextPill } from "@/registry/ui/context-pill"
import type { Example } from "./types"

function AttachedContext() {
  const [items, setItems] = React.useState([
    { id: "doc", label: "Q3 board memo", icon: <FileTextIcon /> },
    { id: "url", label: "acme.example/pricing", icon: <GlobeIcon /> },
    { id: "rows", label: "12 rows from Invoices", icon: <TableIcon /> },
  ])
  return (
    <div className="flex w-full max-w-md flex-wrap gap-1.5">
      {items.map((it) => (
        <ContextPill key={it.id} icon={it.icon} onRemove={() => setItems((all) => all.filter((x) => x.id !== it.id))}>
          {it.label}
        </ContextPill>
      ))}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Attached context",
    description: "A row of removable pills above the prompt. String children name the remove button for you.",
    code: `function AttachedContext() {
  const [items, setItems] = React.useState([
    { id: "doc", label: "Q3 board memo", icon: <FileTextIcon /> },
    { id: "url", label: "acme.example/pricing", icon: <GlobeIcon /> },
    { id: "rows", label: "12 rows from Invoices", icon: <TableIcon /> },
  ])
  return (
    <div className="flex w-full max-w-md flex-wrap gap-1.5">
      {items.map((it) => (
        <ContextPill key={it.id} icon={it.icon} onRemove={() => setItems((all) => all.filter((x) => x.id !== it.id))}>
          {it.label}
        </ContextPill>
      ))}
    </div>
  )
}`,
    node: <AttachedContext />,
  },
  {
    title: "Sources an answer used",
    description: "Without onRemove the pills are read-only labels. With JSX children, pass removeLabel when the pill is removable.",
    code: `<div className="flex max-w-md flex-wrap items-center gap-1.5">
  <span className="text-xs text-fg-muted">Answered using</span>
  <ContextPill icon={<FileTextIcon />}>Refund policy v4</ContextPill>
  <ContextPill icon={<GlobeIcon />} removeLabel="Remove status page" onRemove={() => {}}>
    <span className="font-mono">status.acme.example</span>
  </ContextPill>
</div>`,
    node: (
      <div className="flex max-w-md flex-wrap items-center gap-1.5">
        <span className="text-xs text-fg-muted">Answered using</span>
        <ContextPill icon={<FileTextIcon />}>Refund policy v4</ContextPill>
        <ContextPill icon={<GlobeIcon />} removeLabel="Remove status page" onRemove={() => {}}>
          <span className="font-mono">status.acme.example</span>
        </ContextPill>
      </div>
    ),
  },
]
