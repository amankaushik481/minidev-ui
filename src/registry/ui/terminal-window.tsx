"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A terminal frame with traffic-light dots and a title bar around monospace output, for install steps and CLI demos.
 *
 * Children render inside a `<pre>`, so whitespace is kept. Use `CodeBlock` for highlighted source with a copy button, and `ConsoleOutput` for streaming log lines.
 *
 * @example
 * <TerminalWindow title="zsh">{"$ npx shadcn add https://ui.minidev.pro/r/button.json"}</TerminalWindow>
 */
type TerminalWindowProps = {
  /** Title bar text; also names the scrollable output for screen readers. */
  title?: string
  /** Output text. Whitespace and line breaks are preserved. */
  children?: React.ReactNode
  className?: string
}

function TerminalWindow({ title = "Terminal", children, className }: TerminalWindowProps) {
  return (
    <div data-slot="terminal-window" className={cn("overflow-hidden rounded-xl border border-border bg-sunken", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
        <span className="size-2.5 rounded-full bg-danger/70" aria-hidden />
        <span className="size-2.5 rounded-full bg-warning/70" aria-hidden />
        <span className="size-2.5 rounded-full bg-success/70" aria-hidden />
        <span className="ml-2 truncate text-xs text-fg-muted">{title}</span>
      </div>
      {/* Focusable so keyboard users can scroll long output. */}
      <pre
        role="region"
        tabIndex={0}
        aria-label={`${title} output`}
        className="overflow-auto p-4 font-mono text-xs leading-relaxed text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
      >
        {children}
      </pre>
    </div>
  )
}
export { TerminalWindow }
export type { TerminalWindowProps }
