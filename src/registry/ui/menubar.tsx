"use client"
import * as React from "react"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { Menu } from "@base-ui/react/menu"
import { cn } from "@/lib/utils"

/**
 * Menubar — a desktop-style row of menus (File, Edit, View) built on Base UI Menubar.
 *
 * Arrow keys move between menus and through items, typing jumps to an item, Escape
 * closes and returns focus to the trigger. Use it for app chrome in editors and
 * dashboards; for a single menu behind a button use DropdownMenu, for site
 * navigation use NavigationMenu.
 *
 * @example
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>File</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarItem onClick={newFile}>New file <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
 *       <MenubarSeparator />
 *       <MenubarItem variant="destructive">Delete</MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 */
function Menubar({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive>) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn(
        "flex h-10 items-center gap-1 rounded-xl border border-border bg-surface p-1 shadow-highlight",
        className
      )}
      {...props}
    />
  )
}

/** One menu in the bar: wraps a MenubarTrigger and its MenubarContent. */
function MenubarMenu({ ...props }: React.ComponentProps<typeof Menu.Root>) {
  return <Menu.Root {...props} />
}

function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof Menu.Trigger>) {
  return (
    <Menu.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "inline-flex h-8 items-center rounded-lg px-2.5 text-sm text-fg outline-none select-none",
        "transition-[background-color] duration-[70ms]",
        "hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent data-[popup-open]:bg-sunken",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof Menu.Popup> & {
  /** Alignment against the trigger. */
  align?: "start" | "center" | "end"
  /** Gap between trigger and menu in px. */
  sideOffset?: number
}) {
  return (
    <Menu.Portal>
      <Menu.Positioner align={align} sideOffset={sideOffset} className="isolate z-50 outline-none">
        <Menu.Popup
          data-slot="menubar-content"
          className={cn(
            "max-h-(--available-height) min-w-44 origin-(--transform-origin) overflow-y-auto rounded-xl border border-border bg-raised p-1 text-sm text-fg shadow-overlay outline-none",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "duration-200 ease-hairline data-closed:duration-[160ms] data-closed:ease-exit",
            className
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function MenubarItem({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof Menu.Item> & {
  /** "destructive" colours the item for delete-style actions. */
  variant?: "default" | "destructive"
}) {
  return (
    <Menu.Item
      data-slot="menubar-item"
      data-variant={variant}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-lg px-2.5 py-1.5 outline-none select-none",
        "transition-[background-color,color] duration-[70ms]",
        "data-[highlighted]:bg-sunken",
        "data-[variant=destructive]:text-danger data-[variant=destructive]:data-[highlighted]:bg-danger/10",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({ className, ...props }: React.ComponentProps<typeof Menu.Separator>) {
  return <Menu.Separator data-slot="menubar-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

/** Right-aligned keyboard hint inside a MenubarItem. Visual only; wire the shortcut yourself. */
function MenubarShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn("ml-auto pl-4 text-xs tracking-[0.01em] text-fg-muted", className)}
      {...props}
    />
  )
}

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut }
