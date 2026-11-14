"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * A full-width strip above the site header for one short announcement (launch, sale, maintenance).
 *
 * Use for site-wide news on marketing pages. Prefer `Banner` for in-app notices with tones and an
 * action, and `Callout` for notes inside content. Exposed as a labelled region; the dismiss button
 * only renders when `onDismiss` is given (persist the dismissal yourself).
 *
 * @example
 * <AnnouncementBar onDismiss={() => setHidden(true)}>
 *   Lumen 2.4 is out. <a href="/changelog">See what's new</a>
 * </AnnouncementBar>
 */
type AnnouncementBarProps = {
  /** The message; may include a link. Keep it to one line. */
  children: React.ReactNode
  /** Shows a dismiss button and is called when it is pressed. */
  onDismiss?: () => void
  /** Accessible name of the region. */
  label?: string
  className?: string
}

function AnnouncementBar({ children, onDismiss, label = "Announcement", className }: AnnouncementBarProps) {
  return (
    <div
      data-slot="announcement-bar"
      role="region"
      aria-label={label}
      className={cn(
        "flex items-center justify-center gap-3 border-b border-border bg-sunken px-4 py-2 text-sm text-fg",
        "[&_a]:font-medium [&_a]:text-accent-fg [&_a]:underline [&_a]:decoration-accent-line [&_a]:underline-offset-4 [&_a:hover]:decoration-accent",
        className
      )}
    >
      <div className="min-w-0 flex-1 text-center sm:flex-none">{children}</div>
      {onDismiss ? (
        <IconButton type="button" size="icon-xs" variant="ghost" aria-label="Dismiss announcement" onClick={onDismiss} className="-my-1 shrink-0">
          <XIcon />
        </IconButton>
      ) : null}
    </div>
  )
}
export { AnnouncementBar }
export type { AnnouncementBarProps }
