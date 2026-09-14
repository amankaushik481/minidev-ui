"use client"
import { DashboardHome } from "@/registry/blocks/dashboard-home"
import { AdminConsole } from "@/registry/blocks/admin-console"
import { EngineeringConsole } from "@/registry/blocks/engineering-console"
import { AppShell } from "@/registry/ui/app-shell"
import { Sidebar, SidebarNavItem } from "@/registry/ui/sidebar"
import { Topbar } from "@/registry/ui/topbar"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Blocks">
      <GallerySection title="Dashboard home">
        <AppShell className="max-w-5xl" sidebar={<Sidebar><div className="p-3 text-xs font-medium text-fg-muted">MiniDev</div><SidebarNavItem active>Overview</SidebarNavItem><SidebarNavItem>Projects</SidebarNavItem></Sidebar>} topbar={<Topbar left={<span className="text-sm text-fg">Dashboard</span>} />}>
          <DashboardHome />
        </AppShell>
      </GallerySection>
      <GallerySection title="Admin console">
        <div className="w-full max-w-5xl"><AdminConsole /></div>
      </GallerySection>
      <GallerySection title="Engineering console">
        <div className="w-full max-w-5xl"><EngineeringConsole /></div>
      </GallerySection>
    </GalleryPage>
  )
}
