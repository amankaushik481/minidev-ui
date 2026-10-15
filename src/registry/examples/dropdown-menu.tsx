"use client"
import * as React from "react"
import { ArrowUpDownIcon, ChevronDownIcon, CopyIcon, DownloadIcon, EllipsisIcon, FolderOpenIcon, PencilIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import type { Example } from "./types"

function ColumnsDemo() {
  const [columns, setColumns] = React.useState({ customer: true, status: true, issued: false, amount: true })
  const toggle = (key: keyof typeof columns) => (checked: boolean) => setColumns((c) => ({ ...c, [key]: checked }))
  const count = Object.values(columns).filter(Boolean).length
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Columns ({count}) <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Show columns</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={columns.customer} onCheckedChange={toggle("customer")}>Customer</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={columns.status} onCheckedChange={toggle("status")}>Status</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={columns.issued} onCheckedChange={toggle("issued")}>Issued</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={columns.amount} onCheckedChange={toggle("amount")}>Amount</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SortDemo() {
  const labels: Record<string, string> = { newest: "Newest first", oldest: "Oldest first", amount: "Highest amount" }
  const [sort, setSort] = React.useState("newest")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <ArrowUpDownIcon /> {labels[sort]}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-44">
        <DropdownMenuRadioGroup value={sort} onValueChange={(v) => setSort(String(v))}>
          <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amount">Highest amount</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const examples: Example[] = [
  {
    title: "Row actions",
    description: "An icon trigger inside a row, items with icons and shortcuts, a submenu for moving, and a destructive item last.",
    code: `<div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2 shadow-raised">
  <div className="min-w-0">
    <p className="truncate text-sm font-medium text-fg">INV-2041 · Northwind Labs</p>
    <p className="truncate text-xs text-fg-muted">$12,400.00 · due Oct 24</p>
  </div>
  <DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Actions for INV-2041" />}>
      <EllipsisIcon />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="min-w-48">
      <DropdownMenuItem>
        <PencilIcon /> Edit
        <DropdownMenuShortcut>E</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <CopyIcon /> Duplicate
        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <DownloadIcon /> Download PDF
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <FolderOpenIcon /> Move to
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Q3 invoices</DropdownMenuItem>
          <DropdownMenuItem>Q4 invoices</DropdownMenuItem>
          <DropdownMenuItem>Archive</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">
        <Trash2Icon /> Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>`,
    node: (
      <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2 shadow-raised">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-fg">INV-2041 · Northwind Labs</p>
          <p className="truncate text-xs text-fg-muted">$12,400.00 · due Oct 24</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Actions for INV-2041" />}>
            <EllipsisIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-48">
            <DropdownMenuItem>
              <PencilIcon /> Edit
              <DropdownMenuShortcut>E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon /> Duplicate
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DownloadIcon /> Download PDF
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <FolderOpenIcon /> Move to
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Q3 invoices</DropdownMenuItem>
                <DropdownMenuItem>Q4 invoices</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2Icon /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
  {
    title: "Checkbox items",
    description: "Checkbox items stay open on click, so a column picker can toggle several at once from one controlled object.",
    code: `function ColumnsDemo() {
  const [columns, setColumns] = React.useState({ customer: true, status: true, issued: false, amount: true })
  const toggle = (key: keyof typeof columns) => (checked: boolean) => setColumns((c) => ({ ...c, [key]: checked }))
  const count = Object.values(columns).filter(Boolean).length
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Columns ({count}) <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Show columns</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={columns.customer} onCheckedChange={toggle("customer")}>Customer</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={columns.status} onCheckedChange={toggle("status")}>Status</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={columns.issued} onCheckedChange={toggle("issued")}>Issued</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={columns.amount} onCheckedChange={toggle("amount")}>Amount</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    node: <ColumnsDemo />,
  },
  {
    title: "Radio items",
    description: "A radio group holds one value; reflect it in the trigger label so the current choice is visible when the menu is closed.",
    code: `function SortDemo() {
  const labels: Record<string, string> = { newest: "Newest first", oldest: "Oldest first", amount: "Highest amount" }
  const [sort, setSort] = React.useState("newest")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <ArrowUpDownIcon /> {labels[sort]}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-44">
        <DropdownMenuRadioGroup value={sort} onValueChange={(v) => setSort(String(v))}>
          <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amount">Highest amount</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    node: <SortDemo />,
  },
]
