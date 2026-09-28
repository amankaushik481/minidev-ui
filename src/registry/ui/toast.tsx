"use client"
import * as React from "react"
import { AlertTriangleIcon, CheckIcon, InfoIcon, LoaderCircleIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Tone = "neutral" | "success" | "danger" | "warning" | "loading"

const ICON: Record<Tone, React.ReactNode> = {
  neutral: <InfoIcon className="size-3.5" />,
  success: <CheckIcon className="size-3.5" strokeWidth={2.5} />,
  danger: <XIcon className="size-3.5" strokeWidth={2.5} />,
  warning: <AlertTriangleIcon className="size-3.5" />,
  loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
}

const ICON_TONE: Record<Tone, string> = {
  neutral: "bg-sunken text-fg-muted",
  success: "bg-success text-white",
  danger: "bg-danger text-white",
  warning: "bg-warning text-[oklch(0.25_0.05_75)]",
  loading: "bg-accent-soft text-accent-fg",
}

/**
 * Toast — a single notification card: status glyph, title, optional
 * description and action. Use <Toaster /> + toast() for the stacked system.
 */
function Toast({
  title,
  description,
  tone = "neutral",
  action,
  onDismiss,
  className,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  tone?: Tone
  action?: { label: string; onClick: () => void }
  onDismiss?: () => void
  className?: string
}) {
  return (
    <div
      data-slot="toast"
      data-tone={tone}
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "group/toast relative flex w-[356px] max-w-full items-start gap-3 rounded-xl border border-border bg-raised p-3.5 pr-10 shadow-overlay",
        className
      )}
    >
      <span className={cn("mt-px grid size-5 shrink-0 place-items-center rounded-full", ICON_TONE[tone])}>{ICON[tone]}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.8125rem] font-medium text-fg">{title}</p>
        {description ? <p className="mt-0.5 text-[0.8125rem] leading-[1.5] text-fg-muted">{description}</p> : null}
        {action ? (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-2 inline-flex h-7 items-center rounded-md bg-ink px-2.5 text-xs font-medium text-on-ink shadow-ink outline-none hover:bg-ink-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-raised"
          >
            {action.label}
          </button>
        ) : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="absolute top-2.5 right-2.5 grid size-6 place-items-center rounded-md text-fg-subtle opacity-0 outline-none transition-opacity group-hover/toast:opacity-100 hover:bg-sunken hover:text-fg focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-accent"
        >
          <XIcon className="size-3.5" />
        </button>
      ) : null}
    </div>
  )
}

function ToastStack({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div data-slot="toast-stack" className={cn("flex flex-col gap-2", className)}>
      {children}
    </div>
  )
}

/* ── Toaster: a stacked, self-dismissing system ──────────────────────────── */

type ToastItem = {
  id: number
  title: React.ReactNode
  description?: React.ReactNode
  tone: Tone
  action?: { label: string; onClick: () => void }
  duration: number
}

type Listener = (items: ToastItem[]) => void
let items: ToastItem[] = []
let nextId = 1
const listeners = new Set<Listener>()
const emit = () => listeners.forEach((l) => l(items))

function push(t: Omit<ToastItem, "id" | "duration" | "tone"> & { tone?: Tone; duration?: number }) {
  const item: ToastItem = { id: nextId++, tone: "neutral", duration: 4000, ...t }
  items = [item, ...items].slice(0, 6)
  emit()
  return item.id
}

function update(id: number, patch: Partial<ToastItem>) {
  items = items.map((t) => (t.id === id ? { ...t, ...patch } : t))
  emit()
}

function dismiss(id: number) {
  items = items.filter((t) => t.id !== id)
  emit()
}

type Opts = { description?: React.ReactNode; action?: { label: string; onClick: () => void }; duration?: number }

