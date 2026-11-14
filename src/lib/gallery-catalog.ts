/** Gallery catalog for browse UX */
export type GalleryEntry = {
  slug: string
  label: string
  category: string
  description: string
  premium: boolean
}

export const GALLERY_CATEGORIES = [
  { id: "featured", label: "Featured" },
  { id: "forms", label: "Forms" },
  { id: "data", label: "Data" },
  { id: "navigation", label: "Navigation" },
  { id: "overlays", label: "Overlays" },
  { id: "feedback", label: "Feedback" },
  { id: "ai", label: "AI" },
  { id: "marketing", label: "Marketing" },
  { id: "commerce", label: "Commerce" },
  { id: "auth", label: "Auth" },
  { id: "settings", label: "Settings" },
  { id: "media", label: "Media" },
  { id: "workflow", label: "Workflow" },
  { id: "system", label: "System" },
  { id: "layout", label: "Layout" },
  { id: "premium", label: "Motion" },
  { id: "blocks", label: "Blocks" }
] as const

export const FEATURED_SLUGS = ["new", "showcase", "premium-motion", "premium-heroes", "premium-templates", "ai-studio", "engineering", "marketing-sections", "email", "charts", "blocks"] as const

/** Order drives the index, the prev/next pager on each gallery and the JSON-LD lists. Labels match each page's <h1>. */
export const GALLERY_ENTRIES: GalleryEntry[] = [
  { slug: "new", label: "New in 0.2", category: "featured", description: "Interactive chart, stacked toasts, agent trace, notification inbox", premium: false },
  { slug: "showcase", label: "Showcase kit", category: "featured", description: "Pitch hero, living product mock, scroll chapters, proof panels", premium: true },
  { slug: "admin", label: "Admin", category: "settings", description: "Org switcher, SSO, IP allowlist, quotas, audit filters, bulk import", premium: false },
  { slug: "ai", label: "AI chat", category: "ai", description: "Chat thread, prompt input, citations, tool calls, reasoning, model picker", premium: false },
  { slug: "ai-studio", label: "AI studio", category: "ai", description: "Composer, conversation sidebar, tool results, prompt library, model compare", premium: false },
  { slug: "auth", label: "Auth & onboarding", category: "auth", description: "Sign-in card, social buttons, one-time code, onboarding stepper", premium: false },
  { slug: "billing", label: "Billing", category: "commerce", description: "Pricing table, usage meter, invoice list, upgrade prompt", premium: false },
  { slug: "blocks", label: "Blocks", category: "blocks", description: "Full pages: dashboard home, admin console, engineering console", premium: false },
  { slug: "button", label: "Button", category: "forms", description: "Variants, sizes, loading, disabled, icon-only and RTL", premium: false },
  { slug: "button-group", label: "Button group", category: "forms", description: "Segmented actions and attached toolbars", premium: false },
  { slug: "charts", label: "Charts", category: "data", description: "Area, bar, line, donut, radar, gauge, sparklines, legends", premium: false },
  { slug: "checkbox", label: "Checkbox", category: "forms", description: "Checked, disabled and grouped checkboxes with labels", premium: false },
  { slug: "choice-card", label: "Choice card", category: "forms", description: "Selectable cards for plans and options", premium: false },
  { slug: "color-picker", label: "Color picker", category: "forms", description: "Hue, saturation and swatches", premium: false },
  { slug: "combobox", label: "Combobox & multi-select", category: "forms", description: "Searchable select, autocomplete and multi-select", premium: false },
  { slug: "commerce", label: "Commerce", category: "commerce", description: "Product card, cart line, order summary, wishlist, credits", premium: false },
  { slug: "data-extra", label: "Data filters & metrics", category: "data", description: "Filter bar, facets, chip filters, bulk actions, funnel, heatmap", premium: false },
  { slug: "data-table", label: "Data table", category: "data", description: "Sort, select, bulk actions, pagination, empty and loading states", premium: false },
  { slug: "date-picker", label: "Date & time", category: "forms", description: "Date picker, date range picker and time picker", premium: false },
  { slug: "dropdown-menu", label: "Dropdown menu", category: "overlays", description: "Action menus with shortcuts, plus a split button", premium: false },
  { slug: "editors", label: "Editors & inputs", category: "media", description: "Password, number, currency and phone inputs, mentions, emoji, slash menu", premium: false },
  { slug: "email", label: "Email", category: "marketing", description: "Email layout, header, button, card, welcome and receipt templates", premium: false },
  { slug: "engineering", label: "Engineering", category: "workflow", description: "Query builder, saved views, uptime, incidents, SQL results", premium: false },
  { slug: "feedback", label: "Loading & empty states", category: "feedback", description: "Spinner, skeleton, progress, empty and error states", premium: false },
  { slug: "feeds", label: "Feeds & structure", category: "data", description: "Timeline, activity feed, description list, tree view, kanban", premium: false },
  { slug: "file-dropzone", label: "File dropzone", category: "forms", description: "Drag-and-drop uploads that refuse wrong file types", premium: false },
  { slug: "form-field", label: "Form field", category: "forms", description: "Label, help text and error wired to the input", premium: false },
  { slug: "icon-button", label: "Icon button", category: "forms", description: "Compact icon actions with accessible labels", premium: false },
  { slug: "input", label: "Input", category: "forms", description: "Text fields in every state", premium: false },
  { slug: "input-affix", label: "Input with affix", category: "forms", description: "Prefix and suffix addons for URLs, units and currency", premium: false },
  { slug: "layout", label: "Layout & typography", category: "layout", description: "Container, stack, cluster, heading, text, prose, callout", premium: false },
  { slug: "marketing", label: "Marketing", category: "marketing", description: "Hero, feature grid, testimonial, CTA, FAQ, newsletter", premium: false },
  { slug: "marketing-sections", label: "Marketing sections", category: "marketing", description: "Marketing nav, blog and case study cards, pricing toggle, mega footer", premium: false },
  { slug: "navigation", label: "Navigation menus", category: "navigation", description: "Menubar, navigation menu, carousel, resizable panels", premium: false },
  { slug: "segmented-control", label: "Segmented control", category: "forms", description: "Gliding thumb, arrow keys and badges", premium: false },
  { slug: "otp-input", label: "OTP input", category: "forms", description: "One-time code slots with paste and SMS autofill", premium: false },
  { slug: "overlays", label: "Overlays & alerts", category: "overlays", description: "Dialog, toast, banner and inline alert", premium: false },
  { slug: "premium-heroes", label: "Heroes & marketing", category: "premium", description: "Animated launch heroes, pricing, logo walls, testimonials", premium: true },
  { slug: "premium-motion", label: "Motion", category: "premium", description: "Kinetic type, sticky stories, magnetic CTA, scroll effects", premium: true },
  { slug: "premium-templates", label: "Page templates", category: "premium", description: "Landing, pricing, docs, changelog, careers and blog pages", premium: true },
  { slug: "primitives-extra", label: "Accordion, toggle & kbd", category: "system", description: "Accordion, toggle, toggle group and keyboard keys", premium: false },
  { slug: "radio-group", label: "Radio group", category: "forms", description: "Exclusive choice with labels", premium: false },
  { slug: "search-input", label: "Search input", category: "forms", description: "Search field with labels", premium: false },
  { slug: "select", label: "Select", category: "forms", description: "Single-choice menus with labels", premium: false },
  { slug: "settings", label: "Settings", category: "settings", description: "Settings layout, API keys, danger zone", premium: false },
  { slug: "shells", label: "App shells", category: "layout", description: "App shell, sidebar, topbar, breadcrumb, pagination, command palette", premium: false },
  { slug: "slider", label: "Slider", category: "forms", description: "Single value and range sliders with a value bubble", premium: false },
  { slug: "split-button", label: "Split button", category: "forms", description: "Primary action plus a menu of alternatives", premium: false },
  { slug: "stats", label: "Stats & KPIs", category: "data", description: "KPI row, stat cards, chart cards", premium: false },
  { slug: "switch", label: "Switch", category: "forms", description: "On and off toggles with labels", premium: false },
  { slug: "system", label: "Developer tools", category: "system", description: "Terminal, console output, stack trace, JSON viewer, code frame", premium: false },
  { slug: "tabs", label: "Tabs", category: "navigation", description: "Gliding indicator, badges and keyboard", premium: false },
  { slug: "tags-input", label: "Tags input", category: "forms", description: "Multi-value input with removable tags", premium: false },
  { slug: "textarea", label: "Textarea", category: "forms", description: "Multiline text in every state", premium: false },
  { slug: "workflow", label: "Workflow", category: "workflow", description: "Priority, due date, approvals, assignees, comments, reactions", premium: false },
]
