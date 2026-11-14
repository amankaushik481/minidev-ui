"use client"
import * as React from "react"
import { HeartIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * A heart toggle button for saving a product to a wishlist; the heart fills when active.
 *
 * It is a toggle (`aria-pressed`) with a fixed label, so screen readers hear "Save to wishlist, pressed". Works controlled (`active` + `onToggle`) or uncontrolled (`defaultActive`). Use `Toggle` for generic toolbar toggles.
 *
 * @example
 * <WishlistButton active={saved} onToggle={setSaved} label="Save Aurora desk lamp" />
 */
type WishlistButtonProps = {
  /** Controlled state. Pair with `onToggle`. */
  active?: boolean
  /** Initial state for the uncontrolled button. */
  defaultActive?: boolean
  /** Called with the next state when pressed. */
  onToggle?: (active: boolean) => void
  /** Accessible name. Keep it the same in both states; `aria-pressed` conveys the state. */
  label?: string
  className?: string
}

function WishlistButton({ active: activeProp, defaultActive = false, onToggle, label = "Save to wishlist", className }: WishlistButtonProps) {
  const [internal, setInternal] = React.useState(defaultActive)
  const active = activeProp ?? internal
  return (
    <IconButton
      type="button"
      variant="outline"
      size="icon"
      data-slot="wishlist-button"
      data-state={active ? "on" : "off"}
      aria-pressed={active}
      aria-label={label}
      className={className}
      onClick={() => {
        if (activeProp === undefined) setInternal(!active)
        onToggle?.(!active)
      }}
    >
      <HeartIcon aria-hidden className={cn("transition-colors duration-[70ms]", active && "fill-danger text-danger")} />
    </IconButton>
  )
}
export { WishlistButton }
export type { WishlistButtonProps }
