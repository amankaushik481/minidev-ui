"use client"
import * as React from "react"
import { AvatarUpload } from "@/registry/ui/avatar-upload"
import { Button } from "@/registry/ui/button"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import type { Example } from "./types"

function UploadDemo() {
  const [status, setStatus] = React.useState("No new photo yet.")
  return (
    <div className="flex flex-col gap-2">
      <AvatarUpload
        name="Priya Raman"
        buttonLabel="Change photo"
        onChange={(file) => {
          setStatus(`Uploading ${file.name} (${Math.round(file.size / 1024)} KB)…`)
          setTimeout(() => setStatus("Saved. Your new photo shows on comments and approvals."), 900)
        }}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{status}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "With a name",
    description: "name supplies the initials shown until a file is picked; the chosen image previews right away as an object URL.",
    code: `<AvatarUpload name="Theo Okafor" />`,
    node: <AvatarUpload name="Theo Okafor" />,
  },
  {
    title: "In a profile form",
    description: "Place it at the top of the form with a hint about accepted files, then the text fields below.",
    code: `<form className="flex w-full max-w-sm flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
  <div className="flex flex-col gap-1.5">
    <span className="text-sm font-medium text-fg">Photo</span>
    <AvatarUpload name="Maya Chen" />
    <p className="text-xs text-fg-muted">PNG or JPG, at least 256 by 256 pixels.</p>
  </div>
  <FormField id="profile-name" label="Full name">
    <Input id="profile-name" defaultValue="Maya Chen" />
  </FormField>
  <FormField id="profile-title" label="Title" description="Shown next to your comments on invoices.">
    <Input id="profile-title" defaultValue="Head of Finance, Northwind" />
  </FormField>
  <Button type="submit" className="self-start">Save profile</Button>
</form>`,
    node: (
      <form className="flex w-full max-w-sm flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-fg">Photo</span>
          <AvatarUpload name="Maya Chen" />
          <p className="text-xs text-fg-muted">PNG or JPG, at least 256 by 256 pixels.</p>
        </div>
        <FormField id="profile-name" label="Full name">
          <Input id="profile-name" defaultValue="Maya Chen" />
        </FormField>
        <FormField id="profile-title" label="Title" description="Shown next to your comments on invoices.">
          <Input id="profile-title" defaultValue="Head of Finance, Northwind" />
        </FormField>
        <Button type="submit" className="self-start">Save profile</Button>
      </form>
    ),
  },
  {
    title: "Upload on change",
    description: "onChange hands you the picked File while the preview updates on its own; upload it and say what happened.",
    code: `function UploadDemo() {
  const [status, setStatus] = React.useState("No new photo yet.")
  return (
    <div className="flex flex-col gap-2">
      <AvatarUpload
        name="Priya Raman"
        buttonLabel="Change photo"
        onChange={(file) => {
          setStatus(\`Uploading \${file.name} (\${Math.round(file.size / 1024)} KB)…\`)
          setTimeout(() => setStatus("Saved. Your new photo shows on comments and approvals."), 900)
        }}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{status}</p>
    </div>
  )
}`,
    node: <UploadDemo />,
  },
]
