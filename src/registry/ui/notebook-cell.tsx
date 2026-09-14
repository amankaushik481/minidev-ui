"use client"
import * as React from "react"
import { PlayIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"
import { CodeEditorFrame } from "@/registry/ui/code-editor-frame"

function NotebookCell({
  code,
  output,
  onRun,
  className,
}: {
  code: string
  output?: string
  onRun?: () => void
  className?: string
}) {
  return (
    <div data-slot="notebook-cell" className={cn("overflow-hidden rounded-xl border border-border", className)}>
      <div className="flex items-start gap-2 border-b border-border bg-surface p-2">
        <IconButton type="button" size="icon-sm" variant="outline" aria-label="Run cell" onClick={onRun}><PlayIcon /></IconButton>
        <div className="min-w-0 flex-1">
          <CodeEditorFrame filename="cell.ts">{code}</CodeEditorFrame>
        </div>
      </div>
      {output != null ? (
        <pre className="overflow-auto bg-sunken p-3 font-mono text-[12px] text-fg-muted">{output}</pre>
      ) : null}
    </div>
  )
}
export { NotebookCell }
