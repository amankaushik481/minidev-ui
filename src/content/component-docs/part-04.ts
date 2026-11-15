import type { ComponentDocsContent } from "../types"

export const PART_04: Record<string, ComponentDocsContent> = {
  "hero-kinetic-type": {
    faq: [
      {
        q: "How do I change the button labels or link them to my signup page?",
        a: "The props are only `lines`, `description` and `className`. The \"Start free trial\" and \"Free kit\" buttons are written in the file with no `onClick` or `href`, so edit the copied file, for example `<Button render={<a href=\"/signup\" />}>Start free trial</Button>`.",
      },
      {
        q: "How do I control where the headline breaks?",
        a: "Each string in `lines` is its own block line, whatever the screen width, and the last string gets the accent gradient. Keep each line short: the size scales down to 1.75rem on phones, but a long line still wraps inside its mask.",
      },
      {
        q: "Is the headline text in the server HTML?",
        a: "Yes. All lines render inside one `<h1>` on the server. Motion also renders the starting `translateY(110%)` inline, so the lines stay hidden behind their masks until the page hydrates and they rise.",
      },
    ],
    a11y: [
      "Every line is a `<span className=\"block\">` inside a single `<h1>`, so screen readers and search engines read one heading, not one per line.",
      "Under reduced motion every `initial` is `false` and the line transitions have `duration: 0`, so the headline, copy and buttons render in place.",
      "The accent hairline across the top is `aria-hidden` and `pointer-events-none`.",
    ],
  },
  "hero-marquee-brands": {
    faq: [
      {
        q: "Can I show logo images instead of company names?",
        a: "No. `brands` is a `string[]` and each name renders as text in an `<li>`. For image logos use [`LogoWallMotion`](/docs/logo-wall-motion), whose `logos` take any React node, or [`LogoCloud`](/docs/logo-cloud) with a `mark` per name.",
      },
      {
        q: "Why is there a gap before the strip loops?",
        a: "The track is two copies of the list moving by 50% of its width. If one copy is narrower than the section, blank space shows before the loop restarts. Pass enough names that one row is wider than the container, or repeat the array.",
      },
      {
        q: "How do I slow the marquee down?",
        a: "Raise `duration`, the seconds for one full loop (default `28`). The strip pauses while the pointer is over it or after the Pause motion button is pressed, and does not move at all under reduced motion.",
      },
    ],
    a11y: [
      "`title` renders as the page's `<h1>`, so use this hero once per page.",
      "The first list has `aria-label=\"Customers\"`. The looping copy has `aria-hidden`, so each name is read once.",
      "The loop is a CSS keyframe on `transform` only. Under reduced motion no animation class is set, so the names sit still.",
      "A \"Pause motion\" button with `aria-pressed` sits at the end of the strip, so keyboard and touch users can stop it (WCAG 2.2.2). It also pauses while a pointer hovers the strip. The button is hidden under reduced motion, where nothing moves.",
    ],
  },
  "hero-poster-type": {
    faq: [
      {
        q: "How do I change the headline and buttons?",
        a: "Edit the copied file. `className` is the only prop: the eyebrow \"New in 2.0\", the three headline lines, the paragraph and both buttons are written inline. If you want the same rise effect with props, use [`HeroKineticType`](/docs/hero-kinetic-type), which takes `lines` and `description`.",
      },
      {
        q: "What does the magnetic button do on phones and with a keyboard?",
        a: "Only a mouse or pen pulls [`MagneticCta`](/docs/magnetic-cta) toward the pointer. On touch and with the keyboard it behaves as a normal `Button`, and reduced motion keeps it still.",
      },
    ],
    a11y: [
      "The thirds grid and the radial glow sit in one `aria-hidden`, `pointer-events-none` layer, so they never catch clicks or reach screen readers.",
      "The three headline lines are block spans inside one `<h1>`.",
      "Under reduced motion every `initial` is `false`, so nothing rises on load.",
    ],
  },
  "hero-split-showcase": {
    faq: [
      {
        q: "Can I pass my own chart data?",
        a: "Not through props: `className` is the only one. The seven bar heights are the `BARS` array at the top of the file and the \"+18.2%\" label is inline. If you change them, update the chart's `aria-label` too, or put a real [`BarChart`](/docs/bar-chart) in the card.",
      },
      {
        q: "How does it lay out on phones?",
        a: "One column below `lg`: copy first, then the card. Below `sm` both buttons are full width. From `lg` up it splits into two equal columns.",
      },
    ],
    a11y: [
      "The bars sit in a `role=\"img\"` container with `aria-label=\"Weekly revenue, rising 18.2% over seven weeks\"`, so the chart is read as one sentence, not seven empty boxes.",
      "The bars grow with `scaleY`, so the card never changes height while they animate. Under reduced motion `initial` is `false` and the chart renders at its final size.",
      "The soft accent halo behind the card is `aria-hidden`.",
    ],
  },
  "hero-spotlight": {
    faq: [
      {
        q: "How do I hide the eyebrow, highlight line or proof text?",
        a: "Pass an empty string, for example `eyebrow=\"\"` or `proof=\"\"`. Passing `undefined` brings back the sample text, because these props have defaults. The actions are objects with defaults too, so to drop the second button remove `act(secondary, \"outline\")` from the copied file.",
      },
      {
        q: "How do I link the buttons to my signup page?",
        a: "Give the action an `href`: `primary={{ label: \"Start free\", href: \"/signup\" }}`. It then renders the `Button` with `render={<a href=\"/signup\" />}`. Without `href` it is a `<button>` that calls `onClick`.",
      },
      {
        q: "Why doesn't the highlight follow my cursor?",
        a: "The `text-lit` highlight and the `light-spot` glow read the `--lx` and `--ly` light variables from the kit stylesheet. Mount [`LightProvider`](/docs/light-provider) once in your layout to move the light with the pointer. Without it the light stays at its default top-left position.",
      },
    ],
    a11y: [
      "`title` and `highlight` render in one `<h1>`, separated by a `<br />`, so the two lines read as one heading.",
      "The live dot in the eyebrow and the arrow icon are `aria-hidden`. The dot's ping animation has `motion-reduce:hidden`.",
      "Under reduced motion the entrance props are left out and the visual's `initial` is `false`, so nothing blurs, rises or tilts on load.",
    ],
  },
  "hero-typed-headline": {
    faq: [
      {
        q: "What do search engines and screen readers get from the rotating word?",
        a: "One stable sentence. A `sr-only` span holds `prefix` plus every word, joined as \"dashboards, AI apps, billing flows and marketing sites\". The visible prefix and the rotating word are `aria-hidden`.",
      },
      {
        q: "Why is a long word cut off?",
        a: "The word sits in a fixed-width slot (`min-w-[9ch]`, `12ch` from `sm`) with `overflow-hidden` and `whitespace-nowrap`, so it does not grow with the word. Keep words short, or widen that class in the copied file.",
      },
      {
        q: "How do I change the eyebrow, paragraph or buttons?",
        a: "Edit the copied file. The props are `prefix`, `words`, `interval` (milliseconds per word, default `2200`) and `className`. \"Introducing Lumen 2.0\", the paragraph and both buttons are written inline.",
      },
    ],
    a11y: [
      "The headline is an `<h1>` whose accessible text never changes while the visible word rotates.",
      "Rotation pauses while the pointer is over the headline. It does not run under reduced motion or when `words` has fewer than two entries, and then the first word shows.",
    ],
  },
  "investor-update": {
    faq: [
      {
        q: "What shape do the `stats` take?",
        a: "An array of `{ value: number, label: string }` from [`FlipStatBoard`](/docs/flip-stat-board). `value` must be a whole number, because the board counts up digit by digit, and each `label` must be unique. Put units and context in the label, for example `{ value: 48, label: \"Currencies settled\" }`.",
      },
      {
        q: "Can I change the \"Product surfaces\" rail or the \"Ask\" panel title?",
        a: "Not through props: the rail is [`HorizontalProductRail`](/docs/horizontal-product-rail) with its own sample cards, and the panel title \"Ask\" is fixed. Edit those two lines in the copied file. `ask` only sets the panel's body text.",
      },
    ],
    a11y: [
      "It renders an `<article>` with a `<header>`. The headline is an `<h2>` and \"What shipped\" is another `<h2>`, so add an `<h1>` above it when this is the page's main content.",
      "\"What shipped\" is a real `<ul>`, so screen readers announce how many items it has.",
      "The summary rises on a spring. Under reduced motion `initial` is `false` and the transition has `duration: 0`.",
    ],
  },
  "launch-countdown": {
    faq: [
      {
        q: "How do I set a real launch time without a hydration mismatch?",
        a: "Pass `target` as an ISO string with an offset, like `\"2026-12-01T09:00:00Z\"`, or as epoch milliseconds. The server and the first client render both show zeros, and the real time left appears on mount. A string without an offset is read in the visitor's local time zone.",
      },
      {
        q: "What happens when the clock reaches zero?",
        a: "The interval stops, the digits stay at 00, and `onComplete` runs once, for example `onComplete={() => setLive(true)}`. If `target` has already passed at mount, `onComplete` runs once on mount and no interval starts. Without `target`, the clock counts down `targetOffsetMs` (36 hours by default) from mount, so every visitor sees a different deadline: use that only for demos.",
      },
      {
        q: "Can the call to action be a link?",
        a: "`cta` is placed inside a [`MagneticCta`](/docs/magnetic-cta) as its label, so it has no `href` or `onClick`. Pass `cta={null}` and render your own `MagneticCta` with `render={<a href=\"/waitlist\" />}` next to it, or edit the line in the copied file.",
      },
    ],
    a11y: [
      "The clock is a `role=\"timer\"` element named by `title`. A timer is not announced on every tick, so screen readers read the time left when they reach it.",
      "Each unit is a [`NumberRoll`](/docs/number-roll): the formatted number is in an `sr-only` span and the rolling digits are `aria-hidden`.",
      "Under reduced motion the digits swap instantly instead of rolling.",
    ],
  },
  "logo-cloud": {
    faq: [
      {
        q: "How do I show a real logo image?",
        a: "Put an inline SVG or an `<img alt=\"\">` in `mark`. The mark is wrapped in an `aria-hidden` span and `name` always prints as text next to it, so the list stays readable and indexable without alt text on the image.",
      },
      {
        q: "Can I render LogoCloud from a Server Component?",
        a: "Yes. It has no state or effects, so a Server Component can pass `logos`, including JSX in `mark`. The file is still marked `\"use client\"`.",
      },
    ],
    a11y: [
      "It renders a `<ul>` with `aria-label` set from `label` (default \"Customers\"), so screen readers announce a named list and its length.",
      "Each `mark` sits in an `aria-hidden` span with `display: contents`, so icons add nothing to the spoken text.",
    ],
  },
  "logo-wall-motion": {
    faq: [
      {
        q: "How do I use real logo images?",
        a: "`logos` takes any React nodes, so pass images: `logos={[<img key=\"acme\" src=\"/acme.svg\" alt=\"Acme\" className=\"h-6\" />]}`. Each tile is 44px tall (`h-11`) and at least 112px wide (`min-w-28`), so keep images about 24px high. Give every image an `alt` with the company name, because nothing else names it.",
      },
      {
        q: "How do I run two rows in opposite directions?",
        a: "Render two strips and set `reverse` on one: it sets `animation-direction: reverse`. Give the second `title=\"\"` so only one label shows, and change `duration` (seconds per loop, default `28`) on one row if you want different speeds.",
      },
      {
        q: "Why is there a gap at the end of the strip?",
        a: "The track is two copies moving by 50%. With only a few short logos one copy is narrower than the container, so blank space shows before the loop restarts. Pass six or more logos, or repeat the array.",
      },
    ],
    a11y: [
      "The second copy of the list has `aria-hidden`, so each logo is read once. The first list has no `aria-label`, and `title` is a `<p>`, not a heading.",
      "The faded edges are `aria-hidden` and `pointer-events-none`.",
      "The loop is a CSS `transform` animation that stops with `motion-reduce:[animation:none]`.",
      "A \"Pause motion\" button with `aria-pressed` sits under the strip, so keyboard and touch users can stop it (WCAG 2.2.2). The strip also pauses on pointer hover. The button is hidden under reduced motion, where nothing moves.",
    ],
  },
  "marketing-landing": {
    faq: [
      {
        q: "How do I replace the sample logos, stats and features?",
        a: "Edit the copied file. MarketingLanding takes only `onStart` and `className`, and it renders [`LogoCloud`](/docs/logo-cloud), [`StatsStrip`](/docs/stats-strip) and [`FeatureGrid`](/docs/feature-grid) with no props, so they show their fictional Lumen data. Pass `logos`, `stats` and `features` to those lines.",
      },
      {
        q: "Does it include a navigation bar and a footer?",
        a: "No. It is the hero, a logo cloud, a stats strip, a feature grid and a CTA banner. Add [`NavMarketing`](/docs/nav-marketing) above it and a footer such as [`FooterNav`](/docs/footer-nav) below.",
      },
      {
        q: "Can I use it in a Next.js Server Component?",
        a: "Yes, without `onStart`. `onStart` is a function, so a Server Component cannot pass it. Render MarketingLanding from a client component when the buttons need to do something. \"Book a demo\" has no handler in either case.",
      },
    ],
    a11y: [
      "[`Hero`](/docs/hero) renders the page's only `<h1>`, so do not add another hero above it.",
      "No section animates, so there is nothing to change for reduced motion.",
    ],
  },
  "marquee-quotes": {
    faq: [
      {
        q: "Can the second row show different quotes?",
        a: "No. The second row always shows `items` in reverse order, moving the other way. To show two separate sets, edit the second `Row` in the copied file and pass it its own array.",
      },
      {
        q: "How long can a quote be?",
        a: "Each card is a fixed `w-72` (288px), so a long quote makes that card much taller than its neighbours. Keep quotes to one or two short sentences. Use [`TestimonialCarousel`](/docs/testimonial-carousel) for longer ones.",
      },
    ],
    a11y: [
      "Each quote is a `<figure>` with a `<blockquote>` and a `<figcaption>`. Curly quotation marks are added for you, so leave them out of `quote`.",
      "The whole second row and the looping copy of the first row are `aria-hidden`, so screen readers read each quote once.",
      "Each row pauses on hover and stops with `motion-reduce:[animation:none]`. Set `duration` (seconds per loop, default `32`) higher for a calmer pace.",
    ],
  },
  "nav-marketing": {
    faq: [
      {
        q: "How do I show the links on mobile?",
        a: "Below `md` the `<nav>` is `hidden` and nothing replaces it. Put a [`MobileNavDrawer`](/docs/mobile-nav-drawer) trigger with `className=\"md:hidden\"` in `actions`, next to your buttons, and give it the same links.",
      },
      {
        q: "Do the links use Next.js client-side routing?",
        a: "No. The brand and the links are plain `<a>` elements (the kit [`Link`](/docs/link)), so every click is a full page load. In Next.js, swap them for `next/link` in the copied file and keep the same classes. The default \"Sign in\" and \"Get started\" buttons have no handlers, so pass `actions` with your own links.",
      },
      {
        q: "How do I mark the current page?",
        a: "There is no active state or `aria-current`. Compare each `href` with the current path in the copied file and add `aria-current=\"page\"` plus a `text-fg` class to the match.",
      },
    ],
    a11y: [
      "It renders a `<header>` landmark that contains a `<nav aria-label=\"Main\">`.",
      "Below `md` the `<nav>` is `display: none`, so its links leave the Tab order and the accessibility tree too. Only the brand link and `actions` remain.",
      "The brand link has its own 2px `focus-visible` ring, offset from the bar.",
    ],
  },
  "newsletter-signup": {
    faq: [
      {
        q: "How do I connect it to a Next.js Server Action?",
        a: "Call the action from `onSubmit`, which receives the email as a string: `onSubmit={(email) => subscribe(email)}`. The form calls `preventDefault`, so a `<form action>` would never run. Make the action throw, or reject the promise, when it fails, so the error line shows.",
      },
      {
        q: "Can I show my own error message?",
        a: "Not through props. Any rejection shows \"Something went wrong. Try again.\" and keeps the email in the field; only the success text is a prop, `successMessage`. If `onSubmit` returns nothing, success shows immediately.",
      },
      {
        q: "Does it validate the email address?",
        a: "Only with the browser: the input is `type=\"email\"` and `required`, so the browser blocks the submit and shows its own message. Validate again on the server.",
      },
    ],
    keyboard: [
      { keys: "Enter", action: "In the email field, submits the form. The browser stops it if the field is empty or not an email address." },
    ],
    a11y: [
      "The input has `aria-label=\"Email\"`, `autoComplete=\"email\"` and `aria-describedby` pointing at the status line. It gets `aria-invalid` after a failed submit.",
      "The status line is a `role=\"status\"` paragraph that stays mounted, empty until the submit settles, so the success or error message is announced.",
      "While the request runs the button is `disabled` and reads \"Subscribing…\".",
    ],
  },
  "premium-landing": {
    faq: [
      {
        q: "How do I change the copy, features and prices?",
        a: "Edit the copied file: PremiumLanding takes only `className`. It sets `title` on [`HeroAurora`](/docs/hero-aurora) and `title` and `description` on [`CtaGlow`](/docs/cta-glow), while [`AnimatedFeatureRow`](/docs/animated-feature-row) and [`PricingMotion`](/docs/pricing-motion) show their own sample data. Pass `features` and `plans` to those two lines.",
      },
      {
        q: "Does it include navigation, a FAQ or a footer?",
        a: "No. It is four sections: hero, feature row, pricing and CTA. For a longer page with logos, stats, testimonials and a FAQ start from [`SaasLanding`](/docs/saas-landing).",
      },
    ],
    a11y: [
      "`HeroAurora` renders the page's `<h1>`.",
      "Each section handles reduced motion itself, so the page needs no extra setting.",
    ],
  },
  "press-quote": {
    faq: [
      {
        q: "How do I link to the original article?",
        a: "`cite` sets the blockquote's `cite` attribute, which browsers do not show or make clickable. For a visible link, edit the `<figcaption>` in the copied file to wrap the source in an `<a href>`, because `source` is plain text.",
      },
      {
        q: "Can I add the publication's logo?",
        a: "There is no logo slot: `quote` and `source` are both strings. Put a small mark above the component, or add it to the `<figcaption>` in the copied file. Use a [`Testimonial`](/docs/testimonial) when the quote is from a named person with a photo.",
      },
    ],
    a11y: [
      "It renders a `<figure>` with a `<blockquote>` and a `<figcaption>`, so assistive tech ties the source to the quote.",
      "The source is uppercased with CSS only, so screen readers read it as you wrote it, not letter by letter.",
      "Curly quotation marks are added as text around `quote`.",
    ],
  },
  "product-launch": {
    faq: [
      {
        q: "Which sample content must I replace before shipping?",
        a: "The figures passed to [`FlipStatBoard`](/docs/flip-stat-board) (400, 98, 12), the default quotes in [`MarqueeQuotes`](/docs/marquee-quotes), the hero lines and the spotlight panel copy are all in the file. `className` is the only prop, so edit the copied file.",
      },
      {
        q: "Why does the countdown restart on every page load?",
        a: "[`LaunchCountdown`](/docs/launch-countdown) is rendered without `target`, so it counts 36 hours down from mount. Pass your launch time, for example `<LaunchCountdown target=\"2026-12-01T09:00:00Z\" />`.",
      },
      {
        q: "Why can't I click the section names in the progress rail?",
        a: "[`ScrollProgressRail`](/docs/scroll-progress-rail) gets plain strings, which render as text. Pass `{ label, href }` objects, such as `{ label: \"Waitlist\", href: \"#waitlist\" }`, and add matching `id`s to the sections.",
      },
    ],
    a11y: [
      "[`HeroKineticType`](/docs/hero-kinetic-type) renders the page's `<h1>`. Every other section uses lower headings or none.",
      "Each section is its own Premium component with its own reduced-motion branch, so the page needs no extra setting.",
    ],
  },
  "product-os-mock": {
    faq: [
      {
        q: "Can I put my own views in the window?",
        a: "Not through props: only `interval` and `className` exist. The three views (Inbox, Pipeline, Agents) are the `STEPS` array at the top of the file, each with a `title`, a `detail` line and `rows`. Edit that array and the inline KPI values (72%, 91%, 64%) in the copied file.",
      },
      {
        q: "How do I stop it cycling on its own?",
        a: "There is no prop to turn it off. Auto-advance (every `interval` ms, default `2800`) pauses while the pointer or keyboard focus is inside and stops for good once the visitor clicks a view. It never runs under reduced motion.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the view buttons, then the New button. Focus anywhere inside pauses auto-advance." },
      { keys: "Enter / Space", action: "On a view button, shows that view and stops auto-advance." },
    ],
    a11y: [
      "The window is a `<section aria-label=\"Product preview\">`, and the selected view button has `aria-current=\"true\"`.",
      "The traffic-light dots are `aria-hidden`. View changes are not announced: the `<h3>` text changes in place.",
      "Under reduced motion rows and KPI bars render at their final position with `duration: 0`.",
    ],
  },
  "product-tour": {
    faq: [
      {
        q: "Can I control which step is shown?",
        a: "No. ProductTour keeps its own step state and always starts at the first step. `onStepChange(index)` tells you each time the visitor moves, which is enough for analytics or to save progress.",
      },
      {
        q: "What happens on the last step?",
        a: "Next becomes Done. Pressing it calls `onFinish`, for example `onFinish={() => setTourOpen(false)}`. Without `onFinish`, Done is disabled.",
      },
      {
        q: "How do I show a screenshot for each step?",
        a: "Add `media` to the step, for example `media: <img src=\"/invoice.png\" alt=\"New invoice form\" className=\"rounded-lg\" />`. It renders under the step text on the stage, which is at least `min-h-64` tall.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the step buttons, then Back and Next (Done on the last step)." },
      { keys: "Enter / Space", action: "On a step button, jumps to that step. On Back or Next, moves one step. On Done, calls `onFinish`. The stage re-mounts on each change, so keyboard focus leaves the Back or Next button afterwards." },
    ],
    a11y: [
      "The current step button has `aria-current=\"step\"`.",
      "An `sr-only` `aria-live=\"polite\"` line announces each change, such as \"Step 2 of 4: Send your first invoice\".",
      "The stage rises on a spring. Under reduced motion `initial` is `false`, so steps swap instantly.",
    ],
  },
  "saas-landing": {
    faq: [
      {
        q: "Which sample content must I replace?",
        a: "All of it is written in the file: the logo names, the four [`StatsCounter`](/docs/stats-counter) figures, the pricing plans, the testimonials and the FAQ answers. `className` is the only prop. The sample names are fictional, so never ship them as customers.",
      },
      {
        q: "Does the FAQ section add FAQ structured data?",
        a: "No. [`FaqList`](/docs/faq-list) renders the questions as HTML only. Add your own `FAQPage` JSON-LD script if you want it in search results.",
      },
    ],
    a11y: [
      "[`HeroAurora`](/docs/hero-aurora) renders the page's `<h1>`.",
      "The moving parts, [`LogoWallMotion`](/docs/logo-wall-motion) and [`TestimonialCarousel`](/docs/testimonial-carousel), stop under reduced motion, and the carousel stops rotating once the visitor uses its controls.",
    ],
  },
  "saas-marketing-page": {
    faq: [
      {
        q: "Why does every section show sample data?",
        a: "SaasMarketingPage passes no props to its sections, so each one falls back to its own fictional content. Edit the copied file and pass data where you need it, for example `<LogoWallMotion logos={customers} />` and `<TestimonialCarousel items={quotes} />`.",
      },
      {
        q: "Where does the final \"Start free\" button go?",
        a: "Nowhere yet: it is a [`MagneticCta`](/docs/magnetic-cta) with no `onClick` or `href`. Add one in the copied file, for example `render={<a href=\"/signup\" />}`.",
      },
    ],
    a11y: [
      "[`HeroClientPitch`](/docs/hero-client-pitch) renders the page's `<h1>`.",
      "The logo wall and testimonial carousel stop moving under reduced motion, and the carousel stops rotating once the visitor uses its controls.",
    ],
  },
  "scroll-story": {
    faq: [
      {
        q: "How does it decide which step is active?",
        a: "An `IntersectionObserver` with `rootMargin: \"-45% 0px -45% 0px\"` marks a step active when it crosses the middle tenth of the viewport. Each step is at least `60vh` tall, so only one is in that band at a time.",
      },
      {
        q: "Does it work inside a scrolling panel or modal?",
        a: "Not as expected. The observer has no `root`, so it watches the browser viewport, not an `overflow-auto` container. Use it in the page's main scroll.",
      },
      {
        q: "Can I control the active step or listen for changes?",
        a: "No. There is no `value` or change callback. The active step comes only from scroll position, and the pinned visual swaps to that step's `visual`.",
      },
    ],
    a11y: [
      "The section is labelled by its `<h2>` through `aria-labelledby`, and each step title is an `<h3>`.",
      "Each visual is shown once at a time: inline below `lg`, and in the pinned panel from `lg` up, where the inline copies are `display: none`.",
      "The progress rail and step dots are `aria-hidden`. Under reduced motion the rail jumps, the panel swaps with no blur or rise, and the panel rows skip their entrance.",
    ],
  },
  "social-proof": {
    faq: [
      {
        q: "Can I show a \"+N\" count after the avatars?",
        a: "No. Only the first five `people` render and the rest are dropped. Put the total in `countLabel`, or use [`AvatarGroup`](/docs/avatar-group), which shows a +N overflow and tooltips.",
      },
      {
        q: "What shows when a person has no photo?",
        a: "Their initials: the first letters of the first and last word of `name`, or the first two letters of a single word. Add `src` to show a photo instead.",
      },
    ],
    a11y: [
      "The whole avatar stack is `aria-hidden` and the images have `alt=\"\"`, so screen readers hear only `countLabel`.",
      "Each avatar has a 2px ring in the page colour (`ring-bg`), so the overlap stays clear in both themes.",
    ],
  },
  "social-proof-wall": {
    faq: [
      {
        q: "Why do I see fewer quotes on my phone?",
        a: "Quotes are dealt round-robin into three columns, and the second column appears from `md` and the third from `lg`. On phones only the first column shows: quotes 1, 4, 7 and so on. Put your strongest quotes at those positions.",
      },
      {
        q: "Can I use logo images in the marquee?",
        a: "No. `logos` is a `string[]`, and each name renders as a text wordmark with a generated shape. For image logos use [`LogoWallMotion`](/docs/logo-wall-motion) above a wall of your own.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the Pause motion button, pauses or resumes the logo marquee and every quote column." },
    ],
    a11y: [
      "The section is labelled by its `<h2>`. Each quote is a `<figure>` with a `<blockquote>` and a `<figcaption>` holding the name and role.",
      "The Pause motion button has `aria-pressed`. It is hidden with `motion-reduce:hidden`, because nothing moves under reduced motion.",
      "The logo list is labelled \"Customers\". The duplicated logos and quotes that keep the loops continuous are `aria-hidden`.",
    ],
  },
  "split-proof-panel": {
    faq: [
      {
        q: "Does it work outside Next.js?",
        a: "Only after one edit: the \"Open /showcase\" button renders `next/link`. In Vite or React Router, replace `render={<Link href=\"/showcase\" />}` with `render={<a href=\"/showcase\" />}` or your router's link.",
      },
      {
        q: "How do I change the pitch and proof cards?",
        a: "Edit the copied file. `className` is the only prop. The heading, paragraph, checklist and the three proof cards describe this kit's own gallery, so replace them with claims a visitor can check about your product.",
      },
    ],
    a11y: [
      "The heading is an `<h3>`. Change the level in the copied file to fit your page outline.",
      "The ▹ markers in the checklist are `aria-hidden`, so each item reads as plain text.",
      "The proof column rises once when it scrolls into view (`viewport.once`). Under reduced motion `initial` is `false`.",
    ],
  },
  "stats-strip": {
    faq: [
      {
        q: "Why is `value` a string instead of a number?",
        a: "So you control the format: \"$1.2B\", \"98.2%\" or \"2,400+\", made with `Intl.NumberFormat` before you pass it in. StatsStrip does not animate. For a counting number use [`StatsCounter`](/docs/stats-counter) or [`NumberRoll`](/docs/number-roll).",
      },
      {
        q: "What happens with three stats instead of four?",
        a: "You get an empty cell. The grid has two columns on phones and four from `sm`, and the gaps are the `bg-border` fill, so a missing cell shows as a grey block. Pass `className=\"grid-cols-1 sm:grid-cols-3\"`; `cn` merges it over the defaults.",
      },
    ],
    a11y: [
      "It is a `<dl>`. Each stat has the `<dt>` label first in the DOM, so it is read before the number, and `flex-col-reverse` shows the number on top.",
      "Values use `tabular-nums`, so the digits line up across the row.",
    ],
  },
  "status-marketing": {
    faq: [
      {
        q: "How do I feed it real uptime data?",
        a: "Edit the copied file: `className` is the only prop. The four services are [`UptimeBar`](/docs/uptime-bar) lines with a `label` and `downtimes`, the indexes of days with downtime (0 is the oldest), so fetch your status in a parent and map it to those props. Pass `downtimes={[]}` for a clean service: the sample \"API\" and \"Realtime\" lines leave it out and fall back to UptimeBar's default `[12, 44]`.",
      },
      {
        q: "How do I hide the incident banner when nothing is wrong?",
        a: "Render the [`IncidentBanner`](/docs/incident-banner) line only when there is an open incident. The sample shows \"All systems nominal — demo banner\" at `severity=\"minor\"`, which is only there to show the styling.",
      },
    ],
    a11y: [
      "The headline is [`MaskedGradientHeadline`](/docs/masked-gradient-headline), which renders an `<h2>` by default.",
      "The paragraph rises once when it scrolls into view. Under reduced motion `initial` is `false`.",
    ],
  },
  "sticky-cta-bar": {
    faq: [
      {
        q: "Where in the tree should I render it?",
        a: "Anywhere, once per page. The bar is `position: fixed` at the bottom of the screen. It shows when the window has scrolled more than `threshold` pixels (default `320`), so it does not react to a scrolling `<div>`.",
      },
      {
        q: "Why don't the default buttons do anything?",
        a: "\"Docs\" and \"Get started\" are samples with no handlers. Pass `actions`, for example `actions={<Button size=\"sm\" render={<a href=\"/signup\" />}>Start free</Button>}`.",
      },
      {
        q: "Will it cover my footer or cookie banner?",
        a: "It can: it sits 12px from the bottom (16px from `sm`) at `z-40`. Add bottom padding to your footer, and give a cookie banner a higher `z-index` or render the bar only after consent.",
      },
    ],
    a11y: [
      "The bar is a `role=\"region\"` named by `title`, so screen reader users can jump to it.",
      "While hidden it has `aria-hidden` and `inert`, so its buttons leave the Tab order until the bar slides in.",
      "Under reduced motion it shows and hides instantly instead of springing.",
    ],
  },
  testimonial: {
    faq: [
      {
        q: "What shows when I have no photo of the customer?",
        a: "Their initials in the avatar: the first letters of the first and last word of `name`, or the first two letters of a single word. Pass `src` for a photo. Base UI keeps the initials up until the image loads, and keeps them if it fails.",
      },
      {
        q: "Can I render it from a Server Component?",
        a: "Yes. Every prop is a string, so a Server Component can pass them. The file is marked `\"use client\"` because the avatar is a Base UI component.",
      },
    ],
    a11y: [
      "It renders a `<figure>` with a `<blockquote>` and a `<figcaption>`, so the name and role belong to the quote.",
      "The photo has `alt=\"\"` because the name is printed next to it.",
      "Curly quotation marks are added as text, so leave them out of `quote`.",
    ],
  },
  "testimonial-carousel": {
    faq: [
      {
        q: "How do I turn off auto-rotation?",
        a: "Pass `interval={0}`. Rotation also stops for good once the visitor presses a dot, Prev or Next. It pauses while the pointer or focus is inside and never runs under reduced motion.",
      },
      {
        q: "Does it loop?",
        a: "Yes. Next on the last quote goes to the first, and Prev on the first goes to the last. Auto-rotation wraps the same way.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the dot buttons, then Prev and Next. Focus inside pauses rotation." },
      { keys: "Enter / Space", action: "On a dot, shows that quote. On Prev or Next, moves one quote. Either stops auto-rotation." },
    ],
    a11y: [
      "The section has `aria-roledescription=\"carousel\"` and `aria-label` from `label` (default \"Customer testimonials\"). Each quote is a `role=\"group\"` with `aria-roledescription=\"slide\"` and a label like \"2 of 3\".",
      "The live region is `aria-live=\"off\"` during auto-rotation and becomes `polite` once the visitor takes control, so only chosen slides are announced.",
      "Each dot is a `<button>` labelled \"Show testimonial 2\", and the current one has `aria-current=\"true\"`.",
    ],
  },
  "waitlist-hero": {
    faq: [
      {
        q: "How do I show my API's error message?",
        a: "Throw an `Error` from `onSubmit`: its `message` is shown under the form and the typed email stays. Anything else that is thrown shows \"Something went wrong. Please try again.\"",
      },
      {
        q: "How do I call a Server Action from it?",
        a: "Call it inside `onSubmit`, which receives the trimmed email: `onSubmit={async (email) => { const res = await joinWaitlist(email); if (!res.ok) throw new Error(res.error) }}`. The form calls `preventDefault`, so there is no `FormData`.",
      },
      {
        q: "How do I hide the \"1,800+ already waiting\" row?",
        a: "Pass `proof={null}`. That row is sample text with placeholder avatars, so hide it or pass your own [`SocialProof`](/docs/social-proof) with a number you can back up.",
      },
    ],
    keyboard: [
      { keys: "Enter", action: "In the email field, submits the form. The browser blocks it if the field is empty or not an email address." },
    ],
    a11y: [
      "The title is an `<h1>`. The form, the error and the success message sit in one `aria-live=\"polite\"` region, so the result is announced.",
      "The input has `aria-label=\"Email\"`, `autoComplete=\"email\"` and `inputMode=\"email\"`. After an error it gets `aria-invalid` and `aria-describedby` pointing at the message.",
      "While sending, the button is disabled, has `aria-busy` and reads \"Sending…\". The glow behind the title is `aria-hidden` and holds still under reduced motion.",
    ],
  },
  "waveform-hero": {
    faq: [
      {
        q: "Does the waveform react to real audio?",
        a: "No. Bar heights come from a sine curve computed once, and each bar loops a CSS scale animation. It is decoration. To show a real recording use [`AudioRecorder`](/docs/audio-recorder).",
      },
      {
        q: "Why is the title an `<h2>`?",
        a: "WaveformHero renders `title` in an `<h2>`, so it can sit lower on a page. If it is the first section, change it to `<h1>` in the copied file, or put an `<h1>` above it.",
      },
      {
        q: "Does it keep animating off screen?",
        a: "No. `useInView` with an 80px margin pauses every bar's animation while the waveform is out of view. Lower `bars` (default `48`) for fewer animated elements.",
      },
    ],
    a11y: [
      "The waveform container is `aria-hidden`, so screen readers skip the bars.",
      "The bars stop with `motion-reduce:[animation:none]` and stay at their resting heights.",
      "The call to action is a [`MagneticCta`](/docs/magnetic-cta): it leans toward a mouse or pen only, so touch and keyboard users get a still button.",
    ],
  },
  "audio-player": {
    faq: [
      {
        q: "Why doesn't pressing play make any sound?",
        a: "AudioPlayer renders no `<audio>` element. Keep one yourself, call its `play()` and `pause()` from `onToggle`, and pass `playing` and `progress` (0 to 100) from its `onPlay`, `onPause` and `onTimeUpdate` events.",
      },
      {
        q: "Can listeners seek by clicking the progress bar?",
        a: "No. The bar is a `role=\"progressbar\"`, not a slider. For seeking, add a [`Slider`](/docs/slider) next to it and set the audio's `currentTime` from its value.",
      },
    ],
    a11y: [
      "The button's `aria-label` includes the track: \"Play Northwind kickoff\" or \"Pause Northwind kickoff\".",
      "The progress bar has `role=\"progressbar\"`, `aria-valuetext` like \"36% played\" and `aria-label=\"{title} progress\"`.",
      "`progress` is clamped to 0–100, and `NaN` or `Infinity` counts as 0, so a missing duration never breaks the bar.",
    ],
  },
  "audio-recorder": {
    faq: [
      {
        q: "How do I upload the recording?",
        a: "Take the `Blob` from `onRecorded(blob, { duration, url, mimeType })` and send it: `form.append(\"audio\", blob, \"note.webm\")`. Don't store `url`. It is revoked when the visitor records again or the component unmounts.",
      },
      {
        q: "Which audio format does it record?",
        a: "The first type the browser's `MediaRecorder` supports from WebM/Opus, WebM, MP4, Ogg/Opus and Ogg. Read the real type from `mimeType` in `onRecorded`. The Download button names the file `.webm`, `.m4a` or `.ogg` to match.",
      },
      {
        q: "Why does it say recording is not supported?",
        a: "The browser needs `navigator.mediaDevices.getUserMedia` and `MediaRecorder`, which only exist on HTTPS pages and `localhost`. If the visitor blocks the microphone it explains how to allow it, and with no microphone it says so.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the round button, starts or stops recording. After recording, plays or pauses." },
      { keys: "ArrowRight / ArrowUp", action: "On the finished waveform, seeks forward 1 second, or 5 seconds with Shift." },
      { keys: "ArrowLeft / ArrowDown", action: "On the finished waveform, seeks back 1 second, or 5 seconds with Shift." },
      { keys: "Home / End", action: "On the finished waveform, jumps to the start or the end." },
      { keys: "Space / Enter", action: "On the finished waveform, plays or pauses the recording." },
    ],
    a11y: [
      "The round button is labelled \"Start recording\", \"Stop recording\", \"Play\" or \"Pause\" for its current job.",
      "The waveform is `role=\"img\"` until the recording is finished, then becomes a focusable `role=\"slider\"` with `aria-valuetext` like \"00:04 of 00:12\" once the recording is done.",
      "An `sr-only` polite region announces Recording, Paused and Recorded. The hint line is `aria-live=\"off\"` while recording, so the countdown is not read every second.",
      "Under reduced motion the level bars repaint 12 times a second instead of 30, and the recording dot does not ping.",
    ],
  },
  avatar: {
    faq: [
      {
        q: "How do I stop the initials flashing before the photo loads?",
        a: "Pass `delay` to `AvatarFallback`, in milliseconds: `<AvatarFallback delay={600}>MC</AvatarFallback>`. A cached image loads before the delay ends, so the initials never show. They still appear if the image fails.",
      },
      {
        q: "How do I make an avatar bigger than 40px?",
        a: "`size` covers `sm` (24px), `default` (32px) and `lg` (40px). For other sizes add a class: `<Avatar className=\"size-16\">`. The fallback text only shrinks for `sm`, so set a text size on `AvatarFallback` too, for example `className=\"text-xl\"`.",
      },
      {
        q: "Which AvatarGroup should I use?",
        a: "This file's `AvatarGroup` overlaps whatever `Avatar` children you give it and has `AvatarGroupCount` for a \"+3\" circle. The separate [`AvatarGroup`](/docs/avatar-group) component takes an array of people and adds tooltips and the overflow count for you.",
      },
    ],
    a11y: [
      "Base UI does not render `AvatarImage` until the image has loaded, so screen readers never meet a broken image. `AvatarFallback` shows in the meantime.",
      "`AvatarFallback` text is read aloud. When the name is printed next to the avatar, add `aria-hidden` to the `Avatar` so the initials are not read before it.",
      "The thin edge is a `::after` border, so it adds nothing to the accessibility tree.",
    ],
  },
  "before-after-wipe": {
    faq: [
      {
        q: "What does `value` mean?",
        a: "The percentage of the width that shows `before`, from the left edge. `0` shows only `after`, `100` only `before`, and the default `50` splits the frame in half. Control it with `value` and `onValueChange`, or set a start point with `defaultValue`.",
      },
      {
        q: "Why don't my two images line up?",
        a: "Both layers fill the frame (`absolute inset-0`), which is `aspect-[16/10]` by default. Give both images `className=\"size-full object-cover\"` and the same framing. Change the frame with `className=\"aspect-video\"`.",
      },
      {
        q: "Where do `beforeLabel` and `afterLabel` appear?",
        a: "On your own content they are only read by screen readers, in the slider's name and value. The visible labels exist only on the sample layers. Put a small label inside `before` and `after` if sighted users need one.",
      },
    ],
    keyboard: [
      { keys: "ArrowLeft / ArrowDown", action: "Moves the divider 1% to the left, showing more of `after`." },
      { keys: "ArrowRight / ArrowUp", action: "Moves the divider 1% to the right, showing more of `before`." },
      { keys: "PageUp / PageDown", action: "Moves the divider in larger steps (the browser's native range step)." },
      { keys: "Home / End", action: "Moves the divider to 0 (only `after`) or 100 (only `before`)." },
    ],
    a11y: [
      "The divider is a transparent native `<input type=\"range\">` over the whole frame, named \"Compare {beforeLabel} and {afterLabel}\".",
      "`aria-valuetext` reads both sides, for example \"50% Generic dashboard, 50% Redesigned\".",
      "The round handle shows the focus ring when the hidden input has keyboard focus, through `group-has-[input:focus-visible]`.",
      "`touch-pan-y` lets a vertical swipe scroll the page while a horizontal drag moves the divider.",
    ],
  },
  carousel: {
    faq: [
      {
        q: "Does Carousel autoplay or loop?",
        a: "No. It is a native scroll-snap row. Previous and Next scroll by 85% of its width and disable at each end. For a strip that moves on its own use [`Marquee`](/docs/marquee), and for one rotating quote use [`TestimonialCarousel`](/docs/testimonial-carousel).",
      },
      {
        q: "How do I change how many slides show at once?",
        a: "Each slide wrapper has `min-w-[80%] sm:min-w-[45%] lg:min-w-[30%]` in the file, which gives about 1.2, 2 and 3 slides. There is no prop for it, so edit those classes in the copied file.",
      },
      {
        q: "Can I add dots or read the current slide index?",
        a: "Not as built. Carousel keeps no index: it only tracks whether the scroll is at either end. Read `scrollLeft` from the track in the copied file if you need an index.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the Previous and Next buttons (a disabled one is skipped), then to the slide track, then into the slides." },
      { keys: "ArrowLeft / ArrowRight", action: "When the track itself has focus, scrolls back or forward by most of a view. Arrows inside a slide's own controls are left alone." },
      { keys: "Enter / Space", action: "On Previous or Next, scrolls one view." },
    ],
    a11y: [
      "The wrapper is `role=\"region\"` with `aria-roledescription=\"carousel\"` and `aria-label` from `label`. The default is \"Carousel\", so pass a real name.",
      "Each slide is a `role=\"group\"` with `aria-roledescription=\"slide\"` and a label like \"2 of 6\".",
      "The buttons are labelled \"Previous slides\" and \"Next slides\". Under reduced motion they scroll instantly instead of smoothly.",
    ],
  },
  "device-frame": {
    faq: [
      {
        q: "How do I make the phone frame smaller?",
        a: "The phone is a fixed 300×630px. Scale it with a transform: `className=\"scale-75 origin-top\"`. A transform does not shrink the space the frame takes in the layout, so add a negative bottom margin to close the gap.",
      },
      {
        q: "Why don't the bezel highlight and glass sheen move?",
        a: "They read the kit's light variables (`--sx`, `--sy` and `--la`). [`LightProvider`](/docs/light-provider) updates those. Without it they stay at the default top-left light.",
      },
      {
        q: "Is the address bar a real link?",
        a: "No. `url` is plain text in the browser frame and `time` is plain text in the phone status bar. Neither navigates.",
      },
    ],
    a11y: [
      "The notch, side buttons, signal and battery icons, glass sheen, window dots and lock icon are all `aria-hidden`. Only `time`, `url` and your children are read.",
      "Children stay interactive and in the Tab order. If the UI inside is only an illustration, wrap it in an element with `inert` so its controls leave the Tab order.",
    ],
  },
  "file-list": {
    faq: [
      {
        q: "Why do the sample rows have a download button but mine don't?",
        a: "Each row shows a download button only when you pass `onDownload`, which receives the file's `id`. The sample files show one anyway so the demo looks complete.",
      },
      {
        q: "Can I add delete or other actions to each row?",
        a: "Not through props. [`FileRow`](/docs/file-row) only knows a download action. Edit the copied `FileRow` to add another icon button with an `aria-label` that names the file.",
      },
    ],
    a11y: [
      "It renders a `<ul aria-label=\"Files\">`, so screen readers announce a named list and how many files it holds. The label is fixed in the file.",
      "Each download button is labelled with the file name, such as \"Download INV-2041-northwind.pdf\".",
    ],
  },
  "file-row": {
    faq: [
      {
        q: "How are long file names handled?",
        a: "The name and meta line are truncated with an ellipsis. The full name stays in the `title` tooltip and in the download button's label.",
      },
      {
        q: "Can the row link straight to the file?",
        a: "No. The name is plain text, and the only action is the `onDownload` button. Start the download or open the URL inside that handler.",
      },
    ],
    a11y: [
      "The file icon is `aria-hidden`. The download button is an [`IconButton`](/docs/icon-button) labelled \"Download {name}\".",
      "The meta line uses `tabular-nums`, so sizes and dates line up when rows are stacked.",
    ],
  },
  "filmstrip-scrub": {
    faq: [
      {
        q: "Why does it open on frame 4?",
        a: "`defaultValue` is `3`, a 0-based index, so the sample opens part way through. Pass `defaultValue={0}` to start at the first frame.",
      },
      {
        q: "Do the thumbnails show my frames?",
        a: "No. The strip buttons are empty boxes that only show which frame is selected. `renderFrame(index)` draws the large viewer. For image thumbnails, render the image inside each strip button in the copied file.",
      },
      {
        q: "How do I sync it with a video?",
        a: "Control it: keep the index in state, pass `value` and `onValueChange`, and set `video.currentTime = index / fps` in the handler. Update the index from the video's `timeupdate` event to follow playback.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the thumbnail buttons, then to the scrub slider." },
      { keys: "Enter / Space", action: "On a thumbnail, selects that frame." },
      { keys: "ArrowLeft / ArrowRight", action: "On the slider, moves one frame back or forward." },
      { keys: "Home / End", action: "On the slider, jumps to the first or last frame." },
    ],
    a11y: [
      "Each thumbnail is a `<button>` labelled \"Frame 3\" with `aria-pressed` on the selected one. The strip is a `role=\"group\"` labelled \"Filmstrip\".",
      "The slider has a visible \"Scrub\" `<label>` and `aria-valuetext` like \"Frame 4 of 12\".",
      "The strip scrolls the selected thumbnail into view without scrolling the page, and jumps instead of smooth scrolling under reduced motion.",
    ],
  },
  "image-cropper": {
    faq: [
      {
        q: "How do I upload the cropped image?",
        a: "Keep the rectangle from `onCrop`, which fires about 160ms after an interaction settles. Then render it: `const blob = await getCroppedBlob(src, rect, { type: \"image/webp\", width: 800 })` and append the blob to `FormData`. Pass `circle: true` for a round avatar with transparent corners.",
      },
      {
        q: "Why does export fail for images on another domain?",
        a: "Drawing a cross-origin image taints the canvas unless the server sends CORS headers. The cropper sets `crossOrigin=\"anonymous\"` for remote URLs, so the server must answer with `Access-Control-Allow-Origin`. For a file the user picked, pass `URL.createObjectURL(file)`, which always works.",
      },
      {
        q: "How do I lock it to a square avatar crop?",
        a: "Pass `aspects={[\"1:1\"]}`, `defaultAspect=\"1:1\"` and `defaultCircle`. Turning the circle on forces 1:1 and disables the other aspects. Set `allowCircle={false}` to hide the toggle.",
      },
      {
        q: "Are the crop numbers in screen pixels?",
        a: "No. `x`, `y`, `width` and `height` are in source image pixels, measured after `rotation` (0, 90, 180 or 270), so they stay correct whatever size the frame is shown at.",
      },
    ],
    keyboard: [
      { keys: "ArrowLeft / ArrowRight / ArrowUp / ArrowDown", action: "On the crop area, moves the image 12px. Hold Shift for 48px." },
      { keys: "Plus / =", action: "On the crop area, zooms in." },
      { keys: "- / _", action: "On the crop area, zooms out." },
      { keys: "R", action: "On the crop area, rotates 90 degrees clockwise." },
      { keys: "0", action: "On the crop area, resets position, zoom and rotation." },
      { keys: "ArrowLeft / ArrowRight / Home / End", action: "In the aspect ratio control, moves the selection between presets." },
    ],
    a11y: [
      "The crop area is a focusable `role=\"group\"` with `aria-roledescription=\"image cropper\"` and `aria-label=\"Crop {alt}\"`. Its `aria-describedby` points at hidden instructions listing the drag, arrow, zoom, R and 0 controls.",
      "The aspect presets are a `role=\"radiogroup\"` with one Tab stop. The circle toggle has `aria-pressed`, and the rotate and zoom buttons have labels.",
      "Load and export failures render in `role=\"alert\"` so they are announced. The preview image is named \"Cropped preview of {alt}\".",
      "Under reduced motion every spring has `duration: 0`, so pans, zooms and the circle mask change instantly.",
    ],
  },
  "image-gallery": {
    faq: [
      {
        q: "Can visitors click a tile to see it larger?",
        a: "Not as built: each tile is a plain `<img>`. Map your images to [`ImageLightbox`](/docs/image-lightbox) in your own grid with the same classes, or wrap each tile in the copied file.",
      },
      {
        q: "Can I use `next/image` for the tiles?",
        a: "Yes, by editing the copied file. Each tile is an [`AspectRatio`](/docs/aspect-ratio) box with `position: relative`, so swap the `<img>` for `<Image fill sizes=\"(min-width: 640px) 33vw, 50vw\" />` and keep `object-cover`.",
      },
      {
        q: "What happens to tall or wide photos?",
        a: "Every tile is square and the image uses `object-cover`, so the edges are cropped. For mixed heights use [`MasonryGrid`](/docs/masonry-grid).",
      },
    ],
    a11y: [
      "`alt` is required in the `GalleryImage` type. Use an empty string only for a purely decorative tile.",
      "Images load with `loading=\"lazy\"` and `decoding=\"async\"`, so off-screen tiles don't hold up the page.",
      "The grid is a plain `<div>`, not a list, so screen readers read the images one after another without a count.",
    ],
  },
  "image-lightbox": {
    faq: [
      {
        q: "Can the thumbnail and the full view use different files?",
        a: "No. `src` is used for both, so the thumbnail downloads the full-size file. To load a small thumbnail first, give the trigger's `<img>` its own `src` in the copied file.",
      },
      {
        q: "How do I change the thumbnail size?",
        a: "`className` goes on the wrapper, not the image. The thumbnail is fixed at `h-28 w-44` with `object-cover`, so change those classes in the copied file.",
      },
      {
        q: "How do I open it from my own button?",
        a: "Pass `open` and `onOpenChange` to control it, then set `open` to `true` from your button. The thumbnail still renders as the trigger, and Escape or a click on the backdrop calls `onOpenChange(false)`.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the thumbnail, opens the viewer and moves focus into it." },
      { keys: "Escape", action: "Closes the viewer and returns focus to the thumbnail." },
      { keys: "Tab", action: "Stays inside the open viewer, on the Close button." },
    ],
    a11y: [
      "The thumbnail is a `<button>` whose name is the image `alt` plus a hidden \", open larger\".",
      "The viewer is a Base UI Dialog named by `alt` through `aria-label`. Focus is trapped inside and the page behind does not scroll.",
      "The Close button is labelled \"Close\". The fade and zoom are cut with `motion-reduce:animate-none`.",
    ],
  },
  "link-preview": {
    faq: [
      {
        q: "Does LinkPreview fetch the title and image for a URL?",
        a: "No. You pass `title`, `description` and `image`. Read the page's Open Graph tags on your server, in a route handler or Server Component: the browser's CORS rules stop a page reading most other sites.",
      },
      {
        q: "Can the link open in the same tab?",
        a: "Not through props: it always sets `target=\"_blank\"` with `rel=\"noopener noreferrer\"`. Remove the `target` in the copied file for same-tab links, and drop the hidden \"(opens in a new tab)\" text with it.",
      },
    ],
    a11y: [
      "The whole card is one `<a>`, so its accessible name is all the text inside: title, description, URL and a hidden \"(opens in a new tab)\".",
      "The preview image has `alt=\"\"` because the title already describes the page.",
      "The description is clamped to two lines and the URL truncated with CSS only, so screen readers still read the full text.",
    ],
  },
  "media-library": {
    faq: [
      {
        q: "Do uploaded files stay in the list?",
        a: "Only until the page reloads. Picked files go to the top of a local list and are passed to `onUpload(files)`; nothing is sent anywhere unless you do it in that handler. The starting list is sample data with no prop to replace it, so edit `SAMPLE` in the copied file.",
      },
      {
        q: "How do I limit which files can be picked?",
        a: "Pass `accept` with the same syntax as the input attribute, for example `accept=\"image/*,.pdf\"`. It only filters the file picker, so check type and size again on the server.",
      },
    ],
    a11y: [
      "The panel is a `<section>` labelled by its \"Files\" `<h2>`.",
      "The file count line is `aria-live=\"polite\"`, so adding files announces the new count.",
      "The file input is `hidden` and opened by the Upload button, so keyboard users reach one control, not two.",
    ],
  },
  "qr-code": {
    faq: [
      {
        q: "Will the code still scan with a logo in the middle?",
        a: "Yes, if you set `level=\"H\"`: the default is `\"M\"`, and children only render at H, which can recover 30% of the code. `logoScale` (default `0.24`) sets the cleared well, so keep the logo small and test with a phone. The downloaded SVG leaves the well empty and does not include the logo.",
      },
      {
        q: "Why does it say \"Too long for level H\"?",
        a: "The value does not fit even the largest QR version at that error correction level. Higher levels store less data, so try `level=\"M\"` or `\"L\"`, or shorten the value, for example with a short link.",
      },
      {
        q: "Does it scan in dark mode?",
        a: "The modules use `currentColor`, so on a dark theme the code is light on dark, which many scanners read but not all. Pass `fg` and `bg` for dark modules on a light background. Download SVG always writes black on white unless you set them.",
      },
    ],
    a11y: [
      "The SVG is `role=\"img\"` with `aria-label` from `title`, or \"QR code for {value}\" by default. Pass a shorter `title` when the value is a long URL or a token.",
      "The logo well is `aria-hidden`. The caption is truncated with the full value in its `title` tooltip.",
      "The download button is `aria-live=\"polite\"`, so the change to \"Saved\" is announced.",
    ],
  },
  "video-player-chrome": {
    faq: [
      {
        q: "How do I connect it to a real video?",
        a: "Put the `<video>` in `children` as a direct child, without its `controls` attribute, and call `play()` or `pause()` in `onToggle`, which receives the next playing state. Pass `playing` and `progress` (0 to 100) from the video's `onPlay`, `onPause` and `onTimeUpdate` events, for example `progress={(v.currentTime / v.duration) * 100}`. Before the metadata loads that is `NaN`, which the bar shows as 0.",
      },
      {
        q: "Does it have volume, seeking or fullscreen?",
        a: "No. The volume icon is decoration and the progress bar is read-only. Use the video's native `controls` if you need those.",
      },
    ],
    a11y: [
      "The centre button is labelled \"Play\" or \"Pause\" followed by `title`, such as \"Play Q3 close walkthrough\", so several players on a page have distinct names. Without `title` it is just \"Play\" or \"Pause\".",
      "The progress bar is `role=\"progressbar\"` named \"Playback progress\", with `aria-valuenow` rounded to a whole percent. The volume icon is `aria-hidden`.",
    ],
  },
}
