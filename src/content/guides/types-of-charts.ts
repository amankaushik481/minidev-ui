import type { Guide } from "../types"

const guide: Guide = {
  slug: "types-of-charts",
  title: "Types of Charts: A Complete Guide to Choosing the Right One",
  description:
    "Bar, line, area, pie, donut, funnel, sankey, treemap, radar and more: what each chart type is best for, when to avoid it, and a live example of every one.",
  date: "2026-11-05",
  keywords: [
    "types of charts",
    "types of graphs",
    "which chart to use",
    "chart types and uses",
    "how to choose a chart",
    "types of charts in dashboards",
  ],
  related: ["bar-chart", "line-chart", "area-chart", "donut-chart", "funnel-chart", "sankey-chart"],
  body: [
    {
      type: "tldr",
      items: [
        "**Comparing amounts?** Use a bar chart. Horizontal bars when the labels are long or there are more than 7 categories.",
        "**Showing change over time?** Use a line chart. An area chart when the total volume matters, a sparkline when space is tight.",
        "**Showing parts of a whole?** Use a donut or pie chart for 2 to 5 parts, a stacked bar or treemap for more.",
        "**Showing a process or a flow?** Use a funnel chart for steps that lose people, a sankey diagram for where things go.",
      ],
    },
    {
      type: "p",
      text: "Every chart answers one question. Pick the chart by the question, not by how it looks: the same twelve numbers read as a story in a line chart and as noise in a pie chart. This guide covers the chart types you will meet in dashboards, reports and SaaS products, grouped by the question each one answers. Every section says what the chart is **best for**, when to **avoid** it, and shows a live example you can click, built with [MiniDev UI](/components/charts), a free React and Tailwind kit.",
    },
    { type: "h2", text: "Chart picker: what are you trying to show?", id: "chart-picker" },
    {
      type: "table",
      head: ["You want to show", "Use", "Avoid"],
      rows: [
        ["Which item is bigger", "[Bar chart](#bar-chart), [horizontal bar chart](#horizontal-bar-chart)", "Pie chart with many slices"],
        ["How a number changed over time", "[Line chart](#line-chart), [area chart](#area-chart)", "Bar chart with 30+ bars"],
        ["A trend in a small space", "[Sparkline](#sparkline)", "A full chart with axes in a table cell"],
        ["How a total splits into parts", "[Donut](#donut-chart), [pie](#pie-chart), [stacked bar](#stacked-bar-chart)", "Pie chart with more than 5 slices"],
        ["Many parts and their sizes at once", "[Treemap](#treemap-chart)", "Pie chart"],
        ["Progress toward a goal", "[Radial chart](#radial-chart), progress bar", "Gauge with no target"],
        ["Where people drop out of a process", "[Funnel chart](#funnel-chart)", "Line chart"],
        ["Where things flow from and to", "[Sankey diagram](#sankey-chart)", "Several pie charts"],
        ["Several qualities of a few options", "[Radar chart](#radar-chart)", "Radar chart with 10 options"],
        ["Tasks on a schedule", "[Gantt chart](#gantt-chart)", "A table of dates"],
        ["Who reports to whom", "[Org chart](#org-chart)", "Indented list"],
      ],
    },

    { type: "h2", text: "Charts that compare amounts", id: "comparison" },
    {
      type: "p",
      text: "People judge length along a common baseline more accurately than angle, area or colour. That single fact is why bar charts are the default for comparison, and why most chart advice comes back to them.",
    },
    { type: "h3", text: "Bar chart", id: "bar-chart" },
    {
      type: "p",
      text: "A bar chart shows one bar per category, with the length proportional to the value. Vertical bars (columns) read well for a handful of categories or for periods such as weeks and months.",
    },
    {
      type: "p",
      text: "**Best for:** revenue by month, signups by plan, tickets by team. **Avoid when:** you have more than about 12 categories, or the labels are long, because they will collide under the bars. **Tip:** always start the value axis at zero. A bar that starts at 80 makes a 5% difference look like a 50% one.",
    },
    { type: "example", name: "bar-chart", index: 0, caption: "Weekly values with a hover readout." },
    { type: "h3", text: "Horizontal bar chart", id: "horizontal-bar-chart" },
    {
      type: "p",
      text: "The same chart turned on its side. Labels sit on the left at full length, so the chart stays readable with product names, countries or page URLs, and it scales to 20 or more rows by growing taller.",
    },
    {
      type: "p",
      text: "**Best for:** rankings (top pages, top customers, top errors) and any category list with long names. **Avoid when:** the categories are time periods; time reads left to right, so use columns or a line. **Tip:** sort the bars by value, largest first, unless the categories have a natural order.",
    },
    { type: "example", name: "horizontal-bar-chart", index: 0 },
    { type: "h3", text: "Radar chart", id: "radar-chart" },
    {
      type: "p",
      text: "A radar (spider) chart plots several measures on axes that radiate from a centre, then joins the points into a shape. Two or three overlapping shapes make differences in profile visible at a glance.",
    },
    {
      type: "p",
      text: "**Best for:** comparing two or three options across 5 to 8 qualities, such as plans, candidates or product scores. **Avoid when:** you need exact values, or you are comparing more than three shapes; the overlap turns into a knot. **Tip:** keep every axis on the same scale, or the shape lies.",
    },
    { type: "example", name: "radar-chart", index: 1, caption: "Two options compared across the same axes." },

    { type: "h2", text: "Charts that show change over time", id: "time" },
    { type: "h3", text: "Line chart", id: "line-chart" },
    {
      type: "p",
      text: "A line chart joins values in time order, so the eye follows the trend rather than individual points. It is the clearest way to show direction, seasonality and sudden changes, and it handles hundreds of points without clutter.",
    },
    {
      type: "p",
      text: "**Best for:** traffic, revenue, latency, any metric over days, weeks or months; two or three series compared on the same axis. **Avoid when:** the x-axis is categories with no order, such as countries; a line between them implies a trend that does not exist. **Tip:** more than four lines on one chart becomes spaghetti. Split them into small multiples instead.",
    },
    { type: "example", name: "line-chart", index: 1, caption: "Two series with a legend." },
    { type: "h3", text: "Area chart", id: "area-chart" },
    {
      type: "p",
      text: "An area chart is a line chart with the space under the line filled. The fill gives weight to volume, so it suits metrics where the total amount matters as much as the direction.",
    },
    {
      type: "p",
      text: "**Best for:** cumulative values, volumes such as storage used or requests served, and hero metrics on a dashboard card. **Avoid when:** you overlay several series; the fills hide each other. Use a line chart or a stacked area instead. **Tip:** a soft gradient fill reads as lighter than a solid one, which keeps a dashboard calm.",
    },
    { type: "example", name: "area-chart", index: 3, caption: "An area chart inside a stat card." },
    { type: "h3", text: "Sparkline", id: "sparkline" },
    {
      type: "p",
      text: "A sparkline is a tiny line chart with no axes, sized to sit next to a number or inside a table cell. It answers one question, which way is this going, and leaves exact values to the number beside it.",
    },
    {
      type: "p",
      text: "**Best for:** KPI cards, table rows, and any summary where you want the trend without spending space on a chart. **Avoid when:** readers need to compare exact values or read dates. **Tip:** pair every sparkline with the current value and the change, such as $12,400 and +8%, so it never has to stand alone.",
    },
    { type: "example", name: "sparkline-set", index: 0 },
    { type: "h3", text: "Gantt chart", id: "gantt-chart" },
    {
      type: "p",
      text: "A Gantt chart lays tasks out as bars on a timeline, one row per task, with the bar's start and length showing when it happens and how long it takes. Dependencies, milestones and a today line make it a planning tool rather than just a picture.",
    },
    {
      type: "p",
      text: "**Best for:** project plans, release schedules, rollouts and anything with start and end dates. **Avoid when:** dates are approximate and change weekly; a simple ordered list or kanban board will be kept more up to date. **Tip:** show progress inside each bar so the chart answers both what is planned and what is done.",
    },
    { type: "example", name: "gantt-chart", index: 0 },

    { type: "h2", text: "Charts that show parts of a whole", id: "parts" },
    { type: "h3", text: "Pie chart", id: "pie-chart" },
    {
      type: "p",
      text: "A pie chart splits a circle into slices that add up to 100%. It is the most recognised chart there is, and the most misused: people compare angles poorly, so a pie works only when the parts are few and clearly different.",
    },
    {
      type: "p",
      text: "**Best for:** 2 to 5 parts where one or two dominate, such as share of traffic by device. **Avoid when:** slices are close in size, there are more than 5, or you need to compare two pies. **Tip:** label slices directly with their percentages; a legend makes the reader match colours back and forth.",
    },
    { type: "example", name: "pie-chart", index: 0 },
    { type: "h3", text: "Donut chart", id: "donut-chart" },
    {
      type: "p",
      text: "A donut is a pie chart with the centre removed. The hole is useful space: put the total, or the one number that matters, in the middle. Because readers judge arc length rather than angle, a donut is slightly easier to read than a pie.",
    },
    {
      type: "p",
      text: "**Best for:** a single split with a headline number, such as storage used by file type with the total in the centre. **Avoid when:** the same limits as a pie apply: few parts, clearly different sizes. **Tip:** start the first slice at 12 o'clock and go clockwise, largest to smallest.",
    },
    { type: "example", name: "donut-chart", index: 3, caption: "A donut with its total in the centre." },
    { type: "h3", text: "Stacked bar chart", id: "stacked-bar-chart" },
    {
      type: "p",
      text: "A stacked bar chart splits each bar into segments, so one chart shows both the total per category and how it is made up. It is the right answer to a pie chart with too many slices, and to a set of pies you want to compare.",
    },
    {
      type: "p",
      text: "**Best for:** revenue by month split by plan, tickets by week split by priority. **Avoid when:** readers need to compare the middle segments precisely, because they do not share a baseline. Only the bottom segment and the total are easy to compare. **Tip:** put the most important segment at the bottom.",
    },
    { type: "example", name: "stacked-bar-chart", index: 0 },
    { type: "h3", text: "Treemap", id: "treemap-chart" },
    {
      type: "p",
      text: "A treemap fills a rectangle with smaller rectangles, each sized by value and optionally grouped. It shows dozens of parts at once, where a pie chart would turn into confetti.",
    },
    {
      type: "p",
      text: "**Best for:** budgets by department and line item, disk usage by folder, revenue by product and region. **Avoid when:** values are close together, or precise comparison matters; areas are hard to compare exactly. **Tip:** colour by group and label only the rectangles big enough to hold text.",
    },
    { type: "example", name: "treemap-chart", index: 1 },
    { type: "h3", text: "Radial chart", id: "radial-chart" },
    {
      type: "p",
      text: "A radial chart draws one or more rings that fill toward a goal, like an activity ring. It is a compact way to show progress against a target rather than parts of a total.",
    },
    {
      type: "p",
      text: "**Best for:** quota used, goals reached, onboarding completion. **Avoid when:** there is no target; a ring that fills toward nothing means nothing. **Tip:** put the percentage in the centre and the absolute numbers underneath, such as 7.2 of 10 GB.",
    },
    { type: "example", name: "radial-chart", index: 0 },

    { type: "h2", text: "Charts that show a process or a flow", id: "flow" },
    { type: "h3", text: "Funnel chart", id: "funnel-chart" },
    {
      type: "p",
      text: "A funnel chart shows a sequence of steps with the number that reached each one, narrowing as people drop out. It makes the worst step obvious, which is the whole point of measuring a funnel.",
    },
    {
      type: "p",
      text: "**Best for:** signup and checkout flows, sales pipelines, onboarding. **Avoid when:** the steps are not sequential, or people can skip steps; then the narrowing shape is misleading. **Tip:** label each step with both the count and the conversion from the previous step, because the drop between steps is what you act on.",
    },
    { type: "example", name: "funnel-chart", index: 0 },
    { type: "h3", text: "Sankey diagram", id: "sankey-chart" },
    {
      type: "p",
      text: "A sankey diagram draws flows as ribbons whose width is proportional to quantity, from sources on the left to destinations on the right, through any number of middle stages. It shows where things come from and where they go in one picture.",
    },
    {
      type: "p",
      text: "**Best for:** traffic sources to signups to plans, budget from income to spending categories, energy or material flows. **Avoid when:** there are many small flows; they turn into hairlines that nobody can read. Group the small ones into Other. **Tip:** let readers hover a node to highlight only its flows.",
    },
    { type: "example", name: "sankey-chart", index: 0 },

    { type: "h2", text: "Charts that show structure", id: "structure" },
    { type: "h3", text: "Org chart", id: "org-chart" },
    {
      type: "p",
      text: "An org chart is a tree: each box is a person or unit, and lines show who reports to whom. In a product it is often interactive, with collapsible teams and a selected person.",
    },
    {
      type: "p",
      text: "**Best for:** company structure, team directories, any hierarchy that is a few levels deep. **Avoid when:** the hierarchy is very wide or very deep; switch to a searchable list with breadcrumbs. **Tip:** collapse all but the first two levels by default.",
    },
    { type: "example", name: "org-chart", index: 0 },

    { type: "h2", text: "Five mistakes that make any chart worse", id: "mistakes" },
    {
      type: "list",
      ordered: true,
      items: [
        "**Choosing the chart before the question.** Write the question the chart answers as a sentence, such as Which plan grows fastest?, and pick the chart from the picker above.",
        "**Truncating the axis of a bar chart.** Bars encode value by length, so the axis must start at zero. Line charts can zoom in; bar charts cannot.",
        "**Too many series.** Past four lines or five slices, readers stop comparing and start decoding colours. Highlight one series and grey the rest, or split the chart.",
        "**Relying on colour alone.** About 1 in 12 men has some colour vision deficiency. Label series directly, and use position or pattern as well as colour.",
        "**3D effects and decoration.** Perspective distorts size. Flat charts with light gridlines are read faster and more accurately.",
      ],
    },

    { type: "h2", text: "Building these charts in React", id: "react" },
    {
      type: "p",
      text: "For dashboards with a few thousand points or fewer, SVG charts are the simplest choice: they scale cleanly, take CSS colours and can be made accessible. Canvas libraries are worth it for tens of thousands of points or real-time streams. We compare the options in [Best React chart libraries](/guides/best-react-chart-libraries), and show a full dashboard in [React charts with Tailwind](/guides/react-charts-tailwind).",
    },
    {
      type: "p",
      text: "Every chart on this page is a single React component with no charting dependency, so you can copy it into your project and edit it like your own code. Install any of them with the shadcn CLI, for example `npx shadcn@latest add @minidev/bar-chart`. Each one includes a hidden data table so screen readers get the numbers, not just a picture.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Not sure which one you need? Start with a bar chart for comparisons and a line chart for anything over time. Those two cover most of what a dashboard has to say.",
    },
  ],
  faq: [
    {
      q: "What are the main types of charts?",
      a: "The main types are bar charts and horizontal bar charts for comparing amounts, line and area charts for change over time, pie, donut and stacked bar charts for parts of a whole, funnel and sankey charts for processes and flows, and structural charts such as org charts and Gantt charts.",
    },
    {
      q: "Which chart is best for comparing data?",
      a: "A bar chart. People compare lengths on a shared baseline more accurately than angles or areas, so bars beat pies for comparison. Use horizontal bars when the category names are long or there are many of them.",
    },
    {
      q: "When should I use a line chart instead of a bar chart?",
      a: "Use a line chart when the x-axis is time and you care about the trend: direction, seasonality or a sudden change. Use a bar chart when you compare separate categories, or a few periods where each total matters on its own.",
    },
    {
      q: "Is a pie chart or a donut chart better?",
      a: "A donut is usually slightly better. Readers judge arc length about as well as angle, and the empty centre can hold the total or the key number. Both work only for 2 to 5 parts of clearly different sizes.",
    },
    {
      q: "What chart shows a process with drop-offs?",
      a: "A funnel chart. Each step shows how many people reached it, and the narrowing makes the weakest step obvious. Label each step with its conversion from the previous one.",
    },
    {
      q: "What is the difference between a funnel chart and a sankey diagram?",
      a: "A funnel shows one path with people dropping out at each step. A sankey shows many paths at once, with ribbons that split and merge, so it answers where things went, not just how many were left.",
    },
    {
      q: "How do I make charts accessible?",
      a: "Give every chart a text title, label series directly instead of relying on colour alone, keep enough contrast, and provide the underlying numbers as a table for screen readers. The MiniDev UI charts include a visually hidden table for this.",
    },
  ],
}

export default guide
