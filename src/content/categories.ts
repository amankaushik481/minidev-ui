import type { CategoryId, Faq } from "./types"

export type Category = {
  id: CategoryId
  /** Short label for chips and nav. */
  label: string
  /** The page H1: the phrase people search. */
  h1: string
  /** <title>, before the site suffix. Under 55 characters. */
  title: string
  /** Meta description, 140-160 characters. */
  description: string
  /** Two short paragraphs of real guidance, shown above the grid. */
  intro: [string, string]
  faq: Faq[]
  related: CategoryId[]
  /** Gallery pages that show these components wired up. */
  galleries: string[]
  /** A guide that goes deeper, if one exists. */
  guide?: string
}

export const CATEGORIES: Category[] = [
  {
    id: "forms",
    label: "Forms",
    h1: "React form components",
    title: "React Form Components for Tailwind CSS",
    description: "Free React form components for Tailwind CSS v4: inputs, selects, comboboxes, OTP, date and currency fields, with labels, errors and dark mode built in.",
    intro: [
      "Every field here ships with its label, hint and error states wired, so a form reads the same from the first input to the last. They are built on Base UI where a primitive exists, which means keyboard, focus and screen reader behavior come for free.",
      "Install one field or the whole set. Each file uses semantic tokens, so the same input looks right in light, dark and every material without a single override.",
    ],
    faq: [
      { q: "Do these form components work with React Hook Form?", a: "Yes. Inputs forward refs and accept the standard `value`, `onChange` and `name` props, so they register with React Hook Form, Conform or plain controlled state." },
      { q: "Are the inputs accessible?", a: "Labels are connected with `htmlFor` and `aria-describedby` for hints and errors, focus rings are always visible, and composite widgets like combobox and select use Base UI primitives for keyboard support." },
      { q: "Can I use them with shadcn/ui?", a: "Yes. They install with the shadcn CLI from a URL and use the same `@/components/ui` layout, so they sit next to your existing shadcn components." },
    ],
    related: ["buttons", "auth", "settings"],
    galleries: ["input", "input-affix", "select", "combobox", "form-field", "otp-input", "date-picker", "textarea", "tags-input", "checkbox", "radio-group", "switch", "slider", "color-picker"],
  },
  {
    id: "buttons",
    label: "Buttons",
    h1: "React button components",
    title: "React Button Components for Tailwind CSS",
    description: "Free React button components for Tailwind CSS: primary, accent, outline and ghost variants, icon buttons, split buttons, button groups, toggles and copy buttons.",
    intro: [
      "A button system is mostly restraint: one primary action per view, a quiet secondary, and a ghost for everything else. These variants are tuned so that hierarchy is obvious at a glance, with press states, loading states and focus rings that never disappear.",
      "Icon buttons carry their accessible label, split buttons keep the menu reachable by keyboard, and every variant reads the same design tokens, so a theme change restyles all of them at once.",
    ],
    faq: [
      { q: "How do I render a button as a link?", a: "Pass `render={<a href=\"/pricing\" />}` or a Next.js `Link`. The button keeps its styles and the element becomes a real anchor, which is better for SEO and middle click." },
      { q: "How do I show a loading state on a button?", a: "Disable the button and place the spinner component before the label. Keep the label text so the width stays stable while the action runs." },
      { q: "Which variant should my main call to action use?", a: "Use the default ink variant for the one action that matters on a screen, and the accent variant sparingly for brand moments such as a hero CTA." },
    ],
    related: ["forms", "overlays", "animation"],
    galleries: ["button", "icon-button", "split-button", "button-group", "segmented-control"],
  },
  {
    id: "data-tables",
    label: "Tables",
    h1: "React data table components",
    title: "React Data Table Components for Tailwind",
    description: "Free React data table components: sortable headers, row selection, bulk actions, inline edit, column visibility, filters, pagination and loading states.",
    intro: [
      "Tables are where products spend most of their time, so these pieces cover the parts that usually get skipped: empty and loading rows, sticky columns, bulk action bars, saved views and density controls.",
      "They are composable rather than one giant grid. Use the full data table block when you want everything, or take only the sortable header and pagination and keep your own data layer.",
    ],
    faq: [
      { q: "Does the data table work with TanStack Table?", a: "Yes. The components are presentational, so you can drive sorting, filtering and pagination from TanStack Table and render with these parts." },
      { q: "Can it handle thousands of rows?", a: "Use the virtualized list component or paginate on the server. Rendering thousands of DOM rows at once is slow in any library." },
      { q: "Is there a mobile layout?", a: "Tables scroll horizontally with a sticky first column on small screens, and expandable rows let you move secondary data into a detail panel." },
    ],
    related: ["dashboard", "settings", "charts"],
    galleries: ["data-table", "data-extra", "admin"],
  },
  {
    id: "charts",
    label: "Charts",
    h1: "React chart components",
    title: "React Chart Components for Dashboards",
    description: "Free React chart components drawn in SVG: area, line, bar, stacked, donut, gauge, radar, funnel and heatmap charts with legends, tooltips and dark mode.",
    intro: [
      "These charts are plain SVG with no charting library underneath, which keeps them small and easy to restyle. Colors come from the accent and status tokens, so a chart always matches the rest of the product.",
      "Each chart handles the details that make dashboards readable: tabular numbers, quiet gridlines, clear legends, and tooltip cards that match the rest of the interface.",
    ],
    faq: [
      { q: "Do I need Recharts or Chart.js?", a: "No. The charts render SVG directly from your data array. If you need zooming or very large datasets, you can still pair the chart card with a dedicated library." },
      { q: "Are the charts responsive?", a: "Yes. They scale to their container and keep stroke widths and labels crisp at any size." },
      { q: "Can I change the chart colors?", a: "Charts read `--accent`, `--accent-2` and the status tokens. Change those tokens and every chart follows." },
    ],
    related: ["dashboard", "data-tables", "developer-tools"],
    galleries: ["charts", "stats"],
  },
  {
    id: "navigation",
    label: "Navigation",
    h1: "React navigation components",
    title: "React Navigation Components: Sidebar, Tabs, Menus",
    description: "Free React navigation components for Tailwind: sidebars, top bars, tabs, breadcrumbs, command palettes, pagination, mega menus and mobile drawers.",
    intro: [
      "Navigation should disappear into the work. These components keep the current location obvious, stay usable from the keyboard, and collapse gracefully on small screens without a second implementation.",
      "Pick a collapsible sidebar for apps, a marketing nav for sites, and add the command palette so power users can jump anywhere with a shortcut.",
    ],
    faq: [
      { q: "Does the sidebar collapse?", a: "Yes. The collapsible sidebar folds down to an icon rail with a labeled toggle, and the mobile nav drawer covers small screens." },
      { q: "How do I add a Cmd+K command palette?", a: "Install the command palette component and open it from a keyboard listener. It filters as you type and supports grouped results and shortcuts." },
      { q: "Do the links work with the Next.js router?", a: "Yes. Items accept an href or a `render` prop, so you can pass `next/link` and keep client side navigation." },
    ],
    related: ["layout", "overlays", "dashboard"],
    galleries: ["navigation", "tabs", "shells"],
  },
  {
    id: "overlays",
    label: "Overlays",
    h1: "React dialog, drawer and popover components",
    title: "React Dialog, Drawer and Popover Components",
    description: "Free React overlay components: dialog, alert dialog, drawer, sheet, popover, dropdown menu, context menu and hover card with focus trapping and escape handling.",
    intro: [
      "Overlays are where accessibility usually breaks, so these are built on Base UI primitives: focus moves in and returns on close, escape and outside clicks work, and background content is inert.",
      "They share one elevation and motion language, so a dropdown, a dialog and a sheet feel like parts of the same product rather than three separate libraries.",
    ],
    faq: [
      { q: "What is the difference between a dialog and an alert dialog?", a: "An alert dialog is for confirmations the user must answer, so it cannot be dismissed by clicking outside. A regular dialog can be dismissed freely." },
      { q: "Do overlays work inside other overlays?", a: "Yes. Menus inside dialogs and nested popovers stack correctly and close in the right order." },
      { q: "How do I make a bottom sheet on mobile?", a: "Use the drawer or sheet component with the bottom side. It keeps the same focus handling as the dialog." },
    ],
    related: ["navigation", "feedback", "buttons"],
    galleries: ["overlays", "dropdown-menu"],
  },
  {
    id: "feedback",
    label: "Feedback",
    h1: "React alerts, toasts and empty states",
    title: "React Alert, Toast and Empty State Components",
    description: "Free React feedback components: toasts, alerts, banners, callouts, progress, skeletons, spinners, and empty, error and offline states for real products.",
    intro: [
      "Products spend a surprising amount of time empty, loading or broken. These components give those moments the same care as the happy path: skeletons that match the real layout, empty states that point to the next action, and errors that say what happened.",
      "Toasts and banners use status tokens at equal visual weight, so success never shouts and warnings stay readable in dark mode.",
    ],
    faq: [
      { q: "How do I show a toast?", a: "Install the toast component, mount the `Toaster` once near the root, and call it from anywhere with a title, description and optional action." },
      { q: "Should I use a skeleton or a spinner?", a: "Use a skeleton when you know the shape of the content that is coming, and a spinner for short actions like saving a form." },
      { q: "Are status colors accessible?", a: "Status text meets contrast on its tinted background in light and dark, and every status pairs color with an icon or label so it never relies on color alone." },
    ],
    related: ["overlays", "dashboard", "layout"],
    galleries: ["feedback", "system"],
  },
  {
    id: "ai-chat",
    label: "AI chat",
    h1: "AI chat UI components for React",
    title: "AI Chat UI Components for React",
    description: "Free AI chat UI components for React: message threads, streaming text, prompt input with attachments, tool calls, reasoning blocks, citations and model picker.",
    intro: [
      "Building an AI product means building a lot of interface that did not exist a few years ago: streaming messages, tool calls that can be expanded, reasoning that can be hidden, citations, token usage and a composer that takes files.",
      "These components are provider agnostic. They render state you pass in, so they work with any model API or SDK, and the ai-chat guide shows how to wire them to a streaming response.",
    ],
    faq: [
      { q: "Do these work with the Vercel AI SDK or OpenAI?", a: "Yes. They are presentational components, so you pass messages and streaming state from whichever SDK or fetch call you use." },
      { q: "How do I stream a response into the UI?", a: "Read the response body with a stream reader and append each chunk to the last message. The streaming message component shows a caret while text arrives." },
      { q: "Can I show tool calls and reasoning?", a: "Yes. Tool call cards show arguments, status and results, and the reasoning block collapses long thinking by default." },
    ],
    related: ["forms", "developer-tools", "feedback"],
    galleries: ["ai", "ai-studio"],
    guide: "ai-chat-ui-react",
  },
  {
    id: "auth",
    label: "Auth",
    h1: "React login and signup components",
    title: "React Login, Signup and 2FA Components",
    description: "Free React authentication components: sign in and sign up forms, magic link, social login, SSO, password reset, OTP and two factor setup screens.",
    intro: [
      "Authentication is the first screen most users see, so it should be fast and calm. These screens cover the full journey: sign in, sign up, magic link, social providers, SSO, password reset and two factor verification.",
      "They are UI only and work with any auth provider. Wire the submit handlers to Auth.js, Clerk, Supabase, Better Auth or your own API.",
    ],
    faq: [
      { q: "Which auth provider do these use?", a: "None. They are UI components that call your handlers, so you can connect any provider or your own backend." },
      { q: "Is there a one time code input?", a: "Yes. The OTP input handles paste, auto advance, backspace across cells and numeric keyboards on mobile." },
      { q: "Can I add Google and GitHub login buttons?", a: "Yes. The social auth row renders provider buttons with icons and consistent sizing." },
    ],
    related: ["forms", "settings", "email"],
    galleries: ["auth", "otp-input"],
  },
  {
    id: "billing",
    label: "Billing",
    h1: "React pricing and billing components",
    title: "React Pricing Table and Billing Components",
    description: "Free React pricing and billing components: pricing tables, monthly and yearly toggles, plan cards, checkout, invoices, payment methods, usage meters and cancel flows.",
    intro: [
      "Pricing and billing screens have a direct line to revenue, so they are worth getting right. This set covers the public pricing page and everything after it: plan changes, invoices, payment methods, credits, usage and a respectful cancel flow.",
      "Every component is UI only, so it works with Stripe, Paddle, Lemon Squeezy or your own billing API. The pricing guide shows a full page built from these parts.",
    ],
    faq: [
      { q: "Does the pricing table support monthly and yearly billing?", a: "Yes. Pair it with the pricing toggle, and the price can animate between values when the period changes." },
      { q: "Do these connect to Stripe?", a: "They render data you pass in, so you can load plans, invoices and payment methods from Stripe and render them with these components." },
      { q: "How do I highlight the recommended plan?", a: "Mark one plan as highlighted. It gets a stronger border, a badge and the primary button, which draws the eye without shouting." },
    ],
    related: ["marketing", "settings", "ecommerce"],
    galleries: ["billing"],
    guide: "react-pricing-page",
  },
  {
    id: "settings",
    label: "Settings",
    h1: "React settings page components",
    title: "React Settings Page and Admin Components",
    description: "Free React settings components: profile forms, team members, roles and permissions, API keys, integrations, SSO, audit logs and danger zones for SaaS apps.",
    intro: [
      "Settings pages grow with a product, so they need a structure that stays tidy. These components cover account, team, security and developer settings with consistent section headers and save patterns.",
      "Destructive actions sit in a clearly marked danger zone with typed confirmation, and permission screens show what each role can do in a readable matrix.",
    ],
    faq: [
      { q: "Is there a full settings page layout?", a: "Yes. The settings layout gives you a side navigation and content column, and the settings page block shows a complete example." },
      { q: "How should I handle deleting an account?", a: "Use the danger zone with the delete account confirm component, which asks the user to type a phrase before the action is enabled." },
      { q: "Can I show API keys safely?", a: "The API key list and secret reveal components mask keys by default and let users copy without exposing the full value on screen." },
    ],
    related: ["forms", "data-tables", "auth"],
    galleries: ["settings", "admin"],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    h1: "React dashboard components",
    title: "React Dashboard Components and Templates",
    description: "Free React dashboard components for Tailwind: KPI cards, stat sparklines, activity feeds, goal rings, onboarding checklists and complete dashboard page blocks.",
    intro: [
      "A good dashboard answers one question quickly: is everything fine, and if not, where do I look. These components put numbers first with tabular figures, honest deltas and small charts that show direction without decoration.",
      "Start from a dashboard page block for the whole layout, or compose KPI rows, chart cards and activity feeds into your own. The SaaS dashboard guide walks through a full build in Next.js.",
    ],
    faq: [
      { q: "Is there a complete dashboard template?", a: "Yes. The dashboard home and admin overview blocks are full pages, and the Lumen and Atlas templates show dashboards inside real product stories." },
      { q: "Do the KPI cards show trends?", a: "Yes. Stat cards and sparklines show the value, the change and a small trend line, with colors that can be inverted for metrics where down is good." },
      { q: "Does it work with Next.js App Router?", a: "Yes. Components are client friendly and the blocks drop into a Next.js page or layout." },
    ],
    related: ["charts", "data-tables", "navigation"],
    galleries: ["stats", "admin", "shells", "feeds"],
    guide: "nextjs-saas-dashboard",
  },
  {
    id: "marketing",
    label: "Landing pages",
    h1: "Landing page sections for React and Tailwind",
    title: "Landing Page Sections and Blocks for React",
    description: "Free landing page sections for React and Tailwind: heroes, feature grids, bento layouts, testimonials, logo clouds, pricing, FAQ, CTA bands and footers.",
    intro: [
      "These are the sections a landing page is made of, drawn to the same standard as the product components. Stack a hero, a feature bento, proof, pricing, FAQ and a closing call to action and you have a complete page.",
      "Each section installs as one file with its dependencies. The eight templates on this site are built from the same parts, so you can see how they combine before you copy them.",
    ],
    faq: [
      { q: "Can I build a whole landing page from these blocks?", a: "Yes. Install the sections you need and stack them in a page. The Next.js landing page guide shows the order and the copy that works." },
      { q: "Are the sections responsive?", a: "Yes. Every section is designed for mobile first and tested at phone, tablet and desktop widths." },
      { q: "Can I download a full template?", a: "Templates are live demos made from these blocks plus custom product UI. The blocks are free to install, and MiniDev can build the full template for your product." },
    ],
    related: ["animation", "billing", "email"],
    galleries: ["marketing", "marketing-sections", "blocks", "premium-heroes"],
    guide: "nextjs-landing-page",
  },
  {
    id: "animation",
    label: "Motion",
    h1: "Animated React components",
    title: "Animated React Components with Motion",
    description: "Free animated React components built with Motion: marquees, split-flap boards, number rolls, tilt cards, text effects, spotlight panels and scroll reveals.",
    intro: [
      "Motion should explain something: where an element came from, what changed, what to look at next. These components use Motion with spring physics and short durations, and every one respects reduced motion settings.",
      "Several are driven by the shared light source, so shadows, sheens and highlights move together across the page rather than each effect doing its own thing.",
    ],
    faq: [
      { q: "Which animation library do these use?", a: "They use Motion (the successor to Framer Motion) where physics or gestures are needed, and plain CSS where a transition is enough." },
      { q: "Do animations respect reduced motion?", a: "Yes. Every component checks `prefers-reduced-motion` and falls back to a static or instant version." },
      { q: "Will animations hurt performance?", a: "They animate transform and opacity, pause when off screen where it matters, and avoid layout thrashing." },
    ],
    related: ["marketing", "buttons", "media"],
    galleries: ["premium-motion", "premium-heroes", "showcase"],
    guide: "react-split-flap-display",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    h1: "React e-commerce components",
    title: "React E-commerce Components: Cart, Checkout",
    description: "Free React e-commerce components: product cards, cart line items, quantity steppers, coupon inputs, shipping address, order summary and checkout blocks.",
    intro: [
      "Commerce UI lives or dies on clarity: what you are buying, what it costs, and what happens next. These components keep totals visible, errors inline and the next step obvious.",
      "They pair with any cart or payment backend, from Shopify storefront APIs to Stripe Checkout, because they only render the state you pass in.",
    ],
    faq: [
      { q: "Is there a full checkout page?", a: "Yes. The commerce checkout block combines address, shipping, payment and order summary into one page." },
      { q: "Do these work with Shopify or Stripe?", a: "Yes. They are UI components, so you load cart and product data from your backend and render it with them." },
      { q: "Is there an example store?", a: "The Hale template shows a product page with color and size pickers and a swipe to close cart." },
    ],
    related: ["billing", "forms", "marketing"],
    galleries: ["commerce"],
  },
  {
    id: "developer-tools",
    label: "Dev tools",
    h1: "Developer tool UI components for React",
    title: "Developer Tool UI Components for React",
    description: "Free React components for developer tools: code blocks, terminals, diffs, logs, stack traces, JSON viewers, CI pipelines, API keys, webhooks and status pages.",
    intro: [
      "Developer products need interface that most kits skip: syntax highlighted code, diffs, logs that stream, stack traces, build pipelines and environment badges. These components are drawn with the same care as the rest of the kit.",
      "Monospace data uses Geist Mono with tabular figures, and long output scrolls inside its own frame so pages stay stable.",
    ],
    faq: [
      { q: "Does the code block have syntax highlighting and copy?", a: "Yes. It highlights common languages, shows line numbers and filenames, and has a copy button." },
      { q: "Is there a terminal component?", a: "Yes. The terminal window and console output components render commands and streaming output in a window frame." },
      { q: "Can I build a status page?", a: "Yes. The status page block uses uptime bars, incident banners and health indicators." },
    ],
    related: ["ai-chat", "data-tables", "settings"],
    galleries: ["engineering", "editors"],
  },
  {
    id: "email",
    label: "Email",
    h1: "React email templates",
    title: "React Email Templates and Components",
    description: "Free React email components: layout, header, footer, buttons and complete welcome and receipt emails, designed to match your product UI.",
    intro: [
      "Transactional email is part of the product, so it should look like it. These components share the kit's type and color decisions in a layout that suits email clients.",
      "Use them as the design for your templates with React Email or your email provider, and keep sign up, receipts and alerts consistent with the app.",
    ],
    faq: [
      { q: "Do these work with React Email?", a: "They share its approach of composing emails from React components. Check each component against your target clients, since email CSS support varies." },
      { q: "Is there a receipt template?", a: "Yes. The email receipt component shows line items, totals and payment details." },
      { q: "Can I preview emails in the browser?", a: "The email preview frame renders a template inside a client style frame for review." },
    ],
    related: ["marketing", "auth", "billing"],
    galleries: ["email"],
  },
  {
    id: "layout",
    label: "Layout",
    h1: "React layout components",
    title: "React Layout Components: Cards, Stacks, Grids",
    description: "Free React layout primitives for Tailwind: cards, containers, stacks, clusters, grids, accordions, resizable panels, split panes and app shells.",
    intro: [
      "Layout primitives keep spacing consistent without memorizing class strings. Stack, cluster, center and container encode the common patterns, and cards and panels carry the elevation system.",
      "For full apps, the app shell and resizable panels give you the frame, and the rest of the kit fills it.",
    ],
    faq: [
      { q: "Why use layout components instead of Tailwind classes?", a: "They encode spacing and alignment decisions once, so pages stay consistent and refactors touch one file." },
      { q: "Are there resizable panels?", a: "Yes. Resizable panels and split pane support drag and keyboard resizing." },
      { q: "Does the card support materials?", a: "Yes. Surfaces read the material tokens, so a card follows the page material: hairline, glass, metal or paper." },
    ],
    related: ["navigation", "dashboard", "feedback"],
    galleries: ["layout", "primitives-extra", "shells"],
  },
  {
    id: "media",
    label: "Media",
    h1: "React media and upload components",
    title: "React File Upload, Image and Video Components",
    description: "Free React media components: file dropzone, image upload, galleries, lightbox, carousel, avatars, audio player and video player chrome.",
    intro: [
      "Media components handle the fiddly parts: drag and drop with clear states, previews while files upload, galleries that open into a lightbox and players with proper controls.",
      "They are UI only, so you can upload to S3, UploadThing, Cloudinary or your own endpoint.",
    ],
    faq: [
      { q: "Does the dropzone support multiple files?", a: "Yes. It accepts multiple files, filters by type with the accept prop, and lists each file with progress, error and retry states." },
      { q: "Is there an image lightbox?", a: "Yes. Pair the image gallery with the image lightbox component to open any image full size." },
      { q: "Where do the files get uploaded?", a: "Wherever you choose. The components call your upload handler and render progress you report back." },
    ],
    related: ["forms", "animation", "marketing"],
    galleries: ["file-dropzone"],
  },
  {
    id: "workflow",
    label: "Workflow",
    h1: "React kanban, timeline and workflow components",
    title: "React Kanban, Timeline and Workflow Components",
    description: "Free React workflow components: kanban boards, issue cards, timelines, steppers, approvals, comment threads, assignees, due dates and priority pickers.",
    intro: [
      "Workflow tools are dense, so these components stay legible at small sizes: issue cards with keys and priorities, kanban columns with counts, timelines and steppers that show where things stand.",
      "Approvals, comments and assignees share one set of avatars and chips, so a project tool built from them feels coherent from the board to the detail view.",
    ],
    faq: [
      { q: "Does the kanban board support drag and drop?", a: "The board renders columns and cards. Add drag and drop with dnd kit or pragmatic drag and drop and keep these components for the visuals." },
      { q: "Is there a multi step form stepper?", a: "Yes. The stepper and step progress components show the current step, and the onboarding wizard block shows a full flow." },
      { q: "Can I show live collaborators?", a: "Yes. The live cursors bar and presence dots show who is viewing." },
    ],
    related: ["data-tables", "dashboard", "navigation"],
    galleries: ["workflow", "feeds"],
  },
]

export const categoryById = (id: string) => CATEGORIES.find((c) => c.id === id)
