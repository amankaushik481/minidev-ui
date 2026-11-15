"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { DataGrid, type DataGridColumn } from "@/registry/ui/data-grid"
import type { Example } from "./types"

type Product = { sku: string; name: string; category: string; price: number | null; stock: number | null; active: boolean }

const PRODUCTS: Product[] = [
  { sku: "LM-1001", name: "Linen notebook, A5", category: "paper", price: 18, stock: 240, active: true },
  { sku: "LM-1002", name: "Linen notebook, A4", category: "paper", price: 24, stock: 96, active: true },
  { sku: "LM-1010", name: "Brass pen, matte", category: "pens", price: 42, stock: 31, active: true },
  { sku: "LM-1011", name: "Refill pack, black", category: "pens", price: 9.5, stock: 410, active: true },
  { sku: "LM-1020", name: "Desk tray, walnut", category: "desk", price: 65, stock: 0, active: false },
  { sku: "LM-1021", name: "Cable clip set", category: "desk", price: 12, stock: 188, active: true },
  { sku: "LM-1030", name: "Canvas tote", category: "bags", price: 29, stock: 57, active: true },
  { sku: "LM-1031", name: "Laptop sleeve, 14 in", category: "bags", price: 48, stock: 22, active: true },
]

const COLUMNS: DataGridColumn<Product>[] = [
  { key: "sku", header: "SKU", width: 104, readOnly: true },
  { key: "name", header: "Product", width: 200 },
  {
    key: "category",
    header: "Category",
    type: "select",
    width: 128,
    options: [
      { value: "paper", label: "Paper" },
      { value: "pens", label: "Pens" },
      { value: "desk", label: "Desk" },
      { value: "bags", label: "Bags" },
    ],
  },
  { key: "price", header: "Price (USD)", type: "number", width: 112 },
  { key: "stock", header: "Stock", type: "number", width: 96 },
  { key: "active", header: "Active", type: "checkbox", width: 80 },
]

function PriceList() {
  const [rows, setRows] = React.useState(PRODUCTS)
  const edited = rows.filter((r, i) => r !== PRODUCTS[i]).length
  return (
    <div className="flex w-full flex-col gap-3">
      <DataGrid aria-label="Price list" columns={COLUMNS} rows={rows} onRowsChange={setRows} getRowId={(r) => r.sku} className="max-h-80" />
      <div className="flex items-center gap-3 text-sm text-fg-muted">
        <span className="tabular-nums">{edited === 0 ? "No changes" : `${edited} ${edited === 1 ? "row" : "rows"} changed`}</span>
        <Button variant="outline" size="sm" disabled={edited === 0} onClick={() => setRows(PRODUCTS)}>
          Discard
        </Button>
      </div>
    </div>
  )
}

type Line = { item: string; qty: number | null; unit: number | null; total: number | null }
const line = (item: string, qty: number, unit: number): Line => ({ item, qty, unit, total: qty * unit })
const BUDGET = [line("Contractor days", 12, 640), line("Design tool seats", 5, 15), line("User interviews", 8, 75), line("Cloud hosting", 3, 220)]
const BUDGET_COLUMNS: DataGridColumn<Line>[] = [
  { key: "item", header: "Line item", width: 200 },
  { key: "qty", header: "Qty", type: "number", width: 88 },
  { key: "unit", header: "Unit cost", type: "number", width: 112 },
  { key: "total", header: "Total", type: "number", width: 112, readOnly: true },
]
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

function Budget() {
  const [rows, setRows] = React.useState(BUDGET)
  const sum = rows.reduce((t, r) => t + (r.total ?? 0), 0)
  return (
    <div className="flex w-full flex-col gap-3">
      <DataGrid
        aria-label="Q1 budget"
        columns={BUDGET_COLUMNS}
        rows={rows}
        onRowsChange={(next) => setRows(next.map((r) => ({ ...r, total: r.qty != null && r.unit != null ? r.qty * r.unit : null })))}
        rowNumbers={false}
      />
      <p className="text-sm text-fg-muted">
        Q1 total <span className="font-medium text-fg tabular-nums">{usd.format(sum)}</span>
      </p>
    </div>
  )
}

