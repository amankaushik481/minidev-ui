"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * ListItem — one row of a list: optional leading visual, a heading with an optional description, and optional trailing content.
 *
 * Use it inside a bordered list or card for settings rows, people, files and
 * search results. It renders a div; put it in an li when the parent is a ul.
 * For a notification use NotificationItem, for a team member with a role use
 * TeamMemberRow, and for a file use FileRow.
 *
 * @example
 * <ListItem leading={<Avatar>…</Avatar>} heading="Maya Chen" description="Finance lead" trailing={<Badge>Owner</Badge>} />
 */
type ListItemProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Main line, truncated to one line. */
  heading: React.ReactNode
  /** Secondary line under the heading, truncated. */
  description?: React.ReactNode
  /** Visual before the text: an avatar, icon or checkbox. */
  leading?: React.ReactNode
  /** Content after the text: a badge, value, menu or button. */
  trailing?: React.ReactNode
}

function ListItem({
  heading,
  description,
  leading,
  trailing,
  className,
  ...props
}: ListItemProps) {
  return (
    <div data-slot="list-item" className={cn("flex items-center gap-3 border-b border-border px-3 py-3 last:border-b-0", className)} {...props}>
      {leading}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-fg">{heading}</div>
        {description ? <div className="truncate text-xs text-fg-muted">{description}</div> : null}
      </div>
      {trailing}
    </div>
  )
}
export { ListItem }
export type { ListItemProps }
