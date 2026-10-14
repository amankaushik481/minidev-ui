"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/registry/ui/status-badge"
import { CodeBlock } from "@/registry/ui/code-block"

/** A collapsed-chrome panel showing an AI tool call's name, status and JSON output. */
type ToolResultPanelProps = {
  /** The tool that ran. */
  name?: string
  status?: "success" | "error" | "running"
  /** Raw output, shown as JSON. Defaults to a Lumen invoice lookup. */
  output?: string
  className?: string
}

const SAMPLE_OUTPUT = `{
  "invoice": "INV-2041",
  "customer": "Northwind Traders",
  "amount": 12400,
  "currency": "USD",
  "status": "paid",
  "paid_at": "2026-03-12T09:41:00Z"
}`

function ToolResultPanel({
  name = "lookup_invoice",
  status = "success",
  output = SAMPLE_OUTPUT,
  className,
}: ToolResultPanelProps) {
  const tone = status === "running" ? "accent" : status === "error" ? "danger" : "success"
  const label = status === "running" ? "Running" : status === "error" ? "Error" : "Success"
  return (
    <div data-slot="tool-result-panel" className={cn("w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <span className="font-mono text-xs text-fg">{name}</span>
        <StatusBadge tone={tone}>{label}</StatusBadge>
      </div>
      <CodeBlock code={output} language="json" className="rounded-none border-0" />
    </div>
  )
}
export { ToolResultPanel }
export type { ToolResultPanelProps }
