"use client"
import * as React from "react"
import { ChevronRightIcon, FileCodeIcon, FileJsonIcon, FileTextIcon, FolderOpenIcon, HashIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** Split panes with draggable, keyboard operable handles, min and max sizes, snap to collapse and nested groups in either direction. */
type Orientation = "horizontal" | "vertical"

type ResizablePanelProps = {
  /** Starting size in percent of the group. Panels without one share what is left. */
  defaultSize?: number
  /** Smallest size in percent while dragging. */
  minSize?: number
  /** Largest size in percent. */
  maxSize?: number
  /** Snap to `collapsedSize` when dragged well below `minSize`. */
  collapsible?: boolean
  /** Size in percent when collapsed. */
  collapsedSize?: number
  /** Called when the panel collapses or expands. */
  onCollapse?: (collapsed: boolean) => void
  children?: React.ReactNode
  className?: string
}

type ResizableHandleProps = {
  /** Accessible name of the separator. */
  "aria-label"?: string
  /** Show the grip pill at the middle of the handle at rest, not only on hover. */
  withGrip?: boolean
  className?: string
}

type ResizablePanelsProps = {
  /** Panels and handles: `ResizablePanel` and `ResizableHandle` children, nestable. Leave empty for the editor demo. */
  children?: React.ReactNode
  /** Direction the panels are laid out in. */
  orientation?: Orientation
  /** Controlled sizes in percent, one per panel. */
  sizes?: number[]
  /** Starting sizes in percent when uncontrolled. Overrides each panel's `defaultSize`. */
  defaultSizes?: number[]
  /** Fires with the new sizes on every drag, key press or snap. */
  onSizesChange?: (sizes: number[]) => void
  /** Percent moved per arrow key. Shift multiplies by five. */
  keyboardStep?: number
  /** Two panel shorthand: content of the first panel. */
  left?: React.ReactNode
  /** Two panel shorthand: content of the second panel. */
  right?: React.ReactNode
  /** Two panel shorthand: starting size of the first panel in percent. */
  initial?: number
  className?: string
}

type PanelConfig = { min: number; max: number; def?: number; collapsible: boolean; collapsedSize: number }

type GroupContextValue = {
  id: string
  orientation: Orientation
  sizes: number[]
  panels: PanelConfig[]
  defaults: number[]
  step: number
  active: number | null
  rootRef: React.RefObject<HTMLDivElement | null>
  commit: (next: number[]) => void
  setActive: (i: number | null) => void
}

const GroupContext = React.createContext<GroupContextValue | null>(null)
const PanelIndexContext = React.createContext(-1)
const HandleIndexContext = React.createContext(-1)

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** True once the element is narrower than `max` px. False during SSR. */
function useNarrow(ref: React.RefObject<HTMLElement | null>, max: number) {
  const [narrow, setNarrow] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver((entries) => setNarrow(entries[0].contentRect.width < max))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, max])
  return narrow
}
const round = (v: number) => Math.round(v * 100) / 100

/** Spread sizes so they sum to 100: explicit defaults are scaled only when they overflow; the rest share the remainder. */
function normalize(panels: PanelConfig[], given?: number[]): number[] {
  const n = panels.length
  if (!n) return []
  const explicit = panels.map((p, i) => given?.[i] ?? p.def)
  const known = explicit.filter((v): v is number => typeof v === "number")
  const sum = known.reduce((a, b) => a + b, 0)
  const unknown = n - known.length
  let out: number[]
  if (unknown === 0) out = explicit.map((v) => (sum ? ((v as number) / sum) * 100 : 100 / n))
  else {
    const rest = Math.max(0, 100 - sum)
    out = explicit.map((v) => (typeof v === "number" ? v : rest / unknown))
    const total = out.reduce((a, b) => a + b, 0)
    if (total !== 100) out = out.map((v) => (v / total) * 100)
  }
  return out.map(round)
}

