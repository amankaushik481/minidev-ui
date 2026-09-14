"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

function UserChip({
  name,
  src,
  onRemove,
  className,
}: {
  name: string
  src?: string
  onRemove?: () => void
  className?: string
}) {
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
        <AvatarFallback className="text-[9px]">{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      {name}
      {onRemove ? (
        <button type="button" aria-label={`Remove ${name}`} className="text-fg-muted hover:text-fg" onClick={onRemove}>
          <XIcon className="size-3" />
        </button>
      ) : null}
    </span>
  )
}
export { UserChip }
