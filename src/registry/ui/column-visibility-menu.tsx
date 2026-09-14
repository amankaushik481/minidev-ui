"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuGroup } from "@/registry/ui/dropdown-menu"
import { buttonVariants } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
function ColumnVisibilityMenu({ columns, visible, onChange }: { columns: { id: string; label: string }[]; visible: string[]; onChange: (ids: string[]) => void }) {
  return (
    <div data-slot="column-visibility-menu">
      <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Columns</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          {columns.map((c) => {
            const on = visible.includes(c.id)
            return (
              <DropdownMenuCheckboxItem key={c.id} checked={on} onCheckedChange={(v) => onChange(v ? [...visible, c.id] : visible.filter((x) => x !== c.id))}>
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
