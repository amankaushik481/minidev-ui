"use client"
import * as React from "react"
import { FileRow } from "@/registry/ui/file-row"
import type { Example } from "./types"

function DownloadRow() {
  const [count, setCount] = React.useState(0)
  return (
    <div className="w-full max-w-sm space-y-2">
      <FileRow name="INV-2041-northwind.pdf" meta="PDF · 184 KB · Sep 24, 2026" onDownload={() => setCount((c) => c + 1)} />
      <p className="text-xs text-fg-muted tabular-nums">Downloads this session: {count}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Attachment with download",
    description: "onDownload adds an icon button labelled \"Download INV-2041-northwind.pdf\"; start the download in the handler.",
    code: `function DownloadRow() {
  const [count, setCount] = React.useState(0)
  return (
    <div className="w-full max-w-sm space-y-2">
      <FileRow name="INV-2041-northwind.pdf" meta="PDF · 184 KB · Sep 24, 2026" onDownload={() => setCount((c) => c + 1)} />
      <p className="text-xs text-fg-muted tabular-nums">Downloads this session: {count}</p>
    </div>
  )
}`,
    node: <DownloadRow />,
  },
  {
    title: "Read-only, long name",
    description: "Without onDownload the row is display only. A long name truncates and the full name stays in the tooltip.",
    code: `<FileRow
  className="w-full max-w-xs"
  name="northwind-master-services-agreement-2026-signed-final.pdf"
  meta="PDF · 2.8 MB · Signed Aug 11, 2026"
/>`,
    node: (
      <FileRow
        className="w-full max-w-xs"
        name="northwind-master-services-agreement-2026-signed-final.pdf"
        meta="PDF · 2.8 MB · Signed Aug 11, 2026"
      />
    ),
  },
]
