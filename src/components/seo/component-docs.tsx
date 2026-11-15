import * as React from "react"
import type { ComponentIndexEntry } from "@/lib/component-index"
import type { ComponentDocsContent } from "@/content/types"
import { DocsH2 } from "@/app/docs/_components/docs-shell"
import { Kbd } from "@/registry/ui/kbd"
import { linkComponentNames } from "@/app/docs/[name]/markdown"
import { Inline } from "./prose"


/** "Enter / Space" -> alternatives, "Shift+Tab" -> a chord. */
function Keys({ keys }: { keys: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {keys.split(" / ").map((alt, i) => (
        <React.Fragment key={alt}>
          {i ? <span className="text-xs text-fg-subtle">or</span> : null}
          <span className="inline-flex items-center gap-0.5">
            {alt.split("+").map((k, j) => (
              <React.Fragment key={k}>
                {j ? <span aria-hidden className="text-xs text-fg-subtle">+</span> : null}
                <Kbd className="font-mono text-fg">{k.trim()}</Kbd>
              </React.Fragment>
            ))}
          </span>
        </React.Fragment>
      ))}
    </span>
  )
}

const text = "text-[0.9375rem] leading-[1.75] text-fg-muted"

/** The server-rendered depth sections of a docs page, in page order. Each is present only when it has data. */
export function docsSections(entry: ComponentIndexEntry, docs: ComponentDocsContent | undefined): { id: string; label: string; node: React.ReactNode }[] {
  const out: { id: string; label: string; heading?: string; node: React.ReactNode }[] = []
  const guide = entry.guide?.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  if (guide?.length)
    out.push({
      id: "when-to-use",
      label: "When to use",
      node: (
        <div className="max-w-[68ch] space-y-4">
          {guide.map((p, i) => (
            <p key={i} className={text}>
              <Inline text={linkComponentNames(p, entry.name)} />
            </p>
          ))}
        </div>
      ),
    })
  if (docs?.keyboard?.length)
    out.push({
      id: "keyboard",
      label: "Keyboard",
      heading: "Keyboard interactions",
      node: (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-[0.8125rem]">
            <caption className="sr-only">Keyboard interactions</caption>
            <thead className="bg-sunken text-fg">
              <tr>
                <th scope="col" className="w-[36%] px-4 py-2.5 font-medium">Key</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {docs.keyboard.map((k, i) => (
                <tr key={i} className="border-t border-border align-top">
                  <th scope="row" className="px-4 py-2.5 font-normal"><Keys keys={k.keys} /></th>
                  <td className="px-4 py-2.5 leading-[1.6] text-fg-muted"><Inline text={k.action} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    })
  if (docs?.a11y?.length)
    out.push({
      id: "accessibility",
      label: "Accessibility",
      node: (
        <ul className={`max-w-[68ch] list-disc space-y-2.5 pl-5 marker:text-fg-subtle ${text}`}>
          {docs.a11y.map((a, i) => (
            <li key={i} className="pl-1"><Inline text={a} /></li>
          ))}
        </ul>
      ),
    })
  if (docs?.faq?.length)
    out.push({
      id: "faq",
      label: "FAQ",
      heading: "Frequently asked questions",
      node: (
        <div className="divide-y divide-border">
          {docs.faq.map((f) => (
            <div key={f.q} className="py-5 first:pt-1">
              <h3 className="text-[1rem] font-medium tracking-[-0.01em] text-fg">{f.q}</h3>
              <p className={`mt-2 max-w-[68ch] ${text}`}><Inline text={f.a} /></p>
            </div>
          ))}
        </div>
      ),
    })
  return out.map(({ id, label, heading, node }) => ({
    id,
    label,
    node: (
      <section className="mt-14 space-y-5">
        <DocsH2 id={id}>{heading ?? label}</DocsH2>
        {node}
      </section>
    ),
  }))
}
