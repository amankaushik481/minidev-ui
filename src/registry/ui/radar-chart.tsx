"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * RadarChart — a filled polygon over concentric rings, one axis per label.
 *
 * Use it to compare five to eight scores on the same 0 to 1 scale, like a vendor or skill
 * scorecard. The shape glides to new values on the data spring. For goals against targets use
 * RadialChart; for exact comparisons use a bar chart.
 *
 * @example
 * <RadarChart labels={["Speed", "Cost", "Support", "Docs", "Uptime"]} values={[0.8, 0.6, 0.9, 0.7, 0.95]} label="Vendor scorecard" />
 */

// Lumen vendor scorecard: each axis is a 0 to 1 score.
const SAMPLE_LABELS = ["Uptime", "Speed", "Cost", "Support", "Docs", "Privacy"]
const SAMPLE_VALUES = [0.92, 0.78, 0.64, 0.86, 0.7, 0.95]
const DATA_SPRING = { type: "spring", bounce: 0.12, duration: 0.7 } as const

type RadarChartProps = {
  /** One axis per label, drawn clockwise from the top. */
  labels?: string[]
  /** One value per label, from 0 to 1. Missing values count as 0. */
  values?: number[]
  className?: string
  /** Accessible name. The spoken label also lists every axis and its score. */
  label?: string
}

function RadarChart({
  labels = SAMPLE_LABELS,
  values = SAMPLE_VALUES,
  className,
  label = "Radar chart",
}: RadarChartProps) {
  const reduce = useReducedMotion()
  const n = labels.length
  const cx = 80
  const cy = 80
  const r = 56
  const angle = (i: number) => -Math.PI / 2 + (i / n) * Math.PI * 2
  const score = (i: number) => Math.max(0, Math.min(1, values[i] ?? 0))
  const shape =
    labels
      .map((_, i) => {
        const rr = r * score(i)
        return `${i ? "L" : "M"}${(cx + Math.cos(angle(i)) * rr).toFixed(2)},${(cy + Math.sin(angle(i)) * rr).toFixed(2)}`
      })
      .join("") + "Z"
  const summary = labels.map((lab, i) => `${lab} ${Math.round(score(i) * 100)}%`).join(", ")
  const rings = [0.25, 0.5, 0.75, 1]
  return (
    <svg data-slot="radar-chart" role="img" aria-label={`${label}: ${summary}`} viewBox="0 0 160 160" className={cn("size-48 overflow-visible text-accent", className)}>
      {rings.map((ring) => (
        <polygon
          key={ring}
          fill="none"
          stroke="var(--border)"
          points={labels.map((_, i) => `${cx + Math.cos(angle(i)) * r * ring},${cy + Math.sin(angle(i)) * r * ring}`).join(" ")}
        />
      ))}
      {labels.map((lab, i) => (
        <text
          key={`${lab}-${i}`}
          x={cx + Math.cos(angle(i)) * (r + 14)}
          y={cy + Math.sin(angle(i)) * (r + 14)}
          textAnchor="middle"
          dominantBaseline="middle"
          aria-hidden
          className="fill-fg-muted"
          style={{ fontSize: 8 }}
        >
          {lab}
        </text>
      ))}
      <motion.path
        data-slot="radar-chart-shape"
        initial={false}
        animate={{ d: shape }}
        transition={reduce ? { duration: 0 } : DATA_SPRING}
        fill="currentColor"
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  )
}
export { RadarChart }
export type { RadarChartProps }
