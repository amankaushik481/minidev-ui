"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { FileRow } from "@/registry/ui/file-row"

/**
 * MediaLibrary — a files panel: title with an Upload button that opens the system file picker, then a responsive grid of file rows.
 *
 * Use for attachments, exports or brand assets shared by a workspace. Picked files are added to the top of the list
 * (no network); wire `onUpload` to send them. For drag-and-drop with progress use FileDropzone; for a single file
 * use FileRow; for a folder hierarchy use FileTree.
 *
 * @example
 * <MediaLibrary onUpload={(files) => uploadAll(files)} />
 */
type MediaLibraryProps = {
  /** Called with the files the user picked. */
  onUpload?: (files: File[]) => void
  /** Same syntax as <input accept>, e.g. "image/*,.pdf". */
  accept?: string
  className?: string
}

const SAMPLE = [
  { name: "Q3-revenue-report.xlsx", meta: "Spreadsheet · 1.2 MB" },
  { name: "board-pack-october.pdf", meta: "PDF · 3.4 MB" },
  { name: "northwind-contract-2026.pdf", meta: "PDF · 412 KB" },
  { name: "mrr-by-plan.csv", meta: "CSV · 88 KB" },
]

const size = (b: number) => (b >= 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1e3))} KB`)

function MediaLibrary({ onUpload, accept, className }: MediaLibraryProps) {
  const [files, setFiles] = React.useState(SAMPLE)
  const input = React.useRef<HTMLInputElement>(null)
  const headingId = React.useId()
  return (
    <section data-slot="media-library" aria-labelledby={headingId} className={cn("space-y-4 rounded-2xl border border-border bg-surface p-4 shadow-raised sm:p-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id={headingId} className="text-lg font-medium tracking-[-0.014em] text-fg">
            Files
          </h2>
          <p aria-live="polite" className="text-sm text-fg-muted tabular-nums">
            {files.length} files shared with the Northwind workspace
          </p>
        </div>
        <Button size="sm" onClick={() => input.current?.click()}>
          Upload
        </Button>
        <input
          ref={input}
          type="file"
          multiple
          accept={accept}
          hidden
          onChange={(e) => {
            const picked = Array.from(e.target.files ?? [])
            if (!picked.length) return
            setFiles((f) => [...picked.map((p) => ({ name: p.name, meta: `${p.type || "File"} · ${size(p.size)}` })), ...f])
            onUpload?.(picked)
            e.target.value = ""
          }}
        />
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {files.map((f, i) => (
          <li key={`${f.name}-${i}`} className="min-w-0">
            <FileRow name={f.name} meta={f.meta} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export { MediaLibrary }
export type { MediaLibraryProps }
