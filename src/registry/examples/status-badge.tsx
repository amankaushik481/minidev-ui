import { StatusBadge } from "@/registry/ui/status-badge"
import type { Example } from "./types"

const deploys = [
  { service: "lumen-web", env: "Production", version: "4.2.0", tone: "success", status: "Live" },
  { service: "lumen-api", env: "Production", version: "4.2.0", tone: "info", status: "Deploying" },
  { service: "lumen-workers", env: "Staging", version: "4.3.0-rc.1", tone: "warning", status: "Degraded" },
  { service: "lumen-exports", env: "Staging", version: "4.3.0-rc.1", tone: "danger", status: "Failed" },
  { service: "lumen-docs", env: "Preview", version: "pr-812", tone: "neutral", status: "Idle" },
] as const

export const examples: Example[] = [
  {
    title: "Tones",
    description: "Six tones share one height and lightness; the dot carries the colour so the text can stay short.",
    code: `<StatusBadge>Draft</StatusBadge>
<StatusBadge tone="success">Paid</StatusBadge>
<StatusBadge tone="warning">Due soon</StatusBadge>
<StatusBadge tone="danger">Overdue</StatusBadge>
<StatusBadge tone="accent">Scheduled</StatusBadge>
<StatusBadge tone="info">Processing</StatusBadge>`,
    node: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <StatusBadge>Draft</StatusBadge>
        <StatusBadge tone="success">Paid</StatusBadge>
        <StatusBadge tone="warning">Due soon</StatusBadge>
        <StatusBadge tone="danger">Overdue</StatusBadge>
        <StatusBadge tone="accent">Scheduled</StatusBadge>
        <StatusBadge tone="info">Processing</StatusBadge>
      </div>
    ),
  },
  {
    title: "In a table",
    description: "Badges sit in a status column without stretching the rows; map your own states to tones once and reuse the mapping.",
    code: `const deploys = [
  { service: "lumen-web", env: "Production", version: "4.2.0", tone: "success", status: "Live" },
  { service: "lumen-api", env: "Production", version: "4.2.0", tone: "info", status: "Deploying" },
  { service: "lumen-workers", env: "Staging", version: "4.3.0-rc.1", tone: "warning", status: "Degraded" },
  { service: "lumen-exports", env: "Staging", version: "4.3.0-rc.1", tone: "danger", status: "Failed" },
  { service: "lumen-docs", env: "Preview", version: "pr-812", tone: "neutral", status: "Idle" },
] as const

<table className="w-full max-w-lg text-sm">
  <thead>
    <tr className="text-left text-xs text-fg-muted">
      <th className="pb-2 font-medium">Service</th>
      <th className="pb-2 font-medium">Environment</th>
      <th className="pb-2 font-medium">Version</th>
      <th className="pb-2 text-right font-medium">Status</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-border">
    {deploys.map((d) => (
      <tr key={d.service}>
        <td className="py-2 font-medium text-fg">{d.service}</td>
        <td className="py-2 text-fg-muted">{d.env}</td>
        <td className="py-2 font-mono text-xs text-fg-muted">{d.version}</td>
        <td className="py-2 text-right"><StatusBadge tone={d.tone}>{d.status}</StatusBadge></td>
      </tr>
    ))}
  </tbody>
</table>`,
    node: (
      <table className="w-full max-w-lg text-sm">
        <thead>
          <tr className="text-left text-xs text-fg-muted">
            <th className="pb-2 font-medium">Service</th>
            <th className="pb-2 font-medium">Environment</th>
            <th className="pb-2 font-medium">Version</th>
            <th className="pb-2 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {deploys.map((d) => (
            <tr key={d.service}>
              <td className="py-2 font-medium text-fg">{d.service}</td>
              <td className="py-2 text-fg-muted">{d.env}</td>
              <td className="py-2 font-mono text-xs text-fg-muted">{d.version}</td>
              <td className="py-2 text-right"><StatusBadge tone={d.tone}>{d.status}</StatusBadge></td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
]