/** Move the boundary between panel i and i+1 by `delta` percent, honouring min, max and collapse snapping. */
function resizePair(sizes: number[], i: number, delta: number, panels: PanelConfig[]): number[] | null {
  const pa = panels[i]
  const pb = panels[i + 1]
  if (!pa || !pb) return null
  const total = sizes[i] + sizes[i + 1]
  const settle = (size: number, p: PanelConfig) => {
    if (p.collapsible) {
      const threshold = p.collapsedSize + (p.min - p.collapsedSize) / 2
      if (size < threshold) return p.collapsedSize
      if (size < p.min) return p.min
    } else if (size < p.min) return p.min
    return Math.min(size, p.max)
  }
  const valid = (size: number, p: PanelConfig) => (p.collapsible && Math.abs(size - p.collapsedSize) < 0.001) || (size >= p.min - 0.001 && size <= p.max + 0.001)
  let a = settle(sizes[i] + delta, pa)
  let b = settle(total - a, pb)
  a = total - b
  if (!valid(a, pa)) {
    a = clamp(a, pa.min, pa.max)
    b = total - a
    if (!valid(b, pb)) return null
  }
  const next = sizes.slice()
  next[i] = round(a)
  next[i + 1] = round(b)
  return next
}

function ResizablePanel({ defaultSize, minSize, maxSize, collapsible, collapsedSize, onCollapse, children, className }: ResizablePanelProps) {
  void defaultSize
  void minSize
  void maxSize
  void collapsedSize
  const group = React.useContext(GroupContext)
  const index = React.useContext(PanelIndexContext)
  const size = group?.sizes[index] ?? 100
  const config = group?.panels[index]
  const collapsed = Boolean(collapsible && config && Math.abs(size - config.collapsedSize) < 0.001)
  const wasCollapsed = React.useRef(collapsed)
  React.useEffect(() => {
    if (wasCollapsed.current !== collapsed) {
      wasCollapsed.current = collapsed
      onCollapse?.(collapsed)
    }
  }, [collapsed, onCollapse])
  return (
    <div
      id={group ? `${group.id}-panel-${index}` : undefined}
      data-slot="resizable-panel"
      data-collapsed={collapsed || undefined}
      className={cn("relative min-h-0 min-w-0 overflow-hidden", className)}
      style={{ flexGrow: size, flexShrink: 1, flexBasis: 0 }}
    >
      {children}
    </div>
  )
}

function ResizableHandle({ "aria-label": ariaLabel, withGrip = false, className }: ResizableHandleProps) {
  const group = React.useContext(GroupContext)
  const index = React.useContext(HandleIndexContext)
  const drag = React.useRef<{ pos: number; sizes: number[]; span: number } | null>(null)
  if (!group || index < 0 || index >= group.panels.length - 1) return null
  const horizontal = group.orientation === "horizontal"
  const before = group.panels[index]
  const size = group.sizes[index]
  const active = group.active === index

  const move = (delta: number, from = group.sizes) => {
    const next = resizePair(from, index, delta, group.panels)
    if (next) group.commit(next)
  }
  const reset = () => {
    const pair = group.defaults[index] + group.defaults[index + 1]
    const total = group.sizes[index] + group.sizes[index + 1]
    const want = pair ? (group.defaults[index] / pair) * total : total / 2
    move(want - group.sizes[index])
  }

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation={horizontal ? "vertical" : "horizontal"}
      aria-label={ariaLabel ?? `Resize ${horizontal ? "columns" : "rows"}`}
      aria-controls={`${group.id}-panel-${index}`}
      aria-valuenow={Math.round(size)}
      aria-valuemin={before.collapsible ? before.collapsedSize : before.min}
      aria-valuemax={before.max}
      data-slot="resizable-handle"
      data-active={active || undefined}
      onPointerDown={(e) => {
        if (e.button !== 0) return
        e.preventDefault()
        const root = group.rootRef.current
        if (!root) return
        const rect = root.getBoundingClientRect()
        const own = e.currentTarget.getBoundingClientRect()
        const handles = root.querySelectorAll(`:scope > [data-slot="resizable-handle"]`).length
        const span = (horizontal ? rect.width : rect.height) - handles * (horizontal ? own.width : own.height)
        drag.current = { pos: horizontal ? e.clientX : e.clientY, sizes: group.sizes.slice(), span: Math.max(1, span) }
        e.currentTarget.setPointerCapture(e.pointerId)
        group.setActive(index)
      }}
      onPointerMove={(e) => {
        const d = drag.current
        if (!d) return
        const delta = (((horizontal ? e.clientX : e.clientY) - d.pos) / d.span) * 100
        move(delta, d.sizes)
      }}
      onPointerUp={() => {
        drag.current = null
        group.setActive(null)
      }}
      onPointerCancel={() => {
        drag.current = null
        group.setActive(null)
      }}
      onDoubleClick={reset}
      onKeyDown={(e) => {
        const step = group.step * (e.shiftKey ? 5 : 1)
        const dec = horizontal ? "ArrowLeft" : "ArrowUp"
        const inc = horizontal ? "ArrowRight" : "ArrowDown"
        if (e.key === dec) move(-step)
        else if (e.key === inc) move(step)
        else if (e.key === "Home") move(-100)
        else if (e.key === "End") move(100)
        else if (e.key === "Enter" && before.collapsible) {
          const collapsed = Math.abs(size - before.collapsedSize) < 0.001
          move(collapsed ? group.defaults[index] - size : before.collapsedSize - size)
        } else return
        e.preventDefault()
      }}
      className={cn(
        "group/handle relative z-10 flex shrink-0 touch-none items-center justify-center outline-none select-none",
        horizontal ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute bg-border transition-[background-color,width,height] duration-[140ms] ease-hairline",
          horizontal ? "inset-y-0 left-1/2 w-px -translate-x-1/2" : "inset-x-0 top-1/2 h-px -translate-y-1/2",
          "group-hover/handle:bg-border-strong group-focus-visible/handle:bg-accent group-data-[active]/handle:bg-accent",
          horizontal ? "group-focus-visible/handle:w-0.5 group-data-[active]/handle:w-0.5" : "group-focus-visible/handle:h-0.5 group-data-[active]/handle:h-0.5"
        )}
      />
      <span
        aria-hidden
        data-slot="resizable-handle-thumb"
        className={cn(
          "relative rounded-full bg-border-strong transition-[opacity,background-color] duration-[140ms] ease-hairline",
          horizontal ? "h-6 w-1" : "h-1 w-6",
          withGrip ? "opacity-100" : "opacity-0 group-hover/handle:opacity-100 group-focus-visible/handle:opacity-100 group-data-[active]/handle:opacity-100",
          "group-focus-visible/handle:bg-accent group-data-[active]/handle:bg-accent"
        )}
      />
    </div>
  )
}

