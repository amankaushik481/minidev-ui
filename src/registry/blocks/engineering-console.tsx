"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/registry/ui/page-header"
import { BuildPipeline } from "@/registry/ui/build-pipeline"
import { CommitRow } from "@/registry/ui/commit-row"
import { CheckRunList } from "@/registry/ui/check-run-list"
import { TraceWaterfall } from "@/registry/ui/trace-waterfall"
import { CoverageMeter } from "@/registry/ui/coverage-meter"
import { EnvSwitcher } from "@/registry/ui/env-switcher"
import { ReviewRequestCard } from "@/registry/ui/review-request-card"
import { MergeBox } from "@/registry/ui/merge-box"
import { SecretReveal } from "@/registry/ui/secret-reveal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

/**
 * EngineeringConsole — a dev-ops page: environment switch, the build pipeline, then tabs for commits, checks, trace and review.
 *
 * Use as the engineering home of an internal tool or a developer product. Every panel is a registry component
 * (BuildPipeline, CommitRow, CheckRunList, TraceWaterfall, ReviewRequestCard, MergeBox), so drop tabs you do not need.
 * For workspace administration use AdminConsole; for raw log lines use LogsViewer.
 *
 * @example
 * <EngineeringConsole defaultEnv="staging" />
 */
type EngineeringConsoleProps = {
  /** Environment selected on first render. */
  defaultEnv?: "dev" | "staging" | "prod"
  className?: string
}

function EngineeringConsole({ defaultEnv = "prod", className }: EngineeringConsoleProps) {
  const [env, setEnv] = React.useState<string>(defaultEnv)
  return (
    <div data-slot="engineering-console" className={cn("space-y-6", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeader title="Engineering" description="Builds, checks and reviews for lumen-web." className="mb-0 border-0 pb-0" />
        <EnvSwitcher value={env} onChange={setEnv} />
      </div>
      <BuildPipeline />
      <Tabs defaultValue="commits">
        <TabsList>
          <TabsTrigger value="commits">Commits</TabsTrigger>
          <TabsTrigger value="checks">Checks</TabsTrigger>
          <TabsTrigger value="trace">Trace</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>
        <TabsContent value="commits" className="rounded-xl border border-border bg-surface">
          <CommitRow sha="a41c9e2" message="Cite source rows in Ask Lumen answers" author="Hana Ito" date="2026-11-14T09:30:00Z" />
          <CommitRow sha="f90e1ab" message="Fix invoice rounding on prorated seats" author="Tom Lindqvist" date="2026-11-13T16:05:00Z" />
          <CommitRow sha="77c2d10" message="Retry HubSpot sync on 429" author="Marcus Webb" date="2026-11-12T11:42:00Z" />
        </TabsContent>
        <TabsContent value="checks" className="space-y-4">
          <CheckRunList />
          <CoverageMeter value={91} />
          <SecretReveal />
        </TabsContent>
        <TabsContent value="trace">
          <TraceWaterfall />
        </TabsContent>
        <TabsContent value="review" className="grid gap-4 lg:grid-cols-2">
          <ReviewRequestCard />
          <MergeBox />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export { EngineeringConsole }
export type { EngineeringConsoleProps }
