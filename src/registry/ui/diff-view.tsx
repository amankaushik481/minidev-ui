"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Line = { type: "add" | "del" | "ctx"; text: string }

function DiffView({
  lines,
  className,
  filename,
}: {
  lines: Line[]
  className?: string
  filename?: string
}) {
  return (
    <div data-slot="diff-view" className={cn("overflow-hidden rounded-xl border border-border", className)}>
      {filename ? (
        <div className="border-b border-border bg-sunken px-3 py-2 font-mono text-[11px] text-fg-muted">{filename}</div>
      ) : null}
      <pre className="overflow-auto bg-bg p-3 font-mono text-xs leading-relaxed" role="region" aria-label={filename ? `Diff for ${filename}` : "Diff"}>
        {lines.map((l, i) => (
          <div
            key={i}
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
            {l.text}
          </div>
        ))}
      </pre>
    </div>
  )
}
export { DiffView }
