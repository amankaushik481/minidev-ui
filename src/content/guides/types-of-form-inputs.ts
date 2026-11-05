import type { Guide } from "../types"

const guide: Guide = {
  slug: "types-of-form-inputs",
  title: "Types of Form Inputs: Which Field to Use for Every Question",
  description:
    "Text field, select, combobox, checkbox, radio, switch, slider, date picker, OTP, tags and file upload: which form input fits each question, with live examples.",
  date: "2026-11-05",
  keywords: [
    "types of form inputs",
    "form input types",
    "form controls",
    "checkbox vs switch",
    "radio vs select",
    "dropdown vs combobox",
  ],
  related: ["input", "select", "combobox", "checkbox", "radio-group", "switch"],
  body: [
    {
      type: "tldr",
      items: [
        "**Free text?** A text input; a textarea when the answer is more than one line.",
        "**One choice from 2 to 5?** Radio buttons. **From 6 to about 15?** A select. **From more, or searchable?** A combobox.",
        "**Several choices?** Checkboxes for a few, a multi-select or tags input for many.",
        "**On or off that applies at once?** A switch. **On or off you submit with the form?** A checkbox.",
      ],
    },
    {
      type: "p",
      text: "Every field in a form is a question, and the right input makes the answer quick and correct. The wrong one costs conversions: a dropdown of two options hides them behind a click, a free text field for a date invites ten formats. This guide lists the form inputs you will use, organised by the kind of answer, with best for, avoid when, and a live example of each from [MiniDev UI](/components/forms).",
    },
    { type: "h2", text: "Input picker", id: "picker" },
    {
      type: "table",
      head: ["The answer is", "Use", "Avoid"],
      rows: [
        ["Short free text: name, email", "[Text input](#text-input)", "Textarea"],
        ["Long free text: message, bio", "[Textarea](#textarea)", "Text input"],
        ["One of 2 to 5 options", "[Radio group](#radio-group)", "Select"],
        ["One of 6 to about 15 options", "[Select](#select)", "A long radio list"],
        ["One of many, or searchable", "[Combobox](#combobox)", "A select with 200 items"],
        ["Several of a short list", "[Checkboxes](#checkbox)", "Multi-select"],
        ["Several of a long list", "[Multi-select](#multi-select)", "Dozens of checkboxes"],
        ["Free-form labels", "[Tags input](#tags-input)", "Comma-separated text"],
        ["On or off, applies instantly", "[Switch](#switch)", "Checkbox"],
        ["A number in a range", "[Slider](#slider) or [number input](#number-input)", "Text input"],
        ["A date or date range", "[Date picker](#date-picker)", "Three separate selects"],
        ["A one-time code", "[OTP input](#otp-input)", "One plain text field"],
        ["A file", "[File dropzone](#file-dropzone)", "A bare file input"],
        ["A password", "[Password input](#password-input)", "A field with no reveal button"],
      ],
    },

    { type: "h2", text: "Text inputs", id: "text" },
    { type: "h3", text: "Text input", id: "text-input" },
    {
      type: "p",
      text: "The single-line field for short answers: names, emails, titles, search terms. Set the right `type` (email, tel, url) and `autocomplete` value so phones show the right keyboard and browsers can fill it in.",
    },
    {
      type: "p",
      text: "**Best for:** short, unpredictable answers. **Avoid when:** the answer comes from a fixed list; offer the list instead. **Tip:** the label goes above the field and stays visible; a placeholder alone disappears the moment someone types.",
    },
    { type: "example", name: "input", index: 1, caption: "A text input with a leading icon." },
    { type: "h3", text: "Textarea", id: "textarea" },
    {
      type: "p",
      text: "A multi-line field for longer answers: messages, descriptions, feedback. The visible size tells people how much you expect them to write.",
    },
    {
      type: "p",
      text: "**Best for:** anything longer than a sentence. **Avoid when:** you need structured data out of it. **Tip:** show a character count when there is a limit, and let the field grow with the text.",
    },
    { type: "example", name: "textarea", index: 1, caption: "A textarea with a character limit." },
    { type: "h3", text: "Password input", id: "password-input" },
    {
      type: "p",
      text: "A masked text field with a button to show what was typed. The reveal button cuts typos more than a confirm-password field does.",
    },
    {
      type: "p",
      text: "**Best for:** sign-up, sign-in and password changes. **Avoid when:** never avoid the reveal button; people mistype on phones. **Tip:** set `autocomplete=\"new-password\"` on sign-up so password managers offer a strong one.",
    },
    { type: "example", name: "password-input", index: 0 },

    { type: "h2", text: "Choosing from options", id: "options" },
    { type: "h3", text: "Radio group", id: "radio-group" },
    {
      type: "p",
      text: "Radio buttons show all options at once and allow exactly one. Seeing every option is the point: people compare them without opening anything.",
    },
    {
      type: "p",
      text: "**Best for:** 2 to 5 options, especially when each needs a short description, such as plans or shipping speeds. **Avoid when:** there are many options; the list gets long. **Tip:** preselect the most common safe option so the form can be finished faster.",
    },
    { type: "example", name: "radio-group", index: 2, caption: "Options with descriptions." },
    { type: "h3", text: "Select (dropdown)", id: "select" },
    {
      type: "p",
      text: "A select hides its options in a list until clicked and allows one choice. It saves space when the options are many but familiar, like a country or a time zone.",
    },
    {
      type: "p",
      text: "**Best for:** 6 to about 15 known options. **Avoid when:** there are only 2 or 3 (use radios) or hundreds (use a combobox). **Tip:** sort options in an order people expect: alphabetical, numerical, or most common first.",
    },
    { type: "example", name: "select", index: 1, caption: "A select with grouped items." },
    { type: "h3", text: "Combobox", id: "combobox" },
    {
      type: "p",
      text: "A combobox is a select you can type into: it filters the options as you type. It turns a list of 200 countries or 5,000 products into a few keystrokes.",
    },
    {
      type: "p",
      text: "**Best for:** long lists, data from a server, anything people know by name. **Avoid when:** people do not know what the options are; they need to browse, so show them. **Tip:** match anywhere in the label, not just the start, and show a clear empty state.",
    },
    { type: "example", name: "combobox", index: 0 },
    { type: "h3", text: "Checkbox", id: "checkbox" },
    {
      type: "p",
      text: "A checkbox is an independent yes or no. A group of checkboxes lets people pick any number of options, and a single checkbox is for agreeing to something before submitting.",
    },
    {
      type: "p",
      text: "**Best for:** a short list of multiple choices, terms acceptance, filters. **Avoid when:** the setting applies instantly (use a switch) or only one option is allowed (use radios). **Tip:** a select all checkbox with an indeterminate state saves clicks in tables.",
    },
    { type: "example", name: "checkbox", index: 2, caption: "Select all with an indeterminate state." },
    { type: "h3", text: "Multi-select", id: "multi-select" },
    {
      type: "p",
      text: "A multi-select is a searchable dropdown that allows several choices, shown as chips in the field. It handles long lists where checkboxes would fill the screen.",
    },
    {
      type: "p",
      text: "**Best for:** assigning people, choosing skills, picking categories from a long list. **Avoid when:** the list is short; checkboxes show all options at once. **Tip:** show the selected count when there are more chips than fit.",
    },
    { type: "example", name: "multi-select", index: 0 },
    { type: "h3", text: "Tags input", id: "tags-input" },
    {
      type: "p",
      text: "A tags input turns typed text into chips when you press Enter or a comma. Unlike a multi-select, the values are free-form.",
    },
    {
      type: "p",
      text: "**Best for:** labels, keywords, email recipients. **Avoid when:** values must come from a fixed list; use a multi-select. **Tip:** handle pasting a comma-separated list, and stop duplicates.",
    },
    { type: "example", name: "tags-input", index: 0 },
    { type: "h3", text: "Switch", id: "switch" },
    {
      type: "p",
      text: "A switch is an on or off control that takes effect immediately, like a light switch. Because it acts at once, it does not belong in a form with a Save button.",
    },
    {
      type: "p",
      text: "**Best for:** settings and preferences that apply instantly: notifications, dark mode, feature flags. **Avoid when:** the change is saved with a form; use a checkbox. **Tip:** the label says what is on (Email digests), not an instruction (Turn on email digests).",
    },
    { type: "example", name: "switch", index: 0, caption: "Settings rows that apply instantly." },

    { type: "h2", text: "Numbers, dates and codes", id: "numbers" },
    { type: "h3", text: "Slider", id: "slider" },
    {
      type: "p",
      text: "A slider picks a value by dragging along a track. It is quick and visual when the exact number matters less than the rough position.",
    },
    {
      type: "p",
      text: "**Best for:** budgets, price filters, volume and opacity. **Avoid when:** people need an exact value, such as a quantity of 37; pair the slider with a number field or use a number input. **Tip:** show the current value next to the thumb.",
    },
    { type: "example", name: "slider", index: 0, caption: "A slider formatted as currency." },
    { type: "h3", text: "Number input", id: "number-input" },
    {
      type: "p",
      text: "A field for exact numbers with plus and minus steppers, min, max and step rules.",
    },
    {
      type: "p",
      text: "**Best for:** quantities, seats, ages, limits. **Avoid when:** the number is an identifier such as a card or phone number; those are text with formatting. **Tip:** allow typing as well as stepping, and clamp to the limits on blur.",
    },
    { type: "example", name: "number-input", index: 0 },
    { type: "h3", text: "Date picker", id: "date-picker" },
    {
      type: "p",
      text: "A date picker combines a text field with a calendar. A date range picker selects a start and an end, often with presets such as Last 30 days.",
    },
    {
      type: "p",
      text: "**Best for:** bookings, due dates, report ranges. **Avoid when:** the date is a birthday decades ago; typing is faster than paging back through a calendar. **Tip:** show the format and accept typed dates in it. See [the date range picker guide](/guides/react-date-range-picker).",
    },
    { type: "example", name: "date-range-picker", index: 1, caption: "A date range picker with presets." },
    { type: "h3", text: "OTP input", id: "otp-input" },
    {
      type: "p",
      text: "A one-time code field split into one box per digit. It shows how long the code is and supports pasting and SMS autofill.",
    },
    {
      type: "p",
      text: "**Best for:** two-factor codes, email and phone verification. **Avoid when:** the code is long or alphanumeric beyond eight characters. **Tip:** set `autocomplete=\"one-time-code\"` and verify automatically when the last digit is entered. More in [the OTP input guide](/guides/react-otp-input).",
    },
    { type: "example", name: "otp-input", index: 1, caption: "Verifies when the last digit is entered." },
    { type: "h3", text: "File dropzone", id: "file-dropzone" },
    {
      type: "p",
      text: "A drop area that accepts dragged files and opens the file browser on click, with a list of selected files and their progress.",
    },
    {
      type: "p",
      text: "**Best for:** documents, images, CSV imports. **Avoid when:** a single small avatar; an avatar upload control is clearer. **Tip:** state the accepted types and size limit before the upload, not after it fails. See [the file upload guide](/guides/react-file-upload-dropzone).",
    },
    { type: "example", name: "file-dropzone", index: 1, caption: "Accepted types and a size limit up front." },

    { type: "h2", text: "Rules that apply to every field", id: "rules" },
    {
      type: "list",
      items: [
        "**A visible label** above every field. Placeholders are hints, not labels.",
        "**Mark the exception:** if most fields are required, mark the optional ones.",
        "**Validate on blur, not on every keystroke**, and say how to fix the error next to the field.",
        "**Group related fields** (address, card details) and keep one column; multi-column forms are skipped.",
        "**Ask for less.** Every field you remove raises completion. Ask for the rest after sign-up.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Wrap any input in a form field component that wires the label, description and error message to the control. It keeps forms accessible without thinking about `aria-describedby` every time.",
    },
    { type: "example", name: "form-field", index: 0, caption: "Label, help text and error wired to the control." },
    {
      type: "p",
      text: "Every input on this page is a free React component. Install one with `npx shadcn@latest add @minidev/combobox`, or see the full [forms category](/components/forms).",
    },
  ],
  faq: [
    {
      q: "What are the main types of form inputs?",
      a: "Text inputs and textareas for free text; radio groups, selects and comboboxes for one choice; checkboxes, multi-selects and tags inputs for several; switches for instant on and off; and sliders, number inputs, date pickers, OTP inputs and file uploads for specific kinds of data.",
    },
    {
      q: "When should I use radio buttons instead of a dropdown?",
      a: "Use radio buttons for 2 to 5 options, so people see and compare them all without a click. Use a dropdown (select) for 6 to about 15 known options, and a combobox for longer or searchable lists.",
    },
    {
      q: "What is the difference between a checkbox and a switch?",
      a: "A switch applies its setting immediately, like a light switch. A checkbox records a choice that is saved when the form is submitted. Do not put switches in a form with a Save button.",
    },
    {
      q: "What is the difference between a select and a combobox?",
      a: "A select shows a fixed list you scroll through. A combobox lets you type to filter the list, which suits long lists such as countries, users or products.",
    },
    {
      q: "Should I use a placeholder instead of a label?",
      a: "No. The placeholder disappears as soon as someone types, which hurts memory, accessibility and error correction. Use a visible label above the field and keep placeholders for examples.",
    },
    {
      q: "How do I make form inputs accessible?",
      a: "Give every field a visible label tied to it, link help text and errors with aria-describedby, keep focus styles visible, support the keyboard, and set the right type and autocomplete attributes.",
    },
  ],
}

export default guide
