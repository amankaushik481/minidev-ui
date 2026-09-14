"use client"
import * as React from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { PermissionChip } from "@/registry/ui/permission-chip"
import { IconButton } from "@/registry/ui/icon-button"
import { StatusDot } from "@/registry/ui/status-dot"

function AdminUserRow({
  name,
  email,
  role = "read",
  online,
  className,
}: {
  name: string
  email: string
  role?: "admin" | "write" | "read"
  online?: boolean
  className?: string
}) {
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
