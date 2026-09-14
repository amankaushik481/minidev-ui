"use client"
import * as React from "react"
import { HeartIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

function WishlistButton({
  active,
  onToggle,
  className,
}: {
  active?: boolean
  onToggle?: () => void
  className?: string
}) {
  return (
    <IconButton
      type="button"
      variant="outline"
      size="icon"
      data-slot="wishlist-button"
      aria-pressed={!!active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(className)}
      onClick={onToggle}
    >
      <HeartIcon className={cn(active && "fill-danger text-danger")} />
    </IconButton>
  )
}
export { WishlistButton }
