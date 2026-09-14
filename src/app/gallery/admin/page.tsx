"use client"
import * as React from "react"
import { AdminConsole } from "@/registry/blocks/admin-console"
import { OrgSwitcher } from "@/registry/ui/org-switcher"
import { ImpersonationBanner } from "@/registry/ui/impersonation-banner"
import { PermissionChip } from "@/registry/ui/permission-chip"
import { AdminStatStrip } from "@/registry/ui/admin-stat-strip"
import { IpAllowlist } from "@/registry/ui/ip-allowlist"
import { SsoProviderCard } from "@/registry/ui/sso-provider-card"
import { ResourceQuotaGrid } from "@/registry/ui/resource-quota-grid"
import { AuditFilterBar } from "@/registry/ui/audit-filter-bar"
import { BulkUserImport } from "@/registry/ui/bulk-user-import"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  const [org, setOrg] = React.useState("1")
  const [sso, setSso] = React.useState(true)
  return (
    <GalleryPage title="Admin">
      <GallerySection title="Console block">
        <div className="w-full"><AdminConsole /></div>
      </GallerySection>
      <GallerySection title="Pieces">
        <div className="flex w-full flex-col gap-4">
          <ImpersonationBanner user="casey@acme.com" />
          <div className="flex flex-wrap items-center gap-3">
            <OrgSwitcher
              value={org}
              onChange={setOrg}
              orgs={[
                { id: "1", name: "Acme", plan: "Studio" },
                { id: "2", name: "MiniDev", plan: "Premium" },
              ]}
            />
            <PermissionChip level="admin" />
            <PermissionChip level="write" />
            <PermissionChip level="read" />
          </div>
          <AdminStatStrip
            stats={[
              { label: "Seats", value: "42", delta: 8 },
              { label: "Active", value: "128", delta: 3.2 },
              { label: "Errors", value: "0.4%", delta: -12 },
            ]}
          />
          <AuditFilterBar />
          <div className="grid w-full gap-4 lg:grid-cols-2">
            <SsoProviderCard name="SAML" description="Enterprise IdP" enabled={sso} configured onEnabledChange={setSso} />
            <IpAllowlist />
          </div>
          <ResourceQuotaGrid
            items={[
              { label: "Seats", used: 42, max: 50 },
              { label: "API", used: 820000, max: 1000000 },
              { label: "Storage", used: 18, max: 100 },
            ]}
          />
          <BulkUserImport />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
