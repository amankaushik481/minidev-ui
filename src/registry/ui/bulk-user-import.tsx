"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { FileDropzone } from "@/registry/ui/file-dropzone"
import { Button } from "@/registry/ui/button"
import { Callout } from "@/registry/ui/callout"

/**
 * A CSV import panel for inviting many users: format note, CSV dropzone and an Import button.
 *
 * Use in admin "Members" pages. Parsing and inviting are yours: `onImport` gets the dropped files
 * when the user presses Import. Prefer `FileDropzone` alone for generic uploads.
 *
 * @example
 * <BulkUserImport onImport={async (files) => invite(await parseCsv(files[0]))} />
 */
type BulkUserImportProps = {
  /** Called with the chosen CSV file(s) when Import is pressed. */
  onImport?: (files: FileList | File[]) => void
  className?: string
}

function BulkUserImport({ onImport, className }: BulkUserImportProps) {
  const [files, setFiles] = React.useState<FileList | File[] | null>(null)
  const ready = !!files && files.length > 0
  return (
    <div data-slot="bulk-user-import" className={cn("space-y-3", className)}>
      <Callout title="CSV format" tone="info">email, name, role. One user per row.</Callout>
      <FileDropzone
        accept=".csv,text/csv"
        label="Drop CSV of users"
        hint="or click to browse"
        multiple={false}
        onFiles={setFiles}
        onRemove={() => setFiles(null)}
      />
      <Button type="button" disabled={!ready} onClick={() => files && onImport?.(files)}>
        Import users
      </Button>
    </div>
  )
}
export { BulkUserImport }
export type { BulkUserImportProps }
