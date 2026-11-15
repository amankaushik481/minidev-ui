"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { SsoProviderCard } from "@/registry/ui/sso-provider-card"
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/registry/ui/alert-dialog"
import type { Example } from "./types"

function SsoSettings() {
  const [saml, setSaml] = React.useState(true)
  const [oidc, setOidc] = React.useState(false)
  const [note, setNote] = React.useState("")
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
      <SsoProviderCard name="Acme SAML" description="SAML 2.0 · 48 users" configured enabled={saml} onEnabledChange={setSaml} onConfigure={() => setNote("Opening SAML settings…")} />
      <SsoProviderCard
        name="Partner OIDC"
        description="OpenID Connect · not set up"
        enabled={oidc}
        onEnabledChange={(next) => {
          // configured is false, so refuse to turn it on and send the admin to setup instead.
          if (next) return setNote("Set up Partner OIDC before turning it on.")
          setOidc(false)
        }}
        onConfigure={() => setNote("Opening OIDC setup…")}
      />
      <p role="status" className="text-xs text-fg-muted sm:col-span-2">{note}</p>
    </div>
  )
}

function ConfirmDisable() {
  const [enabled, setEnabled] = React.useState(true)
  const [confirming, setConfirming] = React.useState(false)
  return (
    <>
      <SsoProviderCard
        className="w-full max-w-sm"
        name="Acme SAML"
        description="SAML 2.0 · 48 users"
        configured
        enabled={enabled}
        onEnabledChange={(next) => (next ? setEnabled(true) : setConfirming(true))}
      />
      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogTitle>Turn off Acme SAML?</AlertDialogTitle>
          <AlertDialogDescription>48 people sign in with it. They will need a password reset to get back in.</AlertDialogDescription>
          <AlertDialogActions>
            <AlertDialogClose render={<Button variant="outline" />}>Keep it on</AlertDialogClose>
            <AlertDialogClose render={<Button variant="destructive" />} onClick={() => setEnabled(false)}>Turn off</AlertDialogClose>
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export const examples: Example[] = [
  {
    title: "Security settings",
    description: "One card per provider. The second is not configured, so its handler refuses to turn it on.",
    code: `function SsoSettings() {
  const [saml, setSaml] = React.useState(true)
  const [oidc, setOidc] = React.useState(false)
  const [note, setNote] = React.useState("")
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
      <SsoProviderCard name="Acme SAML" description="SAML 2.0 · 48 users" configured enabled={saml} onEnabledChange={setSaml} onConfigure={() => setNote("Opening SAML settings…")} />
      <SsoProviderCard
        name="Partner OIDC"
        description="OpenID Connect · not set up"
        enabled={oidc}
        onEnabledChange={(next) => {
          // configured is false, so refuse to turn it on and send the admin to setup instead.
          if (next) return setNote("Set up Partner OIDC before turning it on.")
          setOidc(false)
        }}
        onConfigure={() => setNote("Opening OIDC setup…")}
      />
      <p role="status" className="text-xs text-fg-muted sm:col-span-2">{note}</p>
    </div>
  )
}`,
    node: <SsoSettings />,
  },
  {
    title: "Confirm before turning off",
    description: "Keep enabled controlled and only set it to false after the admin confirms in an AlertDialog.",
    code: `function ConfirmDisable() {
  const [enabled, setEnabled] = React.useState(true)
  const [confirming, setConfirming] = React.useState(false)
  return (
    <>
      <SsoProviderCard
        className="w-full max-w-sm"
        name="Acme SAML"
        description="SAML 2.0 · 48 users"
        configured
        enabled={enabled}
        onEnabledChange={(next) => (next ? setEnabled(true) : setConfirming(true))}
      />
      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogTitle>Turn off Acme SAML?</AlertDialogTitle>
          <AlertDialogDescription>48 people sign in with it. They will need a password reset to get back in.</AlertDialogDescription>
          <AlertDialogActions>
            <AlertDialogClose render={<Button variant="outline" />}>Keep it on</AlertDialogClose>
            <AlertDialogClose render={<Button variant="destructive" />} onClick={() => setEnabled(false)}>Turn off</AlertDialogClose>
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}`,
    node: <ConfirmDisable />,
  },
]
