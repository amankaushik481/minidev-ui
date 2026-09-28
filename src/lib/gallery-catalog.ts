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

export const GALLERY_ENTRIES: GalleryEntry[] = [
  {
    slug: "new",
    label: "New in 0.2",
    category: "featured",
    description: "Interactive chart, toasts, agent runs, inbox",
    premium: false,
  },
  {
    slug: "showcase",
    label: "Client showcase",
    category: "featured",
    description: "Pitch hero, living product mock and scroll chapters.",
    premium: true,
  },
  {
    "slug": "admin",
    "label": "Admin",
    "category": "settings",
    "description": "Org, SSO, quotas",
    "premium": false
  },
  {
    "slug": "ai",
    "label": "AI",
    "category": "ai",
    "description": "Chat, prompts, streaming",
    "premium": false
  },
  {
    "slug": "ai-studio",
    "label": "AI studio",
    "category": "ai",
    "description": "Composer shell, tools, notebook",
    "premium": false
  },
  {
    "slug": "auth",
    "label": "Auth",
    "category": "auth",
    "description": "Sign-in & onboarding",
    "premium": false
  },
  {
    "slug": "billing",
    "label": "Billing",
    "category": "commerce",
    "description": "Plans & invoices",
    "premium": false
  },
  {
    "slug": "blocks",
    "label": "Blocks",
    "category": "blocks",
    "description": "Full page compositions",
    "premium": false
  },
  {
    "slug": "button",
    "label": "Button",
    "category": "forms",
    "description": "Variants & sizes",
    "premium": false
  },
  {
    "slug": "button-group",
    "label": "Button group",
    "category": "forms",
    "description": "Segmented actions",
    "premium": false
  },
  {
    "slug": "charts",
    "label": "Charts",
    "category": "data",
    "description": "Area, bar, line, radar",
    "premium": false
  },
  {
    "slug": "checkbox",
    "label": "Checkbox",
    "category": "forms",
    "description": "Checked states",
    "premium": false
  },
  {
    "slug": "choice-card",
    "label": "Choice card",
    "category": "forms",
    "description": "Selectable cards",
    "premium": false
  },
  {
    "slug": "color-picker",
    "label": "Color picker",
    "category": "forms",
    "description": "Hue & swatches",
    "premium": false
  },
  {
    "slug": "combobox",
    "label": "Combobox",
    "category": "forms",
    "description": "Searchable select",
    "premium": false
  },
  {
    "slug": "commerce",
    "label": "Commerce",
    "category": "commerce",
    "description": "Cart & checkout",
    "premium": false
  },
  {
    "slug": "data-extra",
    "label": "Data extra",
    "category": "data",
    "description": "Heatmap, timeline, more",
    "premium": false
  },
  {
    "slug": "data-table",
    "label": "Data table",
    "category": "data",
    "description": "Sort, filter, bulk",
    "premium": false
  },
  {
    "slug": "date-picker",
    "label": "Date picker",
    "category": "forms",
    "description": "Calendar inputs",
    "premium": false
  },
  {
    "slug": "dropdown-menu",
    "label": "Dropdown",
    "category": "overlays",
    "description": "Menus & actions",
    "premium": false
  },
  {
    "slug": "editors",
    "label": "Editors",
    "category": "media",
    "description": "Code & rich text",
    "premium": false
  },
  {
    "slug": "email",
    "label": "Email",
    "category": "marketing",
    "description": "Layouts & templates",
    "premium": false
  },
  {
    "slug": "engineering",
    "label": "Engineering",
    "category": "workflow",
    "description": "Pipelines, traces, reviews",
    "premium": false
  },
  {
    "slug": "feedback",
    "label": "Feedback",
    "category": "feedback",
    "description": "Toasts, empty, errors",
    "premium": false
  },
  {
    "slug": "feeds",
    "label": "Feeds",
    "category": "data",
    "description": "Activity & notifications",
    "premium": false
  },
  {
    "slug": "file-dropzone",
    "label": "File dropzone",
    "category": "forms",
    "description": "Uploads",
    "premium": false
  },
  {
    "slug": "form-field",
    "label": "Form field",
    "category": "forms",
    "description": "Label + help + error",
    "premium": false
  },
  {
    "slug": "icon-button",
    "label": "Icon button",
    "category": "forms",
    "description": "Compact actions",
    "premium": false
  },
  {
    "slug": "input",
    "label": "Input",
    "category": "forms",
    "description": "Text fields",
    "premium": false
  },
  {
    "slug": "input-affix",
    "label": "Input affix",
    "category": "forms",
    "description": "Prefix & suffix",
    "premium": false
  },
  {
    "slug": "layout",
    "label": "Layout",
    "category": "layout",
    "description": "Shells & grids",
    "premium": false
  },
  {
    "slug": "marketing",
    "label": "Marketing",
    "category": "marketing",
    "description": "Heroes & proof",
    "premium": false
  },
  {
    "slug": "marketing-sections",
    "label": "Marketing sections",
    "category": "marketing",
    "description": "Nav, cards, mega footer",
    "premium": false
  },
  {
    "slug": "navigation",
    "label": "Navigation",
    "category": "navigation",
    "description": "Sidebars & tabs",
    "premium": false
  },
  {
    "slug": "otp-input",
    "label": "OTP",
    "category": "forms",
    "description": "One-time codes",
    "premium": false
  },
  {
    "slug": "overlays",
    "label": "Overlays",
    "category": "overlays",
    "description": "Dialog, sheet, popover",
    "premium": false
  },
  {
    "slug": "premium-heroes",
    "label": "Heroes & marketing",
    "category": "premium",
    "description": "Motion launch heroes",
    "premium": true
  },
  {
    "slug": "premium-motion",
    "label": "Motion",
    "category": "premium",
    "description": "Kinetic type, sticky story, magnetic CTA",
    "premium": true
  },
  {
    "slug": "premium-templates",
    "label": "Page templates",
    "category": "premium",
    "description": "Page kits & landings",
    "premium": true
  },
  {
    "slug": "primitives-extra",
    "label": "Primitives extra",
    "category": "system",
    "description": "Extra atoms",
    "premium": false
  },
  {
    "slug": "radio-group",
    "label": "Radio",
    "category": "forms",
    "description": "Exclusive choice",
    "premium": false
  },
  {
    "slug": "search-input",
    "label": "Search",
    "category": "forms",
    "description": "Find & clear",
    "premium": false
  },
  {
    "slug": "select",
    "label": "Select",
    "category": "forms",
    "description": "Native-feel menus",
    "premium": false
  },
  {
    "slug": "settings",
    "label": "Settings",
    "category": "settings",
    "description": "Account & API",
    "premium": false
  },
  {
    "slug": "shells",
    "label": "Shells",
    "category": "layout",
    "description": "App chrome",
    "premium": false
  },
  {
    "slug": "slider",
    "label": "Slider",
    "category": "forms",
    "description": "Range controls",
    "premium": false
  },
  {
    "slug": "split-button",
    "label": "Split button",
    "category": "forms",
    "description": "Primary + menu",
    "premium": false
  },
  {
    "slug": "stats",
    "label": "Stats",
    "category": "data",
    "description": "KPIs & deltas",
    "premium": false
  },
  {
    "slug": "switch",
    "label": "Switch",
    "category": "forms",
    "description": "Toggle",
    "premium": false
  },
  {
    "slug": "system",
    "label": "System",
    "category": "system",
    "description": "Tokens & a11y",
    "premium": false
  },
  {
    "slug": "tags-input",
    "label": "Tags",
    "category": "forms",
    "description": "Multi value",
    "premium": false
  },
  {
    "slug": "textarea",
    "label": "Textarea",
    "category": "forms",
    "description": "Multiline",
    "premium": false
  },
  {
    "slug": "workflow",
    "label": "Workflow",
    "category": "workflow",
    "description": "Steps & boards",
    "premium": false
  }
]
