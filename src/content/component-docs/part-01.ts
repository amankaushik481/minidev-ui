import type { ComponentDocsContent } from "../types"

export const PART_01: Record<string, ComponentDocsContent> = {
  "agent-trace": {
    faq: [
      {
        q: "How do I show a tool call's arguments or output in the trace?",
        a: "Put them in the step's `detail` string. A step with `detail` becomes a disclosure button that folds the text out in a mono box with `whitespace-pre-wrap`, so `JSON.stringify(args, null, 2)` keeps its line breaks. A step without `detail` is a disabled, static row.",
      },
      {
        q: "How do I update AgentTrace live while the agent runs?",
        a: "Re-render with a new `steps` array on each event: the current step `status: \"running\"`, finished ones `\"done\"` with a `duration`. Keep each `id` stable, because it is the React key and tracks which step is open. The header dot pulses while any step runs and turns green when all are done.",
      },
      {
        q: "Can several steps be expanded at the same time?",
        a: "No. AgentTrace keeps one open step id in internal state, so opening a step closes the previous one, and there is no prop to control it. If each call needs its own open state, render a list of [`ToolCallCard`](/docs/tool-call-card)s.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves between steps that have `detail`. Steps without it are disabled buttons and are skipped." },
      { keys: "Enter / Space", action: "Expands or collapses the focused step's detail." },
    ],
    a11y: [
      "The steps are an `<ol>` named by `title` (default \"Agent run\"). The running step gets `aria-current=\"step\"`.",
      "Each row ends with visually hidden status text (\", done\", \", running\", \", failed\", \", pending\"), so screen readers hear the status with the step name instead of relying on the icon colour.",
      "A step with `detail` is a `<button>` with `aria-expanded` and `aria-controls`. Its closed panel is `inert`, so Tab and screen readers skip the hidden text.",
      "The rail, status icons and header dot are `aria-hidden`. The pulse, spinner and fold animations are cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },
  "ai-composer": {
    faq: [
      {
        q: "Does AiComposer clear the text after sending?",
        a: "Only when uncontrolled (`defaultValue`). When you pass `value` and `onChange`, clear your own state in `onSubmit`: `onSubmit={(text) => { send(text); setMsg(\"\") }}`. `onSubmit` receives the trimmed text.",
      },
      {
        q: "How do I wire the stop button to cancel a streaming reply?",
        a: "Set `streaming` while the reply streams. The send button becomes a \"Stop generating\" button that calls `onStop`, where you abort the request, for example with an `AbortController`. While `streaming` is true, Enter and the send button do not call `onSubmit`.",
      },
      {
        q: "How do I set which models the picker offers?",
        a: "Pass `models` as `{ id, label }[]`, and control the choice with `model` and `onModelChange`. Without `models` the picker lists the placeholders GPT, Claude and Gemini, so replace them with the models your backend serves. Without `model` it starts on the first entry.",
      },
      {
        q: "AiComposer or PromptInput?",
        a: "AiComposer adds suggestion chips, a [`ModelPicker`](/docs/model-picker) and a stop button, trims the text it submits, and has a fixed three-row text area. [`PromptInput`](/docs/prompt-input) grows with its content up to 240px, passes the text untrimmed, and takes a `toolbar` slot for your own controls.",
      },
    ],
    keyboard: [
      { keys: "Enter", action: "Sends the trimmed text when it is not blank and nothing is streaming. Ignored while an IME is composing, including Safari's late composition events (`keyCode` 229)." },
      { keys: "Shift+Enter", action: "Adds a new line." },
      { keys: "Tab", action: "Moves through the suggestion chips, the text area, the attach button (when `onAttach` is set), the model picker and the send or stop button, in that order." },
    ],
    a11y: [
      "The text area is named by `aria-label` from `label` (default \"Message\"), not by its placeholder.",
      "The icon buttons are named \"Attach a file\" (only rendered with `onAttach`), \"Send\" and \"Stop generating\". Send is `disabled` while the text is blank.",
      "The chips are a [`SuggestionChips`](/docs/suggestion-chips) `role=\"group\"` named \"Suggestions\". Picking one fills the text area and calls `onChange`; it does not send.",
      "Focus in the text area draws the accent border and a 3px `accent-soft` ring around the whole composer (`has-[textarea:focus]`).",
      "`disabled` disables the text area, the attach button and Send, but not the model picker or the stop button.",
    ],
  },
  "artifact-preview": {
    faq: [
      {
        q: "How do I add a copy button for the generated source?",
        a: "Pass `copyValue` with the text to copy. A [`CopyButton`](/docs/copy-button) appears in the title bar and reads \"Copied\" for 1.5s after a copy. Without `copyValue` there is no copy button.",
      },
      {
        q: "How do I open the artifact full screen?",
        a: "Pass `onExpand` and open a [`Dialog`](/docs/dialog) or side panel from it. ArtifactPreview has no expanded state of its own, and the expand button only renders when `onExpand` is set.",
      },
      {
        q: "Can it render a live React component, not just code?",
        a: "Yes. `children` is any React node, shown in a padded box under the title bar, so it can hold the generated component, a chart or an image. For source code with highlighting, put a [`CodeBlock`](/docs/code-block) inside.",
      },
    ],
    a11y: [
      "The root is a `<section>` with `aria-label` set to `title`, so each artifact is a named region screen reader users can jump to.",
      "The expand button's name includes the title, e.g. \"Expand pricing-table.tsx\".",
      "The copy button is named \"Copy\" on every artifact and \"Copied\" after a copy. The named region around it tells several artifacts apart.",
    ],
  },
  "attachment-chip": {
    faq: [
      {
        q: "How do I show upload progress or an error on an attachment?",
        a: "AttachmentChip has no progress or error state. `meta` takes any node, so you can pass the size, \"Uploading 40%\" or a short error. For picking files with per-file progress, retry and validation, use [`FileDropzone`](/docs/file-dropzone).",
      },
      {
        q: "What happens with a very long file name?",
        a: "The chip is capped at 224px (`max-w-56`) and the name truncates with an ellipsis, while `meta` keeps its full width. The full name stays available in the `title` tooltip and in the remove button's label.",
      },
      {
        q: "AttachmentChip or ContextPill?",
        a: "AttachmentChip is a square-cornered chip with a fixed paperclip icon and a `meta` slot for the file size. [`ContextPill`](/docs/context-pill) is a rounded pill that takes any `icon`, for pages, URLs and selections the model will see.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the remove button. The chip itself is not focusable." },
      { keys: "Enter / Space", action: "Calls `onRemove`." },
    ],
    a11y: [
      "The remove button is named from `name`, e.g. \"Remove INV-2041.pdf\", so several chips are told apart.",
      "The remove button is 20px, and an `after:-inset-2` pseudo-element extends its hit area by 8px on each side.",
      "The paperclip and X icons are `aria-hidden`. The chip is a plain `<span>` with no role, so screen readers read the name and `meta` as text.",
    ],
  },
  "chat-page": {
    faq: [
      {
        q: "How do I connect ChatPage to my AI backend?",
        a: "ChatPage appends the user's message to its own state and calls `onSend` with the trimmed text. It never adds a reply. In your copy of the block, add the assistant message with `setMessages` when your model answers, or move `messages` into your own state.",
      },
      {
        q: "Why does it start with a conversation about refunds?",
        a: "The initial messages are a hard-coded `SAMPLE` array in the file. Replace it with your stored history, or with `[]` to show the [`ChatThread`](/docs/chat-thread) default \"No messages yet\".",
      },
      {
        q: "How do I make it fill the screen?",
        a: "It defaults to `h-[520px]`. Override it with `className`, e.g. `className=\"h-dvh rounded-none border-0\"`. The transcript takes the remaining height (`flex-1 min-h-0`) and scrolls, while the header and composer stay put.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the transcript, then the message field, the attach button and Send." },
      { keys: "ArrowDown / ArrowUp", action: "Scrolls the transcript while it has focus." },
      { keys: "Enter", action: "In the message field, sends the message." },
      { keys: "Shift+Enter", action: "In the message field, adds a new line." },
    ],
    a11y: [
      "The transcript is a `role=\"log\"` named \"Conversation with Lumen\", so screen readers announce new messages politely.",
      "The message field is named \"Message Lumen\" by `aria-label`. Rename both labels when you rename the assistant.",
      "The transcript has `tabIndex={0}`, so keyboard users can focus and scroll it.",
    ],
  },
  "chat-thread": {
    faq: [
      {
        q: "How do I render markdown or code inside a message?",
        a: "`content` is a React node, so pass a component: `content: <MarkdownRenderer content={text} />` with [`MarkdownRenderer`](/docs/markdown-renderer) or your own parser. While the reply streams, set `streaming: true` on that message to show the caret.",
      },
      {
        q: "Why doesn't ChatThread scroll to the newest message?",
        a: "Two reasons. It needs a fixed height, e.g. `className=\"h-96\"`, or it grows instead of scrolling. And it only follows new messages while the reader is within 48px of the bottom, so someone who scrolled up to read is not pulled down.",
      },
      {
        q: "Does the message id matter?",
        a: "Yes. `id` is the React key. Keep it the same while a reply streams and its `content` grows; a new id remounts the bubble and replays its rise-in animation.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the transcript (`tabIndex={0}`), then any links or buttons inside messages." },
      { keys: "ArrowDown / ArrowUp / PageDown / PageUp", action: "Scrolls the focused transcript (browser default)." },
    ],
    a11y: [
      "The container is a `role=\"log\"` with `aria-label` from `label` (default \"Conversation\"). A log is a polite live region, so new messages are announced without interrupting.",
      "A message with `streaming: true` is `aria-busy` until it finishes, and its caret is `aria-hidden`.",
      "Each bubble's rise-in animation is cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },
  "citation-chip": {
    faq: [
      {
        q: "When is CitationChip a link and when a button?",
        a: "With `href` it renders `<a target=\"_blank\" rel=\"noreferrer\">`. Without it, a `<button type=\"button\">`. Other props such as `onClick`, `aria-label` and `id` reach either element, so you can track clicks on a link chip with `onClick`.",
      },
      {
        q: "How do I open a source preview from a citation?",
        a: "Use the button version as a popover trigger: `<PopoverTrigger render={<CitationChip index={1}>Billing terms</CitationChip>} />`, with a [`SourceCard`](/docs/source-card) in the [`Popover`](/docs/popover) content. Or open a side panel from `onClick`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the chip." },
      { keys: "Enter", action: "Follows the link in a new tab, or activates the button." },
      { keys: "Space", action: "Activates the button version." },
    ],
    a11y: [
      "It is a native `<button>` or `<a>`, so it is focusable and announced with the right role. The index is part of the accessible name.",
      "Both versions accept `aria-label`, e.g. `aria-label=\"Source 1: Billing terms\"`, when the visible text alone is unclear.",
      "The link version opens a new tab without saying so. Add `<span className=\"sr-only\">(opens in a new tab)</span>` to `children` if that matters for your users.",
    ],
  },
  "context-chip": {
    faq: [
      {
        q: "Why isn't ContextChip announced as a toggle?",
        a: "It sets `aria-pressed` only when `active` is defined. Pass `active={false}` for the off state, not `undefined`, so screen readers hear \"not pressed\". Without `active` it is a plain button.",
      },
      {
        q: "ContextChip, ContextPill or SuggestionChips?",
        a: "ContextChip switches a context source on and off and stays in place. [`ContextPill`](/docs/context-pill) names an item already attached, with a remove button. [`SuggestionChips`](/docs/suggestion-chips) send or fill a prompt once.",
      },
    ],
    a11y: [
      "A native `<button type=\"button\">` with `aria-pressed={active}`. It also sets `data-active` while on, for styling.",
      "The on state changes the fill to `accent-soft`, the border to `accent-line` and the text to `fg`, so it does not rely on one colour change.",
    ],
  },
  "context-pill": {
    faq: [
      {
        q: "What is the remove button called when the pill holds JSX?",
        a: "When `children` is a plain string the button is named \"Remove \" plus that string. For anything else it is just \"Remove\", so pass `removeLabel`, e.g. `removeLabel=\"Remove Q3 report\"`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the remove button when `onRemove` is set. The pill itself is not focusable." },
      { keys: "Enter / Space", action: "Calls `onRemove`." },
    ],
    a11y: [
      "The remove button's name is `removeLabel`, else \"Remove \" plus the text for string children, else just \"Remove\".",
      "The icon slot is `aria-hidden` and sizes any SVG to 12px.",
      "The 20px remove button has an `after:-inset-2` hit area that adds 8px on each side.",
    ],
  },
  "conversation-sidebar": {
    faq: [
      {
        q: "Why does ConversationSidebar show threads I didn't pass?",
        a: "Without `items` it renders six sample Lumen threads timed relative to now. Pass your own `items` (`{ id, title, updatedAt }[]`, newest first); an empty array renders an empty list with no message. `defaultActiveId` defaults to `\"c1\"`, so also pass `activeId` or your own `defaultActiveId`.",
      },
      {
        q: "How do I sync the active thread with the URL?",
        a: "Pass `activeId` from your route, e.g. the `[id]` segment, and navigate in `onSelect` with `router.push`. Items are buttons, not links. With `activeId` set, a click does not move the highlight until you pass the new id.",
      },
      {
        q: "What format does `updatedAt` take?",
        a: "A `Date` or a date string. It renders through [`RelativeTime`](/docs/relative-time) as \"3h ago\", with the full local date in a hover tooltip.",
      },
    ],
    a11y: [
      "The root is a `<nav>` landmark named by `label` (default \"Conversations\").",
      "The active thread's button has `aria-current=\"page\"`.",
      "Each time is a `<time>` with an ISO `dateTime`. Long titles are cut with CSS `truncate`, so screen readers still read the full title.",
    ],
  },
  "feedback-thumbs": {
    faq: [
      {
        q: "How does a user take back a vote?",
        a: "By pressing the active thumb again. The value goes back to `null` and `onChange(null)` fires, so record it as a removed vote rather than ignoring it.",
      },
      {
        q: "How do I save the vote and show it again later?",
        a: "Send it from `onChange`, which receives `\"up\"`, `\"down\"` or `null`. To show a saved vote, pass it as `defaultValue`, or as `value` if your own state owns it.",
      },
      {
        q: "FeedbackThumbs or MessageActions?",
        a: "FeedbackThumbs keeps the vote itself and toggles it off on a second press. [`MessageActions`](/docs/message-actions) adds copy and retry, but its thumbs only call `onGood` and `onBad` and show the `feedback` you pass back.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to each thumb." },
      { keys: "Enter / Space", action: "Votes, or clears the vote when that thumb is already pressed." },
    ],
    a11y: [
      "The pair is a `role=\"group\"` named \"Was this helpful?\". The name is fixed in the file; change it there for other wording or languages.",
      "The buttons are named \"Helpful\" and \"Not helpful\" and carry `aria-pressed`.",
      "The pressed thumb changes its fill as well as its colour: `accent-soft` for up, a `danger` tint for down.",
    ],
  },
  "markdown-renderer": {
    faq: [
      {
        q: "Which markdown does MarkdownRenderer support?",
        a: "Only paragraphs, split on blank lines, and fenced code blocks. Lists, headings, links, bold and tables show as plain text, single line breaks inside a paragraph collapse to spaces, and the fence's language name is dropped. For full markdown use a parser such as `react-markdown`.",
      },
      {
        q: "Is it safe to render AI output with it?",
        a: "Yes. It never uses `dangerouslySetInnerHTML`, so HTML in the string is shown as text, not run.",
      },
      {
        q: "Can I stream a reply into it?",
        a: "Yes. Pass the partial string as `content` on each update. A code fence that has opened but not closed yet already renders as a code block, so code does not flash as paragraph text.",
      },
      {
        q: "Why does it show a webhook note when I pass nothing?",
        a: "`content` defaults to a sample note. Pass `content=\"\"` while you wait for text, not `undefined`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to each code block (`tabIndex={0}`)." },
      { keys: "ArrowLeft / ArrowRight", action: "Scrolls a focused code block that is wider than the column." },
    ],
    a11y: [
      "Each `<pre>` has `tabIndex={0}` and a focus ring, so keyboard users can reach and scroll wide code.",
      "Output is only `<p>` and `<pre><code>`, so it adds no headings or landmarks to the page outline.",
    ],
  },
  "message-actions": {
    faq: [
      {
        q: "Does the Copy button copy the message?",
        a: "No. MessageActions holds no state and copies nothing: each button only calls its handler. Copy in `onCopy`, e.g. `navigator.clipboard.writeText(reply)`, and confirm with a toast. For a button that copies and confirms itself, use [`CopyButton`](/docs/copy-button).",
      },
      {
        q: "How do I show which thumb was picked?",
        a: "Store the vote and pass it back as `feedback` (`\"good\"`, `\"bad\"` or `null`). Pressing a thumb only calls `onGood` or `onBad`. To let a second press clear the vote, set `feedback` to `null` in that handler when it already matches.",
      },
      {
        q: "Can I hide buttons I don't need?",
        a: "Leave out their handlers. Each button renders only when its handler is set: `<MessageActions onCopy={copy} />` shows Copy alone. The thumbs also render when `feedback` is set, to show a stored vote. With no handlers and no `feedback` the row renders nothing. For votes alone you can also use [`FeedbackThumbs`](/docs/feedback-thumbs).",
      },
    ],
    a11y: [
      "The row is a `role=\"group\"` named \"Message actions\".",
      "The icon buttons are named \"Copy\", \"Retry\", \"Good response\" and \"Bad response\". Buttons without a handler are not rendered, so there are no dead controls in the tab order.",
      "The thumbs carry `aria-pressed` from `feedback`. On screen the pressed thumb only turns from muted to `text-fg`, so the state is clearer to screen readers than by sight; add a fill in the file if that matters.",
    ],
  },
  "message-bubble": {
    faq: [
      {
        q: "How does `role` change the layout?",
        a: "`\"user\"` sits on the right in a sunken capsule up to 85% wide. `\"assistant\"`, the default, is plain left-aligned prose up to 92% wide. `\"system\"` is a full-width centred note between dashed rules, for dates or \"Model switched\".",
      },
      {
        q: "How do I show a reply while it streams?",
        a: "Set `streaming` while tokens arrive. It appends a [`StreamingCursor`](/docs/streaming-cursor) after the children and sets `aria-busy`. Set it to `false` when the stream ends.",
      },
      {
        q: "Where do avatars, names and timestamps go?",
        a: "MessageBubble has no slots for them. Put an [`Avatar`](/docs/avatar), the time and a [`ReadReceipt`](/docs/read-receipt) beside it in your own row.",
      },
    ],
    a11y: [
      "The speaker is shown only by position and style. If the transcript must read clearly aloud, add a visually hidden name in `children`, e.g. `<span className=\"sr-only\">You: </span>`.",
      "`aria-busy` is set while `streaming`, and the caret is `aria-hidden`.",
      "The 220ms rise-in animation is cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },
  "model-compare": {
    faq: [
      {
        q: "Can I sort ModelCompare or add columns?",
        a: "No. The Model, Latency, Cost and Quality columns are fixed and rows render in the order of `rows`. Without `rows` it shows four sample models. For sortable or custom columns use [`DataTable`](/docs/data-table).",
      },
      {
        q: "How is latency coloured?",
        a: "Each `latencyMs` goes to [`LatencyBadge`](/docs/latency-badge) with its default thresholds: under 100ms is success, under 400ms is warning, slower is danger. To change them, pass `thresholds` to the LatencyBadge in the file.",
      },
    ],
    a11y: [
      "The div grid has ARIA table roles: `role=\"table\"` named \"Model comparison\", `row`, `columnheader`, a `rowheader` for each model name and `cell`, so screen readers can move by cell.",
      "Latency is printed in milliseconds inside the badge, so the colour is not the only signal.",
      "Latency and cost use `tabular-nums`, so digits line up down the column.",
    ],
  },
  "model-picker": {
    faq: [
      {
        q: "How do I start with no model selected?",
        a: "Pass `defaultValue={null}`. The trigger then shows `placeholder` (default \"Select model\"). Otherwise it starts on the first model in `models`.",
      },
      {
        q: "Is the chosen model sent with a form?",
        a: "Yes, when you pass `name`. The Base UI Select then renders a hidden input with that name, so the chosen id is in FormData: `<ModelPicker name=\"model\" />`. Without `name` nothing is submitted; keep the id from `onChange` in state instead.",
      },
      {
        q: "Can the list show price or speed next to each model?",
        a: "No. Options are `{ id, label }` and render as text. Build your own on [`Select`](/docs/select) with richer `SelectItem` content, or show a [`ModelCompare`](/docs/model-compare) table beside the picker.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space / ArrowDown / ArrowUp", action: "On the trigger, opens the list with the current model highlighted." },
      { keys: "ArrowDown / ArrowUp", action: "In the open list, moves the highlight." },
      { keys: "Enter", action: "Picks the highlighted model and closes the list." },
      { keys: "Escape", action: "Closes the list without changing the model." },
      { keys: "A-Z", action: "On the closed trigger, picks the next model whose name starts with the typed letters. In the open list, moves the highlight to it." },
    ],
    a11y: [
      "The trigger has `role=\"combobox\"` and is named by `aria-label` (default \"Model\").",
      "The open list is a Base UI listbox; the current model has `aria-selected` and a check mark.",
      "Focus returns to the trigger when the list closes.",
    ],
  },
  "pinned-message": {
    faq: [
      {
        q: "Why does PinnedMessage show sample text?",
        a: "`author` defaults to \"Ops\" and `body` to a placeholder note about `/showcase`. Always pass both.",
      },
      {
        q: "How do I unpin it?",
        a: "Pass `onUnpin`; an \"Unpin\" button appears on the right. The component has no dismissed state, so stop rendering it, or clear the pin in your data, in that handler.",
      },
    ],
    a11y: [
      "It has no role or landmark. The visible \"Pinned · author\" line is read before the body, and the pin icon is `aria-hidden`.",
      "The button is named \"Unpin\" with no context. If a screen shows several pinned messages, add an `aria-label` that names the author in your copy.",
    ],
  },
  "prompt-input": {
    faq: [
      {
        q: "Does `onSubmit` receive trimmed text?",
        a: "No. It gets the text as typed, including leading and trailing spaces and new lines, and is only called when `text.trim()` is not empty. Trim it yourself if your API needs that. Uncontrolled, the field clears after `onSubmit`; controlled, clear your own state.",
      },
      {
        q: "How do I add a model picker or other buttons to the bottom bar?",
        a: "Pass them as `toolbar`. They render on the left, after the paperclip if there is one, e.g. `toolbar={<ModelPicker className=\"h-8 w-40\" />}` with [`ModelPicker`](/docs/model-picker).",
      },
      {
        q: "How do I hide the attach button?",
        a: "Leave out `onAttach`. The paperclip renders only when `onAttach` is set, so a chat that takes no files shows just the text area and Send.",
      },
      {
        q: "How do I show a stop button while the reply streams?",
        a: "PromptInput has no streaming state. Show a [`StopGenerating`](/docs/stop-generating) next to it while streaming, or use [`AiComposer`](/docs/ai-composer), which swaps Send for Stop through its `streaming` prop.",
      },
    ],
    keyboard: [
      { keys: "Enter", action: "Sends the text when it is not blank. Ignored while an IME is composing, including Safari's late composition events (`keyCode` 229)." },
      { keys: "Shift+Enter", action: "Adds a new line." },
      { keys: "Tab", action: "Moves from the text area to the attach button (when `onAttach` is set), any `toolbar` controls, then Send." },
    ],
    a11y: [
      "The text area is named by `aria-label` (default \"Prompt\") and sets `enterKeyHint=\"send\"`, so phone keyboards show a Send key.",
      "The buttons are named \"Attach file\" (only rendered with `onAttach`) and \"Send\". Send is `disabled` while the text is blank.",
      "Focus anywhere inside draws the accent border and a 3px `accent-soft` halo on the whole shell (`focus-within`).",
    ],
  },
  "prompt-input-attachments": {
    faq: [
      {
        q: "When should I use this instead of PromptInput's paperclip?",
        a: "Use PromptInputAttachments when files matter enough for their own row with a `hint` such as \"PDF or CSV, up to 10 MB\". `onAttach` goes only to that top button; the inner PromptInput shows no paperclip. For a small paperclip in the bottom bar, pass `onAttach` to [`PromptInput`](/docs/prompt-input) instead.",
      },
      {
        q: "How do I list the files that were attached?",
        a: "The component keeps no file list. Render [`AttachmentChip`](/docs/attachment-chip)s with `onRemove` from your own state, above the component or in the `hint` slot.",
      },
      {
        q: "Is it PromptInputAttachments or PromptInputWithAttachments?",
        a: "Both names are exported and point to the same component. It takes every [`PromptInput`](/docs/prompt-input) prop plus `hint`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the top attach button, the text area, any `toolbar` controls, then Send." },
      { keys: "Enter", action: "In the text area, sends the text when it is not blank." },
      { keys: "Shift+Enter", action: "In the text area, adds a new line." },
    ],
    a11y: [
      "There is one attach button, named \"Attach file\"; the inner PromptInput shows no paperclip.",
      "`hint` is linked to the attach button with `aria-describedby`, so screen readers read it when the button gets focus.",
      "`disabled` disables the top attach button as well as the input.",
    ],
  },
  "prompt-library": {
    faq: [
      {
        q: "What does the PromptLibrary search match?",
        a: "A case-insensitive substring of the title, body and tag joined together, so \"close\" finds a prompt tagged \"Close\". The query is internal state and filters `prompts` in the browser; for server-side search, build the list on [`SearchInput`](/docs/search-input) yourself.",
      },
      {
        q: "How do I put the chosen prompt into the chat input?",
        a: "`onSelect` receives the whole prompt object. Set your composer's value from it: `onSelect={(p) => setDraft(p.body)}` with a controlled [`PromptInput`](/docs/prompt-input).",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves from the search field to each prompt card." },
      { keys: "Escape", action: "In the search field, clears the query." },
      { keys: "Enter / Space", action: "On a card, calls `onSelect` with that prompt." },
    ],
    a11y: [
      "The search field is named \"Search prompts\". While a query is typed, a polite live region announces the count, e.g. \"3 prompts found\".",
      "Each card is one `<button>`. The preview is clamped to two lines on screen, but the full body stays in the DOM and is read as part of the name.",
      "With no matches it shows \"No prompts match\" with the query, instead of an empty list.",
    ],
  },
  "read-receipt": {
    faq: [
      {
        q: "How do I translate the receipt labels?",
        a: "Pass `label`. Without it the accessible name is \"Sent\", \"Delivered\" or \"Read\" from `status`.",
      },
    ],
    a11y: [
      "It is a `role=\"img\"` with `aria-label`, so it is announced instead of being silent. The tick icon inside is `aria-hidden`.",
      "Delivered and read both show two ticks and differ only by colour (muted vs accent). The label carries that difference for screen readers; if sighted users need it too, show the word next to it.",
    ],
  },
  "reasoning-block": {
    faq: [
      {
        q: "How do I show \"Thought for 4s\" when reasoning ends?",
        a: "Set `active` while the model thinks: the title reads \"Thinking…\" with a shimmer. When it ends, set `active={false}` and pass `duration=\"4s\"`. The component has no timer, so measure the time yourself.",
      },
      {
        q: "Can it open while the model thinks and fold when it's done?",
        a: "Yes, with `open` and `onOpenChange` from your own state: set it to `true` when reasoning starts and `false` when the answer begins, and update it in `onOpenChange` so the user can still toggle it. Uncontrolled, it starts closed unless `defaultOpen` is set.",
      },
      {
        q: "ReasoningBlock or ThinkingBlock?",
        a: "ReasoningBlock is borderless with a left rule, shimmers while `active` and animates its fold; closed content stays mounted but `inert`. [`ThinkingBlock`](/docs/thinking-block) is a bordered box with a free-form `label`, and removes closed content with `hidden`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the header button. Links or buttons inside the reasoning are reachable only while it is open." },
      { keys: "Enter / Space", action: "Opens or closes the reasoning." },
    ],
    a11y: [
      "The header is a `<button>` with `aria-expanded` and `aria-controls` pointing at the panel.",
      "The closed panel is `inert`, so Tab and screen readers skip it.",
      "The shimmer and the fold are CSS animations, cut to 0.01ms under `prefers-reduced-motion: reduce`. The label still changes to \"Thinking…\" while `active`.",
    ],
  },
  "regenerate-bar": {
    faq: [
      {
        q: "How do I show that a new answer is generating?",
        a: "Set `pending`. Regenerate is disabled, gets `aria-busy` and its icon spins. Set it back to `false` when the stream ends.",
      },
      {
        q: "How do I let people edit the prompt before retrying?",
        a: "Pass `onEdit`. An \"Edit prompt\" ghost button appears before Regenerate; open your composer with the last prompt from there.",
      },
    ],
    a11y: [
      "Regenerate gets `disabled` and `aria-busy` while `pending`. Its refresh icon is `aria-hidden`, so the name is the visible word.",
      "Regenerate uses the native `disabled` attribute while `pending`, so a keyboard user who pressed it loses focus. Move focus to the new answer or the composer when you set `pending`.",
      "The spinning icon is a CSS animation, which stops under `prefers-reduced-motion: reduce`.",
    ],
  },
  "source-card": {
    faq: [
      {
        q: "How do I make the source title clickable?",
        a: "Pass `href`. The title becomes a link that opens in a new tab (`target=\"_blank\" rel=\"noreferrer\"`). `url` is display text only, shown in mono under the title.",
      },
      {
        q: "Why does SourceCard show DESIGN.md?",
        a: "Every prop has a sample default, including `badge=\"source\"`. Pass your own `title`, `url` and `snippet`, and `badge={null}` to hide the badge.",
      },
    ],
    a11y: [
      "The card is an `<article>` with the title in an `<h3>`. The level is fixed in the file; change it to fit your page outline.",
      "The URL line truncates with CSS only, so screen readers read it in full.",
      "The title link opens a new tab without announcing it.",
    ],
  },
  "stop-generating": {
    faq: [
      {
        q: "How do I actually cancel the request?",
        a: "Create an `AbortController` per request, pass its `signal` to `fetch`, and call `controller.abort()` in `onClick`. With the AI SDK's `useChat`, pass its `stop` function.",
      },
      {
        q: "Does it hide itself when the stream ends?",
        a: "No, it has no streaming state. Render it conditionally: `{isStreaming ? <StopGenerating onClick={stop} /> : null}`.",
      },
    ],
    a11y: [
      "The visible `label` (default \"Stop generating\") is the button's name. The square icon is `aria-hidden`.",
      "When you unmount it after stopping, focus on it is lost. Move focus back to the composer in `onClick`.",
    ],
  },
  "streaming-cursor": {
    faq: [
      {
        q: "Do I need StreamingCursor with MessageBubble?",
        a: "No. `streaming` on [`MessageBubble`](/docs/message-bubble) and [`StreamingMessage`](/docs/streaming-message) already renders it. Use it alone after your own streamed text.",
      },
      {
        q: "Why doesn't the caret blink?",
        a: "The blink uses the `caret-blink` keyframes from the kit stylesheet (`minidev.css`), so the caret is static without that file. Under `prefers-reduced-motion: reduce` it is a steady bar on purpose.",
      },
    ],
    a11y: [
      "It is `aria-hidden`, so it tells screen readers nothing. Mark the streaming text `aria-busy` as MessageBubble does.",
      "The blink is a `steps(1)` opacity animation with no movement, and it stops under `prefers-reduced-motion: reduce`.",
    ],
  },
  "streaming-message": {
    faq: [
      {
        q: "Why does the caret keep blinking after the reply finished?",
        a: "`streaming` defaults to `true`. Pass `streaming={false}` when the stream ends; that also clears `aria-busy`.",
      },
      {
        q: "StreamingMessage or MessageBubble?",
        a: "StreamingMessage is a standalone bordered box with its own `aria-live` region. Inside a [`ChatThread`](/docs/chat-thread), use [`MessageBubble`](/docs/message-bubble) with `streaming` instead: the thread is already a `role=\"log\"` live region, so a second one inside it is redundant.",
      },
    ],
    a11y: [
      "It is `aria-live=\"polite\"` and `aria-busy` while streaming, which tells screen readers to wait for the finished text instead of reading each token.",
      "The caret is `aria-hidden`. `data-streaming` is set while streaming, for styling.",
    ],
  },
  "suggestion-chips": {
    faq: [
      {
        q: "Should a suggestion chip send right away or fill the input?",
        a: "Your choice: `onSelect` gets the chip text. Call your send function to submit at once, or set the composer's value so people can edit first, which is what [`AiComposer`](/docs/ai-composer) does. To hide the chips after the first message, stop rendering them.",
      },
      {
        q: "Can a chip show a short label but send a longer prompt?",
        a: "Not directly: `items` are strings and the chip text is what `onSelect` receives. Map it in the handler, e.g. `onSelect={(label) => send(PROMPTS[label])}`.",
      },
    ],
    a11y: [
      "The chips are native buttons in a `role=\"group\"` named by `label` (default \"Suggestions\").",
      "Each chip's text is its accessible name, so keep the texts distinct.",
    ],
  },
  "thinking-block": {
    faq: [
      {
        q: "How do I change the header while the model is thinking?",
        a: "`label` takes any node: pass \"Thinking…\" while streaming and \"Thought for 4s\" when done. It defaults to \"Thinking\".",
      },
      {
        q: "Can find in page search the hidden reasoning?",
        a: "No. The closed panel has the `hidden` attribute, so Ctrl+F and screen readers skip it until it is opened. Control it with `open` and `onOpenChange`, or start open with `defaultOpen`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the header button." },
      { keys: "Enter / Space", action: "Opens or closes the reasoning." },
    ],
    a11y: [
      "The header is a `<button>` with `aria-expanded` and `aria-controls`. The root also has `data-state=\"open\"` or `\"closed\"`.",
      "The closed panel is `hidden`, so it is out of the accessibility tree. The chevron is `aria-hidden`.",
    ],
  },
  "token-usage-meter": {
    faq: [
      {
        q: "What happens when usage goes over the limit?",
        a: "The bar and the percentage stop at 100%, while the mono line still shows the real numbers, e.g. \"230,000 / 200,000\". A `limit` of 0 shows 0%. There is no over-limit colour.",
      },
      {
        q: "Why are the numbers always formatted with commas?",
        a: "It uses a fixed `Intl.NumberFormat(\"en-US\")` so the server and the browser render the same digits. Change the locale in your copy of the file if you need another format.",
      },
    ],
    a11y: [
      "The bar is a Base UI [`Progress`](/docs/progress) (`role=\"progressbar\"`) named by the heading through `aria-labelledby`.",
      "Its `aria-valuetext` reads the full sentence, e.g. \"128,400 of 200,000 tokens, 64%\", not just the percentage.",
      "Numbers use `tabular-nums`, so they do not jitter as usage updates.",
    ],
  },
  "tool-call-card": {
    faq: [
      {
        q: "Why is the output open by default?",
        a: "`defaultOpen` is `true`. Pass `defaultOpen={false}` to start folded, or control it with `open` and `onOpenChange`. [`ToolCallCollapsed`](/docs/tool-call-collapsed) starts closed.",
      },
      {
        q: "How do I show JSON or multi-line output?",
        a: "Pass it as text: the output box uses `white-space: pre-wrap`, so `{JSON.stringify(result, null, 2)}` keeps its line breaks and indents, and long lines wrap. For highlighted JSON use [`ToolResultPanel`](/docs/tool-result-panel).",
      },
      {
        q: "How do I show a failed call?",
        a: "Set `status=\"error\"` for a red \"Failed\" pill with an X, and put the error message in `children`. `status=\"running\"` shows a spinner and hides `duration`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the header when the card has output. Without `children` the header is a disabled button and is skipped." },
      { keys: "Enter / Space", action: "Opens or closes the output." },
    ],
    a11y: [
      "The header is a `<button>` with `aria-expanded` and `aria-controls` when there is output.",
      "Status is a text pill (\"Running\", \"Done\", \"Failed\") with an icon, not colour alone.",
      "The closed output is `inert`, so Tab and screen readers skip it. The spinner and fold are cut under `prefers-reduced-motion: reduce`.",
    ],
  },
  "tool-call-collapsed": {
    faq: [
      {
        q: "Can I control whether ToolCallCollapsed is open?",
        a: "No. It only takes `defaultOpen` and keeps its state inside. Use [`ToolCallCard`](/docs/tool-call-card) for `open` and `onOpenChange`, status and duration.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the header when it has `children`." },
      { keys: "Enter / Space", action: "Opens or closes the details." },
    ],
    a11y: [
      "The header is a `<button>` with `aria-expanded` and `aria-controls`. Without `children` it is disabled and its chevron is invisible.",
      "The closed details use the `hidden` attribute, so they are out of the accessibility tree and find in page.",
    ],
  },
  "tool-result-panel": {
    faq: [
      {
        q: "Do I need to stringify the output first?",
        a: "No. Objects and arrays are printed with `JSON.stringify(output, null, 2)`, and a string is shown as is, so preformatted JSON keeps its layout. Without `output` it shows a sample invoice lookup.",
      },
      {
        q: "What does each status look like?",
        a: "`\"success\"` (default) is a green \"Success\" badge, `\"error\"` a red \"Error\" badge and `\"running\"` an accent \"Running\" badge. The output still renders while running, so pass a placeholder such as `\"Waiting for result…\"`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the code's copy button, then the code area, which scrolls with the arrow keys." },
      { keys: "Enter / Space", action: "On the copy button, copies the output." },
    ],
    a11y: [
      "The status is a text badge, not colour alone.",
      "The output is a [`CodeBlock`](/docs/code-block): its copy button is named \"Copy code\", and the code area is focusable with the name \"json code\".",
    ],
  },
  "typing-indicator": {
    faq: [
      {
        q: "How do I say who is typing?",
        a: "Pass `label`, e.g. `label=\"Maya is typing\"`. It is screen reader text only; the dots are all a sighted user sees, so show a name next to it if needed.",
      },
    ],
    a11y: [
      "The pill is `role=\"status\"`, a polite live region, with `label` in a visually hidden span. The three dots are `aria-hidden`.",
      "Some screen readers stay silent when a live region mounts with its text already inside. If the announcement matters, also write the text into a `role=\"status\"` element that is always mounted.",
      "The pulse is a CSS animation; under `prefers-reduced-motion: reduce` it stops and the dots stay still.",
    ],
  },
  "email-button": {
    faq: [
      {
        q: "What does EmailButton link to by default?",
        a: "`href` defaults to `\"#\"`. Always pass an absolute URL, such as `https://app.example.com/invoices/2041`, because relative links have nothing to resolve against in a mail client.",
      },
    ],
    a11y: [
      "It is an `<a>`, so its visible text is the link name. Write text that says where it goes (\"View invoice INV-2041\"), not \"Click here\".",
    ],
  },
  "email-card": {
    faq: [
      {
        q: "Why does EmailCard have side margins?",
        a: "It has `mx-6 my-4` built in, so it lines up with the 24px padding of [`EmailHeader`](/docs/email-header) and [`EmailFooter`](/docs/email-footer). Put it directly inside `EmailLayout`, not inside another padded block, or pass `className=\"mx-0\"`.",
      },
    ],
    a11y: ["The optional `title` renders as an `<h3>`. Change the level in the file if the email has no `<h2>` above it."],
  },
  "email-footer": {
    faq: [
      {
        q: "What should go in the email footer?",
        a: "Commercial email sent in the US must include a valid postal address and a way to opt out (CAN-SPAM), so pass your real `address` and `unsubscribeHref`. Both links and the address have placeholder defaults (`\"#\"` and \"MiniDev · San Francisco\").",
      },
    ],
    a11y: [
      "The links are the kit's [`Link`](/docs/link) with visible text \"Unsubscribe\" and \"Preferences\", so their names are clear out of context.",
    ],
  },
  "email-header": {
    faq: [
      {
        q: "How do I put a logo in the email header?",
        a: "Pass it as `children`, which replaces the brand text: `<EmailHeader><img src=\"https://example.com/logo.png\" alt=\"Lumen\" width={96} height={24} /></EmailHeader>`. Use an absolute URL and a fixed size, since mail clients may block or not scale images.",
      },
    ],
    a11y: [
      "The brand text is a `<p>`, not a heading. A logo image needs `alt` with the brand name, which is what a reader hears when images are blocked.",
    ],
  },
  "email-layout": {
    faq: [
      {
        q: "Can I send these email components as real email?",
        a: "Not as they are. They are styled with Tailwind classes and the kit's CSS variables, which a mail client does not load. Use them to preview a template in your app; for sending, render the same structure with inline styles and fixed colour values.",
      },
      {
        q: "How wide is the email?",
        a: "At most 560px (`max-w-[560px]`), centred, and full width below that. Header, cards and footer use 24px side padding to line up.",
      },
    ],
    a11y: [
      "It is a plain `<div>` shell with no role. Give the email one `<h1>` or `<h2>` inside it so the content has a heading, as [`EmailReceipt`](/docs/email-receipt) does.",
    ],
  },
  "email-preview-frame": {
    faq: [
      {
        q: "Does EmailPreviewFrame render the email in an iframe?",
        a: "No. `children` render in the page and inherit your app's styles; the frame only draws an inbox-style header with `from` and `subject`. To check how a real client renders an email, send a test message.",
      },
      {
        q: "Why does the preview say it is from hello@minidev.pro?",
        a: "That is the default `from`. Pass your own sender address so the preview matches the real email.",
      },
    ],
    a11y: [
      "The subject is preceded by visually hidden \"Subject: \" text, so screen readers hear what the line is. The sender line has a visible \"From\".",
    ],
  },
  "email-receipt": {
    faq: [
      {
        q: "How do I pass amounts to EmailReceipt?",
        a: "In major units: `49` means $49.00. If your API stores cents, divide by 100. The total is the sum of `items`, formatted with `Intl.NumberFormat` for `currency` and `locale`, and the subject reads \"Receipt for\", the first item's label, a dash and the total.",
      },
      {
        q: "How do I change the heading, message or footer?",
        a: "Only `brand`, `items`, `currency` and `locale` are props. \"Payment received\", \"Thanks for upgrading\", the sender and the footer links are fixed in the file, so edit your copy, or compose your own from [`EmailLayout`](/docs/email-layout) and its parts.",
      },
    ],
    a11y: [
      "The heading is an `<h1>`. That suits a sent email, but inside an app page it adds a second `<h1>`; change it to `<h2>` there.",
      "Amounts use `tabular-nums`, so the totals column lines up. Line items are rows of `<div>`s, not a table.",
    ],
  },
  "email-welcome": {
    faq: [
      {
        q: "How do I customise EmailWelcome?",
        a: "It takes only `className`. The brand, subject, copy, sender and the button's `href` (`\"#\"`) are fixed in the file, so edit your copy, or build your own from [`EmailHeader`](/docs/email-header), [`EmailCard`](/docs/email-card), [`EmailButton`](/docs/email-button) and [`EmailFooter`](/docs/email-footer).",
      },
    ],
    a11y: [
      "The heading is an `<h1>`, which adds a second `<h1>` when the preview sits inside an app page; change it to `<h2>` there.",
      "The \"Quick start\" [`EmailCard`](/docs/email-card) title is an `<h3>` right after the `<h1>`, so the outline skips a level. Change one of them in your copy.",
    ],
  },
}
