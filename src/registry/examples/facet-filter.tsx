"use client"
import * as React from "react"
import { FacetFilter } from "@/registry/ui/facet-filter"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const PLANS = [
  { value: "starter", label: "Starter", count: 212 },
  { value: "growth", label: "Growth", count: 86 },
  { value: "scale", label: "Scale", count: 19 },
  { value: "trial", label: "Trial", count: 47 },
]

const STATUSES = [
  { value: "paid", label: "Paid", count: 128 },
  { value: "open", label: "Open", count: 42 },
  { value: "overdue", label: "Overdue", count: 9 },
]

function ControlledDemo() {
  const [status, setStatus] = React.useState<string[]>(["open", "overdue"])
  const total = STATUSES.reduce((n, s) => n + s.count, 0)
  const matching = STATUSES.filter((s) => status.includes(s.value)).reduce((n, s) => n + s.count, 0)
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <FacetFilter title="Payment" options={STATUSES} value={status} onChange={setStatus} />
      <div className="flex items-center justify-between border-t border-border pt-3">
        <p className="text-xs text-fg-muted tabular-nums">
          {status.length ? `${matching} of ${total} invoices` : `All ${total} invoices`}
        </p>
        <Button size="xs" variant="ghost" disabled={!status.length} onClick={() => setStatus([])}>
          Clear
        </Button>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom facets",
    description: "Pass a title and options with counts; defaultValue picks which boxes start checked.",
    code: `const PLANS = [
  { value: "starter", label: "Starter", count: 212 },
  { value: "growth", label: "Growth", count: 86 },
  { value: "scale", label: "Scale", count: 19 },
  { value: "trial", label: "Trial", count: 47 },
]

<FacetFilter title="Plan" options={PLANS} defaultValue={["growth", "scale"]} />`,
    node: <FacetFilter title="Plan" options={PLANS} defaultValue={["growth", "scale"]} />,
  },
  {
    title: "Controlled selection",
    description: "Hold the selected values in state to show a result count and offer a clear button.",
    code: `const STATUSES = [
  { value: "paid", label: "Paid", count: 128 },
  { value: "open", label: "Open", count: 42 },
  { value: "overdue", label: "Overdue", count: 9 },
]

function ControlledDemo() {
  const [status, setStatus] = React.useState<string[]>(["open", "overdue"])
  const total = STATUSES.reduce((n, s) => n + s.count, 0)
  const matching = STATUSES.filter((s) => status.includes(s.value)).reduce((n, s) => n + s.count, 0)
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <FacetFilter title="Payment" options={STATUSES} value={status} onChange={setStatus} />
      <div className="flex items-center justify-between border-t border-border pt-3">
        <p className="text-xs text-fg-muted tabular-nums">
          {status.length ? \`\${matching} of \${total} invoices\` : \`All \${total} invoices\`}
        </p>
        <Button size="xs" variant="ghost" disabled={!status.length} onClick={() => setStatus([])}>
          Clear
        </Button>
      </div>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Several groups",
    description: "Stack groups with different titles in a sidebar; titles must be unique because they form the checkbox ids.",
    code: `<aside className="flex w-full max-w-xs flex-col gap-6">
  <FacetFilter
    title="Owner"
    options={[
      { value: "maya", label: "Maya Chen", count: 64 },
      { value: "theo", label: "Theo Okafor", count: 51 },
      { value: "priya", label: "Priya Raman", count: 38 },
      { value: "sam", label: "Sam Lowe", count: 26 },
    ]}
    defaultValue={["maya"]}
  />
  <FacetFilter
    title="Region"
    options={[
      { value: "us", label: "United States", count: 201 },
      { value: "eu", label: "Europe", count: 134 },
      { value: "apac", label: "Asia Pacific", count: 29 },
    ]}
  />
</aside>`,
    node: (
      <aside className="flex w-full max-w-xs flex-col gap-6">
        <FacetFilter
          title="Owner"
          options={[
            { value: "maya", label: "Maya Chen", count: 64 },
            { value: "theo", label: "Theo Okafor", count: 51 },
            { value: "priya", label: "Priya Raman", count: 38 },
            { value: "sam", label: "Sam Lowe", count: 26 },
          ]}
          defaultValue={["maya"]}
        />
        <FacetFilter
          title="Region"
          options={[
            { value: "us", label: "United States", count: 201 },
            { value: "eu", label: "Europe", count: 134 },
            { value: "apac", label: "Asia Pacific", count: 29 },
          ]}
        />
      </aside>
    ),
  },
]
