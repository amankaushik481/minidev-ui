"use client"
import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { cn } from "@/lib/utils"

/**
 * A right-click (or long-press) menu for any surface, built on Base UI: opens at the pointer, arrow keys move, Enter runs, Escape closes.
 *
 * Wrap a row, card or canvas item and pass `items`; each runs its `onSelect` and closes the menu. Mark irreversible actions `destructive`.
 * Always offer the same actions somewhere visible (a DropdownMenu or row actions) since right-click is hidden from many users.
 * For a menu opened by a button use DropdownMenu.
 *
 * @example
 * <ContextMenu items={[{ id: "rename", label: "Rename", shortcut: "F2" }, { id: "delete", label: "Delete", destructive: true, onSelect: remove }]}>
 *   <FileRow name="Q3-report.pdf" />
 * </ContextMenu>
 */
type ContextMenuProps = {
  /** The surface that opens the menu on right-click or long-press. */
  children: React.ReactNode
  /** Menu entries in order. `id` must be unique. */
  items: ContextMenuItem[]
  /** Classes for the wrapping trigger element. */
  className?: string
}

type ContextMenuItem = {
  id: string
  label: string
  /** Renders the item in the danger colour. */
  destructive?: boolean
  disabled?: boolean
  /** Shortcut hint shown at the item's end. Display only. */
  shortcut?: string
  /** Leading icon, sized to 16px. */
  icon?: React.ReactNode
  /** Runs when the item is chosen; the menu then closes. */
  onSelect?: () => void
}

function ContextMenu({ children, items, className }: ContextMenuProps) {
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger data-slot="context-menu" className={cn("relative", className)}>
        {children}
      </ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Positioner className="isolate z-50 outline-none">
          <ContextMenuPrimitive.Popup
            data-slot="context-menu-content"
            className={cn(
              "max-h-(--available-height) w-max min-w-44 origin-(--transform-origin) overflow-y-auto rounded-xl border border-border bg-raised p-1 text-fg shadow-overlay outline-none",
              "duration-200 data-closed:duration-[160ms]",
              "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
            )}
          >
            {items.map((item) => (
              <ContextMenuPrimitive.Item
                key={item.id}
                disabled={item.disabled}
                onClick={item.onSelect}
                data-variant={item.destructive ? "destructive" : "default"}
                className={cn(
                  "relative flex w-full cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-[0.8125rem] outline-none select-none",
                  "transition-[background-color,color] duration-[70ms]",
                  "data-highlighted:bg-sunken data-disabled:pointer-events-none data-disabled:opacity-50",
                  "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                  item.destructive && "text-danger data-highlighted:bg-danger/10"
                )}
              >
                {item.icon ? <span aria-hidden className="flex">{item.icon}</span> : null}
                <span className="flex-1 truncate">{item.label}</span>
                {item.shortcut ? <span className="ml-4 font-mono text-2xs text-fg-subtle">{item.shortcut}</span> : null}
              </ContextMenuPrimitive.Item>
            ))}
          </ContextMenuPrimitive.Popup>
        </ContextMenuPrimitive.Positioner>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  )
}
export { ContextMenu }
export type { ContextMenuProps, ContextMenuItem }
