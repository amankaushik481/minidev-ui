"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/ui/segmented-control"

/**
 * EnvSwitcher — a Dev / Staging / Prod segmented control for scoping a console to one environment.
 *
 * Use in a dashboard header or settings page to choose which environment's
 * keys, logs or config are shown. To label a single environment use
 * `EnvBadge`; for other option sets use `SegmentedControl` directly.
 *
 * @example
 * const [env, setEnv] = React.useState("prod")
 * <EnvSwitcher value={env} onChange={setEnv} />
 */
type EnvSwitcherProps = {
  /** Controlled environment: "dev", "staging" or "prod". */
  value?: string
  /** Initial environment when uncontrolled. */
  defaultValue?: string
  /** Called with "dev", "staging" or "prod". */
  onChange?: (v: string) => void
  className?: string
}

function EnvSwitcher({ value, defaultValue = "prod", onChange, className }: EnvSwitcherProps) {
  return (
    <div data-slot="env-switcher" className={cn(className)}>
      <SegmentedControl
        aria-label="Environment"
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        options={[
          { value: "dev", label: "Dev" },
          { value: "staging", label: "Staging" },
          { value: "prod", label: "Prod" },
        ]}
      />
    </div>
  )
}
export { EnvSwitcher }
export type { EnvSwitcherProps }
