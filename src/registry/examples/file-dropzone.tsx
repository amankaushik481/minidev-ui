"use client"
import * as React from "react"
import { FileDropzone } from "@/registry/ui/file-dropzone"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function fakeUpload(file: File, onProgress: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    let p = 0
    const timer = setInterval(() => {
      p += 0.08
      onProgress(Math.min(p, 1))
      if (p < 1) return
      clearInterval(timer)
      if (/fail/i.test(file.name)) reject(new Error("Network dropped. Try again."))
      else resolve()
    }, 100)
  })
}

function ImportDemo() {
  const [file, setFile] = React.useState<File | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <FileDropzone
        multiple={false}
        accept=".csv"
        label="Import customers"
        hint="One CSV with a header row"
        showList={false}
        onFiles={(files) => setFile(files[0] ?? null)}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-xs text-fg-muted">{file ? file.name + " is ready to import" : "No file chosen yet"}</p>
        <Button size="sm" disabled={!file}>Import</Button>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "With upload handler",
    description: "upload gets each file with a progress callback, and throwing (any file named fail here) shows the error row with a retry button.",
    code: `function fakeUpload(file: File, onProgress: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    let p = 0
    const timer = setInterval(() => {
      p += 0.08
      onProgress(Math.min(p, 1))
      if (p < 1) return
      clearInterval(timer)
      if (/fail/i.test(file.name)) reject(new Error("Network dropped. Try again."))
      else resolve()
    }, 100)
  })
}

<FileDropzone upload={fakeUpload} label="Upload receipts" hint="PDF or images, up to 10 MB each" />`,
    node: (
      <div className="w-full max-w-md">
        <FileDropzone upload={fakeUpload} label="Upload receipts" hint="PDF or images, up to 10 MB each" />
      </div>
    ),
  },
  {
    title: "Accept and size limit",
    description: "accept and maxSize are validated on drop and on pick, and the hint is written for you from them.",
    code: `<FileDropzone accept="image/png,image/jpeg,.svg" maxSize={2 * 1024 * 1024} label="Upload a logo" />`,
    node: (
      <div className="w-full max-w-md">
        <FileDropzone accept="image/png,image/jpeg,.svg" maxSize={2 * 1024 * 1024} label="Upload a logo" />
      </div>
    ),
  },
  {
    title: "Single file with callback",
    description: "multiple false takes one file at a time; onFiles hands you the accepted files so you can hide the list and render your own state.",
    code: `function ImportDemo() {
  const [file, setFile] = React.useState<File | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <FileDropzone
        multiple={false}
        accept=".csv"
        label="Import customers"
        hint="One CSV with a header row"
        showList={false}
        onFiles={(files) => setFile(files[0] ?? null)}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-xs text-fg-muted">{file ? file.name + " is ready to import" : "No file chosen yet"}</p>
        <Button size="sm" disabled={!file}>Import</Button>
      </div>
    </div>
  )
}`,
    node: <ImportDemo />,
  },
  {
    title: "Disabled",
    description: "A disabled zone ignores drops and clicks; use the hint to say why.",
    code: `<FileDropzone disabled label="Uploads paused" hint="Northwind has used all 5 GB on the Starter plan" />`,
    node: (
      <div className="w-full max-w-md">
        <FileDropzone disabled label="Uploads paused" hint="Northwind has used all 5 GB on the Starter plan" />
      </div>
    ),
  },
]
