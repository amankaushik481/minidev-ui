"use client"
import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

/**
 * One teammate in a members list: avatar, name, email and a role badge, with an optional trailing actions slot.
 *
 * Stack several inside a bordered card; the last row drops its divider. Use `AdminUserRow` when you need presence and a permission chip.
 *
 * @example
 * <TeamMemberRow name="Priya Raman" email="priya@northwind.com" role="Owner" actions={<RowMenu />} />
 */
type TeamMemberRowProps = {
  name?: string
  email?: string
  /** Free text shown in an outline badge, e.g. "Admin" or "Member". */
  role?: string
  /** Avatar image; initials are used when absent. */
  src?: string
  /** Trailing controls such as a role picker or an overflow menu. */
  actions?: React.ReactNode
  className?: string
}

/** "Sam Rivera" → "SR"; single words keep their first two letters. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : name.slice(0, 2)).toUpperCase()
}

function TeamMemberRow({ name = "Sam Rivera", email = "sam@acme.co", role = "Admin", src, actions, className }: TeamMemberRowProps) {
  return (
    <div data-slot="team-member-row" className={cn("flex items-center gap-3 border-b border-border px-3 py-2.5 last:border-b-0", className)}>
      <Avatar className="size-8">
        {src ? <AvatarImage src={src} alt="" /> : null}
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{name}</p>
        <p className="truncate text-xs text-fg-muted">{email}</p>
      </div>
      {role ? <Badge variant="outline">{role}</Badge> : null}
      {actions}
    </div>
  )
}
export { TeamMemberRow }
export type { TeamMemberRowProps }
