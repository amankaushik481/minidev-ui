"use client"
import * as React from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { PermissionChip } from "@/registry/ui/permission-chip"
import { IconButton } from "@/registry/ui/icon-button"
import { StatusDot } from "@/registry/ui/status-dot"

/** One member row for an admin user list: avatar with presence, name, email, permission level and an actions menu. */
type AdminUserRowProps = {
  name?: string
  email?: string
  role?: "admin" | "write" | "read"
  /** Presence dot: true for online, false for offline, omit to hide. */
  online?: boolean
  className?: string
}

function AdminUserRow({
  name = "Maya Chen",
  email = "maya.chen@northwind.com",
  role = "read",
  online,
  className,
}: AdminUserRowProps) {
  return (
    <div data-slot="admin-user-row" className={cn("flex items-center gap-3 border-b border-border px-3 py-2.5", className)}>
      <div className="relative">
        <Avatar className="size-8">
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        {online != null ? <StatusDot className="absolute -right-0.5 -bottom-0.5" tone={online ? "success" : "neutral"} /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{name}</p>
        <p className="truncate text-xs text-fg-muted">{email}</p>
      </div>
      <PermissionChip level={role} />
      <IconButton type="button" size="icon-sm" variant="ghost" aria-label={`Actions for ${name}`}>
        <MoreHorizontalIcon />
      </IconButton>
    </div>
  )
}
export { AdminUserRow }
export type { AdminUserRowProps }
