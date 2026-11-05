import type { Guide } from "../types"

const guide: Guide = {
  slug: "types-of-loading-and-feedback-states",
  title: "Skeleton vs Spinner vs Progress Bar: Types of Loading and Feedback States",
  description:
    "Skeletons, spinners, progress bars, toasts, banners, status badges and empty states: which feedback pattern fits each wait or message, with live React examples.",
  date: "2026-11-05",
  keywords: [
    "skeleton vs spinner",
    "types of loading indicators",
    "loading states ui",
    "progress bar vs spinner",
    "empty state design",
    "ui feedback patterns",
  ],
  related: ["skeleton", "spinner", "progress", "toast", "empty-state", "banner"],
  body: [
    {
      type: "tldr",
      items: [
        "**Loading a page or list (1 to 5 seconds)?** A skeleton in the shape of the content.",
        "**Waiting on a short action, like saving?** A spinner inside the button that was clicked.",
        "**A longer job with a known length, like an upload?** A progress bar with a percentage.",
        "**Nothing to show yet?** An empty state that says why and offers the next step. Messages after an action go in a toast; problems that persist go in a banner.",
      ],
    },
    {
      type: "p",
      text: "Feedback is how an interface tells people it heard them. Without it, they click again, refresh, or leave. With the wrong kind, a spinner over a whole page or a toast for an error, the product feels slow or confusing even when it is not. This guide covers the loading and feedback patterns used in web apps, when each fits, and a live example of each from [MiniDev UI](/components/feedback).",
    },
    { type: "h2", text: "Feedback picker", id: "picker" },
    {
      type: "table",
      head: ["Situation", "Use", "Avoid"],
      rows: [
        ["Content loading, layout known", "[Skeleton](#skeleton)", "A page-sized spinner"],
        ["A short action under 2 to 3 seconds", "[Spinner](#spinner) in the button", "Blocking the whole page"],
        ["A long job with measurable progress", "[Progress bar](#progress)", "An endless spinner"],
        ["An action succeeded or can be undone", "[Toast](#toast)", "A modal"],
        ["A state that persists: offline, trial ending", "[Banner](#banner)", "A toast that vanishes"],
        ["The state of a record", "[Status badge](#status-badge)", "Colour alone"],
        ["No data yet, or no results", "[Empty state](#empty-state)", "A blank area"],
        ["A risky action needs a decision", "[Alert dialog](#alert-dialog)", "A toast"],
      ],
    },

    { type: "h2", text: "Loading indicators", id: "loading" },
    { type: "h3", text: "Skeleton", id: "skeleton" },
    {
      type: "p",
      text: "A skeleton is a grey placeholder in the shape of the content that is about to appear: lines for text, a circle for an avatar, a block for an image. The layout stays still, so the page does not jump when the data arrives, and the wait feels shorter because people can already see what is coming.",
    },
    {
      type: "p",
      text: "**Best for:** first loads of pages, lists, cards and dashboards where the layout is known. **Avoid when:** the wait is under about 300 ms; a flash of skeleton is worse than nothing. And avoid skeletons that do not match the real layout, because the jump defeats the point. **Tip:** a gentle shimmer signals activity; respect reduced motion by keeping it still.",
    },
    { type: "example", name: "skeleton", index: 2, caption: "A card placeholder in the shape of the real card." },
    { type: "h3", text: "Spinner", id: "spinner" },
    {
      type: "p",
      text: "A spinner says something is happening without saying how long it will take. It is the right size of feedback for short, bounded waits.",
    },
    {
      type: "p",
      text: "**Best for:** saving, submitting, refreshing one panel, anything that takes a second or two. Put it where the action happened, usually inside the button. **Avoid when:** the wait is long or measurable (use progress) or the content has a known shape (use a skeleton). **Tip:** disable the button while the spinner runs so the action cannot fire twice, and keep the button the same width.",
    },
    { type: "example", name: "spinner", index: 2, caption: "A spinner inside the button that started the action." },
    { type: "h3", text: "Progress bar", id: "progress" },
    {
      type: "p",
      text: "A progress bar fills as a job advances, ideally with a percentage or a count such as 34 of 120 files. Knowing how much is left is what makes a long wait tolerable.",
    },
    {
      type: "p",
      text: "**Best for:** uploads, imports, exports, multi-step processing, onboarding completion. **Avoid when:** you cannot measure progress; a bar that sits at 99% destroys trust faster than a spinner. **Tip:** for jobs over 10 seconds, let people leave and notify them when it finishes.",
    },
    { type: "example", name: "progress", index: 2, caption: "A simulated upload with a percentage." },

    { type: "h2", text: "Messages and status", id: "messages" },
    { type: "h3", text: "Toast", id: "toast" },
    {
      type: "p",
      text: "A toast is a short message that appears in a corner after an action, confirms what happened, and disappears on its own. It is feedback, not a conversation.",
    },
    {
      type: "p",
      text: "**Best for:** Saved, Invoice sent, Link copied, and Undo after reversible actions such as archiving. **Avoid when:** the message is an error that needs action, a form validation message, or something people must not miss. **Tip:** past tense, one line, and keep it on screen at least 5 seconds when it has a button.",
    },
    { type: "example", name: "toast", index: 0, caption: "Success, warning and error tones." },
    { type: "h3", text: "Banner", id: "banner" },
    {
      type: "p",
      text: "A banner is a full-width message at the top of the page or a section that stays until the situation changes or it is dismissed. Use it for states, not events.",
    },
    {
      type: "p",
      text: "**Best for:** you are offline, your trial ends in 3 days, scheduled maintenance tonight, an incident in progress. **Avoid when:** the message is about one action that just happened; use a toast. **Tip:** one banner at a time, with one clear action such as Upgrade or Retry.",
    },
    { type: "example", name: "banner", index: 1, caption: "A banner with an action and a dismiss button." },
    { type: "h3", text: "Status badge", id: "status-badge" },
    {
      type: "p",
      text: "A status badge is a small pill that labels the state of a record: Paid, Overdue, Draft, Live, Failed. In tables it lets people scan hundreds of rows for the ones that need attention.",
    },
    {
      type: "p",
      text: "**Best for:** invoices, orders, deployments, tickets, any record with a lifecycle. **Avoid when:** the badge is decorative; if every row is Active, the badge adds nothing. **Tip:** use a word and a colour together, and keep the set of states small and consistent across the product.",
    },
    { type: "example", name: "status-badge", index: 1, caption: "Status badges in a table." },
    { type: "h3", text: "Alert dialog", id: "alert-dialog" },
    {
      type: "p",
      text: "An alert dialog stops everything to ask a question that cannot wait, usually before something destructive. It is the strongest feedback there is, so it should be the rarest.",
    },
    {
      type: "p",
      text: "**Best for:** deleting data, discarding unsaved changes, irreversible payments. **Avoid when:** the action can be undone; act and offer Undo in a toast instead. **Tip:** name the consequence in the title and repeat the verb on the button.",
    },
    { type: "example", name: "alert-dialog", index: 1, caption: "A confirm button that waits for the async action." },

    { type: "h2", text: "When there is nothing to show", id: "empty" },
    { type: "h3", text: "Empty state", id: "empty-state" },
    {
      type: "p",
      text: "An empty state fills the space where content will be: a new account with no projects, a search with no results, an inbox at zero. It is one of the most viewed screens in any product, because every new user sees it first.",
    },
    {
      type: "p",
      text: "**Best for:** first use, no search results, cleared lists, and errors where nothing loaded. **Avoid when:** never leave a blank area instead. **Tip:** say why it is empty in one line, and give the one action that fills it: Create your first project, Clear filters, Try again.",
    },
    { type: "example", name: "empty-state", index: 0, caption: "An empty state with one clear action." },
    { type: "example", name: "empty-state", index: 2, caption: "No search results, with a way out." },

    { type: "h2", text: "How long is too long? Timing rules", id: "timing" },
    {
      type: "table",
      head: ["Wait", "What people feel", "What to show"],
      rows: [
        ["Under 100 ms", "Instant", "Nothing, just the result"],
        ["100 ms to 1 s", "A small delay", "Nothing, or a subtle pressed state"],
        ["1 to 3 s", "Waiting", "A spinner where the action happened, or a skeleton"],
        ["3 to 10 s", "Getting impatient", "A skeleton or progress, plus a short label"],
        ["Over 10 s", "Leaving", "Progress with a percentage, and let them leave and get notified"],
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Optimistic updates beat any loading indicator: show the result immediately (the message sent, the task ticked) and roll back with an error toast in the rare case the server fails.",
    },
    { type: "h2", text: "Accessibility for feedback", id: "accessibility" },
    {
      type: "list",
      items: [
        "Announce toasts and status changes with an ARIA live region (`aria-live=\"polite\"`, or `assertive` for errors).",
        "Mark loading regions with `aria-busy=\"true\"` and give spinners a text label such as Loading invoices.",
        "Progress bars use `role=\"progressbar\"` with the current value and maximum.",
        "Respect `prefers-reduced-motion`: stop shimmer and spinning, keep a static indicator.",
        "Never use colour alone for status; pair it with a word or icon.",
      ],
    },
    {
      type: "p",
      text: "Every pattern above is a free, MIT-licensed React component. Install one with `npx shadcn@latest add @minidev/skeleton`, and read [the empty states and skeletons guide](/guides/react-empty-states-skeletons) for a full worked example.",
    },
  ],
  faq: [
    {
      q: "Should I use a skeleton or a spinner?",
      a: "Use a skeleton when content is loading and you know its layout, such as a list or a card, so the page does not jump. Use a spinner for short actions like saving, placed where the action happened.",
    },
    {
      q: "When should I use a progress bar instead of a spinner?",
      a: "When the job takes more than a few seconds and you can measure how far it has got, such as uploads, imports and exports. If you cannot measure progress, use a spinner with a label instead of a fake bar.",
    },
    {
      q: "What is the difference between a toast and a banner?",
      a: "A toast reports an event that just happened and disappears on its own. A banner describes a state that persists, such as being offline or a trial ending, and stays until the state changes or it is dismissed.",
    },
    {
      q: "What should an empty state include?",
      a: "One line on why it is empty, and the one action that fills it: create the first item, clear the filters, or try again. An illustration is optional; the action is not.",
    },
    {
      q: "How long can a loading state last?",
      a: "Under a second, show nothing special. One to three seconds, a spinner or skeleton. Over ten seconds, show real progress and let people leave and be notified when the job finishes.",
    },
    {
      q: "Do skeleton screens make pages feel faster?",
      a: "Yes, when they match the final layout. People see the structure immediately, so the wait feels shorter and the page does not jump. A skeleton that does not match the real layout loses that benefit.",
    },
  ],
}

export default guide
