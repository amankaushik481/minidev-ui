"use client"
import * as React from "react"
import { CartLineItem } from "@/registry/ui/cart-line-item"
import type { Example } from "./types"

type Line = { id: string; title: string; cents: number; qty: number }

const usd = (cents: number) => (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })

function Cart() {
  const [lines, setLines] = React.useState<Line[]>([
    { id: "lamp", title: "Aurora desk lamp", cents: 8900, qty: 1 },
    { id: "mat", title: "Felt desk mat, charcoal", cents: 3400, qty: 2 },
  ])
  const total = lines.reduce((sum, l) => sum + l.cents * l.qty, 0)
  return (
    <div className="w-full max-w-md">
      {lines.map((l) => (
        <CartLineItem
          key={l.id}
          title={l.title}
          price={usd(l.cents * l.qty)}
          quantity={l.qty}
          max={5}
          onQuantityChange={(qty) => setLines((all) => all.map((x) => (x.id === l.id ? { ...x, qty } : x)))}
          onRemove={() => setLines((all) => all.filter((x) => x.id !== l.id))}
        />
      ))}
      <p className="flex justify-between pt-3 text-sm font-medium text-fg">
        <span>Subtotal</span>
        <span className="tabular-nums">{usd(total)}</span>
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Cart with a live subtotal",
    description: "Quantity is controlled, so the line price and subtotal update in onQuantityChange.",
    code: `type Line = { id: string; title: string; cents: number; qty: number }

const usd = (cents: number) => (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })

function Cart() {
  const [lines, setLines] = React.useState<Line[]>([
    { id: "lamp", title: "Aurora desk lamp", cents: 8900, qty: 1 },
    { id: "mat", title: "Felt desk mat, charcoal", cents: 3400, qty: 2 },
  ])
  const total = lines.reduce((sum, l) => sum + l.cents * l.qty, 0)
  return (
    <div className="w-full max-w-md">
      {lines.map((l) => (
        <CartLineItem
          key={l.id}
          title={l.title}
          price={usd(l.cents * l.qty)}
          quantity={l.qty}
          max={5}
          onQuantityChange={(qty) => setLines((all) => all.map((x) => (x.id === l.id ? { ...x, qty } : x)))}
          onRemove={() => setLines((all) => all.filter((x) => x.id !== l.id))}
        />
      ))}
      <p className="flex justify-between pt-3 text-sm font-medium text-fg">
        <span>Subtotal</span>
        <span className="tabular-nums">{usd(total)}</span>
      </p>
    </div>
  )
}`,
    node: <Cart />,
  },
  {
    title: "With a thumbnail",
    description: "media takes any node; a 40px square keeps rows aligned. Without onRemove there is no remove button.",
    code: `<CartLineItem
  title="Linen tote, natural"
  price="$48.00"
  quantity={1}
  media={<div aria-hidden className="size-10 bg-sunken" />}
  className="w-full max-w-md"
/>`,
    node: (
      <CartLineItem
        title="Linen tote, natural"
        price="$48.00"
        quantity={1}
        media={<div aria-hidden className="size-10 bg-sunken" />}
        className="w-full max-w-md"
      />
    ),
  },
]
