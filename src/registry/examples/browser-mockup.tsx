import { BrowserMockup, PhoneMockup } from "@/registry/premium/browser-mockup"
import { Badge } from "@/registry/ui/badge"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Tabs and your own page",
    description: "Children replace the sample dashboard; tabs adds a strip above the address bar with activeTab lit.",
    code: `<BrowserMockup url="https://app.lumen.dev/invoices/INV-2041" tabs={["Invoices", "Customers", "Reports"]} activeTab={0}>
  <div className="space-y-4 p-6">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="font-mono text-xs text-fg-subtle">INV-2041</p>
        <p className="text-lg font-medium tracking-[-0.01em] text-fg">Northwind Traders</p>
      </div>
      <Badge variant="accent">Paid</Badge>
    </div>
    <div className="grid gap-3 sm:grid-cols-3">
      {[["Amount", "$4,200.00"], ["Issued", "Sep 12, 2026"], ["Paid", "Sep 30, 2026"]].map(([k, v]) => (
        <div key={k} className="rounded-lg border border-border bg-surface p-3">
          <p className="text-xs text-fg-muted">{k}</p>
          <p className="mt-0.5 text-sm font-medium text-fg tabular-nums">{v}</p>
        </div>
      ))}
    </div>
  </div>
</BrowserMockup>`,
    node: (
      <BrowserMockup url="https://app.lumen.dev/invoices/INV-2041" tabs={["Invoices", "Customers", "Reports"]} activeTab={0}>
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-fg-subtle">INV-2041</p>
              <p className="text-lg font-medium tracking-[-0.01em] text-fg">Northwind Traders</p>
            </div>
            <Badge variant="accent">Paid</Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[["Amount", "$4,200.00"], ["Issued", "Sep 12, 2026"], ["Paid", "Sep 30, 2026"]].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-xs text-fg-muted">{k}</p>
                <p className="mt-0.5 text-sm font-medium text-fg tabular-nums">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </BrowserMockup>
    ),
  },
  {
    title: "Dark window, no phone",
    description: "appearance dark keeps the window dark in both themes; phone false drops the handset from the sample.",
    code: `<BrowserMockup appearance="dark" phone={false} />`,
    node: <BrowserMockup appearance="dark" phone={false} />,
  },
  {
    title: "Phone on its own",
    description: "PhoneMockup ships in the same file; width sets the handset size and time the clock in the status bar.",
    code: `<PhoneMockup time="10:24" width={260}>
  <div className="space-y-3 px-4 pt-2">
    <p className="text-xs text-fg-muted">Today</p>
    <div className="rounded-xl border border-border bg-surface p-3 shadow-raised">
      <p className="text-xs font-medium text-fg">INV-2041 paid</p>
      <p className="mt-0.5 text-[11px] text-fg-muted">Northwind Traders sent $4,200.00</p>
    </div>
    <div className="rounded-xl border border-border bg-surface p-3 shadow-raised">
      <p className="text-xs font-medium text-fg">Reminder scheduled</p>
      <p className="mt-0.5 text-[11px] text-fg-muted">INV-2042 to Theo Okafor, Friday 9:00</p>
    </div>
    <div className="rounded-xl border border-border bg-surface p-3 shadow-raised">
      <p className="text-xs font-medium text-fg">New customer</p>
      <p className="mt-0.5 text-[11px] text-fg-muted">Priya Raman joined from your invite link</p>
    </div>
  </div>
</PhoneMockup>`,
    node: (
      <PhoneMockup time="10:24" width={260}>
        <div className="space-y-3 px-4 pt-2">
          <p className="text-xs text-fg-muted">Today</p>
          <div className="rounded-xl border border-border bg-surface p-3 shadow-raised">
            <p className="text-xs font-medium text-fg">INV-2041 paid</p>
            <p className="mt-0.5 text-[11px] text-fg-muted">Northwind Traders sent $4,200.00</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3 shadow-raised">
            <p className="text-xs font-medium text-fg">Reminder scheduled</p>
            <p className="mt-0.5 text-[11px] text-fg-muted">INV-2042 to Theo Okafor, Friday 9:00</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3 shadow-raised">
            <p className="text-xs font-medium text-fg">New customer</p>
            <p className="mt-0.5 text-[11px] text-fg-muted">Priya Raman joined from your invite link</p>
          </div>
        </div>
      </PhoneMockup>
    ),
  },
]
