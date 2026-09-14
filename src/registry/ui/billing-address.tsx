"use client"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"
import { cn } from "@/lib/utils"
function BillingAddress({ className }: { className?: string }) {
  return (
    <div data-slot="billing-address" className={cn("space-y-3", className)}>
      <FormField id="addr-line" label="Address">
        <Textarea id="addr-line" placeholder="Street, building" />
      </FormField>
      <div className="grid gap-3 sm:grid-cols-3">
        <FormField id="addr-city" label="City">
          <Input id="addr-city" />
        </FormField>
        <FormField id="addr-state" label="State">
          <Input id="addr-state" />
        </FormField>
        <FormField id="addr-zip" label="Postal">
          <Input id="addr-zip" />
        </FormField>
      </div>
    </div>
  )
}
export { BillingAddress }
