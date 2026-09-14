"use client"
import { PageHeader } from "@/registry/ui/page-header"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { TeamMemberRow } from "@/registry/ui/team-member-row"
import { BackLink } from "@/registry/ui/back-link"
function UserDetail() {
  return (
    <div data-slot="user-detail" className="space-y-4">
      <BackLink href="#">Users</BackLink>
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            <Avatar className="size-10"><AvatarFallback>JK</AvatarFallback></Avatar>
            Jordan Lee
          </span>
        }
        description="Admin · jordan@minidev.pro"
      />
      <TeamMemberRow name="Jordan Lee" email="jordan@minidev.pro" role="Admin" />
    </div>
  )
}
export { UserDetail }
