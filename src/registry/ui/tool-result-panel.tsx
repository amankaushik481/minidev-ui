"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/registry/ui/status-badge"
import { CodeBlock } from "@/registry/ui/code-block"

/**
 * A panel showing an AI tool call's name, a status badge and its output as highlighted JSON.
 *
 * Pass `output` as a string or any JSON-serialisable value; objects are pretty-printed. Use `ToolCallCard` for a collapsible call inside a chat turn, and `JsonViewer` for large, foldable payloads.
 *
 * @example
 * <ToolResultPanel name="lookup_invoice" status="success" output={{ invoice: "INV-2041", status: "paid" }} />
 */
type ToolResultPanelProps = {
  /** The tool that ran. */
  name?: string
  status?: "success" | "error" | "running"
  /** Raw output: a string is shown as-is, anything else is JSON.stringified. Defaults to a Lumen invoice lookup. */
  output?: unknown
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

const STATUS = {
  success: { tone: "success", label: "Success" },
  error: { tone: "danger", label: "Error" },
  running: { tone: "accent", label: "Running" },
} as const

function ToolResultPanel({ name = "lookup_invoice", status = "success", output = SAMPLE_OUTPUT, className }: ToolResultPanelProps) {
  const s = STATUS[status]
  const code = typeof output === "string" ? output : (JSON.stringify(output, null, 2) ?? String(output))
  return (
    <div data-slot="tool-result-panel" data-status={status} className={cn("w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <span className="truncate font-mono text-xs text-fg">{name}</span>
        <StatusBadge tone={s.tone}>{s.label}</StatusBadge>
      </div>
      <CodeBlock code={code} language="json" className="rounded-none border-0" />
    </div>
  )
}
export { ToolResultPanel }
export type { ToolResultPanelProps }