const SAMPLE = "LM-1001\tLinen notebook, A5\t$18.00\nLM-1010\tBrass pen, matte\t$42.00\nLM-1030\tCanvas tote\t$29.00"
type ImportRow = { sku: string; name: string; price: number | null }
const EMPTY: ImportRow[] = Array.from({ length: 6 }, () => ({ sku: "", name: "", price: null }))

function PasteImport() {
  const [rows, setRows] = React.useState(EMPTY)
  const filled = rows.filter((r) => r.sku).length
  return (
    <div className="flex w-full flex-col gap-3">
      <pre className="overflow-x-auto rounded-lg border border-border bg-sunken p-3 font-mono text-xs text-fg-muted">{SAMPLE.replaceAll("\t", "    ")}</pre>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard?.writeText(SAMPLE)}>
          Copy sample rows
        </Button>
        <span className="text-sm text-fg-muted">Then click the first cell and press Cmd+V or Ctrl+V.</span>
      </div>
      <DataGrid
        aria-label="Import products"
        columns={[
          { key: "sku", header: "SKU", width: 112 },
          { key: "name", header: "Product", width: 200 },
          { key: "price", header: "Price", type: "number", width: 112 },
        ]}
        rows={rows}
        onRowsChange={setRows}
      />
      <p className="text-sm text-fg-muted tabular-nums">
        {filled} of {rows.length} rows ready to import
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Price list",
    description: "Text, select, number and checkbox columns, a read-only SKU column and row numbers. Type to edit, Enter to save and move down.",
    code: `const columns: DataGridColumn<Product>[] = [
  { key: "sku", header: "SKU", width: 104, readOnly: true },
  { key: "name", header: "Product", width: 200 },
  { key: "category", header: "Category", type: "select", options: [{ value: "paper", label: "Paper" }, { value: "pens", label: "Pens" }] },
  { key: "price", header: "Price (USD)", type: "number" },
  { key: "stock", header: "Stock", type: "number" },
  { key: "active", header: "Active", type: "checkbox" },
]

function PriceList() {
  const [rows, setRows] = React.useState(products)
  return <DataGrid aria-label="Price list" columns={columns} rows={rows} onRowsChange={setRows} getRowId={(r) => r.sku} className="max-h-80" />
}`,
    node: <PriceList />,
  },
  {
    title: "Budget with a computed column",
    description: "onRowsChange recomputes Total after every edit or paste, and the read-only column skips edits and pastes.",
    code: `function Budget() {
  const [rows, setRows] = React.useState(lines)
  return (
    <DataGrid
      aria-label="Q1 budget"
      columns={[
        { key: "item", header: "Line item", width: 200 },
        { key: "qty", header: "Qty", type: "number" },
        { key: "unit", header: "Unit cost", type: "number" },
        { key: "total", header: "Total", type: "number", readOnly: true },
      ]}
      rows={rows}
      onRowsChange={(next) => setRows(next.map((r) => ({ ...r, total: r.qty != null && r.unit != null ? r.qty * r.unit : null })))}
      rowNumbers={false}
    />
  )
}`,
    node: <Budget />,
  },
  {
    title: "Paste from a spreadsheet",
    description: "Copy rows from Excel or Google Sheets and paste them at the active cell. \"$18.00\" becomes the number 18.",
    code: `const empty = Array.from({ length: 6 }, () => ({ sku: "", name: "", price: null as number | null }))

function PasteImport() {
  const [rows, setRows] = React.useState(empty)
  return (
    <DataGrid
      aria-label="Import products"
      columns={[
        { key: "sku", header: "SKU" },
        { key: "name", header: "Product", width: 200 },
        { key: "price", header: "Price", type: "number" },
      ]}
      rows={rows}
      onRowsChange={setRows}
    />
  )
}`,
    node: <PasteImport />,
  },
]
