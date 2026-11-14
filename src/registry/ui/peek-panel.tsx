"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * PeekPanel — a non-modal side panel for previewing a record beside a list, with a title bar and close button.
 *
 * It is a labelled landmark (aside) that leaves the rest of the page usable; Escape
 * inside it calls `onClose`, and the close button only renders when `onClose` is
 * given. Place it in a flex row next to the list. For a modal overlay that traps
 * focus use Sheet; for a resizable split use a resizable panel layout.
 *
 * @example
 * <div className="flex h-[600px]">
 *   <IssueList className="flex-1" onOpen={setIssue} />
 *   {issue ? <PeekPanel title={issue.title} onClose={() => setIssue(null)}>{issue.body}</PeekPanel> : null}
 * </div>
 */
type PeekPanelProps = {
  /** Heading in the title bar; also the landmark's accessible name. */
  title: string
  children: React.ReactNode
  /** Called by the close button and by Escape inside the panel. */
  onClose?: () => void
  className?: string
}

function PeekPanel({ title, children, onClose, className }: PeekPanelProps) {
  return (
    <aside
      data-slot="peek-panel"
      aria-label={title}
      className={cn("flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-highlight", className)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && onClose) {
          e.stopPropagation()
          onClose()
        }
      }}
    >
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border px-4">
        <h2 className="truncate text-sm font-medium text-fg">{title}</h2>
        {onClose ? (
          <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Close peek" onClick={onClose}>
            <XIcon />
          </IconButton>
        ) : null}
      </div>
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </aside>
  )
}
export { PeekPanel }
export type { PeekPanelProps }
