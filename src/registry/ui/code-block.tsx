"use client"
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
function CodeBlock({ code, language="tsx", className }: { code: string; language?: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <div data-slot="code-block" className={cn("overflow-hidden rounded-xl border border-border bg-sunken", className)}>
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <span className="text-xs text-fg-muted">{language}</span>
        <Button size="sm" variant="outline" aria-label="Copy code" onClick={async()=>{ await navigator.clipboard.writeText(code); setCopied(true); setTimeout(()=>setCopied(false),1200)}}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="overflow-auto p-3 text-xs leading-[1.55] text-fg"><code>{code}</code></pre>
    </div>
  )
}
export { CodeBlock }
