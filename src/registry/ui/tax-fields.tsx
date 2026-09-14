"use client"
import { Input } from "@/registry/ui/input"
import { cn } from "@/lib/utils"

function TaxFields({ className }: { className?: string }) {
  return (
    <div data-slot="tax-fields" className={cn("grid gap-3 sm:grid-cols-2", className)}>
      <label className="block text-sm text-fg">Country
        <Input className="mt-1.5" defaultValue="United States" aria-label="Country" />
      </label>
      <label className="block text-sm text-fg">Tax ID
        <Input className="mt-1.5 font-mono" placeholder="VAT / EIN" aria-label="Tax ID" />
      </label>
    </div>
  )
}
export { TaxFields }