/** Imperative API: toast("Saved"), toast.success(…), toast.error(…), toast.promise(p, {…}). */
const toast = Object.assign((title: React.ReactNode, o?: Opts) => push({ title, ...o }), {
  success: (title: React.ReactNode, o?: Opts) => push({ title, tone: "success", ...o }),
  error: (title: React.ReactNode, o?: Opts) => push({ title, tone: "danger", ...o }),
  warning: (title: React.ReactNode, o?: Opts) => push({ title, tone: "warning", ...o }),
  dismiss,
  promise<T>(p: Promise<T>, m: { loading: React.ReactNode; success: React.ReactNode | ((v: T) => React.ReactNode); error: React.ReactNode }) {
    const id = push({ title: m.loading, tone: "loading", duration: Infinity })
    p.then(
      (v) => update(id, { title: typeof m.success === "function" ? (m.success as (v: T) => React.ReactNode)(v) : m.success, tone: "success", duration: 4000 }),
      () => update(id, { title: m.error, tone: "danger", duration: 5000 })
    )
    return p
  },
})

function ToasterItem({ t, index, expanded, onHeight }: { t: ToastItem; index: number; expanded: boolean; onHeight: (id: number, h: number) => void; }) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useLayoutEffect(() => {
    if (ref.current) onHeight(t.id, ref.current.offsetHeight)
  })
  React.useEffect(() => {
    if (!Number.isFinite(t.duration) || expanded) return
    const h = window.setTimeout(() => dismiss(t.id), t.duration)
    return () => window.clearTimeout(h)
  }, [t.id, t.duration, t.tone, expanded])
  return (
    <div ref={ref} data-index={index} className="absolute right-0 bottom-0 w-full animate-[rise-in_260ms_var(--ease-hairline)_both]">
      <Toast className="w-full" title={t.title} description={t.description} tone={t.tone} action={t.action} onDismiss={() => dismiss(t.id)} />
    </div>
  )
}

/**
 * Toaster — mount once. Toasts stack like cards; hover to fan them out.
 * Timers pause while expanded.
 */
function Toaster({ className }: { className?: string }) {
  const [list, setList] = React.useState<ToastItem[]>(items)
  const [expanded, setExpanded] = React.useState(false)
  const [heights, setHeights] = React.useState<Record<number, number>>({})
  React.useEffect(() => {
    const l: Listener = (x) => setList([...x])
    listeners.add(l)
    return () => { listeners.delete(l) }
  }, [])
  const onHeight = React.useCallback((id: number, h: number) => setHeights((s) => (s[id] === h ? s : { ...s, [id]: h })), [])
  const visible = list.slice(0, expanded ? 6 : 3)
  let offset = 0
  return (
    <ol
      data-slot="toaster"
      aria-live="polite"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      className={cn("fixed right-4 bottom-4 z-[60] w-[356px] max-w-[calc(100vw-2rem)]", className)}
      style={{ height: expanded ? visible.reduce((a, t) => a + (heights[t.id] ?? 72) + 8, 0) : (heights[visible[0]?.id] ?? 0) + Math.min(visible.length - 1, 2) * 10 }}
    >
      {visible.map((t, i) => {
        const y = expanded ? -offset : -i * 10
        const scale = expanded ? 1 : 1 - i * 0.05
        offset += (heights[t.id] ?? 72) + 8
        return (
          <li
            key={t.id}
            className={cn(
              "absolute right-0 bottom-0 w-full list-none transition-[transform,opacity] duration-300 ease-hairline",
              "[&_[data-slot=toast]>*]:transition-opacity [&_[data-slot=toast]>*]:duration-200",
              !expanded && i > 0 && "[&_[data-slot=toast]]:max-h-[var(--front-h)] [&_[data-slot=toast]]:overflow-hidden [&_[data-slot=toast]>*]:opacity-0"
            )}
            style={{ transform: `translateY(${y}px) scale(${scale})`, transformOrigin: "bottom center", opacity: !expanded && i > 2 ? 0 : 1, zIndex: 10 - i, ["--front-h" as string]: `${heights[visible[0]?.id] ?? 72}px` }}
          >
            <ToasterItem t={t} index={i} expanded={expanded} onHeight={onHeight} />
          </li>
        )
      })}
    </ol>
  )
}

export { Toast, ToastStack, Toaster, toast }
