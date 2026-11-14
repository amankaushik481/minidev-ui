"use client"
import * as React from "react"
import { PlayIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"
import { CodeEditorFrame } from "@/registry/ui/code-editor-frame"

/**
 * NotebookCell — a Jupyter-style cell: a run button, the code in an editor frame, and its output below.
 *
 * While `running` is true the run button is disabled and the cell is aria-busy; the
 * output region is a labelled, keyboard-scrollable live region so results are
 * announced. Use it for data and AI playgrounds; for static code use CodeBlock.
 *
 * @example
 * <NotebookCell code={source} output={result} running={busy} onRun={run} filename="query.sql" />
 */
type NotebookCellProps = {
  /** Source shown in the editor frame. */
  code: string
  /** Result text. Omit (or pass null) to hide the output area. */
  output?: string | null
  /** Called by the run button. */
  onRun?: () => void
  /** The cell is executing: disables run and marks the cell busy. */
  running?: boolean
  /** File name in the editor frame's title bar. */
  filename?: string
  className?: string
}

function NotebookCell({ code, output, onRun, running = false, filename = "cell.ts", className }: NotebookCellProps) {
  return (
    <div data-slot="notebook-cell" aria-busy={running || undefined} className={cn("overflow-hidden rounded-xl border border-border", className)}>
      <div className="flex items-start gap-2 border-b border-border bg-surface p-2">
        <IconButton type="button" size="icon-sm" variant="outline" aria-label={running ? "Running cell" : "Run cell"} disabled={running} onClick={onRun}>
          <PlayIcon />
        </IconButton>
        <div className="min-w-0 flex-1">
          <CodeEditorFrame filename={filename}>{code}</CodeEditorFrame>
        </div>
      </div>
      {output != null ? (
        <pre
          aria-label="Output"
          aria-live="polite"
          tabIndex={0}
          className="overflow-auto bg-sunken p-3 font-mono text-[12px] text-fg-muted outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        >
          {output}
        </pre>
      ) : null}
    </div>
  )
}
export { NotebookCell }
export type { NotebookCellProps }
