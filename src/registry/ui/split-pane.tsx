"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Two equal panes side by side in one bordered frame, stacked on mobile: for before/after, code/preview or source/result.
 *
 * Static 50/50 layout; for a draggable divider use ResizablePanels. Panes clip
 * overflow to the frame, so put scrolling content in its own `overflow-auto` box.
 *
 * @example
 * <SplitPane left={<CodeBlock code={src} />} right={<Preview />} />
 */
type SplitPaneProps = {
  /** First pane (top on mobile). */
  left: React.ReactNode
  /** Second pane (bottom on mobile). */
  right: React.ReactNode
  className?: string
}

function SplitPane({ left, right, className }: SplitPaneProps) {
  return (
    <div data-slot="split-pane" className={cn("grid min-h-64 grid-cols-1 overflow-hidden rounded-xl border border-border md:grid-cols-2", className)}>
      <div data-slot="split-pane-left" className="min-w-0 border-b border-border p-4 md:border-r md:border-b-0">{left}</div>
      <div data-slot="split-pane-right" className="min-w-0 p-4">{right}</div>
    </div>
  )
}
export { SplitPane }
export type { SplitPaneProps }
