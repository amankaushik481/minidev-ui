import type { ComponentDocsContent } from "../types"

export const PART_N1: Record<string, ComponentDocsContent> = {
  calendar: {
    faq: [
      {
        q: "How do I build a date range picker with Calendar?",
        a: "Set `mode=\"range\"`. `onValueChange` receives `{ from, to }`, and `to` stays `undefined` until the second click; a click before `from` restarts the range on that day, and a click after a finished range starts a new one. For a field that opens a calendar, put it in a [`Popover`](/docs/popover) with a `Button` trigger.",
      },
      {
        q: "Does a range skip disabled days?",
        a: "No. `disabled`, `min` and `max` stop a day from being clicked, but a range from 3 to 10 November still contains a disabled 7 November. If a gap must not be crossed, such as a booked night, check the range in `onValueChange` before you store it.",
      },
      {
        q: "How do I use Calendar with React Hook Form or a plain form?",
        a: "Calendar has no `name` and renders no input, so `FormData` will not see it. With React Hook Form, wrap it in a `Controller` and pass `value={field.value}` and `onValueChange={field.onChange}`. For a native date field use [`DatePicker`](/docs/date-picker); [`DateTimePicker`](/docs/date-time-picker) takes a `name` and submits an ISO string.",
      },
      {
        q: "Why is the calendar empty in the server HTML?",
        a: "Today depends on the visitor's clock, so Calendar reads it only in the browser: with no `value`, `defaultValue` or `defaultMonth`, the server renders an empty box of the same size and the browser fills it in. Pass `defaultMonth` to get days in the server HTML. `locale` defaults to `\"en-US\"` for the same reason; pass the user's locale and `weekStartsOn={1}` where Monday comes first.",
      },
    ],
    keyboard: [
      { keys: "ArrowLeft / ArrowRight", action: "Moves focus one day back or forward. Past the edge of the visible months, the next or previous month slides in." },
      { keys: "ArrowUp / ArrowDown", action: "Moves focus one week back or forward." },
      { keys: "PageUp / PageDown", action: "Moves focus one month, keeping the day where it exists: 31 January goes to 28 February." },
      { keys: "Shift+PageUp / Shift+PageDown", action: "Moves focus one year." },
      { keys: "Home / End", action: "Moves focus to the first or last day of the week, following `weekStartsOn`." },
      { keys: "Enter / Space", action: "Picks the focused day. Disabled days do nothing." },
      { keys: "Tab", action: "Moves through the preset buttons, the previous and next month buttons, then the days. All grids share one tab stop." },
    ],
    a11y: [
      "Each month is a `role=\"grid\"` named by its month and year, with weekday column headers labelled by the full day name. In range and multiple mode the grid has `aria-multiselectable`.",
      "Each day is a `<button>` whose `aria-label` is the full date from `Intl.DateTimeFormat`, such as \"Saturday, November 14, 2026\". Picked days and days inside a finished range set `aria-selected` on their cell, today has `aria-current=\"date\"`, and disabled days have `aria-disabled` but stay focusable.",
      "Only one day has `tabIndex=0`: the last focused day, else the selection, else today, else the 1st of the first month shown. Arrow keys stop at `min` and `max`, and days from neighbouring months are never a tab stop.",
      "Month changes are announced by a visually hidden `aria-live=\"polite\"` region. The month slides with the snappy spring, which becomes an instant swap under `useReducedMotion`.",
    ],
  },

  "date-time-picker": {
    faq: [
      {
        q: "How do I disable past dates and times?",
        a: "Pass `min={new Date()}`. Days before today are disabled in the calendar, and so are today's slots before that moment: with 15 minute steps at 14:07, the first free slot is 14:15. `max` works the same way at the other end, for example a deploy window that closes on Friday.",
      },
      {
        q: "Which time zone does DateTimePicker use?",
        a: "The browser's. The value is a plain `Date`, the calendar, slots and trigger all show local time, and `timeZoneLabel` only prints a note in the footer. With `name`, the form submits `toISOString()`, which is UTC, so the server gets an unambiguous moment.",
      },
      {
        q: "How do I use it with React Hook Form or FormData?",
        a: "For a plain `<form>`, pass `name` and a hidden input submits the ISO string, or `\"\"` when empty. With React Hook Form, use a `Controller` and pass `value={field.value}` and `onValueChange={field.onChange}`. Clear sends `null`, so type the field `Date | null`.",
      },
      {
        q: "What happens if I pick a day before a time?",
        a: "The first day you pick gets 09:00, or keeps the time already chosen; if that time is outside `min` or `max` on the new day, it moves to the first free slot. Picking a day keeps the popover open, while picking a time or pressing Now closes it. Now picks the first slot at or after the moment the popover opened.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the trigger, opens the popover and focuses the selected day, or today." },
      { keys: "ArrowLeft / ArrowRight / ArrowUp / ArrowDown", action: "In the calendar, moves by day or week. PageUp and PageDown move by month, as in [`Calendar`](/docs/calendar)." },
      { keys: "Enter / Space", action: "In the calendar, picks the focused day and keeps the popover open." },
      { keys: "Tab", action: "Moves from the calendar to the time list, then to Clear and Now." },
      { keys: "ArrowDown / ArrowUp", action: "In the time list, moves to the next or previous free slot, skipping disabled ones." },
      { keys: "Home / End", action: "In the time list, moves to the first or last free slot." },
      { keys: "0-9", action: "In the time list, jumps to the first free slot that starts with the typed digits: 9 then 3 finds 9:30. Keys typed within 600ms add up." },
      { keys: "Enter / Space", action: "In the time list, picks the highlighted slot, closes the popover and returns focus to the trigger." },
      { keys: "Escape", action: "Closes the popover and returns focus to the trigger." },
    ],
    a11y: [
      "The trigger is a Base UI `Popover.Trigger` with `aria-haspopup=\"dialog\"` and `aria-expanded`. With `aria-label=\"Send at\"`, its name becomes \"Send at\" plus the formatted value, or the placeholder when empty.",
      "The time list is a `role=\"listbox\"` labelled by the visible \"Time\" heading. It is one tab stop and points at the highlighted slot with `aria-activedescendant`. Slots are `role=\"option\"` with `aria-selected`; past or out-of-range slots have `aria-disabled`.",
      "On open, focus moves to the calendar's selected day or today, and the selected slot is scrolled to the middle of the list. On close, Base UI returns focus to the trigger.",
      "The trigger text and the hidden input are only filled in the browser: the server's time zone may differ from the visitor's, so rendering the time on the server could show the wrong hour.",
    ],
  },

  "data-grid": {
    faq: [
      {
        q: "How do I paste data from Excel or Google Sheets?",
        a: "Click the cell where the top-left value should land and press Cmd+V or Ctrl+V. DataGrid reads the tab-separated text both apps copy, including quoted cells with line breaks, fills right and down, and fills a whole selected block when you paste one value. Read-only columns, values that do not fit the column type and anything past the last row or column are skipped: paste never adds rows.",
      },
      {
        q: "How are pasted or typed numbers parsed?",
        a: "Number columns drop currency symbols, spaces and thousands commas, so \"$1,240.50\" becomes `1240.5` and \"(1,200)\" becomes `-1200`; a comma that is not a thousands separator, as in \"1,5\" or \"1.240,50\", is rejected and the cell keeps its value. Clearing a number cell writes `null`, so type those fields `number | null`. Checkbox cells take TRUE, yes, 1 or x, and select cells match an option's value or label.",
      },
      {
        q: "How do I add a computed column or reject an edit?",
        a: "Every change arrives in `onRowsChange` as a whole new array, so recompute there: `onRowsChange={(next) => setRows(next.map((r) => ({ ...r, total: r.qty * r.unit })))}`, and mark the column `readOnly`. The grid only shows `rows`, so an edit you do not store simply disappears. Cmd/Ctrl+Z restores the array from before the last change, up to 50 steps.",
      },
      {
        q: "Is DataGrid virtualized? How many rows can it handle?",
        a: "No. It renders every cell, which stays smooth to roughly 2,000 rows. Past that, page the data or build on [`VirtualList`](/docs/virtual-list). For sorting, filtering and row selection without cell editing, use [`DataTable`](/docs/data-table).",
      },
    ],
    keyboard: [
      { keys: "ArrowUp / ArrowDown / ArrowLeft / ArrowRight", action: "Moves the active cell." },
      { keys: "Shift+ArrowUp / Shift+ArrowDown / Shift+ArrowLeft / Shift+ArrowRight", action: "Grows or shrinks the selected block." },
      { keys: "Ctrl+ArrowDown / Cmd+ArrowDown", action: "Jumps to the last row. With the other arrows, jumps to the first row, first column or last column." },
      { keys: "Home / End", action: "Moves to the first or last column. With Ctrl or Cmd, to the first or last cell of the grid." },
      { keys: "Tab / Shift+Tab", action: "Moves one cell right or left. From the last or first column, focus leaves the grid." },
      { keys: "Enter / F2", action: "Edits the active cell, keeping its text. On a checkbox cell, toggles it; on a select cell, opens the options." },
      { keys: "A-Z / 0-9", action: "Starts editing and replaces the cell's text with the typed character." },
      { keys: "Space", action: "Toggles a checkbox cell. On a text or number cell, starts editing like any other character." },
      { keys: "Enter / Shift+Enter", action: "While editing, saves and moves down or up." },
      { keys: "Tab / Shift+Tab", action: "While editing, saves and moves right or left." },
      { keys: "Escape", action: "While editing, cancels and keeps the old value. Otherwise, shrinks the selection to the active cell." },
      { keys: "Delete / Backspace", action: "Clears every editable cell in the selection. Select cells keep their value." },
      { keys: "Ctrl+C / Cmd+C", action: "Copies the selection as tab-separated text. Checkboxes copy as TRUE or FALSE, selects as their label." },
      { keys: "Ctrl+V / Cmd+V", action: "Pastes tab-separated text at the top-left cell of the selection." },
      { keys: "Ctrl+Z / Cmd+Z", action: "Undoes the last edit, paste or clear." },
      { keys: "Ctrl+A / Cmd+A", action: "Selects every cell." },
    ],
    a11y: [
      "The `<table>` has `role=\"grid\"`, the required `aria-label`, `aria-rowcount`, `aria-colcount` and `aria-multiselectable`. Rows carry `aria-rowindex` (the header row is 1), cells carry `aria-colindex`, and row numbers are `<th scope=\"row\">` row headers.",
      "Only the active cell has `tabIndex=0`, and focus moves from cell to cell, so the grid is one tab stop. Cells in the selection have `aria-selected=\"true\"`, read-only columns have `aria-readonly`, and the whole grid is `aria-readonly` without `onRowsChange`.",
      "Editors are labelled with the column and row, such as \"Price, row 3\". Number cells edit in an `<input>` with `inputMode=\"decimal\"`, and select cells open a Base UI Select. A checkbox cell's box is `inert` and the cell holds hidden \"checked\" or \"not checked\" text, so the cell stays the only focus stop.",
      "Column resizing is pointer only: the handle on each header edge is `aria-hidden` and has no keyboard control.",
    ],
  },
}
