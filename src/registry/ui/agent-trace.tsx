"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ToolCallCard } from "@/registry/ui/tool-call-card"
import { StatusBadge } from "@/registry/ui/status-badge"

type Step = {
  id: string
  name: string
  status?: "running" | "done" | "error"
  detail?: string
}

function AgentTrace({
  steps,
  className,
  title = "Agent trace",
}: {
  steps: Step[]
  className?: string
  title?: string
}) {
  const done = steps.filter((s) => s.status === "done").length
  return (
    <div data-slot="agent-trace" className={cn("space-y-3 rounded-xl border border-border bg-surface p-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{title}</p>
        <StatusBadge tone={done === steps.length ? "success" : "accent"}>
          {done}/{steps.length}
        </StatusBadge>
      </div>
      <div className="space-y-2">
        {steps.map((s) => (
          <ToolCallCard key={s.id} name={s.name} status={s.status}>
            {s.detail}
          </ToolCallCard>
        ))}
      </div>
    </div>
  )
}
export { AgentTrace }
