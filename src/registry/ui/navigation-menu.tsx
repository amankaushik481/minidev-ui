"use client"
import * as React from "react"
import { NavigationMenu as Nav } from "@base-ui/react/navigation-menu"
import { cn } from "@/lib/utils"

/**
 * NavigationMenu — a site navigation bar whose items open rich dropdown panels, built on Base UI NavigationMenu.
 *
 * Panels share one viewport that resizes between items; hover or click opens, arrow keys
 * move between triggers, Escape closes and returns focus. Render NavigationMenuViewport
 * once inside NavigationMenu. Use it for marketing and docs headers with grouped links;
 * for app commands use Menubar, for a simple bar of links use NavMarketing.
 *
 * @example
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Product</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <NavigationMenuLink href="/invoices">Invoices</NavigationMenuLink>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 *   <NavigationMenuViewport />
 * </NavigationMenu>
 */
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
        "inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium text-fg outline-none select-none",
        "transition-[background-color] duration-[70ms]",
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
        "block rounded-lg p-3 text-sm outline-none transition-[background-color] duration-[70ms] hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent data-[active]:bg-sunken",
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
        <Nav.Popup
          className={cn(
            "origin-(--transform-origin) overflow-hidden rounded-xl border border-border bg-raised shadow-overlay",
            "transition-[opacity,transform] duration-200 ease-hairline",
            "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[ending-style]:duration-[160ms] data-[ending-style]:ease-exit",
            className
          )}
        >
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
