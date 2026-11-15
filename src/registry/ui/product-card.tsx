"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { AspectRatio } from "@/registry/ui/aspect-ratio"

/**
 * ProductCard — a square product image, title, price and an optional Add to cart button.
 *
 * Use it in shop grids and recommendation rails. `price` and `badge` are display
 * strings, so format money before passing it in. The button only renders with
 * `onAdd`, and it is described by the title so it reads "Add to cart, Linen tote".
 * Pair it with WishlistButton for saving. For a pricing tier use PlanCard; for a
 * generic content tile use Card.
 *
 * @example
 * <ProductCard title="Linen tote" price="$48" image="/tote.jpg" imageAlt="Natural linen tote bag" badge="New" onAdd={() => addToCart("tote")} />
 */
function ProductCard({
  title,
  price,
  image,
  imageAlt = "",
  badge,
  onAdd,
  addLabel = "Add to cart",
  className,
}: {
  /** Product name, rendered as an h3. */
  title: string
  /** Display price, already formatted, e.g. "$48" or "€42,00". */
  price: string
  /** Image URL, shown square and cropped to cover. */
  image?: string
  /** Alt text for the image. Empty by default because the title sits right under it. */
  imageAlt?: string
  /** Short corner tag such as "New" or "-20%". */
  badge?: string
  /** Shows the add button when set. */
  onAdd?: () => void
  /** Text of the add button. */
  addLabel?: string
  className?: string
}) {
  const titleId = React.useId()
  return (
    <div data-slot="product-card" className={cn("w-full max-w-64 overflow-hidden rounded-xl border border-border bg-surface shadow-raised", className)}>
      <AspectRatio ratio={1} className="bg-sunken">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={imageAlt} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
        ) : null}
        {badge ? (
          <span className="absolute top-2 left-2 rounded-md border border-border bg-raised px-1.5 py-0.5 text-[11px] font-medium text-fg">
            {badge}
          </span>
        ) : null}
      </AspectRatio>
      <div className="space-y-3 p-4">
        <div>
          <h3 id={titleId} className="text-sm font-medium text-fg">{title}</h3>
          <p className="mt-1 text-sm tabular-nums text-fg-muted">{price}</p>
        </div>
        {onAdd ? (
          <Button type="button" variant="outline" size="sm" className="w-full" aria-describedby={titleId} onClick={onAdd}>
            {addLabel}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
export { ProductCard }
