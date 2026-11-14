"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * InlineCodeDiff — one removed line above one added line, for showing a small code or config change.
 *
 * Use it in reviews, changelogs and agent tool results to show a single edit.
 * For a whole file or several hunks use DiffView.
 *
 * @example
 * <InlineCodeDiff before='timeout: 30' after='timeout: 60' />
 */
type InlineCodeDiffProps = {
  /** The old line, shown with a minus. */
  before: string
  /** The new line, shown with a plus. */
  after: string
  className?: string
}

function InlineCodeDiff({ before, after, className }: InlineCodeDiffProps) {
  return (
    <div data-slot="inline-code-diff" className={cn("overflow-hidden rounded-xl border border-border font-mono text-xs", className)}>
      <pre className="overflow-x-auto border-b border-border bg-danger/5 px-3 py-2 text-danger">
        <span aria-hidden className="select-none text-fg-muted">- </span>
        <del className="no-underline">
          <span className="sr-only">Removed: </span>
          {before}
        </del>
      </pre>
      <pre className="overflow-x-auto bg-success/5 px-3 py-2 text-success">
        <span aria-hidden className="select-none text-fg-muted">+ </span>
        <ins className="no-underline">
          <span className="sr-only">Added: </span>
          {after}
        </ins>
      </pre>
    </div>
  )
}
export { InlineCodeDiff }
export type { InlineCodeDiffProps }
