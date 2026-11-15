"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"

/**
 * ChangelogPage — a release-notes list: one entry per version with date, tag, title and a short body, newest first.
 *
 * Use for a public /changelog or an in-app "What's new" panel. Each entry is an article with a real <time>, so feeds and
 * search engines can read it. It takes no data props: replace the `ENTRIES` array in this file with your releases.
 * For a marketing changelog with motion use the premium ChangelogMarketing; for docs use DocsPage.
 *
 * @example
 * <ChangelogPage />
 */
type ChangelogPageProps = {
  className?: string
}

const ENTRIES = [
  { version: "2.4.0", date: "2026-11-12", label: "Nov 12", tag: "Alerts", title: "Anomaly alerts by text", body: "Critical anomalies can now go to a phone number as well as Slack. Set it per alert in Settings → Alerts." },
  { version: "2.3.0", date: "2026-10-29", label: "Oct 29", tag: "Ask Lumen", title: "Answers cite their rows", body: "Every answer now links to the rows it was computed from, so you can check the maths in one click." },
  { version: "2.2.1", date: "2026-10-15", label: "Oct 15", tag: "Fix", title: "Faster HubSpot sync", body: "Large CRMs sync about three times faster, and rate limits retry on their own instead of failing the job." },
]

function ChangelogPage({ className }: ChangelogPageProps) {
  const headingId = React.useId()
  return (
    <section
      data-slot="changelog-page"
      aria-labelledby={headingId}
      className={cn("space-y-4 rounded-2xl border border-border bg-surface p-4 shadow-raised sm:p-6", className)}
    >
      <div>
        <h2 id={headingId} className="text-xl font-medium tracking-[-0.014em] text-fg">
          Changelog
        </h2>
        <p className="mt-1 text-sm text-fg-muted">New in Lumen, newest first.</p>
      </div>
      <ol className="space-y-4">
        {ENTRIES.map((e) => (
          <li key={e.version} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
            <article aria-labelledby={`${headingId}-${e.version}`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm text-fg tabular-nums">v{e.version}</span>
                <Badge variant="outline">{e.tag}</Badge>
                <time dateTime={e.date} className="text-xs text-fg-muted">
                  {e.label}
                </time>
              </div>
              <h3 id={`${headingId}-${e.version}`} className="mt-2 text-sm font-medium text-fg">
                {e.title}
              </h3>
              <p className="mt-1 text-sm text-pretty text-fg-muted">{e.body}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

export { ChangelogPage }
export type { ChangelogPageProps }
