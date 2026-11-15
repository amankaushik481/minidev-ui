"use client"
import { EnvBadge } from "@/registry/ui/env-badge"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Three environments",
    description: "Production gets a red edge; the name is always written out.",
    code: `<div className="flex gap-2">
  <EnvBadge env="production" />
  <EnvBadge env="staging" />
  <EnvBadge env="development" />
</div>`,
    node: (
      <div className="flex gap-2">
        <EnvBadge env="production" />
        <EnvBadge env="staging" />
        <EnvBadge env="development" />
      </div>
    ),
  },
  {
    title: "Beside keys and deploys",
    description: "Put the badge next to anything that is easy to mix up between environments.",
    code: `<ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface text-sm">
  <li className="flex items-center justify-between gap-3 px-3 py-2">
    <span className="font-mono text-xs text-fg">nw_live_••••4f8c</span>
    <EnvBadge env="production" />
  </li>
  <li className="flex items-center justify-between gap-3 px-3 py-2">
    <span className="font-mono text-xs text-fg">nw_test_••••0b77</span>
    <EnvBadge env="staging" />
  </li>
</ul>`,
    node: (
      <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface text-sm">
        <li className="flex items-center justify-between gap-3 px-3 py-2">
          <span className="font-mono text-xs text-fg">nw_live_••••4f8c</span>
          <EnvBadge env="production" />
        </li>
        <li className="flex items-center justify-between gap-3 px-3 py-2">
          <span className="font-mono text-xs text-fg">nw_test_••••0b77</span>
          <EnvBadge env="staging" />
        </li>
      </ul>
    ),
  },
]
