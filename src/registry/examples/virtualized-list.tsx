"use client"
import { VirtualizedList } from "@/registry/ui/virtualized-list"
import type { Example } from "./types"

const KINDS = ["Card payment", "Bank transfer", "Refund", "Payout"]
const ledger = Array.from({ length: 5000 }, (_, i) => ({
  id: "TX-" + (50000 - i),
  kind: KINDS[i % KINDS.length],
  amount: ((i * 7919) % 50000) / 100,
}))

function Ledger() {
  return (
    <VirtualizedList
      count={ledger.length}
      itemHeight={40}
      height={280}
      aria-label="Ledger"
      renderItem={(i) => (
        <div className="flex h-10 items-center gap-3 border-b border-border px-3 text-[13px]">
          <span className="w-20 font-mono text-xs text-fg-muted">{ledger[i].id}</span>
          <span className="flex-1 text-fg">{ledger[i].kind}</span>
          <span className="tabular-nums text-fg">${ledger[i].amount.toFixed(2)}</span>
        </div>
      )}
    />
  )
}

const LEVELS = ["info", "info", "warn", "info", "error"]

function LogLines() {
  return (
    <VirtualizedList
      count={20000}
      itemHeight={28}
      height={240}
      aria-label="billing-worker logs"
      className="max-w-lg"
      renderItem={(i) => (
        <div className="flex h-7 items-center gap-3 px-3 font-mono text-xs">
          <span className="w-12 text-fg-subtle tabular-nums">{i + 1}</span>
          <span className={LEVELS[i % 5] === "error" ? "w-10 text-danger" : LEVELS[i % 5] === "warn" ? "w-10 text-warning" : "w-10 text-fg-muted"}>{LEVELS[i % 5]}</span>
          <span className="truncate text-fg">job invoice-reminders processed batch {i}</span>
        </div>
      )}
    />
  )
}

export const examples: Example[] = [
  {
    title: "A 5,000 row ledger",
    description: "renderItem gets the index; each row is exactly itemHeight (40px, h-10) tall.",
    code: `const KINDS = ["Card payment", "Bank transfer", "Refund", "Payout"]
const ledger = Array.from({ length: 5000 }, (_, i) => ({
  id: "TX-" + (50000 - i),
  kind: KINDS[i % KINDS.length],
  amount: ((i * 7919) % 50000) / 100,
}))

function Ledger() {
  return (
    <VirtualizedList
      count={ledger.length}
      itemHeight={40}
      height={280}
      aria-label="Ledger"
      renderItem={(i) => (
        <div className="flex h-10 items-center gap-3 border-b border-border px-3 text-[13px]">
          <span className="w-20 font-mono text-xs text-fg-muted">{ledger[i].id}</span>
          <span className="flex-1 text-fg">{ledger[i].kind}</span>
          <span className="tabular-nums text-fg">\${ledger[i].amount.toFixed(2)}</span>
        </div>
      )}
    />
  )
}`,
    node: <Ledger />,
  },
  {
    title: "Dense log lines",
    description: "A smaller itemHeight for log output; keep the row element at the same height.",
    code: `const LEVELS = ["info", "info", "warn", "info", "error"]

function LogLines() {
  return (
    <VirtualizedList
      count={20000}
      itemHeight={28}
      height={240}
      aria-label="billing-worker logs"
      className="max-w-lg"
      renderItem={(i) => (
        <div className="flex h-7 items-center gap-3 px-3 font-mono text-xs">
          <span className="w-12 text-fg-subtle tabular-nums">{i + 1}</span>
          <span className={LEVELS[i % 5] === "error" ? "w-10 text-danger" : LEVELS[i % 5] === "warn" ? "w-10 text-warning" : "w-10 text-fg-muted"}>{LEVELS[i % 5]}</span>
          <span className="truncate text-fg">job invoice-reminders processed batch {i}</span>
        </div>
      )}
    />
  )
}`,
    node: <LogLines />,
  },
]
