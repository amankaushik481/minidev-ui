import type { Guide } from "../types"

const guide: Guide = {
  slug: "types-of-modals-and-overlays",
  title: "Modal vs Dialog vs Drawer vs Popover: Types of Overlays Explained",
  description:
    "Dialog, alert dialog, drawer, sheet, popover, tooltip, hover card, toast and command palette: what each overlay is for and when to use which, with live examples.",
  date: "2026-11-05",
  keywords: [
    "types of modals",
    "modal vs dialog",
    "modal vs drawer",
    "popover vs tooltip",
    "types of overlays ui",
    "dialog vs sheet",
  ],
  related: ["dialog", "alert-dialog", "drawer", "sheet", "popover", "tooltip"],
  body: [
    {
      type: "tldr",
      items: [
        "**A modal (dialog) blocks the page** until it is closed. Use it for a short task or a decision that must happen now.",
        "**A drawer or sheet slides in from an edge** and suits longer content: details, filters, a form that needs room.",
        "**A popover is small and anchored** to the button that opened it; a tooltip is a read-only label on hover or focus.",
        "**A toast is a message, not a question.** It appears, says what happened, and leaves on its own.",
      ],
    },
    {
      type: "p",
      text: "Overlays are anything that appears on top of the page. They are the most overused pattern in product design: a modal for every form, a toast for every click. The fix is knowing what each type is for. Two questions decide almost every case: **does it block the page**, and **how much room does the content need**. This guide covers each overlay type with best for, avoid when, and a live example from [MiniDev UI](/components/overlays).",
    },
    { type: "h2", text: "Overlay picker", id: "picker" },
    {
      type: "table",
      head: ["Overlay", "Blocks the page?", "Size", "Best for"],
      rows: [
        ["[Dialog (modal)](#dialog)", "Yes", "Small to medium", "A short task or decision"],
        ["[Alert dialog](#alert-dialog)", "Yes, and must be answered", "Small", "Confirming a destructive action"],
        ["[Drawer](#drawer)", "Usually", "Tall, from the bottom or side", "Mobile actions, longer forms"],
        ["[Sheet](#sheet)", "Usually", "Tall panel from a side", "Details, filters, editing a record"],
        ["[Popover](#popover)", "No", "Small, anchored", "A quick form or extra options"],
        ["[Tooltip](#tooltip)", "No", "Tiny, anchored", "Naming an icon or a shortcut"],
        ["[Hover card](#hover-card)", "No", "Small, anchored", "Previewing a person or link"],
        ["[Toast](#toast)", "No", "Small, in a corner", "Saying something happened"],
        ["[Command palette](#command-palette)", "Yes", "Medium, centred", "Jumping to any page or action"],
      ],
    },

    { type: "h2", text: "Overlays that block the page", id: "blocking" },
    { type: "h3", text: "Dialog (modal)", id: "dialog" },
    {
      type: "p",
      text: "A dialog appears in the centre of the screen over a dimmed backdrop, and the page behind cannot be used until it closes. In everyday language modal and dialog mean the same thing: modal describes the behaviour (it blocks), dialog is the element.",
    },
    {
      type: "p",
      text: "**Best for:** short tasks that belong to the current page: rename a file, invite a teammate, edit a few fields. **Avoid when:** the content is long, needs scrolling, or the person must look at the page while filling it in. **Tip:** trap focus inside, close on Escape and on the backdrop, and return focus to the button that opened it. Our [accessible modal guide](/guides/react-accessible-modal) covers this in detail.",
    },
    { type: "example", name: "dialog", index: 0, caption: "A short form in a dialog." },
    { type: "h3", text: "Alert dialog", id: "alert-dialog" },
    {
      type: "p",
      text: "An alert dialog is a dialog that demands an answer. It does not close on a backdrop click, because the decision matters: Delete 12 invoices? Leave without saving?",
    },
    {
      type: "p",
      text: "**Best for:** destructive or irreversible actions, and unsaved changes. **Avoid when:** the action can be undone; let it happen and offer Undo in a toast. Confirming everything trains people to click OK without reading. **Tip:** the title names the consequence, the confirm button repeats the verb (Delete 12 invoices), and focus starts on Cancel.",
    },
    { type: "example", name: "alert-dialog", index: 0 },
    { type: "h3", text: "Drawer", id: "drawer" },
    {
      type: "p",
      text: "A drawer slides up from the bottom (on phones) or in from a side. It feels lighter than a centred modal and gives content more height, and on touch screens it can be swiped away.",
    },
    {
      type: "p",
      text: "**Best for:** mobile menus, action lists, and forms that need more room than a dialog. **Avoid when:** on desktop for short confirmations; a dialog is more direct. **Tip:** show a grab handle on bottom drawers and keep the primary action within thumb reach.",
    },
    { type: "example", name: "drawer", index: 0 },
    { type: "h3", text: "Sheet", id: "sheet" },
    {
      type: "p",
      text: "A sheet is a full-height panel that slides in from the left or right edge, the desktop sibling of the drawer. It keeps part of the page visible, which preserves context.",
    },
    {
      type: "p",
      text: "**Best for:** record details from a list, filter panels, edit forms, settings that need room. **Avoid when:** the content is a full page in its own right; give it a URL instead. **Tip:** if people need to share or bookmark what is in the sheet, put its state in the URL.",
    },
    { type: "example", name: "sheet", index: 2, caption: "A wider panel from the right." },
    { type: "h3", text: "Command palette", id: "command-palette" },
    {
      type: "p",
      text: "A command palette is a modal search box, opened with Cmd+K, for jumping to pages and running actions by typing. It is a blocking overlay on purpose: the person is mid-search and nothing else matters.",
    },
    {
      type: "p",
      text: "**Best for:** apps with many pages and frequent users. **Avoid when:** it is the only route to a feature. **Tip:** show recent items when the box is empty. More in [the command palette guide](/guides/react-command-palette).",
    },
    { type: "example", name: "command-palette", index: 0 },

    { type: "h2", text: "Overlays that leave the page usable", id: "non-blocking" },
    { type: "h3", text: "Popover", id: "popover" },
    {
      type: "p",
      text: "A popover is a small panel anchored to the element that opened it, without a backdrop. It can hold interactive content: a short form, a set of options, a colour picker.",
    },
    {
      type: "p",
      text: "**Best for:** quick edits in place, filter options, date and colour pickers, share menus. **Avoid when:** the content is long or needs scrolling; use a sheet. **Tip:** close on outside click and Escape, and let it flip sides near the edge of the screen.",
    },
    { type: "example", name: "popover", index: 0 },
    { type: "h3", text: "Tooltip", id: "tooltip" },
    {
      type: "p",
      text: "A tooltip is a tiny label that appears on hover or keyboard focus. It names what an icon does, or shows a shortcut. It holds text only, never links or buttons.",
    },
    {
      type: "p",
      text: "**Best for:** icon buttons, truncated text, keyboard shortcuts. **Avoid when:** the information is essential; touch screens have no hover, so put it on the page. **Tip:** a short delay (around 300 to 500 ms) before showing stops tooltips flickering as the pointer passes.",
    },
    { type: "example", name: "tooltip", index: 1, caption: "Tooltips that show a keyboard shortcut." },
    { type: "h3", text: "Hover card", id: "hover-card" },
    {
      type: "p",
      text: "A hover card is a richer preview on hover: a person's avatar, role and status, or a link's title and image, like profile previews on GitHub or X.",
    },
    {
      type: "p",
      text: "**Best for:** previewing people, records and links without leaving the page. **Avoid when:** the card holds the only way to do something; hover does not exist on phones. **Tip:** link the trigger to the full page so the card is a shortcut, not a dead end.",
    },
    { type: "example", name: "hover-card", index: 0 },
    { type: "h3", text: "Toast", id: "toast" },
    {
      type: "p",
      text: "A toast is a short message in a corner that confirms something happened (Invoice sent) and disappears on its own after a few seconds. It never asks a question.",
    },
    {
      type: "p",
      text: "**Best for:** confirmations, background job results, and Undo for reversible actions. **Avoid when:** the message is an error that needs action, or something people must not miss; show it inline next to the cause instead. **Tip:** one line, past tense, and an Undo button where it applies. See [the toast notifications guide](/guides/nextjs-toast-notifications).",
    },
    { type: "example", name: "toast", index: 1, caption: "A toast with an action and dismiss." },

    { type: "h2", text: "Modal or new page? A quick test", id: "modal-or-page" },
    {
      type: "list",
      ordered: true,
      items: [
        "**Would someone want to link to it?** Then it is a page, not a modal.",
        "**Does it take more than a minute?** Then it is a page or a sheet.",
        "**Does the person need to see the page behind it?** Then it is a popover or a sheet, not a centred dialog.",
        "**Is it a decision that cannot wait?** Then a dialog, or an alert dialog if it is destructive.",
      ],
    },
    { type: "h2", text: "Accessibility rules for every overlay", id: "accessibility" },
    {
      type: "list",
      items: [
        "Blocking overlays use `role=\"dialog\"` (or `alertdialog`) with `aria-modal`, a labelled title, and a focus trap.",
        "Escape closes every overlay except alert dialogs that need an answer.",
        "Focus moves into the overlay when it opens and back to the trigger when it closes.",
        "Toasts are announced with an ARIA live region, and stay long enough to read (at least 5 seconds, longer for actions).",
        "Nothing important lives only in a hover state.",
      ],
    },
    {
      type: "p",
      text: "Every overlay above is a free, accessible React component built on Base UI. Install one with `npx shadcn@latest add @minidev/dialog`, or browse them all in the [overlays category](/components/overlays).",
    },
  ],
  faq: [
    {
      q: "What is the difference between a modal and a dialog?",
      a: "In practice they mean the same thing. Modal describes the behaviour, the page behind is blocked until it closes; dialog is the element. Some people use dialog for any pop-up window, modal or not.",
    },
    {
      q: "When should I use a drawer instead of a modal?",
      a: "Use a drawer when the content needs more height, when the user is on a phone, or when they should still see part of the page. Use a centred modal for short, focused tasks and decisions on desktop.",
    },
    {
      q: "What is the difference between a popover and a tooltip?",
      a: "A tooltip is a read-only text label shown on hover or focus. A popover opens on click, stays until dismissed, and can hold interactive content such as a form or options.",
    },
    {
      q: "Is a sheet the same as a drawer?",
      a: "They are close relatives. A sheet usually means a full-height panel from the left or right on desktop; a drawer often means a panel from the bottom on mobile that can be swiped away.",
    },
    {
      q: "When should I use a toast?",
      a: "To confirm something happened, especially in the background, and to offer Undo. Do not use a toast for errors that need action or anything people must not miss; show those inline.",
    },
    {
      q: "Are modals bad for UX?",
      a: "Not when they are short and necessary. They become a problem when used for long forms, for content people want to link to, or for confirmations on every action. Use the test above to decide.",
    },
  ],
}

export default guide
