"use client"
import * as React from "react"
import { ArchiveIcon, DownloadIcon, LayoutGridIcon, ListIcon, MoreHorizontalIcon, RowsIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { DataTable, type Column } from "@/registry/ui/data-table"
import { FileDropzone } from "@/registry/ui/file-dropzone"
import { OtpInput } from "@/registry/ui/otp-input"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { StatusBadge } from "@/registry/ui/status-badge"
import { RangeSlider } from "@/registry/ui/range-slider"
import { Slider } from "@/registry/ui/slider"
import { Switch } from "@/registry/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

/* Demos for the gold-standard components. Used by gallery pages and docs previews. */

type Invoice = { id: string; customer: string; email: string; amount: number; status: "paid" | "pending" | "overdue" | "refunded"; issued: string }

const INVOICES: Invoice[] = [
  { id: "INV-2041", customer: "Northwind Labs", email: "billing@northwind.io", amount: 12400, status: "paid", issued: "2026-09-24" },
  { id: "INV-2040", customer: "Acme Robotics", email: "ap@acme.dev", amount: 3890, status: "pending", issued: "2026-09-22" },
  { id: "INV-2039", customer: "Globex", email: "finance@globex.com", amount: 890, status: "overdue", issued: "2026-09-12" },
  { id: "INV-2038", customer: "Initech", email: "peter@initech.co", amount: 5200, status: "paid", issued: "2026-09-10" },
  { id: "INV-2037", customer: "Umbrella Health", email: "ops@umbrella.health", amount: 21750, status: "paid", issued: "2026-09-08" },
  { id: "INV-2036", customer: "Hooli", email: "gavin@hooli.xyz", amount: 1450, status: "refunded", issued: "2026-09-03" },
  { id: "INV-2035", customer: "Stark Industrial", email: "pepper@stark.io", amount: 9980, status: "pending", issued: "2026-08-29" },
  { id: "INV-2034", customer: "Wayne Freight", email: "lucius@wayne.co", amount: 6300, status: "paid", issued: "2026-08-27" },
]

const TONE = { paid: "success", pending: "warning", overdue: "danger", refunded: "neutral" } as const
const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const day = (s: string) => new Date(s + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })

const COLUMNS: Column<Invoice>[] = [
  {
    id: "customer",
    header: "Customer",
    sortValue: (r) => r.customer,
    cell: (r) => (
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border bg-sunken text-[11px] font-medium text-fg-muted">
          {r.customer.split(" ").map((w) => w[0]).slice(0, 2).join("")}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium text-fg">{r.customer}</p>
          <p className="truncate text-xs text-fg-subtle">{r.email}</p>
        </div>
      </div>
    ),
  },
  { id: "id", header: "Invoice", sortValue: (r) => r.id, cell: (r) => <span className="font-mono text-xs text-fg-muted">{r.id}</span> },
  { id: "status", header: "Status", sortValue: (r) => r.status, cell: (r) => <StatusBadge tone={TONE[r.status]}>{r.status[0].toUpperCase() + r.status.slice(1)}</StatusBadge> },
  { id: "issued", header: "Issued", sortValue: (r) => r.issued, cell: (r) => <span className="text-fg-muted">{day(r.issued)}</span> },
  { id: "amount", header: "Amount", align: "right", sortValue: (r) => r.amount, cell: (r) => <span className="font-medium">{money(r.amount)}</span> },
]

