"use client"
import * as React from "react"
import { AuthCard } from "@/registry/ui/auth-card"
import { Button } from "@/registry/ui/button"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Email and password sign in",
    description: "AuthCard is layout only, so the form wraps it; footer holds the switch to sign up.",
    code: `<form className="w-full" onSubmit={(e) => e.preventDefault()}>
  <AuthCard
    title="Sign in to Lumen"
    description="Use your work email."
    footer={<>No account? <a href="#sign-up">Create one</a></>}
  >
    <FormField id="signin-email" label="Email">
      <Input id="signin-email" name="email" type="email" autoComplete="email" required />
    </FormField>
    <FormField id="signin-password" label="Password">
      <Input id="signin-password" name="password" type="password" autoComplete="current-password" required />
    </FormField>
    <Button type="submit" className="w-full">Sign in</Button>
  </AuthCard>
</form>`,
    node: (
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <AuthCard
          title="Sign in to Lumen"
          description="Use your work email."
          footer={<>No account? <a href="#sign-up">Create one</a></>}
        >
          <FormField id="signin-email" label="Email">
            <Input id="signin-email" name="email" type="email" autoComplete="email" required />
          </FormField>
          <FormField id="signin-password" label="Password">
            <Input id="signin-password" name="password" type="password" autoComplete="current-password" required />
          </FormField>
          <Button type="submit" className="w-full">Sign in</Button>
        </AuthCard>
      </form>
    ),
  },
  {
    title: "Check your email",
    description: "The same frame for a message-only step, such as after sign up.",
    code: `<AuthCard
  title="Check your email"
  description="We sent a confirmation link to maya@northwind.example. It expires in 30 minutes."
  footer={<>Wrong address? <a href="#sign-up">Start again</a></>}
>
  <Button variant="outline" className="w-full">Resend email</Button>
</AuthCard>`,
    node: (
      <AuthCard
        title="Check your email"
        description="We sent a confirmation link to maya@northwind.example. It expires in 30 minutes."
        footer={<>Wrong address? <a href="#sign-up">Start again</a></>}
      >
        <Button variant="outline" className="w-full">Resend email</Button>
      </AuthCard>
    ),
  },
]
