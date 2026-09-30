import type { Guide } from "../types"

const guide: Guide = {
  slug: "nextjs-saas-dashboard",
  title: "Build a SaaS dashboard in Next.js with free components",
  description:
    "Build a SaaS dashboard in Next.js App Router with free React components: app shell, sidebar nav, KPI cards, charts, a data table, and empty and loading states.",
  date: "2026-09-30",
  keywords: [
    "nextjs dashboard template",
    "react admin dashboard",
    "saas dashboard ui",
    "nextjs admin panel tailwind",
    "shadcn dashboard",
  ],
  related: [
    "dashboard-home",
    "admin-overview",
    "app-shell",
    "sidebar",
    "sidebar-section",
    "topbar",
    "page-header",
    "kpi-row",
    "stat-card",
    "chart-card",
    "area-chart",
    "bar-chart",
    "data-table",
    "activity-feed",
    "empty-state",
    "empty-table",
    "loading-table",
    "skeleton",
    "retry-block",
    "sheet",
  ],
  body: [
    {
      type: "p",
      text: "A SaaS dashboard in Next.js is a route group with one shared layout (sidebar, top bar, scrolling content area) and pages that fetch data in server components and hand it to a few presentational pieces: a KPI row, chart cards, a data table and an activity feed. MiniDev UI ships each of those as free, shadcn-compatible React components, plus two assembled blocks, `dashboard-home` and `admin-overview`, that you can copy as a starting point. This guide wires them into the App Router with real loading, empty and error states.",
    },

    { type: "h2", text: "Project structure", id: "structure" },
    {
      type: "p",
      text: "Put the authenticated app in a route group so it gets its own layout without adding a URL segment. Marketing pages stay outside it with their own layout.",
    },
    {
      type: "code",
      lang: "bash",
      code: "app/\n  (marketing)/page.tsx\n  (app)/\n    layout.tsx          # AppShell: sidebar + topbar\n    app-nav.tsx         # client: active link state\n    dashboard/\n      page.tsx          # KPIs, charts, activity\n      loading.tsx       # skeletons\n      error.tsx         # retry\n    customers/page.tsx  # DataTable",
    },
    {
      type: "p",
      text: "Install the pieces. Each command copies the source into `components/ui`, including registry dependencies such as `avatar`, `list-item` and `metric-delta`. Add the [token stylesheet](https://ui.minidev.pro/r/styles.css) to your global CSS once; it defines the surfaces, text colors and shadows every component uses, in light and dark.",
    },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/app-shell.json https://ui.minidev.pro/r/sidebar-section.json https://ui.minidev.pro/r/topbar.json https://ui.minidev.pro/r/page-header.json\nnpx shadcn@latest add https://ui.minidev.pro/r/kpi-row.json https://ui.minidev.pro/r/stat-card.json https://ui.minidev.pro/r/chart-card.json https://ui.minidev.pro/r/area-chart.json\nnpx shadcn@latest add https://ui.minidev.pro/r/data-table.json https://ui.minidev.pro/r/activity-feed.json https://ui.minidev.pro/r/empty-table.json https://ui.minidev.pro/r/loading-table.json https://ui.minidev.pro/r/retry-block.json",
    },

    { type: "h2", text: "The app shell layout", id: "app-shell" },
    {
      type: "p",
      text: "[AppShell](/docs/app-shell) takes three slots: `sidebar`, `topbar` and `children`. The sidebar column is 224px wide, sits on the `sunken` surface, and is hidden below the `md` breakpoint. The content area scrolls on its own, so the sidebar and top bar stay put. Its default classes (rounded corners, a border, `min-h-[420px]`) suit a preview card; for a full page, override them. `cn` uses `tailwind-merge`, so your classes win.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/layout.tsx",
      code: 'import { AppShell } from "@/components/ui/app-shell"\nimport { Topbar } from "@/components/ui/topbar"\nimport { AppNav, MobileNav } from "./app-nav"\n\nexport default function AppLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <AppShell\n      className="h-dvh min-h-0 rounded-none border-0"\n      sidebar={<AppNav />}\n      topbar={<Topbar left={<MobileNav />} right={<UserMenu />} />}\n    >\n      <main className="mx-auto max-w-6xl">{children}</main>\n    </AppShell>\n  )\n}',
    },
    {
      type: "p",
      text: "The layout is a server component. `AppShell` is a client component, but anything you pass as `children` stays server rendered, so pages can still `await` data directly.",
    },

    { type: "h2", text: "Sidebar navigation with real links", id: "sidebar-navigation" },
    {
      type: "p",
      text: "Group links with [SidebarSection](/docs/sidebar-section), which renders an optional small uppercase title and a stacked list. `AppShell` already provides the sidebar column, so you do not need the [Sidebar](/docs/sidebar) container inside it; `Sidebar` is for shells you build yourself, including its 56px `collapsed` mode. Its `SidebarNavItem` is a `button`, which is right for in-app actions. For page navigation use `next/link`, so people get prefetching, middle-click and a real URL on hover:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/app-nav.tsx",
      code: '"use client"\nimport * as React from "react"\nimport Link from "next/link"\nimport { usePathname } from "next/navigation"\nimport { HomeIcon, UsersIcon, CreditCardIcon, SettingsIcon, MenuIcon } from "lucide-react"\nimport { SidebarSection } from "@/components/ui/sidebar-section"\nimport { Sheet } from "@/components/ui/sheet"\n\nconst NAV = [\n  { href: "/dashboard", label: "Overview", icon: HomeIcon },\n  { href: "/customers", label: "Customers", icon: UsersIcon },\n  { href: "/billing", label: "Billing", icon: CreditCardIcon },\n  { href: "/settings", label: "Settings", icon: SettingsIcon },\n]\n\nexport function AppNav({ onNavigate }: { onNavigate?: () => void }) {\n  const pathname = usePathname()\n  return (\n    <nav aria-label="App">\n      <SidebarSection title="Workspace">\n        {NAV.map(({ href, label, icon: Icon }) => {\n          const active = pathname === href || pathname.startsWith(href + "/")\n          return (\n            <Link\n              key={href}\n              href={href}\n              onClick={onNavigate}\n              aria-current={active ? "page" : undefined}\n              data-active={active || undefined}\n              className="flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-fg-muted transition-[background-color,color] duration-[70ms] hover:bg-fg/5 hover:text-fg data-[active]:bg-surface data-[active]:text-fg data-[active]:shadow-xs"\n            >\n              <Icon className="size-4" />\n              <span className="truncate">{label}</span>\n            </Link>\n          )\n        })}\n      </SidebarSection>\n    </nav>\n  )\n}\n\nexport function MobileNav() {\n  const [open, setOpen] = React.useState(false)\n  return (\n    <>\n      <button type="button" aria-label="Open navigation" className="grid size-9 place-items-center rounded-lg md:hidden" onClick={() => setOpen(true)}>\n        <MenuIcon className="size-4" />\n      </button>\n      <Sheet open={open} onClose={() => setOpen(false)} side="left" title="Navigation" className="max-w-72">\n        <AppNav onNavigate={() => setOpen(false)} />\n      </Sheet>\n    </>\n  )\n}',
    },
    {
      type: "p",
      text: "Two details: `aria-current=\"page\"` tells screen readers which link is the current page, and the active style uses the raised `surface` color because the sidebar column is already `sunken`. The same nav renders inside a left [Sheet](/docs/sheet) on small screens, where the shell hides the sidebar.",
    },

    { type: "h2", text: "KPIs that read correctly", id: "kpis" },
    {
      type: "p",
      text: "[KpiRow](/docs/kpi-row) lays out up to four tiles in a responsive grid (one column, then two at `sm`, four at `lg`). Each item is `{ label, value, delta }`. A numeric `delta` renders through `MetricDelta` as a percentage with an arrow, green when it is zero or above and red below. A string `delta` renders as muted text, which suits context like \"30d\" or \"+2 this week\".",
    },
    {
      type: "code",
      lang: "tsx",
      code: 'const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" })\n\n<KpiRow\n  items={[\n    { label: "MRR", value: usd.format(kpis.mrr), delta: kpis.mrrChange },\n    { label: "Active users", value: kpis.active.toLocaleString("en-US"), delta: kpis.activeChange },\n    { label: "Trials", value: String(kpis.trials), delta: "+" + kpis.newTrials + " this week" },\n    { label: "Uptime", value: "99.98%", delta: "30d" },\n  ]}\n/>',
    },
    {
      type: "p",
      text: "Pick four numbers that someone would act on this week, and make the comparison period explicit in the label or description (\"vs last month\"). A delta without a period is noise. Format values on the server with `Intl.NumberFormat`; the tiles expect strings and render them with `tabular-nums`. For metrics where down is good, such as churn, latency or error rate, use [StatCard](/docs/stat-card) with `invertDelta`. It colors a string delta by its sign, and `invertDelta` flips the meaning so \"-0.3%\" churn shows as good news.",
    },
    {
      type: "code",
      lang: "tsx",
      code: '<StatCard label="Churn" value="1.1%" delta="-0.3%" invertDelta footnote="vs last month" />',
    },

    { type: "h2", text: "Charts without a charting library", id: "charts" },
    {
      type: "p",
      text: "[ChartCard](/docs/chart-card) is the frame: a `section` with a title, an optional description and a body with a 160px minimum height. Put any chart inside. MiniDev UI's charts are small SVG components with no dependency: [AreaChart](/docs/area-chart) takes `data: number[]`, [BarChart](/docs/bar-chart) takes `{ label, value }[]` and a `format` function, and [LineChart](/docs/line-chart) takes `series: number[][]` colored from the `--chart-1` to `--chart-5` tokens. Strokes use `vector-effect: non-scaling-stroke`, so lines stay crisp at any width.",
    },
    {
      type: "code",
      lang: "tsx",
      code: '<div className="grid gap-4 lg:grid-cols-5">\n  <ChartCard className="lg:col-span-3" title="Active users" description="Daily, last 30 days">\n    <AreaChart data={series} label="Daily active users, last 30 days" highlight={series.length - 1} className="h-40" />\n  </ChartCard>\n  <ChartCard className="lg:col-span-2" title="Signups by channel">\n    <BarChart data={channels} format={(n) => n.toLocaleString("en-US")} label="Signups by channel this month" />\n  </ChartCard>\n</div>',
    },
    {
      type: "p",
      text: "Aggregate on the server and send the chart only the points it draws, such as 30 daily totals, rather than raw events. Always pass `label`. The SVG has `role=\"img\"` and uses it as its accessible name, so write a sentence that states what the chart shows. When people need to read exact values, use [InteractiveAreaChart](/docs/interactive-area-chart): it supports hover and arrow keys, pins a crosshair and shows the delta against a comparison series. For heavy analytics (zooming, thousands of points, many axes), keep `ChartCard` as the frame and render a full charting library inside it.",
    },
    { type: "component", name: "chart-card" },

    { type: "h2", text: "A data table that feels like a product", id: "data-table" },
    {
      type: "p",
      text: "[DataTable](/docs/data-table) is generic over your row type. Columns declare an `id`, a `header`, a `cell` renderer and, optionally, a `sortValue` that turns the header into a sort button with the correct `aria-sort`. It also handles row selection with an indeterminate header checkbox, a floating bulk action bar, hover-revealed row actions, keyboard-activated row clicks, density, a sticky header when you set `maxHeight`, and built-in skeleton rows when `loading` is true.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/customers/customers-table.tsx",
      code: '"use client"\nimport { useRouter } from "next/navigation"\nimport { DataTable, type Column } from "@/components/ui/data-table"\nimport { EmptyTable } from "@/components/ui/empty-table"\nimport { Button } from "@/components/ui/button"\n\ntype Customer = { id: string; name: string; plan: string; mrr: number; joined: string }\n\nconst usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })\n\nconst columns: Column<Customer>[] = [\n  { id: "name", header: "Customer", cell: (r) => r.name, sortValue: (r) => r.name },\n  { id: "plan", header: "Plan", cell: (r) => r.plan, sortValue: (r) => r.plan },\n  { id: "mrr", header: "MRR", align: "right", cell: (r) => usd.format(r.mrr), sortValue: (r) => r.mrr },\n  { id: "joined", header: "Joined", cell: (r) => r.joined.slice(0, 10), sortValue: (r) => new Date(r.joined) },\n]\n\nexport function CustomersTable({ rows }: { rows: Customer[] }) {\n  const router = useRouter()\n  return (\n    <DataTable\n      caption="Customers"\n      columns={columns}\n      data={rows}\n      getRowId={(r) => r.id}\n      defaultSort={{ id: "mrr", dir: "desc" }}\n      selectable\n      bulkActions={(ids) => <Button size="sm" variant="ghost" onClick={() => exportCsv(ids)}>Export</Button>}\n      onRowClick={(r) => router.push("/customers/" + r.id)}\n      maxHeight={560}\n      empty={<EmptyTable title="No customers yet" description="Customers appear here after their first payment." />}\n    />\n  )\n}',
    },
    {
      type: "list",
      items: [
        "Define `columns` at module scope. The table memoizes sorted rows on `columns`, so a stable reference avoids re-sorting on every render.",
        "Right-aligned columns get `tabular-nums` automatically, so currency lines up by digit.",
        "Sorting is client side, over the `data` you pass. For large datasets, sort and paginate on the server and add [TablePagination](/docs/table-pagination) below the table.",
        "`caption` renders as a visually hidden `caption` element, which gives the table an accessible name.",
        "Keep filters, search and sort in the URL (`searchParams`) so a filtered view can be bookmarked and shared, and read them in the server page to set `defaultSort` and the query.",
      ],
    },

    { type: "h2", text: "Fetch on the server, stream the slow parts", id: "data-fetching" },
    {
      type: "p",
      text: "The dashboard page is an async server component. Fetch what the first screen needs in parallel, render it, and wrap slower widgets in `Suspense` so they stream in without blocking the KPIs.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/dashboard/page.tsx",
      code: 'import { Suspense } from "react"\nimport Link from "next/link"\nimport { PageHeader } from "@/components/ui/page-header"\nimport { KpiRow } from "@/components/ui/kpi-row"\nimport { ActivityFeed } from "@/components/ui/activity-feed"\nimport { SkeletonCard } from "@/components/ui/skeleton"\nimport { Button } from "@/components/ui/button"\n\nexport default async function DashboardPage() {\n  const [kpis, series] = await Promise.all([getKpis(), getDailyActive()])\n  return (\n    <div className="space-y-6">\n      <PageHeader\n        title="Overview"\n        description="Acme workspace"\n        actions={<Button size="sm" render={<Link href="/projects/new" />}>New project</Button>}\n      />\n      <KpiRow items={toKpis(kpis)} />\n      <div className="grid gap-4 lg:grid-cols-5">\n        {/* ChartCard + AreaChart from the previous section, span 3 */}\n        <Suspense fallback={<SkeletonCard className="lg:col-span-2" />}>\n          <RecentActivity />\n        </Suspense>\n      </div>\n    </div>\n  )\n}\n\nasync function RecentActivity() {\n  const events = await getActivity({ limit: 8 })\n  return <ActivityFeed className="lg:col-span-2" items={events} />\n}',
    },
    {
      type: "p",
      text: "[PageHeader](/docs/page-header) renders the page `h1`, a description and an actions slot. `Button` accepts a `render` prop, so the primary action can be a real `Link`. [ActivityFeed](/docs/activity-feed) takes `{ id, user, action, time }` items and renders an avatar with initials, the actor in medium weight, the action muted, and the time right-aligned.",
    },

    { type: "h2", text: "Empty, loading and error states", id: "states" },
    {
      type: "p",
      text: "A dashboard spends much of its life empty (new accounts), loading (slow queries) or failing (expired tokens). Design all three up front.",
    },
    {
      type: "h3",
      text: "Loading",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/dashboard/loading.tsx",
      code: 'import { Skeleton } from "@/components/ui/skeleton"\nimport { LoadingTable } from "@/components/ui/loading-table"\n\nexport default function Loading() {\n  return (\n    <div className="space-y-6" role="status" aria-label="Loading dashboard">\n      <Skeleton className="h-8 w-48" />\n      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">\n        {Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-[92px] rounded-xl" />)}\n      </div>\n      <LoadingTable rows={6} cols={4} />\n    </div>\n  )\n}',
    },
    {
      type: "p",
      text: "Match skeleton sizes to the real content so nothing jumps when data arrives. [Skeleton](/docs/skeleton) is `aria-hidden`, so label the wrapper; [LoadingTable](/docs/loading-table) already carries `role=\"status\"`. Inside a client table that refetches, pass `loading` to `DataTable` instead to keep the header in place.",
    },
    { type: "h3", text: "Empty" },
    {
      type: "p",
      text: "Use [EmptyState](/docs/empty-state) for whole sections and [EmptyTable](/docs/empty-table) inside tables. Both take `title`, `description`, `actionLabel` and `onAction`. Say what will appear and give the one action that makes it appear, such as \"Connect Stripe\" or \"Invite a teammate\". Distinguish a new account (\"No customers yet\") from a filter with no matches (\"No results for these filters\"), which `DataTable` shows by default.",
    },
    { type: "h3", text: "Error" },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/dashboard/error.tsx",
      code: '"use client"\nimport { RetryBlock } from "@/components/ui/retry-block"\n\nexport default function DashboardError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {\n  return (\n    <RetryBlock\n      title="We could not load your dashboard"\n      description="This is usually temporary. Try again, and contact support if it keeps happening."\n      onRetry={reset}\n    />\n  )\n}',
    },
    {
      type: "callout",
      tone: "tip",
      text: "An `error.tsx` boundary keeps the sidebar and top bar working when one page fails, because it only replaces the segment below the layout.",
    },

    { type: "h2", text: "Start from the blocks", id: "blocks" },
    {
      type: "p",
      text: "[DashboardHome](/docs/dashboard-home) assembles `PageHeader`, `KpiRow`, a `ChartCard` and an `ActivityFeed` in the 3:2 grid used above. [AdminOverview](/docs/admin-overview) is the org admin variant with an `AdminStatStrip` for seats, MRR, NPS and churn. Install either, then replace the sample arrays with props fed from your server components. For other screens, the [templates](/templates) show complete apps, and the [AI chat guide](/guides/ai-chat-ui-react) covers adding an assistant panel.",
    },
    { type: "component", name: "dashboard-home" },
    { type: "component", name: "admin-overview" },

    { type: "h2", text: "Components used", id: "components" },
    {
      type: "p",
      text: "Everything in this guide is free under MIT: app-shell, sidebar-section, topbar, page-header, kpi-row, stat-card, chart-card, area-chart, bar-chart, data-table, activity-feed, empty-state, empty-table, loading-table, skeleton and retry-block. When you need the whole product built rather than the parts, the [MiniDev studio](https://minidev.pro) builds complete SaaS apps on this kit.",
    },
    { type: "component", name: "app-shell" },
    { type: "component", name: "kpi-row" },
    { type: "component", name: "data-table" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json",
    },
  ],
  faq: [
    {
      q: "Is there a free Next.js dashboard template with shadcn-compatible components?",
      a: "Yes. MiniDev UI's `dashboard-home` and `admin-overview` blocks are MIT licensed and install with the shadcn CLI, and every piece inside them (app shell, KPIs, charts, data table) installs on its own too.",
    },
    {
      q: "Should dashboard pages be server or client components in Next.js?",
      a: "Keep pages and layouts as server components that fetch data, and make only the interactive leaves client components, such as the nav with active state or a table with selection. Server components can render client components and pass them plain data.",
    },
    {
      q: "Do I need a chart library for a React admin dashboard?",
      a: "Not for KPI trends and simple comparisons. Lightweight SVG charts like `AreaChart` and `BarChart` cover sparklines, trends and category bars. Reach for a full library when you need zoom, brushing, many axes or very large datasets.",
    },
    {
      q: "How do I show loading states in a Next.js App Router dashboard?",
      a: "Add a `loading.tsx` next to the page for the initial load, wrap slow widgets in `Suspense` with skeleton fallbacks, and pass `loading` to client tables when they refetch.",
    },
  ],
}

export default guide
