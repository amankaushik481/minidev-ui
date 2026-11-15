"use client"
import * as React from "react"
import { ChipFilter } from "@/registry/ui/chip-filter"
import { DateRangePicker } from "@/registry/ui/date-range-picker"
import { FilterBar } from "@/registry/ui/filter-bar"
import type { Example } from "./types"

const accounts = [
  { name: "Northwind Labs", plan: "pro" },
  { name: "Halcyon Health", plan: "starter" },
  { name: "Fathom Analytics", plan: "pro" },
  { name: "Meridian Labs", plan: "starter" },
  { name: "Tessel Robotics", plan: "pro" },
]

function CustomerFilters() {
  const [query, setQuery] = React.useState("")
  const [plan, setPlan] = React.useState("all")
  const q = query.trim().toLowerCase()
  const rows = accounts.filter((c) => (plan === "all" || c.plan === plan) && c.name.toLowerCase().includes(q))
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder="Filter customers…"
        onClear={() => {
          setQuery("")
          setPlan("all")
        }}
      >
        <ChipFilter
          label="Plan"
          options={[
            { value: "all", label: "All" },
            { value: "starter", label: "Starter" },
            { value: "pro", label: "Pro" },
          ]}
          value={plan}
          onChange={setPlan}
        />
      </FilterBar>
      <ul className="divide-y divide-border rounded-xl border border-border bg-surface text-sm">
        {rows.map((c) => (
          <li key={c.name} className="flex justify-between px-3 py-2">
            <span className="text-fg">{c.name}</span>
            <span className="capitalize text-fg-muted">{c.plan}</span>
          </li>
        ))}
        {rows.length === 0 ? <li className="px-3 py-6 text-center text-fg-muted">No customers match.</li> : null}
      </ul>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Text and plan filters",
    description: "Control the query so Clear can reset it together with the plan chips.",
    code: `const accounts = [
  { name: "Northwind Labs", plan: "pro" },
  { name: "Halcyon Health", plan: "starter" },
  { name: "Fathom Analytics", plan: "pro" },
  { name: "Meridian Labs", plan: "starter" },
  { name: "Tessel Robotics", plan: "pro" },
]

function CustomerFilters() {
  const [query, setQuery] = React.useState("")
  const [plan, setPlan] = React.useState("all")
  const q = query.trim().toLowerCase()
  const rows = accounts.filter((c) => (plan === "all" || c.plan === plan) && c.name.toLowerCase().includes(q))
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder="Filter customers…"
        onClear={() => {
          setQuery("")
          setPlan("all")
        }}
      >
        <ChipFilter
          label="Plan"
          options={[
            { value: "all", label: "All" },
            { value: "starter", label: "Starter" },
            { value: "pro", label: "Pro" },
          ]}
          value={plan}
          onChange={setPlan}
        />
      </FilterBar>
      <ul className="divide-y divide-border rounded-xl border border-border bg-surface text-sm">
        {rows.map((c) => (
          <li key={c.name} className="flex justify-between px-3 py-2">
            <span className="text-fg">{c.name}</span>
            <span className="capitalize text-fg-muted">{c.plan}</span>
          </li>
        ))}
        {rows.length === 0 ? <li className="px-3 py-6 text-center text-fg-muted">No customers match.</li> : null}
      </ul>
    </div>
  )
}`,
    node: <CustomerFilters />,
  },
  {
    title: "With a date range",
    description: "Any control can go in children; here a payout date range after the text field.",
    code: `<FilterBar placeholder="Filter payouts…" className="w-full max-w-2xl">
  <DateRangePicker aria-label="Payout dates" defaultValue={{ from: "2026-11-01", to: "2026-11-15" }} />
</FilterBar>`,
    node: (
      <FilterBar placeholder="Filter payouts…" className="w-full max-w-2xl">
        <DateRangePicker aria-label="Payout dates" defaultValue={{ from: "2026-11-01", to: "2026-11-15" }} />
      </FilterBar>
    ),
  },
]
