"use client"
import * as React from "react"
import { CountrySelect, countries } from "@/registry/ui/country-select"
import { FormField } from "@/registry/ui/form-field"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function BillingCountry() {
  const [country, setCountry] = React.useState("GB")
  return (
    <div className="flex w-64 flex-col gap-3">
      <FormField id="billing-country" label="Billing country" description="Used for VAT on Lumen invoices.">
        <CountrySelect id="billing-country" value={country} onValueChange={setCountry} priority={["US", "GB", "CA", "DE"]} />
      </FormField>
      <p className="text-xs text-fg-muted">
        Stored as <code className="font-mono text-fg">{country}</code>
      </p>
    </div>
  )
}

const LOCALES = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "ja", label: "日本語" },
]

function LocalisedNames() {
  const [locale, setLocale] = React.useState("de")
  return (
    <div className="flex w-64 flex-col gap-3">
      <SegmentedControl aria-label="Language" size="sm" options={LOCALES} value={locale} onChange={setLocale} />
      <CountrySelect aria-label="Country" locale={locale} defaultValue="CH" />
      <p className="text-xs text-fg-muted">
        The first five names in this locale: {countries(locale).slice(0, 5).map((c) => c.name).join(", ")}
      </p>
    </div>
  )
}

function ShippingForm() {
  const [sent, setSent] = React.useState<string | null>(null)
  return (
    <form
      className="flex w-64 flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(String(new FormData(e.currentTarget).get("ship_to")))
      }}
    >
      <FormField id="ship-to" label="Ship to" required>
        <CountrySelect id="ship-to" name="ship_to" required exclude={["AQ", "BV", "HM"]} showFlag={false} />
      </FormField>
      <Button type="submit" size="sm" className="self-start">Continue</Button>
      {sent ? <p className="text-xs text-fg-muted">FormData ship_to = <code className="font-mono text-fg">{sent}</code></p> : null}
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Billing country with suggestions",
    description: "priority pins the countries most customers pick in a Suggested group; the value is the ISO code.",
    code: `function BillingCountry() {
  const [country, setCountry] = React.useState("GB")
  return (
    <div className="flex w-64 flex-col gap-3">
      <FormField id="billing-country" label="Billing country" description="Used for VAT on Lumen invoices.">
        <CountrySelect id="billing-country" value={country} onValueChange={setCountry} priority={["US", "GB", "CA", "DE"]} />
      </FormField>
      <p className="text-xs text-fg-muted">
        Stored as <code className="font-mono text-fg">{country}</code>
      </p>
    </div>
  )
}`,
    node: <BillingCountry />,
  },
  {
    title: "Names in the user's language",
    description: "locale renames and re-sorts every country through Intl.DisplayNames. Search still matches the English name and the code.",
    code: `function LocalisedNames() {
  const [locale, setLocale] = React.useState("de")
  return (
    <div className="flex w-64 flex-col gap-3">
      <SegmentedControl
        aria-label="Language"
        size="sm"
        options={[{ value: "en", label: "English" }, { value: "de", label: "Deutsch" }, { value: "ja", label: "日本語" }]}
        value={locale}
        onChange={setLocale}
      />
      <CountrySelect aria-label="Country" locale={locale} defaultValue="CH" />
      <p className="text-xs text-fg-muted">
        The first five names in this locale: {countries(locale).slice(0, 5).map((c) => c.name).join(", ")}
      </p>
    </div>
  )
}`,
    node: <LocalisedNames />,
  },
  {
    title: "In a plain form",
    description: "name submits the code with the form; exclude drops places you cannot ship to, and showFlag={false} hides the flags.",
    code: `<form
  onSubmit={(e) => {
    e.preventDefault()
    console.log(new FormData(e.currentTarget).get("ship_to")) // "FR"
  }}
>
  <FormField id="ship-to" label="Ship to" required>
    <CountrySelect id="ship-to" name="ship_to" required exclude={["AQ", "BV", "HM"]} showFlag={false} />
  </FormField>
  <Button type="submit" size="sm">Continue</Button>
</form>`,
    node: <ShippingForm />,
  },
]
