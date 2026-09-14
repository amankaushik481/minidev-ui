"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

function ApprovalCard({
  title,
  requester,
  summary,
  onApprove,
  onReject,
  className,
}: {
  title: string
  requester: string
  summary?: string
  onApprove?: () => void
  onReject?: () => void
  className?: string
}) {
  return (
    <div
      data-slot="approval-card"
      className={cn("rounded-xl border border-border bg-surface p-4", className)}
    >
      <div className="flex items-start gap-3">
        <Avatar className="size-9">
          <AvatarFallback>{requester.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-fg">{title}</h3>
          <p className="text-xs text-fg-muted">Requested by {requester}</p>
          {summary ? <p className="mt-2 text-sm text-fg-muted">{summary}</p> : null}
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onReject}>Reject</Button>
        <Button type="button" size="sm" onClick={onApprove}>Approve</Button>
      </div>
    </div>
  )
}
export { ApprovalCard }
