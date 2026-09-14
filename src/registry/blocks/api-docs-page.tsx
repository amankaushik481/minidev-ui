"use client"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { CodeBlock } from "@/registry/ui/code-block"

const ENDPOINTS = [
  { method: "GET", path: "/v1/components", desc: "List registry items" },
  { method: "GET", path: "/v1/components/:name", desc: "Fetch a single component" },
  { method: "POST", path: "/v1/audit", desc: "Run visual + axe gate" },
]

function ApiDocsPage() {
  return (
    <div data-slot="api-docs-page" className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl border border-border bg-sunken p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.01em] text-fg-muted">API</p>
        <ul className="mt-3 space-y-1 text-sm">
          {["Overview", "Auth", "Components", "Audit", "Webhooks"].map((i) => (
            <li key={i} className="rounded-lg px-2 py-1.5 text-fg-muted hover:bg-surface hover:text-fg">{i}</li>
          ))}
        </ul>
      </aside>
      <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-medium tracking-[-0.014em] text-fg">Registry API</h3>
            <p className="mt-1 text-sm text-fg-muted">Read the catalog your product UI already ships from.</p>
          </div>
          <Button size="sm" variant="outline">Copy base URL</Button>
        </div>
        <ul className="space-y-3">
          {ENDPOINTS.map((e) => (
            <li key={e.path} className="rounded-xl border border-border bg-bg p-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{e.method}</Badge>
                <code className="font-mono text-sm text-fg">{e.path}</code>
              </div>
              <p className="mt-1 text-xs text-fg-muted">{e.desc}</p>
            </li>
          ))}
        </ul>
        <CodeBlock code={`curl https://api.minidev.pro/v1/components \\\n  -H "Authorization: Bearer $TOKEN"`} language="bash" />
      </div>
    </div>
  )
}
export { ApiDocsPage }
