"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function CodeEditorFrame({
  filename,
  children,
  className,
}: {
  filename?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="code-editor-frame" className={cn("overflow-hidden rounded-xl border border-border bg-surface", className)}>
      {filename ? (
        <div className="border-b border-border bg-sunken px-3 py-1.5 font-mono text-[11px] text-fg-muted">
          {filename}
        </div>
      ) : null}
      <div className="min-h-40 p-3 font-mono text-[12px] leading-relaxed text-fg">{children}</div>
    </div>
  )
}
export { CodeEditorFrame }
