"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { FileIcon } from "lucide-react"

/**
 * FileReference — a compact chip-like card citing a source file: name, path and a line range.
 *
 * Use in agent and code-review UIs to show which file and lines an answer or
 * change refers to. For a web citation use `CitationChip` or `SourceCard`;
 * for a downloadable file use `FileRow`.
 *
 * @example
 * <FileReference name="billing.ts" path="src/lib/billing.ts" lines="42–68" />
 */
type FileReferenceProps = {
  /** File name, shown bold. */
  name?: string
  /** Full path, shown in mono under the name. */
  path?: string
  /** Line range, e.g. "1–92" or "L42". */
  lines?: string
  className?: string
}

function FileReference({
  name = "hero-client-pitch.tsx",
  path = "src/registry/premium/hero-client-pitch.tsx",
  lines = "1–92",
  className,
}: FileReferenceProps) {
  return (
    <div data-slot="file-reference" className={cn("flex items-center gap-3 rounded-xl border border-border bg-sunken px-3 py-2.5", className)}>
      <FileIcon className="size-4 shrink-0 text-fg-muted" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{name}</p>
        <p className="truncate font-mono text-[11px] text-fg-muted" title={path}>
          {path}
        </p>
      </div>
      {lines ? (
        <span className="font-mono text-[11px] text-fg-muted tabular-nums">
          <span className="sr-only">Lines </span>
          {lines}
        </span>
      ) : null}
    </div>
  )
}
export { FileReference }
export type { FileReferenceProps }
