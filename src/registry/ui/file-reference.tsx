"use client"
import { cn } from "@/lib/utils"
import { FileIcon } from "lucide-react"

function FileReference({
  name = "hero-client-pitch.tsx",
  path = "src/registry/premium/hero-client-pitch.tsx",
  lines = "1–92",
  className,
}: {
  name?: string
  path?: string
  lines?: string
  className?: string
}) {
  return (
    <div data-slot="file-reference" className={cn("flex items-center gap-3 rounded-xl border border-border bg-sunken px-3 py-2.5", className)}>
      <FileIcon className="size-4 shrink-0 text-fg-muted" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{name}</p>
        <p className="truncate font-mono text-[11px] text-fg-muted">{path}</p>
      </div>
      <span className="font-mono text-[11px] tabular-nums text-fg-muted">{lines}</span>
    </div>
  )
}
export { FileReference }
