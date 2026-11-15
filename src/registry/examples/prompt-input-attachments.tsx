"use client"
import * as React from "react"
import { PromptInputAttachments } from "@/registry/ui/prompt-input-attachments"
import { AttachmentChip } from "@/registry/ui/attachment-chip"
import type { Example } from "./types"

function PromptWithFiles() {
  const input = React.useRef<HTMLInputElement>(null)
  const [files, setFiles] = React.useState<File[]>([])
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <input
        ref={input}
        type="file"
        multiple
        accept=".pdf,.csv"
        className="hidden"
        onChange={(e) => {
          const picked = Array.from(e.target.files ?? [])
          setFiles((all) => [...all, ...picked])
          e.target.value = ""
        }}
      />
      <PromptInputAttachments
        hint="PDF or CSV, up to 10 MB"
        placeholder="Ask about the attached statements…"
        onAttach={() => input.current?.click()}
        onSubmit={() => setFiles([])}
      />
      {files.length ? (
        <div className="flex flex-wrap gap-1.5">
          {files.map((f, i) => (
            <AttachmentChip
              key={`${f.name}-${i}`}
              name={f.name}
              meta={`${Math.max(1, Math.round(f.size / 1024))} KB`}
              onRemove={() => setFiles((all) => all.filter((_, j) => j !== i))}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "File picker and chips",
    description: "onAttach opens a hidden file input; the chosen files are listed with AttachmentChip from your own state.",
    code: `function PromptWithFiles() {
  const input = React.useRef<HTMLInputElement>(null)
  const [files, setFiles] = React.useState<File[]>([])
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <input
        ref={input}
        type="file"
        multiple
        accept=".pdf,.csv"
        className="hidden"
        onChange={(e) => {
          const picked = Array.from(e.target.files ?? [])
          setFiles((all) => [...all, ...picked])
          e.target.value = ""
        }}
      />
      <PromptInputAttachments
        hint="PDF or CSV, up to 10 MB"
        placeholder="Ask about the attached statements…"
        onAttach={() => input.current?.click()}
        onSubmit={() => setFiles([])}
      />
      {files.length ? (
        <div className="flex flex-wrap gap-1.5">
          {files.map((f, i) => (
            <AttachmentChip
              key={\`\${f.name}-\${i}\`}
              name={f.name}
              meta={\`\${Math.max(1, Math.round(f.size / 1024))} KB\`}
              onRemove={() => setFiles((all) => all.filter((_, j) => j !== i))}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}`,
    node: <PromptWithFiles />,
  },
  {
    title: "Disabled while uploading",
    description: "disabled turns off the attach button and the input together; use hint to say why.",
    code: `<PromptInputAttachments className="w-full max-w-lg" disabled hint="Uploading bank-export.csv…" placeholder="Wait for the upload to finish" />`,
    node: (
      <PromptInputAttachments className="w-full max-w-lg" disabled hint="Uploading bank-export.csv…" placeholder="Wait for the upload to finish" />
    ),
  },
]
