"use client"
import * as React from "react"
import { CheckCheckIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function ReadReceipt({
  status = "sent",
  className,
}: {
  status?: "sent" | "delivered" | "read"
  className?: string
}) {
  const Icon = status === "sent" ? CheckIcon : CheckCheckIcon
  return (
    <span
      data-slot="read-receipt"
      aria-label={status}
      className={cn("inline-flex", status === "read" ? "text-accent" : "text-fg-muted", className)}
    >
      <Icon className="size-3.5" />
    </span>
  )
}
export { ReadReceipt }
