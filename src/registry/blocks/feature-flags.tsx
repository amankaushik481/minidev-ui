"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { FeatureFlagToggle } from "@/registry/ui/feature-flag-toggle"
import { PageHeader } from "@/registry/ui/page-header"

/**
 * FeatureFlags — an admin page of named flags, each a row with a description and a switch, plus a live "n of m on" count.
 *
 * Use for workspace-level flags, betas and experiments. For a single flag row use FeatureFlagToggle; for
 * per-channel notification switches use NotificationPreferences. State lives in the block; wire `onChange`
 * to persist each flip.
 *
 * @example
 * <FeatureFlags onChange={(flag, on) => api.flags.set(flag, on)} />
 */
type FeatureFlagsProps = {
  /** Called with the flag name and its new state after every flip. */
  onChange?: (flag: string, enabled: boolean) => void
  className?: string
}

const FLAGS = [
  { name: "ask-lumen-v2", description: "Answers cite the rows they came from." },
  { name: "anomaly-alerts-sms", description: "Send critical anomalies by text as well as Slack." },
  { name: "eu-residency", description: "Store aggregates in Frankfurt instead of Virginia." },
  { name: "board-pack-autodraft", description: "Draft the monthly board pack on the first business day." },
]

function FeatureFlags({ onChange, className }: FeatureFlagsProps) {
  const [on, setOn] = React.useState<Record<string, boolean>>({ "ask-lumen-v2": true, "board-pack-autodraft": true })
  const count = FLAGS.filter((f) => on[f.name]).length
  return (
    <div data-slot="feature-flags" className={cn("space-y-4", className)}>
      <PageHeader
        title="Feature flags"
        description={
          <span aria-live="polite" className="tabular-nums">
            {count} of {FLAGS.length} on for the Northwind workspace
          </span>
        }
      />
      <ul className="space-y-2">
        {FLAGS.map((f) => (
          <li key={f.name}>
            <FeatureFlagToggle
              name={f.name}
              description={f.description}
              checked={!!on[f.name]}
              onCheckedChange={(v) => {
                setOn((s) => ({ ...s, [f.name]: v }))
                onChange?.(f.name, v)
              }}
              className="[&_label]:font-mono"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export { FeatureFlags }
export type { FeatureFlagsProps }
