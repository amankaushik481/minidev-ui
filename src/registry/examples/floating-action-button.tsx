import { PencilIcon, PlusIcon } from "lucide-react"
import { FloatingActionButton } from "@/registry/ui/floating-action-button"
import type { Example } from "./types"

const INVOICES = ["INV-2041 · Northwind Traders", "INV-2040 · Summit Dental Group", "INV-2039 · Helix Biotech", "INV-2038 · Blue Harbor Co.", "INV-2037 · Meridian Freight", "INV-2036 · Granite Peak Outfitters", "INV-2035 · Cobalt Systems", "INV-2034 · Juniper Studio"]

export const examples: Example[] = [
  {
    title: "Extended with label",
    description: "Fixed to the viewport by default; inside a scrolling panel, switch it to absolute and pad the list so the last row can scroll clear of it.",
    code: `const INVOICES = ["INV-2041 · Northwind Traders", "INV-2040 · Summit Dental Group", "INV-2039 · Helix Biotech", "INV-2038 · Blue Harbor Co.", "INV-2037 · Meridian Freight", "INV-2036 · Granite Peak Outfitters", "INV-2035 · Cobalt Systems", "INV-2034 · Juniper Studio"]

<div className="relative h-72 w-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-raised">
  <ul className="h-full divide-y divide-border overflow-y-auto pb-16 text-sm">
    {INVOICES.map((line) => <li key={line} className="px-4 py-2.5 text-fg">{line}</li>)}
  </ul>
  <FloatingActionButton className="absolute right-4 bottom-4">
    <PlusIcon /> New invoice
  </FloatingActionButton>
</div>`,
    node: (
      <div className="relative h-72 w-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-raised">
        <ul className="h-full divide-y divide-border overflow-y-auto pb-16 text-sm">
          {INVOICES.map((line) => <li key={line} className="px-4 py-2.5 text-fg">{line}</li>)}
        </ul>
        <FloatingActionButton className="absolute right-4 bottom-4">
          <PlusIcon /> New invoice
        </FloatingActionButton>
      </div>
    ),
  },
  {
    title: "Icon only",
    description: "Use the icon-lg size with an aria-label for the classic round button, and the accent variant to make it the page's one primary action.",
    code: `<div className="relative h-56 w-80 overflow-hidden rounded-2xl border border-border bg-sunken shadow-raised">
  <p className="px-4 pt-4 text-sm text-fg-muted">Notes for Northwind Traders</p>
  <p className="px-4 pt-1 text-xs text-fg-subtle">Nothing here yet.</p>
  <FloatingActionButton variant="accent" size="icon-lg" aria-label="New note" className="absolute right-4 bottom-4">
    <PencilIcon />
  </FloatingActionButton>
</div>`,
    node: (
      <div className="relative h-56 w-80 overflow-hidden rounded-2xl border border-border bg-sunken shadow-raised">
        <p className="px-4 pt-4 text-sm text-fg-muted">Notes for Northwind Traders</p>
        <p className="px-4 pt-1 text-xs text-fg-subtle">Nothing here yet.</p>
        <FloatingActionButton variant="accent" size="icon-lg" aria-label="New note" className="absolute right-4 bottom-4">
          <PencilIcon />
        </FloatingActionButton>
      </div>
    ),
  },
]
