import type { ComponentDocsContent } from "../types"

export const PART_06: Record<string, ComponentDocsContent> = {
  badge: {
    faq: [
      {
        q: "How do I make a Badge a link or a button?",
        a: "Pass the element as `render`: `<Badge render={<a href=\"/changelog\" />} variant=\"outline\">v2.4</Badge>`. The hover colours are scoped to `<a>` elements (`[a]:hover`), so a `render={<button type=\"button\" />}` badge gets the focus ring but no hover tint, except in the `ghost` and `link` variants.",
      },
      {
        q: "How do I put a count badge on an icon?",
        a: "Wrap the icon in a `relative` element and position the badge with `className=\"absolute -top-1.5 -right-2 px-1.5\"`. A bare number means little to a screen reader, so add hidden context: `3<span className=\"sr-only\"> unread</span>`.",
      },
    ],
    a11y: [
      "Renders a plain `<span>` with no role, so it is read as part of the surrounding text. The words must carry the meaning; the variant colour only supports them.",
      "Icons inside get `size-3` and `pointer-events-none`, but they are not hidden for you: add `aria-hidden` to a decorative svg.",
      "Rendered as a link with `render={<a />}`, it gets a 2px accent `focus-visible` ring with a 2px offset.",
    ],
  },

  banner: {
    faq: [
      {
        q: "How do I keep a dismissed Banner hidden after a reload?",
        a: "Banner does not hide itself or remember anything: `onDismiss` only tells you the button was pressed. Remove it from your state and save a flag, for example `localStorage.setItem(\"card-expiry-dismissed\", \"1\")`, then skip rendering it on the next visit.",
      },
      {
        q: "How do I pin a Banner to the top of the page?",
        a: "Banner has no positioning of its own. Render it first in your layout, or make it stick with `className=\"sticky top-0 z-40\"`. Its corners are square for full-width use, so add `rounded-lg` when it sits inside content.",
      },
      {
        q: "Why isn't my Banner announced when the page loads?",
        a: "Banner is a live region, and screen readers announce live regions when they are inserted or their text changes. A banner that is in the first HTML is read in normal page order instead. Mount it after load, for example when a fetch reports a failed card, and most screen readers announce it.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the `action` content, then to the Dismiss button." },
      { keys: "Enter / Space", action: "On the Dismiss button, calls `onDismiss`." },
    ],
    a11y: [
      "`role=\"status\"` (polite) for `accent`, `info`, `success` and `warning`; `role=\"alert\"` (assertive) for `danger`.",
      "The dismiss control is an [`IconButton`](/docs/icon-button) with `aria-label=\"Dismiss\"` and `type=\"button\"`, so it never submits a surrounding form.",
      "Focus is not moved when the banner is removed. If the Dismiss button had focus, move focus to a sensible element, such as the main heading, in `onDismiss`.",
      "The tone is shown only by the tint; the text colour stays `text-fg`. Say the urgency in the words.",
    ],
  },

  callout: {
    faq: [
      {
        q: "Can I add an icon to a Callout?",
        a: "There is no `icon` prop. `title` takes any node, so you can pass an icon with `aria-hidden` and the text inside an `inline-flex` span. [`InlineAlert`](/docs/inline-alert) picks the icon from `tone` for you.",
      },
      {
        q: "Can I use Callout in MDX or a Server Component?",
        a: "Yes. It has no state or handlers, so MDX or a Server Component can render `<Callout tone=\"warning\" title=\"Invoices are final\">…</Callout>` directly. Extra props such as `id` go to the outer `<div>`.",
      },
    ],
    a11y: [
      "`role=\"note\"` on the wrapper. It is not a live region, so for a message that appears after an action use [`InlineAlert`](/docs/inline-alert), whose `danger` and `warning` tones are `role=\"alert\"`.",
      "`title` renders as a `<p>` with `font-medium`, not a heading, so it does not appear in the page outline.",
      "The tone changes only the border and background tint (`info` is the neutral grey), so put the severity in the words.",
    ],
  },

  "empty-search": {
    faq: [
      {
        q: "When should I render EmptySearch instead of the results?",
        a: "Only after the request for the current query has finished with nothing. Show a loading state while it runs. Otherwise \"No results\" flashes between keystrokes and, because the wrapper is `role=\"status\"`, gets announced each time.",
      },
      {
        q: "Does Clear search reset my input?",
        a: "Only if your handler does. `onClear` is called as is: set your query state to `\"\"` there, and move focus back to the search input so keyboard users can type again. Without `onClear` there is no button.",
      },
      {
        q: "How do I add an icon or a different button?",
        a: "EmptySearch passes no `icon` to [`EmptyState`](/docs/empty-state), so it shows the quiet placeholder tile, and its only button is Clear search. Render `EmptyState` directly with your own `icon`, `title` and `actionLabel` for anything else.",
      },
    ],
    a11y: [
      "The wrapper is `role=\"status\"` around the title, such as \"No results for “invoice 2041”\". Some screen readers do not announce a status region that mounts with its text already inside.",
      "The title is an `<h3>` from EmptyState; without `query` it reads \"No results\".",
      "Clear search is `type=\"button\"`, so it does not submit a surrounding search form.",
    ],
  },

  "empty-state": {
    faq: [
      {
        q: "How do I make the EmptyState action a link?",
        a: "There is no `href` prop: `actionLabel` and `onAction` render a `<Button type=\"button\">`. Call `router.push(\"/invoices/new\")` in `onAction`, or build the panel yourself with a [`Button`](/docs/button) that has `render={<Link href=\"/invoices/new\" />}` when you need a real link.",
      },
      {
        q: "Is EmptyState announced to screen readers?",
        a: "No, it has no live role. That suits a first-run page. For results that change while the user types, use [`EmptySearch`](/docs/empty-search), which wraps EmptyState in `role=\"status\"`.",
      },
      {
        q: "Can I change the heading level?",
        a: "Not with a prop: the title is always an `<h3>`. Edit the copied file if your page needs another level.",
      },
    ],
    a11y: [
      "The `icon` wrapper and the fallback tile are both `aria-hidden`, so pass decorative icons only.",
      "The title is an `<h3>` and the description a `<p>`. The button renders only when `actionLabel` is set.",
      "The action is `type=\"button\"`, so it does not submit a surrounding form.",
    ],
  },

  "empty-workspace": {
    faq: [
      {
        q: "How do I change the copy and the shortcut buttons?",
        a: "Edit the block file. It only takes `onCreate` and `className`. The workspace name, the empty state text and the Connect a data source and Invite teammates buttons are written into the file, and those two buttons have no handlers yet.",
      },
    ],
    a11y: [
      "[`PageHeader`](/docs/page-header) renders the workspace name as an `<h1>`. Use the block as the page's main content, not inside a page that already has an `<h1>`.",
      "The empty state title is an `<h3>`, and the folder icon is `aria-hidden`.",
    ],
  },

  "error-state": {
    faq: [
      {
        q: "How do I use ErrorState in a Next.js error.tsx?",
        a: "Start `error.tsx` with `\"use client\"`, as Next.js requires for error boundaries, and pass the boundary's `retry` prop: `<ErrorState description=\"We couldn't load invoices.\" onRetry={retry} />`. In Next.js 16.2 the prop is `unstable_retry`; before that, use `reset`, which re-renders without refetching.",
      },
      {
        q: "How do I show that a retry is running?",
        a: "ErrorState has no pending prop; the button stays enabled. Use [`RetryBlock`](/docs/retry-block), whose `retrying` prop disables the button and spins its icon, or swap ErrorState for a loading state while the refetch runs.",
      },
      {
        q: "Should I put error.message in the description?",
        a: "Not for Server Component errors in production: Next.js replaces their message with a generic one plus an `error.digest` hash. Keep `description` in plain words. If support needs the hash, show it with [`ServerErrorState`](/docs/server-error-state) `requestId`.",
      },
    ],
    a11y: [
      "`role=\"alert\"` on the panel, so the title and description are announced assertively when it mounts.",
      "The title is an `<h3>`. The retry button renders only when `onRetry` is set, labelled by `retryLabel` (default \"Try again\").",
    ],
  },

  "health-indicator": {
    faq: [
      {
        q: "How do I show a service name instead of the status word?",
        a: "Pass `label`: `<HealthIndicator status=\"degraded\" label=\"API\" />` shows \"API\" beside the dot. The status is still read out, because a visually hidden \": degraded\" follows the label.",
      },
      {
        q: "Can it show maintenance or unknown?",
        a: "No, `status` takes only `operational`, `degraded` and `down`. For other states, put a [`StatusDot`](/docs/status-dot) with `tone=\"neutral\"` or `tone=\"accent\"` next to your own text, or use a [`StatusBadge`](/docs/status-badge).",
      },
    ],
    a11y: [
      "The dot is a [`StatusDot`](/docs/status-dot) without a label, so it is `aria-hidden`. The text carries the state.",
      "With `label`, screen readers hear \"Webhooks: down\" for `<HealthIndicator status=\"down\" label=\"Webhooks\" />`.",
      "Without `label`, the status word itself is shown, capitalised with CSS, so it is read as \"degraded\".",
    ],
  },

  "incident-banner": {
    faq: [
      {
        q: "Why does my IncidentBanner show a Status page link I didn't add?",
        a: "`href` defaults to `\"#\"`, so the link renders unless you pass `href=\"\"`. `title` also defaults to sample text (\"Elevated API errors in us-east\"), so always pass your own.",
      },
      {
        q: "Can users dismiss an IncidentBanner?",
        a: "No, it has no close button: it is meant to stay until the incident is resolved. For a notice users can close, use [`Banner`](/docs/banner) with `onDismiss`.",
      },
      {
        q: "How do I show it only during an outage?",
        a: "Render it from your status data: `{incident ? <IncidentBanner severity={incident.severity} title={incident.title} href={incident.url} /> : null}`. It is `role=\"status\"`, but some screen readers do not announce a status region that mounts with its text already inside, so do not rely on it as the only alert.",
      },
    ],
    a11y: [
      "`role=\"status\"` for every severity, including `critical`, so it is announced politely, never as an alert.",
      "The severity is visible text (\"Major\") next to an `aria-hidden` [`StatusDot`](/docs/status-dot), so colour is not the only signal.",
      "The `·` separator is `aria-hidden`. The link is a plain `<a>` with `linkLabel` as its text and a 2px accent `focus-visible` ring.",
    ],
  },

  "inline-alert": {
    faq: [
      {
        q: "How do I show a Server Action error with InlineAlert?",
        a: "Return the message from the action and render it from `useActionState`: `{state?.error ? <InlineAlert tone=\"danger\" title=\"Could not save\">{state.error}</InlineAlert> : null}`. Because `danger` uses `role=\"alert\"`, the message is announced as soon as it mounts.",
      },
      {
        q: "How do I tie an InlineAlert to a form field?",
        a: "Other props go to the outer `<div>`, so give it an `id` and add that id to the field's `aria-describedby`. Screen readers then read the alert when the field gets focus.",
      },
      {
        q: "Can InlineAlert have an action or a close button?",
        a: "There are no `action` or `onDismiss` props. `children` can hold inline content such as a link or a small [`Button`](/docs/button). For a dismissible strip, use [`Banner`](/docs/banner).",
      },
    ],
    a11y: [
      "`danger` and `warning` set `role=\"alert\"` (assertive). `neutral` and `success` set `role=\"status\"` (polite).",
      "The tone icon is `aria-hidden`. Tone also sets the border colour, so the text has to say what happened.",
      "`title` is a `<p>`, not a heading.",
    ],
  },

  "loading-overlay": {
    faq: [
      {
        q: "Why does LoadingOverlay cover the whole page?",
        a: "It is `absolute inset-0`, so it fills the nearest positioned ancestor. Add `relative` to the card or table wrapper you want covered. It copies that element's corner radius with `rounded-[inherit]`.",
      },
      {
        q: "Does LoadingOverlay stop clicks and typing underneath?",
        a: "It blocks pointer clicks, because it sits on top with `z-10`, but keyboard focus can still reach the buttons and fields underneath. Add `inert` to the covered content while it shows: `<div inert={isFetching}>…</div>`.",
      },
    ],
    a11y: [
      "`role=\"status\"` with `aria-live=\"polite\"` around `label` (default \"Loading\"). The region mounts with its text already inside, which some screen readers do not announce; for a reliable message, keep an empty status region on the page and set its text when loading starts.",
      "The inner [`Spinner`](/docs/spinner) is wrapped in `aria-hidden`, so its own status is not announced a second time.",
      "It does not set `aria-busy`. Put `aria-busy=\"true\"` on the covered region yourself while it reloads.",
    ],
  },

  meter: {
    faq: [
      {
        q: "Can Meter turn red near the limit?",
        a: "It has no tone or threshold props; the fill is always `bg-accent`. Use [`QuotaBar`](/docs/quota-bar), which turns warning at `warnAt` percent and danger at the limit, or recolour the fill yourself: `className=\"[&_[data-slot=meter-indicator]]:bg-danger\"`.",
      },
      {
        q: "What happens when value is over max?",
        a: "The bar stops at 100%, `aria-valuenow` is clamped to `max`, and the default text reads \"100%\". Pass `valueText` to say the real amount, such as \"60 of 50 GB, over limit\".",
      },
    ],
    a11y: [
      "The track is `role=\"meter\"` with `aria-valuemin=0`, `aria-valuemax={max}`, `aria-valuenow` clamped to that range, and `aria-valuetext`: your `valueText`, or the rounded percentage such as \"84%\".",
      "`label` renders as a `<p>` and names the meter through `aria-labelledby`. Without it the name falls back to \"Meter\", so always pass `label`.",
      "The number shown by `showValue` is `aria-hidden`, because `aria-valuetext` already carries it. It uses `tabular-nums`.",
    ],
  },

  "not-found-state": {
    faq: [
      {
        q: "How do I use NotFoundState in a Next.js not-found.tsx?",
        a: "Render it from `app/not-found.tsx` and pass real links as `actions`: `<NotFoundState actions={<Button size=\"sm\" render={<Link href=\"/\" />}>Go home</Button>} />`. Without `actions` you get Go home and Open gallery buttons that do nothing.",
      },
      {
        q: "Does showing NotFoundState return a 404 status?",
        a: "No, it is only UI. Call `notFound()` from `next/navigation` so Next.js renders your `not-found.tsx` and adds a `noindex` robots tag. If the response has already started streaming, the status stays 200, so check the record before any `<Suspense>` boundary.",
      },
    ],
    a11y: [
      "The title is an `<h2>`. The `code` above it is a plain `<p>` in mono with `tabular-nums`.",
      "It has no live role, which suits a full page. Swapped in on the client, it is not announced.",
    ],
  },

  "notification-item": {
    faq: [
      {
        q: "How do I make a NotificationItem clickable?",
        a: "It is a plain `<div>` with no `onClick` or `href`. Wrap it in your own `<a>`, or a `<button className=\"block w-full text-left\">`, and mark the notification read in that handler.",
      },
      {
        q: "What does the date prop accept?",
        a: "A `Date` or any string `new Date()` parses; ISO 8601 such as `\"2026-11-14T09:30:00Z\"` is safest. It renders through [`RelativeTime`](/docs/relative-time) as \"42m ago\" and does not refresh on its own. Without `date` the row shows 42 minutes ago, which only suits demos.",
      },
    ],
    a11y: [
      "Unread rows put a visually hidden \"Unread\" inside the dot. The tint and the dot colour are not announced.",
      "The time is a `<time>` element with the ISO timestamp in `dateTime` and the full local date in `title`.",
      "The title truncates to one line with an ellipsis, but the full text stays in the DOM, so screen readers read all of it.",
    ],
  },

  "notification-center": {
    faq: [
      {
        q: "How do I connect NotificationCenter to real notifications?",
        a: "Copy the block and replace `SAMPLE` with your data. The unread set lives in local state, seeded with `n1` and `n2`; move it to your store and call your API from the Mark all read handler.",
      },
      {
        q: "How do I open it from a bell icon?",
        a: "Use [`NotificationInbox`](/docs/notification-inbox), a bell button with its own popover. Or put this block inside your own popover and drop its outer border with `className`.",
      },
      {
        q: "Can users mark one notification as read?",
        a: "Not in the block as shipped: rows have no click handler, and only Mark all read changes the unread set. Wrap each [`NotificationItem`](/docs/notification-item) in a button that removes its id from the set.",
      },
    ],
    a11y: [
      "A `<section>` named by its \"Notifications\" `<h2>` through `aria-labelledby`. The rows are in a `<ul>`.",
      "The \"2 new\" count is `aria-live=\"polite\"`, so screen readers hear it change.",
      "Mark all read becomes natively `disabled` once nothing is unread, which takes it out of the Tab order. Add `focusableWhenDisabled` to that [`Button`](/docs/button) if keyboard users should stay on it.",
    ],
  },

  "offline-banner": {
    faq: [
      {
        q: "How do I show OfflineBanner only when the browser is offline?",
        a: "The banner does not watch the connection itself. Track `navigator.onLine` with the window `online` and `offline` events, for example through `useSyncExternalStore` with a server snapshot of `true`, and render `{!online ? <OfflineBanner /> : null}`.",
      },
      {
        q: "Does the Retry button reconnect anything?",
        a: "No. It calls `onRetry`, where you refetch or restart your sync. Without `onRetry` the button is not rendered.",
      },
    ],
    a11y: [
      "`role=\"status\"` (polite). Some screen readers do not announce a status region that mounts with its text already inside.",
      "The Wi-Fi-off icon is `aria-hidden`; the message text says the state.",
      "Retry is `type=\"button\"`, so it does not submit a surrounding form.",
    ],
  },

  "offline-state": {
    faq: [
      {
        q: "How do I hide the Retry connection button?",
        a: "Leave out `onRetry`. The button renders only when you pass a handler, the same as in [`OfflineBanner`](/docs/offline-banner). Use that when the app reconnects on its own, for example from an `online` event listener.",
      },
      {
        q: "What should the description say?",
        a: "What still works and what is paused, in your product's words, for example \"Your drafts are saved on this device. Sending resumes when you reconnect.\" The default mentions registry pages, so replace it.",
      },
    ],
    a11y: [
      "It has no live role, so it is not announced when it replaces content. Pair it with an [`OfflineBanner`](/docs/offline-banner) if users need to hear the change.",
      "The title is an `<h3>`. The warning dot beside it is `aria-hidden`.",
    ],
  },

  "permission-denied": {
    faq: [
      {
        q: "How do I show PermissionDenied for a 403 in Next.js?",
        a: "Render it from the page after your role check fails. Next.js 16 also has an experimental `forbidden()` function: enable `experimental.authInterrupts` in `next.config`, call `forbidden()`, and render PermissionDenied from `app/forbidden.tsx`.",
      },
      {
        q: "Why do the Request access and Switch workspace buttons do nothing?",
        a: "They are placeholders with no handlers. Pass your own buttons as `actions`: `actions={<Button size=\"sm\" onClick={requestAccess}>Request access</Button>}`.",
      },
    ],
    a11y: [
      "The title is an `<h3>`. The panel has no live role, so it is not announced when it replaces content.",
    ],
  },

  "presence-dot": {
    faq: [
      {
        q: "How do I put PresenceDot on an Avatar?",
        a: "[`Avatar`](/docs/avatar) is `relative`, so place the dot inside it: `<PresenceDot status=\"online\" className=\"absolute right-0 bottom-0 ring-2 ring-bg\" />`. The ring separates the dot from the photo.",
      },
      {
        q: "Should PresenceDot have a label when the name is next to it?",
        a: "Give it a label that adds to the text, such as `label=\"Maya is in a meeting\"`. If the status is already written next to it, pass `aria-hidden` so it is not read twice. Other `<span>` props, such as `title` or `id`, pass through too.",
      },
    ],
    a11y: [
      "`role=\"img\"` with `aria-label` from `label`, or the status name: \"Online\", \"Away\", \"Busy\" or \"Offline\". Pass `aria-hidden` to hide it from screen readers.",
      "Colour is the only visual signal (success, warning, danger and fg-subtle tokens), so show the status in text somewhere for users who cannot tell the colours apart.",
    ],
  },

  progress: {
    faq: [
      {
        q: "How do I name a Progress bar for screen readers?",
        a: "Put a `ProgressLabel` inside it; Base UI links it with `aria-labelledby`, so the bar is read as \"Importing customers, 38%\". With no visible label, pass `aria-label=\"Storage used\"`, or `aria-labelledby` to point at a heading. With none of these, the name falls back to \"Progress\".",
      },
      {
        q: "How do I show an indeterminate bar or a custom value text?",
        a: "Pass `value={null}` for indeterminate; screen readers then hear \"indeterminate progress\". For your own text, give `ProgressValue` a function child, `{(formatted, value) => …}`, and `getAriaValueText` to `Progress` so the spoken text matches.",
      },
    ],
    a11y: [
      "Base UI renders `role=\"progressbar\"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and `aria-valuetext`, which is the formatted percentage by default.",
      "A `ProgressLabel` names the bar through `aria-labelledby`. Without it, `aria-label` names it, and the fallback is \"Progress\".",
      "`ProgressValue` is `aria-hidden`, because `aria-valuetext` already carries the number. It uses `tabular-nums`.",
      "The fill width is a 200ms CSS transition, which the kit stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "progress-circle": {
    faq: [
      {
        q: "Why does ProgressCircle show 72%?",
        a: "`value` defaults to 72 for demos. Always pass it: `<ProgressCircle value={pct} label=\"Upload progress\" />`.",
      },
      {
        q: "How do I show counts like 3 of 5 instead of a percent?",
        a: "ProgressCircle only takes a percent from 0 to 100 and always prints it as \"64%\". Convert first with `value={(done / total) * 100}`, set `showValue={false}` if you like, and put \"3 of 5\" in text beside it.",
      },
    ],
    a11y: [
      "`role=\"progressbar\"` with `aria-valuenow` set to the rounded, clamped percent, `aria-valuemin=0`, `aria-valuemax=100`, and `aria-label` from `label` (default \"Progress\").",
      "The SVG ring and the printed percent are `aria-hidden`; the value comes from the ARIA attributes.",
      "The ring's `stroke-dashoffset` transition is 200ms, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },

  "reaction-bar": {
    faq: [
      {
        q: "How do I save reactions to my backend?",
        a: "Pass `onToggle` and own the data. It receives the emoji: flip `active` and the count in your state, send the request, and pass the new `reactions` back. With `onToggle` set, the bar never changes counts on its own.",
      },
      {
        q: "Can users add a new emoji?",
        a: "No, ReactionBar shows only the emojis in `reactions` and has no picker. Put your own add button next to it that appends `{ emoji, count: 1, active: true }` to the array.",
      },
      {
        q: "Why does it show reactions I never passed?",
        a: "Without `reactions` it renders sample data (👍 12, 🎉 5, ❤️ 3, 👀 1). Pass an empty array to show nothing.",
      },
    ],
    a11y: [
      "Each pill is a `<button type=\"button\">` with `aria-pressed` and an `aria-label` such as \"👍 12 reactions\" (\"reaction\" when the count is 1).",
      "The emoji glyph inside is `aria-hidden`; the name comes from `aria-label`.",
      "Counts use `tabular-nums`, so digits keep the same width as they change.",
    ],
  },

  "retry-block": {
    faq: [
      {
        q: "How do I show that the retry is running?",
        a: "Pass `retrying`: the button becomes `disabled` with `aria-busy`, its icon spins and its label changes to \"Retrying…\". With a data library that exposes a fetching flag, that is `retrying={isFetching}`.",
      },
      {
        q: "Can I change the Try again label?",
        a: "Not with a prop; the labels are fixed. [`ErrorState`](/docs/error-state) takes `retryLabel` for a centred panel, or edit the copied file.",
      },
    ],
    a11y: [
      "The message is an [`InlineAlert`](/docs/inline-alert) with `tone=\"danger\"`, so it is `role=\"alert\"` and announced when it mounts.",
      "While `retrying`, the button is `disabled` with `aria-busy=\"true\"` and the label reads \"Retrying…\". The refresh icon is `aria-hidden`.",
      "Under `prefers-reduced-motion: reduce` the icon's spin stops after one 0.01ms cycle, so only the label shows the retry.",
    ],
  },

  "server-error-state": {
    faq: [
      {
        q: "Why does ServerErrorState show req_8f2c41d0?",
        a: "`requestId` defaults to that sample value. Pass your real id, or `requestId=\"\"` to hide the id and the Copy request id button.",
      },
      {
        q: "How do I use it in a Next.js error.tsx?",
        a: "Pass the boundary's `retry` to `onRetry` and the error's digest as the id: `<ServerErrorState onRetry={retry} requestId={error.digest ?? \"\"} />`. The digest is the hash Next.js writes to the server logs, so support can find the failure.",
      },
      {
        q: "Why does Copy request id do nothing?",
        a: "It uses `navigator.clipboard`, which needs a secure context (HTTPS or localhost). When the write fails, nothing happens and no error is shown.",
      },
    ],
    a11y: [
      "The panel has no live role, so it is not announced when it appears. [`ErrorState`](/docs/error-state) uses `role=\"alert\"` if you need that.",
      "Copying sets a visually hidden `role=\"status\"` to \"Request id copied\", and the button reads \"Copied\" for 1.6 seconds.",
      "The Retry button renders only when `onRetry` is set.",
    ],
  },

  skeleton: {
    faq: [
      {
        q: "How do I tell screen readers that content is loading?",
        a: "Every Skeleton is `aria-hidden`, so on their own they say nothing. Put `aria-busy=\"true\"` on the loading region and a visually hidden `<span role=\"status\">Loading invoices</span>` inside it, then remove both when the data arrives.",
      },
      {
        q: "Can I use Skeleton in a Next.js loading.tsx?",
        a: "Yes. Skeleton has no state or effects, so `app/invoices/loading.tsx` can be a Server Component that renders it. Size each one like the real content, such as `className=\"h-4 w-1/3\"`, so nothing shifts when the page streams in.",
      },
      {
        q: "How do I make a round avatar placeholder?",
        a: "Pass the shape in `className`: `<Skeleton className=\"size-10 rounded-full\" />`. Classes merge with `cn`, so `rounded-full` replaces the default `rounded-md`.",
      },
    ],
    a11y: [
      "`aria-hidden` on every `Skeleton` and on `SkeletonCard`.",
      "The sheen is a CSS `::after` animation. `motion-reduce:after:hidden` removes it under reduced motion, leaving a flat `bg-sunken` plate.",
    ],
  },

  spinner: {
    faq: [
      {
        q: "How do I change the Spinner's size or colour?",
        a: "`size` gives 14, 16 or 24px. Anything else goes in `className`, which merges with `cn`: `className=\"size-8\"` for 32px, or `className=\"border-t-fg\"` to spin in the text colour instead of the accent.",
      },
      {
        q: "How do I stop a Spinner being announced twice?",
        a: "Spinner is its own `role=\"status\"`. Inside a container that is already a status, wrap it in `<span aria-hidden>`, as [`LoadingOverlay`](/docs/loading-overlay) does.",
      },
    ],
    a11y: [
      "`role=\"status\"` with `aria-label` from `label` (default \"Loading\"). Say what is happening, such as `label=\"Saving invoice\"`.",
      "Under `prefers-reduced-motion: reduce` the kit stylesheet stops `animate-spin` after one 0.01ms cycle, leaving a static ring, so keep visible text such as \"Saving\" beside it.",
    ],
  },

  "status-badge": {
    faq: [
      {
        q: "How do I map my API statuses to StatusBadge tones?",
        a: "Keep a lookup next to your data, such as `const tone = { paid: \"success\", overdue: \"danger\", draft: \"neutral\" } as const`, and render `<StatusBadge tone={tone[invoice.status]}>{label[invoice.status]}</StatusBadge>`. The children are the label, so write or translate them yourself.",
      },
      {
        q: "Can I remove the dot?",
        a: "The dot is a `::before` pseudo-element, so `className=\"before:hidden\"` removes it. [`Badge`](/docs/badge) is the same kind of pill without a dot.",
      },
    ],
    a11y: [
      "A plain `<span>` with no role. The text is the status; the `::before` dot is not read.",
      "The `warning` text mixes 70% warning with 30% `--fg` so the label stays readable on the pale amber fill.",
    ],
  },

  "status-dot": {
    faq: [
      {
        q: "StatusDot or PresenceDot?",
        a: "[`PresenceDot`](/docs/presence-dot) is for people (online, away, busy, offline) and is announced unless you pass `aria-hidden`. StatusDot uses general tones (`neutral`, `success`, `warning`, `danger`, `accent`) and is hidden unless you label it.",
      },
    ],
    a11y: [
      "Without `label`: `aria-hidden`. With `label`: `role=\"img\"` and `aria-label`.",
      "Your own props are spread after these, so an `aria-hidden` or `role` you pass overrides them.",
    ],
  },

  toast: {
    faq: [
      {
        q: "Where do I put the Toaster in a Next.js app?",
        a: "Render `<Toaster />` once in `app/layout.tsx`, inside `<body>`. The layout can stay a Server Component. Call `toast()` from client code: the queue lives in browser memory, so a call on the server does nothing.",
      },
      {
        q: "Can I swap Sonner's toast for this one?",
        a: "The call names are the same: `toast()`, `toast.success`, `.error`, `.warning`, `.info`, `.message`, `.loading`, `.promise` and `.dismiss`, with `description`, `action`, `duration` and `id` options. It has no `position`, `richColors`, `closeButton` or `toast.custom`, ids are numbers, and `toast.promise` takes a promise, not a function, so calls that rely on those need changes.",
      },
      {
        q: "How do I turn a loading toast into a success toast?",
        a: "Keep the id `toast.loading()` returns and pass it back: `toast.success(\"Invoice sent\", { id })`. Updating clears `description` and `action` unless you pass them again. `toast.promise(p, { loading, success, error })` does the same for a promise.",
      },
      {
        q: "How long do toasts stay on screen?",
        a: "4 seconds, 5 for `toast.error`, and until updated or dismissed for `toast.loading`; pass `duration` in milliseconds, or `Infinity` to keep it. Timers stop while the stack is hovered or focused and start over when it collapses. At most 6 toasts are kept and 3 show while collapsed.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves into the stack, to each toast's action and Dismiss buttons. Focus inside fans the stack out and stops the timers." },
      { keys: "Enter / Space", action: "Activates the focused action or Dismiss button." },
    ],
    a11y: [
      "The Toaster's `<ol>` is the live region: `aria-live=\"polite\"`, `aria-relevant=\"additions text\"` and `aria-label=\"Notifications\"`. Toasts inside get `role=\"none\"`, so errors are announced politely too.",
      "A standalone `<Toast>` uses `role=\"alert\"` for `tone=\"danger\"` and `role=\"status\"` for the other tones.",
      "The Dismiss button (`aria-label=\"Dismiss\"`) stays transparent until the toast is hovered or the button has focus. Status icons are `aria-hidden`.",
      "There is no shortcut to jump to the stack, and toasts close on a timer, so an Undo in a toast should not be the only way to undo.",
    ],
  },

  "vote-control": {
    faq: [
      {
        q: "How do I save votes to a server?",
        a: "Control it with `value` and `onChange`, which receives `\"up\"`, `\"down\"`, or `null` when the viewer presses their current vote again. `score` is not adjusted for you: count up as +1, down as -1 and `null` as 0, set `score - delta(prev) + delta(next)` and the new `value` right away, then send the request and roll back if it fails.",
      },
      {
        q: "Can VoteControl be horizontal?",
        a: "It is `inline-flex flex-col`. `className=\"flex-row gap-1\"` puts the arrows on either side of the score.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to Upvote, then Downvote." },
      { keys: "Enter / Space", action: "Votes with the focused arrow. On the arrow that is already pressed, clears the vote." },
    ],
    a11y: [
      "A `role=\"group\"` named \"Vote\", with two `<button>`s labelled \"Upvote\" and \"Downvote\", each with `aria-pressed`.",
      "The score is `aria-live=\"polite\"` with a visually hidden \"Score\" prefix, so a change is read as \"Score 42\".",
      "Every VoteControl's group is named \"Vote\" and it takes no `aria-label` or other extra props, so in a list of posts keep each post's title right next to its control.",
    ],
  },

  "auth-card": {
    faq: [
      {
        q: "Is AuthCard a form?",
        a: "No, it is a `<section>`. Wrap it in your own `<form>`, as [`ForgotPasswordForm`](/docs/forgot-password-form) does, or put the `<form>` inside as children, as [`MagicLinkForm`](/docs/magic-link-form) does.",
      },
      {
        q: "How do I add a logo above the title?",
        a: "Render the logo above the card in your page. `title` becomes the `<h2>` and the section's accessible name, so keep it to plain text.",
      },
    ],
    a11y: [
      "A `<section>` labelled by its `<h2>` title through `aria-labelledby`, so it is a named region.",
      "Links in `footer` get `font-medium`, the accent colour and an underline on hover from `[&_a]` selectors.",
    ],
  },

  "forgot-password-form": {
    faq: [
      {
        q: "How do I show a \"check your inbox\" message after sending?",
        a: "The form has no success state; it only shows \"Sending…\" until your promise settles. Track it yourself: `onSubmit={async (email) => { await sendResetLink(email); setSentTo(email) }}`, then render your confirmation instead of the form. [`MagicLinkForm`](/docs/magic-link-form) has this built in.",
      },
      {
        q: "What happens if onSubmit throws?",
        a: "The pending state ends and \"Something went wrong. Try again.\" shows under the field as `role=\"alert\"`. It clears on the next submit. Throw only for real failures, such as a network error: to avoid revealing which emails have accounts, resolve and show the same confirmation whether or not the email exists.",
      },
      {
        q: "Can I use a Server Action?",
        a: "Call it from `onSubmit`, which receives the trimmed email: `onSubmit={(email) => requestReset(email)}`. The form prevents the native submit, so a `formAction` on the button would not run.",
      },
    ],
    a11y: [
      "A real `<form>` with `type=\"email\"`, `required` and `autoComplete=\"email\"`, so the browser checks the address and can autofill it before `onSubmit` runs.",
      "While pending, the submit button is `disabled` with `aria-busy=\"true\"` and reads \"Sending…\".",
      "If `onSubmit` rejects, the error line under the field is `role=\"alert\"`, so screen readers announce it.",
    ],
  },

  "join-workspace": {
    faq: [
      {
        q: "How do I show an error for an expired invite code?",
        a: "Throw from `onJoin`, for example `throw new Error(\"That invite has expired. Ask your admin for a new one.\")`, and the message appears under the field. Anything thrown that is not an `Error` shows \"That code did not work. Check it and try again.\"",
      },
      {
        q: "What happens after a successful join?",
        a: "Nothing visible: the button goes back to \"Join workspace\". Redirect inside `onJoin`, for example `router.push(\"/dashboard\")`.",
      },
      {
        q: "Can I prefill the code from an invite link?",
        a: "Not with a prop: the code is internal state that starts empty. Read the code from the URL and join directly, or change the `useState(\"\")` in the copied file.",
      },
    ],
    a11y: [
      "The form is named by its \"Join a workspace\" `<h2>` through `aria-labelledby`, and the input has a real `<label>`.",
      "On error the input gets `aria-invalid` and `aria-describedby` pointing at the message, which is `role=\"alert\"`.",
      "`noValidate` turns off browser bubbles; an empty code shows \"Enter the invite code.\" instead.",
    ],
  },

  "magic-link-form": {
    faq: [
      {
        q: "What does MagicLinkForm show after the link is sent?",
        a: "A status line under the button reads \"Check maya@acme.dev for a sign-in link.\" with the address that was entered, and the button changes to Resend link. Editing the email clears that message.",
      },
      {
        q: "How do I show an error from my auth provider?",
        a: "Throw an `Error` from `onSend`; its message shows under the field through [`FormField`](/docs/form-field) `error`. Anything else thrown shows \"Could not send the link. Try again.\"",
      },
    ],
    a11y: [
      "The confirmation is `role=\"status\"` and hidden with `empty:hidden` until it has text, so it is announced politely when the link is sent.",
      "Errors render as `role=\"alert\"`, linked to the input with `aria-describedby`, and the input gets `aria-invalid`.",
      "`inputMode=\"email\"` and `autoComplete=\"email\"` bring up the email keyboard on phones and allow autofill. `noValidate` swaps the browser bubble for the inline message.",
    ],
  },

  "otp-input": {
    faq: [
      {
        q: "How do I use OtpInput with a form or React Hook Form?",
        a: "The slots are drawn over one real `<input>`, so pass `name` and the code is sent with the form and appears in `FormData`. With React Hook Form, use a `Controller` and pass `value={field.value}` and `onChange={field.onChange}`.",
      },
      {
        q: "When does onComplete fire?",
        a: "Once, when the last slot fills. It does not fire again until the code is shortened and filled again. To start over after a wrong code, set `value` to `\"\"` if you control it, or remount with a new `key`.",
      },
      {
        q: "Does SMS autofill work?",
        a: "Yes. The input has `autoComplete=\"one-time-code\"` and, for `pattern=\"numeric\"`, `inputMode=\"numeric\"`, so phones offer the code from a message. Paste works too: disallowed characters are removed first, then the first `length` are kept, so \"Code: 123 456\" pastes as 123456.",
      },
      {
        q: "Why is my groups prop ignored?",
        a: "`groups` must add up to `length`; otherwise the slots fall back to one group. For a 6-digit code use `groups={[3, 3]}`.",
      },
    ],
    keyboard: [
      { keys: "Backspace", action: "Deletes the character before the caret." },
      { keys: "ArrowLeft / ArrowRight", action: "Moves the caret; the highlighted slot follows it." },
      { keys: "Ctrl+V / Cmd+V", action: "Pastes a code: removes disallowed characters, then keeps the first `length`." },
    ],
    a11y: [
      "One native `<input>` carries the value and the `aria-label` (default \"One-time code\" when there is no `id`). The drawn slots are `aria-hidden`.",
      "Pass `id` to point a `<label htmlFor>` at the input. With `id` set and no `aria-label`, the default name is dropped so the label names the field.",
      "`status=\"invalid\"` sets `aria-invalid` and plays a 360ms shake. Under `prefers-reduced-motion: reduce`, the kit stylesheet cuts the shake, the glyph fade and the caret blink to 0.01ms.",
    ],
  },

  "reset-password-form": {
    faq: [
      {
        q: "How do I show a pending state or a server error?",
        a: "There are neither: `onSubmit` is called and not awaited. Show the result outside the card, for example with an [`InlineAlert`](/docs/inline-alert), or add state to the copied file.",
      },
      {
        q: "Which password rules does it check?",
        a: "Only that the two fields match and that the browser's `minLength` (default 8) and `required` pass. Check anything stricter on the server.",
      },
    ],
    a11y: [
      "Both fields are `type=\"password\"` with `autoComplete=\"new-password\"`, so password managers offer to generate and save the new password.",
      "The \"At least 8 characters\" hint is linked to the first field with `aria-describedby`.",
      "A mismatch shows \"Passwords do not match\" as `role=\"alert\"` on the confirm field, which also gets `aria-invalid`. Typing in that field clears it.",
    ],
  },

  "sign-in-page": {
    faq: [
      {
        q: "How do I show a wrong password error?",
        a: "Throw or reject from `onSubmit`. The button reads \"Signing in…\" until the promise settles; if it rejects, a danger [`InlineAlert`](/docs/inline-alert), \"Could not sign you in\", shows above the button. It clears on the next submit. To word it differently, edit the copied block.",
      },
      {
        q: "How do I wire up the GitHub and Google buttons?",
        a: "The block renders `<SocialAuthRow />` without handlers, so they do nothing. In the copied file pass `onGithub` and `onGoogle`, such as `onGithub={() => signIn(\"github\")}`.",
      },
      {
        q: "How do I change the title and the sign-up link?",
        a: "Edit the block. The title, description and the Start free link (`href=\"#\"`) are written into the file; the only props are `onSubmit` and `className`.",
      },
    ],
    a11y: [
      "Email has `autoComplete=\"email\"` and password `autoComplete=\"current-password\"`, so password managers fill both.",
      "The page has no `<h1>`: the [`AuthCard`](/docs/auth-card) title is an `<h2>`. Add a visually hidden `<h1>` if this is the whole route.",
      "The lines of the \"or\" divider are `aria-hidden`; the word \"or\" is still read.",
      "A failed sign-in shows an [`InlineAlert`](/docs/inline-alert) with `role=\"alert\"`, so screen readers announce it.",
    ],
  },

  "sign-up-form": {
    faq: [
      {
        q: "How do I show an error like \"email already taken\"?",
        a: "SignUpForm has no error or pending props, and `onSubmit` is not awaited. Show server errors outside the card, or pass `error` to the email [`FormField`](/docs/form-field) in the copied file.",
      },
      {
        q: "How do I remove the GitHub and Google buttons?",
        a: "Not with props: [`SocialAuthRow`](/docs/social-auth-row) always renders, and without `onGithub` and `onGoogle` its buttons do nothing. For email-only sign-up, build the card from [`AuthCard`](/docs/auth-card).",
      },
      {
        q: "Does SignUpForm check password strength?",
        a: "No. The password only has `required`, with no `minLength`. Add `minLength` in the copied file and check stronger rules on the server.",
      },
    ],
    keyboard: [{ keys: "Enter", action: "In any field, submits the form. The social buttons sit outside the `<form>`, so Enter never triggers them." }],
    a11y: [
      "Name, email and password use `autoComplete` `name`, `email` and `new-password`, so browsers fill the first two and offer to save a generated password.",
      "Every field has native `required`. The red asterisk from FormField's `required` is `aria-hidden`, so the attribute is what screen readers announce.",
    ],
  },

  "social-auth-row": {
    faq: [
      {
        q: "How do I add a third provider?",
        a: "There is no list prop: the row is two fixed buttons in `grid-cols-2`. Copy the file, add a button and change the grid to `grid-cols-3`, or render extra buttons under the row.",
      },
      {
        q: "Why are there no provider logos?",
        a: "The buttons are text only, so no brand marks ship with the kit. Add the provider's official mark as an svg with `aria-hidden` before each label in the copied file.",
      },
    ],
    a11y: [
      "Both are native `<button type=\"button\">` elements named by their full visible text.",
      "The two columns stay side by side at every width, so check the labels fit inside narrow cards.",
    ],
  },

  "sso-provider-card": {
    faq: [
      {
        q: "Why doesn't the SSO switch move?",
        a: "Passing `enabled` makes it controlled, so update it in `onEnabledChange`: `enabled={on} onEnabledChange={setOn}`. Leave `enabled` out and the switch keeps its own state.",
      },
      {
        q: "How do I confirm before turning SSO off?",
        a: "Keep `enabled` controlled. When `onEnabledChange` receives `false`, open an [`AlertDialog`](/docs/alert-dialog) and only set the state after the admin confirms.",
      },
    ],
    a11y: [
      "The [`Switch`](/docs/switch) is `role=\"switch\"` with `aria-label=\"Enable Acme SAML\"`, and the button has `aria-label=\"Configure Acme SAML\"` (both built from `name`), so several cards on one page stay distinct.",
      "The provider name is an `<h3>`. The status is a [`StatusBadge`](/docs/status-badge) that reads \"Configured\" or \"Not set\".",
    ],
  },

  "two-factor-setup": {
    faq: [
      {
        q: "How do I render the QR code?",
        a: "Build the `otpauth://totp/…` URI on the server and render it with [`QrCode`](/docs/qr-code): `qr={<QrCode value={otpauthUri} bare size={128} title=\"Authenticator setup code\" />}`. Pass `title`: otherwise the QR's accessible name is \"QR code for\" plus the full URI, secret included.",
      },
      {
        q: "Does TwoFactorSetup submit when the sixth digit is typed?",
        a: "No, unlike [`TwoFactorVerify`](/docs/two-factor-verify). The user presses Verify and enable, which stays disabled until all six digits are in.",
      },
      {
        q: "How do I show a wrong code?",
        a: "Set `invalid` after your server rejects the code: the slots turn red and shake. The digits stay so the user can fix them. Set `invalid` back to `false` before each check, because the shake only plays when it changes to `true`.",
      },
    ],
    keyboard: [{ keys: "Enter", action: "In the code field, submits once six digits are in. Before that the button is disabled and Enter does nothing." }],
    a11y: [
      "The code field is an [`OtpInput`](/docs/otp-input) named \"6-digit code from your authenticator app\", with `autoComplete=\"one-time-code\"`.",
      "The setup key is in a `<code>` with `select-all`, so one click or tap selects the whole key for copying.",
      "Without `qr`, a dashed box with the text \"QR code\" stands in.",
    ],
  },

  "two-factor-verify": {
    faq: [
      {
        q: "When is onVerify called?",
        a: "Once per code: when the sixth digit is typed, or on Verify or Enter if that has not already sent the same code. Pressing Verify again with an unchanged code does nothing; editing any digit allows the next call.",
      },
      {
        q: "How do I let the user retry after a wrong code?",
        a: "Set `invalid` to `true` when the check fails. The digits stay; once the user deletes one and types it again, `onVerify` fires again. Set `invalid` to `false` before each check so the next failure shakes too, or remount with `key={attempt}` to clear the field.",
      },
      {
        q: "Can it accept backup codes?",
        a: "No, it takes a 6-digit numeric code only. For recovery codes, show an [`OtpInput`](/docs/otp-input) with `length={8}` and `pattern=\"alphanumeric\"` or a plain input instead.",
      },
    ],
    keyboard: [{ keys: "Enter", action: "In the code field, submits once six digits are in." }],
    a11y: [
      "The [`OtpInput`](/docs/otp-input) is named \"6-digit code\" and gets `aria-invalid` while `invalid` is set.",
      "The field does not take focus on mount; users Tab to it. The card title is an `<h2>`, \"Two-factor authentication\".",
    ],
  },
}
