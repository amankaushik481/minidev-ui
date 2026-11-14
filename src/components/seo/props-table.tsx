import { COMPONENT_PROPS } from "@/lib/component-props"

/** A union of literals ("sm" | "md" | 2) reads better as one chip per option; anything else stays one string. */
function TypeCell({ type }: { type: string }) {
  const parts = type.split(" | ")
  const literal = parts.length > 1 && parts.every((t) => /^("[^"|]*"|'[^'|]*'|-?\d+(\.\d+)?|true|false|null|undefined)$/.test(t))
  if (!literal) return <code className="font-mono text-[12px] break-words text-accent-fg">{type}</code>
  return (
    <span className="flex flex-wrap gap-1">
      {parts.map((t) => (
        <code key={t} className="rounded-[5px] border border-border bg-sunken px-1.5 py-px font-mono text-[11.5px] text-accent-fg">{t}</code>
      ))}
    </span>
  )
}

/** Server-rendered API reference for a registry item, from its TypeScript parameter type. */
export function PropsTable({ name, title }: { name: string; title: string }) {
  const p = COMPONENT_PROPS[name]
  if (!p || (!p.props.length && !p.extends.length)) {
    return (
      <p className="text-[0.9375rem] leading-[1.7] text-fg-muted">
        <code className="rounded-[5px] border border-border bg-sunken px-1.5 py-0.5 font-mono text-[0.86em] text-fg">{title}</code> takes no props. It ships with
        realistic sample content: install it, then edit the copy and data in the file directly. The file is yours.
      </p>
    )
  }
  return (
    <div className="space-y-3">
      {p.props.length ? (
        <div className="overflow-x-auto rounded-xl border border-border outline-none focus-visible:ring-2 focus-visible:ring-accent" tabIndex={0} role="region" aria-label={`${title} props`}>
          <table className="w-full min-w-[560px] text-left text-[0.8125rem]">
            <caption className="sr-only">{title} props</caption>
            <thead className="bg-sunken text-fg">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-medium">Prop</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Default</th>
              </tr>
            </thead>
            <tbody>
              {p.props.map((x) => (
                <tr key={x.name} id={`prop-${x.name}`} className="scroll-mt-24 border-t border-border align-top target:bg-accent-soft">
                  <th scope="row" className="px-4 py-2.5 text-left font-normal">
                    <a href={`#prop-${x.name}`} className="rounded-sm font-mono text-[12.5px] text-fg outline-none hover:underline focus-visible:ring-2 focus-visible:ring-accent">{x.name}</a>
                    {x.optional ? null : <span className="ml-1.5 rounded-full border border-border px-1.5 py-px align-[1px] text-[10px] font-medium text-fg-muted">required</span>}
                    {x.doc ? <span className="mt-1 block max-w-[260px] text-[12px] leading-[1.5] text-fg-muted">{x.doc}</span> : null}
                  </th>
                  <td className="px-4 py-2.5"><TypeCell type={x.type} /></td>
                  <td className="px-4 py-2.5"><code className="font-mono text-[12px] text-fg-muted">{x.default ?? "-"}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {p.extends.length ? (
        <p className="text-[0.8125rem] leading-[1.6] text-fg-muted">
          Also accepts every prop of {p.extends.map((e, i) => (
            <span key={e}>{i ? ", " : ""}<code className="rounded-[5px] border border-border bg-sunken px-1 py-px font-mono text-[0.9em] text-fg">{e}</code></span>
          ))}, passed through to the root element.
        </p>
      ) : null}
    </div>
  )
}
