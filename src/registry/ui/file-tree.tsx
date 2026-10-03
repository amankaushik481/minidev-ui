"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  ChevronRightIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileCogIcon,
  FileIcon,
  FileJsonIcon,
  FileLockIcon,
  FileTerminalIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  HashIcon,
  ImageIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

/** A code editor style file explorer with file icons, git status, a filter field and full tree keyboard support. */
type GitStatus = "M" | "A" | "D" | "U"

type FileTreeNode = {
  name: string
  /** Present (even empty) for folders. */
  children?: FileTreeNode[]
  /** Git status letter: M modified, A added, D deleted, U untracked. */
  status?: GitStatus
}

type FileTreeProps = {
  /** Nested files and folders. Paths are built from names joined by "/". */
  data?: FileTreeNode[]
  /** Folder paths open on first render. */
  defaultExpanded?: string[]
  /** Controlled selected path. */
  selected?: string
  defaultSelected?: string
  /** The file open in the editor. Defaults to the last selected file. */
  activePath?: string
  /** Called with the path of a file or folder when it is selected. */
  onSelect?: (path: string) => void
  /** Show the filter field above the tree. */
  searchable?: boolean
  /** Show git status letters and folder change dots. */
  showStatus?: boolean
  /** Sort folders first, then names alphabetically. */
  sort?: boolean
  /** Header title, usually the project name. Pass an empty string to hide the header. */
  title?: string
  "aria-label"?: string
  className?: string
}

const SAMPLE: FileTreeNode[] = [
  {
    name: "app",
    children: [
      { name: "api", children: [{ name: "invoices", children: [{ name: "route.ts", status: "A" }] }] },
      {
        name: "dashboard",
        children: [
          { name: "invoices", children: [{ name: "page.tsx" }, { name: "[id]", children: [{ name: "page.tsx" }] }] },
          { name: "loading.tsx" },
          { name: "page.tsx", status: "M" },
        ],
      },
      { name: "favicon.ico" },
      { name: "globals.css", status: "M" },
      { name: "layout.tsx" },
      { name: "page.tsx" },
    ],
  },
  {
    name: "components",
    children: [
      {
        name: "ui",
        children: [
          { name: "button.tsx" },
          { name: "card.tsx" },
          { name: "dialog.tsx", status: "M" },
          { name: "invoice-table.tsx", status: "A" },
        ],
      },
      { name: "site-header.tsx" },
    ],
  },
  { name: "lib", children: [{ name: "db.ts" }, { name: "legacy-auth.ts", status: "D" }, { name: "utils.ts" }] },
  { name: "public", children: [{ name: "logo.svg" }, { name: "og.png" }] },
  { name: ".env.example" },
  { name: "next.config.ts" },
  { name: "package.json", status: "M" },
  { name: "pnpm-lock.yaml", status: "M" },
  { name: "README.md" },
  { name: "tsconfig.json" },
]

