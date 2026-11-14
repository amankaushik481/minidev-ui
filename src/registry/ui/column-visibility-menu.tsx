"use client"
import * as React from "react"
import { Columns3Icon } from "lucide-react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuGroup } from "@/registry/ui/dropdown-menu"
import { buttonVariants } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

type Column = { id: string; label: string }

/**
 * A "Columns" button that opens a checklist of table columns to show or hide; uncontrolled unless `visible` is passed.
 *
 * Put it in a TableToolbar above a DataTable, then filter your DataTable `columns` by the visible ids.
 * Ids always come back in column order. For a full saved-view system use SavedViews.
 *
 * @example
 * const [visible, setVisible] = React.useState(columns.map((c) => c.id))
 * <ColumnVisibilityMenu columns={columns.map((c) => ({ id: c.id, label: String(c.header) }))} visible={visible} onChange={setVisible} />
 * <DataTable columns={columns.filter((c) => visible.includes(c.id))} data={rows} />
 */
type ColumnVisibilityMenuProps = {
  /** Every toggleable column, in table order. */
  columns?: Column[]
  /** Controlled list of visible column ids. Leave undefined for an uncontrolled menu. */
  visible?: string[]
  /** Initial visible ids for the uncontrolled menu. Defaults to every column. */
  defaultVisible?: string[]
  /** Called with the visible ids, in column order, after each toggle. */
  onChange?: (ids: string[]) => void
  /** Trigger button text. Defaults to "Columns". */
  label?: string
  /** Classes for the trigger button. */
  className?: string
}

const SAMPLE_COLUMNS: Column[] = [
  { id: "invoice", label: "Invoice" },
  { id: "customer", label: "Customer" },
  { id: "amount", label: "Amount" },
  { id: "status", label: "Status" },
  { id: "due", label: "Due date" },
  { id: "owner", label: "Owner" },
]

function ColumnVisibilityMenu({ columns = SAMPLE_COLUMNS, visible, defaultVisible, onChange, label = "Columns", className }: ColumnVisibilityMenuProps) {
  const [inner, setInner] = React.useState<string[]>(() => defaultVisible ?? columns.map((c) => c.id))
  const shown = visible ?? inner
  const toggle = (id: string, on: boolean) => {
    // Rebuild from `columns` so ids keep table order no matter the click order.
    const ids = columns.map((c) => c.id).filter((c) => (c === id ? on : shown.includes(c)))
    if (visible === undefined) setInner(ids)
    onChange?.(ids)
  }
  return (
    <div data-slot="column-visibility-menu">
      <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), className)}>
        <Columns3Icon aria-hidden />
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          {columns.map((c) => {
            const on = shown.includes(c.id)
            return (
              <DropdownMenuCheckboxItem key={c.id} checked={on} onCheckedChange={(v) => toggle(c.id, v)}>
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