export function DataTableDemo({ compactControls }: { compactControls?: boolean }) {
  const [density, setDensity] = React.useState<"compact" | "default" | "comfortable">("default")
  const [loading, setLoading] = React.useState(false)
  return (
    <div className="mx-auto w-full max-w-4xl space-y-3">
      {compactControls ? null : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedControl
            size="sm"
            aria-label="Density"
            value={density}
            onChange={(v) => setDensity(v as typeof density)}
            options={[
              { value: "compact", label: "Compact", icon: <RowsIcon /> },
              { value: "default", label: "Default", icon: <ListIcon /> },
              { value: "comfortable", label: "Relaxed", icon: <LayoutGridIcon /> },
            ]}
          />
          <label className="flex items-center gap-2 text-[0.8125rem] text-fg-muted">
            <Switch checked={loading} onCheckedChange={setLoading} aria-label="Loading" /> Loading
          </label>
        </div>
      )}
      <DataTable
        caption="Invoices"
        columns={COLUMNS}
        data={INVOICES}
        getRowId={(r) => r.id}
        selectable
        density={density}
        loading={loading}
        maxHeight={compactControls ? 320 : 420}
        defaultSort={{ id: "issued", dir: "desc" }}
        rowActions={(r) => (
          <Button variant="ghost" size="icon-sm" aria-label={`More for ${r.id}`}>
            <MoreHorizontalIcon />
          </Button>
        )}
        bulkActions={() => (
          <>
            <Button variant="ghost" size="sm"><DownloadIcon /> Export</Button>
            <Button variant="ghost" size="sm"><ArchiveIcon /> Archive</Button>
          </>
        )}
      />
    </div>
  )
}

export function DataTableEmptyDemo() {
  return <DataTable className="max-w-3xl" columns={COLUMNS} data={[]} />
}

/* Uploads: fake network so progress, errors and retry are visible. */
let uploads = 0
function fakeUpload(file: File, onProgress: (p: number) => void) {
  // Every fourth upload (or any file named *broken*) fails, so retry is visible.
  const fail = /fail|broken/i.test(file.name) || ++uploads % 4 === 0
  return new Promise<void>((resolve, reject) => {
    let p = 0
    const t = setInterval(() => {
      p += 0.06 + Math.random() * 0.12
      if (fail && p > 0.55) {
        clearInterval(t)
        reject(new Error("Network dropped at " + Math.round(p * 100) + "%"))
        return
      }
      onProgress(Math.min(p, 1))
      if (p >= 1) {
        clearInterval(t)
        resolve()
      }
    }, 180)
  })
}

export function DropzoneDemo() {
  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6 md:grid-cols-2">
      <div>
        <p className="mb-2 text-xs font-medium text-fg-muted">Any file, with upload progress</p>
        <FileDropzone upload={fakeUpload} maxSize={20 * 1024 * 1024} />
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-fg-muted">Images only, one at a time</p>
        <FileDropzone accept="image/png,image/jpeg,image/webp" multiple={false} maxSize={5 * 1024 * 1024} label="Upload a logo" upload={fakeUpload} />
      </div>
    </div>
  )
}

export function OtpDemo() {
  const [code, setCode] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "invalid" | "success">("idle")
  return (
    <div className="mx-auto grid w-full max-w-3xl gap-8 sm:grid-cols-2">
      <div className="space-y-3">
        <p className="text-xs font-medium text-fg-muted">Type 424242 to pass, anything else fails</p>
        <OtpInput
          value={code}
          status={status}
          groups={[3, 3]}
          onChange={(v) => {
            setCode(v)
            if (status !== "idle") setStatus("idle")
          }}
          onComplete={(v) => setTimeout(() => setStatus(v === "424242" ? "success" : "invalid"), 250)}
        />
        <p className={status === "invalid" ? "text-xs text-danger" : status === "success" ? "text-xs text-success" : "text-xs text-fg-subtle"}>
          {status === "invalid" ? "That code didn't match. Try again." : status === "success" ? "Verified." : "Paste works too, and SMS autofill on phones."}
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-medium text-fg-muted">Alphanumeric, large</p>
        <OtpInput length={4} pattern="alphanumeric" size="lg" defaultValue="K7" />
        <p className="text-xs text-fg-subtle">Letters are uppercased as you type.</p>
      </div>
    </div>
  )
}

const NOTIFY = [
  { id: "paid", label: "Invoice paid", description: "When a customer settles an invoice.", on: true },
  { id: "failed", label: "Payment failed", description: "Card declines and bank returns, sent right away.", on: true },
  { id: "digest", label: "Weekly revenue digest", description: "A Monday summary of MRR, churn and new customers.", on: false },
  { id: "deploys", label: "Deploy alerts", description: "Production deploys in the Lumen workspace only.", on: false },
]

