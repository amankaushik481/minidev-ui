/** Component index for docs + playground */
export type ComponentIndexEntry = {
  name: string
  title: string
  tier: "free" | "premium"
  kind: "ui" | "block" | "premium"
  path: string
  import: string
}

export const COMPONENT_INDEX: ComponentIndexEntry[] = [
  {
    "name": "accordion",
    "title": "Accordion",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/accordion.tsx",
    "import": "@/registry/ui/accordion"
  },
  {
    "name": "account-setup-progress",
    "title": "AccountSetupProgress",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/account-setup-progress.tsx",
    "import": "@/registry/ui/account-setup-progress"
  },
  {
    "name": "activity-feed",
    "title": "ActivityFeed",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/activity-feed.tsx",
    "import": "@/registry/ui/activity-feed"
  },
  {
    "name": "add-card-form",
    "title": "AddCardForm",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/add-card-form.tsx",
    "import": "@/registry/ui/add-card-form"
  },
  {
    "name": "admin-stat-strip",
    "title": "AdminStatStrip",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/admin-stat-strip.tsx",
    "import": "@/registry/ui/admin-stat-strip"
  },
  {
    "name": "admin-user-row",
    "title": "AdminUserRow",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/admin-user-row.tsx",
    "import": "@/registry/ui/admin-user-row"
  },
  {
    "name": "agent-trace",
    "title": "AgentTrace",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/agent-trace.tsx",
    "import": "@/registry/ui/agent-trace"
  },
  {
    "name": "ai-composer",
    "title": "AiComposer",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/ai-composer.tsx",
    "import": "@/registry/ui/ai-composer"
  },
  {
    "name": "alert-dialog",
    "title": "AlertDialog",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/alert-dialog.tsx",
    "import": "@/registry/ui/alert-dialog"
  },
  {
    "name": "announcement-bar",
    "title": "AnnouncementBar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/announcement-bar.tsx",
    "import": "@/registry/ui/announcement-bar"
  },
  {
    "name": "api-key-list",
    "title": "ApiKeyList",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/api-key-list.tsx",
    "import": "@/registry/ui/api-key-list"
  },
  {
    "name": "app-shell",
    "title": "AppShell",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/app-shell.tsx",
    "import": "@/registry/ui/app-shell"
  },
  {
    "name": "approval-card",
    "title": "ApprovalCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/approval-card.tsx",
    "import": "@/registry/ui/approval-card"
  },
  {
    "name": "area-chart",
    "title": "AreaChart",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/area-chart.tsx",
    "import": "@/registry/ui/area-chart"
  },
  {
    "name": "artifact-preview",
    "title": "ArtifactPreview",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/artifact-preview.tsx",
    "import": "@/registry/ui/artifact-preview"
  },
  {
    "name": "aspect-ratio",
    "title": "AspectRatio",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/aspect-ratio.tsx",
    "import": "@/registry/ui/aspect-ratio"
  },
  {
    "name": "assign-picker",
    "title": "AssignPicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/assign-picker.tsx",
    "import": "@/registry/ui/assign-picker"
  },
  {
    "name": "attachment-chip",
    "title": "AttachmentChip",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/attachment-chip.tsx",
    "import": "@/registry/ui/attachment-chip"
  },
  {
    "name": "audio-player",
    "title": "AudioPlayer",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/audio-player.tsx",
    "import": "@/registry/ui/audio-player"
  },
  {
    "name": "audit-filter-bar",
    "title": "AuditFilterBar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/audit-filter-bar.tsx",
    "import": "@/registry/ui/audit-filter-bar"
  },
  {
    "name": "audit-log-entry",
    "title": "AuditLogEntry",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/audit-log-entry.tsx",
    "import": "@/registry/ui/audit-log-entry"
  },
  {
    "name": "audit-trail",
    "title": "AuditTrail",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/audit-trail.tsx",
    "import": "@/registry/ui/audit-trail"
  },
  {
    "name": "auth-card",
    "title": "AuthCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/auth-card.tsx",
    "import": "@/registry/ui/auth-card"
  },
  {
    "name": "autocomplete",
    "title": "Autocomplete",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/autocomplete.tsx",
    "import": "@/registry/ui/autocomplete"
  },
  {
    "name": "avatar-upload",
    "title": "AvatarUpload",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/avatar-upload.tsx",
    "import": "@/registry/ui/avatar-upload"
  },
  {
    "name": "avatar",
    "title": "Avatar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/avatar.tsx",
    "import": "@/registry/ui/avatar"
  },
  {
    "name": "back-link",
    "title": "BackLink",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/back-link.tsx",
    "import": "@/registry/ui/back-link"
  },
  {
    "name": "badge",
    "title": "Badge",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/badge.tsx",
    "import": "@/registry/ui/badge"
  },
  {
    "name": "banner",
    "title": "Banner",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/banner.tsx",
    "import": "@/registry/ui/banner"
  },
  {
    "name": "bar-chart",
    "title": "BarChart",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/bar-chart.tsx",
    "import": "@/registry/ui/bar-chart"
  },
  {
    "name": "billing-address",
    "title": "BillingAddress",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/billing-address.tsx",
    "import": "@/registry/ui/billing-address"
  },
  {
    "name": "blog-card",
    "title": "BlogCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/blog-card.tsx",
    "import": "@/registry/ui/blog-card"
  },
  {
    "name": "breadcrumb-ellipsis",
    "title": "BreadcrumbEllipsis",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/breadcrumb-ellipsis.tsx",
    "import": "@/registry/ui/breadcrumb-ellipsis"
  },
  {
    "name": "breadcrumb",
    "title": "Breadcrumb",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/breadcrumb.tsx",
    "import": "@/registry/ui/breadcrumb"
  },
  {
    "name": "build-pipeline",
    "title": "BuildPipeline",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/build-pipeline.tsx",
    "import": "@/registry/ui/build-pipeline"
  },
  {
    "name": "bulk-actions-bar",
    "title": "BulkActionsBar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/bulk-actions-bar.tsx",
    "import": "@/registry/ui/bulk-actions-bar"
  },
  {
    "name": "bulk-user-import",
    "title": "BulkUserImport",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/bulk-user-import.tsx",
    "import": "@/registry/ui/bulk-user-import"
  },
  {
    "name": "button-group",
    "title": "ButtonGroup",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/button-group.tsx",
    "import": "@/registry/ui/button-group"
  },
  {
    "name": "button",
    "title": "Button",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/button.tsx",
    "import": "@/registry/ui/button"
  },
  {
    "name": "calendar-agenda",
    "title": "CalendarAgenda",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/calendar-agenda.tsx",
    "import": "@/registry/ui/calendar-agenda"
  },
  {
    "name": "calendar-month",
    "title": "CalendarMonth",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/calendar-month.tsx",
    "import": "@/registry/ui/calendar-month"
  },
  {
    "name": "callout",
    "title": "Callout",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/callout.tsx",
    "import": "@/registry/ui/callout"
  },
  {
    "name": "cancel-flow",
    "title": "CancelFlow",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/cancel-flow.tsx",
    "import": "@/registry/ui/cancel-flow"
  },
  {
    "name": "card",
    "title": "Card",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/card.tsx",
    "import": "@/registry/ui/card"
  },
  {
    "name": "carousel",
    "title": "Carousel",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/carousel.tsx",
    "import": "@/registry/ui/carousel"
  },
  {
    "name": "cart-line-item",
    "title": "CartLineItem",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/cart-line-item.tsx",
    "import": "@/registry/ui/cart-line-item"
  },
  {
    "name": "case-study-card",
    "title": "CaseStudyCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/case-study-card.tsx",
    "import": "@/registry/ui/case-study-card"
  },
  {
    "name": "center",
    "title": "Center",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/center.tsx",
    "import": "@/registry/ui/center"
  },
  {
    "name": "character-count",
    "title": "CharacterCount",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/character-count.tsx",
    "import": "@/registry/ui/character-count"
  },
  {
    "name": "chart-card",
    "title": "ChartCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/chart-card.tsx",
    "import": "@/registry/ui/chart-card"
  },
  {
    "name": "chart-legend",
    "title": "ChartLegend",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/chart-legend.tsx",
    "import": "@/registry/ui/chart-legend"
  },
  {
    "name": "chart-tooltip-card",
    "title": "ChartTooltipCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/chart-tooltip-card.tsx",
    "import": "@/registry/ui/chart-tooltip-card"
  },
  {
    "name": "chat-thread",
    "title": "ChatThread",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/chat-thread.tsx",
    "import": "@/registry/ui/chat-thread"
  },
  {
    "name": "check-run-list",
    "title": "CheckRunList",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/check-run-list.tsx",
    "import": "@/registry/ui/check-run-list"
  },
  {
    "name": "checkbox-group",
    "title": "CheckboxGroup",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/checkbox-group.tsx",
    "import": "@/registry/ui/checkbox-group"
  },
  {
    "name": "checkbox",
    "title": "Checkbox",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/checkbox.tsx",
    "import": "@/registry/ui/checkbox"
  },
  {
    "name": "checkout-summary",
    "title": "CheckoutSummary",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/checkout-summary.tsx",
    "import": "@/registry/ui/checkout-summary"
  },
  {
    "name": "chip-filter",
    "title": "ChipFilter",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/chip-filter.tsx",
    "import": "@/registry/ui/chip-filter"
  },
  {
    "name": "choice-card",
    "title": "ChoiceCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/choice-card.tsx",
    "import": "@/registry/ui/choice-card"
  },
  {
    "name": "citation-chip",
    "title": "CitationChip",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/citation-chip.tsx",
    "import": "@/registry/ui/citation-chip"
  },
  {
    "name": "cluster",
    "title": "Cluster",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/cluster.tsx",
    "import": "@/registry/ui/cluster"
  },
  {
    "name": "code-block",
    "title": "CodeBlock",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/code-block.tsx",
    "import": "@/registry/ui/code-block"
  },
  {
    "name": "code-editor-frame",
    "title": "CodeEditorFrame",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/code-editor-frame.tsx",
    "import": "@/registry/ui/code-editor-frame"
  },
  {
    "name": "collapsible-sidebar",
    "title": "CollapsibleSidebar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/collapsible-sidebar.tsx",
    "import": "@/registry/ui/collapsible-sidebar"
  },
  {
    "name": "collapsible",
    "title": "Collapsible",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/collapsible.tsx",
    "import": "@/registry/ui/collapsible"
  },
  {
    "name": "color-picker",
    "title": "ColorPicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/color-picker.tsx",
    "import": "@/registry/ui/color-picker"
  },
  {
    "name": "column-visibility-menu",
    "title": "ColumnVisibilityMenu",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/column-visibility-menu.tsx",
    "import": "@/registry/ui/column-visibility-menu"
  },
  {
    "name": "combobox",
    "title": "Combobox",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/combobox.tsx",
    "import": "@/registry/ui/combobox"
  },
  {
    "name": "command-dialog",
    "title": "CommandDialog",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/command-dialog.tsx",
    "import": "@/registry/ui/command-dialog"
  },
  {
    "name": "command-item",
    "title": "CommandItem",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/command-item.tsx",
    "import": "@/registry/ui/command-item"
  },
  {
    "name": "command-palette",
    "title": "CommandPalette",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/command-palette.tsx",
    "import": "@/registry/ui/command-palette"
  },
  {
    "name": "comment-composer",
    "title": "CommentComposer",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/comment-composer.tsx",
    "import": "@/registry/ui/comment-composer"
  },
  {
    "name": "comment-thread",
    "title": "CommentThread",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/comment-thread.tsx",
    "import": "@/registry/ui/comment-thread"
  },
  {
    "name": "commit-row",
    "title": "CommitRow",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/commit-row.tsx",
    "import": "@/registry/ui/commit-row"
  },
  {
    "name": "comparison-table",
    "title": "ComparisonTable",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/comparison-table.tsx",
    "import": "@/registry/ui/comparison-table"
  },
  {
    "name": "confirm-destructive",
    "title": "ConfirmDestructive",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/confirm-destructive.tsx",
    "import": "@/registry/ui/confirm-destructive"
  },
  {
    "name": "connected-account",
    "title": "ConnectedAccount",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/connected-account.tsx",
    "import": "@/registry/ui/connected-account"
  },
  {
    "name": "console-output",
    "title": "ConsoleOutput",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/console-output.tsx",
    "import": "@/registry/ui/console-output"
  },
  {
    "name": "container",
    "title": "Container",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/container.tsx",
    "import": "@/registry/ui/container"
  },
  {
    "name": "context-chip",
    "title": "ContextChip",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/context-chip.tsx",
    "import": "@/registry/ui/context-chip"
  },
  {
    "name": "context-menu",
    "title": "ContextMenu",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/context-menu.tsx",
    "import": "@/registry/ui/context-menu"
  },
  {
    "name": "context-pill",
    "title": "ContextPill",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/context-pill.tsx",
    "import": "@/registry/ui/context-pill"
  },
  {
    "name": "conversation-sidebar",
    "title": "ConversationSidebar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/conversation-sidebar.tsx",
    "import": "@/registry/ui/conversation-sidebar"
  },
  {
    "name": "cookie-banner",
    "title": "CookieBanner",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/cookie-banner.tsx",
    "import": "@/registry/ui/cookie-banner"
  },
  {
    "name": "copy-button",
    "title": "CopyButton",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/copy-button.tsx",
    "import": "@/registry/ui/copy-button"
  },
  {
    "name": "copy-id",
    "title": "CopyId",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/copy-id.tsx",
    "import": "@/registry/ui/copy-id"
  },
  {
    "name": "coupon-input",
    "title": "CouponInput",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/coupon-input.tsx",
    "import": "@/registry/ui/coupon-input"
  },
  {
    "name": "coverage-meter",
    "title": "CoverageMeter",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/coverage-meter.tsx",
    "import": "@/registry/ui/coverage-meter"
  },
  {
    "name": "create-api-key",
    "title": "CreateApiKey",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/create-api-key.tsx",
    "import": "@/registry/ui/create-api-key"
  },
  {
    "name": "credit-balance",
    "title": "CreditBalance",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/credit-balance.tsx",
    "import": "@/registry/ui/credit-balance"
  },
  {
    "name": "cta-banner",
    "title": "CtaBanner",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/cta-banner.tsx",
    "import": "@/registry/ui/cta-banner"
  },
  {
    "name": "currency-input",
    "title": "CurrencyInput",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/currency-input.tsx",
    "import": "@/registry/ui/currency-input"
  },
  {
    "name": "danger-zone",
    "title": "DangerZone",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/danger-zone.tsx",
    "import": "@/registry/ui/danger-zone"
  },
  {
    "name": "data-table",
    "title": "DataTable",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/data-table.tsx",
    "import": "@/registry/ui/data-table"
  },
  {
    "name": "date-picker",
    "title": "DatePicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/date-picker.tsx",
    "import": "@/registry/ui/date-picker"
  },
  {
    "name": "date-range-picker",
    "title": "DateRangePicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/date-range-picker.tsx",
    "import": "@/registry/ui/date-range-picker"
  },
  {
    "name": "delete-account-confirm",
    "title": "DeleteAccountConfirm",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/delete-account-confirm.tsx",
    "import": "@/registry/ui/delete-account-confirm"
  },
  {
    "name": "density-toggle",
    "title": "DensityToggle",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/density-toggle.tsx",
    "import": "@/registry/ui/density-toggle"
  },
  {
    "name": "description-list",
    "title": "DescriptionList",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/description-list.tsx",
    "import": "@/registry/ui/description-list"
  },
  {
    "name": "dialog",
    "title": "Dialog",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/dialog.tsx",
    "import": "@/registry/ui/dialog"
  },
  {
    "name": "diff-view",
    "title": "DiffView",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/diff-view.tsx",
    "import": "@/registry/ui/diff-view"
  },
  {
    "name": "donut-chart",
    "title": "DonutChart",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/donut-chart.tsx",
    "import": "@/registry/ui/donut-chart"
  },
  {
    "name": "downgrade-warning",
    "title": "DowngradeWarning",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/downgrade-warning.tsx",
    "import": "@/registry/ui/downgrade-warning"
  },
  {
    "name": "drawer",
    "title": "Drawer",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/drawer.tsx",
    "import": "@/registry/ui/drawer"
  },
  {
    "name": "dropdown-menu",
    "title": "DropdownMenu",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/dropdown-menu.tsx",
    "import": "@/registry/ui/dropdown-menu"
  },
  {
    "name": "due-date-chip",
    "title": "DueDateChip",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/due-date-chip.tsx",
    "import": "@/registry/ui/due-date-chip"
  },
  {
    "name": "editable-heading",
    "title": "EditableHeading",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/editable-heading.tsx",
    "import": "@/registry/ui/editable-heading"
  },
  {
    "name": "email-button",
    "title": "EmailButton",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/email-button.tsx",
    "import": "@/registry/ui/email-button"
  },
  {
    "name": "email-card",
    "title": "EmailCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/email-card.tsx",
    "import": "@/registry/ui/email-card"
  },
  {
    "name": "email-footer",
    "title": "EmailFooter",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/email-footer.tsx",
    "import": "@/registry/ui/email-footer"
  },
  {
    "name": "email-header",
    "title": "EmailHeader",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/email-header.tsx",
    "import": "@/registry/ui/email-header"
  },
  {
    "name": "email-layout",
    "title": "EmailLayout",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/email-layout.tsx",
    "import": "@/registry/ui/email-layout"
  },
  {
    "name": "email-preview-frame",
    "title": "EmailPreviewFrame",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/email-preview-frame.tsx",
    "import": "@/registry/ui/email-preview-frame"
  },
  {
    "name": "emoji-picker",
    "title": "EmojiPicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/emoji-picker.tsx",
    "import": "@/registry/ui/emoji-picker"
  },
  {
    "name": "empty-search",
    "title": "EmptySearch",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/empty-search.tsx",
    "import": "@/registry/ui/empty-search"
  },
  {
    "name": "empty-state",
    "title": "EmptyState",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/empty-state.tsx",
    "import": "@/registry/ui/empty-state"
  },
  {
    "name": "empty-table",
    "title": "EmptyTable",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/empty-table.tsx",
    "import": "@/registry/ui/empty-table"
  },
  {
    "name": "env-badge",
    "title": "EnvBadge",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/env-badge.tsx",
    "import": "@/registry/ui/env-badge"
  },
  {
    "name": "env-switcher",
    "title": "EnvSwitcher",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/env-switcher.tsx",
    "import": "@/registry/ui/env-switcher"
  },
  {
    "name": "error-state",
    "title": "ErrorState",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/error-state.tsx",
    "import": "@/registry/ui/error-state"
  },
  {
    "name": "expandable-row",
    "title": "ExpandableRow",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/expandable-row.tsx",
    "import": "@/registry/ui/expandable-row"
  },
  {
    "name": "export-data",
    "title": "ExportData",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/export-data.tsx",
    "import": "@/registry/ui/export-data"
  },
  {
    "name": "facet-filter",
    "title": "FacetFilter",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/facet-filter.tsx",
    "import": "@/registry/ui/facet-filter"
  },
  {
    "name": "faq-list",
    "title": "FaqList",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/faq-list.tsx",
    "import": "@/registry/ui/faq-list"
  },
  {
    "name": "feature-flag-toggle",
    "title": "FeatureFlagToggle",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/feature-flag-toggle.tsx",
    "import": "@/registry/ui/feature-flag-toggle"
  },
  {
    "name": "feature-grid",
    "title": "FeatureGrid",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/feature-grid.tsx",
    "import": "@/registry/ui/feature-grid"
  },
  {
    "name": "feedback-thumbs",
    "title": "FeedbackThumbs",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/feedback-thumbs.tsx",
    "import": "@/registry/ui/feedback-thumbs"
  },
  {
    "name": "file-dropzone",
    "title": "FileDropzone",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/file-dropzone.tsx",
    "import": "@/registry/ui/file-dropzone"
  },
  {
    "name": "file-list",
    "title": "FileList",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/file-list.tsx",
    "import": "@/registry/ui/file-list"
  },
  {
    "name": "file-reference",
    "title": "FileReference",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/file-reference.tsx",
    "import": "@/registry/ui/file-reference"
  },
  {
    "name": "file-row",
    "title": "FileRow",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/file-row.tsx",
    "import": "@/registry/ui/file-row"
  },
  {
    "name": "filter-bar",
    "title": "FilterBar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/filter-bar.tsx",
    "import": "@/registry/ui/filter-bar"
  },
  {
    "name": "floating-action-button",
    "title": "FloatingActionButton",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/floating-action-button.tsx",
    "import": "@/registry/ui/floating-action-button"
  },
  {
    "name": "footer-mega",
    "title": "FooterMega",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/footer-mega.tsx",
    "import": "@/registry/ui/footer-mega"
  },
  {
    "name": "footer-nav",
    "title": "FooterNav",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/footer-nav.tsx",
    "import": "@/registry/ui/footer-nav"
  },
  {
    "name": "forgot-password-form",
    "title": "ForgotPasswordForm",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/forgot-password-form.tsx",
    "import": "@/registry/ui/forgot-password-form"
  },
  {
    "name": "form-field",
    "title": "FormField",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/form-field.tsx",
    "import": "@/registry/ui/form-field"
  },
  {
    "name": "funnel-steps",
    "title": "FunnelSteps",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/funnel-steps.tsx",
    "import": "@/registry/ui/funnel-steps"
  },
  {
    "name": "gantt-row",
    "title": "GanttRow",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/gantt-row.tsx",
    "import": "@/registry/ui/gantt-row"
  },
  {
    "name": "gauge-chart",
    "title": "GaugeChart",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/gauge-chart.tsx",
    "import": "@/registry/ui/gauge-chart"
  },
  {
    "name": "goal-ring",
    "title": "GoalRing",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/goal-ring.tsx",
    "import": "@/registry/ui/goal-ring"
  },
  {
    "name": "heading",
    "title": "Heading",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/heading.tsx",
    "import": "@/registry/ui/heading"
  },
  {
    "name": "health-indicator",
    "title": "HealthIndicator",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/health-indicator.tsx",
    "import": "@/registry/ui/health-indicator"
  },
  {
    "name": "heatmap-cell",
    "title": "HeatmapCell",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/heatmap-cell.tsx",
    "import": "@/registry/ui/heatmap-cell"
  },
  {
    "name": "hero",
    "title": "Hero",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/hero.tsx",
    "import": "@/registry/ui/hero"
  },
  {
    "name": "horizontal-bar-chart",
    "title": "HorizontalBarChart",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/horizontal-bar-chart.tsx",
    "import": "@/registry/ui/horizontal-bar-chart"
  },
  {
    "name": "hover-card",
    "title": "HoverCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/hover-card.tsx",
    "import": "@/registry/ui/hover-card"
  },
  {
    "name": "icon-button",
    "title": "IconButton",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/icon-button.tsx",
    "import": "@/registry/ui/icon-button"
  },
  {
    "name": "image-gallery",
    "title": "ImageGallery",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/image-gallery.tsx",
    "import": "@/registry/ui/image-gallery"
  },
  {
    "name": "image-lightbox",
    "title": "ImageLightbox",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/image-lightbox.tsx",
    "import": "@/registry/ui/image-lightbox"
  },
  {
    "name": "image-upload",
    "title": "ImageUpload",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/image-upload.tsx",
    "import": "@/registry/ui/image-upload"
  },
  {
    "name": "impersonation-banner",
    "title": "ImpersonationBanner",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/impersonation-banner.tsx",
    "import": "@/registry/ui/impersonation-banner"
  },
  {
    "name": "incident-banner",
    "title": "IncidentBanner",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/incident-banner.tsx",
    "import": "@/registry/ui/incident-banner"
  },
  {
    "name": "inline-alert",
    "title": "InlineAlert",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/inline-alert.tsx",
    "import": "@/registry/ui/inline-alert"
  },
  {
    "name": "inline-cell-edit",
    "title": "InlineCellEdit",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/inline-cell-edit.tsx",
    "import": "@/registry/ui/inline-cell-edit"
  },
  {
    "name": "inline-code-diff",
    "title": "InlineCodeDiff",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/inline-code-diff.tsx",
    "import": "@/registry/ui/inline-code-diff"
  },
  {
    "name": "input-affix",
    "title": "InputAffix",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/input-affix.tsx",
    "import": "@/registry/ui/input-affix"
  },
  {
    "name": "input",
    "title": "Input",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/input.tsx",
    "import": "@/registry/ui/input"
  },
  {
    "name": "inset",
    "title": "Inset",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/inset.tsx",
    "import": "@/registry/ui/inset"
  },
  {
    "name": "integration-card",
    "title": "IntegrationCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/integration-card.tsx",
    "import": "@/registry/ui/integration-card"
  },
  {
    "name": "invite-members",
    "title": "InviteMembers",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/invite-members.tsx",
    "import": "@/registry/ui/invite-members"
  },
  {
    "name": "invoice-detail",
    "title": "InvoiceDetail",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/invoice-detail.tsx",
    "import": "@/registry/ui/invoice-detail"
  },
  {
    "name": "invoice-list",
    "title": "InvoiceList",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/invoice-list.tsx",
    "import": "@/registry/ui/invoice-list"
  },
  {
    "name": "ip-allowlist",
    "title": "IpAllowlist",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/ip-allowlist.tsx",
    "import": "@/registry/ui/ip-allowlist"
  },
  {
    "name": "issue-card",
    "title": "IssueCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/issue-card.tsx",
    "import": "@/registry/ui/issue-card"
  },
  {
    "name": "issue-key",
    "title": "IssueKey",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/issue-key.tsx",
    "import": "@/registry/ui/issue-key"
  },
  {
    "name": "join-workspace",
    "title": "JoinWorkspace",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/join-workspace.tsx",
    "import": "@/registry/ui/join-workspace"
  },
  {
    "name": "json-viewer",
    "title": "JsonViewer",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/json-viewer.tsx",
    "import": "@/registry/ui/json-viewer"
  },
  {
    "name": "kanban-board",
    "title": "KanbanBoard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/kanban-board.tsx",
    "import": "@/registry/ui/kanban-board"
  },
  {
    "name": "kanban-column",
    "title": "KanbanColumn",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/kanban-column.tsx",
    "import": "@/registry/ui/kanban-column"
  },
  {
    "name": "kbd",
    "title": "Kbd",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/kbd.tsx",
    "import": "@/registry/ui/kbd"
  },
  {
    "name": "kpi-row",
    "title": "KpiRow",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/kpi-row.tsx",
    "import": "@/registry/ui/kpi-row"
  },
  {
    "name": "label",
    "title": "Label",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/label.tsx",
    "import": "@/registry/ui/label"
  },
  {
    "name": "language-picker",
    "title": "LanguagePicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/language-picker.tsx",
    "import": "@/registry/ui/language-picker"
  },
  {
    "name": "latency-badge",
    "title": "LatencyBadge",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/latency-badge.tsx",
    "import": "@/registry/ui/latency-badge"
  },
  {
    "name": "line-chart",
    "title": "LineChart",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/line-chart.tsx",
    "import": "@/registry/ui/line-chart"
  },
  {
    "name": "link-preview",
    "title": "LinkPreview",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/link-preview.tsx",
    "import": "@/registry/ui/link-preview"
  },
  {
    "name": "link",
    "title": "Link",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/link.tsx",
    "import": "@/registry/ui/link"
  },
  {
    "name": "list-item",
    "title": "ListItem",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/list-item.tsx",
    "import": "@/registry/ui/list-item"
  },
  {
    "name": "live-cursors-bar",
    "title": "LiveCursorsBar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/live-cursors-bar.tsx",
    "import": "@/registry/ui/live-cursors-bar"
  },
  {
    "name": "loading-overlay",
    "title": "LoadingOverlay",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/loading-overlay.tsx",
    "import": "@/registry/ui/loading-overlay"
  },
  {
    "name": "loading-table",
    "title": "LoadingTable",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/loading-table.tsx",
    "import": "@/registry/ui/loading-table"
  },
  {
    "name": "logo-cloud",
    "title": "LogoCloud",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/logo-cloud.tsx",
    "import": "@/registry/ui/logo-cloud"
  },
  {
    "name": "magic-link-form",
    "title": "MagicLinkForm",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/magic-link-form.tsx",
    "import": "@/registry/ui/magic-link-form"
  },
  {
    "name": "markdown-renderer",
    "title": "MarkdownRenderer",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/markdown-renderer.tsx",
    "import": "@/registry/ui/markdown-renderer"
  },
  {
    "name": "marquee",
    "title": "Marquee",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/marquee.tsx",
    "import": "@/registry/ui/marquee"
  },
  {
    "name": "mention-input",
    "title": "MentionInput",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/mention-input.tsx",
    "import": "@/registry/ui/mention-input"
  },
  {
    "name": "menubar",
    "title": "Menubar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/menubar.tsx",
    "import": "@/registry/ui/menubar"
  },
  {
    "name": "merge-box",
    "title": "MergeBox",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/merge-box.tsx",
    "import": "@/registry/ui/merge-box"
  },
  {
    "name": "message-actions",
    "title": "MessageActions",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/message-actions.tsx",
    "import": "@/registry/ui/message-actions"
  },
  {
    "name": "message-bubble",
    "title": "MessageBubble",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/message-bubble.tsx",
    "import": "@/registry/ui/message-bubble"
  },
  {
    "name": "meter",
    "title": "Meter",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/meter.tsx",
    "import": "@/registry/ui/meter"
  },
  {
    "name": "metric-delta",
    "title": "MetricDelta",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/metric-delta.tsx",
    "import": "@/registry/ui/metric-delta"
  },
  {
    "name": "mobile-action-sheet",
    "title": "MobileActionSheet",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/mobile-action-sheet.tsx",
    "import": "@/registry/ui/mobile-action-sheet"
  },
  {
    "name": "mobile-nav-drawer",
    "title": "MobileNavDrawer",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/mobile-nav-drawer.tsx",
    "import": "@/registry/ui/mobile-nav-drawer"
  },
  {
    "name": "model-compare",
    "title": "ModelCompare",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/model-compare.tsx",
    "import": "@/registry/ui/model-compare"
  },
  {
    "name": "model-picker",
    "title": "ModelPicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/model-picker.tsx",
    "import": "@/registry/ui/model-picker"
  },
  {
    "name": "multi-select",
    "title": "MultiSelect",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/multi-select.tsx",
    "import": "@/registry/ui/multi-select"
  },
  {
    "name": "nav-marketing",
    "title": "NavMarketing",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/nav-marketing.tsx",
    "import": "@/registry/ui/nav-marketing"
  },
  {
    "name": "navigation-menu",
    "title": "NavigationMenu",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/navigation-menu.tsx",
    "import": "@/registry/ui/navigation-menu"
  },
  {
    "name": "nested-nav",
    "title": "NestedNav",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/nested-nav.tsx",
    "import": "@/registry/ui/nested-nav"
  },
  {
    "name": "newsletter-signup",
    "title": "NewsletterSignup",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/newsletter-signup.tsx",
    "import": "@/registry/ui/newsletter-signup"
  },
  {
    "name": "not-found-state",
    "title": "NotFoundState",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/not-found-state.tsx",
    "import": "@/registry/ui/not-found-state"
  },
  {
    "name": "notebook-cell",
    "title": "NotebookCell",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/notebook-cell.tsx",
    "import": "@/registry/ui/notebook-cell"
  },
  {
    "name": "notification-item",
    "title": "NotificationItem",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/notification-item.tsx",
    "import": "@/registry/ui/notification-item"
  },
  {
    "name": "notification-preferences",
    "title": "NotificationPreferences",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/notification-preferences.tsx",
    "import": "@/registry/ui/notification-preferences"
  },
  {
    "name": "number-input",
    "title": "NumberInput",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/number-input.tsx",
    "import": "@/registry/ui/number-input"
  },
  {
    "name": "offline-banner",
    "title": "OfflineBanner",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/offline-banner.tsx",
    "import": "@/registry/ui/offline-banner"
  },
  {
    "name": "offline-state",
    "title": "OfflineState",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/offline-state.tsx",
    "import": "@/registry/ui/offline-state"
  },
  {
    "name": "onboarding-checklist",
    "title": "OnboardingChecklist",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/onboarding-checklist.tsx",
    "import": "@/registry/ui/onboarding-checklist"
  },
  {
    "name": "onboarding-wizard",
    "title": "OnboardingWizard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/onboarding-wizard.tsx",
    "import": "@/registry/ui/onboarding-wizard"
  },
  {
    "name": "order-summary",
    "title": "OrderSummary",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/order-summary.tsx",
    "import": "@/registry/ui/order-summary"
  },
  {
    "name": "org-switcher",
    "title": "OrgSwitcher",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/org-switcher.tsx",
    "import": "@/registry/ui/org-switcher"
  },
  {
    "name": "otp-input",
    "title": "OtpInput",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/otp-input.tsx",
    "import": "@/registry/ui/otp-input"
  },
  {
    "name": "page-header",
    "title": "PageHeader",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/page-header.tsx",
    "import": "@/registry/ui/page-header"
  },
  {
    "name": "pagination",
    "title": "Pagination",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/pagination.tsx",
    "import": "@/registry/ui/pagination"
  },
  {
    "name": "password-input",
    "title": "PasswordInput",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/password-input.tsx",
    "import": "@/registry/ui/password-input"
  },
  {
    "name": "payment-method-card",
    "title": "PaymentMethodCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/payment-method-card.tsx",
    "import": "@/registry/ui/payment-method-card"
  },
  {
    "name": "peek-panel",
    "title": "PeekPanel",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/peek-panel.tsx",
    "import": "@/registry/ui/peek-panel"
  },
  {
    "name": "permission-chip",
    "title": "PermissionChip",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/permission-chip.tsx",
    "import": "@/registry/ui/permission-chip"
  },
  {
    "name": "permission-denied",
    "title": "PermissionDenied",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/permission-denied.tsx",
    "import": "@/registry/ui/permission-denied"
  },
  {
    "name": "phone-input",
    "title": "PhoneInput",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/phone-input.tsx",
    "import": "@/registry/ui/phone-input"
  },
  {
    "name": "pinned-message",
    "title": "PinnedMessage",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/pinned-message.tsx",
    "import": "@/registry/ui/pinned-message"
  },
  {
    "name": "plan-card",
    "title": "PlanCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/plan-card.tsx",
    "import": "@/registry/ui/plan-card"
  },
  {
    "name": "plan-comparison",
    "title": "PlanComparison",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/plan-comparison.tsx",
    "import": "@/registry/ui/plan-comparison"
  },
  {
    "name": "popover",
    "title": "Popover",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/popover.tsx",
    "import": "@/registry/ui/popover"
  },
  {
    "name": "presence-dot",
    "title": "PresenceDot",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/presence-dot.tsx",
    "import": "@/registry/ui/presence-dot"
  },
  {
    "name": "press-quote",
    "title": "PressQuote",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/press-quote.tsx",
    "import": "@/registry/ui/press-quote"
  },
  {
    "name": "pricing-table",
    "title": "PricingTable",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/pricing-table.tsx",
    "import": "@/registry/ui/pricing-table"
  },
  {
    "name": "pricing-toggle",
    "title": "PricingToggle",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/pricing-toggle.tsx",
    "import": "@/registry/ui/pricing-toggle"
  },
  {
    "name": "priority-picker",
    "title": "PriorityPicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/priority-picker.tsx",
    "import": "@/registry/ui/priority-picker"
  },
  {
    "name": "product-card",
    "title": "ProductCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/product-card.tsx",
    "import": "@/registry/ui/product-card"
  },
  {
    "name": "profile-form",
    "title": "ProfileForm",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/profile-form.tsx",
    "import": "@/registry/ui/profile-form"
  },
  {
    "name": "progress-circle",
    "title": "ProgressCircle",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/progress-circle.tsx",
    "import": "@/registry/ui/progress-circle"
  },
  {
    "name": "progress",
    "title": "Progress",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/progress.tsx",
    "import": "@/registry/ui/progress"
  },
  {
    "name": "prompt-input-attachments",
    "title": "PromptInputAttachments",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/prompt-input-attachments.tsx",
    "import": "@/registry/ui/prompt-input-attachments"
  },
  {
    "name": "prompt-input",
    "title": "PromptInput",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/prompt-input.tsx",
    "import": "@/registry/ui/prompt-input"
  },
  {
    "name": "prompt-library",
    "title": "PromptLibrary",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/prompt-library.tsx",
    "import": "@/registry/ui/prompt-library"
  },
  {
    "name": "prose",
    "title": "Prose",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/prose.tsx",
    "import": "@/registry/ui/prose"
  },
  {
    "name": "publish-bar",
    "title": "PublishBar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/publish-bar.tsx",
    "import": "@/registry/ui/publish-bar"
  },
  {
    "name": "quantity-stepper",
    "title": "QuantityStepper",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/quantity-stepper.tsx",
    "import": "@/registry/ui/quantity-stepper"
  },
  {
    "name": "query-builder",
    "title": "QueryBuilder",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/query-builder.tsx",
    "import": "@/registry/ui/query-builder"
  },
  {
    "name": "quota-bar",
    "title": "QuotaBar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/quota-bar.tsx",
    "import": "@/registry/ui/quota-bar"
  },
  {
    "name": "radar-chart",
    "title": "RadarChart",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/radar-chart.tsx",
    "import": "@/registry/ui/radar-chart"
  },
  {
    "name": "radio-group",
    "title": "RadioGroup",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/radio-group.tsx",
    "import": "@/registry/ui/radio-group"
  },
  {
    "name": "range-slider",
    "title": "RangeSlider",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/range-slider.tsx",
    "import": "@/registry/ui/range-slider"
  },
  {
    "name": "rating",
    "title": "Rating",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/rating.tsx",
    "import": "@/registry/ui/rating"
  },
  {
    "name": "reaction-bar",
    "title": "ReactionBar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/reaction-bar.tsx",
    "import": "@/registry/ui/reaction-bar"
  },
  {
    "name": "read-receipt",
    "title": "ReadReceipt",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/read-receipt.tsx",
    "import": "@/registry/ui/read-receipt"
  },
  {
    "name": "reasoning-block",
    "title": "ReasoningBlock",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/reasoning-block.tsx",
    "import": "@/registry/ui/reasoning-block"
  },
  {
    "name": "receipt",
    "title": "Receipt",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/receipt.tsx",
    "import": "@/registry/ui/receipt"
  },
  {
    "name": "regenerate-bar",
    "title": "RegenerateBar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/regenerate-bar.tsx",
    "import": "@/registry/ui/regenerate-bar"
  },
  {
    "name": "region-picker",
    "title": "RegionPicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/region-picker.tsx",
    "import": "@/registry/ui/region-picker"
  },
  {
    "name": "relative-time",
    "title": "RelativeTime",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/relative-time.tsx",
    "import": "@/registry/ui/relative-time"
  },
  {
    "name": "reset-password-form",
    "title": "ResetPasswordForm",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/reset-password-form.tsx",
    "import": "@/registry/ui/reset-password-form"
  },
  {
    "name": "resizable-panels",
    "title": "ResizablePanels",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/resizable-panels.tsx",
    "import": "@/registry/ui/resizable-panels"
  },
  {
    "name": "resource-quota-grid",
    "title": "ResourceQuotaGrid",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/resource-quota-grid.tsx",
    "import": "@/registry/ui/resource-quota-grid"
  },
  {
    "name": "retry-block",
    "title": "RetryBlock",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/retry-block.tsx",
    "import": "@/registry/ui/retry-block"
  },
  {
    "name": "review-request-card",
    "title": "ReviewRequestCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/review-request-card.tsx",
    "import": "@/registry/ui/review-request-card"
  },
  {
    "name": "rich-text-toolbar",
    "title": "RichTextToolbar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/rich-text-toolbar.tsx",
    "import": "@/registry/ui/rich-text-toolbar"
  },
  {
    "name": "role-permission-matrix",
    "title": "RolePermissionMatrix",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/role-permission-matrix.tsx",
    "import": "@/registry/ui/role-permission-matrix"
  },
  {
    "name": "role-picker",
    "title": "RolePicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/role-picker.tsx",
    "import": "@/registry/ui/role-picker"
  },
  {
    "name": "row-selection",
    "title": "RowSelection",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/row-selection.tsx",
    "import": "@/registry/ui/row-selection"
  },
  {
    "name": "saved-views",
    "title": "SavedViews",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/saved-views.tsx",
    "import": "@/registry/ui/saved-views"
  },
  {
    "name": "schema-field-row",
    "title": "SchemaFieldRow",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/schema-field-row.tsx",
    "import": "@/registry/ui/schema-field-row"
  },
  {
    "name": "scroll-area",
    "title": "ScrollArea",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/scroll-area.tsx",
    "import": "@/registry/ui/scroll-area"
  },
  {
    "name": "search-input",
    "title": "SearchInput",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/search-input.tsx",
    "import": "@/registry/ui/search-input"
  },
  {
    "name": "search-with-results",
    "title": "SearchWithResults",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/search-with-results.tsx",
    "import": "@/registry/ui/search-with-results"
  },
  {
    "name": "seat-manager",
    "title": "SeatManager",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/seat-manager.tsx",
    "import": "@/registry/ui/seat-manager"
  },
  {
    "name": "secret-reveal",
    "title": "SecretReveal",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/secret-reveal.tsx",
    "import": "@/registry/ui/secret-reveal"
  },
  {
    "name": "section-header",
    "title": "SectionHeader",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/section-header.tsx",
    "import": "@/registry/ui/section-header"
  },
  {
    "name": "segmented-control",
    "title": "SegmentedControl",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/segmented-control.tsx",
    "import": "@/registry/ui/segmented-control"
  },
  {
    "name": "select",
    "title": "Select",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/select.tsx",
    "import": "@/registry/ui/select"
  },
  {
    "name": "separator",
    "title": "Separator",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/separator.tsx",
    "import": "@/registry/ui/separator"
  },
  {
    "name": "server-error-state",
    "title": "ServerErrorState",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/server-error-state.tsx",
    "import": "@/registry/ui/server-error-state"
  },
  {
    "name": "session-list",
    "title": "SessionList",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/session-list.tsx",
    "import": "@/registry/ui/session-list"
  },
  {
    "name": "settings-layout",
    "title": "SettingsLayout",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/settings-layout.tsx",
    "import": "@/registry/ui/settings-layout"
  },
  {
    "name": "sheet",
    "title": "Sheet",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/sheet.tsx",
    "import": "@/registry/ui/sheet"
  },
  {
    "name": "shipping-address",
    "title": "ShippingAddress",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/shipping-address.tsx",
    "import": "@/registry/ui/shipping-address"
  },
  {
    "name": "shortcut-cheat-sheet",
    "title": "ShortcutCheatSheet",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/shortcut-cheat-sheet.tsx",
    "import": "@/registry/ui/shortcut-cheat-sheet"
  },
  {
    "name": "sidebar-section",
    "title": "SidebarSection",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/sidebar-section.tsx",
    "import": "@/registry/ui/sidebar-section"
  },
  {
    "name": "sidebar",
    "title": "Sidebar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/sidebar.tsx",
    "import": "@/registry/ui/sidebar"
  },
  {
    "name": "sign-up-form",
    "title": "SignUpForm",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/sign-up-form.tsx",
    "import": "@/registry/ui/sign-up-form"
  },
  {
    "name": "skeleton",
    "title": "Skeleton",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/skeleton.tsx",
    "import": "@/registry/ui/skeleton"
  },
  {
    "name": "skip-link",
    "title": "SkipLink",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/skip-link.tsx",
    "import": "@/registry/ui/skip-link"
  },
  {
    "name": "slash-command-menu",
    "title": "SlashCommandMenu",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/slash-command-menu.tsx",
    "import": "@/registry/ui/slash-command-menu"
  },
  {
    "name": "slider",
    "title": "Slider",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/slider.tsx",
    "import": "@/registry/ui/slider"
  },
  {
    "name": "social-auth-row",
    "title": "SocialAuthRow",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/social-auth-row.tsx",
    "import": "@/registry/ui/social-auth-row"
  },
  {
    "name": "social-proof",
    "title": "SocialProof",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/social-proof.tsx",
    "import": "@/registry/ui/social-proof"
  },
  {
    "name": "sortable-header",
    "title": "SortableHeader",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/sortable-header.tsx",
    "import": "@/registry/ui/sortable-header"
  },
  {
    "name": "source-card",
    "title": "SourceCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/source-card.tsx",
    "import": "@/registry/ui/source-card"
  },
  {
    "name": "sparkline-set",
    "title": "SparklineSet",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/sparkline-set.tsx",
    "import": "@/registry/ui/sparkline-set"
  },
  {
    "name": "spinner",
    "title": "Spinner",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/spinner.tsx",
    "import": "@/registry/ui/spinner"
  },
  {
    "name": "split-button",
    "title": "SplitButton",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/split-button.tsx",
    "import": "@/registry/ui/split-button"
  },
  {
    "name": "split-pane",
    "title": "SplitPane",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/split-pane.tsx",
    "import": "@/registry/ui/split-pane"
  },
  {
    "name": "sql-result-table",
    "title": "SqlResultTable",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/sql-result-table.tsx",
    "import": "@/registry/ui/sql-result-table"
  },
  {
    "name": "sso-provider-card",
    "title": "SsoProviderCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/sso-provider-card.tsx",
    "import": "@/registry/ui/sso-provider-card"
  },
  {
    "name": "stack-trace",
    "title": "StackTrace",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/stack-trace.tsx",
    "import": "@/registry/ui/stack-trace"
  },
  {
    "name": "stack",
    "title": "Stack",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/stack.tsx",
    "import": "@/registry/ui/stack"
  },
  {
    "name": "stacked-bar-chart",
    "title": "StackedBarChart",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/stacked-bar-chart.tsx",
    "import": "@/registry/ui/stacked-bar-chart"
  },
  {
    "name": "stat-card",
    "title": "StatCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/stat-card.tsx",
    "import": "@/registry/ui/stat-card"
  },
  {
    "name": "stat-sparkline",
    "title": "StatSparkline",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/stat-sparkline.tsx",
    "import": "@/registry/ui/stat-sparkline"
  },
  {
    "name": "stats-strip",
    "title": "StatsStrip",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/stats-strip.tsx",
    "import": "@/registry/ui/stats-strip"
  },
  {
    "name": "status-badge",
    "title": "StatusBadge",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/status-badge.tsx",
    "import": "@/registry/ui/status-badge"
  },
  {
    "name": "status-dot",
    "title": "StatusDot",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/status-dot.tsx",
    "import": "@/registry/ui/status-dot"
  },
  {
    "name": "step-progress",
    "title": "StepProgress",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/step-progress.tsx",
    "import": "@/registry/ui/step-progress"
  },
  {
    "name": "stepper",
    "title": "Stepper",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/stepper.tsx",
    "import": "@/registry/ui/stepper"
  },
  {
    "name": "sticky-bar",
    "title": "StickyBar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/sticky-bar.tsx",
    "import": "@/registry/ui/sticky-bar"
  },
  {
    "name": "sticky-column",
    "title": "StickyColumn",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/sticky-column.tsx",
    "import": "@/registry/ui/sticky-column"
  },
  {
    "name": "stop-generating",
    "title": "StopGenerating",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/stop-generating.tsx",
    "import": "@/registry/ui/stop-generating"
  },
  {
    "name": "streak-calendar",
    "title": "StreakCalendar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/streak-calendar.tsx",
    "import": "@/registry/ui/streak-calendar"
  },
  {
    "name": "streaming-cursor",
    "title": "StreamingCursor",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/streaming-cursor.tsx",
    "import": "@/registry/ui/streaming-cursor"
  },
  {
    "name": "streaming-message",
    "title": "StreamingMessage",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/streaming-message.tsx",
    "import": "@/registry/ui/streaming-message"
  },
  {
    "name": "suggestion-chips",
    "title": "SuggestionChips",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/suggestion-chips.tsx",
    "import": "@/registry/ui/suggestion-chips"
  },
  {
    "name": "switch",
    "title": "Switch",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/switch.tsx",
    "import": "@/registry/ui/switch"
  },
  {
    "name": "table-pagination",
    "title": "TablePagination",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/table-pagination.tsx",
    "import": "@/registry/ui/table-pagination"
  },
  {
    "name": "table-toolbar",
    "title": "TableToolbar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/table-toolbar.tsx",
    "import": "@/registry/ui/table-toolbar"
  },
  {
    "name": "table",
    "title": "Table",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/table.tsx",
    "import": "@/registry/ui/table"
  },
  {
    "name": "tabs",
    "title": "Tabs",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/tabs.tsx",
    "import": "@/registry/ui/tabs"
  },
  {
    "name": "tags-input",
    "title": "TagsInput",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/tags-input.tsx",
    "import": "@/registry/ui/tags-input"
  },
  {
    "name": "tax-fields",
    "title": "TaxFields",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/tax-fields.tsx",
    "import": "@/registry/ui/tax-fields"
  },
  {
    "name": "team-member-row",
    "title": "TeamMemberRow",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/team-member-row.tsx",
    "import": "@/registry/ui/team-member-row"
  },
  {
    "name": "terminal-window",
    "title": "TerminalWindow",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/terminal-window.tsx",
    "import": "@/registry/ui/terminal-window"
  },
  {
    "name": "testimonial",
    "title": "Testimonial",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/testimonial.tsx",
    "import": "@/registry/ui/testimonial"
  },
  {
    "name": "text",
    "title": "Text",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/text.tsx",
    "import": "@/registry/ui/text"
  },
  {
    "name": "textarea",
    "title": "Textarea",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/textarea.tsx",
    "import": "@/registry/ui/textarea"
  },
  {
    "name": "theme-picker",
    "title": "ThemePicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/theme-picker.tsx",
    "import": "@/registry/ui/theme-picker"
  },
  {
    "name": "thinking-block",
    "title": "ThinkingBlock",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/thinking-block.tsx",
    "import": "@/registry/ui/thinking-block"
  },
  {
    "name": "time-picker",
    "title": "TimePicker",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/time-picker.tsx",
    "import": "@/registry/ui/time-picker"
  },
  {
    "name": "timeline",
    "title": "Timeline",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/timeline.tsx",
    "import": "@/registry/ui/timeline"
  },
  {
    "name": "toast",
    "title": "Toast",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/toast.tsx",
    "import": "@/registry/ui/toast"
  },
  {
    "name": "toc",
    "title": "Toc",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/toc.tsx",
    "import": "@/registry/ui/toc"
  },
  {
    "name": "toggle-group",
    "title": "ToggleGroup",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/toggle-group.tsx",
    "import": "@/registry/ui/toggle-group"
  },
  {
    "name": "toggle",
    "title": "Toggle",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/toggle.tsx",
    "import": "@/registry/ui/toggle"
  },
  {
    "name": "token-usage-meter",
    "title": "TokenUsageMeter",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/token-usage-meter.tsx",
    "import": "@/registry/ui/token-usage-meter"
  },
  {
    "name": "tool-call-card",
    "title": "ToolCallCard",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/tool-call-card.tsx",
    "import": "@/registry/ui/tool-call-card"
  },
  {
    "name": "tool-call-collapsed",
    "title": "ToolCallCollapsed",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/tool-call-collapsed.tsx",
    "import": "@/registry/ui/tool-call-collapsed"
  },
  {
    "name": "tool-result-panel",
    "title": "ToolResultPanel",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/tool-result-panel.tsx",
    "import": "@/registry/ui/tool-result-panel"
  },
  {
    "name": "tooltip",
    "title": "Tooltip",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/tooltip.tsx",
    "import": "@/registry/ui/tooltip"
  },
  {
    "name": "topbar",
    "title": "Topbar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/topbar.tsx",
    "import": "@/registry/ui/topbar"
  },
  {
    "name": "trace-waterfall",
    "title": "TraceWaterfall",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/trace-waterfall.tsx",
    "import": "@/registry/ui/trace-waterfall"
  },
  {
    "name": "tree-view",
    "title": "TreeView",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/tree-view.tsx",
    "import": "@/registry/ui/tree-view"
  },
  {
    "name": "trial-banner",
    "title": "TrialBanner",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/trial-banner.tsx",
    "import": "@/registry/ui/trial-banner"
  },
  {
    "name": "two-factor-setup",
    "title": "TwoFactorSetup",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/two-factor-setup.tsx",
    "import": "@/registry/ui/two-factor-setup"
  },
  {
    "name": "two-factor-verify",
    "title": "TwoFactorVerify",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/two-factor-verify.tsx",
    "import": "@/registry/ui/two-factor-verify"
  },
  {
    "name": "typing-indicator",
    "title": "TypingIndicator",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/typing-indicator.tsx",
    "import": "@/registry/ui/typing-indicator"
  },
  {
    "name": "upgrade-prompt",
    "title": "UpgradePrompt",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/upgrade-prompt.tsx",
    "import": "@/registry/ui/upgrade-prompt"
  },
  {
    "name": "uptime-bar",
    "title": "UptimeBar",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/uptime-bar.tsx",
    "import": "@/registry/ui/uptime-bar"
  },
  {
    "name": "usage-breakdown",
    "title": "UsageBreakdown",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/usage-breakdown.tsx",
    "import": "@/registry/ui/usage-breakdown"
  },
  {
    "name": "usage-meter",
    "title": "UsageMeter",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/usage-meter.tsx",
    "import": "@/registry/ui/usage-meter"
  },
  {
    "name": "user-chip",
    "title": "UserChip",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/user-chip.tsx",
    "import": "@/registry/ui/user-chip"
  },
  {
    "name": "version-badge",
    "title": "VersionBadge",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/version-badge.tsx",
    "import": "@/registry/ui/version-badge"
  },
  {
    "name": "vertical-tabs",
    "title": "VerticalTabs",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/vertical-tabs.tsx",
    "import": "@/registry/ui/vertical-tabs"
  },
  {
    "name": "video-player-chrome",
    "title": "VideoPlayerChrome",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/video-player-chrome.tsx",
    "import": "@/registry/ui/video-player-chrome"
  },
  {
    "name": "virtualized-list",
    "title": "VirtualizedList",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/virtualized-list.tsx",
    "import": "@/registry/ui/virtualized-list"
  },
  {
    "name": "visually-hidden",
    "title": "VisuallyHidden",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/visually-hidden.tsx",
    "import": "@/registry/ui/visually-hidden"
  },
  {
    "name": "vote-control",
    "title": "VoteControl",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/vote-control.tsx",
    "import": "@/registry/ui/vote-control"
  },
  {
    "name": "waffle-chart",
    "title": "WaffleChart",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/waffle-chart.tsx",
    "import": "@/registry/ui/waffle-chart"
  },
  {
    "name": "webhook-list",
    "title": "WebhookList",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/webhook-list.tsx",
    "import": "@/registry/ui/webhook-list"
  },
  {
    "name": "welcome-screen",
    "title": "WelcomeScreen",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/welcome-screen.tsx",
    "import": "@/registry/ui/welcome-screen"
  },
  {
    "name": "well",
    "title": "Well",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/well.tsx",
    "import": "@/registry/ui/well"
  },
  {
    "name": "window-chrome",
    "title": "WindowChrome",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/window-chrome.tsx",
    "import": "@/registry/ui/window-chrome"
  },
  {
    "name": "wishlist-button",
    "title": "WishlistButton",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/wishlist-button.tsx",
    "import": "@/registry/ui/wishlist-button"
  },
  {
    "name": "workspace-create",
    "title": "WorkspaceCreate",
    "tier": "free",
    "kind": "ui",
    "path": "src/registry/ui/workspace-create.tsx",
    "import": "@/registry/ui/workspace-create"
  },
  {
    "name": "admin-console",
    "title": "AdminConsole",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/admin-console.tsx",
    "import": "@/registry/blocks/admin-console"
  },
  {
    "name": "admin-overview",
    "title": "AdminOverview",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/admin-overview.tsx",
    "import": "@/registry/blocks/admin-overview"
  },
  {
    "name": "analytics-page",
    "title": "AnalyticsPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/analytics-page.tsx",
    "import": "@/registry/blocks/analytics-page"
  },
  {
    "name": "api-docs-page",
    "title": "ApiDocsPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/api-docs-page.tsx",
    "import": "@/registry/blocks/api-docs-page"
  },
  {
    "name": "billing-page",
    "title": "BillingPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/billing-page.tsx",
    "import": "@/registry/blocks/billing-page"
  },
  {
    "name": "changelog-page",
    "title": "ChangelogPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/changelog-page.tsx",
    "import": "@/registry/blocks/changelog-page"
  },
  {
    "name": "chat-page",
    "title": "ChatPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/chat-page.tsx",
    "import": "@/registry/blocks/chat-page"
  },
  {
    "name": "command-center",
    "title": "CommandCenter",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/command-center.tsx",
    "import": "@/registry/blocks/command-center"
  },
  {
    "name": "commerce-checkout",
    "title": "CommerceCheckout",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/commerce-checkout.tsx",
    "import": "@/registry/blocks/commerce-checkout"
  },
  {
    "name": "dashboard-home",
    "title": "DashboardHome",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/dashboard-home.tsx",
    "import": "@/registry/blocks/dashboard-home"
  },
  {
    "name": "docs-page",
    "title": "DocsPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/docs-page.tsx",
    "import": "@/registry/blocks/docs-page"
  },
  {
    "name": "empty-workspace",
    "title": "EmptyWorkspace",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/empty-workspace.tsx",
    "import": "@/registry/blocks/empty-workspace"
  },
  {
    "name": "engineering-console",
    "title": "EngineeringConsole",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/engineering-console.tsx",
    "import": "@/registry/blocks/engineering-console"
  },
  {
    "name": "feature-flags",
    "title": "FeatureFlags",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/feature-flags.tsx",
    "import": "@/registry/blocks/feature-flags"
  },
  {
    "name": "form-wizard",
    "title": "FormWizard",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/form-wizard.tsx",
    "import": "@/registry/blocks/form-wizard"
  },
  {
    "name": "inbox-page",
    "title": "InboxPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/inbox-page.tsx",
    "import": "@/registry/blocks/inbox-page"
  },
  {
    "name": "logs-viewer",
    "title": "LogsViewer",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/logs-viewer.tsx",
    "import": "@/registry/blocks/logs-viewer"
  },
  {
    "name": "marketing-landing",
    "title": "MarketingLanding",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/marketing-landing.tsx",
    "import": "@/registry/blocks/marketing-landing"
  },
  {
    "name": "media-library",
    "title": "MediaLibrary",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/media-library.tsx",
    "import": "@/registry/blocks/media-library"
  },
  {
    "name": "notification-center",
    "title": "NotificationCenter",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/notification-center.tsx",
    "import": "@/registry/blocks/notification-center"
  },
  {
    "name": "onboarding-flow",
    "title": "OnboardingFlow",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/onboarding-flow.tsx",
    "import": "@/registry/blocks/onboarding-flow"
  },
  {
    "name": "premium-landing",
    "title": "PremiumLanding",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/premium-landing.tsx",
    "import": "@/registry/blocks/premium-landing"
  },
  {
    "name": "project-detail",
    "title": "ProjectDetail",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/project-detail.tsx",
    "import": "@/registry/blocks/project-detail"
  },
  {
    "name": "project-list",
    "title": "ProjectList",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/project-list.tsx",
    "import": "@/registry/blocks/project-list"
  },
  {
    "name": "report-builder",
    "title": "ReportBuilder",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/report-builder.tsx",
    "import": "@/registry/blocks/report-builder"
  },
  {
    "name": "saas-marketing-page",
    "title": "SaasMarketingPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/saas-marketing-page.tsx",
    "import": "@/registry/blocks/saas-marketing-page"
  },
  {
    "name": "search-results-page",
    "title": "SearchResultsPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/search-results-page.tsx",
    "import": "@/registry/blocks/search-results-page"
  },
  {
    "name": "settings-page",
    "title": "SettingsPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/settings-page.tsx",
    "import": "@/registry/blocks/settings-page"
  },
  {
    "name": "sign-in-page",
    "title": "SignInPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/sign-in-page.tsx",
    "import": "@/registry/blocks/sign-in-page"
  },
  {
    "name": "status-page",
    "title": "StatusPage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/status-page.tsx",
    "import": "@/registry/blocks/status-page"
  },
  {
    "name": "support-inbox",
    "title": "SupportInbox",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/support-inbox.tsx",
    "import": "@/registry/blocks/support-inbox"
  },
  {
    "name": "user-detail",
    "title": "UserDetail",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/user-detail.tsx",
    "import": "@/registry/blocks/user-detail"
  },
  {
    "name": "users-table-page",
    "title": "UsersTablePage",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/users-table-page.tsx",
    "import": "@/registry/blocks/users-table-page"
  },
  {
    "name": "workflow-board",
    "title": "WorkflowBoard",
    "tier": "free",
    "kind": "block",
    "path": "src/registry/blocks/workflow-board.tsx",
    "import": "@/registry/blocks/workflow-board"
  },
  {
    "name": "agency-portfolio",
    "title": "AgencyPortfolio",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/agency-portfolio.tsx",
    "import": "@/registry/premium/agency-portfolio"
  },
  {
    "name": "animated-feature-row",
    "title": "AnimatedFeatureRow",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/animated-feature-row.tsx",
    "import": "@/registry/premium/animated-feature-row"
  },
  {
    "name": "before-after-wipe",
    "title": "BeforeAfterWipe",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/before-after-wipe.tsx",
    "import": "@/registry/premium/before-after-wipe"
  },
  {
    "name": "blog-home",
    "title": "BlogHome",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/blog-home.tsx",
    "import": "@/registry/premium/blog-home"
  },
  {
    "name": "brand-kit-page",
    "title": "BrandKitPage",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/brand-kit-page.tsx",
    "import": "@/registry/premium/brand-kit-page"
  },
  {
    "name": "card-tilt",
    "title": "CardTilt",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/card-tilt.tsx",
    "import": "@/registry/premium/card-tilt"
  },
  {
    "name": "careers-page",
    "title": "CareersPage",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/careers-page.tsx",
    "import": "@/registry/premium/careers-page"
  },
  {
    "name": "changelog-marketing",
    "title": "ChangelogMarketing",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/changelog-marketing.tsx",
    "import": "@/registry/premium/changelog-marketing"
  },
  {
    "name": "changelog-motion",
    "title": "ChangelogMotion",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/changelog-motion.tsx",
    "import": "@/registry/premium/changelog-motion"
  },
  {
    "name": "client-pitch-kit",
    "title": "ClientPitchKit",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/client-pitch-kit.tsx",
    "import": "@/registry/premium/client-pitch-kit"
  },
  {
    "name": "command-waitlist",
    "title": "CommandWaitlist",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/command-waitlist.tsx",
    "import": "@/registry/premium/command-waitlist"
  },
  {
    "name": "contact-sales",
    "title": "ContactSales",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/contact-sales.tsx",
    "import": "@/registry/premium/contact-sales"
  },
  {
    "name": "cta-glow",
    "title": "CtaGlow",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/cta-glow.tsx",
    "import": "@/registry/premium/cta-glow"
  },
  {
    "name": "cursor-spotlight-panel",
    "title": "CursorSpotlightPanel",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/cursor-spotlight-panel.tsx",
    "import": "@/registry/premium/cursor-spotlight-panel"
  },
  {
    "name": "device-frame-stack",
    "title": "DeviceFrameStack",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/device-frame-stack.tsx",
    "import": "@/registry/premium/device-frame-stack"
  },
  {
    "name": "docs-marketing",
    "title": "DocsMarketing",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/docs-marketing.tsx",
    "import": "@/registry/premium/docs-marketing"
  },
  {
    "name": "email-receipt",
    "title": "EmailReceipt",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/email-receipt.tsx",
    "import": "@/registry/premium/email-receipt"
  },
  {
    "name": "email-welcome",
    "title": "EmailWelcome",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/email-welcome.tsx",
    "import": "@/registry/premium/email-welcome"
  },
  {
    "name": "faq-accordion-motion",
    "title": "FaqAccordionMotion",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/faq-accordion-motion.tsx",
    "import": "@/registry/premium/faq-accordion-motion"
  },
  {
    "name": "feature-bento-motion",
    "title": "FeatureBentoMotion",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/feature-bento-motion.tsx",
    "import": "@/registry/premium/feature-bento-motion"
  },
  {
    "name": "feature-comparison",
    "title": "FeatureComparison",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/feature-comparison.tsx",
    "import": "@/registry/premium/feature-comparison"
  },
  {
    "name": "filmstrip-scrub",
    "title": "FilmstripScrub",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/filmstrip-scrub.tsx",
    "import": "@/registry/premium/filmstrip-scrub"
  },
  {
    "name": "flip-stat-board",
    "title": "FlipStatBoard",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/flip-stat-board.tsx",
    "import": "@/registry/premium/flip-stat-board"
  },
  {
    "name": "free-premium-compare",
    "title": "FreePremiumCompare",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/free-premium-compare.tsx",
    "import": "@/registry/premium/free-premium-compare"
  },
  {
    "name": "grid-reveal",
    "title": "GridReveal",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/grid-reveal.tsx",
    "import": "@/registry/premium/grid-reveal"
  },
  {
    "name": "hero-aurora",
    "title": "HeroAurora",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/hero-aurora.tsx",
    "import": "@/registry/premium/hero-aurora"
  },
  {
    "name": "hero-bento",
    "title": "HeroBento",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/hero-bento.tsx",
    "import": "@/registry/premium/hero-bento"
  },
  {
    "name": "hero-client-pitch",
    "title": "HeroClientPitch",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/hero-client-pitch.tsx",
    "import": "@/registry/premium/hero-client-pitch"
  },
  {
    "name": "hero-editorial-split",
    "title": "HeroEditorialSplit",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/hero-editorial-split.tsx",
    "import": "@/registry/premium/hero-editorial-split"
  },
  {
    "name": "hero-gradient-mesh",
    "title": "HeroGradientMesh",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/hero-gradient-mesh.tsx",
    "import": "@/registry/premium/hero-gradient-mesh"
  },
  {
    "name": "hero-kinetic-type",
    "title": "HeroKineticType",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/hero-kinetic-type.tsx",
    "import": "@/registry/premium/hero-kinetic-type"
  },
  {
    "name": "hero-marquee-brands",
    "title": "HeroMarqueeBrands",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/hero-marquee-brands.tsx",
    "import": "@/registry/premium/hero-marquee-brands"
  },
  {
    "name": "hero-poster-type",
    "title": "HeroPosterType",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/hero-poster-type.tsx",
    "import": "@/registry/premium/hero-poster-type"
  },
  {
    "name": "hero-split-showcase",
    "title": "HeroSplitShowcase",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/hero-split-showcase.tsx",
    "import": "@/registry/premium/hero-split-showcase"
  },
  {
    "name": "hero-typed-headline",
    "title": "HeroTypedHeadline",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/hero-typed-headline.tsx",
    "import": "@/registry/premium/hero-typed-headline"
  },
  {
    "name": "horizontal-product-rail",
    "title": "HorizontalProductRail",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/horizontal-product-rail.tsx",
    "import": "@/registry/premium/horizontal-product-rail"
  },
  {
    "name": "investor-update",
    "title": "InvestorUpdate",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/investor-update.tsx",
    "import": "@/registry/premium/investor-update"
  },
  {
    "name": "launch-countdown",
    "title": "LaunchCountdown",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/launch-countdown.tsx",
    "import": "@/registry/premium/launch-countdown"
  },
  {
    "name": "live-component-rail",
    "title": "LiveComponentRail",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/live-component-rail.tsx",
    "import": "@/registry/premium/live-component-rail"
  },
  {
    "name": "logo-wall-motion",
    "title": "LogoWallMotion",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/logo-wall-motion.tsx",
    "import": "@/registry/premium/logo-wall-motion"
  },
  {
    "name": "magnetic-cta",
    "title": "MagneticCta",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/magnetic-cta.tsx",
    "import": "@/registry/premium/magnetic-cta"
  },
  {
    "name": "marquee-quotes",
    "title": "MarqueeQuotes",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/marquee-quotes.tsx",
    "import": "@/registry/premium/marquee-quotes"
  },
  {
    "name": "masked-gradient-headline",
    "title": "MaskedGradientHeadline",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/masked-gradient-headline.tsx",
    "import": "@/registry/premium/masked-gradient-headline"
  },
  {
    "name": "metric-ticker-board",
    "title": "MetricTickerBoard",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/metric-ticker-board.tsx",
    "import": "@/registry/premium/metric-ticker-board"
  },
  {
    "name": "morph-price",
    "title": "MorphPrice",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/morph-price.tsx",
    "import": "@/registry/premium/morph-price"
  },
  {
    "name": "onboarding-motion",
    "title": "OnboardingMotion",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/onboarding-motion.tsx",
    "import": "@/registry/premium/onboarding-motion"
  },
  {
    "name": "orbit-logo-cluster",
    "title": "OrbitLogoCluster",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/orbit-logo-cluster.tsx",
    "import": "@/registry/premium/orbit-logo-cluster"
  },
  {
    "name": "parallax-panel",
    "title": "ParallaxPanel",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/parallax-panel.tsx",
    "import": "@/registry/premium/parallax-panel"
  },
  {
    "name": "pin-scroll-gallery",
    "title": "PinScrollGallery",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/pin-scroll-gallery.tsx",
    "import": "@/registry/premium/pin-scroll-gallery"
  },
  {
    "name": "pricing-kinetic",
    "title": "PricingKinetic",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/pricing-kinetic.tsx",
    "import": "@/registry/premium/pricing-kinetic"
  },
  {
    "name": "pricing-motion",
    "title": "PricingMotion",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/pricing-motion.tsx",
    "import": "@/registry/premium/pricing-motion"
  },
  {
    "name": "pricing-page",
    "title": "PricingPage",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/pricing-page.tsx",
    "import": "@/registry/premium/pricing-page"
  },
  {
    "name": "product-launch",
    "title": "ProductLaunch",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/product-launch.tsx",
    "import": "@/registry/premium/product-launch"
  },
  {
    "name": "product-os-mock",
    "title": "ProductOsMock",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/product-os-mock.tsx",
    "import": "@/registry/premium/product-os-mock"
  },
  {
    "name": "product-tour",
    "title": "ProductTour",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/product-tour.tsx",
    "import": "@/registry/premium/product-tour"
  },
  {
    "name": "saas-landing",
    "title": "SaasLanding",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/saas-landing.tsx",
    "import": "@/registry/premium/saas-landing"
  },
  {
    "name": "scroll-chapter-story",
    "title": "ScrollChapterStory",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/scroll-chapter-story.tsx",
    "import": "@/registry/premium/scroll-chapter-story"
  },
  {
    "name": "scroll-progress-rail",
    "title": "ScrollProgressRail",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/scroll-progress-rail.tsx",
    "import": "@/registry/premium/scroll-progress-rail"
  },
  {
    "name": "scroll-reveal",
    "title": "ScrollReveal",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/scroll-reveal.tsx",
    "import": "@/registry/premium/scroll-reveal"
  },
  {
    "name": "soft-stack",
    "title": "SoftStack",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/soft-stack.tsx",
    "import": "@/registry/premium/soft-stack"
  },
  {
    "name": "split-proof-panel",
    "title": "SplitProofPanel",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/split-proof-panel.tsx",
    "import": "@/registry/premium/split-proof-panel"
  },
  {
    "name": "stack-reveal-story",
    "title": "StackRevealStory",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/stack-reveal-story.tsx",
    "import": "@/registry/premium/stack-reveal-story"
  },
  {
    "name": "stats-counter",
    "title": "StatsCounter",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/stats-counter.tsx",
    "import": "@/registry/premium/stats-counter"
  },
  {
    "name": "status-marketing",
    "title": "StatusMarketing",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/status-marketing.tsx",
    "import": "@/registry/premium/status-marketing"
  },
  {
    "name": "sticky-cta-bar",
    "title": "StickyCtaBar",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/sticky-cta-bar.tsx",
    "import": "@/registry/premium/sticky-cta-bar"
  },
  {
    "name": "sticky-feature-story",
    "title": "StickyFeatureStory",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/sticky-feature-story.tsx",
    "import": "@/registry/premium/sticky-feature-story"
  },
  {
    "name": "testimonial-carousel",
    "title": "TestimonialCarousel",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/testimonial-carousel.tsx",
    "import": "@/registry/premium/testimonial-carousel"
  },
  {
    "name": "text-scramble",
    "title": "TextScramble",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/text-scramble.tsx",
    "import": "@/registry/premium/text-scramble"
  },
  {
    "name": "typographic-marquee",
    "title": "TypographicMarquee",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/typographic-marquee.tsx",
    "import": "@/registry/premium/typographic-marquee"
  },
  {
    "name": "waitlist-hero",
    "title": "WaitlistHero",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/waitlist-hero.tsx",
    "import": "@/registry/premium/waitlist-hero"
  },
  {
    "name": "waveform-hero",
    "title": "WaveformHero",
    "tier": "premium",
    "kind": "premium",
    "path": "src/registry/premium/waveform-hero.tsx",
    "import": "@/registry/premium/waveform-hero"
  }
]
