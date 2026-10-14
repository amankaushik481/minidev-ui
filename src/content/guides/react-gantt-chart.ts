import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-gantt-chart",
  title: "Gantt chart in React: timeline scale, dependencies, today line",
  description:
    "Build a Gantt chart in React with Tailwind: a task data model, day and week scales, dependency arrows, a today line, conflict checks and a task table.",
  date: "2026-10-14",
  keywords: [
    "react gantt chart",
    "gantt chart component react",
    "react project timeline component",
    "gantt chart tailwind",
    "react gantt dependencies",
  ],
  related: ["gantt-chart", "gantt-row", "timeline", "data-table"],
  body: [
    {
      type: "p",
      text: "A Gantt chart in React is a list of tasks with a start, an inclusive end and an optional list of ids it depends on, drawn as bars on a day grid where one day is a fixed number of pixels. Everything else, the month header, the week scale, the today line and the dependency arrows, is arithmetic on that one number.",
    },
    {
      type: "p",
      text: "This guide uses the free MiniDev UI [GanttChart](/docs/gantt-chart), which has no dependency and does the drawing in one file, and puts the pieces around it that a real plan needs: a [DataTable](/docs/data-table) to edit tasks, a [Timeline](/docs/timeline) for the change history, a conflict check for dependencies that cannot be met, and a deterministic today line for server rendering. It is honest about what the chart does not do, which is let you drag bars.",
    },

    { type: "h2", text: "The task model", id: "model" },
    {
      type: "p",
      text: "`GanttTask` is the whole contract. Dates are either `Date` objects or ISO day strings like `\"2026-10-14\"`, and the component parses strings as local calendar days, so there is no time zone shift. `end` is the last day of the task, inclusive: a task from the 14th to the 14th is one day long.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "app/plan/tasks.ts",
      code: `import type { GanttTask } from "@/components/ui/gantt-chart"

export const PLAN: GanttTask[] = [
  { id: "discovery", name: "Discovery interviews", start: "2026-10-01", end: "2026-10-07", progress: 100, group: "Research" },
  { id: "positioning", name: "Positioning and pricing", start: "2026-10-08", end: "2026-10-12", progress: 100, group: "Research", dependsOn: ["discovery"] },
  { id: "audit", name: "Design system audit", start: "2026-10-09", end: "2026-10-15", progress: 70, group: "Design", dependsOn: ["discovery"] },
  { id: "landing", name: "Landing page design", start: "2026-10-16", end: "2026-10-23", progress: 10, group: "Design", dependsOn: ["audit"] },
  { id: "billing", name: "Billing API", start: "2026-10-12", end: "2026-10-24", progress: 45, group: "Engineering", dependsOn: ["positioning"] },
  { id: "checkout", name: "Checkout flow", start: "2026-10-25", end: "2026-11-02", progress: 0, group: "Engineering", dependsOn: ["landing", "billing"] },
  { id: "comms", name: "Launch comms", start: "2026-10-26", end: "2026-11-07", progress: 0, group: "Launch", dependsOn: ["landing"] },
  { id: "launch", name: "Public launch", start: "2026-11-08", end: "2026-11-09", group: "Launch", dependsOn: ["checkout", "comms"] },
]`,
    },
    {
      type: "list",
      items: [
        "`group` collects tasks under a heading and gives them a shared colour; groups appear in the order they are first seen. Tasks without a group sit together at the top without a heading.",
        "`progress` is 0 to 100 and draws as a fill inside the bar. Leave it out for 0.",
        "`tone` overrides the group colour for one bar (`accent`, `info`, `success`, `warning`, `danger`), which the conflict check below uses.",
        "Keep dates as strings in state and in the database. Comparing `\"2026-10-14\" <= \"2026-11-02\"` as strings is correct for this format, which makes the checks below trivial.",
      ],
    },

    { type: "h2", text: "Install and render", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/gantt-chart.json\nnpx shadcn@latest add https://ui.minidev.pro/r/data-table.json\nnpx shadcn@latest add https://ui.minidev.pro/r/timeline.json",
    },
    {
      type: "p",
      text: "`GanttChart` pulls in `segmented-control` for the scale switch. Import the token stylesheet once ([styles.css](https://ui.minidev.pro/r/styles.css)); the bar and fill colours are token classes like `bg-accent-soft` and `bg-info/35`.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<GanttChart
  tasks={PLAN}
  today="2026-10-14"
  defaultScale="week"
  title="Launch plan"
  nameWidth={200}
  onTaskClick={(task) => setSelected(task.id)}
  className="max-w-none"
/>`,
    },
    {
      type: "table",
      head: ["Prop", "What it does"],
      rows: [
        ["`tasks`", "The plan. Omit it and the component draws a demo plan around today"],
        ["`scale` / `defaultScale` / `onScaleChange`", "`\"day\"` or `\"week\"`, controlled or not; the header shows a Day / Week control"],
        ["`today`", "The date the today line marks; defaults to the browser's current date"],
        ["`padDays`", "Empty days drawn before the first and after the last task, default 2"],
        ["`title`", "Heading with a task count and date range; an empty string hides the header row and the scale control"],
        ["`nameWidth`", "Width of the sticky task column in pixels, default 176, capped at 132 under 560 pixels"],
        ["`onTaskClick`", "Called with the task when a bar is clicked or activated with Enter or Space"],
      ],
    },

    { type: "h2", text: "How the timeline scale works", id: "scale" },
    {
      type: "p",
      text: "The chart computes its range from the earliest start and latest end (always including today), adds `padDays` on each side, and lays out one column per day: 36 pixels on the day scale, 16 on the week scale. The header has two rows, months on top and either day numbers or week start dates below, and weekends are shaded on the day scale. On the week scale the range snaps outward to whole Monday to Sunday weeks so the columns line up with the labels.",
    },
    {
      type: "p",
      text: "The task column is a separate element beside the scrolling timeline, not a sticky cell inside it, so bars never slide under task names and the horizontal scrollbar belongs to the timeline alone. On mount and whenever the scale changes, the timeline scrolls so today sits about a third of the way in, which is where people expect the present when they are looking at what is next.",
    },
    {
      type: "p",
      text: "A six week plan is about 1,500 pixels wide on the day scale and 700 on the week scale. Default to `week` for plans longer than a couple of months, and let people zoom in. There is no month or quarter scale; for a year of epics, aggregate to one task per epic rather than drawing 365 columns.",
    },

    { type: "h2", text: "Dependencies and the arrows", id: "dependencies" },
    {
      type: "p",
      text: "`dependsOn` lists the ids that must finish first. For each one the chart draws an elbow arrow from the day after the predecessor's end to the dependent's start: a straight elbow when there is room, and an S shaped path that steps down a row when the dependent starts before the predecessor ends. Unknown ids are ignored silently, so a typo produces no arrow rather than a crash.",
    },
    {
      type: "p",
      text: "What the chart does not do is tell you the plan is impossible. That S shaped arrow is the only sign that a task starts before its dependency finishes. Compute the conflicts yourself and colour the bars:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `function conflicts(tasks: GanttTask[]): Set<string> {
  const byId = new Map(tasks.map((t) => [t.id, t]))
  const bad = new Set<string>()
  for (const t of tasks) {
    for (const id of t.dependsOn ?? []) {
      const dep = byId.get(id)
      if (dep && String(t.start) <= String(dep.end)) bad.add(t.id)
    }
  }
  return bad
}

