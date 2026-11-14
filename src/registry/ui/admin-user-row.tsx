"use client"
import * as React from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { PermissionChip } from "@/registry/ui/permission-chip"
import { IconButton } from "@/registry/ui/icon-button"
import { StatusDot } from "@/registry/ui/status-dot"

/**
 * One member row for an admin user list: avatar with presence, name, email, permission level and an actions menu.
 *
 * Stack rows inside a bordered container for a members table. Prefer `DataTable` when you need
 * sorting, selection or many columns. Put a `DropdownMenu` in `actions` for real row actions.
 *
 * @example
 * <AdminUserRow name="Theo Okafor" email="theo@northwind.com" role="write" online
 *   actions={<DropdownMenu>…</DropdownMenu>} />
 */
type AdminUserRowProps = {
  /** Full name; initials are derived for the avatar. */
  name?: string
  email?: string
  /** Permission level shown as a chip. */
  role?: "admin" | "write" | "read"
  /** Presence dot: true for online, false for offline, omit to hide. */
  online?: boolean
  /** Replaces the default "more" button, e.g. with a `DropdownMenu`. */
  actions?: React.ReactNode
  /** Called when the default "more" button is pressed. Ignored when `actions` is set. */
  onActionsClick?: () => void
  className?: string
}

const initials = (name: string) => name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()

function AdminUserRow({
  name = "Maya Chen",
  email = "maya.chen@northwind.com",
  role = "read",
  online,
  actions,
  onActionsClick,
  className,
}: AdminUserRowProps) {
  return (
    <div data-slot="admin-user-row" className={cn("flex items-center gap-3 border-b border-border px-3 py-2.5", className)}>
      <div className="relative">
        <Avatar className="size-8">
          <AvatarFallback aria-hidden>{initials(name)}</AvatarFallback>
        </Avatar>
        {online != null ? (
          <>
            <StatusDot className="absolute -right-0.5 -bottom-0.5" tone={online ? "success" : "neutral"} />
            <span className="sr-only">{online ? "Online" : "Offline"}</span>
          </>
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{name}</p>
        <p className="truncate text-xs text-fg-muted">{email}</p>
      </div>
      <PermissionChip level={role} />
      {actions ?? (
        <IconButton type="button" size="icon-sm" variant="ghost" aria-label={`Actions for ${name}`} onClick={onActionsClick}>
          <MoreHorizontalIcon />
        </IconButton>
      )}
    </div>
  )
}
export { AdminUserRow }
export type { AdminUserRowProps }
