"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/ui/segmented-control"

/** A funnel chart with stage bars laid out horizontally or vertically, conversion rates and drop-off between stages, an optional comparison series and bars that spring to new values when the data changes. */
type FunnelStage = {
  label: string
  value: number
  /** Value from the comparison period, drawn as a dashed outline. */
  compare?: number
}

type FunnelDataset = { label: string; stages: FunnelStage[] }

type FunnelChartProps = {
  /** Stages from the top of the funnel down. */
  stages?: FunnelStage[]
  /** Datasets to switch between with a segmented control. Ignored when `stages` is set. */
  datasets?: FunnelDataset[]
  /** "auto" is horizontal when the container is at least 480px wide, vertical below that. */
  orientation?: "horizontal" | "vertical" | "auto"
  title?: string
  /** Legend text for the comparison series. */
  compareLabel?: string
  /** Formats values in the bars and the table. */
  format?: (value: number) => string
  /** Draw the comparison outline when stages carry `compare`. */
  showCompare?: boolean
  className?: string
}

const DATASETS: FunnelDataset[] = [
  {
    label: "All",
    stages: [
      { label: "Visitors", value: 48200, compare: 44100 },
      { label: "Signed up", value: 12840, compare: 11200 },
      { label: "Activated", value: 6120, compare: 5480 },
      { label: "Trial started", value: 3210, compare: 2900 },
      { label: "Paid", value: 1464, compare: 1210 },
    ],
  },
  {
    label: "Web",
    stages: [
      { label: "Visitors", value: 31400, compare: 29800 },
      { label: "Signed up", value: 9120, compare: 8300 },
      { label: "Activated", value: 4680, compare: 4120 },
      { label: "Trial started", value: 2510, compare: 2260 },
      { label: "Paid", value: 1182, compare: 980 },
    ],
  },
  {
    label: "Mobile",
    stages: [
      { label: "Visitors", value: 16800, compare: 14300 },
      { label: "Signed up", value: 3720, compare: 2900 },
      { label: "Activated", value: 1440, compare: 1360 },
      { label: "Trial started", value: 700, compare: 640 },
      { label: "Paid", value: 282, compare: 230 },
    ],
  },
]

const DATA_SPRING = { type: "spring", bounce: 0.12, duration: 0.7 } as const
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 })
const defaultFormat = (n: number) => compact.format(n)
const pct = (r: number) => `${(r * 100).toFixed(r < 0.1 ? 1 : 0)}%`

/**
 * A conversion funnel. Each stage is a bar sized against the first stage,
 * with the step conversion and the drop-off written between stages and an
 * overall rate in the header. Switch datasets and every bar springs to its
 * new size. Lays out as columns on wide containers and as rows on narrow ones.
 */
