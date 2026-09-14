"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function InlineCodeDiff({
  before,
  after,
  className,
}: {
  before: string
  after: string
  className?: string
}) {
  return (
    <div data-slot="inline-code-diff" className={cn("overflow-hidden rounded-xl border border-border font-mono text-[12px]", className)}>
      <pre className="border-b border-border bg-danger/5 px-3 py-2 text-danger"><span className="select-none text-fg-muted">- </span>{before}</pre>
      <pre className="bg-success/5 px-3 py-2 text-success"><span className="select-none text-fg-muted">+ </span>{after}</pre>
    </div>
  )
}
export { InlineCodeDiff }
