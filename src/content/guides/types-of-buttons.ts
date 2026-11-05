import type { Guide } from "../types"

const guide: Guide = {
  slug: "types-of-buttons",
  title: "Types of Buttons in UI Design: When to Use Each One",
  description:
    "Primary, secondary, outline, ghost, destructive, icon, split, toggle, button group, floating action and copy buttons: what each is for, with live React examples.",
  date: "2026-11-05",
  keywords: [
    "types of buttons",
    "types of buttons in ui design",
    "button types",
    "primary vs secondary button",
    "button variants",
    "ghost button",
  ],
  related: ["button", "icon-button", "split-button", "button-group", "toggle-group", "floating-action-button"],
  body: [
    {
      type: "tldr",
      items: [
        "**One primary button per screen** for the main action. Everything else is secondary, outline or ghost, in that order of weight.",
        "**Destructive buttons are red** and almost always open a confirmation first.",
        "**Icon-only buttons** need a tooltip and an accessible label; use them only for actions everyone recognises.",
        "**Several related choices?** A button group or toggle group. One main action with variations? A split button.",
      ],
    },
    {
      type: "p",
      text: "Buttons are the verbs of an interface. The hard part is not drawing one, it is deciding how loud each one should be, so the action people need is the obvious one and the dangerous one is never an accident. This guide covers the button types used in websites and SaaS products, how they rank in visual weight, and when to use each, with a live example of every type from [MiniDev UI](/components/buttons).",
    },
    { type: "h2", text: "Button picker", id: "picker" },
    {
      type: "table",
      head: ["You need", "Use", "Avoid"],
      rows: [
        ["The main action on the screen", "[Primary button](#primary)", "Two primary buttons side by side"],
        ["An alternative action", "[Secondary or outline button](#secondary)", "A second primary button"],
        ["A low-key action in a toolbar or row", "[Ghost button](#ghost)", "Heavy filled buttons in every row"],
        ["Delete, remove, cancel a subscription", "[Destructive button](#destructive)", "A destructive action with no confirmation"],
        ["A compact, universally known action", "[Icon button](#icon-button)", "Icons only for unusual actions"],
        ["One action with variations", "[Split button](#split-button)", "Two separate buttons"],
        ["Several related actions together", "[Button group](#button-group)", "A row of unrelated buttons"],
        ["An on/off or one-of-many choice", "[Toggle and toggle group](#toggle)", "Checkboxes styled as buttons"],
        ["Copy a value to the clipboard", "[Copy button](#copy-button)", "Asking people to select text"],
        ["The one action on a mobile screen", "[Floating action button](#fab)", "FABs on desktop websites"],
      ],
    },

    { type: "h2", text: "Buttons by visual weight", id: "weight" },
    {
      type: "p",
      text: "Most design systems have four weights: primary (filled with the brand colour), secondary (filled with a neutral colour), outline (a border only) and ghost (no border until hover). A screen reads like a hierarchy: one loud button, a few quieter ones, and the rest as text-like actions.",
    },
    { type: "h3", text: "Primary button", id: "primary" },
    {
      type: "p",
      text: "The filled, high-contrast button for the single most important action: Sign up, Save, Pay, Create project. Its job is to be found instantly.",
    },
    {
      type: "p",
      text: "**Best for:** the main action of a page, form or dialog. **Avoid when:** you are tempted to use it twice; two primary buttons compete and slow the decision. **Tip:** use a specific verb (Create invoice) rather than a vague one (Submit), and keep the label to one to three words.",
    },
    { type: "example", name: "button", index: 0, caption: "Every variant side by side, from primary to ghost." },
    { type: "h3", text: "Secondary and outline buttons", id: "secondary" },
    {
      type: "p",
      text: "Secondary buttons have a neutral fill, outline buttons only a border. Both say this is an option, not the recommended path: Cancel next to Save, Watch demo next to Start free trial.",
    },
    {
      type: "p",
      text: "**Best for:** alternative actions next to a primary button, and actions that matter but are not the main one. **Avoid when:** the screen has no primary action; then the strongest button should simply be primary. **Tip:** put the secondary action on the left and the primary on the right in dialogs, and keep that order everywhere in the product.",
    },
    { type: "h3", text: "Ghost button", id: "ghost" },
    {
      type: "p",
      text: "A ghost button has no background or border until it is hovered. It reads almost like text, which makes it right for repeated, low-stakes actions.",
    },
    {
      type: "p",
      text: "**Best for:** toolbars, table rows, card footers, navigation inside apps. **Avoid when:** it is the only way to do something important; people may not see it as clickable. **Tip:** give ghost buttons an icon or a hover background so they are recognisably interactive.",
    },
    { type: "h3", text: "Destructive button", id: "destructive" },
    {
      type: "p",
      text: "A red button for actions that delete data or cannot easily be undone: Delete workspace, Remove member, Cancel subscription.",
    },
    {
      type: "p",
      text: "**Best for:** the confirm button of a destructive action, and danger zones in settings. **Avoid when:** the action is reversible; offer Undo in a toast instead of interrupting with a red button. **Tip:** put the destructive action behind a confirmation dialog that names exactly what will be lost, and make the safe option the default focus.",
    },
    { type: "example", name: "alert-dialog", index: 0, caption: "A destructive action confirmed in a dialog." },

    { type: "h2", text: "Buttons by shape and job", id: "shape" },
    { type: "h3", text: "Icon button", id: "icon-button" },
    {
      type: "p",
      text: "A square button that shows only an icon: close, edit, more, search, settings. It saves space in dense interfaces such as toolbars and table rows.",
    },
    {
      type: "p",
      text: "**Best for:** actions whose icons everyone knows. **Avoid when:** the icon is ambiguous, which is most icons beyond the obvious ten; add a text label instead. **Tip:** every icon button needs an `aria-label` and a tooltip with the same words.",
    },
    { type: "example", name: "icon-button", index: 2, caption: "Icon buttons with tooltips." },
    { type: "h3", text: "Split button", id: "split-button" },
    {
      type: "p",
      text: "A split button has a main part that runs the default action and a small arrow that opens related alternatives: Save, with Save as draft and Save and close in the menu.",
    },
    {
      type: "p",
      text: "**Best for:** one common action with less common variations, such as Deploy, Merge or Export. **Avoid when:** the options are equally common; use a regular dropdown so nobody runs the default by accident. **Tip:** make the default the safe, frequent choice.",
    },
    { type: "example", name: "split-button", index: 0 },
    { type: "h3", text: "Button group", id: "button-group" },
    {
      type: "p",
      text: "Several buttons joined into one control, sharing borders. It shows that the actions belong together, such as Previous and Next, or Day, Week and Month.",
    },
    {
      type: "p",
      text: "**Best for:** related actions and pagers. **Avoid when:** the actions are unrelated, or one is dangerous; keep Delete away from Edit. **Tip:** keep a group to 2 to 5 buttons so it fits on a phone.",
    },
    { type: "example", name: "button-group", index: 0 },
    { type: "h3", text: "Toggle and toggle group", id: "toggle" },
    {
      type: "p",
      text: "A toggle is a button that stays pressed: bold on or off, favourite or not. A toggle group lets people pick one (or several) options from a set, like text alignment or a view switcher.",
    },
    {
      type: "p",
      text: "**Best for:** formatting toolbars, view modes, filters. **Avoid when:** the choice is part of a form people submit; a switch, checkbox or radio group says that more clearly. **Tip:** the pressed state must be obvious without colour, using a fill, an inset or a check.",
    },
    { type: "example", name: "toggle-group", index: 0 },
    { type: "h3", text: "Copy button", id: "copy-button" },
    {
      type: "p",
      text: "A small button next to a value, such as an API key, install command or invite link, that copies it and confirms with a check mark.",
    },
    {
      type: "p",
      text: "**Best for:** anything people will paste somewhere else. **Avoid when:** the value is long prose. **Tip:** show Copied for about a second and a half, then return to the copy icon, so it can be used again.",
    },
    { type: "example", name: "copy-button", index: 0 },
    { type: "h3", text: "Floating action button", id: "fab" },
    {
      type: "p",
      text: "A floating action button (FAB) is a round button that floats in a corner of a mobile screen for the single most frequent action: compose, add, new chat.",
    },
    {
      type: "p",
      text: "**Best for:** mobile apps and mobile layouts of web apps with one dominant creation action. **Avoid when:** on desktop websites, or when there is more than one main action. **Tip:** keep it clear of the bottom navigation and the keyboard, and give it a text label when space allows.",
    },
    { type: "example", name: "floating-action-button", index: 0 },

    { type: "h2", text: "Button states every button needs", id: "states" },
    {
      type: "table",
      head: ["State", "What it shows", "How"],
      rows: [
        ["Default", "It is clickable", "Clear fill or border, readable label"],
        ["Hover", "The pointer is on it", "Slightly darker or lighter fill"],
        ["Focus", "Keyboard focus is on it", "A visible focus ring, never removed"],
        ["Active", "It is being pressed", "Slightly smaller or darker for a moment"],
        ["Loading", "The action is running", "A spinner and a disabled click, same width"],
        ["Disabled", "It cannot be used yet", "Lower contrast, plus a reason nearby"],
      ],
    },
    { type: "example", name: "spinner", index: 2, caption: "A loading state inside a button." },
    {
      type: "callout",
      tone: "warning",
      text: "Disabled buttons with no explanation are a common source of support tickets. If the button is disabled because a field is empty, say which field, or keep the button enabled and show the error on click.",
    },
    { type: "h2", text: "Labels, sizes and spacing", id: "details" },
    {
      type: "list",
      items: [
        "**Labels:** start with a verb and name the result: Create invoice, Send 3 reminders, Delete project. Sentence case reads faster than all caps.",
        "**Sizes:** at least 44 by 44 pixels on touch screens; 32 to 40 pixels tall on desktop, depending on density.",
        "**Spacing:** 8 to 12 pixels between buttons in a row, more around destructive ones.",
        "**Placement:** keep the primary action in the same spot across the product, usually bottom right of dialogs and forms.",
        "**Links vs buttons:** if it goes to another page, it is a link (it can look like a button); if it does something, it is a button. Screen readers announce them differently.",
      ],
    },
    {
      type: "p",
      text: "All the buttons above are free React components. Add the base button with `npx shadcn@latest add @minidev/button`, and see every variant on [the button docs page](/docs/button).",
    },
  ],
  faq: [
    {
      q: "What are the main types of buttons in UI design?",
      a: "By weight: primary, secondary, outline, ghost and destructive. By shape and job: icon buttons, split buttons, button groups, toggles and toggle groups, copy buttons and floating action buttons.",
    },
    {
      q: "What is the difference between a primary and a secondary button?",
      a: "A primary button is the filled, high-contrast button for the main action on a screen. A secondary button is visually quieter and offers an alternative, such as Cancel next to Save. Use one primary button per screen.",
    },
    {
      q: "What is a ghost button?",
      a: "A button with no background or border until it is hovered. It suits repeated, low-stakes actions in toolbars, rows and card footers, but is too easy to miss for important actions.",
    },
    {
      q: "When should I use a split button?",
      a: "When there is one common action with less common variations, such as Save with Save as draft. The main part runs the default; the arrow opens the alternatives.",
    },
    {
      q: "Should disabled buttons be used?",
      a: "Sparingly. A disabled button with no explanation leaves people stuck. Either explain why it is disabled next to it, or keep it enabled and show what is missing when it is clicked.",
    },
    {
      q: "Is a link that looks like a button OK?",
      a: "Yes. If it navigates to another page, use a link element styled as a button. If it performs an action on the current page, use a button element. The look can match; the element should follow the behaviour.",
    },
  ],
}

export default guide
