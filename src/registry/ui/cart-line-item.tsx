"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { QuantityStepper } from "@/registry/ui/quantity-stepper"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * One product row in a cart or order summary: title, price, a quantity stepper and remove.
 *
 * Stack rows inside a cart drawer or checkout. Quantity is controlled: pass `quantity` and update
 * it in `onQuantityChange`. The stepper is a group named "Quantity for <title>" so its +/- buttons
 * make sense to screen readers; the remove button only renders with `onRemove`.
 *
 * @example
 * <CartLineItem title="Lumen Pro, annual" price="$480.00" quantity={qty}
 *   onQuantityChange={setQty} onRemove={() => remove(id)} />
 */
type CartLineItemProps = {
  /** Product name. */
  title: string
  /** Pre-formatted price, e.g. "$480.00". */
  price: string
  /** Current quantity (controlled). */
  quantity: number
  /** Called with the new quantity, already clamped to `min`…`max`. */
  onQuantityChange?: (n: number) => void
  /** Lowest quantity the stepper allows. */
  min?: number
  /** Highest quantity the stepper allows. */
  max?: number
  /** Shows a remove button and is called when it is pressed. */
  onRemove?: () => void
  /** Optional thumbnail, e.g. a 40px image. */
  media?: React.ReactNode
  className?: string
}

function CartLineItem({ title, price, quantity, onQuantityChange, min, max, onRemove, media, className }: CartLineItemProps) {
  return (
    <div data-slot="cart-line-item" className={cn("flex items-center gap-3 border-b border-border py-3", className)}>
      {media ? <div className="shrink-0 overflow-hidden rounded-lg">{media}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{title}</p>
        <p className="text-xs tabular-nums text-fg-muted">{price}</p>
      </div>
      <div role="group" aria-label={`Quantity for ${title}`}>
        <QuantityStepper value={quantity} min={min} max={max} onChange={(n) => onQuantityChange?.(n)} />
      </div>
      {onRemove ? (
        <IconButton type="button" variant="ghost" size="icon-sm" aria-label={`Remove ${title}`} onClick={onRemove}>
          <XIcon />
        </IconButton>
      ) : null}
    </div>
  )
}
export { CartLineItem }
export type { CartLineItemProps }
