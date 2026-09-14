"use client"
import * as React from "react"
import { ProductCard } from "@/registry/ui/product-card"
import { CartLineItem } from "@/registry/ui/cart-line-item"
import { OrderSummary } from "@/registry/ui/order-summary"
import { WishlistButton } from "@/registry/ui/wishlist-button"
import { CreditBalance } from "@/registry/ui/credit-balance"
import { QuotaBar } from "@/registry/ui/quota-bar"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  const [qty, setQty] = React.useState(1)
  const [wish, setWish] = React.useState(false)
  return (
    <GalleryPage title="Commerce">
      <GallerySection title="Product">
        <div className="max-w-xs"><ProductCard title="Studio plan" price="$49/mo" badge="Popular" onAdd={() => {}} /></div>
        <WishlistButton active={wish} onToggle={() => setWish((w) => !w)} />
      </GallerySection>
      <GallerySection title="Cart / order">
        <div className="w-full max-w-md">
          <CartLineItem title="Studio seat" price="$49.00" quantity={qty} onQuantityChange={setQty} onRemove={() => {}} />
          <OrderSummary lines={[{ label: "Subtotal", value: "$49.00" }, { label: "Tax", value: "$3.92" }]} total="$52.92" />
        </div>
      </GallerySection>
      <GallerySection title="Credits / quota">
        <CreditBalance balance="1,240" />
        <div className="w-64"><QuotaBar label="API calls" used={7200} max={10000} /></div>
      </GallerySection>
    </GalleryPage>
  )
}
