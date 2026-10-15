import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-charts-tailwind",
  title: "Charts in React with Tailwind and no charting library",
  description:
    "Build area, line, bar, donut, pie and radial charts in React with plain SVG and Tailwind v4: data shapes, legends, hover values and screen reader tables.",
  date: "2026-10-14",
  keywords: [
    "react charts without library",
    "svg chart react tailwind",
    "tailwind charts",
    "react sparkline component",
    "lightweight react charts",
  ],
  related: ["area-chart", "line-chart", "bar-chart", "donut-chart", "pie-chart", "radial-chart", "sparkline-set", "chart-legend", "chart-card"],
  body: [
    {
      type: "p",
      text: "You can draw most dashboard charts in React with an inline `<svg>`, a `viewBox`, and a few lines that map values to coordinates, styled with the same Tailwind tokens as the rest of the page. A charting library earns its place when you need axes with ticks, zooming, brushing or thousands of points; for a revenue trend, a bar per month and a share of plans, it is 40 kilobytes you do not need.",
    },
    {
      type: "p",
      text: "This guide uses the free MiniDev UI chart components, which are exactly that: one file each, plain SVG and HTML. It covers [AreaChart](/docs/area-chart), [LineChart](/docs/line-chart), [BarChart](/docs/bar-chart), [DonutChart](/docs/donut-chart), [PieChart](/docs/pie-chart), [RadialChart](/docs/radial-chart), [SparklineSet](/docs/sparkline-set) and [ChartLegend](/docs/chart-legend), with the real props from the source, the places where they stop, and how to add what is missing.",
    },

    { type: "h2", text: "When SVG and Tailwind are enough", id: "when" },
    {
      type: "list",
      items: [
        "The data is already in memory and has fewer than a few hundred points per series.",
        "Readers need the shape and one or two values on hover, not a full coordinate readout.",
        "The chart must match the design system: same colours, same hairline grid, same dark mode, without a theme object.",
        "The bundle matters, as in a marketing page or an email preview.",
      ],
    },
    {
      type: "p",
      text: "If you need a time axis with ticks that respect month boundaries, stacked series with a shared tooltip, or pan and zoom, pick Recharts or visx and style them with the same tokens. The [last section](#limits) lists where each kit chart stops so you can decide early.",
    },

    { type: "h2", text: "Install", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add @minidev/area-chart\nnpx shadcn@latest add @minidev/line-chart\nnpx shadcn@latest add @minidev/bar-chart\nnpx shadcn@latest add @minidev/pie-chart\nnpx shadcn@latest add @minidev/radial-chart\nnpx shadcn@latest add @minidev/sparkline-set\nnpx shadcn@latest add @minidev/chart-legend\nnpx shadcn@latest add @minidev/chart-card",
    },
    {
      type: "p",
      text: "`LineChart` imports `smoothPath` from `area-chart`, and `SparklineSet` imports `AreaChart` and `MetricDelta`, so the CLI pulls those in. `PieChart` and `RadialChart` animate with `motion/react`; the others have no dependencies. The token stylesheet ([styles.css](https://ui.minidev.pro/r/styles.css)) defines `--chart-1` to `--chart-5`, which the multi series charts cycle through.",
    },

    { type: "h2", text: "Area chart: one series, a trend", id: "area-chart" },
    {
      type: "p",
      text: "`AreaChart` takes `data` as a plain array of numbers, left to right, and draws a monotone cubic curve (no overshoot between points) with a gradient wash and three dashed grid lines. Wrap it in `ChartCard` for the title, and add the x axis labels yourself in HTML:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/dashboard/revenue-card.tsx",
      code: `"use client"
import * as React from "react"
import { AreaChart } from "@/components/ui/area-chart"
import { ChartCard } from "@/components/ui/chart-card"

const MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
const REVENUE = [31.2, 36.4, 28.9, 33.1, 39.8, 42.6, 38.2, 47.5, 51.3, 44.7, 56.1, 61.4] // USD thousands

export function RevenueCard() {
  const [hi, setHi] = React.useState<number | undefined>()
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setHi(Math.round(((e.clientX - r.left) / r.width) * (REVENUE.length - 1)))
  }
  const cur = hi ?? REVENUE.length - 1
  return (
    <ChartCard title="Revenue" description={MONTHS[cur] + ": $" + REVENUE[cur].toFixed(1) + "k"}>
      <div onPointerMove={onMove} onPointerLeave={() => setHi(undefined)}>
        <AreaChart data={REVENUE} highlight={cur} label="Monthly revenue, last twelve months" className="h-40" />
      </div>
      <div aria-hidden className="relative mt-2 h-4 font-mono text-[10px] text-fg-subtle">
        {MONTHS.map((m, i) => (
          <span key={m} className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full" style={{ left: (i / (MONTHS.length - 1)) * 100 + "%" }}>
            {m}
          </span>
        ))}
      </div>
    </ChartCard>
  )
}`,
    },
    {
      type: "list",
      items: [
        "`highlight` is an index. The component draws a dot and a hairline crosshair at that point; the pointer handler above turns it into a hover readout, with the last point shown at rest.",
        "Points sit at `i / (n - 1)` of the width, which is why the labels are positioned absolutely with the same formula instead of a `justify-between` row that drifts in the middle.",
        "`tone` picks the colour (`accent`, `success`, `warning`, `danger`, `info`, `neutral`); `smooth={false}` gives straight segments; `grid={false}` removes the dashed lines.",
        "The y scale runs from `min(data, 0)` to `max(data)`. Positive data always starts at zero, which is the honest baseline for an area fill. Negative values work, but the fill then covers the area below the line as well.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "If you want the crosshair, a comparison line and a delta badge without writing the handler, the kit's [InteractiveAreaChart](/docs/interactive-area-chart) already does this with `{ label, value, compare }` points.",
    },

    { type: "h2", text: "Line chart with several series and a legend", id: "line-chart" },
    {
      type: "p",
      text: "`LineChart` takes `series` as an array of number arrays and draws one path per series on a shared y scale, coloured `var(--chart-1)` through `var(--chart-5)` in order, with a dot at each line's end. It renders no legend, so pair it with `ChartLegend` and pass the same colours explicitly:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const MRR = {
  "Total MRR": [12, 14, 13, 17, 19, 18, 23, 26, 25, 30, 33, 36],
  Expansion: [4, 5, 6, 6, 8, 9, 9, 11, 12, 14, 15, 17],
  Churn: [6, 6, 5, 6, 5, 5, 4, 5, 4, 4, 3, 3],
}

<ChartCard title="MRR movement" description="USD thousands, by month">
  <LineChart series={Object.values(MRR)} label="Total MRR, expansion and churn by month" className="h-44" />
  <ChartLegend
    className="mt-3"
    items={Object.keys(MRR).map((label, i) => ({ label, color: \`var(--chart-\${i + 1})\` }))}
  />
</ChartCard>`,
    },
    {
      type: "callout",
      tone: "warning",
      text: "`ChartLegend` without `color` falls back to accent, success, warning and danger, which is not the order `LineChart` uses (`--chart-1` is the accent, but `--chart-2` is a cyan and `--chart-3` the warning). Always pass `color` so the swatches match the lines.",
    },
    {
      type: "p",
      text: "Every series is spread across the full width by its own length, so give them the same number of points or the x positions will not line up. The first series is drawn slightly heavier (1.75px against 1.5px) so a total reads as the primary line.",
    },

    { type: "h2", text: "Bar chart", id: "bar-chart" },
    {
      type: "p",
      text: "`BarChart` takes `{ label, value }` objects and renders HTML bars in a flex row, not SVG, so the labels are real text. Hovering a bar shows its value in an ink pill and dims the others; at rest the peak is marked. `format` controls the pill:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<BarChart
  data={MONTHS.map((label, i) => ({ label, value: REVENUE[i] * 1000 }))}
  label="Monthly revenue"
  format={(n) => "$" + Math.round(n / 1000) + "k"}
  className="h-48"
/>`,
    },
    {
      type: "p",
      text: "Bars are sized as a percentage of the maximum with a 2 percent floor so zero months stay visible. There is no negative axis: a loss month needs a different chart. Twelve bars fit comfortably at card width; past about twenty the labels start to truncate (they have `truncate`), so aggregate or switch to the horizontal variant in the [charts category](/components/charts).",
    },

    { type: "h2", text: "Parts of a whole: donut, pie and radial", id: "donut-pie-radial" },
    {
      type: "p",
      text: "Three components cover three different questions. `DonutChart` answers \"how far along is one number\": a single ring with the percentage in the middle, sized by `className` (`size-24` by default). `PieChart` answers \"how is the total split\": slices with leader line labels, a legend, a readout that shows the hovered slice and a spring pull out. `RadialChart` answers \"how are several goals doing\": concentric rings, one per metric, with its own max.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const money = (n: number) => "$" + Math.round(n / 1000) + "k"

<DonutChart value={62} max={70} label="Activation" />

<PieChart
  title="Revenue by plan"
  caption="October, monthly recurring"
  format={money}
  data={[
    { label: "Enterprise", value: 48200 },
    { label: "Business", value: 31600 },
    { label: "Pro", value: 22400 },
    { label: "Starter", value: 9800 },
  ]}
/>

<RadialChart
  title="October goals"
  data={[
    { label: "MRR", value: 84200, max: 100000, format: money },
    { label: "Activation", value: 62, max: 70, format: (n) => n + "%" },
    { label: "NPS", value: 47, max: 60 },
  ]}
/>`,
    },
    {
      type: "list",
      items: [
        "`PieChart` hides the outside labels below 320 pixels of width (it watches its own box with a `ResizeObserver`) and moves the legend to one column, so it survives a phone without props.",
        "`RadialChart` with a single item renders a full progress ring with the value in the centre; with several it draws three quarter arcs. Pass `periods` instead of `data` to get a segmented control that switches datasets.",
        "Both animate value changes on a spring and go instant under [prefers-reduced-motion](/glossary/prefers-reduced-motion).",
        "Keep pies to five or six slices. Past that the leader lines stack and the shares are too close to compare; a bar chart sorted by value is the better answer.",
      ],
    },

    { type: "h2", text: "A KPI row with SparklineSet", id: "sparklines" },
    {
      type: "p",
      text: "`SparklineSet` renders a responsive grid of cards, each with a label, a formatted value, a delta badge and a 64 pixel `AreaChart`. The value is a string so you format it once; the delta is a number in percent.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<SparklineSet
  items={[
    { label: "Revenue", value: "$128,400", delta: 12.4, data: [62, 68, 66, 74, 79, 77, 85, 90, 96, 101, 108, 118] },
    { label: "Active customers", value: "1,284", delta: 3.1, data: [920, 948, 970, 1004, 1012, 1060, 1088, 1120, 1150, 1210, 1246, 1284] },
    { label: "Open invoices", value: "312", delta: -4.6, data: [180, 196, 210, 205, 228, 240, 236, 255, 270, 284, 327, 312] },
  ]}
/>`,
    },
    {
      type: "callout",
      tone: "note",
      text: "`MetricDelta` colours by sign: positive is green, negative is red. For a metric where down is good, such as churn or time to first response, that reads backwards. Either negate the delta and change the label (\"Churn improvement\") or add a `goodDirection` prop in your copy of `metric-delta.tsx`.",
    },

    { type: "h2", text: "Sizing and responsiveness", id: "sizing" },
    {
      type: "p",
      text: "`AreaChart` and `LineChart` are a `relative` box with the SVG stretched over it, `viewBox` 320 by 120 and `preserveAspectRatio=\"none\"`. That means the drawing fills whatever size the box has: width from the parent, height from your `className` (`h-32` by default). Strokes use `vectorEffect=\"non-scaling-stroke\"` so they stay 1.5 pixels however much the box is stretched. Two consequences follow:",
    },
    {
      type: "list",
      items: [
        "Never put text inside these SVGs; it would stretch with the box. Labels, legends and readouts live in HTML around the chart, as in every example above.",
        "The curve's apparent slope changes with the aspect ratio. Keep heights consistent across a dashboard row so trends are comparable by eye.",
      ],
    },
    {
      type: "p",
      text: "`PieChart` and `RadialChart` keep their aspect ratio (the SVG has `h-auto w-full` with a max width), and `BarChart` is a flex layout that takes any size. In a CSS grid, give chart cards `min-w-0` so a long legend cannot force the column wider than the viewport.",
    },

    { type: "h2", text: "Accessibility", id: "accessibility" },
    {
      type: "p",
      text: "A chart is an image to assistive technology, so every kit chart sets `role=\"img\"` and takes a `label`. Make that label the sentence you would say to a colleague: \"Monthly revenue, last twelve months, rising from 31 to 61 thousand\", not \"Area chart\". For charts where the numbers matter, add the data as a visually hidden table, which is what `PieChart` does internally:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `function ChartTable({ caption, rows }: { caption: string; rows: [string, string][] }) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}>
            <th scope="row">{k}</th>
            <td>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

<AreaChart data={REVENUE} label="Monthly revenue, last twelve months" />
<ChartTable caption="Monthly revenue in USD thousands" rows={MONTHS.map((m, i) => [m, REVENUE[i].toFixed(1)])} />`,
    },
    {
      type: "list",
      items: [
        "The hover readout in the area example is visible text in the card description, so the value is on the page for everyone, not only in a pointer tooltip.",
        "`PieChart` slices are focusable and move with the arrow keys, Home and End. The other charts have no interactive parts, so there is nothing to tab to; the table carries the data.",
        "The chart tokens are tuned for both themes. Do not reach for raw colours like `#22c55e` for a series; `var(--success)` keeps the [WCAG contrast](/glossary/wcag-contrast) the kit was built for in dark mode. See [semantic tokens](/glossary/semantic-tokens).",
        "Grid lines are `stroke-border` at one pixel; they are decoration and intentionally low contrast.",
      ],
    },

    { type: "h2", text: "Limits, and when to reach for a library", id: "limits" },
    {
      type: "table",
      head: ["Chart", "What it does", "What it does not do"],
      rows: [
        ["`AreaChart`", "One series, smoothing, highlight index, tone", "No axis ticks, no tooltip of its own, no multiple series"],
        ["`LineChart`", "Several series, shared scale, end dots", "No legend, no hover, series must share a length"],
        ["`BarChart`", "Hover value pill, peak marker, `format`", "No negative values, no stacking (see `StackedBarChart`), no grouped bars"],
        ["`DonutChart`", "One value against a max", "No segments; use `PieChart` for shares"],
        ["`PieChart`", "Labels, legend, keyboard, readout, sr table", "Not a donut; no half pie"],
        ["`RadialChart`", "Rings per goal, periods, rolling centre", "No more than about five rings before labels overlap"],
      ],
    },
    {
      type: "p",
      text: "The missing pieces are deliberate: axis ticks and tooltips are where a chart stops being one file. If a product needs them on every chart, pick Recharts (declarative, React native, easy to theme with these tokens through `className` and CSS variables) or visx (lower level, more control) and keep the kit charts for the summary cards. Downsample before rendering either way; nobody can read 5,000 points in 320 pixels, and `smoothPath` builds a path string proportional to the point count on every render.",
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "All of these are free and MIT licensed, and the rest (stacked bars, horizontal bars, gauges, funnels, heatmap cells) are on the [charts category page](/components/charts). The cards drop into the layout from the [Next.js SaaS dashboard guide](/guides/nextjs-saas-dashboard), and the [OKLCH guide](/guides/oklch-colors-tailwind-v4) explains the colour space the chart tokens are defined in. If you want the whole analytics product built, the [MiniDev studio](https://minidev.pro) builds on this kit.",
    },
    { type: "component", name: "area-chart" },
    { type: "component", name: "line-chart" },
    { type: "component", name: "bar-chart" },
    { type: "component", name: "pie-chart" },
    { type: "component", name: "radial-chart" },
    { type: "component", name: "sparkline-set" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "Can I build charts in React without a library?",
      a: "Yes. An inline SVG with a viewBox, a function that maps each value to x and y, and a path element is a working line chart. The kit's AreaChart is about a hundred lines including the smoothing and the gradient. Reach for a library when you need axes with ticks, tooltips on every chart or more than a few hundred points.",
    },
    {
      q: "How do I make an SVG chart responsive with Tailwind?",
      a: "Give the SVG a viewBox and let CSS size it: `w-full` with a height class on the wrapper. For line and area shapes use `preserveAspectRatio=\"none\"` so the drawing fills the box, with `vectorEffect=\"non-scaling-stroke\"` on paths so strokes do not stretch, and keep all text outside the SVG.",
    },
    {
      q: "Are these charts accessible?",
      a: "Each one has `role=\"img\"` and a label you write, which is the minimum. PieChart also renders a visually hidden table and keyboard focusable slices. For the other charts, add a small `sr-only` table with the values next to the chart when the numbers matter.",
    },
  ],
}

export default guide
