"use client"
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function CopyId({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      type="button"
      data-slot="copy-id"
      aria-label={copied ? "Copied" : `Copy ${value}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-sunken px-2 py-1",
        "font-mono text-[11px] tracking-[0.01em] text-fg-muted",
        "outline-none hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        } catch {}
      }}
    >
      <span className="max-w-40 truncate">{value}</span>
      {copied ? <CheckIcon className="size-3 text-success" /> : <CopyIcon className="size-3" />}
    </button>
  )
}
export { CopyId }
