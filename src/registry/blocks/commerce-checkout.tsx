"use client"
import * as React from "react"
import { ShippingAddress } from "@/registry/ui/shipping-address"
import { OrderSummary } from "@/registry/ui/order-summary"
import { CartLineItem } from "@/registry/ui/cart-line-item"
import { Button } from "@/registry/ui/button"
import { PageHeader } from "@/registry/ui/page-header"

function CommerceCheckout() {
  const [qty, setQty] = React.useState(1)
  return (
    <div data-slot="commerce-checkout" className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <PageHeader title="Checkout" description="Shipping and payment" />
        <CartLineItem title="Pro plan seat" price="$24.00" quantity={qty} onQuantityChange={setQty} />
        <ShippingAddress />
      </div>
      <div className="space-y-4">
        <OrderSummary lines={[{ label: "Subtotal", value: "$24.00" }, { label: "Tax", value: "$1.92" }]} total="$25.92" />
        <Button className="w-full">Pay now</Button>
      </div>
    </div>
  )
}
export { CommerceCheckout }
