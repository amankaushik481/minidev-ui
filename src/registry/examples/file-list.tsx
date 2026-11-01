"use client"
import * as React from "react"
import { FileList } from "@/registry/ui/file-list"
import type { Example } from "./types"

const ATTACHMENTS = [
  { id: "inv", name: "INV-2041.pdf", meta: "PDF · 184 KB" },
  { id: "po", name: "northwind-PO-7781.pdf", meta: "PDF · 92 KB" },
  { id: "timesheet", name: "september-timesheet.csv", meta: "CSV · 38 KB" },
]

function DownloadDemo() {
  const [busy, setBusy] = React.useState<string | null>(null)
  const download = (id: string) => {
    setBusy(id)
    setTimeout(() => setBusy(null), 1200)
  }
  const current = ATTACHMENTS.find((f) => f.id === busy)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <FileList files={ATTACHMENTS} onDownload={download} />
      <p className="h-4 text-xs text-fg-muted" aria-live="polite">
        {current ? `Preparing ${current.name}…` : ""}
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Download handler",
    description: "onDownload receives the file id; start the download there and show progress however your app does.",
    code: `const ATTACHMENTS = [
  { id: "inv", name: "INV-2041.pdf", meta: "PDF · 184 KB" },
  { id: "po", name: "northwind-PO-7781.pdf", meta: "PDF · 92 KB" },
  { id: "timesheet", name: "september-timesheet.csv", meta: "CSV · 38 KB" },
]

function DownloadDemo() {
  const [busy, setBusy] = React.useState<string | null>(null)
  const download = (id: string) => {
    setBusy(id)
    setTimeout(() => setBusy(null), 1200)
  }
  const current = ATTACHMENTS.find((f) => f.id === busy)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <FileList files={ATTACHMENTS} onDownload={download} />
      <p className="h-4 text-xs text-fg-muted" aria-live="polite">
        {current ? \`Preparing \${current.name}…\` : ""}
      </p>
    </div>
  )
}`,
    node: <DownloadDemo />,
  },
  {
    title: "Read only",
    description: "Pass your own files without onDownload and the rows render without the action button.",
    code: `<FileList
  className="w-full max-w-md"
  files={[
    { id: "msa", name: "northwind-msa-signed.pdf", meta: "Signed by Theo Okafor · Aug 11, 2026" },
    { id: "nda", name: "mutual-nda.pdf", meta: "Signed by Maya Chen · Jul 2, 2026" },
  ]}
/>`,
    node: (
      <FileList
        className="w-full max-w-md"
        files={[
          { id: "msa", name: "northwind-msa-signed.pdf", meta: "Signed by Theo Okafor · Aug 11, 2026" },
          { id: "nda", name: "mutual-nda.pdf", meta: "Signed by Maya Chen · Jul 2, 2026" },
        ]}
      />
    ),
  },
]
