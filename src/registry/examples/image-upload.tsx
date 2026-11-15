"use client"
import * as React from "react"
import { ImageUpload } from "@/registry/ui/image-upload"
import type { Example } from "./types"

function CoverImage() {
  const [cover, setCover] = React.useState<string | null>(null)
  const [file, setFile] = React.useState<File | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ImageUpload
        value={cover}
        alt="Cover image for the Lisbon offsite page"
        onChange={(url, f) => {
          setCover(url)
          setFile(f ?? null)
        }}
      />
      <p className="text-xs text-fg-muted">{file ? "Ready to upload " + file.name : "No cover yet"}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Cover image",
    description: "Keep the File from onChange for the upload; the URL is only a local preview.",
    code: `function CoverImage() {
  const [cover, setCover] = React.useState<string | null>(null)
  const [file, setFile] = React.useState<File | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ImageUpload
        value={cover}
        alt="Cover image for the Lisbon offsite page"
        onChange={(url, f) => {
          setCover(url)
          setFile(f ?? null)
        }}
      />
      <p className="text-xs text-fg-muted">{file ? "Ready to upload " + file.name : "No cover yet"}</p>
    </div>
  )
}`,
    node: <CoverImage />,
  },
  {
    title: "Logo with a 1 MB limit",
    description: "maxSize is in bytes. A larger file is listed with an error and onChange is not called.",
    code: `<ImageUpload maxSize={1024 * 1024} alt="Workspace logo" className="max-w-xs" />`,
    node: <ImageUpload maxSize={1024 * 1024} alt="Workspace logo" className="max-w-xs" />,
  },
]
