"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A neutral app-window frame (three grey dots and a title bar) for screenshots and product previews on marketing pages.
 *
 * Children sit in 16px padding. Use `TerminalWindow` for CLI output and `CodeEditorFrame` for source code.
 *
 * @example
 * <WindowChrome title="Lumen — Invoices"><InvoiceList /></WindowChrome>
 */
type WindowChromeProps = {
  /** Title bar text. */
  title?: string
  children?: React.ReactNode
  className?: string
}

function WindowChrome({ title = "Lumen — Invoices", children, className }: WindowChromeProps) {
  return (
    <div data-slot="window-chrome" className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-highlight", className)}>
      <div className="flex h-9 items-center gap-2 border-b border-border bg-sunken px-3">
        <span className="size-2.5 rounded-full bg-fg-subtle/40" aria-hidden />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" aria-hidden />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" aria-hidden />
        <span className="ml-2 truncate text-xs text-fg-muted">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
export { WindowChrome }
export type { WindowChromeProps }
