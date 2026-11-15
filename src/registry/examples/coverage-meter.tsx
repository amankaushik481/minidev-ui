"use client"
import { CoverageMeter } from "@/registry/ui/coverage-meter"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Per package",
    description: "Green at or above good (80), amber at or above warn (60), red below. Values round to one decimal.",
    code: `<div className="flex w-full max-w-sm flex-col gap-4">
  <CoverageMeter label="packages/billing" value={91.24} />
  <CoverageMeter label="packages/ledger-sync" value={72.6} />
  <CoverageMeter label="apps/web" value={48} />
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <CoverageMeter label="packages/billing" value={91.24} />
        <CoverageMeter label="packages/ledger-sync" value={72.6} />
        <CoverageMeter label="apps/web" value={48} />
      </div>
    ),
  },
  {
    title: "Stricter thresholds",
    description: "Raise good and warn for code that must stay well covered, such as payment logic.",
    code: `<CoverageMeter className="w-full max-w-sm" label="Branch coverage, payments" value={88} good={95} warn={85} />`,
    node: <CoverageMeter className="w-full max-w-sm" label="Branch coverage, payments" value={88} good={95} warn={85} />,
  },
]
