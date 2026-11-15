"use client"
import { AuditTrail } from "@/registry/ui/audit-trail"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Security events",
    description: "A sign-in and permissions log for a workspace settings page, newest first.",
    code: `<section className="w-full max-w-md">
  <h3 className="mb-2 text-sm font-medium text-fg">Security events</h3>
  <AuditTrail
    entries={[
      { id: "s1", actor: "Ada Novak", action: "signed in from a new device in", target: "Lisbon", time: "2026-11-14T22:10:00Z" },
      { id: "s2", actor: "Maya Chen", action: "removed", target: "Leo Brandt from the workspace", time: "2026-11-14T15:02:00Z" },
      { id: "s3", actor: "Theo Okafor", action: "created the API key", target: "Production server", time: "2026-11-13T10:30:00Z" },
      { id: "s4", actor: "Maya Chen", action: "required two-factor sign-in for everyone", time: "2026-11-10T09:00:00Z" },
    ]}
  />
</section>`,
    node: (
      <section className="w-full max-w-md">
        <h3 className="mb-2 text-sm font-medium text-fg">Security events</h3>
        <AuditTrail
          entries={[
            { id: "s1", actor: "Ada Novak", action: "signed in from a new device in", target: "Lisbon", time: "2026-11-14T22:10:00Z" },
            { id: "s2", actor: "Maya Chen", action: "removed", target: "Leo Brandt from the workspace", time: "2026-11-14T15:02:00Z" },
            { id: "s3", actor: "Theo Okafor", action: "created the API key", target: "Production server", time: "2026-11-13T10:30:00Z" },
            { id: "s4", actor: "Maya Chen", action: "required two-factor sign-in for everyone", time: "2026-11-10T09:00:00Z" },
          ]}
        />
      </section>
    ),
  },
  {
    title: "Deploy history",
    description: "The same list works for release logs: the target names the service and version.",
    code: `<AuditTrail
  entries={[
    { id: "d1", actor: "Theo Okafor", action: "deployed", target: "lumen-web v2.4.1", time: "2026-11-14T18:20:00Z" },
    { id: "d2", actor: "Priya Raman", action: "rolled back", target: "lumen-api to v1.9.3", time: "2026-11-14T13:45:00Z" },
    { id: "d3", actor: "Theo Okafor", action: "deployed", target: "lumen-api v1.9.4", time: "2026-11-14T13:31:00Z" },
  ]}
/>`,
    node: (
      <AuditTrail
        entries={[
          { id: "d1", actor: "Theo Okafor", action: "deployed", target: "lumen-web v2.4.1", time: "2026-11-14T18:20:00Z" },
          { id: "d2", actor: "Priya Raman", action: "rolled back", target: "lumen-api to v1.9.3", time: "2026-11-14T13:45:00Z" },
          { id: "d3", actor: "Theo Okafor", action: "deployed", target: "lumen-api v1.9.4", time: "2026-11-14T13:31:00Z" },
        ]}
      />
    ),
  },
]
