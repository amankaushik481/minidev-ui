"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { StickyBar } from "@/registry/ui/sticky-bar"
import type { Example } from "./types"

function UnsavedChanges() {
  const [saved, setSaved] = React.useState("Northwind Traders")
  const [name, setName] = React.useState(saved)
  return (
    <div className="flex h-56 w-full max-w-md flex-col overflow-auto rounded-xl border border-border bg-bg">
      <div className="flex-1 space-y-2 p-4">
        <Label htmlFor="customer-name">Customer name</Label>
        <Input id="customer-name" value={name} onChange={(e) => setName(e.target.value)} />
        <p className="text-xs text-fg-muted">Change the name to see the bar.</p>
      </div>
      {name !== saved ? (
        <StickyBar role="region" aria-label="Unsaved changes">
          <span className="text-sm text-fg-muted">Unsaved changes</span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => setName(saved)}>Discard</Button>
            <Button size="sm" onClick={() => setSaved(name)}>Save</Button>
          </div>
        </StickyBar>
      ) : null}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Bulk actions",
    description: "The bar is the last child of the scrolling box, so it stays pinned while the list scrolls.",
    code: `<div className="h-64 w-full max-w-md overflow-auto rounded-xl border border-border bg-bg">
  <ul className="divide-y divide-border">
    {["INV-2041 · Northwind Traders", "INV-2040 · Summit Dental", "INV-2039 · Blue Harbor Co.", "INV-2038 · Helix Biotech", "INV-2037 · Meridian Freight", "INV-2036 · Oakline Studio"].map((row) => (
      <li key={row} className="px-4 py-3 text-sm text-fg">{row}</li>
    ))}
  </ul>
  <StickyBar role="region" aria-label="Bulk actions">
    <span className="text-sm text-fg-muted">3 selected</span>
    <div className="flex gap-2">
      <Button size="sm" variant="outline">Export</Button>
      <Button size="sm" variant="destructive">Delete</Button>
    </div>
  </StickyBar>
</div>`,
    node: (
      <div className="h-64 w-full max-w-md overflow-auto rounded-xl border border-border bg-bg">
        <ul className="divide-y divide-border">
          {["INV-2041 · Northwind Traders", "INV-2040 · Summit Dental", "INV-2039 · Blue Harbor Co.", "INV-2038 · Helix Biotech", "INV-2037 · Meridian Freight", "INV-2036 · Oakline Studio"].map((row) => (
            <li key={row} className="px-4 py-3 text-sm text-fg">{row}</li>
          ))}
        </ul>
        <StickyBar role="region" aria-label="Bulk actions">
          <span className="text-sm text-fg-muted">3 selected</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Export</Button>
            <Button size="sm" variant="destructive">Delete</Button>
          </div>
        </StickyBar>
      </div>
    ),
  },
  {
    title: "Unsaved changes",
    description: "Render the bar only while the form differs from what was saved.",
    code: `function UnsavedChanges() {
  const [saved, setSaved] = React.useState("Northwind Traders")
  const [name, setName] = React.useState(saved)
  return (
    <div className="flex h-56 w-full max-w-md flex-col overflow-auto rounded-xl border border-border bg-bg">
      <div className="flex-1 space-y-2 p-4">
        <Label htmlFor="customer-name">Customer name</Label>
        <Input id="customer-name" value={name} onChange={(e) => setName(e.target.value)} />
        <p className="text-xs text-fg-muted">Change the name to see the bar.</p>
      </div>
      {name !== saved ? (
        <StickyBar role="region" aria-label="Unsaved changes">
          <span className="text-sm text-fg-muted">Unsaved changes</span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => setName(saved)}>Discard</Button>
            <Button size="sm" onClick={() => setSaved(name)}>Save</Button>
          </div>
        </StickyBar>
      ) : null}
    </div>
  )
}`,
    node: <UnsavedChanges />,
  },
]