export function SwitchDemo() {
  const [on, setOn] = React.useState<Record<string, boolean>>(() => Object.fromEntries(NOTIFY.map((n) => [n.id, n.on])))
  const [saving, setSaving] = React.useState<string | null>(null)
  const toggle = (id: string, v: boolean) => {
    setOn((s) => ({ ...s, [id]: v }))
    setSaving(id)
    setTimeout(() => setSaving((cur) => (cur === id ? null : cur)), 900)
  }
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-border bg-surface shadow-raised">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <p className="text-[0.8125rem] font-medium text-fg">Email notifications</p>
          <p className="text-xs text-fg-subtle">Sent to billing@lumen.app</p>
        </div>
        <span className="font-mono text-xs text-fg-subtle tabular-nums">{Object.values(on).filter(Boolean).length} of {NOTIFY.length} on</span>
      </div>
      <div className="divide-y divide-border">
        {NOTIFY.map((n) => (
          <Switch
            key={n.id}
            className="px-4 py-3"
            label={n.label}
            description={n.description}
            checked={on[n.id]}
            loading={saving === n.id}
            onCheckedChange={(v) => toggle(n.id, v)}
          />
        ))}
      </div>
    </div>
  )
}

const NW_INVOICES: Pick<Invoice, "id" | "amount" | "status" | "issued">[] = [
  { id: "INV-2041", amount: 12400, status: "paid", issued: "2026-09-24" },
  { id: "INV-2033", amount: 3890, status: "pending", issued: "2026-09-02" },
  { id: "INV-2019", amount: 12400, status: "paid", issued: "2026-08-24" },
  { id: "INV-2004", amount: 890, status: "overdue", issued: "2026-07-30" },
]

const RANGES = { "7d": [9240, 4.1], "30d": [48210, 12.4], "90d": [131870, 8.9], "12m": [502300, 31.2] } as const

