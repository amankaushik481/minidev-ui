import type { ComponentSeo } from "../types"

export const PART_1: Record<string, ComponentSeo> = {
  "facet-filter": {
    description: "A titled checkbox facet group for sidebar search filters in React. Each option can show a result count, and the selected values come back as an array.",
    category: "forms",
    keywords: ["react facet filter", "checkbox filter group", "faceted search sidebar", "tailwind filter checkboxes"],
  },
  "faq-list": {
    description: "An FAQ section built on an accessible accordion. Pass question and answer pairs and each one expands in place, with keyboard support and a readable max width.",
    category: "marketing",
    keywords: ["react faq accordion", "tailwind faq section", "shadcn faq component"],
  },
  "feature-flag-toggle": {
    description: "A settings row for flipping a feature flag on or off: flag name, optional description and a labeled switch, wired as a controlled React component.",
    category: "settings",
    keywords: ["feature flag toggle ui", "react settings switch row", "admin feature toggle"],
  },
  "feature-grid": {
    description: "A responsive grid of feature cards, one to three columns wide, each with an optional icon, a title and a short description. Built with React and Tailwind.",
    category: "marketing",
    keywords: ["tailwind feature grid", "react features section", "landing page feature cards"],
  },
  "feedback-thumbs": {
    description: "Thumbs up and thumbs down buttons for rating an answer or article. Uses aria-pressed, toggles off on a second click, and works controlled or uncontrolled.",
    category: "ai-chat",
    keywords: ["thumbs up down feedback react", "ai response rating buttons", "helpful not helpful widget"],
  },
  "file-dropzone": {
    description: "A React drag and drop upload zone with accept and reject states, type and size checks, image previews, per file progress, retry and screen reader updates.",
    category: "forms",
    keywords: ["react file dropzone", "drag and drop file upload", "tailwind upload progress", "shadcn file upload"],
  },
  "file-list": {
    description: "A stacked list of file rows showing each name and metadata such as size or date, with an optional download button per item. Good for React attachment lists.",
    category: "media",
    keywords: ["react file list", "attachment list component", "download file list ui"],
  },
  "file-reference": {
    description: "A compact card that cites a source file with its name, monospace path and line range. Useful for code assistants, docs and AI answers that point into a repo.",
    category: "developer-tools",
    keywords: ["file reference card", "code citation component", "ai source file chip"],
  },
  "file-row": {
    description: "A single file row with an icon, a truncated name, an optional meta line and a ghost download button with an accessible label. Styled with Tailwind.",
    category: "media",
    keywords: ["file row component", "react attachment item", "download file button row"],
  },
  "filter-bar": {
    description: "A wrapping Tailwind toolbar for tables and lists: a search input first, your own filter controls as children, and a Clear button when onClear is set.",
    category: "data-tables",
    keywords: ["react table filter bar", "data table toolbar", "tailwind filter toolbar"],
  },
  "floating-action-button": {
    description: "A round primary button fixed to the bottom right corner of the viewport for the main action on a screen. Accepts every Button prop, including icons.",
    category: "buttons",
    keywords: ["react floating action button", "tailwind fab button", "fixed bottom right button"],
  },
  "footer-mega": {
    description: "A multi column site footer with a brand block and titled link groups that reflow from one to five columns. A React and Tailwind footer for marketing sites.",
    category: "marketing",
    keywords: ["tailwind mega footer", "react footer with columns", "website footer links"],
  },
  "footer-nav": {
    description: "A slim one line footer with the brand name on the left and a wrapping set of links in a labeled nav element. Fits app shells, docs and small landing pages.",
    category: "navigation",
    keywords: ["simple footer react", "tailwind footer nav", "minimal site footer"],
  },
  "forgot-password-form": {
    description: "A password reset request card with one email field and a full width Send reset email button, composed from AuthCard, FormField and Input in React.",
    category: "auth",
    keywords: ["forgot password form react", "reset password page tailwind", "shadcn forgot password"],
  },
  "form-field": {
    description: "A wrapper that pairs any input with its label, required marker, help text and an error message announced with role alert. Keeps React forms consistent.",
    category: "forms",
    keywords: ["react form field", "shadcn form item", "input label error message", "tailwind form field"],
  },
  "funnel-steps": {
    description: "A conversion funnel drawn as labeled horizontal bars scaled to the largest step, with formatted counts per stage. Suited to signup and checkout analytics.",
    category: "charts",
    keywords: ["react funnel chart", "conversion funnel component", "tailwind funnel bars"],
  },
  "gantt-row": {
    description: "One row of a Gantt timeline: a task label beside a track with a bar placed by start and end values on a shared scale. Stack rows to build a React roadmap.",
    category: "workflow",
    keywords: ["react gantt chart row", "timeline bar component", "simple gantt tailwind"],
  },
  "gauge-chart": {
    description: "A semicircle SVG gauge that fills to a value against a max and prints the percentage in the center. Exposed as an image with an accessible label for dashboards.",
    category: "charts",
    keywords: ["react gauge chart", "svg semicircle gauge", "tailwind gauge meter"],
  },
  "goal-ring": {
    description: "A circular progress ring that shows how far along a goal is, with the percentage in the middle and a caption below. Handy for fitness, sales or weekly targets.",
    category: "dashboard",
    keywords: ["goal progress ring", "react circular progress", "activity ring component"],
  },
  "heading": {
    description: "A heading primitive that renders h1 through h6 with a matched type scale, tuned letter spacing and medium weight. Pick the level with the as prop in React.",
    category: "layout",
    keywords: ["react heading component", "typography heading tailwind", "shadcn typography h1"],
  },
  "health-indicator": {
    description: "A status dot and label for service health with operational, degraded and down states mapped to success, warning and danger colors. Made for status pages.",
    category: "feedback",
    keywords: ["service health indicator", "system status dot react", "uptime status component"],
  },
  "heatmap-cell": {
    description: "A square heatmap cell whose fill blends from a muted base to the accent color by an intensity from 0 to 1, with an aria label. Tile it for activity grids.",
    category: "charts",
    keywords: ["react heatmap cell", "contribution graph square", "activity heatmap tailwind"],
  },
  "hero": {
    description: "A centered landing page hero with an optional eyebrow, a large headline, supporting copy and up to two call to action buttons. A plain Tailwind starting point.",
    category: "marketing",
    keywords: ["tailwind hero section", "react landing page hero", "hero with cta buttons"],
  },
  "horizontal-bar-chart": {
    description: "A lightweight horizontal bar chart where each row shows a label, a rounded bar scaled to the largest value and the number. No chart library, just Tailwind.",
    category: "charts",
    keywords: ["react horizontal bar chart", "tailwind bar chart no library", "simple bar chart component"],
  },
  "hover-card": {
    description: "A card that appears below a trigger on mouse hover to preview extra detail such as a user profile or link summary. A light take on the shadcn hover card.",
    category: "overlays",
    keywords: ["shadcn hover card", "react hover card", "hover preview popup"],
  },
  "icon-button": {
    description: "A square React button for icon only actions in small, default and large sizes with every Button variant. Its aria-label prop is required, so it is always named.",
    category: "buttons",
    keywords: ["react icon button", "shadcn icon button", "accessible icon only button"],
  },
  "image-gallery": {
    description: "A responsive photo grid of square tiles, two columns on mobile and three on larger screens, each image cropped to fill. Built with React and Tailwind.",
    category: "media",
    keywords: ["react image gallery grid", "tailwind photo grid", "square image gallery"],
  },
  "image-lightbox": {
    description: "A clickable image thumbnail that opens a full screen modal of the picture with a dimmed backdrop and a close button. Handy for screenshots and product shots.",
    category: "media",
    keywords: ["react image lightbox", "image zoom modal", "tailwind lightbox"],
  },
  "image-upload": {
    description: "A single image picker that starts as a drag and drop zone, then swaps to a large preview with a remove button. Returns an object URL and the File in React.",
    category: "forms",
    keywords: ["react image upload preview", "avatar image uploader", "drag and drop image upload"],
  },
  "impersonation-banner": {
    description: "A top of page bar telling support staff which user account they are viewing as, with an Exit button to end the session. Common in admin and support tools.",
    category: "dashboard",
    keywords: ["impersonation banner", "view as user admin banner", "support login as user ui"],
  },
  "incident-banner": {
    description: "A full width Tailwind status bar announcing an outage with minor, major and critical severity colors, the incident title and a link to your status page.",
    category: "feedback",
    keywords: ["incident banner react", "outage notification bar", "status page banner"],
  },
  "inline-alert": {
    description: "An inline React message box in neutral, success, warning and danger tones with a matching icon, an optional title and body text. Announced with role alert.",
    category: "feedback",
    keywords: ["shadcn alert", "react inline alert", "tailwind alert box", "error message component"],
  },
  "inline-cell-edit": {
    description: "Click to edit table cell text: the value turns into an input on click, saves on Enter or blur and cancels on Escape. Built for editable React data grids.",
    category: "data-tables",
    keywords: ["react inline edit cell", "editable table cell", "click to edit text"],
  },
  "inline-code-diff": {
    description: "A two line code diff showing the removed line in red with a minus and the added line in green with a plus, in monospace. Suits AI edit suggestions.",
    category: "developer-tools",
    keywords: ["react code diff", "inline diff component", "before after code change"],
  },
  "input-affix": {
    description: "A text input with leading and trailing slots for icons, units or buttons, sharing one focus ring and invalid state across the field. Tailwind styled.",
    category: "forms",
    keywords: ["input with icon react", "tailwind input prefix suffix", "shadcn input addon"],
  },
  "input": {
    description: "The base text input with sm, default and lg sizes and designed hover, focus, disabled, read only and invalid states. A drop in shadcn style input for React.",
    category: "forms",
    keywords: ["shadcn input", "react text input", "tailwind input component"],
  },
  "inset": {
    description: "A recessed panel with a sunken background, rounded border and responsive padding for grouping secondary content, code samples or previews inside a card or page.",
    category: "layout",
    keywords: ["inset panel component", "tailwind sunken container", "react content well"],
  },
  "integration-card": {
    description: "An app integration tile with the service name, a short description, a Connected or Available badge and a Connect or Manage button. Built in React.",
    category: "settings",
    keywords: ["integration card react", "app integrations page", "connect app card tailwind"],
  },
  "interactive-area-chart": {
    description: "A React SVG area chart with a crosshair that follows the pointer or arrow keys, showing the value and percent change against a dashed comparison line.",
    category: "charts",
    keywords: ["react area chart", "interactive line chart tooltip", "shadcn area chart", "svg revenue chart"],
  },
  "invite-members": {
    description: "A team invite panel with an email input, a Send button and badges for pending invitations. A starting point for workspace member management in SaaS settings.",
    category: "settings",
    keywords: ["invite team members ui", "react invite by email", "workspace invite form"],
  },
  "invoice-detail": {
    description: "An invoice card with the number, date, a paid, open or void status badge, itemized line amounts and a bold total row. Built with React for billing pages.",
    category: "billing",
    keywords: ["react invoice component", "invoice detail card", "billing invoice ui"],
  },
  "invoice-list": {
    description: "A bordered list of invoices showing number, date, amount and a paid, open or void status badge on each row. Fits the billing history in account settings.",
    category: "billing",
    keywords: ["invoice list react", "billing history table", "tailwind invoices list"],
  },
  "ip-allowlist": {
    description: "An editor for IP and CIDR allowlists: a monospace list with a remove button per entry plus an input and Add button that skips duplicates. Built in React.",
    category: "settings",
    keywords: ["ip allowlist ui", "ip whitelist settings react", "cidr allowlist input"],
  },
  "issue-card": {
    description: "A compact issue tracker card with a monospace ticket key, status and priority badges, a title and an assignee line. Fits Linear or Jira style boards.",
    category: "workflow",
    keywords: ["issue card component", "jira ticket card react", "linear style issue card"],
  },
  "issue-key": {
    description: "A monospace ticket identifier such as MD-241 that renders as plain text or, given an href, as a link with an accent hover underline. For issue lists.",
    category: "workflow",
    keywords: ["issue key component", "ticket id link", "jira key badge"],
  },
  "join-workspace": {
    description: "A centered card for joining a team workspace with an invite code: heading, helper text, a monospace code input and a full width Join button. Tailwind styled.",
    category: "auth",
    keywords: ["join workspace form", "invite code input react", "team onboarding join card"],
  },
  "json-viewer": {
    description: "Pretty prints any JavaScript value as indented JSON in a scrollable monospace block, falling back to a string if it cannot serialize. For React debug panels.",
    category: "developer-tools",
    keywords: ["react json viewer", "pretty print json component", "json display tailwind"],
  },
  "kanban-board": {
    description: "A horizontally scrolling Kanban board built from column data: each column shows its title, a card count and stacked cards with a title and optional meta line.",
    category: "workflow",
    keywords: ["react kanban board", "tailwind kanban", "task board component", "trello board ui"],
  },
  "kanban-column": {
    description: "A single Kanban lane with a title, an optional count badge and a slot for any cards you render as children. Compose several to build your own React task board.",
    category: "workflow",
    keywords: ["kanban column react", "board lane component", "tailwind kanban column"],
  },
  "kbd": {
    description: "A keyboard key cap for showing shortcuts, with a raised edge and room for icons, plus a KbdGroup wrapper for combos like Cmd K. Renders a semantic kbd element.",
    category: "developer-tools",
    keywords: ["shadcn kbd", "keyboard shortcut component", "react kbd key"],
  },
  "kpi-row": {
    description: "A responsive row of KPI tiles, up to four across, each with a label, a large value and an up or down delta. Drop it at the top of a SaaS analytics dashboard.",
    category: "dashboard",
    keywords: ["kpi cards react", "dashboard stat cards tailwind", "metrics row component"],
  },
  "label": {
    description: "A form label that dims and blocks pointer events when its peer input or group is disabled. Native label API, styled with Tailwind like the shadcn label.",
    category: "forms",
    keywords: ["shadcn label", "react form label", "tailwind label component"],
  },
  "language-picker": {
    description: "A grid of language options exposed as an accessible listbox, with the selected language outlined in the accent color. Plug it into locale or profile settings.",
    category: "settings",
    keywords: ["language picker react", "locale selector", "language switcher settings"],
  },
  "latency-badge": {
    description: "A monospace millisecond badge that turns green under 100ms, amber under 400ms and red above. Useful for API monitors, model responses and status dashboards.",
    category: "developer-tools",
    keywords: ["latency badge", "response time indicator", "ms badge react"],
  },
  "light-provider": {
    description: "A page wide light source that follows the pointer and drifts when idle, driving shadows via CSS variables, plus a hairline, glass, metal and paper switcher.",
    category: "animation",
    keywords: ["cursor light effect react", "dynamic shadow css variables", "glass material theme switcher"],
  },
  "line-chart": {
    description: "A multi series SVG line chart with smooth curves, a dashed hairline grid and dots on the last point of each line, colored from chart tokens. No library.",
    category: "charts",
    keywords: ["react line chart", "svg line chart component", "shadcn line chart", "tailwind multi line chart"],
  },
  "link-preview": {
    description: "A rich link card with an optional 2:1 cover image, title, two line description and the URL, opening in a new tab. Good for chat messages, posts and bookmarks.",
    category: "media",
    keywords: ["react link preview card", "url preview component", "open graph link card"],
  },
  "link": {
    description: "A styled anchor with the accent color, underline on hover and a visible focus ring. Accepts every native anchor prop, so it works with Next.js or plain hrefs.",
    category: "navigation",
    keywords: ["react link component", "tailwind link styles", "shadcn link"],
  },
  "list-item": {
    description: "A flexible list row with leading and trailing slots around a truncated heading and description, split by hairline borders. Build settings or contact lists.",
    category: "layout",
    keywords: ["react list item", "tailwind list row", "list with avatar and action"],
  },
  "live-cursors-bar": {
    description: "A multiplayer presence strip with overlapping colored avatars per collaborator and an editing now count. Suits docs, whiteboards and real time React editors.",
    category: "workflow",
    keywords: ["live collaborators avatars", "multiplayer presence bar", "react who is online"],
  },
  "loading-overlay": {
    description: "A translucent overlay that covers its parent with a centered spinner and label while data loads, inheriting the parent radius and announced with role status.",
    category: "feedback",
    keywords: ["react loading overlay", "spinner overlay component", "tailwind loading state"],
  },
  "loading-table": {
    description: "A skeleton placeholder for data tables with configurable rows and columns, a header row and aria-busy so assistive tech knows content is loading.",
    category: "data-tables",
    keywords: ["table skeleton loader", "react loading table", "shadcn skeleton table"],
  },
  "logo-cloud": {
    description: "A centered, wrapping row of customer or partner logos with names in muted text and an optional mark each. Adds social proof to a Tailwind landing page.",
    category: "marketing",
    keywords: ["logo cloud tailwind", "customer logos section", "trusted by logos react"],
  },
  "magic-link-form": {
    description: "A passwordless sign in card with an email field and a Send link button that passes the address to onSend. Built from AuthCard, FormField and Input.",
    category: "auth",
    keywords: ["magic link login form", "passwordless sign in react", "email link auth ui"],
  },
  "markdown-renderer": {
    description: "A small React renderer for AI output that splits text into paragraphs on blank lines and turns fenced code blocks into scrollable monospace panels.",
    category: "ai-chat",
    keywords: ["react markdown renderer", "render ai response markdown", "chat code block renderer"],
  },
  "marquee": {
    description: "An infinitely scrolling Tailwind strip that loops its children horizontally, duplicated for a gapless cycle, and stops when users prefer reduced motion.",
    category: "animation",
    keywords: ["react marquee", "tailwind infinite scroll marquee", "scrolling logos ticker"],
  },
  "mention-input": {
    description: "A comment textarea that opens a suggestion list when you type @, filters names as you keep typing and inserts the chosen @mention. For React comments.",
    category: "forms",
    keywords: ["react mention input", "at mention textarea", "tag users in comment", "mentions autocomplete"],
  },
  "menubar": {
    description: "A desktop style app menubar built on Base UI: a row of triggers that each open a dropdown of items, with keyboard navigation between menus. shadcn compatible.",
    category: "navigation",
    keywords: ["shadcn menubar", "react menubar", "app menu bar component"],
  },
  "merge-box": {
    description: "A React pull request merge panel with a success or warning callout for check status and a full width Merge button that stays disabled until checks pass.",
    category: "developer-tools",
    keywords: ["pull request merge box", "github merge button ui", "code review checks panel"],
  },
  "message-actions": {
    description: "A row of ghost icon buttons for chat replies: copy, retry, good response and bad response, each with an aria label and callback. Place it under AI messages.",
    category: "ai-chat",
    keywords: ["ai message actions", "chat copy retry buttons", "chatgpt message toolbar react"],
  },
  "message-bubble": {
    description: "A React chat message for user, assistant and system roles: user turns sit in a right aligned capsule, assistant replies read as prose, with a streaming cursor.",
    category: "ai-chat",
    keywords: ["react chat bubble", "ai chat message component", "streaming message ui", "tailwind chat bubble"],
  },
  "meter": {
    description: "A horizontal gauge bar using role meter with aria value attributes, an optional label and a fill clamped to 100 percent. For storage, quota and usage limits.",
    category: "feedback",
    keywords: ["react meter component", "usage bar", "quota progress bar tailwind"],
  },
  "metric-delta": {
    description: "A tiny percentage change indicator with an up arrow in green for gains and a down arrow in red for losses. Pair it with stat cards, KPI tiles and table cells.",
    category: "dashboard",
    keywords: ["metric delta indicator", "percentage change badge", "trend arrow react"],
  },
  "mobile-action-sheet": {
    description: "An iOS style action sheet that rises from the bottom with a list of actions, destructive items in red, a Cancel button and a backdrop that dismisses on tap.",
    category: "overlays",
    keywords: ["react action sheet", "mobile bottom sheet menu", "ios action sheet tailwind"],
  },
  "mobile-nav-drawer": {
    description: "A hamburger button that opens a right side navigation drawer as a modal dialog, with a close button and links that dismiss it on tap. Built in React.",
    category: "navigation",
    keywords: ["mobile nav drawer react", "hamburger menu tailwind", "responsive side menu"],
  },
  "model-compare": {
    description: "A comparison table for AI models listing name, latency with a color coded badge, cost and a quality note per row. Helps users pick between LLM providers.",
    category: "ai-chat",
    keywords: ["llm model comparison table", "ai model compare ui", "model latency cost table"],
  },
  "model-picker": {
    description: "A dropdown for choosing an AI model, built on the Select component with an accessible trigger and a placeholder. Pass an array of models and read the chosen id.",
    category: "ai-chat",
    keywords: ["ai model picker", "llm model selector react", "chatgpt model dropdown"],
  },
  "morph-panel": {
    description: "A React button that morphs into the panel it opens on a spring, blurring the label out and the form in. Ships with a feedback form and closes on Escape.",
    category: "animation",
    keywords: ["morphing button popover", "framer motion morph panel", "react feedback widget animation"],
  },
  "multi-select": {
    description: "A multi select dropdown in a popover with check marks on chosen items and removable chips below the trigger. Works controlled or uncontrolled in React.",
    category: "forms",
    keywords: ["react multi select", "shadcn multi select", "tailwind multiselect dropdown", "select multiple with chips"],
  },
  "nav-marketing": {
    description: "A sticky marketing header with a translucent blurred background, brand link, nav links that hide on mobile and Sign in and Get started buttons. Tailwind built.",
    category: "marketing",
    keywords: ["tailwind navbar", "react marketing header", "sticky landing page nav"],
  },
  "navigation-menu": {
    description: "A site navigation menu built on Base UI with triggers that open rich dropdown panels in a shared viewport, plus link items. Mirrors the shadcn navigation menu.",
    category: "navigation",
    keywords: ["shadcn navigation menu", "react mega menu", "dropdown navigation menu"],
  },
  "nested-nav": {
    description: "A collapsible tree navigation built from nested node data, indented by depth with rotating chevrons on items that have children. Fits React docs sidebars.",
    category: "navigation",
    keywords: ["react tree navigation", "nested sidebar menu", "collapsible nav tree"],
  },
  "newsletter-signup": {
    description: "An inline email capture form with a required email field and a Subscribe button that stack on mobile and sit side by side on wider screens. Tailwind styled.",
    category: "marketing",
    keywords: ["newsletter signup form react", "email subscribe tailwind", "email capture component"],
  },
  "not-found-state": {
    description: "A 404 state with the error code, a Page not found heading, a short explanation and Go home and Open gallery buttons, centered in a card. Built in React.",
    category: "feedback",
    keywords: ["404 page component", "react not found page", "tailwind 404 state"],
  },
  "notebook-cell": {
    description: "A Jupyter style notebook cell with a Run button beside a code editor frame and an optional output panel below. Good for interactive docs and playgrounds.",
    category: "developer-tools",
    keywords: ["notebook cell component", "jupyter cell react", "run code cell ui"],
  },
  "notification-inbox": {
    description: "A bell with an unread count that opens a notification popover: All and Mentions tabs, unread dots, mark all read, type icons and an empty state. Built in React.",
    category: "overlays",
    keywords: ["react notification inbox", "notification bell dropdown", "tailwind notifications popover", "shadcn notification center"],
  },
  "notification-item": {
    description: "A single notification row with an unread dot and tint, a truncated title, relative time and a short body line. Stack it in React inboxes and activity feeds.",
    category: "feedback",
    keywords: ["notification item react", "notification list row", "unread notification ui"],
  },
  "notification-preferences": {
    description: "A notification settings list of labeled switches for email digests, product updates and security alerts. A simple React start for preference pages.",
    category: "settings",
    keywords: ["notification settings react", "email preferences toggles", "notification preferences ui"],
  },
  "number-input": {
    description: "A numeric stepper with minus and plus buttons around a centered input that clamps to min and max and moves by a custom step. Works controlled or uncontrolled.",
    category: "forms",
    keywords: ["react number input", "quantity stepper", "shadcn number input", "increment decrement input"],
  },
  "number-roll": {
    description: "An odometer style animated number where each digit rolls on a spring and only changed digits move. Supports Intl formatting, trend tint and reduced motion.",
    category: "animation",
    keywords: ["react animated number", "odometer counter framer motion", "number ticker component"],
  },
  "offline-banner": {
    description: "A full width amber banner shown when the app loses its connection, with a wifi off icon, a note that changes will sync later and an optional Retry button.",
    category: "feedback",
    keywords: ["offline banner react", "no internet connection bar", "network status banner"],
  },
  "offline-state": {
    description: "An offline status card with a warning dot, a You are offline heading, a note on what still works and a Retry connection button. For PWA and sync apps.",
    category: "feedback",
    keywords: ["offline state component", "no connection empty state", "offline page ui"],
  },
  "onboarding-checklist": {
    description: "A Get started card with a list of setup tasks that toggle between done and pending on click, showing a check box and a strikethrough on completed items.",
    category: "dashboard",
    keywords: ["onboarding checklist react", "getting started checklist", "setup tasks widget"],
  },
  "onboarding-wizard": {
    description: "A three step React onboarding flow that walks new users through creating a workspace, inviting teammates and a done screen, with a stepper on top.",
    category: "workflow",
    keywords: ["onboarding wizard react", "multi step onboarding flow", "saas setup wizard"],
  },
  "order-summary": {
    description: "A checkout summary card listing line items such as subtotal, shipping and tax, then a separator and a bold total. Built with React for cart pages.",
    category: "ecommerce",
    keywords: ["order summary component", "checkout summary tailwind", "cart totals react"],
  },
  "org-switcher": {
    description: "A popover switcher for moving between organizations or workspaces, showing the current name, a check on the active item and an optional plan label per org.",
    category: "navigation",
    keywords: ["organization switcher react", "workspace switcher dropdown", "team switcher shadcn"],
  },
  "otp-input": {
    description: "A React one time code input where one real input powers the slots, so paste, SMS autofill and screen readers work natively. Has groups, error shake and success.",
    category: "auth",
    keywords: ["react otp input", "shadcn input otp", "verification code input", "2fa code field tailwind"],
  },
  "page-header": {
    description: "A Tailwind page title block with an h1, an optional description and a wrapping slot for action buttons on the right, set off by a bottom border.",
    category: "layout",
    keywords: ["page header component", "react page title with actions", "tailwind page heading"],
  },
  "pagination": {
    description: "A pagination nav with Prev and Next buttons that disable at the edges and numbered page buttons that mark the current page with aria-current. Built in React.",
    category: "navigation",
    keywords: ["shadcn pagination", "react pagination component", "tailwind pagination"],
  },
  "password-input": {
    description: "A password field with a show and hide toggle inside the input, an eye icon that swaps state and an accessible label. Supports sm, default and lg sizes in React.",
    category: "forms",
    keywords: ["react password input", "show hide password toggle", "shadcn password input"],
  },
  "payment-method-card": {
    description: "A saved card row showing the card brand, last four digits and expiry date in monospace, with an Edit button. Fits the payment methods area of billing.",
    category: "billing",
    keywords: ["payment method card", "saved credit card ui", "billing card on file react"],
  },
  "peek-panel": {
    description: "A right side detail panel with a titled header, a close button and a scrollable body for previewing a record without leaving the list. Tailwind styled.",
    category: "overlays",
    keywords: ["side peek panel", "detail side panel react", "record preview drawer"],
  },
  "permission-chip": {
    description: "A small uppercase chip for access levels: admin, write or read. Use it in member lists, API key tables and sharing dialogs to show what a user or token can do.",
    category: "settings",
    keywords: ["permission badge", "role chip component", "access level tag react"],
  },
  "permission-denied": {
    description: "A 403 style access card explaining that admin rights are needed, with Request access and Switch workspace buttons. Use it wherever a route is role gated.",
    category: "feedback",
    keywords: ["permission denied page", "403 access denied component", "no access state react"],
  },
  "phone-input": {
    description: "A telephone number field with type tel, a numeric keypad on mobile, tel autocomplete, tabular digits and a default aria label. Styled like the React base input.",
    category: "forms",
    keywords: ["react phone input", "phone number field tailwind", "tel input component"],
  },
  "pinned-message": {
    description: "A highlighted pinned note for chat channels and threads with a pin icon, a Pinned by author line and the message body on an accent tinted Tailwind background.",
    category: "ai-chat",
    keywords: ["pinned message component", "chat pinned announcement", "slack pinned message ui"],
  },
  "plan-card": {
    description: "A pricing plan card with the plan name, a large price per period, a feature list and a full width call to action. A highlighted prop marks the recommended tier.",
    category: "billing",
    keywords: ["pricing plan card react", "tailwind pricing card", "subscription plan card"],
  },
  "plan-comparison": {
    description: "A Free versus Pro comparison table with a row per feature and check or dash icons in each plan column. Shows what an upgrade unlocks on Tailwind pricing pages.",
    category: "billing",
    keywords: ["plan comparison table", "pricing feature comparison react", "free vs pro table"],
  },
  "popover": {
    description: "A floating React panel anchored to a trigger, built on Base UI with side and align options, collision aware positioning, title and description parts.",
    category: "overlays",
    keywords: ["shadcn popover", "react popover", "tailwind popover component"],
  },
  "presence-dot": {
    description: "A small colored dot for user status: online, away, busy or offline, exposed with role status and an aria label. Overlay it on avatars in chat and team lists.",
    category: "feedback",
    keywords: ["presence indicator", "online status dot react", "avatar status badge"],
  },
  "press-quote": {
    description: "A centered press or testimonial quote using figure, blockquote and figcaption, with a large quoted line and an uppercase source. Adds proof to landing pages.",
    category: "marketing",
    keywords: ["press quote component", "testimonial blockquote tailwind", "as seen in quote"],
  },
  "pricing-table": {
    description: "A three column pricing section that renders a PlanCard for each tier you pass in, stacking on mobile. Mark one plan as highlighted to steer visitors toward it.",
    category: "billing",
    keywords: ["react pricing table", "tailwind pricing section", "saas pricing tiers", "shadcn pricing"],
  },
  "pricing-toggle": {
    description: "A Monthly and Yearly billing period switch built on a segmented control, with a Save 20% with yearly note underneath. Pairs with pricing tables and plan cards.",
    category: "billing",
    keywords: ["pricing toggle monthly yearly", "billing period switch react", "annual pricing toggle"],
  },
  "priority-picker": {
    description: "A radio group of priority chips, Low, Medium, High and Urgent, each with a colored dot and aria-checked state. Built for issue trackers, tasks and ticket forms.",
    category: "workflow",
    keywords: ["priority picker react", "task priority selector", "issue priority chips"],
  },
  "product-card": {
    description: "A storefront product tile with a square image, an optional corner badge like Sale or New, the product title, price and an Add to cart button when onAdd is set.",
    category: "ecommerce",
    keywords: ["react product card", "tailwind ecommerce card", "add to cart product tile"],
  },
  "profile-form": {
    description: "An account profile form with a display name input, a bio textarea and a Save profile button, composed from FormField, Input and Textarea in React.",
    category: "settings",
    keywords: ["profile settings form", "edit profile react", "user profile form tailwind"],
  },
  "progress-circle": {
    description: "A compact circular progress indicator drawn in SVG with a configurable size, an accent arc, an accessible label and the percentage in monospace below it.",
    category: "feedback",
    keywords: ["circular progress react", "progress ring svg", "radial progress tailwind"],
  },
  "progress": {
    description: "A linear progress bar built on Base UI with track, indicator, label and value parts, a default aria label and smooth width transitions. Matches shadcn progress.",
    category: "feedback",
    keywords: ["shadcn progress", "react progress bar", "tailwind progress bar"],
  },
  "prompt-input-attachments": {
    description: "The AI prompt composer with an Attach file button and helper text above it, forwarding every PromptInput prop. For chat apps that accept documents or images.",
    category: "ai-chat",
    keywords: ["ai prompt input with attachments", "chat input file upload", "chatgpt composer attach"],
  },
  "prompt-input": {
    description: "An AI chat composer that grows with its content, sends on Enter, adds a newline on Shift Enter and has attach, toolbar and send controls. Built for React.",
    category: "ai-chat",
    keywords: ["react prompt input", "ai chat input box", "chatgpt style textarea", "shadcn ai prompt"],
  },
  "prompt-library": {
    description: "A searchable list of saved prompts that filters by title, body and tag as you type and returns the chosen prompt through onSelect. Useful in React AI apps.",
    category: "ai-chat",
    keywords: ["prompt library ui", "saved prompts list react", "ai prompt templates picker"],
  },
  "prose": {
    description: "A Tailwind typography wrapper for raw HTML or MDX that styles headings, muted paragraphs, links, lists, inline code and blockquotes at a readable measure.",
    category: "layout",
    keywords: ["tailwind prose", "react typography component", "mdx prose styles"],
  },
}
