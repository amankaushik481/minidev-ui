import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-qr-code",
  title: "Generate QR codes in React with no dependency",
  description:
    "Generate QR codes in React with no npm dependency: an SVG component with error correction levels, a logo well, SVG and PNG download and a share dialog.",
  date: "2026-10-14",
  keywords: [
    "react qr code generator",
    "qr code react component",
    "generate qr code react no library",
    "svg qr code react",
    "react qr code with logo",
  ],
  related: ["qr-code", "dialog", "button"],
  body: [
    {
      type: "p",
      text: "You can generate a QR code in React without a dependency by encoding the text to bytes, adding Reed-Solomon error correction, placing the bits in a grid, choosing a mask, and drawing the dark modules as one SVG path. The free MiniDev UI [QrCode](/docs/qr-code) does all of that in a single file, versions 1 to 40 and all four error correction levels, and exports the encoder so you can draw the same matrix to a canvas for PNG.",
    },
    {
      type: "p",
      text: "This guide covers the props that matter (size, level, colours, quiet zone, the logo well), builds a share dialog with [Dialog](/docs/dialog) and [Button](/docs/button), shows the payload formats phones understand, adds PNG export, and lists what makes a code fail to scan in print and in dark mode.",
    },

    { type: "h2", text: "What is inside a QR code", id: "anatomy" },
    {
      type: "list",
      items: [
        "**Modules** are the squares. A version 1 symbol is 21 by 21; each version adds 4, up to 177 by 177 at version 40. The encoder picks the smallest version that fits.",
        "**Error correction** adds redundant codewords so a damaged or partly covered code still reads. Level L recovers about 7 percent of codewords, M 15, Q 25 and H 30. More correction means a bigger symbol for the same text.",
        "**Function patterns** are the three big finders, the alignment squares, the timing lines and the format strip. Scanners find and orient the code with them, which is why a logo must never cover a corner.",
        "**Masks** XOR the data area with one of eight patterns to break up large blobs; the spec scores each and the encoder keeps the lowest penalty.",
      ],
    },
    {
      type: "p",
      text: "Capacity in byte mode, worked out from the table in the component: at level M a 30 character URL fits version 3 (29 modules) and a 60 character one needs version 4 (33 modules). The same 60 characters at level H need version 7 (45 modules). Short links make small, forgiving codes; this is the practical reason to put a redirect in front of long tracked URLs.",
    },

    { type: "h2", text: "Install and render", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/qr-code.json\nnpx shadcn@latest add https://ui.minidev.pro/r/dialog.json\nnpx shadcn@latest add https://ui.minidev.pro/r/button.json",
    },
    {
      type: "code",
      lang: "tsx",
      code: `import { QrCode } from "@/components/ui/qr-code"

<QrCode value="https://ui.minidev.pro/docs/qr-code" size={200} level="M" />`,
    },
    {
      type: "p",
      text: "That renders a card with the code, a caption (the URL's host and path by default) and a Download SVG button. The props, all optional:",
    },
    {
      type: "table",
      head: ["Prop", "Default", "What it does"],
      rows: [
        ["`value`", "the kit URL", "Text to encode as UTF-8 bytes: URLs, Wi-Fi strings, payment payloads"],
        ["`size`", "200", "Rendered width and height in pixels; the SVG scales without blur"],
        ["`level`", "`\"M\"`", "`L`, `M`, `Q` or `H`. A logo needs `H`"],
        ["`fg` / `bg`", "`currentColor` / `transparent`", "Module and background colours, any CSS colour"],
        ["`margin`", "2", "Quiet zone in modules on each side; the spec asks for 4"],
        ["`caption`", "host of a URL, or the value", "Text under the code; `\"\"` hides it"],
        ["`download` / `fileName`", "true / `qr-code.svg`", "The Download SVG button and its file name"],
        ["`bare`", "false", "Only the SVG, no card, caption or button"],
        ["`title`", "`QR code for <value>`", "Accessible name of the image"],
        ["`logoScale`", "0.24", "Width of the cleared centre well as a fraction of the symbol, with a logo"],
        ["`mask`", "auto", "Force a mask pattern 0 to 7 instead of scoring all eight"],
        ["`children`", "", "A logo or icon placed in the centre well; rendered only at level `H`"],
      ],
    },
    {
      type: "p",
      text: "The modules draw in `currentColor` by default, so the code follows your text colour and tokens. That is right for an on screen code in a light theme and wrong in two cases covered below: dark mode and print.",
    },

    { type: "h2", text: "A share dialog", id: "share-dialog" },
    {
      type: "p",
      text: "The most common place for a QR code in a product is a share action: a link people can scan from a colleague's screen or copy. The kit's `Dialog` traps focus, locks scroll and returns focus to the trigger, so the panel only needs content:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/share-invoice.tsx",
      code: `"use client"
import * as React from "react"
import { CheckIcon, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { QrCode } from "@/components/ui/qr-code"

export function ShareInvoice({ url, number }: { url: string; number: string }) {
  const [copied, setCopied] = React.useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Share</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share invoice {number}</DialogTitle>
          <DialogDescription>Scan to open the payment page, or copy the link.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <QrCode value={url} size={220} level="Q" fg="black" bg="white" margin={3} caption={number} fileName={"invoice-" + number + ".svg"} />
        </div>
        <DialogFooter showCloseButton>
          <Button onClick={copy} aria-live="polite">
            {copied ? <CheckIcon /> : <LinkIcon />}
            {copied ? "Copied" : "Copy link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
    },
    {
      type: "list",
      items: [
        "`fg=\"black\"` and `bg=\"white\"` fix the colours regardless of theme. A code that inverts in dark mode (light modules on a dark card) scans less reliably, because many readers assume dark on light.",
        "Level `Q` is a good default for a code someone will scan off a screen at an angle; it costs one or two versions over `M` for a short URL.",
        "The Download button already lives in the card (`download` is on by default) and says \"Saved\" for a moment after writing the file, announced through `aria-live`.",
        "The copy button repeats the value as text so the dialog is useful to people who cannot scan, including anyone on the device that is showing the code.",
      ],
    },

    { type: "h2", text: "A logo in the middle", id: "logo" },
    {
      type: "p",
      text: "Pass a child and set `level=\"H\"`. The component clears a centred square well (`logoScale` of the symbol width, snapped to whole modules) and renders the child inside it, slightly inset. At any other level the child is ignored, because the cleared modules would exceed what the correction can recover.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<QrCode value="https://lumen.app/r/q3-revenue" level="H" size={240} logoScale={0.22}>
  <img src="/brand/mark.svg" alt="" className="size-full rounded-md bg-white p-1" />
</QrCode>`,
    },
    {
      type: "p",
      text: "Keep `logoScale` at or below the default 0.24. Level H recovers 30 percent of codewords, and a 24 percent wide well removes under 6 percent of the area, but a logo also costs the scanner contrast around its edges. Give the logo a solid background, keep the value short so the symbol has more modules than the well, and test with a phone camera before shipping; a logo that looks fine at 240 pixels can break a code printed at 2 centimetres.",
    },

    { type: "h2", text: "Payloads phones understand", id: "payloads" },
    {
      type: "p",
      text: "A QR code is just text; what the phone does with it depends on the format. The common ones:",
    },
    {
      type: "table",
      head: ["Purpose", "Value", "Note"],
      rows: [
        ["Open a page", "`https://lumen.app/r/q3`", "Use the scheme; bare domains are not always treated as links"],
        ["Join Wi-Fi", "`WIFI:T:WPA;S:Lumen Guest;P:secret;;`", "Escape `\\`, `;`, `,`, `\"` and `:` in the SSID and password with a backslash"],
        ["Call or text", "`tel:+14155550123` or `SMSTO:+14155550123:Hi`", ""],
        ["Email", "`mailto:billing@lumen.app?subject=Invoice%201041`", "Percent encode the query"],
        ["Location", "`geo:37.7749,-122.4194`", "Opens the maps app"],
        ["Contact card", "`BEGIN:VCARD` ... `END:VCARD`", "vCard 3.0; long, so expect version 10 or more"],
        ["Payment", "An EPC string, a UPI URI, a Lightning invoice", "Each scheme has its own spec; encode exactly what it asks"],
      ],
    },
    {
      type: "code",
      lang: "ts",
      code: `const esc = (s: string) => s.replace(/([\\\\;,":])/g, "\\\\$1")
export const wifi = (ssid: string, password: string, kind: "WPA" | "WEP" | "nopass" = "WPA") =>
  "WIFI:T:" + kind + ";S:" + esc(ssid) + ";P:" + esc(password) + ";;"`,
    },
    {
      type: "p",
      text: "Everything is encoded as UTF-8 bytes. The component does not use the numeric or alphanumeric modes, which pack digits and upper case letters more tightly; a 16 digit number is therefore a version 1 code at level M rather than something smaller still, which never matters in practice.",
    },

    { type: "h2", text: "Export as PNG", id: "png" },
    {
      type: "p",
      text: "SVG is the right file for print and design tools. Chat apps and some CMS uploaders want a raster. `encodeQr` is exported from the same file, so draw its matrix to a canvas:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/qr-png.ts",
      code: `import { encodeQr, type QrLevel } from "@/components/ui/qr-code"

/** Returns a PNG data URL, or null when the value does not fit the level. */
export function qrToPng(value: string, level: QrLevel = "M", scale = 8, margin = 4): string | null {
  const qr = encodeQr(value, level)
  if (!qr) return null
  const view = qr.size + margin * 2
  const canvas = document.createElement("canvas")
  canvas.width = view * scale
  canvas.height = view * scale
  const ctx = canvas.getContext("2d")
  if (!ctx) return null
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "#000000"
  for (let r = 0; r < qr.size; r++) {
    for (let c = 0; c < qr.size; c++) {
      if (qr.modules[r * qr.size + c]) ctx.fillRect((c + margin) * scale, (r + margin) * scale, scale, scale)
    }
  }
  return canvas.toDataURL("image/png")
}`,
    },
    {
      type: "p",
      text: "`qr.modules` is a row major `Uint8Array` with 1 for dark, already masked, and `qr.size` is the module count. A scale of 8 gives a 264 pixel PNG for version 1 and about 1,500 for version 40, which prints cleanly. Trigger the download the same way the component does: a `Blob`, `URL.createObjectURL`, an anchor with `download`, then revoke the URL.",
    },

    { type: "h2", text: "Dynamic values", id: "dynamic" },
    {
      type: "p",
      text: "The component memoises the matrix on `value`, `level` and `mask`, so re-rendering for unrelated state is free. Encoding itself is fast for short values; a version 40 code scores eight masks over 31,000 modules each, which takes a few milliseconds. Two habits keep a live preview smooth:",
    },
    {
      type: "list",
      items: [
        "Debounce typed input by about 150 milliseconds before it reaches `value`, so the matrix is not rebuilt on every keystroke of a long vCard.",
        "When generating many codes at once (a sheet of asset tags), pass a fixed `mask` such as `mask={2}` to skip the penalty scoring. The result is still a valid code, just not the optimal mask, and scanners do not care.",
      ],
    },
    {
      type: "p",
      text: "When the value is too long for the level, `encodeQr` returns `null` and the component renders a hatched placeholder that says \"Too long for level M\". Catch it earlier in a form by calling `encodeQr` yourself and showing a count, or drop to level `L` automatically for long values.",
    },

    { type: "h2", text: "Print and scanning reliability", id: "print" },
    {
      type: "list",
      items: [
        "Use `margin={4}` for anything printed. The quiet zone is how scanners separate the code from whatever surrounds it; two modules is fine on a plain card background on screen, not on a busy flyer.",
        "Dark modules on a light background. The Download SVG button already substitutes black and white when `fg` is `currentColor` and `bg` is `transparent`, so downloaded files are always scannable even from a dark theme.",
        "Size for the scanning distance. A rough rule is one tenth of the distance: a code read from 30 centimetres should be 3 centimetres wide. On screen, keep each module at 3 pixels or more; `size / (modules + 2 * margin)` tells you the module size.",
        "Low contrast brand colours are a scanning risk. If `fg` must be a brand colour, keep it dark (an OKLCH lightness under 0.4 is a reasonable line) and leave `bg` white.",
        "Test the printed thing with two different phones. Camera apps differ, and the only test that counts is the one on paper.",
      ],
    },

    { type: "h2", text: "Accessibility", id: "accessibility" },
    {
      type: "list",
      items: [
        "The SVG has `role=\"img\"` and an `aria-label` of \"QR code for <value>\". Set `title` to something kinder for long payloads: \"QR code: join the Lumen guest Wi-Fi\".",
        "A QR code is useless to someone who cannot scan it, including the person whose screen it is on. Always put the same information next to it as text or a copy button, as the share dialog does.",
        "The caption truncates to the code's width with a `title` attribute holding the full value, so hovering shows it.",
        "The Download button is a real button with a visible label and an `aria-live` region for the \"Saved\" confirmation.",
      ],
    },

    { type: "h2", text: "Pitfalls", id: "pitfalls" },
    {
      type: "list",
      items: [
        "**A logo at level M.** It is silently not rendered, because the well would exceed the correction budget. Set `level=\"H\"`.",
        "**Inverted codes in dark mode.** `currentColor` on a dark surface gives light modules. Fix `fg` and `bg` for anything that will be scanned.",
        "**Tracking parameters.** A 200 character UTM laden URL is a version 10 or larger symbol with tiny modules. Use a short redirect and add the parameters server side.",
        "**Encoding the display string.** Encode the canonical value (`https://`, exact case). Case matters in paths, and scanners do not autocorrect.",
        "**Rendering hundreds of codes in a list.** Each one is an SVG path; that is fine for dozens. For a 500 row table, render codes on demand in a row's detail view or generate PNGs in a worker.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "`QrCode`, `Dialog` and `Button` are free and MIT licensed; other sharing and feedback pieces are in the [feedback category](/components/feedback). The share dialog follows the patterns in the [accessible modal guide](/guides/react-accessible-modal), and the invoice page it belongs on is built in the [billing page guide](/guides/nextjs-billing-page-stripe). If you want the whole product built, the [MiniDev studio](https://minidev.pro) builds on this kit.",
    },
    { type: "component", name: "qr-code" },
    { type: "component", name: "dialog" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "Can I generate a QR code in React without a library?",
      a: "Yes. The encoder is byte mode data, Reed-Solomon error correction over GF(256), module placement, and mask selection, which fits in a few hundred lines. The kit's QrCode component contains the whole encoder and renders the result as an SVG path, with no npm dependency.",
    },
    {
      q: "Which error correction level should I use?",
      a: "M for codes on screen, Q for codes that will be scanned at an angle or printed small, H when a logo sits in the middle. Higher levels make the symbol larger for the same text, so keep the value short.",
    },
    {
      q: "Why does my QR code not scan in dark mode?",
      a: "Because the modules follow the text colour and render light on dark, which many scanners handle poorly. Pass explicit colours (`fg=\"black\"`, `bg=\"white\"`) and a quiet zone of at least two modules, and four for print.",
    },
  ],
}

export default guide
