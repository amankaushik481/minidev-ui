import type { Metadata } from "next"
import Link from "next/link"
import { ContentShell } from "@/components/seo/prose"
import { NotFoundSuggestions } from "@/components/site-search-dialog"
import { CATEGORIES } from "@/content/categories"
import { Kbd } from "@/registry/ui/kbd"

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } }

export default function NotFound() {
  return (
    <ContentShell>
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <p className="font-mono text-[12px] text-fg-subtle">404</p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-fg sm:text-5xl">This page is not drawn yet.</h1>
        <p className="mt-4 text-[1.0625rem] leading-[1.65] text-fg-muted">
          The link may be old, or the component was renamed. Press <Kbd>⌘K</Kbd> or <Kbd>/</Kbd> to search every component, or start here.
        </p>
        <NotFoundSuggestions />
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            ["/docs", "Docs"],
            ["/gallery", "All components"],
            ["/components", "All categories"],
            ["/blocks", "Blocks"],
            ["/templates", "Templates"],
            ["/docs/ai", "For AI agents"],
            ["/guides", "Guides"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="rounded-xl border border-border bg-surface px-4 py-2 text-[0.875rem] text-fg shadow-key outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">{label}</Link>
          ))}
        </div>
        <h2 className="mt-12 text-[1.125rem] font-medium text-fg">Browse by category</h2>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.875rem] sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link href={`/components/${c.id}`} prefetch={false} className="text-fg-muted hover:text-fg">{c.label}</Link>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-[0.8125rem] text-fg-subtle">
          Coding agent? The full component index is at{" "}
          <a href="/llms.txt" className="font-mono text-accent-fg underline decoration-accent-line underline-offset-4">/llms.txt</a>
          , and every component has a Markdown page at <code className="font-mono text-fg-muted">/docs/&lt;name&gt;.md</code>.
        </p>
      </div>
    </ContentShell>
  )
}
