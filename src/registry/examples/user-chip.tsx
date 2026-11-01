"use client"
import * as React from "react"
import { UserChip } from "@/registry/ui/user-chip"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function ShareListDemo() {
  const [people, setPeople] = React.useState(["Maya Chen", "Theo Okafor", "Priya Raman"])
  const remove = (name: string) => setPeople((p) => p.filter((n) => n !== name))
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <p className="text-xs text-fg-muted">Shared with {people.length} {people.length === 1 ? "person" : "people"}</p>
      <div className="flex flex-wrap gap-1.5">
        {people.map((name) => (
          <UserChip key={name} name={name} onRemove={() => remove(name)} />
        ))}
      </div>
      {people.length < 3 ? (
        <Button size="sm" variant="ghost" className="self-start" onClick={() => setPeople(["Maya Chen", "Theo Okafor", "Priya Raman"])}>
          Reset
        </Button>
      ) : null}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Removable chips",
    description: "Pass onRemove and the chip grows an X button; keep the list in state and filter it when a chip is removed.",
    code: `function ShareListDemo() {
  const [people, setPeople] = React.useState(["Maya Chen", "Theo Okafor", "Priya Raman"])
  const remove = (name: string) => setPeople((p) => p.filter((n) => n !== name))
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <p className="text-xs text-fg-muted">Shared with {people.length} {people.length === 1 ? "person" : "people"}</p>
      <div className="flex flex-wrap gap-1.5">
        {people.map((name) => (
          <UserChip key={name} name={name} onRemove={() => remove(name)} />
        ))}
      </div>
      {people.length < 3 ? (
        <Button size="sm" variant="ghost" className="self-start" onClick={() => setPeople(["Maya Chen", "Theo Okafor", "Priya Raman"])}>
          Reset
        </Button>
      ) : null}
    </div>
  )
}`,
    node: <ShareListDemo />,
  },
  {
    title: "With a photo",
    description: "src swaps the initials for an image; the fallback still renders while it loads or if it fails.",
    code: `<UserChip name="Sam Lowe" src="/icons/icon-96.png" />
<UserChip name="Priya Raman" />`,
    node: (
      <div className="flex flex-wrap items-center gap-2">
        <UserChip name="Sam Lowe" src="/icons/icon-96.png" />
        <UserChip name="Priya Raman" />
      </div>
    ),
  },
  {
    title: "Inline in a sentence",
    description: "The chip is an inline-flex span, so it sits in running text and table cells without extra wrappers.",
    code: `<p className="max-w-md text-sm leading-7 text-fg-muted">
  INV-2041 was approved by <UserChip name="Theo Okafor" className="mx-0.5 align-middle" /> and is waiting on{" "}
  <UserChip name="Maya Chen" className="mx-0.5 align-middle" /> for payment.
</p>`,
    node: (
      <p className="max-w-md text-sm leading-7 text-fg-muted">
        INV-2041 was approved by <UserChip name="Theo Okafor" className="mx-0.5 align-middle" /> and is waiting on{" "}
        <UserChip name="Maya Chen" className="mx-0.5 align-middle" /> for payment.
      </p>
    ),
  },
]
