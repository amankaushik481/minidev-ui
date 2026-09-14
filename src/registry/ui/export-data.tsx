"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function ExportData({ className }: { className?: string }) {
  return (
    <div data-slot="export-data" className={cn("flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <div>
        <h3 className="text-sm font-medium text-fg">Export workspace data</h3>
        <p className="mt-1 text-xs text-fg-muted">JSON of projects, members, and audit history. Ready in a few minutes.</p>
      </div>
      <Button size="sm" variant="outline">Request export</Button>
    </div>
  )
}
export { ExportData }
