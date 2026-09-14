"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/registry/ui/sidebar"
import { Button } from "@/registry/ui/button"
import { PanelLeftIcon } from "lucide-react"
function CollapsibleSidebar({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div data-slot="collapsible-sidebar" className={cn("relative", className)}>
      <Sidebar collapsed={collapsed}>{children}</Sidebar>
      <Button
        size="icon-sm"
        variant="outline"
        className="absolute top-2 -right-3 z-20"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed((v) => !v)}
      >
        <PanelLeftIcon />
      </Button>
    </div>
  )
}
export { CollapsibleSidebar }
