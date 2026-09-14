"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function MarkdownRenderer({ content, className }: { content: string; className?: string }) {
  const parts = content.split(/```[\w]*\n?/)
  return (
    <div data-slot="markdown-renderer" className={cn("space-y-3 text-sm leading-[1.55] text-fg", className)}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <pre key={i} className="overflow-auto rounded-lg border border-border bg-sunken p-3 text-xs">
            <code>{part.replace(/\n$/, "")}</code>
          </pre>
        ) : (
          part
            .split(/\n\n+/)
            .filter(Boolean)
            .map((p, j) => <p key={`${i}-${j}`}>{p}</p>)
        )
      )}
    </div>
  )
}
export { MarkdownRenderer }
