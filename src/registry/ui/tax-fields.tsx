"use client"
import { Input } from "@/registry/ui/input"
import { cn } from "@/lib/utils"

/**
 * Country and tax ID fields side by side, for checkout and billing-details forms.
 *
 * Use it in checkout and billing settings when invoices need the buyer's country and VAT, GST or EIN number. The inputs are
 * uncontrolled and named `country` and `taxId` (after `namePrefix`), so they submit with a plain `<form>` or a Server Action.
 * Country is free text with autofill; swap in `Select` for a fixed list. Pair it with `BillingAddress` for the postal address.
 *
 * @example
 * <form action={saveBilling}><TaxFields defaultCountry="Germany" /></form>
 */
type TaxFieldsProps = {
  /** Initial country. */
  defaultCountry?: string
  /** Initial VAT, GST or EIN number. */
  defaultTaxId?: string
  /** Prefix for the field names: `${namePrefix}country` and `${namePrefix}taxId`. */
  namePrefix?: string
  className?: string
}

function TaxFields({ defaultCountry = "United States", defaultTaxId, namePrefix = "", className }: TaxFieldsProps) {
  return (
    <div data-slot="tax-fields" className={cn("grid gap-3 sm:grid-cols-2", className)}>
      <label className="block text-sm font-medium text-fg">
        Country
        <Input className="mt-1.5" name={`${namePrefix}country`} autoComplete="country-name" defaultValue={defaultCountry} />
      </label>
      <label className="block text-sm font-medium text-fg">
        Tax ID
        <Input className="mt-1.5 font-mono" name={`${namePrefix}taxId`} placeholder="VAT / EIN" spellCheck={false} defaultValue={defaultTaxId} />
      </label>
    </div>
  )
}
export { TaxFields }
export type { TaxFieldsProps }
