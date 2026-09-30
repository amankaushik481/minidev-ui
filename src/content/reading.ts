import type { Block, Faq } from "./types"

/** Minutes to read, counting prose at 220 wpm and code at a third of that. */
export function readingMinutes(body: Block[], faq: Faq[] = []) {
  let words = 0
  let code = 0
  for (const b of body) {
    if (b.type === "code") code += b.code.split(/\s+/).length
    else if (b.type === "list") words += b.items.join(" ").split(/\s+/).length
    else if (b.type === "table") words += b.rows.flat().join(" ").split(/\s+/).length
    else if ("text" in b) words += b.text.split(/\s+/).length
  }
  words += faq.map((f) => f.q + " " + f.a).join(" ").split(/\s+/).length
  return Math.max(3, Math.round(words / 220 + code / 70))
}
