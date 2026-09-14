"use client"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

function TeamMemberRow({
  name = "Sam Rivera",
  email = "sam@acme.co",
  role = "Admin",
  className,
}: {
  name?: string
  email?: string
  role?: string
  className?: string
}) {
  return (
    <div data-slot="team-member-row" className={cn("flex items-center gap-3 border-b border-border px-3 py-2.5 last:border-b-0", className)}>
      <Avatar className="size-8">
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{name}</p>
        <p className="truncate text-xs text-fg-muted">{email}</p>
      </div>
      <Badge variant="outline">{role}</Badge>
    </div>
  )
}
export { TeamMemberRow }
