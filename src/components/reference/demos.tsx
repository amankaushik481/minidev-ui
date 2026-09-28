"use client"
import * as React from "react"
import { ArchiveIcon, DownloadIcon, LayoutGridIcon, ListIcon, MoreHorizontalIcon, RowsIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { DataTable, type Column } from "@/registry/ui/data-table"
import { FileDropzone } from "@/registry/ui/file-dropzone"
import { OtpInput } from "@/registry/ui/otp-input"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { StatusBadge } from "@/registry/ui/status-badge"
import { Switch } from "@/registry/ui/switch"

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
