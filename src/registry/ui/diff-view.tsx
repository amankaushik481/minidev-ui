"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * DiffView — a unified diff of one file: added lines tinted success, removed lines tinted danger, context muted.
 *
 * Use to show a code or config change in a review, a deploy or an agent's
 * proposed edit. For a single-line before/after use `InlineCodeDiff`; for
 * plain code use `CodeBlock`. Screen readers hear "added" or "removed" before
 * each changed line.
 *
 * @example
 * <DiffView
 *   filename="lib/billing.ts"
 *   lines={[
 *     { type: "ctx", text: "export function total(items) {" },
 *     { type: "del", text: "  return sum(items)" },
 *     { type: "add", text: "  return sum(items) + tax(items)" },
 *     { type: "ctx", text: "}" },
 *   ]}
 * />
 */
type DiffLine = {
  /** "add" for an inserted line, "del" for a removed line, "ctx" for unchanged context. */
  type: "add" | "del" | "ctx"
  /** The line's text, without the leading +/- marker. */
  text: string
}

type DiffViewProps = {
  /** Lines in display order. */
  lines: DiffLine[]
  className?: string
  /** File path shown in the header bar and used in the region's accessible name. */
  filename?: string
}

function DiffView({ lines, className, filename }: DiffViewProps) {
  return (
    <div data-slot="diff-view" className={cn("overflow-hidden rounded-xl border border-border", className)}>
      {filename ? (
        <div className="border-b border-border bg-sunken px-3 py-2 font-mono text-[11px] text-fg-muted">{filename}</div>
      ) : null}
      <pre
        // Focusable so keyboard users can scroll long lines.
        tabIndex={0}
        role="region"
        aria-label={filename ? `Diff for ${filename}` : "Diff"}
        className="overflow-auto bg-bg p-3 font-mono text-xs leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            data-type={l.type}
            className={cn(
              "px-1",
              l.type === "add" && "bg-success/10 text-fg",
              l.type === "del" && "bg-danger/10 text-fg",
              l.type === "ctx" && "text-fg-muted"
            )}
          >
            <span className="inline-block w-4 select-none text-fg-subtle" aria-hidden>
              {l.type === "add" ? "+" : l.type === "del" ? "-" : " "}
            </span>
            {l.type !== "ctx" ? <span className="sr-only">{l.type === "add" ? "added: " : "removed: "}</span> : null}
            {l.text}
          </div>
        ))}
      </pre>
    </div>
  )
}
export { DiffView }
export type { DiffViewProps, DiffLine }
