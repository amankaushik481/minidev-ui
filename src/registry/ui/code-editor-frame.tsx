"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A neutral editor chrome: a file-name tab bar over a monospace body that hosts your own editor or code.
 *
 * Wrap a `<textarea>`, CodeMirror or Monaco in it so the editor matches the kit. For read-only highlighted snippets with a copy button use CodeBlock;
 * for a whole window with traffic lights use WindowChrome.
 *
 * @example
 * <CodeEditorFrame filename="schema.sql" actions={<Button size="xs" variant="ghost">Run</Button>}>
 *   <textarea aria-label="SQL" className="w-full resize-none bg-transparent outline-none" rows={8} />
 * </CodeEditorFrame>
 */
type CodeEditorFrameProps = {
  /** File name shown in the tab bar; also names the region for screen readers. */
  filename?: string
  /** Controls at the tab bar's end, such as Run or Format buttons. */
  actions?: React.ReactNode
  /** The editor itself. */
  children?: React.ReactNode
  className?: string
}

function CodeEditorFrame({ filename, actions, children, className }: CodeEditorFrameProps) {
  return (
    <div
      data-slot="code-editor-frame"
      role={filename ? "group" : undefined}
      aria-label={filename}
      className={cn("overflow-hidden rounded-xl border border-border bg-surface", className)}
    >
      {filename || actions ? (
        <div className="flex min-h-8 items-center justify-between gap-2 border-b border-border bg-sunken px-3 py-1">
          <span className="truncate font-mono text-2xs text-fg-muted">{filename}</span>
          {actions ? <div className="flex shrink-0 items-center gap-1">{actions}</div> : null}
        </div>
      ) : null}
      <div className="min-h-40 p-3 font-mono text-xs leading-relaxed text-fg">{children}</div>
    </div>
  )
}
export { CodeEditorFrame }
export type { CodeEditorFrameProps }
