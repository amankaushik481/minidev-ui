"use client"
import { MoreHorizontalIcon } from "lucide-react"
import { TeamMemberRow } from "@/registry/ui/team-member-row"
import { Button } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import type { Example } from "./types"

function MemberMenu({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${name}`} />}>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem>Make admin</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const examples: Example[] = [
  {
    title: "Team list with a menu",
    description: "Stack rows in a bordered card; the last row drops its divider. Put a menu in actions.",
    code: `function MemberMenu({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={\`Actions for \${name}\`} />}>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem>Make admin</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

<div className="w-full max-w-md rounded-xl border border-border bg-surface">
  <TeamMemberRow name="Priya Raman" email="priya@northwind.com" role="Owner" />
  <TeamMemberRow name="Theo Okafor" email="theo@northwind.com" role="Admin" actions={<MemberMenu name="Theo Okafor" />} />
  <TeamMemberRow name="Lena Fischer" email="lena@northwind.com" role="Member" actions={<MemberMenu name="Lena Fischer" />} />
</div>`,
    node: (
      <div className="w-full max-w-md rounded-xl border border-border bg-surface">
        <TeamMemberRow name="Priya Raman" email="priya@northwind.com" role="Owner" />
        <TeamMemberRow name="Theo Okafor" email="theo@northwind.com" role="Admin" actions={<MemberMenu name="Theo Okafor" />} />
        <TeamMemberRow name="Lena Fischer" email="lena@northwind.com" role="Member" actions={<MemberMenu name="Lena Fischer" />} />
      </div>
    ),
  },
  {
    title: "Free-text roles",
    description: "role is any string, so it can say Billing or Invited. A one-word name keeps its first two letters as initials.",
    code: `<div className="w-full max-w-md rounded-xl border border-border bg-surface">
  <TeamMemberRow name="Okonkwo" email="okonkwo@acme.co" role="Billing" />
  <TeamMemberRow name="ravi@acme.co" email="Invite sent 2 days ago" role="Invited" />
</div>`,
    node: (
      <div className="w-full max-w-md rounded-xl border border-border bg-surface">
        <TeamMemberRow name="Okonkwo" email="okonkwo@acme.co" role="Billing" />
        <TeamMemberRow name="ravi@acme.co" email="Invite sent 2 days ago" role="Invited" />
      </div>
    ),
  },
]
