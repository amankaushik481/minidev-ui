import type { Guide } from "../types"

const guide: Guide = {
  slug: "saas-settings-page",
  title: "Design a SaaS settings page that scales",
  description:
    "Design a SaaS settings page in React that scales: information architecture, autosave vs explicit save, team roles, API keys and safe destructive actions.",
  date: "2026-09-30",
  keywords: [
    "saas settings page design",
    "react settings page",
    "account settings ui",
    "settings page nextjs",
    "team settings roles permissions",
  ],
  related: [
    "settings-layout",
    "settings-page",
    "profile-form",
    "team-member-row",
    "invite-members",
    "role-permission-matrix",
    "api-key-list",
    "danger-zone",
    "delete-account-confirm",
    "notification-preferences",
    "switch",
    "form-field",
    "alert-dialog",
  ],
  body: [
    {
      type: "p",
      text: "A SaaS settings page that scales separates personal settings from workspace settings, gives each group its own URL, and applies one save pattern per section: toggles save instantly, text forms save with an explicit button. Destructive actions sit at the bottom behind a typed confirmation, and every permission is checked on the server, not just hidden in the UI. This guide builds that structure in React and Next.js with the free MiniDev UI settings components.",
    },

    { type: "h2", text: "Information architecture first", id: "information-architecture" },
    {
      type: "p",
      text: "Settings pages rot because they grow by accretion: every feature adds a toggle wherever there is room. Decide the structure before the first form. Two questions sort almost every setting: **who owns it** (the person or the workspace) and **how often it changes**.",
    },
    {
      type: "table",
      head: ["Group", "Sections", "Who can edit", "Save pattern"],
      rows: [
        ["Account (personal)", "Profile, Security, Notifications, Appearance", "The user", "Forms: explicit. Toggles: autosave"],
        ["Workspace", "General, Members, Roles, Billing, API keys", "Admins and owners", "Explicit, with audit log"],
        ["Danger zone", "Transfer, delete", "Owner only", "Typed confirmation"],
      ],
    },
    {
      type: "list",
      items: [
        "Give each section a route (`/settings/profile`, `/settings/members`). People bookmark them, support links to them, and each page loads only its own data.",
        "Order sections by frequency of use. Profile and notifications first, API keys and danger zone last.",
        "Name sections with nouns people already use. \"Members\" beats \"Collaboration\".",
        "Keep billing under settings in the nav, but give it its own page; the [billing page guide](/guides/nextjs-billing-page-stripe) covers it.",
      ],
    },

    { type: "h2", text: "The layout: a nav column and sections", id: "layout" },
    {
      type: "p",
      text: "[SettingsLayout](/docs/settings-layout) is a two-column grid: a 200px `nav` slot on the left from the `md` breakpoint, content on the right, stacked on small screens. The same file exports `SettingsSection`, which renders an `h2` title, an optional description and a bottom border between sections. Put the settings nav in a nested layout so it persists across section routes:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/settings/layout.tsx",
      code: 'import { PageHeader } from "@/components/ui/page-header"\nimport { SettingsLayout } from "@/components/ui/settings-layout"\nimport { SettingsNav } from "./settings-nav"\n\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return (\n    <div className="space-y-6">\n      <PageHeader title="Settings" description="Manage your account and this workspace." />\n      <SettingsLayout nav={<SettingsNav />}>{children}</SettingsLayout>\n    </div>\n  )\n}',
    },
    {
      type: "p",
      text: "`SettingsNav` is a client component that renders `next/link` items with `aria-current=\"page\"` on the active one, grouped under small \"Account\" and \"Workspace\" labels. The [sidebar layout guide](/guides/shadcn-sidebar-layout) shows the active-link pattern in detail. On phones the nav stacks above the content, so keep it short or swap it for a select below `md`.",
    },
    { type: "component", name: "settings-layout" },

    { type: "h2", text: "Save patterns: autosave or explicit", id: "save-patterns" },
    {
      type: "p",
      text: "Mixing patterns inside one section is the most common settings bug: a user flips a toggle (saved), edits a name (not saved), and leaves. Pick one pattern per section using this rule:",
    },
    {
      type: "list",
      items: [
        "**Autosave** binary, independent choices: notification toggles, theme, a single select. The control is the save button.",
        "**Explicit save** anything typed, anything validated, and fields that only make sense together (a billing address, an SSO configuration). Show one Save button per section, disabled until something changes.",
        "**Confirm** anything irreversible or that affects other people: role changes, removing a member, rotating a key, deleting data.",
      ],
    },
    { type: "h3", text: "Autosave toggles" },
    {
      type: "p",
      text: "[Switch](/docs/switch) has a settings-row mode: pass `label` and `description` and the whole row becomes clickable. Its `loading` prop shows a spinner in the thumb, blocks toggling and announces \"Saving\" to screen readers. Update optimistically, then revert and explain if the server rejects it (see [optimistic UI](/glossary/optimistic-ui)):",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/settings/notifications/notification-toggle.tsx",
      code: '"use client"\nimport * as React from "react"\nimport { Switch } from "@/components/ui/switch"\nimport { toast } from "@/components/ui/toast"\nimport { setNotification } from "./actions"\n\nexport function NotificationToggle({ id, label, description, initial }: {\n  id: string; label: string; description: string; initial: boolean\n}) {\n  const [on, setOn] = React.useState(initial)\n  const [saving, setSaving] = React.useState(false)\n  return (\n    <Switch\n      label={label}\n      description={description}\n      checked={on}\n      loading={saving}\n      onCheckedChange={async (next) => {\n        setOn(next)\n        setSaving(true)\n        const res = await setNotification(id, next)\n        setSaving(false)\n        if (!res.ok) {\n          setOn(!next)\n          toast.error("Could not update " + label.toLowerCase(), { description: res.error })\n        }\n      }}\n    />\n  )\n}',
    },
    {
      type: "p",
      text: "[NotificationPreferences](/docs/notification-preferences) shows the visual pattern with three hardcoded rows; replace its array with your own list of `NotificationToggle`s.",
    },
    { type: "h3", text: "Explicit forms" },
    {
      type: "p",
      text: "For typed fields, use a form with a server action and `useActionState`. [FormField](/docs/form-field) wires the label and renders `error` with `role=\"alert\"`. React resets uncontrolled fields after a form action, so return the submitted values and feed them back as `defaultValue`; otherwise a validation error wipes what the user typed.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/settings/profile/profile-section.tsx",
      code: '"use client"\nimport { useActionState } from "react"\nimport { FormField } from "@/components/ui/form-field"\nimport { Input } from "@/components/ui/input"\nimport { Textarea } from "@/components/ui/textarea"\nimport { Button } from "@/components/ui/button"\nimport { updateProfile, type ProfileState } from "./actions"\n\nexport function ProfileSection({ name, bio }: { name: string; bio: string }) {\n  const [state, action, pending] = useActionState<ProfileState, FormData>(updateProfile, {})\n  return (\n    <form action={action} className="max-w-md space-y-3">\n      <FormField id="name" label="Display name" required error={state.errors?.name}>\n        <Input id="name" name="name" defaultValue={state.values?.name ?? name} aria-invalid={!!state.errors?.name} />\n      </FormField>\n      <FormField id="bio" label="Bio" description="Shown on your public profile.">\n        <Textarea id="bio" name="bio" defaultValue={state.values?.bio ?? bio} />\n      </FormField>\n      <Button type="submit" disabled={pending}>{pending ? "Saving" : "Save profile"}</Button>\n    </form>\n  )\n}',
    },
    {
      type: "p",
      text: "[ProfileForm](/docs/profile-form) is the same layout as a static demo: its name field has a hardcoded `defaultValue` and its submit handler only calls `preventDefault`. Treat it as a starting point and wire it as above.",
    },

    { type: "h2", text: "Members, invites and roles", id: "members" },
    {
      type: "p",
      text: "[TeamMemberRow](/docs/team-member-row) takes `name`, `email` and `role`, shows initials in an avatar and the role as an outline badge. Rows carry a bottom border, so wrap the list in one bordered container. Render the list in a server component and gate management controls on the viewer's role:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/settings/members/page.tsx",
      code: 'import { SettingsSection } from "@/components/ui/settings-layout"\nimport { TeamMemberRow } from "@/components/ui/team-member-row"\nimport { InviteForm } from "./invite-form"\n\nexport default async function MembersPage() {\n  const { user, workspace } = await requireSession()\n  const members = await getMembers(workspace.id)\n  const canManage = can(user, workspace, "members:manage")\n  return (\n    <>\n      <SettingsSection title="Members" description={members.length + " people have access to " + workspace.name + "."}>\n        <div className="rounded-xl border border-border">\n          {members.map((m) => (\n            <TeamMemberRow key={m.id} name={m.name} email={m.email} role={m.role} />\n          ))}\n        </div>\n      </SettingsSection>\n      {canManage ? (\n        <SettingsSection title="Invite" description="Invites expire after 7 days.">\n          <InviteForm />\n        </SettingsSection>\n      ) : null}\n    </>\n  )\n}',
    },
    {
      type: "p",
      text: "[InviteMembers](/docs/invite-members) is the invite card design (email input, Send button, pending invites as badges) with sample content; copy its markup into `InviteForm` and connect it to a server action. [RolePermissionMatrix](/docs/role-permission-matrix) takes `roles` and `permissions` string arrays and renders a table of checkboxes with accessible labels such as \"Admin Invite\". Its checkboxes are uncontrolled with a demo default (every role except \"Member\" gets everything, Member gets only \"Read\"), so for real data edit your copy to accept a `value` map and an `onChange`.",
    },
    { type: "h3", text: "Enforce on the server, reflect in the UI" },
    {
      type: "list",
      items: [
        "Every server action checks the permission again. Hiding a button is a courtesy, not access control.",
        "Hide controls a role can never use (a Member does not need a greyed-out Delete workspace button). Disable, with a reason in a tooltip, controls that are temporarily unavailable.",
        "Prefer a few fixed roles (Owner, Admin, Member, Viewer) over a fully custom matrix until customers ask. A matrix is powerful and hard to audit.",
        "Log role changes, invites and removals with who did it and when. Admins will ask.",
      ],
    },
    { type: "component", name: "role-permission-matrix" },

    { type: "h2", text: "API keys", id: "api-keys" },
    {
      type: "p",
      text: "[ApiKeyList](/docs/api-key-list) takes `keys: { id, name, preview, created }[]` and renders each with a monospace preview and a Rotate button; the Create key and Rotate buttons have no handlers, so add them in your copy. The rules that matter live on the server:",
    },
    {
      type: "list",
      items: [
        "Show the full secret exactly once, at creation, with a copy button. Store only a hash.",
        "Store a short prefix and the last four characters for the preview (`md_live_••••8f2a`) so people can tell keys apart.",
        "Rotation creates a new key and keeps the old one valid for a stated grace period, then revokes it. Instant rotation breaks production integrations.",
        "Show last-used time. It is the fastest way for someone to know which key is safe to delete.",
      ],
    },

    { type: "h2", text: "Destructive actions", id: "destructive-actions" },
    {
      type: "p",
      text: "Keep destructive actions at the bottom of the relevant page, visually separated. [DangerZone](/docs/danger-zone) is that container: a danger-tinted border, a title, a sentence of consequences and a destructive button (sample copy, no handler). [DeleteAccountConfirm](/docs/delete-account-confirm) is the confirmation body: an inline alert, a field, and a Delete button that stays disabled until the user types DELETE, then calls `onConfirm`. Put it in an [AlertDialog](/docs/alert-dialog) so focus is trapped and the rest of the page is inert:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/settings/account/delete-account.tsx",
      code: '"use client"\nimport * as React from "react"\nimport { Button } from "@/components/ui/button"\nimport { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog"\nimport { DeleteAccountConfirm } from "@/components/ui/delete-account-confirm"\nimport { deleteAccount } from "./actions"\n\nexport function DeleteAccount() {\n  const [open, setOpen] = React.useState(false)\n  const [pending, startTransition] = React.useTransition()\n  return (\n    <>\n      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>Delete account</Button>\n      <AlertDialog open={open} onOpenChange={setOpen}>\n        <AlertDialogContent>\n          <AlertDialogTitle>Delete your account?</AlertDialogTitle>\n          <AlertDialogDescription>\n            Your profile, 3 workspaces you own and their projects are removed after 14 days. You can cancel from the email we send.\n          </AlertDialogDescription>\n          <DeleteAccountConfirm className="mt-4" onConfirm={() => startTransition(() => deleteAccount())} />\n          <Button variant="ghost" size="sm" className="mt-2" disabled={pending} onClick={() => setOpen(false)}>Cancel</Button>\n        </AlertDialogContent>\n      </AlertDialog>\n    </>\n  )\n}',
    },
    {
      type: "callout",
      tone: "warning",
      text: "A typed confirmation stops accidents, not attackers. The `deleteAccount` action must re-check the session, require recent authentication for irreversible steps, and ideally schedule deletion with a grace period and an email, so a mistake or a hijacked session can be undone.",
    },
    {
      type: "list",
      items: [
        "Say exactly what goes: counts, names, and whether billing stops.",
        "For a workspace, ask people to type the workspace name, not a generic word. It proves they are on the right one.",
        "Offer the gentler alternative next to the button: leave the workspace, transfer ownership, or export data first.",
      ],
    },

    { type: "h2", text: "Keeping it fast as it grows", id: "scaling" },
    {
      type: "list",
      items: [
        "Each section page is a server component that loads only its data, so a slow members query never delays the profile page.",
        "Add `id`s to sections and link to them (`/settings/notifications#security`) from emails and empty states.",
        "Once you pass about a dozen sections, add settings to a [command palette](/guides/react-command-palette) so people can jump straight to \"API keys\".",
        "Confirm autosaves with a quiet toast only on failure; confirm explicit saves inline or with a short toast. The [toast guide](/guides/nextjs-toast-notifications) covers when each fits.",
      ],
    },

    { type: "h2", text: "Components used", id: "components" },
    {
      type: "p",
      text: "The [settings category](/components/settings) holds settings-layout, profile-form, team-member-row, invite-members, role-permission-matrix, danger-zone, delete-account-confirm and notification-preferences; api-key-list is in [developer tools](/components/developer-tools). The [SettingsPage](/docs/settings-page) block stacks `PageHeader`, `ProfileForm`, `ThemePicker`, `NotificationPreferences` and `DangerZone` on one page, which suits small apps before you split into routes. When a product needs settings, billing and roles built end to end, the [MiniDev studio](https://minidev.pro) builds complete apps on this kit.",
    },
    { type: "component", name: "settings-page" },
    { type: "component", name: "delete-account-confirm" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/settings-layout.json https://ui.minidev.pro/r/team-member-row.json https://ui.minidev.pro/r/delete-account-confirm.json\nnpx shadcn@latest add https://ui.minidev.pro/r/<name>.json",
    },
  ],
  faq: [
    {
      q: "Should settings autosave or use a Save button?",
      a: "Autosave independent toggles and single selects, because the control itself communicates the change. Use an explicit Save button for text fields, validated input and groups of related fields. Never mix both inside one section.",
    },
    {
      q: "How should a settings page be structured in Next.js?",
      a: "Use a nested `settings/layout.tsx` with the section nav, and one route per section such as `settings/profile` and `settings/members`. Each page is a server component that loads its own data and renders client components only for interactive controls.",
    },
    {
      q: "Is hiding buttons enough to enforce roles and permissions?",
      a: "No. Hide or disable controls for clarity, but check the permission again in every server action and API route, because requests can be made without your UI.",
    },
    {
      q: "What is the safest pattern for deleting an account?",
      a: "A dialog that names what will be deleted, a typed confirmation, a server-side re-check with recent authentication, and a scheduled deletion with a grace period and a confirmation email.",
    },
  ],
}

export default guide
