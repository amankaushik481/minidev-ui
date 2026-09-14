"use client"
import * as React from "react"
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

function EngineeringConsole() {
  const [env, setEnv] = React.useState("prod")
  return (
    <div data-slot="engineering-console" className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeader title="Engineering" description="Pipelines, traces, reviews" className="mb-0 border-0 pb-0" />
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
          <CommitRow />
          <CommitRow sha="f90e1ab" message="Wave 5 free density" author="Casey" />
          <CommitRow sha="77c2d10" message="Sticky story contrast fix" author="Riley" />
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
