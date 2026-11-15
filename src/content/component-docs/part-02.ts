import type { ComponentDocsContent } from "../types"

export const PART_02: Record<string, ComponentDocsContent> = {
  button: {
    faq: [
      {
        q: "Why doesn't my Button submit the form?",
        a: "Base UI renders the `<button>` with `type=\"button\"`, so pressing it inside a `<form>` does nothing by default. Pass `type=\"submit\"` on the button that should submit.",
      },
      {
        q: "How do I make a Next.js Link look like a button?",
        a: "Pass the link as `render`: `<Button render={<Link href=\"/pricing\" />}>See pricing</Button>`. `nativeButton` is set to `false` for you, and the element keeps its link role, so screen readers announce a link. You can also put `buttonVariants({ variant: \"outline\" })` in the `className` of a plain `<Link>`.",
      },
      {
        q: "How do I show a loading state?",
        a: "There is no `loading` prop. Set `disabled` while the request runs and put a [`Spinner`](/docs/spinner) before the label: `<Button disabled={saving} focusableWhenDisabled><Spinner size=\"sm\" label=\"Saving\" /> Save</Button>`. `focusableWhenDisabled` keeps keyboard focus on the button while it is disabled.",
      },
      {
        q: "Can I use Button in a Next.js Server Component?",
        a: "Yes, for static buttons and `render` links. The file is marked `\"use client\"`, and a Server Component cannot pass functions to it, so a button with `onClick` belongs in a client component. A Server Action is the exception: pass it as `formAction`.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "Activates the button. With `render={<a />}`, Enter follows the link and Space activates it too." },
      { keys: "Tab", action: "Moves focus to the button. A disabled button is skipped unless `focusableWhenDisabled` is set." },
    ],
    a11y: [
      "Renders a native `<button>` by default. With `render`, `nativeButton` becomes `false` and Base UI adds the Enter and Space handling. A `render` element with `href` keeps its link role; any other element gets `role=\"button\"`.",
      "On a native button, `disabled` sets the `disabled` attribute. With `focusableWhenDisabled` it sets `aria-disabled=\"true\"` instead, so the button stays in the Tab order and screen readers still find it.",
      "The focus ring is `focus-visible` only: a 2px accent ring with a 2px offset, so it shows for keyboard users and not on mouse clicks.",
      "An icon-only button needs an accessible name. Use [`IconButton`](/docs/icon-button), which requires `aria-label`.",
    ],
  },
  "animated-beam": {
    faq: [
      {
        q: "How do I draw a beam between my own elements?",
        a: "Use the exported `Beam` primitive with three refs: `container`, `from` and `to`. Give the container `className=\"relative\"`, because the SVG is placed over it with `absolute inset-0`. Each beam runs from the centre of one element to the centre of the other.",
      },
      {
        q: "Why doesn't the beam follow an element that moves?",
        a: "Paths are measured on mount, one frame later, and whenever the container resizes (a `ResizeObserver` on `container`). A node that moves without the container changing size, for example during a transform animation, keeps the old path until the next resize.",
      },
      {
        q: "How do I stagger several beams or send data the other way?",
        a: "Give each `Beam` a growing `delay` in seconds and the same `duration`. `reverse` runs the pulse from `to` back to `from`, and `curvature` bends the path in pixels (positive bends up, negative bends down). `AnimatedBeam` itself staggers its inputs by 0.35s.",
      },
    ],
    a11y: [
      "Every beam SVG is `aria-hidden`. `AnimatedBeam` adds an `sr-only` sentence built from the labels, such as \"Email, Chat, Docs, CRM flow into Agent, which responds to Customer.\" With `Beam` alone, describe the diagram yourself.",
      "Under reduced motion the travelling light is not rendered. The static grey path stays, so the connections are still visible.",
    ],
  },
  "animated-feature-row": {
    faq: [
      {
        q: "Can I add icons or links to the cards?",
        a: "No. Each feature takes only `title` and `description`. For cards with your own markup, wrap them in [`BlurFade`](/docs/blur-fade) and grow its `delay` per card.",
      },
      {
        q: "Is the text hidden until the row scrolls into view?",
        a: "No. Only the vertical position animates: cards start 16px low and settle once (`viewport={{ once: true }}`). Opacity is never touched, so the text is readable before JavaScript loads and in crawlers.",
      },
    ],
    a11y: [
      "Each card title is an `<h3>`. The level is fixed in the file, so change it there if the row sits under an `<h3>` or deeper.",
      "The short accent rule above each title is `aria-hidden`.",
      "Under reduced motion the cards render in place with no transition.",
    ],
  },
  "animated-list": {
    faq: [
      {
        q: "Can I push real-time events into AnimatedList?",
        a: "Not as is. It cycles through `items` on a timer (`interval`, 1800ms by default) and loops back to the first item, so it suits a demo feed on a marketing page. For a real stream of events use [`ActivityFeed`](/docs/activity-feed) or [`NotificationInbox`](/docs/notification-inbox).",
      },
      {
        q: "Does it keep animating when nobody is looking?",
        a: "No. The timer only runs while at least 40% of the list is on screen, and it pauses while the pointer is over it or the list has keyboard focus. Under reduced motion it shows the first `max` items and never changes.",
      },
    ],
    keyboard: [{ keys: "Tab", action: "Focuses the list, which pauses the feed until focus leaves." }],
    a11y: [
      "It renders a `<ul>` of `<li>` items. There is no live region, so screen readers are not interrupted by each arrival.",
      "The `<ul>` is a tab stop with `tabIndex={0}`, a `focus-visible` ring and an `aria-label` from `label` (\"Live activity\" by default). Hover or keyboard focus pauses the feed, so it can be read (WCAG 2.2.2).",
      "Under reduced motion `layout` animation is off and enter and exit transitions take 0s.",
    ],
  },
  "aurora-background": {
    faq: [
      {
        q: "How do I make the aurora fill my hero?",
        a: "Set the height in `className`: the default is `h-[360px]`, so use `h-[480px]` or `min-h-svh`. Your `children` render in a `relative z-10 h-full` layer above the light. With no children it shows a sample headline and button.",
      },
      {
        q: "How do I change the aurora colours or make it subtler?",
        a: "Pass `colors` (any CSS colour, including `var(--token)`) and lower `intensity`. Light mode runs at 64% of `intensity` and dark mode at 100%, so one value suits both themes. `blur={0}` gives hard-edged bands.",
      },
      {
        q: "Does it cost anything when it is off screen?",
        a: "The CSS animation is paused (`animationPlayState: \"paused\"`) when the panel is more than 80px outside the viewport. Only `transform` animates; the blur filter is static.",
      },
    ],
    a11y: [
      "The light layer is `aria-hidden` and `pointer-events-none`, so only your content is read and clickable.",
      "Under reduced motion the three curtains are held still at a small fixed offset instead of swaying.",
      "Text sits directly on moving colour, so check contrast of your heading against the brightest band at your chosen `intensity`.",
    ],
  },
  "background-boxes": {
    faq: [
      {
        q: "Do buttons and links on top of BackgroundBoxes still work?",
        a: "Yes. The pointer handler sits on the outer panel and the grid layer is `pointer-events-none`, so your content gets clicks while the box under the cursor still lights.",
      },
      {
        q: "Why is the grid missing from the server HTML?",
        a: "The grid is measured on the client with a `ResizeObserver`, so the server renders an empty panel and hydration matches. The boxes appear after the first measure.",
      },
      {
        q: "How many DOM nodes does it create?",
        a: "One `<div>` per box. A 1200 by 360 panel at `density={1}` (64px boxes) makes about 400, and `density={2}` makes about four times as many. Lower `density` for very large panels, and pass `idle={0}` to turn off the random flicker.",
      },
    ],
    a11y: [
      "The whole grid is `aria-hidden` and only reacts to the pointer, so keyboard and screen reader users get the content alone.",
      "Under reduced motion the idle flicker is off and lit boxes clear instantly (`--bb-fade: 0s`).",
    ],
  },
  "blur-fade": {
    faq: [
      {
        q: "How do I stagger a list with BlurFade?",
        a: "Wrap each item in its own `BlurFade` and grow `delay`: `<BlurFade key={f.id} delay={i * 0.08}>`. Position settles on a spring; opacity and blur use a tween so they never overshoot.",
      },
      {
        q: "Why is my content invisible until I scroll, or missing in screenshots?",
        a: "The server HTML carries the `initial` style (`opacity: 0` and a blur), so content stays hidden until JavaScript runs and the element is in view. A very tall element may never reach the default `amount={0.3}`; lower `amount` for long sections. Do not wrap the main text of a page or above-the-fold content in it.",
      },
      {
        q: "Can it replay every time the element enters the viewport?",
        a: "Yes, pass `once={false}`. With the default `once={true}` it reveals one time and stays.",
      },
    ],
    a11y: [
      "Hidden content is only `opacity: 0`, so screen readers still read it before it reveals.",
      "Under reduced motion the transition is 0s, so the content appears with no blur or travel.",
    ],
  },
  "border-beam": {
    faq: [
      {
        q: "Why does the beam not line up with my card's corners?",
        a: "Set `radius` to the wrapped element's corner radius in pixels. The default is `18`, so a `rounded-xl` (12px) card needs `radius={12}`. The child should use `rounded-[inherit]` or the same radius.",
      },
      {
        q: "Does BorderBeam change the layout of the wrapped element?",
        a: "No. It wraps the child in a `relative w-fit` box and draws the beam in an absolutely positioned ring masked to `width` pixels, so the child keeps its size. Pass `className=\"w-full\"` when the child should stretch.",
      },
    ],
    a11y: [
      "The beam layer is `aria-hidden` and `pointer-events-none`; inputs and buttons inside keep working.",
      "Only `transform: rotate` animates. Under reduced motion the gradient is drawn but does not move.",
    ],
  },
  "card-tilt": {
    faq: [
      {
        q: "Does the tilt work on phones?",
        a: "No. The handler ignores any pointer that is not `\"mouse\"`, so touch and pen see a flat card. That avoids the card fighting with page scroll.",
      },
      {
        q: "How do I put an image or my own layout inside CardTilt?",
        a: "Pass `children`; they replace the built-in eyebrow, `title` and `body`. Lower `maxTilt` (default 10 degrees) for large images, where the same angle moves the edges further.",
      },
    ],
    a11y: [
      "The glare layer is `aria-hidden` and `pointer-events-none`.",
      "Under reduced motion the card stays flat and the glare is removed.",
      "The built-in title is an `<h3>`. The card itself is not focusable, so put links or buttons inside when it should do something.",
    ],
  },
  "confetti-button": {
    faq: [
      {
        q: "Can I fire the confetti only after a request succeeds?",
        a: "Not with this component. It bursts on every click, right after your `onClick` runs, and does not wait for a promise. Use it for actions that finish on click, or show a success state with [`Toast`](/docs/toast) instead.",
      },
      {
        q: "Can ConfettiButton submit a form?",
        a: "Yes. It defaults to `type=\"button\"`, and your props are spread after it, so `type=\"submit\"` works. The burst still fires on click even if form validation then blocks the submit.",
      },
      {
        q: "How do I change the confetti colours?",
        a: "Pass `colors` as CSS colours. Without it the colours are read from `--accent`, `--accent-2`, `--success`, `--warning` and `--info` at click time, so they follow the current theme. `count` sets pieces per burst (default 70).",
      },
    ],
    a11y: [
      "A native `<button>` with a `focus-visible` accent ring, so it behaves like any other button.",
      "The confetti is drawn on a temporary full-screen `<canvas>` with `pointer-events: none`, removed when the pieces land.",
      "Under reduced motion the burst is skipped and `onClick` still runs.",
    ],
  },
  "cursor-spotlight-panel": {
    faq: [
      {
        q: "What do touch users see?",
        a: "A still glow. The spotlight only follows `\"mouse\"` pointers and otherwise stays at 50% across and 40% down. Reduced motion gets the same still glow.",
      },
      {
        q: "How is it different from CardTilt?",
        a: "It stays flat and only moves a light across a sunken panel. [`CardTilt`](/docs/card-tilt) rotates the whole card in 3D, which suits a single showcase tile more than a block of text.",
      },
    ],
    a11y: [
      "The spotlight is an `aria-hidden`, `pointer-events-none` overlay behind the content (`-z-10`).",
      "The built-in title is an `<h3>`. Pass `children` if your page needs another level.",
    ],
  },
  "device-frame-stack": {
    faq: [
      {
        q: "Can I show real screenshots in the frames?",
        a: "No. The three frames are skeleton placeholders with a title from `frames`. To show a real screenshot, use [`BrowserMockup`](/docs/browser-mockup) or [`DeviceFrame`](/docs/device-frame).",
      },
    ],
    a11y: [
      "The stack is one `role=\"img\"` element named by `label`. Write a `label` that says what the frames stand for; the frame titles themselves are `aria-hidden`.",
      "Under reduced motion the frames jump to the spread with a 0s transition instead of springing.",
    ],
  },
  "flickering-grid": {
    faq: [
      {
        q: "Will FlickeringGrid slow down my page?",
        a: "It redraws a canvas at most 30 times a second and stops when it is off screen or the tab is hidden. The canvas resolution is capped at 2x device pixels. Smaller `squareSize` and `gap` mean more squares to draw.",
      },
      {
        q: "Why didn't the colour update when I switched theme?",
        a: "It does update when the `class` or `data-material` attribute on `<html>` changes, because a `MutationObserver` re-reads `color` then. A theme set on another element, or with `data-theme`, is not watched, so remount the grid or change `color`.",
      },
    ],
    a11y: [
      "The canvas is `aria-hidden` and `pointer-events-none`; children render in a `z-10` layer on top.",
      "Under reduced motion it draws one still frame and never starts the animation loop.",
    ],
  },
  "flip-stat-board": {
    faq: [
      {
        q: "Can FlipStatBoard show decimals, currency or percentages?",
        a: "No. `value` is a whole number and only digits are drawn. For values like `$2.4M` or `99.9%` use [`StatsCounter`](/docs/stats-counter) or [`NumberRoll`](/docs/number-roll).",
      },
      {
        q: "What do crawlers and no-JS visitors see?",
        a: "The visible digits start at zero and count up once 60% of a tile is on screen. Each tile also has an `sr-only` line with the final number and label, so the real value is in the HTML.",
      },
    ],
    a11y: [
      "Screen readers get only the `sr-only` text, such as \"1,284 Invoices paid this week\". The flipping digits and the visible label are `aria-hidden`, so the count is never read out.",
      "Under reduced motion the final value shows on the first render and the digits do not move.",
    ],
  },
  globe: {
    faq: [
      {
        q: "Is Globe WebGL or three.js?",
        a: "Neither. It draws about 2,000 dots (`dots`) on a 2D canvas with plain trigonometry, so there is no extra dependency. It stops drawing when off screen or when the tab is hidden.",
      },
      {
        q: "How do I mark cities and connect them?",
        a: "Pass `markers` with `lat`, `lng` and an optional `label`. With `arcs` on (the default) each marker is joined to the next one in the array, with a pulse along each arc.",
      },
      {
        q: "Does dragging the globe block page scroll on phones?",
        a: "No. The canvas has `touch-action: pan-y`, so a vertical swipe scrolls the page and a sideways drag turns the globe. A quick flick keeps it spinning with inertia.",
      },
      {
        q: "Can buttons sit on top of the globe?",
        a: "Yes. The content layer ignores the pointer except on its direct children, so the globe stays draggable around your text and buttons. `align` moves the globe left, centre or right on panels wider than 512px.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the globe canvas, which shows an inset accent ring." },
      { keys: "ArrowLeft / ArrowRight", action: "Turns the globe sideways." },
      { keys: "ArrowUp / ArrowDown", action: "Tilts the globe up or down, within a fixed limit." },
    ],
    a11y: [
      "The canvas has `role=\"img\"` and an `aria-label` built from your markers, such as \"Globe with markers for London, New York. Drag or use the arrow keys to rotate.\"",
      "The canvas has `tabIndex={0}`, so keyboard users can reach it and turn it with the arrow keys.",
      "Under reduced motion it draws one still frame. Dragging and arrow keys still turn it, but a flick does not keep spinning.",
    ],
  },
  "gradient-text": {
    faq: [
      {
        q: "Does gradient text hurt SEO or screen readers?",
        a: "No. The words stay a real text node. Use `as=\"h1\"` or `as=\"h2\"` when the text is the heading, so the gradient is applied to the heading itself.",
      },
      {
        q: "Why did my custom font size get ignored?",
        a: "String children get `text-4xl sm:text-5xl`. Your `className` is merged after it, so a size class there wins. Non-string children get no size class.",
      },
    ],
    a11y: [
      "The text is `text-transparent` with a clipped background, so check contrast at both ends of the gradient against the page.",
      "Under reduced motion the gradient is drawn but does not drift.",
    ],
  },
  "grid-reveal": {
    faq: [
      {
        q: "Can the tiles link somewhere?",
        a: "No. `items` is an array of strings, rendered as plain tiles numbered 01, 02 and so on. For cards with a description use [`AnimatedFeatureRow`](/docs/animated-feature-row); for linked tiles build a grid of links and wrap each in [`BlurFade`](/docs/blur-fade).",
      },
    ],
    a11y: [
      "Tiles are plain `<div>`s with a `<p>` label, not a list, so screen readers read each label and its number as separate paragraphs.",
      "Only the vertical position animates, so the labels are readable before the reveal. Under reduced motion they render in place.",
    ],
  },
  "horizontal-product-rail": {
    faq: [
      {
        q: "Can keyboard users scroll the rail?",
        a: "Yes. The scrolling area is a `role=\"region\"` with `tabIndex={0}`, so it takes focus and the arrow keys scroll it. Touch and trackpads swipe natively, and cards snap to their start edge.",
      },
      {
        q: "Can the cards have images or links?",
        a: "Not as written. Each card takes `title`, `blurb` and an optional `tag`, and the top area is a decorative gradient. Edit the `motion.article` in the file to add an `<img>` or wrap the card in a link.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the rail, which shows an accent ring." },
      { keys: "ArrowLeft / ArrowRight", action: "Scrolls the focused rail sideways (native browser scrolling)." },
    ],
    a11y: [
      "The rail is named by `ariaLabel`, or by `title` when you leave it out.",
      "The \"Scroll sideways\" hint is `aria-hidden`; each card is an `<article>` with an `<h3>` title.",
      "Under reduced motion cards render in place and do not lift on hover.",
    ],
  },
  "hyper-text": {
    faq: [
      {
        q: "Can I use HyperText as the page heading?",
        a: "Wrap it: `<h1><HyperText text=\"Close the books in 24 hours\" /></h1>`. It renders a `<span>`, and the server HTML already contains the final text, so crawlers see the real words.",
      },
      {
        q: "How do I run it only once, or only on hover?",
        a: "Set `trigger`: `\"mount\"` runs the first time 60% of it is in view, `\"hover\"` runs on pointer enter, and `\"both\"` (the default) does both. Touch never triggers the hover run.",
      },
    ],
    a11y: [
      "Screen readers get the text once from an `sr-only` span. The scrambling glyphs are `aria-hidden`.",
      "Under reduced motion it never scrambles; the final text shows at once.",
    ],
  },
  "icon-cloud": {
    faq: [
      {
        q: "How do I use my own logos in IconCloud?",
        a: "Pass them as `children`: each child becomes one tile on the sphere, `itemSize` pixels square (48 by default). Without children it shows 30 lucide icons. Positions are computed the same way on the server and the client, so the sphere is already in place in the server HTML.",
      },
      {
        q: "Can the icons be links?",
        a: "Avoid it. Every tile is `aria-hidden`, so a link inside would be focusable but unnamed for screen readers. Put the list of integrations in nearby text, and keep the cloud decorative.",
      },
      {
        q: "How do I stop it from spinning or being dragged?",
        a: "`speed={0}` holds it still until someone drags it. `interactive={false}` turns off dragging and the arrow keys and takes it out of the Tab order.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the sphere when `interactive` is on (the default)." },
      { keys: "ArrowLeft / ArrowRight", action: "Gives the sphere a sideways push. Under reduced motion it turns one fixed step instead." },
      { keys: "ArrowUp / ArrowDown", action: "Tilts the sphere up or down." },
    ],
    a11y: [
      "The wrapper is a `role=\"group\"` named \"Rotating cloud of N icons\", with an `sr-only` hint about dragging and arrow keys linked through `aria-describedby`.",
      "Each tile is `aria-hidden`, so describe the items in nearby text.",
      "Under reduced motion there is no idle spin and no inertia after a drag.",
    ],
  },
  "lamp-effect": {
    faq: [
      {
        q: "Why is the lamp panel dark in light mode?",
        a: "`dark` defaults to `true` and adds the `dark` class to the panel, so the tokens inside switch to their dark values and the light has something to fall on. Pass `dark={false}` to follow the page theme.",
      },
      {
        q: "Where should my headline sit?",
        a: "The lamp line is fixed at 34% of the panel height, and the default content is pushed to the bottom with `justify-end`. Keep your `children` in the lower two thirds so the light falls on them. `width` (default 440px) sets the line length and never exceeds 84% of the panel.",
      },
    ],
    a11y: [
      "All the light layers are `aria-hidden` and `pointer-events-none`.",
      "The switch-on plays once, when 30% of the panel is in view. Under reduced motion the lamp is already on.",
      "Because the panel forces the dark tokens, your content inside should use tokens (`text-fg`) rather than fixed colours so it stays readable.",
    ],
  },
  "light-field": {
    faq: [
      {
        q: "Why is LightField blank on some machines?",
        a: "It asks for WebGL with `failIfMajorPerformanceCaveat` and skips software renderers (SwiftShader, llvmpipe), so machines without a real GPU get an empty canvas. Put a still image or gradient behind it as a fallback.",
      },
      {
        q: "How do I size it and layer content on top?",
        a: "It fills its parent. Put it in a sized `relative` box with `className=\"absolute inset-0\"`, and give your content `relative z-10`. The canvas fades in over 700ms on its first frame.",
      },
      {
        q: "Does it follow dark mode?",
        a: "Yes, when the `dark` class is on `<html>`: a `MutationObserver` switches between `palette.light` and `palette.dark`. Each palette is three RGB triples with channels from 0 to 1.",
      },
      {
        q: "How heavy is it?",
        a: "It starts in `requestIdleCallback`, renders at half resolution (`resolution={0.5}`) and 30 fps (`fps`), and stops when off screen or in a background tab. Lower both for weaker devices.",
      },
    ],
    a11y: [
      "The canvas is `aria-hidden`; it carries no content.",
      "Reduced motion is read once when the shader starts: it then draws one still frame and does not animate.",
    ],
  },
  "light-provider": {
    faq: [
      {
        q: "Where do I put LightProvider in a Next.js app?",
        a: "Render `<LightProvider />` once inside `<body>` in `app/layout.tsx`. It renders a hidden `<span>` and only touches `document` in an effect, so it is safe in server-rendered layouts. Without it, shadows fall from a fixed light.",
      },
      {
        q: "How do I switch materials?",
        a: "Render `<MaterialSwitcher />` from the same file, or set `data-material` (`hairline`, `glass`, `metal` or `paper`) on `<html>` or any subtree. `useMaterial()` returns `{ material, setMaterial }` for your own control.",
      },
      {
        q: "Does the chosen material survive a reload?",
        a: "`setMaterial` writes it to `localStorage` under the key `material`, but nothing in this file reads it back. Restore it by setting `data-material` on `<html>` from that key, for example in an inline script before first paint.",
      },
      {
        q: "What if I render two providers?",
        a: "Only the first one runs the light. A second one renders its `children`, or a small demo panel when it has none, and takes over if the first unmounts.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "On the MaterialSwitcher, moves focus to the selected material only (roving focus)." },
      { keys: "ArrowRight / ArrowDown", action: "Selects and focuses the next material, wrapping at the end." },
      { keys: "ArrowLeft / ArrowUp", action: "Selects and focuses the previous material, wrapping at the start." },
      { keys: "Home / End", action: "Selects the first or last material." },
    ],
    a11y: [
      "`MaterialSwitcher` is a `role=\"radiogroup\"` named \"Material\", with one `role=\"radio\"` button per material and `aria-checked` on the selected one.",
      "With `labels={false}` the swatch-only buttons keep an `aria-label` such as \"Glass\".",
      "Under reduced motion (watched live) the light does not move, and switching material skips the circular view transition and the sliding pill.",
    ],
  },
  "live-component-rail": {
    faq: [
      {
        q: "Can I choose which components appear in the rail?",
        a: "Not through props. The six cards (a primary, an outline and a destructive `Button`, a `Badge`, a `Switch` and an `Input`) are defined in the `cards` array in the file. Only `eyebrow`, `title` and `className` are props, so edit that array to show your own components.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the rail, then each live control inside it in turn." },
      { keys: "ArrowLeft / ArrowRight", action: "Scrolls the focused rail sideways (native browser scrolling)." },
    ],
    a11y: [
      "The rail is a `role=\"region\"` named by `title`, with `tabIndex={0}` and a `focus-visible` ring.",
      "The controls are real and named. The demo `Switch` has `aria-label=\"Demo switch\"` and the demo `Input` has `aria-label=\"Search registry\"`. Give any control you add to `cards` a name too.",
      "Under reduced motion the cards render in place.",
    ],
  },
  marquee: {
    faq: [
      {
        q: "How do I change the marquee speed?",
        a: "`duration` is the seconds for one full loop (default 30). Larger is slower. The strip moves by half its width per loop, so more items at the same `duration` also move faster.",
      },
      {
        q: "Why does my marquee not move after installing it?",
        a: "The animation uses the `marquee` keyframes from the kit stylesheet (`@keyframes marquee` in `minidev.css`). Make sure that stylesheet is imported, or add the keyframes to your own CSS.",
      },
      {
        q: "Can I put links in a Marquee?",
        a: "Yes. The first copy stays interactive. The duplicate is `aria-hidden` and `inert`, so its links are not focusable or read twice. Tabbing into a link pauses the strip.",
      },
    ],
    a11y: [
      "It pauses on hover and while anything inside has focus (`group-focus-within`), which meets WCAG 2.2.2 for moving content.",
      "Under `prefers-reduced-motion` the animation is removed with `motion-reduce:[animation:none]`.",
      "Children render twice; only the first copy reaches screen readers.",
    ],
  },
  "masked-gradient-headline": {
    faq: [
      {
        q: "Is the headline hidden before it scrolls into view?",
        a: "Visually, yes: it starts clipped with `clip-path: inset(0 100% 0 0)` and wipes in once 60% of it is visible. The text is in the HTML from the first paint, so crawlers and screen readers read it. Avoid it for the first headline above the fold.",
      },
      {
        q: "How do I pick the heading level?",
        a: "Pass `as=\"h1\"`, `\"h2\"` (default) or `\"h3\"`. The gradient runs from `--fg` to `--accent` to `--accent-2`, so it follows your theme.",
      },
    ],
    a11y: [
      "It renders a real `<h1>`, `<h2>` or `<h3>`, so it appears in the page outline.",
      "Under reduced motion the headline is fully shown with no wipe.",
    ],
  },
  meteors: {
    faq: [
      {
        q: "Why are there no meteors in the server HTML?",
        a: "Paths depend on the panel size, so they are measured with a `ResizeObserver` after mount. The server renders the panel and your content only, and hydration matches.",
      },
      {
        q: "How do I change direction, density or speed?",
        a: "`angle` sets the direction in degrees (0 points right, 90 falls straight down; default 140). `count` is how many are in flight (16), `speed` multiplies the pace and `tail` sets the streak length in pixels.",
      },
    ],
    a11y: [
      "The meteor layer is `aria-hidden` and `pointer-events-none`.",
      "Under reduced motion each meteor is drawn once, still and at half strength, along its path.",
      "Animations pause when the panel is more than 80px outside the viewport.",
    ],
  },
  "metric-ticker-board": {
    faq: [
      {
        q: "How do I show currency or percentages on the board?",
        a: "Each metric takes `format`, which is passed to `Intl.NumberFormat` (`{ style: \"currency\", currency: \"USD\", maximumFractionDigits: 0 }`), and an optional `suffix` such as `\"%\"` or `\"+\"`. Numbers are formatted with the `en-US` locale.",
      },
      {
        q: "When does the roll start?",
        a: "Each card rolls from 0 to its `value` the first time 40% of it is on screen, one card at a time as they scroll in. The grid is one column on phones, two from `sm` and four from `lg`.",
      },
    ],
    a11y: [
      "The final formatted value and suffix are in an `sr-only` span; the rolling digits are `aria-hidden`, so screen readers never hear the count.",
      "Under reduced motion the digits jump straight to the final value when the card comes into view.",
    ],
  },
  "number-roll": {
    faq: [
      {
        q: "How do I format NumberRoll as currency or in another locale?",
        a: "Pass `format` (any `Intl.NumberFormat` options) and `locale`: `<NumberRoll value={total} locale=\"de-DE\" format={{ style: \"currency\", currency: \"EUR\" }} />`. An inline `format` object is fine; the formatter is cached by its contents.",
      },
      {
        q: "How do I flash green or red when the number goes up or down?",
        a: "Add `trend`. A rise tints the number `text-success` and a fall `text-danger` for 900ms, then it fades back.",
      },
      {
        q: "Does NumberRoll count up from zero on load?",
        a: "No. It renders the current `value` straight away, including in the server HTML, and only rolls when `value` changes. For a count-up on scroll, set the value from 0 when it comes into view, as [`MetricTickerBoard`](/docs/metric-ticker-board) does.",
      },
    ],
    a11y: [
      "The formatted value is in an `sr-only` span and the digit strips are `aria-hidden`, so screen readers read \"$1,284\", not ten digits per column.",
      "It is not a live region. If a change must be announced, put the value in your own `aria-live=\"polite\"` element.",
      "Under reduced motion the digits swap instantly with no blur or slide.",
    ],
  },
  "morph-panel": {
    faq: [
      {
        q: "How do I put my own form inside MorphPanel?",
        a: "Pass a render function as `children`: `<MorphPanel label=\"New note\" width={300}>{({ close }) => <NoteForm onDone={close} />}</MorphPanel>`. Calling `close()` shuts the panel and returns focus to the trigger. Focus your first field yourself; only the built-in feedback form focuses its textarea on open.",
      },
      {
        q: "How do I send the built-in feedback form to my API?",
        a: "Pass `onSubmit`, which receives the text. Return a promise to show \"Sending…\"; if it rejects, the form goes back to idle so the user can retry, but no error message is shown. The panel closes itself 1.5s after the \"Sent\" state.",
      },
      {
        q: "Can I open MorphPanel from outside, or control it?",
        a: "Yes. Pass `open` and `onOpenChange` to control it, or `defaultOpen` for the first render. `anchor` picks the trigger corner the panel grows from, for example `\"bottom-right\"` for a button in the bottom-right of the screen.",
      },
      {
        q: "How is it different from Popover or Dialog?",
        a: "The trigger itself grows into the panel, and nothing else on the page is blocked. There is no focus trap and no backdrop. Use [`Popover`](/docs/popover) for a panel anchored beside its trigger, and [`Dialog`](/docs/dialog) when the rest of the page must wait.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the trigger, opens the panel." },
      { keys: "Escape", action: "Closes the panel and returns focus to the trigger." },
      { keys: "Meta+Enter / Ctrl+Enter", action: "In the feedback textarea, sends the note." },
      { keys: "Tab", action: "Moves through the fields and buttons in the panel. Focus is not trapped." },
    ],
    a11y: [
      "The open panel has `role=\"dialog\"` and an `aria-label` from `label` when it is a string, or \"Panel\" otherwise. It is not modal and has no `aria-modal`.",
      "Escape returns focus to the trigger. An outside click closes it and leaves focus where the user clicked.",
      "The textarea has `aria-label=\"Feedback\"` and `maxLength={500}`. The \"Sent\" message renders inside an `aria-live=\"polite\"` element that mounts together with its text, so some screen readers may not announce it.",
      "Under reduced motion the pill and panel swap instantly.",
    ],
  },
  "morphing-text": {
    faq: [
      {
        q: "Will MorphingText make the layout jump?",
        a: "No. Every phrase is rendered invisibly in the same grid cell, so the slot is always as tall as the longest phrase at the current width. Content below it never moves.",
      },
      {
        q: "Can I use it as an h1?",
        a: "Not as is. It renders a `<p>`, which cannot sit inside an `<h1>`, so change the tag in the file or keep your `<h1>` separate. Screen readers hear every phrase joined, such as \"Invoices that close themselves. Reports that write themselves.\", which is long for a page title.",
      },
      {
        q: "How do I make the morph slower?",
        a: "`interval` is how long each phrase holds in milliseconds (default 2600), and `duration` is the length of each morph in seconds (default 1). It pauses when less than 40% is in view.",
      },
    ],
    a11y: [
      "Screen readers get every phrase once, joined with full stops, from an `sr-only` span. The animated layers are `aria-hidden`.",
      "Under reduced motion it shows the first phrase and never changes.",
    ],
  },
  "onboarding-motion": {
    faq: [
      {
        q: "Can I control the current step or know when it changes?",
        a: "No. The step is internal state and there is no `onStepChange`. You get `steps`, `finishLabel` and `onFinish`, which runs when the last button is pressed. For forms or saved progress use [`OnboardingWizard`](/docs/onboarding-wizard).",
      },
      {
        q: "Can a step hold a form or an image?",
        a: "Not as written: each step has a string `title` and `body`. For fields inside steps, use [`OnboardingWizard`](/docs/onboarding-wizard) or [`Stepper`](/docs/stepper).",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the progress segments, then Back and Continue." },
      { keys: "Enter / Space", action: "On a progress segment, jumps to that step. On Back or Continue, moves one step." },
    ],
    a11y: [
      "Each progress segment is a `<button>` with `aria-label=\"Step 2: Compose product UI\"`, and the current one has `aria-current=\"step\"`.",
      "The step text sits in an `aria-live=\"polite\"` region, so the new title and body are announced after each move.",
      "Back is `disabled` on the first step. Under reduced motion steps swap with no slide.",
    ],
  },
  "orbit-logo-cluster": {
    faq: [
      {
        q: "Can I use logo images instead of names?",
        a: "Yes. `logos` takes any React nodes, so pass `<img>` or SVG elements. Each one needs its own accessible name, such as `alt` text, because the list reads them as they are.",
      },
      {
        q: "Does the orbit cost main-thread time?",
        a: "No. It is two CSS `transform` animations (the ring turns, each pill turns back to stay upright), so it runs on the compositor. It pauses on hover. `duration` sets seconds per orbit (default 40).",
      },
    ],
    a11y: [
      "The pills are a `<ul>` named by `label` (default \"Integrations\"), so screen readers hear a plain list of names.",
      "The two guide rings are `aria-hidden`.",
      "Under `prefers-reduced-motion` the animation is removed (`motion-reduce:[animation:none]`). It pauses on hover but not on focus.",
    ],
  },
  "orbiting-circles": {
    faq: [
      {
        q: "How do I add rings and choose their direction?",
        a: "Pass `rings`: each has a `radius` in pixels, a `duration` in seconds per turn, `icons` (lucide components) and optional `reverse`. Keep the largest `radius` under half of `size` (340px by default) so icons stay inside the box.",
      },
      {
        q: "Is OrbitingCircles responsive?",
        a: "It is a fixed `size` in pixels, set as inline width and height. On narrow screens pass a smaller `size` and smaller radii, or wrap it in a box that scales it down.",
      },
    ],
    a11y: [
      "Every ring and icon is `aria-hidden`, and the default centre is a lone icon, so screen readers get nothing. Name the integrations in nearby text, or pass a `center` that contains text.",
      "Under reduced motion the icons are placed on their rings and do not move.",
    ],
  },
  "parallax-panel": {
    faq: [
      {
        q: "How strong is the parallax?",
        a: "`depth` is the pixels the text travels across the full scroll through the panel (default 36). The glow moves the other way at 55% of that. Both use transforms tied to scroll, so nothing lays out again.",
      },
    ],
    a11y: [
      "The title is an `<h3>`; change the tag in the file if your outline needs another level.",
      "The glow is `aria-hidden` and `pointer-events-none`.",
      "Under reduced motion both layers stay still.",
    ],
  },
  particles: {
    faq: [
      {
        q: "How do I make particles follow or avoid the cursor?",
        a: "`mode=\"repel\"` (default) pushes them away and `mode=\"attract\"` pulls them in, within `radius` pixels (default 120). Pointer moves are read on the window, so it works through the content on top.",
      },
      {
        q: "Will Particles slow down my page?",
        a: "It draws `quantity` dots (default 110) on one canvas, capped at 2x device pixels, and stops when off screen or in a background tab. Lower `quantity` for large panels on phones; `drift={0}` holds the field still except near the pointer.",
      },
    ],
    a11y: [
      "The canvas is `aria-hidden` and `pointer-events-none`; children render above it.",
      "Under reduced motion it draws one still frame and does not listen to the pointer at all.",
    ],
  },
  "pin-scroll-gallery": {
    faq: [
      {
        q: "Why doesn't the gallery pin while I scroll?",
        a: "It uses `position: sticky` with `top-20`. Sticky breaks when an ancestor has `overflow: hidden`, `overflow: auto` or a fixed height, so check the parents first. Change `top-20` in the file if your header is taller than 80px.",
      },
      {
        q: "How tall is the section?",
        a: "70vh of scroll per frame plus 10vh, so three frames take 220vh. Vertical scroll drives a sideways `transform`, so frames do not lay out again while it moves.",
      },
    ],
    a11y: [
      "Each frame title is an `<h3>`. All frames are in the DOM, so screen readers read every frame in order.",
      "Frames that are off to the side are still in the Tab order. A link in a later frame can take focus before scrolling has brought that frame into view.",
      "Under reduced motion the gallery renders as a plain grid, one column on phones and three from `md`, with no scroll-driven movement.",
    ],
  },
  "retro-grid": {
    faq: [
      {
        q: "How do I move the horizon or flatten the floor?",
        a: "`horizon` is where the floor meets the sky as a percent from the top (default 56). `angle` tilts the floor between 30 and 85 degrees (default 68); higher is flatter. `cellSize` sets the grid square at the front edge.",
      },
      {
        q: "Can I stop the grid from moving but keep the look?",
        a: "Yes: `speed={0}` removes the animation. The animation also pauses when the panel is more than 80px off screen.",
      },
    ],
    a11y: [
      "The whole floor is `aria-hidden` and `pointer-events-none`.",
      "Under reduced motion the floor is drawn but does not scroll.",
    ],
  },
  ripple: {
    faq: [
      {
        q: "How do I turn off the click ripple?",
        a: "Pass `interactive={false}`. By default a primary-button press anywhere on the panel, including on your buttons on top, sends an extra ripple out from the pointer. At most six extra ripples exist at once.",
      },
      {
        q: "How do I centre the rings on something other than the middle?",
        a: "Set `origin` in percent of the panel: `origin={{ x: 50, y: 40 }}`. `size` is the innermost ring's diameter and `spacing` the gap between rings, both in pixels.",
      },
    ],
    a11y: [
      "The rings are `aria-hidden` and `pointer-events-none`, so clicks reach your content.",
      "Under reduced motion the rings are drawn still and clicks do not add ripples.",
      "Animations pause when the panel is more than 80px outside the viewport.",
    ],
  },
  "scratch-to-reveal": {
    faq: [
      {
        q: "Is the hidden content secret?",
        a: "No. The children are in the DOM and the server HTML from the start, only `aria-hidden` and `inert` until revealed. Do not put a single-use code there that people must not see; fetch it in `onComplete` instead.",
      },
      {
        q: "How do I know when the card is revealed?",
        a: "`onComplete` fires exactly once, when the scratched share reaches `threshold` (default 50%) or the Reveal button is pressed. `onProgress` receives the scratched percentage as it changes.",
      },
      {
        q: "Does scratching work on phones?",
        a: "Yes. The foil canvas uses pointer events with pointer capture and `touch-action: none`, so a finger scratches instead of scrolling the page while it is on the card.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the Reveal button in the bottom-right corner of the foil." },
      { keys: "Enter / Space", action: "On Reveal, clears the foil and moves focus to the revealed content." },
    ],
    a11y: [
      "Until revealed, the content is `aria-hidden` and `inert`, so neither screen readers nor Tab reach it.",
      "A Reveal button gives keyboard and switch users the same result as scratching. Focus moves to the content after it.",
      "An `sr-only` `role=\"status\"` region announces \"Revealed.\"",
      "Under reduced motion the foil disappears at once instead of fading out.",
    ],
  },
  "scroll-chapter-story": {
    faq: [
      {
        q: "Why is there so much space between chapters?",
        a: "Chapters are separated by `space-y-[40vh]`, so each one gets the screen to itself as you read. There is no prop for it, and `className` only reaches the outer wrapper, so change that class in the file for a tighter story.",
      },
      {
        q: "Where does the progress bar stick?",
        a: "It is `sticky top-16`, 64px from the top, so it clears a 64px header. It fills from the moment the section's top reaches the top of the viewport until its end reaches the bottom. Like any sticky element, it stops sticking if an ancestor has `overflow: hidden`.",
      },
    ],
    a11y: [
      "Each chapter is a `<section>` with an `<h3>` title and a visible \"Chapter 1 / 3\" counter.",
      "The progress bar is `aria-hidden`; it only mirrors the scroll position.",
      "Under reduced motion chapters render in place. The bar still follows the scroll exactly, since it is position, not animation.",
    ],
  },
  "scroll-progress": {
    faq: [
      {
        q: "How do I show reading progress for the whole page?",
        a: "Render `<ScrollProgress fixed variant=\"bar\" />` once. It pins a bar to the top of the viewport (and, with `variant=\"both\"`, a ring in the bottom-right) and tracks the window scroll. Nothing else renders.",
      },
      {
        q: "How do I track a scrollable div instead of the page?",
        a: "Pass its ref as `container` and place `ScrollProgress` inside a `relative` wrapper around it; the indicators are positioned `absolute` over that wrapper. Without `fixed` or `container`, it renders its own scrolling panel around `children`, with `title` and `subtitle` in a header.",
      },
      {
        q: "Why does the bar lag a little behind the scroll?",
        a: "It follows the scroll through a spring (stiffness 400, damping 40) to give it weight. Under reduced motion it tracks the scroll position exactly.",
      },
    ],
    a11y: [
      "The ring is a `role=\"progressbar\"` named \"Reading progress\" with `aria-valuenow` from 0 to 100. When only the bar is shown, the bar carries that role instead; otherwise it is `aria-hidden`.",
      "The built-in panel's scroller has `tabIndex={0}`, so keyboard users can scroll it. It is named by the header `title` through `aria-labelledby`.",
    ],
  },
  "scroll-reveal": {
    faq: [
      {
        q: "Is content inside ScrollReveal hidden from Google before it animates?",
        a: "No. Only `transform` moves: the block starts `y` pixels low (18 by default) and rises once 35% of it is in view. Opacity is never changed, so the content is visible in the server HTML and to crawlers.",
      },
      {
        q: "How do I stagger a row of cards?",
        a: "Wrap each card and give it a small growing `delay`: `<ScrollReveal delay={i * 0.08}>`. Steps of 0.06 to 0.1 seconds read as one movement.",
      },
      {
        q: "ScrollReveal or BlurFade?",
        a: "`ScrollReveal` only lifts the block, so text is never hidden. [`BlurFade`](/docs/blur-fade) also fades and un-blurs it, which is softer but keeps the content invisible until it is in view.",
      },
    ],
    a11y: [
      "It renders a plain `<div>` and adds no roles, so the wrapped content keeps its own semantics.",
      "Under reduced motion the block renders in place.",
    ],
  },
  "shimmer-button": {
    faq: [
      {
        q: "How do I make ShimmerButton a link?",
        a: "Pass `render`: `<ShimmerButton render={<a href=\"/signup\" />}>Get started</ShimmerButton>`, or a Next.js `<Link href=\"/signup\" />`. Your other props and `style` are passed to that element, and `className` is merged with its own. No `role=\"button\"` is added, so a link stays a link.",
      },
      {
        q: "Will it submit my form?",
        a: "Not by default: it renders `<button type=\"button\">`. Pass `type=\"submit\"` for a submit button. `tone=\"accent\"` uses the brand colour; the default `\"ink\"` matches the kit's primary button.",
      },
    ],
    a11y: [
      "A native `<button>` (or your `render` element) with a 2px `focus-visible` accent ring.",
      "The sweep and the lit top edge are `aria-hidden`, `pointer-events-none` spans, so only `children` are read.",
      "Under reduced motion the sweep is not rendered at all.",
    ],
  },
  "shine-border": {
    faq: [
      {
        q: "Why does ShineBorder not animate in some browsers?",
        a: "The band turns by animating a registered custom property (`@property --shine-border-angle`). Browsers without `@property` support show the band in a fixed position instead.",
      },
      {
        q: "How do I match my card's corners?",
        a: "Set `radius` in pixels to the child's radius (default 18) and give the child `rounded-[inherit]`. `borderWidth` sets the ring thickness (default 2px).",
      },
      {
        q: "ShineBorder or BorderBeam?",
        a: "ShineBorder sweeps a wide band of several `colors` around the whole ring. [`BorderBeam`](/docs/border-beam) sends one short beam around it, which is quieter.",
      },
    ],
    a11y: [
      "The ring is an `aria-hidden`, `pointer-events-none` overlay, so the content inside stays clickable and is read normally.",
      "Under reduced motion the band is drawn but does not turn.",
    ],
  },
  "soft-stack": {
    faq: [
      {
        q: "How many cards can SoftStack hold?",
        a: "Three or four. Each card sits 18px lower and 3% smaller than the one in front, inside a fixed `h-64` box, so more than four start to crowd. Set a taller height in `className` if you need more.",
      },
    ],
    a11y: [
      "It renders a `<ul>` with one `<li>` per item, front to back, so screen readers hear a list of the titles.",
      "The placeholder lines in each card are `aria-hidden`.",
      "Under reduced motion the pile shows already settled.",
    ],
  },
  "sparkles-text": {
    faq: [
      {
        q: "Does SparklesText keep running off screen?",
        a: "No. New stars only spawn while the text is in view, one every 420ms, and none spawn under reduced motion. `count` sets how many are alive at once (default 8).",
      },
      {
        q: "Why are there no sparkles in the server HTML?",
        a: "Stars are created with random positions in an effect after mount, so the server renders only the text and hydration matches.",
      },
    ],
    a11y: [
      "Each star is an `aria-hidden` SVG with `pointer-events-none`; the text stays a normal text node.",
      "It renders a `<span>`. Wrap it in a heading if the phrase is a heading.",
      "Under reduced motion no stars appear.",
    ],
  },
  "split-flap": {
    faq: [
      {
        q: "How long does a SplitFlap take to settle?",
        a: "Each cell flips forward through the character set one step at a time, `speed` milliseconds per step (70 by default), and columns start `stagger` ms apart. A cell going from blank to `Z` takes 26 steps, about two seconds. Flaps never go backwards, so changing `B` to `A` goes all the way round.",
      },
      {
        q: "Which characters can SplitFlap show?",
        a: "A to Z, 0 to 9, space and `: . - ' / ·`. Lowercase is converted to uppercase, and anything else shows as a blank cell. `length` pads or cuts the text to a fixed number of cells so the board width never changes.",
      },
      {
        q: "Why is the board dark in light mode?",
        a: "It adds the `dark` class to itself, so the dark tokens apply inside it in both themes, like a real departure board. `tone` colours the characters.",
      },
    ],
    a11y: [
      "Screen readers get `value` once from an `sr-only` span; every cell is `aria-hidden`.",
      "It is not a live region, so a new `value` is not announced. Add your own `aria-live` text if the change matters.",
      "Under reduced motion each cell shows its target character at once.",
    ],
  },
  "stack-reveal-story": {
    faq: [
      {
        q: "Do the cards overlap on phones?",
        a: "No. Below `md` they sit as a plain column with a gap. From `md` up each card after the first moves up 40px (`md:-mt-10`) and overlaps the bottom of the card before it.",
      },
    ],
    a11y: [
      "It is a `<section>` of `<article>` cards, each with a number such as \"01\" and an `<h3>` title.",
      "Under reduced motion the cards render in place.",
    ],
  },
  "stats-counter": {
    faq: [
      {
        q: "Can StatsCounter show decimals, currency or percentages?",
        a: "Yes. `format` is passed to `Intl.NumberFormat`, so `format={{ maximumFractionDigits: 1 }}` with `suffix=\"%\"` shows `98.4%`, and `{ style: \"currency\", currency: \"USD\" }` shows dollars. Formatting uses the `en-US` locale.",
      },
      {
        q: "When does it start counting?",
        a: "The digits roll from 0 to `value` once, when 60% of the card is visible. Until then the visible number is 0, but the final value is already in the HTML as `sr-only` text.",
      },
    ],
    a11y: [
      "The formatted value and suffix are in an `sr-only` span and the rolling digits are `aria-hidden`, so screen readers and crawlers get the final figure only.",
      "Under reduced motion the number jumps to its value when the card comes into view.",
    ],
  },
  "sticky-feature-story": {
    faq: [
      {
        q: "Can I show my own screenshot in the preview?",
        a: "Not through props. The right column is a built-in skeleton preview that highlights one of three tiles per step. Replace that `div` in the file with your own image or component, and use the `idx` state to switch it per step.",
      },
      {
        q: "How tall is the section, and why does it not pin?",
        a: "It is 90vh of scroll per step, with the content `sticky top-16` in a 70vh box. Sticky stops working if an ancestor has `overflow: hidden` or `overflow: auto`. Below `lg` the steps and preview stack in that same 70vh box, so keep step text short.",
      },
    ],
    a11y: [
      "The active step gets `aria-current=\"step\"` as you scroll, and each step title is an `<h3>`.",
      "The preview column is `aria-hidden`, so screen readers read the steps only.",
      "Under reduced motion it drops the pinning and the extra height and shows all steps as a plain list.",
    ],
  },
  "text-reveal": {
    faq: [
      {
        q: "Does TextReveal hide text from search engines?",
        a: "No. The words are real text in order. Each word starts at 18% opacity. The words reach full ink in order, from when the top of the paragraph passes 85% of the viewport height until its bottom reaches 40%.",
      },
      {
        q: "Can I use it for several paragraphs?",
        a: "It takes one `text` string and renders one `<p>`. Use one `TextReveal` per paragraph, and keep it for a single mission or manifesto line; long passages are tiring to read this way.",
      },
    ],
    a11y: [
      "Before they light up, words sit at 18% opacity, which is below text contrast minimums. Readers who stop scrolling halfway see faint text.",
      "Under reduced motion the plain text renders at full ink with no per-word spans.",
      "Each word is an `inline-block` span with a normal space after it, so copied text reads as plain text and lines wrap between words.",
    ],
  },
  "text-scramble": {
    faq: [
      {
        q: "How long can the text be?",
        a: "Keep it to two or three words. Each character locks three frames after the one before it, at 28ms a frame, so a 14-character line takes about 1.4 seconds and longer lines drag.",
      },
      {
        q: "TextScramble or HyperText?",
        a: "TextScramble decodes once, when 80% of it is in view. [`HyperText`](/docs/hyper-text) also replays on hover and marks the letter about to settle.",
      },
    ],
    a11y: [
      "Screen readers get `text` from an `sr-only` span; the changing glyphs are `aria-hidden`.",
      "Under reduced motion it shows the final text and never scrambles.",
    ],
  },
  "tilt-card": {
    faq: [
      {
        q: "How do I make parts of the card float above it?",
        a: "Add `data-depth` to any descendant: `<h3 data-depth=\"1\">`. It moves `parallax` pixels (default 10) per unit of depth with the pointer and lifts toward you while the card is lit. Layers are moved on the DOM directly, so React does not re-render.",
      },
      {
        q: "What happens on phones?",
        a: "Touch pointers are ignored, so the card stays flat and scrolling passes straight through. A mouse or pen tilts it up to `maxTilt` degrees (default 12).",
      },
      {
        q: "TiltCard or CardTilt?",
        a: "TiltCard adds a sliding glare, `data-depth` parallax and a `perspective` prop. [`CardTilt`](/docs/card-tilt) is the simpler tilt with a soft glow and a built-in title and body.",
      },
    ],
    a11y: [
      "The glare is an `aria-hidden`, `pointer-events-none` span; buttons inside stay clickable.",
      "Under reduced motion the card stays flat, the glare is not rendered and `data-depth` transforms are cleared.",
    ],
  },
  "tracing-beam": {
    faq: [
      {
        q: "Can I put my own content beside the beam?",
        a: "Yes. Pass `children` instead of `items`. Each direct child gets a node on the rail that fills when the beam passes it, so wrap each entry in one element.",
      },
      {
        q: "Why is the rail empty in the server HTML?",
        a: "The rail height and node positions are measured on the client, and re-measured with a `ResizeObserver` when the section or any entry resizes. The server renders the entries only.",
      },
    ],
    a11y: [
      "The rail SVG is `aria-hidden`. Each built-in entry is an `<article>` with an `<h3>` title.",
      "The built-in date is a `<time>` element without a `dateTime` attribute. Add one in the file if you want machine-readable dates.",
      "Under reduced motion the beam follows the scroll exactly, without the spring.",
    ],
  },
  "typing-text": {
    faq: [
      {
        q: "How do I type the phrases once and stop?",
        a: "Pass `loop={false}`. It types each phrase, deletes it, and stops after the last one is typed, leaving it on screen. `speed` is milliseconds per character (55, with a little random jitter) and `hold` is how long a finished phrase stays (1400).",
      },
      {
        q: "Will the typing move the text around it?",
        a: "Yes. It is an `inline-flex` span whose width follows the typed text. Put it at the end of a line, or give it a fixed width, so nothing after it shifts.",
      },
    ],
    a11y: [
      "Screen readers get all `phrases` joined once from an `sr-only` span; the typed text and caret are `aria-hidden`.",
      "Typing only runs while 60% of it is in view.",
      "Under reduced motion it shows the first phrase in full and the caret does not blink.",
    ],
  },
  "typographic-marquee": {
    faq: [
      {
        q: "How do I slow down TypographicMarquee?",
        a: "Raise `duration`, the seconds for one loop (default 28). It reuses the kit's `marquee` keyframes from `minidev.css`, so that stylesheet must be loaded.",
      },
      {
        q: "TypographicMarquee or Marquee?",
        a: "This one is a loud band of large display phrases split by accent dots. [`Marquee`](/docs/marquee) is a small, quiet ticker that takes any children and also pauses on keyboard focus.",
      },
    ],
    a11y: [
      "Phrases are a `<ul>` of `<li>`; the second, looping copy is `aria-hidden`, and the separator dots are `aria-hidden` too.",
      "It pauses on hover. Under `prefers-reduced-motion` the animation is removed.",
    ],
  },
  "wavy-background": {
    faq: [
      {
        q: "How do I make the waves cover more of the panel?",
        a: "`coverage` is the share of the height the waves rise to from the bottom, 0 to 1 (default 0.46). `amplitude` sets the swell in pixels and `blur` the softness; `blur={0}` draws crisp edges.",
      },
      {
        q: "Do the wave colours follow the theme?",
        a: "Yes. `colors` accept `var(--token)` values, which are resolved through the cascade and re-read when the theme or material changes. Pass them back to front.",
      },
    ],
    a11y: [
      "The canvas is `aria-hidden`; children render above it.",
      "Under reduced motion it draws one still frame.",
      "It stops drawing when off screen or in a background tab.",
    ],
  },
  "word-rotate": {
    faq: [
      {
        q: "Will the rotating word make the sentence jump?",
        a: "No. Every word is rendered invisibly in the same slot, so it is always as wide as the longest word. Long words in the list make a wide gap after short ones, so keep them a similar length.",
      },
      {
        q: "Can I use WordRotate inside an h1?",
        a: "Yes, it renders a `<span>`. Screen readers hear the `prefix` and then the full list, such as \"Interfaces for startups, agencies, fintech\", so the heading still makes sense.",
      },
    ],
    a11y: [
      "The full word list is in an `sr-only` span and the animated slot is `aria-hidden`, so changes are never announced one by one.",
      "It only rotates while half of it is in view.",
      "Under reduced motion it shows the first word and never changes.",
    ],
  },
  "button-group": {
    faq: [
      {
        q: "Which children does ButtonGroup style?",
        a: "Direct children with a `data-slot` attribute, which every kit button has. It removes their inner corners, overlaps borders by 1px and raises the hovered or focused one with `z-10`. A plain `<button>` without `data-slot` is not styled.",
      },
      {
        q: "Can I put a dropdown at the end of a ButtonGroup?",
        a: "Yes, as long as the trigger is a kit component with a `data-slot`. For a primary action plus a menu of variants, [`SplitButton`](/docs/split-button) is ready-made.",
      },
      {
        q: "ButtonGroup or ToggleGroup?",
        a: "ButtonGroup groups actions; none of them stays pressed. When one option is selected, use [`ToggleGroup`](/docs/toggle-group) or [`SegmentedControl`](/docs/segmented-control).",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to each button in turn. There is no arrow-key navigation inside the group." },
    ],
    a11y: [
      "The wrapper has `role=\"group\"`. Pass `aria-label` (\"Invoice actions\") so screen readers say what the group is for.",
      "`orientation=\"vertical\"` stacks the buttons and sets `data-orientation`; it does not add `aria-orientation`.",
    ],
  },
  "copy-button": {
    faq: [
      {
        q: "Why does CopyButton do nothing on my site?",
        a: "It uses `navigator.clipboard.writeText`, which only works on HTTPS or `localhost` and can be blocked by the browser. When the write fails, the button stays on \"Copy\" and shows no error, so test on a secure origin.",
      },
      {
        q: "How do I track copies?",
        a: "Use `onCopy`, which receives `value` only after the text is on the clipboard. Your own `onClick` runs first; call `e.preventDefault()` in it to cancel the copy.",
      },
    ],
    a11y: [
      "The button's `aria-label` follows the visible text: `label` at rest, `copiedLabel` after a copy.",
      "A separate `sr-only` `aria-live=\"polite\"` span announces `copiedLabel` (\"Copied\" by default), so screen reader users hear the result without moving focus.",
      "The copy and check icons are `aria-hidden`.",
    ],
  },
  "floating-action-button": {
    faq: [
      {
        q: "How do I make a round icon FAB?",
        a: "Pass `size=\"icon-lg\"` with one icon and an `aria-label`: `<FloatingActionButton size=\"icon-lg\" aria-label=\"New invoice\"><PlusIcon /></FloatingActionButton>`. That gives a 44px circle. The default `size=\"lg\"` with text makes a pill.",
      },
      {
        q: "Why is the FAB under the iPhone home bar or in the wrong place?",
        a: "It is `fixed right-6 bottom-6 z-50` and does not add the safe-area inset. Add `mb-[env(safe-area-inset-bottom)]` in `className`. Inside an ancestor with a `transform`, fixed positioning is relative to that ancestor, so render the FAB outside it.",
      },
    ],
    a11y: [
      "It is the kit [`Button`](/docs/button), so it renders a native `<button>` with a `focus-visible` ring.",
      "`aria-label` is required by the type, so an icon-only FAB always has a name. On a FAB with visible text, use the same words as the text.",
      "Because it is fixed over the content, leave space at the bottom of scrolling pages so it does not cover the last row.",
    ],
  },
  "icon-button": {
    faq: [
      {
        q: "Why does IconButton require aria-label?",
        a: "The icon is the only content, so `aria-label` is the button's name. The type makes it required: `<IconButton aria-label=\"Delete invoice\"><TrashIcon /></IconButton>` compiles, and leaving it out is a TypeScript error.",
      },
      {
        q: "What sizes does IconButton come in?",
        a: "`icon-xs` (28px), `icon-sm` (32px), `icon` (36px, default) and `icon-lg` (44px). The default `variant` is `outline`; `ghost` suits toolbars and table rows.",
      },
      {
        q: "How do I add a tooltip to an IconButton?",
        a: "Wrap it in [`Tooltip`](/docs/tooltip) so sighted users see the same words the `aria-label` gives screen readers. Keep the tooltip text and the label the same.",
      },
    ],
    a11y: [
      "`aria-label` is required by the type, so every IconButton has an accessible name.",
      "It renders the kit [`Button`](/docs/button), a native `<button>` with `type=\"button\"`.",
      "Use `icon-lg` (44px) for touch targets on mobile; `icon-xs` and `icon-sm` are below the 44px guideline.",
    ],
  },
  "magnetic-cta": {
    faq: [
      {
        q: "Why does className not change the button?",
        a: "`className` goes on the moving wrapper, not the button inside. All other props, including `variant`, `size` and `render`, go to the [`Button`](/docs/button). The button is `w-full`, so `className=\"w-full\"` makes the whole CTA stretch.",
      },
      {
        q: "When does the button move?",
        a: "Only while a mouse or pen is over it: it shifts up to `strength` pixels (default 28) toward the pointer and springs back when the pointer leaves. Touch and keyboard use it as a normal button.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "Activates the button. Keyboard focus never moves it." },
    ],
    a11y: [
      "It renders the kit `Button`, defaulting to `type=\"button\"`, so it keeps the same focus ring and disabled behaviour.",
      "Under reduced motion it does not move at all.",
    ],
  },
  "split-button": {
    faq: [
      {
        q: "Can I change the variant of SplitButton?",
        a: "Not through props: both halves are styled as outline buttons. `className` applies to the wrapper only. Edit the `Button` and `DropdownMenuTrigger` classes in the file for a filled primary.",
      },
      {
        q: "How do I disable one menu action?",
        a: "Set `disabled: true` on that item; it stays visible but cannot be chosen. `destructive: true` gives it the danger tone. `disabled` on `SplitButton` disables both halves.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves from the primary button to the chevron." },
      { keys: "Enter / Space / ArrowDown", action: "On the chevron, opens the menu." },
      { keys: "ArrowDown / ArrowUp", action: "Moves between menu items." },
      { keys: "Enter / Space", action: "Runs the highlighted item's `onSelect` and closes the menu." },
      { keys: "Escape", action: "Closes the menu and returns focus to the chevron." },
    ],
    a11y: [
      "The chevron is a separate button named by `menuLabel` (default \"More actions\"); its icon is `aria-hidden`.",
      "The menu is a Base UI Menu, with `aria-expanded` on the trigger, `role=\"menu\"` on the popup and type-to-find on item labels.",
    ],
  },
  toggle: {
    faq: [
      {
        q: "Toggle or Switch?",
        a: "Use Toggle for a pressed state in a toolbar, such as bold or \"show archived\". Use [`Switch`](/docs/switch) for a setting that takes effect right away, which screen readers announce as on or off.",
      },
      {
        q: "How do I control a Toggle?",
        a: "Pass `pressed` and `onPressedChange`: `<Toggle pressed={bold} onPressedChange={setBold}>`. For uncontrolled use, `defaultPressed`. Style the pressed look with `data-[pressed]:` classes.",
      },
      {
        q: "Does Toggle send a value with a form?",
        a: "No. It is a button with `aria-pressed` and no hidden input, so it is not in `FormData`. Keep its state in React and add it to the payload yourself, or use [`Checkbox`](/docs/checkbox) for a form field.",
      },
    ],
    a11y: [
      "Base UI renders a native `<button>` with `aria-pressed` set to `true` or `false`.",
      "An icon-only toggle needs an `aria-label`, and the label should not change with the state (\"Bold\", not \"Turn bold off\").",
      "The pressed state is shown by border and background, not colour alone.",
    ],
  },
  "toggle-group": {
    faq: [
      {
        q: "How do I stop a single-select ToggleGroup from being emptied?",
        a: "In single mode, pressing the pressed toggle again sets the value to `[]`. Control it and ignore empty values: `onValueChange={(v) => v.length && setAlign(v)}`.",
      },
      {
        q: "Why is the ToggleGroup value an array?",
        a: "Base UI always uses an array of the pressed toggles' `value`s, even in single mode, so `defaultValue={[\"left\"]}`. Add `multiple` to let several be pressed, as in a bold, italic, underline bar.",
      },
      {
        q: "ToggleGroup, SegmentedControl or RadioGroup?",
        a: "ToggleGroup suits toolbars. [`SegmentedControl`](/docs/segmented-control) is a view switch with a sliding thumb, and [`RadioGroup`](/docs/radio-group) is the right choice inside forms because it submits a value.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus into the group, onto one toggle, and out again." },
      { keys: "ArrowRight / ArrowLeft", action: "Moves focus between toggles, wrapping at the ends (`loopFocus` is on by default). Use ArrowDown / ArrowUp with `orientation=\"vertical\"`." },
      { keys: "Home / End", action: "Moves focus to the first or last toggle." },
      { keys: "Enter / Space", action: "Presses or releases the focused toggle." },
    ],
    a11y: [
      "The group has `role=\"group\"`; give it an `aria-label` such as \"Text alignment\".",
      "Each `Toggle` inside is a button with `aria-pressed`, and icon-only toggles each need their own `aria-label`.",
      "Focus is roving: only one toggle is in the Tab order, and arrow keys move between them.",
    ],
  },
  dock: {
    faq: [
      {
        q: "Can Dock items be Next.js links?",
        a: "An item with `href` renders a plain `<a>`, not a Next.js `Link`, so it does a full page load. For client-side navigation, use `onClick` with `router.push`, or edit the `motion.a` in the file.",
      },
      {
        q: "Does the magnification work on phones?",
        a: "It is made for a mouse. The swell follows `pointermove` across the dock, so on touch the icons mostly stay at `size` (44px). Under reduced motion `magnify` is ignored and icons never grow.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to each dock item and shows its label above it." },
      { keys: "Enter", action: "Follows the link, or runs `onClick` on a button item." },
      { keys: "Space", action: "Activates a button item." },
    ],
    a11y: [
      "The dock is a `<nav>` named by `label` (default \"Dock\"). Each item has `aria-label` from its `label`, and the active one has `aria-current=\"page\"`.",
      "The floating label and the running dot are `aria-hidden`, so names are not read twice. The label also shows on keyboard focus.",
    ],
  },
  well: {
    faq: [
      {
        q: "Well, Card or Callout?",
        a: "A Well is sunken: it sets secondary content back from the page, such as a note, a code sample or a read-only summary. Use [`Card`](/docs/card) for raised primary content, and [`Callout`](/docs/callout) or [`InlineAlert`](/docs/inline-alert) when the message has a tone like warning or success.",
      },
    ],
    a11y: [
      "It is a plain `<div>` with no role. If the content is a note that should be announced as one, add `role=\"note\"` or wrap it in an `<aside>`.",
    ],
  },
}
