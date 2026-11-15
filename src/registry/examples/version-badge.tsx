"use client"
import { VersionBadge } from "@/registry/ui/version-badge"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Release channels",
    description: "A leading v is optional; pre-release text is shown as given beside the channel pill.",
    code: `<div className="flex flex-wrap gap-2">
  <VersionBadge version="2.4.1" channel="stable" />
  <VersionBadge version="v2.5.0-rc.1" channel="beta" />
  <VersionBadge version="2.6.0-canary.14" channel="canary" />
</div>`,
    node: (
      <div className="flex flex-wrap gap-2">
        <VersionBadge version="2.4.1" channel="stable" />
        <VersionBadge version="v2.5.0-rc.1" channel="beta" />
        <VersionBadge version="2.6.0-canary.14" channel="canary" />
      </div>
    ),
  },
  {
    title: "Changelog entry",
    description: "Without channel it is a plain version tag next to the release date.",
    code: `<div className="w-full max-w-md space-y-1">
  <div className="flex items-center gap-2">
    <VersionBadge version="2.4.1" />
    <span className="text-xs text-fg-subtle">Nov 12, 2026</span>
  </div>
  <p className="text-sm text-fg">Invoices export to CSV with their line items.</p>
</div>`,
    node: (
      <div className="w-full max-w-md space-y-1">
        <div className="flex items-center gap-2">
          <VersionBadge version="2.4.1" />
          <span className="text-xs text-fg-subtle">Nov 12, 2026</span>
        </div>
        <p className="text-sm text-fg">Invoices export to CSV with their line items.</p>
      </div>
    ),
  },
]
