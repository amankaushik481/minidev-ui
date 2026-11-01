"use client"
import * as React from "react"
import { AudioRecorder } from "@/registry/ui/audio-recorder"
import type { Example } from "./types"

function UploadDemo() {
  const [note, setNote] = React.useState<{ duration: number; size: number; type: string } | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <AudioRecorder
        maxDuration={30}
        title="Quick reply"
        description="Up to 30 seconds, sent to Theo Okafor"
        fileName="reply-theo-okafor"
        onRecorded={(blob, meta) => setNote({ duration: meta.duration, size: blob.size, type: meta.mimeType })}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">
        {note ? `${note.duration.toFixed(1)} s, ${Math.max(1, Math.round(note.size / 1024))} KB of ${note.type.split(";")[0]} ready to upload` : "Nothing recorded yet."}
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Short limit with callback",
    description: "maxDuration stops the recording on its own; onRecorded hands you the Blob and its metadata, which is what an upload needs.",
    code: `function UploadDemo() {
  const [note, setNote] = React.useState<{ duration: number; size: number; type: string } | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <AudioRecorder
        maxDuration={30}
        title="Quick reply"
        description="Up to 30 seconds, sent to Theo Okafor"
        fileName="reply-theo-okafor"
        onRecorded={(blob, meta) => setNote({ duration: meta.duration, size: blob.size, type: meta.mimeType })}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">
        {note ? \`\${note.duration.toFixed(1)} s, \${Math.max(1, Math.round(note.size / 1024))} KB of \${note.type.split(";")[0]} ready to upload\` : "Nothing recorded yet."}
      </p>
    </div>
  )
}`,
    node: <UploadDemo />,
  },
  {
    title: "Compact",
    description: "Fewer bars and a narrower width fit the recorder into a sidebar or a comment composer.",
    code: `<AudioRecorder bars={24} title="Pronunciation" description="Say the name once" fileName="northwind-pronunciation" className="max-w-xs" />`,
    node: <AudioRecorder bars={24} title="Pronunciation" description="Say the name once" fileName="northwind-pronunciation" className="max-w-xs" />,
  },
]
