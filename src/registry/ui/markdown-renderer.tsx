"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** MarkdownRenderer — paragraphs and fenced code blocks from a markdown string, with no parser dependency. */

// A note from the Lumen developer docs: paragraphs and one fenced code block.
const SAMPLE_CONTENT = `Lumen sends a webhook the moment an invoice is paid. Verify the signature header, then mark the order as settled in your own system.

\`\`\`json
{
  "event": "invoice.paid",
  "invoice": "INV-2041",
  "customer": "Northwind",
  "amount": 12400,
  "currency": "USD",
  "paid_at": "2026-10-14T09:42:00Z"
}
\`\`\`

Deliveries retry with exponential backoff for 24 hours. Return a 2xx within five seconds or the attempt is marked failed and queued again.`

type MarkdownRendererProps = {
  /** Markdown source. Paragraphs and fenced code blocks are rendered; other syntax is shown as plain text. */
  content?: string
  className?: string
}

function MarkdownRenderer({ content = SAMPLE_CONTENT, className }: MarkdownRendererProps) {
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
export type { MarkdownRendererProps }
