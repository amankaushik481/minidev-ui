"use client"
import * as React from "react"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { Menu } from "@base-ui/react/menu"
import { cn } from "@/lib/utils"

function Menubar({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive>) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn(
        "flex h-10 items-center gap-1 rounded-xl border border-border bg-surface p-1 shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof Menu.Root>) {
  return <Menu.Root {...props} />
}

function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof Menu.Trigger>) {
  return (
    <Menu.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "inline-flex h-8 items-center rounded-lg px-2.5 text-sm text-fg outline-none",
        "hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent data-[popup-open]:bg-sunken",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({ className, ...props }: React.ComponentProps<typeof Menu.Popup>) {
  return (
    <Menu.Portal>
      <Menu.Positioner sideOffset={6} className="z-50">
        <Menu.Popup
          data-slot="menubar-content"
          className={cn(
            "min-w-40 rounded-xl border border-border bg-raised p-1 text-sm text-fg shadow-[0_8px_24px_oklch(0.35_0.02_250/0.10)] outline-none",
            className
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function MenubarItem({ className, ...props }: React.ComponentProps<typeof Menu.Item>) {
  return (
    <Menu.Item
      data-slot="menubar-item"
      className={cn(
        "flex cursor-default items-center rounded-lg px-2.5 py-1.5 outline-none",
        "data-[highlighted]:bg-sunken",
        className
      )}
      {...props}
    />
  )
}

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem }
