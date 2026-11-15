"use client"
import * as React from "react"
import { ProfileForm } from "@/registry/ui/profile-form"
import { AvatarUpload } from "@/registry/ui/avatar-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

function SaveDemo() {
  const [saved, setSaved] = React.useState("")
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ProfileForm
        defaultValues={{ name: "Ines Duarte", bio: "Finance lead at Northwind. Ask me about payment terms." }}
        onSubmit={({ name }) => setSaved(`Saved. Others now see you as ${name}.`)}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{saved}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Prefilled from the account",
    description: "Pass defaultValues, or the name field shows the sample name. onSubmit gets both values trimmed.",
    code: `function SaveDemo() {
  const [saved, setSaved] = React.useState("")
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ProfileForm
        defaultValues={{ name: "Ines Duarte", bio: "Finance lead at Northwind. Ask me about payment terms." }}
        onSubmit={({ name }) => setSaved(\`Saved. Others now see you as \${name}.\`)}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{saved}</p>
    </div>
  )
}`,
    node: <SaveDemo />,
  },
  {
    title: "With a photo",
    description: "Put AvatarUpload above the form in the same card; the photo uploads on its own, the form saves name and bio.",
    code: `<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>Profile</CardTitle>
    <CardDescription>Shown on invoices you send and in comments.</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <AvatarUpload name="Theo Okafor" />
    <ProfileForm defaultValues={{ name: "Theo Okafor" }} />
  </CardContent>
</Card>`,
    node: (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Shown on invoices you send and in comments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AvatarUpload name="Theo Okafor" />
          <ProfileForm defaultValues={{ name: "Theo Okafor" }} />
        </CardContent>
      </Card>
    ),
  },
]
