"use client"
import * as React from "react"
import { CheckIcon, ChevronRightIcon, CopyIcon, FoldVerticalIcon, Link2Icon, SearchIcon, UnfoldVerticalIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** A collapsible JSON tree with syntax colours, item counts, copy value and copy path on hover, search highlighting and full keyboard navigation. */
type JsonViewerProps = {
  /** Any JSON serialisable value. Defaults to a Lumen invoice API response. */
  value?: unknown
  /** Label shown in the header, for example the request that produced the data. Pass an empty string to hide the header. */
  title?: string
  /** Key shown on the root row. Empty hides it. */
  rootName?: string
  /** Containers at or above this depth start open. The root is depth 0. */
  defaultExpandDepth?: number
  /** Extra container paths that start open, in `$.a.b[0]` form. */
  defaultExpanded?: string[]
  /** Show the search field and expand or collapse all buttons. */
  toolbar?: boolean
  /** Longest string shown inline before it is cut with an ellipsis. */
  maxStringLength?: number
  /** Called after a value or path is copied. */
  onCopy?: (text: string, kind: "value" | "path", path: string) => void
  "aria-label"?: string
  className?: string
}

const SAMPLE = {
  id: "inv_8f3a2c",
  object: "invoice",
  number: "LUM-2026-0147",
  status: "paid",
  currency: "usd",
  amount_due: 0,
  amount_paid: 184000,
  total: 184000,
  created: "2026-10-02T09:14:33Z",
  due_date: "2026-10-16",
  paid_at: "2026-10-09T15:02:11Z",
  customer: {
    id: "cus_n0rthw1nd",
    name: "Northwind Traders",
    email: "billing@northwind.example",
    contact: { name: "Maya Chen", role: "Finance lead" },
    address: { line1: "120 Market St", city: "Seattle", region: "WA", postal_code: "98101", country: "US" },
    tax_exempt: false,
  },
  lines: [
    { id: "li_01", description: "Lumen Pro, 12 seats", quantity: 12, unit_amount: 12000, amount: 144000, period: { start: "2026-10-01", end: "2026-10-31" } },
    { id: "li_02", description: "Usage: 2.4M API calls", quantity: 1, unit_amount: 40000, amount: 40000, period: { start: "2026-09-01", end: "2026-09-30" } },
  ],
  payment: { method: "card", brand: "visa", last4: "4242", receipt_url: "https://lumen.example/r/8f3a2c" },
  metadata: { plan: "pro", seats: 12, renewal: "annual", owner: "theo.okafor" },
  discount: null,
  livemode: true,
}

type Kind = "object" | "array" | "string" | "number" | "boolean" | "null"

type Row = {
  path: string
  key: string | null
  value: unknown
  kind: Kind
  depth: number
  parent: string | null
  count: number
  /** True for items of an array; the key is their index. */
  index: boolean
  children: Row[]
}

const INDENT = 16
const PAD = 8

function kindOf(v: unknown): Kind {
  if (v === null || v === undefined) return "null"
  if (Array.isArray(v)) return "array"
  switch (typeof v) {
    case "string":
      return "string"
    case "number":
    case "bigint":
      return "number"
    case "boolean":
      return "boolean"
    default:
      return "object"
  }
}

function build(value: unknown, key: string | null, path: string, depth: number, parent: string | null, index = false): Row {
  const kind = kindOf(value)
  let children: Row[] = []
  if (kind === "array") children = (value as unknown[]).map((v, i) => build(v, String(i), `${path}[${i}]`, depth + 1, path, true))
  else if (kind === "object") {
    const safeKey = (k: string) => (/^[A-Za-z_$][\w$]*$/.test(k) ? `.${k}` : `[${JSON.stringify(k)}]`)
    children = Object.entries(value as Record<string, unknown>).map(([k, v]) => build(v, k, `${path}${safeKey(k)}`, depth + 1, path))
  }
  return { path, key, value, kind, depth, parent, count: children.length, index, children }
}

function primitiveText(row: Row, max: number): string {
  if (row.kind === "string") {
    const s = row.value as string
    return JSON.stringify(s.length > max ? s.slice(0, max) + "…" : s)
  }
  if (row.kind === "null") return "null"
  return String(row.value)
}

function copyText(row: Row): string {
  if (row.kind === "string") return row.value as string
  if (row.kind === "null") return "null"
  if (row.kind === "object" || row.kind === "array") return JSON.stringify(row.value, null, 2)
  return String(row.value)
}

const VALUE_TONE: Record<Kind, string> = {
  string: "text-success",
  number: "text-info",
  boolean: "text-warning",
  null: "text-fg-subtle italic",
  object: "text-fg-subtle",
  array: "text-fg-subtle",
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const i = text.toLowerCase().indexOf(query)
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-accent-soft text-accent-fg">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  )
}

/**
 * A JSON tree for API responses and debug panels. Containers fold with a
 * chevron and show their item count while closed, values are coloured by
 * type, every row offers copy value and copy path on hover or focus, the
 * search field keeps only matching branches and highlights the hits, and
 * the whole tree walks with the arrow keys like a native tree view.
 */
function JsonViewer({
  value = SAMPLE,
  title = "GET /v1/invoices/inv_8f3a2c",
  rootName = "",
  defaultExpandDepth = 1,
  defaultExpanded = ["$.customer", "$.lines", "$.lines[0]"],
  toolbar = true,
  maxStringLength = 64,
  onCopy,
  "aria-label": ariaLabel = "JSON tree",
  className,
}: JsonViewerProps) {
  const treeId = React.useId()
  const root = React.useMemo(() => build(value, rootName || null, "$", 0, null), [value, rootName])
  const containers = React.useMemo(() => {
    const out: Row[] = []
    const walk = (r: Row) => {
      if (r.count) out.push(r)
      r.children.forEach(walk)
    }
    walk(root)
    return out
  }, [root])

  const [expanded, setExpanded] = React.useState(() => {
    const s = new Set<string>(defaultExpanded)
    const walk = (r: Row) => {
      if (r.count && r.depth <= defaultExpandDepth) s.add(r.path)
      r.children.forEach(walk)
    }
    walk(root)
    return s
  })
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  const [focusPath, setFocusPath] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState<string | null>(null)
  const copyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const refs = React.useRef(new Map<string, HTMLDivElement>())
  React.useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current)
  }, [])

  /* Search: keep rows that match or contain a match; everything kept is open. */
  const { visible, matches, open } = React.useMemo(() => {
    const matches = new Set<string>()
    const keep = new Set<string>()
    const hit = (r: Row) => {
      if (!q) return false
      const keyHit = r.key !== null && r.key.toLowerCase().includes(q)
      const valHit = r.count === 0 && primitiveText(r, Infinity).toLowerCase().includes(q)
      return keyHit || valHit
    }
    const mark = (r: Row): boolean => {
      let any = false
      for (const c of r.children) if (mark(c)) any = true
      const h = hit(r)
      if (h) matches.add(r.path)
      if (h || any) keep.add(r.path)
      return h || any
    }
    if (q) mark(root)
    const open = q ? keep : expanded
    const visible: Row[] = []
    const walk = (r: Row) => {
      if (q && !keep.has(r.path)) return
      visible.push(r)
      if (r.count && open.has(r.path)) r.children.forEach(walk)
    }
    walk(root)
    return { visible, matches, open }
  }, [root, q, expanded])

  const tabStop = visible.find((r) => r.path === focusPath)?.path ?? visible[0]?.path

  const focus = (path: string | undefined) => {
    if (!path) return
    setFocusPath(path)
    refs.current.get(path)?.focus()
  }
  const toggle = (path: string, to?: boolean) => {
    if (q) return
    setExpanded((prev) => {
      const next = new Set(prev)
      const want = to ?? !next.has(path)
      if (want) next.add(path)
      else next.delete(path)
      return next
    })
  }
  const copy = (row: Row, kind: "value" | "path") => {
    const text = kind === "value" ? copyText(row) : row.path
    try {
      navigator.clipboard?.writeText(text).catch(() => {})
    } catch {}
    onCopy?.(text, kind, row.path)
    setCopied(`${row.path}:${kind}`)
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(null), 1400)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget && !(e.target as HTMLElement).matches('[role="treeitem"]')) return
    const cur = visible.findIndex((r) => r.path === (focusPath ?? tabStop))
    const row = visible[cur]
    if (!row) return
    const key = e.key
    if (key === "ArrowDown") { e.preventDefault(); focus(visible[Math.min(visible.length - 1, cur + 1)]?.path) }
    else if (key === "ArrowUp") { e.preventDefault(); focus(visible[Math.max(0, cur - 1)]?.path) }
    else if (key === "Home") { e.preventDefault(); focus(visible[0]?.path) }
    else if (key === "End") { e.preventDefault(); focus(visible[visible.length - 1]?.path) }
    else if (key === "ArrowRight") {
      e.preventDefault()
      if (row.count && !open.has(row.path)) toggle(row.path, true)
      else if (row.count) focus(visible[cur + 1]?.path)
    } else if (key === "ArrowLeft") {
      e.preventDefault()
      if (row.count && open.has(row.path) && !q) toggle(row.path, false)
      else if (row.parent) focus(row.parent)
    } else if (key === "Enter" || key === " ") {
      e.preventDefault()
      if (row.count) toggle(row.path)
    }
  }

  const allOpen = containers.every((c) => expanded.has(c.path))

  return (
    <div data-slot="json-viewer" className={cn("flex w-full max-w-2xl flex-col rounded-xl border border-border bg-surface text-fg shadow-raised", className)}>
      {title ? (
        <div className="flex h-10 items-center justify-between gap-2 border-b border-border px-3">
          <span className="truncate font-mono text-[11px] font-medium tracking-[0.02em] text-fg-muted">{title}</span>
          <span className="shrink-0 rounded-full bg-sunken px-2 py-0.5 font-mono text-[10px] text-fg-subtle tabular-nums">
            {root.count} {root.kind === "array" ? (root.count === 1 ? "item" : "items") : root.count === 1 ? "key" : "keys"}
          </span>
        </div>
      ) : null}
      {toolbar ? (
        <div className="flex items-center gap-2 border-b border-border px-2 py-2">
          <div className="relative min-w-0 flex-1">
            <SearchIcon aria-hidden className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-fg-subtle" />
            <input
              type="search"
              value={query}
              placeholder="Search keys and values"
              aria-label="Search keys and values"
              aria-controls={treeId}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && query) { e.preventDefault(); setQuery("") }
                if (e.key === "ArrowDown") { e.preventDefault(); focus(visible[0]?.path) }
              }}
              className={cn(
                "h-8 w-full rounded-lg border border-border bg-bg pr-8 pl-8 text-[0.8125rem] text-fg shadow-xs outline-none placeholder:text-fg-subtle",
                "transition-[border-color,box-shadow] duration-[140ms] ease-hairline [&::-webkit-search-cancel-button]:appearance-none",
                "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]"
              )}
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-1 grid size-6 -translate-y-1/2 place-items-center rounded-md text-fg-subtle outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
              >
                <XIcon className="size-3.5" />
              </button>
            ) : null}
          </div>
          <span aria-live="polite" className={cn("shrink-0 font-mono text-[11px] tabular-nums", q ? "text-fg-muted" : "sr-only")}>
            {q ? `${matches.size} ${matches.size === 1 ? "match" : "matches"}` : ""}
          </span>
          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              aria-label="Expand all"
              title="Expand all"
              disabled={!!q || allOpen}
              onClick={() => setExpanded(new Set(containers.map((c) => c.path)))}
              className="grid size-8 place-items-center rounded-lg text-fg-muted outline-none transition-colors duration-[70ms] hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <UnfoldVerticalIcon className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Collapse all"
              title="Collapse all"
              disabled={!!q || expanded.size <= 1}
              onClick={() => setExpanded(new Set(["$"]))}
              className="grid size-8 place-items-center rounded-lg text-fg-muted outline-none transition-colors duration-[70ms] hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <FoldVerticalIcon className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
      <div className="max-h-96 overflow-auto p-2">
        {visible.length ? (
          <div id={treeId} role="tree" aria-label={ariaLabel} onKeyDown={onKeyDown} className="min-w-max outline-none">
            {visible.map((row) => {
              const isOpen = row.count > 0 && open.has(row.path)
              const focused = row.path === tabStop
              const bracket = row.kind === "array" ? ["[", "]"] : ["{", "}"]
              const noun = row.kind === "array" ? (row.count === 1 ? "item" : "items") : row.count === 1 ? "key" : "keys"
              const summary = row.count ? `${row.count} ${noun}` : primitiveText(row, maxStringLength)
              return (
                <div
                  key={row.path}
                  ref={(el) => {
                    if (el) refs.current.set(row.path, el)
                    else refs.current.delete(row.path)
                  }}
                  role="treeitem"
                  aria-level={row.depth + 1}
                  aria-expanded={row.count ? isOpen : undefined}
                  aria-selected={focused}
                  aria-label={`${row.key ?? "root"}: ${row.count ? `${row.kind}, ${summary}` : summary}`}
                  tabIndex={focused ? 0 : -1}
                  onFocus={(e) => {
                    if (e.target === e.currentTarget) setFocusPath(row.path)
                  }}
                  onClick={() => {
                    focus(row.path)
                    if (row.count) toggle(row.path)
                  }}
                  data-slot="json-viewer-row"
                  className={cn(
                    "group/row relative flex h-6 items-center gap-1 rounded-md pr-1 font-mono text-[12px] leading-none outline-none select-none",
                    "transition-colors duration-[70ms] ease-hairline hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                    row.count ? "cursor-pointer" : "cursor-default"
                  )}
                  style={{ paddingLeft: PAD + row.depth * INDENT }}
                >
                  {Array.from({ length: row.depth }, (_, d) => (
                    <span key={d} aria-hidden className="pointer-events-none absolute top-0 bottom-0 w-px bg-border" style={{ left: PAD + d * INDENT + 7 }} />
                  ))}
                  {row.count ? (
                    <ChevronRightIcon
                      aria-hidden
                      className={cn("size-3.5 shrink-0 text-fg-subtle transition-transform duration-[140ms] ease-hairline motion-reduce:transition-none", isOpen && "rotate-90")}
                    />
                  ) : (
                    <span aria-hidden className="size-3.5 shrink-0" />
                  )}
                  {row.key !== null ? (
                    <span className={cn("shrink-0", row.index ? "text-fg-subtle" : "text-fg")}>
                      <Highlight text={row.key} query={q} />
                      <span className="text-fg-subtle">:</span>
                    </span>
                  ) : null}
                  {row.count ? (
                    <span className="flex items-center gap-1.5 text-fg-subtle">
                      <span>{isOpen ? bracket[0] : `${bracket[0]}…${bracket[1]}`}</span>
                      {!isOpen ? <span className="rounded-full bg-sunken px-1.5 py-px text-[10px] text-fg-muted tabular-nums group-hover/row:bg-border/60">{summary}</span> : null}
                    </span>
                  ) : row.kind === "object" || row.kind === "array" ? (
                    <span className="text-fg-subtle">{bracket[0] + bracket[1]}</span>
                  ) : (
                    <span className={cn("whitespace-pre", VALUE_TONE[row.kind])} title={row.kind === "string" && (row.value as string).length > maxStringLength ? (row.value as string) : undefined}>
                      <Highlight text={summary} query={q} />
                    </span>
                  )}
                  <span className="ml-auto flex shrink-0 items-center gap-0.5 pl-3 opacity-0 transition-opacity duration-[70ms] group-hover/row:opacity-100 group-focus-within/row:opacity-100">
                    {(["value", "path"] as const).map((kind) => {
                      const done = copied === `${row.path}:${kind}`
                      const Icon = done ? CheckIcon : kind === "value" ? CopyIcon : Link2Icon
                      return (
                        <button
                          key={kind}
                          type="button"
                          aria-label={done ? "Copied" : kind === "value" ? "Copy value" : `Copy path ${row.path}`}
                          title={done ? "Copied" : kind === "value" ? "Copy value" : `Copy path ${row.path}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            copy(row, kind)
                          }}
                          onKeyDown={(e) => e.stopPropagation()}
                          className={cn(
                            "grid size-5 place-items-center rounded-md outline-none transition-colors duration-[70ms] hover:bg-border/70 focus-visible:ring-2 focus-visible:ring-accent",
                            done ? "text-success" : "text-fg-subtle hover:text-fg"
                          )}
                        >
                          <Icon className="size-3" />
                        </button>
                      )
                    })}
                  </span>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="px-2 py-6 text-center text-[0.8125rem] text-fg-subtle">No keys or values match “{query.trim()}”</p>
        )}
      </div>
      <p aria-live="polite" className="sr-only">{copied ? `Copied ${copied.endsWith(":path") ? "path" : "value"}` : ""}</p>
    </div>
  )
}

export { JsonViewer }
export type { JsonViewerProps }
