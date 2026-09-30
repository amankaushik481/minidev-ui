import type { ComponentSeo } from "../types"

export const PART_2: Record<string, ComponentSeo> = {
  "publish-bar": {
    description: "React publish bar with a draft, scheduled or published status badge, an autosave note, and Preview and Publish buttons wired to an onPublish callback.",
    category: "workflow",
    keywords: ["react publish bar", "cms publish toolbar", "draft published status bar"],
  },
  "quantity-stepper": {
    description: "React quantity stepper with minus and plus buttons around a tabular count. Clamps to min and max, disables at the limits, and works controlled or uncontrolled.",
    category: "ecommerce",
    keywords: ["react quantity selector", "tailwind number stepper", "cart quantity input"],
  },
  "query-builder": {
    description: "Filter query builder that chains field, operator and value clauses with AND. Add or remove rows, each with labelled selects, built in React and Tailwind.",
    category: "data-tables",
    keywords: ["react query builder", "filter builder ui", "tailwind advanced filter"],
  },
  "quota-bar": {
    description: "Compact quota bar showing a label, used over max with locale formatting, and a thin accent progress track exposed as an ARIA progressbar for plan limits.",
    category: "billing",
    keywords: ["quota progress bar", "react usage limit bar", "plan limit meter"],
  },
  "radar-chart": {
    description: "SVG radar chart that plots normalized 0 to 1 values on labelled axes over four concentric grid rings. Themed with currentColor and labelled for screen readers.",
    category: "charts",
    keywords: ["react radar chart", "spider chart svg", "tailwind radar chart"],
  },
  "radio-group": {
    description: "Accessible radio group on Base UI with keyboard navigation, a springy checked dot, larger hit areas, and invalid and disabled states. A shadcn-style drop in.",
    category: "forms",
    keywords: ["shadcn radio group", "react radio group", "tailwind radio button"],
  },
  "range-slider": {
    description: "Two-thumb range slider for picking a min and max, with value bubbles on both thumbs while dragging, optional marks, a formatter and an onValueCommitted hook.",
    category: "forms",
    keywords: ["react range slider", "dual thumb slider", "shadcn range slider", "price range filter"],
  },
  "rating": {
    description: "Star rating input rendered as a radiogroup, with one labelled radio per star, a configurable max, disabled state, and controlled or uncontrolled value in React.",
    category: "forms",
    keywords: ["react star rating", "tailwind rating component", "accessible star rating"],
  },
  "reaction-bar": {
    description: "Row of emoji reaction pills with counts, where active reactions get an accent border and aria-pressed. Toggle callbacks suit comments and chat threads.",
    category: "feedback",
    keywords: ["emoji reactions react", "reaction bar component", "slack style reactions"],
  },
  "read-receipt": {
    description: "Message read receipt icon that shows a single check for sent, a double check for delivered, and an accent double check once read. Labelled for screen readers.",
    category: "ai-chat",
    keywords: ["read receipt icon", "chat message status react", "delivered read checkmarks"],
  },
  "reasoning-block": {
    description: "Collapsible AI reasoning block, folded by default. The title shimmers while the model is thinking, then reads Thought for Ns, with an animated height reveal.",
    category: "ai-chat",
    keywords: ["ai reasoning component", "react thinking block", "llm chain of thought ui"],
  },
  "receipt": {
    description: "Monospace payment receipt card with an order id, itemized amounts in tabular numerals and a bold total row. Built with Tailwind for checkout and billing pages.",
    category: "billing",
    keywords: ["react receipt component", "tailwind invoice receipt", "order summary card"],
  },
  "regenerate-bar": {
    description: "Footer bar for AI answers with a Not quite right prompt, a Regenerate button with a refresh icon, and an optional Edit prompt action when onEdit is set.",
    category: "ai-chat",
    keywords: ["ai regenerate button", "chatgpt regenerate response ui", "react ai message actions"],
  },
  "region-picker": {
    description: "Deployment region picker with selectable cards for each region and its latency in milliseconds. Uses radio semantics and an accent tint for the chosen one.",
    category: "settings",
    keywords: ["region selector react", "cloud region picker", "tailwind radio cards"],
  },
  "relative-time": {
    description: "React relative timestamp that renders just now, 5m ago, 3h ago or 2d ago inside a semantic time element, with the full local date shown as a hover title.",
    category: "developer-tools",
    keywords: ["react relative time", "time ago component", "timeago react"],
  },
  "reset-password-form": {
    description: "Reset password card with new password and confirm password fields and a full-width Update password button, built from AuthCard, FormField and Input in React.",
    category: "auth",
    keywords: ["react reset password form", "tailwind change password", "shadcn reset password"],
  },
  "resizable-panels": {
    description: "Two resizable panels split by a draggable divider, clamped between 20 and 80 percent. The divider is a focusable separator that also moves with arrow keys.",
    category: "layout",
    keywords: ["react resizable panels", "shadcn resizable", "draggable split view"],
  },
  "resource-quota-grid": {
    description: "Responsive grid of quota cards, one per resource, each with a labelled usage bar showing used over max. Useful for infra limits like builds, storage and seats.",
    category: "dashboard",
    keywords: ["resource quota dashboard", "usage limits grid", "react quota cards"],
  },
  "retry-block": {
    description: "Error block that pairs a danger inline alert with a Try again button and an onRetry callback. Defaults to a request failed message you can override in React.",
    category: "feedback",
    keywords: ["react retry error", "request failed state", "error with retry button"],
  },
  "review-request-card": {
    description: "Code review request card with a Review requested badge, pull request title, repo name, author avatar, and Review and View diff buttons for developer dashboards.",
    category: "developer-tools",
    keywords: ["pull request card", "code review ui react", "github pr card tailwind"],
  },
  "rich-text-toolbar": {
    description: "Formatting toolbar with bold and italic toggles, link, bullet and numbered list buttons, and a divider. Uses role toolbar with labelled icon toggles in React.",
    category: "forms",
    keywords: ["rich text toolbar react", "editor formatting toolbar", "tailwind wysiwyg toolbar"],
  },
  "role-permission-matrix": {
    description: "Role and permission matrix with roles as columns and permissions as rows, each cell a labelled checkbox. Scrolls sideways on small screens, styled in Tailwind.",
    category: "settings",
    keywords: ["rbac permission matrix", "role permissions table react", "access control ui"],
  },
  "role-picker": {
    description: "Team role picker built on the radio group, offering Owner, Admin and Member options with linked labels. Drop it into invite dialogs and member settings forms.",
    category: "settings",
    keywords: ["role selector react", "team role picker", "user role radio"],
  },
  "row-selection": {
    description: "Row selection checkbox for data tables with checked and indeterminate states and a default Select row label. Pairs with a header checkbox for select all.",
    category: "data-tables",
    keywords: ["table row selection", "react select all checkbox", "shadcn data table selection"],
  },
  "saved-views": {
    description: "Saved views list for filters, rendered as a listbox of named views with item counts and a highlighted active view. Works controlled or uncontrolled in React.",
    category: "data-tables",
    keywords: ["saved views react", "saved filters sidebar", "linear style views"],
  },
  "schema-field-row": {
    description: "API schema field row with a monospace field name, a required badge, the type and a description, in three columns on desktop for docs and reference pages.",
    category: "developer-tools",
    keywords: ["api reference field", "schema docs component", "props table row"],
  },
  "scroll-area": {
    description: "Custom scroll area on Base UI with a thin rounded thumb, vertical or horizontal scrollbars and a focus ring on the viewport. A shadcn-compatible ScrollArea.",
    category: "layout",
    keywords: ["shadcn scroll area", "react custom scrollbar", "tailwind scroll area"],
  },
  "search-input": {
    description: "Search input with a leading search icon and a clear button that appears once there is text. Comes in sm, default and lg sizes, controlled or uncontrolled.",
    category: "forms",
    keywords: ["react search input", "search bar with clear button", "tailwind search field"],
  },
  "search-with-results": {
    description: "Search field with a results list below it showing titles and optional subtitles, plus a No results state. Emits onSearch as you type so you can filter in React.",
    category: "forms",
    keywords: ["react search results", "search dropdown list", "instant search ui"],
  },
  "seat-manager": {
    description: "Team seat manager card showing seats used out of the plan, an Invite button, and a member list with name, email and role badge. Built in React for billing.",
    category: "billing",
    keywords: ["seat management ui", "team seats billing", "react member seats"],
  },
  "secret-reveal": {
    description: "Masked secret field for API keys with an eye toggle to reveal or hide the value and a copy button for the full key. Monospace, compact, built with Tailwind.",
    category: "developer-tools",
    keywords: ["api key reveal", "react secret input", "show hide api key", "copy api key ui"],
  },
  "section-header": {
    description: "Tailwind section header with a title, optional muted description and a right-aligned actions slot that wraps on narrow screens. Use it above cards and tables.",
    category: "layout",
    keywords: ["react section header", "page section title actions", "tailwind heading with actions"],
  },
  "segmented-control": {
    description: "Segmented control with a raised thumb that springs between options, arrow, Home and End key support, icons, badges, three sizes and reduced motion support.",
    category: "forms",
    keywords: ["react segmented control", "tailwind toggle tabs", "ios segmented control", "monthly yearly switch"],
  },
  "select": {
    description: "Select dropdown on Base UI with a trigger in three sizes, an animated popup, groups, labels, separators, a check indicator and scroll arrows. Shadcn-compatible.",
    category: "forms",
    keywords: ["shadcn select", "react select dropdown", "tailwind select component"],
  },
  "separator": {
    description: "Hairline separator on Base UI that draws a 1px rule horizontally or vertically, stretching to fill its container. A drop-in shadcn Separator for React layouts.",
    category: "layout",
    keywords: ["shadcn separator", "react divider", "tailwind horizontal rule"],
  },
  "server-error-state": {
    description: "500 error state card with a danger outline, a short explanation, and Retry and Copy request id buttons so users can recover or reach support with context.",
    category: "feedback",
    keywords: ["500 error page react", "server error state", "tailwind error card"],
  },
  "session-list": {
    description: "Active sessions list showing each device and location, marking the current device and giving other sessions a Revoke button. A React account security block.",
    category: "settings",
    keywords: ["active sessions list", "manage devices ui", "react session management"],
  },
  "settings-layout": {
    description: "Settings page layout with a 200px side nav column and a content area, plus a SettingsSection for titled groups divided by hairlines. Tailwind grid based.",
    category: "settings",
    keywords: ["settings page layout react", "tailwind settings sidebar", "account settings template"],
  },
  "sheet": {
    description: "Slide-out sheet from the left, right, top or bottom with a backdrop, a titled header, a close button and a scrollable body, rendered as a modal dialog in React.",
    category: "overlays",
    keywords: ["shadcn sheet", "react side drawer", "tailwind slide over panel"],
  },
  "shipping-address": {
    description: "Shipping address form with full name, street address, city and postal code fields, each with the right autocomplete attribute for browser autofill at checkout.",
    category: "ecommerce",
    keywords: ["react shipping address form", "checkout address fields", "tailwind address form"],
  },
  "shortcut-cheat-sheet": {
    description: "Keyboard shortcut cheat sheet listing actions next to their key combinations rendered as Kbd keycaps. Pass your own rows or use the default command palette set.",
    category: "developer-tools",
    keywords: ["keyboard shortcuts modal", "react shortcut list", "hotkeys cheat sheet"],
  },
  "sidebar-section": {
    description: "Sidebar section that groups nav items under an optional small uppercase heading with tight spacing. Stack several inside the Sidebar to organize app navigation.",
    category: "navigation",
    keywords: ["sidebar group react", "sidebar nav section", "tailwind sidebar heading"],
  },
  "sidebar": {
    description: "App sidebar shell with a collapsed icon-only width and SidebarNavItem buttons that show icons, truncated labels and an active state. Built with Tailwind.",
    category: "navigation",
    keywords: ["shadcn sidebar", "react collapsible sidebar", "tailwind sidebar navigation"],
  },
  "sign-up-form": {
    description: "Create account form with GitHub and Google buttons, required name, email and password fields, a submit button and a Sign in link, all inside an AuthCard.",
    category: "auth",
    keywords: ["react sign up form", "tailwind registration form", "shadcn signup page"],
  },
  "skeleton": {
    description: "Tailwind skeleton loader with a sunken plate and a soft sheen that sweeps every 1.6s, plus a SkeletonCard preset with title, text lines and a media block.",
    category: "feedback",
    keywords: ["shadcn skeleton", "react loading skeleton", "tailwind shimmer placeholder"],
  },
  "skip-link": {
    description: "Skip to content link that stays visually hidden until focused, then appears fixed in the top corner so keyboard users can jump past navigation in any React app.",
    category: "navigation",
    keywords: ["skip to content link", "react skip link", "accessibility skip navigation"],
  },
  "slash-command-menu": {
    description: "React slash command menu that filters commands by the typed query, shows each as /name with an optional hint, and falls back to a No commands message.",
    category: "forms",
    keywords: ["slash command menu react", "notion style slash menu", "editor command menu"],
  },
  "slider": {
    description: "Slider on Base UI with a hairline rail, a keycap thumb, a value bubble while dragging, optional labelled marks, Intl number formatting and vertical support.",
    category: "forms",
    keywords: ["shadcn slider", "react slider with value", "tailwind range input"],
  },
  "social-auth-row": {
    description: "Two-column row of Continue with GitHub and Continue with Google buttons with click handlers, ready to sit above email fields on sign in and sign up screens.",
    category: "auth",
    keywords: ["social login buttons", "oauth buttons react", "github google sign in"],
  },
  "social-proof": {
    description: "Social proof row of up to five overlapping avatars with initials fallback, next to a count label like 2,000 teams. Built in React for landing page heroes.",
    category: "marketing",
    keywords: ["avatar stack social proof", "react avatar group", "landing page social proof"],
  },
  "sortable-header": {
    description: "Sortable table header button that shows an up, down or neutral arrow for the current sort direction and calls onToggle on click. Pairs with any Tailwind table.",
    category: "data-tables",
    keywords: ["sortable table header react", "table sort button", "shadcn data table sorting"],
  },
  "source-card": {
    description: "Citation source card for AI answers showing a title, a source badge, the truncated URL and a short snippet. List references under a generated response.",
    category: "ai-chat",
    keywords: ["ai citation card", "rag source card", "perplexity sources ui"],
  },
  "sparkline-set": {
    description: "Responsive grid of metric cards, each with a label, value, delta chip and a small area chart sparkline. Good for a KPI overview at the top of a React dashboard.",
    category: "dashboard",
    keywords: ["sparkline cards", "kpi sparkline grid", "react dashboard metrics"],
  },
  "spinner": {
    description: "Loading spinner in sm, default and lg sizes with role status and an accessible Loading label. Drop it into buttons, cards or full page states in a Tailwind app.",
    category: "feedback",
    keywords: ["react loading spinner", "tailwind spinner", "shadcn spinner"],
  },
  "split-button": {
    description: "Split button with a primary action and a chevron that opens a dropdown of secondary actions, including destructive items. The menu matches the button width.",
    category: "buttons",
    keywords: ["react split button", "button with dropdown", "tailwind dropdown button"],
  },
  "split-flap": {
    description: "Split-flap display that flips each character through the alphabet like a departure board, with a column ripple, tones, sizes and reduced motion support.",
    category: "animation",
    keywords: ["split flap display react", "solari board animation", "flip text animation"],
  },
  "split-pane": {
    description: "Static two-column split pane that stacks on mobile and sits side by side from md up, with a hairline divider. Handy for compare views and editor previews.",
    category: "layout",
    keywords: ["split pane layout", "two column layout tailwind", "side by side panels"],
  },
  "sql-result-table": {
    description: "SQL query result table with uppercase column headers, monospace cells and horizontal scroll for wide results. Built for database consoles and admin tools.",
    category: "developer-tools",
    keywords: ["sql results table", "query result grid react", "database table viewer"],
  },
  "sso-provider-card": {
    description: "SSO provider card with a name, description, Configured or Not set badge, an enable switch and a Configure button. A React block for SAML and OIDC settings.",
    category: "auth",
    keywords: ["sso settings ui", "saml provider card", "react sso configuration"],
  },
  "stack-trace": {
    description: "Stack trace block that shows an error trace in a monospace pre with a danger tint and scroll for long output. Useful in error pages, logs and debug panels.",
    category: "developer-tools",
    keywords: ["stack trace component", "react error trace", "error log viewer"],
  },
  "stack": {
    description: "Vertical stack layout primitive that arranges children in a flex column with a gap prop from 1 to 8 on a 4px scale. Accepts all normal div props in React.",
    category: "layout",
    keywords: ["react stack component", "vstack tailwind", "flex column layout"],
  },
  "stacked-bar-chart": {
    description: "Stacked bar chart that splits each column into colored series segments with hover titles, category labels underneath and a series legend. Uses chart CSS tokens.",
    category: "charts",
    keywords: ["react stacked bar chart", "tailwind bar chart", "stacked column chart"],
  },
  "stat-card": {
    description: "React stat card with a label, optional icon, a large tabular value and a delta chip colored by its sign, with invertDelta for metrics like churn or latency.",
    category: "dashboard",
    keywords: ["react stat card", "kpi card tailwind", "dashboard metric card"],
  },
  "stat-sparkline": {
    description: "Metric card with a label, a large value, a signed delta and an edge-to-edge area sparkline that turns red when the trend is down. Built for React dashboards.",
    category: "dashboard",
    keywords: ["stat card with sparkline", "kpi trend card", "react sparkline metric"],
  },
  "stats-strip": {
    description: "Tailwind stats strip of centered value and label cells split by hairlines, two columns on mobile and four on desktop. Shows traction numbers on landing pages.",
    category: "marketing",
    keywords: ["stats section tailwind", "landing page metrics", "numbers strip react"],
  },
  "status-badge": {
    description: "Tailwind status badge with a tinted fill, hairline border and colored dot in neutral, success, warning, danger, accent and info tones that read as one set.",
    category: "feedback",
    keywords: ["react status badge", "tailwind status pill", "shadcn badge variants"],
  },
  "status-dot": {
    description: "Small status dot in neutral, success, warning, danger and accent tones, built with cva. Place it next to labels for online, healthy or failing indicators.",
    category: "feedback",
    keywords: ["status indicator dot", "online status dot react", "tailwind status dot"],
  },
  "step-progress": {
    description: "Step progress bar made of segments that fill in accent for completed and current steps, with small labels under each. Fits checkout and onboarding flows.",
    category: "workflow",
    keywords: ["step progress bar", "react multi step progress", "onboarding progress"],
  },
  "stepper": {
    description: "Numbered stepper for multi-step forms that shows each step as a bar and a label, highlighting completed and current steps. Semantic ordered list in React.",
    category: "workflow",
    keywords: ["react stepper", "multi step form stepper", "tailwind wizard steps"],
  },
  "sticky-bar": {
    description: "Sticky bottom action bar with a translucent blurred background and a hairline top border. Keeps save, cancel or checkout actions in reach on long pages.",
    category: "layout",
    keywords: ["sticky footer bar", "sticky action bar react", "tailwind sticky bottom"],
  },
  "sticky-column": {
    description: "Sticky table column wrapper that pins content to the left or right edge with a solid background and divider while the rest of a wide table scrolls horizontally.",
    category: "data-tables",
    keywords: ["sticky table column", "frozen column tailwind", "react pinned column"],
  },
  "stop-generating": {
    description: "Stop generating button with a filled square icon and an onClick handler, for cancelling a streaming AI response mid-answer in chat interfaces built with React.",
    category: "ai-chat",
    keywords: ["stop generating button", "cancel ai response", "chat stop streaming"],
  },
  "streak-calendar": {
    description: "Streak calendar showing a 28-day grid in seven columns, with active days filled in accent. Useful for habit tracking, learning apps and activity views.",
    category: "dashboard",
    keywords: ["streak calendar react", "habit tracker grid", "activity streak ui"],
  },
  "streaming-cursor": {
    description: "Blinking caret that sits inline at the end of streaming text, sized to the line and hidden from screen readers. Signals an AI response is still arriving.",
    category: "ai-chat",
    keywords: ["streaming cursor", "blinking caret css", "ai typing cursor"],
  },
  "streaming-message": {
    description: "Chat message bubble that renders partial AI output with a blinking caret at the end, for showing token-by-token streaming responses in a Tailwind chat UI.",
    category: "ai-chat",
    keywords: ["streaming message react", "ai chat bubble streaming", "llm response ui"],
  },
  "suggestion-chips": {
    description: "Row of rounded suggestion chips such as Summarize or Find bugs that call onSelect when clicked. Use them as prompt starters under a React AI chat input.",
    category: "ai-chat",
    keywords: ["prompt suggestions chips", "ai suggestion buttons", "react chip list"],
  },
  "switch": {
    description: "Switch on Base UI whose thumb stretches on press then springs across, with sm and default sizes, a loading spinner state and an optional clickable label row.",
    category: "forms",
    keywords: ["shadcn switch", "react toggle switch", "tailwind switch with label"],
  },
  "table-pagination": {
    description: "Table pagination footer showing Page X of Y with previous and next icon buttons that disable at the first and last page. Wire it to onPageChange in React.",
    category: "data-tables",
    keywords: ["react table pagination", "shadcn pagination", "data table paging"],
  },
  "table-toolbar": {
    description: "Toolbar above a data table with a search input on the left and a right slot for filters, view toggles or export buttons. Wraps cleanly on narrow screens.",
    category: "data-tables",
    keywords: ["data table toolbar", "table search filter bar", "shadcn table toolbar"],
  },
  "table": {
    description: "Table primitives for header, body, footer, row, head, cell and caption, wrapped in a horizontal scroll container. Same API as the shadcn Table, in Tailwind.",
    category: "data-tables",
    keywords: ["shadcn table", "react table component", "tailwind table"],
  },
  "tabs": {
    description: "Tabs on Base UI with a raised thumb or a line underline that springs to the active tab, optional count badges, vertical orientation and roving keyboard focus.",
    category: "navigation",
    keywords: ["shadcn tabs", "react animated tabs", "tailwind underline tabs"],
  },
  "tags-input": {
    description: "React tags input that adds a chip on Enter or comma, skips duplicates, removes the last tag on Backspace and gives each chip a labelled remove button.",
    category: "forms",
    keywords: ["react tags input", "tag input component", "multi value chip input"],
  },
  "tax-fields": {
    description: "Checkout tax fields with country and a monospace VAT or EIN tax ID input in a two-column grid. Drop it into billing address forms for business customers.",
    category: "billing",
    keywords: ["vat id input", "tax id form field", "billing tax fields react"],
  },
  "team-member-row": {
    description: "Team member row with an initials avatar, name, email and a role badge, truncating cleanly in narrow lists. Built for team pages and member management in React.",
    category: "settings",
    keywords: ["team member list item", "react user row", "member list tailwind"],
  },
  "terminal-window": {
    description: "Terminal window frame with traffic light dots, a title bar and a monospace body for commands and output. A Tailwind block for install steps, CLI docs and demos.",
    category: "developer-tools",
    keywords: ["terminal window component", "react terminal ui", "macos terminal mockup"],
  },
  "testimonial": {
    description: "Testimonial card with a quote, avatar with initials fallback, name and role, using semantic figure and blockquote markup. Built in Tailwind for landing pages.",
    category: "marketing",
    keywords: ["testimonial card react", "tailwind testimonial", "customer quote component"],
  },
  "text": {
    description: "Text paragraph primitive with muted, subtle and mono variants on top of your base type styles. Keeps secondary copy and inline technical text consistent.",
    category: "layout",
    keywords: ["react text component", "typography primitive", "muted text tailwind"],
  },
  "textarea": {
    description: "Multiline textarea with a 96px minimum height, comfortable line height, hairline border, focus ring and subtle placeholder. A shadcn-compatible Textarea.",
    category: "forms",
    keywords: ["shadcn textarea", "react textarea", "tailwind textarea"],
  },
  "theme-picker": {
    description: "Light, dark and system theme picker as a segmented radiogroup that toggles the dark class on the root element for Tailwind dark mode and reports it to onChange.",
    category: "settings",
    keywords: ["dark mode toggle react", "theme switcher", "light dark system picker"],
  },
  "thinking-block": {
    description: "React Thinking panel with a chevron header and aria-expanded that reveals the model's intermediate reasoning in muted text. Collapsed by default in chat.",
    category: "ai-chat",
    keywords: ["ai thinking panel", "collapsible reasoning react", "llm thoughts ui"],
  },
  "time-picker": {
    description: "React time picker built on the native time input, styled to match the other inputs, with a controlled value, onChange, disabled state and an aria-label.",
    category: "forms",
    keywords: ["react time picker", "tailwind time input", "shadcn time picker"],
  },
  "timeline": {
    description: "Tailwind vertical timeline with a hairline rail, a dot per event, titles, optional descriptions and right-aligned timestamps for activity feeds and changelogs.",
    category: "dashboard",
    keywords: ["react timeline", "activity timeline tailwind", "vertical timeline component"],
  },
  "toast": {
    description: "Toast notifications with a toast() API for success, error, warning and promise states. The Toaster stacks cards, fans them out on hover and pauses timers.",
    category: "feedback",
    keywords: ["react toast notifications", "sonner alternative", "shadcn toast", "tailwind toaster"],
  },
  "toc": {
    description: "Table of contents nav with anchor links indented by heading level and a highlighted active item. Pair it with scroll tracking for docs and long articles.",
    category: "navigation",
    keywords: ["table of contents react", "docs toc sidebar", "on this page navigation"],
  },
  "toggle-group": {
    description: "Toggle group on Base UI that wraps Toggle buttons for single or multiple selection with shared keyboard navigation. Use it for text formatting or view modes.",
    category: "buttons",
    keywords: ["shadcn toggle group", "react button group toggle", "tailwind toggle group"],
  },
  "toggle": {
    description: "Two-state toggle button on Base UI with sm, default and lg sizes and a pressed style. A shadcn-compatible Toggle for toolbar actions like bold or mute in React.",
    category: "buttons",
    keywords: ["shadcn toggle", "react toggle button", "pressed state button"],
  },
  "token-usage-meter": {
    description: "LLM token usage meter showing tokens used against a monthly limit, a labelled progress bar and a percent of budget note with the reset date. Useful in AI apps.",
    category: "ai-chat",
    keywords: ["token usage meter", "ai usage limit bar", "llm credits meter"],
  },
  "tool-call-card": {
    description: "Agent tool call card showing the tool name, argument preview, duration and a running, done or failed status chip, with collapsible monospace output below.",
    category: "ai-chat",
    keywords: ["ai tool call ui", "agent function call card", "react tool use component"],
  },
  "tool-call-collapsed": {
    description: "Compact collapsed tool call row with a rotating chevron and monospace tool name that expands to show its details. Keeps agent traces tidy inside chat threads.",
    category: "ai-chat",
    keywords: ["collapsed tool call", "agent step accordion", "ai function call row"],
  },
  "tool-result-panel": {
    description: "Tool result panel with the tool name, a success, error or running status badge and the output shown in a JSON code block. Built in React for AI agent UIs.",
    category: "ai-chat",
    keywords: ["tool result viewer", "ai agent output panel", "json result panel"],
  },
  "tooltip": {
    description: "React tooltip on Base UI with a provider for delay, a trigger, and content that positions on any side with an arrow and portal. Drop-in shadcn Tooltip API.",
    category: "overlays",
    keywords: ["shadcn tooltip", "react tooltip", "tailwind tooltip"],
  },
  "topbar": {
    description: "App top bar that is 56px tall with a title or custom left content and a right slot for actions, avatars or search. Sits above the main content in dashboards.",
    category: "navigation",
    keywords: ["react app header", "dashboard topbar", "tailwind navbar"],
  },
  "trace-waterfall": {
    description: "React trace waterfall that draws each span as a bar offset by start time and scaled by duration, indented by depth with a millisecond label for observability.",
    category: "developer-tools",
    keywords: ["trace waterfall react", "distributed tracing ui", "span timeline chart"],
  },
  "tree-view": {
    description: "Nested tree view with expandable nodes, rotating chevrons, depth indentation and ARIA tree roles. Suited to file explorers and nested category lists in React.",
    category: "navigation",
    keywords: ["react tree view", "file tree component", "tailwind tree view"],
  },
  "trial-banner": {
    description: "Trial banner with a days left headline, a short note on what stays unlocked and an Upgrade button, on an accent tinted strip. Built for SaaS billing nudges.",
    category: "billing",
    keywords: ["trial banner saas", "free trial countdown", "upgrade banner react"],
  },
  "two-factor-setup": {
    description: "Two-factor setup card with a QR code area, a one-time code input and a Verify and enable button, guiding users through linking an authenticator app in React.",
    category: "auth",
    keywords: ["2fa setup react", "totp setup ui", "authenticator app enrollment"],
  },
  "two-factor-verify": {
    description: "Two-factor verification screen with a one-time password input and a full-width Verify button inside an auth card. Use it as the second step after sign in.",
    category: "auth",
    keywords: ["2fa verify page", "otp verification react", "two factor login tailwind"],
  },
  "typing-indicator": {
    description: "Tailwind typing indicator with three pulsing dots in a rounded pill, staggered by 120ms, with role status and a Typing label. Shows someone is replying in chat.",
    category: "ai-chat",
    keywords: ["typing indicator react", "chat typing dots", "tailwind typing animation"],
  },
  "upgrade-prompt": {
    description: "Upgrade prompt card with a title, a short description of what the paid plan unlocks and an Upgrade button. Place it where a free user hits a gated feature.",
    category: "billing",
    keywords: ["upgrade prompt saas", "paywall card react", "upsell component"],
  },
  "uptime-bar": {
    description: "Status page uptime bar with one cell per day over 90 days, green when operational and red on degraded days, and the uptime percentage above. Built in Tailwind.",
    category: "dashboard",
    keywords: ["uptime bar status page", "react uptime chart", "service status history"],
  },
  "usage-breakdown": {
    description: "Usage breakdown listing several metered items, each with its label, used over limit and a thin accent bar. Use it on billing pages to show where plan limits go.",
    category: "billing",
    keywords: ["usage breakdown billing", "plan usage bars", "react metered usage"],
  },
  "usage-meter": {
    description: "Single usage meter with a label, used over limit count and a Progress bar linked by aria-labelledby. Handy for API calls, storage or seats on billing pages.",
    category: "billing",
    keywords: ["usage meter react", "api usage progress", "tailwind usage bar"],
  },
  "user-chip": {
    description: "React user chip showing a small avatar with initials fallback and the person's name, plus an optional remove button. Good for assignees, mentions and pickers.",
    category: "forms",
    keywords: ["user chip react", "avatar chip tailwind", "assignee pill"],
  },
  "version-badge": {
    description: "Version badge that shows a v-prefixed release number with an optional stable, beta or canary channel pill, each tinted differently, for docs and changelogs.",
    category: "developer-tools",
    keywords: ["version badge react", "release channel badge", "semver tag"],
  },
  "vertical-tabs": {
    description: "Vertical tabs with a 180px tab list on the left and the active panel on the right, using tab and tabpanel roles. Stacks on mobile. Built for settings screens.",
    category: "navigation",
    keywords: ["vertical tabs react", "sidebar tabs tailwind", "settings vertical tabs"],
  },
  "video-player-chrome": {
    description: "Video player chrome with a 16:9 stage, a centered play and pause button, a volume icon, a playback progress bar and a title. Bring your own video in React.",
    category: "media",
    keywords: ["video player ui react", "custom video controls", "tailwind video player"],
  },
  "virtualized-list": {
    description: "Virtualized list that renders only the visible rows plus a small buffer, using a fixed item height and absolute positioning. Keeps thousands of React rows fast.",
    category: "data-tables",
    keywords: ["react virtualized list", "virtual scroll list", "windowing large list"],
  },
  "visually-hidden": {
    description: "Visually hidden wrapper that keeps content available to screen readers while hiding it on screen via sr-only. Use it for icon button labels and extra context.",
    category: "layout",
    keywords: ["visually hidden react", "sr only component", "screen reader only text"],
  },
  "vote-control": {
    description: "Upvote and downvote control with a score between two chevrons, aria-pressed states and click again to undo. Built in React for forums and feedback boards.",
    category: "feedback",
    keywords: ["upvote downvote react", "reddit style vote", "vote buttons tailwind"],
  },
  "waffle-chart": {
    description: "Waffle chart that fills a 10 column grid of squares to show a value out of a total, with a label and count above. Clear for adoption rates and percentages.",
    category: "charts",
    keywords: ["waffle chart react", "percentage grid chart", "tailwind waffle chart"],
  },
  "webhook-list": {
    description: "Webhook endpoints list with an Add endpoint button, monospace URLs, subscribed events and an active or paused badge per row. Built for developer settings pages.",
    category: "developer-tools",
    keywords: ["webhook settings ui", "webhook endpoints list", "react developer settings"],
  },
  "welcome-screen": {
    description: "React onboarding welcome card with an eyebrow, headline, short intro, three numbered getting started steps and primary and secondary buttons for a first run.",
    category: "workflow",
    keywords: ["onboarding welcome screen", "react getting started card", "first run experience"],
  },
}
