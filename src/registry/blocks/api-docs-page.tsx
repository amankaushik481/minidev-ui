"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { CodeBlock } from "@/registry/ui/code-block"
import { CopyButton } from "@/registry/ui/copy-button"

/**
 * ApiDocsPage — an API reference page: section nav, base URL with a copy button, the endpoint list, and a curl sample.
 *
 * Use for REST reference docs. Each endpoint shows its method, path and one-line purpose. For prose guides with a
 * table of contents use DocsPage; for an in-app API key screen use ApiKeyList. The nav collapses above the content
 * on small screens.
 *
 * @example
 * <ApiDocsPage />
 */
type ApiDocsPageProps = {
  className?: string
}

const BASE = "https://api.lumen.io/v1"

const ENDPOINTS = [
  { method: "GET", path: "/metrics", desc: "List every metric in the workspace with its current value." },
  { method: "GET", path: "/metrics/:id/series", desc: "Daily values for one metric, with the baseline band." },
  { method: "POST", path: "/ask", desc: "Ask a question in plain English; returns the answer and the rows behind it." },
  { method: "POST", path: "/alerts", desc: "Create an alert on a metric with a threshold or anomaly rule." },
]

const NAV = ["Overview", "Authentication", "Metrics", "Ask", "Alerts", "Webhooks"]

function ApiDocsPage({ className }: ApiDocsPageProps) {
  const [active, setActive] = React.useState("Metrics")
  const headingId = React.useId()
  return (
    <div data-slot="api-docs-page" className={cn("grid gap-6 lg:grid-cols-[220px_1fr]", className)}>
      <nav aria-label="API reference" className="rounded-2xl border border-border bg-sunken p-4 lg:self-start">
        <p className="text-[11px] font-medium tracking-[0.01em] text-fg-muted uppercase">API</p>
        <ul className="mt-3 flex flex-wrap gap-1 text-sm lg:block lg:space-y-1">
          {NAV.map((n) => (
            <li key={n}>
              <a
                href={`#${n.toLowerCase()}`}
                aria-current={n === active ? "page" : undefined}
                onClick={() => setActive(n)}
                className="block rounded-lg px-2 py-1.5 text-fg-muted outline-none transition-colors duration-[70ms] hover:bg-surface hover:text-fg focus-visible:ring-2 focus-visible:ring-accent aria-[current=page]:bg-surface aria-[current=page]:text-fg"
              >
                {n}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <section aria-labelledby={headingId} className="min-w-0 space-y-6 rounded-2xl border border-border bg-surface p-4 shadow-raised sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id={headingId} className="text-xl font-medium tracking-[-0.014em] text-fg">
              Lumen API
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              Read metrics and ask questions from your own code. Base URL <code className="font-mono text-xs break-all text-fg">{BASE}</code>
            </p>
          </div>
          <CopyButton value={BASE} label="Copy base URL" size="sm" variant="outline" />
        </div>
        <ul className="space-y-3">
          {ENDPOINTS.map((e) => (
            <li key={e.method + e.path} className="rounded-xl border border-border bg-bg p-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={e.method === "GET" ? "outline" : "secondary"} className="font-mono">
                  {e.method}
                </Badge>
                <code className="font-mono text-sm break-all text-fg">{e.path}</code>
              </div>
              <p className="mt-1 text-xs text-fg-muted">{e.desc}</p>
            </li>
          ))}
        </ul>
        <CodeBlock code={`curl ${BASE}/metrics \\\n  -H "Authorization: Bearer $LUMEN_KEY"`} language="bash" />
      </section>
    </div>
  )
}

export { ApiDocsPage }
export type { ApiDocsPageProps }
