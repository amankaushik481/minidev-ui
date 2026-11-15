"use client"
import * as React from "react"
import { ProductCard } from "@/registry/ui/product-card"
import type { Example } from "./types"

const PRODUCTS = [
  { id: "lamp", title: "Aurora desk lamp", price: "$89", badge: "New" },
  { id: "tote", title: "Linen tote, natural", price: "$48" },
  { id: "mat", title: "Felt desk mat", price: "$27", badge: "-20%" },
]

function ShopGrid() {
  const [cart, setCart] = React.useState<string[]>([])
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} title={p.title} price={p.price} badge={p.badge} onAdd={() => setCart((c) => [...c, p.id])} />
        ))}
      </div>
      <p role="status" className="text-xs text-fg-muted">{cart.length} in cart</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Shop grid",
    description: "onAdd shows the button; it is described by the title, so it reads as \"Add to cart, Aurora desk lamp\".",
    code: `const PRODUCTS = [
  { id: "lamp", title: "Aurora desk lamp", price: "$89", badge: "New" },
  { id: "tote", title: "Linen tote, natural", price: "$48" },
  { id: "mat", title: "Felt desk mat", price: "$27", badge: "-20%" },
]

function ShopGrid() {
  const [cart, setCart] = React.useState<string[]>([])
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} title={p.title} price={p.price} badge={p.badge} onAdd={() => setCart((c) => [...c, p.id])} />
        ))}
      </div>
      <p role="status" className="text-xs text-fg-muted">{cart.length} in cart</p>
    </div>
  )
}`,
    node: <ShopGrid />,
  },
  {
    title: "Display only, sold out",
    description: "Leave out onAdd for a recommendation rail or a sold out item; use addLabel when the action is not a cart.",
    code: `<div className="flex flex-wrap gap-3">
  <ProductCard title="Walnut monitor stand" price="$140" badge="Sold out" className="w-48" />
  <ProductCard title="Cable tray" price="$22" addLabel="Notify me" onAdd={() => console.log("notify")} className="w-48" />
</div>`,
    node: (
      <div className="flex flex-wrap gap-3">
        <ProductCard title="Walnut monitor stand" price="$140" badge="Sold out" className="w-48" />
        <ProductCard title="Cable tray" price="$22" addLabel="Notify me" onAdd={() => console.log("notify")} className="w-48" />
      </div>
    ),
  },
]
