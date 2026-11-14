"use client"
import * as React from "react"
import { CheckIcon, ChevronRightIcon, LoaderCircleIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * AgentTrace — an AI agent run as a timeline of tool calls and steps.
 *
 * A hairline rail connects the steps; the running step spins, finished steps report their
 * time, and steps with `detail` fold out (arguments, output, errors). Use it to show what an
 * agent did. Prefer `ToolCallCard` for a single call, and `BuildPipeline` for CI stages in a row.
 * Each step announces its status to screen readers; details are disclosure buttons.
 *
 * @example
 * <AgentTrace
 *   meta="3 tools · 2.4s"
 *   steps={[
 *     { id: "1", name: "search_invoices", status: "done", duration: "0.8s", detail: '{ "customer": "Northwind" }' },
 *     { id: "2", name: "draft_email", status: "running" },
 *     { id: "3", name: "send_email", status: "pending" },
 *   ]}
 * />
 */
type AgentTraceStatus = "running" | "done" | "error" | "pending"

type Step = {
  /** Stable key, also used to track which step is expanded. */
  id: string
  /** Tool or step name, shown in mono. */
  name: string
  /** Defaults to "pending". */
  status?: AgentTraceStatus
  /** Text revealed when the step is expanded (arguments, output, error). Omit for a static row. */
  detail?: string
  /** Pre-formatted time, e.g. "1.2s". Shown when the step is not running. */
  duration?: string
}

type AgentTraceProps = {
  /** Steps in run order. */
  steps: Step[]
  className?: string
  /** Header label. */
  title?: string
  /** Right-aligned summary, e.g. "4 tools · 3.1s · $0.012". Defaults to "done/total steps". */
  meta?: React.ReactNode
}

const STATUS_TEXT: Record<AgentTraceStatus, string> = { running: "running", done: "done", error: "failed", pending: "pending" }

function AgentTrace({ steps, className, title = "Agent run", meta }: AgentTraceProps) {
  const done = steps.filter((s) => s.status === "done").length
  const running = steps.some((s) => s.status === "running")
  const [open, setOpen] = React.useState<string | null>(null)
  const uid = React.useId()
  return (
    <div data-slot="agent-trace" className={cn("w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-raised", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span aria-hidden className={cn("size-2 rounded-full", running ? "animate-[pulse-ring_1.4s_infinite] bg-accent" : done === steps.length ? "bg-success" : "bg-fg-subtle")} />
          <p className="text-[0.8125rem] font-medium text-fg">{title}</p>
        </div>
        <p className="font-mono text-[11px] tabular-nums text-fg-subtle">{meta ?? `${done}/${steps.length} steps`}</p>
      </div>
      <ol aria-label={title} className="relative px-4 py-3">
        {steps.map((s, i) => {
          const st = s.status ?? "pending"
          const last = i === steps.length - 1
          const isOpen = open === s.id
          const panelId = `${uid}-${i}`
          return (
            <li key={s.id} aria-current={st === "running" ? "step" : undefined} className="relative pl-8">
              {!last ? <span aria-hidden className={cn("absolute top-6.5 bottom-0 left-2.5 w-px -translate-x-1/2", st === "done" ? "bg-success/40" : "bg-border")} /> : null}
              <span
                aria-hidden
                className={cn(
                  "absolute top-1.5 left-0 grid size-5 place-items-center rounded-full border",
                  st === "done" && "border-success/30 bg-success/10 text-success",
                  st === "running" && "border-accent-line bg-accent-soft text-accent-fg",
                  st === "error" && "border-danger/30 bg-danger/10 text-danger",
                  st === "pending" && "border-border bg-surface text-fg-subtle"
                )}
              >
                {st === "done" ? <CheckIcon className="size-3" strokeWidth={2.75} /> : st === "running" ? <LoaderCircleIcon className="size-3 animate-spin" /> : st === "error" ? <XIcon className="size-3" strokeWidth={2.75} /> : <span className="size-1 rounded-full bg-current" />}
              </span>
              <button
                type="button"
                disabled={!s.detail}
                onClick={() => setOpen(isOpen ? null : s.id)}
                aria-expanded={s.detail ? isOpen : undefined}
                aria-controls={s.detail ? panelId : undefined}
                className="flex min-h-8 w-full items-center gap-2 rounded-md py-1 text-left outline-none enabled:cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className={cn("flex-1 truncate font-mono text-[12.5px]", st === "pending" ? "text-fg-subtle" : "text-fg")}>{s.name}</span>
                <span className="sr-only">, {STATUS_TEXT[st]}</span>
                {st === "running" ? <span aria-hidden className="text-[11px] font-medium text-accent-fg">running</span> : s.duration ? <span className="font-mono text-[11px] tabular-nums text-fg-subtle">{s.duration}</span> : null}
                {s.detail ? <ChevronRightIcon aria-hidden className={cn("size-3.5 text-fg-subtle transition-transform duration-200 ease-hairline", isOpen && "rotate-90")} /> : null}
              </button>
              {s.detail ? (
                <div
                  id={panelId}
                  inert={!isOpen}
                  className={cn("grid transition-[grid-template-rows] duration-200 ease-hairline", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="mb-2 rounded-lg border border-border bg-sunken/70 px-3 py-2 font-mono text-[11.5px] leading-[1.6] break-words whitespace-pre-wrap text-fg-muted">{s.detail}</p>
                  </div>
                </div>
              ) : null}
              {!last ? <div className="h-1.5" /> : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
export { AgentTrace }
export type { AgentTraceProps, Step as AgentTraceStep, AgentTraceStatus }
