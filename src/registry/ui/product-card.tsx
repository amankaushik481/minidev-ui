"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { AspectRatio } from "@/registry/ui/aspect-ratio"

function ProductCard({
  title,
  price,
  image,
  badge,
  onAdd,
  className,
}: {
  title: string
  price: string
  image?: string
  badge?: string
  onAdd?: () => void
  className?: string
}) {
  return (
    <div data-slot="product-card" className={cn("w-full max-w-64 overflow-hidden rounded-xl border border-border bg-surface shadow-raised", className)}>
      <AspectRatio ratio={1} className="bg-sunken">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
        ) : null}
        {badge ? (
          <span className="absolute top-2 left-2 rounded-md border border-border bg-raised px-1.5 py-0.5 text-[11px] font-medium text-fg">
            {badge}
          </span>
        ) : null}
      </AspectRatio>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-sm font-medium text-fg">{title}</h3>
          <p className="mt-1 text-sm tabular-nums text-fg-muted">{price}</p>
        </div>
        {onAdd ? (
          <Button type="button" variant="outline" size="sm" className="w-full" onClick={onAdd}>
            Add to cart
          </Button>
        ) : null}
      </div>
    </div>
  )
}
export { ProductCard }
