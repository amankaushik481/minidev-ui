import type { Metadata } from "next"
import Link from "next/link"
import { ContentShell } from "@/components/seo/prose"
import { CATEGORIES } from "@/content/categories"

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } }

export default function NotFound() {
  return (
    <ContentShell>
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <p className="font-mono text-[12px] text-fg-subtle">404</p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-fg sm:text-5xl">This page is not drawn yet.</h1>
        <p className="mt-4 text-[1.0625rem] leading-[1.65] text-fg-muted">The link may be old, or the component was renamed. These are good places to start.</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            ["/docs", "Docs"],
            ["/components", "All categories"],
            ["/templates", "Templates"],
            ["/guides", "Guides"],
            ["/tools", "Tools"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="rounded-xl border border-border bg-surface px-4 py-2 text-[0.875rem] text-fg shadow-key hover:border-border-strong">{label}</Link>
          ))}
        </div>
        <h2 className="mt-12 text-[1.125rem] font-medium text-fg">Browse by category</h2>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.875rem] sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link href={`/components/${c.id}`} className="text-fg-muted hover:text-fg">{c.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </ContentShell>
  )
}
