"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { Button, buttonVariants } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

type IconButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "size"
> &
  VariantProps<typeof buttonVariants> & {
    "aria-label": string
    size?: "icon-sm" | "icon" | "icon-lg"
    children: React.ReactNode
  }

function IconButton({
  className,
  size = "icon",
  variant = "outline",
  children,
  ...props
}: IconButtonProps) {
  return (
    <Button
      data-slot="icon-button"
      variant={variant}
      size={size}
      className={cn(className)}
      {...props}
    >
      {children}
    </Button>
  )
}

export { IconButton }
