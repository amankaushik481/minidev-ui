"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { FileRow } from "@/registry/ui/file-row"

/**
 * FileList — a stack of file rows with name, metadata and an optional download action.
 *
 * Use for attachments, exports and documents on a record. For one row use
 * `FileRow`; for uploading use `FileDropzone`; for a folder hierarchy use
 * `FileTree`.
 *
 * @example
 * <FileList
 *   files={[{ id: "f1", name: "INV-2041.pdf", meta: "PDF · 184 KB" }]}
 *   onDownload={(id) => download(id)}
 * />
 */
type FileItem = {
  /** Stable id passed back to onDownload. */
  id: string
  /** File name, truncated when long. */
  name: string
  /** Secondary line, e.g. "PDF · 184 KB · Sep 24". */
  meta?: string
}

const SAMPLE_FILES: FileItem[] = [
  { id: "f1", name: "INV-2041-northwind.pdf", meta: "PDF · 184 KB · Sep 24, 2026" },
  { id: "f2", name: "Q3-revenue-report.xlsx", meta: "Spreadsheet · 1.2 MB · Oct 2, 2026" },
  { id: "f3", name: "northwind-msa-signed.pdf", meta: "PDF · 2.8 MB · Aug 11, 2026" },
  { id: "f4", name: "payouts-september.csv", meta: "CSV · 96 KB · Oct 1, 2026" },
  { id: "f5", name: "lumen-brand-assets.zip", meta: "Archive · 14.6 MB · Jul 30, 2026" },
]

type FileListProps = {
  /** Files to list. Defaults to a few Lumen documents. */
  files?: FileItem[]
  /** Called with the file id. When present, each row shows a download button (the sample files show one regardless). */
  onDownload?: (id: string) => void
  className?: string
}

function FileList({
  files = SAMPLE_FILES,
  onDownload,
  className,
}: FileListProps) {
  const download = onDownload ?? (files === SAMPLE_FILES ? () => {} : undefined)
  return (
    <ul data-slot="file-list" aria-label="Files" className={cn("space-y-2", className)}>
      {files.map((f) => (
        <li key={f.id}>
          <FileRow name={f.name} meta={f.meta} onDownload={download ? () => download(f.id) : undefined} />
        </li>
      ))}
    </ul>
  )
}
export { FileList }
export type { FileListProps, FileItem }
