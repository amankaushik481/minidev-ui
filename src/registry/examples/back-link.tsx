"use client"
import { BackLink } from "@/registry/ui/back-link"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Above a detail page title",
    description: "Name the parent list in the link text, so it reads as where you go, not just Back.",
    code: `<div className="flex w-full max-w-xl flex-col gap-3">
  <BackLink href="#">Invoices</BackLink>
  <div>
    <h2 className="text-xl font-medium tracking-[-0.01em] text-fg">INV-2041</h2>
    <p className="text-sm text-fg-muted">Northwind Traders · $12,400.00 · due Nov 28</p>
  </div>
</div>`,
    node: (
      <div className="flex w-full max-w-xl flex-col gap-3">
        <BackLink href="#">Invoices</BackLink>
        <div>
          <h2 className="text-xl font-medium tracking-[-0.01em] text-fg">INV-2041</h2>
          <p className="text-sm text-fg-muted">Northwind Traders · $12,400.00 · due Nov 28</p>
        </div>
      </div>
    ),
  },
  {
    title: "In an editor toolbar",
    description: "On a full-screen editor the back link sits at the left of the toolbar, across from the save actions.",
    code: `<div className="flex w-full max-w-xl items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2">
  <BackLink href="#">Email templates</BackLink>
  <div className="flex gap-2">
    <Button size="sm" variant="ghost">Preview</Button>
    <Button size="sm">Save</Button>
  </div>
</div>`,
    node: (
      <div className="flex w-full max-w-xl items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2">
        <BackLink href="#">Email templates</BackLink>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">Preview</Button>
          <Button size="sm">Save</Button>
        </div>
      </div>
    ),
  },
]
