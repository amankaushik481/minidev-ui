"use client"
import * as React from "react"
import { QueryBuilder, type Clause } from "@/registry/ui/query-builder"
import type { Example } from "./types"

function IssueFilters() {
  const [clauses, setClauses] = React.useState<Clause[]>([
    { id: "1", field: "status", op: "is", value: "open" },
    { id: "2", field: "label", op: "is not", value: "wontfix" },
  ])
  const query = clauses
    .filter((c) => c.value.trim())
    .map((c) => c.field + " " + c.op + " \"" + c.value + "\"")
    .join(" AND ")
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <QueryBuilder value={clauses} onChange={setClauses} fields={["status", "assignee", "label", "priority"]} />
      <p className="rounded-lg bg-sunken px-3 py-2 font-mono text-xs text-fg-muted">{query || "No filters"}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Building a query string",
    description: "Control the clauses and turn them into the text you would send, skipping empty values.",
    code: `function IssueFilters() {
  const [clauses, setClauses] = React.useState<Clause[]>([
    { id: "1", field: "status", op: "is", value: "open" },
    { id: "2", field: "label", op: "is not", value: "wontfix" },
  ])
  const query = clauses
    .filter((c) => c.value.trim())
    .map((c) => c.field + " " + c.op + " \\"" + c.value + "\\"")
    .join(" AND ")
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <QueryBuilder value={clauses} onChange={setClauses} fields={["status", "assignee", "label", "priority"]} />
      <p className="rounded-lg bg-sunken px-3 py-2 font-mono text-xs text-fg-muted">{query || "No filters"}</p>
    </div>
  )
}`,
    node: <IssueFilters />,
  },
  {
    title: "Log search fields",
    description: "Pass your own fields and operators; uncontrolled with defaultValue.",
    code: `<QueryBuilder
  className="w-full max-w-xl"
  fields={["level", "service", "message"]}
  operators={["is", "is not", "contains", "starts with"]}
  defaultValue={[
    { id: "l1", field: "level", op: "is", value: "error" },
    { id: "l2", field: "service", op: "starts with", value: "billing" },
  ]}
/>`,
    node: (
      <QueryBuilder
        className="w-full max-w-xl"
        fields={["level", "service", "message"]}
        operators={["is", "is not", "contains", "starts with"]}
        defaultValue={[
          { id: "l1", field: "level", op: "is", value: "error" },
          { id: "l2", field: "service", op: "starts with", value: "billing" },
        ]}
      />
    ),
  },
]
