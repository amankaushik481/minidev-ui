"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

type ApprovalCardProps = {
  title?: string
  requester?: string
  summary?: string
  onApprove?: () => void
  onReject?: () => void
  className?: string
}

/** A request card with the requester, a summary and approve or reject actions. */
function ApprovalCard({
  title = "Refund $1,240 on INV-2041",
  requester = "Theo Okafor",
  summary,
  onApprove,
  onReject,
  className,
}: ApprovalCardProps) {
  return (
    <div
      data-slot="approval-card"
      className={cn("w-full max-w-md rounded-xl border border-border bg-surface p-4", className)}
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
export type { ApprovalCardProps }
