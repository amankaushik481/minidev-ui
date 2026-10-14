"use client"
import * as React from "react"
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

/** OrgSwitcher — a popover list of organizations with the current one checked and its plan beside it. */

type Org = { id: string; name: string; plan?: string }

// Organizations Maya Chen belongs to in Lumen.
const SAMPLE_ORGS: Org[] = [
  { id: "northwind", name: "Northwind", plan: "Business" },
  { id: "halcyon", name: "Halcyon Studio", plan: "Pro" },
  { id: "maya", name: "Maya Chen", plan: "Free" },
]

type OrgSwitcherProps = {
  orgs?: Org[]
  /** Controlled organization id. Omit it and the switcher keeps its own selection. */
  value?: string
  onChange?: (id: string) => void
  className?: string
}

function OrgSwitcher({
  orgs = SAMPLE_ORGS,
  value,
  onChange,
  className,
}: OrgSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<string | undefined>(undefined)
  const selectedId = value ?? internal
  const current = orgs.find((o) => o.id === selectedId) ?? orgs[0]
  return (
    <div data-slot="org-switcher">
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label="Switch organization"
        className={cn(
          "inline-flex h-9 w-56 items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-fg outline-none",
          "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent",
          className
        )}
      >
        <span className="truncate">{current?.name ?? "Select org"}</span>
        <ChevronsUpDownIcon className="size-4 text-fg-muted" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-1">
        {orgs.map((o) => (
          <button
            key={o.id}
            type="button"
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm hover:bg-sunken"
            onClick={() => {
              if (value === undefined) setInternal(o.id)
              onChange?.(o.id)
              setOpen(false)
            }}
          >
            <CheckIcon className={cn("size-4", o.id === current?.id ? "opacity-100 text-accent" : "opacity-0")} />
            <span className="min-w-0 flex-1 truncate">{o.name}</span>
            {o.plan ? <span className="text-[11px] text-fg-muted">{o.plan}</span> : null}
          </button>
        ))}
      </PopoverContent>
    </Popover>
    </div>
  )
}
export { OrgSwitcher }
export type { OrgSwitcherProps, Org }
