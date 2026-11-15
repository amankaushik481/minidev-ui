"use client"
import * as React from "react"
import { LanguagePicker } from "@/registry/ui/language-picker"
import type { Example } from "./types"

const OPTIONS = [
  { id: "en-GB", label: "English (UK)" },
  { id: "fr", label: "Français" },
  { id: "pt-BR", label: "Português (Brasil)" },
  { id: "ko", label: "한국어" },
  { id: "ar", label: "العربية" },
  { id: "hi", label: "हिन्दी" },
]

function ControlledDemo() {
  const [lang, setLang] = React.useState("fr")
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <LanguagePicker label="Interface language" value={lang} onChange={setLang} options={OPTIONS} />
      <p className="text-xs text-fg-muted">
        Locale code: <code className="font-mono text-fg">{lang}</code>
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Your own languages",
    description: "Write each label in its own language and use BCP 47 ids; each label gets a matching lang attribute.",
    code: `const OPTIONS = [
  { id: "en-GB", label: "English (UK)" },
  { id: "fr", label: "Français" },
  { id: "pt-BR", label: "Português (Brasil)" },
  { id: "ko", label: "한국어" },
  { id: "ar", label: "العربية" },
  { id: "hi", label: "हिन्दी" },
]

<LanguagePicker options={OPTIONS} defaultValue="en-GB" className="w-full max-w-md" />`,
    node: <LanguagePicker options={OPTIONS} defaultValue="en-GB" className="w-full max-w-md" />,
  },
  {
    title: "Controlled",
    description: "onChange gets the id. Pass it to your i18n router to switch the locale.",
    code: `function ControlledDemo() {
  const [lang, setLang] = React.useState("fr")
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <LanguagePicker label="Interface language" value={lang} onChange={setLang} options={OPTIONS} />
      <p className="text-xs text-fg-muted">
        Locale code: <code className="font-mono text-fg">{lang}</code>
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
]
