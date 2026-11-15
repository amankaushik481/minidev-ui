"use client"
import { TrashIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { VisuallyHidden } from "@/registry/ui/visually-hidden"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Name for an icon-only button",
    description: "The hidden text names the button with the invoice it acts on; the icon is aria-hidden.",
    code: `<Button variant="ghost" size="icon">
  <TrashIcon aria-hidden />
  <VisuallyHidden>Delete invoice INV-2041</VisuallyHidden>
</Button>`,
    node: (
      <Button variant="ghost" size="icon">
        <TrashIcon aria-hidden />
        <VisuallyHidden>Delete invoice INV-2041</VisuallyHidden>
      </Button>
    ),
  },
  {
    title: "Context for repeated links",
    description: "Every row shows \"Edit\", but screen reader users hear which invoice each one edits.",
    code: `<ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
  {["INV-2041", "INV-2040", "INV-2039"].map((id) => (
    <li key={id} className="flex items-center justify-between px-4 py-2">
      <span className="font-mono text-xs text-fg">{id}</span>
      <Button variant="link" size="sm">
        Edit<VisuallyHidden> {id}</VisuallyHidden>
      </Button>
    </li>
  ))}
</ul>`,
    node: (
      <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
        {["INV-2041", "INV-2040", "INV-2039"].map((id) => (
          <li key={id} className="flex items-center justify-between px-4 py-2">
            <span className="font-mono text-xs text-fg">{id}</span>
            <Button variant="link" size="sm">
              Edit<VisuallyHidden> {id}</VisuallyHidden>
            </Button>
          </li>
        ))}
      </ul>
    ),
  },
]
