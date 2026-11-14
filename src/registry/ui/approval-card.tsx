"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

/**
 * A request card with the requester, a summary and approve or reject actions.
 *
 * Use for human-in-the-loop steps: refunds, access requests, an agent asking permission before a
 * tool call. Prefer `AlertDialog` when the decision must block the page. The card is an `article`
 * named by its title, so a stack of requests reads as separate items.
 *
 * @example
 * <ApprovalCard title="Refund $1,240 on INV-2041" requester="Theo Okafor"
 *   summary="Customer was double charged in October." onApprove={approve} onReject={reject} />
 */
type ApprovalCardProps = {
  /** What is being requested. Also the card's accessible name. */
  title?: string
  /** Who asked; initials are derived for the avatar. */
  requester?: string
  /** Optional context under the requester line. */
  summary?: React.ReactNode
  onApprove?: () => void
  onReject?: () => void
  /** Text on the approve button. */
  approveLabel?: string
  /** Text on the reject button. */
  rejectLabel?: string
  className?: string
}

const initials = (name: string) => name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()

function ApprovalCard({
  title = "Refund $1,240 on INV-2041",
  requester = "Theo Okafor",
  summary,
  onApprove,
  onReject,
  approveLabel = "Approve",
  rejectLabel = "Reject",
  className,
}: ApprovalCardProps) {
  const headingId = React.useId()
  return (
    <article
      data-slot="approval-card"
      aria-labelledby={headingId}
      className={cn("w-full max-w-md rounded-xl border border-border bg-surface p-4", className)}
    >
      <div className="flex items-start gap-3">
        <Avatar className="size-9">
          <AvatarFallback aria-hidden>{initials(requester)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h3 id={headingId} className="text-sm font-medium text-fg">{title}</h3>
          <p className="text-xs text-fg-muted">Requested by {requester}</p>
          {summary ? <p className="mt-2 text-sm text-fg-muted">{summary}</p> : null}
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onReject}>{rejectLabel}</Button>
        <Button type="button" size="sm" onClick={onApprove}>{approveLabel}</Button>
      </div>
    </article>
  )
}
export { ApprovalCard }
export type { ApprovalCardProps }
