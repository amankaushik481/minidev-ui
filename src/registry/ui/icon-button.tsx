"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { Button, buttonVariants } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * IconButton — a square Button that holds only an icon and requires an aria-label.
 *
 * Use it for toolbar and row actions (close, more, delete). When the action
 * needs a visible word, use Button with an icon and text instead; pair an
 * IconButton with a Tooltip when the icon alone is not obvious.
 *
 * @example
 * <IconButton aria-label="Delete invoice" variant="ghost" size="icon-sm"><TrashIcon /></IconButton>
 */
type IconButtonProps = Omit<React.ComponentProps<typeof Button>, "children" | "size">
  & VariantProps<typeof buttonVariants>
  & {
    /** Required: the icon has no text, so this is the button's only name. */
    "aria-label": string
    /** Square size: 28, 32, 36 (default) or 44px. */
    size?: "icon-xs" | "icon-sm" | "icon" | "icon-lg"
    /** The icon, for example a lucide-react icon. Sized to the button automatically. */
    children: React.ReactNode
  }

function IconButton({ className, size = "icon", variant = "outline", children, ...props }: IconButtonProps) {
  return (
    <Button data-slot="icon-button" variant={variant} size={size} className={cn(className)} {...props}>
      {children}
    </Button>
  )
}

export { IconButton }
export type { IconButtonProps }
