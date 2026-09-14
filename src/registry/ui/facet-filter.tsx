"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"

type Facet = { value: string; label: string; count?: number }

function FacetFilter({
  title,
  options,
  value = [],
  onChange,
  className,
}: {
  title: string
  options: Facet[]
  value?: string[]
  onChange?: (value: string[]) => void
  className?: string
}) {
  const toggle = (v: string) => {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v]
    onChange?.(next)
  }
  return (
    <div data-slot="facet-filter" className={cn("space-y-2", className)}>
      <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{title}</p>
      <ul className="space-y-1.5">
        {options.map((o) => {
          const id = `facet-${title}-${o.value}`
          return (
            <li key={o.value} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={value.includes(o.value)}
                onCheckedChange={() => toggle(o.value)}
              />
              <Label htmlFor={id} className="flex flex-1 cursor-pointer justify-between font-normal">
                <span>{o.label}</span>
                {o.count != null ? <span className="text-fg-muted tabular-nums">{o.count}</span> : null}
              </Label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export { FacetFilter }
