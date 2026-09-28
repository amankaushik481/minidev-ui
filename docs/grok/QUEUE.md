# Craft queue

Work top to bottom, three components per batch. Tick the box when the component passes every check in PROMPT.md.
Each line says what "done" looks like. The signature detail is the one thing a designer should notice. Do not skip it.

Already gold (use as reference, do not rewrite): button, input, checkbox, segmented-control, otp-input, file-dropzone, data-table, toast, agent-trace, interactive-area-chart, notification-inbox, prompt-input, code-block.

## Batch 1: controls people touch first
- [ ] **switch**: Signature: while pressed, the thumb stretches 4px toward travel direction, then springs to the other side (motion layout spring). Sizes sm/default. Optional `loading` (spinner inside thumb, not clickable). Optional `label` + `description` layout with the whole row clickable.
- [ ] **tabs**: Signature: default variant gets a sliding raised thumb and line variant a sliding 2px accent underline, both with `motion` `layoutId` (copy segmented-control). Keep Base UI Tabs for keyboard. Optional count badge per tab like segmented-control's `badge`.
- [ ] **slider** + **range-slider**: Signature: value bubble (ink, shadow-overlay, tabular-nums) appears above the thumb while dragging or focused, with glyph-in. Rail = track recipe, filled part accent. Thumb 16px `bg-white shadow-key border border-border`, grows ring on focus. Optional `marks` (ticks under the rail) and `format` prop. Use Base UI Slider.

## Batch 2: selection
- [ ] **select**: Signature: selected item shows a check that pops in, and the list opens aligned so the selected item sits over the trigger (Base UI `alignItemWithTrigger`). Groups with labels, items with icon + description line, disabled items, invalid state on trigger, placeholder in fg-subtle.
- [ ] **combobox**: Signature: matched substring in each result is `font-medium text-fg`, rest `text-fg-muted`. Empty state "No match for “x”" + a "Create “x”" item. `loading` shows a spinner row. `multiple` mode shows chips in the field (Backspace removes last chip). Use Base UI Combobox.
- [ ] **multi-select**: Same chips as combobox multiple. Chips collapse to "+3" when they overflow one line. "Select all / Clear" footer row.

## Batch 3: typing
- [ ] **number-input**: Signature: drag the label horizontally to scrub the value (like Figma), cursor `ew-resize`. Hairline stepper buttons stacked on the right, press-and-hold repeats. Clamp to min/max with `shake-x` on the field. `unit` suffix in fg-subtle, `format` prop, tabular-nums.
- [ ] **password-input**: Signature: strength meter of 4 hairline segments that fill with tone (danger → warning → success) plus a requirements list whose items tick with pop-in as they are met. Reveal toggle (eye icon ghost button) with aria-pressed.
- [ ] **tags-input**: Signature: Backspace on empty input first highlights the last chip (accent-soft + accent-line), second Backspace removes it. Paste "a, b, c" splits into chips. Duplicate shakes the existing chip. `max` shows counter "3/5".

## Batch 4: overlays
- [ ] **dropdown-menu**: Items with icon, label, shortcut (`<Kbd>`), checkbox items with pop-in check, radio items, submenu with chevron, destructive item (text-danger, hover bg danger 8% tint), separators, group labels. Enter: scale 0.98 → 1 + opacity, 140ms, origin from trigger.
- [ ] **dialog** + **alert-dialog**: Signature: dialog rises 6px + scale 0.98 → 1 with ease-hairline, scrim `bg-scrim` fades. Footer is a sunken strip with border-t. Alert dialog has a tone icon tile and the destructive button uses `variant="destructive"`. Focus lands on the least destructive action.
- [ ] **tooltip** + **hover-card**: Tooltip: ink, 12px, 6px radius, optional `shortcut` slot (Kbd on ink), 400ms delay, instant for siblings once one is open (Base UI delay group). Hover card: overlay recipe, user or link preview with avatar, meta row, 2-line clamp.

## Batch 5: commands and navigation
- [ ] **command-palette**: Signature: nested pages. Choosing "Change theme…" pushes a page, the input shows a breadcrumb chip ("Theme ›"), Backspace on empty input pops back. Groups, matched-substring highlight, recent items, footer with ↑↓ ↵ Esc hints, loading row, empty state. Opens with ⌘K.
- [ ] **pagination** + **table-pagination**: Current page ink tile, others ghost, ellipsis with smart window (1 … 4 5 6 … 20), prev/next with arrow icons, "Rows per page" select, "21–40 of 312" in tabular-nums.
- [ ] **breadcrumb**: Collapses middle items into a "…" dropdown when longer than 4. Current page `text-fg font-medium`, separators `/` in fg-subtle. Truncates long labels with tooltip.