function isPanel(el: React.ReactNode): el is React.ReactElement<ResizablePanelProps> {
  return React.isValidElement(el) && el.type === ResizablePanel
}

/**
 * Split panes for editors, inspectors and dashboards. Drag a handle to
 * resize; the hairline swells to accent under the hand. Arrow keys move it,
 * Shift jumps, Home and End slam it, Enter collapses a collapsible pane and
 * a double click resets the pair. Controlled or uncontrolled sizes, nothing
 * is persisted. With no children it renders a three pane editor demo.
 */
function ResizablePanels({
  children,
  orientation = "horizontal",
  sizes: sizesProp,
  defaultSizes,
  onSizesChange,
  keyboardStep = 2,
  left,
  right,
  initial = 50,
  className,
}: ResizablePanelsProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9-]/g, "")
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState<number | null>(null)
  const demo = !children && left === undefined && right === undefined
  const narrow = useNarrow(rootRef, 560)
  /* The zero prop demo stacks its panes on narrow screens. */
  const dir: Orientation = demo && narrow ? "vertical" : orientation

  /* Children are inspected directly, so the built in layouts are arrays of panels and handles, not a wrapper element. */
  const content =
    children ??
    (left !== undefined || right !== undefined
      ? [
          <ResizablePanel key="left" defaultSize={initial} minSize={20} maxSize={80} className="overflow-auto p-4">{left}</ResizablePanel>,
          <ResizableHandle key="handle" />,
          <ResizablePanel key="right" className="overflow-auto p-4">{right}</ResizablePanel>,
        ]
      : editorDemo())
  const kids = React.Children.toArray(content)
  const panels = kids.filter(isPanel).map<PanelConfig>((el) => ({
    min: Math.max(0, el.props.minSize ?? 10),
    max: Math.min(100, el.props.maxSize ?? 100),
    def: el.props.defaultSize,
    collapsible: Boolean(el.props.collapsible),
    collapsedSize: Math.max(0, el.props.collapsedSize ?? 0),
  }))
  const signature = panels.map((p) => `${p.min}/${p.max}/${p.def ?? "-"}/${p.collapsible ? 1 : 0}/${p.collapsedSize}`).join("|")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stablePanels = React.useMemo(() => panels, [signature])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaults = React.useMemo(() => normalize(stablePanels, defaultSizes), [stablePanels, defaultSizes?.join(",")])
  const [inner, setInner] = React.useState<number[]>(defaults)
  const raw = sizesProp ?? inner
  const sizes = raw.length === stablePanels.length ? raw : defaults

  const commit = React.useCallback(
    (next: number[]) => {
      if (sizesProp === undefined) setInner(next)
      onSizesChange?.(next)
    },
    [sizesProp, onSizesChange]
  )

  const ctx = React.useMemo<GroupContextValue>(
    () => ({ id, orientation: dir, sizes, panels: stablePanels, defaults, step: keyboardStep, active, rootRef, commit, setActive }),
    [id, dir, sizes, stablePanels, defaults, keyboardStep, active, commit]
  )

  let panelIndex = 0
  const rendered = kids.map((child, i) => {
    if (isPanel(child)) {
      const index = panelIndex++
      return (
        <PanelIndexContext.Provider key={child.key ?? `p${i}`} value={index}>
          {child}
        </PanelIndexContext.Provider>
      )
    }
    if (React.isValidElement(child) && child.type === ResizableHandle) {
      return (
        <HandleIndexContext.Provider key={child.key ?? `h${i}`} value={panelIndex - 1}>
          {child}
        </HandleIndexContext.Provider>
      )
    }
    return child
  })

  return (
    <GroupContext.Provider value={ctx}>
      <div
        ref={rootRef}
        data-slot="resizable-panels"
        data-orientation={dir}
        data-dragging={active !== null || undefined}
        className={cn(
          "flex h-full w-full min-w-0 overflow-hidden",
          dir === "vertical" ? "flex-col" : "flex-row",
          active !== null && (dir === "vertical" ? "cursor-row-resize select-none" : "cursor-col-resize select-none"),
          demo && "max-w-4xl rounded-xl border border-border bg-surface text-fg shadow-raised",
          demo && (narrow ? "h-[30rem]" : "h-80"),
          className
        )}
      >
        {rendered}
      </div>
    </GroupContext.Provider>
  )
}

