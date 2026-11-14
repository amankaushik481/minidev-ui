"use client"
import * as React from "react"
import { CheckIcon, LoaderCircleIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * CI/CD stages in a row (Install → Typecheck → Test → Deploy), each with a status icon.
 *
 * Use on deploy and PR pages for a glanceable pipeline. Prefer `AgentTrace` for a vertical log
 * with details, and `Stepper` for a user-driven multi-step flow. Wraps on narrow screens; each
 * stage announces its status, and the running stage is marked `aria-current="step"`.
 *
 * @example
 * <BuildPipeline stages={[
 *   { name: "Install", status: "success" },
 *   { name: "Test", status: "running" },
 *   { name: "Deploy", status: "pending" },
 * ]} />
 */
type BuildPipelineStatus = "success" | "running" | "failed" | "pending"

type Stage = {
  /** Stage name; also the React key, so keep names unique. */
  name: string
  status: BuildPipelineStatus
}

type BuildPipelineProps = {
  /** Stages in order. Omit for sample data. */
  stages?: Stage[]
  /** Accessible name of the list. */
  label?: string
  className?: string
}

const STATUS_TEXT: Record<BuildPipelineStatus, string> = { success: "passed", running: "running", failed: "failed", pending: "pending" }

const SAMPLE_STAGES: Stage[] = [
  { name: "Install", status: "success" },
  { name: "Typecheck", status: "success" },
  { name: "Audit", status: "running" },
  { name: "Deploy", status: "pending" },
]

function StageIcon({ status }: { status: BuildPipelineStatus }) {
  if (status === "success") return <CheckIcon className="size-3.5 text-success" aria-hidden />
  if (status === "failed") return <XIcon className="size-3.5 text-danger" aria-hidden />
  if (status === "running") return <LoaderCircleIcon className="size-3.5 animate-spin text-accent" aria-hidden />
  return <span className="size-3.5 rounded-full border border-border-strong" aria-hidden />
}

function BuildPipeline({ stages = SAMPLE_STAGES, label = "Pipeline", className }: BuildPipelineProps) {
  return (
    <ol aria-label={label} data-slot="build-pipeline" className={cn("flex flex-wrap items-center gap-2", className)}>
      {stages.map((s, i) => (
        <li key={s.name} aria-current={s.status === "running" ? "step" : undefined} className="flex items-center gap-2">
          <div
            data-status={s.status}
            className={cn(
              "inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-surface px-2.5 text-xs font-medium text-fg shadow-highlight",
              s.status === "failed" && "border-danger/40",
              s.status === "pending" && "text-fg-muted"
            )}
          >
            <StageIcon status={s.status} />
            <span>{s.name}</span>
            <span className="sr-only">, {STATUS_TEXT[s.status]}</span>
          </div>
          {i < stages.length - 1 ? <span className="h-px w-4 bg-border" aria-hidden /> : null}
        </li>
      ))}
    </ol>
  )
}
export { BuildPipeline }
export type { BuildPipelineProps, BuildPipelineStatus, Stage as BuildPipelineStage }
