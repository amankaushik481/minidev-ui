"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * One row of a command list: an optional icon, a label and an optional keyboard shortcut hint.
 *
 * Use to build your own command or action list. For a ready-made searchable palette use CommandPalette (or CommandDialog for a trigger + dialog);
 * for "/" commands in an editor use SlashCommandMenu. `active` marks the keyboard-highlighted row.
 *
 * @example
 * <CommandItem icon={<FilePlusIcon />} shortcut="⌘N" onSelect={createInvoice}>New invoice</CommandItem>
 */
type CommandItemProps = Omit<React.ComponentProps<"button">, "onSelect"> & {
  /** The command label. */
  children: React.ReactNode
  /** Shortcut hint shown at the row's end, e.g. "⌘N". Display only; bind the key yourself. */
  shortcut?: string
  /** Highlighted state, for the row the keyboard is on. */
  active?: boolean
  /** Leading icon, sized to 16px. */
  icon?: React.ReactNode
  /** Runs when the row is clicked or activated with Enter/Space. */
  onSelect?: () => void
}

function CommandItem({ children, shortcut, active, icon, onSelect, onClick, className, ...props }: CommandItemProps) {
  return (
    <button
      type="button"
      data-slot="command-item"
      data-active={active || undefined}
      onClick={(e) => {
        onClick?.(e)
        onSelect?.()
      }}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm text-fg outline-none",
        "transition-[background-color] duration-[70ms]",
        active ? "bg-accent-soft" : "hover:bg-sunken",
        "focus-visible:ring-2 focus-visible:ring-accent",
        "disabled:pointer-events-none disabled:opacity-45",
        className
      )}
      {...props}
    >
      <span className="flex min-w-0 items-center gap-2">
        {icon ? <span aria-hidden className="shrink-0 text-fg-muted [&_svg]:size-4">{icon}</span> : null}
        <span className="truncate">{children}</span>
      </span>
      {shortcut ? <kbd className="shrink-0 font-mono text-2xs text-fg-muted">{shortcut}</kbd> : null}
    </button>
  )
}
export { CommandItem }
export type { CommandItemProps }
