"use client"
import * as React from "react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuGroup } from "@/registry/ui/dropdown-menu"
import { buttonVariants } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

type Column = { id: string; label: string }

/** A "Columns" button that opens a checklist of table columns to show or hide; uncontrolled unless `visible` is passed. */
type ColumnVisibilityMenuProps = {
  columns?: Column[]
  /** Controlled list of visible column ids. Leave undefined for an uncontrolled menu. */
  visible?: string[]
  /** Initial visible ids for the uncontrolled menu. Defaults to every column. */
  defaultVisible?: string[]
  onChange?: (ids: string[]) => void
}

const SAMPLE_COLUMNS: Column[] = [
  { id: "invoice", label: "Invoice" },
  { id: "customer", label: "Customer" },
  { id: "amount", label: "Amount" },
  { id: "status", label: "Status" },
  { id: "due", label: "Due date" },
  { id: "owner", label: "Owner" },
]

function ColumnVisibilityMenu({ columns = SAMPLE_COLUMNS, visible, defaultVisible, onChange }: ColumnVisibilityMenuProps) {
  const [inner, setInner] = React.useState<string[]>(() => defaultVisible ?? columns.map((c) => c.id))
  const shown = visible ?? inner
  const update = (ids: string[]) => {
    if (visible === undefined) setInner(ids)
    onChange?.(ids)
  }
  return (
    <div data-slot="column-visibility-menu">
      <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Columns</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          {columns.map((c) => {
            const on = shown.includes(c.id)
            return (
              <DropdownMenuCheckboxItem key={c.id} checked={on} onCheckedChange={(v) => update(v ? [...shown, c.id] : shown.filter((x) => x !== c.id))}>
                {c.label}
              </DropdownMenuCheckboxItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
export { ColumnVisibilityMenu }
export type { ColumnVisibilityMenuProps, Column as ColumnVisibilityColumn }
