"use client"
import * as React from "react"
import { CheckIcon, ChevronRightIcon, LoaderCircleIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = {
  id: string
  name: string
  status?: "running" | "done" | "error" | "pending"
  detail?: string
  /** e.g. "1.2s" */
  duration?: string
}

/**
 * AgentTrace — an agent run as a timeline. A hairline rail connects the steps;
 * the running step pulses, finished steps report their time, details fold out.
 */
function AgentTrace({
  steps,
  className,
  title = "Agent run",
  meta,
}: {
  steps: Step[]
  className?: string
  title?: string
  /** Right-aligned summary, e.g. "4 tools · 3.1s · $0.012". */
  meta?: React.ReactNode
}) {
  const done = steps.filter((s) => s.status === "done").length
  const running = steps.some((s) => s.status === "running")
  const [open, setOpen] = React.useState<string | null>(null)
  return (
    <div data-slot="agent-trace" className={cn("w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-raised", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", running ? "animate-[pulse-ring_1.4s_infinite] bg-accent" : done === steps.length ? "bg-success" : "bg-fg-subtle")} />
          <p className="text-[0.8125rem] font-medium text-fg">{title}</p>
        </div>
        <p className="font-mono text-[11px] text-fg-subtle">{meta ?? `${done}/${steps.length} steps`}</p>
      </div>
      <ol className="relative px-4 py-3">
        {steps.map((s, i) => {
          const st = s.status ?? "pending"
          const last = i === steps.length - 1
          const isOpen = open === s.id
          return (
            <li key={s.id} className="relative pl-8">
              {!last ? <span aria-hidden className={cn("absolute top-6 bottom-0 left-[9px] w-px", st === "done" ? "bg-success/40" : "bg-border")} /> : null}
              <span
                aria-hidden
                className={cn(
                  "absolute top-1.5 left-0 grid size-[19px] place-items-center rounded-full border",
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
                className="flex min-h-8 w-full items-center gap-2 rounded-md py-1 text-left outline-none enabled:cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className={cn("flex-1 truncate font-mono text-[12.5px]", st === "pending" ? "text-fg-subtle" : "text-fg")}>{s.name}</span>
                {st === "running" ? <span className="text-[11px] font-medium text-accent-fg">running</span> : s.duration ? <span className="font-mono text-[11px] text-fg-subtle">{s.duration}</span> : null}
                {s.detail ? <ChevronRightIcon className={cn("size-3.5 text-fg-subtle transition-transform duration-200 ease-hairline", isOpen && "rotate-90")} /> : null}
              </button>
              {s.detail ? (
                <div className={cn("grid transition-[grid-template-rows] duration-200 ease-hairline", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="min-h-0 overflow-hidden">
                    <p className="mb-2 rounded-lg border border-border bg-sunken/70 px-3 py-2 font-mono text-[11.5px] leading-[1.6] text-fg-muted">{s.detail}</p>
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
