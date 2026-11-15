"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/registry/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

/**
 * DataGrid — an editable spreadsheet grid: arrow keys move between cells, typing edits, and you can paste straight from Excel or Google Sheets.
 *
 * Use it when people change many values in place: price lists, stock counts, budgets, bulk imports. Columns are text, number,
 * select or checkbox. Shift+arrows select a block, Cmd/Ctrl+C copies it as tab-separated text, Cmd/Ctrl+V pastes a block from a
 * spreadsheet and turns "1,240.50" into a number, Delete clears and Cmd/Ctrl+Z undoes. The grid is controlled: it shows `rows`
 * and hands every edit to `onRowsChange`; without that prop it is read-only. The header and first column stay put while you
 * scroll, and columns resize by dragging the header edge. For sorting, filtering and row selection use DataTable; to edit a
 * single value in a read-only table use InlineCellEdit; for query output use SqlResultTable.
 *
 * @example
 * const [rows, setRows] = React.useState(products)
 * <DataGrid
 *   aria-label="Price list"
 *   rows={rows}
 *   onRowsChange={setRows}
 *   getRowId={(r) => r.sku}
 *   columns={[
 *     { key: "sku", header: "SKU", readOnly: true },
 *     { key: "name", header: "Product", width: 220 },
 *     { key: "price", header: "Price", type: "number" },
 *     { key: "active", header: "Active", type: "checkbox" },
 *   ]}
 * />
 */

type DataGridColumn<T> = {
  /** Field of the row that this column shows and edits. */
  key: keyof T & string
  /** Header text. */
  header: string
  /** Starting width in px. Defaults to 168, 120 for numbers and 88 for checkboxes. */
  width?: number
  /** Cell editor. "number" parses pasted and typed text into a number. */
  type?: "text" | "number" | "select" | "checkbox"
  /** Choices for a select column. */
  options?: { value: string; label: string }[]
  /** Text alignment. Numbers default to right, checkboxes to center. */
  align?: "left" | "center" | "right"
  /** Shown but never edited, pasted into or cleared. */
  readOnly?: boolean
}

type DataGridProps<T> = {
  /** Column definitions, left to right. The first column stays visible while scrolling sideways. */
  columns: DataGridColumn<T>[]
  /** The rows to show. The grid never copies them: edits go to `onRowsChange`. */
  rows: T[]
  /** Fires with a new rows array after each edit, paste, clear or undo. Leave it out for a read-only grid. */
  onRowsChange?: (rows: T[]) => void
  /** Stable key for each row. Defaults to the row index. */
  getRowId?: (row: T, index: number) => string
  /** Show a numbered column on the left. Click a number to select its row. */
  rowNumbers?: boolean
  /** Accessible name of the grid, such as "Price list". */
  "aria-label": string
  /** Size the scroll area here, for example `max-h-[32rem]`. */
  className?: string
}

type Pos = { r: number; c: number }
const SKIP = Symbol("skip")
const RN = 48 // row number column width in px

// Excel and Sheets copy tab-separated rows and wrap cells holding tabs, newlines or quotes in "...", with "" for a quote.
function parseTsv(text: string): string[][] {
  const out: string[][] = [[]]
  let cell = ""
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"'
        i++
      } else if (ch === '"') quoted = false
      else cell += ch
    } else if (ch === '"' && cell === "") quoted = true
    else if (ch === "\t") {
      out[out.length - 1].push(cell)
      cell = ""
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++
      out[out.length - 1].push(cell)
      cell = ""
      out.push([])
    } else cell += ch
  }
  out[out.length - 1].push(cell)
  if (out.length > 1 && out[out.length - 1].join("") === "") out.pop()
  return out
}

