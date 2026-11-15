"use client"
import * as React from "react"
import { AddCardForm } from "@/registry/ui/add-card-form"
import type { Example } from "./types"

function SaveCardDemo() {
  const [saved, setSaved] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <AddCardForm
        onSubmit={(data) => {
          const digits = String(data.get("cc-number")).replace(/\D/g, "")
          setSaved("Card ending in " + digits.slice(-4) + " saved, expires " + data.get("cc-exp"))
        }}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{saved ?? "Nothing saved yet."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Read the FormData",
    description: "onSubmit gets the form's FormData without a page reload; strip the spaces from cc-number before you use it.",
    code: `function SaveCardDemo() {
  const [saved, setSaved] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <AddCardForm
        onSubmit={(data) => {
          const digits = String(data.get("cc-number")).replace(/\\D/g, "")
          setSaved("Card ending in " + digits.slice(-4) + " saved, expires " + data.get("cc-exp"))
        }}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{saved ?? "Nothing saved yet."}</p>
    </div>
  )
}`,
    node: <SaveCardDemo />,
  },
  {
    title: "Pay at checkout",
    description: "submitLabel names the charge, so the button says what happens; the card sits under the order total.",
    code: `<div className="w-full max-w-sm rounded-xl border border-border bg-surface p-5 shadow-raised">
  <div className="mb-4 flex items-baseline justify-between">
    <h3 className="text-sm font-medium text-fg">Lumen Pro, monthly</h3>
    <span className="text-sm font-medium tabular-nums text-fg">$49.00</span>
  </div>
  <AddCardForm submitLabel="Pay $49.00" />
</div>`,
    node: (
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-5 shadow-raised">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-sm font-medium text-fg">Lumen Pro, monthly</h3>
          <span className="text-sm font-medium tabular-nums text-fg">$49.00</span>
        </div>
        <AddCardForm submitLabel="Pay $49.00" />
      </div>
    ),
  },
]
