"use client"
import * as React from "react"
import { AppShell } from "@/registry/ui/app-shell"
import { Sidebar, SidebarNavItem } from "@/registry/ui/sidebar"
import { Topbar } from "@/registry/ui/topbar"
import { Breadcrumb } from "@/registry/ui/breadcrumb"
import { PageHeader } from "@/registry/ui/page-header"
import { Stepper } from "@/registry/ui/stepper"
import { Pagination } from "@/registry/ui/pagination"
import { CommandPalette } from "@/registry/ui/command-palette"
import { Button } from "@/registry/ui/button"
import { HomeIcon, SettingsIcon, UsersIcon } from "lucide-react"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  const [page, setPage] = React.useState(1)
  const [cmd, setCmd] = React.useState(false)
  return (
    <GalleryPage title="Navigation & shells">
      <GallerySection title="App shell">
        <AppShell className="max-w-4xl"
          sidebar={<Sidebar><div className="px-3 py-3 text-xs font-medium text-fg-muted">MiniDev</div><SidebarNavItem active icon={<HomeIcon className="size-4" />}>Home</SidebarNavItem><SidebarNavItem icon={<UsersIcon className="size-4" />}>Users</SidebarNavItem><SidebarNavItem icon={<SettingsIcon className="size-4" />}>Settings</SidebarNavItem></Sidebar>}
          topbar={<Topbar left={<Breadcrumb items={[{label:"App"},{label:"Users"},{label:"Jordan"}]} />} right={<Button size="sm" variant="outline" onClick={()=>setCmd(true)}>Command</Button>} />}
        >
          <PageHeader title="Users" description="Manage workspace members" actions={<Button size="sm">Invite</Button>} />
          <Stepper steps={["Details","Members","Billing"]} current={1} />
          <div className="mt-6"><Pagination page={page} pageCount={5} onPageChange={setPage} /></div>
        </AppShell>
      </GallerySection>
      <CommandPalette open={cmd} onOpenChange={setCmd} commands={[{id:"1",label:"Go to users"},{id:"2",label:"Open settings"},{id:"3",label:"Invite member"}]} />
    </GalleryPage>
  )
}