/* ── Demo content: a slice of the Lumen editor built from plain divs ──────── */

const FILES: { name: string; depth: number; icon: React.ElementType; tone: string; active?: boolean }[] = [
  { name: "app", depth: 0, icon: FolderOpenIcon, tone: "text-fg-subtle" },
  { name: "invoices", depth: 1, icon: FolderOpenIcon, tone: "text-fg-subtle" },
  { name: "page.tsx", depth: 2, icon: FileCodeIcon, tone: "text-info", active: true },
  { name: "invoice-card.tsx", depth: 2, icon: FileCodeIcon, tone: "text-info" },
  { name: "layout.tsx", depth: 1, icon: FileCodeIcon, tone: "text-info" },
  { name: "globals.css", depth: 1, icon: HashIcon, tone: "text-accent-fg" },
  { name: "package.json", depth: 0, icon: FileJsonIcon, tone: "text-warning" },
  { name: "README.md", depth: 0, icon: FileTextIcon, tone: "text-fg-muted" },
]

const CODE: React.ReactNode[] = [
  <><span className="text-accent-fg">export</span> <span className="text-accent-fg">async function</span> <span className="text-info">InvoicePage</span>({"{"} params {"}"}) {"{"}</>,
  <>  <span className="text-accent-fg">const</span> invoice = <span className="text-accent-fg">await</span> lumen.invoices.<span className="text-info">get</span>(params.id)</>,
  <>  <span className="text-accent-fg">const</span> total = <span className="text-info">formatMoney</span>(invoice.total, invoice.currency)</>,
  <>  <span className="text-accent-fg">return</span> (</>,
  <>    {"<"}<span className="text-success">InvoiceCard</span></>,
  <>      number={"{"}invoice.number{"}"}</>,
  <>      customer={"{"}invoice.customer.name{"}"}</>,
  <>      total={"{"}total{"}"}</>,
  <>      status=<span className="text-warning">&quot;paid&quot;</span></>,
  <>    /{">"}</>,
  <>  )</>,
  <>{"}"}</>,
]

