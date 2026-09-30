import { COMPONENT_PROPS } from "@/lib/component-props"

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
        <div className="overflow-x-auto rounded-xl border border-border">
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
                <tr key={x.name} className="border-t border-border align-top">
                  <th scope="row" className="px-4 py-2.5 text-left font-normal">
                    <code className="font-mono text-[12.5px] text-fg">{x.name}{x.optional ? "" : "*"}</code>
                    {x.doc ? <span className="mt-1 block max-w-[260px] text-[12px] leading-[1.5] text-fg-muted">{x.doc}</span> : null}
                  </th>
                  <td className="px-4 py-2.5"><code className="font-mono text-[12px] break-words text-accent-fg">{x.type}</code></td>
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
      {p.props.some((x) => !x.optional) ? <p className="text-[12px] text-fg-subtle">* required</p> : null}
    </div>
  )
}
