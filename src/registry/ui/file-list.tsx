"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { FileRow } from "@/registry/ui/file-row"

type FileItem = { id: string; name: string; meta?: string }

function FileList({
  files,
  onDownload,
  className,
}: {
  files: FileItem[]
  onDownload?: (id: string) => void
  className?: string
}) {
  return (
    <div data-slot="file-list" className={cn("space-y-2", className)}>
      {files.map((f) => (
        <FileRow key={f.id} name={f.name} meta={f.meta} onDownload={onDownload ? () => onDownload(f.id) : undefined} />
      ))}
    </div>
  )
}
export { FileList }
