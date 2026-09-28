"use client"
import * as React from "react"
import { NavigationMenu as Nav } from "@base-ui/react/navigation-menu"
import { cn } from "@/lib/utils"

function NavigationMenu({ className, ...props }: React.ComponentProps<typeof Nav.Root>) {
  return (
    <Nav.Root data-slot="navigation-menu" className={cn("relative flex justify-center", className)} {...props} />
  )
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof Nav.List>) {
  return <Nav.List data-slot="navigation-menu-list" className={cn("flex items-center gap-1", className)} {...props} />
}

function NavigationMenuItem(props: React.ComponentProps<typeof Nav.Item>) {
  return <Nav.Item data-slot="navigation-menu-item" {...props} />
}

function NavigationMenuTrigger({ className, ...props }: React.ComponentProps<typeof Nav.Trigger>) {
  return (
    <Nav.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        "inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium text-fg outline-none",
        "hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent data-[popup-open]:bg-sunken",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof Nav.Content>) {
  return (
    <Nav.Content
      data-slot="navigation-menu-content"
      className={cn("w-full p-4 sm:w-auto", className)}
      {...props}
    />
  )
}

function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof Nav.Link>) {
  return (
    <Nav.Link
      data-slot="navigation-menu-link"
      className={cn(
        "block rounded-lg p-3 text-sm outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({ className, ...props }: React.ComponentProps<typeof Nav.Viewport>) {
  return (
    <Nav.Portal>
      <Nav.Positioner sideOffset={8} className="z-50">
        <Nav.Popup className={cn("overflow-hidden rounded-xl border border-border bg-raised shadow-lg", className)}>
          <Nav.Viewport data-slot="navigation-menu-viewport" {...props} />
        </Nav.Popup>
      </Nav.Positioner>
    </Nav.Portal>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
}
