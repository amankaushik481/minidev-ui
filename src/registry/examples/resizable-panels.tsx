"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanels } from "@/registry/ui/resizable-panels"
import type { Example } from "./types"

function ControlledSplit() {
  const [sizes, setSizes] = React.useState([35, 65])
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-fg-muted tabular-nums">
          {sizes.map((s) => `${Math.round(s)}%`).join(" / ")}
        </p>
        <Button variant="outline" size="sm" onClick={() => setSizes([35, 65])}>
          Reset
        </Button>
      </div>
      <ResizablePanels sizes={sizes} onSizesChange={setSizes} className="h-40 rounded-xl border border-border bg-surface">
        <ResizablePanel minSize={20}>
          <div className="flex h-full items-center justify-center text-sm text-fg-muted">Filters</div>
        </ResizablePanel>
        <ResizableHandle withGrip aria-label="Resize filters" />
        <ResizablePanel minSize={30}>
          <div className="flex h-full items-center justify-center text-sm text-fg-muted">Results</div>
        </ResizablePanel>
      </ResizablePanels>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Two panel shorthand",
    description: "left, right and initial make a split without writing panels; the group needs a height.",
    code: `<ResizablePanels
  initial={40}
  className="h-48 w-full max-w-2xl rounded-xl border border-border bg-surface"
  left={
    <ul className="space-y-1 text-sm">
      <li className="rounded-md bg-accent-soft px-2 py-1 font-medium text-fg">INV-2041</li>
      <li className="px-2 py-1 text-fg-muted">INV-2040</li>
      <li className="px-2 py-1 text-fg-muted">INV-2039</li>
    </ul>
  }
  right={
    <div className="text-sm">
      <p className="font-medium text-fg">Northwind Traders</p>
      <p className="mt-1 text-fg-muted">12 seats, Lumen Pro. Due October 24.</p>
      <p className="mt-3 text-xl font-medium text-fg tabular-nums">$1,840.00</p>
    </div>
  }
/>`,
    node: (
      <ResizablePanels
        initial={40}
        className="h-48 w-full max-w-2xl rounded-xl border border-border bg-surface"
        left={
          <ul className="space-y-1 text-sm">
            <li className="rounded-md bg-accent-soft px-2 py-1 font-medium text-fg">INV-2041</li>
            <li className="px-2 py-1 text-fg-muted">INV-2040</li>
            <li className="px-2 py-1 text-fg-muted">INV-2039</li>
          </ul>
        }
        right={
          <div className="text-sm">
            <p className="font-medium text-fg">Northwind Traders</p>
            <p className="mt-1 text-fg-muted">12 seats, Lumen Pro. Due October 24.</p>
            <p className="mt-3 text-xl font-medium text-fg tabular-nums">$1,840.00</p>
          </div>
        }
      />
    ),
  },
  {
    title: "Collapsible sidebar",
    description: "Drag the sidebar well below minSize and it snaps shut; Enter on the handle toggles it.",
    code: `<ResizablePanels className="h-48 w-full max-w-2xl rounded-xl border border-border bg-surface">
  <ResizablePanel defaultSize={25} minSize={15} maxSize={40} collapsible collapsedSize={0}>
    <nav className="flex h-full flex-col gap-1 bg-sunken p-2 text-sm">
      <span className="truncate rounded-md bg-surface px-2 py-1 font-medium text-fg shadow-key">Invoices</span>
      <span className="truncate px-2 py-1 text-fg-muted">Customers</span>
      <span className="truncate px-2 py-1 text-fg-muted">Reports</span>
    </nav>
  </ResizablePanel>
  <ResizableHandle withGrip aria-label="Resize sidebar" />
  <ResizablePanel minSize={40}>
    <div className="flex h-full items-center justify-center text-sm text-fg-muted">Main content</div>
  </ResizablePanel>
</ResizablePanels>`,
    node: (
      <ResizablePanels className="h-48 w-full max-w-2xl rounded-xl border border-border bg-surface">
        <ResizablePanel defaultSize={25} minSize={15} maxSize={40} collapsible collapsedSize={0}>
          <nav className="flex h-full flex-col gap-1 bg-sunken p-2 text-sm">
            <span className="truncate rounded-md bg-surface px-2 py-1 font-medium text-fg shadow-key">Invoices</span>
            <span className="truncate px-2 py-1 text-fg-muted">Customers</span>
            <span className="truncate px-2 py-1 text-fg-muted">Reports</span>
          </nav>
        </ResizablePanel>
        <ResizableHandle withGrip aria-label="Resize sidebar" />
        <ResizablePanel minSize={40}>
          <div className="flex h-full items-center justify-center text-sm text-fg-muted">Main content</div>
        </ResizablePanel>
      </ResizablePanels>
    ),
  },
  {
    title: "Vertical split",
    description: "orientation vertical stacks the panels; the handle turns into a row separator.",
    code: `<ResizablePanels orientation="vertical" className="h-64 w-full max-w-2xl rounded-xl border border-border bg-surface">
  <ResizablePanel defaultSize={65} minSize={30}>
    <div className="flex h-full items-center justify-center text-sm text-fg-muted">Editor</div>
  </ResizablePanel>
  <ResizableHandle aria-label="Resize terminal" />
  <ResizablePanel minSize={20}>
    <pre className="h-full overflow-hidden bg-sunken p-3 font-mono text-xs leading-6 text-fg-muted">
      <span className="block">$ lumen deploy</span>
      <span className="block text-success">ready on https://app.lumen.dev</span>
    </pre>
  </ResizablePanel>
</ResizablePanels>`,
    node: (
      <ResizablePanels orientation="vertical" className="h-64 w-full max-w-2xl rounded-xl border border-border bg-surface">
        <ResizablePanel defaultSize={65} minSize={30}>
          <div className="flex h-full items-center justify-center text-sm text-fg-muted">Editor</div>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize terminal" />
        <ResizablePanel minSize={20}>
          <pre className="h-full overflow-hidden bg-sunken p-3 font-mono text-xs leading-6 text-fg-muted">
            <span className="block">$ lumen deploy</span>
            <span className="block text-success">ready on https://app.lumen.dev</span>
          </pre>
        </ResizablePanel>
      </ResizablePanels>
    ),
  },
  {
    title: "Controlled sizes",
    description: "Pass sizes and onSizesChange to own the layout, persist it or reset it from outside.",
    code: `function ControlledSplit() {
  const [sizes, setSizes] = React.useState([35, 65])
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-fg-muted tabular-nums">
          {sizes.map((s) => \`\${Math.round(s)}%\`).join(" / ")}
        </p>
        <Button variant="outline" size="sm" onClick={() => setSizes([35, 65])}>
          Reset
        </Button>
      </div>
      <ResizablePanels sizes={sizes} onSizesChange={setSizes} className="h-40 rounded-xl border border-border bg-surface">
        <ResizablePanel minSize={20}>
          <div className="flex h-full items-center justify-center text-sm text-fg-muted">Filters</div>
        </ResizablePanel>
        <ResizableHandle withGrip aria-label="Resize filters" />
        <ResizablePanel minSize={30}>
          <div className="flex h-full items-center justify-center text-sm text-fg-muted">Results</div>
        </ResizablePanel>
      </ResizablePanels>
    </div>
  )
}`,
    node: <ControlledSplit />,
  },
]
