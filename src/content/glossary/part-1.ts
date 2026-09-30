import type { GlossaryTerm } from "../types"

export const GLOSSARY_1: GlossaryTerm[] = [
  /* ───────────────────────────── Accordion ───────────────────────────── */
  {
    slug: "accordion",
    term: "Accordion",
    short:
      "An accordion is a vertical stack of headings that each expand or collapse a section of content, so users reveal only the parts they need.",
    body: [
      {
        type: "p",
        text: "An accordion is a list of header buttons, each paired with a panel. Activating a header shows or hides its panel, and the rest of the page moves down or up to make room. Some accordions allow several panels open at once; others close the open panel when a new one opens. The pattern trades a little interaction cost for a much shorter page, which is why it shows up in FAQs, settings pages, filters and mobile layouts where vertical space is scarce.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Reference content people scan for one answer**, such as an FAQ or a list of shipping policies. Users read the headings and open the one that matches their question.",
          "**Optional detail under a summary**, like advanced settings or a breakdown under a total.",
          "**Narrow screens**, where a long page of sections would force a lot of scrolling.",
          "Avoid it for content most people need to read in full, or for steps in a sequence. Hiding required reading behind clicks slows everyone down; use headings and a [table of contents](/docs/toc) or a [stepper](/glossary/stepper) instead.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The WAI-ARIA Authoring Practices accordion pattern is small but specific. Each header is a real `button` wrapped in a heading element (`h3`, for example) at the right level for the page outline. The button carries `aria-expanded=\"true\"` or `\"false\"` and `aria-controls` pointing at its panel. The panel can take `role=\"region\"` with `aria-labelledby` referencing its button, which is useful when there are only a handful of panels. Enter and Space toggle a panel, and Tab moves through the headers and into any open panel's content. Down Arrow, Up Arrow, Home and End for moving between headers are optional in the pattern but welcome.",
      },
      {
        type: "p",
        text: "Two details are easy to miss. Collapsed content should be hidden from assistive technology, not just clipped visually, and browser find-in-page should still work. The HTML `hidden=\"until-found\"` attribute lets Ctrl+F open a collapsed panel; Base UI exposes it as the `hiddenUntilFound` prop. Also keep the expand animation short and respect [prefers-reduced-motion](/glossary/prefers-reduced-motion).",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Accordion](/docs/accordion) wraps the Base UI primitive, so the roles, states and keyboard handling above are already wired. You supply headings and content:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/accordion"

export function ShippingFaq() {
  return (
    <Accordion className="max-w-lg">
      <AccordionItem value="time">
        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
        <AccordionPanel>Orders ship in 1 to 2 business days.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Can I return an item?</AccordionTrigger>
        <AccordionPanel>Yes, within 30 days of delivery.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}`,
      },
      {
        type: "p",
        text: "Install it with `npx shadcn@latest add https://ui.minidev.pro/r/accordion.json`. For a ready FAQ section, [FaqList](/docs/faq-list) builds on the same primitive. More layout primitives live in the [layout category](/components/layout).",
      },
      { type: "component", name: "accordion" },
      { type: "component", name: "faq-list" },
    ],
    related: ["accordion", "faq-list", "collapsible", "faq-accordion-motion"],
    see: ["headless-components", "base-ui", "aria", "prefers-reduced-motion"],
  },

  /* ───────────────────────────── Bento grid ───────────────────────────── */
  {
    slug: "bento-grid",
    term: "Bento grid",
    short:
      "A bento grid is a layout of rectangular tiles in different sizes on one shared grid, used to show several features or stats at once, like a bento box.",
    body: [
      {
        type: "p",
        text: "A bento grid takes its name from the Japanese lunch box divided into compartments of different sizes. On the web it means a set of cards placed on a single CSS grid, where some tiles span two columns or two rows and others take a single cell. The varied sizes create a visual hierarchy without extra decoration: the largest tile reads first, the small ones read as supporting points. Product pages and keynote slides made the style common, and it now appears on most SaaS landing pages as a feature overview.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Four to eight parallel features** that each need a short line and a small visual. Fewer than four looks sparse; more than eight turns into a wall.",
          "**A dashboard overview** where one metric deserves more room than the rest.",
          "**One clear lead tile.** If every feature is equally important, a plain [feature grid](/docs/feature-grid) is easier to scan.",
        ],
      },
      { type: "h2", text: "How to build one with CSS grid", id: "css-grid" },
      {
        type: "p",
        text: "Tailwind CSS v4 has everything needed. Define the columns, fix a row height with `auto-rows`, and let individual tiles span:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `<section className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[220px]">
  <article className="rounded-xl border border-border bg-surface p-6 md:col-span-2 md:row-span-2">
    <h3 className="text-lg font-medium">Live dashboards</h3>
  </article>
  <article className="rounded-xl border border-border bg-surface p-6">
    <h3 className="font-medium">Alerts</h3>
  </article>
  <article className="rounded-xl border border-border bg-surface p-6">
    <h3 className="font-medium">Exports</h3>
  </article>
  <article className="rounded-xl border border-border bg-surface p-6 md:col-span-3">
    <h3 className="font-medium">API access</h3>
  </article>
</section>`,
      },
      {
        type: "p",
        text: "On small screens every tile collapses to one column, so write the source order in the order people should read it. The spans are layout only. Keep one gap value across the grid and the same corner radius on every tile; elements nested inside a tile use the outer radius minus the tile's padding.",
      },
      {
        type: "p",
        text: "Give each tile a heading so screen reader users can jump between features. If a whole tile should be clickable, put the link on the heading and stretch its hit area over the tile with a pseudo-element. Wrapping the entire tile in an anchor makes screen readers read all of its content as one long link name.",
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "**Using `grid-auto-flow: dense` to fill gaps.** It moves tiles visually but not in the DOM, so keyboard and screen reader order no longer match what people see.",
          "**Too much text in small tiles.** A bento tile holds a heading, one sentence and a visual. Longer copy belongs in a section below.",
          "**Fixed row heights with fluid text.** If a tile's content can grow, use `min-h` or `auto-rows-min` so text never overflows at large font sizes.",
          "**Motion on every tile.** A single looping visual in the lead tile is enough. Honor [prefers-reduced-motion](/glossary/prefers-reduced-motion) for the rest.",
        ],
      },
      {
        type: "p",
        text: "The premium [HeroBento](/docs/hero-bento) and [FeatureBentoMotion](/docs/feature-bento-motion) components ship tuned spans, responsive fallbacks and reduced-motion handling. See the [marketing category](/components/marketing) and the [Next.js landing page guide](/guides/nextjs-landing-page) for how a bento section fits with the [hero section](/glossary/hero-section) above it.",
      },
      { type: "component", name: "feature-bento-motion" },
      { type: "component", name: "hero-bento" },
    ],
    related: ["feature-grid", "hero-bento", "feature-bento-motion"],
    see: ["hero-section", "micro-interactions", "prefers-reduced-motion"],
  },

  /* ───────────────────────────── Breadcrumbs ───────────────────────────── */
  {
    slug: "breadcrumbs",
    term: "Breadcrumbs",
    short:
      "Breadcrumbs are a row of links showing where the current page sits in a site's hierarchy, letting users jump back to any parent level.",
    body: [
      {
        type: "p",
        text: "A breadcrumb trail lists the path from the root of a site to the current page, such as Home, Settings, Billing, Invoices. Each ancestor is a link and the last item is the current page. Breadcrumbs answer two questions at a glance: where am I, and how do I get to the level above. They are secondary navigation, so they sit above the page title and never replace the main menu. They describe location in a hierarchy, not the user's history, so they look the same no matter how someone arrived.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Deep hierarchies** of three or more levels: docs, admin consoles, file managers, e-commerce categories.",
          "**Landing on a deep page from search.** Breadcrumbs give visitors who skipped the home page a way to explore upward.",
          "Skip them on flat sites with one or two levels, where they only repeat the main navigation.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The WAI-ARIA breadcrumb pattern is plain HTML with two attributes. Wrap the trail in a `nav` element with `aria-label=\"Breadcrumb\"` so it appears as a named landmark. Put the links in an ordered list, since order is the point. Mark the last item with `aria-current=\"page\"`. Separators such as chevrons or slashes are decoration: draw them with CSS or give the icons `aria-hidden`, so screen readers do not announce \"slash\" between every item.",
      },
      {
        type: "code",
        lang: "html",
        code: `<nav aria-label="Breadcrumb">
  <ol class="flex items-center gap-1 text-sm">
    <li><a href="/settings">Settings</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="/settings/billing">Billing</a></li>
    <li aria-hidden="true">/</li>
    <li><span aria-current="page">Invoices</span></li>
  </ol>
</nav>`,
      },
      {
        type: "p",
        text: "For search engines, add `BreadcrumbList` structured data in JSON-LD with the same items. Google can then show the path in results instead of a raw URL.",
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "**Linking the current page.** A link to where you already are is a dead end. Render it as text with `aria-current`.",
          "**Showing every level on mobile.** Collapse the middle of long trails into an overflow menu and keep the first and last two items, as [BreadcrumbEllipsis](/docs/breadcrumb-ellipsis) does.",
          "**Tiny tap targets.** Breadcrumb links are often 12px text. Pad them so each target is at least 24 by 24 CSS pixels, the WCAG 2.2 minimum.",
          "**Using page titles that do not match the headings** users see after clicking. Labels should match the destination's title.",
        ],
      },
      {
        type: "p",
        text: "MiniDev's [Breadcrumb](/docs/breadcrumb) renders the named `nav` landmark and `aria-current` for you from an `items` array. Find related patterns in the [navigation category](/components/navigation), including [pagination](/glossary/pagination) for moving across items at the same level.",
      },
      { type: "component", name: "breadcrumb" },
      { type: "component", name: "breadcrumb-ellipsis" },
    ],
    related: ["breadcrumb", "breadcrumb-ellipsis", "back-link", "page-header"],
    see: ["pagination", "aria", "focus-visible"],
  },

  /* ───────────────────────────── Combobox ───────────────────────────── */
  {
    slug: "combobox",
    term: "Combobox",
    short:
      "A combobox is an input paired with a popup list of options, where typing filters the list and the user picks a value with the mouse or keyboard.",
    body: [
      {
        type: "p",
        text: "A combobox combines a text field with a listbox. The user types to narrow a list of options, then chooses one. It sits between a plain `select`, which only allows picking from a fixed list, and a free text input, which allows anything. Country pickers, assignee fields, timezone selectors and tag inputs are all comboboxes. A variant that also accepts values not in the list is often called an autocomplete.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**More than about ten options**, where scrolling a `select` becomes slow and typing is faster.",
          "**Options users know by name**, such as people, countries or repositories.",
          "**Remote data** that has to be searched on the server as the user types.",
          "For five or fewer options, a [radio group](/docs/radio-group) or [segmented control](/docs/segmented-control) shows every choice without a click.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The WAI-ARIA combobox pattern keeps DOM focus in the input the whole time. The input has `role=\"combobox\"`, `aria-expanded` for whether the popup is open, `aria-controls` pointing at the listbox, and `aria-autocomplete=\"list\"` when typing filters the options. The popup has `role=\"listbox\"` and each item `role=\"option\"` with `aria-selected`. As the user moves through options, the input's `aria-activedescendant` is set to the highlighted option's id, which is how screen readers know what is active without focus leaving the field.",
      },
      {
        type: "list",
        items: [
          "Down Arrow opens the list and moves to the next option; Up Arrow moves back.",
          "Enter accepts the highlighted option and closes the list.",
          "Escape closes the list. Many implementations clear the input on a second Escape.",
          "Typing updates the filter; Home and End move the text cursor, not the highlight.",
        ],
      },
      {
        type: "p",
        text: "Announce the number of results in a polite live region, and show a visible empty state when nothing matches instead of an empty popup.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "Hand-building the pattern above is where most custom comboboxes fail, so start from a component that already handles it. MiniDev's [Combobox](/docs/combobox) takes items and a controlled value:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { Combobox } from "@/components/ui/combobox"

const TIMEZONES = [
  { value: "America/New_York", label: "New York (UTC-5)" },
  { value: "Europe/Berlin", label: "Berlin (UTC+1)" },
  { value: "Asia/Kolkata", label: "Kolkata (UTC+5:30)" },
]

export function TimezoneField() {
  const [tz, setTz] = React.useState<string>()
  return <Combobox items={TIMEZONES} value={tz} onChange={setTz} placeholder="Pick a timezone" />
}`,
      },
      {
        type: "p",
        text: "For several values use [MultiSelect](/docs/multi-select) or [TagsInput](/docs/tags-input). When the combobox searches a server, debounce requests by 150 to 300ms and ignore responses that arrive out of order. The same list-in-a-popup mechanics power the [command palette](/glossary/command-palette). Browse more inputs in the [forms category](/components/forms).",
      },
      { type: "component", name: "combobox" },
      { type: "component", name: "multi-select" },
    ],
    related: ["combobox", "autocomplete", "multi-select", "select", "tags-input"],
    see: ["command-palette", "aria", "headless-components", "base-ui"],
  },

  /* ───────────────────────────── Command palette ───────────────────────────── */
  {
    slug: "command-palette",
    term: "Command palette",
    short:
      "A command palette is a searchable modal, usually opened with Cmd+K or Ctrl+K, that lets users run actions and jump to pages by typing.",
    body: [
      {
        type: "p",
        text: "A command palette is a keyboard-first launcher inside an app. The user presses a shortcut, a dialog opens with a search field, and typing filters a list of commands: navigate to a page, create a record, toggle a setting, switch workspace. Editors such as VS Code and Sublime Text popularized it, and most developer tools and SaaS dashboards now include one. It gives power users one place to reach any feature without learning where every button lives.",
      },
      { type: "h2", text: "Anatomy", id: "anatomy" },
      {
        type: "list",
        items: [
          "**A modal container** positioned near the top of the viewport, so results can grow downward.",
          "**A search input** focused on open, with placeholder text that hints at what can be searched.",
          "**Grouped results**: recent items first, then navigation, actions and settings, each with an optional icon and keyboard shortcut hint.",
          "**An empty state** when nothing matches, ideally with a suggestion.",
          "**A footer** listing the keys that work: arrows to move, Enter to run, Escape to close.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "A command palette is a [modal dialog](/glossary/modal-dialog) that contains a [combobox](/glossary/combobox). The dialog needs an accessible name, even if the title is visually hidden, and must trap focus while open. On open, focus goes to the input. Arrow keys move the highlighted command by updating `aria-activedescendant` on the input, Enter runs it, and Escape closes the palette and returns focus to whatever was focused before. The results list uses `role=\"listbox\"` with `role=\"option\"` items, and group headings should be labeled so screen reader users hear the section as they move.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "Listen for the shortcut once at the app shell and control the palette's open state from there. Call `preventDefault` so browsers that bind Ctrl+K to the address bar do not steal it while your app has focus.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { CommandPalette } from "@/components/ui/command-palette"

export function AppCommands() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
  return (
    <CommandPalette
      open={open}
      onOpenChange={setOpen}
      commands={[
        { id: "new", label: "New project", onSelect: () => router.push("/projects/new") },
        { id: "billing", label: "Open billing", onSelect: () => router.push("/settings/billing") },
      ]}
    />
  )
}`,
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "**Making it the only way in.** Every command should also exist somewhere in the visible UI. The palette is a shortcut, not a hiding place.",
          "**Exact substring matching only.** Match on synonyms and keywords too, so \"invoice\" finds Billing.",
          "**No way to discover it.** Show the shortcut in the search field of the top bar, and list it in a [shortcut cheat sheet](/docs/shortcut-cheat-sheet).",
        ],
      },
      {
        type: "p",
        text: "MiniDev ships [CommandPalette](/docs/command-palette) and [CommandDialog](/docs/command-dialog) in the [navigation category](/components/navigation).",
      },
      { type: "component", name: "command-palette" },
      { type: "component", name: "command-dialog" },
    ],
    related: ["command-palette", "command-dialog", "command-item", "kbd", "shortcut-cheat-sheet"],
    see: ["combobox", "modal-dialog", "focus-visible"],
  },

  /* ───────────────────────────── Data table ───────────────────────────── */
  {
    slug: "data-table",
    term: "Data table",
    short:
      "A data table is an interactive grid of records with columns you can sort, filter, paginate and select, built for scanning and acting on structured data.",
    body: [
      {
        type: "p",
        text: "A data table starts as an HTML table and adds the controls people need to work with many rows: sortable column headers, filters and search, pagination or virtualization, row selection with bulk actions, and per-row actions. Admin panels, billing pages, CRMs and logs are built around them. The goal is fast comparison down a column and fast action on a row, so typography, alignment and density matter as much as features.",
      },
      { type: "h2", text: "Anatomy", id: "anatomy" },
      {
        type: "list",
        items: [
          "**Toolbar**: search, filters, column visibility and saved views above the table.",
          "**Header row**: column labels, sort controls and a select-all checkbox.",
          "**Body rows**: cells aligned by data type, with numbers right-aligned in `tabular-nums` so digits line up.",
          "**Row actions** revealed on hover and on keyboard focus, never on hover alone.",
          "**Footer**: row count, page size and [pagination](/glossary/pagination).",
          "**States**: loading ([skeleton rows](/glossary/skeleton-screen)), [empty](/glossary/empty-state), error and filtered-to-nothing.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Keep the native table semantics: `table`, `thead`, `th scope=\"col\"`, and a `caption` or `aria-label` that names the table. Make each sortable header contain a `button`, and put `aria-sort=\"ascending\"` or `\"descending\"` on the `th` of the one column currently sorted. Checkboxes need labels such as \"Select row Acme Inc\". Do not add `role=\"grid\"` unless you also implement the full grid keyboard model, where arrow keys move between cells. A table with ordinary buttons and links inside it, reached with Tab, is easier to get right and works well with screen reader table navigation.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [DataTable](/docs/data-table) takes typed column definitions and handles sorting with `aria-sort`, selection with an indeterminate header, sticky headers, density and loading:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { DataTable, type Column } from "@/components/ui/data-table"

type Invoice = { id: string; customer: string; amount: number; due: Date }
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

const columns: Column<Invoice>[] = [
  { id: "customer", header: "Customer", cell: (r) => r.customer, sortValue: (r) => r.customer },
  { id: "amount", header: "Amount", align: "right", cell: (r) => usd.format(r.amount), sortValue: (r) => r.amount },
  { id: "due", header: "Due", cell: (r) => r.due.toLocaleDateString(), sortValue: (r) => r.due },
]

export function Invoices({ rows }: { rows: Invoice[] }) {
  return <DataTable columns={columns} data={rows} getRowId={(r) => r.id} selectable caption="Invoices" />
}`,
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "**Sorting only the current page** when data is paginated on the server. Send sort and filter to the query.",
          "**Losing selection** when the user changes page or filter without telling them.",
          "**Wide tables that scroll the whole page sideways.** Scroll the table container and pin the identifying column with [StickyColumn](/docs/sticky-column).",
          "**Hover-only row actions.** Reveal them on `:focus-within` too, or keyboard users never find them.",
          "**Mixed alignment.** Left-align text, right-align numbers and their headers, and put units in the header instead of every cell.",
        ],
      },
      {
        type: "p",
        text: "Decide early where the data lives. Up to a few thousand rows, sorting and filtering in the browser is simple and fast. Beyond that, move sort, filter and pagination to the server and keep them in the URL so views can be shared and restored.",
      },
      {
        type: "p",
        text: "See the full set in the [data tables category](/components/data-tables) and the [SaaS dashboard guide](/guides/nextjs-saas-dashboard).",
      },
      { type: "component", name: "data-table" },
      { type: "component", name: "table-toolbar" },
    ],
    related: ["data-table", "table", "table-pagination", "table-toolbar", "sticky-column"],
    see: ["pagination", "infinite-scroll", "empty-state", "skeleton-screen"],
  },

  /* ───────────────────────────── Empty state ───────────────────────────── */
  {
    slug: "empty-state",
    term: "Empty state",
    short:
      "An empty state is what a screen shows when there is no data to display yet, explaining why it is empty and offering the next useful action.",
    body: [
      {
        type: "p",
        text: "An empty state replaces a blank area when a list, table, inbox or dashboard has nothing to show. A good one tells users why the area is empty and what to do next, usually with a single button. Empty states are often the first thing a new user sees in a product, so they carry more weight than their size suggests: they are onboarding, error handling and navigation in one small block.",
      },
      { type: "h2", text: "Types of empty state", id: "types" },
      {
        type: "list",
        items: [
          "**First use.** Nothing has been created yet. Explain the value of the feature and offer the create action, or a sample to start from.",
          "**No results.** A search or filter matched nothing. Echo the query, suggest a broader search and offer a button to clear filters.",
          "**Cleared.** The user finished everything, like inbox zero. Confirm it and step aside.",
          "**Blocked.** The user lacks permission or the data failed to load. These are not really empty; use a distinct [error](/docs/error-state) or [permission](/docs/permission-denied) state with its own message.",
        ],
      },
      { type: "h2", text: "Anatomy", id: "anatomy" },
      {
        type: "p",
        text: "Keep it to four parts: a small icon or illustration, a short headline, one sentence of explanation, and a primary action. A secondary link to docs is optional. The headline states the situation in plain words (\"No invoices yet\"), and the sentence says what will appear here and how to get it there. Match the empty state to the size of its container; a full-page illustration inside a 200px card looks broken.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { EmptyState } from "@/components/ui/empty-state"

export function NoProjects({ onCreate }: { onCreate: () => void }) {
  return (
    <EmptyState
      title="No projects yet"
      description="Projects group your deployments, domains and environment variables."
      actionLabel="Create project"
      onAction={onCreate}
    />
  )
}`,
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "list",
        items: [
          "Render the headline as a real heading at the correct level so screen reader users can find it.",
          "Mark decorative illustrations with `alt=\"\"` or `aria-hidden`.",
          "When results update in place, for example while filtering, announce \"No results\" through a `role=\"status\"` live region so the change is not silent.",
          "Move focus deliberately after actions that empty a list, such as deleting the last item, so keyboard users are not left on a removed element.",
        ],
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "A bare \"No data\" with no explanation or action.",
          "The same message for \"nothing created\" and \"nothing matched your filter\".",
          "Showing an empty state while data is still loading. Show a [skeleton screen](/glossary/skeleton-screen) until the request settles.",
        ],
      },
      {
        type: "p",
        text: "MiniDev includes [EmptyState](/docs/empty-state), [EmptySearch](/docs/empty-search) and [EmptyTable](/docs/empty-table) in the [feedback category](/components/feedback).",
      },
      { type: "component", name: "empty-state" },
      { type: "component", name: "empty-search" },
    ],
    related: ["empty-state", "empty-search", "empty-table", "error-state", "not-found-state"],
    see: ["skeleton-screen", "data-table", "toast-notification"],
  },

  /* ───────────────────────────── Glassmorphism ───────────────────────────── */
  {
    slug: "glassmorphism",
    term: "Glassmorphism",
    short:
      "Glassmorphism is a UI style that draws panels as frosted glass: a translucent fill, a background blur from backdrop-filter, and a thin light edge.",
    body: [
      {
        type: "p",
        text: "Glassmorphism makes a surface look like a pane of frosted glass laid over the page. Whatever sits behind the panel shows through, blurred and slightly brightened, while the panel's own content stays sharp. Apple's macOS and iOS materials made the look familiar, and on the web it is built with one CSS property, `backdrop-filter`, plus a semi-transparent background. It works well for overlays, navigation bars and floating panels that need to feel connected to the content underneath.",
      },
      { type: "h2", text: "What makes it work", id: "ingredients" },
      {
        type: "list",
        items: [
          "**Something colorful behind it.** Blur has nothing to show over a flat gray page. Gradients, photos or brand shapes behind the pane are what read as glass.",
          "**A translucent fill**, typically white or black at 40 to 70 percent opacity.",
          "**A backdrop filter**: `blur()` frosts the background and `saturate()` above 1 restores the color that blurring washes out.",
          "**An edge**: a 1px light border and an inset top highlight, the way light catches the rim of real glass.",
        ],
      },
      {
        type: "code",
        lang: "tsx",
        code: `<div className="rounded-2xl border border-white/60 bg-white/55 p-6 shadow-lg backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-black/40">
  <h2 className="font-medium">Frosted panel</h2>
</div>`,
      },
      { type: "h2", text: "Readability and accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Because the background changes, text contrast is not a single number. Check it against the worst case: the lightest and the busiest thing that can scroll behind the panel. If text over glass cannot hold 4.5:1 for body copy under [WCAG contrast](/glossary/wcag-contrast) rules, raise the fill opacity or the blur until it can. Keep glass for chrome and short labels, not long reading. Some platforms let users ask for less transparency; where the `prefers-reduced-transparency` media query is supported, switch to an opaque fill.",
      },
      { type: "h2", text: "Performance and fallbacks", id: "performance" },
      {
        type: "list",
        items: [
          "[backdrop-filter](/glossary/backdrop-filter) re-samples and blurs the area behind the element on every frame it changes. Large glass areas over scrolling content, or several stacked glass layers, can drop frames on low-end devices.",
          "Use `@supports (backdrop-filter: blur(1px))` and give browsers without support a more opaque fill so text stays readable.",
          "Avoid animating the blur radius. Animate opacity or transform of the panel instead.",
        ],
      },
      {
        type: "p",
        text: "In MiniDev UI, glass is a material rather than a one-off class. Set `data-material=\"glass\"` on `html` or any container and surfaces such as [Dialog](/docs/dialog) and [Popover](/docs/popover) switch to translucent fills and 22px frost, lit by the [LightProvider](/docs/light-provider). The [glassmorphism in Tailwind CSS guide](/guides/glassmorphism-tailwind-css) covers the full CSS, contrast checks and fallbacks.",
      },
      { type: "component", name: "light-provider" },
      { type: "component", name: "dialog" },
    ],
    related: ["light-provider", "dialog", "popover", "card"],
    see: ["backdrop-filter", "neumorphism", "wcag-contrast", "design-tokens"],
  },

  /* ───────────────────────────── Hero section ───────────────────────────── */
  {
    slug: "hero-section",
    term: "Hero section",
    short:
      "A hero section is the first full-width block of a landing page, stating what the product does and offering one primary action above the fold.",
    body: [
      {
        type: "p",
        text: "The hero section is the top of a marketing page, the part visitors see before scrolling. In a few seconds it has to tell them what the product is, who it is for, and what to do next. Most heroes combine a headline, a supporting sentence, one or two calls to action, and a visual such as a product screenshot. Everything else on the page, from the [bento grid](/glossary/bento-grid) of features to pricing, builds on the claim the hero makes.",
      },
      { type: "h2", text: "Anatomy", id: "anatomy" },
      {
        type: "list",
        items: [
          "**Eyebrow** (optional): a short label or announcement link above the headline.",
          "**Headline**: the page's single `h1`. Say what the product does in concrete words, not a slogan.",
          "**Subhead**: one or two sentences on who it is for and the main outcome.",
          "**Calls to action**: one primary action, and at most one quieter secondary action such as a demo link.",
          "**Visual**: the product itself, a short loop, or an illustration that supports the headline.",
          "**Proof** (optional): logos, a rating or a line like \"No card required\".",
        ],
      },
      {
        type: "p",
        text: "Write the headline after the rest of the page is clear. A useful test: if a visitor read only the headline and the primary button label, would they know what happens when they click? \"Start free\" beats \"Get started\" because it also answers the question of cost.",
      },
      { type: "h2", text: "Performance", id: "performance" },
      {
        type: "p",
        text: "The hero usually contains the Largest Contentful Paint element, so it decides the page's LCP score. Serve the hero image at the right size with `sizes`, preload it, and do not lazy-load it. Keep the headline as real text rather than text baked into an image. Avoid entrance animations that start the headline at `opacity: 0` and wait for JavaScript to reveal it; until [hydration](/glossary/hydration) finishes, the most important words on the page are invisible. If you animate, render the final state on the server and animate only transform.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "code",
        lang: "tsx",
        code: `import { Hero } from "@/components/ui/hero"

export default function Home() {
  return (
    <main>
      <Hero
        eyebrow="Now with Slack alerts"
        title="Know why revenue changed, before Monday"
        description="Acme watches Stripe and your CRM and explains every movement in plain language."
        primaryAction={{ label: "Start free" }}
        secondaryAction={{ label: "Watch the demo" }}
      />
    </main>
  )
}`,
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "list",
        items: [
          "Use exactly one `h1`, and keep the headline, subhead and buttons in DOM order.",
          "Buttons that navigate should be links. Buttons that act in place should be buttons.",
          "Check text contrast over background images and gradients at every breakpoint.",
          "Stop autoplaying video and looping animation for users who set [prefers-reduced-motion](/glossary/prefers-reduced-motion), and give any video a pause control.",
        ],
      },
      {
        type: "p",
        text: "MiniDev's free [Hero](/docs/hero) covers the centered layout. The premium [HeroSplitShowcase](/docs/hero-split-showcase), [HeroAurora](/docs/hero-aurora) and other variants live in the [marketing category](/components/marketing). For a full page, follow the [Next.js landing page guide](/guides/nextjs-landing-page).",
      },
      { type: "component", name: "hero" },
      { type: "component", name: "hero-split-showcase" },
    ],
    related: ["hero", "hero-split-showcase", "hero-aurora", "hero-bento", "cta-banner"],
    see: ["bento-grid", "micro-interactions", "prefers-reduced-motion", "hydration"],
  },

  /* ───────────────────────────── Infinite scroll ───────────────────────────── */
  {
    slug: "infinite-scroll",
    term: "Infinite scroll",
    short:
      "Infinite scroll loads the next batch of content automatically as the user nears the end of a list, instead of asking them to click to another page.",
    body: [
      {
        type: "p",
        text: "Infinite scroll replaces page links with continuous loading. When the user scrolls close to the bottom of a list, the app fetches the next batch and appends it, so the list appears to have no end. Social feeds, image galleries and activity streams use it because it keeps people browsing without a decision point. It is a poor fit when people are looking for something specific, need to return to a position, or want to reach the footer.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Use it** for browsing feeds with roughly equal items and no natural end, such as activity logs, inspiration galleries and chat history.",
          "**Prefer [pagination](/glossary/pagination)** for search results, tables, anything people compare or share a position in, and pages with important footer links.",
          "**Consider a Load more button** as a middle ground. It keeps the continuous list but lets the user decide, and the footer stays reachable.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "Place an invisible sentinel element after the last item and watch it with `IntersectionObserver`. A generous `rootMargin` starts the fetch before the user actually hits the bottom:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"

export function useLoadMore(onLoadMore: () => void, enabled: boolean) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore()
      },
      { rootMargin: "600px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [onLoadMore, enabled])
  return ref
}

// <ul>{items.map(...)}</ul>
// <div ref={sentinel} aria-hidden />
// {hasMore ? <button onClick={loadMore}>Load more</button> : null}`,
      },
      {
        type: "p",
        text: "Pass `enabled={hasMore && !isLoading}` so the observer does not fire twice for the same page, and use cursor-based requests so new items at the top do not shift what the next page returns. Show a skeleton row or small spinner at the end while loading, and a clear end-of-list message once `hasMore` is false, so users know they have seen everything.",
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "list",
        items: [
          "Keyboard users tab through every item before reaching anything below the list, and new items keep arriving. Keep a visible Load more button as an alternative and avoid footers below infinite lists.",
          "The WAI-ARIA feed pattern (`role=\"feed\"` with `article` children, `aria-setsize`, `aria-posinset` and `aria-busy` while loading) lets screen reader users move between articles with Page Down and Page Up.",
          "Announce loading and the end of the list in a polite live region.",
          "Restore scroll position when the user navigates back, or they lose their place.",
        ],
      },
      { type: "h2", text: "Performance", id: "performance" },
      {
        type: "p",
        text: "Thousands of appended DOM nodes slow down scrolling and memory. Past a few hundred rows, render only what is on screen with a [virtualized list](/docs/virtualized-list), and show [skeleton rows](/glossary/skeleton-screen) while the next page loads. Some feeds also drop items far above the viewport and fetch them again on the way back up, which keeps memory flat in long sessions. More list and table building blocks are in the [data tables category](/components/data-tables).",
      },
      { type: "component", name: "virtualized-list" },
      { type: "component", name: "skeleton" },
    ],
    related: ["virtualized-list", "skeleton", "spinner", "pagination"],
    see: ["pagination", "skeleton-screen", "data-table"],
  },

  /* ───────────────────────────── Kanban board ───────────────────────────── */
  {
    slug: "kanban-board",
    term: "Kanban board",
    short:
      "A kanban board shows work items as cards in columns that represent stages, so moving a card to another column changes its status.",
    body: [
      {
        type: "p",
        text: "A kanban board lays out a workflow as columns, such as Backlog, In progress, In review and Done, with each task as a card in the column matching its status. Moving a card between columns updates its status, and the board as a whole shows where work is piling up. The idea comes from Toyota's production system, where physical cards signaled when to start new work. Software teams use it for issue tracking, sales teams for deal pipelines, and support teams for ticket queues.",
      },
      { type: "h2", text: "Anatomy", id: "anatomy" },
      {
        type: "list",
        items: [
          "**Columns** for each status, each with a title and a card count. A work-in-progress limit can be shown beside the count.",
          "**Cards** with a title and a few pieces of metadata: assignee, priority, due date, issue key.",
          "**Add card** control at the top or bottom of a column.",
          "**Swimlanes** (optional): horizontal rows that group cards by team, assignee or epic.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Drag and drop is the core interaction, and it is also where kanban boards usually fail accessibility. WCAG 2.2 success criterion 2.5.7, Dragging Movements, requires a way to do the same thing with single clicks or taps. The simplest alternative is a Move to menu or a status select on each card. Keyboard drag support is a bonus on top of that, not a replacement.",
      },
      {
        type: "list",
        items: [
          "Mark up each column as a labeled list (a heading plus `ul`) so screen reader users hear column names and counts.",
          "Announce moves in a polite live region: \"Fix login bug moved to In review, position 2 of 5\".",
          "Keep focus on the moved card after a move so keyboard users can continue.",
          "Do not use color alone for priority or status; add a label or icon.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "Model the board as data first. MiniDev's [KanbanBoard](/docs/kanban-board) renders columns and cards from a plain array, which you can pair with any drag library:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { KanbanBoard, type KanbanColumn } from "@/components/ui/kanban-board"

const columns: KanbanColumn[] = [
  { id: "todo", title: "To do", cards: [{ id: "1", title: "Write release notes", meta: "Due Fri" }] },
  { id: "doing", title: "In progress", cards: [{ id: "2", title: "Fix login redirect", meta: "Priya" }] },
  { id: "done", title: "Done", cards: [] },
]

export function Board() {
  return <KanbanBoard columns={columns} />
}`,
      },
      {
        type: "p",
        text: "Store each card's position with a sortable key, such as a fractional index, so a move only updates one row. Apply the move on screen immediately and reconcile with the server afterward; that is [optimistic UI](/glossary/optimistic-ui), and it is what makes drag and drop feel direct. For a full page with approvals, priorities and due dates, see [WorkflowBoard](/docs/workflow-board) in the [workflow category](/components/workflow).",
      },
      { type: "component", name: "kanban-board" },
      { type: "component", name: "workflow-board" },
    ],
    related: ["kanban-board", "kanban-column", "workflow-board", "issue-card"],
    see: ["optimistic-ui", "micro-interactions", "aria"],
  },

  /* ───────────────────────────── Modal dialog ───────────────────────────── */
  {
    slug: "modal-dialog",
    term: "Modal dialog",
    short:
      "A modal dialog is a window layered over the page that blocks interaction with everything behind it until the user completes or dismisses it.",
    body: [
      {
        type: "p",
        text: "A modal dialog interrupts the current task to ask for a decision or a short, focused input: confirm a deletion, rename a file, invite a teammate. While it is open, the page behind is dimmed and inert, so the user cannot click, tab or scroll into it. That strength is also the cost. A modal takes over the screen, so use it only when the task truly needs the user's full attention before anything else happens.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Confirming a destructive or irreversible action.** Use the alert dialog variant, which requires an explicit choice.",
          "**Short forms** of one to four fields that belong to the current page, such as renaming or creating an item.",
          "**Not for** long forms, content people want to compare with the page behind, or messages that could be inline. A side [sheet](/docs/sheet) or a separate page is usually better.",
          "**Never on page load** for marketing or cookie messages that block content.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The WAI-ARIA dialog (modal) pattern sets out the behavior. The container has `role=\"dialog\"` and `aria-modal=\"true\"`, is named by its title through `aria-labelledby`, and can point to a description with `aria-describedby`. Use `role=\"alertdialog\"` for confirmations that interrupt with an urgent message.",
      },
      {
        type: "list",
        items: [
          "On open, move focus inside the dialog: to the first field, or to the least destructive button in a confirmation.",
          "Tab and Shift+Tab cycle within the dialog; focus never escapes to the page behind.",
          "Escape closes the dialog.",
          "On close, return focus to the element that opened it.",
          "Content behind the dialog is inert and hidden from assistive technology.",
        ],
      },
      {
        type: "p",
        text: "The native `dialog` element opened with `showModal()` provides inertness and Escape handling for free. Headless libraries like [Base UI](/glossary/base-ui) handle the rest, including focus return and scroll locking.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "code",
        lang: "tsx",
        code: `import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function RenameProject() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Rename</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>The URL will not change.</DialogDescription>
        </DialogHeader>
        <input aria-label="Project name" defaultValue="Acme web" className="h-9 rounded-lg border border-border px-3" />
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
      },
      {
        type: "p",
        text: "Base UI's `render` prop lets the trigger and close controls render as your own Button component while keeping the dialog's behavior and ARIA attributes.",
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "Opening a modal from a modal. Replace the content or use a stepper inside one dialog.",
          "Closing on backdrop click while a form has unsaved input.",
          "Layout shift when scroll locking removes the scrollbar. Reserve it with `scrollbar-gutter: stable`.",
          "Dialogs taller than the viewport with no internal scroll. Let the body scroll and keep the title and actions visible.",
          "Vague button labels like OK. Name the primary button after the action, such as Delete project.",
        ],
      },
      {
        type: "p",
        text: "MiniDev's [Dialog](/docs/dialog) and [AlertDialog](/docs/alert-dialog) are in the [overlays category](/components/overlays).",
      },
      { type: "component", name: "dialog" },
      { type: "component", name: "alert-dialog" },
    ],
    related: ["dialog", "alert-dialog", "sheet", "drawer", "confirm-destructive"],
    see: ["command-palette", "focus-visible", "aria", "base-ui"],
  },

  /* ───────────────────────────── Neumorphism ───────────────────────────── */
  {
    slug: "neumorphism",
    term: "Neumorphism",
    short:
      "Neumorphism is a soft UI style where elements look extruded from or pressed into the background, using paired light and dark shadows on one color.",
    body: [
      {
        type: "p",
        text: "Neumorphism, short for new skeuomorphism, draws controls as if they were molded from the same material as the background. A card or button has the same fill as the page and is defined only by two shadows: a light one toward the light source and a dark one away from it. Pressed states swap to inset shadows so the element looks pushed in. The style spread through design showcases around 2020 and is still used for smart home panels, music apps and dashboards that want a soft, tactile look.",
      },
      { type: "h2", text: "How it is built", id: "how-it-works" },
      {
        type: "p",
        text: "The entire effect is a background color and a pair of box shadows, with the offsets pointing in opposite directions:",
      },
      {
        type: "code",
        lang: "css",
        code: `.neu {
  background: oklch(0.93 0.01 260);
  border-radius: 16px;
  box-shadow:
    -6px -6px 14px oklch(1 0 0 / 0.9),
    6px 6px 14px oklch(0.7 0.02 260 / 0.5);
}
.neu:active {
  box-shadow:
    inset -4px -4px 10px oklch(1 0 0 / 0.9),
    inset 4px 4px 10px oklch(0.7 0.02 260 / 0.5);
}`,
      },
      {
        type: "p",
        text: "Both shadows must agree on one light direction, or the surface looks warped. The page background must be a mid-light tint, not pure white, because the highlight needs room to be lighter than the surface.",
      },
      { type: "h2", text: "Accessibility problems", id: "accessibility" },
      {
        type: "list",
        items: [
          "**Low non-text contrast.** WCAG 1.4.11 asks for 3:1 contrast for the visual boundaries that identify a control. Soft shadows on a same-color background rarely reach it, so buttons and inputs are hard to find.",
          "**Ambiguous states.** The difference between raised and pressed, or on and off, is a subtle shadow change that many users cannot see. Pair states with a color, icon or label change.",
          "**Weak focus indication.** Add a clear [focus-visible](/glossary/focus-visible) ring; a shadow shift is not enough.",
          "**Dark mode.** On dark backgrounds the highlight shadow looks muddy. Most neumorphic designs need separate tuning for [dark mode](/glossary/dark-mode).",
        ],
      },
      { type: "h2", text: "Using it responsibly", id: "using-it" },
      {
        type: "p",
        text: "Keep the soft extrusion for large, decorative surfaces like cards and panels, and give interactive controls a visible border or a stronger fill. Keep text contrast at normal levels regardless of style. Treat the shadows as [design tokens](/glossary/design-tokens) so every component uses the same light direction.",
      },
      {
        type: "p",
        text: "MiniDev UI takes the useful part of the idea, a single consistent light source, without giving up contrast. The [LightProvider](/docs/light-provider) sets one light position for the page, and tokens such as `shadow-raised` and `shadow-key` fall away from it, while every control keeps a hairline border. The paper and metal materials go further toward tactile surfaces. The [CSS shadows from one light source guide](/guides/css-shadows-light-source) explains the technique, and [glassmorphism](/glossary/glassmorphism) is the translucent counterpart.",
      },
      { type: "component", name: "light-provider" },
      { type: "component", name: "card" },
    ],
    related: ["light-provider", "card", "button", "segmented-control"],
    see: ["glassmorphism", "wcag-contrast", "design-tokens", "dark-mode"],
  },

  /* ───────────────────────────── Optimistic UI ───────────────────────────── */
  {
    slug: "optimistic-ui",
    term: "Optimistic UI",
    short:
      "Optimistic UI updates the interface immediately as if an action succeeded, then syncs with the server and rolls back if the request fails.",
    body: [
      {
        type: "p",
        text: "In an optimistic update, the interface assumes the server will say yes. When a user likes a post, the heart fills and the count goes up at once, and the request runs in the background. If it fails, the UI reverts and explains what happened. Because most requests succeed, users see instant feedback almost every time instead of a spinner. The trade is extra work to handle the rare failure honestly.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Good fits:** likes, votes, reactions, toggles, reordering, renaming, marking as read, moving a card on a [kanban board](/glossary/kanban-board). High success rate, easy to undo, low stakes.",
          "**Poor fits:** payments, sending email, deleting accounts, or anything where the server computes the result the user needs to see, such as a price or a generated ID they will act on.",
          "**Rule of thumb:** if a failure would surprise and harm the user after they had moved on, wait for the server.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "React 19's `useOptimistic` hook holds a temporary value while an async transition runs. When the transition ends, it falls back to the value passed in, which should by then reflect the server's answer:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import { startTransition, useOptimistic } from "react"
import { toast } from "@/components/ui/toast"

export function LikeButton({ liked, count, save }: {
  liked: boolean
  count: number
  save: (liked: boolean) => Promise<void>
}) {
  const [state, setState] = useOptimistic({ liked, count })
  function onClick() {
    const next = !state.liked
    startTransition(async () => {
      setState({ liked: next, count: state.count + (next ? 1 : -1) })
      try {
        await save(next)
      } catch {
        toast.error("Could not save your like. Try again.")
      }
    })
  }
  return (
    <button type="button" aria-pressed={state.liked} onClick={onClick}>
      Like <span className="tabular-nums">{state.count}</span>
    </button>
  )
}`,
      },
      {
        type: "p",
        text: "Note that `save` must cause the parent's `liked` and `count` props to update, for example a Server Action that calls `revalidatePath`. Otherwise the optimistic value reverts even on success. Libraries such as TanStack Query offer the same pattern with `onMutate` to apply the change and `onError` to roll it back. Keep the optimistic value shaped like the real data, so the component renders the same markup either way. If pending items should look different, such as a comment at reduced opacity until it is saved, make that a deliberate style rather than a side effect.",
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "**Silent rollback.** If the value snaps back without explanation, users think they misclicked. Show a [toast](/glossary/toast-notification) with a retry.",
          "**Races.** Fast repeated clicks can resolve out of order. Let the latest request win, or queue writes per item.",
          "**Duplicates on retry.** Send an idempotency key with create requests so a retried request does not create two records.",
          "**Moving focus.** Rolling back should not move keyboard focus or scroll position.",
          "**Stale derived data.** A count shown in two places, like a sidebar badge and a list header, must update in both or the UI contradicts itself.",
        ],
      },
      {
        type: "p",
        text: "MiniDev controls such as [VoteControl](/docs/vote-control), [ReactionBar](/docs/reaction-bar) and [WishlistButton](/docs/wishlist-button) render the instant state change; your data layer decides when to commit or revert. They pair naturally with small [micro-interactions](/glossary/micro-interactions) that confirm the action.",
      },
      { type: "component", name: "vote-control" },
      { type: "component", name: "reaction-bar" },
    ],
    related: ["vote-control", "reaction-bar", "wishlist-button", "toast", "feedback-thumbs"],
    see: ["toast-notification", "micro-interactions", "kanban-board", "react-server-components"],
  },

  /* ───────────────────────────── Pagination ───────────────────────────── */
  {
    slug: "pagination",
    term: "Pagination",
    short:
      "Pagination splits a long set of results into numbered pages with controls to move between them, so each view loads a fixed, predictable amount.",
    body: [
      {
        type: "p",
        text: "Pagination divides a result set into pages of a fixed size, 25 or 50 rows for example, and gives the user controls to move between them: previous, next, and often numbered pages. It keeps each request and each screen small, gives every position in the list a stable address, and tells the user how much there is. Search results, admin tables, order histories and blog archives all rely on it.",
      },
      { type: "h2", text: "Offset or cursor", id: "offset-vs-cursor" },
      {
        type: "list",
        items: [
          "**Offset pagination** asks for `LIMIT 25 OFFSET 50`. It supports jumping to page 7 and showing a total page count, but gets slow on deep pages and shows duplicates or skips rows when data is inserted while the user pages.",
          "**Cursor pagination** asks for the 25 rows after a given ID or timestamp. It is fast and stable for changing data, but only supports previous and next, not arbitrary jumps.",
          "**Load more** appends the next page to the current list. It sits between pagination and [infinite scroll](/glossary/infinite-scroll).",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Wrap the controls in a `nav` element with `aria-label=\"Pagination\"` so it is a named landmark, and put the page links in a list. Mark the current page with `aria-current=\"page\"`. Visible labels such as \"3\" are fine; you can add an accessible name like \"Page 3\" for clarity. Keep Previous and Next in the same place on every page so they do not move under the pointer, and give every control at least a 24 by 24 pixel target. After a page change, move focus to the top of the results or the results heading so keyboard and screen reader users start reading the new page, not the old footer.",
      },
      { type: "h2", text: "How to build one in Next.js", id: "nextjs" },
      {
        type: "p",
        text: "Put the page number in the URL. Pages become shareable, the back button works, and search engines can crawl every page:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `const PAGE_SIZE = 25

export default async function Orders({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = Math.max(1, Number((await searchParams).page) || 1)
  const { rows, total } = await getOrders({ limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE })
  const pageCount = Math.ceil(total / PAGE_SIZE)
  return (
    <>
      <OrdersTable rows={rows} />
      <nav aria-label="Pagination" className="flex gap-2">
        {page > 1 ? <a href={"?page=" + (page - 1)}>Previous</a> : null}
        <span aria-current="page">Page {page} of {pageCount}</span>
        {page < pageCount ? <a href={"?page=" + (page + 1)}>Next</a> : null}
      </nav>
    </>
  )
}`,
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "Showing every page number. Show the first, last and a window around the current page, with an ellipsis between.",
          "Keeping page 9 after the user narrows a filter to 3 pages of results. Reset to page 1 when filters change.",
          "Buttons with `onClick` only, which cannot be opened in a new tab or crawled.",
        ],
      },
      {
        type: "p",
        text: "MiniDev ships [Pagination](/docs/pagination) for general lists and [TablePagination](/docs/table-pagination) for use under a [data table](/glossary/data-table). Both live in the [navigation category](/components/navigation).",
      },
      { type: "component", name: "pagination" },
      { type: "component", name: "table-pagination" },
    ],
    related: ["pagination", "table-pagination", "data-table"],
    see: ["infinite-scroll", "data-table", "breadcrumbs"],
  },

  /* ───────────────────────────── Skeleton screen ───────────────────────────── */
  {
    slug: "skeleton-screen",
    term: "Skeleton screen",
    short:
      "A skeleton screen is a placeholder layout of gray shapes that mirrors a page's structure while its content loads, instead of a blank screen or spinner.",
    body: [
      {
        type: "p",
        text: "A skeleton screen renders the shape of the page before the data arrives: gray bars where text will be, rectangles where images and charts will be, rows where a table will fill in. A slow shimmer often sweeps across to show that something is happening. Because the layout is already in place, the real content drops into position without jumping, and the wait feels shorter than staring at a single spinner in an empty page.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Initial page or section loads** where you know the layout: dashboards, feeds, tables, profile pages.",
          "**Loads longer than about 300ms.** For faster responses a skeleton flashes on and off, which is worse than nothing. Delay it slightly or skip it.",
          "**Use a spinner** for actions with unknown output, like submitting a form, and a progress bar when you can measure progress.",
        ],
      },
      { type: "h2", text: "How to build one in Next.js", id: "nextjs" },
      {
        type: "p",
        text: "With the App Router, a `loading.tsx` file becomes a Suspense fallback for its route segment, streamed immediately while the page's data loads:",
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/dashboard/loading.tsx",
        code: `import { Skeleton, SkeletonCard } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div aria-busy="true" className="grid gap-4 md:grid-cols-3">
      <p role="status" className="sr-only">Loading dashboard</p>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <Skeleton className="h-64 md:col-span-3" />
    </div>
  )
}`,
      },
      {
        type: "p",
        text: "Size each placeholder to match the real content. If the skeleton card is 180px tall and the real card is 240px, the page shifts when data arrives and you have traded a spinner for layout shift, which hurts both users and Cumulative Layout Shift scores.",
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "list",
        items: [
          "Hide the placeholder shapes from assistive technology with `aria-hidden`; a list of empty boxes means nothing when read aloud.",
          "Announce loading once with a visually hidden `role=\"status\"` message, and set `aria-busy=\"true\"` on the region being filled.",
          "Stop or slow the shimmer under [prefers-reduced-motion](/glossary/prefers-reduced-motion). A static gray block still communicates loading.",
          "Keep skeleton colors subtle but distinct from the background in both light and dark themes.",
        ],
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "Skeletons that never resolve because an error was not handled. Replace them with an error state after a failure.",
          "Showing a skeleton when the result is actually empty. Once data arrives with zero items, switch to an [empty state](/glossary/empty-state).",
          "A skeleton for data already in the client cache. Render the cached data and refresh in the background.",
        ],
      },
      {
        type: "p",
        text: "MiniDev's [Skeleton](/docs/skeleton) is a sunken plate with a hairline sheen, and [LoadingTable](/docs/loading-table) gives [data tables](/glossary/data-table) matching placeholder rows. Both are in the [feedback category](/components/feedback).",
      },
      { type: "component", name: "skeleton" },
      { type: "component", name: "loading-table" },
    ],
    related: ["skeleton", "loading-table", "spinner", "loading-overlay"],
    see: ["empty-state", "infinite-scroll", "prefers-reduced-motion", "hydration"],
  },

  /* ───────────────────────────── Stepper ───────────────────────────── */
  {
    slug: "stepper",
    term: "Stepper (multi-step form)",
    short:
      "A stepper splits a long form or process into ordered steps and shows progress through them, with one step's fields visible at a time.",
    body: [
      {
        type: "p",
        text: "A stepper, also called a wizard or multi-step form, breaks a long task into a sequence of smaller screens. A progress indicator at the top shows the steps, which ones are complete and which one is current, and Back and Continue buttons move between them. Signup flows, checkouts, onboarding and setup assistants use steppers because a short form per screen feels manageable and lets each step adapt to earlier answers.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Long forms with natural groups**, such as account, workspace and billing details.",
          "**Dependent steps**, where step three depends on what was chosen in step one.",
          "**Not for** short forms of five or six fields. Splitting them adds clicks and hides the total effort. Not for settings that people edit in any order; use tabs or sections.",
        ],
      },
      { type: "h2", text: "Anatomy", id: "anatomy" },
      {
        type: "list",
        ordered: true,
        items: [
          "A step indicator with labels, usually three to five steps.",
          "The current step's heading and fields.",
          "Back and Continue actions, with Continue becoming Submit or Finish on the last step.",
          "Optionally, a review step that summarizes every answer with links to edit each section.",
        ],
      },
      {
        type: "p",
        text: "Label steps by what the user provides, like Account or Billing, not by number alone. Mark optional steps as optional. Completed steps can be links back for editing, while future steps stay inactive until reached, so the order stays intact.",
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Render the indicator as an ordered list and mark the current step with `aria-current=\"step\"`, with text such as \"Step 2 of 4\" rather than color alone. When the step changes, the old fields disappear, so move focus to the new step's heading (give it `tabIndex={-1}`) and screen reader users hear where they are. Validate on Continue, show errors next to the fields, and put focus on the first invalid field. Do not use the ARIA tabs pattern for a linear stepper; tabs imply free movement between panels.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { Stepper } from "@/components/ui/stepper"
import { Button } from "@/components/ui/button"

const STEPS = ["Account", "Workspace", "Invite"]

export function SignupWizard() {
  const [step, setStep] = React.useState(0)
  const heading = React.useRef<HTMLHeadingElement>(null)
  function go(n: number) {
    setStep(n)
    requestAnimationFrame(() => heading.current?.focus())
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (step < STEPS.length - 1) go(step + 1) }}>
      <Stepper steps={STEPS} current={step} />
      <h2 ref={heading} tabIndex={-1} className="mt-6 text-lg font-medium">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </h2>
      {/* fields for the current step */}
      <div className="mt-6 flex justify-between">
        <Button type="button" variant="outline" disabled={step === 0} onClick={() => go(step - 1)}>Back</Button>
        <Button type="submit">{step === STEPS.length - 1 ? "Finish" : "Continue"}</Button>
      </div>
    </form>
  )
}`,
      },
      {
        type: "p",
        text: "Keep every step's values in one form state so Back never loses input, and persist the draft to `sessionStorage` or the server for long flows. MiniDev provides the [Stepper](/docs/stepper) indicator, [StepProgress](/docs/step-progress), and complete flows in [FormWizard](/docs/form-wizard) and [OnboardingWizard](/docs/onboarding-wizard), all in the [workflow category](/components/workflow). On the last step, disable Finish only while the request is in flight, and if the server rejects an answer from an earlier step, send the user back to that step with the error shown next to the field.",
      },
      { type: "component", name: "stepper" },
      { type: "component", name: "form-wizard" },
    ],
    related: ["stepper", "step-progress", "form-wizard", "onboarding-wizard", "funnel-steps"],
    see: ["modal-dialog", "focus-visible", "aria", "micro-interactions"],
  },

  /* ───────────────────────────── Toast notification ───────────────────────────── */
  {
    slug: "toast-notification",
    term: "Toast notification",
    short:
      "A toast is a brief, non-modal message that appears at the edge of the screen to confirm an action or report status, then dismisses itself.",
    body: [
      {
        type: "p",
        text: "A toast, also called a snackbar, is a small card that slides in near a corner of the screen, says something like \"Invoice sent\" or \"3 files uploaded\", and disappears after a few seconds. It does not block the page or take focus, so the user can keep working. Toasts are for feedback about something that just happened, especially work that finished in the background, and for short-lived offers such as Undo.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Confirming an action** whose result is not otherwise visible, such as sending, copying or saving in the background.",
          "**Offering Undo** after a reversible action, which is often better than a confirmation dialog.",
          "**Reporting a failure** of a background task, with a retry action.",
          "**Not for** form validation errors, which belong next to the field, or for critical information the user must act on. Use an [inline alert](/docs/inline-alert), a [banner](/docs/banner) or a [modal dialog](/glossary/modal-dialog) for those.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Toasts are read by screen readers through live regions. The container must already be in the DOM before a message is inserted, or the announcement is often missed; that is why toast libraries mount a single toaster at the root of the app. Use `role=\"status\"` (polite) for confirmations and reserve `role=\"alert\"` (assertive) for errors, because assertive messages interrupt whatever the user is hearing.",
      },
      {
        type: "list",
        items: [
          "Do not move focus to a toast. It would pull keyboard users away from their task.",
          "Timing: WCAG 2.2.1 requires that users can extend time limits. Pause the dismiss timer while the toast is hovered or focused, and give messages with actions more time.",
          "Any action in a toast, such as Undo, must be reachable by keyboard and should also be possible elsewhere, since the toast will disappear.",
          "Stack toasts rather than replacing one with another, and cap how many are visible.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "Mount the toaster once in your root layout, then call the imperative API from anywhere:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `// app/layout.tsx
import { Toaster } from "@/components/ui/toast"
// ...inside <body>: {children}<Toaster />

// anywhere in a client component
import { toast } from "@/components/ui/toast"

toast.success("Invoice sent", { description: "Acme will receive it in a minute." })

toast.promise(saveDraft(), {
  loading: "Saving draft",
  success: "Draft saved",
  error: "Could not save the draft",
})`,
      },
      {
        type: "p",
        text: "MiniDev's [Toast](/docs/toast) stacks messages, fans them out on hover or focus, pauses timers while expanded, and uses `role=\"alert\"` only for the danger tone. Toasts pair well with [optimistic UI](/glossary/optimistic-ui), where a toast explains a rollback. More status patterns are in the [feedback category](/components/feedback).",
      },
      { type: "component", name: "toast" },
      { type: "component", name: "inline-alert" },
    ],
    related: ["toast", "inline-alert", "banner", "notification-inbox"],
    see: ["optimistic-ui", "empty-state", "aria", "micro-interactions"],
  },

  /* ───────────────────────────── Tooltip ───────────────────────────── */
  {
    slug: "tooltip",
    term: "Tooltip",
    short:
      "A tooltip is a small text label that appears when a control is hovered or focused, describing it briefly without taking space in the layout.",
    body: [
      {
        type: "p",
        text: "A tooltip is a short piece of text that pops up next to an element when the pointer rests on it or when it receives keyboard focus, and goes away when either ends. It names or explains a control without adding permanent text to the layout. The classic case is an icon-only button in a toolbar, where the tooltip says \"Bold\" or \"Copy link\" and often shows the keyboard shortcut.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Labeling icon-only buttons**, and showing their keyboard shortcuts.",
          "**Revealing truncated text**, such as a long file name cut off with an ellipsis.",
          "**Brief supplementary hints** that experienced users do not need.",
          "**Not for** essential information, interactive content like links or buttons, or long explanations. Touch devices have no hover, so anything important must be visible or one tap away. Use a [popover](/docs/popover) for rich or interactive content.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "In the WAI-ARIA tooltip pattern the popup has `role=\"tooltip\"` and the trigger references it with `aria-describedby`, so the text is read as a description after the control's name. The tooltip must appear on keyboard focus as well as hover, and never receives focus itself. WCAG 1.4.13, Content on Hover or Focus, adds three rules:",
      },
      {
        type: "list",
        items: [
          "**Dismissible:** Escape hides the tooltip without moving focus.",
          "**Hoverable:** the pointer can move onto the tooltip without it disappearing.",
          "**Persistent:** it stays until the user moves away, dismisses it, or the information is no longer valid; it does not time out.",
        ],
      },
      {
        type: "p",
        text: "A tooltip does not replace an accessible name. An icon-only button still needs `aria-label` or visually hidden text; the tooltip is the visual equivalent for sighted users. Common failures follow from these rules: tooltips on disabled buttons, which cannot receive focus, tooltips that cover the control they describe, and tooltips used as the only label for a form field.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "code",
        lang: "tsx",
        code: `import { CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function CopyLinkButton() {
  return (
    <TooltipProvider delay={400}>
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Copy link" />}>
          <CopyIcon />
        </TooltipTrigger>
        <TooltipContent>Copy link</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
      },
      {
        type: "p",
        text: "A short open delay, around 300 to 500ms, keeps tooltips from flickering as the pointer crosses a toolbar. A shared provider lets neighboring tooltips open instantly once one is showing. Keep the text to a few words and do not repeat a visible label; a button that already says Save does not need a Save tooltip. MiniDev's [Tooltip](/docs/tooltip) is built on [Base UI](/glossary/base-ui), which handles the ARIA wiring, Escape, hover bridging and positioning. For richer previews on hover, see [HoverCard](/docs/hover-card) in the [overlays category](/components/overlays).",
      },
      { type: "component", name: "tooltip" },
      { type: "component", name: "hover-card" },
    ],
    related: ["tooltip", "popover", "hover-card", "icon-button", "kbd"],
    see: ["aria", "focus-visible", "headless-components", "base-ui"],
  },

  /* ───────────────────────────── Split-flap display ───────────────────────────── */
  {
    slug: "split-flap-display",
    term: "Split-flap display",
    short:
      "A split-flap display shows characters on hinged flaps that flip in sequence to change, like a train station departure board, often recreated in CSS.",
    body: [
      {
        type: "p",
        text: "A split-flap display is an electromechanical sign where each character position holds a drum of printed flaps. Each flap carries the top half of one character on its front and the bottom half of the next on its back. When the drum turns, flaps fall one after another until the target character shows, with the familiar clatter of airport and train station departure boards, often called Solari boards after the Italian maker. On the web the effect is recreated with CSS 3D transforms for clocks, counters, launch countdowns and landing page headlines.",
      },
      { type: "h2", text: "How it works in CSS", id: "how-it-works" },
      {
        type: "p",
        text: "Each cell is split into a top half and a bottom half. To change a character, the top half of the current one falls forward around a horizontal hinge, then the bottom half of the next one swings down into place. `perspective` on the cell gives depth, `transform-origin` sets the hinge, and `backface-visibility: hidden` hides each flap once it turns past 90 degrees:",
      },
      {
        type: "code",
        lang: "css",
        code: `.cell { position: relative; perspective: 300px; }
.flap-top {
  transform-origin: bottom;
  backface-visibility: hidden;
  animation: fall 70ms ease-in forwards;
}
.flap-bottom {
  transform-origin: top;
  backface-visibility: hidden;
  animation: land 70ms ease-out 70ms both;
}
@keyframes fall { from { transform: rotateX(0deg); } to { transform: rotateX(-90deg); } }
@keyframes land { from { transform: rotateX(90deg); } to { transform: rotateX(0deg); } }`,
      },
      {
        type: "list",
        items: [
          "**Cycle through a fixed character set.** A real drum only turns one way, so the cell steps forward through the set until it reaches the target. Order the set so common transitions, like digits on a clock, take one flip.",
          "**Stagger the columns.** Start each cell a few milliseconds after its neighbor to get the rippling cascade.",
          "**Use a monospaced, tabular font** so every cell has the same width and nothing shifts between characters.",
          "**Animate only transforms.** They run on the compositor and stay smooth with dozens of cells.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "A split-flap board draws each character as several layered elements, and every intermediate character is noise to a screen reader. Mark the animated cells `aria-hidden` and expose the final value once, as visually hidden text or an `aria-label` on the container. If the value changes while the user is on the page, as in a live counter, announce only the settled value through a polite live region, never each flip. Under [prefers-reduced-motion](/glossary/prefers-reduced-motion), skip the flaps and render the final characters directly.",
      },
      { type: "h2", text: "Where it fits", id: "where-it-fits" },
      {
        type: "p",
        text: "Use it for a small amount of text that changes rarely and deserves attention: a launch countdown, a hero stat, a status board. Long paragraphs or rapidly changing data become unreadable. For a full walkthrough of MiniDev's SplitFlap component, including character cycling, the two-half flap layers, column stagger and screen reader handling, read the [React split-flap display guide](/guides/react-split-flap-display). Related animated number components, including the premium [FlipStatBoard](/docs/flip-stat-board) and the free [NumberRoll](/docs/number-roll), are in the [animation category](/components/animation). Small, purposeful motion like this is a kind of [micro-interaction](/glossary/micro-interactions).",
      },
      { type: "component", name: "flip-stat-board" },
      { type: "component", name: "number-roll" },
    ],
    related: ["flip-stat-board", "number-roll", "metric-ticker-board", "launch-countdown"],
    see: ["micro-interactions", "prefers-reduced-motion", "hero-section"],
  },

  /* ───────────────────────────── Micro-interactions ───────────────────────────── */
  {
    slug: "micro-interactions",
    term: "Micro-interactions",
    short:
      "Micro-interactions are small, single-purpose moments of feedback, like a toggle sliding or a copy icon becoming a check, that confirm what just happened.",
    body: [
      {
        type: "p",
        text: "A micro-interaction is a contained product moment built around one task: flipping a switch, copying a value, liking a post, pulling to refresh, marking a task done. The term covers both the behavior and the small visual feedback that goes with it. Done well, micro-interactions answer the question every user has after acting, \"did that work?\", without a dialog or a message. Done badly, they slow people down with animation that has nothing to say.",
      },
      { type: "h2", text: "Anatomy", id: "anatomy" },
      {
        type: "p",
        text: "Dan Saffer's model, from his book on the subject, breaks every micro-interaction into four parts:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "**Trigger**: what starts it, either the user (a click, a key press) or the system (a message arrives).",
          "**Rules**: what happens, such as copying text to the clipboard.",
          "**Feedback**: what the user sees, hears or feels, such as the icon changing to a check.",
          "**Loops and modes**: what happens over time or on repeat, such as the check reverting after 1.5 seconds.",
        ],
      },
      { type: "h2", text: "Timing and motion", id: "timing" },
      {
        type: "list",
        items: [
          "Keep feedback fast: 100 to 200ms for most state changes. Exits should be quicker than entrances.",
          "Animate `transform` and `opacity`. They do not trigger layout, so nothing else on the page moves.",
          "Change one property on hover. A button that changes color, lifts and grows at once feels busy.",
          "Avoid `transition: all`; it animates properties you did not intend and costs performance.",
          "Use an easing curve that starts fast and settles slowly for entering motion, so the result appears almost at once.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Motion is decoration on top of a state change, never the only signal. A switch should also change its label or `aria-checked` state; a copy button should announce \"Copied\" to screen readers through a live region. Under [prefers-reduced-motion](/glossary/prefers-reduced-motion), replace movement with an instant change or a short fade. Keep a visible [focus-visible](/glossary/focus-visible) ring on every interactive element, since keyboard users need the same feedback.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "The example below swaps a copy icon for a check. Both icons are always rendered and stacked, so the button never changes size, and the status message sits outside the button so it is announced without changing the button's accessible name.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false)
  async function copy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }
  const icon = "absolute size-4 transition-[opacity,scale] duration-150 motion-reduce:transition-none"
  return (
    <>
      <button type="button" onClick={copy} aria-label="Copy" className="relative grid size-9 place-items-center rounded-lg">
        <CopyIcon className={cn(icon, copied && "scale-50 opacity-0")} />
        <CheckIcon className={cn(icon, !copied && "scale-50 opacity-0")} />
      </button>
      <span role="status" className="sr-only">{copied ? "Copied" : ""}</span>
    </>
  )
}`,
      },
      {
        type: "p",
        text: "MiniDev bakes these rules into its components: [CopyButton](/docs/copy-button) swaps its icon and announces the result, [Switch](/docs/switch) springs its thumb across the track, and [NumberRoll](/docs/number-roll) animates figures digit by digit. Micro-interactions also make [optimistic UI](/glossary/optimistic-ui) feel trustworthy. Browse the [buttons](/components/buttons) and [animation](/components/animation) categories for more.",
      },
      { type: "component", name: "copy-button" },
      { type: "component", name: "switch" },
    ],
    related: ["copy-button", "switch", "feedback-thumbs", "number-roll", "magnetic-cta"],
    see: ["prefers-reduced-motion", "optimistic-ui", "focus-visible", "toast-notification"],
  },
]
