"use client"
import { MoreHorizontalIcon } from "lucide-react"
import { AdminUserRow } from "@/registry/ui/admin-user-row"
import { Button } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import type { Example } from "./types"

function RowMenu({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${name}`} />}>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuItem>Change access</DropdownMenuItem>
        <DropdownMenuItem>Reset two-factor</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Remove from workspace</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const examples: Example[] = [
  {
    title: "Members table with a row menu",
    description: "Stack rows in a bordered container and pass a DropdownMenu as actions; it replaces the built-in more button.",
    code: `function RowMenu({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={\`Actions for \${name}\`} />}>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuItem>Change access</DropdownMenuItem>
        <DropdownMenuItem>Reset two-factor</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Remove from workspace</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

<div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface [&>*:last-child]:border-b-0">
  <AdminUserRow name="Priya Raman" email="priya@northwind.com" role="admin" online actions={<RowMenu name="Priya Raman" />} />
  <AdminUserRow name="Theo Okafor" email="theo@northwind.com" role="write" online={false} actions={<RowMenu name="Theo Okafor" />} />
  <AdminUserRow name="Lena Fischer" email="lena@northwind.com" role="read" actions={<RowMenu name="Lena Fischer" />} />
</div>`,
    node: (
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface [&>*:last-child]:border-b-0">
        <AdminUserRow name="Priya Raman" email="priya@northwind.com" role="admin" online actions={<RowMenu name="Priya Raman" />} />
        <AdminUserRow name="Theo Okafor" email="theo@northwind.com" role="write" online={false} actions={<RowMenu name="Theo Okafor" />} />
        <AdminUserRow name="Lena Fischer" email="lena@northwind.com" role="read" actions={<RowMenu name="Lena Fischer" />} />
      </div>
    ),
  },
  {
    title: "Presence",
    description: "online shows a green dot, online={false} a grey one, and leaving it out hides the dot. Screen readers hear Online or Offline.",
    code: `<div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface [&>*:last-child]:border-b-0">
  <AdminUserRow name="Ana Costa" email="ana@acme.co" role="write" online />
  <AdminUserRow name="Ravi Menon" email="ravi@acme.co" role="read" online={false} />
  <AdminUserRow name="Jonas Berg" email="jonas@acme.co" role="read" />
</div>`,
    node: (
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface [&>*:last-child]:border-b-0">
        <AdminUserRow name="Ana Costa" email="ana@acme.co" role="write" online />
        <AdminUserRow name="Ravi Menon" email="ravi@acme.co" role="read" online={false} />
        <AdminUserRow name="Jonas Berg" email="jonas@acme.co" role="read" />
      </div>
    ),
  },
]
