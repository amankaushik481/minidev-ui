"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"
import { CopyButton } from "@/registry/ui/copy-button"
import { Maximize2Icon } from "lucide-react"

/**
 * A framed preview of something an AI produced (a snippet, a chart, a draft) with a title bar, copy and expand actions.
 *
 * Use inside a chat thread to show a generated artifact inline. Prefer `CodeBlock` for code that
 * needs syntax highlighting and line numbers, and `ToolResultPanel` for raw tool output. The copy
 * button only appears with `copyValue`, the expand button only with `onExpand`.
 *
 * @example
 * <ArtifactPreview title="pricing-table.tsx" copyValue={source} onExpand={() => setOpen(true)}>
 *   <PricingTable />
 * </ArtifactPreview>
 */
type ArtifactPreviewProps = {
  /** File or artifact name in the title bar; also names the region. */
  title: string
  /** The rendered preview. */
  children: React.ReactNode
  className?: string
  /** Text copied by the copy button (usually the source). Omit to hide the button. */
  copyValue?: string
  /** Called by the expand button, e.g. to open a full-screen dialog. Omit to hide the button. */
  onExpand?: () => void
}

function ArtifactPreview({ title, children, className, copyValue, onExpand }: ArtifactPreviewProps) {
  return (
    <section
      data-slot="artifact-preview"
      aria-label={title}
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface shadow-highlight",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-sunken px-3 py-2">
        <p className="truncate text-xs font-medium text-fg-muted">{title}</p>
        <div className="flex items-center gap-1">
          {copyValue ? <CopyButton value={copyValue} size="sm" /> : null}
          {onExpand ? (
            <IconButton type="button" size="icon-sm" variant="ghost" aria-label={`Expand ${title}`} onClick={onExpand}>
              <Maximize2Icon />
            </IconButton>
          ) : null}
        </div>
      </div>
      <div className="p-3">{children}</div>
    </section>
  )
}
export { ArtifactPreview }
export type { ArtifactPreviewProps }
