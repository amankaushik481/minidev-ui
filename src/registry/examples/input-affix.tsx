"use client"
import * as React from "react"
import { GlobeIcon, SearchIcon } from "lucide-react"
import { InputAffix } from "@/registry/ui/input-affix"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Workspace address",
    description: "Text affixes sit outside the input's name, so say the suffix in aria-label.",
    code: `<InputAffix
  leading={<GlobeIcon aria-hidden />}
  trailing=".lumen.app"
  defaultValue="northwind"
  aria-label="Workspace address, ends in .lumen.app"
  containerClassName="max-w-xs"
/>`,
    node: (
      <InputAffix
        leading={<GlobeIcon aria-hidden />}
        trailing=".lumen.app"
        defaultValue="northwind"
        aria-label="Workspace address, ends in .lumen.app"
        containerClassName="max-w-xs"
      />
    ),
  },
  {
    title: "Units and percentages",
    description: "A short unit after the value keeps the number alone in the field.",
    code: `<div className="flex flex-wrap gap-3">
  <InputAffix trailing="%" inputMode="decimal" defaultValue="12.5" aria-label="Discount in percent" containerClassName="w-32" />
  <InputAffix trailing="kg" inputMode="decimal" defaultValue="2.4" aria-label="Parcel weight in kilograms" containerClassName="w-32" />
  <InputAffix leading="$" inputMode="decimal" defaultValue="480" aria-label="Budget in US dollars" containerClassName="w-32" />
</div>`,
    node: (
      <div className="flex flex-wrap gap-3">
        <InputAffix trailing="%" inputMode="decimal" defaultValue="12.5" aria-label="Discount in percent" containerClassName="w-32" />
        <InputAffix trailing="kg" inputMode="decimal" defaultValue="2.4" aria-label="Parcel weight in kilograms" containerClassName="w-32" />
        <InputAffix leading="$" inputMode="decimal" defaultValue="480" aria-label="Budget in US dollars" containerClassName="w-32" />
      </div>
    ),
  },
  {
    title: "Small search field",
    description: "size sets the box height; className still reaches the inner input.",
    code: `<InputAffix size="sm" leading={<SearchIcon aria-hidden />} placeholder="Filter customers" aria-label="Filter customers" containerClassName="max-w-xs" />`,
    node: <InputAffix size="sm" leading={<SearchIcon aria-hidden />} placeholder="Filter customers" aria-label="Filter customers" containerClassName="max-w-xs" />,
  },
]
