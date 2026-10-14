"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"

/** A titled group of checkbox facets with result counts, for a filter sidebar. */
type Facet = { value: string; label: string; count?: number }

const SAMPLE_OPTIONS: Facet[] = [
  { value: "paid", label: "Paid", count: 128 },
  { value: "open", label: "Open", count: 42 },
  { value: "overdue", label: "Overdue", count: 9 },
  { value: "draft", label: "Draft", count: 14 },
  { value: "void", label: "Void", count: 3 },
]
const SAMPLE_SELECTED = ["open", "overdue"]

type FacetFilterProps = {
  /** Group heading. */
  title?: string
  /** Facets to list. Defaults to invoice statuses with counts. */
  options?: Facet[]
  /** Controlled selection. */
  value?: string[]
  /** Selection when uncontrolled. With the sample options, "Open" and "Overdue" start checked. */
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  className?: string
}

function FacetFilter({
  title = "Status",
  options = SAMPLE_OPTIONS,
  value: valueProp,
  defaultValue,
  onChange,
  className,
}: FacetFilterProps) {
  const [inner, setInner] = React.useState<string[]>(() => defaultValue ?? (options === SAMPLE_OPTIONS ? SAMPLE_SELECTED : []))
  const value = valueProp ?? inner
  const toggle = (v: string) => {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v]
    if (valueProp === undefined) setInner(next)
    onChange?.(next)
  }
  return (
    <div data-slot="facet-filter" className={cn("min-w-48 space-y-2", className)}>
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
export type { FacetFilterProps, Facet }
