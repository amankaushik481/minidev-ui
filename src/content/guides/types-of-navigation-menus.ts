import type { Guide } from "../types"

const guide: Guide = {
  slug: "types-of-navigation-menus",
  title: "Types of Navigation Menus: Which One Your Site or App Needs",
  description:
    "Top navbar, mega menu, sidebar, tabs, breadcrumbs, pagination, command palette, dock and more: what each navigation pattern is for, with live React examples.",
  date: "2026-11-05",
  keywords: [
    "types of navigation menus",
    "navigation menu types",
    "website navigation types",
    "app navigation patterns",
    "sidebar vs top navigation",
    "navigation ui patterns",
  ],
  related: ["navigation-menu", "sidebar", "tabs", "breadcrumb", "command-palette", "pagination"],
  body: [
    {
      type: "tldr",
      items: [
        "**Marketing website?** A top navbar with 4 to 7 links. Add a mega menu only when one item hides 10 or more pages.",
        "**Web app or dashboard?** A sidebar for the main sections, tabs inside a page, breadcrumbs when pages nest more than two levels.",
        "**Lots of pages or actions?** Add a command palette (Cmd+K) so power users can jump anywhere by typing.",
        "**Phones?** A drawer or bottom bar for 3 to 5 destinations; never a desktop mega menu squeezed down.",
      ],
    },
    {
      type: "p",
      text: "Navigation decides whether people find the page they came for or leave. There is no single best menu: the right pattern depends on how many destinations you have, how deep they go, and whether visitors browse once or work in the product every day. This guide walks through the navigation types you will use in websites and apps, with **best for** and **avoid when** for each, and a live example of every pattern built with [MiniDev UI](/components/navigation).",
    },
    { type: "h2", text: "Navigation picker", id: "picker" },
    {
      type: "table",
      head: ["Situation", "Use", "Avoid"],
      rows: [
        ["Website with up to 7 sections", "[Top navbar](#top-navbar)", "Sidebar"],
        ["Website with a large product or resource catalogue", "[Mega menu](#mega-menu)", "Long dropdown lists"],
        ["App with 5 to 15 main sections", "[Sidebar](#sidebar)", "Top bar with overflow"],
        ["Several views of the same thing", "[Tabs](#tabs)", "Separate pages"],
        ["Pages nested three or more levels deep", "[Breadcrumbs](#breadcrumbs)", "Back buttons only"],
        ["Long lists and search results", "[Pagination](#pagination)", "Infinite scroll for data people return to"],
        ["Many pages and actions, frequent users", "[Command palette](#command-palette)", "Deeper menus"],
        ["Multi-step task", "[Stepper](#stepper)", "Tabs"],
        ["Actions on one item", "[Dropdown](#dropdown-menu) or [context menu](#context-menu)", "A row of buttons"],
        ["Desktop-style tool with many commands", "[Menubar](#menubar)", "A sidebar of actions"],
        ["A few shortcuts that should feel playful", "[Dock](#dock)", "Hiding core navigation in it"],
      ],
    },

    { type: "h2", text: "Global navigation: getting to the main sections", id: "global" },
    { type: "h3", text: "Top navbar", id: "top-navbar" },
    {
      type: "p",
      text: "A horizontal bar across the top of every page with the logo on the left, the main links in the middle and the call to action on the right. Visitors expect it on websites, so it costs them no effort to learn.",
    },
    {
      type: "p",
      text: "**Best for:** marketing sites, documentation, blogs and small products with up to about 7 top-level sections. **Avoid when:** you have more sections than fit on one line at laptop width; overflow menus hide the very items people look for. **Tip:** keep one primary button (Sign up, Book a call) and make every other item a plain link, so the next step is obvious.",
    },
    { type: "h3", text: "Mega menu", id: "mega-menu" },
    {
      type: "p",
      text: "A mega menu is a large panel that opens from a top-nav item and shows many links at once, grouped into columns, often with short descriptions or a featured item. It turns a deep catalogue into something people can scan in one look.",
    },
    {
      type: "p",
      text: "**Best for:** products with many features, solution pages for different industries, e-commerce categories, resource hubs. **Avoid when:** the menu would hold fewer than about 8 links; a plain dropdown or direct links are faster. **Tip:** open on click as well as hover, make it work with the keyboard, and give each group a heading so it scans.",
    },
    { type: "example", name: "navigation-menu", index: 0, caption: "A product menu that opens a grouped panel." },
    { type: "h3", text: "Sidebar", id: "sidebar" },
    {
      type: "p",
      text: "A vertical list of sections down the left edge, always visible, often grouped and collapsible. It holds far more items than a top bar and leaves the full width of the screen for content, which is why almost every SaaS dashboard uses one.",
    },
    {
      type: "p",
      text: "**Best for:** web apps, admin panels, dashboards, docs with many pages. **Avoid when:** it is a marketing site that visitors read once; a sidebar there feels like software, not a story. **Tip:** let it collapse to icons on smaller screens, show the active section clearly, and keep it to two levels.",
    },
    { type: "example", name: "sidebar", index: 2, caption: "Grouped sections with an active item." },
    { type: "h3", text: "Mobile drawer and bottom bar", id: "mobile" },
    {
      type: "p",
      text: "On phones the top navbar collapses into a menu button that opens a drawer, and apps often move their 3 to 5 most-used destinations into a bottom bar within thumb reach. The pattern is different from desktop on purpose: screens are small and thumbs are imprecise.",
    },
    {
      type: "p",
      text: "**Best for:** any site on small screens (drawer), and apps used daily on phones (bottom bar). **Avoid when:** you put more than 5 items in a bottom bar, or hide the single most important action behind the menu button. **Tip:** keep the call to action visible next to the menu button rather than inside the drawer.",
    },
    { type: "example", name: "drawer", index: 0 },

    { type: "h2", text: "Local navigation: moving within a section", id: "local" },
    { type: "h3", text: "Tabs", id: "tabs" },
    {
      type: "p",
      text: "Tabs switch between views of the same thing without leaving the page: Overview, Activity and Settings of one project, or Monthly and Yearly prices. Only one panel shows at a time.",
    },
    {
      type: "p",
      text: "**Best for:** 2 to 6 parallel views of one object, settings split into sections. **Avoid when:** the content is sequential (use a stepper), or users need to compare two tabs side by side. **Tip:** put the tab state in the URL so a view can be shared and the back button works.",
    },
    { type: "example", name: "tabs", index: 1, caption: "Line tabs with counts." },
    { type: "h3", text: "Breadcrumbs", id: "breadcrumbs" },
    {
      type: "p",
      text: "A breadcrumb trail shows where the current page sits in the hierarchy, such as Projects / Acme / Settings, with each level as a link. It answers where am I and gives a one-click way up.",
    },
    {
      type: "p",
      text: "**Best for:** apps and sites with three or more levels: docs, e-commerce categories, nested projects. **Avoid when:** the site is flat; a breadcrumb with one level is clutter. **Tip:** collapse the middle levels into an ellipsis on small screens, and add BreadcrumbList structured data so search results show the trail.",
    },
    { type: "example", name: "breadcrumb", index: 2, caption: "A breadcrumb inside a page header." },
    { type: "h3", text: "Pagination", id: "pagination" },
    {
      type: "p",
      text: "Pagination splits long lists into numbered pages with previous and next controls. It gives people a sense of how much there is and a stable place to come back to, page 3 stays page 3.",
    },
    {
      type: "p",
      text: "**Best for:** search results, tables, order histories, any list people return to or share. **Avoid when:** people browse a feed for fun and never come back to a position; infinite scroll suits that. **Tip:** show the result count, such as 41 to 60 of 312, so the size of the list is clear.",
    },
    { type: "example", name: "pagination", index: 1 },
    { type: "h3", text: "Stepper", id: "stepper" },
    {
      type: "p",
      text: "A stepper shows the steps of a task in order, which one you are on, and which are done. It turns a long form or setup into a sequence that feels finite.",
    },
    {
      type: "p",
      text: "**Best for:** onboarding, checkout, multi-page forms, setup wizards with 3 to 6 steps. **Avoid when:** the steps can be done in any order; use tabs or a checklist. **Tip:** let people go back to completed steps without losing what they entered.",
    },
    { type: "example", name: "stepper", index: 0 },

    { type: "h2", text: "Contextual navigation: actions and shortcuts", id: "contextual" },
    { type: "h3", text: "Command palette", id: "command-palette" },
    {
      type: "p",
      text: "A command palette is a search box that opens with Cmd+K or Ctrl+K and lets people jump to any page or run any action by typing a few letters. Linear, Vercel, GitHub and Slack all have one, and frequent users come to rely on it.",
    },
    {
      type: "p",
      text: "**Best for:** apps with many pages, settings and actions, and users who come back daily. **Avoid when:** it is the only way to reach something; the palette is a shortcut, the visible navigation must still exist. **Tip:** show recent items and the shortcut for each action, so the palette teaches the keyboard.",
    },
    { type: "example", name: "command-palette", index: 0 },
    { type: "h3", text: "Dropdown menu", id: "dropdown-menu" },
    {
      type: "p",
      text: "A dropdown menu opens a short list of actions from a button, usually the three-dot more button on a row or a user avatar. It keeps secondary actions out of the way until someone asks for them.",
    },
    {
      type: "p",
      text: "**Best for:** row actions in tables, account menus, overflow actions. **Avoid when:** the action is the main thing people do on that screen; give it a visible button. **Tip:** put destructive actions such as Delete last, separated by a divider and coloured red.",
    },
    { type: "example", name: "dropdown-menu", index: 0 },
    { type: "h3", text: "Context menu", id: "context-menu" },
    {
      type: "p",
      text: "A context menu opens on right-click (or long-press) with actions for the thing under the pointer. It is familiar from desktop software and file managers.",
    },
    {
      type: "p",
      text: "**Best for:** file browsers, canvases, editors and power-user tools. **Avoid when:** it is the only way to reach an action; many people never right-click on the web. Mirror the actions in a visible menu. **Tip:** keep the order identical to the visible menu so muscle memory transfers.",
    },
    { type: "example", name: "context-menu", index: 0 },
    { type: "h3", text: "Menubar", id: "menubar" },
    {
      type: "p",
      text: "A menubar is the File, Edit, View row from desktop applications: each word opens a menu of commands. Inside a web app it signals a serious tool with many commands.",
    },
    {
      type: "p",
      text: "**Best for:** editors, design tools, spreadsheets and IDE-like products. **Avoid when:** you are building a website or a simple app; it reads as dated and heavy. **Tip:** show keyboard shortcuts on the right of each item.",
    },
    { type: "example", name: "menubar", index: 0 },
    { type: "h3", text: "Dock", id: "dock" },
    {
      type: "p",
      text: "A dock is a row of icons that magnify as the pointer passes over them, borrowed from macOS. On the web it works as a floating shortcut bar on portfolios and landing pages.",
    },
    {
      type: "p",
      text: "**Best for:** personal sites, portfolios and playful product pages with a handful of links. **Avoid when:** it replaces labelled navigation in an app; icons without words slow people down. **Tip:** give every icon a tooltip and an accessible label.",
    },
    { type: "example", name: "dock", index: 0 },

    { type: "h2", text: "How to choose: three questions", id: "how-to-choose" },
    {
      type: "list",
      ordered: true,
      items: [
        "**How many destinations are there?** Up to 7: top navbar. 8 to 15: sidebar, or a top navbar with a mega menu on a website. More: sidebar plus search or a command palette.",
        "**How deep do they go?** One or two levels need nothing extra. Three or more need breadcrumbs, and tabs inside pages to keep each level shallow.",
        "**How often do people come back?** Visitors who come once need labels and obvious paths. Daily users want speed: keyboard shortcuts, a command palette, and a sidebar that remembers its state.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Test navigation with a five-second task: ask someone where they would click to find pricing, billing or a past invoice. If they hesitate, the label or the pattern is wrong, not the person.",
    },
    { type: "h2", text: "Accessibility checklist for any menu", id: "accessibility" },
    {
      type: "list",
      items: [
        "Wrap site navigation in a `nav` element with an `aria-label` when there is more than one.",
        "Mark the current page with `aria-current=\"page\"` and a visible style, not colour alone.",
        "Every menu opens and closes from the keyboard, Escape closes it, and focus returns to the button that opened it.",
        "Touch targets are at least 44 by 44 pixels on phones.",
        "Icon-only items have a text label for screen readers and a tooltip for everyone else.",
      ],
    },
    {
      type: "p",
      text: "Every pattern above is a free, MIT-licensed React component you can install with one command, for example `npx shadcn@latest add @minidev/sidebar`. For a full app layout, see [the shadcn sidebar layout guide](/guides/shadcn-sidebar-layout) and [the command palette guide](/guides/react-command-palette).",
    },
  ],
  faq: [
    {
      q: "What are the main types of navigation menus?",
      a: "Top navigation bars, mega menus, sidebars, mobile drawers and bottom bars for global navigation; tabs, breadcrumbs, pagination and steppers for moving within a section; and dropdown menus, context menus, menubars and command palettes for actions and shortcuts.",
    },
    {
      q: "Should I use a sidebar or a top navbar?",
      a: "Use a top navbar for websites with up to about 7 sections that people read once. Use a sidebar for apps and dashboards with more sections that people use every day; it holds more items and leaves the full width for content.",
    },
    {
      q: "When is a mega menu worth it?",
      a: "When one top-level item hides 10 or more pages, such as features, industries or product categories. Group the links under headings and make the panel work with both hover and click.",
    },
    {
      q: "Are breadcrumbs still useful?",
      a: "Yes, on any site or app three or more levels deep. They show where the page sits, give a one-click way up, and with BreadcrumbList structured data they can show in Google results.",
    },
    {
      q: "What is a command palette?",
      a: "A search box that opens with Cmd+K or Ctrl+K and lets people jump to any page or run any action by typing. It speeds up frequent users but should never be the only way to reach something.",
    },
    {
      q: "Pagination or infinite scroll?",
      a: "Pagination for lists people return to, share or need a position in, such as search results and tables. Infinite scroll for feeds that are browsed casually and never revisited.",
    },
  ],
}

export default guide
