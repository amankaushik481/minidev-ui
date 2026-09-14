"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Callout } from "@/registry/ui/callout"

function MergeBox({
  canMerge = true,
  className,
}: {
  canMerge?: boolean
  className?: string
}) {
  return (
    <div data-slot="merge-box" className={cn("space-y-3 rounded-xl border border-border bg-surface p-4", className)}>
      <Callout tone={canMerge ? "success" : "warning"} title={canMerge ? "Ready to merge" : "Checks pending"}>
        {canMerge ? "All required checks passed." : "Wait for audit + typecheck."}
      </Callout>
      <Button type="button" className="w-full" disabled={!canMerge}>Merge pull request</Button>
    </div>
  )
}
export { MergeBox }
