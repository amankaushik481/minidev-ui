import type { ComponentDocsContent } from "../types"

export const PART_10: Record<string, ComponentDocsContent> = {
  "admin-user-row": {
    faq: [
      {
        q: "How do I put a real actions menu on each row?",
        a: "Pass a menu as `actions`, for example `actions={<DropdownMenu>…</DropdownMenu>}`. It replaces the built-in \"more\" button entirely, and `onActionsClick` is then ignored. Keep `onActionsClick` for the simple case where one handler opens a side panel.",
      },
      {
        q: "Can I show roles other than admin, write and read?",
        a: "No. `role` is typed as `\"admin\" | \"write\" | \"read\"` and is drawn by [`PermissionChip`](/docs/permission-chip). For free-text roles such as \"Billing manager\" use [`TeamMemberRow`](/docs/team-member-row), which shows any string in a badge.",
      },
      {
        q: "How do I hide the presence dot?",
        a: "Leave `online` out. `online={true}` shows a green dot, `online={false}` a grey one, and `undefined` renders no dot and no hidden \"Online\"/\"Offline\" text.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the row's actions button. The rest of the row is not focusable." },
      { keys: "Enter / Space", action: "Presses the default actions button, which calls `onActionsClick`." },
    ],
    a11y: [
      "The default actions button is an icon-only `IconButton` named `Actions for {name}`, so each row's button is distinct in a list.",
      "The presence dot is decorative. A visually hidden \"Online\" or \"Offline\" is read next to the avatar instead.",
      "The avatar initials are `aria-hidden`, so screen readers read the name once, not \"MC Maya Chen\".",
      "The chip reads as \"read access\", \"write access\" or \"admin access\" because [`PermissionChip`](/docs/permission-chip) adds a hidden \" access\".",
    ],
  },
  "avatar-upload": {
    faq: [
      {
        q: "Does AvatarUpload upload the file?",
        a: "No. It shows a local preview through `URL.createObjectURL` and calls `onChange(file)`. Send the `File` to your storage from there, then pass the stored URL back as `src` on the next render.",
      },
      {
        q: "How do I limit file size or type?",
        a: "The hidden input only sets `accept=\"image/*\"`, and there is no size check. Check `file.size` and `file.type` inside `onChange` before uploading. The preview still shows the picked file, so for size limits with error messages use [`ImageUpload`](/docs/image-upload) or [`FileDropzone`](/docs/file-dropzone).",
      },
      {
        q: "Can the user pick the same photo twice?",
        a: "Yes. The input's value is cleared after each pick, so choosing the same file again fires `onChange` again.",
      },
    ],
    a11y: [
      "The button is named `{buttonLabel} photo for {name}`, for example \"Upload photo for Maya Chen\", which still starts with the visible text.",
      "The image's `alt` is the person's name. The initials fallback is `aria-hidden`.",
      "The file input itself is `hidden`, so only the button is in the Tab order.",
      "Each preview URL is revoked when it is replaced or the component unmounts, so repeated picks do not leak memory.",
    ],
  },
  "bulk-user-import": {
    faq: [
      {
        q: "Does BulkUserImport parse the CSV or send invites?",
        a: "No. `onImport` receives the `File` (as an array) when Import users is pressed. Read it with `await files[0].text()`, parse the `email, name, role` rows, and validate each row on the server.",
      },
      {
        q: "What happens when I remove the file from the list?",
        a: "The panel forgets it and Import users is disabled again. [`FileDropzone`](/docs/file-dropzone) reports the removal through `onRemove`. Dropping a new CSV replaces the old one, because the dropzone runs with `multiple={false}`.",
      },
      {
        q: "What happens if someone drops an Excel file?",
        a: "The dropzone accepts `.csv` and `text/csv` only, so other files are listed with an error and never reach the panel. If no CSV was accepted yet, Import stays disabled. If one was, the panel still holds it and Import stays enabled.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the drop zone, opens the file chooser." },
      { keys: "Tab", action: "Moves from the drop zone to the file list's remove button, then to Import users." },
    ],
    a11y: [
      "The format note is a [`Callout`](/docs/callout) with `role=\"note\"`, so it is read in place and not announced as an alert.",
      "The drop zone is a `role=\"button\"` element and a polite live region announces \"1 file added\".",
      "Import users is a native disabled button until a CSV is accepted, so it is skipped by Tab until then.",
    ],
  },
  "connected-account": {
    faq: [
      {
        q: "Does Disconnect ask for confirmation?",
        a: "No. `onDisconnect` runs on the first press. If unlinking loses data or the only sign-in method, open a [`ConfirmDestructive`](/docs/confirm-destructive) or [`AlertDialog`](/docs/alert-dialog) from `onDisconnect` first.",
      },
      {
        q: "How is it different from IntegrationCard?",
        a: "ConnectedAccount is for an account that is already linked: it shows who it is linked to and offers one action. [`IntegrationCard`](/docs/integration-card) is a directory card with a description, a Connected or Available badge and Connect or Manage.",
      },
      {
        q: "Can I change the button to Reconnect or Remove?",
        a: "Yes. Pass `actionLabel=\"Reconnect\"`. The label is used for the visible text and the accessible name, which becomes \"Reconnect GitHub\".",
      },
    ],
    a11y: [
      "The button's accessible name is `{actionLabel} {provider}`, such as \"Disconnect GitHub\", so a stack of rows has distinct buttons.",
      "The `icon` slot is `aria-hidden`. The provider name is always shown as text, so the logo never carries meaning alone.",
    ],
  },
  "danger-zone": {
    faq: [
      {
        q: "When does onConfirm run?",
        a: "Only after the person presses the red confirm button in the dialog. The section's button opens a [`ConfirmDestructive`](/docs/confirm-destructive) alert dialog whose title is `{actionLabel}?` and whose description repeats your `description`. Cancel and Escape close it without calling anything.",
      },
      {
        q: "How do I require typing the workspace name before deleting?",
        a: "Pass your own controls as `children`. They replace the built-in confirm button, so you can drop in [`DeleteAccountConfirm`](/docs/delete-account-confirm) with `confirmText=\"northwind\"`.",
      },
      {
        q: "Can one DangerZone hold several actions?",
        a: "The built-in button covers one action. For several, such as Transfer ownership and Delete workspace, pass them as `children`, each with its own confirmation.",
      },
    ],
    keyboard: [
      { keys: "Enter / Space", action: "On the section's button, opens the confirmation dialog." },
      { keys: "Tab", action: "Inside the dialog, moves between Cancel and the confirm button. Focus stays in the dialog." },
      { keys: "Escape", action: "Closes the dialog without confirming. Focus returns to the section's button." },
    ],
    a11y: [
      "The panel is a `<section>` labelled by its `<h3>` title through `aria-labelledby`, so it appears as a named region.",
      "The dialog is a Base UI alert dialog: the title and description name it, focus moves inside when it opens and returns to the trigger when it closes.",
      "The heading level is fixed at `<h3>` in the file. Change it there if the panel sits under a different heading level.",
    ],
  },
  "delete-account-confirm": {
    faq: [
      {
        q: "Is the confirmation phrase case-sensitive?",
        a: "Yes, and spaces count. The button enables only when the field equals `confirmText` exactly, so \"delete\" or \"DELETE \" with a trailing space do not match the default \"DELETE\".",
      },
      {
        q: "How do I make people type the workspace name instead?",
        a: "Pass it as `confirmText`, for example `confirmText=\"northwind\"`. The alert above the field updates to \"Type northwind to confirm.\"",
      },
      {
        q: "How do I show a pending state while the account is deleted?",
        a: "There is no pending prop. `onConfirm` is called with no arguments and the form stays as it is, so redirect or swap the block out once your request finishes.",
      },
    ],
    keyboard: [
      { keys: "Enter", action: "In the field, submits the form. Nothing happens until the phrase matches." },
      { keys: "Tab", action: "Moves from the field to Delete account once it is enabled. A disabled button is skipped." },
    ],
    a11y: [
      "The warning is an [`InlineAlert`](/docs/inline-alert) with `tone=\"danger\"`, which renders `role=\"alert\"`. It renders together with the form, so screen readers announce it whenever the form mounts, for example after client-side navigation to the page.",
      "The field is labelled \"Confirmation\". The phrase to type is in the alert above it, not linked with `aria-describedby`, so screen reader users meet it only if they read the alert.",
      "Autocomplete and spellcheck are off on the field, so the browser does not suggest or correct the phrase.",
    ],
  },
  "export-data": {
    faq: [
      {
        q: "How do I show that an export is being prepared?",
        a: "The row has no status state. Change `description` (it accepts any node) to something like \"Preparing your export. We'll email you when it's ready.\" and `actionLabel` to \"Export requested\" after `onExport` resolves.",
      },
      {
        q: "Can I let people choose CSV or JSON?",
        a: "Not with props: there is one button and one `onExport`. Stack two rows with different titles and handlers, or put a [`Select`](/docs/select) beside the row and read its value in `onExport`.",
      },
    ],
    a11y: [
      "The title renders as an `<h3>`. Change the level in the file if the row sits under an `<h3>` or deeper.",
      "The button is a native `<button type=\"button\">`, so it never submits a surrounding settings form.",
    ],
  },
  "feature-flag-toggle": {
    faq: [
      {
        q: "Should I control the switch or let it hold its own state?",
        a: "Pass `checked` and `onCheckedChange` when the flag value comes from your server, so a failed save can flip it back. For a quick prototype, `defaultChecked` lets the switch keep its own state.",
      },
      {
        q: "How do I show a flag name in monospace?",
        a: "Target the label from `className`: `className=\"[&_label]:font-mono\"`. The [`FeatureFlags`](/docs/feature-flags) block does exactly this for slug-style names like `ask-lumen-v2`.",
      },
      {
        q: "How do I lock a flag that only owners can change?",
        a: "Pass `disabled`. The switch dims to 45% and cannot be toggled. Explain why in `description`, because a disabled switch gives no reason on its own.",
      },
    ],
    a11y: [
      "The switch has `role=\"switch\"` with `aria-checked`, and `aria-label` set to the flag `name`.",
      "When there is a `description`, the switch points at it with `aria-describedby`, so screen readers read what the flag changes after its name.",
      "The thumb's spring is skipped under reduced motion.",
    ],
  },
  "feature-flags": {
    faq: [
      {
        q: "How do I load my own flags into the block?",
        a: "The flag list and starting state are constants in the file (`FLAGS` and the initial `useState`), and the only props are `onChange` and `className`. Edit those constants, or map your own data to [`FeatureFlagToggle`](/docs/feature-flag-toggle) rows in your page.",
      },
      {
        q: "How do I save each flip to my API?",
        a: "Pass `onChange={(flag, on) => api.flags.set(flag, on)}`. It fires after the block updates its own state, so if the request fails you need to keep your own state to roll the switch back.",
      },
    ],
    a11y: [
      "The \"2 of 4 on\" count sits in an `aria-live=\"polite\"` span, so screen readers hear the new total after each flip.",
      "Each switch is named by its flag and described by the flag's description through [`FeatureFlagToggle`](/docs/feature-flag-toggle).",
      "The flags are a real `<ul>`, so screen readers announce how many there are.",
    ],
  },
  "integration-card": {
    faq: [
      {
        q: "How do I show a loading state while an integration connects?",
        a: "There is no pending state. The button calls `onConnect` and stays enabled. Track the request yourself and flip `connected` once it succeeds, which switches the badge to Connected and the button to Manage.",
      },
      {
        q: "Which logo size should I pass?",
        a: "Any icon works: SVGs inside `icon` are sized to 16px and sit in a 32px bordered tile. Use the provider's official mark from their brand kit; the kit ships no third-party logos.",
      },
    ],
    a11y: [
      "The button's accessible name includes the integration: \"Connect Linear\" or \"Manage Linear\".",
      "The status is written out as \"Connected\" or \"Available\" in a badge, not shown by colour alone.",
      "The icon tile is `aria-hidden`, and the name is an `<h3>`.",
    ],
  },
  "invite-members": {
    faq: [
      {
        q: "How does InviteMembers validate the email?",
        a: "The field is `type=\"email\"` and `required`, and the form uses the browser's `checkValidity()` with native bubbles turned off (`noValidate`). The value is trimmed and lowercased, and an address already in the pending list is rejected with \"… is already invited.\" Validate again on the server.",
      },
      {
        q: "How do I keep the pending list in my own state?",
        a: "Pass `pending` and add the email yourself in `onInvite`. While `pending` is set, the card never changes the list on its own, so a failed request does not leave a fake pending invite.",
      },
      {
        q: "Can people resend or revoke a pending invite here?",
        a: "No. Pending invites are plain badges with no actions. List them with [`TeamMemberRow`](/docs/team-member-row) and an `actions` menu if you need resend or revoke.",
      },
    ],
    a11y: [
      "The form is labelled by the card title through `aria-labelledby`. The field is named \"Email address\".",
      "A rejected address sets `aria-invalid` on the field and links the message with `aria-describedby`. The message has `role=\"alert\"`, so it is announced at once.",
      "Pending invites are a `<ul>` named \"Pending invites\", and each badge reads \"{email} · pending\".",
    ],
  },
  "ip-allowlist": {
    faq: [
      {
        q: "Which formats does IpAllowlist accept?",
        a: "IPv4 addresses with an optional `/0` to `/32` prefix, and IPv6 addresses (including `::` shorthand) with an optional `/0` to `/128` prefix. IPv6 with an embedded IPv4 tail, such as `::ffff:1.2.3.4`, is rejected. Anything else shows an error and is not added.",
      },
      {
        q: "Can I use it inside a form?",
        a: "Yes. Enter in the field adds the address and calls `preventDefault`, so it never submits the surrounding form. There is no hidden input or `name`, so send the `value` array with your own submit handler.",
      },
      {
        q: "Does it catch duplicates written differently?",
        a: "Only differences in letter case. `2001:DB8::1` is rejected when `2001:db8::1` is on the list, and the entry keeps the case it was typed in. Other spellings of the same address, such as `2001:db8:0:0::1`, are both accepted. Normalise addresses on the server before saving.",
      },
    ],
    keyboard: [
      { keys: "Enter", action: "In the field, adds the address. Same as pressing Add." },
      { keys: "Tab", action: "Moves through each address's remove button, then to the field and Add." },
    ],
    a11y: [
      "Each remove button is named \"Remove {ip}\", for example \"Remove 203.0.113.10\".",
      "The list is a `<ul>` named \"Allowed IP addresses\". When it is empty, a \"No addresses added yet.\" line takes its place.",
      "An invalid entry sets `aria-invalid` on the field and links the `role=\"alert\"` message through `aria-describedby`.",
    ],
  },
  "language-picker": {
    faq: [
      {
        q: "How do I change the app language when someone picks one?",
        a: "Use `onChange`, which receives the option `id`. With next-intl, for example, call `router.replace(pathname, { locale: id })`. The picker only reports the choice.",
      },
      {
        q: "What should go in label: the English name or the native one?",
        a: "The native name, such as \"Deutsch\" or \"日本語\". Each label is wrapped in a span with `lang={id}`, so screen readers pronounce it in that language. Use real BCP 47 codes like `pt-BR` as ids for that to work.",
      },
      {
        q: "How many languages is this good for?",
        a: "A handful: every option is rendered as a card in a two-column grid. For a long list with search use [`Combobox`](/docs/combobox) or [`Select`](/docs/select).",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus into the group, onto the selected language." },
      { keys: "ArrowDown / ArrowRight", action: "Moves to the next language and selects it. Wraps from the last to the first." },
      { keys: "ArrowUp / ArrowLeft", action: "Moves to the previous language and selects it." },
      { keys: "Home / End", action: "Selects the first or last language." },
    ],
    a11y: [
      "The grid has `role=\"radiogroup\"` named by `label` (default \"Language\"), and each option is a `role=\"radio\"` button with `aria-checked`.",
      "Only the selected option is in the Tab order. If `value` matches no option, the first one is, so the group stays reachable.",
    ],
  },
  "notification-preferences": {
    faq: [
      {
        q: "How do I load saved preferences?",
        a: "Pass them as each item's `defaultChecked`. The switches are uncontrolled, so the value is read on mount only. If saved values arrive later, render the component after they load or give it a `key` that changes when they do.",
      },
      {
        q: "How do I save a change?",
        a: "Use `onCheckedChange(id, checked)`, which reports the item's `id` and its new state. Debounce or batch the request if people often flip several switches in a row.",
      },
      {
        q: "Can I add a description under each channel?",
        a: "Not with `items`, which takes `id`, `label` and `defaultChecked`. For a row with a description use [`FeatureFlagToggle`](/docs/feature-flag-toggle), or [`Switch`](/docs/switch) with its `label` and `description` props.",
      },
    ],
    a11y: [
      "Each `Label` is tied to its switch with `htmlFor`, using ids built from `useId()` and the item `id`, so two instances on one page never clash.",
      "Each switch has `role=\"switch\"` with `aria-checked`. The label's `htmlFor` points at Base UI's hidden checkbox, so clicking the label text toggles the switch.",
    ],
  },
  "permission-chip": {
    faq: [
      {
        q: "Can I add a custom level like owner or billing?",
        a: "Not through props: `level` is `\"admin\" | \"write\" | \"read\"`, and each maps to a tone in the `tones` object. Add a key there, or use [`Badge`](/docs/badge) for free-text roles.",
      },
      {
        q: "How do I style one level differently?",
        a: "Every chip has `data-level`, so you can target it with `data-[level=admin]:…` in `className`, or change that level's classes in `tones`.",
      },
    ],
    a11y: [
      "A visually hidden \" access\" follows the level, so screen readers hear \"admin access\" rather than a bare \"admin\".",
      "The level is written in text. Colour only reinforces it: admin is accent-tinted, write is filled, read is quiet.",
    ],
  },
  "profile-form": {
    faq: [
      {
        q: "Why does the name field say Maya Chen?",
        a: "That is the sample default. The field uses `defaultValues?.name ?? \"Maya Chen\"`, so pass `defaultValues={{ name: user.name, bio: user.bio }}` to show the real profile.",
      },
      {
        q: "Can I use it with a Server Action?",
        a: "Call the action from `onSubmit`, which receives `{ name, bio }` with both values trimmed. The form calls `preventDefault`, so a Server Action passed as `action` would never run.",
      },
      {
        q: "How do I add an avatar or more fields?",
        a: "The file is yours to edit: add a `FormField` with an input that has a `name`, and read it from the `FormData` in the submit handler. Put [`AvatarUpload`](/docs/avatar-upload) above the form for the photo.",
      },
    ],
    a11y: [
      "Both fields have visible labels tied to them through `FormField` with ids from `useId()`.",
      "Display name is `required` and has `autoComplete=\"nickname\"`, so the browser can fill it and blocks an empty submit with its own message.",
    ],
  },
  "region-picker": {
    faq: [
      {
        q: "What does the latency field show?",
        a: "Any short text under the label, shown in monospace with tabular numbers. Pass a measured value like \"42ms\", a city like \"Frankfurt\", or leave it out.",
      },
      {
        q: "Which region is selected by default?",
        a: "The first one in `regions`, unless you pass `defaultValue`. In controlled mode, pass `value` and update it in `onChange`.",
      },
      {
        q: "How do I mark a region as unavailable?",
        a: "There is no disabled option. Leave that region out of `regions`, or explain the limit next to the picker. For options that need a disabled state use [`RadioGroup`](/docs/radio-group).",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus into the group, onto the selected region." },
      { keys: "ArrowDown / ArrowRight", action: "Moves to the next region and selects it. Wraps at the end." },
      { keys: "ArrowUp / ArrowLeft", action: "Moves to the previous region and selects it." },
      { keys: "Home / End", action: "Selects the first or last region." },
    ],
    a11y: [
      "The grid is a `role=\"radiogroup\"` named by `aria-label` (default \"Region\"). Each card is a `role=\"radio\"` button with `aria-checked`.",
      "Roving tabindex: only the selected card is in the Tab order, so Tab leaves the group in one step.",
      "The latency text sits inside the radio button, so it is part of each option's accessible name, not a separate stop.",
    ],
  },
  "role-permission-matrix": {
    faq: [
      {
        q: "Why don't the checkboxes update when my data loads?",
        a: "`isChecked` sets each checkbox's `defaultChecked`, which is read on mount only. Render the matrix after your permissions load, or give it a `key` that changes when they do.",
      },
      {
        q: "How do I save a change?",
        a: "Use `onCheckedChange(role, permission, checked)`. It fires once per click with the role and permission strings from your props, so you can send a single update.",
      },
      {
        q: "How do I lock a cell, such as the Owner's permissions?",
        a: "There is no prop for it. Edit the cell in the file and pass `disabled` to that `Checkbox`, for example when `r === \"Owner\"`.",
      },
    ],
    a11y: [
      "It is a real `<table>`: role names are `<th scope=\"col\">` and permission names are `<th scope=\"row\">`, so screen readers announce both headers per cell.",
      "Each checkbox also has `aria-label` set to `{role} {permission}`, for example \"Admin Invite members\".",
      "The table scrolls sideways inside its container on narrow screens rather than squashing columns.",
    ],
  },
  "role-picker": {
    faq: [
      {
        q: "Does RolePicker submit a value with a form?",
        a: "Yes, when you pass `name`. `<RolePicker name=\"role\" />` inside a `<form>` sends the picked role value, so `formData.get(\"role\")` returns `\"member\"` by default. Without `name` nothing reaches `FormData`.",
      },
      {
        q: "How do I describe what each role can do?",
        a: "Options take only `value` and `label`. Put the description in the label text, or link to a [`RolePermissionMatrix`](/docs/role-permission-matrix) that shows each role's permissions.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the selected role." },
      { keys: "ArrowDown / ArrowRight", action: "Moves to the next role and selects it. Wraps from the last to the first." },
      { keys: "ArrowUp / ArrowLeft", action: "Moves to the previous role and selects it." },
      { keys: "Space", action: "Selects the focused role." },
    ],
    a11y: [
      "Built on Base UI `RadioGroup`, so the group has `role=\"radiogroup\"` named by `aria-label` (default \"Role\") and each item is a radio with `aria-checked`.",
      "Each label is tied to its radio with `htmlFor` and an id from `useId()`, so clicking the text selects the role.",
    ],
  },
  "session-list": {
    faq: [
      {
        q: "Why is there no Revoke button on one session?",
        a: "Sessions with `current: true` get no Revoke button and show \"(this device)\" instead, so people cannot sign themselves out by mistake. Mark the session making the request as current.",
      },
      {
        q: "Does Revoke ask for confirmation?",
        a: "No. `onRevoke(id)` runs on press. Remove the session from `sessions` once your request succeeds. For a \"Sign out everywhere else\" action, put a [`ConfirmDestructive`](/docs/confirm-destructive) under the list.",
      },
      {
        q: "What shows when there are no sessions?",
        a: "An empty list, with no message. Leaving `sessions` out shows the sample data instead, so pass an empty array while loading and render your own empty or loading state.",
      },
    ],
    a11y: [
      "The list is a `<ul>` named \"Signed-in sessions\".",
      "Each Revoke button is named \"Revoke {device}\". Two sessions with the same device text would share a name, so add something distinguishing to `device` or `location`.",
    ],
  },
  "settings-layout": {
    faq: [
      {
        q: "How does SettingsLayout behave on mobile?",
        a: "Below the `md` breakpoint the grid has one column, so the nav stacks above the sections. It does not turn into a select or a drawer. Above `md` the nav is a fixed 200px column.",
      },
      {
        q: "How do I mark the current settings page in the nav?",
        a: "The layout renders whatever you pass in `nav` inside a `<nav>`. `SidebarNavItem` with `active` sets `aria-current=\"page\"` for you, but it is a `<button>`. For route links, use Next.js `Link` and set `aria-current=\"page\"` on the active one yourself.",
      },
      {
        q: "Should each settings group be a SettingsSection?",
        a: "Yes. Each `SettingsSection` adds an `<h2>` title, an optional description and a divider, and the last section drops its bottom border.",
      },
    ],
    a11y: [
      "The rail is a `<nav>` named by `navLabel` (default \"Settings\"), so it is a distinct landmark from the app's main navigation.",
      "Each `SettingsSection` is a `<section>` labelled by its `<h2>` through `aria-labelledby`, so it is listed as a named region.",
    ],
  },
  "settings-page": {
    faq: [
      {
        q: "Does the theme picker change the site's theme?",
        a: "Not as shipped: the block renders `<ThemePicker />` without `applyToDocument`, so picking Dark only changes the picker. Add `applyToDocument`, or pass `value` and `onChange` to your theme provider.",
      },
      {
        q: "How do I save the profile and notification settings?",
        a: "The block takes only `className`. Edit the file and pass `onSubmit` to [`ProfileForm`](/docs/profile-form), `onCheckedChange` to [`NotificationPreferences`](/docs/notification-preferences) and `onConfirm` to [`DangerZone`](/docs/danger-zone).",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the profile fields, the theme options, each notification switch and the danger zone button." },
      { keys: "ArrowLeft / ArrowRight", action: "In the theme picker, moves to and selects the previous or next theme." },
    ],
    a11y: [
      "Profile, Theme and Notifications are each a `<section>` labelled by its `<h2>`, below the page's own heading.",
      "The danger zone's `<h3>` comes right after the Notifications section, so a headings list shows it as a sub-heading of Notifications. Wrap it in its own section with an `<h2>` if that matters.",
    ],
  },
  "team-member-row": {
    faq: [
      {
        q: "How do I let admins change someone's role from the row?",
        a: "Put a [`Select`](/docs/select) or [`DropdownMenu`](/docs/dropdown-menu) in `actions`, and pass `role` only when you also want the badge. Leaving `role` out, or passing `undefined` or an empty string, shows no badge.",
      },
      {
        q: "How are the initials worked out?",
        a: "First letter of the first and last word: \"Priya Raman\" becomes \"PR\". A one-word name keeps its first two letters. They show when `src` is missing or the image fails.",
      },
    ],
    a11y: [
      "The avatar image has `alt=\"\"` because the name is written beside it.",
      "The initials fallback is `aria-hidden`, so screen readers hear the name once, not \"SR\" before \"Sam Rivera\".",
      "Name and email truncate visually but stay complete in the DOM, so screen readers get the full text.",
    ],
  },
  "theme-picker": {
    faq: [
      {
        q: "Why does the page flash light before switching to dark?",
        a: "`applyToDocument` only toggles the `dark` class when someone picks a mode, not on page load. Set the class before first paint with a small inline script in your layout, or with a library such as next-themes, and pass its value to `value`.",
      },
      {
        q: "Does System follow the OS when it changes?",
        a: "No. With `applyToDocument`, System checks `prefers-color-scheme` once, when it is picked. To follow later changes, listen to `matchMedia(\"(prefers-color-scheme: dark)\")` yourself.",
      },
      {
        q: "How do I remember the choice?",
        a: "Control it: `value={mode}` and `onChange={(m) => { setMode(m); localStorage.theme = m }}`, then read the stored mode in your no-flash script.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the selected mode." },
      { keys: "ArrowRight / ArrowDown", action: "Moves to the next mode and selects it. Wraps from System to Light." },
      { keys: "ArrowLeft / ArrowUp", action: "Moves to the previous mode and selects it." },
      { keys: "Home / End", action: "Selects Light or System." },
    ],
    a11y: [
      "The control is a `role=\"radiogroup\"` named \"Theme\", with each mode a `role=\"radio\"` button with `aria-checked`.",
      "Only the selected mode is in the Tab order (roving tabindex).",
      "The group name is fixed as \"Theme\" in the file, so change it there if you reuse the control for something else.",
    ],
  },
  "api-docs-page": {
    faq: [
      {
        q: "How do I feed my own endpoints into ApiDocsPage?",
        a: "Edit the `BASE`, `ENDPOINTS` and `NAV` constants at the top of the file. The block's only prop is `className`, so for docs generated from an OpenAPI file, map your operations into that `ENDPOINTS` shape.",
      },
      {
        q: "Why don't the nav links scroll anywhere?",
        a: "They point at `#overview`, `#authentication` and so on, but no element in the block has those ids. Give your own sections those ids, or change the `href`s to real routes.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the nav links, Copy base URL, then the code sample's Copy button and scrollable code." },
      { keys: "Enter", action: "On a nav link, follows it and marks it as current." },
    ],
    a11y: [
      "The sidebar is a `<nav>` named \"API reference\". The link that was clicked last gets `aria-current=\"page\"`.",
      "The content is a `<section>` labelled by its \"Lumen API\" `<h2>`.",
      "HTTP methods are written as text badges (GET, POST), not shown by colour alone.",
    ],
  },
  "api-key-list": {
    faq: [
      {
        q: "Should I pass the full API key to the list?",
        a: "No. Pass a masked `preview` such as `md_live_••••8f2a`. Show the full secret once, right after creation, with [`SecretReveal`](/docs/secret-reveal) or [`CreateApiKey`](/docs/create-api-key), and never store it in the client.",
      },
      {
        q: "Why do I see Production and Staging keys I never added?",
        a: "Leaving `keys` out shows sample data. Pass an empty array to get the \"No keys yet. Create one to call the API.\" empty state, which is also what to pass while your keys load.",
      },
      {
        q: "Can I revoke a key from the list?",
        a: "Rows have one action, Rotate, which calls `onRotate` with that key's object. For revoke or delete, edit the row in the file or use [`DataTable`](/docs/data-table) with your own columns.",
      },
    ],
    a11y: [
      "The card is a `<section>` labelled by its `<h3>` title.",
      "Each Rotate button is named \"Rotate {name} key\", so screen readers can tell the rows apart.",
    ],
  },
  "build-pipeline": {
    faq: [
      {
        q: "Can a stage link to its logs?",
        a: "No. Stages are static list items with no `href` or click handler. Link the whole pipeline to your logs, or edit the stage markup in the file to render a link.",
      },
      {
        q: "Which statuses are there?",
        a: "`success`, `running`, `failed` and `pending`. Running shows a spinning loader, failed adds a red edge, pending mutes the text. For skipped or queued checks use [`CheckRunList`](/docs/check-run-list).",
      },
      {
        q: "Can two stages have the same name?",
        a: "Avoid it. `name` is the React key, so two \"Test\" stages trigger a duplicate-key warning and can be mixed up when the list updates. Use \"Test (unit)\" and \"Test (e2e)\".",
      },
    ],
    a11y: [
      "The pipeline is an `<ol>` named by `label` (default \"Pipeline\"), so screen readers hear the stage count and order.",
      "Each stage reads its status in text, for example \"Audit, running\". The running stage also has `aria-current=\"step\"`.",
      "Icons and connecting lines are `aria-hidden`. Under reduced motion the kit stylesheet cuts the spin to one 0.01ms turn, so the running icon stands still.",
    ],
  },
  "check-run-list": {
    faq: [
      {
        q: "How do I show how long each check took?",
        a: "Pass `detail`, such as `{ name: \"e2e\", status: \"success\", detail: \"1m 12s\" }`. It shows before the status word in tabular numbers.",
      },
      {
        q: "What is the difference between queued and skipped?",
        a: "Both use a muted icon: queued is a dashed circle for a check that has not started, skipped a slashed circle for one that will not run. Only failed is coloured red in the text.",
      },
    ],
    a11y: [
      "The list is a `<ul>` named by `label` (default \"Checks\").",
      "Every status is spelled out as a word (\"success\", \"failed\"…). Icons are `aria-hidden`, so meaning never depends on colour.",
      "Under reduced motion the kit stylesheet cuts the spin to one 0.01ms turn, so the running icon stands still.",
    ],
  },
  "code-block": {
    faq: [
      {
        q: "Does CodeBlock use Shiki or Prism?",
        a: "No. It colours strings, keywords, JSX tags, capitalised names, numbers and comments with one small regex, so it adds no dependency. `language` only sets the header label. For full grammar-based highlighting, render Shiki output inside your own frame.",
      },
      {
        q: "Are line numbers copied?",
        a: "No. Copy writes the original `code` string, and the numbers from `showLineNumbers` have `select-none`, so selecting text by hand skips them too.",
      },
      {
        q: "Can I render it from a Server Component?",
        a: "Yes. The file is marked `\"use client\"` for the copy button, but `code`, `language` and `filename` are plain strings, so a Server Component can pass them, for example from a file read at build time.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves to the Copy button, then to the code area." },
      { keys: "Enter / Space", action: "On Copy, copies the code." },
      { keys: "ArrowLeft / ArrowRight", action: "In the focused code area, scrolls long lines sideways." },
    ],
    a11y: [
      "The `<pre>` is focusable (`tabIndex={0}`) and named \"{filename} source\" or \"{language} code\", so keyboard users can scroll it.",
      "After a copy, a polite live region says \"Code copied to clipboard\", and the button's name changes to \"Copied\" for 1.4s. A blocked clipboard shows nothing rather than a false success.",
    ],
  },
  "code-editor-frame": {
    faq: [
      {
        q: "Is CodeEditorFrame an editor?",
        a: "No. It is the chrome: a tab bar with `filename` and `actions` over a monospace body with 12px padding and a 160px minimum height. Put a `<textarea>`, CodeMirror or Monaco inside as `children`.",
      },
      {
        q: "How do I make Monaco fill the frame?",
        a: "Give the body a fixed height and remove its padding: `className=\"[&>div:last-child]:h-96 [&>div:last-child]:p-0\"`, then render Monaco with `height=\"100%\"` inside. The body only has `min-h-40`, and a percentage height cannot resolve against a minimum, so a height on the outer frame alone leaves Monaco collapsed.",
      },
    ],
    a11y: [
      "With a `filename`, the frame is a `role=\"group\"` named by that file name. Without one it has no role.",
      "The frame does not label your editor. Give the `<textarea>` or editor its own `aria-label`.",
    ],
  },
  "commit-row": {
    faq: [
      {
        q: "Why do I get a hydration warning about the time?",
        a: "The relative time (\"3h ago\") depends on when it renders. Pass a fixed `date` from your data so server and client start from the same instant. The `<time>` element suppresses the small text mismatch that is left.",
      },
      {
        q: "What does it show without a date?",
        a: "A sample time three hours ago. Always pass `date` with the commit's real timestamp.",
      },
      {
        q: "Does the relative time keep updating?",
        a: "No. CommitRow does not set `live` on [`RelativeTime`](/docs/relative-time), so \"5m ago\" stays as rendered until the row re-renders. The full date is in the `<time>` element's `title`.",
      },
    ],
    a11y: [
      "The copy button is named \"Copy commit {sha}\", and a polite live region says \"Copied\" afterwards.",
      "The avatar is `aria-hidden`, because the author's name is written in the row.",
      "The time is a `<time dateTime>` element, so the exact instant is machine-readable.",
    ],
  },
  "console-output": {
    faq: [
      {
        q: "Does it scroll to the newest line?",
        a: "No. The pane caps at `max-h-64` and scrolls, but it never moves the scroll position. The file is yours, so add a ref to the root and set `scrollTop = scrollHeight` in an effect when `lines` changes.",
      },
      {
        q: "Does it understand ANSI colour codes?",
        a: "No. Each line's `text` is shown as is, with whitespace kept. Strip ANSI codes first and set `level` to `\"warn\"` or `\"error\"` for the lines that need a tag.",
      },
      {
        q: "How is it different from TerminalWindow?",
        a: "ConsoleOutput is a plain log pane with level tags for build or function output. [`TerminalWindow`](/docs/terminal-window) draws a shell window for showing commands and their output.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the log pane." },
      { keys: "ArrowUp / ArrowDown", action: "Scrolls the focused pane." },
    ],
    a11y: [
      "The pane has `role=\"log\"`, named by `label` (default \"Console\"). `role=\"log\"` is polite by default, so screen readers read lines added later.",
      "Warn, info and error lines start with the level as a word, not just a colour.",
      "The pane has `tabIndex={0}` and a focus ring, so keyboard users can scroll it.",
    ],
  },
  "copy-id": {
    faq: [
      {
        q: "What happens to a very long id?",
        a: "The chip truncates the text at 160px but copies the full `value`. The full id is also in the `title` tooltip and in the button's accessible name.",
      },
      {
        q: "How do I show a toast after copying?",
        a: "Use `onCopy`, which runs only after the id is on the clipboard: `onCopy={(id) => toast(\"Copied \" + id)}`. If the browser blocks the clipboard, it is not called.",
      },
    ],
    a11y: [
      "The button is named \"Copy {value}\", so the id is read in full even when truncated.",
      "\"Copied\" is announced from a polite live region placed beside the button, not inside it, because a button's children are presentational.",
      "The copied state lasts 1.2s and is shown with a check icon, which is `aria-hidden`.",
    ],
  },
  "coverage-meter": {
    faq: [
      {
        q: "How do I change the colour thresholds?",
        a: "Pass `good` and `warn`. A value at or above `good` (default 80) is green, at or above `warn` (default 60) is amber, and anything lower is red.",
      },
      {
        q: "What happens with values like 86.47 or 104?",
        a: "Values are clamped to 0-100 and the label rounds to one decimal, so 86.47 shows as 86.5% and 104 as 100%.",
      },
      {
        q: "When should I use Progress instead?",
        a: "Use CoverageMeter for a score that is good or bad. Use [`Progress`](/docs/progress) for a task moving towards done, and [`UsageMeter`](/docs/usage-meter) for usage against a limit.",
      },
    ],
    a11y: [
      "The bar is a `role=\"meter\"` labelled by the visible label, with `aria-valuenow`, 0-100 bounds and `aria-valuetext` such as \"86%\".",
      "The visible percentage is `aria-hidden`, so it is not read twice.",
    ],
  },
  "create-api-key": {
    faq: [
      {
        q: "How do I show the new key after it is created?",
        a: "Return the secret from your API in `onCreate`, store it in state, and show it once with [`SecretReveal`](/docs/secret-reveal) below the row. Add the masked key to [`ApiKeyList`](/docs/api-key-list) at the same time.",
      },
      {
        q: "What happens if creating the key fails?",
        a: "Return the promise from `onCreate`. The field clears only when it resolves. If it rejects, the name stays so the person can try again; show the error yourself. Pass `disabled` while the request runs so Enter cannot send it twice.",
      },
    ],
    keyboard: [
      { keys: "Enter", action: "In the name field, creates the key. Same as pressing Create key." },
      { keys: "Tab", action: "Moves from the field to Create key once there is a name." },
    ],
    a11y: [
      "The field has a visible label (default \"Key name\") tied to it through `FormField`.",
      "Create key is a native disabled button until the name has non-space text, so it is skipped by Tab until then.",
    ],
  },
  "diff-view": {
    faq: [
      {
        q: "Can I pass a git unified diff string?",
        a: "Not directly. `lines` takes objects: `{ type: \"add\" | \"del\" | \"ctx\", text }`. Split the patch by line, map `+` to `add`, `-` to `del` and a leading space to `ctx`, and drop the marker and the `@@` hunk headers.",
      },
      {
        q: "Does DiffView show line numbers or a split view?",
        a: "No. It is a single-column unified view with +/- markers and no line numbers. For one changed line use [`InlineCodeDiff`](/docs/inline-code-diff).",
      },
      {
        q: "Is it fast for large diffs?",
        a: "Every line is rendered as one `<div>`, with no virtualisation. For whole-file diffs, pass only the changed hunks with a few context lines.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the diff so it can be scrolled." },
      { keys: "ArrowLeft / ArrowRight", action: "Scrolls long lines sideways while the diff has focus." },
    ],
    a11y: [
      "Changed lines start with a visually hidden \"added: \" or \"removed: \". The visible + and - markers are `aria-hidden`.",
      "The `<pre>` has `role=\"region\"`, is named \"Diff for {filename}\", and has `tabIndex={0}` for keyboard scrolling.",
    ],
  },
  "docs-marketing": {
    faq: [
      {
        q: "Does the search box work?",
        a: "Not yet. The [`SearchInput`](/docs/search-input) in the hero has an accessible name but no handler. Wire its `onChange` to your search, or open a command palette from it.",
      },
      {
        q: "What happens under reduced motion?",
        a: "The hero's eyebrow and heading skip their fade (`initial` is `false`), and each [`ScrollReveal`](/docs/scroll-reveal) section renders in place. Content is visible either way.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the search field, Get started, API reference, the table of contents links, the code sample's Copy button and its scrollable code area." },
    ],
    a11y: [
      "The page has one `<h1>` in the hero and `<h2>` section headings, which the [`Toc`](/docs/toc) links to by id.",
      "The table of contents is a `<nav>` named \"Table of contents\", and the current entry has `aria-current=\"location\"`.",
      "The search field is named \"Search docs\".",
    ],
  },
  "docs-page": {
    faq: [
      {
        q: "Does the table of contents follow the scroll position?",
        a: "No. [`Toc`](/docs/toc) marks the entry that was clicked last. For a rail that highlights the heading in view, use [`TableOfContents`](/docs/table-of-contents), which spies on headings as you scroll.",
      },
      {
        q: "How do I use it with MDX?",
        a: "Replace the [`Prose`](/docs/prose) children with your MDX content and build the `Toc` items from its headings. Every item `id` must match a heading id in the article.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves through the table of contents links, then each code sample's Copy button and code area." },
    ],
    a11y: [
      "The article has a single `<h1>` and `<h2>` subheadings, and each Toc link jumps to a heading by id.",
      "The Toc is a `<nav>` named \"Table of contents\". It is sticky only from the `lg` breakpoint and stacks above the article on small screens.",
    ],
  },
  "engineering-console": {
    faq: [
      {
        q: "Does switching to Staging change the data shown?",
        a: "No. The [`EnvSwitcher`](/docs/env-switcher) value is kept in state, but the panels below use fixed sample data. Edit the file to fetch builds, commits and checks for the selected `env`.",
      },
    ],
    keyboard: [
      { keys: "ArrowLeft / ArrowRight", action: "On the environment switch or the tab list, moves between options." },
      { keys: "Tab", action: "Moves from the environment switch to the tab list, then into the open panel." },
    ],
    a11y: [
      "The environment switch is a radio group named \"Environment\". The tabs use Base UI `Tabs`, with `role=\"tablist\"`, `role=\"tab\"` and `role=\"tabpanel\"`.",
      "The pipeline is an ordered list that reads each stage's status in words, and the running stage has `aria-current=\"step\"`.",
    ],
  },
  "env-badge": {
    faq: [
      {
        q: "Can I show a preview or QA environment?",
        a: "No. `env` accepts `\"production\"`, `\"staging\"` or `\"development\"`, and each maps to a tone. Add a key to `tones` in the file, or use [`Badge`](/docs/badge) for other names.",
      },
      {
        q: "Why doesn't EnvBadge accept the values from EnvSwitcher?",
        a: "[`EnvSwitcher`](/docs/env-switcher) uses short values (`\"dev\"`, `\"staging\"`, `\"prod\"`) and EnvBadge uses full names. Map one to the other, for example `{ dev: \"development\", staging: \"staging\", prod: \"production\" }[env]`.",
      },
    ],
    a11y: [
      "The environment is written in text, so production is never signalled by its red border alone.",
      "The name is lowercase in the DOM (`production`) and uppercased only by CSS, so assistive tech gets the plain word, not all-caps text.",
    ],
  },
  "env-switcher": {
    faq: [
      {
        q: "Can I rename or add environments?",
        a: "No. The options are fixed to Dev, Staging and Prod with values `\"dev\"`, `\"staging\"` and `\"prod\"`. For other sets use [`SegmentedControl`](/docs/segmented-control) with your own `options`.",
      },
      {
        q: "How do I keep the chosen environment in the URL?",
        a: "Control it: read `value` from the search params and in `onChange` push `?env=staging` with the router. The switcher holds no state while `value` is set.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Moves focus to the selected environment." },
      { keys: "ArrowRight / ArrowDown", action: "Moves to the next environment and selects it. Wraps at the end." },
      { keys: "ArrowLeft / ArrowUp", action: "Moves to the previous environment and selects it." },
      { keys: "Home / End", action: "Selects Dev or Prod." },
    ],
    a11y: [
      "It is a `role=\"radiogroup\"` named \"Environment\", and each option is a radio with `aria-checked`.",
      "Under reduced motion the selection thumb moves with no animation.",
    ],
  },
  "file-reference": {
    faq: [
      {
        q: "How do I make a file reference open the file?",
        a: "FileReference is a plain `<div>` with no `href` or click handler. Wrap it in a link, for example `<Link href=\"/repo/src/lib/billing.ts#L42\"><FileReference … /></Link>`, so it is focusable and opens with Enter.",
      },
      {
        q: "Why does it show hero-client-pitch.tsx?",
        a: "Those are the sample defaults. Pass your own `name`, `path` and `lines`. To hide the line range, pass `lines=\"\"`: leaving `lines` out falls back to the sample \"1–92\".",
      },
    ],
    a11y: [
      "The line range is read as \"Lines 42–68\" through a visually hidden prefix.",
      "The long path truncates visually but keeps the full text in the DOM and in its `title`.",
      "The file icon is `aria-hidden`.",
    ],
  },
  "file-tree": {
    faq: [
      {
        q: "How do I mark a node as a folder?",
        a: "Give it a `children` array, even an empty one: `{ name: \"migrations\", children: [] }`. A node without `children` is a file. Paths are names joined by \"/\", such as `app/dashboard/page.tsx`, and that is what `onSelect` receives.",
      },
      {
        q: "Can folders load their contents when opened?",
        a: "No. There is no expand callback, and an empty folder shows no children. Load the whole tree first, or update `data` from `onSelect` when a folder path comes in.",
      },
      {
        q: "Why is my file order different from my data?",
        a: "`sort` is on by default: folders first, then names A to Z. Pass `sort={false}` to keep the order of `data`.",
      },
      {
        q: "What does the filter field do?",
        a: "It keeps names that contain the text plus their parent folders, opens those folders, and highlights the match. Folders cannot be closed while filtering. Pass `searchable={false}` to hide it.",
      },
    ],
    keyboard: [
      { keys: "ArrowDown / ArrowUp", action: "Moves to the next or previous visible item." },
      { keys: "ArrowRight", action: "Opens a closed folder. On an open folder, moves to its first child." },
      { keys: "ArrowLeft", action: "Closes an open folder. On a file or closed folder, moves to its parent." },
      { keys: "Home / End", action: "Moves to the first or last visible item." },
      { keys: "Enter / Space", action: "Selects the item and calls `onSelect`. On a folder it also opens or closes it." },
      { keys: "*", action: "Opens every folder at the same level as the focused item." },
      { keys: "A-Z", action: "Moves to the next item whose name starts with the typed letters." },
      { keys: "ArrowDown", action: "In the filter field, moves focus to the first item in the tree." },
      { keys: "Escape", action: "In the filter field, clears the filter." },
    ],
    a11y: [
      "The list is a WAI-ARIA `role=\"tree\"` of `role=\"treeitem\"` nodes with `aria-level`, `aria-posinset`, `aria-setsize`, `aria-expanded` on folders and `aria-selected`.",
      "Git status is part of each item's name, such as \"page.tsx, modified\". A closed folder with changes inside reads \"contains changes\". The open file has `aria-current=\"page\"`.",
      "While filtering, a polite live region announces the number of matches.",
      "Under reduced motion folders open and close with no height animation.",
    ],
  },
  "inline-code-diff": {
    faq: [
      {
        q: "Can I show more than one changed line?",
        a: "Yes, within limits. Each side is a `<pre>`, so a `\\n` inside `before` or `after` shows as extra lines, but they all share one tint and one marker. For several hunks or context lines use [`DiffView`](/docs/diff-view).",
      },
      {
        q: "Does it highlight the changed characters?",
        a: "No. The whole old line is tinted red and the whole new line green, with no word-level marking.",
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focuses the Before line, then the After line." },
      { keys: "ArrowLeft / ArrowRight", action: "Scrolls a focused long line sideways." },
    ],
    a11y: [
      "The old line is a `<del>` and the new one an `<ins>`, each starting with a visually hidden \"Removed: \" or \"Added: \".",
      "The visible - and + markers are `aria-hidden`.",
      "Each line is a focusable `<pre>` region named \"Before\" or \"After\" with a focus ring, so keyboard users can Tab to a long line and scroll it with the arrow keys.",
    ],
  },
}
