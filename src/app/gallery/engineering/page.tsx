"use client"
import * as React from "react"
import { EngineeringConsole } from "@/registry/blocks/engineering-console"
import { ShortcutCheatSheet } from "@/registry/ui/shortcut-cheat-sheet"
import { QueryBuilder } from "@/registry/ui/query-builder"
import { SavedViews } from "@/registry/ui/saved-views"
import { PeekPanel } from "@/registry/ui/peek-panel"
import { UptimeBar } from "@/registry/ui/uptime-bar"
import { IncidentBanner } from "@/registry/ui/incident-banner"
import { LiveCursorsBar } from "@/registry/ui/live-cursors-bar"
import { PublishBar } from "@/registry/ui/publish-bar"
import { WaffleChart } from "@/registry/ui/waffle-chart"
import { GoalRing } from "@/registry/ui/goal-ring"
import { StreakCalendar } from "@/registry/ui/streak-calendar"
import { RegionPicker } from "@/registry/ui/region-picker"
import { SchemaFieldRow } from "@/registry/ui/schema-field-row"
import { SqlResultTable } from "@/registry/ui/sql-result-table"
import { WindowChrome } from "@/registry/ui/window-chrome"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  const [region, setRegion] = React.useState("us-east")
  return (
    <GalleryPage title="Engineering">
      <GallerySection title="Console">
        <div className="w-full"><EngineeringConsole /></div>
      </GallerySection>
      <GallerySection title="Incident / uptime">
        <div className="flex w-full flex-col gap-4">
          <IncidentBanner />
          <div className="grid gap-4 sm:grid-cols-2">
            <UptimeBar />
            <UptimeBar label="Workers" downtimes={[3, 18]} />
          </div>
        </div>
      </GallerySection>
      <GallerySection title="Query / views / peek">
        <div className="grid w-full gap-4 lg:grid-cols-[200px_1fr_280px]">
          <SavedViews />
          <QueryBuilder />
          <PeekPanel title="Issue MD-214">
            <p className="text-sm text-fg-muted">Raise the Premium bar without breaking the audit gate.</p>
          </PeekPanel>
        </div>
      </GallerySection>
      <GallerySection title="Collab / publish / regions">
        <div className="flex w-full flex-col gap-4">
          <LiveCursorsBar />
          <PublishBar />
          <RegionPicker value={region} onChange={setRegion} />
        </div>
      </GallerySection>
      <GallerySection title="Data shapes">
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <WaffleChart />
          <GoalRing />
          <StreakCalendar />
          <ShortcutCheatSheet />
        </div>
      </GallerySection>
      <GallerySection title="Schema / SQL / window">
        <div className="flex w-full flex-col gap-4">
          <div className="rounded-xl border border-border bg-surface px-4">
            <SchemaFieldRow name="id" type="string" required description="Stable identifier" />
            <SchemaFieldRow name="tier" type="'free' | 'premium'" description="Registry commercial tier" />
          </div>
          <SqlResultTable />
          <WindowChrome title="minidev — audit">
            <p className="text-sm text-fg-muted">Screenshots + axe on every gallery route.</p>
          </WindowChrome>
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
