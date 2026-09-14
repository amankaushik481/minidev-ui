"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/ui/segmented-control"

function EnvSwitcher({
  value = "prod",
  onChange,
  className,
}: {
  value?: string
  onChange?: (v: string) => void
  className?: string
}) {
  return (
    <div data-slot="env-switcher" className={cn(className)}>
      <SegmentedControl
        value={value}
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
