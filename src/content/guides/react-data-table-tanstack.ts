import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-data-table-tanstack",
  title: "Build a React data table with TanStack Table and Tailwind",
  description:
    "Build a React data table with TanStack Table v8 and Tailwind: sorting, search, filters, pagination, row selection, bulk actions and column visibility.",
  date: "2026-09-30",
  keywords: [
    "react data table",
    "tanstack table tailwind",
    "shadcn data table",
    "tanstack table pagination sorting",
    "react table row selection",
  ],
  related: [
    "data-table",
    "sortable-header",
    "table-pagination",
    "table-toolbar",
    "row-selection",
    "bulk-actions-bar",
    "column-visibility-menu",
    "empty-table",
    "loading-table",
  ],
  body: [
    {
      type: "p",
      text: "To build a React data table with TanStack Table and Tailwind, let `useReactTable` own the state (sorting, filters, pagination, selection, visible columns) and compute the rows, then render those rows with presentational components that only draw what they are given. TanStack Table is headless, so the styling, accessibility and empty states all come from your components.",
    },
    {
      type: "p",
      text: "This guide wires TanStack Table v8 into the free MiniDev UI table parts: [DataTable](/docs/data-table), [SortableHeader](/docs/sortable-header), [TableToolbar](/docs/table-toolbar), [TablePagination](/docs/table-pagination), [RowSelection](/docs/row-selection), [BulkActionsBar](/docs/bulk-actions-bar), [ColumnVisibilityMenu](/docs/column-visibility-menu), [EmptyTable](/docs/empty-table) and [LoadingTable](/docs/loading-table). Every prop below is the real prop from the source. If the concept is new, the [data table glossary entry](/glossary/data-table) covers the vocabulary.",
    },

    { type: "h2", text: "When you need TanStack Table", id: "when-to-use-tanstack" },
    {
      type: "p",
      text: "`DataTable` on its own already sorts on the client (give a column a `sortValue`), selects rows, shows a floating bulk bar, a sticky header and a loading skeleton. For a settings page with 30 rows, that is enough. Add TanStack Table when one of these is true:",
    },
    {
      type: "list",
      items: [
        "You need search, column filters and pagination working together, in the right order.",
        "The data lives on the server and sorting, filtering and paging must become query parameters.",
        "Users hide and show columns, or you want multi-column sorting.",
        "Several parts of the page (toolbar, table, pagination, bulk bar) must read one source of truth.",
      ],
    },
    {
      type: "p",
      text: "The rule that keeps this simple: **one owner per piece of state**. Once TanStack sorts, do not also pass `sortValue` to `DataTable`; once TanStack tracks selection, do not also set `selectable`. The MiniDev parts become paint.",
    },

    { type: "h2", text: "Install", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npm i @tanstack/react-table\n\nnpx shadcn@latest add https://ui.minidev.pro/r/data-table.json\nnpx shadcn@latest add https://ui.minidev.pro/r/sortable-header.json\nnpx shadcn@latest add https://ui.minidev.pro/r/table-toolbar.json\nnpx shadcn@latest add https://ui.minidev.pro/r/table-pagination.json\nnpx shadcn@latest add https://ui.minidev.pro/r/row-selection.json\nnpx shadcn@latest add https://ui.minidev.pro/r/bulk-actions-bar.json\nnpx shadcn@latest add https://ui.minidev.pro/r/column-visibility-menu.json\nnpx shadcn@latest add https://ui.minidev.pro/r/empty-table.json\nnpx shadcn@latest add https://ui.minidev.pro/r/loading-table.json",
    },
    {
      type: "p",
      text: "The shadcn CLI copies each file into `components/ui` along with its registry dependencies (`button`, `checkbox`, `search-input`, `dropdown-menu`, `skeleton`). Import the token stylesheet once, either `@import \"minidev-ui-kit/styles.css\"` from the npm package or a copy of [styles.css](https://ui.minidev.pro/r/styles.css), so classes like `bg-surface` and `text-fg-muted` resolve.",
    },

    { type: "h2", text: "Define the data and columns", id: "define-columns" },
    {
      type: "p",
      text: "Column definitions describe how to read, sort, filter and render each field. Define them at module scope so the array keeps the same reference between renders.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/invoices/columns.tsx",
      code: `"use client"
import type { ColumnDef } from "@tanstack/react-table"
import { SortableHeader } from "@/components/ui/sortable-header"
import { RowSelection } from "@/components/ui/row-selection"

export type Invoice = {
  id: string
  customer: string
  email: string
  status: "paid" | "open" | "overdue"
  amount: number // cents
  issuedAt: string // ISO date
}

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
const day = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" })

export const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <RowSelection
        aria-label="Select all rows on this page"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(v)}
      />
    ),
    cell: ({ row }) => (
      <RowSelection
        aria-label={"Select invoice " + row.original.id}
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(v)}
      />
    ),
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <SortableHeader label="Customer" direction={column.getIsSorted()} onToggle={() => column.toggleSorting()} />
    ),
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    filterFn: "equalsString",
    cell: ({ getValue }) => <span className="capitalize">{getValue<string>()}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <SortableHeader label="Amount" direction={column.getIsSorted()} onToggle={() => column.toggleSorting()} />
    ),
    cell: ({ getValue }) => money.format(getValue<number>() / 100),
  },
  {
    accessorKey: "issuedAt",
    header: ({ column }) => (
      <SortableHeader label="Issued" direction={column.getIsSorted()} onToggle={() => column.toggleSorting()} />
    ),
    cell: ({ getValue }) => day.format(new Date(getValue<string>())),
  },
]`,
    },
    {
      type: "p",
      text: "`column.getIsSorted()` returns `false | \"asc\" | \"desc\"`, which is exactly the type of the `direction` prop on `SortableHeader`, so no mapping is needed. Calling `column.toggleSorting()` with no arguments cycles through ascending, descending and unsorted. Text columns start ascending and number columns start descending, which is TanStack's default and usually what people expect for amounts.",
    },
    {
      type: "p",
      text: "Formatters are created once with `Intl`, and the date formatter pins `timeZone: \"UTC\"` so the server render and the browser render agree and you avoid a hydration mismatch.",
    },

    { type: "h2", text: "Wire up useReactTable", id: "use-react-table" },
    {
      type: "p",
      text: "Hold each slice of table state in React state and hand it to the table. Controlled state is a little more code than `initialState`, but it lets the toolbar, the pagination and a URL sync read the same values.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/invoices/invoices-table.tsx",
      code: `"use client"
import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { DataTable, type Column } from "@/components/ui/data-table"
import { columns, type Invoice } from "./columns"

export function InvoicesTable({ data }: { data: Invoice[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "issuedAt", desc: true }])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({ email: false })
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 })

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnFilters, columnVisibility, rowSelection, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getRowId: (row) => row.id,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // ...render, shown in the next sections
}`,
    },
    {
      type: "list",
      items: [
        "`getCoreRowModel` is required. It turns `data` into `Row` objects.",
        "`getFilteredRowModel` applies the global filter and column filters, `getSortedRowModel` sorts what is left, and `getPaginationRowModel` slices the current page. TanStack runs them in that order regardless of the order you list them.",
        "`getRowId` makes selection keys your invoice IDs instead of array indexes, so a selection survives sorting, filtering and a refetch.",
        "`columnVisibility: { email: false }` hides the email column by default. Hidden columns still take part in the global filter, so searching for an email address still finds the row.",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "`data` and `columns` must keep stable references. A new array on every render (an inline `[]` fallback, or `.filter()` in the component body) makes TanStack recompute every row model on every render and can cause a render loop. Keep columns at module scope and memoize derived data with `useMemo`.",
    },

    { type: "h2", text: "Render the rows into DataTable", id: "render-into-datatable" },
    {
      type: "p",
      text: "`DataTable` is generic over its row type and takes `columns` of `{ id, header, cell }`, where `cell` receives a row and returns a node. Pass it TanStack `Row` objects and let `flexRender` produce the header and cell content from your column definitions:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const headers = table.getHeaderGroups()[0]?.headers ?? []

const cols: Column<Row<Invoice>>[] = headers.map((header) => ({
  id: header.id,
  header: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()),
  cell: (row) => {
    const cell = row.getVisibleCells().find((c) => c.column.id === header.column.id)
    return cell ? flexRender(cell.column.columnDef.cell, cell.getContext()) : null
  },
  align: header.column.id === "amount" ? "right" : "left",
  width: header.column.id === "select" ? 40 : undefined,
}))

return (
  <DataTable
    columns={cols}
    data={table.getRowModel().rows}
    getRowId={(row) => row.id}
    caption="Invoices"
    maxHeight={560}
  />
)`,
    },
    {
      type: "p",
      text: "`table.getRowModel()` returns the final rows after filtering, sorting and pagination, and the header group only contains visible columns, so hiding a column removes it from both. No column gets a `sortValue`, which keeps `DataTable` from sorting a second time. `maxHeight` fixes the height and turns on the sticky header, which gains a hairline shadow once the body scrolls. Right aligned cells get `tabular-nums` automatically, so amounts line up.",
    },
    {
      type: "h3",
      text: "Keep aria-sort on the header cell",
    },
    {
      type: "p",
      text: "`DataTable` sets `aria-sort` on each `th` only for columns it sorts itself. With TanStack in charge, add an optional `ariaSort` field to the `Column` type in your copy of the file and prefer it when present. It is a two-line change because the component lives in your repo:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/data-table.tsx",
      code: `// in the Column<T> type
ariaSort?: "ascending" | "descending" | "none"

// on the <th>
aria-sort={c.ariaSort ?? (dir ? (dir === "asc" ? "ascending" : "descending") : c.sortValue ? "none" : undefined)}`,
    },
    {
      type: "p",
      text: "Then fill it in the mapping: read `header.column.getIsSorted()` and return `\"ascending\"`, `\"descending\"` or `\"none\"` when `header.column.getCanSort()` is true.",
    },

    { type: "h2", text: "Search and filters in the toolbar", id: "filtering" },
    {
      type: "p",
      text: "`TableToolbar` renders a labelled search field on the left and whatever children you pass on the right. Bind the search to the global filter and put column filters and the column menu in the children slot:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const status = table.getColumn("status")
const overdueOnly = status?.getFilterValue() === "overdue"

<TableToolbar search={globalFilter} onSearchChange={setGlobalFilter} searchPlaceholder="Search invoices…">
  <Button
    variant="outline"
    size="sm"
    aria-pressed={overdueOnly}
    onClick={() => status?.setFilterValue(overdueOnly ? undefined : "overdue")}
  >
    Overdue only
  </Button>
  {/* ColumnVisibilityMenu goes here, see below */}
</TableToolbar>`,
    },
    {
      type: "p",
      text: "Setting a filter value to `undefined` removes that filter. TanStack resets the page index to the first page when filters or sorting change (`autoResetPageIndex` is on for client side pagination), so users never land on an empty page 7. The `equalsString` filter function is case insensitive; for multi-select filters use `arrIncludesSome` and pass an array.",
    },

    { type: "h2", text: "Pagination", id: "pagination" },
    {
      type: "p",
      text: "TanStack's `pageIndex` is zero based and `TablePagination` shows a one based page number, so convert at the boundary. The previous and next buttons disable themselves at the ends and carry `aria-label`s. See the [pagination glossary entry](/glossary/pagination) for when to prefer numbered pages or infinite scroll.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<TablePagination
  page={pagination.pageIndex + 1}
  pageCount={table.getPageCount()}
  onPageChange={(page) => table.setPageIndex(page - 1)}
/>`,
    },

    { type: "h2", text: "Row selection and bulk actions", id: "row-selection" },
    {
      type: "p",
      text: "The select column above renders `RowSelection` in the header and in every row. The header uses `getIsAllPageRowsSelected` and `toggleAllPageRowsSelected`, so it selects the visible page, which is what a checkbox sitting on top of that page implies. Because rows are keyed by ID, selections on other pages are kept.",
    },
    {
      type: "callout",
      tone: "note",
      text: "The shipped `RowSelection` passes `indeterminate` through `checked`, but the underlying Base UI checkbox has a separate `indeterminate` prop, so the partial state shows as a full check. In your copy, render `<Checkbox checked={checked} indeterminate={indeterminate} ... />` and the header shows a dash when only some rows are selected.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const selected = table.getSelectedRowModel().rows

<BulkActionsBar count={selected.length} onClear={() => table.resetRowSelection()}>
  <Button size="sm" variant="outline" onClick={() => exportCsv(selected.map((r) => r.original))}>
    Export CSV
  </Button>
  <Button size="sm" variant="destructive" onClick={() => voidInvoices(selected.map((r) => r.id))}>
    Void
  </Button>
</BulkActionsBar>`,
    },
    {
      type: "p",
      text: "`BulkActionsBar` renders nothing when `count` is zero and sticks to the bottom of the scroll area otherwise. It has `role=\"status\"`, so screen readers hear \"3 selected\" as the count changes. `getSelectedRowModel()` includes selected rows on every page; use `getFilteredSelectedRowModel()` if an action should only apply to rows that match the current search.",
    },

    { type: "h2", text: "Show and hide columns", id: "column-visibility" },
    {
      type: "p",
      text: "`ColumnVisibilityMenu` takes a list of `{ id, label }`, the visible IDs as an array, and an `onChange` with the new array. TanStack stores visibility as a record of booleans, so translate in both directions and only offer columns where `getCanHide()` is true (the select column opts out with `enableHiding: false`):",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const LABELS: Record<string, string> = { customer: "Customer", email: "Email", amount: "Amount", status: "Status", issuedAt: "Issued" }
const hideable = table.getAllLeafColumns().filter((c) => c.getCanHide())

<ColumnVisibilityMenu
  columns={hideable.map((c) => ({ id: c.id, label: LABELS[c.id] ?? c.id }))}
  visible={hideable.filter((c) => c.getIsVisible()).map((c) => c.id)}
  onChange={(ids) => table.setColumnVisibility(Object.fromEntries(hideable.map((c) => [c.id, ids.includes(c.id)])))}
/>`,
    },
    {
      type: "p",
      text: "Persist `columnVisibility` to `localStorage` or the user's settings if people come back to this table daily. It is a plain object and serializes as is.",
    },

    { type: "h2", text: "Loading and empty states", id: "loading-empty" },
    {
      type: "p",
      text: "There are three different \"nothing to show\" moments, and each deserves its own UI:",
    },
    {
      type: "list",
      items: [
        "**First load, no data yet.** Render `LoadingTable` with `rows` and `cols` close to the real shape. It has `role=\"status\"` and `aria-busy`, so assistive technology knows content is coming.",
        "**Refetching a server page.** Pass `loading` to `DataTable`. The headers stay put and the body shows skeleton rows, which prevents the layout from jumping.",
        "**No rows.** Pass an `EmptyTable` to the `empty` prop. Distinguish \"you have no invoices\" (offer to create one) from \"nothing matches your search\" (offer to clear filters).",
      ],
    },
    {
      type: "code",
      lang: "tsx",
      code: `if (isLoading) return <LoadingTable rows={8} cols={5} />

const empty =
  data.length === 0 ? (
    <EmptyTable title="No invoices yet" description="Invoices you send appear here." actionLabel="New invoice" onAction={openComposer} className="border-0 bg-transparent py-10" />
  ) : (
    <EmptyTable
      title="No matching invoices"
      description="Try a different search or clear the filters."
      actionLabel="Clear filters"
      onAction={() => { table.resetGlobalFilter(); table.resetColumnFilters() }}
      className="border-0 bg-transparent py-10"
    />
  )

<DataTable columns={cols} data={table.getRowModel().rows} getRowId={(row) => row.id} empty={empty} />`,
    },

    { type: "h2", text: "Move sorting, filtering and paging to the server", id: "server-side" },
    {
      type: "p",
      text: "For thousands of rows, let the database do the work. Set the `manual*` flags, drop the matching row model functions, and tell TanStack how many rows exist so it can compute the page count. With TanStack Query, `keepPreviousData` keeps the old page on screen while the next one loads:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const EMPTY: Invoice[] = []

const query = useQuery({
  queryKey: ["invoices", pagination, sorting, globalFilter, columnFilters],
  queryFn: () => fetchInvoices({ pagination, sorting, globalFilter, columnFilters }),
  placeholderData: keepPreviousData,
})

const table = useReactTable({
  data: query.data?.rows ?? EMPTY,
  columns,
  rowCount: query.data?.total,
  manualPagination: true,
  manualSorting: true,
  manualFiltering: true,
  state: { sorting, globalFilter, columnFilters, columnVisibility, rowSelection, pagination },
  onSortingChange: setSorting,
  onGlobalFilterChange: setGlobalFilter,
  onColumnFiltersChange: setColumnFilters,
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  onPaginationChange: setPagination,
  getRowId: (row) => row.id,
  getCoreRowModel: getCoreRowModel(),
})`,
    },
    {
      type: "list",
      items: [
        "`rowCount` needs TanStack Table 8.13 or later; on older versions pass `pageCount` instead.",
        "Debounce the search input (around 250ms) before it reaches `globalFilter`, or every keystroke becomes a request.",
        "With manual pagination the page index does not reset on its own. Call `table.setPageIndex(0)` when the search or a filter changes.",
        "Validate sort columns against an allow list on the server. Never interpolate a client supplied column name into SQL.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "All of these are free and MIT licensed, and the whole set is on the [data tables category page](/components/data-tables). For the page around the table (sidebar, stat cards, charts), see the [Next.js SaaS dashboard guide](/guides/nextjs-saas-dashboard) and the [sidebar layout guide](/guides/shadcn-sidebar-layout). If you want an admin panel built rather than assembled, the [MiniDev studio](https://minidev.pro) builds complete products on this kit.",
    },
    { type: "component", name: "data-table" },
    { type: "component", name: "table-toolbar" },
    { type: "component", name: "table-pagination" },
    { type: "component", name: "bulk-actions-bar" },
    { type: "component", name: "column-visibility-menu" },
    { type: "component", name: "empty-table" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "Is TanStack Table a component library?",
      a: "No. TanStack Table is headless: it manages table state and computes row models but renders nothing. You supply the markup, which is where components like `DataTable`, `SortableHeader` and `TablePagination` come in.",
    },
    {
      q: "How is this different from the shadcn data table?",
      a: "The pattern is the same (TanStack Table plus your own table markup). The MiniDev parts add a sticky header with a scroll shadow, density options, hover revealed row actions, skeleton loading, a bulk actions bar and empty states, styled with MiniDev tokens.",
    },
    {
      q: "Why does my TanStack table re-render forever?",
      a: "Almost always because `data` or `columns` is a new array on every render. Define columns outside the component, memoize derived data with `useMemo`, and use a module level constant for an empty fallback.",
    },
    {
      q: "Should sorting and pagination run on the client or the server?",
      a: "Client side is fine up to a few thousand rows that you already have in memory. Beyond that, or when the data changes often, set `manualSorting`, `manualFiltering` and `manualPagination` and send the state to your API as query parameters.",
    },
  ],
}

export default guide
