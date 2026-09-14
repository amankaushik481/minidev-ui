"use client"
import * as React from "react"
import { CheckIcon, LoaderCircleIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Run = { name: string; status: "success" | "failed" | "running" }

function CheckRunList({
  runs = [
    { name: "build", status: "success" },
    { name: "audit", status: "success" },
    { name: "e2e", status: "running" },
  ],
  className,
}: {
  runs?: Run[]
  className?: string
}) {
  return (
    <ul data-slot="check-run-list" className={cn("divide-y divide-border rounded-xl border border-border bg-surface", className)}>
      {runs.map((r) => (
        <li key={r.name} className="flex items-center gap-2 px-3 py-2.5 text-sm">
          {r.status === "success" ? <CheckIcon className="size-4 text-success" /> : null}
          {r.status === "failed" ? <XIcon className="size-4 text-danger" /> : null}
          {r.status === "running" ? <LoaderCircleIcon className="size-4 animate-spin text-accent" /> : null}
          <span className="flex-1 font-mono text-fg">{r.name}</span>
          <span className="text-xs capitalize text-fg-muted">{r.status}</span>
        </li>
      ))}
    </ul>
  )
}
export { CheckRunList }
