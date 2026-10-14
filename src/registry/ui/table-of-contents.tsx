"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/** A sticky table of contents that spies on headings while you scroll, with a marker that glides to the active item and smooth scroll on click. */
type TocItem = {
  /** The heading element id. */
  id: string
  title: string
  /** 2 for h2, 3 for h3 (indented). */
  level?: 2 | 3
}

type TableOfContentsProps = {
  /** Headings to list. When absent, h2 and h3 elements are read from `selector` after mount. */
  items?: TocItem[]
  /** CSS selector of the container to read headings from when `items` is absent. Headings without an id get one. */
  selector?: string
  /** Small label above the list. Empty hides it. */
  title?: string
  /** Pixels between the top of the scroll area and a heading for it to count as reached. */
  offset?: number
  /** Called when the active heading changes. */
  onActiveChange?: (id: string) => void
  /** Keep the list in view while the page scrolls (position sticky). */
  sticky?: boolean
  className?: string
}

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

function scrollParent(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement ?? null
  while (node && node !== document.body) {
    const { overflowY } = getComputedStyle(node)
    if (/(auto|scroll)/.test(overflowY) && node.scrollHeight > node.clientHeight) return node
    node = node.parentElement
  }
  return null
}

/** The list itself. Spies on the headings it can find in the document. */
function TocList({
  items,
  title,
  offset,
  onActiveChange,
  sticky,
  className,
}: {
  items: TocItem[]
  title: string
  offset: number
  onActiveChange?: (id: string) => void
  sticky: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  const markerId = React.useId()
  const [active, setActive] = React.useState<string | null>(items[0]?.id ?? null)
  const lockUntil = React.useRef(0)
  const changeRef = React.useRef(onActiveChange)
  changeRef.current = onActiveChange
  const ids = items.map((i) => i.id).join("|")

  React.useEffect(() => {
    const heads = items.map((i) => ({ id: i.id, el: document.getElementById(i.id) })).filter((h): h is { id: string; el: HTMLElement } => !!h.el)
    if (!heads.length) return
    const scroller = scrollParent(heads[0].el)
    const target: HTMLElement | Window = scroller ?? window
    let raf = 0
    const compute = () => {
      raf = 0
      const top = scroller ? scroller.scrollTop : window.scrollY
      const viewH = scroller ? scroller.clientHeight : window.innerHeight
      const fullH = scroller ? scroller.scrollHeight : document.documentElement.scrollHeight
      const base = scroller ? scroller.getBoundingClientRect().top - scroller.scrollTop : -window.scrollY
      let current = heads[0].id
      if (top + viewH >= fullH - 2) current = heads[heads.length - 1].id
      else
        for (const h of heads) {
          const y = h.el.getBoundingClientRect().top - base
          if (y <= top + offset + 1) current = h.id
          else break
        }
      setActive((prev) => {
        if (prev !== current) changeRef.current?.(current)
        return current
      })
    }
    const onScroll = () => {
      if (lockUntil.current > Date.now()) return
      if (!raf) raf = requestAnimationFrame(compute)
    }
    target.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    compute()
    return () => {
      target.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, offset])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const scroller = scrollParent(el)
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth"
    if (scroller) {
      const y = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - offset
      scroller.scrollTo({ top: Math.max(0, y), behavior })
    } else {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior })
    }
    lockUntil.current = Date.now() + (reduce ? 0 : 700)
    if (active !== id) onActiveChange?.(id)
    setActive(id)
    if (typeof el.focus === "function") {
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1")
      el.focus({ preventScroll: true })
    }
  }

  return (
    <nav aria-label={title || "Table of contents"} data-slot="table-of-contents" className={cn("w-full max-w-56 text-[0.8125rem]", sticky && "sticky top-4 self-start", className)}>
      {title ? <p className="mb-2 pl-3 font-mono text-[10px] font-medium tracking-[0.08em] text-fg-subtle uppercase">{title}</p> : null}
      <ul className="relative">
        <span aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-border" />
        {items.map((item) => {
          const on = item.id === active
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "true" : undefined}
                onClick={(e) => go(e, item.id)}
                className={cn(
                  "relative block truncate rounded-r-md py-1 pr-2 leading-[1.5] outline-none transition-colors duration-[70ms] ease-hairline",
                  "hover:text-fg focus-visible:ring-2 focus-visible:ring-accent",
                  item.level === 3 ? "pl-6 text-[0.75rem]" : "pl-3",
                  on ? "font-medium text-fg" : "text-fg-muted"
                )}
              >
                {on ? (
                  <motion.span
                    layoutId={markerId}
                    aria-hidden
                    data-slot="table-of-contents-marker"
                    className="absolute top-1 bottom-1 -left-px w-0.5 rounded-full bg-accent"
                    transition={reduce ? { duration: 0 } : SNAPPY}
                  />
                ) : null}
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* ── Demo article: a slice of the Lumen docs ──────────────────────────────── */

const ARTICLE: { id: string; level: 2 | 3; title: string; body: string[] }[] = [
  { id: "overview", level: 2, title: "Overview", body: ["Invoices are statements of amounts owed by a customer. Lumen generates them from a subscription or from one off line items you add through the API.", "Every invoice moves through draft, open, paid, void or uncollectible. Finalising an invoice locks its line items and assigns a sequential number such as LUM-2026-0147."] },
  { id: "create", level: 2, title: "Create an invoice", body: ["POST /v1/invoices with a customer id. The invoice starts as a draft so you can keep adding items before you finalise it.", "Drafts are editable for up to 72 hours. After that, Lumen auto finalises them unless auto_advance is false."] },
  { id: "line-items", level: 3, title: "Line items", body: ["Add items with POST /v1/invoice_items. Each one carries a description, quantity, unit amount in the smallest currency unit and an optional billing period.", "Usage based items are summed from metering events. The 2.4M API calls Northwind made in September show up as a single line."] },
  { id: "tax", level: 3, title: "Tax and discounts", body: ["Tax rates apply per line or per invoice. Northwind is tax exempt, so their invoices carry a zero rate with the exemption noted.", "Discounts can be a percentage or a fixed amount and are shown on the PDF as a separate row above the total."] },
  { id: "collect", level: 2, title: "Send and collect", body: ["Finalised invoices are emailed to the customer's billing contact, Maya Chen in Northwind's case, with a hosted page to pay by card or bank transfer.", "Reminders go out at 3, 7 and 14 days past due. You can change the cadence per customer or turn it off entirely."] },
  { id: "payment-links", level: 3, title: "Payment links", body: ["Each invoice has a hosted_invoice_url you can share anywhere. The page shows the line items, the amount due and the payment methods you have enabled."] },
  { id: "webhooks", level: 2, title: "Webhooks", body: ["Subscribe to invoice.paid, invoice.payment_failed and invoice.voided to keep your own records in sync. Events are signed and retried for three days.", "Theo Okafor's team uses invoice.paid to unlock seats in the product the moment money lands."] },
  { id: "errors", level: 2, title: "Errors", body: ["A 402 means the customer has no usable payment method. A 409 means the invoice has already been finalised and cannot be edited.", "Errors carry a stable code, a human readable message and a doc_url pointing at this page."] },
]

function DemoArticle({ prefix }: { prefix: string }) {
  return (
    <article className="min-w-0 flex-1 px-5 py-4">
      <p className="font-mono text-[10px] font-medium tracking-[0.08em] text-fg-subtle uppercase">Lumen API reference</p>
      <p className="mt-1 text-xl font-medium text-fg">Invoices</p>
      {ARTICLE.map((s) => {
        const H = s.level === 2 ? "h2" : "h3"
        return (
          <section key={s.id}>
            <H id={`${prefix}-${s.id}`} className={cn("scroll-mt-4 font-medium text-fg", s.level === 2 ? "mt-7 text-lg" : "mt-5 text-base")}>
              {s.title}
            </H>
            {s.body.map((p, i) => (
              <p key={i} className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">
                {p}
              </p>
            ))}
          </section>
        )
      })}
    </article>
  )
}

/**
 * A table of contents for long pages. It reads h2 and h3 headings from a
 * container, or takes explicit items, then watches the nearest scroll area
 * and moves an accent marker to the heading you are reading. Clicking an
 * item scrolls there smoothly and hands focus to the heading. With no props
 * it renders a scrollable Lumen docs article next to the list so the spy
 * can be seen working.
 */
function TableOfContents({ items, selector, title = "On this page", offset = 24, onActiveChange, sticky = true, className }: TableOfContentsProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9-]/g, "")
  const demo = !items && !selector
  const demoRef = React.useRef<HTMLDivElement>(null)
  const [read, setRead] = React.useState<TocItem[]>([])

  React.useEffect(() => {
    if (items) return
    const container = demo ? demoRef.current : selector ? document.querySelector(selector) : null
    if (!container) return
    const heads = Array.from(container.querySelectorAll<HTMLElement>("h2, h3"))
    const taken = new Set<string>()
    setRead(
      heads.map((h) => {
        let id = h.id
        if (!id || taken.has(id)) {
          const base = id || slug(h.textContent ?? "section") || "section"
          id = base
          let n = 2
          while (taken.has(id) || document.getElementById(id)) id = `${base}-${n++}`
          h.id = id
        }
        taken.add(id)
        return { id, title: (h.textContent ?? "").trim(), level: h.tagName === "H3" ? 3 : 2 }
      })
    )
  }, [items, selector, demo])

  const list = items ?? read

  if (!demo) return <TocList items={list} title={title} offset={offset} onActiveChange={onActiveChange} sticky={sticky} className={className} />

  return (
    <div data-slot="table-of-contents-demo" className={cn("flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:gap-6", className)}>
      <div className="shrink-0 sm:order-2 sm:w-44 sm:pt-4">
        <TocList items={list} title={title} offset={offset} onActiveChange={onActiveChange} sticky={sticky} />
      </div>
      <div ref={demoRef} className="h-96 min-w-0 flex-1 overflow-y-auto rounded-xl border border-border bg-surface shadow-raised sm:order-1">
        <DemoArticle prefix={uid} />
      </div>
    </div>
  )
}

export { TableOfContents }
export type { TableOfContentsProps, TocItem }