## Batch 6: status and progress
- [ ] **progress** + **progress-circle** + **meter**: Determinate: accent fill with `transition-[width]` 200ms. Indeterminate: a 30% bar sliding with `shimmer-x`. Label row "Uploading · 64%" in tabular-nums. Circle: 2px hairline track, round linecap, value in centre, tones. Meter: thresholds switch tone (warning at 80%, danger at 95%).
- [ ] **stepper** + **step-progress**: Signature: connector line fills left to right (scaleX, 200ms) when a step completes, the node swaps number for a check with pop-in. Current step has a soft `pulse-ring`. Vertical and horizontal. Optional description per step.
- [ ] **empty-state**: Signature: a small hairline line-art illustration drawn in SVG with `stroke-border-strong` and one accent stroke, that draws itself once with `hairline-draw`. Title, one-line body, primary (ink) + secondary (ghost) action. Variants: first-use, no-results (shows the query), error.

## Batch 7: pricing and marketing (landing pages use these)
- [ ] **pricing-table**: Signature: Monthly/Yearly segmented control with "-20%" badge, and prices roll to the new number (each digit slides vertically, tabular-nums) when switched. Recommended plan: ink card (`bg-ink text-on-ink`) with a hairline accent top border. Feature rows with check (success) or dash (fg-subtle). Per-plan CTA.
- [ ] **plan-card** + **pricing-toggle**: Reuse the pricing-table pieces. pricing-toggle IS a segmented-control with a badge; delete duplicate logic and wrap it.
- [ ] **faq-list** + **accordion**: Height animates with `grid-template-rows: 0fr → 1fr` (no JS measuring). Chevron rotates 180 in 200ms. Hairline dividers between items, no boxes. Only one open at a time option.

## Batch 8: dates
- [ ] **date-picker**: Signature: month change slides the grid 12px left/right with a fade. Today has a small accent dot under the number. Selected day is ink. Keyboard: arrows move by day, PageUp/Down by month. Footer "Today" button.
- [ ] **date-range-picker**: While picking the end date, hovering previews the range in accent-soft. Presets column on the left (Today, Last 7 days, Last 30 days, This quarter). Two months side by side on desktop, one on mobile.
- [ ] **time-picker**: Scrollable hour and minute columns with snap, selected value in a raised row, 12/24h prop.

## Batch 9: people and feeds
- [ ] **avatar**: Fallback initials with a deterministic tint from the name (hash to one of 6 hues, as `color-mix` of accent/success/info/warning with surface). `AvatarGroup` overlapping with `ring-2 ring-bg`, "+N" tile, hover lifts one 2px. Presence dot with `ring-2 ring-bg`.
- [ ] **activity-feed** + **notification-item**: Timeline rail (1px border line) with small icon nodes. Relative time ("2m ago") via relative-time with full date in a tooltip. Unread dot in accent. Group by day with sticky day labels.
- [ ] **comment-thread** + **comment-composer**: Replies indented on a hairline rail. Composer grows, shows "⌘↵ to send" hint, mentions render as accent-soft pills. Reactions row uses reaction-bar.

## Batch 10: developer surfaces
- [ ] **tree-view**: Indent guides as 1px lines, chevrons rotate, file icons by extension (mono text tag like file-dropzone rows), keyboard arrows per APG tree pattern, selected row uses the accent rail.
- [ ] **json-viewer**: Collapsible nodes with counts ("{ 4 keys }"), token colours from code-block, hover a key to copy its path, long strings truncate with expand.
- [ ] **diff-view**: Line numbers in two gutters, + and − rows tinted with success/danger at 8%, word-level highlight at 18%. Unchanged runs longer than 6 collapse into "Show 12 unchanged lines".

## Batch 11: boards and media
- [ ] **kanban-board** + **kanban-column**: Drag cards with pointer events (no new deps). While dragging: card lifts (shadow-overlay, 1deg rotate is allowed here only), placeholder is a dashed hairline slot. Column header with count and WIP limit that turns warning when exceeded.
- [ ] **image-lightbox** + **image-gallery**: Opening zooms from the thumbnail position (FLIP with motion `layoutId`). Arrow keys and swipe. Counter "3 / 12" in tabular-nums. Scrim bg-scrim, controls are ghost buttons on ink.
- [ ] **color-picker**: OKLCH: a lightness/chroma area plus a hue slider (use the hue gradient from the playground page), swatches row, input that accepts oklch() or hex, EyeDropper button when `window.EyeDropper` exists.

## Batch 12: the long tail
After batch 11, run `npm run craft` and take the files with the `tiny-file` and `no-focus` warnings, most-used first (`rg -l "<ComponentName" src/app src/registry/blocks | wc -l` to rank). Give each one the full treatment. Add them here as you go.
