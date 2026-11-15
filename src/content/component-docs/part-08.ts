import type { ComponentDocsContent } from "../types"

export const PART_08: Record<string, ComponentDocsContent> = {
  "audit-filter-bar": {
    faq: [
      {
        q: "How do I read the filter values to query my audit log API?",
        a: "Each control reports through its own callback: `onSearchChange(query)` on every keystroke and with `\"\"` when cleared, `onActorChange(value)` with the chip's `value`, and `onRangeChange({ from, to })` with ISO day strings such as `\"2026-11-01\"`. Keep them in state and refetch. The search fires per keystroke, so debounce it before calling the API.",
      },
      {
        q: "Can I reset all the filters from a button?",
        a: "Only the actor can be set from outside, with `actor` and `onActorChange`. The search field and the date range hold their own state and take no value prop. To reset everything, remount the bar with a new `key`, or build the row yourself from [`SearchInput`](/docs/search-input), [`ChipFilter`](/docs/chip-filter) and [`DateRangePicker`](/docs/date-range-picker).",
      },
      {
        q: "How do I change the actor chips?",
        a: "Pass `actorOptions` as `{ value, label }[]`. The first option starts selected unless you pass `defaultActor`, so put your \"everyone\" choice first. Without `actorOptions` the chips are All actors, Admins and System.",
      },
      {
        q: "Does the date range stop the end date coming before the start?",
        a: "No. The two native date inputs are independent and have no `min` or `max`, so `to` can be earlier than `from`. Swap or reject the range in `onRangeChange` before you query.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves from the search field to the selected actor chip, then to the start and end date inputs." },
      { keys: "Escape", action: "In the search field, clears the text and keeps focus there." },
      { keys: "ArrowRight / ArrowDown", action: "In the actor chips, selects the next chip, wrapping to the first." },
      { keys: "ArrowLeft / ArrowUp", action: "In the actor chips, selects the previous chip, wrapping to the last." },
      { keys: "Home / End", action: "In the actor chips, selects the first or last chip." },
    ],
    a11y: [
      "The bar has `role=\"search\"` and the name \"Filter audit log\", so it is listed as a search landmark.",
      "The search field is labelled \"Search audit log\". Its clear button is labelled \"Clear search\" and only renders while there is text.",
      "The actor chips are a `radiogroup` named \"Actor\". Each chip has `role=\"radio\"` and `aria-checked`, and only the selected chip is in the Tab order.",
      "The dates sit in a group named \"Date range\", with inputs labelled \"Start date\" and \"End date\".",
    ],
  },

  "audit-log-entry": {
    faq: [
      {
        q: "What does the `date` prop accept?",
        a: "A `Date` or any string `new Date()` parses; ISO 8601, such as `\"2026-11-14T09:12:00Z\"`, is safest. An invalid string renders no time at all. If you leave `date` out, the entry shows a sample time two hours ago, so always pass it with real data.",
      },
      {
        q: "Does \"4m ago\" update while the page is open?",
        a: "No. The entry renders [`RelativeTime`](/docs/relative-time) without `live`, so the label only changes when the entry re-renders. For a ticking label, build the row with `RelativeTime live` yourself.",
      },
      {
        q: "How should I write `action` and `target`?",
        a: "The line reads actor, action, target, so write `action` to follow a name (`\"approved refund on\"`) and put the record in `target`, which is shown in medium weight. Leave `target` out when the action is complete on its own, such as `\"exported customers to CSV\"`.",
      },
    ],
    a11y: [
      "The time is a `<time>` element with the exact ISO timestamp in `dateTime` and the full local date in `title`, while the visible text is relative.",
      "The initials avatar is `aria-hidden`, so the actor's name is read once, from the text.",
      "The entry is a plain `div`. Put entries in a `ul` with `li` items if screen readers should announce how many there are.",
    ],
  },

  "audit-trail": {
    faq: [
      {
        q: "Does AuditTrail sort entries newest first?",
        a: "No. It renders `entries` in the order you pass them. Sort on the server (`ORDER BY created_at DESC`) or copy and sort the array before you pass it.",
      },
      {
        q: "How do I page or filter a long audit log?",
        a: "AuditTrail has no paging, loading or empty state; it renders every entry. Filter with [`AuditFilterBar`](/docs/audit-filter-bar), slice the array per page with [`TablePagination`](/docs/table-pagination) underneath, and move to [`DataTable`](/docs/data-table) when people need to sort by column.",
      },
      {
        q: "What happens when `entries` is an empty array?",
        a: "You get an empty bordered box. Only an omitted `entries` shows the five sample rows. Check the length and render your own \"No activity in this range\" message instead.",
      },
      {
        q: "Can a Server Component pass the entries?",
        a: "Yes. The file is marked `\"use client\"`, but `entries` is plain data, so a Server Component can pass rows with ISO `time` strings. The relative labels are worked out on both server and client, and the `<time>` element suppresses the hydration warning if they differ by a minute.",
      },
    ],
    a11y: [
      "Each entry has a `<time>` element with the ISO timestamp in `dateTime`; the visible text is relative, such as \"38m ago\".",
      "Entries are `div`s inside a `div`, not list items, so screen readers do not announce a count.",
      "Avatars are `aria-hidden` initials; each actor's name is read from the text.",
    ],
  },

  "bulk-actions-bar": {
    faq: [
      {
        q: "How do I hide the bar after an action?",
        a: "It renders nothing when `count` is 0 or less. Clear your selection when the action finishes and pass its size, for example `count={selected.size}`. The Clear button only appears when you pass `onClear`.",
      },
      {
        q: "Why does the bar not stay at the bottom of the screen?",
        a: "It is `sticky bottom-4`, so it sticks to the bottom of its nearest scrolling ancestor and only while its parent is in view. Render it right after the table in the same container. To pin it to the viewport instead, add `className=\"fixed inset-x-0 bottom-4\"`.",
      },
    ],
    a11y: [
      "The bar has `role=\"region\"` and is named by `label`, \"Bulk actions\" by default.",
      "The \"3 selected\" text has `role=\"status\"`, so later changes to the count are announced. The bar unmounts at 0, so the first \"1 selected\" arrives together with its live region, which some screen readers do not announce.",
      "Focus does not move to the bar when it appears. Keyboard users reach it by tabbing past the table, so keep it right after the table in the DOM.",
    ],
  },

  "column-visibility-menu": {
    faq: [
      {
        q: "How do I connect it to DataTable?",
        a: "Keep the visible ids in state with `visible={visible} onChange={setVisible}`, then pass `columns={columns.filter((c) => visible.includes(c.id))}` to `DataTable`. The ids always come back in the order of `columns`, whatever order they were clicked in, so the table never reorders.",
      },
      {
        q: "How do I remember the chosen columns between visits?",
        a: "The menu stores nothing. Save the array from `onChange`, for example in `localStorage` or the user's settings, and pass it back as `visible`. `defaultVisible` is only read on the first render, so it cannot load a value that arrives later.",
      },
      {
        q: "Can I stop people hiding a required column such as Name?",
        a: "There is no per-item disabled option. Leave that column out of the menu's `columns` and always keep it in your filter: `columns.filter((c) => c.id === \"name\" || visible.includes(c.id))`.",
      },
      {
        q: "Does the menu close after each toggle?",
        a: "No. Base UI checkbox items keep the menu open (`closeOnClick` is false), so people can toggle several columns in one go. Escape or a click outside closes it.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space / ArrowDown", action: "On the Columns button, opens the menu." },
      { keys: "ArrowDown / ArrowUp", action: "Moves between the columns, wrapping at the ends." },
      { keys: "Home / End", action: "Moves to the first or last column." },
      { keys: "Enter / Space", action: "Shows or hides the focused column. The menu stays open." },
      { keys: "Escape", action: "Closes the menu and returns focus to the Columns button." },
    ],
    a11y: [
      "Each column is a Base UI checkbox item with `role=\"menuitemcheckbox\"` and `aria-checked`.",
      "The \"Toggle columns\" label is a Base UI group label, so the group of checkboxes is named by it.",
      "The columns icon on the trigger is `aria-hidden`, so the button's name is the `label` text, \"Columns\" by default.",
    ],
  },

  "data-table": {
    faq: [
      {
        q: "How do I sort or select on the server?",
        a: "Control the state: pass `sort` with `onSortChange` (and `selected` with `onSelectedChange`), fetch in the callback, and pass the result as `data`. A header only becomes a sort button when its column has `sortValue`, and DataTable also sorts the rows it receives by that value, so return something that matches your server's order. There is no built-in paging: put [`TablePagination`](/docs/table-pagination) under it.",
      },
      {
        q: "Why do the wrong rows stay selected after filtering or refetching?",
        a: "`getRowId` defaults to the row's index, and selection is stored as ids. When the data changes, a different row takes that index and inherits its selection. Pass a stable id: `getRowId={(r) => r.id}`.",
      },
      {
        q: "How do I show loading, empty and error states?",
        a: "`loading` replaces the body with five skeleton rows and sets `aria-busy` on the table. An empty `data` array shows \"No results\" and a hint, or whatever you pass to `empty`. There is no error prop: pass `data={[]}` and put the error message and a retry button in `empty`.",
      },
      {
        q: "How do I add row actions or open a row on click?",
        a: "`rowActions={(row) => ...}` adds a last column whose content shows on hover or focus, and always on touch screens. `onRowClick` makes each row focusable and fires on click or Enter. Clicks on the checkbox and actions cells do not trigger it.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the select-all checkbox, the sort buttons, then each row's checkbox, the row itself when `onRowClick` is set, and its actions." },
      { keys: "Enter / Space", action: "On a sort button, cycles that column: ascending, descending, then unsorted." },
      { keys: "Space", action: "On a checkbox, selects or clears that row, or every row from the header." },
      { keys: "Enter", action: "On a focused row, calls `onRowClick` with that row." },
    ],
    a11y: [
      "Sortable headers get `aria-sort` set to \"ascending\", \"descending\" or \"none\". Columns without `sortValue` get no `aria-sort`, and the sort arrows are `aria-hidden`.",
      "`caption` renders a visually hidden `<caption>` that names the table. Without it the table has no accessible name.",
      "The header checkbox is labelled \"Select all rows\" and reports `aria-checked=\"mixed\"` when only some rows are selected. Row checkboxes are labelled \"Select row\" plus the row id, so without `getRowId` they read \"Select row 0\", \"Select row 1\".",
      "The bulk bar has `role=\"toolbar\"` and the name \"Bulk actions\", with a \"Clear selection\" button. Its count is not a live region, so selection changes are not announced. The bar's rise-in and the skeleton pulse are CSS animations that the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "density-toggle": {
    faq: [
      {
        q: "How do I connect DensityToggle to DataTable's `density` prop?",
        a: "DataTable takes `\"compact\"` (36px rows), `\"default\"` (44px) or `\"comfortable\"` (56px), while DensityToggle only gives `\"compact\"` or `\"comfortable\"`. Pass it straight through for 36 and 56px rows, or map comfortable to the middle size: `density={d === \"compact\" ? \"compact\" : \"default\"}`.",
      },
      {
        q: "Can I add a third option or rename the labels?",
        a: "Not with props: \"Compact\" and \"Comfortable\" are fixed in the file, and so is the group name \"Density\". Copy the file and add another `<Toggle value=\"...\">`, or use [`SegmentedControl`](/docs/segmented-control) for a custom set.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus into the group. Only one option is in the Tab order." },
      { keys: "ArrowLeft / ArrowRight", action: "Moves focus to the other option, wrapping at the ends. It does not select." },
      { keys: "Home / End", action: "Moves focus to Compact or Comfortable." },
      { keys: "Enter / Space", action: "Selects the focused option." },
    ],
    a11y: [
      "The root is a Base UI ToggleGroup with `role=\"group\"` and `aria-label=\"Density\"`.",
      "Each option is a `<button>` with `aria-pressed`, so screen readers announce whether each option is pressed.",
      "The pressed style is a CSS colour transition, which the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "empty-table": {
    faq: [
      {
        q: "Should I render EmptyTable inside DataTable's `empty` prop?",
        a: "Usually not. EmptyTable has its own dashed border and padding, and DataTable already draws a bordered box, so the two borders stack. Render it instead of the table: `{rows.length ? <DataTable ... /> : <EmptyTable ... />}`, and pass a short message to DataTable's `empty` for zero search results.",
      },
      {
        q: "How do I make the button go to a create page?",
        a: "The action is always a `<button type=\"button\">` that calls `onAction`; there is no `href`. Call `router.push(\"/invoices/new\")` in `onAction`, or copy the file and give the Button `render={<Link href=\"/invoices/new\" />}`.",
      },
    ],
    a11y: [
      "The title is an `<h3>`, fixed in the file. Change the tag if your page needs another heading level.",
      "It is not a live region. If it replaces rows after a delete, screen readers are not told; add a `role=\"status\"` message yourself.",
      "The button only renders when `actionLabel` is set, so there is never an unlabelled button.",
    ],
  },

  "expandable-row": {
    faq: [
      {
        q: "Is the panel content in the DOM while the row is closed?",
        a: "No. The panel `div` stays with `hidden`, but `children` are not rendered while closed. Find in page cannot reach that text, and state inside the panel, such as a half-filled form, resets each time it closes. Use [`Accordion`](/docs/accordion) with `keepMounted` or `hiddenUntilFound` when that matters.",
      },
      {
        q: "How do I build Expand all for a list of rows?",
        a: "Control each row: keep a `Set` of open ids, pass `open={openIds.has(id)}` and update the set in `onOpenChange`. Expand all then sets every id, and Collapse all clears the set.",
      },
      {
        q: "Can I use ExpandableRow inside a `<table>`?",
        a: "No. It renders `div`s and a `button`, not a `<tr>`. In [`Table`](/docs/table), add a second `TableRow` under the row with one cell spanning every column, and toggle it from a button with `aria-expanded`. `TableRow` tints any row that contains an element with `aria-expanded`.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "Opens or closes the panel." },
      { keys: "Tab", action: "Moves from the header into the open panel's links and fields, then on to the next row." },
    ],
    a11y: [
      "The header is a native `<button>` with `aria-expanded` and `aria-controls` pointing at the panel's id.",
      "The button is not inside a heading, unlike `AccordionTrigger`, so rows do not appear in a screen reader's list of headings.",
      "The chevron is `aria-hidden`. Its turn is a CSS transition, which the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "filter-bar": {
    faq: [
      {
        q: "Does the Clear button empty the text field?",
        a: "Only if you control it. Clear just calls your `onClear`, so with `query` and `onQueryChange`, set the query to `\"\"` there along with your other filters. Without `query` the field is uncontrolled, and Clear leaves its text in place.",
      },
      {
        q: "Does FilterBar filter my rows?",
        a: "No. It renders the controls and reports the text through `onQueryChange` on every keystroke. Filter the rows yourself, for example `rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()))`, and debounce if each change calls an API.",
      },
    ],
    keyboard: [
      { keys: "Escape", action: "In the text field, clears the text and keeps focus there." },
      { keys: "Tab", action: "Moves from the text field through your filter controls to Clear." },
    ],
    a11y: [
      "The strip has `role=\"group\"` and the name \"Filters\".",
      "The text field is `type=\"search\"` and always labelled \"Filter\"; `placeholder` only changes the visible hint. Two FilterBars on one page share both names.",
      "The clear (X) icon inside the field is a button labelled \"Clear search\" that renders only while there is text.",
    ],
  },

  "infinite-scroll": {
    faq: [
      {
        q: "How do I use InfiniteScroll with a cursor-based API?",
        a: "`loadMore(page)` receives a 0-based page number and must resolve `{ items, hasMore }`. For cursors, keep the last cursor in a ref inside your loader and return `hasMore: Boolean(res.nextCursor)`. The latest `loadMore` is read from a ref, so an inline function does not reset anything.",
      },
      {
        q: "What happens when a page fails to load?",
        a: "Throw or reject in `loadMore`. The list shows \"Could not load more.\" with a Retry button, and stops watching the scroll until Retry is pressed, so a failing API is not called on every scroll.",
      },
      {
        q: "How do I start over when the search or filters change?",
        a: "There is no reset prop; the items and page number are internal state. Remount it with a key: `<InfiniteScroll key={query} loadMore={...} />` loads from page 0 again.",
      },
      {
        q: "Why does it scroll inside a box instead of the page?",
        a: "The component is its own scroll container (`h-80 overflow-y-auto`), and the IntersectionObserver uses that box as its root. Change the height with `className`, such as `className=\"h-[600px]\"`. Scrolling the window instead means changing the observer's `root` in your copy.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the scroll box, then moves through focusable content in the items and on to the Load more or Retry button." },
      { keys: "ArrowUp / ArrowDown", action: "With the scroll box focused, scrolls the list." },
      { keys: "Enter / Space", action: "On Load more, fetches the next page. On Retry, repeats the failed request." },
    ],
    a11y: [
      "The scroll box is a focusable `role=\"region\"` with a focus ring, so it can be scrolled from the keyboard even when the items hold nothing focusable.",
      "The region and the `ul` inside it are both named by `label` (\"Results\" by default). The `ul` has `aria-busy` while a page loads.",
      "The status line is `aria-live=\"polite\"`, so \"Loading more\", \"Could not load more.\" and \"You have reached the end\" are announced.",
      "The scroll sentinel is `aria-hidden`; keyboard and screen reader users load pages with the real Load more button instead.",
    ],
  },

  "inline-cell-edit": {
    faq: [
      {
        q: "How do I save an edit to the server and handle failure?",
        a: "`onChange` gets the new string after Enter or blur, and only if it changed. The cell then shows the `value` prop again, so the new text appears only once your parent passes it back. Update your rows optimistically in `onChange`, and put the old value back if the request fails.",
      },
      {
        q: "Can I edit numbers or dates, or validate the input?",
        a: "The field is always a text [`Input`](/docs/input) and there is no validation; `onChange` receives a string. Parse it there and ignore bad input, and the cell keeps showing the old `value`. For a fixed set of choices, put a [`Select`](/docs/select) in the cell instead.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the cell, starts editing and focuses the text field." },
      { keys: "Enter", action: "In the field, saves the edit and returns focus to the cell." },
      { keys: "Escape", action: "In the field, cancels, restores the old text and returns focus to the cell." },
      { keys: "Tab", action: "In the field, saves the edit (blur commits) and moves on." },
    ],
    a11y: [
      "At rest the cell is a `<button>` named `label` plus the value, such as \"Customer name: Northwind\". An empty cell reads \"Customer name: Edit\", using `placeholder`.",
      "The edit field is labelled by `label` and gets focus with `autoFocus` as soon as it appears.",
      "Focus returns to the cell after Enter or Escape. After a blur it stays wherever the person clicked or tabbed.",
    ],
  },

  "loading-table": {
    faq: [
      {
        q: "Should I use LoadingTable or DataTable's `loading` prop?",
        a: "If DataTable is already on screen, set `loading`: it keeps the real header and shows five skeleton rows. LoadingTable is for when the table itself has not rendered yet, such as a Suspense fallback or a route's loading screen.",
      },
      {
        q: "Can I use it in a Next.js `loading.tsx`?",
        a: "Yes. It holds no state, so `export default function Loading() { return <LoadingTable rows={8} cols={5} /> }` works. The file is marked `\"use client\"`, which a Server Component can still render.",
      },
      {
        q: "Can I set different column widths?",
        a: "No. Every row is a CSS grid of `cols` equal columns, `repeat(cols, minmax(0, 1fr))`, and each bar has a fixed width capped at the column. Copy the file and change `gridTemplateColumns` to match a table with one wide column.",
      },
    ],
    a11y: [
      "The root has `role=\"status\"`, `aria-busy=\"true\"` and `aria-label` (\"Loading table\" by default), so screen readers hear one message.",
      "The header and every skeleton row are `aria-hidden`, so the empty cells are not read out.",
      "The shimmer comes from [`Skeleton`](/docs/skeleton), which hides it with `motion-reduce:after:hidden` under `prefers-reduced-motion: reduce`.",
    ],
  },

  "query-builder": {
    faq: [
      {
        q: "How do I turn the clauses into an API query?",
        a: "`onChange` gives the whole `Clause[]` (`{ id, field, op, value }`) after every edit, add and remove. Map it yourself, and skip clauses with an empty `value`: a new row starts with the first field, the first operator and no value.",
      },
      {
        q: "Can I combine clauses with OR or nest groups?",
        a: "No. Every clause after the first is joined by AND, and there is no grouping. Add an OR mode in your copy of the file if you need it.",
      },
      {
        q: "Can the value be a dropdown or a date?",
        a: "Not with props. The value is always a text input, and `fields` and `operators` are plain string arrays, with the same operators offered for every field. Copy the file to render a different input per field.",
      },
      {
        q: "Will the clauses submit with a form?",
        a: "No. The selects and the input have no `name`, so `FormData` does not include them. Add `<input type=\"hidden\" name=\"filters\" value={JSON.stringify(clauses)} />` next to a controlled QueryBuilder.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through each clause's field, operator, value and remove button, then to Add filter." },
      { keys: "ArrowDown / ArrowUp", action: "On a field or operator, the browser's native `<select>` keys apply: the arrows change the option, or open the list on macOS." },
      { keys: "Enter / Space", action: "On a remove button, deletes that clause and moves focus to Add filter." },
    ],
    a11y: [
      "Each clause is a `role=\"group\"` named \"Filter 1\", \"Filter 2\", and so on.",
      "The two selects have visually hidden `<label>`s, \"Field\" and \"Operator\", and the text input has `aria-label=\"Value\"`.",
      "Remove buttons are labelled \"Remove filter 2\". After a removal, focus moves to Add filter instead of being lost with the deleted row.",
    ],
  },

  "row-selection": {
    faq: [
      {
        q: "How do I build a select-all checkbox with the indeterminate state?",
        a: "Work out both flags from your selection: `const all = rows.length > 0 && rows.every((r) => selected.has(r.id))` and `const some = !all && rows.some((r) => selected.has(r.id))`. Then render `<RowSelection checked={all} indeterminate={some} onCheckedChange={(on) => setSelected(on ? new Set(rows.map((r) => r.id)) : new Set())} aria-label=\"Select all rows\" />`.",
      },
      {
        q: "Can I shift-click to select a range?",
        a: "Not directly. `onCheckedChange` only receives a boolean, not the event, so you cannot read `shiftKey`. Track the shift key with a `keydown`/`keyup` listener, or use a plain [`Checkbox`](/docs/checkbox), whose callback gets event details.",
      },
      {
        q: "Does RowSelection submit with a form?",
        a: "No. It passes no `name` or `value` to the checkbox, so nothing is submitted. Keep the selected ids in state and send them yourself.",
      },
    ],
    keyboard: [
      { keys: "Space", action: "Selects or clears the row. Enter does nothing, which is how Base UI checkboxes behave." },
      { keys: "Tab", action: "Moves to the next checkbox or focusable cell." },
    ],
    a11y: [
      "It renders a Base UI checkbox: a `span` with `role=\"checkbox\"` and `aria-checked`, which becomes `\"mixed\"` when `indeterminate` is set.",
      "The default name is \"Select row\" for every row. Pass a specific one, such as `aria-label={\"Select \" + row.name}`.",
      "The box is 16px with a 44px hit area, and `TableHead`/`TableCell` drop their right padding when they contain a `role=\"checkbox\"`.",
    ],
  },

  "saved-views": {
    faq: [
      {
        q: "How do I keep the selected view in the URL?",
        a: "Control it: `value={searchParams.get(\"view\") ?? \"mine\"}` and `onChange={(id) => router.replace(\"?view=\" + id)}`. Without `value`, it starts on `defaultValue` or the first view.",
      },
      {
        q: "Why does each arrow key press change the view?",
        a: "Selection follows focus: Up, Down, Home and End move and select in one step, so `onChange` fires on every key press. If loading a view is slow, wrap the update in `startTransition` or debounce the fetch.",
      },
      {
        q: "Can views have icons, or be renamed and deleted?",
        a: "No. A view is `{ id, name, count? }` and the list has no actions. Put rename and delete in a [`DropdownMenu`](/docs/dropdown-menu) next to the list, or copy the file to add icons.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the selected view. The list is a single Tab stop." },
      { keys: "ArrowDown / ArrowUp", action: "Moves to the next or previous view and selects it. Stops at the ends." },
      { keys: "Home / End", action: "Moves to the first or last view and selects it." },
      { keys: "Enter / Space", action: "Selects the focused view." },
    ],
    a11y: [
      "The list has `role=\"listbox\"` with `aria-orientation=\"vertical\"`, named by `aria-label` (\"Saved views\" by default).",
      "Each view is a `<button>` with `role=\"option\"` and `aria-selected`.",
      "The count is plain text inside the option, so a view is read as \"My open 12\".",
    ],
  },

  "sortable-header": {
    faq: [
      {
        q: "How do I cycle between unsorted, ascending and descending?",
        a: "SortableHeader keeps no state; `onToggle` just fires on click. Keep `{ column, dir }` in state so only one column is sorted, and step it: `dir === false ? \"asc\" : dir === \"asc\" ? \"desc\" : false`.",
      },
      {
        q: "Do I need it with DataTable?",
        a: "No. DataTable renders its own sort buttons for every column with `sortValue`. SortableHeader is for a hand-built [`Table`](/docs/table).",
      },
    ],
    a11y: [
      "It is a native `<button type=\"button\">`. When sorted, it appends visually hidden text, \", sorted ascending\" or \", sorted descending\", to `label`.",
      "The arrow icons are `aria-hidden`. `data-sort` is `\"asc\"` or `\"desc\"` for styling.",
      "It cannot set `aria-sort` on the header cell; you set that on `TableHead`.",
    ],
  },

  "sticky-column": {
    faq: [
      {
        q: "Why does my sticky column scroll away?",
        a: "Sticky positioning needs the column to sit inside the element that scrolls sideways (`overflow-x-auto`), with no element in between that has its own overflow. The row also has to be wider than the scroll box, for example with `min-w-[800px]` on the scrolling content.",
      },
      {
        q: "Can I pin columns on both sides?",
        a: "Yes. Use one `StickyColumn` at the start of each row and one with `side=\"right\"` at the end, for example for names on the left and actions on the right. The right one gets its hairline on the left edge.",
      },
    ],
    a11y: [
      "It adds no role or ARIA. Reading and Tab order follow the DOM, so put the pinned cell first in the source if it should be read first.",
      "It has an opaque `bg-surface`, so content scrolling underneath never overlaps the pinned text.",
    ],
  },

  table: {
    faq: [
      {
        q: "When should I use Table instead of DataTable?",
        a: "Table is styled markup with no state: invoice lines, reports and server-rendered lists. [`DataTable`](/docs/data-table) takes `columns` and `data` and adds sorting, row selection, loading and empty states. Start with Table and add [`SortableHeader`](/docs/sortable-header) or [`RowSelection`](/docs/row-selection) only where you need them.",
      },
      {
        q: "Can I render Table in a Server Component?",
        a: "Yes. The file is marked `\"use client\"` but has no state or effects, so a Server Component can map rows from the database into `TableRow`s. Only interactive cells, such as an [`InlineCellEdit`](/docs/inline-cell-edit), need client code.",
      },
      {
        q: "How do I get a sticky header?",
        a: "Not with `sticky top-0` against the page: Table wraps the `<table>` in a `div` with `overflow-x-auto`, which becomes the scroll container. Use [`DataTable`](/docs/data-table) with `maxHeight`, which fixes the height and makes the header sticky inside it.",
      },
      {
        q: "Why does long text not wrap?",
        a: "`TableHead` and `TableCell` are `whitespace-nowrap`, and the table scrolls sideways on narrow screens instead. Add `className=\"whitespace-normal\"` to cells that hold sentences.",
      },
    ],
    a11y: [
      "It renders native `<table>`, `<thead>`, `<tbody>`, `<th>` and `<td>`, so screen readers can move by row and column.",
      "`TableCaption` renders a real `<caption>`, shown under the table, which names it.",
      "Mark a selected row with `aria-selected` or `data-selected`; both get the `bg-sunken` fill.",
      "The scroll wrapper has `tabIndex={0}` and a focus ring, so a wide table can be scrolled sideways with the arrow keys even when it has no links or buttons. It adds one Tab stop before the table's own controls.",
    ],
  },

  "table-pagination": {
    faq: [
      {
        q: "How do I paginate rows on the client?",
        a: "Slice the rows: `rows.slice((page - 1) * size, page * size)`, with `pageCount={Math.ceil(rows.length / size)}`. Reset `page` to 1 when filters change.",
      },
      {
        q: "What happens if `page` is past the last page?",
        a: "It is clamped for display and stepping. With `page={4}` and `pageCount={2}` it reads \"Page 2 of 2\", Next is disabled, and Previous calls `onPageChange(1)`. Your own state still holds 4, so slice your rows with the clamped page too, or reset it when the data shrinks.",
      },
      {
        q: "Can it show page numbers, a page size picker or \"1-20 of 312\"?",
        a: "No. It has Previous, Next and \"Page 2 of 9\". Put a [`Select`](/docs/select) for page size next to it, and use [`Pagination`](/docs/pagination) for numbered page links.",
      },
      {
        q: "How do I keep the page in the URL?",
        a: "It is controlled, so read it from the URL: `page={Number(searchParams.get(\"page\") ?? 1)}` and `onPageChange={(p) => router.push(\"?page=\" + p)}`.",
      },
    ],
    a11y: [
      "The root is a `<nav aria-label=\"Pagination\">`. A second one on the same page gets the same name.",
      "\"Page 2 of 9\" is `aria-live=\"polite\"`, so each page change is announced.",
      "The buttons are labelled \"Previous page\" and \"Next page\", with `aria-hidden` icons. They use the native `disabled` at the ends, so pressing Next onto the last page disables the focused button and focus falls back to the page.",
    ],
  },

  "table-toolbar": {
    faq: [
      {
        q: "Does TableToolbar filter the table?",
        a: "No. It reports the text through `onSearchChange` on every keystroke; filter your rows with it. For long lists, pass the search through `useDeferredValue` so typing stays responsive.",
      },
      {
        q: "TableToolbar or FilterBar?",
        a: "TableToolbar has no border, puts search on the left and actions on the right, and has `mb-3` to sit right above a table. [`FilterBar`](/docs/filter-bar) is a bordered strip with filters next to the field and an optional Clear button.",
      },
    ],
    keyboard: [{ keys: "Escape", action: "In the search field, clears the text and keeps focus there." }],
    a11y: [
      "The field is `type=\"search\"` and named by `searchLabel` (\"Search table\" by default); `searchPlaceholder` is only the visible hint.",
      "The toolbar is a plain `div` with no role, so it is not a landmark.",
      "Clearing with Escape or the X button keeps focus in the field.",
    ],
  },

  "users-table-page": {
    faq: [
      {
        q: "How do I show my own users?",
        a: "The block renders five sample members of a fictional workspace and only takes `onInvite` and `className`. Copy it into your app and replace `MEMBERS` with data from your loader, keeping the `Member` shape or editing the columns.",
      },
      {
        q: "How do I add actions like Change role or Suspend?",
        a: "In your copy, pass `rowActions` to the `DataTable`, for example a [`DropdownMenu`](/docs/dropdown-menu) per row. The actions column shows on hover or focus, and always on touch screens.",
      },
      {
        q: "What does the search match?",
        a: "Name or email, ignoring case and surrounding spaces. With no match, the table shows \"No one matches\" and the query.",
      },
    ],
    a11y: [
      "The table has a visually hidden caption, \"Workspace members\", and starts sorted by name with `aria-sort=\"ascending\"` on that header.",
      "The search field keeps TableToolbar's default name, \"Search table\", because the block only sets a placeholder.",
      "Status is a [`StatusBadge`](/docs/status-badge) with the word printed, so it does not rely on colour.",
    ],
  },

  "virtual-list": {
    faq: [
      {
        q: "How do I render rows of different heights?",
        a: "Set `rowHeight=\"auto\"`. One ResizeObserver measures every mounted row, and `estimatedRowHeight` (40 by default) is used until a row is measured. A fixed number is cheaper, so use it when all rows are the same height.",
      },
      {
        q: "How do I scroll to a row, for example from a deep link?",
        a: "Pass a ref and call `ref.current?.scrollToIndex(index, \"center\")`, or `setActiveIndex(index)` to highlight it too. With measured rows it re-scrolls up to four times as rows above the target get measured.",
      },
      {
        q: "How do I open a row with Enter or a click?",
        a: "`onSelect(item, index)` fires on click, and on Enter or Space for the active row. `onActiveChange(index)` fires as the arrow keys move the active row.",
      },
      {
        q: "Can I hide the header and footer?",
        a: "Yes. `title=\"\"` with `showJump={false}` removes the header, and `showFooter={false}` removes the \"Rows a to b of n\" line. Give the list an `aria-label` then, since the title also names it.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the list. Rows are not separate Tab stops." },
      { keys: "ArrowDown / ArrowUp", action: "Moves the active row by one and scrolls it into view." },
      { keys: "PageDown / PageUp", action: "Moves the active row by about one screen." },
      { keys: "Home / End", action: "Moves to the first or last row." },
      { keys: "Enter / Space", action: "Calls `onSelect` with the active row." },
      { keys: "Enter", action: "In the Jump to row field, makes that row active, scrolls it to the top and moves focus to the list." },
    ],
    a11y: [
      "The scroller has `role=\"list\"` and is named by `aria-label`, or `title` when that is missing. Rows are `listitem`s with `aria-setsize` and `aria-posinset`, so position is announced even though only a few rows exist in the DOM. The active row has `aria-current=\"true\"`.",
      "A polite live region announces \"Row 513 of 10,000\" plus `describeRow` for the active row. Pass `describeRow` for your own data, or it says only \"Row n\".",
      "The list is described by a hidden hint that explains the arrow, Page Up/Down, Home and End keys.",
      "The jump field has a hidden label, \"Jump to row\", and its submit button is labelled \"Go to row\".",
    ],
  },

  "virtualized-list": {
    faq: [
      {
        q: "Why do my rows overlap or leave gaps?",
        a: "Every row is absolutely positioned at `index * itemHeight`, in a box exactly `itemHeight` px tall. Make the root of `renderItem` that height too, for example `h-10` for 40. For rows that vary, use [`VirtualList`](/docs/virtual-list) with `rowHeight=\"auto\"`.",
      },
      {
        q: "How do I pass my data in?",
        a: "Pass `count={rows.length}` and `renderItem={(i) => <Row row={rows[i]} />}`; it only receives the index. Rows are keyed by index, so state inside a row stays with the position, not the item, when the data is reordered.",
      },
      {
        q: "Can people move between rows with the arrow keys?",
        a: "The scroll box is focusable, so arrows and Page Up/Down scroll it, but there is no active row or selection. [`VirtualList`](/docs/virtual-list) adds both, with `onSelect` and `scrollToIndex`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the scroll area." },
      { keys: "ArrowDown / ArrowUp", action: "Scrolls a little, using the browser's scrolling." },
      { keys: "PageDown / PageUp", action: "Scrolls by one screen." },
      { keys: "Home / End", action: "Scrolls to the top or bottom." },
    ],
    a11y: [
      "The scroll box has `role=\"region\"`, named by `aria-label`. The default name is just \"List\", so pass your own.",
      "Rows are `listitem`s with `aria-setsize` and `aria-posinset` inside a `role=\"list\"`, so screen readers announce position out of the full `count`.",
    ],
  },

  "approval-card": {
    faq: [
      {
        q: "How do I show a pending state while the decision saves?",
        a: "There is no loading or disabled prop, and both buttons stay clickable. Ignore repeat clicks in your handler, or remove the card as soon as the request starts, as [`WorkflowBoard`](/docs/workflow-board) does by moving to the next request.",
      },
      {
        q: "Can I call a Server Action from Approve?",
        a: "Yes, from the callback. The buttons are `type=\"button\"`, not form submits, so call the action yourself: `onApprove={() => startTransition(() => approveRefund(id))}`.",
      },
      {
        q: "Can Reject ask for a reason?",
        a: "Not by itself: `onReject` receives no arguments. Open a [`Dialog`](/docs/dialog) with a textarea from `onReject` and send the reason when it is confirmed.",
      },
    ],
    a11y: [
      "The card is an `<article>` with `aria-labelledby` pointing at its `<h3>` title, so a stack of cards reads as separately named items.",
      "Reject comes before Approve in the Tab order. Both say only \"Reject\" and \"Approve\", so in a list of cards pass `approveLabel=\"Approve refund\"` and a matching `rejectLabel` to tell them apart.",
      "The initials avatar is `aria-hidden`; the requester is read from \"Requested by\" plus the name.",
    ],
  },

  "assign-picker": {
    faq: [
      {
        q: "Why is Theo selected when I pass my own people?",
        a: "`defaultValue` is `\"theo\"`, from the sample data. With your own `people`, pass `value` or `defaultValue`. If no id matches, nobody is highlighted and the first person is the Tab stop.",
      },
      {
        q: "How do I offer \"Unassigned\"?",
        a: "There is no clear option. Add `{ id: \"none\", name: \"Unassigned\" }` to `people` and treat `\"none\"` as no assignee in `onChange`.",
      },
      {
        q: "How do I open it from an avatar button?",
        a: "Put it inside a [`Popover`](/docs/popover) and close the popover in `onChange`. Arrow keys only move focus, so the popover stays open until someone presses Enter, Space or clicks.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the current assignee, or the first person if none matches." },
      { keys: "ArrowDown / ArrowUp", action: "Moves focus to the next or previous person without assigning. Stops at the ends." },
      { keys: "Home / End", action: "Moves focus to the first or last person." },
      { keys: "Enter / Space", action: "Assigns the focused person." },
    ],
    a11y: [
      "The list has `role=\"listbox\"`, named by `label` (\"Assignee\" by default). Each person is a `<button>` with `role=\"option\"` and `aria-selected`.",
      "Avatar initials are `aria-hidden`, so each name is read once.",
      "Focus moves without changing the assignee, unlike [`SavedViews`](/docs/saved-views), where selection follows focus.",
    ],
  },

  "comment-thread": {
    faq: [
      {
        q: "Can I pass a Date for the comment time?",
        a: "No. `time` is a ready-made string such as `\"2h ago\"`, shown as plain text. Format it yourself, for example with `Intl.RelativeTimeFormat`, before you pass the comments.",
      },
      {
        q: "Does the body support Markdown, mentions or line breaks?",
        a: "Line breaks, yes: newlines in `body` are kept (`whitespace-pre-line`), while runs of spaces still collapse. Markdown and mentions, no: `body` is plain text, so HTML in it is shown, not run. Copy the file to render rich text.",
      },
      {
        q: "How do I add replies?",
        a: "The thread is flat. Put [`CommentComposer`](/docs/comment-composer) under it and append the new comment to your array, with a stable `id`.",
      },
    ],
    a11y: [
      "Comments are `li`s in a `ul` named by `label` (\"Comments\" by default), so screen readers announce how many there are.",
      "Avatars are `aria-hidden`; each author's name is printed next to the body.",
      "The time is plain text, not a `<time>` element.",
    ],
  },

  "due-date-chip": {
    faq: [
      {
        q: "Does DueDateChip work out whether a date is overdue?",
        a: "No. `date` is display text and `overdue` is a boolean you pass, for example `overdue={new Date(task.dueAt) < new Date()}`. Format the text yourself, such as with `toLocaleDateString(\"en-US\", { month: \"short\", day: \"numeric\" })`.",
      },
      {
        q: "Is there a \"due soon\" state?",
        a: "No. It has two states: normal, and overdue with a danger border and icon. For a warning tone, use [`StatusBadge`](/docs/status-badge).",
      },
    ],
    a11y: [
      "Hidden text reads \"Due\" or \"Overdue, due\" before the date, so overdue is not shown by colour alone.",
      "The calendar icon is `aria-hidden`, and the date uses tabular numbers.",
      "The chip is a `span`, not a `<time>`; wrap it in `<time dateTime=\"2026-11-30\">` if the date should be machine-readable.",
    ],
  },

  "gantt-row": {
    faq: [
      {
        q: "How do I place real dates on the scale?",
        a: "Turn them into numbers first: days since the start of the plan for `start` and `end`, and the plan's length in days for `max`. Values are clamped to 0..`max`, and a bar is drawn at least 2% wide, unless it starts at the very end, so a short task stays visible.",
      },
      {
        q: "Can it show dependencies, a today line or labels on the bars?",
        a: "No. Each row is one bar on a plain track. Use [`GanttChart`](/docs/gantt-chart) for dates, dependencies and a today line.",
      },
      {
        q: "How do I widen the label column?",
        a: "Labels sit in a fixed 140px column and truncate. Override the grid with `className=\"grid-cols-[200px_1fr]\"` on every row so they stay aligned.",
      },
    ],
    a11y: [
      "The bar is `aria-hidden`. Screen readers get hidden text built from the raw props, such as \"10 to 45 of 100\", so use units people understand, like day numbers.",
      "Rows are plain `div`s with no list or table roles. Wrap a set of rows in a `ul` if the number of tasks matters.",
    ],
  },

  "issue-card": {
    faq: [
      {
        q: "How do I make the card open the issue?",
        a: "IssueCard has no `href` or `onClick`, and `title` is a string. Wrap the card in a link, `<a href=\"/issues/LUM-412\" className=\"block rounded-xl\">`, or put an [`IssueKey`](/docs/issue-key) with `href` in `meta`.",
      },
      {
        q: "Can the status and priority badges have colours?",
        a: "No. Both are outline [`Badge`](/docs/badge)s and accept any string. Copy the file and swap in [`StatusBadge`](/docs/status-badge) to map states to tones.",
      },
      {
        q: "Why does my card show \"In progress\" and \"High\" when I did not pass them?",
        a: "Every prop has a sample default, including `title` and `meta`. Pass `status=\"\"`, `priority=\"\"` or `meta={null}` to hide that part; an empty value is not rendered.",
      },
    ],
    a11y: [
      "The card is an `<article>` with `aria-label` set to the key and title, such as \"LUM-412: Add VAT reverse charge\".",
      "The priority badge has hidden text, \"Priority:\", before its value; the status badge does not.",
      "The title is an `<h3>`.",
    ],
  },

  "issue-key": {
    faq: [
      {
        q: "How do I use IssueKey with the Next.js Link?",
        a: "With `href` it renders a plain `<a>`, which does a full page load. For client-side navigation, leave out `href` and wrap it: `<Link href=\"/issues/LUM-412\"><IssueKey value=\"LUM-412\" /></Link>`, and give the Link a focus style.",
      },
      {
        q: "Can it find issue keys in a comment and link them?",
        a: "No, it renders one key. Split the text with a pattern such as `/\\b[A-Z]+-\\d+\\b/g` and render an IssueKey for each match.",
      },
    ],
    a11y: [
      "Without `href` it is a plain `span`: not focusable and not announced as a link.",
      "The link text is only the key, such as \"LUM-412\", so a list of keys reads as bare codes. Put the issue title next to it in the same row.",
    ],
  },

  "kanban-board": {
    faq: [
      {
        q: "Can I drag cards between columns?",
        a: "No. KanbanBoard is a read-only view of `columns`. Moving cards needs your own state plus a drag and drop library. For reordering within one list, use [`SortableList`](/docs/sortable-list).",
      },
      {
        q: "Can cards show avatars, badges or due dates?",
        a: "Cards are `{ id, title, meta? }` and show text only. For richer cards, compose [`KanbanColumn`](/docs/kanban-column)s with [`IssueCard`](/docs/issue-card) or your own components.",
      },
      {
        q: "How does it behave on a phone?",
        a: "Columns are a fixed 256px wide and the board scrolls sideways (`overflow-x-auto`), so one column and part of the next fit on a phone screen.",
      },
    ],
    a11y: [
      "Each column is a `<section>` named by its `<h3>` title.",
      "Cards are `li`s in a `ul`, so screen readers announce how many are in a column. The visible count has hidden text, \"cards\" or \"card\".",
      "The scrolling board is a focusable `role=\"region\"` named by `aria-label` (\"Board\" by default), with a focus ring. Keyboard users Tab to it and use the arrow keys to reach columns that are off screen. Cards are not focusable.",
    ],
  },

  "kanban-column": {
    faq: [
      {
        q: "Does the count update when I add cards?",
        a: "No. `count` shows whatever number you pass, so use `count={cards.length}`. Leave it out to hide the badge. A count of 0 is still shown.",
      },
      {
        q: "How do I lay out several columns as a board?",
        a: "Put them in a scrolling row: `<div className=\"flex gap-3 overflow-x-auto\">`. Each column is 288px wide; pass `className=\"w-64\"` to change it.",
      },
    ],
    a11y: [
      "The column is a `<section>` with `aria-labelledby` pointing at its `<h3>` title.",
      "The count badge has hidden text, \"items\" or \"item\", so it reads \"3 items\".",
      "Children are placed in a `div`. Wrap your cards in a `ul` with `li`s if screen readers should announce how many there are.",
    ],
  },

  "live-cursors-bar": {
    faq: [
      {
        q: "How do I connect it to real-time presence?",
        a: "It only renders `people`. Map the users from your presence channel to `{ name, color }` and pass the array again whenever someone joins or leaves. Use each person's cursor colour, so the ring matches their cursor on the canvas.",
      },
      {
        q: "What happens with many editors?",
        a: "It draws an avatar for every person; there is no \"+N\" overflow. Slice the array yourself, or use [`AvatarGroup`](/docs/avatar-group), which has an overflow count.",
      },
      {
        q: "Which colours should I use?",
        a: "`color` takes any CSS colour and is drawn as a 2px inner ring. The defaults use `var(--accent)`, `var(--chart-2)` and `var(--chart-3)`, which follow the light and dark themes. Use theme tokens rather than fixed colours so the ring stays visible in both.",
      },
    ],
    a11y: [
      "The bar has `role=\"group\"` and the name \"Editing now:\" followed by every name. The avatars and the count text are `aria-hidden`, so the name is the only thing read.",
      "Each avatar has a `title` with the person's full name, shown on hover.",
      "It is not a live region, so people joining or leaving are not announced.",
    ],
  },

  "onboarding-wizard": {
    faq: [
      {
        q: "Can I change the steps or what each step shows?",
        a: "Not with props. The steps (Workspace, Invite, Done) and their content, [`WorkspaceCreate`](/docs/workspace-create) and [`InviteMembers`](/docs/invite-members), are fixed in the file. Copy it and edit `STEPS` and the panels, and keep the `go()` function that moves focus.",
      },
      {
        q: "When does `onComplete` fire, and what does it receive?",
        a: "It fires when the user reaches the Done step, after Continue on the Invite step, and receives nothing. The workspace name and slug from `WorkspaceCreate` are dropped, so in your copy handle `onCreate={({ name, slug }) => ...}` yourself.",
      },
      {
        q: "Is there a Back button?",
        a: "No. Steps only move forward. In your copy, add a button that calls `go(step - 1)`.",
      },
    ],
    a11y: [
      "When the step changes, focus moves to the step panel (`tabIndex={-1}`), a `role=\"group\"` named like \"Step 2 of 3: Invite\".",
      "The [`Stepper`](/docs/stepper) marks the current step with `aria-current=\"step\"` and adds hidden \"(completed)\" text to earlier steps.",
    ],
  },

  "priority-picker": {
    faq: [
      {
        q: "How do I submit the priority with a form?",
        a: "Pass `name`, such as `name=\"priority\"`. The picker then renders a hidden input with the current level, or an empty string when none is picked, and it is left out of the form while `disabled`. With React Hook Form, wrap it in a `Controller` and pass `value` and `onChange`.",
      },
      {
        q: "How do I show no priority selected?",
        a: "Nothing is selected until someone picks, unless you pass `defaultValue`. To clear a controlled picker, pass a string that matches no level, such as `value=\"none\"`: `value={undefined}` makes it uncontrolled, so it shows its own last pick. `value` accepts any string for this reason, while `onChange` always gives one of the four levels.",
      },
      {
        q: "Can I change the levels or their colours?",
        a: "No, the four levels are fixed in the file: Low, Medium, High and Urgent, where High and Urgent share the danger dot and Urgent adds a ring. Use [`SegmentedControl`](/docs/segmented-control) or [`RadioGroup`](/docs/radio-group) for another set.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the selected priority, or Low when none is selected." },
      { keys: "ArrowRight / ArrowDown", action: "Selects the next priority, wrapping from Urgent to Low." },
      { keys: "ArrowLeft / ArrowUp", action: "Selects the previous priority, wrapping from Low to Urgent." },
      { keys: "Home / End", action: "Selects Low or Urgent." },
      { keys: "Enter / Space", action: "Selects the focused priority." },
    ],
    a11y: [
      "The row has `role=\"radiogroup\"`, named by `aria-label` (\"Priority\" by default). Each pill is a `<button>` with `role=\"radio\"` and `aria-checked`.",
      "Only the selected pill is in the Tab order (roving tabindex).",
      "The colour dots are `aria-hidden`; the level is read from the text. `disabled` disables every pill and sets `aria-disabled` on the group.",
    ],
  },

  "publish-bar": {
    faq: [
      {
        q: "How do I show the publishing state from a Server Action?",
        a: "Pass the pending flag: `const [isPending, startTransition] = useTransition()`, then `publishing={isPending}` and `onPublish={() => startTransition(() => publishPost(id))}`. While true, the Publish button is disabled and reads \"Publishing…\".",
      },
      {
        q: "How do I show \"Saved 2m ago\" or a scheduled time?",
        a: "`note` takes any React node: `note={<>Saved <RelativeTime date={savedAt} /></>}` or `note=\"Goes live Nov 20, 09:00\"`. Replace the default \"Changes save automatically\" if your editor does not autosave.",
      },
    ],
    a11y: [
      "The status is a [`StatusBadge`](/docs/status-badge) with the word printed (Draft, Scheduled, Published), not only a colour.",
      "While `publishing` is true, the Publish button has `aria-busy` and the native `disabled`, so if it had focus, focus falls back to the page.",
      "The bar is not a live region. Announce a finished publish with a toast.",
    ],
  },

  "sortable-list": {
    faq: [
      {
        q: "How do I save the new order?",
        a: "`onReorder` receives the full list after every keyboard move and every time rows swap during a drag, so it can fire several times per drag. Debounce the save, or save `next.map((t) => t.id)` when the order stops changing.",
      },
      {
        q: "Is SortableList controlled?",
        a: "It keeps its own order. A new `items` array resets it only when the ids or their order differ, so passing the `onReorder` result back in does not cause a loop.",
      },
      {
        q: "Can rows show custom content?",
        a: "Rows are `{ id, label, detail? }`, with `detail` shown on the right in mono. For avatars, badges or buttons, copy the file and edit `Row`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the next row's drag handle." },
      { keys: "ArrowUp / ArrowDown", action: "On a handle, moves that row up or down one place. Focus stays on the handle." },
      { keys: "Home / End", action: "On a handle, moves that row to the top or bottom." },
    ],
    a11y: [
      "Each drag handle is a `<button>` labelled with the row and its place, such as \"Reorder Design review, position 2 of 5\".",
      "A polite live region announces each keyboard move, such as \"Design review moved to position 1 of 5\".",
      "Under reduced motion, the `useReducedMotion` branch turns off the layout animation, uses a zero-length transition and drops the 1.02 scale while dragging.",
    ],
  },

  "step-progress": {
    faq: [
      {
        q: "Can people click a step to go back?",
        a: "No. StepProgress is a read-only `<ol>` with no buttons. Add your own Back button that lowers `current`.",
      },
      {
        q: "How do I show the flow as finished?",
        a: "Set `current={steps.length}`. Every step then counts as done, every bar is filled, and no step is marked current.",
      },
    ],
    a11y: [
      "It is an ordered list. The active step has `aria-current=\"step\"`, and earlier steps end with hidden \"(completed)\" text.",
      "The bars are `aria-hidden`; their colour change is a CSS transition, which the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
      "Long labels truncate visually but stay whole in the DOM, so screen readers read the full text.",
    ],
  },

  stepper: {
    faq: [
      {
        q: "How do I drive Stepper from a multi-step form?",
        a: "Keep the step index in state, pass it as `current`, and render that step's fields below. Raise it only after the current step validates. Stepper is display only, so the Back and Next buttons are yours.",
      },
    ],
    a11y: [
      "It is an ordered list. The active step has `aria-current=\"step\"`, and earlier steps end with hidden \"(completed)\" text.",
      "Numbers are part of the label text (\"1. Details\"), so screen readers read them.",
      "The bars are `aria-hidden`, and their colour change is a CSS transition cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "welcome-screen": {
    faq: [
      {
        q: "Why do the Connect bank and Read the guide buttons do nothing?",
        a: "They are sample buttons, shown whenever `actions` is left out. Always pass your own: `actions={<Button onClick={connectBank}>Connect bank</Button>}`.",
      },
      {
        q: "How do I hide it once the user has started?",
        a: "It has no dismiss button and stores nothing. Render it only while the workspace is empty, for example `{invoices.length === 0 && <WelcomeScreen ... />}`, or save a dismissed flag yourself.",
      },
    ],
    a11y: [
      "The headline is an `<h2>`, so the page should already have an `<h1>`.",
      "Steps are an ordered list. The visible numbers are `aria-hidden`, so each step is read once.",
    ],
  },

  "workflow-board": {
    faq: [
      {
        q: "How do I use my own approval queue?",
        a: "The block renders a fixed `QUEUE` of three sample requests and only takes `onDecision` and `className`. Copy it and replace `QUEUE` with your data; `onDecision(key, approved, priority)` fires before it moves to the next request.",
      },
      {
        q: "Is the priority saved per request?",
        a: "It is passed to `onDecision` as the third argument, as `\"low\"`, `\"medium\"`, `\"high\"` or `\"urgent\"`, so save it with the decision. The picker starts at \"high\" and goes back to it for each new request. To start from a stored priority, keep it on each request in your copy.",
      },
    ],
    a11y: [
      "The queue is a `<section>` named by its heading, such as \"Queue · 3 left\", with the requests in an ordered list.",
      "After the last decision, \"Queue clear. Nothing waiting on you.\" appears in a `role=\"status\"` element. It mounts together with its text, so some screen readers may not announce it.",
      "The approval card is remounted for each request, so the Approve or Reject button that had focus is removed and focus falls back to the page.",
    ],
  },
}
