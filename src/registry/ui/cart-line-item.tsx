"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { QuantityStepper } from "@/registry/ui/quantity-stepper"
import { IconButton } from "@/registry/ui/icon-button"

function CartLineItem({
  title,
  price,
  quantity,
  onQuantityChange,
  onRemove,
  className,
}: {
  title: string
  price: string
  quantity: number
  onQuantityChange?: (n: number) => void
  onRemove?: () => void
  className?: string
}) {
  return (
    <div data-slot="cart-line-item" className={cn("flex items-center gap-3 border-b border-border py-3", className)}>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{title}</p>
        <p className="text-xs tabular-nums text-fg-muted">{price}</p>
      </div>
      <QuantityStepper value={quantity} onChange={(n) => onQuantityChange?.(n)} />
      {onRemove ? (
        <IconButton type="button" variant="ghost" size="icon-sm" aria-label={`Remove ${title}`} onClick={onRemove}>
          <XIcon />
        </IconButton>
      ) : null}
    </div>
  )
}
export { CartLineItem }
