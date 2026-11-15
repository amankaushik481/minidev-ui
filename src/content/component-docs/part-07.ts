import type { ComponentDocsContent } from "../types"

export const PART_07: Record<string, ComponentDocsContent> = {
  "announcement-bar": {
    faq: [
      {
        q: "How do I keep the announcement bar closed after a visitor dismisses it?",
        a: "The bar has no open state of its own. `onDismiss` only runs your handler, so save the choice (a cookie or `localStorage` key that includes the announcement's id) and stop rendering `AnnouncementBar` when it is set. Change the id when you post a new announcement.",
      },
      {
        q: "Can I put a link in the announcement?",
        a: "Yes. `children` is any React node, and every `<a>` inside it is styled for you: medium weight, accent text and an underline that darkens on hover. Keep it to one short link so the bar stays on one line on phones.",
      },
    ],
    a11y: [
      "The bar is a `role=\"region\"` landmark named by `label`, which defaults to `\"Announcement\"`, so screen reader users can find it from the landmarks list.",
      "The dismiss control is an [`IconButton`](/docs/icon-button) with `aria-label=\"Dismiss announcement\"` and a decorative X icon.",
      "Dismissing does not move focus. If you remove the bar from the tree, focus falls back to the page body, so consider focusing the header or main content in `onDismiss`.",
    ],
  },
  "bento-grid": {
    faq: [
      {
        q: "How do I make one tile bigger than the others?",
        a: "Set `span` (2, 3, 4 or 6 columns out of 6) and `rows` (1 or 2) on that item. Spans only apply at the `lg` breakpoint: below it the grid is one column on phones and two on tablets, and the first tile always spans both tablet columns.",
      },
      {
        q: "Can I put my own chart or screenshot in a tile?",
        a: "Pass it as `visual` on the item and it renders under the description. A tile with `rows: 2` and no `visual` gets a small decorative bar chart. Pass `visual: null` to keep the tall tile with no art.",
      },
      {
        q: "Does BentoGrid work in a Next.js Server Component?",
        a: "Yes. The file has no `\"use client\"` directive, no state and no motion, so it renders on the server with no JavaScript sent. `icon` takes a lucide component (`icon: BellIcon`), not an element. For a version with live, animated tiles use [`BentoLive`](/docs/bento-live).",
      },
    ],
    a11y: [
      "Each tile title is an `<h3>`, so a page with an `<h2>` above the grid keeps a clean heading outline.",
      "Tile icons and the default bar chart are `aria-hidden`.",
      "A tile with `href` becomes one `<a>` whose name is its title plus description. Do not put other links or buttons inside it.",
    ],
  },
  "blog-card": {
    faq: [
      {
        q: "Why is the cover image's alt text empty?",
        a: "The whole card is one link and the `<h3>` title already names it, so the image is marked decorative with `alt=\"\"`. A descriptive alt would make screen readers read the image before the title on every card.",
      },
      {
        q: "How is the date shown, and will it cause a hydration mismatch?",
        a: "`date` goes to [`RelativeTime`](/docs/relative-time), which prints \"3d ago\" inside a `<time>` with the ISO value in `dateTime` and the full date in `title`. It sets `suppressHydrationWarning`, so a server render a few minutes older than the client does not warn.",
      },
      {
        q: "How do I use BlogCard with Next.js Link or next/image?",
        a: "It renders a plain `<a href>` and a lazy `<img>`, with no `render` prop. For client-side navigation or optimised images, copy the file and swap those two elements for `Link` and `Image`.",
      },
    ],
    a11y: [
      "The card is one `<a>`; its accessible name is the tag, date, title and excerpt read in order.",
      "The cover `<img>` has `alt=\"\"` and loads with `loading=\"lazy\"`. Without `image`, a sunken 16:9 box holds the space.",
      "`href` defaults to `\"#\"`, so a card rendered without one is still a focusable link that goes nowhere. Always pass `href`.",
    ],
  },
  "case-study-card": {
    faq: [
      {
        q: "How do I show that a number went down as a good result?",
        a: "Set `invertDelta`. `delta` renders a [`MetricDelta`](/docs/metric-delta), which colours rises green and falls red; `invertDelta` passes `invert` to it, so `delta={-60} invertDelta` on a close-time card shows the 60% cut in green.",
      },
      {
        q: "Should the result be a number or a string?",
        a: "A string you format yourself, such as `\"2 days\"` or `\"$1.2M\"`. The card does no formatting; it sets the figure in `tabular-nums` so digits line up across a row of cards.",
      },
    ],
    keyboard: [{ keys: "Tab", action: "With `href`, moves focus to the card, which is a single link. Without it the card is not focusable." }],
    a11y: [
      "Without `href` the card is an `<article>`; with it, the whole card is one `<a>` with a 2px accent focus ring.",
      "The title is an `<h3>` and the company eyebrow is a `<p>` above it.",
      "The delta arrow is `aria-hidden`; screen readers hear \"Up 12%\" or \"Down 60%\" from visually hidden text.",
    ],
  },
  "cookie-banner": {
    faq: [
      {
        q: "How do I remember the visitor's cookie choice?",
        a: "The banner stores nothing. Write the choice in `onAccept` and `onReject` (a first-party cookie is readable on the server, `localStorage` is not), and only render `CookieBanner` while no choice is saved. Load analytics scripts only after `onAccept` runs.",
      },
      {
        q: "Does it offer per-category choices like analytics and marketing?",
        a: "No, it has two buttons: Reject and Accept. For per-category toggles, build a dialog with [`Switch`](/docs/switch) rows and link to it from `children`.",
      },
    ],
    a11y: [
      "The card is a `<section>` with `aria-label=\"Cookie consent\"`, so it is a named region that screen reader users can find.",
      "It is not modal and does not take focus when it appears. Its place in the Tab order follows where you render it in the DOM, not where it floats on screen.",
      "Reject and Accept are the same size and sit side by side, so rejecting is as easy as accepting.",
    ],
  },
  "faq-list": {
    faq: [
      {
        q: "Does FaqList add FAQPage structured data for Google?",
        a: "No. It renders the accordion only. Build the JSON-LD from the same `items` array in a `<script type=\"application/ld+json\">`, mapping each `q` to a `Question` and each `a` to its `acceptedAnswer`.",
      },
      {
        q: "Can an answer contain links or formatting?",
        a: "No, `a` is typed as a plain string. For rich answers, use [`Accordion`](/docs/accordion) directly with your own `AccordionPanel` content.",
      },
      {
        q: "Can I open a question by default or let several stay open?",
        a: "Yes. Item values are `faq-0`, `faq-1` and so on, so `defaultValue={[\"faq-0\"]}` opens the first question. Add `multiple` to let several answers stay open; without it, opening one closes the other.",
      },
    ],
    keyboard: [
      { keys: "Tab / Shift+Tab", action: "Moves between questions." },
      { keys: "Enter / Space", action: "Opens or closes the focused question." },
    ],
    a11y: [
      "Each question is a native `<button>` inside an `<h3>`, with `aria-expanded` and `aria-controls` from Base UI.",
      "Each answer is a `role=\"region\"` labelled by its question.",
    ],
  },
  "feature-grid": {
    faq: [
      {
        q: "Can a FeatureGrid card link to a feature page?",
        a: "No. A feature has only `title`, `description` and `icon`, and each card is a plain `<div>`. For tiles that are links, use [`BentoGrid`](/docs/bento-grid) items with `href`. Cards are keyed by `title`, so keep titles unique.",
      },
      {
        q: "What should I pass as the icon?",
        a: "An element, such as `icon: <ReceiptIcon className=\"size-5\" />`. It is wrapped in an `aria-hidden` box with accent text colour, so lucide icons pick up the colour from `currentColor`.",
      },
    ],
    a11y: [
      "Each card title is an `<h3>`; put an `<h2>` section heading above the grid.",
      "The icon wrapper is `aria-hidden`, so screen readers read only the title and description.",
      "Cards are plain `<div>`s with no links or focus stops.",
    ],
  },
  "footer-mega": {
    faq: [
      {
        q: "Why does each footer column have its own nav landmark?",
        a: "Each column renders `<nav aria-label={col.title}>`, so screen reader users can jump straight to \"Developers\" or \"Company\" from the landmarks list. Keep column titles short and unique for that reason.",
      },
      {
        q: "How do I add a logo, social links or a copyright line?",
        a: "The props cover `brand` (text), `tagline` and `columns` only. Copy the file and add them to the first column or a bottom row; the outer `<footer>` and grid stay the same.",
      },
    ],
    a11y: [
      "The root is a `<footer>`, which is the page's contentinfo landmark when it is not inside `<main>` or an `<article>`.",
      "Column titles are `<p>` elements, not headings; the `aria-label` on each `<nav>` carries the name instead.",
    ],
  },
  hero: {
    faq: [
      {
        q: "Does the Hero button use Next.js Link for navigation?",
        a: "No. An action with `href` renders a plain `<a>` styled with `buttonVariants`, so navigation is a full page load and Next.js does not prefetch it. For client-side routing, copy the file and swap the `<a>` for `<Link href={action.href}>` with the same `className`.",
      },
      {
        q: "Can I render Hero from a Server Component?",
        a: "Yes, with `href` actions. The file is marked `\"use client\"`, and a Server Component cannot pass functions, so an action with `onClick` needs a client component around it.",
      },
      {
        q: "Can I have two Hero sections on one page?",
        a: "Avoid it: the title is always an `<h1>`, and a page should have one. For later section intros use [`SectionHeader`](/docs/section-header), and for a closing call to action use [`CtaBanner`](/docs/cta-banner).",
      },
    ],
    a11y: [
      "The title is the page's `<h1>` and the eyebrow is a `<p>` above it, so the heading text stays clean.",
      "An action with `href` is a plain `<a>` styled as a button, so screen readers announce a link. An action without `href` is a native `<button>`.",
      "Both actions use `size=\"lg\"` buttons, 44px tall, which meets the 44px touch target size.",
    ],
  },
  "cta-banner": {
    faq: [
      {
        q: "Can the call to action be a link and track a click?",
        a: "Yes. With `action.href` the button renders as an `<a>`, and `action.onClick` still runs on the same click, so you can send an analytics event and let the browser navigate.",
      },
      {
        q: "Can I add a second button?",
        a: "No, `action` takes one action. For a primary and secondary pair, use [`Hero`](/docs/hero) or put two `Button`s in your own band.",
      },
    ],
    a11y: [
      "The title is an `<h3>`; place the banner under an `<h2>` or change the tag in the file.",
      "Without `href` the action is a native `<button type=\"button\">`, so it never submits a surrounding form.",
      "With `href` it is an `<a>` that keeps its link role, so screen readers announce a link.",
    ],
  },
  "bento-live": {
    faq: [
      {
        q: "How do I put my own live widget in a tile?",
        a: "Pass any React node as `visual` on an item. To match the built-in tiles, start its timer only while it is on screen (`useInView` from `motion/react`) and skip it when `useReducedMotion()` is true; the default `LiveMetric` tile does exactly that.",
      },
      {
        q: "Do the live tiles keep running when they are off screen?",
        a: "No. The ticking MRR figure and the typed answer only run while their tile is in view, and the typed answer restarts each time it scrolls back in. The orbiting source names are a CSS animation that runs all the time unless the visitor prefers reduced motion.",
      },
      {
        q: "How is BentoLive different from BentoGrid?",
        a: "[`BentoGrid`](/docs/bento-grid) is static and server-rendered: icon, title and copy per tile. BentoLive is a client component with a section heading, tiles that rise in on scroll and lift on hover, and a demo area at the top of each tile.",
      },
    ],
    a11y: [
      "The section is labelled by its `<h2>` via `aria-labelledby`; each tile is an `<article>` with an `<h3>` title.",
      "The typed chat answer is `aria-hidden`; a visually hidden line gives screen readers the full question and answer at once.",
      "The live MRR figure uses [`NumberRoll`](/docs/number-roll), which hides the rolling digits and exposes the formatted value as text.",
      "With reduced motion, tiles render in place without the rise, the hover lift is off, the MRR figure stops ticking, the answer shows in full and the orbit stops.",
    ],
  },
  "changelog-page": {
    faq: [
      {
        q: "How do I pass my own releases to ChangelogPage?",
        a: "You edit the file. It takes only `className`; the three entries live in the `ENTRIES` array at the top. Replace it with your data (from MDX, a CMS or a JSON file) and keep the `version`, `date`, `label`, `tag`, `title` and `body` fields.",
      },
      {
        q: "Why does each entry have both `date` and `label`?",
        a: "`date` is the ISO value written to `<time dateTime>` for feeds and search engines, and `label` is the text people see, such as \"Nov 12\". Formatting at render with `new Date()` could differ between server and client, so the label is a fixed string.",
      },
    ],
    a11y: [
      "The block is a `<section>` labelled by its \"Changelog\" `<h2>`; entries are an ordered list, newest first.",
      "Each entry is an `<article>` labelled by its own `<h3>`, so screen reader article navigation reads the release title.",
      "Release dates are `<time>` elements with an ISO `dateTime`.",
    ],
  },
  "cta-band": {
    faq: [
      {
        q: "How do I connect the email form to my API or a Server Action?",
        a: "Pass `onSubmit`, which receives the email string: `onSubmit={(email) => joinWaitlist(email)}`. Return a promise and the button shows \"Sending…\" until it settles; throw (or reject) to show the error line. A `fetch` that returns a 4xx does not throw on its own, so check `res.ok` and throw.",
      },
      {
        q: "Why does the form say \"Check your inbox\" when I have not wired it up?",
        a: "Without `onSubmit` the band waits 700ms and then shows the success state, so the demo works on its own. Always pass `onSubmit` in production.",
      },
      {
        q: "Can the visitor submit again after it succeeds?",
        a: "No. After success the input is disabled and the button stays on the `success` label. Remount the component (change its `key`) to reset it.",
      },
    ],
    a11y: [
      "The input has `aria-label=\"Work email\"` and `autoComplete=\"email\"`; the placeholder is not its label.",
      "A `role=\"status\"` line announces the `success` text or the error message. It is visually hidden except when showing the error.",
      "The button is disabled while sending and after success; the glow, grid and accent blur behind the panel are `aria-hidden`.",
      "Under reduced motion the button's width change and label swap happen instantly.",
    ],
  },
  "agency-portfolio": {
    faq: [
      {
        q: "How do I link each project to its case study?",
        a: "Give the project an `href`. The whole card, image and text, becomes one link with an inset focus ring. Project `name` is the React key, so keep names unique.",
      },
      {
        q: "Where do the navbar and footer links come from?",
        a: "The navbar is [`NavMarketing`](/docs/nav-marketing) with your `brand` and its default links; the footer is [`FooterMega`](/docs/footer-mega) with one column, titled with your `brand`, of Work and Contact links pointing at `#`. Its brand block shows your `brand` with `tagline` under it. The \"Start a project\" button has no handler yet; give it an `onClick`, or swap it for an `<a href=\"/contact\">` with `className={buttonVariants()}`.",
      },
    ],
    a11y: [
      "The `title` is the page's only `<h1>`; projects are a `<ul>` of cards.",
      "Cover images use `alt=\"\"` because the project name and blurb next to them name the card.",
      "With reduced motion the headline and cards appear without the fade and rise.",
    ],
  },
  "blog-home": {
    faq: [
      {
        q: "How do the tag filters work?",
        a: "The chips are built from the unique `tag` values of `posts`, plus \"All\". Picking one filters the grid in the browser; the choice is kept in component state, not in the URL, so it resets on reload. For filters you can share, read the tag from `searchParams` and filter on the server.",
      },
      {
        q: "How do I put my brand in the navbar and footer?",
        a: "Pass `brand`. It goes to both [`NavMarketing`](/docs/nav-marketing) and [`FooterMega`](/docs/footer-mega), and defaults to \"Lumen\". The nav links and the footer's More column of `#` links are not props: edit the file to pass your own `links` and `columns`.",
      },
      {
        q: "Does BlogHome paginate posts?",
        a: "No, it renders every post it receives. Slice `posts` yourself and add a [`Pagination`](/docs/pagination) under the grid.",
      },
    ],
    keyboard: [
      { keys: "ArrowRight / ArrowDown", action: "In the tag chips, selects the next tag and moves focus to it." },
      { keys: "ArrowLeft / ArrowUp", action: "In the tag chips, selects the previous tag." },
      { keys: "Home / End", action: "In the tag chips, selects the first or last tag." },
      { keys: "Tab", action: "Leaves the chips (one Tab stop for the group) and moves to the post cards." },
    ],
    a11y: [
      "The tag chips are a `role=\"radiogroup\"` named \"Filter posts by tag\", with `role=\"radio\"` and `aria-checked` on each chip and a roving tabindex.",
      "Each post is a [`BlogCard`](/docs/blog-card): one link with an `<h3>` title under the page's single `<h1>`.",
      "Changing the filter does not announce how many posts remain; add a `role=\"status\"` line if that matters.",
    ],
  },
  "brand-kit-page": {
    faq: [
      {
        q: "Can I use just one section of the brand kit page?",
        a: "Yes, and that is the intended use. Every section is its own registry item: [`HeroPosterType`](/docs/hero-poster-type), [`TypographicMarquee`](/docs/typographic-marquee), [`CardTilt`](/docs/card-tilt), [`TextScramble`](/docs/text-scramble), [`GridReveal`](/docs/grid-reveal), [`MorphPrice`](/docs/morph-price) and [`MagneticCta`](/docs/magnetic-cta). BrandKitPage takes only `className`; to change the copy, edit the props it passes to each piece.",
      },
    ],
  },
  "careers-page": {
    faq: [
      {
        q: "How do I link Apply to my job board or ATS?",
        a: "Set `href` on each role. The Apply button then renders as an `<a>` to that URL. Without `href` it is a plain button with no handler, so every listed role should have one.",
      },
      {
        q: "Why does the CareersPage navbar say MiniDev?",
        a: "It renders [`NavMarketing`](/docs/nav-marketing) and [`FooterMega`](/docs/footer-mega) with no brand, so they show their defaults: \"MiniDev\" in the navbar and \"Lumen\" in the footer. Edit the file and pass your own `brand` to both.",
      },
      {
        q: "Can I group roles by team or filter by location?",
        a: "Not built in: roles render as one list in the order you pass them. Group them before rendering, or add a [`ChipFilter`](/docs/chip-filter) above the list and filter `roles` by `loc`.",
      },
    ],
    a11y: [
      "Each Apply button has an `aria-label` such as \"Apply for Design Engineer\", so a screen reader's list of buttons tells them apart.",
      "The page `title` is the only `<h1>`; role titles are `<p>` text, so screen reader users move between roles by list item, not heading.",
      "With reduced motion the headline and role rows appear without the fade and rise.",
    ],
  },
  "client-pitch-kit": {
    faq: [
      {
        q: "Is the content in ClientPitchKit real?",
        a: "No. Every section shows its component's sample data, and ClientPitchKit takes only `className`. Before you ship it, replace the metrics, logos and testimonials with your own approved content by editing the props each section receives in the file.",
      },
      {
        q: "How do I use one section on its own?",
        a: "Install that section: [`HeroClientPitch`](/docs/hero-client-pitch), [`MetricTickerBoard`](/docs/metric-ticker-board), [`BeforeAfterWipe`](/docs/before-after-wipe), [`FaqAccordionMotion`](/docs/faq-accordion-motion), [`TestimonialCarousel`](/docs/testimonial-carousel) and the rest are separate registry items with their own props.",
      },
    ],
  },
  "browser-mockup": {
    faq: [
      {
        q: "How do I put my own screenshot or live component in the browser frame?",
        a: "Pass `src` (and `alt`) for an image, or children for live UI; with neither, the frame shows the built-in Lumen dashboard and a phone beside it. Set `phone` to `false` to drop the phone. With your own content, `phone` is off by default; turn it on and pass `phoneContent` for the handset's screen, or the phone shows an empty screen.",
      },
      {
        q: "Can the mockup stay dark on a light page?",
        a: "Yes. `appearance=\"dark\"` adds the `dark` class to the frame (or to the whole scene when the phone shows), so it uses dark tokens in both themes. The default `\"auto\"` follows the page.",
      },
      {
        q: "How do I show only a phone?",
        a: "Import `PhoneMockup` from the same file: `<PhoneMockup width={260} src=\"/mobile.png\" alt=\"Lumen home screen\" />`. Height follows a 9:19.5 screen, and `time` sets the status bar clock.",
      },
    ],
    a11y: [
      "`alt` defaults to `\"\"`, so a screenshot is decorative unless you describe it. Write an `alt` when the image carries information the page text does not.",
      "Traffic lights, browser buttons, the lock icon, the phone's side buttons, status bar and dynamic island are all `aria-hidden`.",
      "The built-in sample dashboard is real markup with its own `<main>` and `<aside>`, so it adds a second main landmark to your page. Use `src` or children in production.",
      "The active tab gets `aria-current=\"page\"`; tabs are plain text, not controls.",
    ],
  },
  "changelog-marketing": {
    faq: [
      {
        q: "How do I wire up the Subscribe button?",
        a: "It is a [`MagneticCta`](/docs/magnetic-cta) with no handler, and ChangelogMarketing does not take a prop for it. Edit the file and pass `onClick` (to open a [`Dialog`](/docs/dialog) with an email field) or `render={<a href=\"/rss.xml\" />}`.",
      },
      {
        q: "What is the difference between `date` and `dateTime`?",
        a: "`date` is the text shown, such as \"Oct 8\". `dateTime` is the machine value written to the `<time>` element, such as \"2026-10-08\". Always pass `dateTime`; without it the `<time>` has no machine-readable date.",
      },
      {
        q: "What does `highlight` do?",
        a: "It gives that release an accent card border and an accent timeline dot. Use it on the one release you want to sell, usually the newest.",
      },
    ],
    a11y: [
      "Releases are an ordered list; each title is an `<h3>` under the gradient headline, which is an `<h2>`.",
      "The timeline dot and the separator dot between version and date are `aria-hidden`.",
      "With reduced motion the cards appear in place without the slide, and the Subscribe button stops following the pointer.",
    ],
  },
  "changelog-motion": {
    faq: [
      {
        q: "Which tags can a release have?",
        a: "`tag` is typed as `\"New\" | \"Fix\" | \"Premium\"` and renders an outline [`Badge`](/docs/badge) after the date. For other labels, widen the `Entry` type in the file.",
      },
      {
        q: "How is ChangelogMotion different from ChangelogMarketing?",
        a: "ChangelogMotion is the quiet version: a centred `<h2>` you set with `title`, tags per release and no call to action. [`ChangelogMarketing`](/docs/changelog-marketing) has a gradient headline, a Subscribe button and a highlighted release. [`ChangelogPage`](/docs/changelog-page) is the free one with no motion.",
      },
    ],
    a11y: [
      "Releases are an `<ol>` in the order you pass them, so screen readers announce how many there are. The timeline dot is `aria-hidden`.",
      "Dates are plain text, not `<time>` elements. Wrap `date` in `<time dateTime>` in the file if feeds or search engines should read them.",
      "With reduced motion, entries render in place without the fade and slide.",
    ],
  },
  "command-waitlist": {
    faq: [
      {
        q: "How do I send the email to a Server Action or API route?",
        a: "Pass `onSubmit`; it receives the trimmed address. Return a promise and the button reads \"Joining…\" with `aria-busy` until it settles. Throw to show `errorMessage`: the address stays in the field so the visitor can fix it.",
      },
      {
        q: "Does the ⌘K hint open the waitlist?",
        a: "No. The `⌘K` key cap in the title bar is decoration, marked `aria-hidden`, and no shortcut is bound. Remove it, or bind your own shortcut that focuses the input.",
      },
      {
        q: "What happens if I leave out `onSubmit`?",
        a: "The form goes straight to the success state and shows `successMessage`, so the demo works. Nothing is sent anywhere.",
      },
    ],
    a11y: [
      "The visible label \"join --email\" is a real `<label htmlFor>` tied to the input, so screen readers announce it as the field name.",
      "The status line is `role=\"status\"` and is linked to the input with `aria-describedby`, so \"Joining…\", the success message and the error message are announced and read with the field. The button also reads \"Joining…\" with `aria-busy` while pending.",
      "On error the input gets `aria-invalid` and a danger border; after success it becomes `readOnly` and the button is disabled.",
      "Under reduced motion the card appears without the spring rise.",
    ],
  },
  "contact-sales": {
    faq: [
      {
        q: "What does `onSubmit` receive?",
        a: "An object `{ email, company, message }` read from the form with `FormData`. Return a promise to show \"Sending…\"; throw to show the error line. Field values are not cleared on error, so nothing typed is lost.",
      },
      {
        q: "How do I replace the case study and press quote?",
        a: "They are hard-coded sample proof (a fictional Acme result and a press line), not props. Edit the file and pass your own approved results to [`CaseStudyCard`](/docs/case-study-card) and [`PressQuote`](/docs/press-quote), or remove them. The navbar is [`NavMarketing`](/docs/nav-marketing) with its default \"MiniDev\" brand, so pass yours there too.",
      },
      {
        q: "Does the form validate fields?",
        a: "Only through the browser: the email input is `type=\"email\"` and `required`. Company and message are optional. Validate again on the server in your `onSubmit` handler, and throw to show the error line.",
      },
    ],
    a11y: [
      "Every field has a visible `<label>` tied to its control through [`FormField`](/docs/form-field); Work email shows a required marker and sets `required` on the input.",
      "The form is labelled by a visually hidden `<h2>` \"Request a call\", next to the page's single `<h1>`.",
      "A `role=\"status\"` line under the button announces \"Thanks. We will be in touch soon.\" or the error message.",
      "Inputs use `autoComplete=\"email\"` and `\"organization\"`, so browsers can fill them in.",
    ],
  },
  "cta-glow": {
    faq: [
      {
        q: "How do I change the buttons in CtaGlow?",
        a: "Pass them as `children`; they replace the default pair. The defaults, a [`MagneticCta`](/docs/magnetic-cta) \"Get started\" and an outline \"Stay free\", have no handlers or links, so always pass your own in production: `<CtaGlow title=\"…\"><Button render={<a href=\"/signup\" />}>Start free</Button></CtaGlow>`.",
      },
      {
        q: "How is CtaGlow different from CtaBanner and CtaBand?",
        a: "CtaGlow is a centred panel with an accent glow and any actions you pass. [`CtaBanner`](/docs/cta-banner) is a plain row with one action and no motion. [`CtaBand`](/docs/cta-band) is a full section with an email field that handles its own sending state.",
      },
    ],
    a11y: [
      "The title is an `<h2>`; the radial glow and the top highlight line are `aria-hidden` and ignore the pointer.",
      "With reduced motion the panel appears in place without rising, and the default magnetic button stays still.",
    ],
  },
  "faq-accordion-motion": {
    faq: [
      {
        q: "Can more than one answer be open at a time?",
        a: "No. It keeps a single open index: opening a question closes the other, and clicking the open one closes it. For several open at once, use [`Accordion`](/docs/accordion) with `multiple`.",
      },
      {
        q: "How do I start with every question closed?",
        a: "Pass `defaultOpen={-1}`. The default is `0`, the first question. There is no controlled `open` prop.",
      },
      {
        q: "Will Google index the closed answers?",
        a: "Closed answers are removed from the DOM, so only the open one is in the HTML. If the answers should be searchable on the page, use [`FaqSection`](/docs/faq-section), which keeps closed answers in the markup.",
      },
    ],
    keyboard: [
      { keys: "Tab / Shift+Tab", action: "Moves between questions, and into links in the open answer." },
      { keys: "Enter / Space", action: "Opens the focused question, or closes it if it is open." },
    ],
    a11y: [
      "Each question is a native `<button>` inside an `<h3>`, with `aria-expanded`. `aria-controls` is set only while its answer is open, because a closed answer is not rendered.",
      "The open answer is a `role=\"region\"` labelled by its question.",
      "The plus and minus sign is `aria-hidden`.",
      "Under reduced motion answers open and close with no height animation.",
    ],
  },
  "faq-section": {
    faq: [
      {
        q: "Are closed answers still in the HTML for search engines?",
        a: "Yes. Every answer is rendered and collapsed with a `grid-template-rows` transition, and closed ones are `inert`, so the text is in the server HTML but cannot be focused. Add FAQPage JSON-LD yourself if you want rich results; the block does not emit it.",
      },
      {
        q: "Can an answer contain links?",
        a: "Yes, `a` takes any React node. Links in a closed answer are skipped by Tab because the panel is `inert`, and they become reachable when it opens.",
      },
      {
        q: "How do I start with all questions closed?",
        a: "Pass `defaultOpen={null}`. The default is `0`, which opens the first question. Only one question is open at a time.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "Opens or closes the focused question." },
      { keys: "ArrowDown / ArrowUp", action: "Moves focus to the next or previous question, wrapping at the ends." },
      { keys: "Home / End", action: "Moves focus to the first or last question." },
      { keys: "Tab", action: "Moves to the next question, or into links in the open answer." },
    ],
    a11y: [
      "The section is labelled by its `<h2>`; each question is a `<button>` inside an `<h3>` with `aria-expanded` and `aria-controls`.",
      "Each answer is a `role=\"region\"` labelled by its question and is `inert` while closed.",
      "The plus icon is `aria-hidden`. Its turn and the answer's height and fade transitions are switched off with `motion-reduce:transition-none`.",
    ],
  },
  "feature-bento-motion": {
    faq: [
      {
        q: "How do I make a tile wide?",
        a: "Set `wide: true` on the item and it spans two of the three columns from `sm` up. Plan the order so each row adds up to three: one wide and one normal tile, or three normal ones.",
      },
      {
        q: "Can tiles hold icons, images or links?",
        a: "No, each item has only `title` and `body` strings. For icons, art per tile or tiles that link, use [`BentoGrid`](/docs/bento-grid) or [`BentoLive`](/docs/bento-live).",
      },
    ],
    a11y: [
      "Tile titles are `<h3>`; the short accent line above each title is `aria-hidden`.",
      "Tiles are not focusable; the hover lift is decoration only.",
      "With reduced motion the tiles appear in place and do not lift on hover.",
    ],
  },
  "hero-aurora": {
    faq: [
      {
        q: "How do I make the HeroAurora buttons real links?",
        a: "There is no `href` prop: the buttons only take `onPrimary` and `onSecondary`. A button that calls `router.push` is not a link that search engines follow, so for navigation edit the file and give each `Button` a `render={<Link href=\"/signup\" />}`.",
      },
      {
        q: "Do the glows keep animating forever?",
        a: "Yes, two radial glows loop on an 18 and a 22 second cycle, moving with `transform` only. They stop when the visitor prefers reduced motion. For a stronger aurora behind any content, use [`AuroraBackground`](/docs/aurora-background).",
      },
    ],
    a11y: [
      "The title is an `<h1>`; the eyebrow is a `<p>` above it, not part of the heading.",
      "Both glows and the top highlight wash sit in one `aria-hidden` layer that ignores the pointer.",
      "Under reduced motion the glows stay still and the copy and buttons render in place without rising.",
    ],
  },
  "hero-bento": {
    faq: [
      {
        q: "How do I change the HeroBento headline and tiles?",
        a: "Edit the file. HeroBento takes only `className`; the headline, the \"Open gallery\" button and the four tiles in the `tiles` array are fixed. The button has no handler, so give it `render={<a href=\"/product\" />}` or an `onClick`.",
      },
      {
        q: "How is HeroBento different from FeatureBentoMotion?",
        a: "HeroBento is a page-top hero: an `<h1>` above tiles that rise in on load. [`FeatureBentoMotion`](/docs/feature-bento-motion) is a section lower on the page that takes `items` and rises in when scrolled into view.",
      },
    ],
    a11y: [
      "The headline is an `<h1>` and each tile title is an `<h2>`, so the four capabilities show up in the page outline.",
      "Under reduced motion the tiles render in place without the fade and rise.",
    ],
  },
  "hero-client-pitch": {
    faq: [
      {
        q: "Does HeroClientPitch work outside Next.js?",
        a: "Not as written: it imports `Link` from `next/link` for its two buttons, which go to `/showcase` and `/gallery`. In Vite or Remix, swap that import for your router's link or a plain `<a>`, and change the routes.",
      },
      {
        q: "Will screen readers and Google read the animated headline as one sentence?",
        a: "Yes. Each word is in its own masked `<span>`, but real spaces sit between them, so the `<h1>` text is \"Interfaces that look expensive on purpose.\"",
      },
      {
        q: "Can I change the stats under the buttons?",
        a: "Edit the `stats` array in the file; the component takes only `className`. Show only figures that are true of your product.",
      },
    ],
    a11y: [
      "The headline is one `<h1>`; the word masks and gradient line are styling on spans inside it.",
      "The accent circle and the top highlight line are `aria-hidden`.",
      "Stats are a `<dl>`, but the figure is in `<dt>` and the label in `<dd>`, the reverse of the usual term and description order.",
      "Under reduced motion the words, copy, buttons and stats render in place.",
    ],
  },
  "hero-editorial-split": {
    faq: [
      {
        q: "How do I change the copy and images in HeroEditorialSplit?",
        a: "Edit the file: it takes only `className`. The right column is a [`DeviceFrameStack`](/docs/device-frame-stack) of three skeleton windows whose titles come from its `frames` prop; it takes no images, so for a real screenshot swap in a [`BrowserMockup`](/docs/browser-mockup) with `src`. The \"Start free trial\" and \"Open docs\" buttons have no handlers yet.",
      },
    ],
    a11y: [
      "The two headline lines are block spans inside one `<h1>`, so it reads as \"Local craft. Public-ready polish.\"",
      "The device stack is one `role=\"img\"` named \"Product previews on mobile, app and docs\"; its frames are `aria-hidden`.",
      "Under reduced motion the lines render in place, and the magnetic button does not follow the pointer.",
    ],
  },
  "hero-gradient-mesh": {
    faq: [
      {
        q: "How does HeroGradientMesh stay dark on a light page?",
        a: "The section has the `dark` class, so every token inside it resolves to its dark value while the rest of the page stays light. The mesh is two radial gradients mixed from `--accent` and `--info`, so it follows your accent colour.",
      },
      {
        q: "Can the buttons be links?",
        a: "Not through props: they take `onPrimary` and `onSecondary` click handlers. For navigation, edit the file and give each `Button` a `render={<a href=\"/docs\" />}` (or your router's link).",
      },
    ],
    a11y: [
      "The title is an `<h1>`; the gradient layer is `aria-hidden`.",
      "Under reduced motion the headline appears without the fade and scale.",
    ],
  },
  "area-chart": {
    faq: [
      {
        q: "Does the AreaChart y-axis start at zero?",
        a: "Yes, for positive data. The scale runs from the smaller of 0 and your lowest value up to your highest, so a series that moves between 95 and 100 looks almost flat. Subtract a baseline from `data` first if the small changes are what matter.",
      },
      {
        q: "How do I add a tooltip or axes?",
        a: "AreaChart has neither; it is a static SVG for cards and KPI tiles. Use [`InteractiveAreaChart`](/docs/interactive-area-chart) for a hover tooltip and labelled x-axis, or [`LineChart`](/docs/line-chart) for several series.",
      },
      {
        q: "How do I size it, and why don't the lines get thicker when it grows?",
        a: "It fills its container: the default is `h-32 w-full`, so set height and width with `className`. The SVG stretches with `preserveAspectRatio=\"none\"`, and every stroke uses `vector-effect: non-scaling-stroke`, so the line stays 1.5px at any size.",
      },
    ],
    a11y: [
      "The SVG has `role=\"img\"` and an `aria-label` that appends a summary to `label`, such as \"Weekly revenue. 12 values, from 18 to 49, peak 52.\"",
      "Numbers in the summary are formatted with the `en-US` locale so the server and browser render the same text.",
      "The highlight dot is `aria-hidden`; the chart is not focusable and has no hover states.",
      "`tone` changes only the colour. Say what the colour means in nearby text, not only through red or green.",
    ],
  },
  "bar-chart": {
    faq: [
      {
        q: "How do I format the BarChart values as currency?",
        a: "Pass `format`, which is used in the value bubble and the screen reader summary: `format={(n) => \"$\" + (n / 1000).toFixed(1) + \"k\"}`. The default is `n.toLocaleString(\"en-US\")`, a fixed locale so the server and browser match.",
      },
      {
        q: "Why is one bar already highlighted?",
        a: "With no hover, the tallest bar is active and shows its value, so the peak reads at a glance. Hovering another bar moves the bubble and dims the rest; leaving the chart returns to the peak.",
      },
      {
        q: "Can BarChart show negative values?",
        a: "No. Bar heights are `value / max`, and every bar is at least 2% tall, so a negative value draws as a stub on the baseline. None of the kit's bar charts draw below a zero line, so show gains and losses in a [`Table`](/docs/table).",
      },
    ],
    a11y: [
      "The chart is one `role=\"img\"` element whose `aria-label` is `label` followed by every bar's label and formatted value.",
      "The x-axis labels and the bars' highlight lines are `aria-hidden`, so values are not read twice.",
      "Hover is mouse only; keyboard users get every value from the accessible name instead.",
    ],
  },
  "chart-card": {
    faq: [
      {
        q: "What goes in the `action` slot?",
        a: "Any small control for the header's end: a range [`Select`](/docs/select), a [`SegmentedControl`](/docs/segmented-control) for 7d, 30d and 90d, an export button or a link. It does not shrink; the title and description wrap beside it.",
      },
      {
        q: "Does ChartCard pass data or a size to the chart?",
        a: "No. It is a frame: a header and a `min-h-40` body. Size the chart inside with its own `className`, and put a [`ChartLegend`](/docs/chart-legend) under it in `children`.",
      },
    ],
    a11y: [
      "The card is a `<section>` labelled by its title through `aria-labelledby`, so each chart is a named region.",
      "The title is an `<h3>`; dashboards with an `<h2>` per group keep a clean outline.",
    ],
  },
  "chart-legend": {
    faq: [
      {
        q: "How do I make the legend colours match my chart?",
        a: "Pass the same values the chart uses in `color`, ideally tokens such as `\"var(--accent)\"`. Without `color`, items cycle through accent, success, warning and danger in that order.",
      },
      {
        q: "Can I click a legend item to hide a series?",
        a: "No. The legend is a static list with no buttons. For toggles, render a [`ToggleGroup`](/docs/toggle-group) and filter your series from its value.",
      },
    ],
    a11y: [
      "The legend is a `<ul>` named by `label`, which defaults to \"Legend\".",
      "Swatches are `aria-hidden`; each item's text label carries its meaning, so colour is never the only cue.",
    ],
  },
  "chart-tooltip-card": {
    faq: [
      {
        q: "Does ChartTooltipCard position itself at the pointer?",
        a: "No. It is just the card. Place it yourself, for example `absolute` inside the chart with `left` set from the hovered point and a `-translate-x-1/2`, and show it only while a point is hovered.",
      },
      {
        q: "Should I pass numbers or strings as row values?",
        a: "Strings you have already formatted, such as `\"$49,000\"`. Values are set in `tabular-nums` so digits line up between rows.",
      },
    ],
    a11y: [
      "The card has `role=\"status\"`, a polite live region, so screen readers read the new rows when the hovered point changes.",
      "Mount it once and change its content, instead of mounting a new card per hover, or the announcement may not fire.",
      "Row labels are the React keys, so keep them unique.",
    ],
  },
  "donut-chart": {
    faq: [
      {
        q: "How do I show a value that isn't a percentage?",
        a: "Pass `max`: `<DonutChart value={3.4} max={5} label=\"Storage, GB\" />` fills 68% of the ring. The centre always shows the rounded percentage, not the raw value; print the raw value next to the chart if people need it.",
      },
      {
        q: "How do I change the size or colour of the donut?",
        a: "Size it with `className`; the default is `size-24` and the SVG scales. The arc is always `var(--accent)` on a `var(--sunken)` track, so change the `stroke` in the file for another tone.",
      },
    ],
    a11y: [
      "The SVG is `role=\"img\"` with `aria-label` set to `label` and the percentage, such as \"Seats used: 68%\".",
      "Values are clamped to 0 through `max`, and a value of 0 draws no arc, not a dot.",
    ],
  },
  "funnel-steps": {
    faq: [
      {
        q: "Does FunnelSteps show conversion rates between steps?",
        a: "No. Each row shows the stage name, its count and a bar sized against the largest step. For step-to-step conversion, drop-off and a comparison period, use [`FunnelChart`](/docs/funnel-chart).",
      },
      {
        q: "How are the numbers formatted?",
        a: "With `toLocaleString(\"en-US\")`, so 12840 shows as 12,840 on the server and in every browser. To show currency or percentages, format before passing or edit the file.",
      },
    ],
    a11y: [
      "Steps are an ordered list `<ol>`, so screen readers announce the count of stages and each one's position.",
      "Each label and count is real text; the bar under it is `aria-hidden`.",
    ],
  },
  "gauge-chart": {
    faq: [
      {
        q: "How do I show a score out of something other than 100?",
        a: "Pass `max`: `<GaugeChart value={41} max={50} label=\"Seats\" />` fills 82% of the dial. The centre always shows the rounded percentage; the raw value is not printed.",
      },
      {
        q: "Can the gauge change colour when the value is high?",
        a: "Not through props: the arc is always `var(--accent)`. Copy the file and set the `stroke` from the value, for example `var(--danger)` above 90%, and say why in the label too.",
      },
      {
        q: "How is GaugeChart different from DonutChart?",
        a: "Same inputs (`value`, `max`, `label`), different shape: a half dial with the label printed under it, while [`DonutChart`](/docs/donut-chart) is a full ring with no caption. For a target marker use [`GoalRing`](/docs/goal-ring).",
      },
    ],
    a11y: [
      "The SVG is `role=\"img\"` with `aria-label` set to the label and percentage, such as \"Uptime score: 72%\".",
      "The visible caption is `aria-hidden` because the same text is already in the SVG's name.",
      "Values are clamped to 0 through `max`; a value of 0 draws no arc.",
    ],
  },
  "heatmap-cell": {
    faq: [
      {
        q: "Is the HeatmapCell colour scale linear?",
        a: "Yes. The fill is `var(--accent)` mixed into `var(--sunken)` at `intensity × 100%`, rounded to whole percents. With one outlier the rest of the grid looks empty, so bucket or log-scale your counts before you normalise them.",
      },
      {
        q: "What should the label say?",
        a: "The value and where it sits, such as \"Tue 14:00, 42 runs\". It becomes both the accessible name and the hover `title`. Without it the name is only \"Intensity 60%\", which means little out of context.",
      },
    ],
    a11y: [
      "Each cell is `role=\"img\"` with `aria-label` from `label`, or \"Intensity N%\" by default. The hover `title` is set only when you pass `label`.",
      "The fill is `color-mix` from `var(--sunken)` to `var(--accent)`, and every cell keeps a hairline border so a 0 cell is still visible.",
      "A grid of hundreds of cells means hundreds of screen reader stops. Consider hiding the grid with `aria-hidden` and giving a text summary or table next to it.",
    ],
  },
  "horizontal-bar-chart": {
    faq: [
      {
        q: "Why does HorizontalBarChart use a list instead of an SVG?",
        a: "So screen readers read every label and value as text. The `<ul>` is named by `label`; each `<li>` holds the label, an `aria-hidden` bar and the formatted value.",
      },
      {
        q: "My category names are cut off. How do I show more?",
        a: "The label column is a fixed `88px` and truncates, with the full name in a `title`. Widen it by editing `grid-cols-[88px_1fr_40px]` in the file; the value column is `40px`, so widen that too for long formatted values.",
      },
      {
        q: "Does it sort the bars?",
        a: "No, bars render in the order of `data`. Sort descending before passing for a top-N ranking.",
      },
    ],
    a11y: [
      "Each row's label and value are real text; a label cut off by the 88px column keeps its full name in `title` and in the DOM.",
      "Bar widths animate with a CSS transition, which the kit's stylesheet and `motion-reduce:transition-none` turn off under reduced motion.",
      "Negative values draw an empty bar but still print their value.",
    ],
  },
  "interactive-area-chart": {
    faq: [
      {
        q: "How do keyboard users read values in InteractiveAreaChart?",
        a: "The plot is a focusable `role=\"slider\"`. Left and Right arrows step through points, Home and End jump to the ends, and `aria-valuetext` announces the period and value, such as \"Mar: $51k\".",
      },
      {
        q: "Is the default format safe for server rendering?",
        a: "Not fully. The default `format` is `$${n.toLocaleString()}k` with no locale, so a server and a browser in different locales can print different separators and cause a hydration warning. Pass your own `format` with a fixed locale, for example `(n) => n.toLocaleString(\"en-US\")`.",
      },
      {
        q: "When does the dashed comparison line appear?",
        a: "Only when every point has a `compare` value. The change badge in the header is separate: it shows for any point whose `compare` is set and not `0`, reading \"+12.4% vs last year\" with `compareLabel` in lower case.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the plot." },
      { keys: "ArrowLeft / ArrowRight", action: "Moves the crosshair to the previous or next point." },
      { keys: "Home / End", action: "Moves the crosshair to the first or last point." },
    ],
    a11y: [
      "The plot area is `role=\"slider\"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` (the point index) and `aria-valuetext` (\"label: value\").",
      "Its name is \"label by N periods\", such as \"Revenue by 12 periods\". The SVG, the dot and the x-axis labels are `aria-hidden`.",
      "The y-axis starts at 90% of the lowest value, not at zero, so small changes are visible. Say so near the chart if it matters.",
      "The dot's movement is a 100ms CSS transition, turned off with `motion-reduce:transition-none`.",
    ],
  },
  "line-chart": {
    faq: [
      {
        q: "How do I name each line in LineChart?",
        a: "Pass `seriesLabels` in the same order as `series`. They go into the accessible name with each series' latest value (\"Total: latest 36; Expansion: latest 17\"). For sighted users, add a [`ChartLegend`](/docs/chart-legend) with `var(--chart-1)`, `var(--chart-2)` and so on as colours.",
      },
      {
        q: "Which colours does LineChart use?",
        a: "Series take `var(--chart-1)` to `var(--chart-5)` in order and repeat after five. The first series is drawn slightly thicker, so put the main metric first.",
      },
      {
        q: "Does LineChart have tooltips or axes?",
        a: "No. It is a static SVG with a dashed grid and a dot on each series' last value. For hover and keyboard scrubbing on one series, use [`InteractiveAreaChart`](/docs/interactive-area-chart).",
      },
    ],
    a11y: [
      "The SVG is `role=\"img\"`. Its `aria-label` is `label`, plus each series' name and latest value when `seriesLabels` is set. Without `seriesLabels`, screen readers hear only `label`.",
      "End-point dots are `aria-hidden`; the chart is not focusable.",
    ],
  },
  "waffle-chart": {
    faq: [
      {
        q: "Can a WaffleChart show more than 100 squares?",
        a: "It draws one square per unit of `total`, ten per row, so `total={500}` draws 50 rows. Keep `total` at 100 or less and scale your figure to it: 2,140 of 5,000 becomes `value={43}`.",
      },
      {
        q: "What happens with decimals?",
        a: "`value` is rounded to the nearest whole square and `total` is floored, so `value={42.6}` fills 43 squares. The counter above the grid shows the same rounded numbers.",
      },
    ],
    a11y: [
      "The grid is `role=\"img\"` with `aria-label` such as \"Invoices paid on time: 42 of 100\", so screen readers do not step through 100 squares.",
      "The label and the `42/100` counter above the grid are `aria-hidden`, because the grid's name already says them. Screen readers hear the figures once.",
    ],
  },
  "stacked-bar-chart": {
    faq: [
      {
        q: "How do I match values to series in StackedBarChart?",
        a: "Each stack's `values` array lines up with `seriesLabels` by index: the first value is the first series and sits at the bottom of the bar. A missing value shows as 0 in the screen reader table and draws nothing.",
      },
      {
        q: "How many series can it show?",
        a: "Two to four. Colours come from a list of four tokens, `--chart-1`, `--chart-2`, `--chart-3` and `--chart-5`, and a fifth series would reuse the first colour.",
      },
      {
        q: "Does it show values on hover?",
        a: "Each segment has a native `title`, such as \"Usage: 23\", that shows after a mouse hover delay. There is no styled tooltip and no keyboard focus.",
      },
    ],
    a11y: [
      "The chart is a `<figure>` named by `label`. A visually hidden `<table>` with a caption, column headers for each series and row headers for each period gives screen readers every value.",
      "The bars, period labels and the built-in legend are `aria-hidden`, so numbers are not read twice.",
      "Period `label` is the React key for rows, so keep periods unique.",
    ],
  },
  "radar-chart": {
    faq: [
      {
        q: "What scale do RadarChart values use?",
        a: "0 to 1 per axis, clamped, with rings at 25%, 50%, 75% and 100%. Divide scores out of 10 or 100 before passing them. A missing value counts as 0.",
      },
      {
        q: "Can I compare two shapes, like this quarter against last?",
        a: "No, it draws one polygon. Overlay two RadarCharts in a `grid` with `[grid-area:1/1]`, giving the second a different text colour such as `text-fg-subtle`, since the shape uses `currentColor`.",
      },
      {
        q: "Does the shape animate when values change?",
        a: "Yes. The path glides to the new shape on a spring of about 0.7 seconds, and it does not animate on first render. Under reduced motion it jumps straight to the new values.",
      },
    ],
    a11y: [
      "The SVG is `role=\"img\"` with an `aria-label` that lists every axis and its score as a percentage, such as \"Vendor scorecard: Uptime 92%, Speed 78%…\".",
      "Axis labels inside the SVG are `aria-hidden` because the name already includes them.",
    ],
  },
  "radial-chart": {
    faq: [
      {
        q: "How do I make a single radial progress ring?",
        a: "Pass one item: `<RadialChart title=\"Storage\" data={[{ label: \"Used\", value: 38, max: 50 }]} />`. It draws a full ring, shows the percentage in the centre with the item's label and \"38 of 50\" under it, and hides the legend.",
      },
      {
        q: "How do I let people switch between periods?",
        a: "Pass `periods`, an array of `{ label, data }`, and leave out `data`. With more than one period a [`SegmentedControl`](/docs/segmented-control) appears in the header. `data` always wins over `periods`, so set only one of them.",
      },
      {
        q: "What does the number in the middle mean?",
        a: "With several rings it is the average progress across them, labelled \"of goals\". Override it with `centerValue` and `centerLabel`, for example a revenue total. Each ring's own value and `max` go through its `format` in the legend.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the period switch, when `periods` has more than one entry." },
      { keys: "ArrowLeft / ArrowRight", action: "In the period switch, selects the previous or next period." },
    ],
    a11y: [
      "The SVG is `role=\"img\"`. Its `aria-label` is the title followed by each ring's label, percentage and \"value of max\".",
      "The centre total is `aria-hidden`, because the name already holds every value.",
      "Legend rows dim the other rings on pointer hover only; they are not focusable.",
      "Under reduced motion the rings and centre number jump straight to new values instead of sweeping and rolling.",
    ],
  },
  "pie-chart": {
    faq: [
      {
        q: "How do I format PieChart values as currency or plain numbers?",
        a: "Pass `format`. It is used in the readout, the legend, each slice's accessible name and the hidden table. The default is compact US dollars, such as \"$48.2K\", with a fixed `en-US` locale.",
      },
      {
        q: "Why did the outside labels disappear?",
        a: "Leader-line labels hide when the chart's box is under 320px wide, measured with a `ResizeObserver`; the pie then grows to fill the space and the legend drops to one column. Set `showLabels={false}` to hide them at every width.",
      },
      {
        q: "What happens with more than five PieChart slices?",
        a: "Colours come from `--chart-1` to `--chart-5` and repeat after five, so a sixth slice reuses the first colour unless you pass `color`. For more categories use a [`HorizontalBarChart`](/docs/horizontal-bar-chart).",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus into the pie. All slices share one Tab stop." },
      { keys: "ArrowRight / ArrowDown", action: "Moves focus to the next slice, pulls it out and shows its value." },
      { keys: "ArrowLeft / ArrowUp", action: "Moves focus to the previous slice." },
      { keys: "Home / End", action: "Moves focus to the first or last slice." },
    ],
    a11y: [
      "The chart is a `<figure>` labelled by its title. The SVG is `role=\"group\"`, and each slice is a focusable `role=\"img\"` named \"Label: value, share%\".",
      "Slices with a value of 0 draw nothing and are skipped by the arrow keys.",
      "A visually hidden `<table>` lists every segment's value and share with a total row; the readout, outside labels and legend are `aria-hidden`.",
      "Under reduced motion the focused slice moves out instantly instead of on a spring.",
    ],
  },
  "funnel-chart": {
    faq: [
      {
        q: "How are conversion and drop-off calculated?",
        a: "Between each pair of stages, step conversion is `value / previous value` and drop-off is `previous value - value`. The large figure in the header is overall conversion: the last stage divided by the first. Rates under 10% show one decimal.",
      },
      {
        q: "How do I compare against last month?",
        a: "Give each stage a `compare` value and set `compareLabel`. Each bar then gets a dashed outline at the comparison size, the header adds the comparison's overall rate, and the hidden table gets a column for it. Turn it off with `showCompare={false}`.",
      },
      {
        q: "Why does the legend say \"All\" when I pass my own stages?",
        a: "The legend names the main series after the selected dataset, and the default `datasets` start on \"All\". When you pass `stages` with `compare`, pass `datasets={[{ label: \"This month\", stages }]}` instead, so the legend reads your label.",
      },
      {
        q: "Does it switch to vertical on mobile?",
        a: "With the default `orientation=\"auto\"`, yes: a `ResizeObserver` lays the stages out as rows when the chart's box is under 480px wide, and as columns above that. Pass `\"horizontal\"` or `\"vertical\"` to fix the layout.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the dataset switch, when `datasets` has more than one entry and `stages` is not set." },
      { keys: "ArrowLeft / ArrowRight", action: "In the dataset switch, selects the previous or next dataset." },
    ],
    a11y: [
      "The chart is a `<figure>` labelled by its title. All bars and labels are `aria-hidden`.",
      "A visually hidden `<table>` lists each stage's value, step conversion and drop-off, the comparison column when present, and an overall conversion row.",
      "Bars spring to new sizes when the data changes; under reduced motion they jump to the new size.",
    ],
  },
  "gantt-chart": {
    faq: [
      {
        q: "Can I drag GanttChart bars to reschedule tasks?",
        a: "No. Bars are buttons, not drag handles: clicking one or pressing Enter calls `onTaskClick(task)`. Open an edit [`Dialog`](/docs/dialog) or [`Sheet`](/docs/sheet) from there and pass the updated `tasks` back in.",
      },
      {
        q: "Why is my task off by a day?",
        a: "Check `end`: it is inclusive, so a task from \"2026-11-02\" to \"2026-11-02\" is one day long. A string that starts with `YYYY-MM-DD` is read as that local calendar day, even if a time follows, so time zones do not shift it. A `Date` keeps its local calendar day.",
      },
      {
        q: "How do I avoid a hydration mismatch with the today line?",
        a: "`today` defaults to the date when the component mounts, and with no `tasks` the demo plan is built around it. In a Server Component page, pass a fixed `today` (and your own `tasks`) so the server and browser draw the same range.",
      },
      {
        q: "How do I control the Day and Week zoom?",
        a: "Uncontrolled, it starts at `defaultScale` (\"day\"). To control it, pass `scale` and update it in `onScaleChange`. Each change scrolls the timeline so today sits about a third of the way in.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the Day/Week switch (shown only when `title` is not empty), then through every task bar in order. Focusing a bar shows its tooltip." },
      { keys: "Enter / Space", action: "On a bar, calls `onTaskClick` with that task." },
      { keys: "Escape", action: "On a bar, hides the tooltip without moving focus." },
      { keys: "ArrowLeft / ArrowRight", action: "In the Day/Week switch, changes the scale." },
    ],
    a11y: [
      "Each bar is a `<button>` with a full `aria-label`, such as \"Checkout flow, Nov 10 to Nov 20, 11 days, 0% done, Engineering\".",
      "The tooltip is `role=\"tooltip\"` and repeats what the label already says, so it does not need to be announced.",
      "Dependency arrows, the today line, weekend shading and the grid are `aria-hidden`. Dependencies are not in the bar's label, so list them in your task details if they matter.",
      "Dates are formatted with the `en-US` locale.",
    ],
  },
  "sankey-chart": {
    faq: [
      {
        q: "Why do sample nodes like \"Starter\" show up next to my own data?",
        a: "`nodes` defaults to the sample node list, and every listed node is drawn even if no link uses it. When you pass your own `links`, also pass `nodes` (to set labels and colours) or `nodes={[]}`.",
      },
      {
        q: "How are SankeyChart columns decided?",
        a: "From the links alone: each node goes one column after its furthest source. With `align=\"justify\"`, nodes that have no outgoing links move to the last column, so every end state lines up on the right. Links from a node to itself and links with a value of 0 or less are dropped.",
      },
      {
        q: "Can the data contain a cycle, like users who come back?",
        a: "The layout will not hang: nodes caught in a cycle are placed one column after their placed sources. A sankey reads best without loops, so model returns as a separate node, such as \"Returned\".",
      },
      {
        q: "How do I size it?",
        a: "Set `height` in pixels (default 320); the width follows the container through a `ResizeObserver`. Labels in middle columns hide when fewer than five characters fit, but each node keeps its full spoken label.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus into the diagram. All nodes share one Tab stop." },
      { keys: "ArrowRight / ArrowDown", action: "Moves focus to the next node and highlights its flows." },
      { keys: "ArrowLeft / ArrowUp", action: "Moves focus to the previous node." },
      { keys: "Home / End", action: "Moves focus to the first or last node." },
    ],
    a11y: [
      "The chart is a `<figure>` labelled by its title; the SVG is `role=\"group\"` named with the node and flow counts.",
      "Each node is a focusable `role=\"img\"` whose label reads its total and every flow in and out, such as \"Signed up: 3,480 visitors. From Organic search 1,400, … To Starter 1,640, …\". `unit` supplies the word \"visitors\".",
      "A visually hidden `<table>` lists every flow with From, To and Value columns; the ribbons are `aria-hidden`.",
      "Highlighting is an opacity change on a 140ms CSS transition, which the kit's stylesheet cuts under reduced motion.",
    ],
  },
  "treemap-chart": {
    faq: [
      {
        q: "Can TreemapChart nest more than one level deep?",
        a: "No. A top-level item is either a leaf (`{ label, value }`) or a group with `children` leaves, and groups get a header strip when there is room. For deeper data, flatten it to two levels or let people pick a group and pass only its children.",
      },
      {
        q: "How are cell colours chosen?",
        a: "Each top-level item takes the next chart token, `--chart-1` to `--chart-5`, unless you set `color`. Leaves inherit their group's colour at a strength set by their rank in the group, so the largest child is the strongest. A leaf's own `color` overrides that.",
      },
      {
        q: "Does clicking a cell drill down?",
        a: "No. Cells respond to hover and focus with a tooltip; there is no click handler. Treat it as a read-only chart and put drill-down links in a table next to it.",
      },
      {
        q: "Why are some cells unlabelled?",
        a: "Labels hide in cells narrower than `minLabelSize` (default 44px) or shorter than 26px, and the value line needs 44px of height, so text never overflows. Hover or focus the cell to see its tooltip; screen readers always get the full label.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus into the treemap. All cells share one Tab stop." },
      { keys: "ArrowRight / ArrowDown", action: "Moves focus to the next cell and shows its tooltip." },
      { keys: "ArrowLeft / ArrowUp", action: "Moves focus to the previous cell." },
      { keys: "Home / End", action: "Moves focus to the first or last cell." },
    ],
    a11y: [
      "The chart is a `<figure>` labelled by its title; the SVG is `role=\"group\"` named with the cell count.",
      "Each cell is a focusable `role=\"img\"` named with its group, item, formatted value and share of the total, in that order.",
      "The tooltip and in-cell text are `aria-hidden` because the cell's name carries the same numbers.",
      "A visually hidden `<table>` lists group, item, value and share for every cell, with a total row.",
    ],
  },
}
