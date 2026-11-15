"use client"
import * as React from "react"
import { BeforeAfterWipe } from "@/registry/premium/before-after-wipe"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const ROWS = [
  ["INV-2041", "Northwind", "$4,200.00"],
  ["INV-2042", "Halcyon", "$1,180.00"],
  ["INV-2043", "Fathom", "$860.00"],
]

function Ledger({ label, tidy }: { label: string; tidy?: boolean }) {
  return (
    <div className={tidy ? "size-full bg-bg p-5" : "size-full bg-sunken p-5"}>
      <p className="text-xs font-medium text-fg-muted">{label}</p>
      <ul className={tidy ? "mt-3 space-y-2" : "mt-3 space-y-0.5"}>
        {ROWS.map(([id, who, amt]) => (
          <li
            key={id}
            className={
              tidy
                ? "flex justify-between rounded-lg border border-border bg-surface px-3 py-2 text-sm shadow-raised"
                : "flex justify-between border-b border-border px-1 py-1 font-mono text-[11px] text-fg-muted"
            }
          >
            <span>{id} · {who}</span>
            <span className="tabular-nums">{amt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ControlledWipe() {
  const [pct, setPct] = React.useState(50)
  return (
    <div className="w-full max-w-xl space-y-3">
      <BeforeAfterWipe
        value={pct}
        onValueChange={setPct}
        beforeLabel="Old ledger"
        afterLabel="New ledger"
        before={<Ledger label="Old ledger" />}
        after={<Ledger label="New ledger" tidy />}
      />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setPct(100)}>Old</Button>
        <Button size="sm" variant="outline" onClick={() => setPct(50)}>Split</Button>
        <Button size="sm" variant="outline" onClick={() => setPct(0)}>New</Button>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Your own layers",
    description: "before and after take any content. The labels are only read by screen readers here, so each layer prints its own.",
    code: `<BeforeAfterWipe
  className="w-full max-w-xl"
  beforeLabel="Old ledger"
  afterLabel="New ledger"
  defaultValue={60}
  before={<Ledger label="Old ledger" />}
  after={<Ledger label="New ledger" tidy />}
/>`,
    node: (
      <BeforeAfterWipe
        className="w-full max-w-xl"
        beforeLabel="Old ledger"
        afterLabel="New ledger"
        defaultValue={60}
        before={<Ledger label="Old ledger" />}
        after={<Ledger label="New ledger" tidy />}
      />
    ),
  },
  {
    title: "Controlled with presets",
    description: "value is the share of the width showing before: 100 is all old, 0 all new. Buttons jump the divider; dragging still works.",
    code: `function ControlledWipe() {
  const [pct, setPct] = React.useState(50)
  return (
    <div className="w-full max-w-xl space-y-3">
      <BeforeAfterWipe
        value={pct}
        onValueChange={setPct}
        beforeLabel="Old ledger"
        afterLabel="New ledger"
        before={<Ledger label="Old ledger" />}
        after={<Ledger label="New ledger" tidy />}
      />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setPct(100)}>Old</Button>
        <Button size="sm" variant="outline" onClick={() => setPct(50)}>Split</Button>
        <Button size="sm" variant="outline" onClick={() => setPct(0)}>New</Button>
      </div>
    </div>
  )
}`,
    node: <ControlledWipe />,
  },
]
