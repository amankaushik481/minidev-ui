import type { ComponentDocsContent } from "../types"

export const PART_05: Record<string, ComponentDocsContent> = {
  // Billing

  "add-card-form": {
    faq: [
      {
        q: "How do I read the card details from AddCardForm?",
        a: "`onSubmit` receives the form's `FormData` after `preventDefault`, so the page does not reload. Read `data.get(\"cc-number\")`, `data.get(\"cc-exp\")` and `data.get(\"cc-csc\")`, or call `Object.fromEntries(data)`. The values are exactly what was typed, spaces included.",
      },
      {
        q: "Does AddCardForm format or validate the card number?",
        a: "No. The fields are plain `Input`s with `inputMode=\"numeric\"` and `required`; only the CVC has a `maxLength` of 4. For grouping by brand, a Luhn check and inline errors use [`CreditCardInput`](/docs/credit-card-input).",
      },
      {
        q: "Can I submit it with a Server Action?",
        a: "Not through an `action` prop: the form has none and always calls `preventDefault`. Call the action from `onSubmit`, for example `onSubmit={(data) => startTransition(() => saveCard(data))}`.",
      },
      {
        q: "Can I use it with Stripe Elements or another hosted payment field?",
        a: "Not for the card inputs: hosted fields render in their provider's iframe. Copy the file, keep the layout and the submit button, and mount the provider's element in place of the three `FormField`s. Posting raw card numbers to your own server puts that server in PCI scope.",
      },
    ],
    a11y: [
      "Each input has a visible label tied to it through a `useId` id, so two forms on one page do not clash.",
      "`autoComplete` is `cc-number`, `cc-exp` and `cc-csc`, so browsers and password managers offer saved cards, and `inputMode=\"numeric\"` opens the number keypad on phones.",
      "All three inputs are `required`, so an empty field is reported by the browser's own validation on submit. There is no prop for a server error message.",
    ],
  },

  "billing-address": {
    faq: [
      {
        q: "How do I show billing and shipping addresses on one page?",
        a: "Render it twice, with `section=\"billing\"` and `section=\"shipping\"`. The section becomes the autofill prefix (`billing street-address`, `shipping postal-code`), so the browser fills each block from the right address. Both copies use the same `name`s, so in one form read them with `FormData.getAll(\"city\")`, or put each in its own `<form>`.",
      },
      {
        q: "Is there a country field?",
        a: "No. It renders address, city, state and postal code only. Add [`TaxFields`](/docs/tax-fields) for country and tax ID, or your own [`Select`](/docs/select) named `country`.",
      },
      {
        q: "How do I prefill a saved address?",
        a: "There are no value props: the inputs are uncontrolled and have no `defaultValue`. Copy the file and add `defaultValue` to each input, or let browser autofill do it.",
      },
    ],
    a11y: [
      "The fields sit in a `<fieldset>` with a visually hidden `<legend>`: \"Billing address\", or \"Shipping address\" when `section=\"shipping\"`.",
      "Each label is tied to its input through a `useId` id. With `required`, every input gets the `required` attribute and the label shows an `aria-hidden` asterisk.",
      "The street line is a `Textarea`, so Enter adds a new line there instead of submitting the form.",
    ],
  },

  "billing-page": {
    faq: [
      {
        q: "How do I show the customer's real plan, usage and invoices?",
        a: "BillingPage takes only `onChangePlan` and `className`. The plans, the Halcyon workspace name, the seat counts and the invoices are written in the file. Copy it and swap in your data, or build the page from [`PlanCard`](/docs/plan-card), [`UsageMeter`](/docs/usage-meter) and [`InvoiceList`](/docs/invoice-list) directly.",
      },
      {
        q: "What does `onChangePlan` receive?",
        a: "The plan name: `\"Starter\"` from the Downgrade button and `\"Scale\"` from Upgrade. The highlighted Team card is marked `current`, so its \"Current plan\" button is disabled and never calls it.",
      },
      {
        q: "What is the difference between BillingPage and PricingPlans?",
        a: "BillingPage is for a signed-in customer and shows their plan, usage and invoices. [`PricingPlans`](/docs/pricing-plans) is a public pricing section with a Monthly / Yearly switch and no account data.",
      },
    ],
    a11y: [
      "Plan, Usage and Invoices are each a `<section>` labelled by its `<h2>` through `aria-labelledby`, so they appear as named regions.",
      "Each plan card is a `<section>` named by its heading, and its price reads \"$49 per seat / mo\" because the slash is `aria-hidden` and replaced by screen-reader-only \" per \".",
      "The usage bars are Base UI progress bars named by their label, with value text such as \"18 of 25, 72%\".",
      "The disabled \"Current plan\" button stays in the Tab order with `aria-disabled`, so keyboard and screen reader users still hear which plan is active.",
    ],
  },

  "cancel-flow": {
    faq: [
      {
        q: "How do I show CancelFlow in a modal?",
        a: "Render it inside [`DialogContent`](/docs/dialog) and close the dialog when your `onConfirm` request finishes. CancelFlow has no close button of its own, so keep the dialog's X (`showCloseButton` is on by default).",
      },
      {
        q: "How do I change the reasons?",
        a: "Pass `reasons` as an array of strings. The chosen string is what `onConfirm` receives. There is no free-text \"Other\" field; add one in your copy if you need it.",
      },
      {
        q: "Can I change the text under the heading?",
        a: "Not with props. \"Free UI stays. Kinetic heroes and the showcase soft-lock after the period ends.\" and \"You keep {planName} until the end of the billing period.\" are written in the file. Copy it and describe what your customers lose.",
      },
      {
        q: "What happens after Confirm cancel?",
        a: "`onConfirm(reason)` runs and the card stays on the confirm step. Show your own success state, or close the surrounding dialog, once the request finishes.",
      },
    ],
    keyboard: [
      { keys: "Tab / Shift+Tab", action: "Moves to the reason group, then to Continue. In the group, focus lands on the checked reason, or the first one." },
      { keys: "ArrowDown / ArrowUp", action: "Moves to the next or previous reason and selects it. ArrowRight and ArrowLeft do the same." },
      { keys: "Space", action: "Selects the focused reason when none is checked yet." },
      { keys: "Enter / Space", action: "On Continue, Confirm cancel or Back, presses the button." },
    ],
    a11y: [
      "Reasons are native `<input type=\"radio\">` elements sharing one `useId` name, inside a `<fieldset>` whose legend is \"Why are you cancelling?\".",
      "Continue is `disabled` until a reason is chosen.",
      "When the step changes, focus moves to the step's `<h3>` (it has `tabIndex={-1}`), so screen readers announce \"Confirm cancelling Premium\". Focus is left alone on the first render.",
    ],
  },

  "comparison-table": {
    faq: [
      {
        q: "How do values line up with features?",
        a: "By index: `features` lists the rows, and each plan's `values` has one entry per feature in the same order. `true` renders a check, `false` a dash and a string renders as text, such as `\"Unlimited\"`. A missing entry renders an empty cell.",
      },
      {
        q: "What is the difference between ComparisonTable and PlanComparison?",
        a: "They draw the same kind of table from differently shaped data. ComparisonTable takes `features` plus `plans`, each with its own `values` array, and lets you rename the first column with `featureLabel`. [`PlanComparison`](/docs/plan-comparison) takes plan names plus `rows`, each with one value per plan.",
      },
      {
        q: "How does it look on a phone?",
        a: "The wrapper has `overflow-x-auto`, so the table scrolls sideways instead of squeezing. The feature column does not stick, so keep feature names short and plans to three or four.",
      },
    ],
    a11y: [
      "A real `<table>` with a screen-reader-only `<caption>` (`caption`, default \"Plan comparison\"), `scope=\"col\"` plan headers and `scope=\"row\"` feature headers, so each cell is read with its plan and feature.",
      "Check and dash icons are `aria-hidden` and followed by screen-reader text: \"Included\" or \"Not included\".",
      "Cells use `tabular-nums`, so figures like 50 and 500 line up.",
    ],
  },

  "credit-balance": {
    faq: [
      {
        q: "How do I show a money balance instead of credits?",
        a: "`balance` is rendered as given, so format it first: `balance={new Intl.NumberFormat(\"en-US\", { style: \"currency\", currency: \"USD\" }).format(18.4)}` with `label=\"Wallet\"`. Fix the locale so the server and the browser print the same text.",
      },
      {
        q: "Can the number animate when credits are spent?",
        a: "Yes. `balance` takes any React node, so pass a [`NumberRoll`](/docs/number-roll): `balance={<NumberRoll value={credits} />}`. CreditBalance itself does not animate.",
      },
    ],
    a11y: [
      "A plain `<div>` with two `<span>`s, read as \"Credits 1,240\". It is not a live region, so a balance that changes while the user is on the page is not announced.",
      "The number uses `tabular-nums`, so its width stays steady as digits change.",
    ],
  },

  "credit-card-input": {
    faq: [
      {
        q: "Does CreditCardInput charge the card or send data to a payment provider?",
        a: "No. It formats and checks input in the browser and sends nothing. `onChange` gives you `{ number, expiry, cvc, brand, name, postalCode, valid }` on every edit; what you do with it is up to you. For live payments, hosted fields from your provider keep raw card data off your server.",
      },
      {
        q: "What does a form submit send?",
        a: "The fields carry autofill names, `cc-name`, `cc-number`, `cc-exp`, `cc-csc` and `postal-code`, so FormData and Server Actions get them. The values are as displayed: the number keeps its spaces and the expiry reads `MM / YY`. For clean digits, keep the latest `onChange` value in state and send that, and enable the pay button only when `card.valid` is true. Hidden name or postal code fields are not rendered, so they are not sent."
      },
      {
        q: "When do errors appear?",
        a: "When a field loses focus, with two exceptions: a number at its brand's longest length (16 for Mastercard, 15 for Amex, 19 for Visa) that fails the Luhn check, and a 4-digit expiry that is invalid or in the past, are flagged at once. Only the first error in field order is shown, in one line under the fields.",
      },
      {
        q: "Which card brands does it detect?",
        a: "Visa, Mastercard (including 2-series numbers), Amex and Discover, from the number's prefix. Amex groups 4-6-5 and needs a 4-digit CVC, the others group 4-4-4-4, and any other number is treated as a generic card of 12 to 19 digits. `luhn(digits)` is exported for your own checks.",
      },
    ],
    keyboard: [
      { keys: "Tab / Shift+Tab", action: "Moves between name, number, expiry, CVC and postal code." },
      { keys: "Backspace", action: "In an empty expiry, CVC or postal code field, moves focus to the end of the previous field." },
    ],
    a11y: [
      "Number, expiry, CVC and postal code sit in a `role=\"group\"` labelled by the visible `label` (\"Card details\"), and each has its own screen-reader-only `<label>`, such as \"Expiry date, month and year\".",
      "Every field with a shown error gets `aria-invalid`; the first one also gets `aria-describedby` pointing at the message line. That line is `aria-live=\"polite\"`, so errors and \"Card details look complete.\" are announced.",
      "A detected brand is announced through a polite live region (\"Visa detected\"), and gets `aria-current` in the accepted cards list.",
      "Focus moves on by itself when the number is complete and passes Luhn, when the expiry has 4 digits, and from a full CVC to the postal code when it is shown. Under reduced motion the brand badge swaps without the spring.",
    ],
  },

  "downgrade-warning": {
    faq: [
      {
        q: "Can I pass a list of lost features as the description?",
        a: "Keep it to inline text. `description` renders inside a `<p>`, so a `<ul>` there is invalid HTML. The default title, description and \"Keep Premium\" label describe this kit's own plans, so pass `title`, `description` and `keepLabel` for yours.",
      },
      {
        q: "How do I show a loading state while the downgrade runs?",
        a: "There is no `loading` or `disabled` prop, and both buttons stay enabled. Guard against double clicks inside `onDowngrade`, or copy the file and pass `disabled` to the Downgrade button.",
      },
    ],
    a11y: [
      "A `<section>` labelled by its `<h3>` title through `aria-labelledby`, so it is announced as a region named after the question.",
      "The safe action comes first in the tab order: the outline Keep button, then the destructive Downgrade button.",
      "The warning tone is only the border colour (`border-warning/40`), so the words in `title` and `description` must carry the warning.",
    ],
  },

  "feature-comparison": {
    faq: [
      {
        q: "How do I wire up the Stay free and Get started buttons?",
        a: "Not with props: both buttons are written in the file with no `onClick` or `href`. Copy the file and add a handler, or a link with `render={<a href=\"/signup\" />}`, to each `Button`.",
      },
      {
        q: "Can I compare more than two plans?",
        a: "No. Each row has exactly `free` and `premium`, and the grid has three columns. For three or more plans use [`ComparisonTable`](/docs/comparison-table) or [`PlanComparison`](/docs/plan-comparison).",
      },
    ],
    a11y: [
      "The grid has `role=\"table\"` named by `label` (default \"Free and Premium features compared\"), with `columnheader`, `rowheader` and `cell` roles on its parts.",
      "Checks and dashes are icons with `role=\"img\"` and `aria-label` \"Included\" or \"Not included\".",
      "Rows fade in once as they scroll into view, 30ms apart. Under reduced motion they render visible with no fade.",
    ],
  },

  "free-premium-compare": {
    faq: [
      {
        q: "How do I change the plans, prices or links?",
        a: "FreePremiumCompare takes only `className`. The two columns, their checklists, prices and links (`/gallery` and `/gallery/premium-motion`) are constants in the file, so copy it and edit `FREE`, `PREM` and the column array.",
      },
      {
        q: "Do the buttons work without JavaScript?",
        a: "Yes. Each `Button` renders an `<a>` through `render={<a href={col.href} />}`, so it navigates like a normal link and can open in a new tab.",
      },
    ],
    a11y: [
      "Each card has an `<h3>` with the tier name, and the check icons are `aria-hidden`, so the lists read as plain items.",
      "The plan buttons are real `<a href>` links styled as buttons, so screen readers announce them as links.",
      "Cards rise 16px on a spring as they scroll in, the second 80ms after the first. Under reduced motion they render in place.",
    ],
  },

  "invoice-detail": {
    faq: [
      {
        q: "How do I show tax and discounts, and is the total calculated?",
        a: "Tax and discounts are more `lines`, such as `{ label: \"Discount (10%)\", amount: \"-$124.60\" }`. Every amount is a preformatted string, and the total is the `amount` prop: it is not summed from the lines, so compute it on the server.",
      },
      {
        q: "Which statuses does it support?",
        a: "`paid` (success tone), `open` (warning tone, the default) and `void` (neutral). There is no `overdue`; copy the file to add one, or render your own [`StatusBadge`](/docs/status-badge).",
      },
      {
        q: "Can I add Pay or Download PDF buttons?",
        a: "There is no slot for actions or children. Put the buttons outside the card, or copy the file and add a footer row.",
      },
    ],
    a11y: [
      "The invoice number is an `<h3>` and the line items are a `<ul>`, so screen readers announce how many lines there are.",
      "The status is a text badge, not colour alone. Amounts use `tabular-nums`, so the right-hand column lines up.",
    ],
  },

  "invoice-list": {
    faq: [
      {
        q: "How do I make each invoice open its detail page?",
        a: "InvoiceList has no `onSelect` or `href`; rows are plain `<li>`s. Copy the file and wrap each row's content in a link, or use [`DataTable`](/docs/data-table) when you need sorting, filtering or row actions.",
      },
      {
        q: "What does it show when there are no invoices?",
        a: "With `items={[]}` it renders an empty bordered list. Check the length yourself and render [`EmptyState`](/docs/empty-state) instead.",
      },
    ],
    a11y: [
      "A `<ul>` of `<li>` rows, so screen readers announce the number of invoices.",
      "Status is a text badge (\"paid\", \"open\" or \"void\", capitalised with CSS), not colour alone. Amounts use `tabular-nums`.",
      "Long invoice numbers truncate with an ellipsis; the amount and badge do not shrink.",
    ],
  },

  "morph-price": {
    faq: [
      {
        q: "Can I control the cadence from outside?",
        a: "Only partly. MorphPrice keeps the cadence in its own state, starting at `defaultCadence` (`\"yearly\"`), and `onCadenceChange` tells you when it changes. To drive several prices from one switch, use [`PricingToggle`](/docs/pricing-toggle) with your own state and a [`NumberRoll`](/docs/number-roll) per price.",
      },
      {
        q: "How is the yearly saving worked out?",
        a: "`Math.round((1 - yearly / monthly) * 100)`, where `yearly` is the per-month price on yearly billing, so 49 and 39 give \"save 20%\"; it is hidden when 0 or less. The line under the switch is a separate `note`, which defaults to PricingToggle's \"Save 20% with yearly\". Pass `note` when your saving differs, for example `note=\"Save 21% with yearly\"` for 24 and 19.",
      },
      {
        q: "Can I show cents or another currency?",
        a: "Yes. `currency` takes an ISO 4217 code such as `\"EUR\"`, and a price with a fraction, like `9.5`, shows two decimals. Whole prices show none.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the selected option of the Monthly / Yearly switch." },
      { keys: "ArrowLeft / ArrowRight", action: "Moves to the other cadence and selects it. ArrowUp and ArrowDown do the same." },
      { keys: "Home / End", action: "Selects Monthly or Yearly." },
    ],
    a11y: [
      "The switch is a `role=\"radiogroup\"` named \"Billing period\", with a `role=\"radio\"` button and `aria-checked` per option.",
      "The price and billing note sit in an `aria-live=\"polite\"` region, and NumberRoll keeps a screen-reader-only copy of the formatted price, so the new price is read once, not digit by digit.",
      "Under reduced motion the digits swap with no roll and the switch thumb moves without gliding.",
    ],
  },

  "payment-method-card": {
    faq: [
      {
        q: "What should the Edit button open?",
        a: "Whatever you pass as `onEdit`; the card has no edit form. For example, open your payment provider's billing portal, or a [`Dialog`](/docs/dialog) holding [`AddCardForm`](/docs/add-card-form) or [`CreditCardInput`](/docs/credit-card-input).",
      },
      {
        q: "How do I mark a card as expired or as the default?",
        a: "There is no `expired` or `default` prop. Compare `exp` with today yourself and place a [`StatusBadge`](/docs/status-badge) next to the card, or copy the file and add one inside.",
      },
      {
        q: "What format should `last4` and `exp` be in?",
        a: "`last4` is the last four digits only; never pass a full number. `exp` is shown as given, so format it as `MM/YY` with a two-digit month, such as `\"09/28\"`.",
      },
    ],
    a11y: [
      "The visible \"Visa ···· 4242\" is `aria-hidden`; screen readers hear \"Visa ending in 4242\" and \"Expires 09/28\" instead of the dots.",
      "The Edit button's accessible name is \"Edit Visa ending in 4242\", so several cards on one page have distinct buttons.",
    ],
  },

  "plan-card": {
    faq: [
      {
        q: "How do I mark the customer's current plan?",
        a: "Pass `current` and a label such as `cta=\"Current plan\"`, as [`BillingPage`](/docs/billing-page) does. The button is disabled, so `onCta` never runs, but it stays focusable so keyboard users can still reach it.",
      },
      {
        q: "How do I send the button to a checkout page?",
        a: "`onCta` is a click handler, so navigate in it: `onCta={() => router.push(\"/checkout?plan=pro\")}`. The button is a `<button>`, not a link, so it cannot be opened in a new tab.",
      },
      {
        q: "How do I switch between monthly and yearly prices?",
        a: "`price` and `period` are plain strings. Keep the cadence in state with [`PricingToggle`](/docs/pricing-toggle) and pass `price={yearly ? \"$39\" : \"$49\"}`. The price swaps instantly; for a rolling price use [`MorphPrice`](/docs/morph-price).",
      },
    ],
    a11y: [
      "Each card is a `<section>` named by its `<h3>` through `aria-labelledby`, so a row of plans reads as named regions.",
      "The slash in \"$49/mo\" is `aria-hidden` and replaced by screen-reader-only \" per \", so the price reads \"$49 per mo\".",
      "Check icons are `aria-hidden`. `highlighted` changes only the ring and button style, so add `badge` text if the recommendation matters.",
      "With `current`, the button is disabled through Base UI with `focusableWhenDisabled`: it keeps its place in the Tab order and reports `aria-disabled=\"true\"`.",
    ],
  },

  "plan-comparison": {
    faq: [
      {
        q: "How do I add a column for another plan?",
        a: "Add its name to `plans` and one more value to each row's `values`. Values line up by index, and a row that is one short shows a dash marked \"Not included\" in the last column, so check the lengths.",
      },
      {
        q: "Can I group rows under headings such as Security or Support?",
        a: "No, rows are flat. Use one table per group with its own `caption`, or copy the file and add a `<tr>` with a `<th colSpan>` between groups.",
      },
    ],
    a11y: [
      "A real `<table>` with a screen-reader-only `<caption>` (`caption`, default \"Plan comparison\"), `scope=\"col\"` plan headers and `scope=\"row\"` feature headers.",
      "`true` renders an `aria-hidden` check plus screen-reader text \"Included\"; `false` or a missing value renders a dash plus \"Not included\".",
      "On narrow screens the wrapper scrolls sideways (`overflow-x-auto`) instead of squashing the columns.",
    ],
  },

  "pricing-kinetic": {
    faq: [
      {
        q: "How do I change the headline, prices or rows?",
        a: "PricingKinetic takes only `className`. The headline \"Price the moment\", the price ($49 monthly, $39 yearly per seat, from MorphPrice's defaults), the four comparison rows and the \"Upgrade to Pro\" button are written in the file. Copy it and edit them, or compose [`MorphPrice`](/docs/morph-price), [`FeatureComparison`](/docs/feature-comparison) and [`MagneticCta`](/docs/magnetic-cta) yourself.",
      },
      {
        q: "Does the Upgrade to Pro button do anything?",
        a: "Not as shipped: the `MagneticCta` has no `onClick` or link. It accepts Button props, so add `render={<a href=\"/signup\" />}` or an `onClick` in your copy. The comparison's Stay free and Get started buttons need the same.",
      },
    ],
    a11y: [
      "The headline is an `<h2>`, so place the section under your page's `<h1>`.",
      "Each part keeps its own reduced-motion handling: the headline appears in place, the marquee stops, the price swaps without rolling and the button no longer follows the pointer.",
    ],
  },

  "pricing-motion": {
    faq: [
      {
        q: "How do I know which plan was picked?",
        a: "Pass `onSelect`; it receives the whole plan object, for example `onSelect={(plan) => startCheckout(plan.name)}`. The buttons are `<button>`s with no per-plan `href`.",
      },
      {
        q: "Can I add a Monthly / Yearly switch?",
        a: "It is not built in. Keep the cadence in state, render [`PricingToggle`](/docs/pricing-toggle) above, and pass different `price` and `period` strings; prices swap instantly, since the cards only animate on entry. [`PricingPage`](/docs/pricing-page) does exactly this.",
      },
      {
        q: "How do I lay out four plans?",
        a: "The grid is `md:grid-cols-3`, so a fourth plan wraps onto a new row. Pass `className=\"md:grid-cols-4\"`; `cn` merges it over the default.",
      },
      {
        q: "Can I change the \"Most popular\" badge?",
        a: "`featured: true` adds the accent border, a shadow, the badge and the solid button. The badge text is not a prop, so change it in the file.",
      },
    ],
    a11y: [
      "Each plan name is an `<h3>`, and features are a `<ul>` whose bullet dots are `aria-hidden`.",
      "The button label defaults to \"Choose {name}\", so every button on the page has a distinct name.",
      "Cards fade and rise 16px into view once, 80ms apart. Under reduced motion they render in place.",
    ],
  },

  "pricing-page": {
    faq: [
      {
        q: "How do I customise PricingPage?",
        a: "It takes only `className`, so copy the file and replace the plans, comparison rows, FAQ items, CTA title and footer links. The nav comes from [`NavMarketing`](/docs/nav-marketing) with its own defaults. The plan buttons do nothing as shipped: add `onSelect` to `PricingMotion` in your copy.",
      },
      {
        q: "Which price changes with the Monthly / Yearly toggle?",
        a: "Only the featured Premium plan: $39 on yearly (the default) and $49 on monthly, with its blurb switching between \"billed yearly\" and \"billed monthly\". Free and Studio stay fixed. Extend the `cadence === \"yearly\"` checks in your copy to change more.",
      },
      {
        q: "How do I use it as a Next.js route with metadata?",
        a: "The file is `\"use client\"`, and a client component cannot export `metadata`. Render `<PricingPage />` from `app/pricing/page.tsx`, a Server Component, and export `metadata` there.",
      },
    ],
    a11y: [
      "The page has one `<h1>` (\"Simple pricing\"), and plan names below it are `<h3>`s.",
      "The cadence switch is a radiogroup named \"Billing period\" that supports the arrow keys, Home and End.",
      "Each section keeps its own reduced-motion handling: plan cards appear in place and comparison rows skip the fade.",
    ],
  },

  "pricing-plans": {
    faq: [
      {
        q: "How do I control the billing period, or know it when a plan is chosen?",
        a: "Uncontrolled, it starts at `defaultPeriod` (`\"yearly\"`). Pass `period` and `onPeriodChange` to control it. `onSelect(plan, period)` receives the plan name and the period showing when the button was pressed.",
      },
      {
        q: "How do I show a free plan or a feature a plan lacks?",
        a: "A price of `0` renders \"Free\" with no unit and the line \"Free forever for one person\", which is fixed text. In `features`, a string is included and `{ label: \"Alerts\", included: false }` renders muted with a dash.",
      },
      {
        q: "Is `yearly` the annual price?",
        a: "No, it is the monthly-equivalent price. The \"Billed $468 per seat yearly\" line is `yearly * 12` formatted with `currency`. Set `per=\"\"` to drop \"per seat\", and `unit` to change \"/ seat / mo\".",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the selected option of the period switch, then to each plan's button." },
      { keys: "ArrowLeft / ArrowRight", action: "In the switch, moves to the other period and selects it. ArrowUp and ArrowDown do the same." },
      { keys: "Home / End", action: "In the switch, selects Monthly or Yearly." },
    ],
    a11y: [
      "The section is labelled by its `<h2>` title through `aria-labelledby`; each plan is an `<article>` with an `<h3>` name.",
      "Each feature list has `aria-label` \"{plan} features\". Excluded features add screen-reader text \"(not included)\", and the check and dash icons are `aria-hidden`.",
      "Prices use NumberRoll, which keeps a screen-reader-only copy of the formatted price and swaps digits without rolling under reduced motion.",
    ],
  },

  "pricing-table": {
    faq: [
      {
        q: "How do I give one plan a badge or a click handler?",
        a: "Each entry in `plans` takes [`PlanCard`](/docs/plan-card) props, so `{ name: \"Pro\", price: \"$49\", highlighted: true, badge: \"Most popular\", onCta: () => checkout(\"pro\") }` works as written.",
      },
      {
        q: "Why do four plans wrap onto two rows?",
        a: "The grid is `md:grid-cols-3`. Pass `className=\"md:grid-cols-4\"` for four plans or `md:grid-cols-2` for two; `cn` replaces the default class.",
      },
      {
        q: "How do I add monthly and yearly prices?",
        a: "PricingTable has no state. Keep the cadence in state, render [`PricingToggle`](/docs/pricing-toggle) above it, and build `plans` from that state, for example `price: yearly ? \"$39\" : \"$49\"`.",
      },
    ],
    a11y: [
      "Each plan is a PlanCard `<section>` named by its `<h3>`, and prices read as \"$49 per mo\" to screen readers.",
      "The highlighted plan differs by its accent ring and solid button only; add `badge` text so the recommendation is not shown by styling alone.",
    ],
  },

  "pricing-toggle": {
    faq: [
      {
        q: "How do I update prices when the toggle changes?",
        a: "Keep the cadence in state and read it where you render prices: `const [cadence, setCadence] = React.useState<BillingCadence>(\"monthly\")`, then `<PricingToggle value={cadence} onChange={setCadence} />` and `price={cadence === \"yearly\" ? \"$39\" : \"$49\"}`. Without `value` it keeps its own state, starting at `defaultValue`.",
      },
      {
        q: "How do I change or hide \"Save 20% with yearly\"?",
        a: "Pass `note` with your real discount, or `note={null}` to hide it. The default figure is sample copy.",
      },
      {
        q: "Can the Yearly option show a discount badge?",
        a: "Not through PricingToggle: it passes only labels to [`SegmentedControl`](/docs/segmented-control). Use SegmentedControl directly with an option such as `{ value: \"yearly\", label: \"Yearly\", badge: \"-20%\" }`, as [`PricingPlans`](/docs/pricing-plans) does.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the selected option. Only one option is in the Tab order." },
      { keys: "ArrowLeft / ArrowRight", action: "Moves to the other option and selects it. ArrowUp and ArrowDown do the same, and focus wraps." },
      { keys: "Home / End", action: "Selects Monthly or Yearly." },
    ],
    a11y: [
      "A `role=\"radiogroup\"` named \"Billing period\", with each option a `<button role=\"radio\">` that has `aria-checked`.",
      "Roving tabindex: the selected option has `tabIndex={0}` and the other `-1`.",
      "The thumb glides on a spring; under reduced motion it moves with `duration: 0`.",
    ],
  },

  "quota-bar": {
    faq: [
      {
        q: "How do I show units such as GB?",
        a: "Pass `format`, which formats both `used` and `max`: `format={(n) => n + \" GB\"}`. The default is `Intl.NumberFormat(\"en-US\")`, fixed so the server and the browser print the same digits.",
      },
      {
        q: "When does the bar change colour?",
        a: "It is accent below `warnAt` percent (default 90), warning from `warnAt`, and danger at 100% or more. The percentage is rounded and capped at 100, so 99.5% already shows red, and usage over the limit shows a full red bar while the text keeps the real numbers.",
      },
      {
        q: "QuotaBar, UsageMeter or UsageBreakdown?",
        a: "QuotaBar is one bar with `format` and an adjustable `warnAt`, exposed as `role=\"meter\"`. [`UsageMeter`](/docs/usage-meter) is a Progress bar that never changes colour. [`UsageBreakdown`](/docs/usage-breakdown) stacks several bars and always warns at 90%.",
      },
    ],
    a11y: [
      "The track has `role=\"meter\"` named by `label`, with `aria-valuenow` clamped to `max`, `aria-valuemin` 0, `aria-valuemax` and `aria-valuetext` such as \"72,400 / 100,000, 72%\".",
      "The used / max text uses `tabular-nums`.",
      "The fill's width and colour change with a 200ms CSS transition, which the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  receipt: {
    faq: [
      {
        q: "How do I add tax, a discount or the payment date?",
        a: "Everything between the header and the total is `lines`, so tax and discounts are lines too, such as `{ label: \"Discount\", amount: \"-$10.00\" }`. There is no date or payment method prop. `total` is shown as given, not summed from the lines.",
      },
      {
        q: "Can I send Receipt in an email?",
        a: "Not as it is: it is styled with Tailwind classes and theme tokens, which most email clients drop. Use Receipt in the app and [`EmailReceipt`](/docs/email-receipt) for the email.",
      },
    ],
    a11y: [
      "The \"Receipt RCP-2041\" line is a `<p>`, not a heading; wrap the card in a section with a heading if people navigate your page by headings.",
      "Lines are a `<ul>`, and amounts use `tabular-nums` so the column lines up.",
    ],
  },

  "seat-manager": {
    faq: [
      {
        q: "What happens when every seat is used?",
        a: "Once `seats.length` reaches `limit`, the Invite button is disabled and `onInvite` no longer runs. Nothing on the card says why, so add a line such as \"Add seats to invite more\" near it.",
      },
      {
        q: "How do I change a member's role or remove someone?",
        a: "SeatManager only lists members: the role is an outline [`Badge`](/docs/badge), not a control. Use [`RolePicker`](/docs/role-picker) in your own rows, or copy the file and add a menu per row.",
      },
      {
        q: "Do emails have to be unique?",
        a: "Yes. Each row's React key is `email`, so two seats with the same email trigger a key warning and can render the wrong row.",
      },
    ],
    a11y: [
      "The card title is a fixed `<h3>` \"Seats\", and members are a `<ul>`.",
      "When seats are full, Invite stays in the Tab order with `aria-disabled=\"true\"`, so keyboard and screen reader users still find it and hear that it is unavailable. The \"N of M used\" text says why.",
      "Long names and emails truncate with an ellipsis; the full text stays in the DOM for screen readers.",
    ],
  },

  "tax-fields": {
    faq: [
      {
        q: "What names do the fields submit under?",
        a: "`country` and `taxId`, or `billing_country` and `billing_taxId` with `namePrefix=\"billing_\"`. Both inputs are uncontrolled, so a plain `<form>` or a Server Action reads them from `FormData`. Set starting values with `defaultCountry` (default `\"United States\"`) and `defaultTaxId`.",
      },
      {
        q: "Is the country a dropdown?",
        a: "No, it is a free-text input with `autoComplete=\"country-name\"`, so browsers can fill it. For a fixed list use [`Select`](/docs/select) or [`Combobox`](/docs/combobox) with `name=\"country\"` instead.",
      },
      {
        q: "Does it validate VAT or EIN numbers?",
        a: "No. The tax ID field only turns off spell check and uses a monospaced font. Check the format on the server.",
      },
    ],
    a11y: [
      "Each `<label>` wraps its input, so \"Country\" and \"Tax ID\" are the accessible names without ids.",
      "The \"VAT / EIN\" hint is only a placeholder and disappears once typing starts.",
    ],
  },

  "trial-banner": {
    faq: [
      {
        q: "How do I work out `daysLeft` from the trial end date?",
        a: "Round the difference up to whole days: `Math.ceil((trialEnd.getTime() - Date.now()) / 86_400_000)`. 0 or less reads \"ends today\" and 1 reads \"1 day left\". Compute it on the server, or after mount, so the server and browser render the same number.",
      },
      {
        q: "Can people dismiss the banner?",
        a: "No, there is no close button or `onDismiss`; it shows until you stop rendering it. For a dismissible strip use [`AnnouncementBar`](/docs/announcement-bar).",
      },
    ],
    a11y: [
      "It is not a live region or a landmark, so it is read in normal page order. Put it near the top of the content.",
      "The first line reads like \"Scale trial · 5 days left\", with the count in `tabular-nums`. The accent tint is decoration; the text carries the meaning.",
    ],
  },

  "upgrade-prompt": {
    faq: [
      {
        q: "How do I send the upgrade button to my pricing page?",
        a: "`onUpgrade` is a click handler on a `<button>`, so navigate in it: `onUpgrade={() => router.push(\"/pricing\")}`. There is no `href` prop.",
      },
      {
        q: "Can I add an icon, a price or a second button?",
        a: "Only `title`, `description` and `actionLabel` are configurable, and the first two are strings. Copy the file for anything more; the markup is about ten lines.",
      },
    ],
    a11y: [
      "The title is a fixed `<h3>`; change it in the file if your page needs another heading level.",
      "Give each prompt an `actionLabel` that names the result, such as \"Upgrade to Scale\", or several prompts on one page all read \"Upgrade\".",
    ],
  },

  "usage-breakdown": {
    faq: [
      {
        q: "Can I change the 90% warning threshold?",
        a: "No. Bars turn warning at 90% and danger at 100%, and the width caps at 100% while the text keeps the real figures. [`QuotaBar`](/docs/quota-bar) has a `warnAt` prop for another threshold.",
      },
      {
        q: "How do I show units?",
        a: "Put the unit in `label`, such as `\"Storage (GB)\"`. Numbers use `en-US` grouping with at most one decimal, so 2340 shows as 2,340. Labels must be unique, because each row's React key is `label`.",
      },
    ],
    a11y: [
      "Each bar has `role=\"progressbar\"` named by its `label`, with `aria-valuenow` as the rounded percentage and `aria-valuetext` such as \"18 of 25, 72%\".",
      "The used / limit text uses `tabular-nums`.",
    ],
  },

  "usage-meter": {
    faq: [
      {
        q: "Does UsageMeter turn red near the limit?",
        a: "No, the bar stays the accent colour at every level. Use [`QuotaBar`](/docs/quota-bar) for warning and danger colours.",
      },
      {
        q: "What happens when usage goes over the limit?",
        a: "The bar caps at 100% while the text shows the real figures, such as 27/25. With `limit` 0 the bar is empty.",
      },
    ],
    a11y: [
      "Built on Base UI Progress: the bar has `role=\"progressbar\"`, `aria-labelledby` pointing at the visible label, and `aria-valuetext` such as \"18 of 25, 72%\".",
      "The used / limit text uses `tabular-nums` and fixed `en-US` formatting, so the server and browser render the same digits.",
      "The fill width animates with a 200ms CSS transition, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  // Overlays

  "alert-dialog": {
    faq: [
      {
        q: "How do I keep the dialog open while an async delete runs?",
        a: "Control it with `open` and `onOpenChange`, and make the confirm action a plain `Button` instead of `AlertDialogClose`, so pressing it does not close the dialog. Set `open` to false when the request succeeds. The \"Async confirm\" example on this page does this.",
      },
      {
        q: "Why doesn't clicking outside close it?",
        a: "Base UI's AlertDialog ignores outside clicks on purpose, so a destructive choice is never dismissed by accident. Escape and any `AlertDialogClose` still close it. If an outside click should cancel, use [`Dialog`](/docs/dialog).",
      },
      {
        q: "Which button has focus when it opens?",
        a: "The first focusable element in the popup, so with the safe action first in `AlertDialogActions`, Cancel gets focus and an accidental Enter cancels. Pass `initialFocus` (a ref) to `AlertDialogContent` to choose another element.",
      },
      {
        q: "Why does `<AlertDialog />` show a Delete invoice button?",
        a: "With no children it renders a demo trigger and dialog. Pass your own `AlertDialogTrigger` and `AlertDialogContent` as children.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the trigger, opens the dialog and moves focus to the first button inside." },
      { keys: "Tab / Shift+Tab", action: "Cycles through the dialog's buttons; focus cannot leave the dialog." },
      { keys: "Escape", action: "Closes the dialog and returns focus to the trigger." },
    ],
    a11y: [
      "The popup has `role=\"alertdialog\"`, labelled by `AlertDialogTitle` and described by `AlertDialogDescription`.",
      "Focus is trapped while it is open, the rest of the page is inert, and focus returns to the trigger on close.",
      "`AlertDialogActions` uses `flex-col-reverse` below the `sm` breakpoint, so the first button in the DOM (the safe action) sits at the bottom on phones and on the left on wider screens.",
      "The fade and scale are CSS transitions, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "animated-tooltip": {
    faq: [
      {
        q: "How do I show photos instead of initials?",
        a: "Pass `src` for each person. The image has `alt=\"\"` because the button's `aria-label` already names the person. Without `src`, initials come from the first two words of `name`, or from `initials`.",
      },
      {
        q: "Why is the second person's card open on load?",
        a: "Only with the built-in sample team: `defaultActive` falls back to 1 so the preview shows a card. When you pass `people`, no card opens until hover or focus, unless you set `defaultActive`.",
      },
      {
        q: "How does it behave on touch screens?",
        a: "A tap opens the card and a second tap on the same avatar closes it. The lean and slide follow a mouse pointer only. `onSelect` fires on every tap or click.",
      },
    ],
    keyboard: [
      { keys: "Tab / Shift+Tab", action: "Moves between avatars. Focusing one opens its card, centred with no tilt." },
      { keys: "Escape", action: "Closes the open card; focus stays on the avatar." },
      { keys: "Enter / Space", action: "Activates the focused avatar and calls `onSelect`." },
    ],
    a11y: [
      "Each avatar is a `<button>` with `aria-label` \"{name}, {role}\", such as \"Theo Okafor, Head of Engineering\".",
      "The card has `role=\"tooltip\"` but is `aria-hidden`, because the button's label already carries the same text.",
      "Under reduced motion the card shows and hides with no rise or tilt, and avatars do not grow on hover.",
    ],
  },

  "command-dialog": {
    faq: [
      {
        q: "How do I open CommandDialog with ⌘K?",
        a: "It has no shortcut listener. Control it and add one: on `keydown`, when `(e.metaKey || e.ctrlKey) && e.key === \"k\"`, call `setOpen(true)`, and render `<CommandDialog open={open} onOpenChange={setOpen} />`. Or use [`CommandPalette`](/docs/command-palette) uncontrolled, which listens for ⌘K / Ctrl+K itself.",
      },
      {
        q: "How does the search match commands?",
        a: "A case-insensitive substring match on `label` and each entry in `keywords`. There is no fuzzy matching or ranking, so put synonyms in `keywords`, such as `[\"theme\", \"appearance\"]` for \"Toggle dark mode\".",
      },
      {
        q: "Can I change the placeholder or group commands?",
        a: "Not through CommandDialog: it passes only `open`, `onOpenChange` and `commands`. CommandPalette also takes `placeholder` and `emptyText`. Groups need a copy of CommandPalette.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the \"Search commands\" button, opens the dialog with focus in the search field." },
      { keys: "ArrowDown / ArrowUp", action: "Moves the highlight to the next or previous command, wrapping at the ends." },
      { keys: "Home / End", action: "Highlights the first or last command." },
      { keys: "Enter", action: "Runs the highlighted command's `onSelect` and closes the dialog." },
      { keys: "Escape", action: "Closes the dialog and returns focus to the trigger." },
    ],
    a11y: [
      "The search field is a `role=\"combobox\"` with `aria-controls` pointing at a `role=\"listbox\"` and `aria-activedescendant` on the highlighted `role=\"option\"`, so focus stays in the field while screen readers follow the highlight.",
      "When nothing matches, \"No commands\" renders in a `role=\"status\"` element below the empty list.",
      "The dialog is named \"Command palette\" by a screen-reader-only title. The built-in trigger has `aria-haspopup=\"dialog\"` and `aria-expanded`.",
    ],
  },

  "confirm-destructive": {
    faq: [
      {
        q: "Can I wait for an async action before the dialog closes?",
        a: "No. `onConfirm` runs on click and the dialog closes straight away; it does not wait for a promise. For a spinner or an error inside the dialog, compose [`AlertDialog`](/docs/alert-dialog) with a confirm button that is not `AlertDialogClose`.",
      },
      {
        q: "Can I open it from a menu item instead of the red button?",
        a: "Yes. Pass `open` and `onOpenChange`, and set `open` to true from your menu item or row action. When `open` is set, the red trigger is not rendered and `triggerLabel` is ignored. On close, focus goes back to the element that had it before the dialog opened.",
      },
      {
        q: "Which button has focus when it opens?",
        a: "Cancel, because it comes first in the dialog. An accidental Enter cancels instead of confirming.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the red trigger, opens the dialog with focus on Cancel." },
      { keys: "Tab / Shift+Tab", action: "Moves between Cancel and Confirm; focus stays inside the dialog." },
      { keys: "Escape", action: "Cancels and returns focus to the trigger." },
    ],
    a11y: [
      "Built on AlertDialog: `role=\"alertdialog\"`, named by `title` and described by `description`, so the consequence is read when it opens.",
      "Clicking outside does not close it; only Cancel, Confirm or Escape do.",
      "Write `confirmLabel` as the verb (\"Delete invoice\"), since the default \"Confirm\" does not say what happens.",
    ],
  },

  "context-menu": {
    faq: [
      {
        q: "Can keyboard users open the context menu?",
        a: "Only through the browser. The wrapper is a plain `<div>`; on Windows and Linux, Shift+F10 or the Menu key on a focused element inside it fires `contextmenu`, which opens the menu. macOS has no such key, so always offer the same actions in a [`DropdownMenu`](/docs/dropdown-menu) or row buttons.",
      },
      {
        q: "Does it work on phones and tablets?",
        a: "Yes. Base UI opens it after a 500ms long press and cancels if the finger moves more than 10px. Some browsers also select text on long press, so add `select-none` through `className` where that gets in the way.",
      },
      {
        q: "Does `shortcut` register the keyboard shortcut?",
        a: "No, it is display text only. Bind the key yourself, for example in a `keydown` listener on the page.",
      },
      {
        q: "Can I add separators, checkbox items or submenus?",
        a: "Not in this wrapper: items take `label`, `icon`, `shortcut`, `destructive`, `disabled` and `onSelect` only. Compose the parts from `@base-ui/react/context-menu` yourself; the class strings in DropdownMenu fit them.",
      },
    ],
    keyboard: [
      { keys: "ArrowDown / ArrowUp", action: "Moves between items, wrapping at the ends and skipping disabled ones." },
      { keys: "Home / End", action: "Moves to the first or last item." },
      { keys: "Enter / Space", action: "Runs the highlighted item's `onSelect` and closes the menu." },
      { keys: "Escape", action: "Closes the menu." },
    ],
    a11y: [
      "The popup has `role=\"menu\"` and each item `role=\"menuitem\"`. Typing a letter moves to the next item that starts with it.",
      "Item icons are in `aria-hidden` spans. The `shortcut` text sits inside the item, so it is read as part of the item's name.",
      "Destructive items differ only by `text-danger` colour, so make the label say what happens, such as \"Delete file\".",
      "The fade and zoom are CSS animations, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  dialog: {
    faq: [
      {
        q: "How do I close the Dialog after a form submits?",
        a: "Control it with `<Dialog open={open} onOpenChange={setOpen}>` and call `setOpen(false)` when your submit handler or Server Action finishes. Any button wrapped in `DialogClose` closes it without state.",
      },
      {
        q: "How do I remove the X button or stop outside clicks closing it?",
        a: "Pass `showCloseButton={false}` to `DialogContent` to drop the X. Pass `disablePointerDismissal` to `Dialog` so a click on the backdrop does nothing; Escape still closes it.",
      },
      {
        q: "How do I make the dialog wider or scroll long content?",
        a: "Pass `className=\"sm:max-w-2xl\"` to `DialogContent`; it replaces the default `sm:max-w-md`. The popup does not scroll by itself, so wrap long content in a `max-h-[60vh] overflow-y-auto` element.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the trigger, opens the dialog and focuses the first focusable element inside." },
      { keys: "Tab / Shift+Tab", action: "Cycles through the dialog's controls; focus cannot leave it." },
      { keys: "Escape", action: "Closes the dialog and returns focus to the trigger." },
    ],
    a11y: [
      "The popup has `role=\"dialog\"`, labelled by `DialogTitle` and described by `DialogDescription`. Without a title the dialog has no accessible name.",
      "Focus is trapped, the page behind is inert and scroll-locked, and focus returns to the trigger on close.",
      "The corner X has screen-reader text \"Close\".",
      "The fade, zoom and slide are CSS animations, cut to 0.01ms under `prefers-reduced-motion: reduce`. The backdrop blur only applies where `backdrop-filter` is supported.",
    ],
  },

  drawer: {
    faq: [
      {
        q: "How do I open the Drawer from my own button?",
        a: "Pass it as `trigger`: `<Drawer trigger={<Button>Invoice actions</Button>} />`. The drawer adds an open handler (your own `onClick` still runs), `aria-haspopup` and `aria-expanded`. To open it from code or close it from a button inside, control it instead: keep `open` in state and pass `onClose={() => setOpen(false)}`.",
      },
      {
        q: "Can users swipe the Drawer down to close it?",
        a: "No. It is a [`Sheet`](/docs/sheet) that opens from the bottom by default (`side`): it slides in and out but has no drag handle or swipe gesture. Escape, a tap on the scrim and the close button close it.",
      },
      {
        q: "How tall can it get?",
        a: "From the top or bottom, up to 80% of the viewport height (`max-h-[80vh]`); the content area scrolls beyond that. With `side=\"left\"` or `\"right\"` it is full height and `max-w-md` wide.",
      },
      {
        q: "Why does it show invoice actions?",
        a: "Without `children` it renders sample content titled \"Invoice INV-2041\". Pass `children` and a `title`.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the trigger, opens the drawer and moves focus into it." },
      { keys: "Tab / Shift+Tab", action: "Cycles through the drawer's controls; focus stays inside." },
      { keys: "Escape", action: "Closes the drawer and returns focus to the trigger." },
    ],
    a11y: [
      "Built on Base UI Dialog through Sheet: `role=\"dialog\"` named by `title`. With `children` and no `title`, the name falls back to \"Sheet\", so always pass a title.",
      "The trigger, built-in or your own, gets `aria-haspopup=\"dialog\"` and `aria-expanded`, and the close button is labelled \"Close sheet\".",
      "The slide is a CSS animation, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "dropdown-menu": {
    faq: [
      {
        q: "How do I open a Dialog from a DropdownMenu item?",
        a: "Keep the dialog's `open` in state, set it to true in the item's `onClick`, and render the `Dialog` outside the menu. A dialog rendered inside `DropdownMenuContent` unmounts when the menu closes.",
      },
      {
        q: "How do I add checkbox or radio items?",
        a: "Use `DropdownMenuCheckboxItem` with `checked` and `onCheckedChange`, or a `DropdownMenuRadioGroup` with `value` and `onValueChange` around `DropdownMenuRadioItem`s. Unlike plain items, these keep the menu open when chosen.",
      },
      {
        q: "Does `DropdownMenuShortcut` make the shortcut work?",
        a: "No, it only shows the hint. Bind the key yourself.",
      },
      {
        q: "Why does `<DropdownMenu />` show Maya Chen's account menu?",
        a: "With no children it renders a sample menu. Pass your own `DropdownMenuTrigger` and `DropdownMenuContent`.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space / ArrowDown", action: "On the trigger, opens the menu and focuses the first item." },
      { keys: "ArrowDown / ArrowUp", action: "Moves between items, wrapping at the ends." },
      { keys: "Home / End", action: "Moves to the first or last item." },
      { keys: "ArrowRight", action: "On a submenu trigger, opens the submenu and focuses its first item." },
      { keys: "ArrowLeft", action: "In a submenu, closes it and returns focus to its trigger." },
      { keys: "Enter / Space", action: "Runs the focused item, or toggles a checkbox or radio item." },
      { keys: "Escape", action: "Closes the menu and returns focus to the trigger." },
    ],
    a11y: [
      "The trigger gets `aria-haspopup=\"menu\"` and `aria-expanded`. The popup has `role=\"menu\"`, and items are `menuitem`, `menuitemcheckbox` or `menuitemradio`, with `aria-checked` on the last two.",
      "Typing a letter moves focus to the next item that starts with it.",
      "`variant=\"destructive\"` only colours the item, so keep the label explicit.",
      "The fade and zoom are CSS animations, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "hover-card": {
    faq: [
      {
        q: "Does HoverCard work on touch screens?",
        a: "Not reliably: it opens on hover and keyboard focus, and touch has no hover. Make the trigger a link to the full page, so a tap still gets people there, and never put information only in the card.",
      },
      {
        q: "How do I change how fast it opens?",
        a: "`delay` (default 400ms) is the wait before opening and `closeDelay` (default 200ms) the wait after the pointer leaves. Both override Base UI's own 600ms and 300ms.",
      },
      {
        q: "Why is my trigger wrapped in a span?",
        a: "The Base UI trigger renders as `<span class=\"inline-flex\">` around your `trigger` node. Put a real `<a>` or `<button>` inside it: plain text is not focusable, so keyboard users would never see the card.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focusing the link or button inside the trigger opens the card after `delay`." },
      { keys: "Escape", action: "Closes the card." },
    ],
    a11y: [
      "The trigger wrapper is a `<span>` and is not focusable itself; the card is reachable by keyboard only when `trigger` contains a link or button.",
      "Base UI adds no dialog role to the card and focus stays on the trigger, so screen readers do not read the card when it opens.",
      "The fade and zoom are turned off with `motion-reduce:animate-none`.",
    ],
  },

  "keyboard-shortcuts": {
    faq: [
      {
        q: "How do I change or turn off the ? hotkey?",
        a: "Pass `hotkey` with another key, or `hotkey=\"\"` to turn it off. The listener ignores presses with ⌘, Ctrl or Alt held, and presses inside inputs, textareas, selects and contenteditable elements, so typing a question mark in a field does not open it.",
      },
      {
        q: "How do I show ⌘ on Mac and Ctrl on Windows?",
        a: "Write `mod` in `keys`: `{ keys: [\"mod\", \"K\"], label: \"Command palette\" }` shows ⌘ K on a Mac and Ctrl K elsewhere. `shift`, `alt`, `ctrl`, `enter`, `backspace`, `esc`, `tab`, `space`, `up`, `down`, `left` and `right` are mapped too.",
      },
      {
        q: "Does KeyboardShortcuts make the shortcuts work?",
        a: "No. It only lists them. Register each shortcut in your app; the sheet is the reference people read.",
      },
      {
        q: "Why does a Mac show Ctrl for a moment?",
        a: "The platform is read with `useSyncExternalStore`, and the server snapshot is non-Mac, so the server HTML and the first client render show Ctrl. After hydration the client switches to ⌘, which avoids a hydration mismatch.",
      },
    ],
    keyboard: [
      { keys: "?", action: "Anywhere outside a text field, opens the sheet (or whatever key `hotkey` is). Shift+/ also works on layouts that report it as \"/\"." },
      { keys: "Tab / Shift+Tab", action: "Moves between the search field and the close button; focus stays in the dialog." },
      { keys: "Escape", action: "Closes the sheet and clears the search." },
    ],
    a11y: [
      "Each row has screen-reader-only key names, such as \"Command K\" on a Mac or \"Control K\" elsewhere, while the glyphs are `aria-hidden`.",
      "The search field gets focus when the sheet opens and is labelled \"Search shortcuts\". Searching \"command\" also finds ⌘ shortcuts.",
      "Each group is a `<section>` labelled by its `<h3>`. The trigger has `aria-haspopup=\"dialog\"` and `aria-expanded`.",
    ],
  },

  "mobile-action-sheet": {
    faq: [
      {
        q: "How do I open it from my own button?",
        a: "Pass `open` and `onClose`, keep `open` in state and set it from your button. Without `open` it renders its own trigger, labelled by `triggerLabel` (default \"Open action sheet\").",
      },
      {
        q: "Does the sheet close after an action?",
        a: "Yes. A row runs its `onSelect` first, then closes the sheet and calls `onClose`. For an async action, start it in `onSelect` and report progress elsewhere, such as a [`Toast`](/docs/toast).",
      },
      {
        q: "Does it clear the iPhone home indicator?",
        a: "Yes. The bottom padding is `max(0.75rem, env(safe-area-inset-bottom))`. The inset is only non-zero when your viewport meta tag includes `viewport-fit=cover`.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the trigger, opens the sheet and focuses the first action." },
      { keys: "Tab / Shift+Tab", action: "Moves through the actions and Cancel; focus stays in the sheet." },
      { keys: "Enter / Space", action: "On an action, runs it and closes the sheet." },
      { keys: "Escape", action: "Cancels and returns focus to the trigger." },
    ],
    a11y: [
      "The popup is a Base UI dialog named by `title`, or \"Actions\" when there is no title.",
      "Every action is a native `<button>` with an inset focus ring. Destructive rows are only coloured `text-danger`, so the label must say what happens.",
      "The slide up is a CSS animation, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "notification-inbox": {
    faq: [
      {
        q: "Why don't new notifications appear when I update `notes`?",
        a: "`notes` is only the starting list: it seeds internal state on mount, and the inbox tracks read state itself from then on. To show new items, remount it with a changing `key`, such as `key={latestId}`, or copy the file and make `notes` controlled.",
      },
      {
        q: "How do I sync read state with my server?",
        a: "Use `onOpenNote(note)`, called when a row is opened and marked read, and `onMarkAllRead()`. Send the change to your API from there. Opening a row does not close the popover, so navigate or show the item from `onOpenNote`.",
      },
      {
        q: "How do I hide the View all activity link?",
        a: "Pass `viewAllHref=\"\"`. The default is `\"#\"`, which shows the footer.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the bell, opens the inbox and moves focus inside." },
      { keys: "Tab / Shift+Tab", action: "Moves through All, Mentions, Mark all read, each notification and the footer link." },
      { keys: "Enter / Space", action: "On a notification, opens it and marks it read." },
      { keys: "Escape", action: "Closes the inbox and returns focus to the bell." },
    ],
    a11y: [
      "The bell's accessible name includes the count, such as \"Notifications, 3 unread\". The visual count badge is `aria-hidden` and caps at \"99+\".",
      "All and Mentions are buttons with `aria-pressed`, not a tablist, so the arrow keys do not move between them.",
      "Each unread row ends with screen-reader text \"Unread\"; avatars and kind icons are `aria-hidden`.",
      "The popup is labelled \"Notifications\". Its fade and scale are CSS transitions, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "peek-panel": {
    faq: [
      {
        q: "How does Escape close the PeekPanel?",
        a: "Pass `onClose`. Escape calls it only while focus is inside the panel, because the handler sits on the `<aside>`. It also calls `stopPropagation`, so Escape handlers on parent elements do not run as well.",
      },
      {
        q: "Does focus move into the panel when it opens?",
        a: "No. It is not a dialog and does not move or trap focus. Move focus yourself if the panel needs attention, for example to its first field, or leave it on the list so people can keep browsing.",
      },
      {
        q: "How do I make it fill the height beside a list?",
        a: "Give the parent a height and `flex`, such as `<div className=\"flex h-[600px]\">`. The panel is `h-full w-full max-w-md`, and its body scrolls while the title bar stays put.",
      },
    ],
    keyboard: [
      { keys: "Escape", action: "With focus inside the panel, calls `onClose`." },
      { keys: "Tab", action: "Moves through the panel's content in normal page order; focus is not trapped." },
    ],
    a11y: [
      "An `<aside>` landmark named by `title` through `aria-label`, so screen reader users can jump to it.",
      "The title is an `<h2>`. The close button is an IconButton labelled \"Close peek\", and it renders only when `onClose` is set.",
    ],
  },

  popover: {
    faq: [
      {
        q: "How do I close the Popover after an action?",
        a: "Wrap the button in `PopoverClose`, as in `<PopoverClose render={<Button size=\"sm\" />}>Done</PopoverClose>`, or control it with `open` and `onOpenChange` on `Popover` and set it to false yourself.",
      },
      {
        q: "How do I change its width or position?",
        a: "`PopoverContent` takes `side` (default `\"bottom\"`), `align` (default `\"center\"`), `sideOffset` (4) and `alignOffset`. The width is `w-72`; pass `className=\"w-96\"` to change it. It flips to stay on screen.",
      },
      {
        q: "Is the Popover modal?",
        a: "No, by default the page stays usable and an outside click closes it. Pass `modal` to `Popover` to lock page scroll and block outside clicks; Base UI traps focus only when a `PopoverClose` is rendered inside. `modal=\"trap-focus\"` traps focus without the scroll lock.",
      },
      {
        q: "Why does `<Popover />` show a Share report button?",
        a: "With no children it renders a demo trigger and panel. Pass your own `PopoverTrigger` and `PopoverContent`.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the trigger, opens or closes the popover. Opening moves focus to the first focusable element inside." },
      { keys: "Tab / Shift+Tab", action: "Moves through the popover's controls." },
      { keys: "Escape", action: "Closes the popover and returns focus to the trigger." },
    ],
    a11y: [
      "The trigger gets `aria-haspopup=\"dialog\"` and `aria-expanded`. The popup has `role=\"dialog\"`, labelled by `PopoverTitle` and described by `PopoverDescription`.",
      "Focus moves inside on open and back to the trigger on close.",
      "The fade, zoom and slide are CSS animations, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  sheet: {
    faq: [
      {
        q: "How do I open a Sheet without the Open sheet button?",
        a: "Pass `open`. A controlled Sheet renders no trigger: set `open` from your own button and back to false in `onClose`. Uncontrolled, it always renders an outline \"Open sheet\" button, and there is no prop to change that label.",
      },
      {
        q: "How do I make the Sheet wider?",
        a: "`className` goes on the panel, so `className=\"max-w-xl\"` replaces the default `max-w-md` on left and right sheets. Top and bottom sheets span the width and stop at 80% of the viewport height.",
      },
      {
        q: "Where do Save and Cancel buttons go?",
        a: "There is no footer slot: under the title bar the body is one scrolling area with `p-4`. Put the buttons at the end of `children`, or make them sticky with `sticky bottom-0` and a `bg-raised` background.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the trigger, opens the sheet and moves focus into it." },
      { keys: "Tab / Shift+Tab", action: "Cycles through the sheet's controls; focus stays inside." },
      { keys: "Escape", action: "Closes the sheet and returns focus to the trigger." },
    ],
    a11y: [
      "Built on Base UI Dialog: `role=\"dialog\"` named by `title`. Without a title it falls back to `aria-label=\"Sheet\"`, so pass one.",
      "Focus is trapped, the page is inert and scroll-locked, and focus returns to the trigger on close.",
      "The close button is labelled \"Close sheet\" and its icon is `aria-hidden`.",
      "The slide is a CSS animation, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  tooltip: {
    faq: [
      {
        q: "Why does my tooltip take a moment to appear?",
        a: "A `Tooltip` on its own uses Base UI's 600ms open delay. Wrap the toolbar or app in `TooltipProvider`, whose `delay` defaults to 0 in this kit, or set `delay` on the provider to the wait you want.",
      },
      {
        q: "Why doesn't the tooltip show on a disabled button?",
        a: "A disabled native `<button>` gets no pointer or focus events, so the tooltip never opens. Use `focusableWhenDisabled` on [`Button`](/docs/button), which keeps it focusable with `aria-disabled`, or wrap the button in a `<span>` and make that the trigger.",
      },
      {
        q: "Is a tooltip enough to label an icon button?",
        a: "No. Base UI 1.8 adds no `role=\"tooltip\"` or `aria-describedby`, so screen readers never read the tooltip text. The trigger needs its own name, as in `<TooltipTrigger render={<IconButton aria-label=\"Archive invoice\" />}>`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focusing the trigger opens the tooltip." },
      { keys: "Escape", action: "Closes the tooltip; focus stays on the trigger." },
    ],
    a11y: [
      "The tooltip is visual only: it is not linked to the trigger, so put any text screen reader users need in the trigger's label.",
      "It opens on keyboard focus as well as hover, so keyboard users see the same hint.",
      "The fade, zoom and slide are CSS animations, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },
}
