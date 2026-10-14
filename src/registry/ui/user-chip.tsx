"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

/** A pill with an avatar and a name, optionally removable, for assignee pickers and share lists. */
type UserChipProps = {
  name?: string
  /** Avatar image; initials are used when absent. */
  src?: string
  /** Shows a remove button when provided. */
  onRemove?: () => void
  className?: string
}

/** "Maya Chen" → "MC"; single words keep their first two letters. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : name.slice(0, 2)).toUpperCase()
}

function UserChip({ name = "Maya Chen", src, onRemove, className }: UserChipProps) {
  return (
    <span
      data-slot="user-chip"
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border border-border bg-sunken pl-0.5 pr-2 text-xs font-medium text-fg",
        className
      )}
    >
      <Avatar className="size-5">
        {src ? <AvatarImage src={src} alt="" /> : null}
        <AvatarFallback className="text-[9px]">{initials(name)}</AvatarFallback>
      </Avatar>
      {name}
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${name}`}
          className="rounded-full text-fg-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
          onClick={onRemove}
        >
          <XIcon className="size-3" />
        </button>
      ) : null}
    </span>
  )
}
export { UserChip }
export type { UserChipProps }
