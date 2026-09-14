"use client"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
function AddCardForm({ className, onSubmit }: { className?: string; onSubmit?: () => void }) {
  return (
    <form
      data-slot="add-card-form"
      className={cn("space-y-3", className)}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
    >
      <FormField id="card-number" label="Card number">
        <Input id="card-number" inputMode="numeric" placeholder="4242 4242 4242 4242" autoComplete="cc-number" />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField id="card-exp" label="Expiry">
          <Input id="card-exp" placeholder="MM/YY" autoComplete="cc-exp" />
        </FormField>
        <FormField id="card-cvc" label="CVC">
          <Input id="card-cvc" placeholder="123" autoComplete="cc-csc" />
        </FormField>
      </div>
      <Button type="submit" className="w-full">
        Save card
      </Button>
    </form>
  )
}
export { AddCardForm }
