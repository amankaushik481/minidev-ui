import Link from "next/link"

/*
 * Small pieces shared by the head to head and alternatives pages. The markup
 * matches the sources list and link chips on the comparison pages.
 */

export const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })

/** A titled row of internal links as chips. Renders nothing when there are no links. */
export function LinkChips({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  if (!links.length) return null
  return (
    <section className="mt-14">
      <h2 className="text-[1.125rem] font-medium text-fg">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="rounded-xl border border-border bg-surface px-3.5 py-2 text-[0.875rem] text-fg shadow-key hover:border-border-strong">
            {l.label}
          </Link>
        ))}
      </div>
    </section>
  )
}

/** The sources list with a closing note on trademarks and the checked date. */
export function SourceList({ sources, note }: { sources: { label: string; url: string }[]; note: string }) {
  return (
    <section className="mt-14">
      <h2 className="text-[1.125rem] font-medium text-fg">Sources</h2>
      <ul className="mt-3 space-y-1.5 text-[0.8125rem]">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener nofollow" className="text-fg-muted underline decoration-border-strong underline-offset-4 hover:text-fg">{s.label}</a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.8125rem] leading-[1.6] text-fg-subtle">{note}</p>
    </section>
  )
}
