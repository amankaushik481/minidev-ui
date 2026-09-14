"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/registry/ui/status-badge"
import { CodeBlock } from "@/registry/ui/code-block"

function ToolResultPanel({
  name,
  status = "success",
  output,
  className,
}: {
  name: string
  status?: "success" | "error" | "running"
  output: string
  className?: string
}) {
  const tone = status === "running" ? "accent" : status === "error" ? "danger" : "success"
  const label = status === "running" ? "Running" : status === "error" ? "Error" : "Success"
  return (
    <div data-slot="tool-result-panel" className={cn("overflow-hidden rounded-xl border border-border bg-surface", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <span className="font-mono text-xs text-fg">{name}</span>
        <StatusBadge tone={tone}>{label}</StatusBadge>
      </div>
      <CodeBlock code={output} language="json" className="rounded-none border-0" />
    </div>
  )
}
export { ToolResultPanel }
