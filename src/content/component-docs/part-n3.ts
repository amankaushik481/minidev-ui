import type { ComponentDocsContent } from "../types"

export const PART_N3: Record<string, ComponentDocsContent> = {
  "country-select": {
    faq: [
      {
        q: "How do I use CountrySelect in a form or with React Hook Form?",
        a: "In a plain `<form>`, pass `name`: a hidden input submits the code, so `FormData` gives `ship_to=FR`, and `required` stops the submit while nothing is picked. With React Hook Form, use a `Controller`: `render={({ field }) => <CountrySelect value={field.value} onValueChange={field.onChange} aria-label=\"Country\" />}`.",
      },
      {
        q: "How do I show country names in the user's language?",
        a: "Pass `locale`, for example `locale=\"de\"` for \"Deutschland\" and \"Schweiz\". Names come from the browser's `Intl.DisplayNames` and are sorted with `Intl.Collator` for that locale, so no translation files ship. Search still matches the English name and the code, so \"germany\" and \"de\" both find Deutschland.",
      },
      {
        q: "Why do the flags show as two letters such as \"US\" on Windows?",
        a: "Each flag is an emoji built from the code's two regional indicator letters. Windows has no flag emoji, so Chrome and Edge there draw the letters instead. If that matters for your users, pass `showFlag={false}`; the name and the code still show.",
      },
      {
        q: "Can I reuse the country list in my own fields or tables?",
        a: "Yes. `countries(\"fr\")` is exported from the same file and returns `{ code, name, flag }` for all 249 ISO 3166-1 codes, sorted by name in that locale. Use it to print a stored code as a name, or for the country column next to [`TaxFields`](/docs/tax-fields).",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the trigger, opens the list and moves focus to the search field." },
      { keys: "ArrowDown / ArrowUp", action: "On the trigger, also opens the list. In the search field, moves the highlight through the countries." },
      { keys: "Enter", action: "In the search field, picks the highlighted country, closes the list and returns focus to the trigger. The first match is highlighted as you type, so \"ger\" then Enter picks Germany." },
      { keys: "Escape", action: "Closes the list without changing the value and returns focus to the trigger." },
    ],
    a11y: [
      "The trigger is a `<button>` with `role=\"combobox\"`, `aria-haspopup=\"dialog\"` and `aria-expanded`, plus `aria-required=\"true\"` when `required` is set. Name it with `aria-label`, or pass the same `id` to [`FormField`](/docs/form-field).",
      "Flags and the code column are `aria-hidden`, so each option is announced by its country name only. The search field is labelled \"Search countries\".",
      "With `name`, a visually hidden `<input>` with `autocomplete=\"country\"` holds the code. With `required`, submitting the form with no country blocks the submit and moves focus to the trigger.",
    ],
  },

  "message-branch": {
    faq: [
      {
        q: "How do I show the new reply after the user clicks Regenerate?",
        a: "Append it to `versions`. Uncontrolled, MessageBranch sees the count grow and shows the newest version. If you control `index`, set it yourself when you append, for example `setIndex(replies.length)`.",
      },
      {
        q: "How do I keep the chosen version after a reload?",
        a: "Control it. Store the index with the message and pass `index` and `onIndexChange`. Without `index`, it starts on `defaultIndex`, which defaults to the newest version.",
      },
      {
        q: "Can the switcher sit in the same row as copy and retry?",
        a: "Yes. Pass [`MessageActions`](/docs/message-actions) as `actions` and it renders right after the \"‹ 2 / 3 ›\" switcher. While there is only one version the switcher hides itself and the actions stay.",
      },
      {
        q: "Should each version be a MessageBubble?",
        a: "No. MessageBranch mounts the version again on every switch, and [`MessageBubble`](/docs/message-bubble) plays a rise-in animation on mount, so it would run on top of the cross-fade. Wrap the whole branch instead: `<MessageBubble role=\"assistant\"><MessageBranch versions={replies} /></MessageBubble>`.",
      },
    ],
    keyboard: [
      { keys: "Tab / Shift+Tab", action: "Moves between the previous and next buttons and the rest of the row." },
      { keys: "Enter / Space", action: "On a chevron, shows the previous or next version. At either end the button is disabled but keeps focus." },
      { keys: "Alt+ArrowLeft / Alt+ArrowRight", action: "Anywhere inside the branch, shows the previous or next version. Ignored inside text fields, where it moves by word." },
    ],
    a11y: [
      "The switcher is a `role=\"group\"` named \"Response versions\" (from `label`). The chevrons are labelled \"Previous response\" and \"Next response\".",
      "The visible \"2 / 3\" is `aria-hidden`. A polite, atomic live region reads \"Response 2 of 3\" instead, so screen readers announce each switch.",
      "At the first or last version the chevron is disabled with `aria-disabled`, but it stays focusable, so focus does not drop to the page.",
      "Under reduced motion the cross-fade and the height change both use `{ duration: 0 }`, so the version swaps instantly.",
    ],
  },

  "scatter-chart": {
    faq: [
      {
        q: "How do I make a bubble chart?",
        a: "Give points a `size`: once any point has one, every point is drawn as a bubble, the largest `size` gets the largest diameter in `sizeRange` (`[8, 40]` px by default) and area grows in step with the value. Bigger bubbles are painted first, so small ones stay on top. Set `sizeLabel` to name the value in the tooltip.",
      },
      {
        q: "How do I format the axes as currency or percent from a Server Component?",
        a: "Pass `Intl.NumberFormat` options: `xFormat={{ style: \"currency\", currency: \"USD\", notation: \"compact\" }}`. Options are plain objects, so they can cross from a Server Component; a function such as `(n) => n + \" ms\"` works only from client code. Numbers use `locale`, `\"en-US\"` by default, so server and browser render the same text.",
      },
      {
        q: "How are the axis ranges chosen?",
        a: "They fit the data. Each axis spans the smallest and largest value of all points and reference lines, widened to round ticks on a 1, 2, 2.5 or 5 step, about five intervals. There is no prop to fix the range, and an axis only starts at zero when the data is near zero.",
      },
      {
        q: "Does it need a chart library?",
        a: "No. It is plain SVG and HTML with no chart dependency. Series colours come from the `--chart-1` to `--chart-5` CSS variables, the same names shadcn themes define, so set those to recolour it.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus onto one point: the leftmost at first, then the last point you visited. The whole chart is one tab stop." },
      { keys: "ArrowRight / ArrowDown", action: "Moves to the next point in x order and shows its crosshair and tooltip." },
      { keys: "ArrowLeft / ArrowUp", action: "Moves to the previous point in x order." },
      { keys: "Home / End", action: "Jumps to the first or last point." },
    ],
    a11y: [
      "The plot is a `role=\"group\"` named from `label` plus the counts, for example \"Latency against payload size, 1 series, 20 points\".",
      "Each point is a focusable `role=\"img\"` labelled with its series, point label, axis names and formatted values, for example \"Sync requests, Payload 96 KB, Latency 410 ms\".",
      "The tooltip, grid, tick labels and crosshair are `aria-hidden`, because the focused point's label already carries the same values.",
      "Under reduced motion, points move, appear and leave with `{ duration: 0 }`. Hovering a legend entry dims the other series with a CSS opacity transition, which the kit stylesheet cuts to 0.01ms.",
    ],
  },
}
