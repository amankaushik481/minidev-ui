"use client"
import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Spinner } from "@/registry/ui/spinner"
import type { Example } from "./types"

function SaveButton() {
  const [state, setState] = React.useState<"idle" | "saving" | "saved">("idle")
  React.useEffect(() => {
    if (state !== "saving") return
    const t = window.setTimeout(() => setState("saved"), 1400)
    return () => window.clearTimeout(t)
  }, [state])
  return (
    <Button onClick={() => setState("saving")} disabled={state === "saving"} className="w-36">
      {state === "saving" ? (
        <>
          <Spinner className="border-on-ink/30 border-t-on-ink" label="Saving" /> Saving
        </>
      ) : state === "saved" ? (
        <>
          <CheckIcon /> Saved
        </>
      ) : (
        "Save changes"
      )}
    </Button>
  )
}

export const examples: Example[] = [
  {
    title: "Sizes",
    description: "14, 16 and 24px rings; the large one uses a slightly heavier stroke.",
    code: `<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`,
    node: (
      <div className="flex items-center gap-6">
        <Spinner size="sm" />
        <Spinner />
        <Spinner size="lg" />
      </div>
    ),
  },
  {
    title: "With text",
    description: "Pair it with a short status line; the label prop is what screen readers announce.",
    code: `<div className="flex items-center gap-2 text-sm text-fg-muted">
  <Spinner label="Syncing" />
  Syncing 3 bank accounts
</div>`,
    node: (
      <div className="flex items-center gap-2 text-sm text-fg-muted">
        <Spinner label="Syncing" />
        Syncing 3 bank accounts
      </div>
    ),
  },
  {
    title: "Inside a button",
    description: "Recolour the ring for dark buttons with border utilities and fix the width so the label swap does not shift.",
    code: `function SaveButton() {
  const [state, setState] = React.useState<"idle" | "saving" | "saved">("idle")
  React.useEffect(() => {
    if (state !== "saving") return
    const t = window.setTimeout(() => setState("saved"), 1400)
    return () => window.clearTimeout(t)
  }, [state])
  return (
    <Button onClick={() => setState("saving")} disabled={state === "saving"} className="w-36">
      {state === "saving" ? (
        <>
          <Spinner className="border-on-ink/30 border-t-on-ink" label="Saving" /> Saving
        </>
      ) : state === "saved" ? (
        <>
          <CheckIcon /> Saved
        </>
      ) : (
        "Save changes"
      )}
    </Button>
  )
}`,
    node: <SaveButton />,
  },
  {
    title: "Loading a panel",
    description: "Centre a large spinner in the space the content will take, so the layout holds.",
    code: `<div className="flex h-40 w-full max-w-sm flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface">
  <Spinner size="lg" label="Loading invoices" />
  <p className="text-xs text-fg-muted">Loading invoices</p>
</div>`,
    node: (
      <div className="flex h-40 w-full max-w-sm flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface">
        <Spinner size="lg" label="Loading invoices" />
        <p className="text-xs text-fg-muted">Loading invoices</p>
      </div>
    ),
  },
]