const bad = React.useMemo(() => conflicts(PLAN), [])
const tasks = React.useMemo(() => PLAN.map((t) => (bad.has(t.id) ? { ...t, tone: "danger" as const } : t)), [bad])

<GanttChart tasks={tasks} today={today} />
{bad.size ? <p role="alert" className="mt-3 text-sm text-danger">{bad.size} tasks start before a dependency ends.</p> : null}`,
    },
    {
      type: "p",
      text: "The same loop is the start of real scheduling: to push dependents automatically, sort tasks topologically, and for each one set `start` to the day after the latest `end` among its dependencies when it is earlier, keeping the duration. That is a dozen lines, but it belongs in your data layer, not in the chart.",
    },

    { type: "h2", text: "A deterministic today line", id: "today" },
    {
      type: "p",
      text: "Left to its default, the chart reads `new Date()` in a lazy `useState`, which runs on the server during SSR and again on the client. Around midnight, or when the server runs in UTC and the user does not, the two can disagree by a day and React logs a [hydration](/glossary/hydration) mismatch. Pass `today` from the server, formatted in the workspace's time zone:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/plan/page.tsx",
      code: `import { PlanView } from "./plan-view"

export default async function PlanPage() {
  const workspace = await getWorkspace()
  // en-CA formats as YYYY-MM-DD, which is the shape the chart parses as a local day.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: workspace.timeZone }).format(new Date())
  return <PlanView tasks={await getTasks(workspace.id)} today={today} />
}`,
    },
    {
      type: "p",
      text: "The today column is tinted on the day scale, and a dashed accent line runs down the middle of it on both scales. If today falls outside the task range it still extends the range, so a plan that ended last month shows the gap honestly.",
    },

    { type: "h2", text: "Edit tasks in a table, read them in the chart", id: "table" },
    {
      type: "p",
      text: "The chart is read only: bars are buttons that report a click, and nothing can be dragged. Keep editing in a form and listing in a `DataTable`, with both reading the same array. Clicking a bar selects the task; clicking a row does the same thing from the other side.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const columns: Column<GanttTask>[] = [
  { id: "name", header: "Task", sortValue: (t) => t.name, cell: (t) => t.name },
  { id: "group", header: "Group", sortValue: (t) => t.group ?? "", cell: (t) => <span className="text-fg-muted">{t.group}</span> },
  { id: "start", header: "Start", sortValue: (t) => String(t.start), cell: (t) => String(t.start) },
  { id: "end", header: "End", sortValue: (t) => String(t.end), cell: (t) => String(t.end) },
  { id: "progress", header: "Done", align: "right", sortValue: (t) => t.progress ?? 0, cell: (t) => (t.progress ?? 0) + "%" },
]

<DataTable
  columns={columns}
  data={tasks}
  getRowId={(t) => t.id}
  defaultSort={{ id: "start", dir: "asc" }}
  density="compact"
  caption="Tasks"
  onRowClick={(t) => setSelected(t.id)}
  rowActions={(t) => <Button size="xs" variant="ghost" onClick={() => openEditor(t)}>Edit</Button>}
/>`,
    },
    {
      type: "p",
      text: "The chart has no `selected` prop, so selection shows in the table and in whatever detail panel you open, not as a highlighted bar. If you want one, give the selected task `tone: \"info\"` in the array you pass, the same trick as the conflict colouring. For sorting, filtering and paging beyond what `DataTable` does on its own, the [TanStack table guide](/guides/react-data-table-tanstack) wires the same component to a headless table.",
    },

    { type: "h2", text: "The change history with Timeline", id: "timeline" },
    {
      type: "p",
      text: "`Timeline` is not a time scale; it is a vertical list of dated events on a hairline, newest first, which is exactly what a plan's audit trail looks like. Items take `title`, `description` and `time` as nodes:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<Timeline
  items={[
    { title: "Checkout flow moved to Oct 25", description: "Billing API slipped three days. Pushed by Theo Okafor.", time: "Oct 13" },
    { title: "Design system audit at 70%", description: "Maya Chen updated progress", time: "Oct 12" },
    { title: "Plan created", description: "8 tasks across 4 groups", time: "Sep 30" },
  ]}
/>`,
    },
    {
      type: "p",
      text: "Write the entries when a task changes, with the old and new dates in the description. A plan without history is a plan nobody trusts, because the launch date only ever moves one way.",
    },

    { type: "h2", text: "GanttRow for a single relative bar", id: "gantt-row" },
    {
      type: "p",
      text: "[GanttRow](/docs/gantt-row) is the small sibling: a label and one bar positioned by `start` and `end` as plain numbers out of `max`, with no dates, header or arrows. It is right for a sprint burndown row or a \"day 3 of 14\" indicator inside a card, where a full chart would be noise.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<GanttRow label="Sprint 42" start={3} end={9} max={14} />`,
    },

    { type: "h2", text: "Accessibility", id: "accessibility" },
    {
      type: "list",
      items: [
        "Every bar is a `<button>` with a complete label: \"Checkout flow, Oct 25 to Nov 2, 9 days, 0% done, Engineering\". Tab moves through tasks in row order, and focusing a bar shows the same tooltip as hovering it.",
        "The tooltip has `role=\"tooltip\"` and repeats the dates, the duration and the progress bar, so pointer users get the detail without a click.",
        "The scale switch is a segmented control labelled \"Timeline scale\". Group headings, weekend shading and the arrows are decorative (`aria-hidden`); the arrows' meaning is in the data, so put `dependsOn` in the table or the detail panel as text.",
        "The timeline scrolls horizontally with `overscroll-x-contain`, so a trackpad swipe at the edge does not navigate back. Keyboard users scroll it by tabbing to bars; add left and right scroll buttons if the plan is long.",
        "Bar text is hidden when the bar is narrower than 72 pixels, which happens for one or two day tasks on the week scale. The label and the task column still carry the name.",
      ],
    },

    { type: "h2", text: "Limits and pitfalls", id: "pitfalls" },
    {
      type: "list",
      items: [
        "**No drag to reschedule.** Bars report clicks only. If you add dragging in your copy, snap to whole days and write the new dates back through the same action the form uses.",
        "**No milestones.** A one day task is the nearest thing; give it `tone: \"warning\"` and a name like \"Launch\". Zero length tasks are not supported.",
        "**Mutable `Date` inputs.** If you pass `Date` objects, create new ones on change; the chart memoises on the array identity, and mutating a date in place does not redraw.",
        "**Very long plans.** Each day is a header cell and a grid column, so a two year plan on the day scale is over 700 columns and a wide DOM. Aggregate, or control `scale` and keep it on `week` for long ranges.",
        "**Narrow screens.** The task column shrinks to 132 pixels and progress percentages hide. Below about 400 pixels, show the `DataTable` instead and keep the chart for tablets and up.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "All of these are free and MIT licensed, with related planning pieces (kanban, calendar, agenda) in the [workflow category](/components/workflow). The task table follows the [data table glossary entry](/glossary/data-table), and a board view of the same tasks is in the [kanban guide](/guides/react-kanban-board-drag-drop). If you want the whole project tool built rather than assembled, the [MiniDev studio](https://minidev.pro) builds products on this kit.",
    },
    { type: "component", name: "gantt-chart" },
    { type: "component", name: "timeline" },
    { type: "component", name: "data-table" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "How do I draw a Gantt chart in React without a library?",
      a: "Pick a pixel width per day, compute each task's left offset as the days since the range start times that width and its width as the duration times it, and position the bars absolutely in a scrolling container. Months and weeks are the same arithmetic on the header. The kit's GanttChart is this in one file.",
    },
    {
      q: "How are dependencies drawn in a Gantt chart?",
      a: "As an arrow from the day after the predecessor's end to the dependent's start. When the dependent starts later there is a simple elbow; when it starts earlier, the path steps around the bar, which is also the visual sign of a scheduling conflict. Validate the dates in your data layer; the chart only draws.",
    },
    {
      q: "Why does the today line show the wrong day?",
      a: "Usually because the chart read the date on a server in a different time zone, or from a UTC ISO string. Pass `today` as a `YYYY-MM-DD` string formatted in the user's time zone (`Intl.DateTimeFormat(\"en-CA\", { timeZone })`), and the chart parses it as a local calendar day.",
    },
  ],
}

export default guide
