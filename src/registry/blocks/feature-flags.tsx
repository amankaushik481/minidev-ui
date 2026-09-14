"use client"
import { PageHeader } from "@/registry/ui/page-header"
import { Switch } from "@/registry/ui/switch"
import { Label } from "@/registry/ui/label"
function FeatureFlags() {
  return (
    <div data-slot="feature-flags" className="space-y-4">
      <PageHeader title="Feature flags" />
      <div className="space-y-3 rounded-xl border border-border p-4">
        {["ai-chat", "billing-v2", "new-gallery"].map((flag) => (
          <div key={flag} className="flex items-center justify-between">
            <Label htmlFor={flag} className="font-mono text-xs">
              {flag}
            </Label>
            <Switch id={flag} defaultChecked={flag !== "billing-v2"} />
          </div>
        ))}
      </div>
    </div>
  )
}
export { FeatureFlags }
