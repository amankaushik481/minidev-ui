import type { ComponentDocsContent } from "../types"

export const PART_03: Record<string, ComponentDocsContent> = {
  "multi-select": {
    faq: [
      {
        q: "How do I use MultiSelect with React Hook Form?",
        a: "Wrap it in a `Controller` and pass the field through: `render={({ field }) => <MultiSelect items={people} value={field.value} onChange={field.onChange} aria-label=\"Reviewers\" />}`, with `defaultValues: { reviewers: [] }`. For a plain `<form>`, pass `name` instead: each selected value goes in its own hidden input, so `formData.getAll(\"reviewers\")` returns the array.",
      },
      {
        q: "What is the difference between controlled and uncontrolled?",
        a: "Pass `defaultValue` and MultiSelect keeps the selection itself. Pass `value` and it shows exactly that array, so update it from `onChange`. `onChange` always receives the whole new array of values, after each toggle and each chip removal.",
      },
      {
        q: "Why is a selected value missing from the chips?",
        a: "The trigger text and the chips only show values that are in `items`. If you load options from an API or filter them, keep the selected options in `items`, or they disappear from view while their values stay in the selection.",
      },
      {
        q: "Can I search or filter the options?",
        a: "No. MultiSelect is for 2 to about 20 options and has no search field or arrow key navigation. [`Combobox`](/docs/combobox) adds type to filter but picks one value, and [`TagsInput`](/docs/tags-input) takes free-form entries.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the trigger, opens the list and moves focus to the first option." },
      { keys: "Tab / Shift+Tab", action: "Moves between the options while the list is open." },
      { keys: "Enter / Space", action: "On an option, selects or deselects it. The list stays open." },
      { keys: "Escape", action: "Closes the list and returns focus to the trigger." },
      { keys: "Enter / Space", action: "On a chip, removes that item." },
    ],
    a11y: [
      "The trigger has `aria-haspopup=\"dialog\"` and `aria-expanded`. With `aria-label=\"Reviewers\"` its accessible name becomes \"Reviewers: Maya Chen, Priya Raman\", or the placeholder when nothing is selected.",
      "Each option is a `<button>` with `aria-pressed`, so screen readers announce it as pressed or not pressed. The check icon is `aria-hidden`.",
      "Each chip is a `<button>` labelled \"Remove\" plus the item's label. `disabled` disables the trigger and every chip.",
    ],
  },

  autocomplete: {
    faq: [
      {
        q: "What is the difference between Autocomplete and Combobox?",
        a: "Autocomplete keeps whatever is typed: the value is free text, and picking a suggestion only fills it in. [`Combobox`](/docs/combobox) only accepts one of its `items` and returns that item's `value`. Use Autocomplete when a new entry is fine, such as a city or a customer that is not in the list yet.",
      },
      {
        q: "How do I load suggestions from an API?",
        a: "Control the text with `value` and `onChange`, fetch as it changes, and pass the results as `options`. Pass `options={[]}` while loading: leaving it `undefined` shows the built-in sample company names. Autocomplete still filters `options` by substring against the text and shows the first eight.",
      },
      {
        q: "Does Autocomplete submit with a form?",
        a: "Yes. It renders a native `<input>` and passes `name` to it, so `FormData` gets the typed text. Enter only picks a suggestion while one is highlighted; otherwise it is left alone and submits the form as usual. There is no `required` prop, so check for an empty value on submit.",
      },
    ],
    keyboard: [
      { keys: "ArrowDown / ArrowUp", action: "Opens the suggestions and highlights the first or last one, then moves the highlight. Wraps at both ends." },
      { keys: "Enter", action: "Picks the highlighted suggestion and closes the list. With nothing highlighted, the key is not intercepted." },
      { keys: "Escape", action: "Closes the list. The typed text stays." },
      { keys: "Tab", action: "Leaves the field. The list closes on blur." },
    ],
    a11y: [
      "The input has `role=\"combobox\"`, `aria-autocomplete=\"list\"`, `aria-expanded` and `aria-controls` pointing at a `role=\"listbox\"` list. Focus never leaves the input: the highlighted option is announced through `aria-activedescendant`.",
      "Without `aria-label` or `id`, the accessible name falls back to the `placeholder` (\"Search…\" by default). With an `id`, it expects a `<label htmlFor>` and sets no `aria-label`.",
      "The highlighted option has `aria-selected=\"true\"` and is scrolled into view with `scrollIntoView({ block: \"nearest\" })`. Options prevent `mousedown`, so clicking one does not blur the input first.",
    ],
  },

  "calendar-month": {
    faq: [
      {
        q: "How do I go to the next or previous month?",
        a: "CalendarMonth has no month navigation. It draws the month of the `month` prop, so keep that `Date` in state and render your own previous and next buttons. Arrow keys stop at the first and last day of the month.",
      },
      {
        q: "Why does onSelect give me a number instead of a Date?",
        a: "`selected` and `onSelect` use the day of the month, 1 to 31. Build the date yourself: `new Date(month.getFullYear(), month.getMonth(), day)`.",
      },
      {
        q: "Can the week start on Monday, or show another language?",
        a: "Not without editing the file. The weekday row starts on Sunday and the labels use a fixed `en-US` formatter, so the server and client render the same HTML. Change `WEEKDAYS`, the offset and the two `Intl.DateTimeFormat` calls in your copy.",
      },
      {
        q: "Does it support ranges or disabled days?",
        a: "No. There is no range mode, no `min` or `max` and no disabled days. For a from/to field use [`DateRangePicker`](/docs/date-range-picker), and for bounds use [`DatePicker`](/docs/date-picker) with `min` and `max`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus into the grid. Only one day is a Tab stop: the selected day or the 1st, then the last day you moved to." },
      { keys: "ArrowLeft / ArrowRight", action: "Moves to the previous or next day." },
      { keys: "ArrowUp / ArrowDown", action: "Moves to the same weekday one week earlier or later. Stops at the first and last day." },
      { keys: "Home / End", action: "Moves to the first or last day of the month." },
      { keys: "Enter / Space", action: "Selects the focused day." },
    ],
    a11y: [
      "Each day is a `<button>` whose `aria-label` is the full date, such as \"Tuesday, September 15, 2026\". The selected day has `aria-pressed=\"true\"`.",
      "The days sit in a `role=\"group\"` named with the month and year. The visible title and the weekday letters are `aria-hidden`, so they are not read twice.",
      "Moving with the keyboard moves real focus to the day button, so screen readers read each new date.",
    ],
  },

  "character-count": {
    faq: [
      {
        q: "Does CharacterCount stop people typing past the limit?",
        a: "No. It only shows and announces the count, and sets `data-over` past the limit. Add `maxLength` to the field for a hard cap, or let people type on and block submit while `text.length > max`.",
      },
      {
        q: "When does a screen reader hear the count?",
        a: "Only when the characters left are at or below `warnAt`, which defaults to 10% of `max` rounded up (28 for a max of 280). From then on the live region says \"12 characters left\" or \"5 characters over the limit\".",
      },
      {
        q: "How do I count words or emoji instead of string length?",
        a: "`value` is just a number, so pass whatever you count: a word count, or `[...text].length` to count code points rather than UTF-16 units.",
      },
    ],
    a11y: [
      "The visible \"42/280\" is `aria-hidden`. Screen readers get a hidden \"42 of 280 characters\" instead, when the field's `aria-describedby` points at the counter's `id`.",
      "A separate `aria-live=\"polite\"` region stays empty until the limit is near, so typing is not read out on every keystroke.",
      "Past the limit the text turns `text-danger` and the live region says how many characters are over, so colour is not the only signal.",
    ],
  },

  checkbox: {
    faq: [
      {
        q: "What does a Checkbox send in FormData?",
        a: "With `name`, Base UI renders a hidden native checkbox. When checked it submits `value`, or \"on\" without one. When unchecked it submits nothing, unless you pass `uncheckedValue`.",
      },
      {
        q: "How do I build a select all checkbox?",
        a: "Pass `indeterminate` while some rows are checked: `<Checkbox checked={all} indeterminate={some && !all} onCheckedChange={toggleAll} aria-label=\"Select all rows\" />`. The box shows a dash and screen readers hear \"mixed\".",
      },
      {
        q: "How do I use Checkbox with React Hook Form?",
        a: "Use a `Controller`: `render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />}`. `onCheckedChange` is called with `(checked, eventDetails)`, and `field.onChange` takes the first argument.",
      },
    ],
    keyboard: [
      { keys: "Space", action: "Toggles the checkbox." },
      { keys: "Enter", action: "Does nothing, as on a native checkbox." },
    ],
    a11y: [
      "Renders a `<span role=\"checkbox\">` with `aria-checked`, which is `\"mixed\"` while `indeterminate`, plus a hidden native input for forms.",
      "The box is 16px, but an `::after` extends the hit area by 14px on each side, to about 44px.",
      "Name it with a wrapping `<Label>` or `aria-label`. `aria-invalid` turns the border red and adds a ring.",
      "The check mark draws in with a CSS transition, which the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "checkbox-group": {
    faq: [
      {
        q: "How do I read the checked values when the form submits?",
        a: "Give each [`Checkbox`](/docs/checkbox) the same `name` and its own `value`. `new FormData(form).getAll(\"notify\")` then returns the checked values as an array.",
      },
      {
        q: "Is this Base UI's CheckboxGroup with a value array?",
        a: "No. It is a labelled `role=\"group\"` wrapper and holds no state: there is no `value` or `onValueChange`. Keep the array in your own state and set each checkbox's `checked` from it, or use [`FacetFilter`](/docs/facet-filter), which manages the array for you.",
      },
      {
        q: "How do I lay the checkboxes out in a row?",
        a: "Pass `orientation=\"horizontal\"`. The checkboxes wrap in a row and the `label` takes its own line above them.",
      },
    ],
    a11y: [
      "The wrapper has `role=\"group\"` and `aria-labelledby` pointing at the visible `label`, so screen readers say the group name when focus enters it.",
      "Without `label`, pass `aria-label`: other props spread onto the wrapper `<div>`.",
      "It is a `<div>`, not a `<fieldset>`, and has no `disabled` prop. Disable each checkbox yourself.",
    ],
  },

  "chip-filter": {
    faq: [
      {
        q: "Can I select more than one chip?",
        a: "No. ChipFilter is a single choice radio group and always has one value selected. For several filters at once use [`FacetFilter`](/docs/facet-filter) or [`MultiSelect`](/docs/multi-select).",
      },
      {
        q: "How do I filter a table with it?",
        a: "Control it: `const [status, setStatus] = useState(\"all\")`, pass `value={status} onChange={setStatus}`, and filter your rows by `status`. `onChange` fires only when the value changes, not when the selected chip is clicked again.",
      },
      {
        q: "Why do the arrow keys change the filter straight away?",
        a: "It follows the radio pattern: arrows move focus and select in one step, wrapping at the ends. If each change runs a slow query, debounce it in `onChange`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the selected chip. The other chips are skipped." },
      { keys: "ArrowRight / ArrowDown", action: "Selects the next chip. Wraps from the last to the first." },
      { keys: "ArrowLeft / ArrowUp", action: "Selects the previous chip. Wraps from the first to the last." },
      { keys: "Home / End", action: "Selects the first or last chip." },
    ],
    a11y: [
      "The row has `role=\"radiogroup\"` named by `label` (default \"Filter\"). Each chip is a `<button role=\"radio\">` with `aria-checked`.",
      "Roving tabindex: only the selected chip is in the Tab order, or the first chip when `value` matches no option.",
      "Chips are 28px tall, and an `::after` adds 8px above and below for a larger touch target.",
    ],
  },

  "choice-card": {
    faq: [
      {
        q: "How do I make a set of ChoiceCards pick one option?",
        a: "Keep the choice in state and give each card `selected={type === \"team\"}` and `onClick={() => setType(\"team\")}`, inside `<div role=\"group\" aria-label=\"Workspace type\">`. The cards are separate toggle buttons with no arrow key movement between them. Use [`RadioGroup`](/docs/radio-group) if you need radio semantics.",
      },
      {
        q: "Does ChoiceCard submit with a form?",
        a: "No. It is a `<button type=\"button\">` with no value, so pressing it never submits and nothing reaches `FormData`. Put the chosen value in a hidden input: `<input type=\"hidden\" name=\"type\" value={type} />`.",
      },
      {
        q: "Can I use it as a plain card button without a selected state?",
        a: "Yes. Leave `selected` undefined: no `aria-pressed` is rendered and the card acts as an ordinary button. All other `<button>` props, such as `onClick` and `disabled`, pass through.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the next card. A `disabled` card is skipped." },
      { keys: "Enter / Space", action: "Activates the focused card." },
    ],
    a11y: [
      "A native `<button>`. When `selected` is a boolean it gets `aria-pressed`, so screen readers say \"pressed\" or \"not pressed\".",
      "The title and the description are both inside the button, so together they form its accessible name. The icon wrapper is `aria-hidden`.",
      "`disabled` sets the native attribute, so a disabled card leaves the Tab order and cannot be pressed.",
    ],
  },

  "color-picker": {
    faq: [
      {
        q: "What value does ColorPicker return?",
        a: "The swatch's CSS colour string, exactly as written in `colors`, for example `\"oklch(0.52 0.12 150)\"`. The same string paints the swatch, so every `value` must be a valid CSS colour.",
      },
      {
        q: "Why does a screen reader read out oklch numbers?",
        a: "Plain string colours are named by their value. Pass objects instead: `colors={[{ value: \"oklch(0.55 0.15 250)\", label: \"Blue\" }]}`. The built-in palette already has names.",
      },
      {
        q: "Can people pick any colour, or submit it with a form?",
        a: "Only colours from the palette: there is no free picker. Pass `name` and the chosen colour string is submitted with the form through a hidden input. A disabled picker submits nothing, like a disabled native field.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the selected swatch." },
      { keys: "ArrowRight / ArrowDown", action: "Selects the next swatch. Wraps at the end." },
      { keys: "ArrowLeft / ArrowUp", action: "Selects the previous swatch. Wraps at the start." },
      { keys: "Home / End", action: "Selects the first or last swatch." },
    ],
    a11y: [
      "The row is a `role=\"radiogroup\"` named by `label` (default \"Color\"). Each swatch is a `<button role=\"radio\">` with `aria-checked`, and its `aria-label` and `title` are the swatch name.",
      "The selected swatch gets a 2px accent ring with a 2px offset, so the selection does not rely on the swatch colour.",
      "`disabled` disables every swatch and sets `aria-disabled` on the group.",
    ],
  },

  combobox: {
    faq: [
      {
        q: "How do I use Combobox in a form or with a Server Action?",
        a: "Pass `name`: Base UI renders a hidden input with the selected item's `value`, so `FormData` and Server Actions get it. Add `required` to block submit until something is picked.",
      },
      {
        q: "Where is the search box?",
        a: "Inside the popup. The trigger is a button that shows the selected label. Opening it focuses a \"Filter…\" field (`searchPlaceholder`) that narrows `items` by `label`, and `emptyText` shows when nothing matches.",
      },
      {
        q: "How do I clear the selection?",
        a: "Users cannot: picking is the only action, and an empty pick is ignored. To clear it from code, control it and set `value` to something no item has, such as `\"\"`. The trigger then shows `placeholder` again.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space / ArrowDown / ArrowUp", action: "On the trigger, opens the list with the filter field focused." },
      { keys: "ArrowDown / ArrowUp", action: "Moves the highlight through the matching items." },
      { keys: "Enter", action: "Selects the highlighted item and closes the list." },
      { keys: "Escape", action: "Closes the list and returns focus to the trigger." },
    ],
    a11y: [
      "Built on Base UI Combobox: the items are `role=\"option\"` with `aria-selected`, and the check icon is `aria-hidden`.",
      "The filter field is labelled \"Filter options\". The popup is labelled by `aria-label`, or by `placeholder` when there is none.",
      "Pass `id` to the trigger and the same id to [`FormField`](/docs/form-field) or a `<label htmlFor>` to name it. FormField's `aria-describedby` and `aria-invalid` reach the trigger, so the hint or error is read with it and an error turns the border red.",
      "The popup fades and scales in with CSS animations, which the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "comment-composer": {
    faq: [
      {
        q: "What happens if saving the comment fails?",
        a: "Return the save promise from `onSubmit`: `onSubmit={(text) => api.comments.create({ body: text })}`. The box clears only when it resolves. If it rejects, the text stays so people can send again; show the error yourself, because CommentComposer swallows the rejection. While the promise is pending the button is disabled, so a second press does not post twice.",
      },
      {
        q: "Which keys send the comment?",
        a: "⌘+Enter or Ctrl+Enter, on any platform. Plain Enter adds a new line. The hint always reads \"⌘ Enter to send\", even on Windows, and is hidden below 640px; change it in your copy if your users are mostly on Windows.",
      },
      {
        q: "How do I lock it while a comment is sending?",
        a: "Return a promise from `onSubmit` and the button stays disabled until it settles; the textarea stays editable. To lock everything, pass `disabled`: the textarea and the button are disabled and the keyboard shortcut does nothing. Whitespace-only text never submits.",
      },
    ],
    keyboard: [
      { keys: "Cmd+Enter / Ctrl+Enter", action: "Submits the comment from the textarea." },
      { keys: "Enter", action: "In the textarea, adds a new line. On the button, submits." },
      { keys: "Tab", action: "Moves from the textarea to the submit button. The button is skipped while the box is empty." },
    ],
    a11y: [
      "It is a real `<form>` with a `type=\"submit\"` button. The textarea's `aria-label` comes from `label` (default \"Comment\").",
      "The submit button is disabled while the text is empty or only spaces, and while a returned `onSubmit` promise is pending.",
      "The \"⌘ Enter to send\" hint is `aria-hidden`.",
    ],
  },

  "currency-input": {
    faq: [
      {
        q: "Does onChange give me a number or a string?",
        a: "A string. Every character except digits, `.`, `,` and `-` is removed as you type, but the format is not checked, so `\"1.2.3\"` gets through. Parse it with `Number(v.replace(/,/g, \"\"))`, check the result, and store minor units on the server.",
      },
      {
        q: "Does it format thousands separators or decimals?",
        a: "No. It shows what was typed, minus other characters. If you want `12,400.00`, format on blur with `Intl.NumberFormat` and write the result back through `value`.",
      },
      {
        q: "Does the currency code change the symbol or decimal places?",
        a: "No. `currency` is only the code shown in the field and in the default accessible name, \"Amount in EUR\". Rounding and minor units are up to you.",
      },
    ],
    a11y: [
      "The currency code is linked to the input with `aria-describedby`, merged with any `aria-describedby` you pass, so screen readers hear \"USD\" after the name.",
      "Without `aria-label` or `id` the field is named \"Amount in USD\". With an `id`, a visible `<label htmlFor>` stays the name.",
      "The input uses `inputMode=\"decimal\"`, `autoComplete=\"transaction-amount\"` and `tabular-nums`.",
    ],
  },

  "date-picker": {
    faq: [
      {
        q: "What format is the value?",
        a: "Always an ISO day string, `\"2026-11-14\"`, whatever format the browser shows. ISO strings compare correctly with `<`. To get a local `Date`, use `new Date(value + \"T00:00\")`: `new Date(\"2026-11-14\")` is read as UTC midnight and can land on the previous day.",
      },
      {
        q: "Can I style the calendar popup?",
        a: "No. The popup is the browser's native picker; only the field takes your styles. For a calendar you can style, put [`CalendarMonth`](/docs/calendar-month) in a [`Popover`](/docs/popover).",
      },
      {
        q: "How do I clear it or submit it with a form?",
        a: "Set `value` to `\"\"` to clear it from code. When the user clears it, `onChange` gets `\"\"`. Pass `name` and the native input submits the ISO string with the form.",
      },
    ],
    a11y: [
      "A native `<input type=\"date\">`, so the browser supplies the date segments, the calendar popup, and their keyboard and screen reader support.",
      "There is no default accessible name: pass `aria-label`, or an `id` matched by a `<label htmlFor>` or [`FormField`](/docs/form-field).",
      "`min`, `max` and `required` are native attributes, so out-of-range or missing dates fail the browser's validation on submit.",
    ],
  },

  "date-range-picker": {
    faq: [
      {
        q: "Does it stop the end date being before the start date?",
        a: "No. The two inputs are independent and neither gets `min` or `max`. Check `range.from <= range.to` before using the range: ISO day strings compare correctly as strings.",
      },
      {
        q: "Does DateRangePicker submit with a form?",
        a: "Yes, when you name the ends: `<DateRangePicker fromName=\"from\" toName=\"to\" />` submits two ISO day strings. Without `fromName` and `toName`, `FormData` gets nothing.",
      },
      {
        q: "Is the end date inclusive?",
        a: "The `to` day is meant to be included, but it is only a string. When you query by timestamp, include the whole end day, for example `created_at < to + 1 day`.",
      },
    ],
    a11y: [
      "The two inputs sit in a `role=\"group\"` named by `aria-label` (default \"Date range\"). The \"to\" between them is `aria-hidden`.",
      "The inputs always carry `aria-label=\"Start date\"` and `aria-label=\"End date\"`. That name wins over an external `<label>` pointed at `fromId` or `toId`.",
      "Each end is a native date input, so keyboard and screen reader support come from the browser.",
    ],
  },

  "editable-heading": {
    faq: [
      {
        q: "How do I save the title once instead of on every keystroke?",
        a: "Save in `onBlur`: `onBlur={(e) => save(e.currentTarget.value)}`. Enter, Escape and clicking away all end there. After Escape the field already holds the original text, so the blur saves that and nothing changes. Compare with the last saved value to skip a request when the title did not change.",
      },
      {
        q: "Is it a real heading for screen readers and search engines?",
        a: "No. It renders an `<input>`, not an `<h1>`, so it is not part of the heading outline. If the page needs a heading, keep a real one, for example a visually hidden `<h1>` with the same text.",
      },
      {
        q: "Does Enter commit while I am typing in Japanese or Chinese?",
        a: "No. Keys sent while an IME is composing are ignored, so confirming a character with Enter does not end editing. That covers Safari too, which sends that Enter with `isComposing` false but `keyCode` 229.",
      },
    ],
    keyboard: [
      { keys: "Enter", action: "Ends editing and leaves the field." },
      { keys: "Escape", action: "Restores the text from when the field was focused and leaves the field." },
      { keys: "Tab", action: "Moves focus on. The text stays as typed." },
    ],
    a11y: [
      "A native `<input>` named by `aria-label`, which defaults to \"Title\". Pass a specific name, such as \"Report title\".",
      "The focus ring is `focus-visible` only, so the title looks like plain text until someone tabs to it or clicks it.",
      "An empty field shows `placeholder` (\"Untitled\" by default) in `text-fg-subtle`.",
    ],
  },

  "emoji-picker": {
    faq: [
      {
        q: "How do I open it from a reaction button?",
        a: "Put it inside a [`Popover`](/docs/popover) and close the popover in `onSelect`. EmojiPicker has no trigger or open state of its own.",
      },
      {
        q: "Can I change the emoji or the grid size?",
        a: "Pass your own list in `emojis` (12 by default) and set `columns` (6 by default). `columns` is also how far ArrowUp and ArrowDown jump. There is no search or category tabs.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus into the grid. Only the last focused emoji is a Tab stop." },
      { keys: "ArrowLeft / ArrowRight", action: "Moves to the previous or next emoji. Stops at the ends." },
      { keys: "ArrowUp / ArrowDown", action: "Moves up or down one row." },
      { keys: "Home / End", action: "Moves to the first or last emoji." },
      { keys: "Enter / Space", action: "Picks the focused emoji." },
    ],
    a11y: [
      "The grid is a `role=\"group\"` named by `aria-label` (default \"Emoji picker\").",
      "Each emoji is a `<button>` whose `aria-label` is the emoji character, so screen readers speak its name.",
    ],
  },

  "facet-filter": {
    faq: [
      {
        q: "Why do Open and Overdue start checked?",
        a: "Only with the built-in sample options. When you pass your own `options`, nothing starts checked unless you pass `defaultValue` or `value`.",
      },
      {
        q: "What order is the selection array in?",
        a: "The order the boxes were checked, not the order of `options`. Sort it before you put it in a URL or a cache key.",
      },
    ],
    keyboard: [
      { keys: "Space", action: "Checks or unchecks the focused facet. Tab moves to the next one." },
    ],
    a11y: [
      "The list is a `role=\"group\"` labelled by the `title` text through `aria-labelledby`.",
      "Each [`Checkbox`](/docs/checkbox) has its own id and a [`Label`](/docs/label) with `htmlFor`, so clicking the name or the count toggles it.",
      "The count sits inside the label, so a facet reads as \"Paid 128\". Counts use `tabular-nums`.",
    ],
  },

  "file-dropzone": {
    faq: [
      {
        q: "How do I upload to my API or S3 with progress?",
        a: "Pass `upload(file, onProgress)`: call `onProgress` with a number from 0 to 1 as bytes go out, and throw to mark the file as failed. `fetch` does not report upload progress, so use `XMLHttpRequest` and its `upload.onprogress` event. Failed uploads get a Retry button.",
      },
      {
        q: "What happens to a file that is too big or the wrong type?",
        a: "It is listed with an error, such as \"Larger than 10.0 MB\" or \"EXE files aren't accepted\", and is not passed to `onFiles` or `upload`. It gets no Retry button, only Remove.",
      },
      {
        q: "Why is my .pdf rejected while dragging?",
        a: "While dragging, the browser shows the file's MIME type but not its name, so an extension like `.pdf` cannot match and the drop is refused. Include the MIME type as well: `accept=\"application/pdf,.pdf\"`.",
      },
      {
        q: "How do I know when someone removes a file?",
        a: "Pass `onRemove`. It is called with the `File` when its Remove button is pressed, so you can drop it from your own state.",
      },
      {
        q: "Are the files in my form's FormData?",
        a: "No. The hidden file input has no `name` and is reset after each pick. Collect files in `onFiles` and append them yourself: `data.append(\"files\", file)`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the drop zone, then to each file's Retry and Remove buttons." },
      { keys: "Enter / Space", action: "On the drop zone, opens the file picker." },
    ],
    a11y: [
      "The zone is a `div` with `role=\"button\"` and `tabIndex=0`, described by the hint line, which lists the accepted types and the size limit. `disabled` sets `aria-disabled` and removes it from the Tab order.",
      "A polite live region announces \"2 files added\" after each pick or drop.",
      "Row buttons are named per file, such as \"Remove invoice.pdf\" and \"Retry invoice.pdf\". The progress bar is `aria-hidden`; the percentage is in the row text.",
      "The marching border and the row entrance are CSS animations, which the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "floating-label-input": {
    faq: [
      {
        q: "Why do I get a whole form instead of one field?",
        a: "Without `label`, FloatingLabelInput renders a sample sign-up form built from `fields`. Pass `label` and you get one input, or a textarea with `multiline`.",
      },
      {
        q: "Does the label move out of the way when the browser autofills?",
        a: "Yes. Autofill does not fire `onChange`, so the field checks `:autofill` 400ms after mount and on `animationstart`, and floats the label when it matches.",
      },
      {
        q: "How do I use it with React Hook Form?",
        a: "Use a `Controller`, because it does not forward a ref and `register()` needs one. Pass `value={field.value}`, `onChange={field.onChange}`, `onBlur={field.onBlur}` and `error={errors.email?.message}`. `onBlur` lets touched and blur-mode validation work.",
      },
    ],
    a11y: [
      "The label is a real `<label htmlFor>`. It moves with a spring transform only; under reduced motion `useReducedMotion` sets the duration to 0, so it jumps into place.",
      "`error` sets `aria-invalid`. The hint or error line is linked with `aria-describedby` and is `aria-live=\"polite\"`, so a new error is announced.",
      "The `required` asterisk is `aria-hidden`. `required` also sets the native attribute, which screen readers announce.",
    ],
  },

  "form-field": {
    faq: [
      {
        q: "Which controls does FormField wire up?",
        a: "When the child is a single element, FormField clones it and adds `aria-describedby` and `aria-invalid`, which works with controls that pass them to their input, such as [`Input`](/docs/input), [`Textarea`](/docs/textarea), [`CurrencyInput`](/docs/currency-input), [`DatePicker`](/docs/date-picker) and [`Combobox`](/docs/combobox). With several children or a Fragment, nothing is cloned.",
      },
      {
        q: "How do I show errors from React Hook Form or a Server Action?",
        a: "Pass the message as `error`, for example `error={errors.email?.message}` or `error={state.errors?.email}`. It replaces the description, sets `aria-invalid` on the control, and renders with `role=\"alert\"`, so it is announced when it appears.",
      },
      {
        q: "Does required make the field required?",
        a: "No. FormField's `required` only adds the red asterisk, which is `aria-hidden`. Set `required` on the control too, so the browser validates it and screen readers announce it.",
      },
    ],
    a11y: [
      "The label is a [`Label`](/docs/label) with `htmlFor={id}`, so the control's `id` must match.",
      "The message gets the id `{id}-error` or `{id}-description` and is added to the control's `aria-describedby`, after any ids the control already had.",
      "An `aria-invalid` set on the child is kept. FormField only sets it when the child has none and there is an `error`.",
    ],
  },

  "form-wizard": {
    faq: [
      {
        q: "How do I change the steps and fields?",
        a: "Edit the file. FormWizard is a block: the step names (`STEPS`), the fields, the headings and the done message are written in it, and the only props are `onComplete` and `className`.",
      },
      {
        q: "How is each step validated?",
        a: "With the browser's own checks. Each field has `required` and Next is a submit button, so the browser blocks the step and shows its message until the fields are valid. Add `pattern`, `type` or `minLength` to a field for stricter rules.",
      },
      {
        q: "Does Back keep what was typed?",
        a: "Yes. All values live in one state object for the whole wizard, so going back shows them again. `onComplete` gets `{ name, host, key }` from the review step.",
      },
    ],
    keyboard: [
      { keys: "Enter", action: "In a field, submits the step, like pressing Next. The browser stops it while a `required` field is empty." },
    ],
    a11y: [
      "Focus moves to the new step's heading (`tabIndex={-1}`) each time the step changes, and to the done heading at the end. It does not move on first render.",
      "The heading starts with a visually hidden \"Step 2 of 3:\", so screen readers hear the position as well as the title.",
      "The password field uses `autoComplete=\"new-password\"`, and the review step shows dots instead of the password.",
    ],
  },

  "image-upload": {
    faq: [
      {
        q: "How do I upload the chosen image to my server?",
        a: "Use the `File`, the second argument of `onChange`: `onChange={(url, file) => file && upload(file)}`. The URL is a `blob:` preview that only works in this tab and is revoked when the image is replaced, removed or unmounted.",
      },
      {
        q: "How do I show an image that is already saved?",
        a: "Pass its URL as `value`. ImageUpload follows later changes to `value` from the parent, and `null` shows the drop zone again.",
      },
      {
        q: "Which files does it accept?",
        a: "One image (`accept=\"image/*\"`) up to `maxSize`, which defaults to 5 MB. A larger file is listed with an error under the drop zone and `onChange` is not called.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the drop zone, opens the file picker." },
      { keys: "Tab", action: "With an image shown, moves to the Remove image button." },
    ],
    a11y: [
      "The preview `<img>` uses `alt`, which defaults to \"Upload preview\". Pass a description of the actual image, such as \"Cover photo for the Lisbon offsite\".",
      "The remove button is named \"Remove image\" and its icon is `aria-hidden`.",
      "The empty state is a [`FileDropzone`](/docs/file-dropzone), so it brings its `role=\"button\"` zone and its live region.",
      "Remove image unmounts itself, so focus falls back to the page. Move focus to the next control in `onChange` when it gets `null`.",
    ],
  },

  input: {
    faq: [
      {
        q: "How do I show an error state?",
        a: "Set `aria-invalid`: the border turns red and the focus halo turns red too. Wrap it in [`FormField`](/docs/form-field) with `error` to show the message and link it with `aria-describedby`.",
      },
      {
        q: "Does Input work with React Hook Form's register?",
        a: "Yes. Input passes every prop, including `ref` (a normal prop in React 19), to Base UI's Input, which renders a native `<input>`. `{...register(\"email\")}` works as is.",
      },
      {
        q: "Why does the size prop not set the input width?",
        a: "`size` is the height variant here: `\"sm\"` 32px, `\"default\"` 36px, `\"lg\"` 44px. The native `size` attribute is not available; set the width with `className`.",
      },
    ],
    a11y: [
      "A native `<input>` with no built-in name. Pair it with a [`Label`](/docs/label) through `id` and `htmlFor`, or pass `aria-label`.",
      "Focus shows an accent border and a 3px halo on `focus-visible`. Disabled and read-only inputs switch to the sunken background.",
    ],
  },

  "input-affix": {
    faq: [
      {
        q: "Do screen readers hear the leading and trailing text?",
        a: "Not as part of the field. They are plain spans next to the input, outside its accessible name. If the affix matters, say it in the name: `aria-label=\"Subdomain, ends in .minidev.pro\"`.",
      },
      {
        q: "Where do className and containerClassName go?",
        a: "`className` goes to the inner input. `containerClassName` goes to the outer box, so set widths there, such as `containerClassName=\"w-64\"`.",
      },
      {
        q: "Can I put a button in the trailing slot?",
        a: "Yes. `trailing` renders any node, so a small icon button works. Give it `type=\"button\"` so it does not submit the form, and an `aria-label`.",
      },
    ],
    a11y: [
      "The outer box shows the accent border and halo while the input is `focus-visible`, using `has-[input:focus-visible]`.",
      "`aria-invalid` on the input turns the outer border red. `disabled` disables the input and dims the whole box.",
      "Every other prop passes to [`Input`](/docs/input), so `id`, `aria-label` and `aria-describedby` work as usual.",
    ],
  },

  label: {
    faq: [
      {
        q: "Why doesn't Label dim next to a disabled Checkbox or Switch?",
        a: "Label's `peer-disabled:` styles only match a native control that is `:disabled`, such as an `<input class=\"peer\">` placed before it. [`Checkbox`](/docs/checkbox), [`Switch`](/docs/switch) and [`RadioGroup`](/docs/radio-group) items render a `<span>` with `data-disabled`, which never matches `:disabled`. Wrap the pair in an element with `className=\"group\"` and `data-disabled=\"true\"`, or pass `className=\"opacity-50\"` to the Label.",
      },
    ],
    a11y: [
      "A native `<label>`. With `htmlFor` matching the control's `id`, or wrapped around the control, it names the control and clicking it focuses or toggles the control.",
      "`select-none` stops a double click on the label from selecting its text.",
    ],
  },

  "markdown-editor": {
    faq: [
      {
        q: "Why does the editor start with release notes in it?",
        a: "`defaultValue` defaults to sample text. Pass `defaultValue=\"\"`, or control it with `value` and `onChange`.",
      },
      {
        q: "Is the preview safe from XSS?",
        a: "The preview builds React elements and never sets `innerHTML`, so raw HTML shows as text. Links are kept only for `http(s)`, `mailto:`, `/`, `#` and `./` or `../` paths; any other target, such as `javascript:`, keeps its text but loses the link. External links open in a new tab with `rel=\"noopener noreferrer\"`.",
      },
      {
        q: "Which Markdown does it support?",
        a: "Headings, paragraphs, bold, italic, strikethrough, inline code, fenced code blocks, quotes, bulleted and numbered lists, horizontal rules and links. Tables, images and task lists are not parsed, and indented list items are flattened into one level.",
      },
      {
        q: "Does it submit with a form?",
        a: "Pass `name` and the markdown is submitted under it. The value travels in a hidden input rather than on the textarea, so it is sent in preview mode too, when the textarea is not rendered.",
      },
    ],
    keyboard: [
      { keys: "Cmd+B / Ctrl+B", action: "In the textarea, wraps or unwraps the selection in bold." },
      { keys: "Cmd+I / Ctrl+I", action: "In the textarea, wraps or unwraps the selection in italics." },
      { keys: "Cmd+E / Ctrl+E", action: "In the textarea, wraps or unwraps the selection as inline code." },
      { keys: "Cmd+K / Ctrl+K", action: "In the textarea, inserts a link and selects the part to edit. The key does not reach a global command palette." },
      { keys: "ArrowLeft / ArrowRight", action: "In the formatting toolbar, moves between tools and wraps at the ends." },
      { keys: "Home / End", action: "In the formatting toolbar, moves to the first or last tool." },
    ],
    a11y: [
      "The tools sit in a `role=\"toolbar\"` named \"Formatting\" with one Tab stop. Each tool's name includes its shortcut, such as \"Bold (⌘B)\" on a Mac or \"Bold (Ctrl+B)\" elsewhere.",
      "Bold, Italic and Code get `aria-pressed=\"true\"` when the selection is already wrapped in that mark.",
      "The textarea is named by a visually hidden `<label>` from `label` (default \"Release notes\").",
      "The preview is a `role=\"region\"` named \"Preview\". It is not a live region, so it is not re-read on every keystroke.",
    ],
  },

  "masked-input": {
    faq: [
      {
        q: "What does onChange give me?",
        a: "An object: `{ masked, raw, complete }`, for example `{ masked: \"(415) 555-0142\", raw: \"4155550142\", complete: true }`. `value` and `defaultValue` take the raw characters, while a form submits the masked string under `name`.",
      },
      {
        q: "What is the small grey text under my field?",
        a: "The raw value. `showRaw` defaults to `true`; pass `showRaw={false}` to hide it. The green check when the mask is full is `showComplete`, also on by default.",
      },
      {
        q: "Can I format a value outside the input?",
        a: "Yes. The file exports `applyMask`: `applyMask(\"(999) 999-9999\", \"5550102030\")` returns `\"(555) 010-2030\"`. Use it to show stored values in tables or receipts.",
      },
      {
        q: "Should I use it for international phone numbers?",
        a: "No. A mask has one fixed shape. For numbers in any country's format use [`PhoneInput`](/docs/phone-input), and validate on submit.",
      },
    ],
    a11y: [
      "The guide text and the completion check are `aria-hidden`, so completeness is not announced. Validate on submit and use `invalid` with `hint` for errors.",
      "`hint` is linked with `aria-describedby`, and `invalid` sets `aria-invalid`. The raw value line starts with a visually hidden \"Raw value\".",
      "Digit-only masks get `inputMode=\"numeric\"`. Spell check and autocorrect are always off, and `uppercase` sets `autoCapitalize=\"characters\"`.",
    ],
  },

  "mention-input": {
    faq: [
      {
        q: "How do I store who was mentioned?",
        a: "The value is plain text with `@handle ` inserted. `onMention` fires with the handle each time one is picked, so keep your own list there, or parse the text on submit with `/@([\\w.-]+)/g`. Handles can only contain letters, digits, `_`, `.` and `-`.",
      },
      {
        q: "Why does nothing appear when I type @?",
        a: "`suggestions` defaults to an empty array, so pass your handles. The `@` must also start the text or follow a space or line break, which is why email addresses do not open the list.",
      },
      {
        q: "Can the list show full names and avatars?",
        a: "No. `suggestions` is a string array, shown as `@handle`, and at most six show at once. Filter it to the people who can see the thread before passing it in.",
      },
    ],
    keyboard: [
      { keys: "ArrowDown / ArrowUp", action: "While suggestions show, moves the highlight. Wraps at both ends." },
      { keys: "Enter / Tab", action: "While suggestions show, inserts the highlighted handle and a space. Otherwise Enter adds a new line." },
      { keys: "Escape", action: "Closes the suggestions. The text stays." },
    ],
    a11y: [
      "The textarea keeps focus and has `role=\"combobox\"`, with `aria-expanded` set while suggestions show, so screen readers say when the list opens. While open, `aria-controls` and `aria-activedescendant` point at the list and the highlighted `role=\"option\"`.",
      "The list is a `role=\"listbox\"` named \"Mention suggestions\", and the highlighted option has `aria-selected=\"true\"`.",
      "Without `aria-label` or `id`, the textarea is named \"Comment\".",
    ],
  },

  "number-input": {
    faq: [
      {
        q: "When does onChange fire?",
        a: "Right away whenever the field holds a number within `min` and `max`: after each button press, arrow key, spinner click or keystroke. With no `min`, typing \"15\" fires with 1, then 15. Text outside the bounds is clamped on blur or Enter, and empty or invalid text reverts to the last value.",
      },
      {
        q: "Can the field be empty?",
        a: "No. The value is always a number, `defaultValue` is 0, and clearing the field then leaving it restores the last value. For an optional number use [`Input`](/docs/input) with `type=\"number\"`.",
      },
      {
        q: "Should I use NumberInput or QuantityStepper?",
        a: "NumberInput lets people type the value, so it suits exact counts and decimals. [`QuantityStepper`](/docs/quantity-stepper) only has − and + around a read-only number, which suits small cart quantities.",
      },
    ],
    keyboard: [
      { keys: "ArrowUp / ArrowDown", action: "In the field, adds or removes `step`, using the browser's number input." },
      { keys: "Enter", action: "Commits typed text, clamped to `min` and `max`." },
      { keys: "Tab", action: "Moves between the Decrease button, the field and the Increase button." },
      { keys: "Enter / Space", action: "On a button, steps the value down or up." },
    ],
    a11y: [
      "The field is a native `<input type=\"number\">` with `min`, `max` and `step`. Without `aria-label` or `id` it is named \"Number\".",
      "The buttons are named \"Decrease\" and \"Increase\", without the field's name, and are disabled at the bounds. A button pressed up to its bound can lose focus when it disables.",
      "`inputMode` is `\"numeric\"` for whole steps with no negative `min`, and `\"decimal\"` otherwise. Digits use `tabular-nums`.",
    ],
  },

  "onboarding-flow": {
    faq: [
      {
        q: "How do I change the questions?",
        a: "Edit the file. OnboardingFlow is a block with three steps written in it (workspace name, invites, digest) and only `onFinish` and `className` as props.",
      },
      {
        q: "What format are the invites in?",
        a: "`invites` is the raw string from an `<input type=\"email\" multiple>`, so split it: `v.invites.split(\",\").map((s) => s.trim()).filter(Boolean)`. The browser checks each address when Continue is pressed.",
      },
      {
        q: "What happens after Finish?",
        a: "It calls `onFinish` with `{ workspace, invites, digest }` and stays on the last step: there is no done screen. Redirect or close it in `onFinish`. [`FormWizard`](/docs/form-wizard) has a done state.",
      },
    ],
    keyboard: [
      { keys: "Enter", action: "In a text field, submits the step, like pressing Continue." },
      { keys: "ArrowLeft / ArrowRight", action: "On the digest step, switches between the two options." },
    ],
    a11y: [
      "The form is named by its \"Set up Lumen\" heading through `aria-labelledby`.",
      "On the digest step, the question is the [`SegmentedControl`](/docs/segmented-control)'s `aria-label`, and the visible copy is `aria-hidden` so it is not read twice.",
      "When the step changes, focus moves to the heading, which reads \"Set up Lumen, step 2 of 3: Team\" through visually hidden text. Focus is not moved on first load.",
    ],
  },

  "password-input": {
    faq: [
      {
        q: "Does PasswordInput work with React Hook Form's register?",
        a: "Yes. Every prop, including `ref` in React 19, goes to the native `<input>`, so `{...register(\"password\")}` works. Only `type` is managed by the component.",
      },
      {
        q: "Can I control the show or hide state?",
        a: "No. It is kept inside the component and starts hidden. If you need it, copy the file and lift `show` into props.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves from the field to the show or hide button." },
      { keys: "Enter / Space", action: "On the button, shows or hides the password." },
    ],
    a11y: [
      "The toggle is a real button named \"Show password\" or \"Hide password\", with `aria-controls` pointing at the input.",
      "`disabled` disables both the input and the toggle.",
      "The input has no name of its own: pair it with a `<label htmlFor>` using the same `id`, or pass `aria-label`.",
    ],
  },

  "password-strength": {
    faq: [
      {
        q: "How do I use zxcvbn or my own scoring?",
        a: "Pass `score`, a function from the password to 0 to 4: `score={(v) => zxcvbn(v).score}`. The result is rounded and clamped, and the `rules` checklist still shows.",
      },
      {
        q: "Does it block weak passwords?",
        a: "No. Nothing stops typing or submitting. Run the same `rules` on submit, and check again on the server.",
      },
      {
        q: "How is the default score worked out?",
        a: "It counts the rules met, takes one off below 8 characters and adds one at 16 or more, then clamps to 1 to 4. With the default rules, \"Northwind2026!\" meets all four and scores 4, \"Strong\".",
      },
    ],
    a11y: [
      "The input's `aria-describedby` points at the strength label and the rules list, so both are read with the field.",
      "The strength label (\"Weak\", \"Good\"…) is `aria-live=\"polite\"`, so changes are announced as you type.",
      "Each rule ends with a visually hidden \"(met)\" or \"(not met)\". The meter bars and icons are `aria-hidden`.",
      "The input uses `autoComplete=\"new-password\"` so password managers offer a generated password.",
    ],
  },

  "phone-input": {
    faq: [
      {
        q: "Does PhoneInput format or validate the number?",
        a: "No. It is free text, so any country's format fits. Validate and normalise on submit, for example to E.164 with a library such as libphonenumber-js.",
      },
      {
        q: "Why does onChange give a string, not an event?",
        a: "PhoneInput calls `onChange` with `e.target.value`. Use `value` and `onChange` to control it, or `defaultValue` and `name` to let the form read it.",
      },
    ],
    a11y: [
      "A native `<input type=\"tel\">` with `inputMode=\"tel\"` and `autoComplete=\"tel\"`, so phones show the keypad and browsers offer the saved number.",
      "Without `aria-label` or `id`, the field is named \"Phone number\".",
    ],
  },

  "radio-group": {
    faq: [
      {
        q: "How do I use RadioGroup with React Hook Form?",
        a: "Use a `Controller`: `<RadioGroup value={field.value} onValueChange={field.onChange}>`. Base UI calls `onValueChange` with `(value, eventDetails)`, and `value` is typed as `unknown`, so cast it in your own handlers.",
      },
      {
        q: "Does RadioGroup submit with a form?",
        a: "Yes. Pass `name` to `RadioGroup`, and Base UI renders hidden inputs, so `FormData` gets the checked item's `value`.",
      },
      {
        q: "How do I make the label clickable?",
        a: "Give each `RadioGroupItem` an `id` and point a [`Label`](/docs/label) at it with `htmlFor`, or wrap the item and its text in the `<Label>`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the checked radio, or the first one when none is checked." },
      { keys: "ArrowDown / ArrowRight", action: "Moves to the next radio and checks it. Wraps at the end." },
      { keys: "ArrowUp / ArrowLeft", action: "Moves to the previous radio and checks it. Wraps at the start." },
      { keys: "Space", action: "Checks the focused radio." },
      { keys: "Enter", action: "Does nothing, as on native radios." },
    ],
    a11y: [
      "`RadioGroup` has `role=\"radiogroup\"`; name it with `aria-label` or `aria-labelledby`. Each item is a `<span role=\"radio\">` with `aria-checked`.",
      "Each radio is 16px, and an `::after` adds 12px on every side for a 40px hit area.",
      "The dot scales in with a CSS transition, which the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "range-slider": {
    faq: [
      {
        q: "Should I fetch in onValueChange or onValueCommitted?",
        a: "`onValueCommitted`. `onValueChange` fires on every move while dragging; `onValueCommitted` fires once when the thumb is released or after a key press, with `[low, high]`.",
      },
      {
        q: "How do I keep a minimum gap between the two thumbs?",
        a: "Pass `minStepsBetweenValues`, in steps. With `step={5}` and `minStepsBetweenValues={2}`, low and high always stay at least 10 apart.",
      },
      {
        q: "How do I show prices in the value bubbles?",
        a: "Pass `format`, either `Intl.NumberFormat` options such as `{ style: \"currency\", currency: \"USD\", maximumFractionDigits: 0 }` or a function. It formats both the bubbles and the value screen readers hear.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves between the low and high thumbs." },
      { keys: "ArrowRight / ArrowUp", action: "Raises the focused thumb by `step`." },
      { keys: "ArrowLeft / ArrowDown", action: "Lowers the focused thumb by `step`." },
      { keys: "Shift+ArrowRight / Shift+ArrowUp / PageUp", action: "Raises it by the large step, 10 by default." },
      { keys: "Shift+ArrowLeft / Shift+ArrowDown / PageDown", action: "Lowers it by the large step." },
      { keys: "Home / End", action: "Moves the thumb as far as it can go, up to the other thumb." },
    ],
    a11y: [
      "The thumbs are named \"Range, minimum\" and \"Range, maximum\", or your `aria-label` with the same endings. With `aria-labelledby`, a hidden \"minimum\" or \"maximum\" is added to each thumb's name.",
      "The value bubbles are `aria-hidden`; screen readers hear the value from the slider itself, formatted by `format`.",
      "Pass `name` and Base UI submits both values with the form.",
    ],
  },

  rating: {
    faq: [
      {
        q: "How do I show a read-only average like 4.3?",
        a: "Pass `value={4.3} readOnly`. Stars do not show fractions: here four are filled. Put the exact number in the name, such as `aria-label=\"Average rating, 4.3 out of 5\"`.",
      },
      {
        q: "Can someone clear their rating?",
        a: "No. Clicking the selected star keeps it, and there is no way back to 0 from the stars. Add your own Clear button that sets `value` to 0.",
      },
      {
        q: "Does Rating submit with a form?",
        a: "Yes, with `name`: `<Rating name=\"score\" />` submits the score through a hidden input, `\"0\"` when nothing is picked. Check for 0 on the server if a rating is required.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the current star, or the first star when there is no rating." },
      { keys: "ArrowRight / ArrowUp", action: "Selects the next star. Wraps from the last to the first." },
      { keys: "ArrowLeft / ArrowDown", action: "Selects the previous star. Wraps from the first to the last." },
      { keys: "Home / End", action: "Selects 1 star or the top score." },
    ],
    a11y: [
      "The row is a `role=\"radiogroup\"` named by `aria-label` (default \"Rating\"), with `aria-readonly` when `readOnly`.",
      "Each star is a `<button role=\"radio\">` named \"1 star\", \"2 stars\" and so on. The star icons are `aria-hidden`.",
      "Hover only previews the score; it changes nothing until a click.",
    ],
  },

  "rich-text-toolbar": {
    faq: [
      {
        q: "How do I connect it to my editor?",
        a: "Handle `onAction(action, pressed)`, where `action` is `\"bold\"`, `\"italic\"`, `\"link\"`, `\"bullet-list\"` or `\"numbered-list\"`, and run your editor's command, for example `editor.chain().focus().toggleBold().run()` in Tiptap.",
      },
      {
        q: "Can the buttons follow the editor's current selection?",
        a: "Not as written. Each button keeps its own pressed state and there is no prop to set it, so moving the cursor into bold text does not press Bold. For that, pass controlled `pressed` values to the [`Toggle`](/docs/toggle) buttons in your copy.",
      },
      {
        q: "Why does Link report pressed and unpressed?",
        a: "Every button, including Link and the two lists, is a [`Toggle`](/docs/toggle). The first press sends `pressed: true` and the next `false`. For Link, open your link dialog on either.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus into the toolbar. It is one Tab stop." },
      { keys: "ArrowLeft / ArrowRight", action: "Moves between buttons and wraps at the ends." },
      { keys: "Enter / Space", action: "Toggles the focused button." },
    ],
    a11y: [
      "A Base UI `role=\"toolbar\"` named by `aria-label` (default \"Formatting\"), with `aria-orientation=\"horizontal\"`.",
      "Each button has an `aria-label` (\"Bold\", \"Bullet list\"…) and `aria-pressed`. The icons are `aria-hidden`.",
    ],
  },

  "search-input": {
    faq: [
      {
        q: "Why does my onChange handler break when the field is cleared?",
        a: "Clearing calls `onChange` with a small stand-in object, not a real event: only `target.value` and `currentTarget.value` are set, both `\"\"`. Read `e.target.value` in your handler and do not call event methods such as `e.preventDefault()`.",
      },
      {
        q: "Does Escape in the field also close the dialog around it?",
        a: "Not while there is text. The first Escape clears the field and stops the event, so a surrounding [`Dialog`](/docs/dialog) or [`Popover`](/docs/popover) stays open. With an empty field, SearchInput ignores Escape, so the next press closes the dialog.",
      },
      {
        q: "How do I run the search after the user stops typing?",
        a: "Control it with `value` and `onChange`, and debounce the query in an effect, about 200ms. Use `onClear` to reset the results at once.",
      },
    ],
    keyboard: [
      { keys: "Escape", action: "Clears the text and keeps focus in the field. In an empty field, it passes on, for example to close a dialog." },
      { keys: "Tab", action: "Moves to the clear button while there is text." },
      { keys: "Enter / Space", action: "On the clear button, clears the text and returns focus to the field." },
    ],
    a11y: [
      "The field is `type=\"search\"`, which screen readers announce as a search box. Name it with `aria-label` or a label.",
      "The clear button is named \"Clear search\", and both icons are `aria-hidden`.",
      "After clearing, focus goes back to the input, so keyboard users can type again straight away.",
    ],
  },

  "search-with-results": {
    faq: [
      {
        q: "How do I fetch results from an API?",
        a: "Pass `onSearch`, which is called with the raw text on every keystroke, and pass the fetched list back as `results`. With `onSearch` set, the component stops filtering on its own. Debounce the fetch yourself.",
      },
      {
        q: "Why is the whole list shown before anyone types?",
        a: "With an empty query it shows all of `results`. Pass `results={[]}` until there is a query, but note that an empty list shows \"No results\".",
      },
      {
        q: "Can I move through the results with the arrow keys?",
        a: "No. With `onSelect`, each result is a button in the Tab order; without it, results are plain text. For arrow key navigation use [`CommandPalette`](/docs/command-palette) or [`Autocomplete`](/docs/autocomplete).",
      },
    ],
    keyboard: [
      { keys: "Escape", action: "In the field, clears the query." },
      { keys: "Tab", action: "Moves from the field to each result, when `onSelect` is set." },
      { keys: "Enter / Space", action: "On a result, calls `onSelect` with it." },
    ],
    a11y: [
      "A visually hidden live region announces \"3 results\" as the query changes. It stays silent while the query is empty.",
      "The field's accessible name is `placeholder` without its trailing ellipsis, so \"Search…\" becomes \"Search\".",
      "The field is a [`SearchInput`](/docs/search-input), so Escape clears it and the clear button is named \"Clear search\".",
    ],
  },

  "segmented-control": {
    faq: [
      {
        q: "Why does it show Monthly and Yearly when I pass nothing?",
        a: "Those are the default `items`. Pass `items` as plain strings, where each label is also its value, or `options` with `value`, `label`, `icon`, `badge` and `disabled`.",
      },
      {
        q: "How do I add a discount badge to an option?",
        a: "Use `badge`: `options={[{ value: \"monthly\", label: \"Monthly\" }, { value: \"yearly\", label: \"Yearly\", badge: \"-20%\" }]}`. The badge turns accent coloured when its option is selected.",
      },
      {
        q: "Can I use it in a form?",
        a: "Yes. Pass `name` and the selected value is submitted through a hidden input. For a form question with longer answers or a description per option, [`RadioGroup`](/docs/radio-group) reads better.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the selected option." },
      { keys: "ArrowRight / ArrowDown", action: "Selects the next enabled option. Wraps at the end." },
      { keys: "ArrowLeft / ArrowUp", action: "Selects the previous enabled option. Wraps at the start." },
      { keys: "Home / End", action: "Selects the first or last enabled option." },
    ],
    a11y: [
      "The track is a `role=\"radiogroup\"` named by `aria-label`, which defaults to \"Options\": always pass one that says what is chosen. Each option is a `<button role=\"radio\">` with `aria-checked`.",
      "Disabled options are skipped by the arrow keys. With no matching `value`, the first enabled option is the Tab stop.",
      "The thumb is `aria-hidden` and slides on a spring. Under reduced motion `useReducedMotion` sets the duration to 0.",
    ],
  },

  select: {
    faq: [
      {
        q: "Why does the trigger show the value instead of the label?",
        a: "`SelectValue` only knows the labels when you pass `items` to `Select`, such as `items={[{ value: \"usd\", label: \"US dollar\" }]}`. Without it, the trigger shows the raw value.",
      },
      {
        q: "How do I use Select with React Hook Form or FormData?",
        a: "For FormData, pass `name` to `Select` and Base UI renders a hidden input. With React Hook Form use a `Controller`: `<Select value={field.value} onValueChange={field.onChange}>`. `onValueChange` receives `(value, eventDetails)`.",
      },
      {
        q: "Can the popup open over the trigger, like a native macOS menu?",
        a: "Yes. `SelectContent` sets `alignItemWithTrigger` to `false` by default. Pass `alignItemWithTrigger` to place the selected item over the trigger.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space / ArrowDown / ArrowUp", action: "On the trigger, opens the list." },
      { keys: "ArrowDown / ArrowUp", action: "Moves the highlight through the items." },
      { keys: "Home / End", action: "Moves to the first or last item." },
      { keys: "A-Z", action: "Typeahead: jumps to the next item starting with the typed letters." },
      { keys: "Enter / Space", action: "Selects the highlighted item and closes the list." },
      { keys: "Escape", action: "Closes the list and returns focus to the trigger." },
    ],
    a11y: [
      "Built on Base UI Select: the list is a `role=\"listbox\"` and each item a `role=\"option\"` with `aria-selected`.",
      "Name the trigger: pass `aria-label` to `SelectTrigger`, or give it an `id` and point a [`Label`](/docs/label) at it.",
      "`aria-invalid` on the trigger turns its border red.",
      "The popup fades and scales with CSS animations, which the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "signature-pad": {
    faq: [
      {
        q: "How do I save the signature?",
        a: "`onChange` gives a transparent PNG data URL after each stroke, or `null` when the pad is empty. Upload it or store it as an image. In Type mode the typed name is drawn in a script font to a PNG of the same kind.",
      },
      {
        q: "Can I load a saved signature or clear it from my code?",
        a: "No. There is no `value` prop or ref: the pad always starts empty and is cleared with its own Clear button. To reset it from outside, change its `key` so React mounts a fresh one.",
      },
      {
        q: "Why are the strokes white in dark mode?",
        a: "Strokes use the canvas text colour, `text-fg`, so in dark mode the PNG has light strokes on a transparent background and can vanish on a white PDF. Change the canvas's `text-fg` class in your copy if the image must always be dark.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to \"Type instead\", then Undo and Clear. Drawing needs a pointer." },
      { keys: "Enter / Space", action: "On \"Type instead\", switches to a text field where the name can be typed." },
    ],
    a11y: [
      "The canvas is `role=\"img\"`, named by the visible `label` and described by a hidden hint: \"Draw your signature with a mouse, pen or finger, or choose Type instead.\"",
      "Keyboard users sign through the Type mode input, which is named by the same label.",
      "Undo and Clear are disabled while the pad is empty.",
    ],
  },

  "slash-command-menu": {
    faq: [
      {
        q: "Why don't the arrow keys work while I type in my editor?",
        a: "The menu handles keys only when focus is inside it, and your editor keeps focus while you type. Either let people Tab into the menu, or handle ArrowUp, ArrowDown and Enter in your editor's `onKeyDown` and track the active command yourself.",
      },
      {
        q: "How do I position it at the caret?",
        a: "SlashCommandMenu is only the list; it does not open, close or position itself. Render it when `/` is typed, place it with `className` (for example `absolute` with your caret coordinates), and pass the text after the slash as `query`.",
      },
      {
        q: "What shows when nothing matches?",
        a: "\"No commands\", in a `role=\"status\"` paragraph so screen readers hear it. Nothing in the menu can take focus then, so close it from your editor.",
      },
    ],
    keyboard: [
      { keys: "ArrowDown / ArrowUp", action: "With focus in the menu, moves to the next or previous command. Wraps at both ends." },
      { keys: "Home / End", action: "Moves to the first or last command." },
      { keys: "Enter / Space", action: "Runs the focused command through `onSelect`." },
      { keys: "Escape", action: "Calls `onClose`. Move focus back to your editor there." },
    ],
    a11y: [
      "The menu is a `role=\"listbox\"` named \"Slash commands\". Each command is a button with `role=\"option\"`, and the active one has `aria-selected=\"true\"`.",
      "Roving tabindex: only the active command is in the Tab order, and a new `query` moves the highlight back to the first match.",
      "The menu does not return focus on close; do it in `onClose`.",
    ],
  },

  slider: {
    faq: [
      {
        q: "How do I make a range slider?",
        a: "Pass an array: `defaultValue={[20, 80]}` gives two thumbs, named \"Price, minimum\" and \"Price, maximum\" with `aria-label=\"Price\"`. [`RangeSlider`](/docs/range-slider) wraps this with plain number arrays in its callbacks.",
      },
      {
        q: "Why is the value in onValueChange a number or an array?",
        a: "Base UI passes a number for one thumb and an array for several, with `eventDetails` as the second argument. Cast it to match how you set `defaultValue`: `onValueChange={(v) => setVolume(v as number)}`.",
      },
      {
        q: "How do I show the value as currency or a percent?",
        a: "Pass `format` as `Intl.NumberFormat` options, like `{ style: \"percent\" }`, or as a function. It formats the value bubble and the value screen readers hear. `showValue={false}` hides the bubble.",
      },
    ],
    keyboard: [
      { keys: "ArrowRight / ArrowUp", action: "Raises the focused thumb by `step`." },
      { keys: "ArrowLeft / ArrowDown", action: "Lowers the focused thumb by `step`." },
      { keys: "Shift+ArrowRight / Shift+ArrowUp / PageUp", action: "Raises it by `largeStep`, 10 by default." },
      { keys: "Shift+ArrowLeft / Shift+ArrowDown / PageDown", action: "Lowers it by `largeStep`." },
      { keys: "Home / End", action: "Moves the thumb to the minimum or maximum." },
    ],
    a11y: [
      "Each thumb is named by `aria-label`, or \"Value\" when there is neither `aria-label` nor `aria-labelledby`. Range thumbs get \", minimum\" and \", maximum\" added.",
      "The value bubble and the marks are `aria-hidden`; a function `format` also sets each thumb's `aria-valuetext`.",
      "The thumb is 16px, and an `::after` adds 14px on each side for touch.",
      "The bubble fades in with a CSS animation, which the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  switch: {
    faq: [
      {
        q: "How do I show a saving state while the change goes to my API?",
        a: "Pass `loading`. The thumb shows a spinner, the switch becomes read-only so it cannot be toggled again, and it gets `aria-busy`. In the label row, a live region also says \"Saving\".",
      },
      {
        q: "How do I add a label and a description?",
        a: "Pass `label` and `description`: `<Switch label=\"Email alerts\" description=\"A digest every morning.\" />`. The whole row becomes a `<label>`, so clicking anywhere on it toggles the switch.",
      },
      {
        q: "Does Switch submit with a form?",
        a: "Yes, with `name`. Base UI renders a hidden input that submits \"on\" (or your `value`) when on, and nothing when off unless you pass `uncheckedValue`. For React Hook Form use a `Controller` with `checked={field.value} onCheckedChange={field.onChange}`.",
      },
    ],
    keyboard: [
      { keys: "Space / Enter", action: "Toggles the switch. While held, Space stretches the thumb toward its next position." },
      { keys: "Tab", action: "Moves focus to the switch. A loading switch stays focusable." },
    ],
    a11y: [
      "Renders `role=\"switch\"` with `aria-checked`. In the label row it uses `aria-labelledby` for `label` (unless you pass `aria-label`) and `aria-describedby` for `description`.",
      "The thumb moves on a spring with Motion. Under reduced motion `useReducedMotion` sets the duration to 0, so it jumps.",
      "An `::after` extends the hit area 8px left and right and 12px above and below.",
    ],
  },

  "tags-input": {
    faq: [
      {
        q: "Does TagsInput submit with a form?",
        a: "Yes, with `name`. Each tag goes in its own hidden input under that name, so read them with `formData.getAll(\"tags\")`. Text still in the field is not a tag yet: it is added on Enter, a comma, or when the field loses focus.",
      },
      {
        q: "Are duplicate tags allowed?",
        a: "Exact duplicates and blank entries are dropped, but the check is case sensitive, so \"Q3\" and \"q3\" can both be added. Past `max`, extra entries are ignored.",
      },
      {
        q: "Can people paste a list of tags?",
        a: "Yes. Pasting \"finance, q3, audit\" and pressing Enter, typing a comma, or leaving the field adds three tags.",
      },
    ],
    keyboard: [
      { keys: "Enter / ,", action: "Adds the typed text as a tag. Enter in an empty field is not intercepted, so it submits the form." },
      { keys: "Backspace", action: "In an empty field, removes the last tag." },
      { keys: "Shift+Tab", action: "Moves back to the tags' remove buttons." },
    ],
    a11y: [
      "A polite live region announces \"Added finance\" or \"Removed q3\" after each change.",
      "Each tag's remove button is named \"Remove\" plus the tag, and its icon is `aria-hidden`.",
      "Without `aria-label` or `id`, the text input is named \"Add tag\". `aria-invalid` is set on both the wrapper and the input.",
    ],
  },

  textarea: {
    faq: [
      {
        q: "How do I make the textarea grow with its content?",
        a: "Add `autoResize`. It uses CSS `field-sizing: content`, so no JavaScript runs: `rows` sets the minimum height and it stops growing at 384px. Browsers without `field-sizing` keep a fixed height.",
      },
      {
        q: "How do I add a character limit with a counter?",
        a: "Set `maxLength` for a hard cap and put a [`CharacterCount`](/docs/character-count) under it, with the textarea's `aria-describedby` pointing at the counter's `id`.",
      },
    ],
    a11y: [
      "A native `<textarea>` that passes every prop through, including `ref`. Name it with a `<label htmlFor>` or `aria-label`.",
      "`aria-invalid` turns the border and the focus halo red. Read-only and disabled states use the sunken background.",
    ],
  },

  "time-picker": {
    faq: [
      {
        q: "Is the value 12-hour or 24-hour?",
        a: "Always 24-hour `\"HH:mm\"`, such as `\"14:30\"`, even when the browser shows AM and PM. With a `step` under 60 seconds the browser can add seconds: `\"HH:mm:ss\"`.",
      },
      {
        q: "How do I limit it to working hours in 15 minute steps?",
        a: "Pass `min=\"09:00\"`, `max=\"17:00\"` and `step={900}` (step is in seconds). The browser rejects other times when the form is submitted, though some pickers still show them.",
      },
    ],
    a11y: [
      "A native `<input type=\"time\">`: the browser supplies the segments, the picker, and their keyboard and screen reader support.",
      "There is no default name. Pass `aria-label`, or an `id` with a label.",
    ],
  },

  "user-chip": {
    faq: [
      {
        q: "How are the initials made when there is no photo?",
        a: "From the first letter of the first and last words, so \"Maya Chen\" gives \"MC\". A single word keeps its first two letters: \"Priya\" gives \"PR\".",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the remove button, when `onRemove` is set." },
      { keys: "Enter / Space", action: "On the remove button, calls `onRemove`." },
    ],
    a11y: [
      "The avatar image has `alt=\"\"` because the name is written next to it.",
      "The remove button is named \"Remove\" plus the name, such as \"Remove Maya Chen\", and its icon is `aria-hidden`.",
    ],
  },

  "workspace-create": {
    faq: [
      {
        q: "How does the URL slug work?",
        a: "It follows the name, lowercased, with accents removed, other characters turned into dashes and a 48 character cap, until someone edits the URL field. Clearing that field makes it follow the name again. The `lumen.app/` prefix in the preview is written in the file, so change it there.",
      },
      {
        q: "How do I show an error like \"That URL is taken\"?",
        a: "There is no error prop: only `pending`. Show the error next to the form, or in your copy pass `error` to the URL [`FormField`](/docs/form-field), which marks the input invalid and announces the message.",
      },
      {
        q: "Can I use a Server Action?",
        a: "Not as the form's `action`: the form calls `preventDefault()` and hands `{ name, slug }` to `onCreate`. Call your action from there and set `pending` while it runs.",
      },
    ],
    a11y: [
      "Both fields use [`FormField`](/docs/form-field) with visible labels. The name has `required`, and the URL preview is the URL field's description.",
      "While `pending`, the button is disabled, gets `aria-busy` and reads \"Creating…\".",
    ],
  },

  "cart-line-item": {
    faq: [
      {
        q: "Why can't the quantity go below 1?",
        a: "`min` defaults to 1, from [`QuantityStepper`](/docs/quantity-stepper). Removing a line is the job of `onRemove`. Pass `min={0}` if zero should stay in the cart.",
      },
      {
        q: "Is the price per unit or the line total?",
        a: "Whatever string you pass: `price` is displayed as is. If it is the line total, recompute it when `onQuantityChange` fires.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through Decrease, Increase and Remove. A stepper button at its bound is disabled and skipped." },
    ],
    a11y: [
      "The stepper sits in a `role=\"group\"` named \"Quantity for\" plus the title, so its \"Decrease quantity\" and \"Increase quantity\" buttons are heard in context.",
      "The quantity is an `<output aria-live=\"polite\">`, so the new number is announced after each press.",
      "The remove button is named \"Remove\" plus the title, such as \"Remove Aurora desk lamp\".",
    ],
  },

  "checkout-summary": {
    faq: [
      {
        q: "How do I make the Pay button submit my payment form?",
        a: "Render CheckoutSummary inside the `<form>` and pass `payType=\"submit\"`. Pass `disabled` while card details are invalid or a payment is in flight.",
      },
      {
        q: "Does it add up the total?",
        a: "No. `items[].price` and `total` are display strings. Work in cents, add up on the server, and format with `Intl.NumberFormat` before passing them in.",
      },
    ],
    a11y: [
      "A `<section>` named by its heading through `aria-labelledby`. The heading is an `<h3>`; change it in your copy if your page needs another level.",
      "Line items are a `<ul>`, so screen readers say how many there are. The total row sits outside the list.",
    ],
  },

  "commerce-checkout": {
    faq: [
      {
        q: "What does onPay receive?",
        a: "The total in cents, tax included. With the default 5 seats at $49 and 8% tax that is `26460`. Use it to show the amount, but compute the real charge on your server.",
      },
      {
        q: "How do I change the price, tax or product?",
        a: "Edit the file: `SEAT_CENTS`, `TAX_RATE` and the [`CartLineItem`](/docs/cart-line-item) title are constants in it. CommerceCheckout is a block with only `onPay` and `className` as props.",
      },
      {
        q: "Is the billing address sent anywhere?",
        a: "Not by default. The address inputs have `name`s, but submit only calls `onPay(total)`, so read `new FormData(e.currentTarget)` in your copy. The fields use `shipping` autofill tokens; swap in [`BillingAddress`](/docs/billing-address) for billing autofill.",
      },
    ],
    a11y: [
      "It is one native `<form>`, so Enter in an address field submits it, and the Pay button's text includes the total.",
      "The address is a `<fieldset>` with a visually hidden legend, \"Billing address\".",
      "On small screens the summary stacks under the form, so the reading order matches the visual order.",
    ],
  },

  "coupon-input": {
    faq: [
      {
        q: "How do I check codes against my server?",
        a: "Pass `onApply`, which may be async, and return `true` for a valid code or `false` or an error string for an invalid one. If it throws, the message reads \"Could not check the code. Try again.\" Without `onApply` it runs a demo that accepts \"HAIRLINE\".",
      },
      {
        q: "Why doesn't Enter submit my checkout form?",
        a: "On purpose: Enter in the code field applies the code and calls `preventDefault()`, so it never submits the surrounding form. The Apply button is `type=\"button\"` for the same reason.",
      },
      {
        q: "What happens if the code is edited after it was applied?",
        a: "The message clears, but CouponInput does not tell you, and has no `onChange`. Keep the applied code from `onApply` in your state, and remove the discount when you decide it no longer applies.",
      },
    ],
    keyboard: [
      { keys: "Enter", action: "In the field, applies the code." },
      { keys: "Tab", action: "Moves to the Apply button, which is skipped while the field is empty." },
    ],
    a11y: [
      "The input's `aria-label` and placeholder both come from `label` (default \"Coupon code\").",
      "The result message is `aria-live=\"polite\"` and linked with `aria-describedby`. A rejected code sets `aria-invalid` on the input.",
      "While checking, Apply is disabled and has `aria-busy`.",
    ],
  },

  "order-summary": {
    faq: [
      {
        q: "Does OrderSummary add up the lines?",
        a: "No. Every `value` and the `total` are display strings. Add up in minor units, format with `Intl.NumberFormat`, and write discounts with a real minus sign, such as `\"−$1,240.00\"`. Each `label` is the React key, so keep labels unique.",
      },
    ],
    a11y: [
      "A description list: each row is a `<dt>` label and a `<dd>` amount, so screen readers read the amount with its label.",
      "The total row uses a border instead of a separator element, because a `<dl>` may only contain label and value groups.",
    ],
  },

  "product-card": {
    faq: [
      {
        q: "Should imageAlt be empty?",
        a: "By default it is, because the title sits right under the image. Set `imageAlt` when the photo shows something the title does not, such as the colour or the pattern of that variant.",
      },
      {
        q: "How do I link the card to the product page?",
        a: "There is no `href` prop. In your copy, wrap the title text in a link, and give it an `after:absolute after:inset-0` overlay on a `relative` card if the whole card should be clickable.",
      },
    ],
    a11y: [
      "The title is an `<h3>`, so cards in a grid can be found by heading navigation.",
      "The Add to cart button has `aria-describedby` pointing at the title, so it is heard as \"Add to cart, Linen tote\".",
      "The `badge` sits inside the image box, before the title in the DOM, so screen readers read \"New\" before the product name.",
    ],
  },

  "quantity-stepper": {
    faq: [
      {
        q: "Can people type a quantity?",
        a: "No. The number is a read-only `<output>` between the − and + buttons. For a typed value use [`NumberInput`](/docs/number-input).",
      },
      {
        q: "How are the buttons named?",
        a: "From `aria-label`, lowercased: `aria-label=\"Tickets\"` gives \"Decrease tickets\" and \"Increase tickets\". The default is \"Quantity\".",
      },
      {
        q: "Does it submit with a form?",
        a: "Yes, with `name`: `<QuantityStepper name=\"quantity\" />` adds a hidden input with the number, because the visible `<output>` is not submitted. `min` defaults to 1 and `max` to 99.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves between the Decrease and Increase buttons. A button at its bound is disabled and skipped." },
      { keys: "Enter / Space", action: "Steps the value down or up by `step`." },
    ],
    a11y: [
      "The stepper is a `role=\"group\"` named by `aria-label`.",
      "The number is an `<output aria-live=\"polite\">`, so each change is announced.",
      "The minus button is disabled at `min` and the plus button at `max`.",
    ],
  },

  "shipping-address": {
    faq: [
      {
        q: "Can I use ShippingAddress and BillingAddress in the same form?",
        a: "Only after renaming fields. ShippingAddress submits `name`, `address`, `city` and `postalCode`, and [`BillingAddress`](/docs/billing-address) also uses `address` and `city`, so `FormData.get(\"city\")` would return only the first. Prefix the names in your copy, such as `shippingCity`.",
      },
      {
        q: "Where are the country and state fields?",
        a: "There are four fields only, and none has `required`. Add a country [`Select`](/docs/select) and a state field in your copy if you ship abroad, and add `required` where needed.",
      },
    ],
    a11y: [
      "A `<fieldset>` with a visually hidden `<legend>` from `legend` (default \"Shipping address\"), so screen readers hear it before the first field.",
      "Each field is a [`FormField`](/docs/form-field) with a visible label tied to its input.",
      "The inputs use `shipping` autofill tokens (`shipping name`, `shipping street-address`, `shipping address-level2`, `shipping postal-code`), so browsers fill the saved shipping address.",
    ],
  },

  "wishlist-button": {
    faq: [
      {
        q: "Should the label change to \"Remove from wishlist\" when saved?",
        a: "No. Keep `label` the same in both states; `aria-pressed` tells screen readers whether it is saved. Do include the product: `label=\"Save Aurora desk lamp\"`, so a grid of hearts is not a list of identical buttons.",
      },
      {
        q: "How do I save to my server without waiting?",
        a: "Control it: set `active` from `onToggle` right away, send the request, and set it back if the request fails.",
      },
    ],
    a11y: [
      "An [`IconButton`](/docs/icon-button) with `aria-pressed` and a fixed `aria-label`, so screen readers say \"Save to wishlist, pressed\" when it is on.",
      "The heart is `aria-hidden`. When saved it fills as well as changing colour, so the state does not rely on colour alone.",
    ],
  },
}
