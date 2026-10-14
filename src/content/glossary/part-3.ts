import type { GlossaryTerm } from "../types"

export const GLOSSARY_3: GlossaryTerm[] = [
  /* ───────────────────────────── Multi-select ───────────────────────────── */
  {
    slug: "multi-select",
    term: "Multi-select",
    short:
      "A multi-select is a form control that lets users pick several options from one list, showing the chosen items as check marks or removable chips.",
    body: [
      {
        type: "p",
        text: "A multi-select is the many-at-once version of a select. The user opens a list, ticks as many options as apply, and the field shows the result as a summary or a row of chips, each with its own remove control. It covers assigning reviewers, choosing tags, filtering a table by several statuses, or picking the regions a report should include. The native `<select multiple>` element exists, but it needs Ctrl or Cmd clicking and shows a cramped box, so most products build their own.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Several values from a list of about seven or more.** Below that, a [checkbox group](/docs/checkbox-group) shows every option at once with no popup.",
          "**Filtering and tagging**, where the chosen set is the point and people add and remove items often.",
          "**Known, bounded options.** For free text values such as new tags, use a [tags input](/docs/tags-input), which accepts anything typed.",
          "Avoid it for mutually exclusive choices; that is a [radio group](/glossary/radio-group) or a single [combobox](/glossary/combobox).",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "There are two accessible shapes. The first is a listbox: the popup has `role=\"listbox\"` with `aria-multiselectable=\"true\"`, every item has `role=\"option\"` and `aria-selected`, and Space toggles the focused option. The second is a popup of real checkboxes, where each item is a native checkbox or a `menuitemcheckbox` and the usual checkbox semantics apply. Both work; the listbox version is the natural fit when there is also a text filter.",
      },
      {
        type: "list",
        items: [
          "The trigger needs an accessible name and `aria-expanded`, and its summary text must change with the selection so screen reader users hear the new value.",
          "Chips are buttons named after the item they remove, such as \"Remove Maya Chen\". A bare × with no name is a common failure.",
          "Announce the count after a change (\"2 selected\") through a polite [live region](/glossary/live-region) rather than reading the whole list.",
          "Do not close the popup after each pick. People choose several things in a row.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [MultiSelect](/docs/multi-select) is a [popover](/glossary/popover) list with check marks and removable chips for the chosen items. It takes `items`, a controlled `value` array and `onChange`:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { MultiSelect } from "@/components/ui/multi-select"

const REVIEWERS = [
  { value: "maya", label: "Maya Chen" },
  { value: "theo", label: "Theo Okafor" },
  { value: "priya", label: "Priya Raman" },
]

export function ReviewerField() {
  const [value, setValue] = React.useState<string[]>([])
  return <MultiSelect items={REVIEWERS} value={value} onChange={setValue} placeholder="Add reviewers" />
}`,
      },
      {
        type: "p",
        text: "Keep the value as an array of ids, not labels, so renaming an option never breaks saved data. When the list is long, add a search field at the top of the popup and keep selected items pinned at the top so they stay visible after filtering. For single values with the same popup mechanics, see the [Combobox](/docs/combobox) in the [forms category](/components/forms).",
      },
      { type: "component", name: "multi-select" },
      { type: "component", name: "tags-input" },
    ],
    related: ["multi-select", "combobox", "tags-input", "checkbox-group", "chip-filter"],
    see: ["combobox", "popover", "radio-group", "live-region"],
  },

  /* ───────────────────────────── Date range picker ───────────────────────────── */
  {
    slug: "date-range-picker",
    term: "Date range picker",
    short:
      "A date range picker is a form control for choosing a start date and an end date together, usually with a calendar and presets like Last 30 days.",
    body: [
      {
        type: "p",
        text: "A date range picker collects two dates that belong together: the start and end of a report, a stay, a billing period, a filter on a table. It usually combines two fields with a calendar popup where the user clicks the first day and then the last, and the days between them highlight. Analytics dashboards, booking sites and export dialogs all rely on it. The hard parts are not the calendar; they are validation, time zones and letting people type.",
      },
      { type: "h2", text: "Anatomy", id: "anatomy" },
      {
        type: "list",
        items: [
          "**Two fields**, start and end, each labeled and each accepting typed input in a clear format.",
          "**A calendar grid**, often two months side by side on desktop and one on mobile, with the selected range shaded.",
          "**Presets** such as Today, Last 7 days, Last 30 days and This month. Most users pick a preset; the calendar is for everything else.",
          "**Apply and Cancel** when the choice drives an expensive query, so the table does not reload after every click.",
        ],
      },
      { type: "h2", text: "Rules worth deciding early", id: "rules" },
      {
        type: "list",
        items: [
          "The end date cannot be before the start date. Either swap them silently or disable earlier days once a start is chosen, and say which you do.",
          "Decide whether the end is inclusive. \"Jan 1 to Jan 31\" usually means the whole of the 31st.",
          "Store calendar ranges as plain ISO strings like `2026-03-01`, and attach a time zone only when the data has one. Converting a date-only value through the browser's local time is the classic source of off-by-one-day bugs.",
          "Put the range in the URL for dashboard filters so a view can be shared and the back button works.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The native `<input type=\"date\">` is well supported in most browsers and gives keyboard entry, a built-in picker on phones and correct semantics for free; MiniDev's picker builds on it. If you render a custom calendar, follow the WAI-ARIA date picker dialog example: the days form a `grid` with one Tab stop, Arrow keys move by day and week, Page Up and Page Down move by month, Home and End jump to the ends of the week, and the focused day announces its full date. Always keep the typed fields; a calendar-only control blocks screen reader users and anyone who already knows the date they want.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [DateRangePicker](/docs/date-range-picker) pairs two [DatePicker](/docs/date-picker) inputs labeled Start date and End date and reports both values as ISO strings:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { DateRangePicker } from "@/components/ui/date-range-picker"

export function ReportRange() {
  const [range, setRange] = React.useState<{ from?: string; to?: string }>({})
  const valid = !range.from || !range.to || range.from <= range.to
  return (
    <div className="space-y-2">
      <DateRangePicker value={range} onChange={setRange} />
      {!valid ? <p role="alert" className="text-sm text-danger">The end date must be after the start date.</p> : null}
    </div>
  )
}`,
      },
      {
        type: "p",
        text: "ISO date strings compare correctly as plain strings, which is why the check above needs no Date objects. For a full month view with events, see [CalendarMonth](/docs/calendar-month) and [EventCalendar](/docs/event-calendar) in the [forms category](/components/forms).",
      },
      { type: "component", name: "date-range-picker" },
      { type: "component", name: "date-picker" },
    ],
    related: ["date-range-picker", "date-picker", "calendar-month", "time-picker", "event-calendar"],
    see: ["popover", "combobox", "aria", "focus-trap"],
  },

  /* ───────────────────────────── Drawer ───────────────────────────── */
  {
    slug: "drawer",
    term: "Drawer",
    short:
      "A drawer is a panel that slides in from an edge of the screen over the page, used for navigation, filters or quick actions, and slides back when dismissed.",
    body: [
      {
        type: "p",
        text: "A drawer is a panel anchored to one edge of the viewport that slides into view on demand. The navigation drawer behind a hamburger button slides from the left; a bottom sheet of actions slides up from the bottom on phones; a filter drawer slides in from the right over a product list. Unlike a [modal dialog](/glossary/modal-dialog), which floats in the center and interrupts, a drawer stays attached to the edge it came from, holds more content, and feels like a part of the page that was folded away.",
      },
      { type: "h2", text: "Drawer or modal", id: "drawer-vs-modal" },
      {
        type: "list",
        items: [
          "**Use a drawer** for content that is long, scrollable or secondary to the page: navigation, filters, a settings panel, a list of actions on a phone.",
          "**Use a modal** for a short decision or a small form that needs the user's full attention before anything else happens.",
          "**On phones**, a bottom drawer usually beats a centered modal. It sits where the thumb is, can be dragged to a comfortable height, and keeps the page visible above it as context.",
          "**Neither** for content people must read. Put it on the page.",
        ],
      },
      {
        type: "p",
        text: "A drawer can be modal, with a scrim that blocks the page behind, or non-modal, where the page stays usable, as with a persistent navigation rail on wide screens. Decide which, because the accessibility rules follow from it.",
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "A modal drawer is a dialog that happens to sit at an edge, so it follows the dialog pattern: `role=\"dialog\"`, `aria-modal=\"true\"`, an accessible name from its title, focus moved inside on open, a [focus trap](/glossary/focus-trap) while open, Escape to close, and focus returned to the button that opened it. A non-modal drawer drops `aria-modal`, does not trap focus and uses no scrim; the open button simply carries `aria-expanded`.",
      },
      {
        type: "list",
        items: [
          "Swipe to dismiss is a nice touch, but always keep a visible close button, since gestures are not available to everyone.",
          "If the drawer can be dragged to several heights, make the height change reachable by keyboard too, or offer a single full height.",
          "Lock page scroll while a modal drawer is open, and reserve the scrollbar gutter so the page does not jump.",
          "Keep the slide short and respect [prefers-reduced-motion](/glossary/prefers-reduced-motion).",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Drawer](/docs/drawer) is a [Sheet](/docs/sheet) that defaults to the bottom edge. Pass `open` and `onClose` to control it, or leave them out and it renders its own trigger:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { Drawer } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function InvoiceActions() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="outline" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
        Actions
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Invoice INV-2041">
        <Button variant="ghost" className="w-full justify-start">Send reminder</Button>
        <Button variant="ghost" className="w-full justify-start">Download PDF</Button>
      </Drawer>
    </>
  )
}`,
      },
      {
        type: "p",
        text: "Use `side=\"left\"` for navigation and `side=\"right\"` for details. [MobileActionSheet](/docs/mobile-action-sheet) and [MobileNavDrawer](/docs/mobile-nav-drawer) are ready-made versions of the two most common drawers. All of them live in the [overlays category](/components/overlays).",
      },
      { type: "component", name: "drawer" },
      { type: "component", name: "mobile-nav-drawer" },
    ],
    related: ["drawer", "sheet", "mobile-action-sheet", "mobile-nav-drawer", "dialog"],
    see: ["modal-dialog", "side-sheet", "focus-trap", "portal"],
  },

  /* ───────────────────────────── Side sheet ───────────────────────────── */
  {
    slug: "side-sheet",
    term: "Side sheet",
    short:
      "A side sheet is a panel that slides in from the left or right edge to show details or a form beside the main content, either over it or pushing it aside.",
    body: [
      {
        type: "p",
        text: "A side sheet is a vertical panel that enters from the side of the screen and holds supplementary content: the details of a selected row, a form to create or edit a record, a preview of a file, a help article. The main content stays visible, so the user keeps their place in a list while working on one item. Material Design named the pattern, and most admin tools, CRMs and email clients use it, often without calling it anything.",
      },
      { type: "h2", text: "Modal or standard", id: "modal-or-standard" },
      {
        type: "list",
        items: [
          "**A modal side sheet** slides over the page with a scrim and blocks it. Use it on narrow screens, or when the sheet holds a form that should be finished or cancelled.",
          "**A standard side sheet** sits beside the content, pushes it aside or resizes it, and leaves the page usable. Use it on wide screens for details panels and inspectors, as in a mail client.",
          "**Compared with a [drawer](/glossary/drawer)**, a side sheet is content, not a menu. Navigation and quick actions belong in a drawer; records, forms and previews belong in a sheet.",
          "**Compared with a [modal dialog](/glossary/modal-dialog)**, a sheet holds a longer form and scrolls, and the user can still glance at the list it came from.",
        ],
      },
      { type: "h2", text: "Anatomy", id: "anatomy" },
      {
        type: "p",
        text: "A header with a title and a close button, a scrollable body, and an optional footer with the primary action pinned so it stays reachable on long forms. Width is usually 360 to 480px on desktop and the full viewport on phones, where a side sheet behaves like a page. Change the URL when a sheet shows a record, so reloading or sharing the link reopens the same item.",
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "A modal sheet is a dialog: `role=\"dialog\"`, `aria-modal=\"true\"`, a name from its title, focus moved into the panel on open, a [focus trap](/glossary/focus-trap) while open, Escape to close and focus returned to the opener. A standard sheet is a landmark instead: a `section` or `aside` with `aria-label`, opened by a button that carries `aria-expanded`, and no trap, since the page is meant to stay usable. In both cases the close button needs a target of at least 24 by 24 CSS pixels and a name such as \"Close details\".",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Sheet](/docs/sheet) renders the scrim, the title bar and the close button, moves focus into the panel on open, closes on Escape and hands focus back on close. It slides from the right by default:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { Sheet } from "@/components/ui/sheet"

type Invoice = { id: string; customer: string }

export function InvoiceDetails({ invoice, onClose }: { invoice?: Invoice; onClose: () => void }) {
  return (
    <Sheet open={Boolean(invoice)} onClose={onClose} side="right" title={invoice ? "Invoice " + invoice.id : undefined}>
      {invoice ? <p className="text-sm">Customer: {invoice.customer}</p> : null}
    </Sheet>
  )
}`,
      },
      {
        type: "p",
        text: "Drive `open` from the selected row so clicking another row swaps the content instead of stacking sheets. For a non-modal inspector that stays open beside a table, see [PeekPanel](/docs/peek-panel) and [CollapsibleSidebar](/docs/collapsible-sidebar). More overlay patterns are in the [overlays category](/components/overlays).",
      },
      { type: "component", name: "sheet" },
      { type: "component", name: "peek-panel" },
    ],
    related: ["sheet", "drawer", "peek-panel", "collapsible-sidebar", "dialog"],
    see: ["drawer", "modal-dialog", "focus-trap", "aria"],
  },

  /* ───────────────────────────── Popover ───────────────────────────── */
  {
    slug: "popover",
    term: "Popover",
    short:
      "A popover is a small floating panel anchored to the control that opened it, holding rich or interactive content, that closes on Escape or a click outside.",
    body: [
      {
        type: "p",
        text: "A popover is a panel that appears next to its trigger, positioned to stay on screen, and goes away when the user clicks elsewhere or presses Escape. It can hold anything: a form, a color picker, a calendar, a share link with a Copy button, a filter panel. That is what separates it from a [tooltip](/glossary/tooltip), which is text only and appears on hover, and from a [dropdown menu](/glossary/dropdown-menu), which is a list of commands with its own keyboard rules.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Small, contextual tasks** that would be heavy as a [modal dialog](/glossary/modal-dialog): editing one field, picking a date, choosing a color, confirming a small action.",
          "**Extra detail on demand**, such as a user card on a name or a breakdown behind a number.",
          "**Filters and settings** attached to the control they affect, so the result updates in place.",
          "**Not for** content people need to compare with the page, or anything with more than a few controls; use a [side sheet](/glossary/side-sheet).",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The trigger is a button with `aria-expanded` and, when the popover holds interactive content, `aria-haspopup=\"dialog\"` and `aria-controls` pointing at the panel. The panel takes `role=\"dialog\"` with a name from its heading. When it opens, focus moves inside it; when it closes, focus returns to the trigger. Escape closes it. Tab moves through the popover's controls and must not disappear into the page behind the panel; at the end, either wrap or close the popover and continue past the trigger. A popover that only shows text can skip the dialog role and the focus move.",
      },
      {
        type: "p",
        text: "The HTML `popover` attribute, supported in most browsers, renders an element in the top layer with light dismiss built in. It does not position the element next to its trigger on its own, so most React components still use a positioning library and a [portal](/glossary/portal).",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Popover](/docs/popover) is built on [Base UI](/glossary/base-ui), which handles positioning, the ARIA attributes, focus and dismissal. The `render` prop lets the trigger be your own [Button](/docs/button):",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"

export function ShareReport() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Share</PopoverTrigger>
      <PopoverContent align="start" side="bottom">
        <PopoverHeader>
          <PopoverTitle>Share Q3 revenue</PopoverTitle>
          <PopoverDescription>Anyone with the link can view.</PopoverDescription>
        </PopoverHeader>
        <Button size="sm">Copy link</Button>
      </PopoverContent>
    </Popover>
  )
}`,
      },
      {
        type: "p",
        text: "`side` and `align` set the preferred placement, and the panel flips to the other side when it would leave the viewport. Keep popovers under about 320px wide and let the content scroll inside if it must. For hover previews use [HoverCard](/docs/hover-card), and for a list of actions, [DropdownMenu](/docs/dropdown-menu). All three are in the [overlays category](/components/overlays).",
      },
      { type: "component", name: "popover" },
      { type: "component", name: "hover-card" },
    ],
    related: ["popover", "hover-card", "tooltip", "dropdown-menu", "date-picker"],
    see: ["tooltip", "dropdown-menu", "portal", "modal-dialog"],
  },

  /* ───────────────────────────── Dropdown menu ───────────────────────────── */
  {
    slug: "dropdown-menu",
    term: "Dropdown menu",
    short:
      "A dropdown menu is a list of actions or options that opens below a button, where arrow keys move through the items and Enter runs the chosen one.",
    body: [
      {
        type: "p",
        text: "A dropdown menu opens from a trigger button and lists things the user can do: open a profile, change a setting, duplicate or delete an item, switch workspace. Items can carry icons and keyboard shortcut hints, can be grouped with separators, can be checkable, and can open submenus. The pattern comes from desktop application menus, and it carries their keyboard behavior with it, which is what makes a menu different from a [popover](/glossary/popover) holding a few buttons.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Secondary actions on an item**, such as the three-dot menu on a table row or a card.",
          "**Account and workspace menus** in the top bar.",
          "**Choosing a view or a sort order**, using radio items so the current choice is marked.",
          "**Not for** choosing a value in a form, which is a [select](/docs/select) or a [combobox](/glossary/combobox), and not for site navigation, which is a `nav` landmark with a list of links. Menu roles tell screen readers to expect application behavior.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The WAI-ARIA menu button pattern defines it. The trigger has `aria-haspopup=\"menu\"` and `aria-expanded`. The popup has `role=\"menu\"`, and each item is `role=\"menuitem\"`, `menuitemcheckbox` or `menuitemradio`, with `aria-checked` on the last two. Unlike a combobox, focus moves into the menu when it opens.",
      },
      {
        type: "list",
        items: [
          "Enter, Space or Down Arrow opens the menu and focuses the first item; Up Arrow opens it and focuses the last.",
          "Up and Down move between items and wrap at the ends; Home and End jump to the first and last item.",
          "Typing a letter moves to the next item starting with it.",
          "Right Arrow opens a submenu, Left Arrow closes it.",
          "Enter activates an item and closes the menu; Escape closes without acting; both return focus to the trigger.",
          "Disabled items stay in the DOM with `aria-disabled` so users can still find them.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [DropdownMenu](/docs/dropdown-menu) is built on the [Base UI](/glossary/base-ui) menu, so the roles, focus movement and typeahead above come for free:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { EllipsisIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function RowActions({ onDuplicate, onDelete }: { onDuplicate: () => void; onDelete: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="More actions" />}>
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onDuplicate}>
          Duplicate
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
      },
      {
        type: "p",
        text: "Keep destructive items last and separated, and confirm them with an [alert dialog](/docs/alert-dialog) when they cannot be undone. Show a shortcut hint only next to actions that really have one. [ContextMenu](/docs/context-menu) is the same menu opened by right click, and [Menubar](/docs/menubar) groups several menus in a row. Browse the [overlays category](/components/overlays) for more.",
      },
      { type: "component", name: "dropdown-menu" },
      { type: "component", name: "context-menu" },
    ],
    related: ["dropdown-menu", "context-menu", "menubar", "split-button", "select"],
    see: ["popover", "combobox", "roving-tabindex", "aria"],
  },

  /* ───────────────────────────── Segmented control ───────────────────────────── */
  {
    slug: "segmented-control",
    term: "Segmented control",
    short:
      "A segmented control is a row of two to five connected buttons where exactly one is selected, used to switch a view, a mode or a value in place.",
    body: [
      {
        type: "p",
        text: "A segmented control shows every option side by side in one track and highlights the selected one, so the choice and its alternatives are visible at a glance. It comes from iOS, where it switches between views like List and Map, and it is now common on the web for billing periods (Monthly or Yearly), chart ranges (1D, 1W, 1M), density settings and view modes. It is a [radio group](/glossary/radio-group) with a different look, and it should behave like one.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Two to five short options** that fit on one line. Beyond that, labels get truncated and the control stops reading as one unit; use [tabs](/glossary/tabs), a select or a [radio group](/docs/radio-group).",
          "**Immediate effect.** Changing the segment changes the view or the value right away, with no Apply button.",
          "**One choice at a time.** For several independent on and off states, use a [toggle group](/docs/toggle-group) with multiple selection.",
          "**Not for navigation between pages** or for switching large panels of content; those are tabs, and page navigation should be links.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Because exactly one option is selected, the right semantics are a radio group: the container has `role=\"radiogroup\"` with an `aria-label`, and each segment is a button with `role=\"radio\"` and `aria-checked`. Keyboard behavior follows the radio pattern with a [roving tabindex](/glossary/roving-tabindex): one Tab stop for the whole control, Left and Right Arrow move the selection, Home and End jump to the ends. Arrow keys select as they move, so there is no separate Enter step.",
      },
      {
        type: "p",
        text: "The selected state must not rely on color alone. A raised thumb, a bolder label or a filled background all work together. Every segment needs a target of at least 24 by 24 CSS pixels, and the control needs a visible [focus ring](/glossary/focus-visible) on the focused segment, not just on the track.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [SegmentedControl](/docs/segmented-control) renders the radio group with roving focus, arrow key handling and a raised thumb that glides to the selected segment on a spring, standing still under [prefers-reduced-motion](/glossary/prefers-reduced-motion):",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { SegmentedControl } from "@/components/ui/segmented-control"

export function BillingPeriod() {
  const [period, setPeriod] = React.useState("monthly")
  return (
    <SegmentedControl
      aria-label="Billing period"
      options={[
        { value: "monthly", label: "Monthly" },
        { value: "yearly", label: "Yearly", badge: "-20%" },
      ]}
      value={period}
      onChange={setPeriod}
    />
  )
}`,
      },
      {
        type: "p",
        text: "The `items` shorthand takes plain strings when values and labels are the same, `size` offers three heights and `fullWidth` stretches the segments evenly across a container. Pair it with a [pricing toggle](/docs/pricing-toggle), or put it in a [data table](/glossary/data-table) toolbar to switch views. Find related controls in the [forms category](/components/forms).",
      },
      { type: "component", name: "segmented-control" },
      { type: "component", name: "toggle-group" },
    ],
    related: ["segmented-control", "toggle-group", "tabs", "radio-group", "pricing-toggle"],
    see: ["tabs", "radio-group", "roving-tabindex", "toggle-switch"],
  },

  /* ───────────────────────────── Toggle switch ───────────────────────────── */
  {
    slug: "toggle-switch",
    term: "Toggle switch",
    short:
      "A toggle switch is an on-off control with a sliding thumb that applies a setting immediately, like a physical light switch, without a Save button.",
    body: [
      {
        type: "p",
        text: "A toggle switch turns one thing on or off: notifications, dark mode, a feature flag, public visibility. The thumb slides across a track and the change takes effect at once. That immediacy is what distinguishes a switch from a checkbox. A checkbox is a value you submit with a form; a switch is a setting you flip. Phones made the control familiar, and settings pages on the web adopted it for the same reason: the state is obvious from the position of the thumb.",
      },
      { type: "h2", text: "Switch or checkbox", id: "switch-or-checkbox" },
      {
        type: "list",
        items: [
          "**Use a switch** when the change applies instantly, the state is binary and the options are clearly on and off.",
          "**Use a checkbox** inside a form that is submitted with a button, for agreeing to terms, and whenever several related options are selected together.",
          "**Use neither** for choosing between two named things like Light and Dark with no obvious on state; that is a [segmented control](/glossary/segmented-control) or a [radio group](/glossary/radio-group).",
          "A switch that does nothing until the user presses Save confuses people. If saving must be explicit, use checkboxes.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The switch pattern is small. The control is a button with `role=\"switch\"` and `aria-checked` set to `true` or `false`, or a native `<input type=\"checkbox\" role=\"switch\">`, which keeps form behavior. It needs an accessible name from a visible label, and clicking the label should toggle it. Space toggles the switch; many implementations also accept Enter. Screen readers announce the state as on or off, so the label should name the thing, such as \"Email notifications\", not the state.",
      },
      {
        type: "list",
        items: [
          "Show the state in more than one way: thumb position plus a track color, an icon or an On and Off caption. Color alone fails for many users.",
          "Give the control a 44 by 44 pixel hit area even when the drawn track is smaller.",
          "When flipping triggers a request, keep the switch focusable, show a small spinner in the thumb, and revert with a message if the request fails, as [optimistic UI](/glossary/optimistic-ui) demands.",
          "Keep the motion short and skip it under [prefers-reduced-motion](/glossary/prefers-reduced-motion).",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Switch](/docs/switch) wraps the [Base UI](/glossary/base-ui) switch, so the role, state and keyboard handling are wired. The `label` and `description` props render a settings row where the whole row is clickable, and `loading` shows a spinner while a save is in flight:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { Switch } from "@/components/ui/switch"

export function NotificationRow({ initial, save }: { initial: boolean; save: (on: boolean) => Promise<void> }) {
  const [on, setOn] = React.useState(initial)
  const [saving, setSaving] = React.useState(false)
  async function change(next: boolean) {
    setOn(next)
    setSaving(true)
    try {
      await save(next)
    } catch {
      setOn(!next)
    } finally {
      setSaving(false)
    }
  }
  return (
    <Switch
      checked={on}
      onCheckedChange={change}
      loading={saving}
      label="Email notifications"
      description="A daily digest of activity in your workspace."
    />
  )
}`,
      },
      {
        type: "p",
        text: "The thumb leans toward where it is about to go while pressed and springs across on release, one of the [micro-interactions](/glossary/micro-interactions) that make a setting feel direct. For a one-line flag with an environment badge, see [FeatureFlagToggle](/docs/feature-flag-toggle). More inputs are in the [forms category](/components/forms).",
      },
      { type: "component", name: "switch" },
      { type: "component", name: "feature-flag-toggle" },
    ],
    related: ["switch", "toggle", "feature-flag-toggle", "checkbox", "pricing-toggle"],
    see: ["segmented-control", "radio-group", "micro-interactions", "aria"],
  },

  /* ───────────────────────────── Radio group ───────────────────────────── */
  {
    slug: "radio-group",
    term: "Radio group",
    short:
      "A radio group is a set of options where selecting one deselects the rest, used when a form needs exactly one choice from a short, visible list.",
    body: [
      {
        type: "p",
        text: "A radio group presents every option at once and allows exactly one to be selected. Picking a different option moves the selection; there is no way to unselect everything once a choice is made. It is the right control for a short list of mutually exclusive answers: a plan, a shipping speed, a visibility setting, a payment method. The name comes from the station buttons on old car radios, where pressing one popped the others out.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Two to about seven options** that all deserve to be visible, so people can compare them without opening anything.",
          "**Options with descriptions**, such as plans with prices or shipping methods with dates. A select cannot show that detail.",
          "**More than seven options** usually belong in a [select](/docs/select) or [combobox](/glossary/combobox), which hide the list until needed.",
          "**Instant switching between views** is a [segmented control](/glossary/segmented-control), which is a radio group in a compact skin.",
        ],
      },
      { type: "h2", text: "Should one be preselected", id: "preselect" },
      {
        type: "p",
        text: "Preselect an option when there is a safe, common default, such as standard shipping, and the form must have a value. Leave the group empty when the choice is a real decision the user should make, such as a paid plan, and validate on submit. Never preselect the option that costs the most or shares the most data.",
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Native radio inputs with the same `name` inside a `fieldset` with a `legend` are the most robust option and need no ARIA. A custom group uses `role=\"radiogroup\"` on the container, named by `aria-labelledby`, and `role=\"radio\"` with `aria-checked` on each option. Keyboard behavior is the same in both: Tab reaches the group once, landing on the checked option (or the first when none is checked), and Arrow keys move the selection among the options with a [roving tabindex](/glossary/roving-tabindex). Each option needs a visible label that can be clicked, and an error on the group is shown once, below the legend, with `aria-describedby` on the group pointing at it.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [RadioGroup](/docs/radio-group) and `RadioGroupItem` wrap the [Base UI](/glossary/base-ui) primitives. Pair each item with a [Label](/docs/label) so the text is clickable:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ShippingMethod() {
  return (
    <fieldset>
      <legend className="text-sm font-medium">Shipping</legend>
      <RadioGroup name="shipping" defaultValue="standard" className="mt-3">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="standard" id="ship-standard" />
          <Label htmlFor="ship-standard">Standard, 3 to 5 days</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="express" id="ship-express" />
          <Label htmlFor="ship-express">Express, next day</Label>
        </div>
      </RadioGroup>
    </fieldset>
  )
}`,
      },
      {
        type: "p",
        text: "Pass `value` and `onValueChange` instead of `defaultValue` when another part of the form depends on the choice, which makes it a [controlled component](/glossary/controlled-component). For options with a price, an icon and a description, [ChoiceCard](/docs/choice-card) renders each option as a selectable card. Browse the [forms category](/components/forms) for the rest of the input set.",
      },
      { type: "component", name: "radio-group" },
      { type: "component", name: "choice-card" },
    ],
    related: ["radio-group", "choice-card", "checkbox-group", "segmented-control", "theme-picker"],
    see: ["segmented-control", "toggle-switch", "roving-tabindex", "aria"],
  },

  /* ───────────────────────────── Range slider ───────────────────────────── */
  {
    slug: "range-slider",
    term: "Range slider",
    short:
      "A range slider is a slider with two thumbs on one track that sets a minimum and a maximum together, such as a price range on a filter panel.",
    body: [
      {
        type: "p",
        text: "A range slider lets the user pick an interval instead of a single value. Two thumbs sit on one rail; the segment between them is the selected range and is usually filled with the accent color. Price filters on shopping sites are the classic use, along with date windows on charts, age brackets in forms, and minimum and maximum thresholds in monitoring settings. It is a sibling of the single-thumb slider and shares every rule of that control, plus a few of its own.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Approximate ranges** on a continuous scale, where moving a thumb and watching results update is faster than typing two numbers.",
          "**Bounded scales** with a known minimum and maximum. If the data has outliers, one product at 50,000 next to hundreds under 100, a linear slider wastes most of the rail; use a logarithmic scale or quantiles.",
          "**Not for exact values.** Hitting precisely 1,250 with a pointer is hard. Show the current values as text and offer paired number inputs for precision.",
          "Below about ten possible values, a pair of selects or a [radio group](/glossary/radio-group) is clearer.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Each thumb is its own `role=\"slider\"` with `aria-valuemin`, `aria-valuemax` and `aria-valuenow`, plus `aria-valuetext` when the number alone is not meaningful (\"$1,250\" rather than \"1250\"). The two thumbs need distinct names, such as Minimum price and Maximum price. The native `<input type=\"range\">` provides a single thumb; a two-thumb control is custom, which is why a tested primitive matters.",
      },
      {
        type: "list",
        items: [
          "Arrow keys move the focused thumb by one step; Page Up and Page Down move by a larger step; Home and End jump to the ends.",
          "Thumbs must not cross. Either stop a thumb at the other one or swap which thumb is which, and keep a minimum gap when the two values cannot be equal.",
          "Thumbs need at least a 24 by 24 CSS pixel target, and more on touch screens.",
          "Show the values as visible text near the thumbs or beside the control, so the result does not depend on reading a position.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [RangeSlider](/docs/range-slider) is the two-thumb version of [Slider](/docs/slider), both built on [Base UI](/glossary/base-ui). It accepts `min`, `max`, `step`, a `format` for the value bubbles, and `onValueCommitted`, which fires once when the thumb is released:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { RangeSlider } from "@/components/ui/range-slider"

export function PriceFilter({ onApply }: { onApply: (range: number[]) => void }) {
  const [range, setRange] = React.useState([200, 1200])
  return (
    <div className="space-y-2">
      <p className="text-sm tabular-nums">Price: {range[0]} to {range[1]}</p>
      <RangeSlider
        aria-label="Price range"
        min={0}
        max={2000}
        step={50}
        value={range}
        onValueChange={setRange}
        onValueCommitted={onApply}
        format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
      />
    </div>
  )
}`,
      },
      {
        type: "p",
        text: "Use `onValueChange` for live text and `onValueCommitted` for the expensive part, such as refetching results, so dragging does not fire a request per pixel; that is a form of [debouncing](/glossary/debounce). `marks` adds ticks under the rail, and `minStepsBetweenValues` keeps the thumbs apart. Range sliders usually live in a [FilterBar](/docs/filter-bar) or [FacetFilter](/docs/facet-filter) in the [forms category](/components/forms).",
      },
      { type: "component", name: "range-slider" },
      { type: "component", name: "slider" },
    ],
    related: ["range-slider", "slider", "number-input", "facet-filter", "filter-bar"],
    see: ["radio-group", "debounce", "aria", "focus-visible"],
  },

  /* ───────────────────────────── Tabs ───────────────────────────── */
  {
    slug: "tabs",
    term: "Tabs",
    short:
      "Tabs are a row of labeled triggers that switch between panels of content in the same place, showing one panel at a time without leaving the page.",
    body: [
      {
        type: "p",
        text: "Tabs divide related content into sections that share one area of the page. A list of labels sits above (or beside) a panel, the selected label is highlighted and connected to its panel, and choosing another label swaps the content. Settings pages, detail views with Overview, Activity and Files, code samples in several languages, and product pages with Description, Specs and Reviews all use them. Tabs promise that the sections are peers: same level, any order, one visible at a time.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Three to about seven sections** of equal importance that people switch between, where stacking all of them would make a long page.",
          "**Content that does not need comparing.** If users must look at two sections together, stack them instead.",
          "**Not for steps in order**, which is a [stepper](/glossary/stepper), and not for pages with their own URLs, which should be links styled as tabs inside a `nav`.",
          "**Not for one or two sections.** A single tab is a heading; two short sections can just be two sections.",
          "For switching a value or a view mode rather than content panels, a [segmented control](/glossary/segmented-control) reads better.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The WAI-ARIA tabs pattern has three roles. The container of labels is `role=\"tablist\"`, each label is `role=\"tab\"` with `aria-selected` and `aria-controls` pointing at its panel, and each panel is `role=\"tabpanel\"` with `aria-labelledby` pointing back at its tab. The tab list is one Tab stop with a [roving tabindex](/glossary/roving-tabindex): Left and Right Arrow (Up and Down when `aria-orientation=\"vertical\"`) move between tabs, Home and End jump to the ends, and Tab moves from the selected tab into its panel.",
      },
      {
        type: "p",
        text: "There are two activation modes. Automatic activation selects a tab as soon as it receives focus, which is right when panels are cheap to show. Manual activation moves focus only and waits for Enter or Space, which is better when switching loads data or is otherwise slow. Keep the selected tab in the URL hash or a query parameter when people might share or reload a tab.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Tabs](/docs/tabs) are built on the [Base UI](/glossary/base-ui) tabs, which provide the roles and keyboard model. The active tab carries a raised thumb, or a 2px underline with `variant=\"line\"`, that glides between tabs:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProjectTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Summary, owners and status.</TabsContent>
      <TabsContent value="activity">Recent changes.</TabsContent>
      <TabsContent value="files">Attachments.</TabsContent>
    </Tabs>
  )
}`,
      },
      {
        type: "p",
        text: "Pass `value` and `onValueChange` to control the selection, and `orientation=\"vertical\"` for a side-by-side layout like [VerticalTabs](/docs/vertical-tabs). Make tab labels short nouns, keep their order stable, and avoid putting a count badge on more than one or two of them. The [SettingsLayout](/docs/settings-layout) block shows tabs used for a full settings area; more navigation patterns are in the [navigation category](/components/navigation).",
      },
      { type: "component", name: "tabs" },
      { type: "component", name: "vertical-tabs" },
    ],
    related: ["tabs", "vertical-tabs", "animated-tabs", "segmented-control", "settings-layout"],
    see: ["segmented-control", "accordion", "roving-tabindex", "stepper"],
  },

  /* ───────────────────────────── Badge ───────────────────────────── */
  {
    slug: "badge",
    term: "Badge",
    short:
      "A badge is a small, non-interactive label attached to another element that shows a status, a category or a count, such as Paid, Beta or 3 unread.",
    body: [
      {
        type: "p",
        text: "A badge is a short label in a small pill or rounded rectangle: Paid, Draft, Beta, Admin, New, or a number on an icon that counts unread messages. It annotates something else, a row, a card, a tab, a menu item, and it reads in a glance because it is short and consistently colored. Badges are among the smallest components in a kit and among the most used, which is why their variants, sizes and colors need to be decided once and reused everywhere.",
      },
      { type: "h2", text: "Kinds of badge", id: "kinds" },
      {
        type: "list",
        items: [
          "**Status badges** show the state of a record: Paid, Overdue, Running, Failed. They map to the semantic colors of the design system, such as success, warning and danger.",
          "**Category or tag badges** are neutral labels that classify: Design, Backend, Q3.",
          "**Count badges** sit on an icon or a tab and show a number, usually capped at 99+.",
          "**Dot badges** are a count badge with no number, only a colored dot meaning \"something is here\".",
          "**Environment and version badges** label a build: Production, Staging, v2.4.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "A badge is text, so most of the work is making sure the text makes sense out of context. A count badge on a bell icon needs the icon button's name to include it, \"Notifications, 3 unread\", through `aria-label` or [visually hidden](/glossary/visually-hidden) text, because a bare \"3\" means nothing. Color must never be the only signal: a status badge says Overdue in words, and a dot badge next to a name gets a hidden label such as \"Online\".",
      },
      {
        type: "p",
        text: "Badge text is small, often 11 or 12px, and small text needs the full 4.5:1 [WCAG contrast](/glossary/wcag-contrast) against the badge background, not the 3:1 allowed for large text. Tinted backgrounds like 10 percent of the accent over a white surface make this harder than it looks; check the text color against the mixed result. A badge is not a button. If it must be clickable, render it as a link or button and give it a visible focus ring.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Badge](/docs/badge) is a small pill with seven variants. Its `render` prop swaps the element, so a badge can be a link without losing its styling:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function InvoiceRow({ status, tag }: { status: "paid" | "overdue"; tag: string }) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant={status === "paid" ? "accent" : "destructive"}>{status === "paid" ? "Paid" : "Overdue"}</Badge>
      <Badge variant="outline" render={<Link href={"/tags/" + tag} />}>{tag}</Badge>
    </div>
  )
}`,
      },
      {
        type: "p",
        text: "Keep badge text to one or two words, use sentence case, and never put a badge inside a button label. For states with an icon and tone built in, use [StatusBadge](/docs/status-badge); [EnvBadge](/docs/env-badge), [VersionBadge](/docs/version-badge) and [LatencyBadge](/docs/latency-badge) cover developer tooling. See the [feedback category](/components/feedback) for the rest.",
      },
      { type: "component", name: "badge" },
      { type: "component", name: "status-badge" },
    ],
    related: ["badge", "status-badge", "env-badge", "version-badge", "latency-badge"],
    see: ["avatar", "toast-notification", "wcag-contrast", "semantic-tokens"],
  },

  /* ───────────────────────────── Avatar ───────────────────────────── */
  {
    slug: "avatar",
    term: "Avatar",
    short:
      "An avatar is a small image, usually round, that represents a person, team or organization, with initials or an icon shown when no image is available.",
    body: [
      {
        type: "p",
        text: "An avatar is the visual stand-in for an identity: a profile photo in a comment, a company logo next to an account, the stack of faces showing who is in a document. It is nearly always a circle or a rounded square at a fixed size, so lists line up and the eye can scan by face. When there is no photo, or it fails to load, the avatar falls back to initials on a tinted background, and that fallback is what most avatars in a business app actually show.",
      },
      { type: "h2", text: "Anatomy and sizes", id: "anatomy" },
      {
        type: "list",
        items: [
          "**The image**, cropped to a square and scaled to cover the circle. Request it at the rendered size times the device pixel ratio, not the original upload.",
          "**The fallback**: one or two initials, or a generic person icon for anonymous users. Derive the tint from the name so the same person always gets the same color.",
          "**A presence indicator** in one corner, such as a green dot for online, which needs its own text label.",
          "**Sizes**: a small set such as 24, 32 and 40px, plus one large size for profile pages, lined up with the text sizes they sit next to.",
          "**Groups**: overlapping avatars with a trailing +4 count when there are more than a few.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "An avatar is an image, so it needs an `alt` decision. When the person's name appears right next to it, the image is decorative and gets `alt=\"\"`, so screen readers do not hear the name twice. When the avatar is the only sign of who it is, such as an icon-only button that opens the account menu, the alt text or the button's name must carry the name. Initials in a fallback should be hidden from assistive technology with the full name provided instead, because \"MC\" is not a name. A presence dot needs [visually hidden](/glossary/visually-hidden) text such as \"Online\", and an avatar group needs a summary like \"Maya Chen, Theo Okafor and 4 others\".",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Avatar](/docs/avatar) is built on the [Base UI](/glossary/base-ui) avatar, which shows the fallback until the image has loaded and keeps it if loading fails:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Reviewer({ name, src }: { name: string; src?: string }) {
  const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("")
  return (
    <div className="flex items-center gap-2">
      <Avatar size="sm">
        <AvatarImage src={src} alt="" />
        <AvatarFallback aria-hidden>{initials}</AvatarFallback>
      </Avatar>
      <span className="text-sm">{name}</span>
    </div>
  )
}`,
      },
      {
        type: "p",
        text: "Add a `delay` of a few hundred milliseconds on the fallback when images usually load fast, so initials do not flash before the photo. [AvatarGroup](/docs/avatar-group) stacks several with an overflow count, [AvatarUpload](/docs/avatar-upload) handles the profile photo flow, and [UserChip](/docs/user-chip) pairs an avatar with a name. Browse the [media category](/components/media) for related pieces.",
      },
      { type: "component", name: "avatar" },
      { type: "component", name: "avatar-group" },
    ],
    related: ["avatar", "avatar-group", "avatar-upload", "user-chip", "presence-dot"],
    see: ["badge", "skeleton-screen", "aria", "visually-hidden"],
  },

  /* ───────────────────────────── Card ───────────────────────────── */
  {
    slug: "card",
    term: "Card",
    short:
      "A card is a bordered or shadowed container that groups a related set of content and actions into one unit, such as a product, a stat or a post.",
    body: [
      {
        type: "p",
        text: "A card is a surface that holds one thing: a product with its image and price, a metric with its trend, a blog post with its cover and excerpt, a plan with its features and a button. The border, shadow or background separates it from the page and from other cards, so a grid of cards reads as a set of comparable items. Cards are everywhere because the mental model is simple, and they are also overused, because almost anything can be put in a box.",
      },
      { type: "h2", text: "Anatomy", id: "anatomy" },
      {
        type: "list",
        items: [
          "**Media** (optional): an image or chart at the top, bleeding to the card's edges.",
          "**Header**: a title, an optional description, and an optional action such as a menu in the corner.",
          "**Content**: the body, kept short. A card is a summary; the full thing lives on its own page.",
          "**Footer**: actions or metadata, aligned to one edge.",
        ],
      },
      {
        type: "p",
        text: "Inner and outer radii should agree: an element inset by 16px inside a card with a 16px radius wants a radius near zero, and an image flush with the edge uses the card's own radius. Keep padding consistent across all cards on a page, and one card size per grid, so the layout does not look ragged.",
      },
      { type: "h2", text: "When not to use one", id: "when-not" },
      {
        type: "list",
        items: [
          "**Lists of similar rows.** A table or a plain list is denser and easier to scan than a grid of identical cards.",
          "**Cards inside cards.** Nested borders and shadows turn into noise. Use spacing and headings inside a card instead.",
          "**Long text.** Cards invite skimming; an article wants a wide column of prose.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Give each card a heading at the right level so screen reader users can jump between cards. When the whole card should be clickable, put the link on the heading and extend its hit area over the card with an absolutely positioned pseudo-element; wrapping the entire card in one anchor makes its whole content the link's name. Any other control inside, like a menu or a Like button, must sit above that pseudo-element and stay separately focusable. Decorative hairlines can stay subtle, but a card that is itself a control needs a 3:1 boundary against the page.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Card](/docs/card) is a set of [compound components](/glossary/compound-components) that share one spacing variable, so the header, content and footer line up without manual padding:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PlanCard() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Scale</CardTitle>
        <CardDescription>For teams shipping every day.</CardDescription>
        <CardAction>
          <span className="text-sm font-medium">$49/mo</span>
        </CardAction>
      </CardHeader>
      <CardContent>Unlimited projects, 10 seats, priority support.</CardContent>
      <CardFooter>
        <Button className="w-full">Choose Scale</Button>
      </CardFooter>
    </Card>
  )
}`,
      },
      {
        type: "p",
        text: "The `size=\"sm\"` variant tightens the spacing for dense dashboards, and the header is declared a [container query](/glossary/container-queries) container so its parts can be rearranged at narrow widths. Ready-made cards include [StatCard](/docs/stat-card), [ProductCard](/docs/product-card), [BlogCard](/docs/blog-card) and [PlanCard](/docs/plan-card). For a layout of cards in varied sizes, see the [bento grid](/glossary/bento-grid).",
      },
      { type: "component", name: "card" },
      { type: "component", name: "stat-card" },
    ],
    related: ["card", "stat-card", "product-card", "blog-card", "plan-card"],
    see: ["bento-grid", "compound-components", "container-queries", "glassmorphism"],
  },

  /* ───────────────────────────── Progress bar ───────────────────────────── */
  {
    slug: "progress-bar",
    term: "Progress bar",
    short:
      "A progress bar is a horizontal track that fills to show how much of a task is done, as a measured percentage or an indeterminate animation when unknown.",
    body: [
      {
        type: "p",
        text: "A progress bar shows how far along something is: an upload, an export, a multi-step signup, the storage used out of a quota, a goal against a target. The filled portion of the track maps directly to a number, which is what makes it more informative than a spinner. There is also an indeterminate form, a bar that animates without a fixed fill, for work whose size is unknown; it is a spinner in a different shape, and the same rules apply to it.",
      },
      { type: "h2", text: "Determinate or indeterminate", id: "determinate" },
      {
        type: "list",
        items: [
          "**Determinate** when you can measure progress: bytes uploaded, records processed, steps completed. Show the percentage or a count as text next to the bar.",
          "**Indeterminate** when you cannot, but expect the wait to be noticeable. Below a second or so, show nothing or a [spinner](/glossary/loading-spinner); for layouts you know, a [skeleton screen](/glossary/skeleton-screen) is better.",
          "**Static meters** such as storage used or budget spent are progress bars that do not move. HTML has a separate `meter` element for them, and they want a label with the actual numbers.",
          "**Fake progress** that crawls to 90 percent and waits is a common trick for page loads. Use it only when the real duration is short and unknowable, and never for uploads, where it lies about the data.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The element has `role=\"progressbar\"` with `aria-valuemin`, `aria-valuemax` and `aria-valuenow`, and `aria-valuetext` when a plain number would mislead, such as \"Step 2 of 4\". An indeterminate bar omits `aria-valuenow`. It needs an accessible name that says what is progressing, through `aria-labelledby` pointing at a visible label or `aria-label`. The native `<progress>` element provides all of this and is fine when you can style it enough.",
      },
      {
        type: "list",
        items: [
          "Do not announce every update. Set `aria-busy` on the region being loaded and announce completion once through a polite [live region](/glossary/live-region).",
          "The fill needs 3:1 contrast against the track, and the track against the page, so the amount is readable without the text.",
          "Under [prefers-reduced-motion](/glossary/prefers-reduced-motion), replace an indeterminate sweep with a gentle pulse or a static striped pattern.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Progress](/docs/progress) wraps the [Base UI](/glossary/base-ui) progress primitive and renders the label and value alongside the track:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

export function UploadProgress({ percent }: { percent: number }) {
  return (
    <Progress value={percent} className="max-w-sm">
      <ProgressLabel>Uploading report.pdf</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}`,
      },
      {
        type: "p",
        text: "Pass `value={null}` for an indeterminate state. [ProgressCircle](/docs/progress-circle) draws the same value as a ring, [StepProgress](/docs/step-progress) shows named steps for a [stepper](/glossary/stepper), and [QuotaBar](/docs/quota-bar) and [UsageMeter](/docs/usage-meter) cover storage and billing limits. All are in the [feedback category](/components/feedback).",
      },
      { type: "component", name: "progress" },
      { type: "component", name: "progress-circle" },
    ],
    related: ["progress", "progress-circle", "step-progress", "quota-bar", "usage-meter"],
    see: ["loading-spinner", "skeleton-screen", "stepper", "live-region"],
  },

  /* ───────────────────────────── Loading spinner ───────────────────────────── */
  {
    slug: "loading-spinner",
    term: "Loading spinner",
    short:
      "A loading spinner is a small rotating indicator that shows work is in progress when the duration is unknown, used inside buttons and for short waits.",
    body: [
      {
        type: "p",
        text: "A loading spinner is the simplest loading indicator: a rotating ring or arc that says \"something is happening\" and nothing more. It fits where there is no room or no information for anything else: inside a button after it is pressed, beside a field that is checking a username, in the corner of a panel that is refreshing. It is also the most abused indicator, because a page that is nothing but a spinner for several seconds tells the user nothing about what is loading or how long it will take.",
      },
      { type: "h2", text: "Which indicator", id: "which-indicator" },
      {
        type: "list",
        items: [
          "**Spinner** for waits of roughly one to a few seconds with unknown progress, attached to the control that caused them.",
          "**[Progress bar](/glossary/progress-bar)** when progress can be measured, or the wait is long enough that people want to know how far along it is.",
          "**[Skeleton screen](/glossary/skeleton-screen)** for first loads of a layout you already know, such as a dashboard or a feed.",
          "**Nothing** for waits under about 300ms. A spinner that flashes for a frame is worse than a short pause. Delay showing it, and once shown keep it visible for a minimum time so it does not flicker.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "A spinner is usually a CSS animation on an empty element, so it needs text. Give it `role=\"status\"` and an accessible name such as \"Loading\" or, better, \"Saving invoice\", through `aria-label` or visually hidden text. A `role=\"status\"` [live region](/glossary/live-region) is polite, so screen readers announce it once without interrupting. Mark the area being replaced with `aria-busy=\"true\"` while loading so assistive technology can skip the half-rendered content, and announce completion or move focus to the result when the spinner disappears.",
      },
      {
        type: "list",
        items: [
          "Inside a button, keep the label in place and add the spinner next to it, so the width does not jump and the name stays readable. Disable the button, or ignore repeat clicks, while the request runs.",
          "Under [prefers-reduced-motion](/glossary/prefers-reduced-motion), slow the rotation or swap in a static indicator. A fast spin is one of the motions that bother people most.",
          "Animate `transform: rotate()` only. It runs on the compositor and costs almost nothing, even with several spinners on screen.",
          "Never leave a spinner spinning after an error. Replace it with the error and a retry.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Spinner](/docs/spinner) is a bordered ring with `role=\"status\"` and a `label` for its accessible name:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function SaveButton({ save }: { save: () => Promise<void> }) {
  const [pending, setPending] = React.useState(false)
  async function onClick() {
    setPending(true)
    try {
      await save()
    } finally {
      setPending(false)
    }
  }
  return (
    <Button onClick={onClick} disabled={pending} aria-busy={pending}>
      {pending ? <Spinner size="sm" label="Saving" /> : null}
      Save changes
    </Button>
  )
}`,
      },
      {
        type: "p",
        text: "Three sizes cover inline, button and panel use. For blocking a whole panel while it refreshes, [LoadingOverlay](/docs/loading-overlay) dims the area and centers a spinner, and [LoadingTable](/docs/loading-table) shows skeleton rows instead. Both are in the [feedback category](/components/feedback).",
      },
      { type: "component", name: "spinner" },
      { type: "component", name: "loading-overlay" },
    ],
    related: ["spinner", "loading-overlay", "skeleton", "button", "loading-table"],
    see: ["skeleton-screen", "progress-bar", "prefers-reduced-motion", "live-region"],
  },

  /* ───────────────────────────── Snackbar ───────────────────────────── */
  {
    slug: "snackbar",
    term: "Snackbar",
    short:
      "A snackbar is a brief message bar at the bottom of the screen that confirms an action and can offer one follow-up, such as Undo, before it disappears.",
    body: [
      {
        type: "p",
        text: "A snackbar is Material Design's name for a short message that slides up from the bottom edge, stays for a few seconds and goes away on its own. It confirms something that just happened, \"Email archived\" or \"Connection restored\", and can carry one text action, usually Undo or Retry. In everyday use the word is interchangeable with [toast](/glossary/toast-notification); the difference is mostly where it comes from. Toast is the older, more general term, and a snackbar is a toast with Material's specific rules: bottom of the screen, one at a time, at most one action.",
      },
      { type: "h2", text: "Snackbar or toast", id: "snackbar-or-toast" },
      {
        type: "list",
        items: [
          "**Position**: snackbars sit at the bottom, centered or at the leading edge; toasts commonly stack in a top or bottom corner.",
          "**Stacking**: Material shows one snackbar at a time and queues the rest; toast libraries often stack several.",
          "**Actions**: a snackbar has at most one action; toasts frequently include a close button.",
          "**Timing**: both dismiss themselves after about four to ten seconds, longer when there is an action.",
        ],
      },
      {
        type: "p",
        text: "On a phone, a bottom snackbar is within the thumb's reach and clear of the top bar, which is why mobile-first products prefer it. On desktop, a corner toast stays out of the way of a wide content area. Pick one position for the whole product.",
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Snackbars are read through a [live region](/glossary/live-region). The container must exist in the DOM before the first message so screen readers notice the change, which is why one toaster is mounted at the root of the app. Confirmations use `role=\"status\"`; only errors that need attention use `role=\"alert\"`. Focus never moves to a snackbar, because the user is still working. The action in a snackbar must be reachable by keyboard before the timer runs out, so pause the timer while the snackbar is hovered or focused, and offer the same action somewhere persistent, since the snackbar will vanish. WCAG 2.2.1 asks that time limits can be extended, which these rules satisfy.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Toast](/docs/toast) system works as a snackbar: mount one `Toaster` in the root layout, then call `toast()` from anywhere with an optional action:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import { toast } from "@/components/ui/toast"

export async function archiveEmail(id: string, setArchived: (id: string, on: boolean) => Promise<void>) {
  await setArchived(id, true)
  toast("Email archived", {
    description: "You can find it in the Archive folder.",
    duration: 8000,
    action: { label: "Undo", onClick: () => setArchived(id, false) },
  })
}`,
      },
      {
        type: "p",
        text: "Messages stack, fan out on hover or focus, and pause their timers while expanded. Keep the text to one line, name the thing that changed, and leave form validation and persistent warnings to an [inline alert](/docs/inline-alert) or a [banner](/glossary/banner). Undo in a snackbar pairs naturally with [optimistic UI](/glossary/optimistic-ui), where the change already happened on screen. The [Next.js toast notifications guide](/guides/nextjs-toast-notifications) covers the full setup.",
      },
      { type: "component", name: "toast" },
      { type: "component", name: "inline-alert" },
    ],
    related: ["toast", "inline-alert", "banner", "notification-center"],
    see: ["toast-notification", "banner", "live-region", "optimistic-ui"],
  },

  /* ───────────────────────────── Banner ───────────────────────────── */
  {
    slug: "banner",
    term: "Banner",
    short:
      "A banner is a persistent message bar across the top of a page or section that stays visible until the situation it describes changes or the user dismisses it.",
    body: [
      {
        type: "p",
        text: "A banner is a full-width strip, usually at the top of the page or of a section, that carries a message meant to stay: your trial ends in three days, this workspace is read-only, we are investigating an outage, a new version is ready. It is the opposite of a [toast](/glossary/toast-notification). A toast reports something that just happened and goes away; a banner describes a standing condition and stays until the condition ends or the user dismisses it. Banners push the content down rather than floating over it, so nothing is hidden.",
      },
      { type: "h2", text: "Kinds of banner", id: "kinds" },
      {
        type: "list",
        items: [
          "**Announcement**: a new feature, an event, a promotion. Dismissable, and remembered as dismissed for that user.",
          "**Warning**: a trial or quota running out, an unverified email, unsaved changes. Includes the one action that resolves it.",
          "**Incident or danger**: an outage, a failed payment, a lost connection. Not dismissable until resolved.",
          "**Consent and legal**: cookie notices and terms updates, which need a clear accept action and must not block the page.",
          "**Impersonation or environment**: \"You are viewing as Maya Chen\" or \"Staging\", so no one forgets what they are looking at.",
        ],
      },
      { type: "h2", text: "Writing and placement", id: "writing" },
      {
        type: "p",
        text: "One sentence, the specific fact, and one action: \"Your trial ends on March 14. Add a payment method.\" Place page-level banners above the top bar or directly under it, and section-level banners at the top of the section they describe, such as a read-only notice above a form. Show at most one banner at a time; if two conditions apply, show the more severe and queue the other. Three colored strips stacked at the top of a page is a sign that something upstream needs fixing.",
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "A banner present when the page loads needs no special announcement; make it a landmark with `role=\"region\"` and an `aria-label` such as \"Trial notice\" so it is easy to find and skip. A banner that appears while the user is on the page, such as a lost connection, should be a [live region](/glossary/live-region): `role=\"status\"` for information, `role=\"alert\"` only for problems that need attention now. The dismiss button needs a name (\"Dismiss notice\"), and dismissing should move focus somewhere sensible, not to the top of the document. Text and icons on tinted backgrounds follow the usual [WCAG contrast](/glossary/wcag-contrast) rules, and the tone must be stated in words, not only in color.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Banner](/docs/banner) takes a `tone`, an optional `action` and an `onDismiss` that renders the close button:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import Link from "next/link"
import { Banner } from "@/components/ui/banner"
import { Button } from "@/components/ui/button"

export function TrialNotice({ endsOn }: { endsOn: string }) {
  const [shown, setShown] = React.useState(true)
  if (!shown) return null
  return (
    <Banner
      tone="warning"
      action={<Button size="sm" render={<Link href="/settings/billing" />}>Add payment method</Button>}
      onDismiss={() => setShown(false)}
    >
      Your trial ends on {endsOn}.
    </Banner>
  )
}`,
      },
      {
        type: "p",
        text: "Persist the dismissal, in the user's settings or at least in `localStorage`, so the same announcement does not return on every page load. Ready-made variants cover the common cases: [AnnouncementBar](/docs/announcement-bar), [TrialBanner](/docs/trial-banner), [IncidentBanner](/docs/incident-banner), [OfflineBanner](/docs/offline-banner) and [CookieBanner](/docs/cookie-banner), all in the [feedback category](/components/feedback).",
      },
      { type: "component", name: "banner" },
      { type: "component", name: "incident-banner" },
    ],
    related: ["banner", "announcement-bar", "incident-banner", "trial-banner", "cookie-banner"],
    see: ["snackbar", "toast-notification", "live-region", "empty-state"],
  },

  /* ───────────────────────────── Timeline ───────────────────────────── */
  {
    slug: "timeline",
    term: "Timeline",
    short:
      "A timeline is a vertical list of events in time order, each with a marker on a shared line, a timestamp and a short description, as in an activity feed.",
    body: [
      {
        type: "p",
        text: "A timeline lays out events along a line so their order in time is visible: a project's history, an order's journey from placed to delivered, an audit log of who changed what, a release changelog, a company's milestones. Each entry has a marker on the line, a time, a title and often a line of detail. The line is the point. It tells the reader that these items belong to one sequence and that reading down means moving through time.",
      },
      { type: "h2", text: "Design decisions", id: "decisions" },
      {
        type: "list",
        items: [
          "**Direction.** Feeds and logs run newest first, because the latest event is what people came for. Histories, processes and roadmaps run oldest first, because the story reads forward.",
          "**Time labels.** Use relative times (\"2 hours ago\") for recent events and absolute dates for older ones, and expose the full timestamp on hover or focus. Group entries under day headings when a day has many events.",
          "**Markers.** A dot is enough. Icons or avatars on the markers help when the actor or the kind of event matters, such as a deploy versus a comment.",
          "**Density.** Keep each entry to a title and one line. Long content belongs behind an expand control or on a detail page.",
          "**Not for steps.** A list of steps the user must complete is a [stepper](/glossary/stepper), with a current step and a way forward.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Markup matters more than it seems. Use an ordered list, since order is the meaning, and put the time in a `time` element with a machine-readable `datetime` attribute so assistive technology and crawlers can read the real date behind \"yesterday\". Markers and the line are decorative; draw them with CSS or mark them `aria-hidden`. If entries have headings, use real heading elements so screen reader users can jump between events. For feeds that grow, announce new entries through a polite [live region](/glossary/live-region) or let the user load them, rather than reshuffling the list under them.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [Timeline](/docs/timeline) renders an ordered list on a hairline with a marker, a title, a `time` and a description per entry. It does not sort; pass entries in the order they should read:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { Timeline, type TimelineItem } from "@/components/ui/timeline"

const EVENTS: TimelineItem[] = [
  { title: "Invoice INV-2041 paid", description: "$12,400 via bank transfer", time: "09:41" },
  { title: "Reminder sent", description: "To billing@northwind.com", time: "Mar 10" },
  { title: "Invoice issued", description: "By Maya Chen", time: "Mar 1" },
]

export function InvoiceHistory() {
  return <Timeline items={EVENTS} />
}`,
      },
      {
        type: "p",
        text: "[RelativeTime](/docs/relative-time) formats \"3h ago\" while carrying the exact ISO timestamp for machines, [ActivityFeed](/docs/activity-feed) adds actors and avatars, and [AuditTrail](/docs/audit-trail) is the bordered, newest-first version for audit logs. Timelines usually sit in a [dashboard](/components/dashboard) detail pane, loading older entries with a Load more button rather than [infinite scroll](/glossary/infinite-scroll).",
      },
      { type: "component", name: "timeline" },
      { type: "component", name: "activity-feed" },
    ],
    related: ["timeline", "activity-feed", "audit-trail", "relative-time", "changelog-page"],
    see: ["stepper", "infinite-scroll", "live-region", "skeleton-screen"],
  },

  /* ───────────────────────────── Tree view ───────────────────────────── */
  {
    slug: "tree-view",
    term: "Tree view",
    short:
      "A tree view is a nested list of expandable nodes, like a file explorer, where each branch can be opened to reveal its children and collapsed to hide them.",
    body: [
      {
        type: "p",
        text: "A tree view shows hierarchical data as indented, collapsible branches: folders and files, an organization chart, a table of contents, categories and subcategories, a component tree in dev tools. Each node with children has a disclosure arrow; opening it reveals the children one level deeper, and the indentation shows depth. The pattern lets people navigate thousands of items by opening only the branches they care about, which is why it survives in every IDE, file manager and admin console.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Real hierarchies** three or more levels deep that users browse, such as files, pages or nested settings.",
          "**Not for flat lists with categories.** Two levels is a list with group headings, or an [accordion](/glossary/accordion).",
          "**Not for navigation menus** with a few sub-items; a [nested nav](/docs/nested-nav) with disclosure buttons is simpler and keeps link semantics.",
          "**Selection** can be single (the current file) or multiple with checkboxes (choosing folders to sync). Decide which before building, since the keyboard model differs.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The WAI-ARIA tree view pattern is one of the more demanding ones. The container has `role=\"tree\"`, each node is `role=\"treeitem\"`, child lists are `role=\"group\"`, and expandable nodes carry `aria-expanded`. Selected nodes use `aria-selected`. The tree is a single Tab stop with a [roving tabindex](/glossary/roving-tabindex), and the arrow keys do the navigating:",
      },
      {
        type: "list",
        items: [
          "Down and Up Arrow move to the next and previous visible node, across branches.",
          "Right Arrow opens a closed node, or moves to its first child when it is already open. Left Arrow closes an open node, or moves to the parent when it is closed.",
          "Home and End jump to the first and last visible node. Typing a character jumps to the next node starting with it.",
          "Enter activates the node; Space toggles selection in a multi-select tree.",
          "Asterisk expands every sibling of the focused node.",
        ],
      },
      {
        type: "p",
        text: "Depth and position are conveyed by the nesting of groups, or explicitly with `aria-level`, `aria-setsize` and `aria-posinset` when the DOM is flattened for [virtual scrolling](/glossary/virtual-scrolling). Icons on nodes are decorative; the node's text is its name.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [TreeView](/docs/tree-view) renders the tree, treeitem and group roles with `aria-expanded` from a nested array of nodes:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { TreeView, type TreeNode } from "@/components/ui/tree-view"

const NODES: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      { id: "app", label: "app", children: [{ id: "layout", label: "layout.tsx" }] },
      { id: "components", label: "components", children: [{ id: "button", label: "button.tsx" }] },
    ],
  },
  { id: "package", label: "package.json" },
]

export function SourceTree() {
  return <TreeView nodes={NODES} />
}`,
      },
      {
        type: "p",
        text: "Load children lazily for large trees by fetching a branch when it is first opened, and keep open state in a map keyed by node id so it survives re-renders and data refreshes. Past a few thousand visible nodes, flatten the visible rows and virtualize them. [FileTree](/docs/file-tree) adds file icons, git status and the full tree keyboard model above, and [OrgChart](/docs/org-chart) draws a hierarchy as boxes with arrow key navigation. See the [navigation category](/components/navigation) for more.",
      },
      { type: "component", name: "tree-view" },
      { type: "component", name: "file-tree" },
    ],
    related: ["tree-view", "file-tree", "nested-nav", "org-chart", "collapsible"],
    see: ["accordion", "roving-tabindex", "aria", "virtual-scrolling"],
  },
]