function PaneHeader({ children, meta }: { children: React.ReactNode; meta?: React.ReactNode }) {
  return (
    <div className="flex h-8 shrink-0 items-center justify-between gap-2 border-b border-border px-3">
      <span className="truncate font-mono text-[10px] font-medium tracking-[0.06em] text-fg-muted uppercase">{children}</span>
      {meta ? <span className="shrink-0 font-mono text-[10px] text-fg-subtle tabular-nums">{meta}</span> : null}
    </div>
  )
}

function editorDemo(): React.ReactNode[] {
  return [
    <ResizablePanel key="explorer" defaultSize={22} minSize={14} maxSize={40} collapsible collapsedSize={0}>
      <div className="flex h-full flex-col bg-sunken">
        <PaneHeader meta="8">Explorer</PaneHeader>
        <ul className="min-w-0 flex-1 space-y-px overflow-auto p-1.5">
          {FILES.map((f) => (
            <li
              key={f.name + f.depth}
              className={cn("flex h-6 items-center gap-1.5 truncate rounded-md pr-2 text-xs", f.active ? "bg-accent-soft text-fg" : "text-fg-muted")}
              style={{ paddingLeft: 6 + f.depth * 12 }}
            >
              {f.icon === FolderOpenIcon ? <ChevronRightIcon aria-hidden className="size-3 shrink-0 rotate-90 text-fg-subtle" /> : <span className="size-3 shrink-0" />}
              <f.icon aria-hidden className={cn("size-3.5 shrink-0", f.tone)} />
              <span className="truncate">{f.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </ResizablePanel>,
    <ResizableHandle key="h1" aria-label="Resize explorer" />,
    <ResizablePanel key="editor" defaultSize={48} minSize={30}>
      <ResizablePanels orientation="vertical">
        <ResizablePanel defaultSize={70} minSize={30}>
          <div className="flex h-full min-w-0 flex-col">
            <PaneHeader meta="TSX">app/invoices/page.tsx</PaneHeader>
            <pre className="min-w-0 flex-1 overflow-hidden p-3 font-mono text-[11.5px] leading-[1.7] text-fg">
              {CODE.map((line, i) => (
                <span key={i} className="flex gap-3 whitespace-pre">
                  <span className="w-4 shrink-0 text-right text-fg-subtle tabular-nums select-none">{i + 1}</span>
                  <span>{line}</span>
                </span>
              ))}
            </pre>
          </div>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize terminal" />
        <ResizablePanel defaultSize={30} minSize={16} collapsible collapsedSize={0}>
          <div className="flex h-full min-w-0 flex-col bg-sunken">
            <PaneHeader meta="zsh">Terminal</PaneHeader>
            <pre className="overflow-hidden p-3 font-mono text-[11px] leading-[1.7] whitespace-pre text-fg-muted">
              <span className="block"><span className="text-accent-fg">$</span> pnpm dev</span>
              <span className="block">  <span className="text-success">ready</span> on http://localhost:3000</span>
              <span className="block">  <span className="text-info">GET</span> /invoices/LUM-0147 <span className="text-fg-subtle">200 in 38ms</span></span>
            </pre>
          </div>
        </ResizablePanel>
      </ResizablePanels>
    </ResizablePanel>,
    <ResizableHandle key="h2" aria-label="Resize preview" />,
    <ResizablePanel key="preview" defaultSize={30} minSize={20}>
      <div className="flex h-full min-w-0 flex-col">
        <PaneHeader meta="Live">Preview</PaneHeader>
        <div className="min-w-0 flex-1 overflow-auto bg-bg p-3">
          <div className="min-w-0 rounded-lg border border-border bg-surface p-3 shadow-raised">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-mono text-[10px] text-fg-subtle">LUM-0147</span>
              <span className="shrink-0 rounded-full bg-success/15 px-1.5 py-px text-[10px] font-medium text-success">Paid</span>
            </div>
            <p className="mt-2 truncate text-xs font-medium text-fg">Northwind Traders</p>
            <p className="truncate text-[11px] text-fg-muted">12 seats, Lumen Pro</p>
            <p className="mt-3 text-lg font-medium tracking-[-0.01em] text-fg tabular-nums">$1,840.00</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-sunken">
              <div className="h-full w-full rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </ResizablePanel>,
  ]
}

export { ResizablePanels, ResizablePanel, ResizableHandle }
export type { ResizablePanelsProps, ResizablePanelProps, ResizableHandleProps }
