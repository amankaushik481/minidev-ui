"use client"
import * as React from "react"
import { CheckCheckIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * ReadReceipt — one tick for sent, two for delivered, two accent ticks for read.
 *
 * Use it next to a message timestamp in chat bubbles. It carries a spoken label ("Read"), so it
 * is not silent for screen readers. For a full delivery timeline use a status list.
 *
 * @example
 * <ReadReceipt status="delivered" />
 */

type ReceiptStatus = "sent" | "delivered" | "read"

const names: Record<ReceiptStatus, string> = { sent: "Sent", delivered: "Delivered", read: "Read" }

function ReadReceipt({
  status = "sent",
  label,
  className,
}: {
  /** Delivery state of the message. */
  status?: ReceiptStatus
  /** Accessible name. Defaults to "Sent", "Delivered" or "Read". */
  label?: string
  className?: string
}) {
  const Icon = status === "sent" ? CheckIcon : CheckCheckIcon
  return (
    <span
      data-slot="read-receipt"
      data-status={status}
      role="img"
      aria-label={label ?? names[status]}
      className={cn("inline-flex", status === "read" ? "text-accent" : "text-fg-muted", className)}
    >
      <Icon aria-hidden className="size-3.5" />
    </span>
  )
}
export { ReadReceipt }
export type { ReceiptStatus }