const STATUS: Record<GitStatus, { text: string; dot: string; label: string }> = {
  M: { text: "text-[color-mix(in_oklch,var(--warning)_84%,var(--fg))]", dot: "bg-warning", label: "modified" },
  A: { text: "text-success", dot: "bg-success", label: "added" },
  U: { text: "text-success", dot: "bg-success", label: "untracked" },
  D: { text: "text-danger", dot: "bg-danger", label: "deleted" },
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const EXIT = { duration: 0.16, ease: [0.3, 0, 0.8, 0.15] } as const
const INDENT = 14
const PAD = 8

function fileIcon(name: string): { Icon: React.ElementType; tone: string } {
  const lower = name.toLowerCase()
  const ext = lower.includes(".") ? lower.slice(lower.lastIndexOf(".") + 1) : ""
  if (/(^|[.-])lock(\.|$)|lock\.ya?ml$|\.lockb$/.test(lower)) return { Icon: FileLockIcon, tone: "text-fg-subtle" }
  if (lower.startsWith(".env") || lower.startsWith(".git") || /\.config\.[cm]?[jt]s$/.test(lower) || ["yaml", "yml", "toml", "ini"].includes(ext))
    return { Icon: FileCogIcon, tone: "text-fg-subtle" }
  if (["ts", "tsx", "mts", "cts"].includes(ext)) return { Icon: FileCodeIcon, tone: "text-info" }
  if (["js", "jsx", "mjs", "cjs"].includes(ext)) return { Icon: FileCodeIcon, tone: "text-warning" }
  if (["json", "jsonc"].includes(ext)) return { Icon: FileJsonIcon, tone: "text-warning" }
  if (["css", "scss", "sass", "less"].includes(ext)) return { Icon: HashIcon, tone: "text-accent-fg" }
  if (["md", "mdx", "txt", "rst"].includes(ext)) return { Icon: FileTextIcon, tone: "text-fg-muted" }
  if (["png", "jpg", "jpeg", "gif", "svg", "webp", "avif", "ico"].includes(ext)) return { Icon: ImageIcon, tone: "text-success" }
  if (["sh", "bash", "zsh"].includes(ext)) return { Icon: FileTerminalIcon, tone: "text-fg-muted" }
  if (["sql", "prisma", "db"].includes(ext)) return { Icon: DatabaseIcon, tone: "text-info" }
  return { Icon: FileIcon, tone: "text-fg-subtle" }
}

type Flat = {
  path: string
  name: string
  depth: number
  parent: string | null
  isFolder: boolean
  status?: GitStatus
  /** Rolled up status of descendants, for folders. */
  rollup?: GitStatus
  posinset: number
  setsize: number
  children: Flat[]
}

function build(nodes: FileTreeNode[], sort: boolean, parent: string | null = null, depth = 1): Flat[] {
  const list = sort
    ? [...nodes].sort((a, b) => Number(!!b.children) - Number(!!a.children) || a.name.localeCompare(b.name, "en", { sensitivity: "base" }))
    : nodes
  return list.map((n, i) => {
    const path = parent ? `${parent}/${n.name}` : n.name
    const children = n.children ? build(n.children, sort, path, depth + 1) : []
    const statuses = new Set<GitStatus>()
    for (const c of children) {
      if (c.status) statuses.add(c.status)
      if (c.rollup) statuses.add(c.rollup)
    }
    const rollup: GitStatus | undefined = statuses.size === 0 ? undefined : statuses.size === 1 ? [...statuses][0] : "M"
    return { path, name: n.name, depth, parent, isFolder: !!n.children, status: n.status, rollup, posinset: i + 1, setsize: list.length, children }
  })
}

/** Keep matches and their ancestors. Returns the pruned tree plus folders to open. */
function filterTree(nodes: Flat[], q: string, open: Set<string>): Flat[] {
  const out: Flat[] = []
  for (const n of nodes) {
    const kids = filterTree(n.children, q, open)
    const hit = n.name.toLowerCase().includes(q)
    if (hit || kids.length) {
      if (kids.length) open.add(n.path)
      out.push({ ...n, children: kids })
    }
  }
  return out
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
 * A code editor style file explorer. Folders spring open, files get icons by
 * extension and optional git status letters, indent guides light up the
 * branch you are in, and the filter field auto-expands every match. Full
 * WAI-ARIA tree keyboard support: arrows, Home and End, Enter and typeahead.
 */
function FileTree({
  data = SAMPLE,
  defaultExpanded = ["app", "app/dashboard", "components"],
  selected: selectedProp,
  defaultSelected = "app/dashboard/page.tsx",
  activePath: activeProp,
  onSelect,
  searchable = true,
  showStatus = true,
  sort = true,
  title = "lumen-web",
  "aria-label": ariaLabel = "Files",
  className,
}: FileTreeProps) {
  const reduce = useReducedMotion()
  const treeId = React.useId()
  const tree = React.useMemo(() => build(data, sort), [data, sort])
  const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded))
  const [innerSelected, setInnerSelected] = React.useState(defaultSelected)
  const selected = selectedProp ?? innerSelected
  const [innerActive, setInnerActive] = React.useState(defaultSelected)
  const active = activeProp ?? innerActive
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  const [focusPath, setFocusPath] = React.useState<string | null>(null)
  const refs = React.useRef(new Map<string, HTMLLIElement>())
  const typeahead = React.useRef({ buf: "", t: 0 as ReturnType<typeof setTimeout> | 0 })

  const index = React.useMemo(() => {
    const m = new Map<string, Flat>()
    const walk = (ns: Flat[]) => ns.forEach((n) => (m.set(n.path, n), walk(n.children)))
    walk(tree)
    return m
  }, [tree])

  const { nodes, open } = React.useMemo(() => {
    if (!q) return { nodes: tree, open: expanded }
    const o = new Set<string>()
    return { nodes: filterTree(tree, q, o), open: o }
  }, [tree, q, expanded])

  const visible = React.useMemo(() => {
    const out: Flat[] = []
    const walk = (ns: Flat[]) => {
      for (const n of ns) {
        out.push(n)
        if (n.isFolder && open.has(n.path)) walk(n.children)
      }
    }
    walk(nodes)
    return out
  }, [nodes, open])

  const matchCount = React.useMemo(() => {
    if (!q) return 0
    let c = 0
    const walk = (ns: Flat[]) => ns.forEach((n) => (n.name.toLowerCase().includes(q) && c++, walk(n.children)))
    walk(nodes)
    return c
  }, [nodes, q])

  const tabStop = visible.find((n) => n.path === focusPath)?.path ?? visible.find((n) => n.path === selected)?.path ?? visible[0]?.path
  const branch = index.get(focusPath ?? selected)?.parent ?? null

  const focus = (path: string | undefined) => {
    if (!path) return
    setFocusPath(path)
    refs.current.get(path)?.focus()
  }

  const toggle = (path: string, to?: boolean) => {
    if (q) return
    const want = to ?? !expanded.has(path)
    if (!want && focusPath?.startsWith(path + "/")) focus(path)
    setExpanded((prev) => {
      const next = new Set(prev)
      if (want) next.add(path)
      else next.delete(path)
      return next
    })
  }

  const choose = (n: Flat) => {
    if (selectedProp === undefined) setInnerSelected(n.path)
    if (!n.isFolder && activeProp === undefined) setInnerActive(n.path)
    onSelect?.(n.path)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const cur = visible.findIndex((n) => n.path === (focusPath ?? tabStop))
    const n = visible[cur]
    if (!n) return
    const key = e.key
    if (key === "ArrowDown") { e.preventDefault(); focus(visible[Math.min(visible.length - 1, cur + 1)]?.path) }
    else if (key === "ArrowUp") { e.preventDefault(); focus(visible[Math.max(0, cur - 1)]?.path) }
    else if (key === "Home") { e.preventDefault(); focus(visible[0]?.path) }
    else if (key === "End") { e.preventDefault(); focus(visible[visible.length - 1]?.path) }
    else if (key === "ArrowRight") {
      e.preventDefault()
      if (n.isFolder && !open.has(n.path)) toggle(n.path, true)
      else if (n.isFolder && n.children.length) focus(visible[cur + 1]?.path)
    } else if (key === "ArrowLeft") {
      e.preventDefault()
      if (n.isFolder && open.has(n.path) && !q) toggle(n.path, false)
      else if (n.parent) focus(n.parent)
    } else if (key === "Enter" || key === " ") {
      e.preventDefault()
      choose(n)
      if (n.isFolder) toggle(n.path)
    } else if (key === "*") {
      e.preventDefault()
      const sibs = visible.filter((v) => v.parent === n.parent && v.isFolder).map((v) => v.path)
      if (!q) setExpanded((prev) => new Set([...prev, ...sibs]))
    } else if (key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey && /\S/.test(key)) {
      const ta = typeahead.current
      if (ta.t) clearTimeout(ta.t)
      ta.buf += key.toLowerCase()
      ta.t = setTimeout(() => (ta.buf = ""), 500)
      const order = [...visible.slice(cur + (ta.buf.length === 1 ? 1 : 0)), ...visible.slice(0, cur + (ta.buf.length === 1 ? 1 : 0))]
      const hit = order.find((v) => v.name.toLowerCase().startsWith(ta.buf))
      if (hit) focus(hit.path)
    }
  }

  const changes = React.useMemo(() => {
    let c = 0
    index.forEach((n) => n.status && c++)
    return c
  }, [index])

  const renderNodes = (ns: Flat[]): React.ReactNode =>
    ns.map((n) => {
      const isOpen = n.isFolder && open.has(n.path)
      const isSelected = n.path === selected
      const isActive = !n.isFolder && n.path === active
      const { Icon, tone } = n.isFolder ? { Icon: isOpen ? FolderOpenIcon : FolderIcon, tone: "text-fg-subtle" } : fileIcon(n.name)
      const st = showStatus ? n.status : undefined
      const roll = showStatus && n.isFolder && !isOpen ? n.rollup : undefined
      const label = [n.name, st ? STATUS[st].label : roll ? "contains changes" : null].filter(Boolean).join(", ")
      return (
        <li
          key={n.path}
          ref={(el) => {
            if (el) refs.current.set(n.path, el)
            else refs.current.delete(n.path)
          }}
          role="treeitem"
          aria-label={label}
          aria-level={n.depth}
          aria-posinset={n.posinset}
          aria-setsize={n.setsize}
          aria-expanded={n.isFolder ? isOpen : undefined}
          aria-selected={isSelected}
          aria-current={isActive ? "page" : undefined}
          tabIndex={n.path === tabStop ? 0 : -1}
          onFocus={(e) => {
            if (e.target === e.currentTarget) setFocusPath(n.path)
          }}
          className="outline-none"
        >
          <div
            data-slot="file-tree-row"
            onClick={() => {
              focus(n.path)
              choose(n)
              if (n.isFolder) toggle(n.path)
            }}
            className={cn(
              "relative flex h-7 cursor-pointer items-center gap-1 rounded-md pr-2 text-[0.8125rem] select-none",
              "transition-colors duration-[70ms] ease-hairline",
              "[:focus-visible>&]:ring-2 [:focus-visible>&]:ring-accent [:focus-visible>&]:ring-inset",
              isSelected ? "bg-accent-soft text-fg" : "text-fg-muted hover:bg-sunken hover:text-fg"
            )}
            style={{ paddingLeft: PAD + (n.depth - 1) * INDENT }}
          >
            {isActive ? <span aria-hidden className="absolute top-1.5 bottom-1.5 left-0.5 w-0.5 rounded-full bg-accent" /> : null}
            {n.isFolder ? (
              <ChevronRightIcon
                aria-hidden
                className={cn(
                  "size-4 shrink-0 text-fg-subtle transition-transform duration-[140ms] ease-hairline motion-reduce:transition-none",
                  isOpen && "rotate-90"
                )}
              />
            ) : (
              <span aria-hidden className="size-4 shrink-0" />
            )}
            <Icon aria-hidden className={cn("size-4 shrink-0", isSelected && n.isFolder ? "text-accent-fg" : tone)} />
            <span
              className={cn(
                "ml-1 min-w-0 flex-1 truncate",
                isActive && "font-medium text-fg",
                st && STATUS[st].text,
                st === "D" && "line-through decoration-1"
              )}
            >
              <Highlight text={n.name} query={q} />
            </span>
            {st ? (
              <span aria-hidden title={STATUS[st].label} className={cn("w-3 shrink-0 text-center font-mono text-[11px] font-medium", STATUS[st].text)}>
                {st}
              </span>
            ) : roll ? (
              <span aria-hidden className="grid w-3 shrink-0 place-items-center">
                <span className={cn("size-1.5 rounded-full", STATUS[roll].dot)} />
              </span>
            ) : null}
          </div>
          {n.isFolder ? (
            <AnimatePresence initial={false}>
              {isOpen && n.children.length ? (
                <motion.ul
                  key="group"
                  role="group"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1, transition: reduce ? { duration: 0 } : MORPH }}
                  exit={{ height: 0, opacity: 0, transition: reduce ? { duration: 0 } : EXIT }}
                  className="relative overflow-hidden"
                >
                  <span
                    aria-hidden
                    data-slot="file-tree-guide"
                    className={cn(
                      "pointer-events-none absolute top-0 bottom-0 w-px transition-colors duration-[140ms]",
                      branch === n.path ? "bg-accent/60" : "bg-fg/15"
                    )}
                    style={{ left: PAD + (n.depth - 1) * INDENT + 8 }}
                  />
                  {renderNodes(n.children)}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          ) : null}
        </li>
      )
    })

  return (
    <div data-slot="file-tree" className={cn("flex w-full max-w-72 flex-col rounded-xl border border-border bg-surface shadow-raised", className)}>
      {title ? (
        <div className="flex h-10 items-center justify-between gap-2 border-b border-border px-3">
          <span className="truncate font-mono text-[11px] font-medium tracking-[0.06em] text-fg-muted uppercase">{title}</span>
          {showStatus && changes ? (
            <span className="rounded-full bg-sunken px-2 py-0.5 font-mono text-[10px] text-fg-subtle tabular-nums">
              {changes} {changes === 1 ? "change" : "changes"}
            </span>
          ) : null}
        </div>
      ) : null}
      {searchable ? (
        <div className="px-2 pt-2">
          <div className="relative">
            <SearchIcon aria-hidden className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-fg-subtle" />
            <input
              type="search"
              value={query}
              placeholder="Filter files"
              aria-label="Filter files"
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
                aria-label="Clear filter"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-1 grid size-6 -translate-y-1/2 place-items-center rounded-md text-fg-subtle outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
              >
                <XIcon className="size-3.5" />
              </button>
            ) : null}
          </div>
          <p aria-live="polite" className="sr-only">
            {q ? `${matchCount} ${matchCount === 1 ? "match" : "matches"}` : ""}
          </p>
        </div>
      ) : null}
      <div className="p-2">
        {visible.length ? (
          <ul id={treeId} role="tree" aria-label={ariaLabel} onKeyDown={onKeyDown} className="outline-none">
            {renderNodes(nodes)}
          </ul>
        ) : (
          <p className="px-2 py-6 text-center text-[0.8125rem] text-fg-subtle">No files match “{query.trim()}”</p>
        )}
      </div>
    </div>
  )
}

export { FileTree }
export type { FileTreeProps, FileTreeNode, GitStatus }