const quote = (s: string) => (/[\t\n\r"]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s)

function toText<T>(col: DataGridColumn<T>, v: unknown): string {
  if (v == null) return ""
  if (col.type === "checkbox") return v ? "TRUE" : "FALSE"
  if (col.type === "select") return col.options?.find((o) => o.value === v)?.label ?? String(v)
  return String(v)
}

// Text from a keyboard or clipboard into the column's type. SKIP leaves the cell as it was.
function coerce<T>(col: DataGridColumn<T>, raw: string): unknown {
  const s = raw.trim()
  if (col.type === "number") {
    if (!s) return null
    // shortcut: "." is the decimal mark and a comma must be a thousands separator, so "1,5" and "1.240,50" are
    // skipped rather than misread; parse with the user's locale if your data uses decimal commas.
    if (/,(?!\d{3}(?!\d))/.test(s)) return SKIP
    const digits = s.replace(/[^\d.eE+-]/g, "")
    const n = Number(digits)
    if (!digits || !Number.isFinite(n)) return SKIP
    return /^\(.*\)$/.test(s) ? -n : n // accounting negatives: (1,200)
  }
  if (col.type === "checkbox") return /^(true|yes|y|1|x|on)$/i.test(s) ? true : /^(false|no|n|0|off|)$/i.test(s) ? false : SKIP
  if (col.type === "select") {
    const o = col.options?.find((o) => o.value.toLowerCase() === s.toLowerCase() || o.label.toLowerCase() === s.toLowerCase())
    return o ? o.value : SKIP
  }
  return raw
}

// shortcut: renders every cell, so typing stays smooth to about 2k rows; past that, page the data or build on VirtualList.
function DataGrid<T>({ columns, rows, onRowsChange, getRowId = (_, i) => String(i), rowNumbers = true, "aria-label": ariaLabel, className }: DataGridProps<T>) {
  const [active, setActive] = React.useState<Pos>({ r: 0, c: 0 })
  const [anchor, setAnchor] = React.useState<Pos>({ r: 0, c: 0 })
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const [widths, setWidths] = React.useState<Record<string, number>>({})
  const editingRef = React.useRef(false)
  const refocus = React.useRef(false)
  const dragging = React.useRef(false)
  const history = React.useRef<T[][]>([])
  const table = React.useRef<HTMLTableElement>(null)

  const R = rows.length
  const C = columns.length
  const clamp = (p: Pos) => ({ r: Math.max(0, Math.min(p.r, R - 1)), c: Math.max(0, Math.min(p.c, C - 1)) })
  const a = clamp(active)
  const b = clamp(anchor)
  const sel = { r0: Math.min(a.r, b.r), r1: Math.max(a.r, b.r), c0: Math.min(a.c, b.c), c1: Math.max(a.c, b.c) }
  const multi = sel.r0 !== sel.r1 || sel.c0 !== sel.c1
  const canEdit = (c: number) => !!onRowsChange && !columns[c]?.readOnly
  const colW = (col: DataGridColumn<T>) => widths[col.key] ?? col.width ?? (col.type === "checkbox" ? 88 : col.type === "number" ? 120 : 168)
  const stickyW = (rowNumbers ? RN : 0) + (columns[0] ? colW(columns[0]) : 0)

  React.useEffect(() => {
    if (!refocus.current) return
    refocus.current = false
    table.current?.querySelector<HTMLElement>(`[data-cell="${a.r}:${a.c}"]`)?.focus()
  })
  React.useEffect(() => {
    const up = () => (dragging.current = false)
    window.addEventListener("pointerup", up)
    return () => window.removeEventListener("pointerup", up)
  }, [])

  const apply = (changes: { r: number; c: number; v: unknown }[]) => {
    if (!onRowsChange) return
    const next = rows.slice()
    let changed = false
    for (const { r, c, v } of changes) {
      const col = columns[c]
      if (!col || !canEdit(c) || r >= R || Object.is(next[r][col.key], v)) continue
      next[r] = { ...next[r], [col.key]: v }
      changed = true
    }
    if (!changed) return
    history.current = [...history.current.slice(-49), rows]
    onRowsChange(next)
  }
  const moveTo = (p: Pos, extend = false) => {
    const q = clamp(p)
    setActive(q)
    if (!extend) setAnchor(q)
    refocus.current = true
  }
  const startEdit = (initial?: string) => {
    const col = columns[a.c]
    if (!R || !canEdit(a.c)) return
    if (col.type === "checkbox") return apply([{ ...a, v: !rows[a.r][col.key] }])
    editingRef.current = true
    setDraft(initial ?? toText(col, rows[a.r][col.key]))
    setEditing(true)
  }
  // then: a cell to move to, "stay" to refocus the edited cell, "none" when focus has already gone elsewhere.
  const stopEdit = (save: boolean, then: Pos | "stay" | "none") => {
    if (!editingRef.current) return
    editingRef.current = false
    setEditing(false)
    if (save) {
      const v = coerce(columns[a.c], draft)
      if (v !== SKIP) apply([{ ...a, v }])
    }
    if (then === "stay") refocus.current = true
    else if (then !== "none") moveTo(then)
  }
  const selectBlock = (from: Pos, to: Pos) => {
    setAnchor(from)
    setActive(to)
    refocus.current = true
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (editingRef.current || !R) return
    const mod = e.metaKey || e.ctrlKey
    const arrows: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }
    const key = e.key
    if (arrows[key]) {
      const [dr, dc] = arrows[key]
      // Cmd/Ctrl+arrow jumps to the edge, as in a spreadsheet.
      const to = mod ? { r: dr ? (dr < 0 ? 0 : R - 1) : a.r, c: dc ? (dc < 0 ? 0 : C - 1) : a.c } : { r: a.r + dr, c: a.c + dc }
      moveTo(to, e.shiftKey)
    } else if (key === "Home" || key === "End") moveTo({ r: mod ? (key === "Home" ? 0 : R - 1) : a.r, c: key === "Home" ? 0 : C - 1 }, e.shiftKey)
    else if (key === "Tab") {
      const c = a.c + (e.shiftKey ? -1 : 1)
      if (c < 0 || c >= C) return // let Tab leave the grid from the first or last column
      moveTo({ r: a.r, c })
    } else if (key === "Enter" || key === "F2") startEdit()
    else if (key === "Escape") setAnchor(a)
    else if (key === "Delete" || key === "Backspace") {
      const changes = []
      for (let r = sel.r0; r <= sel.r1; r++) for (let c = sel.c0; c <= sel.c1; c++) changes.push({ r, c, v: coerce(columns[c], "") })
      apply(changes.filter((ch) => ch.v !== SKIP))
    } else if (mod && key.toLowerCase() === "z" && !e.shiftKey) {
      const prev = history.current.pop()
      if (prev) onRowsChange?.(prev)
    } else if (mod && key.toLowerCase() === "a") selectBlock({ r: 0, c: 0 }, { r: R - 1, c: C - 1 })
    else if (key === " " && columns[a.c].type === "checkbox") startEdit()
    else if (key.length === 1 && !mod && !e.altKey) startEdit(columns[a.c].type === "select" ? undefined : key)
    else return
    e.preventDefault()
  }

  const onCopy = (e: React.ClipboardEvent) => {
    if (editingRef.current || !R) return
    const lines = []
    for (let r = sel.r0; r <= sel.r1; r++) {
      const cells = []
      for (let c = sel.c0; c <= sel.c1; c++) cells.push(quote(toText(columns[c], rows[r][columns[c].key])))
      lines.push(cells.join("\t"))
    }
    e.clipboardData.setData("text/plain", lines.join("\n"))
    e.preventDefault()
  }
  const onPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text/plain")
    if (editingRef.current || !R || !onRowsChange || !text) return
    e.preventDefault()
    const data = parseTsv(text)
    // One copied value pasted over a selected block fills the block.
    const fill = data.length === 1 && data[0].length === 1 && multi
    const h = fill ? sel.r1 - sel.r0 + 1 : data.length
    const w = fill ? sel.c1 - sel.c0 + 1 : Math.max(...data.map((row) => row.length))
    const changes = []
    for (let i = 0; i < h; i++)
      for (let j = 0; j < w; j++) {
        const r = sel.r0 + i
        const c = sel.c0 + j
        const s = fill ? data[0][0] : data[i][j]
        if (r >= R || c >= C || s === undefined) continue
        const v = coerce(columns[c], s)
        if (v !== SKIP) changes.push({ r, c, v })
      }
    apply(changes)
    selectBlock({ r: sel.r0, c: sel.c0 }, clamp({ r: sel.r0 + h - 1, c: sel.c0 + w - 1 }))
  }
  const startResize = (e: React.PointerEvent<HTMLSpanElement>, col: DataGridColumn<T>) => {
    e.preventDefault()
    e.stopPropagation()
    const el = e.currentTarget
    const x0 = e.clientX
    const w0 = colW(col)
    el.setPointerCapture(e.pointerId)
    const move = (ev: PointerEvent) => setWidths((s) => ({ ...s, [col.key]: Math.max(56, Math.round((w0 + ev.clientX - x0) / 2) * 2) }))
    const up = () => {
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerup", up)
    }
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerup", up)
  }

  const align = (col: DataGridColumn<T>) => col.align ?? (col.type === "number" ? "right" : col.type === "checkbox" ? "center" : "left")
  const off = rowNumbers ? 1 : 0
  const first = rowNumbers ? "left-12" : "left-0"

  return (
    <div data-slot="data-grid" className={cn("relative max-h-96 w-fit max-w-full overflow-auto rounded-xl border border-border bg-surface shadow-raised", className)}>
      <table
        ref={table}
        role="grid"
        aria-label={ariaLabel}
        aria-rowcount={R + 1}
        aria-colcount={C + off}
        aria-multiselectable
        aria-readonly={!onRowsChange || undefined}
        onKeyDown={onKeyDown}
        onCopy={onCopy}
        onPaste={onPaste}
        style={{ width: columns.reduce((t, col) => t + colW(col), rowNumbers ? RN : 0) }}
        className="group/grid table-fixed border-separate border-spacing-0 text-sm text-fg"
      >
        <colgroup>
          {rowNumbers ? <col style={{ width: RN }} /> : null}
          {columns.map((col) => (
            <col key={col.key} style={{ width: colW(col) }} />
          ))}
        </colgroup>
        <thead>
          <tr aria-rowindex={1}>
            {rowNumbers ? (
              <th
                aria-colindex={1}
                onPointerDown={() => R && selectBlock({ r: 0, c: 0 }, { r: R - 1, c: C - 1 })}
                className="sticky top-0 left-0 z-30 h-9 border-r border-b border-border bg-sunken"
              >
                <span className="sr-only">Row</span>
              </th>
            ) : null}
            {columns.map((col, c) => (
              <th
                key={col.key}
                aria-colindex={c + off + 1}
                style={{ textAlign: align(col) }}
                className={cn("sticky top-0 z-20 h-9 border-r border-b border-border bg-sunken px-3 text-xs font-medium text-fg-muted", c === 0 && cn(first, "z-30"))}
              >
                <span className="block truncate">{col.header}</span>
                <span
                  aria-hidden
                  onPointerDown={(e) => startResize(e, col)}
                  className="absolute inset-y-0 -right-1 z-10 w-2 cursor-col-resize touch-none after:absolute after:inset-y-2 after:left-[3px] after:w-0.5 after:rounded-full after:transition-[background-color] after:duration-[70ms] hover:after:bg-accent"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {R === 0 ? (
            <tr>
              <td colSpan={C + off} className="h-24 text-center text-fg-subtle">No rows</td>
            </tr>
          ) : null}
          {rows.map((row, r) => (
            <tr key={getRowId(row, r)} aria-rowindex={r + 2}>
              {rowNumbers ? (
                <th
                  scope="row"
                  aria-colindex={1}
                  onPointerDown={() => selectBlock({ r, c: 0 }, { r, c: C - 1 })}
                  className={cn(
                    "sticky left-0 z-10 h-9 border-r border-b border-border bg-sunken px-2 text-right font-mono text-xs font-normal tabular-nums transition-[color] duration-[70ms]",
                    r >= sel.r0 && r <= sel.r1 ? "text-fg" : "text-fg-subtle"
                  )}
                >
                  {r + 1}
                </th>
              ) : null}
              {columns.map((col, c) => {
                const v = row[col.key]
                const isActive = r === a.r && c === a.c
                const inSel = r >= sel.r0 && r <= sel.r1 && c >= sel.c0 && c <= sel.c1
                const label = `${col.header}, row ${r + 1}`
                return (
                  <td
                    key={col.key}
                    role="gridcell"
                    data-cell={`${r}:${c}`}
                    data-active={isActive || undefined}
                    data-selected={(multi && inSel) || undefined}
                    aria-colindex={c + off + 1}
                    aria-selected={inSel}
                    aria-readonly={!canEdit(c) || undefined}
                    tabIndex={isActive ? 0 : -1}
                    onPointerDown={(e) => {
                      // Clicks inside an open editor (portalled Select items included) bubble here through React.
                      if (e.button !== 0 || (editingRef.current && isActive)) return
                      stopEdit(true, "none")
                      dragging.current = true
                      setActive({ r, c })
                      if (!e.shiftKey) setAnchor({ r, c })
                    }}
                    onPointerEnter={(e) => dragging.current && e.buttons === 1 && setActive({ r, c })}
                    onClick={(e) => col.type === "checkbox" && (e.target as HTMLElement).closest("[data-toggle]") && startEdit()}
                    onDoubleClick={() => col.type !== "checkbox" && startEdit()}
                    style={{ textAlign: align(col), scrollMarginLeft: c > 0 ? stickyW : undefined }}
                    className={cn(
                      "h-9 scroll-mt-9 truncate border-r border-b border-border px-3 select-none",
                      c === 0 ? cn("sticky z-10 bg-surface", first) : "relative",
                      col.type === "number" && "tabular-nums",
                      !canEdit(c) && "text-fg-muted",
                      "data-selected:after:pointer-events-none data-selected:after:absolute data-selected:after:inset-0 data-selected:after:bg-accent-soft",
                      "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
                      "group-focus-within/grid:data-active:outline-2 group-focus-within/grid:data-active:-outline-offset-2 group-focus-within/grid:data-active:outline-accent"
                    )}
                  >
                    {isActive && editing && col.type === "select" ? (
                      <Select
                        items={col.options}
                        value={v ?? null}
                        open
                        onOpenChange={(o) => !o && stopEdit(false, "stay")}
                        onValueChange={(nv) => apply([{ r, c, v: nv }])}
                      >
                        <SelectTrigger size="sm" aria-label={label} className="absolute inset-0 z-10 h-full rounded-none border-0 shadow-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {col.options?.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : isActive && editing ? (
                      <input
                        autoFocus
                        aria-label={label}
                        value={draft}
                        inputMode={col.type === "number" ? "decimal" : undefined}
                        onChange={(e) => setDraft(e.target.value)}
                        onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                        onBlur={() => stopEdit(true, "none")}
                        onKeyDown={(e) => {
                          e.stopPropagation()
                          if (e.key === "Enter") stopEdit(true, { r: a.r + (e.shiftKey ? -1 : 1), c: a.c })
                          else if (e.key === "Tab") stopEdit(true, { r: a.r, c: a.c + (e.shiftKey ? -1 : 1) })
                          else if (e.key === "Escape") stopEdit(false, "stay")
                          else return
                          e.preventDefault()
                        }}
                        style={{ textAlign: align(col) }}
                        className="absolute inset-0 z-10 w-full bg-surface px-3 text-sm text-fg outline-2 -outline-offset-2 outline-accent"
                      />
                    ) : col.type === "checkbox" ? (
                      <span data-toggle className="inline-flex cursor-pointer align-middle">
                        {/* Inert: the cell is the tab stop and handles clicks and Space, so the box adds no focus stop of its own. */}
                        <span inert className="inline-flex">
                          <Checkbox checked={!!v} disabled={!canEdit(c)} />
                        </span>
                        <span className="sr-only">{v ? "checked" : "not checked"}</span>
                      </span>
                    ) : (
                      toText(col, v)
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { DataGrid }
export type { DataGridColumn, DataGridProps }
