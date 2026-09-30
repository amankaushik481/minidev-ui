import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-otp-input",
  title: "OTP input in React: paste, autofill and accessibility",
  description:
    "Build a React OTP input that handles paste, SMS autofill, WebOTP and screen readers, with validation, a resend timer and a two-factor verify form in Tailwind.",
  date: "2026-09-30",
  keywords: [
    "react otp input",
    "one time password input react",
    "otp input tailwind",
    "autocomplete one-time-code",
    "2fa code input react",
  ],
  related: ["otp-input", "two-factor-verify", "auth-card", "button"],
  body: [
    {
      type: "p",
      text: "The most reliable OTP input in React is one real `<input>` with `autocomplete=\"one-time-code\"`, `inputMode=\"numeric\"` and a max length, drawn as separate boxes but never split into six inputs. A single input gets paste, SMS autofill, backspace, selection and screen reader support from the browser for free, and every one of those breaks in subtle ways when you spread the code across several fields.",
    },
    {
      type: "p",
      text: "This guide uses the free MiniDev UI [OtpInput](/docs/otp-input), which is built exactly that way, and composes it into a verification form with [AuthCard](/docs/auth-card) and [Button](/docs/button). It covers the attributes that make autofill work, paste handling, the WebOTP API, validation on both sides, a resend timer, and what screen reader users actually hear.",
    },

    { type: "h2", text: "Why one input beats six", id: "one-input" },
    {
      type: "p",
      text: "The common approach (six `maxLength={1}` inputs that move focus on each keystroke) has to reimplement things the platform already does:",
    },
    {
      type: "list",
      items: [
        "**Paste.** A pasted `123456` lands in the first box unless you intercept it and distribute the characters yourself.",
        "**SMS autofill.** iOS and Android offer the code above the keyboard and insert it into the focused field. With six fields, that field can only hold one character.",
        "**Backspace and arrows.** Deleting from an empty box should move back and delete; arrow keys should move between boxes. All of it becomes custom key handling.",
        "**Screen readers.** Users hear six separate unlabeled edit fields instead of one field called \"One-time code\".",
      ],
    },
    {
      type: "p",
      text: "`OtpInput` puts one transparent input on top of the slots, sized to cover all of them. The slots are `aria-hidden` paint: they read the input's value and selection and draw a glyph, a fake caret and an active ring. Tapping anywhere on the row focuses the one input, and the caret always lands at the end of the code.",
    },

    { type: "h2", text: "Install and basic usage", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/otp-input.json\nnpx shadcn@latest add https://ui.minidev.pro/r/auth-card.json\nnpx shadcn@latest add https://ui.minidev.pro/r/button.json",
    },
    {
      type: "p",
      text: "Or `npm i minidev-ui-kit`. Either way, import the token stylesheet once ([styles.css](https://ui.minidev.pro/r/styles.css)); the shake, caret blink and glyph animations are keyframes defined there. A controlled input looks like this:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const [code, setCode] = React.useState("")

<OtpInput
  value={code}
  onChange={setCode}
  onComplete={(value) => verify(value)}
  length={6}
  groups={[3, 3]}
  name="code"
  autoFocus
/>`,
    },
    {
      type: "list",
      items: [
        "`length` defaults to 6. `groups` splits the slots visually, so `[3, 3]` renders `123 456` with a short divider; the groups must add up to `length` or they are ignored.",
        "`onChange` receives the cleaned value. `onComplete` fires once, at the moment the last slot fills, which makes it the natural place to submit.",
        "`pattern=\"numeric\"` (the default) strips anything that is not a digit. `pattern=\"alphanumeric\"` accepts letters and upper cases them, for backup codes.",
        "`name` puts the value in `FormData`, so the input works inside a plain form or a server action.",
        "`status` is `\"idle\" | \"invalid\" | \"success\"`. `invalid` turns the slots red, sets `aria-invalid` and shakes the row once.",
      ],
    },

    { type: "h2", text: "The attributes that make autofill work", id: "autofill" },
    {
      type: "p",
      text: "The real input inside `OtpInput` renders these attributes, and each one has a job:",
    },
    {
      type: "table",
      head: ["Attribute", "Value", "What it does"],
      rows: [
        ["`autocomplete`", "`one-time-code`", "Tells iOS Safari and Android keyboards to suggest a code from a recent SMS or email, and password managers to offer a stored TOTP"],
        ["`inputMode`", "`numeric` (or `text` for alphanumeric)", "Shows the number pad on phones without the quirks of `type=\"number\"`"],
        ["`pattern`", "`[0-9]*`", "Hints numeric entry to older iOS versions and documents the format"],
        ["`maxLength`", "`length`", "Caps typed input at the code length"],
        ["`spellCheck`", "`false`", "No red squiggles under a code"],
      ],
    },
    {
      type: "p",
      text: "Do not use `type=\"number\"`. It drops leading zeros (`012345` becomes `12345`), shows spinner arrows, and changes the value on scroll. A code is a string of digits, not a number.",
    },

    { type: "h2", text: "Paste handling", id: "paste" },
    {
      type: "p",
      text: "Because paste goes into a real input, it already works: the browser inserts the text, `OtpInput` strips characters that do not match the pattern, trims to `length`, and fires `onComplete` if the code is now full. Pasting `123456` or `12 34 56` into an empty input fills it.",
    },
    {
      type: "p",
      text: "One edge case is worth fixing in your copy. The browser applies `maxLength` before the component cleans the text, so a pasted `123-456` or `123 456` (seven characters) is cut to six characters first and loses its last digit. Add an `onPaste` handler to the real input that cleans the clipboard text before the length limit applies:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/otp-input.tsx",
      code: `<input
  // ...existing props
  onPaste={(e) => {
    e.preventDefault()
    commit(e.clipboardData.getData("text"))
    requestAnimationFrame(syncSel)
  }}
/>`,
    },
    {
      type: "p",
      text: "`commit` is the component's existing function that sanitizes, trims, calls `onChange` and fires `onComplete`, so the paste path now behaves exactly like typing. Replacing the whole value on paste is the right behavior for a code field; nobody pastes half a code into the middle of another.",
    },

    { type: "h2", text: "Read the SMS automatically with WebOTP", id: "webotp" },
    {
      type: "p",
      text: "`autocomplete=\"one-time-code\"` needs a tap on the keyboard suggestion. On Chrome for Android, the WebOTP API can fill the field with one confirmation prompt. The SMS must end with a line that names your origin and repeats the code, for example `Your Acme code is 482913.`, a blank line, then `@app.acme.com #482913`. Then ask for the credential when the form mounts:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `React.useEffect(() => {
  if (!("OTPCredential" in window)) return
  const ac = new AbortController()
  navigator.credentials
    .get({ otp: { transport: ["sms"] }, signal: ac.signal } as CredentialRequestOptions)
    .then((cred) => {
      const otp = (cred as (Credential & { code?: string }) | null)?.code
      if (otp) {
        setCode(otp)
        verify(otp)
      }
    })
    .catch(() => {}) // aborted, dismissed or timed out
  return () => ac.abort()
}, [])`,
    },
    {
      type: "list",
      items: [
        "Feature detect with `\"OTPCredential\" in window`; Safari and Firefox do not implement WebOTP and rely on `one-time-code` autofill instead.",
        "The cast is needed because TypeScript's DOM types do not include the `otp` option yet.",
        "Abort the request on unmount and after a successful manual entry, or the prompt can appear after the user has moved on.",
        "The origin line must match the page's host exactly. Keep the code on the last line and the SMS short.",
      ],
    },

    { type: "h2", text: "A two-factor verify form", id: "two-factor-verify" },
    {
      type: "p",
      text: "`TwoFactorVerify` in the registry is a static preview (an `AuthCard` with an `OtpInput` and a Verify button) and takes no props. Treat it as the layout reference and compose the working version from the same parts:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/verify/verify-form.tsx",
      code: `"use client"
import * as React from "react"
import { AuthCard } from "@/components/ui/auth-card"
import { OtpInput } from "@/components/ui/otp-input"
import { Button } from "@/components/ui/button"

type Status = "idle" | "invalid" | "success"

export function VerifyForm({ destination }: { destination: string }) {
  const [code, setCode] = React.useState("")
  const [status, setStatus] = React.useState<Status>("idle")
  const [error, setError] = React.useState<string | null>(null)
  const pending = React.useRef(false)

  async function verify(value: string) {
    if (value.length !== 6 || pending.current) return
    pending.current = true
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: value }),
    })
    pending.current = false
    if (res.ok) {
      setStatus("success")
      window.location.assign("/dashboard")
      return
    }
    setStatus("invalid")
    setError(res.status === 429 ? "Too many attempts. Request a new code." : "That code did not work. Check the latest message and try again.")
    setCode("")
  }

  return (
    <AuthCard
      title="Enter your code"
      description={"We sent a 6-digit code to " + destination + "."}
      footer={<ResendButton onResend={() => fetch("/api/resend", { method: "POST" })} />}
    >
      <form onSubmit={(e) => { e.preventDefault(); verify(code) }} className="space-y-3">
        <OtpInput
          value={code}
          onChange={(v) => {
            setCode(v)
            if (status !== "idle") { setStatus("idle"); setError(null) }
          }}
          onComplete={verify}
          groups={[3, 3]}
          status={status}
          name="code"
          autoFocus
        />
        {error ? <p role="alert" className="text-sm text-danger">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={code.length < 6}>Verify</Button>
      </form>
    </AuthCard>
  )
}`,
    },
    {
      type: "list",
      items: [
        "Submit on `onComplete` and keep the Verify button for people who prefer to confirm, or whose code was filled some other way.",
        "Do not pass `disabled` while the request runs. Disabling a focused input blurs it, and after a wrong code the user has to click back in. The `pending` ref prevents double submits instead.",
        "Reset `status` to `idle` on the next change. The shake runs when `status` becomes `invalid`, so a second wrong code only shakes again if the status left `invalid` in between.",
        "Clear the value after a wrong code so the next attempt starts from the first slot.",
      ],
    },
    { type: "component", name: "two-factor-verify" },

    { type: "h2", text: "Resend timer", id: "resend-timer" },
    {
      type: "p",
      text: "A cooldown stops people from requesting five codes in ten seconds and then typing the first one. Count down in the UI, but enforce the cooldown on the server, which is the only place it means anything:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `function ResendButton({ onResend, seconds = 30 }: { onResend: () => Promise<unknown>; seconds?: number }) {
  const [left, setLeft] = React.useState(seconds)
  const [notice, setNotice] = React.useState("")

  React.useEffect(() => {
    if (left <= 0) return
    const t = window.setTimeout(() => setLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(t)
  }, [left])

  return (
    <>
      <Button
        type="button"
        variant="link"
        size="sm"
        disabled={left > 0}
        onClick={async () => {
          await onResend()
          setNotice("A new code is on its way.")
          setLeft(seconds)
        }}
      >
        {left > 0 ? "Resend code in " + left + "s" : "Resend code"}
      </Button>
      <span role="status" className="sr-only">{notice}</span>
    </>
  )
}`,
    },
    {
      type: "p",
      text: "The countdown text is not in a live region on purpose; announcing every second would drown out everything else. The `role=\"status\"` span is rendered from the start and announces once when a new code is sent.",
    },

    { type: "h2", text: "Validate on the server", id: "validation" },
    {
      type: "p",
      text: "Client checks are only for feedback: the right length and characters. The security lives on the server:",
    },
    {
      type: "list",
      items: [
        "Expire codes after a few minutes (5 to 10 for SMS and email). For authenticator app TOTP, accept the current 30 second step and one step either side for clock drift.",
        "Limit attempts per code (5 is common), then invalidate it and require a resend. Rate limit sends per account and per IP.",
        "Store a hash of the code, compare with a constant time function such as Node's `crypto.timingSafeEqual`, and delete the code after one successful use.",
        "Return the same error for wrong, expired and unknown codes so responses do not reveal which one it was.",
        "Answer with HTTP 429 when limits are hit; the form above shows a specific message for it.",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "SMS codes can be intercepted through SIM swaps. Use them for low risk verification, and offer an authenticator app or a passkey for account security. The same `OtpInput` handles six digit TOTP codes, and `pattern=\"alphanumeric\"` covers backup codes.",
    },

    { type: "h2", text: "Accessibility", id: "accessibility" },
    {
      type: "p",
      text: "A screen reader user hears one edit field named \"One-time code\" (override with `aria-label`), types or pastes the code, and hears each character like any text field. The slots are hidden from assistive technology, so there is nothing to double announce. A few things are on you:",
    },
    {
      type: "list",
      items: [
        "Say where the code was sent and how long it is in visible text, as the `AuthCard` description does above.",
        "Render errors in a `role=\"alert\"` element. `OtpInput` sets `aria-invalid` but does not accept `aria-describedby`; add a pass-through prop in your copy if you want the error tied to the field as its description. See [ARIA](/glossary/aria) for how those attributes combine.",
        "Use `autoFocus` only on a page whose sole purpose is entering the code, never on a page where focus jumping to the input would skip content.",
        "Do not auto submit into a destructive action. Submitting a login on completion is fine; confirming a payment should still take a button press.",
        "The active slot ring is a [focus-visible](/glossary/focus-visible) style, and it respects both themes.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "`OtpInput`, `AuthCard` and `TwoFactorVerify` are free and MIT licensed; the rest of the sign in, sign up and recovery screens are in the [auth category](/components/auth). If you are building a whole product around these flows, the [MiniDev studio](https://minidev.pro) builds complete SaaS apps with this kit, and the [settings page guide](/guides/saas-settings-page) covers where two-factor setup lives afterwards.",
    },
    { type: "component", name: "otp-input" },
    { type: "component", name: "auth-card" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "What does autocomplete=\"one-time-code\" do?",
      a: "It tells the browser and the on screen keyboard that the field expects a verification code. iOS and Android then offer a code from a recent SMS or email above the keyboard, and password managers can fill a stored TOTP.",
    },
    {
      q: "Should an OTP input use six separate inputs?",
      a: "No. One input, drawn as six boxes, keeps paste, autofill, backspace and screen readers working natively. Six inputs force you to rebuild each of those by hand, and autofill in particular tends to break.",
    },
    {
      q: "How do I handle pasting a code with spaces or a dash?",
      a: "Clean the text before the length limit applies. `OtpInput` strips non matching characters on change; add an `onPaste` handler that passes the clipboard text straight to its `commit` function so `maxLength` cannot truncate it first.",
    },
    {
      q: "Does WebOTP work on iPhone?",
      a: "No. WebOTP is supported in Chrome on Android. On iOS, `autocomplete=\"one-time-code\"` gives the keyboard suggestion instead, which is one tap.",
    },
  ],
}

export default guide
