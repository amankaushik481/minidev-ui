"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * RegionPicker — a grid of selectable region cards, each with a name and a latency hint.
 *
 * Use it in deploy and project setup flows to choose a data region. It is a radio group: Tab
 * lands on the selected card, arrow keys move and select. For a plain list of options use
 * RadioGroup or Select.
 *
 * @example
 * const [region, setRegion] = React.useState("eu-west")
 * <RegionPicker value={region} onChange={setRegion} regions={[{ id: "eu-west", label: "EU West", latency: "42ms" }, { id: "us-east", label: "US East" }]} />
 */

type Region = {
  id: string
  label: string
  /** Muted detail under the label, e.g. "42ms" or "Frankfurt". */
  latency?: string
}

const SAMPLE_REGIONS: Region[] = [
  { id: "us-east", label: "US East", latency: "18ms" },
  { id: "eu-west", label: "EU West", latency: "42ms" },
  { id: "ap-south", label: "AP South", latency: "68ms" },
]

function RegionPicker({
  regions = SAMPLE_REGIONS,
  value,
  defaultValue,
  onChange,
  "aria-label": ariaLabel = "Region",
  className,
}: {
  /** Regions to offer. */
  regions?: Region[]
  /** Controlled region id. */
  value?: string
  /** Starting region id when uncontrolled. Defaults to the first region. */
  defaultValue?: string
  /** Fires with the picked region id. */
  onChange?: (id: string) => void
  /** Accessible name of the group. */
  "aria-label"?: string
  className?: string
}) {
  const [inner, setInner] = React.useState(defaultValue ?? regions[0]?.id)
  const current = value ?? inner
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const selected = regions.findIndex((r) => r.id === current)
  const pick = (i: number) => {
    const id = regions[i].id
    if (value === undefined) setInner(id)
    onChange?.(id)
  }
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = regions.length
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + n) % n
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : -1
    if (next < 0) return
    e.preventDefault()
    refs.current[next]?.focus()
    pick(next)
  }
  return (
    <div data-slot="region-picker" role="radiogroup" aria-label={ariaLabel} className={cn("grid gap-2 sm:grid-cols-3", className)}>
      {regions.map((r, i) => {
        const on = i === selected
        return (
          <button
            key={r.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={i === (selected < 0 ? 0 : selected) ? 0 : -1}
            data-state={on ? "on" : "off"}
            onClick={() => pick(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "rounded-xl border px-3 py-3 text-left outline-none",
              "transition-[border-color,background-color] duration-[70ms] ease-hairline",
              "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              on ? "border-accent bg-accent-soft" : "border-border bg-surface hover:border-fg-subtle"
            )}
          >
            <span className="block text-sm font-medium text-fg">{r.label}</span>
            {r.latency ? <span className="mt-1 block font-mono text-xs tabular-nums text-fg-muted">{r.latency}</span> : null}
          </button>
        )
      })}
    </div>
  )
}
export { RegionPicker }
export type { Region }
