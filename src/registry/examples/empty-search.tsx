"use client"
import * as React from "react"
import { EmptySearch } from "@/registry/ui/empty-search"
import { Input } from "@/registry/ui/input"
import type { Example } from "./types"

const CUSTOMERS = ["Northwind Traders", "Halcyon Labs", "Acme Corp", "Brightline Studio"]

function CustomerSearch() {
  const [query, setQuery] = React.useState("Globex")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const results = CUSTOMERS.filter((c) => c.toLowerCase().includes(query.trim().toLowerCase()))
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Input ref={inputRef} type="search" aria-label="Search customers" value={query} onChange={(e) => setQuery(e.target.value)} />
      {results.length ? (
        <ul className="rounded-xl border border-border bg-surface text-sm text-fg">
          {results.map((c) => (
            <li key={c} className="border-b border-border px-3 py-2 last:border-b-0">{c}</li>
          ))}
        </ul>
      ) : (
        <EmptySearch
          query={query}
          onClear={() => {
            setQuery("")
            inputRef.current?.focus()
          }}
        />
      )}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Filtered list with Clear search",
    description: "onClear empties the query and puts focus back in the field, so keyboard users can type again.",
    code: `const CUSTOMERS = ["Northwind Traders", "Halcyon Labs", "Acme Corp", "Brightline Studio"]

function CustomerSearch() {
  const [query, setQuery] = React.useState("Globex")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const results = CUSTOMERS.filter((c) => c.toLowerCase().includes(query.trim().toLowerCase()))
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Input ref={inputRef} type="search" aria-label="Search customers" value={query} onChange={(e) => setQuery(e.target.value)} />
      {results.length ? (
        <ul className="rounded-xl border border-border bg-surface text-sm text-fg">
          {results.map((c) => (
            <li key={c} className="border-b border-border px-3 py-2 last:border-b-0">{c}</li>
          ))}
        </ul>
      ) : (
        <EmptySearch
          query={query}
          onClear={() => {
            setQuery("")
            inputRef.current?.focus()
          }}
        />
      )}
    </div>
  )
}`,
    node: <CustomerSearch />,
  },
  {
    title: "A hint instead of a button",
    description: "Leave out onClear when clearing would not help, and use description to say what is searched.",
    code: `<EmptySearch
  query="maya@northwind.example"
  description="Members are matched by name and email. Check the spelling, or invite them from Settings."
  className="w-full max-w-md"
/>`,
    node: (
      <EmptySearch
        query="maya@northwind.example"
        description="Members are matched by name and email. Check the spelling, or invite them from Settings."
        className="w-full max-w-md"
      />
    ),
  },
]
