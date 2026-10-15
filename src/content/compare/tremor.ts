import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-tremor",
  other: "Tremor",
  otherUrl: "https://tremor.so",
  title: "MiniDev UI vs Tremor: which should you use?",
  description:
    "MiniDev UI vs Tremor: a free shadcn-compatible registry with SVG charts and dashboard pages against Tremor's copy-and-paste React charts built on Recharts.",
  checked: "2026-10-15",
  summary:
    "Tremor is a set of open source React components for charts and dashboards, styled with Tailwind CSS and built on Radix UI and Recharts. The current copy-and-paste version (35+ components, Apache 2.0) requires Tailwind CSS v4 and React 18.2 or newer, an older npm package `@tremor/react` is listed separately, and its 300+ blocks and templates are now free under MIT. Tremor has joined Vercel. MiniDev UI is a free, MIT, shadcn-compatible registry of 548 items on Base UI, Tailwind CSS v4 and motion, with 21 dependency free SVG chart components and full analytics and dashboard pages. Pick Tremor if charts are the core of your product and you want the breadth of Recharts underneath with a proven dashboard look. Pick MiniDev UI if you need the whole application around the charts, prefer small SVG charts without a charting dependency, and want blocks, motion and templates in the same system.",
  rows: [
    {
      feature: "Price",
      minidev: "Free, everything",
      other: "Free; the blocks site says blocks and templates are now free and open source",
    },
    {
      feature: "License",
      minidev: "MIT",
      other: "Apache 2.0 for the components repository; MIT for Blocks and templates",
    },
    {
      feature: "Scope",
      minidev: "548 items, including 21 chart components, a data table, KPI rows and full dashboard pages",
      other: "35+ components, 300+ blocks and six templates (dashboards, a SaaS marketing site, report pages, a SaaS template and a one pager)",
    },
    {
      feature: "Charts",
      minidev: "Plain SVG with no charting library: area, line, bar, stacked, donut, gauge, radar, funnel, sankey, treemap and more",
      other: "Built on Recharts, with Radix UI for interactive parts",
    },
    {
      feature: "Install model",
      minidev: "Source copied into your repo with `npx shadcn@latest add @minidev/<name>`, or npm `minidev-ui-kit`",
      other: "Copy and paste from the docs; the separate `@tremor/react` npm package (20+ components on Tailwind and Recharts) is listed at npm.tremor.so",
    },
    { feature: "Primitives", minidev: "Base UI (`@base-ui/react`)", other: "Radix UI" },
    {
      feature: "Requirements",
      minidev: "Tailwind CSS v4; React",
      other: "Tailwind CSS v4.0+ and React 18.2.0+ for the copy-and-paste components",
    },
    {
      feature: "Framework guides",
      minidev: "Next.js, Vite, Astro, React Router and TanStack Start",
      other: "Next.js, with a Vite guide marked as updating soon",
    },
    {
      feature: "Maintainer",
      minidev: "MiniDev",
      other: "Tremor Labs; the site announces that Tremor is joining Vercel",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Tremor](https://tremor.so) describes itself as open source, accessible React UI components styled with Tailwind CSS to build charts and dashboards. The current version is copy-and-paste: 35+ components built on Radix UI and Recharts, licensed Apache 2.0, requiring Tailwind CSS v4.0+ and React 18.2.0+. A separate npm package, `@tremor/react`, remains listed with 20+ components on Tailwind and Recharts. The companion [Blocks](https://blocks.tremor.so) site offers 300+ dashboard blocks and six templates built with Tremor components, now free under MIT, and the site announces that Tremor is joining Vercel. MiniDev UI is a free, MIT licensed shadcn-compatible registry of 548 items built on Base UI, Tailwind CSS v4 and motion. Its 21 chart components are plain SVG drawn from your data array, and they sit next to a data table, KPI rows, stat cards and complete analytics, dashboard, admin and billing pages, plus 108 motion components and 8 landing page templates.",
    },
    { type: "h2", text: "Where each one is the better pick", id: "where-each-one-is-the-better-pick" },
    {
      type: "list",
      items: [
        "**Pick Tremor for chart heavy products.** It is built on Recharts, so the chart components inherit a mature charting engine, and the whole component set is designed around dashboards and data.",
        "**Pick Tremor for its blocks and templates.** 300+ dashboard blocks and six templates, built entirely with Tremor components and Tailwind, now free under MIT.",
        "**Pick MiniDev UI for the application around the data.** Analytics, dashboard home, admin console, users table, billing and settings pages are ready blocks, and the data table, KPI row, stat cards and 21 SVG charts share one token set.",
        "**Pick MiniDev UI if you want charts without a charting dependency.** Its charts are SVG with no library underneath, which keeps bundles small and styling in Tailwind. For zooming, brushing or very large datasets, a dedicated library such as Recharts is still the better tool.",
        "**Use both when it helps.** Both are React components styled with Tailwind CSS v4 that you copy into your project, so a Tremor chart can sit inside a MiniDev chart card. Tremor brings Radix UI and MiniDev brings Base UI, so you carry both primitive sets if you mix them.",
      ],
    },
    { type: "component", name: "analytics-page" },
    {
      type: "callout",
      tone: "note",
      text: "Tremor has two code paths: the copy-and-paste components documented on tremor.so (Tailwind CSS v4, Apache 2.0) and the older `@tremor/react` npm package listed at npm.tremor.so. Check which one a tutorial refers to before copying code, and check the site for changes after the move to Vercel.",
    },
  ],
  faq: [
    {
      q: "Is Tremor free?",
      a: "Yes. The components are open source under Apache 2.0, and the blocks site says its blocks and templates are now free and open source under MIT. MiniDev UI is MIT with no paid tier.",
    },
    {
      q: "Does MiniDev UI use Recharts?",
      a: "No. Its 21 chart components are plain SVG with no charting library. Tremor's charts are built on Recharts. If you need Recharts features, you can still place a Recharts or Tremor chart inside a MiniDev chart card.",
    },
    {
      q: "Can I use Tremor and MiniDev UI together?",
      a: "Yes. Both are React components styled with Tailwind CSS v4 that you copy into your project. Tremor uses Radix UI for its interactive parts and MiniDev UI uses Base UI, so both primitive libraries end up in the bundle if you mix them.",
    },
  ],
  sources: [
    { label: "Tremor home", url: "https://tremor.so" },
    { label: "Tremor installation", url: "https://www.tremor.so/docs/getting-started/installation" },
    { label: "tremorlabs/tremor on GitHub", url: "https://github.com/tremorlabs/tremor" },
    { label: "Tremor Blocks and templates", url: "https://blocks.tremor.so" },
    { label: "Tremor Blocks license", url: "https://blocks.tremor.so/license" },
    { label: "@tremor/react npm package site", url: "https://npm.tremor.so" },
  ],
}

export default comparison
