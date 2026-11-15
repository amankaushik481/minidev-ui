"use client"
import { BellIcon, PlusIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Breadcrumb } from "@/registry/ui/breadcrumb"
import { Button } from "@/registry/ui/button"
import { SearchInput } from "@/registry/ui/search-input"
import { Topbar } from "@/registry/ui/topbar"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Page title with actions",
    description: "The title on the left, search and the primary action on the right.",
    code: `<Topbar
  className="w-full max-w-3xl rounded-xl border"
  title="Invoices"
  right={
    <>
      <SearchInput size="sm" aria-label="Search invoices" placeholder="Search invoices" containerClassName="hidden w-48 sm:block" />
      <Button size="sm"><PlusIcon /> New invoice</Button>
    </>
  }
/>`,
    node: (
      <Topbar
        className="w-full max-w-3xl rounded-xl border"
        title="Invoices"
        right={
          <>
            <SearchInput size="sm" aria-label="Search invoices" placeholder="Search invoices" containerClassName="hidden w-48 sm:block" />
            <Button size="sm"><PlusIcon /> New invoice</Button>
          </>
        }
      />
    ),
  },
  {
    title: "Breadcrumb on the left",
    description: "Pass left to replace the title, here with a trail, plus notifications and the account avatar.",
    code: `<Topbar
  className="w-full max-w-3xl rounded-xl border"
  left={<Breadcrumb items={[{ label: "Customers", href: "#" }, { label: "Northwind Traders" }]} />}
  right={
    <>
      <Button size="icon-sm" variant="ghost" aria-label="Notifications"><BellIcon /></Button>
      <Avatar className="size-8"><AvatarFallback>MC</AvatarFallback></Avatar>
    </>
  }
/>`,
    node: (
      <Topbar
        className="w-full max-w-3xl rounded-xl border"
        left={<Breadcrumb items={[{ label: "Customers", href: "#" }, { label: "Northwind Traders" }]} />}
        right={
          <>
            <Button size="icon-sm" variant="ghost" aria-label="Notifications"><BellIcon /></Button>
            <Avatar className="size-8"><AvatarFallback>MC</AvatarFallback></Avatar>
          </>
        }
      />
    ),
  },
]
