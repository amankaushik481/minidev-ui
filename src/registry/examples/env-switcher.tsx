"use client"
import * as React from "react"
import { EnvSwitcher } from "@/registry/ui/env-switcher"
import { EnvBadge } from "@/registry/ui/env-badge"
import type { Example } from "./types"

const FULL = { dev: "development", staging: "staging", prod: "production" } as const
const DB = { dev: "localhost:5432/northwind", staging: "db.staging.internal/northwind", prod: "db.prod.internal/northwind" } as const

function ScopedDemo() {
  const [env, setEnv] = React.useState<keyof typeof FULL>("staging")
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <EnvSwitcher value={env} onChange={(v) => setEnv(v as keyof typeof FULL)} />
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2">
        <code className="truncate font-mono text-xs text-fg">{DB[env]}</code>
        <EnvBadge env={FULL[env]} />
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Scope a panel to one environment",
    description: "onChange gets dev, staging or prod. EnvBadge uses full names, so map between them.",
    code: `const FULL = { dev: "development", staging: "staging", prod: "production" } as const
const DB = { dev: "localhost:5432/northwind", staging: "db.staging.internal/northwind", prod: "db.prod.internal/northwind" } as const

function ScopedDemo() {
  const [env, setEnv] = React.useState<keyof typeof FULL>("staging")
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <EnvSwitcher value={env} onChange={(v) => setEnv(v as keyof typeof FULL)} />
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2">
        <code className="truncate font-mono text-xs text-fg">{DB[env]}</code>
        <EnvBadge env={FULL[env]} />
      </div>
    </div>
  )
}`,
    node: <ScopedDemo />,
  },
  {
    title: "Start on development",
    description: "Uncontrolled, it starts on Prod unless you pass defaultValue.",
    code: `<EnvSwitcher defaultValue="dev" />`,
    node: <EnvSwitcher defaultValue="dev" />,
  },
]
