import type { ComponentDocsContent } from "../types"

export const PART_11: Record<string, ComponentDocsContent> = {
  /* ── Navigation ─────────────────────────────────────────────────────────── */
  "animated-tabs": {
    faq: [
      {
        q: "How is AnimatedTabs different from Tabs?",
        a: "AnimatedTabs takes one `tabs` array of `{ id, label, content }` and selects a tab as soon as an arrow key reaches it. [`Tabs`](/docs/tabs) is built from parts on Base UI, where arrow keys only move focus until you press Enter or Space (unless you set `activateOnFocus`), and it supports vertical orientation and count badges.",
      },
      {
        q: "How do I control which tab is open?",
        a: "Pass `value` and `onValueChange`. `onValueChange` fires with the new `id` only when it differs from the current one. If `value` matches no tab, the first tab is shown instead of an empty panel.",
      },
      {
        q: "Why does a form in another tab lose what I typed?",
        a: "Only the active panel is rendered; switching tabs unmounts the old one. Keep the form state above AnimatedTabs, or use [`Tabs`](/docs/tabs) with `keepMounted` on `TabsContent`.",
      },
    ],
    keyboard: [
      { keys: "ArrowRight / ArrowLeft", action: "Moves focus to the next or previous tab and selects it. Wraps at both ends." },
      { keys: "Home / End", action: "Selects the first or last tab." },
      { keys: "Tab", action: "Moves focus from the selected tab into the panel." },
    ],
    a11y: [
      "The list has `role=\"tablist\"` and `aria-label` from `label` (default \"Sections\"). Each tab is a `<button role=\"tab\">` with `aria-selected` and `aria-controls`, and only the selected tab has `tabIndex={0}`.",
      "The panel has `role=\"tabpanel\"`, `aria-labelledby` pointing at its tab and `tabIndex={0}`, so keyboard users can reach text-only panels.",
      "With reduced motion the pill jumps instead of sliding, and the panel swaps with no slide, blur or delay.",
    ],
  },
  "back-link": {
    faq: [
      {
        q: "How do I use BackLink with the Next.js router?",
        a: "BackLink renders a plain `<a>`, so a click does a full page load. For client navigation pass `onClick={(e) => { e.preventDefault(); router.push(\"/invoices\") }}` and keep the real `href`, so middle-click and \"open in new tab\" still work.",
      },
      {
        q: "Can it go back in browser history instead of to a fixed URL?",
        a: "Yes, call `router.back()` (or `history.back()`) in `onClick` after `e.preventDefault()`. Keep `href` set to the parent page: someone who arrived from a search result or a shared link has no history to go back to.",
      },
    ],
    a11y: [
      "It is a real `<a href>`. The arrow is `aria-hidden`, so the accessible name is just the text: write `Invoices`, not `Back`, and screen reader users hear where it goes.",
      "Focus shows a 2px accent ring with a 2px offset. The arrow's hover nudge is a CSS transform, which the kit's stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },
  "back-to-top": {
    faq: [
      {
        q: "How do I use it inside a scrolling panel instead of the window?",
        a: "Pass a ref to the scrolling element as `target` and override the fixed position: `<BackToTop target={panelRef} className=\"absolute\" />`. Put it in a `relative` wrapper next to the scroller, not inside it, or it scrolls away with the content.",
      },
      {
        q: "Where does keyboard focus go after the jump?",
        a: "To the first `h1` or `h2` inside `target`; for the window, to `<main>`, or the first `<h1>` if there is no `<main>`. It adds `tabindex=\"-1\"` to that element if needed, so the next Tab starts from the top of the page instead of from the button.",
      },
      {
        q: "How do I change when the button appears?",
        a: "Set `threshold` in pixels; the default is 400. The ring shows how far the reader has scrolled through the whole page or `target`.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "Scrolls to the top and moves focus to the page's main content or first heading." },
      { keys: "Tab", action: "Reaches the button only after the page has scrolled past `threshold`. While hidden it has `tabIndex={-1}`." },
    ],
    a11y: [
      "The button is labelled \"Back to top\". While hidden it is `aria-hidden` and out of the tab order, so screen readers don't find an invisible control.",
      "The progress ring and arrow are `aria-hidden`; the scroll percentage is not announced.",
      "Under `prefers-reduced-motion: reduce` the scroll jumps instead of animating, and the fade and slide are cut by the kit's stylesheet.",
    ],
  },
  breadcrumb: {
    faq: [
      {
        q: "How do I collapse the middle of a long trail?",
        a: "Breadcrumb's `items` are `{ label, href }` with string labels, so it cannot hold a [`BreadcrumbEllipsis`](/docs/breadcrumb-ellipsis). Either pass only the first and last two levels, or build the trail by hand with the same `nav` and `ol` markup plus BreadcrumbEllipsis. Long trails otherwise wrap, and each label truncates.",
      },
      {
        q: "Can the last item be a link?",
        a: "No. The last item always renders as a `<span aria-current=\"page\">` and its `href` is ignored, because it is the page you are on.",
      },
      {
        q: "Does it add BreadcrumbList structured data for Google?",
        a: "No, it renders HTML only. Add a `BreadcrumbList` JSON-LD script yourself, built from the same `items` array so the two never disagree.",
      },
      {
        q: "How do I use Next.js Link for the crumbs?",
        a: "Each crumb is a plain `<a>`, so clicks do a full page load. The file is short: copy it and swap the `<a>` for `Link`, keeping the classes.",
      },
    ],
    a11y: [
      "Follows the WAI-ARIA breadcrumb pattern: a `<nav aria-label=\"Breadcrumb\">` around an ordered list, so screen readers announce the landmark and the number of levels.",
      "The chevron separators are `aria-hidden`, so they are not read between items.",
      "The last item has `aria-current=\"page\"` and is plain text, not a link to the current page.",
    ],
  },
  "breadcrumb-ellipsis": {
    faq: [
      {
        q: "How do I let people open the hidden levels?",
        a: "Wrap it in a [`DropdownMenu`](/docs/dropdown-menu) trigger and list the hidden pages as items: `<DropdownMenuTrigger aria-label=\"Show more pages\"><BreadcrumbEllipsis /></DropdownMenuTrigger>`. The trigger needs that `aria-label`, because the ellipsis itself is hidden from screen readers.",
      },
      {
        q: "Can I pass it to Breadcrumb's items?",
        a: "No. [`Breadcrumb`](/docs/breadcrumb) takes string labels only. Use BreadcrumbEllipsis in a trail you build yourself: a `<nav aria-label=\"Breadcrumb\">` with an `<ol>`, as in the examples on this page. The file has no `\"use client\"`, so it renders in Server Components too.",
      },
    ],
    a11y: [
      "The span has `role=\"presentation\"` and `aria-hidden`, so on its own it is invisible to screen readers. If the hidden levels matter, put it in a labelled button that opens them.",
      "It is a 24px square, so as a menu trigger it already meets the WCAG 2.2 minimum target size.",
    ],
  },
  "collapsible-sidebar": {
    faq: [
      {
        q: "How do I remember the collapsed state across page loads?",
        a: "Pass `collapsed` and `onCollapsedChange` and save the value. Use a cookie rather than `localStorage` if the page is server rendered, so the first paint already has the right width instead of jumping after hydration.",
      },
      {
        q: "Why do section titles still show in the collapsed rail?",
        a: "[`SidebarSection`](/docs/sidebar-section) does not hide its title when the sidebar collapses; only nav item labels become screen-reader only. With a controlled sidebar, pass `title={collapsed ? undefined : \"Workspace\"}`.",
      },
      {
        q: "Do collapsed icons show a tooltip?",
        a: "No. The labels stay readable by screen readers, but sighted users see only icons. Wrap each [`SidebarNavItem`](/docs/sidebar) in a [`Tooltip`](/docs/tooltip) if the icons are not obvious.",
      },
      {
        q: "What should I use on mobile?",
        a: "CollapsibleSidebar has no breakpoint behaviour. Hide it below `md` and show [`MobileNavDrawer`](/docs/mobile-nav-drawer) there instead.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the nav items, then to the collapse toggle, which comes after them in the DOM." },
      { keys: "Enter / Space", action: "On the toggle, collapses or expands the sidebar." },
    ],
    a11y: [
      "The toggle is labelled \"Toggle sidebar\" and has `aria-expanded` set to `true` while the sidebar is wide, following the APG disclosure pattern. Its `title` says what a press will do: \"Collapse sidebar\" or \"Expand sidebar\".",
      "When collapsed, [`SidebarNavItem`](/docs/sidebar) labels become `sr-only`, so every icon button keeps its name.",
      "The 224px to 56px width change is a CSS transition, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },
  "command-item": {
    faq: [
      {
        q: "Does CommandItem handle arrow keys or filtering?",
        a: "No. It is one `<button>`; `active` only changes its background. Track the highlighted index and keys in the parent, or use [`CommandPalette`](/docs/command-palette), which has search, arrow keys and Enter built in.",
      },
      {
        q: "What is the difference between onSelect and onClick?",
        a: "Both run on a click, `onClick` first and then `onSelect`. Enter and Space on a native button fire a click, so both run from the keyboard too. `onSelect` takes no event, which keeps call sites short: `onSelect={createInvoice}`.",
      },
      {
        q: "Does the shortcut prop register the key?",
        a: "No. `shortcut` only renders the hint in a `<kbd>`. Bind the key yourself, for example with a `keydown` listener on `window`.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the next row. Every CommandItem is its own tab stop." },
      { keys: "Enter / Space", action: "Runs `onClick` and then `onSelect`." },
    ],
    a11y: [
      "Renders a native `<button type=\"button\">`, so `disabled` removes it from the tab order and it never submits a form.",
      "The icon is `aria-hidden`. The `shortcut` text is inside the button, so it becomes part of the name, for example \"New invoice ⌘N\".",
      "`active` sets `data-active` only. If you build a listbox from these rows, add `role=\"option\"` and `aria-selected` yourself.",
    ],
  },
  "command-palette": {
    faq: [
      {
        q: "How do I open it from my own button or shortcut?",
        a: "Pass `open` and `onOpenChange`. In controlled mode the palette renders no trigger and does not listen for ⌘K, so you decide what opens it. `onOpenChange(false)` fires on Escape, an outside click and after a command runs.",
      },
      {
        q: "How does the search match commands?",
        a: "It keeps every command whose `label` or one of its `keywords` contains the typed text, ignoring case. There is no fuzzy matching or ranking, so results stay in the order of your `commands` array.",
      },
      {
        q: "Why doesn't ⌘K open it?",
        a: "Only an uncontrolled palette listens for ⌘K / Ctrl+K, and it ignores the key if another handler already called `preventDefault()`. If your app has its own ⌘K, control the palette with `open` instead.",
      },
      {
        q: "Can I group commands or show icons?",
        a: "No. Commands are a flat list of `{ id, label, keywords, shortcut, onSelect }` and rows show the label and shortcut only. For a custom layout, build the list from [`CommandItem`](/docs/command-item) rows.",
      },
    ],
    keyboard: [
      { keys: "Meta+K / Ctrl+K", action: "Opens or closes the palette when it is uncontrolled." },
      { keys: "ArrowDown / ArrowUp", action: "Moves the highlight through the results, wrapping at both ends." },
      { keys: "Home / End", action: "Jumps to the first or last result." },
      { keys: "Enter", action: "Runs the highlighted command and closes the palette." },
      { keys: "Escape", action: "Closes the palette and returns focus to what opened it." },
    ],
    a11y: [
      "Follows the APG combobox pattern: the input has `role=\"combobox\"`, `aria-label=\"Command search\"`, `aria-controls` pointing at the list and `aria-activedescendant` set to the highlighted option. Focus never leaves the input.",
      "The list is a `role=\"listbox\"` labelled \"Commands\", and each row is a `role=\"option\"` with `aria-selected` on the highlighted one.",
      "The dialog is named by a visually hidden \"Command palette\" title. The \"No commands\" message has `role=\"status\"`.",
    ],
  },
  "floating-nav": {
    faq: [
      {
        q: "How do I change when the header tucks into the pill?",
        a: "It tucks once the window has scrolled more than 40px; the number is in the `useMotionValueEvent` call. It reads window scroll only, so inside a scrolling `div` it never tucks.",
      },
      {
        q: "Why does the CTA do nothing?",
        a: "The default `cta` is `{ label: \"Start free\" }` with no `href` or `onClick`. Pass `href` to render it as a link, or `onClick` for a button. Pass `secondary={null}` to remove the Sign in link.",
      },
      {
        q: "Is the mobile menu a dialog?",
        a: "No. Below `md` it is a disclosure panel under the bar: it does not trap focus or lock page scroll. Escape closes it and returns focus to the menu button, and choosing a link closes it.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the brand, the links and the buttons. On desktop the hover highlight follows focus." },
      { keys: "Enter / Space", action: "On the menu button (below `md`), opens or closes the link panel." },
      { keys: "Escape", action: "Closes the open mobile panel and returns focus to the menu button." },
    ],
    a11y: [
      "The bar is a `<nav aria-label=\"Main\">`; the mobile panel is a second `<nav aria-label=\"Main menu\">` whose id the toggle references with `aria-controls`.",
      "The menu button's label switches between \"Open menu\" and \"Close menu\", with `aria-expanded` to match.",
      "With reduced motion the pill and hover highlight change without a spring, and the mobile panel appears without the scale and slide.",
    ],
  },
  "footer-nav": {
    faq: [
      {
        q: "Can the brand be a logo or a link?",
        a: "No. `brand` is a string rendered in a `<p>`. For a logo, edit that line in the file, or use [`FooterMega`](/docs/footer-mega) for a fuller marketing footer.",
      },
      {
        q: "How do I open a link in a new tab?",
        a: "A footer link is `{ label, href }` with no `target`, so every link opens in the same tab. Add a `target` field to the type and pass it to [`Link`](/docs/link), which then adds `rel=\"noopener noreferrer\"` for you.",
      },
    ],
    a11y: [
      "Renders a `<footer>`, which is the page's `contentinfo` landmark when it is not inside an `article`, `aside`, `main`, `nav` or `section`.",
      "The links sit in a `<nav aria-label=\"Footer\">`, so screen readers can tell it apart from the main navigation.",
      "Each link is a [`Link`](/docs/link), so keyboard focus shows its 2px accent ring with a 2px offset.",
    ],
  },
  link: {
    faq: [
      {
        q: "How do I use it with Next.js Link?",
        a: "Link renders a plain `<a>` and has no `render` prop. For client-side routing put the same classes on `next/link`: `rounded-sm text-sm font-medium text-accent-fg underline-offset-4 hover:underline`, plus the focus ring classes from the file.",
      },
      {
        q: "Does it add rel=\"noopener\" for external links?",
        a: "Yes. With `target=\"_blank\"` it sets `rel=\"noopener noreferrer\"`, unless you pass your own `rel`.",
      },
      {
        q: "Why is the link smaller than the paragraph around it?",
        a: "Link sets `text-sm font-medium`. Inside larger body text pass the size you need, for example `className=\"text-base\"`; tailwind-merge drops the default.",
      },
    ],
    a11y: [
      "At rest the link is marked by colour only and underlines on hover. Inside a paragraph, add `className=\"underline\"` so it doesn't rely on colour alone (WCAG 1.4.1).",
      "Keyboard focus shows a 2px accent ring with a 2px offset; mouse clicks don't show it.",
      "It is a native `<a>`, so it opens in a new tab with middle-click and reads as a link to screen readers. Use [`Button`](/docs/button) for actions that don't navigate.",
    ],
  },
  menubar: {
    faq: [
      {
        q: "Why can't I scroll the page while a menu is open?",
        a: "Base UI's Menubar is `modal` by default: page scroll is locked and outside clicks are blocked while a menu is open. Pass `modal={false}` to `Menubar` to allow both.",
      },
      {
        q: "How do I run an action from an item?",
        a: "Pass `onClick` to `MenubarItem`. The menu closes after the click by default; pass `closeOnClick={false}` for items that should keep it open.",
      },
      {
        q: "Are submenus and checkbox items included?",
        a: "Not in this file, which wraps Menu, Trigger, Content, Item, Separator and Shortcut. Import `Menu.SubmenuRoot`, `Menu.CheckboxItem` or `Menu.RadioItem` from `@base-ui/react/menu` and give them the `MenubarItem` classes, or copy the styled parts from [`DropdownMenu`](/docs/dropdown-menu).",
      },
      {
        q: "Does MenubarShortcut make the shortcut work?",
        a: "No, it is a visual hint only. Register the key yourself and call the same function as the item's `onClick`.",
      },
    ],
    keyboard: [
      { keys: "ArrowRight / ArrowLeft", action: "Moves between menu triggers. If a menu is open, the neighbouring menu opens instead. Wraps at both ends." },
      { keys: "Enter / Space / ArrowDown", action: "On a trigger, opens its menu and focuses the first item." },
      { keys: "ArrowDown / ArrowUp", action: "Moves through the items of the open menu." },
      { keys: "Enter / Space", action: "On an item, activates it and closes the menu." },
      { keys: "Escape", action: "Closes the menu and returns focus to its trigger." },
    ],
    a11y: [
      "Base UI renders the bar with `role=\"menubar\"`, each trigger with `role=\"menuitem\"`, `aria-haspopup` and `aria-expanded`, and each item as a `menuitem`.",
      "Typing a letter in an open menu jumps to the next item that starts with it.",
      "The open and close animations are CSS, so the kit's stylesheet cuts them to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },
  "mobile-nav-drawer": {
    faq: [
      {
        q: "Does it work outside Next.js?",
        a: "Not as is: the links render with `next/link`. In Vite, Remix or plain React, change that import to your router's link, or to a plain `<a>`.",
      },
      {
        q: "How do I highlight the current page?",
        a: "Links are `{ href, label }` and get no `aria-current`. In the file, compare each `href` with `usePathname()` and add `aria-current=\"page\"` plus an active class to the match.",
      },
      {
        q: "How do I show it only on small screens?",
        a: "Pass `className=\"md:hidden\"`; it applies to the wrapper around the menu button. Show your desktop links with `hidden md:flex` at the same breakpoint.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the menu button, opens the drawer." },
      { keys: "Tab / Shift+Tab", action: "Moves between the close button and the links. Focus stays inside the drawer." },
      { keys: "Escape", action: "Closes the drawer and returns focus to the menu button." },
    ],
    a11y: [
      "The menu button is labelled \"Open menu\" and has `aria-haspopup=\"dialog\"` and `aria-expanded`.",
      "The drawer is a [`Sheet`](/docs/sheet) (Base UI Dialog): the page behind it is inert and scroll-locked, and its accessible name is `brand`.",
      "The links sit in a `<nav aria-label=\"Main\">`, and following one closes the drawer.",
    ],
  },
  "navigation-menu": {
    faq: [
      {
        q: "Why does the panel stay open after I click a link?",
        a: "`NavigationMenuLink` has `closeOnClick` set to `false` by default. With client-side routing the page changes but the panel stays open, so pass `closeOnClick` to links inside panels.",
      },
      {
        q: "Why does nothing appear when a trigger opens?",
        a: "Panels render into `NavigationMenuViewport`, so render it once inside `NavigationMenu`, after `NavigationMenuList`.",
      },
      {
        q: "How do I use Next.js Link and mark the current page?",
        a: "Pass the router link as `render`: `<NavigationMenuLink render={<Link href=\"/pricing\" />} active={pathname === \"/pricing\"}>Pricing</NavigationMenuLink>`. `active` adds `aria-current=\"page\"` and the sunken background.",
      },
      {
        q: "What about mobile?",
        a: "NavigationMenu has no small-screen layout. Hide it below `md` and show [`MobileNavDrawer`](/docs/mobile-nav-drawer) there instead.",
      },
    ],
    keyboard: [
      { keys: "ArrowRight / ArrowLeft", action: "Moves focus between the top-level triggers and links." },
      { keys: "Enter / Space / ArrowDown", action: "On a trigger, opens its panel." },
      { keys: "Tab", action: "Moves from an open trigger into its panel's links." },
      { keys: "Escape", action: "Closes the panel and returns focus to its trigger." },
    ],
    a11y: [
      "The root renders a `<nav>`. Add `aria-label` to it if the page has more than one navigation landmark.",
      "Triggers get `aria-expanded` and, while open, `aria-controls` pointing at the panel. Hover opens after a 50ms `delay`, so moving the pointer across the bar doesn't flash panels.",
      "The panel's fade and scale are CSS transitions, cut to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },
  "nested-nav": {
    faq: [
      {
        q: "Can groups start collapsed?",
        a: "No. Every group starts open, and the open state lives inside each item, so it resets when NestedNav unmounts. To start closed, change `React.useState(true)` in `NestedNavItem`.",
      },
      {
        q: "How do I use it with Next.js routing?",
        a: "A leaf with `href` is a plain `<a>`, which does a full page load. Either swap that `<a>` for `Link` in the file, or leave `href` off and call `router.push` in `onSelect`; the leaf then becomes a button, which loses middle-click.",
      },
      {
        q: "Does it support arrow keys?",
        a: "No. Every row is a tab stop and Tab moves between them. For arrow keys, a single tab stop and selection, use [`TreeView`](/docs/tree-view).",
      },
    ],
    keyboard: [
      { keys: "Tab / Shift+Tab", action: "Moves between visible rows." },
      { keys: "Enter / Space", action: "On a group, opens or closes it. On a leaf button, calls `onSelect`." },
      { keys: "Enter", action: "On a leaf link, follows it." },
    ],
    a11y: [
      "Groups are `<button>`s with `aria-expanded`. The node whose `id` equals `activeId` gets `aria-current=\"page\"`.",
      "Nesting is real: each group's children are a nested `<ul>`, so screen readers announce list depth. The root is a `<ul>`, not a landmark, so wrap it in `<nav aria-label=\"Settings\">`.",
      "The chevron is `aria-hidden`, and its rotation is a CSS transition cut under `prefers-reduced-motion: reduce`.",
    ],
  },
  "org-switcher": {
    faq: [
      {
        q: "How do I switch the workspace when someone picks an org?",
        a: "Handle `onChange`, which receives the org `id`: `onChange={(id) => router.push(\"/\" + id + \"/dashboard\")}`. Pass `value` from your session so the trigger always shows the org the page belongs to.",
      },
      {
        q: "Can I add a \"Create organization\" item?",
        a: "There is no slot for it. Add a button after the `orgs.map` in the file, separated by a border, and call your create flow from it.",
      },
      {
        q: "Does it search when someone belongs to many orgs?",
        a: "No. It lists every org with no search or arrow keys, which suits a handful. For dozens, use [`Combobox`](/docs/combobox).",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the trigger, opens the list and moves focus into it." },
      { keys: "Tab / Shift+Tab", action: "Moves between the orgs in the open list." },
      { keys: "Enter / Space", action: "On an org, selects it, closes the list and returns focus to the trigger." },
      { keys: "Escape", action: "Closes the list without changing the org." },
    ],
    a11y: [
      "The trigger's accessible name is \"Northwind, switch organization\", so screen readers hear both the current org and what the button does.",
      "The current org's button has `aria-current=\"true\"`. The check icon is `aria-hidden`, so screen readers get the state from that attribute.",
      "Opening the list moves focus to the first org, not the current one. Closing it returns focus to the trigger.",
    ],
  },
  pagination: {
    faq: [
      {
        q: "Can Google follow these page links?",
        a: "No. Pagination renders buttons, not links, so crawlers can't reach page 2. For crawlable lists, render `<a href=\"?page=2\">` links with the same classes, or make sure every item is reachable from a sitemap.",
      },
      {
        q: "How do I keep the page in the URL?",
        a: "Pagination is controlled: read `page` from `searchParams` and push the new value in `onPageChange`, for example `onPageChange={(p) => router.push(\"?page=\" + p)}`. Pages are 1-based.",
      },
      {
        q: "How many page numbers does it show?",
        a: "Always seven slots once `pageCount` is over 7: the first and last page, the current page with one neighbour on each side, and ellipses for the gaps. The width never changes as you page. The window size is fixed in `pageSlots`.",
      },
    ],
    keyboard: [
      { keys: "Tab / Shift+Tab", action: "Moves between Previous, the page numbers and Next. A disabled Previous or Next is skipped." },
      { keys: "Enter / Space", action: "Goes to that page." },
    ],
    a11y: [
      "Wrapped in `<nav aria-label=\"Pagination\">`. Each number is labelled \"Page 4\" and the current one has `aria-current=\"page\"`.",
      "Previous and Next keep `aria-label=\"Previous page\"` and `\"Next page\"`; below `sm` their visible text becomes `sr-only` and only the chevron shows.",
      "Ellipses are `aria-hidden`, and the numbers use `tabular-nums` so the bar doesn't shift.",
    ],
  },
  "scroll-progress-rail": {
    faq: [
      {
        q: "Can it track a scrolling container instead of the page?",
        a: "No. It calls `useScroll()` with no target, so it measures the whole document. Use it on pages that scroll the window.",
      },
      {
        q: "Do the labels highlight the current section?",
        a: "No. Labels are plain text, or in-page links when you pass `{ label, href }`. For a list that follows the reader, use [`TableOfContents`](/docs/table-of-contents).",
      },
      {
        q: "It overlaps my sticky header. How do I move it down?",
        a: "The rail is `sticky top-0 z-50`. Pass the header's height as an offset, for example `className=\"top-14\"`.",
      },
    ],
    a11y: [
      "The progress bar is `aria-hidden`; the scroll position is not announced.",
      "With `{ label, href }` items the row is a `<nav aria-label=\"Sections\">` of links. With plain strings it is a `<div>`, so it isn't announced as navigation.",
      "With reduced motion the bar follows the scroll position exactly instead of easing behind it on a spring.",
    ],
  },
  "search-results-page": {
    faq: [
      {
        q: "How do I connect it to my search API?",
        a: "The block searches a hard-coded `INDEX` and only takes `defaultQuery` and `className`. Copy it, replace the `INDEX.filter` line with results from your API, and debounce the request.",
      },
      {
        q: "Which matches are highlighted?",
        a: "The first case-insensitive match in each result's title and detail line, wrapped in a `<mark>`. Later matches in the same line are not marked.",
      },
    ],
    a11y: [
      "The field sits in a `role=\"search\"` landmark and is labelled \"Search customers, invoices and reports\".",
      "The result count is an `aria-live=\"polite\"` paragraph, so \"3 results for “northwind”\" is announced as you type.",
      "Each result is a single link, with the type shown as a [`Badge`](/docs/badge) inside it.",
    ],
  },
  sidebar: {
    faq: [
      {
        q: "Can a SidebarNavItem be a link?",
        a: "No. It always renders a `<button>`, so navigating from `onClick` loses middle-click and \"open in new tab\". For page links, change the `<button>` in the file to your router's `Link` and keep the classes.",
      },
      {
        q: "Why doesn't the sidebar fill the screen height?",
        a: "It is `h-full`, so its parent needs a height. Put it in a `flex h-dvh` row, or use [`AppShell`](/docs/app-shell).",
      },
      {
        q: "How do I add a collapse button?",
        a: "Sidebar only takes `collapsed`. [`CollapsibleSidebar`](/docs/collapsible-sidebar) adds the edge toggle and keeps the state for you.",
      },
    ],
    a11y: [
      "Sidebar renders an `<aside>`, a complementary landmark. Put your items in a `<nav aria-label=\"Main\">` inside it.",
      "`active` sets `aria-current=\"page\"` on the item unless you pass your own `aria-current`.",
      "When `collapsed`, each label becomes `sr-only`, so icon-only items still have names.",
    ],
  },
  "sidebar-section": {
    faq: [
      {
        q: "What happens to the title when the sidebar collapses?",
        a: "Inside a collapsed [`Sidebar`](/docs/sidebar) the title becomes screen-reader only, like the nav item labels. The 56px rail shows only icons, and the group keeps its name.",
      },
      {
        q: "Can a section collapse?",
        a: "No, it is a static group. For groups that open and close use [`NestedNav`](/docs/nested-nav), or wrap the items in a [`Collapsible`](/docs/collapsible).",
      },
    ],
    a11y: [
      "With a `title`, the wrapper has `role=\"group\"` and `aria-labelledby` pointing at the title, so screen readers announce \"Workspace, group\" on entering it.",
      "Without a `title` it is a plain `div` with no role.",
      "In a collapsed Sidebar the title is `sr-only`, so the group is still named while only icons show.",
      "The title is uppercase through CSS only, so screen readers read it in its normal case.",
    ],
  },
  "skip-link": {
    faq: [
      {
        q: "Why doesn't focus move into the main content?",
        a: "The target needs a matching `id` and `tabIndex={-1}`: `<main id=\"main\" tabIndex={-1}>`. Without `tabIndex` the page scrolls, but `<main>` can't take focus, so screen readers stay on the link.",
      },
      {
        q: "Where do I put it in a Next.js app?",
        a: "As the first child of `<body>` in `app/layout.tsx`, before the header. It has no state, so a Server Component layout can render it.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "On page load, the first Tab reveals the link at the top left." },
      { keys: "Enter", action: "Jumps past the header to the element with the matching `id`." },
    ],
    a11y: [
      "It is `sr-only` until it receives focus, then fixed at the top left with `z-[100]`, above sticky headers.",
      "It is a plain `<a href=\"#main\">`, so it works before JavaScript loads.",
      "This meets WCAG 2.4.1 (Bypass Blocks) when the header has several links before the main content.",
    ],
  },
  "table-of-contents": {
    faq: [
      {
        q: "How do I use it with MDX or a CMS?",
        a: "Pass `selector` for the article container, for example `selector=\"#doc\"`. After mount it reads the `h2` and `h3` elements and gives any heading without an id one made from its text. Headings added later are not picked up; pass `items` if your content loads afterwards.",
      },
      {
        q: "My sticky header covers the heading after a click. How do I fix it?",
        a: "Set `offset` to the header height plus a little space, for example `offset={80}`. It shifts both the scroll target and the point where a heading counts as reached. The default is 24.",
      },
      {
        q: "Why does it show an article when I render it with no props?",
        a: "With neither `items` nor `selector` it renders a demo article in a scroll box, so the spy can be seen working. Pass one of them in your app.",
      },
    ],
    keyboard: [
      { keys: "Tab / Shift+Tab", action: "Moves between the entries." },
      { keys: "Enter", action: "Scrolls to the heading and moves focus to it." },
    ],
    a11y: [
      "A `<nav>` named by `title` (\"On this page\"), or \"Table of contents\" when `title` is empty. The current entry has `aria-current=\"location\"`.",
      "After a click the heading gets `tabindex=\"-1\"` and focus, so the next Tab continues from that section, not from the list.",
      "With reduced motion the scroll jumps and the marker moves without a spring. The marker is `aria-hidden`.",
    ],
  },
  tabs: {
    faq: [
      {
        q: "Why don't the arrow keys switch the panel?",
        a: "Base UI moves focus with the arrow keys and selects on Enter or Space. To select as focus moves, add `activateOnFocus` to `TabsList`.",
      },
      {
        q: "How do I keep a panel's content mounted when it is hidden?",
        a: "Add `keepMounted` to that `TabsContent`. Otherwise an inactive panel is removed from the DOM, and any unsaved input inside it is lost.",
      },
      {
        q: "How do I make vertical tabs?",
        a: "Set `orientation=\"vertical\"` on `Tabs`. The list stacks, Up and Down arrows move between tabs, and the `line` underline moves to the right edge. For a settings page with the list beside the panel, [`VerticalTabs`](/docs/vertical-tabs) has that layout built in.",
      },
      {
        q: "How do I show a count on a tab?",
        a: "Pass `badge`: `<TabsTrigger value=\"invoices\" badge={12}>Invoices</TabsTrigger>`. The badge uses the accent colour on the active tab.",
      },
    ],
    keyboard: [
      { keys: "ArrowRight / ArrowLeft", action: "Moves focus to the next or previous tab, wrapping at the ends. Use ArrowDown and ArrowUp when `orientation=\"vertical\"`." },
      { keys: "Home / End", action: "Moves focus to the first or last tab." },
      { keys: "Enter / Space", action: "Selects the focused tab." },
      { keys: "Tab", action: "Moves focus from the tab list into the active panel." },
    ],
    a11y: [
      "Base UI renders `role=\"tablist\"`, `role=\"tab\"` with `aria-selected` and `aria-controls`, and `role=\"tabpanel\"` with `aria-labelledby`, and keeps one tab stop in the list.",
      "The badge sits inside the tab, so its text is part of the name: \"Invoices 12\".",
      "The thumb or underline is `aria-hidden`. With reduced motion it jumps to the new tab without the spring.",
    ],
  },
  toc: {
    faq: [
      {
        q: "How do I highlight the section being read?",
        a: "Pass `activeId` from your own scroll spy, for example an `IntersectionObserver` on the headings. Without it, the last clicked entry stays highlighted. [`TableOfContents`](/docs/table-of-contents) has the spy built in.",
      },
      {
        q: "Does it scroll smoothly?",
        a: "No. Entries are plain `#id` links, so the browser jumps and updates the URL hash. Add `scroll-behavior: smooth` on `html` (and turn it off for reduced motion) if you want smooth scrolling.",
      },
    ],
    a11y: [
      "Wrapped in `<nav aria-label=\"Table of contents\">`. The current entry has `aria-current=\"location\"`.",
      "Entries sit directly in the `nav`, not in a list, so screen readers don't announce how many there are.",
      "Levels 2 and 3 are shown by indentation only; screen readers hear a flat list of links.",
    ],
  },
  topbar: {
    faq: [
      {
        q: "How do I put breadcrumbs or an org switcher on the left?",
        a: "Pass them as `left`, which replaces the title: `left={<Breadcrumb items={trail} />}`.",
      },
      {
        q: "How do I keep it at the top while the page scrolls?",
        a: "Pass `className=\"sticky top-0 z-30\"`. In an [`AppShell`](/docs/app-shell) with a fixed height, such as `className=\"h-dvh\"`, only the content area scrolls, so the Topbar stays put without it.",
      },
      {
        q: "Where does the mobile menu button go?",
        a: "In `left`, before the title: `left={<><MobileNavDrawer className=\"md:hidden\" /><span>Invoices</span></>}`.",
      },
    ],
    a11y: [
      "Renders a `<header>`. It is the page's `banner` landmark only when it is not inside `main`, `article`, `aside`, `nav` or `section`.",
      "The `title` renders in a `<p>`, not a heading. Keep an `h1` in the page content, or pass `left={<h1 className=\"text-sm font-medium\">Invoices</h1>}`.",
    ],
  },
  "tree-view": {
    faq: [
      {
        q: "Can I control which branches are open?",
        a: "Only at first render, with `defaultExpanded`. There is no controlled expanded prop or change callback. Omit `defaultExpanded` and every branch starts open; nodes added later also start open.",
      },
      {
        q: "Does it support multiple selection or checkboxes?",
        a: "No. One node is selected at a time: pass `selectedId` to control it, and read changes from `onSelect`.",
      },
      {
        q: "Can I load children lazily or show file icons?",
        a: "No. A node is a branch only if it has a non-empty `children` array, and rows show a label only. For files with icons and status use [`FileTree`](/docs/file-tree).",
      },
    ],
    keyboard: [
      { keys: "ArrowDown / ArrowUp", action: "Moves focus to the next or previous visible node." },
      { keys: "ArrowRight", action: "Opens a closed branch, or moves to the first child of an open one." },
      { keys: "ArrowLeft", action: "Closes an open branch, or moves to the parent." },
      { keys: "Home / End", action: "Moves to the first or last visible node." },
      { keys: "Enter / Space", action: "Selects the node and opens or closes it if it is a branch." },
    ],
    a11y: [
      "Follows the WAI-ARIA tree pattern: `role=\"tree\"` with `treeitem` rows carrying `aria-level`, `aria-setsize`, `aria-posinset`, `aria-expanded` on branches and `aria-selected`.",
      "One tab stop: the focused node, else the selected one, else the first. Arrow keys move focus between rows.",
      "The tree's name defaults to \"Tree\". Pass a real one, such as `aria-label=\"Project files\"`.",
      "There is no type-ahead: typing a letter does not jump to a node.",
    ],
  },
  "vertical-tabs": {
    faq: [
      {
        q: "How do I control the selected tab?",
        a: "Pass `value` and `onChange`. `onChange` fires on every selection, including a click on the tab that is already selected and every arrow key press.",
      },
      {
        q: "What happens on phones?",
        a: "Below `md` the tab list stacks above the panel as a full-width column. From `md` up it is a 180px column beside the panel.",
      },
      {
        q: "Are hidden panels kept mounted?",
        a: "No, only the selected tab's `content` is rendered. Keep unsaved form state above VerticalTabs if people switch tabs mid-edit.",
      },
    ],
    keyboard: [
      { keys: "ArrowDown / ArrowRight", action: "Selects the next tab, wrapping to the first." },
      { keys: "ArrowUp / ArrowLeft", action: "Selects the previous tab, wrapping to the last." },
      { keys: "Home / End", action: "Selects the first or last tab." },
      { keys: "Tab", action: "Moves focus from the selected tab into the panel." },
    ],
    a11y: [
      "The list has `role=\"tablist\"`, `aria-orientation=\"vertical\"` and `aria-label` (default \"Settings sections\"). Tabs have `aria-selected`, `aria-controls` and one tab stop.",
      "Arrow keys select as they move (automatic activation), so the panel changes with focus.",
      "The panel has `role=\"tabpanel\"`, `aria-labelledby` pointing at the selected tab and `tabIndex={0}`.",
    ],
  },

  /* ── Dashboard ──────────────────────────────────────────────────────────── */
  "account-setup-progress": {
    faq: [
      {
        q: "How do I hide it once setup is finished?",
        a: "It keeps showing at 100%. Render it conditionally: `{done < total ? <AccountSetupProgress stepsDone={done} stepsTotal={total} /> : null}`.",
      },
      {
        q: "How is it different from OnboardingChecklist?",
        a: "AccountSetupProgress shows a count, a bar and one line about the next step. [`OnboardingChecklist`](/docs/onboarding-checklist) lists every task as a checkbox people can tick.",
      },
    ],
    a11y: [
      "The bar is a [`Progress`](/docs/progress) labelled by the title through `aria-labelledby`, with the value text \"2 of 4 steps done\" instead of a bare percentage.",
      "`stepsDone` is clamped between 0 and `stepsTotal`, and a total of 0 reads as 0%.",
    ],
  },
  "activity-feed": {
    faq: [
      {
        q: "Can I show avatar images instead of initials?",
        a: "No. Each avatar shows initials from the first two words of `user`. To show photos, add an `avatarUrl` field and an `AvatarImage` in the file.",
      },
      {
        q: "What does it show with no items?",
        a: "An empty bordered box. Check the length first and render an [`EmptyState`](/docs/empty-state) instead.",
      },
      {
        q: "Can rows link to the thing that changed?",
        a: "Not as is. `action` is a string and each row is plain text, so add an `href` field to the item type and wrap the row in an `<a>` in the file.",
      },
    ],
    a11y: [
      "The feed has `role=\"list\"` and each row `role=\"listitem\"`, so screen readers announce the number of events.",
      "The initials are `aria-hidden`, so each name is read once, followed by the action and the time.",
      "`time` is plain text, not a `<time>` element, so there is no machine-readable date.",
    ],
  },
  "admin-console": {
    faq: [
      {
        q: "How do I connect it to my data?",
        a: "It only takes `className`; every value is sample data. Copy the block and feed each part its own props: [`AdminStatStrip`](/docs/admin-stat-strip) `stats`, [`ResourceQuotaGrid`](/docs/resource-quota-grid) `items`, [`OrgSwitcher`](/docs/org-switcher) `orgs` and `value`.",
      },
      {
        q: "How do I remove a tab or the impersonation banner?",
        a: "Delete the matching `TabsTrigger` and `TabsContent` pair. The [`ImpersonationBanner`](/docs/impersonation-banner) always shows in the sample; render it only while an impersonation session is active.",
      },
    ],
    a11y: [
      "The sections use [`Tabs`](/docs/tabs): arrow keys move between Users, Security, Quotas and Import, and Enter or Space opens one.",
      "The KPIs are a description list, so each label is read with its value.",
      "The org switcher's name includes the current org: \"Halcyon Health, switch organization\".",
    ],
  },
  "admin-overview": {
    faq: [
      {
        q: "Why is the drop in failed sign-ins shown in red?",
        a: "[`AdminStatStrip`](/docs/admin-stat-strip) colours every negative delta red and has no `invert` option. For metrics where down is good, swap it for [`KpiRow`](/docs/kpi-row) and set `invert` on those items.",
      },
      {
        q: "How do I use my own data?",
        a: "The only props are `onInvite` and `className`. Copy the block and pass your numbers to `AdminStatStrip` and your events to [`ActivityFeed`](/docs/activity-feed).",
      },
    ],
    a11y: [
      "The page title comes from [`PageHeader`](/docs/page-header), and the activity list is a `section` labelled by its \"Recent admin activity\" `h2`.",
      "The KPIs are a `<dl>`, so each label is paired with its value.",
    ],
  },
  "admin-stat-strip": {
    faq: [
      {
        q: "How do I show a drop as good news?",
        a: "Set `invert: true` on that stat, for example `{ label: \"Failed sign-ins\", value: \"14\", delta: -22, invert: true }`. A fall then shows green and a rise red.",
      },
      {
        q: "Can the delta be something other than a percent?",
        a: "No. `delta` is a number rendered as an absolute percent with an arrow. For text such as \"14 invoices\" use [`KpiRow`](/docs/kpi-row), whose `delta` also takes a string.",
      },
    ],
    a11y: [
      "Marked up as a `<dl>`: each label is a `<dt>` and each value a `<dd>`, so screen readers pair them.",
      "The delta arrow is `aria-hidden`. The direction is read as a word before the number, so it isn't carried by red and green alone.",
    ],
  },
  "analytics-page": {
    faq: [
      {
        q: "How do I use my own numbers?",
        a: "It only takes `className`. Copy the block, pass your KPIs to [`AdminStatStrip`](/docs/admin-stat-strip) and your series to [`BarChart`](/docs/bar-chart) `data`. [`InteractiveAreaChart`](/docs/interactive-area-chart) is rendered without props here, so it shows its sample data until you pass yours.",
      },
    ],
    keyboard: [
      { keys: "ArrowLeft / ArrowRight", action: "On the revenue chart, moves to the previous or next period and updates the figure above it." },
      { keys: "Home / End", action: "On the revenue chart, jumps to the first or last period." },
    ],
    a11y: [
      "The revenue chart is a focusable `role=\"slider\"` whose value text reads the period and its value as you move.",
      "The bar chart is labelled \"Trial starts by week\", followed by every week and its value for screen readers.",
      "Each chart sits in a [`ChartCard`](/docs/chart-card), a `section` labelled by its `h3` title.",
    ],
  },
  "calendar-agenda": {
    faq: [
      {
        q: "What does it show on an empty day?",
        a: "Pass `items={[]}` and it shows \"Nothing scheduled.\" in the list. The text is fixed in the file.",
      },
      {
        q: "Can I use 12-hour times?",
        a: "Yes, `time` is shown as you pass it, for example \"2:30 PM\". Only a 24-hour \"HH:MM\" value also becomes the `<time>` element's `dateTime`.",
      },
    ],
    a11y: [
      "A `<ul>`, so screen readers announce the number of events.",
      "Each time is a `<time>` element, with a machine-readable `dateTime` when it is in 24-hour \"HH:MM\" form.",
      "Entries are text, not buttons or links, so there is nothing to focus. `title` is a string; to make events open, wrap the row in a link in the file.",
    ],
  },
  "command-center": {
    faq: [
      {
        q: "Can I use it with CommandPalette on the same page?",
        a: "Yes. CommandCenter listens for ⌘K / Ctrl+K on `window` and skips a key press another handler already claimed with `preventDefault()`. An uncontrolled [`CommandPalette`](/docs/command-palette) does the same, so whichever listener was added first opens and the other stays shut. To have one shortcut, keep only one of them on the page.",
      },
      {
        q: "Why do the commands do nothing?",
        a: "The sample commands have no `onSelect`. Give each command in the [`CommandDialog`](/docs/command-dialog) list an `onSelect`, for example `{ id: \"new-invoice\", label: \"New invoice\", onSelect: () => router.push(\"/invoices/new\") }`.",
      },
    ],
    keyboard: [
      { keys: "Meta+K / Ctrl+K", action: "Opens or closes the command dialog while the block is mounted, unless another handler already handled the key." },
      { keys: "ArrowDown / ArrowUp", action: "Moves through the commands in the open dialog." },
      { keys: "Enter", action: "Runs the highlighted command." },
      { keys: "Escape", action: "Closes the dialog." },
    ],
    a11y: [
      "The Commands button has `aria-keyshortcuts=\"Meta+K Control+K\"`, so screen readers announce the shortcut. The visible ⌘K hint is `aria-hidden`.",
      "Failed payments and Sync lag set `invert` in [`KpiRow`](/docs/kpi-row), so the 22% fall in failed payments shows green and the 8% rise in sync lag shows red. Screen readers hear \"Down\" and \"Up\".",
    ],
  },
  "dashboard-home": {
    faq: [
      {
        q: "How do I use my own data?",
        a: "It only takes `className`. Copy the block and pass your values to [`KpiRow`](/docs/kpi-row) `items`, [`BarChart`](/docs/bar-chart) `data` and [`ActivityFeed`](/docs/activity-feed) `items`. The bar chart has no `data` here, so it shows its sample series.",
      },
      {
        q: "What does the New report button do?",
        a: "Nothing yet: it has no `onClick`. Wire it to your create flow, or link it with `render={<Link href=\"/reports/new\" />}`.",
      },
    ],
    a11y: [
      "Churn sets `invert`, so its fall shows green; [`MetricDelta`](/docs/metric-delta) announces \"Down 0.3%\".",
      "The activity list is a `section` labelled by its \"Recent activity\" `h2`, and the chart has the label \"Revenue by month\".",
    ],
  },
  "event-calendar": {
    faq: [
      {
        q: "Why doesn't a new event stay after I click a slot?",
        a: "EventCalendar does not store events. A click calls `onCreate` with a one-hour `{ start, end }` and shows a \"New event\" preview; add the event to the array you pass as `events` and it renders like the others.",
      },
      {
        q: "Is there a month view or drag to move events?",
        a: "No. It has week and day views only, and events can't be dragged or resized. For a month grid use [`CalendarMonth`](/docs/calendar-month).",
      },
      {
        q: "Can I control the date shown?",
        a: "Only the view is controllable (`view` and `onViewChange`). The date starts at `defaultDate` and reports changes through `onDateChange`. To jump to a date from outside, change the component's `key` with a new `defaultDate`.",
      },
      {
        q: "How do I show 24-hour times or start weeks on Sunday?",
        a: "Pass `locale=\"en-GB\"` (or any BCP 47 locale) for times and dates, and `weekStartsOn={0}` for Sunday. The default is Monday.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the toolbar, the day headers, the all-day events, then one slot target per day column and its events." },
      { keys: "ArrowDown / ArrowUp", action: "On a day column, moves the proposed start time by `slotMinutes` (30 by default)." },
      { keys: "Enter / Space", action: "On a day column, calls `onCreate` for the proposed time. On an event, calls `onEventClick`." },
      { keys: "Enter / Space", action: "On a day header in week view, opens that day." },
    ],
    a11y: [
      "The heading has `aria-live=\"polite\"`, so the new range is announced after Previous, Next or Today. Those buttons are labelled \"Previous week\" or \"Next day\" to match the view.",
      "Each event is a button named with its title, date, time range, location and calendar, for example \"Design review, Tuesday, November 17, 10:00 AM to 11:30 AM, Room Atlas, Northwind\".",
      "Each day column is a `role=\"button\"` slot target whose name explains the arrow keys; a visually hidden live region reads the chosen time as it changes.",
      "Hour labels, grid lines and the current-time line are `aria-hidden`.",
    ],
  },
  "goal-ring": {
    faq: [
      {
        q: "Can the centre show \"18 of 25\" instead of a percent?",
        a: "No. `value` is a percentage from 0 to 100 and the centre always shows it with a % sign. Work out the percentage yourself and put the count in `label`, for example `label=\"18 of 25 demos booked\"`.",
      },
      {
        q: "How do I make it bigger?",
        a: "The SVG is 96px with a `viewBox`, so it scales cleanly. Pass `className=\"[&_svg]:size-32\"` to resize it.",
      },
    ],
    a11y: [
      "The SVG has `role=\"img\"` and `aria-label` such as \"Weekly goal: 72%\". The centre number and the caption are `aria-hidden`, so the value is read once.",
      "It is an image, not a `progressbar` or `meter`. For a value that updates live, use [`Meter`](/docs/meter) or [`Progress`](/docs/progress).",
      "The ring animates when `value` changes; `motion-reduce:transition-none` turns that off.",
    ],
  },
  "impersonation-banner": {
    faq: [
      {
        q: "How do I make it harder to miss?",
        a: "Pin it and tint it: `className=\"sticky top-0 z-50 bg-warning/10\"`. Support staff act on someone else's data while it shows, so it should stay visible on every page.",
      },
      {
        q: "What should onExit do?",
        a: "End the impersonation session on the server, then reload or redirect back to the admin page. The banner itself has no state and keeps showing until you stop rendering it.",
      },
    ],
    a11y: [
      "The strip is a `role=\"region\"` landmark labelled \"Impersonation\", so screen reader users can jump to it.",
      "It is not a live region, so it isn't announced when it appears. The account name is in a `<strong>`.",
      "Exit is a native `<button type=\"button\">`; change its text with `exitLabel`.",
    ],
  },
  "inbox-page": {
    faq: [
      {
        q: "How do I load my own messages?",
        a: "It only takes `className`; messages and the unread set are sample data. Copy the block, replace `MESSAGES` with your data and call your API where it marks a message read.",
      },
      {
        q: "How does it behave on phones?",
        a: "Below `md` the open message stacks under the list. Focus stays on the list after a tap, so add a scroll to the message, or route to a separate page, on small screens.",
      },
    ],
    a11y: [
      "The unread count sits in an `aria-live=\"polite\"` span inside the heading, so \"2 unread\" is announced as it changes.",
      "Each message is a button; the open one has `aria-current=\"true\"`. Unread messages add a hidden \", unread\", and the accent dot is `aria-hidden`.",
      "The open message is an `article` labelled by its subject `h3`.",
    ],
  },
  "kpi-row": {
    faq: [
      {
        q: "How do I show a fall in churn as good?",
        a: "Set `invert: true` on that item. A negative delta then turns green, and screen readers still hear \"Down\".",
      },
      {
        q: "Can the change be text instead of a percent?",
        a: "Yes. A number renders as a percent with an arrow; a string such as `\"vs last week\"` or `\"14 invoices\"` renders as muted text.",
      },
      {
        q: "How do I fit six metrics?",
        a: "The grid is one column, then two from `sm`, then four from `lg`. Pass `className=\"lg:grid-cols-3\"` or `\"lg:grid-cols-6\"` to change the last step.",
      },
    ],
    a11y: [
      "A `<dl>`: each label is a `<dt>` and each value a `<dd>`, so screen readers pair them.",
      "Numeric deltas use [`MetricDelta`](/docs/metric-delta), which adds a hidden \"Up\" or \"Down\" so the direction isn't shown by colour alone.",
      "Labels are uppercase through CSS only, so screen readers read them in normal case.",
    ],
  },
  "metric-delta": {
    faq: [
      {
        q: "How do I round the number?",
        a: "MetricDelta prints `Math.abs(value)` followed by %, so 12.345 shows as 12.345%. Round before passing it: `value={Number(change.toFixed(1))}`.",
      },
      {
        q: "Can it show percentage points or an absolute change?",
        a: "No, it always adds %. For \"+2 pp\" or \"+14\" use a string delta in [`StatCard`](/docs/stat-card) or [`KpiRow`](/docs/kpi-row).",
      },
    ],
    a11y: [
      "The arrow is `aria-hidden`; a visually hidden \"Up\", \"Down\" or \"No change,\" comes before the number, so screen readers hear \"Up 12%\".",
      "Direction is shown by the arrow as well as the colour, so it doesn't rely on red and green alone. Zero is muted, with no arrow.",
    ],
  },
  "onboarding-checklist": {
    faq: [
      {
        q: "Why doesn't the list update when I change items?",
        a: "`items` only sets the starting state; later changes are ignored. To reset it, change the component's `key`, for example `key={user.id}`.",
      },
      {
        q: "How do I save progress?",
        a: "Use `onToggle`, which receives the task `id` and its new `done` value. Load saved progress back through each item's `done`.",
      },
    ],
    a11y: [
      "Each task is a `<button role=\"checkbox\">` with `aria-checked`. The box and tick are `aria-hidden`.",
      "The list is labelled by the title, which is an `h3`.",
      "The count reads \"2 of 4 done\" to screen readers; the word \"done\" is visually hidden.",
    ],
  },
  "org-chart": {
    faq: [
      {
        q: "Why doesn't clicking a manager fold the branch?",
        a: "A click selects the card and calls `onSelect`. Folding is on the count pill under the card, or Enter and Space on the keyboard, so opening a profile and browsing the tree don't get in each other's way.",
      },
      {
        q: "How do I control which branches start open?",
        a: "`defaultExpandDepth` opens every manager at or above that depth (the root is 0), and `defaultExpanded` adds specific ids. After that the chart keeps the open state itself; there is no controlled prop.",
      },
      {
        q: "How do I fix a team's colour?",
        a: "Pass `teamTones`, for example `teamTones={{ Engineering: \"info\", Finance: \"success\" }}`. Teams you don't list get the next tone in order of first appearance.",
      },
    ],
    keyboard: [
      { keys: "ArrowRight / ArrowLeft", action: "Moves to the next or previous sibling." },
      { keys: "ArrowDown", action: "Opens a closed manager, or moves to the first report of an open one." },
      { keys: "ArrowUp", action: "Moves to the manager." },
      { keys: "Home / End", action: "Moves to the first or last sibling." },
      { keys: "Enter / Space", action: "Selects the person and folds or unfolds their reports." },
    ],
    a11y: [
      "One tab stop: the focused card, else the selected one, else the root. Folding a branch that holds focus moves focus to its manager.",
      "Each card is a button named \"Theo Okafor, CTO, Engineering, 3 reports\" (the count is everyone below them, not only direct reports), with `aria-expanded` on managers and `aria-current=\"true\"` on the selected card.",
      "The count pill is `aria-hidden` and out of the tab order; the avatar and team stripe are `aria-hidden`.",
      "With reduced motion branches open and close at once and cards don't animate to their new positions.",
    ],
  },
  "project-detail": {
    faq: [
      {
        q: "How do I use it for my own records?",
        a: "It only takes `className`. Copy the block, then pass your fields to [`DescriptionList`](/docs/description-list) and your events to [`ActivityFeed`](/docs/activity-feed). The Share and Open report buttons have no handlers yet.",
      },
    ],
    a11y: [
      "Details and Activity are `section`s labelled by their `h2`s, so they appear in a screen reader's landmark and heading lists.",
      "The due date is a `<time dateTime=\"2026-12-05\">`, and the back link is a real link named \"Projects\".",
    ],
  },
  "project-list": {
    faq: [
      {
        q: "How do I use my own projects?",
        a: "It only takes `className`. Copy the block, replace `PROJECTS`, and point each row's `href` at its detail page. Status values map to [`StatusBadge`](/docs/status-badge) tones in `TONE`.",
      },
      {
        q: "When should I use a table instead?",
        a: "When people need to sort, filter or select rows, or the list runs past about 30 items. Use [`DataTable`](/docs/data-table) then.",
      },
    ],
    a11y: [
      "Each row is one `<a>`, so it works with Enter, middle-click and \"open in new tab\". The chevron is `aria-hidden`.",
      "The status is text inside a badge, so it is read aloud and not shown by colour alone.",
    ],
  },
  "report-builder": {
    faq: [
      {
        q: "Does the date range filter the chart?",
        a: "No. The preview always shows six months of sample data for the chosen metric. The range is only passed to `onExport` as ISO `yyyy-mm-dd` strings, together with the metric.",
      },
      {
        q: "How do I add a metric?",
        a: "Add a key to `ReportMetric` and `DATA` (label, values and a format function), and an option to the [`SegmentedControl`](/docs/segmented-control).",
      },
    ],
    a11y: [
      "The metric switch is a [`SegmentedControl`](/docs/segmented-control) labelled \"Metric\".",
      "The chart's label changes with the metric (\"Refunds by month\"), so screen readers hear what the preview shows.",
    ],
  },
  "resource-quota-grid": {
    faq: [
      {
        q: "How do I show units like GB?",
        a: "Give the item a `format` function, for example `format: (n) => n + \" GB\"`. It is passed to [`QuotaBar`](/docs/quota-bar) and formats both numbers. Without it numbers use en-US grouping.",
      },
      {
        q: "When does a bar turn amber or red?",
        a: "At 90% used it turns to the warning tone and at 100% to danger. Set `warnAt` on an item to warn earlier, for example `warnAt: 80` for seats.",
      },
    ],
    a11y: [
      "Each bar has `role=\"meter\"`, is named by its label, and has value text such as \"84,200 / 100,000, 84%\".",
      "Usage over the limit is capped at the maximum in `aria-valuenow`, and the percentage stops at 100.",
      "The \"used / max\" numbers are printed beside each bar, so the amount doesn't rely on bar length or colour.",
    ],
  },
  "sparkline-set": {
    faq: [
      {
        q: "How do I show a drop in churn as good?",
        a: "Set `invert: true` on that item. Its delta then shows green when it falls and red when it rises. The sparkline keeps the accent colour either way.",
      },
      {
        q: "Which order do the data points go in?",
        a: "Oldest first. The sparkline draws `data` left to right.",
      },
    ],
    a11y: [
      "Each sparkline is an [`AreaChart`](/docs/area-chart) with `role=\"img\"` and a summary built from `label`, such as \"Revenue. 12 values, from 62 to 118, peak 118.\"",
      "Deltas use [`MetricDelta`](/docs/metric-delta), which says \"Up\" or \"Down\" to screen readers.",
    ],
  },
  "stat-card": {
    faq: [
      {
        q: "Why is my delta grey?",
        a: "The colour comes from the first character of a string: \"+\" or \"▲\" is green, \"-\", \"−\" or \"▼\" is red, anything else is grey. A number such as `delta={8}` is always grey; pass `delta=\"+8%\"`.",
      },
      {
        q: "How do I show lower latency as good?",
        a: "Set `invertDelta`. A leading minus then turns green and a plus turns red.",
      },
    ],
    a11y: [
      "The delta's colour isn't announced, but its sign is part of the text (\"+8.2%\"), so the direction still reaches screen readers.",
      "The icon is `aria-hidden`, so only the label text is read before the value.",
    ],
  },
  "stat-sparkline": {
    faq: [
      {
        q: "What is the component called when I import it?",
        a: "The file exports `StatWithSparkline` and the alias `StatSparkline`; both are the same component.",
      },
      {
        q: "How do I show a falling metric as good?",
        a: "Set `invert`. Without it a `delta` that starts with \"-\", \"−\" or \"▼\" turns the delta and the sparkline red, and any other delta, even \"0%\", is green. With `invert` the colours swap, so `delta=\"−12%\"` on latency shows green.",
      },
    ],
    a11y: [
      "The sparkline is an [`AreaChart`](/docs/area-chart) with `role=\"img\"`, labelled \"Monthly revenue trend\" plus a summary of the first, last and peak values.",
      "The delta's sign is part of its text (\"+12.4%\"), so the direction reaches screen readers without the colour.",
    ],
  },
  "streak-calendar": {
    faq: [
      {
        q: "How do I map real dates onto the grid?",
        a: "`active` takes day numbers from 1, not dates. Subtract the first day of the period from each date: day 1 is the top-left tile, whatever weekday it falls on.",
      },
      {
        q: "Does it show weekday labels?",
        a: "No. It is a plain seven-column grid. For a year-long contribution graph with labels, build rows of [`HeatmapCell`](/docs/heatmap-cell).",
      },
    ],
    a11y: [
      "The grid has `role=\"img\"` and a summary such as \"10 of 28 days active\"; single days are not exposed.",
      "Days outside 1 to `days` are left out of the count.",
      "The title is a `<p>`, not a heading.",
    ],
  },
  "support-inbox": {
    faq: [
      {
        q: "How do I change when a ticket counts as at risk?",
        a: "The threshold is two hours, in `t.slaMinutes < 120`. Solved tickets never count. Change the number in both places it appears.",
      },
      {
        q: "How do I load real tickets?",
        a: "It only takes `onCompose` and `className`. Copy the block and replace `TICKETS` with your data, keeping `slaMinutes` as minutes left.",
      },
    ],
    a11y: [
      "A hidden `aria-live=\"polite\"` line announces \"3 tickets shown\" as the search narrows the list.",
      "At-risk times add a hidden \"At risk:\", so the warning isn't carried by the red colour alone.",
      "Each ticket is a single link with its id, subject, sender and status inside.",
    ],
  },
  timeline: {
    faq: [
      {
        q: "Can titles and descriptions contain links?",
        a: "Yes, both are `ReactNode`, so you can pass `<Link href=\"/invoices/2041\">INV-2041</Link>` inside a title.",
      },
      {
        q: "Does it sort events?",
        a: "No. Items render in the order you pass them, so sort them (newest first) before passing `items`.",
      },
    ],
    a11y: [
      "An ordered list (`<ol>`), so screen readers announce the number of events and their position.",
      "Times are `<time>` elements; pass `dateTime` with an ISO date to make them machine-readable.",
      "The dots on the rail are `aria-hidden`.",
    ],
  },
  "uptime-bar": {
    faq: [
      {
        q: "How is the uptime percentage calculated?",
        a: "By whole days: days without downtime divided by `days`. One bad day in 90 shows 98.89%, however short the outage was. For minute-level uptime, compute the figure yourself and edit the file to show it.",
      },
      {
        q: "Which day does a downtime index point at?",
        a: "Index 0 is the oldest, leftmost day; `days - 1` is today. If you change `days`, shift your indexes too.",
      },
      {
        q: "How does it look on a phone?",
        a: "Bars share the width with 1px gaps, so 90 bars get very thin on small screens. Pass `days={30}` there.",
      },
    ],
    a11y: [
      "The strip has `role=\"img\"` and a summary such as \"API: 97.78% uptime over 90 days, 2 days with downtime\". Single days are not exposed.",
      "Each bar has a `title` (\"Degraded\" or \"Operational\") that shows on mouse hover only; keyboard and touch users can't reach it.",
    ],
  },
  "user-detail": {
    faq: [
      {
        q: "How do I use it for my own users?",
        a: "It only takes `className`. Copy the block, pass your fields to [`DescriptionList`](/docs/description-list) and your events to [`ActivityFeed`](/docs/activity-feed). Reset 2FA and Suspend have no handlers; confirm Suspend with an [`AlertDialog`](/docs/alert-dialog).",
      },
    ],
    a11y: [
      "The avatar's initials are `aria-hidden`, so the title reads \"Priya Raman\" once.",
      "Account and Recent activity are `section`s labelled by their `h2`s, and the back link is named \"Users\".",
    ],
  },
}
