"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { FileRow } from "@/registry/ui/file-row"

/** A stack of file rows with name, metadata and an optional download action. */
type FileItem = { id: string; name: string; meta?: string }

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
    <div data-slot="file-list" className={cn("space-y-2", className)}>
      {files.map((f) => (
        <FileRow key={f.id} name={f.name} meta={f.meta} onDownload={download ? () => download(f.id) : undefined} />
      ))}
    </div>
  )
}
export { FileList }
export type { FileListProps, FileItem }