export function TabsDemo() {
  const [range, setRange] = React.useState<keyof typeof RANGES>("30d")
  const [total, delta] = RANGES[range]
  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-6">
      <div className="min-w-0 rounded-xl border border-border bg-surface shadow-raised">
        <div className="flex items-center gap-3 px-5 pt-4 pb-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-sunken text-xs font-medium text-fg-muted">NL</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-fg">Northwind Labs</p>
            <p className="truncate text-xs text-fg-subtle">billing@northwind.io · Customer since March 2024</p>
          </div>
        </div>
        <Tabs defaultValue="invoices" className="gap-0">
          <div className="overflow-x-auto [scrollbar-width:none]">
            <TabsList variant="line" className="w-full min-w-max justify-start px-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="invoices" badge={NW_INVOICES.length}>Invoices</TabsTrigger>
              <TabsTrigger value="payments" badge={2}>Payments</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview" className="grid grid-cols-3 gap-4 p-5">
            {[["Lifetime value", "$58,970"], ["Open balance", "$4,780"], ["Paid on time", "94%"]].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <p className="truncate text-xs text-fg-subtle">{k}</p>
                <p className="mt-1 text-lg font-medium text-fg tabular-nums">{v}</p>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="invoices" className="divide-y divide-border">
            {NW_INVOICES.map((r) => (
              <div key={r.id} className="flex h-11 items-center gap-3 px-5 text-[0.8125rem]">
                <span className="font-mono text-xs text-fg-muted">{r.id}</span>
                <span className="text-fg-subtle">{day(r.issued)}</span>
                <span className="ml-auto font-medium text-fg tabular-nums">{money(r.amount)}</span>
                <StatusBadge tone={TONE[r.status]}>{r.status[0].toUpperCase() + r.status.slice(1)}</StatusBadge>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="payments" className="divide-y divide-border">
            {[["Visa ending 4242", "Default · expires 08/28"], ["ACH ending 6789", "Chase business checking"]].map(([k, v]) => (
              <div key={k} className="flex h-11 items-center justify-between gap-3 px-5 text-[0.8125rem]">
                <span className="font-medium text-fg">{k}</span>
                <span className="truncate text-xs text-fg-subtle">{v}</span>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="activity" className="space-y-3 p-5 text-[0.8125rem] text-fg-muted">
            <p><span className="font-medium text-fg">Invoice INV-2041 paid</span> · 4 days ago</p>
            <p><span className="font-medium text-fg">Reminder sent for INV-2004</span> · 2 weeks ago</p>
            <p><span className="font-medium text-fg">Plan changed to Scale</span> · 1 month ago</p>
          </TabsContent>
        </Tabs>
      </div>

      <Tabs value={range} onValueChange={(v) => setRange(v as keyof typeof RANGES)} className="rounded-xl border border-border bg-surface p-5 shadow-raised">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.8125rem] font-medium text-fg">Revenue</p>
          <TabsList aria-label="Range">
            {Object.keys(RANGES).map((k) => (
              <TabsTrigger key={k} value={k} className="font-mono text-xs uppercase">{k}</TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value={range}>
          <p className="text-2xl font-medium text-fg tabular-nums">{money(total)}</p>
          <p className="mt-0.5 text-xs text-success tabular-nums">+{delta}% vs previous period</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const AMOUNTS = [890, 1450, 3890, 5200, 6300, 9980, 12400, 21750]

export function SliderDemo() {
  const [alertAt, setAlertAt] = React.useState(80)
  const [seats, setSeats] = React.useState(12)
  const [amount, setAmount] = React.useState([1000, 12500])
  const matching = AMOUNTS.filter((a) => a >= amount[0] && a <= amount[1]).length
  const row = "flex items-baseline justify-between gap-3"
  return (
    <div className="mx-auto w-full max-w-md divide-y divide-border rounded-xl border border-border bg-surface shadow-raised">
      <div className="space-y-3 p-5">
        <div className={row}>
          <p id="alert-at" className="text-[0.8125rem] font-medium text-fg">Alert when API usage reaches</p>
          <span className="text-[0.8125rem] font-medium text-fg tabular-nums">{alertAt}%</span>
        </div>
        <Slider
          aria-labelledby="alert-at"
          value={alertAt}
          onValueChange={(v) => setAlertAt(v as number)}
          step={5}
          format={(n) => `${n}%`}
          marks={[{ value: 0, label: "0%" }, { value: 50, label: "50%" }, { value: 80, label: "80%" }, { value: 100, label: "100%" }]}
        />
      </div>
      <div className="space-y-3 p-5">
        <div className={row}>
          <p id="seats" className="text-[0.8125rem] font-medium text-fg">Seats</p>
          <span className="text-xs text-fg-muted tabular-nums">{seats} × $12 = <span className="font-medium text-fg">{money(seats * 12)}/mo</span></span>
        </div>
        <Slider aria-labelledby="seats" value={seats} onValueChange={(v) => setSeats(v as number)} min={1} max={50} format={(n) => `${n} ${n === 1 ? "seat" : "seats"}`} />
      </div>
      <div className="space-y-3 p-5">
        <div className={row}>
          <p id="amount" className="text-[0.8125rem] font-medium text-fg">Invoice amount</p>
          <span className="text-xs text-fg-muted tabular-nums">{matching} of {AMOUNTS.length} invoices</span>
        </div>
        <RangeSlider
          aria-labelledby="amount"
          aria-label="Invoice amount"
          className="w-full"
          value={amount}
          onValueChange={setAmount}
          min={0}
          max={25000}
          step={250}
          minStepsBetweenValues={4}
          format={money}
          marks={[{ value: 0, label: "$0" }, { value: 10000, label: "$10k" }, { value: 20000, label: "$20k" }]}
        />
        <span className="sr-only" aria-live="polite">{matching} invoices match</span>
      </div>
    </div>
  )
}

export function SegmentedDemo() {
  const [view, setView] = React.useState("list")
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6">
      <SegmentedControl items={["Monthly", "Yearly"]} aria-label="Billing period" />
      <SegmentedControl
        aria-label="Billing period with discount"
        defaultValue="yearly"
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly", badge: "-20%" },
        ]}
      />
      <SegmentedControl
        size="sm"
        aria-label="View"
        value={view}
        onChange={setView}
        options={[
          { value: "list", label: "List", icon: <ListIcon /> },
          { value: "board", label: "Board", icon: <LayoutGridIcon /> },
          { value: "timeline", label: "Timeline", icon: <RowsIcon />, disabled: true },
        ]}
      />
      <SegmentedControl size="lg" fullWidth aria-label="Range" items={["24h", "7d", "30d", "90d", "1y"]} defaultValue="30d" />
    </div>
  )
}
