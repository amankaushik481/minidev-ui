"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { FileDropzone } from "@/registry/ui/file-dropzone"
import { Button } from "@/registry/ui/button"
import { Callout } from "@/registry/ui/callout"

function BulkUserImport({
  onImport,
  className,
}: {
  onImport?: (files: FileList | File[]) => void
  className?: string
}) {
  const [ready, setReady] = React.useState(false)
  return (
    <div data-slot="bulk-user-import" className={cn("space-y-3", className)}>
      <Callout title="CSV format" tone="info">email, name, role — one user per row.</Callout>
      <FileDropzone
        accept=".csv,text/csv"
        label="Drop CSV of users"
        hint="or click to browse"
        onFiles={(f) => { setReady(true); onImport?.(f) }}
      />
      <Button type="button" disabled={!ready}>Import users</Button>
    </div>
  )
}
export { BulkUserImport }
