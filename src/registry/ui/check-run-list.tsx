"use client"
import * as React from "react"
import { CheckIcon, CircleDashedIcon, CircleSlashIcon, LoaderCircleIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A compact list of CI checks (build, lint, e2e) with a status icon and word for each.
 *
 * Use on pull request, deploy and release screens. For a multi-stage pipeline with arrows use BuildPipeline.
 * Status is always spelled out in text, never colour alone.
 *
 * @example
 * <CheckRunList runs={[{ name: "build", status: "success" }, { name: "e2e", status: "running" }]} />
 */
type CheckRunListProps = {
  /** Checks in display order. `name` is the React key, so keep names unique. */
  runs?: CheckRun[]
  /** Accessible name for the list. Defaults to "Checks". */
  label?: string
  className?: string
}

type CheckRun = {
  name: string
  status: CheckRunStatus
  /** Optional trailing detail such as "1m 12s". */
  detail?: string
}

type CheckRunStatus = "success" | "failed" | "running" | "queued" | "skipped"

const ICON: Record<CheckRunStatus, React.ReactNode> = {
  success: <CheckIcon aria-hidden className="size-4 text-success" />,
  failed: <XIcon aria-hidden className="size-4 text-danger" />,
  running: <LoaderCircleIcon aria-hidden className="size-4 animate-spin text-accent" />,
  queued: <CircleDashedIcon aria-hidden className="size-4 text-fg-subtle" />,
  skipped: <CircleSlashIcon aria-hidden className="size-4 text-fg-subtle" />,
}

const SAMPLE_RUNS: CheckRun[] = [
  { name: "build", status: "success" },
  { name: "audit", status: "success" },
  { name: "e2e", status: "running" },
]

function CheckRunList({ runs = SAMPLE_RUNS, label = "Checks", className }: CheckRunListProps) {
  return (
    <ul
      data-slot="check-run-list"
      aria-label={label}
      className={cn("divide-y divide-border rounded-xl border border-border bg-surface", className)}
    >
      {runs.map((r) => (
        <li key={r.name} data-status={r.status} className="flex items-center gap-2 px-3 py-2.5 text-sm">
          {ICON[r.status]}
          <span className="min-w-0 flex-1 truncate font-mono text-fg">{r.name}</span>
          {r.detail ? <span className="text-xs tabular-nums text-fg-subtle">{r.detail}</span> : null}
          <span className={cn("text-xs capitalize", r.status === "failed" ? "text-danger" : "text-fg-muted")}>{r.status}</span>
        </li>
      ))}
    </ul>
  )
}
export { CheckRunList }
export type { CheckRunListProps, CheckRun, CheckRunStatus }
