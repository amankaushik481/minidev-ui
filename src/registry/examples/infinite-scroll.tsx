import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { InfiniteScroll } from "@/registry/ui/infinite-scroll"
import type { Example } from "./types"

type Customer = { id: string; name: string; email: string }

const NAMES = ["Maya Chen", "Theo Okafor", "Priya Raman", "Sam Lowe", "Noor Haddad", "Elena Petrova", "Jonas Weber", "Aisha Bello"]

const loadCustomers = (page: number) =>
  new Promise<{ items: Customer[]; hasMore: boolean }>((resolve) =>
    setTimeout(() => {
      const items = NAMES.map((name, i) => ({
        id: "cus_" + (page * 8 + i + 1),
        name,
        email: name.toLowerCase().replace(" ", ".") + "@northwind.io",
      }))
      resolve({ items, hasMore: page < 2 })
    }, 600),
  )

type Payment = { id: string; invoice: string; amount: string; status: "paid" | "failed" }

const loadPayments = (page: number) =>
  new Promise<{ items: Payment[]; hasMore: boolean }>((resolve) =>
    setTimeout(() => {
      const items = Array.from({ length: 6 }, (_, i): Payment => {
        const n = page * 6 + i
        return { id: "pay_" + n, invoice: "INV-" + (2041 - n), amount: "$" + (1200 + n * 85).toLocaleString() + ".00", status: n % 5 === 3 ? "failed" : "paid" }
      })
      resolve({ items, hasMore: page < 1 })
    }, 500),
  )

export const examples: Example[] = [
  {
    title: "Custom loader and rows",
    description: "loadMore receives the page index and returns the items plus whether more exist; renderItem draws each row.",
    code: `type Customer = { id: string; name: string; email: string }

const NAMES = ["Maya Chen", "Theo Okafor", "Priya Raman", "Sam Lowe", "Noor Haddad", "Elena Petrova", "Jonas Weber", "Aisha Bello"]

const loadCustomers = (page: number) =>
  new Promise<{ items: Customer[]; hasMore: boolean }>((resolve) =>
    setTimeout(() => {
      const items = NAMES.map((name, i) => ({
        id: "cus_" + (page * 8 + i + 1),
        name,
        email: name.toLowerCase().replace(" ", ".") + "@northwind.io",
      }))
      resolve({ items, hasMore: page < 2 })
    }, 600),
  )

<InfiniteScroll
  loadMore={loadCustomers}
  renderItem={(c) => (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2 shadow-xs">
      <Avatar size="sm"><AvatarFallback>{c.name.split(" ").map((p) => p[0]).join("")}</AvatarFallback></Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm text-fg">{c.name}</p>
        <p className="truncate text-xs text-fg-muted">{c.email}</p>
      </div>
    </div>
  )}
/>`,
    node: (
      <InfiniteScroll
        loadMore={loadCustomers}
        renderItem={(c) => (
          <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2 shadow-xs">
            <Avatar size="sm"><AvatarFallback>{c.name.split(" ").map((p) => p[0]).join("")}</AvatarFallback></Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm text-fg">{c.name}</p>
              <p className="truncate text-xs text-fg-muted">{c.email}</p>
            </div>
          </div>
        )}
      />
    ),
  },
  {
    title: "Short list that ends",
    description: "Return hasMore false from the last page and the end of list message replaces the loader; rootMargin starts fetching earlier.",
    code: `type Payment = { id: string; invoice: string; amount: string; status: "paid" | "failed" }

const loadPayments = (page: number) =>
  new Promise<{ items: Payment[]; hasMore: boolean }>((resolve) =>
    setTimeout(() => {
      const items = Array.from({ length: 6 }, (_, i): Payment => {
        const n = page * 6 + i
        return { id: "pay_" + n, invoice: "INV-" + (2041 - n), amount: "$" + (1200 + n * 85).toLocaleString() + ".00", status: n % 5 === 3 ? "failed" : "paid" }
      })
      resolve({ items, hasMore: page < 1 })
    }, 500),
  )

<InfiniteScroll
  loadMore={loadPayments}
  rootMargin="80px"
  className="h-64"
  renderItem={(p) => (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-sm shadow-xs">
      <span className="font-mono text-xs text-fg">{p.invoice}</span>
      <span className="tabular-nums text-fg-muted">{p.amount}</span>
      <Badge variant={p.status === "failed" ? "destructive" : "secondary"}>{p.status}</Badge>
    </div>
  )}
/>`,
    node: (
      <InfiniteScroll
        loadMore={loadPayments}
        rootMargin="80px"
        className="h-64"
        renderItem={(p) => (
          <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-sm shadow-xs">
            <span className="font-mono text-xs text-fg">{p.invoice}</span>
            <span className="tabular-nums text-fg-muted">{p.amount}</span>
            <Badge variant={p.status === "failed" ? "destructive" : "secondary"}>{p.status}</Badge>
          </div>
        )}
      />
    ),
  },
]