function FunnelChart({
  stages: stagesProp,
  datasets = DATASETS,
  orientation = "auto",
  title = "Visitors to paid",
  compareLabel = "Last month",
  format = defaultFormat,
  showCompare = true,
  className,
}: FunnelChartProps) {
  const reduce = useReducedMotion()
  const boxRef = React.useRef<HTMLDivElement>(null)
  const [narrow, setNarrow] = React.useState(false)
  const [set, setSet] = React.useState(datasets[0]?.label ?? "")
  const titleId = React.useId()

  React.useEffect(() => {
    const el = boxRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < 480))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const stages = stagesProp ?? datasets.find((d) => d.label === set)?.stages ?? datasets[0]?.stages ?? []
  const vertical = orientation === "vertical" || (orientation === "auto" && narrow)
  const max = Math.max(1, ...stages.map((s) => Math.max(s.value, showCompare ? (s.compare ?? 0) : 0)))
  const hasCompare = showCompare && stages.some((s) => s.compare != null)
  const first = stages[0]?.value ?? 0
  const last = stages[stages.length - 1]?.value ?? 0
  const overall = first > 0 ? last / first : 0
  const compareOverall = hasCompare && stages[0]?.compare ? (stages[stages.length - 1]?.compare ?? 0) / stages[0].compare! : null
  const spring = reduce ? { duration: 0 } : DATA_SPRING

  const rows = stages.map((s, i) => {
    const prev = i > 0 ? stages[i - 1].value : null
    const rate = prev ? s.value / prev : null
    const drop = prev != null ? prev - s.value : null
    return { ...s, i, rate, drop, size: s.value / max, cmp: s.compare != null ? s.compare / max : null }
  })

  return (
    <figure
      data-slot="funnel-chart"
      aria-labelledby={titleId}
      className={cn("w-full max-w-2xl rounded-xl border border-border bg-surface p-5 shadow-raised", className)}
    >
      <figcaption className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div>
          <p id={titleId} className="text-[0.8125rem] font-medium text-fg">
            {title}
          </p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-medium tracking-[-0.025em] text-fg tabular-nums">{pct(overall)}</span>
            <span className="text-xs text-fg-muted">
              overall
              {compareOverall != null ? <span className="tabular-nums"> · {pct(compareOverall)} {compareLabel.toLowerCase()}</span> : null}
            </span>
          </p>
        </div>
        {!stagesProp && datasets.length > 1 ? (
          <SegmentedControl size="sm" aria-label="Dataset" value={set} onChange={setSet} items={datasets.map((d) => d.label)} />
        ) : null}
      </figcaption>

      <div ref={boxRef} className="mt-5" aria-hidden>
        {vertical ? (
          <ol className="space-y-1">
            {rows.map((r) => (
              <li key={r.label} className="space-y-1">
                {r.rate != null ? (
                  <div className="grid grid-cols-[88px_1fr_56px] items-center gap-3">
                    <span />
                    <p className="truncate text-center text-[11px] text-fg-subtle tabular-nums">
                      <span className="rounded-md bg-sunken px-1.5 py-0.5 font-medium text-fg">{pct(r.rate)}</span> −{format(r.drop ?? 0)}
                    </p>
                    <span />
                  </div>
                ) : null}
                <div className="grid grid-cols-[88px_1fr_56px] items-center gap-3">
                  <span className="truncate text-xs text-fg-muted">{r.label}</span>
                  <div className="relative flex h-7 items-center justify-center rounded-md bg-sunken">
                    <motion.span
                      className="h-full rounded-md bg-accent"
                      initial={false}
                      animate={{ width: `${Math.max(1, r.size * 100)}%` }}
                      transition={spring}
                    />
                    {hasCompare && r.cmp != null ? (
                      <motion.span
                        className="pointer-events-none absolute inset-y-0 rounded-md border border-dashed border-fg/45"
                        initial={false}
                        animate={{ width: `${Math.max(1, r.cmp * 100)}%` }}
                        transition={spring}
                        style={{ left: "50%", x: "-50%" }}
                      />
                    ) : null}
                  </div>
                  <span className="text-right text-xs font-medium text-fg tabular-nums">{format(r.value)}</span>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="flex items-stretch">
            {rows.map((r) => (
              <React.Fragment key={r.label}>
                {r.rate != null ? (
                  <div className="flex w-16 shrink-0 flex-col items-center justify-center gap-0.5 pb-9">
                    <span className="rounded-md bg-sunken px-1.5 py-0.5 text-[11px] font-medium text-fg tabular-nums">{pct(r.rate)}</span>
                    <span className="text-[11px] text-fg-subtle tabular-nums">−{format(r.drop ?? 0)}</span>
                  </div>
                ) : null}
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="truncate text-lg font-medium tracking-[-0.02em] text-fg tabular-nums">{format(r.value)}</p>
                  {hasCompare ? (
                    <p className="truncate text-[11px] text-fg-subtle tabular-nums">{r.compare != null ? `vs ${format(r.compare)}` : " "}</p>
                  ) : null}
                  <div className="relative mt-2 h-40 rounded-md bg-sunken">
                    <motion.span
                      className="absolute inset-x-0 bottom-0 rounded-md bg-accent"
                      initial={false}
                      animate={{ height: `${Math.max(1, r.size * 100)}%` }}
                      transition={spring}
                    />
                    {hasCompare && r.cmp != null ? (
                      <motion.span
                        className="pointer-events-none absolute inset-x-0 bottom-0 rounded-md border border-dashed border-fg/45"
                        initial={false}
                        animate={{ height: `${Math.max(1, r.cmp * 100)}%` }}
                        transition={spring}
                      />
                    ) : null}
                  </div>
                  <p className="mt-2 line-clamp-2 min-h-[2.6em] pr-1 text-xs leading-[1.3] text-fg-muted">{r.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
        {hasCompare ? (
          <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-[11px] text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-3 rounded-sm bg-accent" /> {set || "This month"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-3 rounded-sm border border-dashed border-fg/45" /> {compareLabel}
            </span>
          </div>
        ) : null}
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col">Value</th>
            <th scope="col">Step conversion</th>
            <th scope="col">Drop-off</th>
            {hasCompare ? <th scope="col">{compareLabel}</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>{r.value.toLocaleString("en-US")}</td>
              <td>{r.rate != null ? pct(r.rate) : "Top of funnel"}</td>
              <td>{r.drop != null ? r.drop.toLocaleString("en-US") : "0"}</td>
              {hasCompare ? <td>{r.compare != null ? r.compare.toLocaleString("en-US") : ""}</td> : null}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Overall conversion</th>
            <td colSpan={hasCompare ? 4 : 3}>{pct(overall)}</td>
          </tr>
        </tfoot>
      </table>
    </figure>
  )
}

export { FunnelChart }
export type { FunnelChartProps, FunnelStage, FunnelDataset }
