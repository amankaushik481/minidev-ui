"use client"
import * as React from "react"
import { PlusIcon, TrashIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * QueryBuilder — rows of "field / operator / value" filter clauses joined by AND, with add and remove.
 *
 * Use it for advanced filters on issue lists, tables and logs. Controlled with `value` +
 * `onChange`, or uncontrolled with `defaultValue`. For quick one-tap filters use FilterBar or
 * ChipFilter.
 *
 * @example
 * const [clauses, setClauses] = React.useState<Clause[]>([{ id: "1", field: "status", op: "is", value: "open" }])
 * <QueryBuilder value={clauses} onChange={setClauses} fields={["status", "assignee", "label"]} />
 */

type Clause = {
  /** Stable key for the row. */
  id: string
  field: string
  op: string
  value: string
}

const SAMPLE: Clause[] = [
  { id: "1", field: "status", op: "is", value: "open" },
  { id: "2", field: "assignee", op: "is", value: "me" },
]

const control =
  "h-9 rounded-lg border border-border bg-bg px-2 text-sm text-fg outline-none transition-[border-color,box-shadow] duration-[140ms] ease-hairline hover:border-border-strong focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]"

function QueryBuilder({
  value,
  defaultValue = SAMPLE,
  onChange,
  fields = ["status", "assignee", "priority"],
  operators = ["is", "is not", "contains"],
  className,
}: {
  /** Controlled clauses. */
  value?: Clause[]
  /** Starting clauses when uncontrolled. */
  defaultValue?: Clause[]
  /** Fires with the full clause list after every edit, add or remove. */
  onChange?: (clauses: Clause[]) => void
  /** Field names offered in the first select. */
  fields?: string[]
  /** Operators offered in the second select. */
  operators?: string[]
  className?: string
}) {
  const [inner, setInner] = React.useState(defaultValue)
  const clauses = value ?? inner
  const seq = React.useRef(0)
  const addRef = React.useRef<HTMLButtonElement>(null)
  const uid = React.useId()
  const commit = (next: Clause[]) => {
    if (value === undefined) setInner(next)
    onChange?.(next)
  }
  const patch = (id: string, part: Partial<Clause>) => commit(clauses.map((x) => (x.id === id ? { ...x, ...part } : x)))

  return (
    <div data-slot="query-builder" className={cn("space-y-2 rounded-xl border border-border bg-surface p-3", className)}>
      {clauses.map((c, i) => (
        <div key={c.id} role="group" aria-label={`Filter ${i + 1}`} className="flex flex-wrap items-center gap-2">
          <span className="w-10 text-xs font-medium text-fg-muted">{i > 0 ? "AND" : "Where"}</span>
          <label className="sr-only" htmlFor={`${uid}-field-${c.id}`}>Field</label>
          <select id={`${uid}-field-${c.id}`} value={c.field} onChange={(e) => patch(c.id, { field: e.target.value })} className={control}>
            {fields.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <label className="sr-only" htmlFor={`${uid}-op-${c.id}`}>Operator</label>
          <select id={`${uid}-op-${c.id}`} value={c.op} onChange={(e) => patch(c.id, { op: e.target.value })} className={control}>
            {operators.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <input
            aria-label="Value"
            value={c.value}
            onChange={(e) => patch(c.id, { value: e.target.value })}
            className={cn(control, "w-28 placeholder:text-fg-subtle")}
            placeholder="Value"
          />
          <IconButton
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label={`Remove filter ${i + 1}`}
            onClick={() => {
              commit(clauses.filter((x) => x.id !== c.id))
              // The row and its button are gone; keep keyboard focus inside the builder.
              addRef.current?.focus()
            }}
          >
            <TrashIcon aria-hidden />
          </IconButton>
        </div>
      ))}
      <Button
        ref={addRef}
        type="button"
        size="sm"
        variant="outline"
        onClick={() => commit([...clauses, { id: `${uid}-new-${++seq.current}`, field: fields[0] ?? "", op: operators[0] ?? "", value: "" }])}
      >
        <PlusIcon aria-hidden /> Add filter
      </Button>
    </div>
  )
}
export { QueryBuilder }
export type { Clause }
