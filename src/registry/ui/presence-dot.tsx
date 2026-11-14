"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * PresenceDot — a small coloured dot that shows whether a person is online, away, busy or offline.
 *
 * Use it on avatars, member lists and chat headers. For a labelled state chip use StatusBadge;
 * for a pulsing "live" indicator use a badge with its own copy.
 *
 * @example
 * <PresenceDot status="online" />
 * <PresenceDot status="busy" label="Maya is in a meeting" />
 */

type PresenceStatus = "online" | "away" | "busy" | "offline"

const tones: Record<PresenceStatus, string> = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-danger",
  offline: "bg-fg-subtle",
}

const names: Record<PresenceStatus, string> = { online: "Online", away: "Away", busy: "Busy", offline: "Offline" }

function PresenceDot({
  status = "offline",
  className,
  label,
}: {
  /** Which presence to show. Colour comes from the success, warning, danger and fg-subtle tokens. */
  status?: PresenceStatus
  className?: string
  /** Accessible name. Defaults to the status, e.g. "Online". */
  label?: string
}) {
  return (
    <span
      data-slot="presence-dot"
      data-status={status}
      role="img"
      aria-label={label ?? names[status]}
      className={cn("inline-block size-2.5 shrink-0 rounded-full", tones[status], className)}
    />
  )
}
export { PresenceDot }
export type { PresenceStatus }
