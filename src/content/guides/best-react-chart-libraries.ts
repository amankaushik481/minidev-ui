import type { Guide } from "../types"

const guide: Guide = {
  slug: "best-react-chart-libraries",
  title: "Best React chart libraries, and when you do not need one",
  description:
    "Recharts, shadcn/ui charts, Chart.js, ECharts, Nivo, visx, Victory, Tremor and plain SVG compared, with licenses, limits and when a chart library is not needed.",
  date: "2026-10-15",
  keywords: [
    "best react chart libraries",
    "react charting library comparison",
    "recharts vs chart.js",
    "react dashboard charts tailwind",
    "lightweight react charts",
  ],
  related: ["area-chart", "bar-chart", "sparkline-set", "chart-card"],
  body: [
    {
      type: "p",
      text: "Recharts is the default React chart library in 2026, and the shadcn/ui chart components make it fit a Tailwind design system with almost no extra work. If you need canvas performance or more chart types, Chart.js, Apache ECharts and Nivo are the strong alternatives, visx and Victory suit custom work, Tremor packages Recharts into dashboard components, and for a few sparklines, bars and a donut you may not need a library at all.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Facts were checked on October 15, 2026 on each project's site or GitHub repository. MiniDev UI's chart components are on this list and this guide is written by its team; they are described in the same tone as the others and placed where their scope puts them, near the end.",
    },
    { type: "h2", text: "At a glance", id: "at-a-glance" },
    {
      type: "table",
      head: ["Library", "Renders to", "Built on", "License"],
      rows: [
        ["Recharts", "SVG", "React and D3 submodules", "MIT"],
        ["shadcn/ui charts", "SVG", "Recharts v3", "MIT"],
        ["Chart.js with react-chartjs-2", "Canvas", "Chart.js", "MIT, both"],
        ["Apache ECharts with echarts-for-react", "Canvas or SVG", "ECharts", "Apache 2.0; wrapper MIT"],
        ["Nivo", "SVG, Canvas or HTML", "React and D3", "MIT"],
        ["visx", "SVG", "D3 and React primitives", "MIT"],
        ["Victory", "SVG, web and native", "React", "MIT"],
        ["Tremor", "SVG", "Recharts, Radix UI and Tailwind CSS", "Apache 2.0"],
        ["MiniDev UI charts", "SVG and HTML", "Nothing, one file each", "MIT"],
      ],
    },
    { type: "h2", text: "1. Recharts", id: "recharts" },
    {
      type: "p",
      text: "[Recharts](https://recharts.github.io) is a composable charting library built on React components and D3 submodules, rendering to SVG. It is MIT, at version 3.10 when we checked, and it is the engine under both shadcn/ui charts and Tremor, which is a good sign of how well it fits React codebases: you compose `<LineChart>`, `<XAxis>` and `<Tooltip>` as children rather than passing a configuration object.",
    },
    {
      type: "p",
      text: "**Who it suits:** SaaS dashboards and admin tools with the usual line, area, bar, pie and composed charts. **License and price:** MIT, free. **Limitation:** SVG draws one DOM node per mark. For a few thousand points it is fine, and for tens of thousands you will feel it, so downsample or look at a canvas renderer below.",
    },
    { type: "h2", text: "2. shadcn/ui charts", id: "shadcn-ui-charts" },
    {
      type: "p",
      text: "[shadcn/ui charts](https://ui.shadcn.com/charts) are a collection of ready to use chart components built with Recharts that you copy and paste. The docs are explicit that Recharts is used under the hood and not wrapped, so you keep the whole Recharts API, and shadcn/ui adds `ChartContainer`, `ChartTooltip`, `ChartLegend` and a chart config that maps series to labels and colors through CSS variables in the form `var(--color-KEY)`. The component now uses Recharts v3.",
    },
    {
      type: "p",
      text: "**Who it suits:** any project already on shadcn/ui, because the charts read the same CSS variables as the rest of the UI and follow dark mode for free. **License and price:** MIT, free. **Limitation:** it is Recharts with a theme layer, so every Recharts limit applies, and the container must be given a height or nothing renders.",
    },
    { type: "h2", text: "3. Chart.js with react-chartjs-2", id: "chart-js" },
    {
      type: "p",
      text: "[Chart.js](https://www.chartjs.org) is a simple yet flexible JavaScript charting library that renders to an HTML5 canvas, with eight built in chart types and an MIT license. [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2) provides React components for it, is also MIT, and supports Chart.js v3 and v4.",
    },
    {
      type: "p",
      text: "**Who it suits:** charts with many points, animated transitions and projects that already know Chart.js from outside React. **License and price:** MIT, free. **Limitation:** canvas means the marks are pixels, not elements. You cannot style a bar with a Tailwind class or inspect it in dev tools, and the eight types cover standard charts, with anything else coming from plugins.",
    },
    { type: "h2", text: "4. Apache ECharts with echarts-for-react", id: "apache-echarts" },
    {
      type: "p",
      text: "[Apache ECharts](https://echarts.apache.org) is an open source JavaScript visualization library from the Apache Software Foundation, under the Apache License 2.0, that can switch between Canvas and SVG rendering. [echarts-for-react](https://github.com/hustcc/echarts-for-react) is an MIT wrapper that mounts it as a React component.",
    },
    {
      type: "p",
      text: "**Who it suits:** large datasets, maps, heatmaps, sankeys, candlesticks and the chart types the React native libraries do not have. **License and price:** Apache 2.0 for ECharts and MIT for the wrapper, both free. **Limitation:** a chart is one large option object rather than React children, so it feels like configuring a tool rather than composing components, and matching it to your design tokens is a styling exercise on that object.",
    },
    { type: "h2", text: "5. Nivo", id: "nivo" },
    {
      type: "p",
      text: "[Nivo](https://nivo.rocks) provides a rich set of dataviz components built on D3 and React, with SVG, HTML and Canvas flavors of many charts, responsive variants and an isomorphic rendering API for the server. It is MIT, and each chart lives in its own scoped package, such as `@nivo/bar` for the bar chart.",
    },
    {
      type: "p",
      text: "**Who it suits:** teams who want charts that look designed out of the box, including less common types such as calendars, chord diagrams, swarm plots and waffles. **License and price:** MIT, free. **Limitation:** the per chart packaging means a dashboard with six chart kinds installs six packages, and its finished look is a stronger opinion than Recharts, so matching it to your own tokens takes a theme object rather than a few CSS variables.",
    },
    { type: "h2", text: "6. visx", id: "visx" },
    {
      type: "p",
      text: "[visx](https://github.com/airbnb/visx) from Airbnb is a collection of reusable low level visualization components that combine the power of D3 to generate your visualization with the benefits of React for updating the DOM. Its own README calls it largely unopinionated and meant to be built upon. It is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** custom charts a product library cannot draw, and design engineers who want D3's scales and shapes with React's rendering. **License and price:** MIT, free. **Limitation:** it is not a charting library. There is no `<BarChart>`; you compose scales, axes, shapes and tooltips yourself, which is the right trade only when the chart is genuinely custom.",
    },
    { type: "h2", text: "7. Victory", id: "victory" },
    {
      type: "p",
      text: "[Victory](https://nearform.com/open-source/victory) offers intuitive React components for advanced charting and data visualization, with an identical API on Android and iOS for React Native projects. It is maintained under Nearform (the repository still lives in the FormidableLabs organisation, which describes it as active) and is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** teams that need the same chart code on the web and in a React Native app. **License and price:** MIT, free. **Limitation:** the project moved from Formidable to Nearform, so older links redirect and some docs are in flux, and its default styling needs overriding per component to match a Tailwind token system.",
    },
    { type: "h2", text: "8. Tremor", id: "tremor" },
    {
      type: "p",
      text: "[Tremor](https://www.tremor.so) provides open source, accessible React UI components styled with Tailwind CSS to build charts and dashboards, built on Recharts and Radix UI. It is available as copy and paste source or an npm package, requires React 18.2 or newer and Tailwind CSS v4, and the site announces that Tremor is joining Vercel. Tremor Blocks, its dashboard sections and templates, are now free and open source as well.",
    },
    {
      type: "p",
      text: "**Who it suits:** analytics dashboards where the charts should arrive with matching KPI cards, tables and filters. **License and price:** Apache 2.0, free, including Blocks. **Limitation:** it is a dashboard kit rather than a chart engine. The charts are Recharts underneath, so anything Recharts cannot draw sends you back up this list.",
    },
    { type: "h2", text: "9. MiniDev UI charts", id: "minidev-ui-charts" },
    {
      type: "p",
      text: "[MiniDev UI](https://ui.minidev.pro) includes a set of chart components with no chart dependency at all: [AreaChart](/docs/area-chart), [LineChart](/docs/line-chart), [BarChart](/docs/bar-chart), [DonutChart](/docs/donut-chart), [PieChart](/docs/pie-chart), [RadialChart](/docs/radial-chart), [SparklineSet](/docs/sparkline-set), gauges, funnels, heatmap cells, treemaps, sankeys and waffles, each one file of plain SVG or HTML that reads the registry's semantic OKLCH tokens. They are part of the same shadcn-compatible registry as its [chart cards](/docs/chart-card), [KPI rows](/docs/kpi-row) and [dashboard blocks](/docs/dashboard-home), and the whole set is on the [charts category page](/components/charts).",
    },
    {
      type: "p",
      text: "**Who it suits:** summary cards and dashboard tiles where the shape of the data and one or two values matter more than a full coordinate readout, and teams who do not want a charting dependency for a revenue sparkline. **License and price:** MIT, free. **Limitation:** by design they stop where a library starts. There are no axis ticks, tooltips, zoom or brushing, and you should downsample long series before passing them in. Our [charts guide](/guides/react-charts-tailwind) lists exactly where each one stops.",
    },
    { type: "component", name: "area-chart" },
    { type: "h2", text: "When you do not need a chart library", id: "when-you-do-not-need-one" },
    {
      type: "p",
      text: "Most SaaS dashboards contain a handful of chart shapes: a trend line, bars per period, a share of a whole, and a progress or gauge value. All of those can be drawn with an inline `<svg>`, a `viewBox` and a few lines mapping values to coordinates, styled with the same Tailwind tokens as the rest of the page. A library earns its place when you need axes with ticks that respect month boundaries, stacked series with a shared tooltip, pan and zoom, or thousands of points. For a KPI card, it is weight you do not need, and it is one more thing to theme for dark mode.",
    },
    {
      type: "list",
      items: [
        "**Sparklines and deltas:** an inline SVG path or a [SparklineSet](/docs/sparkline-set) with a [MetricDelta](/docs/metric-delta) next to it.",
        "**Progress and quotas:** a [Progress](/docs/progress) bar, a [Meter](/docs/meter) or a [GoalRing](/docs/goal-ring); none of these is a chart.",
        "**Bars per month:** a flex row of divs with heights from your data, which is exactly what the kit's [BarChart](/docs/bar-chart) is, so the labels stay real text.",
        "**Anything with axes, tooltips or interaction:** Recharts through shadcn/ui charts, and keep the simple pieces as they are.",
      ],
    },
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "p",
      text: "Decide on the renderer, then the abstraction level. **SVG** (Recharts, Nivo, visx, Victory, the kit charts) keeps marks in the DOM, styleable with CSS variables and inspectable, and is right up to a few thousand points. **Canvas** (Chart.js, ECharts) is right for dense data and smooth animation, at the cost of CSS styling. Then ask how much you want to write: shadcn/ui charts and Tremor are the shortest path to a themed dashboard, Recharts, Nivo and Chart.js give you full charts with options, and visx is for building your own. If you are already on shadcn/ui or MiniDev UI, start with shadcn/ui charts for anything with axes and the kit charts for cards, and only add a second library when a chart type forces it.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Every library here can read your design tokens. Pass `var(--chart-1)` and friends rather than hex values, so a brand change or dark mode switch updates charts with everything else. Our [OKLCH guide](/guides/oklch-colors-tailwind-v4) explains how the kit defines those tokens.",
    },
  ],
  faq: [
    {
      q: "What is the most popular React chart library?",
      a: "Recharts is the one most React dashboards reach for first, and it is the engine behind both shadcn/ui charts and Tremor. Across all of JavaScript, Chart.js is the one react-chartjs-2 describes as the most popular charting library, and that wrapper brings it to React.",
    },
    {
      q: "Recharts or Chart.js for a dashboard?",
      a: "Recharts if you want composable React components, CSS variable theming and a few thousand points at most. Chart.js if you need canvas performance for dense data or already use it elsewhere. On a shadcn/ui or Tailwind project, Recharts through the shadcn/ui chart components is the shorter path.",
    },
    {
      q: "Are these chart libraries free for commercial use?",
      a: "Yes. Recharts, shadcn/ui, react-chartjs-2, Chart.js, Nivo, visx, Victory and MiniDev UI are MIT, and Apache ECharts and Tremor are Apache 2.0. None of the nine has a paid tier for the charts themselves.",
    },
  ],
}

export default guide
