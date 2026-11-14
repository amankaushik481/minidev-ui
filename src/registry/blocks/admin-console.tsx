"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { OrgSwitcher } from "@/registry/ui/org-switcher"
import { ImpersonationBanner } from "@/registry/ui/impersonation-banner"
import { AdminStatStrip } from "@/registry/ui/admin-stat-strip"
import { AdminUserRow } from "@/registry/ui/admin-user-row"
import { AuditFilterBar } from "@/registry/ui/audit-filter-bar"
import { ResourceQuotaGrid } from "@/registry/ui/resource-quota-grid"
import { SsoProviderCard } from "@/registry/ui/sso-provider-card"
import { IpAllowlist } from "@/registry/ui/ip-allowlist"
import { BulkUserImport } from "@/registry/ui/bulk-user-import"
import { PageHeader } from "@/registry/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

/**
 * AdminConsole — a workspace admin area: impersonation banner, org switcher, KPIs, then tabs for users, security, quotas and import.
 *
 * Use as the full admin screen of a B2B app. Every panel is a registry component (AdminUserRow, AuditFilterBar,
 * SsoProviderCard, IpAllowlist, ResourceQuotaGrid, BulkUserImport), so drop tabs you do not need. For a lighter
 * landing page use AdminOverview; for a searchable member table use UsersTablePage.
 *
 * @example
 * <AdminConsole />
 */
type AdminConsoleProps = {
  className?: string
}

function AdminConsole({ className }: AdminConsoleProps) {
  const [org, setOrg] = React.useState("1")
  const [sso, setSso] = React.useState(true)
  return (
    <div data-slot="admin-console" className={cn("space-y-6", className)}>
      <ImpersonationBanner user="tom@halcyon.co" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageHeader title="Admin" description="Users, security and quotas for your organization." className="mb-0 border-0 pb-0" />
        <OrgSwitcher
          value={org}
          onChange={setOrg}
          orgs={[
            { id: "1", name: "Halcyon Health", plan: "Scale" },
            { id: "2", name: "Northwind Traders", plan: "Team" },
          ]}
        />
      </div>
      <AdminStatStrip
        stats={[
          { label: "Seats", value: "42", delta: 8 },
          { label: "Active today", value: "128", delta: 3.2 },
          { label: "API errors", value: "0.4%", delta: -12 },
          { label: "Audit events", value: "1.2k", delta: 5 },
        ]}
      />
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="quotas">Quotas</TabsTrigger>
          <TabsTrigger value="import">Import</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="rounded-xl border border-border bg-surface">
          <AdminUserRow name="Priya Raman" email="priya@halcyon.co" role="admin" online />
          <AdminUserRow name="Tom Lindqvist" email="tom@halcyon.co" role="write" online={false} />
          <AdminUserRow name="Sofia Marín" email="sofia@halcyon.co" role="read" online />
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <AuditFilterBar />
          <div className="grid gap-4 lg:grid-cols-2">
            <SsoProviderCard name="SAML" description="Okta single sign-on for every member." enabled={sso} configured onEnabledChange={setSso} />
            <IpAllowlist />
          </div>
        </TabsContent>
        <TabsContent value="quotas">
          <ResourceQuotaGrid
            items={[
              { label: "Seats", used: 42, max: 50 },
              { label: "API calls", used: 820000, max: 1000000 },
              { label: "Storage", used: 18, max: 100 },
              { label: "Automations", used: 12, max: 25 },
            ]}
          />
        </TabsContent>
        <TabsContent value="import">
          <BulkUserImport />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export { AdminConsole }
export type { AdminConsoleProps }
