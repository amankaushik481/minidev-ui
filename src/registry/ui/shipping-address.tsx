"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { FormField } from "@/registry/ui/form-field"

function ShippingAddress({ className }: { className?: string }) {
  return (
    <div data-slot="shipping-address" className={cn("space-y-3", className)}>
      <FormField label="Full name"><Input aria-label="Full name" autoComplete="name" /></FormField>
      <FormField label="Address"><Input aria-label="Address" autoComplete="street-address" /></FormField>
      <div className="grid gap-3 sm:grid-cols-2">
        <FormField label="City"><Input aria-label="City" autoComplete="address-level2" /></FormField>
        <FormField label="Postal code"><Input aria-label="Postal code" autoComplete="postal-code" /></FormField>
      </div>
    </div>
  )
}
export { ShippingAddress }
