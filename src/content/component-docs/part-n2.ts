import type { ComponentDocsContent } from "../types"

export const PART_N2: Record<string, ComponentDocsContent> = {
  "agent-plan": {
    faq: [
      {
        q: "How do I show a Claude Code or Codex todo list with AgentPlan?",
        a: "Map each todo to a task. Claude Code's `TodoWrite` and Codex's `update_plan` use `pending`, `in_progress` and `completed`, the same strings as `status`: `todos.map((t, i) => ({ id: String(i), title: t.status === \"in_progress\" ? t.activeForm : t.content, status: t.status }))`. Codex calls the text `step` instead of `content`.",
      },
      {
        q: "How are tasks counted in the header?",
        a: "The header shows completed tasks out of the tasks that are not `skipped`, so a plan with one skipped task still reaches \"4 of 4 done\" and the bar turns green. A `failed` task still counts toward the total and turns the bar red.",
      },
      {
        q: "Why doesn't the check animate when a task completes?",
        a: "The check pops when a row's `status` changes while the row stays mounted. Rows are keyed by `id`, so keep ids stable across updates (the todo's index or your own task id), not a new `crypto.randomUUID()` on every render. Under reduced motion the change is instant on purpose.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the header, collapses or expands the task list." },
      { keys: "Enter / Space", action: "On a task with subtasks or tools, shows or hides them. With `onTaskClick`, the title calls it instead and a separate chevron button toggles the details." },
      { keys: "Tab / Shift+Tab", action: "Moves between the header and the task buttons. Rows with no details and no `onTaskClick` are plain text and are skipped." },
    ],
    a11y: [
      "The tasks are an `<ol>` labelled with `title`. The running task has `aria-current=\"step\"`, and each row ends with hidden status text such as \", in progress\", because the glyphs are `aria-hidden`.",
      "A hidden `aria-live=\"polite\"` paragraph reads \"Working on: \" plus the task title when the running task changes, and the title plus \"complete\" when every counted task is done.",
      "The bar is a `role=\"progressbar\"` with `aria-valuenow` set to completed tasks, `aria-valuemax` to tasks that are not skipped, and `aria-valuetext` such as \"3 of 5 done\".",
      "Under reduced motion the highlight, the check pop and the bar fill change instantly, and the kit stylesheet stops the spinner and the panel height transition.",
    ],
  },

  "speech-input": {
    faq: [
      {
        q: "Which browsers support SpeechInput?",
        a: "Browsers with `SpeechRecognition` or `webkitSpeechRecognition`: Chrome, Edge and Safari. Firefox has neither, so the button is disabled, its tooltip says \"Voice input is not supported in this browser\" and `onUnsupported` fires once. The component calls no service and needs no key, but Chrome recognises speech on a server, so it fails offline with the `network` error.",
      },
      {
        q: "How do I show the words in grey while the user is still speaking?",
        a: "`onTranscript` fires with `final: false` for a live guess that the next call replaces, and `final: true` when a phrase settles. Keep the guess in its own state: `if (final) { setPrompt((p) => (p + \" \" + text).trim()); setPreview(\"\") } else setPreview(text)`. Set `interim={false}` to get settled text only.",
      },
      {
        q: "What happens when the user blocks the microphone?",
        a: "The browser reports `not-allowed`, and SpeechInput shows \"Microphone access is blocked. Allow it in the browser's site settings.\" next to the button and calls `onError(\"not-allowed\")`. The message clears on the next start. `audio-capture` (no microphone) and `no-speech` get their own messages.",
      },
      {
        q: "Does SpeechInput record or upload audio?",
        a: "No, it only returns text. While listening it opens a second microphone stream with `getUserMedia` to read the level for the ring through an `AnalyserNode`, records nothing and stops it when listening ends. To save an audio file use [`AudioRecorder`](/docs/audio-recorder).",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the button, starts listening, or stops when it is already listening." },
      { keys: "Escape", action: "Stops listening wherever focus is, for example while typing in the prompt. The listener is only attached while listening." },
    ],
    a11y: [
      "The button keeps one name, `aria-label` (\"Dictate\" by default), and exposes the listening state as `aria-pressed`. The icon swaps from a microphone to a stop square.",
      "Without speech recognition the button uses `focusableWhenDisabled`: it stays in the Tab order with `aria-disabled=\"true\"`, and `aria-describedby` points to hidden text that says voice input is not supported.",
      "Errors appear as inline text with `role=\"alert\"`, so screen readers read them as they appear.",
      "The level ring is `aria-hidden`. Under reduced motion it stays at a fixed size and the level stream is never opened.",
    ],
  },

  "timezone-select": {
    faq: [
      {
        q: "Where does the time zone list come from?",
        a: "From the browser: `Intl.supportedValuesOf(\"timeZone\")`, plus `UTC` when it is missing. Offsets come from `Intl.DateTimeFormat` with `timeZoneName: \"longOffset\"` for today's date, so daylight saving time is right and there is no data file to update. Pass `zones` to offer your own list; an id the browser does not know stays selectable and shows UTC+00:00.",
      },
      {
        q: "How do I get the detected zone before the user picks one?",
        a: "`onValueChange` only fires on a pick. Uncontrolled, the field shows the browser's zone (\"UTC\" during server rendering and hydration), and with `name` it submits that zone with the form. To save it without a form, read `Intl.DateTimeFormat().resolvedOptions().timeZone` in an effect.",
      },
      {
        q: "What can users type to find a zone?",
        a: "A city (\"new york\"), part of the id (\"america/argentina\"), an offset (`+5:30`, `+05:30`, `+0530`, `utc-8`) or an abbreviation (\"PST\"). A whole-hour offset like `+5` matches +05:00, +05:30 and +05:45, not +10:00. Abbreviations are Intl's short names in `en-US` and the user's locale, so \"IST\" only matches where that locale uses it.",
      },
      {
        q: "Do the local times keep ticking?",
        a: "No. Offsets and times are computed when the list opens and stay fixed while it is open. Reopening refreshes them. Set `showCurrentTime={false}` to drop the time column.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space / ArrowDown", action: "On the trigger, opens the list with the search field focused." },
      { keys: "ArrowDown / ArrowUp", action: "Moves the highlight through the matching zones, across region groups." },
      { keys: "Enter", action: "Selects the highlighted zone and closes the list." },
      { keys: "Escape", action: "Closes the list and returns focus to the trigger." },
    ],
    a11y: [
      "Each region is a Base UI group with `role=\"group\"`, labelled by its heading (Detected, America, Europe...). Zones are `role=\"option\"` with `aria-selected`; the check icon is `aria-hidden`.",
      "Without `aria-label` or `id`, the trigger is named \"Time zone\". With an `id`, it is named by your `<label htmlFor>` or [`FormField`](/docs/form-field) instead. The search field is labelled \"Search time zones\".",
    ],
  },
}
