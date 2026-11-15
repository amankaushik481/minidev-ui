import type { ComponentDocsContent } from "../types"

export const PART_09: Record<string, ComponentDocsContent> = {
  accordion: {
    faq: [
      {
        q: "How do I open an item by default, or control which items are open?",
        a: "Pass `defaultValue` with the `value` of each item that starts open, for example `defaultValue={[\"billing\"]}`. To control it, pass `value` and `onValueChange` instead. Both take an array of item values, even when only one item can be open.",
      },
      {
        q: "How do I let more than one item be open at once?",
        a: "Add `multiple` to `Accordion`. Without it, opening one item closes the one that was open. The \"Controlled value\" example on this page pairs `multiple` with a `value` array to build Expand all and Collapse all buttons.",
      },
      {
        q: "Can the browser's find in page search text inside a closed panel?",
        a: "Not by default: a closed `AccordionPanel` is removed from the DOM. Pass `hiddenUntilFound` to `Accordion` and closed panels are hidden with `hidden=\"until-found\"`, so Ctrl+F finds the text and opens that item. Use `keepMounted` if you only need the closed content to stay in the DOM.",
      },
      {
        q: "Can I use Accordion in a Next.js Server Component?",
        a: "Yes. The file is marked `\"use client\"`, so a Server Component can render `Accordion` with static items and `defaultValue`. Controlling it with `value` and `onValueChange` needs state, so do that inside your own client component.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the next trigger, or into an open panel's links and fields." },
      { keys: "Shift+Tab", action: "Moves focus to the previous trigger or focusable element." },
      { keys: "Enter / Space", action: "Opens or closes the focused item." },
    ],
    a11y: [
      "Each `AccordionTrigger` is a native `<button>` inside an `<h3>`, with `aria-expanded`, and `aria-controls` pointing at its panel while open. The `<h3>` is fixed in the file: if your page needs another level, add `render={<h4 />}` to `AccordionPrimitive.Header` there.",
      "Each `AccordionPanel` has `role=\"region\"` and `aria-labelledby` set to its trigger, so screen readers name the section when focus enters it.",
      "Arrow keys do nothing: Base UI follows the current ARIA guidance and keeps every trigger in the Tab order instead of using roving focus.",
      "The panel height and chevron turn are CSS transitions, which the kit's stylesheet cuts to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },
  "app-shell": {
    faq: [
      {
        q: "Why does the sidebar disappear on mobile?",
        a: "The sidebar column is `hidden md:block`, so below 768px it is not shown at all. Put a menu button in `topbar` that opens the same navigation in a [`Sheet`](/docs/sheet), or phones have no way to reach it.",
      },
      {
        q: "How do I make AppShell fill the whole browser window?",
        a: "By default it is a framed preview: `min-h-[420px]`, a border and rounded corners. For a real app pass `className=\"h-dvh rounded-none border-0\"`. The content area is `flex-1 overflow-auto`, so only the page content scrolls and the top bar stays put.",
      },
      {
        q: "Can I use AppShell in a Next.js layout.tsx?",
        a: "Yes. The file is `\"use client\"` but it only takes nodes, so a Server Component layout can render `<AppShell sidebar={<Nav />} topbar={<Topbar title=\"Invoices\" />}>{children}</AppShell>` and the pages inside stay Server Components.",
      },
    ],
    a11y: [
      "The sidebar column is an `<aside>` named by `sidebarLabel` (default \"Sidebar\"). Give it a real name such as \"Workspace\" so landmark lists are useful.",
      "The content area is a `<main>` element, so screen reader users can jump straight to the page content. Do not wrap `children` in another `<main>`, and render one AppShell per page.",
      "Below md the sidebar is `display: none`, so it is hidden from screen readers too, not only from sight.",
    ],
  },
  "aspect-ratio": {
    faq: [
      {
        q: "How do I use AspectRatio with the Next.js Image component?",
        a: "Use `fill`. AspectRatio is `position: relative`, which `fill` needs: `<AspectRatio ratio={4 / 3}><Image src={src} alt=\"\" fill sizes=\"(min-width: 768px) 50vw, 100vw\" className=\"object-cover\" /></AspectRatio>`. Add `sizes` so Next.js does not download a full-width image for a half-width box.",
      },
      {
        q: "How do I embed a YouTube or Vimeo video responsively?",
        a: "Put the iframe inside and stretch it: `<AspectRatio><iframe src={url} title=\"Product tour\" className=\"absolute inset-0 size-full\" allowFullScreen /></AspectRatio>`. The default `ratio` is `16 / 9`, so a widescreen video needs no prop.",
      },
      {
        q: "What happens if the content is taller than the ratio?",
        a: "It is clipped. The box keeps its ratio and has `overflow-hidden`, so children should be `absolute inset-0` media, not text that can grow. For a CMS image, pass `ratio={width / height}` from its stored dimensions.",
      },
    ],
    a11y: [
      "AspectRatio is a plain `<div>` with no role or label. The accessible name comes from what you put inside: `alt` on an image (empty for decoration) and `title` on an iframe.",
    ],
  },
  "avatar-group": {
    faq: [
      {
        q: "What is the difference between this AvatarGroup and the one in Avatar?",
        a: "This one is data-driven: pass `people` and it draws the stack, a name tooltip on each avatar, the `+N` popover and the summary line. The `AvatarGroup` exported from [`Avatar`](/docs/avatar) is a plain flex wrapper for `Avatar` children you compose yourself. Both have the same name, so rename one on import if a file needs both.",
      },
      {
        q: "Why does max={4} show five avatars?",
        a: "It never hides a single person behind `+1`. With 5 people and `max={4}` all five show; with 6 people you get four avatars and `+2`.",
      },
      {
        q: "How do I change or hide the \"Maya, Theo and 7 others\" line?",
        a: "Pass `summary={false}` to hide it. The line uses the first word of the first two names and the count of everyone else, and reads \"No one yet\" for an empty `people` array. For other wording, hide it and write your own next to the group.",
      },
      {
        q: "What shows while a photo loads or if it fails?",
        a: "Initials from the first and last word of `name`, on a tint picked from a hash of the name. The same person always gets the same colour, in both themes.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to each avatar in turn, showing its name tooltip, then to the `+N` button." },
      { keys: "Enter / Space", action: "On the `+N` button, opens the list of everyone not shown." },
      { keys: "Escape", action: "Closes the tooltip or the overflow list. Closing the list returns focus to the `+N` button." },
    ],
    a11y: [
      "The stack is `role=\"group\"` with an `aria-label` built from `label` and the count, for example \"Northwind team, 9 people\".",
      "Each avatar is `role=\"img\"` named \"Name, Role\" (or just the name). The photo inside has `alt=\"\"`, so the name is not read twice.",
      "The overflow button is labelled \"Show 2 more\", and the popover opens with the line \"2 more on Northwind team\".",
      "The lift on hover and focus is a 140ms transform. The kit's stylesheet cuts it to 0.01ms under `prefers-reduced-motion: reduce`.",
    ],
  },
  card: {
    faq: [
      {
        q: "Why is CardTitle a div and not a heading?",
        a: "So a card never breaks your page outline by guessing a level. Put the heading inside it: `<CardTitle><h3>Northwind</h3></CardTitle>`. The size and weight come from `CardTitle`.",
      },
      {
        q: "How do I put a button in the top-right corner of a card?",
        a: "Put `CardAction` inside `CardHeader`. When the header contains it, the header switches to two columns, and the action spans the title and description rows on the right.",
      },
      {
        q: "How do I make an image run edge to edge, or make the card more compact?",
        a: "Make an `<img>` the first child of `Card`: the top padding is dropped and the image gets the card's top corners. For a denser card pass `size=\"sm\"`, which changes `--card-spacing` from 20px to 14px for every slot at once.",
      },
      {
        q: "Does Card work in Server Components?",
        a: "Yes. The file has no `\"use client\"` and no hooks, so it renders on the server with no JavaScript. Interactive children such as a [`Button`](/docs/button) with `onClick` still need to live in a client component.",
      },
    ],
    a11y: [
      "Every part is a `<div>` with no role: a Card is not an `article` or a landmark. Wrap it in `<article>` or `<section aria-labelledby>` when it is standalone content.",
    ],
  },
  center: {
    faq: [
      {
        q: "Why is my content not centred vertically?",
        a: "Center is a flex column with `justify-center`, but it has no height of its own. Give it one: `className=\"min-h-80\"` for an empty state, or `min-h-dvh` for a full-screen sign-in page.",
      },
      {
        q: "How do I stop the text being centred, or make the column wider?",
        a: "Center adds `text-center`, so override it on a child with `text-left`. The column is `max-w-lg` (32rem) by default; `size` takes `\"sm\"`, `\"md\"`, `\"lg\"` or `\"full\"` for no limit.",
      },
    ],
  },
  cluster: {
    faq: [
      {
        q: "Why does a gap-* class not change the spacing?",
        a: "`gap` is written as an inline style (`gap * 4` pixels), and an inline style beats a class in `className`. Use the prop instead. It takes any number, so `gap={2.5}` gives 10px.",
      },
      {
        q: "How do I put Cancel and Save on the right, or spread items apart?",
        a: "`justify=\"end\"` pushes the row to the right and `justify=\"between\"` spreads it. To push only the last item right, give it `className=\"ml-auto\"`. Items wrap onto a new line when they run out of room, which [`Stack`](/docs/stack) and a plain `flex` row do not do.",
      },
    ],
    a11y: [
      "Cluster is a plain `<div>`. Wrapping never reorders items, so Tab order follows the source order. For a set of related buttons add `role=\"group\"` and an `aria-label`.",
    ],
  },
  collapsible: {
    faq: [
      {
        q: "How do I control whether it is open?",
        a: "Pass `open` and `onOpenChange` to `Collapsible`, for example to change the trigger text from \"Show 3 more\" to \"Show less\". For a panel that only needs a starting state, `defaultOpen` is enough.",
      },
      {
        q: "Is the closed content still in the DOM, and can find in page reach it?",
        a: "By default a closed `CollapsiblePanel` is removed from the DOM. `keepMounted` keeps it there hidden. `hiddenUntilFound` hides it with `hidden=\"until-found\"`, so Ctrl+F finds the text and opens the panel.",
      },
      {
        q: "How do I animate the panel height?",
        a: "The kit's panel opens instantly. Base UI sets `--collapsible-panel-height` and `data-starting-style` / `data-ending-style` on the panel, so add `className=\"h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-starting-style:h-0 data-ending-style:h-0\"`.",
      },
      {
        q: "Collapsible or Accordion?",
        a: "Collapsible is one trigger and one panel with no heading. [`Accordion`](/docs/accordion) is a list of them, puts each trigger in an `<h3>` and can close the others when one opens.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the trigger, then into the open panel's links and fields." },
      { keys: "Enter / Space", action: "On the trigger, opens or closes the panel." },
    ],
    a11y: [
      "`CollapsibleTrigger` is a native `<button>` with `aria-expanded`, and `aria-controls` pointing at the panel while it is open.",
      "With `disabled` on `Collapsible`, the trigger is disabled and drawn at 45% opacity.",
      "The trigger has no heading. If the panel is a section of the page, wrap the trigger in a heading of the right level.",
    ],
  },
  container: {
    faq: [
      {
        q: "What max width does each size give?",
        a: "`sm` is 672px for reading width, `default` is 1024px, `lg` is 1280px for dashboards and `full` removes the limit. Side padding is 16px, and 24px from the `sm` breakpoint.",
      },
      {
        q: "How do I give a full-width background to a section but keep its content narrow?",
        a: "Put the background on an outer element and Container inside it: `<section className=\"bg-sunken py-16\"><Container>...</Container></section>`. Container only sets width and side padding, never vertical spacing.",
      },
    ],
  },
  "description-list": {
    faq: [
      {
        q: "How do I show one pair per row instead of two columns?",
        a: "The grid is one column on phones and two from the `sm` breakpoint. Pass `className=\"sm:grid-cols-1\"` to keep one column. It is also capped at `max-w-xl`; `max-w-none` removes that.",
      },
      {
        q: "Can a value hold a badge, link or copy button?",
        a: "Yes. `value` and `label` are React nodes, so `{ label: \"API key\", value: <SecretReveal revealedValue={key} label=\"API key\" /> }` works. If you leave out `items`, the sample customer record renders.",
      },
    ],
    a11y: [
      "Renders a real `<dl>`, with each `<dt>` and `<dd>` pair wrapped in a `<div>`, which HTML allows. Screen readers announce it as a list with terms and definitions.",
    ],
  },
  "dot-pattern": {
    faq: [
      {
        q: "Does the pointer glow hurt performance?",
        a: "No React re-render happens while the pointer moves: the handler writes `--dp-x`, `--dp-y` and `--dp-on` on the element and CSS moves a radial mask. The pattern itself is a single SVG `<pattern>` fill. Pass `glow={false}` to drop the second layer.",
      },
      {
        q: "How do I use it as a full-width hero background?",
        a: "It defaults to a 320px framed box. Pass `className=\"h-auto min-h-[480px] rounded-none border-0\"` and your hero as `children`. Your children are not centred for you; add `grid place-items-center` to the wrapper you pass in.",
      },
      {
        q: "How do I change the dot colour?",
        a: "Dots use `--border-strong`, grid lines use `--border` and the glow uses `--accent`. Redefine those variables on a parent element to retint one section without touching the component.",
      },
    ],
    a11y: [
      "Both SVG layers are `aria-hidden` and `pointer-events-none`, so links and buttons in `children` stay clickable and screen readers skip the texture.",
      "Under `prefers-reduced-motion: reduce` the glow layer is not rendered and pointer moves are ignored; the static pattern stays.",
    ],
  },
  heading: {
    faq: [
      {
        q: "How do I make an h2 look like an h1?",
        a: "Pick the element by the document outline and change only the size: `<Heading as=\"h2\" className=\"text-3xl\">`. `className` is merged after the level's classes, so it wins.",
      },
      {
        q: "What does Heading render without `as`, and does it work in Server Components?",
        a: "An `<h2>`. The file has no `\"use client\"` and no hooks, so it renders in Server Components with no JavaScript.",
      },
    ],
    a11y: [
      "Renders a real `<h1>` to `<h6>`, so it appears in screen reader heading lists. Skipping levels (h2 straight to h4) breaks that navigation.",
      "The `h6` level is uppercase through CSS only; screen readers read the text as you wrote it.",
    ],
  },
  inset: {
    faq: [
      {
        q: "Why does p-0 not remove the padding on desktop?",
        a: "Inset has `p-4 md:p-6`, and `p-0` only replaces the first. Pass `className=\"p-0 md:p-0\"`, for example when a code block or image should touch the edges.",
      },
    ],
  },
  "list-item": {
    faq: [
      {
        q: "Why do the dividers disappear when I wrap each ListItem in an li?",
        a: "Each row has `border-b` with `last:border-b-0`. Inside its own `<li>`, every ListItem is a last child, so no border shows. Put the dividers on the list instead: `<ul className=\"divide-y divide-border\">`.",
      },
      {
        q: "How do I make the whole row a link?",
        a: "Wrap it: `<Link href=\"/team/maya\"><ListItem heading=\"Maya Chen\" /></Link>`. ListItem is a `<div>`, so do not wrap it in a `<button>`, which may only hold inline content. For one action per row, put a button in `trailing`.",
      },
      {
        q: "Can the description wrap onto two lines?",
        a: "Not by default: both lines have `truncate`. Pass a node that overrides it: `description={<span className=\"whitespace-normal\">Full text here</span>}`.",
      },
    ],
    a11y: [
      "`heading` renders in a `<div>`, not a heading element, so rows do not clutter the heading list.",
      "Leading, text and trailing content are read in that order, so put a status badge in `trailing` rather than before the name.",
    ],
  },
  "masonry-grid": {
    faq: [
      {
        q: "How is this different from CSS columns?",
        a: "CSS `columns` fills the first column top to bottom, then the next, so Tab order jumps around the screen. MasonryGrid keeps items left to right, row by row. It measures each tile and sets `grid-row-end: span N` on rows of 4px.",
      },
      {
        q: "Why do tiles overlap before the page hydrates?",
        a: "Heights are measured in the browser, in `useLayoutEffect`. Server HTML has every tile spanning one 4px row, so tiles stack on top of each other until React runs. On a server-rendered page, keep the grid below the fold or render it only after mount.",
      },
      {
        q: "Do images that load late break the layout?",
        a: "No. A `ResizeObserver` watches each tile and updates its span when the height changes. Set `width` and `height` on images anyway so tiles do not jump.",
      },
    ],
    a11y: [
      "DOM order matches visual order, so keyboard and screen reader users meet tiles in the order sighted users read them.",
      "The grid and each tile wrapper are plain `<div>`s. Other div props go on the grid, so name it with `aria-label` or `aria-labelledby` when it needs a name. Keep `role=\"list\"` off unless every child also has `role=\"listitem\"`.",
    ],
  },
  "page-header": {
    faq: [
      {
        q: "Can I change the heading level?",
        a: "No. The title is always an `<h1>`, so render one PageHeader per page. For headings inside the page use [`SectionHeader`](/docs/section-header), which renders an `<h2>` by default.",
      },
      {
        q: "How do I add breadcrumbs or a status badge?",
        a: "There is no breadcrumb slot: render a [`Breadcrumb`](/docs/breadcrumb) just above it. `title` takes a node, so `title={<>INV-2041 <StatusBadge tone=\"success\">Paid</StatusBadge></>}` works, and the badge text becomes part of the h1.",
      },
      {
        q: "How do I remove the bottom border or spacing?",
        a: "It has `mb-6`, `pb-4` and `border-b` built in. Pass `className=\"mb-0 border-b-0 pb-0\"` when the next element has its own edge, such as [`Tabs`](/docs/tabs).",
      },
    ],
    a11y: [
      "The title is the page's `<h1>`. The description is a plain `<p>` after it and is not linked with `aria-describedby`.",
      "Actions come after the title in the DOM, so screen readers and Tab order meet the title first, even when the actions wrap onto their own line.",
    ],
  },
  prose: {
    faq: [
      {
        q: "How do I style Markdown from react-markdown, MDX or a CMS?",
        a: "Wrap the output: `<Prose><ReactMarkdown>{markdown}</ReactMarkdown></Prose>`. Prose accepts every `div` prop, so `<Prose dangerouslySetInnerHTML={{ __html: html }} />` works too. Sanitise HTML from a CMS or a model before you inject it.",
      },
      {
        q: "Which elements does Prose style?",
        a: "`h1` to `h3`, paragraphs, links, `strong`, `hr`, lists, inline `code`, `pre` and `blockquote`. It has no rules for `h4` to `h6`, tables or images, so style those yourself or use [`Table`](/docs/table). It needs no Tailwind typography plugin.",
      },
      {
        q: "Why is there no space between my paragraphs?",
        a: "Vertical spacing (`mt-4`, and `mt-8` before `h2` and `h3`) applies only to direct children. If a wrapper `div` sits between Prose and the elements, they lose the spacing, so render the content straight into Prose.",
      },
    ],
    a11y: [
      "Links are underlined as well as coloured, so they do not rely on colour alone.",
      "Code blocks scroll sideways (`overflow-x-auto`) but are not focusable, so keyboard users cannot scroll a long line. Add `tabIndex={0}` to wide `<pre>` elements.",
      "The text column is `max-w-prose`, about 65 characters, a comfortable reading length. Use `className=\"max-w-none\"` only when a parent already limits the width.",
    ],
  },
  "resizable-panels": {
    faq: [
      {
        q: "How do I save the layout and restore it after a reload?",
        a: "Nothing is persisted for you. `onSizesChange` gets the array of percentages on every change, including each pointer move during a drag, so debounce the save to a cookie, for example. Pass it back as `defaultSizes`, or as `sizes` if you control the layout, and read the cookie on the server to avoid a jump on load.",
      },
      {
        q: "How do I make a panel collapse?",
        a: "Add `collapsible` and a `minSize` to the `ResizablePanel`. Dragged below the halfway point between `collapsedSize` (default 0) and `minSize`, it snaps shut; Enter on the handle after it toggles it, and `onCollapse(collapsed)` fires each time. The collapsed panel gets `data-collapsed`.",
      },
      {
        q: "Why are my panels ignored or the wrong size?",
        a: "The group reads its direct children and matches them by type. A `ResizablePanel` inside a fragment, a `div` or your own wrapper component is not detected. Also give the group a height, such as `className=\"h-96\"`, especially with `orientation=\"vertical\"`.",
      },
    ],
    keyboard: [
      { keys: "ArrowLeft / ArrowRight", action: "In a horizontal group, moves the focused handle by `keyboardStep` percent (2 by default)." },
      { keys: "ArrowUp / ArrowDown", action: "In a vertical group, moves the focused handle by `keyboardStep` percent." },
      { keys: "Shift+ArrowLeft / Shift+ArrowRight", action: "Moves the handle five steps at once. Shift works the same way with Up and Down." },
      { keys: "Home / End", action: "Shrinks the panel before the handle as far as it can go (collapsing it if it is collapsible), or grows it as far as it can go." },
      { keys: "Enter", action: "When the panel before the handle is `collapsible`, collapses it, or restores its starting size." },
    ],
    a11y: [
      "Each handle is `role=\"separator\"` with `tabIndex={0}`, `aria-orientation`, and `aria-controls` pointing at the panel before it.",
      "`aria-valuenow` is that panel's size in whole percent, with `aria-valuemin` (its `minSize`, or `collapsedSize` if it is collapsible) and `aria-valuemax`.",
      "Unnamed handles read \"Resize columns\" or \"Resize rows\". With several handles, give each its own `aria-label`, such as \"Resize file list\".",
      "Panels resize with no animation. The handle's line and grip use 140ms colour and size transitions, which the kit's stylesheet cuts under `prefers-reduced-motion: reduce`.",
    ],
  },
  "scroll-area": {
    faq: [
      {
        q: "Why does my ScrollArea not scroll?",
        a: "It needs a bounded height. Put one on ScrollArea itself, such as `className=\"h-72\"`. The viewport inside is `size-full`, so it only scrolls when the root is smaller than the content.",
      },
      {
        q: "How do I scroll to the bottom, for example in a chat?",
        a: "A `ref` on ScrollArea reaches the root, not the element that scrolls. Find the viewport inside it: `ref.current?.querySelector(\"[data-slot=scroll-area-viewport]\")?.scrollTo({ top: 1e9 })`.",
      },
      {
        q: "How do I scroll sideways, for a wide table or a row of cards?",
        a: "Pass `orientation=\"horizontal\"`, or `\"both\"` for both bars, and make the content wider than the box, for example with `w-max` or `whitespace-nowrap`.",
      },
      {
        q: "Does it work on phones?",
        a: "Yes. Scrolling is native, so touch, momentum and trackpads behave as usual. Base UI hides the native scrollbar and draws the thin themed one on top.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the viewport, but only while its content overflows." },
      { keys: "ArrowUp / ArrowDown", action: "Scrolls the focused viewport. PageUp, PageDown, Home, End and Space work as in any scrolling box." },
      { keys: "ArrowLeft / ArrowRight", action: "Scrolls sideways when the content is wider than the viewport." },
    ],
    a11y: [
      "Base UI gives the viewport `tabIndex={0}` only while the content overflows, so a box with nothing to scroll is not an empty Tab stop.",
      "The focused viewport shows a 2px inset accent ring.",
      "The custom scrollbars are for the pointer. Keyboard and screen reader users scroll the viewport natively.",
    ],
  },
  "section-header": {
    faq: [
      {
        q: "How do I pick the heading level?",
        a: "`level` takes 2, 3 or 4 and renders an `h2`, `h3` or `h4`; the default is 2. The size stays the same at every level. For the page's `h1` use [`PageHeader`](/docs/page-header).",
      },
      {
        q: "How do I label a section with this heading?",
        a: "SectionHeader has no `id` prop, and `className` goes to the wrapper. Put the id on the title node instead: `title={<span id=\"members-heading\">Members</span>}` inside `<section aria-labelledby=\"members-heading\">`.",
      },
    ],
    a11y: [
      "The title is a real heading element, so the section shows up in screen reader heading navigation.",
      "Actions come after the title and description in the DOM, so they are read and tabbed to after the heading.",
    ],
  },
  separator: {
    faq: [
      {
        q: "How do I make a vertical separator?",
        a: "Pass `orientation=\"vertical\"` inside a flex row that has a height: `<div className=\"flex h-5 items-center gap-3\">Docs<Separator orientation=\"vertical\" />API</div>`. The line stretches to the row's height.",
      },
      {
        q: "How do I make an \"or continue with\" divider?",
        a: "Put text between two separators that share the row: `<div className=\"flex items-center gap-3\"><Separator className=\"flex-1\" /><span className=\"text-xs text-fg-muted\">or</span><Separator className=\"flex-1\" /></div>`.",
      },
    ],
    a11y: [
      "Base UI renders a `<div>` with `role=\"separator\"` and `aria-orientation` set from `orientation`.",
      "It is not focusable and has no name. Screen readers may announce it while reading, so use a plain border instead for purely decorative lines.",
    ],
  },
  "split-pane": {
    faq: [
      {
        q: "Can people drag the divider?",
        a: "No. SplitPane is a fixed 50/50 grid from 768px up and stacks the two panes below that. For a draggable divider with min and max sizes use [`ResizablePanels`](/docs/resizable-panels).",
      },
      {
        q: "How do I change the split or remove the pane padding?",
        a: "`className` goes to the grid, so `className=\"md:grid-cols-[2fr_1fr]\"` gives a two-thirds split. Each pane has a fixed `p-4`. Remove it with `className=\"[&>[data-slot=split-pane-left]]:p-0\"` (or `split-pane-right`) when a code block should touch the edges.",
      },
    ],
    a11y: [
      "The panes are plain `<div>`s in source order. On phones `left` stacks above `right`, so reading order matches what people see. Give each pane a heading if it needs a name.",
    ],
  },
  stack: {
    faq: [
      {
        q: "Why are my buttons full width inside a Stack?",
        a: "Stack is a flex column, and flex items stretch across a column by default. Add `className=\"items-start\"` to the Stack, or `self-start` to one child.",
      },
      {
        q: "Which gaps can I use?",
        a: "`gap` takes 1 to 6 or 8, in 4px steps, and defaults to 3 (12px). For any other value pass a class, such as `className=\"gap-10\"`, which replaces the default. For a row that wraps use [`Cluster`](/docs/cluster).",
      },
      {
        q: "Can Stack render a ul or a section?",
        a: "No, it always renders a `<div>`. For a list, put the same classes on your own element: `<ul className=\"flex flex-col gap-3\">`.",
      },
    ],
  },
  "sticky-bar": {
    faq: [
      {
        q: "Why does my StickyBar not stick?",
        a: "`sticky bottom-0` sticks to the bottom of the nearest scrolling ancestor but never leaves its own parent, so make it the last child of the element that scrolls. An `overflow-hidden` element between the bar and the scroller becomes the bar's scroll container, and then it never sticks. In [`AppShell`](/docs/app-shell), put it last in `children`, which is the area that scrolls.",
      },
      {
        q: "How do I show it only when there are unsaved changes?",
        a: "Render it conditionally: `{dirty && <StickyBar aria-label=\"Unsaved changes\">...</StickyBar>}`. It has no open or close animation of its own.",
      },
      {
        q: "How do I keep it clear of the iPhone home indicator?",
        a: "Add bottom padding from the safe area: `className=\"pb-[max(0.75rem,env(safe-area-inset-bottom))]\"`. The page also needs `viewport-fit=cover` in its viewport meta for the inset to be non-zero.",
      },
    ],
    a11y: [
      "StickyBar is a plain `<div>` and passes through every div prop. Add `role=\"region\"` and an `aria-label` so screen reader users can find its actions from the landmark list.",
      "Showing the bar does not move focus or announce anything. If it appears after an edit, put the status text in an `aria-live=\"polite\"` element so the change is heard.",
    ],
  },
  text: {
    faq: [
      {
        q: "Can Text render a span or a div?",
        a: "No, it always renders a `<p>`. Do not put a `div`, list or another `p` inside it: that is invalid HTML, and in Next.js it causes a hydration error. For inline text use a `<span>` with the same classes.",
      },
      {
        q: "What is the difference between muted, subtle and mono?",
        a: "`muted` is secondary text (`text-fg-muted`, at least 7:1 contrast) and `subtle` is for hints and meta (`text-fg-subtle`, at least 4.5:1). If you pass both, subtle wins. `mono` switches to Geist Mono at 13px and combines with either.",
      },
    ],
  },
  "visually-hidden": {
    faq: [
      {
        q: "Why is my VisuallyHidden text not read?",
        a: "If the control also has `aria-label`, that label replaces the content, hidden text included. Use one or the other.",
      },
      {
        q: "Can I use it as a live region?",
        a: "Yes. It passes every `<span>` prop, so `<VisuallyHidden aria-live=\"polite\">{count} results</VisuallyHidden>` announces the new count without showing it. Keep the element mounted and change only its text.",
      },
    ],
    a11y: [
      "Uses Tailwind `sr-only`: absolutely positioned, 1px, clipped. The text stays in the accessibility tree.",
      "Do not put links or buttons inside it. They stay focusable but invisible, so keyboard users land on something they cannot see.",
    ],
  },
  "window-chrome": {
    faq: [
      {
        q: "Why does my window say \"Lumen — Invoices\"?",
        a: "That is the default `title`, kept for the docs preview. Always pass your own, such as `title=\"Acme — Settings\"`.",
      },
      {
        q: "How do I make a screenshot fill the window edge to edge?",
        a: "Children sit in fixed 16px padding. Remove it with `className=\"[&>div:last-child]:p-0\"` and give the image `className=\"block w-full\"`. For a window with an address bar use [`BrowserMockup`](/docs/browser-mockup).",
      },
    ],
    a11y: [
      "The three dots are `aria-hidden`. The title is a plain `<span>`, not a heading, and the frame has no role.",
      "A screenshot inside needs its own `alt` text that says what it shows; the frame adds no name.",
    ],
  },
  "json-viewer": {
    faq: [
      {
        q: "How do I choose which nodes start open?",
        a: "`defaultExpandDepth` opens every object and array down to that depth; the root is depth 0 and the default is 1, so the root and its direct children start open. `defaultExpanded` adds exact paths. Its default lists paths from the sample invoice, such as `$.customer`, so pass `defaultExpanded={[]}` if your data has those keys and you do not want them open.",
      },
      {
        q: "Why does the tree keep its old folding when I pass new data?",
        a: "The open set is read from the props only on the first render. Paths that exist in both responses keep their state. To start fresh for each response, give it a key: `<JsonViewer key={requestId} value={data} />`.",
      },
      {
        q: "What exactly do Copy value and Copy path copy?",
        a: "Copy value gives strings without quotes, and objects and arrays as JSON with two-space indentation. Copy path gives a path such as `$.lines[0].amount`, with keys that are not identifiers written as `[\"key-name\"]`. `onCopy(text, kind, path)` fires after either one.",
      },
      {
        q: "Can it handle a very large JSON file?",
        a: "It is not virtualised: every visible row is a DOM node, and the tree is rebuilt whenever `value` changes. It suits API responses and tool-call results. For multi-megabyte payloads, start with `defaultExpandDepth={0}` so only the root renders.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus into the tree. The whole tree is one Tab stop; the row-level copy buttons are skipped." },
      { keys: "ArrowDown / ArrowUp", action: "Moves to the next or previous visible row." },
      { keys: "ArrowRight", action: "On a closed object or array, opens it. On an open one, moves to its first child." },
      { keys: "ArrowLeft", action: "On an open object or array, closes it. Otherwise moves to the parent row." },
      { keys: "Home / End", action: "Moves to the first or last visible row." },
      { keys: "Enter / Space", action: "Opens or closes the focused object or array." },
      { keys: "C", action: "Copies the focused row's value." },
      { keys: "P", action: "Copies the focused row's path." },
      { keys: "ArrowDown", action: "In the search field, moves focus to the first row." },
      { keys: "Escape", action: "In the search field, clears the search." },
    ],
    a11y: [
      "The tree is `role=\"tree\"` named by `aria-label` (default \"JSON tree\"). Rows are `role=\"treeitem\"` with `aria-level`, and `aria-expanded` on objects and arrays. Focus moves with a roving `tabIndex`.",
      "Each row's name reads the key and value, such as `status: \"paid\"`, or `customer: object, 6 keys` for a container.",
      "The tree is described as \"Press C to copy a value and P to copy its path.\" Copies and the search match count are announced through polite live regions.",
      "The chevron turn has `motion-reduce:transition-none`, so it does not animate under `prefers-reduced-motion: reduce`.",
    ],
  },
  kbd: {
    faq: [
      {
        q: "How do I show Ctrl on Windows and ⌘ on a Mac?",
        a: "Kbd renders whatever you pass it, so detect the platform yourself after mount, for example from `navigator.platform`, and render `⌘` or `Ctrl`. Picking the key during server rendering causes a hydration mismatch, so default to one and switch in an effect.",
      },
      {
        q: "Can I put an icon in a keycap?",
        a: "Yes. Any `svg` inside is sized to 12px: `<Kbd><ArrowUpIcon /></Kbd>`. Give the icon `aria-hidden` and add the key name as hidden text.",
      },
      {
        q: "Why does KbdGroup inside a paragraph cause a hydration error?",
        a: "`KbdGroup` renders a `<div>`, and a `<div>` inside a `<p>` is invalid HTML, which React reports as a hydration error. In running text, put the `Kbd` elements straight into the sentence, or wrap them in `<span className=\"inline-flex items-center gap-1\">`.",
      },
    ],
    a11y: [
      "Renders a native `<kbd>`. `KbdGroup` is a `<div>` with no separator text, so a combo is read as its keys in a row, with no \"plus\" between them.",
      "Many screen readers read symbols such as `⌘` by their Unicode name. [`ShortcutCheatSheet`](/docs/shortcut-cheat-sheet) adds spoken names for you. With Kbd alone, hide the keycaps with `aria-hidden` and add a [`VisuallyHidden`](/docs/visually-hidden) label such as \"Command K\".",
    ],
  },
  "latency-badge": {
    faq: [
      {
        q: "How are the colours decided?",
        a: "Below `thresholds.fast` (100 by default) it is green, below `thresholds.slow` (400) amber, and anything else red. The bounds are exclusive, so exactly 100ms is amber. Set your own per endpoint, such as `thresholds={{ fast: 300, slow: 1000 }}` for a report export.",
      },
      {
        q: "Can I style or test against the speed tier?",
        a: "Yes. The badge carries `data-speed` with `\"fast\"`, `\"slow\"` or `\"very-slow\"`. The number is rounded with `Math.round` and always shown in ms, so 2400 reads \"2400ms\".",
      },
    ],
    a11y: [
      "The speed tier is shown by colour only. The number carries the meaning, but if \"slow\" matters, say it in nearby text.",
      "The unit is `<abbr title=\"milliseconds\">ms</abbr>`, and digits are `tabular-nums`, so badges in a column line up.",
    ],
  },
  "logs-viewer": {
    faq: [
      {
        q: "How do I show my own log lines?",
        a: "LogsViewer takes only `className`; the lines live in the `LOGS` array at the top of the file. After you add it, replace that array with a prop or your data. Each line needs an `id`, a `level` of `\"info\"`, `\"warn\"` or `\"error\"`, a `time` string and a `msg`.",
      },
      {
        q: "Does it stream or follow new lines?",
        a: "No. It filters the lines it has in memory and does not scroll to the newest one. The list is capped at `max-h-72` and scrolls. For output that grows live, use [`ConsoleOutput`](/docs/console-output).",
      },
      {
        q: "What does the filter search?",
        a: "It is a case-insensitive substring match on the message only, not the time or level. The level switch offers All, Warn and Error; All includes info lines.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves between the level switch, the filter field and the log list." },
      { keys: "ArrowUp / ArrowDown", action: "On the focused log list, scrolls it." },
    ],
    a11y: [
      "The panel is a `<section>` labelled by its \"Sync logs\" `<h2>`.",
      "After each filter change, a polite live region announces \"4 lines shown\".",
      "The list is an `<ol aria-label=\"Log lines\">` with `tabIndex={0}`, so keyboard users can scroll it. Each level is printed as a word in a badge, not shown by colour alone.",
    ],
  },
  "merge-box": {
    faq: [
      {
        q: "Why does it say \"Wait for audit + typecheck\"?",
        a: "That is the default `message` when `canMerge` is false. Pass your own, such as `message=\"2 of 5 checks still running.\"`. Note that `canMerge` defaults to `true`.",
      },
      {
        q: "How do I show that a merge is in progress?",
        a: "There is no loading state. The button is disabled only when `canMerge` is false, and that also switches the title to \"Checks pending\". For a merging state, build the panel from [`Callout`](/docs/callout), [`Button`](/docs/button) and [`Spinner`](/docs/spinner).",
      },
    ],
    a11y: [
      "The status is a [`Callout`](/docs/callout), which is `role=\"note\"`, not a live region. A change from pending to ready is not announced.",
      "When `canMerge` is false the button is natively `disabled`, so it leaves the Tab order. The reason is in the callout just above it.",
    ],
  },
  "notebook-cell": {
    faq: [
      {
        q: "How do I run the code and show the result?",
        a: "NotebookCell runs nothing itself. `onRun` is your callback: set `running` while your work runs, then pass the result as `output`. Leave `output` undefined or `null` to hide the output area; an empty string shows an empty one.",
      },
      {
        q: "Can people edit the code in the cell?",
        a: "No. `code` is a string shown as plain text in a [`CodeEditorFrame`](/docs/code-editor-frame), with no syntax highlighting. Line breaks and indentation are kept, and long lines wrap. For an editable cell, use `CodeEditorFrame` directly with your own `<textarea>`, CodeMirror or Monaco inside.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the run button, then to the output area." },
      { keys: "Enter / Space", action: "On the run button, calls `onRun`. The button is disabled while `running` is true." },
      { keys: "ArrowUp / ArrowDown", action: "On the focused output, scrolls long results." },
    ],
    a11y: [
      "While `running` is true the cell has `aria-busy`, and the run button is disabled and labelled \"Running cell\" instead of \"Run cell\".",
      "The output is a `<pre aria-label=\"Output\" aria-live=\"polite\" tabIndex={0}>`, so new results are announced and long ones can be scrolled from the keyboard.",
      "The editor frame is `role=\"group\"` named after `filename` (default \"cell.ts\").",
    ],
  },
  "relative-time": {
    faq: [
      {
        q: "Does the label update by itself?",
        a: "Only with `live`, which re-renders once a minute. Without it, \"3h ago\" is worked out when the component renders and stays until something re-renders it.",
      },
      {
        q: "What does it show for future dates or other languages?",
        a: "Future dates are clamped to zero and read \"just now\". The labels are fixed English (`just now`, `5m ago`, `3h ago`, `2d ago`, `4mo ago`, `1y ago`, with 30-day months and 365-day years). For other languages or \"in 3 days\", format with `Intl.RelativeTimeFormat` yourself.",
      },
      {
        q: "Will it cause a hydration error in Next.js?",
        a: "No. The `<time>` has `suppressHydrationWarning`, because the server and the browser can disagree by a minute. React keeps the server text until the next render, so pair it with `live` if the gap matters.",
      },
    ],
    a11y: [
      "Renders `<time dateTime=\"2026-11-14T09:30:00.000Z\">`, so the exact instant is in the markup for machines and assistive tech.",
      "Hovering shows the full local date from the `title` attribute. Screen readers do not reliably read `title`, so put the full date in visible text where it matters.",
      "The label uses `tabular-nums`, so times in a column do not jitter as they change.",
    ],
  },
  "review-request-card": {
    faq: [
      {
        q: "Why does my card show \"Premium motion elevation\"?",
        a: "`title`, `repo` and `author` all have sample defaults. Pass all three for real data.",
      },
      {
        q: "How do I link Review and View diff to pages?",
        a: "They are buttons, not links, with `onReview` and `onViewDiff` callbacks. In Next.js call `router.push(prUrl)` in `onReview`. People cannot open them in a new tab; if they need to, edit the copied file to use `render={<Link href={prUrl} />}` on the buttons.",
      },
    ],
    a11y: [
      "The title is a fixed `<h3>`. The avatar is `aria-hidden` because the author's name is already in the text.",
      "Both buttons are `type=\"button\"`, so the card is safe inside a form.",
      "Every card's buttons are named just \"Review\" and \"View diff\". In a list of cards, screen reader users hear several identical buttons, so consider adding the PR title to each label.",
    ],
  },
  "schema-field-row": {
    faq: [
      {
        q: "How do I show nested fields?",
        a: "There is no depth prop. Indent child rows with `className=\"pl-4\"` and use a dotted name, such as `name=\"customer.email\"`, so the path is clear when the row is read on its own.",
      },
      {
        q: "How do I mark a default value or a deprecated field?",
        a: "`description` takes a node, so write it there: `description={<>Amount in cents. Defaults to <code>0</code>.</>}`. `required` is the only built-in badge.",
      },
    ],
    a11y: [
      "Each row is a `<div>` grid, not a table row, so screen readers read name, \"required\", type and description in order.",
      "Names and types are `<code>` elements. Long names break anywhere and long types wrap, so nothing overflows on phones.",
    ],
  },
  "secret-reveal": {
    faq: [
      {
        q: "Is the secret hidden from the browser while it is masked?",
        a: "No. `revealedValue` is sent to the browser because Copy always copies it. Masking only hides it on screen. Pass a key only to someone allowed to see it, and for keys shown once, show them only right after they are created.",
      },
      {
        q: "How is the mask built?",
        a: "When you do not pass `value`, it keeps a prefix like `sk_live_` or `md_test_`, then eight dots, then the last four characters. Pass `value` to show your own masked text.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the Reveal button, then the Copy button." },
      { keys: "Enter / Space", action: "On Reveal, shows or hides the secret. On Copy, copies the real secret." },
    ],
    a11y: [
      "The Reveal button is labelled \"Reveal API key\" or \"Hide API key\" from `label`, and carries `aria-pressed`.",
      "Copy is labelled \"Copy API key\". After a successful copy, a polite live region announces \"Copied\".",
      "The default `label` is \"secret\", so pass a specific one.",
    ],
  },
  "shortcut-cheat-sheet": {
    faq: [
      {
        q: "Does it make the shortcuts work?",
        a: "No, it only displays them. Register the keys yourself, for example with a `keydown` listener on `document`, and keep `rows` in sync with what you register.",
      },
      {
        q: "How do I show a sequence like G then I, not a chord?",
        a: "`keys` renders as keycaps side by side, so `[\"G\", \"I\"]` looks the same as a chord. Say it in the action text, such as \"Go to inbox (G, then I)\".",
      },
      {
        q: "How do I open it when someone presses ?",
        a: "Put it in a [`Dialog`](/docs/dialog) and open the dialog from your own `keydown` handler when `event.key === \"?\"`, ignoring key presses inside inputs.",
      },
    ],
    a11y: [
      "The list is a `<ul>` labelled by the title. The title is a `<p>`, not a heading.",
      "The keycaps are `aria-hidden`, and each row has a screen-reader-only spoken version: `⌘` is read as \"Command\", `⇧` as \"Shift\", `?` as \"Question mark\", and the arrows as Up, Down, Left and Right.",
    ],
  },
  "sql-result-table": {
    faq: [
      {
        q: "How are NULL, booleans and numbers shown?",
        a: "Only a real `null` renders as a dimmed, italic NULL; the string `\"NULL\"` prints as plain text. Booleans and numbers go through `String()`, and every cell is monospace and left aligned with `tabular-nums`.",
      },
      {
        q: "Can it show thousands of rows?",
        a: "It renders every row you pass, with no virtualisation or paging, and the header does not stick. Limit the query, or cap the height with `className=\"max-h-80\"` so it scrolls. For sorting and paging use [`Table`](/docs/table).",
      },
      {
        q: "Why does it show sample rows?",
        a: "`columns`, `rows` and `caption` have sample defaults. Pass all three, with a caption like \"users, 3 rows\".",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the result frame." },
      { keys: "ArrowLeft / ArrowRight", action: "Scrolls wide results sideways while the frame is focused. Up and Down scroll tall ones." },
    ],
    a11y: [
      "The frame is `role=\"region\"` named by `caption`, with `tabIndex={0}`, so keyboard users can scroll wide results.",
      "The table has a screen-reader-only `<caption>` and `<th scope=\"col\">` headers, so each cell is read with its column name.",
    ],
  },
  "stack-trace": {
    faq: [
      {
        q: "How do I use it in a Next.js error.tsx?",
        a: "`error.tsx` is a client component, so render `<StackTrace stack={error.stack ?? error.message} />`. In production builds, errors thrown in Server Components reach the client with a generic message and a `digest`, so the stack is most useful in development and for client errors.",
      },
      {
        q: "How do I limit its height?",
        a: "Long lines do not wrap; the `<pre>` scrolls both ways. Cap it with `className=\"max-h-64\"`. It prints the text as given, with no frame parsing or syntax colouring.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the trace so it can be scrolled." },
      { keys: "ArrowUp / ArrowDown", action: "Scrolls the focused trace. Left and Right scroll long lines." },
    ],
    a11y: [
      "The `<pre>` is `role=\"region\"` named \"Stack trace\" (set `label` to change it), with `tabIndex={0}` and a 2px accent focus ring.",
    ],
  },
  "status-page": {
    faq: [
      {
        q: "How do I list my own services?",
        a: "StatusPage takes only `className`; the services are the `SERVICES` array in the file. Each has a `name`, a `status` of `\"operational\"`, `\"degraded\"` or `\"down\"`, and `downtimes`, the day indexes (0 is the oldest of 90) with an outage. Also update the `VERDICT` text, whose \"degraded\" message names Stripe sync.",
      },
      {
        q: "How is the overall status and the uptime percentage worked out?",
        a: "The headline badge takes the worst status of any service, so it never disagrees with the list. Uptime counts whole days: each day listed in `downtimes` counts as fully down, so one bad day in 90 shows 98.89%.",
      },
    ],
    a11y: [
      "The page is a `<section>` labelled by its `<h2>`. Each service's status is a word next to the dot, not colour alone.",
      "Each 90-day bar is `role=\"img\"` with a label that starts with the service name, such as \"Stripe sync, last 90 days: 97.78% uptime over 90 days, 2 days with downtime\". Each bar makes sense on its own, even out of its row.",
    ],
  },
  terminal: {
    faq: [
      {
        q: "When does the typing start?",
        a: "When at least 30% of the window is on screen. It pauses when the window scrolls away and carries on where it left off. Set `loop` to start over 2.4 seconds after the last line, and `onComplete` fires each time the last line prints.",
      },
      {
        q: "How do I control the timing of each line?",
        a: "`typingSpeed` is ms per character (26), `commandDelay` is the pause before a command (600) and `lineDelay` the pause before each output line (160). Any line can override its own wait with `delay`.",
      },
      {
        q: "Does it run commands or take input?",
        a: "No. It plays the scripted `lines` you pass and has no input or copy button. For a static transcript use [`TerminalWindow`](/docs/terminal-window), and for a command people should copy use [`CodeBlock`](/docs/code-block).",
      },
      {
        q: "Can it follow the light theme?",
        a: "Yes. It stays dark in both themes by default; pass `appearance=\"auto\"` to use the page's theme tokens instead.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the Replay button, the only focusable control." },
      { keys: "Enter / Space", action: "On Replay, starts the transcript again from the first line." },
    ],
    a11y: [
      "The animated body is `aria-hidden`. A screen-reader-only `<pre>` holds the whole transcript, with the prompt before each command, so it is read in full and never half-typed.",
      "Under `prefers-reduced-motion: reduce`, every line shows at once and no typing timers run. `onComplete` fires straight away.",
      "The Replay button is labelled \"Replay\". Pass `replay={false}` to remove it.",
    ],
  },
  "terminal-window": {
    faq: [
      {
        q: "How do I colour the prompt or a success line?",
        a: "Children render inside a `<pre>`, so spans work: `<TerminalWindow title=\"zsh\"><span className=\"text-fg-muted\">$</span> npm test{\"\\n\"}<span className=\"text-success\">✓ 42 passed</span></TerminalWindow>`. Whitespace and line breaks are kept.",
      },
      {
        q: "TerminalWindow or Terminal?",
        a: "TerminalWindow is static, with no JavaScript behaviour. [`Terminal`](/docs/terminal) types each command out, prints lines one by one and has a replay button.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the output so it can be scrolled." },
      { keys: "ArrowUp / ArrowDown", action: "Scrolls the focused output. Left and Right scroll long lines." },
    ],
    a11y: [
      "The output `<pre>` has `tabIndex={0}`, so long output can be scrolled from the keyboard, and `role=\"region\"` with an `aria-label` set from the title, such as \"zsh output\". Screen readers list it as a landmark with that name.",
      "The three coloured dots are `aria-hidden`.",
    ],
  },
  "trace-waterfall": {
    faq: [
      {
        q: "How do I convert OpenTelemetry spans?",
        a: "For each span pass `start` as milliseconds since the root span began, `duration` in milliseconds, and `depth` as the number of ancestors. Sort them so each parent comes before its children; the component draws spans in array order and builds no tree.",
      },
      {
        q: "Why do two traces look the same length?",
        a: "Bars are scaled to the end of the latest span in each trace, not to a fixed time scale. Compare traces by the duration column, not by bar length.",
      },
    ],
    a11y: [
      "The spans are a `<ul aria-label=\"Trace spans\">`. Each item reads the name, a hidden \", starts at 24ms\" and the duration; the bar is `aria-hidden`.",
      "Nesting is shown by indentation only, so screen readers hear a flat list. Name child spans so they make sense on their own.",
    ],
  },
  "version-badge": {
    faq: [
      {
        q: "Do I pass the version with or without the v?",
        a: "Either. A leading `v` or `V` is removed and one `v` is added back, so `\"2.4.1\"` and `\"v2.4.1\"` both show `v2.4.1`. Pre-release text such as `2.5.0-rc.1` is shown as given.",
      },
      {
        q: "How do I link it to the changelog?",
        a: "It has no `href`; wrap it: `<a href=\"/changelog#2-4-1\"><VersionBadge version=\"2.4.1\" /></a>`.",
      },
    ],
    a11y: [
      "The channel word is lowercase in the markup and uppercase only through CSS, so screen readers say \"beta\" rather than spelling out letters.",
      "The pill colours are tints behind `text-fg` text, so the channel name stays readable in every theme.",
    ],
  },
  "webhook-list": {
    faq: [
      {
        q: "How do I pause, edit or delete an endpoint?",
        a: "Rows have no actions; the only callback is `onAdd`. Edit the `<li>` in the copied file to add a [`DropdownMenu`](/docs/dropdown-menu) or a [`Switch`](/docs/switch) per row.",
      },
      {
        q: "What shows when there are no endpoints?",
        a: "Pass `hooks={[]}` and the list is replaced by \"No endpoints yet. Add one to get events as they happen.\" Leaving out `hooks` shows two sample endpoints instead.",
      },
      {
        q: "What shape does each webhook need?",
        a: "`{ url, events, status }`, where `events` is one comma-separated string, not an array, and `status` is `\"active\"` or `\"paused\"`. Rows are keyed by `url`, so two endpoints with the same URL trigger a React key warning.",
      },
    ],
    a11y: [
      "The heading is a fixed `<h3>` reading \"Webhooks\".",
      "Status is a badge with the word \"Active\" or \"Paused\", not colour alone.",
      "Long URLs are cut off on screen with `truncate`, but the full URL is still in the DOM and read in full.",
    ],
  },
}
