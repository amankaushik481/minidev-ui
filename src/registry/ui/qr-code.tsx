"use client"
import * as React from "react"
import { CheckIcon, DownloadIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/** A dependency free QR code rendered as crisp SVG, with error correction levels, a logo well and a one click SVG download. */
type QrLevel = "L" | "M" | "Q" | "H"

type QrCodeProps = {
  /** Text to encode, as UTF-8 bytes. URLs, Wi-Fi strings, payment payloads, anything. */
  value?: string
  /** Rendered width and height in px. The SVG scales without blur. */
  size?: number
  /** Error correction level. L 7%, M 15%, Q 25%, H 30% of codewords recoverable. The logo well needs H. */
  level?: QrLevel
  /** Module colour. Any CSS colour; defaults to the current text colour so it follows your tokens. */
  fg?: string
  /** Background colour behind the modules and quiet zone. */
  bg?: string
  /** Quiet zone in modules on each side. The spec asks for 4; 2 is fine on a plain surface. */
  margin?: number
  /** Width of the cleared centre well as a fraction of the symbol, used when a logo is passed. */
  logoScale?: number
  /** Force a mask pattern (0 to 7) instead of picking the lowest penalty one. */
  mask?: number
  /** Caption under the code. Defaults to the host of a URL value or the value itself. Pass an empty string to hide. */
  caption?: string
  /** Show the Download SVG button. */
  download?: boolean
  /** File name for the download. */
  fileName?: string
  /** Render the bare SVG with no card, caption or button. */
  bare?: boolean
  /** Accessible name. Defaults to "QR code for <value>". */
  title?: string
  /** Logo or icon placed in a cleared centre well. Only rendered when `level` is "H". */
  children?: React.ReactNode
  className?: string
}

/* ── Encoder ──────────────────────────────────────────────────────────────── */

/** Per version, per level (L, M, Q, H): [ec codewords per block, group 1 blocks, group 1 data codewords, group 2 blocks, group 2 data codewords]. */
const EC_TABLE: number[][][] = [
  [[7, 1, 19, 0, 0], [10, 1, 16, 0, 0], [13, 1, 13, 0, 0], [17, 1, 9, 0, 0]],
  [[10, 1, 34, 0, 0], [16, 1, 28, 0, 0], [22, 1, 22, 0, 0], [28, 1, 16, 0, 0]],
  [[15, 1, 55, 0, 0], [26, 1, 44, 0, 0], [18, 2, 17, 0, 0], [22, 2, 13, 0, 0]],
  [[20, 1, 80, 0, 0], [18, 2, 32, 0, 0], [26, 2, 24, 0, 0], [16, 4, 9, 0, 0]],
  [[26, 1, 108, 0, 0], [24, 2, 43, 0, 0], [18, 2, 15, 2, 16], [22, 2, 11, 2, 12]],
  [[18, 2, 68, 0, 0], [16, 4, 27, 0, 0], [24, 4, 19, 0, 0], [28, 4, 15, 0, 0]],
  [[20, 2, 78, 0, 0], [18, 4, 31, 0, 0], [18, 2, 14, 4, 15], [26, 4, 13, 1, 14]],
  [[24, 2, 97, 0, 0], [22, 2, 38, 2, 39], [22, 4, 18, 2, 19], [26, 4, 14, 2, 15]],
  [[30, 2, 116, 0, 0], [22, 3, 36, 2, 37], [20, 4, 16, 4, 17], [24, 4, 12, 4, 13]],
  [[18, 2, 68, 2, 69], [26, 4, 43, 1, 44], [24, 6, 19, 2, 20], [28, 6, 15, 2, 16]],
  [[20, 4, 81, 0, 0], [30, 1, 50, 4, 51], [28, 4, 22, 4, 23], [24, 3, 12, 8, 13]],
  [[24, 2, 92, 2, 93], [22, 6, 36, 2, 37], [26, 4, 20, 6, 21], [28, 7, 14, 4, 15]],
  [[26, 4, 107, 0, 0], [22, 8, 37, 1, 38], [24, 8, 20, 4, 21], [22, 12, 11, 4, 12]],
  [[30, 3, 115, 1, 116], [24, 4, 40, 5, 41], [20, 11, 16, 5, 17], [24, 11, 12, 5, 13]],
  [[22, 5, 87, 1, 88], [24, 5, 41, 5, 42], [30, 5, 24, 7, 25], [24, 11, 12, 7, 13]],
  [[24, 5, 98, 1, 99], [28, 7, 45, 3, 46], [24, 15, 19, 2, 20], [30, 3, 15, 13, 16]],
  [[28, 1, 107, 5, 108], [28, 10, 46, 1, 47], [28, 1, 22, 15, 23], [28, 2, 14, 17, 15]],
  [[30, 5, 120, 1, 121], [26, 9, 43, 4, 44], [28, 17, 22, 1, 23], [28, 2, 14, 19, 15]],
  [[28, 3, 113, 4, 114], [26, 3, 44, 11, 45], [26, 17, 21, 4, 22], [26, 9, 13, 16, 14]],
  [[28, 3, 107, 5, 108], [26, 3, 41, 13, 42], [30, 15, 24, 5, 25], [28, 15, 15, 10, 16]],
  [[28, 4, 116, 4, 117], [26, 17, 42, 0, 0], [28, 17, 22, 6, 23], [30, 19, 16, 6, 17]],
  [[28, 2, 111, 7, 112], [28, 17, 46, 0, 0], [30, 7, 24, 16, 25], [24, 34, 13, 0, 0]],
  [[30, 4, 121, 5, 122], [28, 4, 47, 14, 48], [30, 11, 24, 14, 25], [30, 16, 15, 14, 16]],
  [[30, 6, 117, 4, 118], [28, 6, 45, 14, 46], [30, 11, 24, 16, 25], [30, 30, 16, 2, 17]],
  [[26, 8, 106, 4, 107], [28, 8, 47, 13, 48], [30, 7, 24, 22, 25], [30, 22, 15, 13, 16]],
  [[28, 10, 114, 2, 115], [28, 19, 46, 4, 47], [28, 28, 22, 6, 23], [30, 33, 16, 4, 17]],
  [[30, 8, 122, 4, 123], [28, 22, 45, 3, 46], [30, 8, 23, 26, 24], [30, 12, 15, 28, 16]],
  [[30, 3, 117, 10, 118], [28, 3, 45, 23, 46], [30, 4, 24, 31, 25], [30, 11, 15, 31, 16]],
  [[30, 7, 116, 7, 117], [28, 21, 45, 7, 46], [30, 1, 23, 37, 24], [30, 19, 15, 26, 16]],
  [[30, 5, 115, 10, 116], [28, 19, 47, 10, 48], [30, 15, 24, 25, 25], [30, 23, 15, 25, 16]],
  [[30, 13, 115, 3, 116], [28, 2, 46, 29, 47], [30, 42, 24, 1, 25], [30, 23, 15, 28, 16]],
  [[30, 17, 115, 0, 0], [28, 10, 46, 23, 47], [30, 10, 24, 35, 25], [30, 19, 15, 35, 16]],
  [[30, 17, 115, 1, 116], [28, 14, 46, 21, 47], [30, 29, 24, 19, 25], [30, 11, 15, 46, 16]],
  [[30, 13, 115, 6, 116], [28, 14, 46, 23, 47], [30, 44, 24, 7, 25], [30, 59, 16, 1, 17]],
  [[30, 12, 121, 7, 122], [28, 12, 47, 26, 48], [30, 39, 24, 14, 25], [30, 22, 15, 41, 16]],
  [[30, 6, 121, 14, 122], [28, 6, 47, 34, 48], [30, 46, 24, 10, 25], [30, 2, 15, 64, 16]],
  [[30, 17, 122, 4, 123], [28, 29, 46, 14, 47], [30, 49, 24, 10, 25], [30, 24, 15, 46, 16]],
  [[30, 4, 122, 18, 123], [28, 13, 46, 32, 47], [30, 48, 24, 14, 25], [30, 42, 15, 32, 16]],
  [[30, 20, 117, 4, 118], [28, 40, 47, 7, 48], [30, 43, 24, 22, 25], [30, 10, 15, 67, 16]],
  [[30, 19, 118, 6, 119], [28, 18, 47, 31, 48], [30, 34, 24, 34, 25], [30, 20, 15, 61, 16]],
]

/** Alignment pattern centre coordinates per version (index 0 = version 1). */
const ALIGN: number[][] = [
  [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50],
  [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90],
  [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170],
]

const LEVEL_INDEX: Record<QrLevel, number> = { L: 0, M: 1, Q: 2, H: 3 }
/** Two bit level indicator used in the format information. */
const LEVEL_BITS: Record<QrLevel, number> = { L: 1, M: 0, Q: 3, H: 2 }

/* GF(256) with the QR primitive polynomial x^8 + x^4 + x^3 + x^2 + 1. */
const EXP = new Uint8Array(512)
const LOG = new Uint8Array(256)
{
  let x = 1
  for (let i = 0; i < 255; i++) {
    EXP[i] = x
    LOG[x] = i
    x <<= 1
    if (x & 0x100) x ^= 0x11d
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255]
}
const gfMul = (a: number, b: number) => (a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]])

/** Reed-Solomon generator polynomial of the given degree, highest power first, leading coefficient 1. */
function rsGenerator(degree: number): Uint8Array {
  let poly = new Uint8Array([1])
  for (let i = 0; i < degree; i++) {
    const next = new Uint8Array(poly.length + 1)
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j]
      next[j + 1] ^= gfMul(poly[j], EXP[i])
    }
    poly = next
  }
  return poly
}

/** Remainder of data · x^degree divided by the generator: the EC codewords for one block. */
function rsRemainder(data: Uint8Array, gen: Uint8Array): Uint8Array {
  const n = gen.length - 1
  const res = new Uint8Array(n)
  for (const b of data) {
    const factor = b ^ res[0]
    res.copyWithin(0, 1)
    res[n - 1] = 0
    if (factor) for (let j = 0; j < n; j++) res[j] ^= gfMul(gen[j + 1], factor)
  }
  return res
}

function utf8(text: string): Uint8Array {
  if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(text)
  const out: number[] = []
  for (let i = 0; i < text.length; i++) {
    let c = text.codePointAt(i)!
    if (c > 0xffff) i++
    if (c < 0x80) out.push(c)
    else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63))
    else if (c < 0x10000) out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63))
    else out.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63))
  }
  return Uint8Array.from(out)
}

const countBits = (version: number) => (version < 10 ? 8 : 16)
const dataCodewords = (version: number, level: QrLevel) => {
  const [, g1, d1, g2, d2] = EC_TABLE[version - 1][LEVEL_INDEX[level]]
  return g1 * d1 + g2 * d2
}

/** BCH(15,5) format information for a level and mask, already XOR masked. */
function formatBits(level: QrLevel, mask: number): number {
  const data = (LEVEL_BITS[level] << 3) | mask
  let rem = data
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537)
  return ((data << 10) | rem) ^ 0x5412
}

/** BCH(18,6) version information for versions 7 and up. */
function versionBits(version: number): number {
  let rem = version
  for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25)
  return (version << 12) | rem
}

const MASKS: ((r: number, c: number) => boolean)[] = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (_, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
]

type QrMatrix = {
  version: number
  size: number
  mask: number
  level: QrLevel
  /** Row major, 1 = dark. */
  modules: Uint8Array
  /** Row major, 1 = function pattern (finder, timing, alignment, format, version). */
  isFunction: Uint8Array
}

/** Penalty score of a masked symbol, per ISO 18004 section 8.8.2. Lower is better. */
function penalty(m: Uint8Array, size: number): number {
  let score = 0
  const at = (r: number, c: number) => m[r * size + c]
  for (let line = 0; line < size; line++) {
    for (let axis = 0; axis < 2; axis++) {
      const get = (i: number) => (axis === 0 ? at(line, i) : at(i, line))
      // N1: runs of five or more.
      let run = 1
      for (let i = 1; i <= size; i++) {
        if (i < size && get(i) === get(i - 1)) run++
        else {
          if (run >= 5) score += 3 + run - 5
          run = 1
        }
      }
      // N3: finder like 1011101 with four light modules on one side.
      for (let i = 0; i + 6 < size; i++) {
        if (get(i) && !get(i + 1) && get(i + 2) && get(i + 3) && get(i + 4) && !get(i + 5) && get(i + 6)) {
          let before = i >= 4
          for (let k = 1; before && k <= 4; k++) if (get(i - k)) before = false
          let after = i + 10 < size
          for (let k = 7; after && k <= 10; k++) if (get(i + k)) after = false
          if (before) score += 40
          if (after) score += 40
        }
      }
    }
  }
  // N2: 2x2 blocks of one colour.
  for (let r = 0; r + 1 < size; r++)
    for (let c = 0; c + 1 < size; c++) {
      const v = at(r, c)
      if (v === at(r, c + 1) && v === at(r + 1, c) && v === at(r + 1, c + 1)) score += 3
    }
  // N4: deviation from 50% dark in 5% steps.
  let dark = 0
  for (let i = 0; i < m.length; i++) dark += m[i]
  score += Math.floor(Math.abs((dark * 100) / m.length - 50) / 5) * 10
  return score
}

/**
 * Encode text in byte mode. Picks the smallest version (1 to 40) that fits,
 * or returns null when the text is too long for the level.
 */
function encodeQr(text: string, level: QrLevel = "M", forcedMask?: number): QrMatrix | null {
  const bytes = utf8(text)
  let version = 0
  for (let v = 1; v <= 40; v++) {
    if (4 + countBits(v) + bytes.length * 8 <= dataCodewords(v, level) * 8) {
      version = v
      break
    }
  }
  if (!version) return null

  /* Data bit stream: mode, count, bytes, terminator, byte alignment, pad codewords. */
  const capacity = dataCodewords(version, level)
  const bits: number[] = []
  const push = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1)
  }
  push(4, 4)
  push(bytes.length, countBits(version))
  for (const b of bytes) push(b, 8)
  push(0, Math.min(4, capacity * 8 - bits.length))
  while (bits.length % 8) bits.push(0)
  for (let pad = 0xec; bits.length < capacity * 8; pad ^= 0xec ^ 0x11) push(pad, 8)
  const data = new Uint8Array(capacity)
  for (let i = 0; i < bits.length; i++) data[i >> 3] |= bits[i] << (7 - (i & 7))

  /* Split into blocks, add EC, interleave. */
  const [ecLen, g1, d1, g2, d2] = EC_TABLE[version - 1][LEVEL_INDEX[level]]
  const gen = rsGenerator(ecLen)
  const blocks: { data: Uint8Array; ec: Uint8Array }[] = []
  let k = 0
  for (let i = 0; i < g1 + g2; i++) {
    const len = i < g1 ? d1 : d2
    const chunk = data.subarray(k, k + len)
    k += len
    blocks.push({ data: chunk, ec: rsRemainder(chunk, gen) })
  }
  const stream: number[] = []
  const longest = Math.max(d1, d2)
  for (let i = 0; i < longest; i++) for (const b of blocks) if (i < b.data.length) stream.push(b.data[i])
  for (let i = 0; i < ecLen; i++) for (const b of blocks) stream.push(b.ec[i])

  /* Function patterns. */
  const size = version * 4 + 17
  const modules = new Uint8Array(size * size)
  const isFunction = new Uint8Array(size * size)
  const setFn = (r: number, c: number, dark: boolean) => {
    modules[r * size + c] = dark ? 1 : 0
    isFunction[r * size + c] = 1
  }
  const finder = (r0: number, c0: number) => {
    for (let dr = -1; dr <= 7; dr++)
      for (let dc = -1; dc <= 7; dc++) {
        const r = r0 + dr
        const c = c0 + dc
        if (r < 0 || c < 0 || r >= size || c >= size) continue
        const inside = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6
        setFn(r, c, inside && Math.max(Math.abs(dr - 3), Math.abs(dc - 3)) !== 2)
      }
  }
  finder(0, 0)
  finder(0, size - 7)
  finder(size - 7, 0)
  for (let i = 8; i < size - 8; i++) {
    setFn(6, i, i % 2 === 0)
    setFn(i, 6, i % 2 === 0)
  }
  const align = ALIGN[version - 1]
  for (const r of align)
    for (const c of align) {
      const last = align[align.length - 1]
      if ((r === 6 && c === 6) || (r === 6 && c === last) || (r === last && c === 6)) continue
      for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) setFn(r + dr, c + dc, Math.max(Math.abs(dr), Math.abs(dc)) !== 1)
    }
  /* Reserve the format areas (filled per mask below) and the dark module. Index 6 is the timing pattern. */
  for (let i = 0; i < 9; i++) {
    if (i === 6) continue
    setFn(8, i, false)
    setFn(i, 8, false)
  }
  for (let i = 0; i < 8; i++) {
    setFn(8, size - 1 - i, false)
    setFn(size - 1 - i, 8, false)
  }
  setFn(size - 8, 8, true)
  if (version >= 7) {
    const vb = versionBits(version)
    for (let i = 0; i < 18; i++) {
      const dark = ((vb >>> i) & 1) === 1
      const a = Math.floor(i / 3)
      const b = size - 11 + (i % 3)
      setFn(a, b, dark)
      setFn(b, a, dark)
    }
  }

  /* Place the codeword bits in the zigzag, two columns at a time, skipping the vertical timing column. */
  const totalBits = stream.length * 8
  let bit = 0
  let upward = true
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5
    for (let i = 0; i < size; i++) {
      const r = upward ? size - 1 - i : i
      for (let j = 0; j < 2; j++) {
        const c = right - j
        if (isFunction[r * size + c]) continue
        if (bit < totalBits) modules[r * size + c] = (stream[bit >> 3] >> (7 - (bit & 7))) & 1
        bit++
      }
    }
    upward = !upward
  }

  const drawFormat = (m: Uint8Array, mask: number) => {
    const fb = formatBits(level, mask)
    const get = (i: number) => (fb >>> i) & 1
    for (let i = 0; i <= 5; i++) m[i * size + 8] = get(i)
    m[7 * size + 8] = get(6)
    m[8 * size + 8] = get(7)
    m[8 * size + 7] = get(8)
    for (let i = 9; i < 15; i++) m[8 * size + (14 - i)] = get(i)
    for (let i = 0; i < 8; i++) m[8 * size + (size - 1 - i)] = get(i)
    for (let i = 8; i < 15; i++) m[(size - 15 + i) * size + 8] = get(i)
    m[(size - 8) * size + 8] = 1
  }
  const applyMask = (mask: number) => {
    const m = modules.slice()
    const fn = MASKS[mask]
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (!isFunction[r * size + c] && fn(r, c)) m[r * size + c] ^= 1
    drawFormat(m, mask)
    return m
  }

  let best = 0
  let bestModules: Uint8Array
  if (forcedMask !== undefined && forcedMask >= 0 && forcedMask <= 7) {
    best = Math.floor(forcedMask)
    bestModules = applyMask(best)
  } else {
    let bestScore = Infinity
    bestModules = applyMask(0)
    for (let mask = 0; mask < 8; mask++) {
      const m = applyMask(mask)
      const score = penalty(m, size)
      if (score < bestScore) {
        bestScore = score
        best = mask
        bestModules = m
      }
    }
  }
  return { version, size, mask: best, level, modules: bestModules, isFunction }
}

/** SVG path for the dark modules, merging horizontal runs. `skip` returns true for modules to leave out. */
function modulePath(q: QrMatrix, offset: number, skip?: (r: number, c: number) => boolean): string {
  let d = ""
  for (let r = 0; r < q.size; r++) {
    let c = 0
    while (c < q.size) {
      if (!q.modules[r * q.size + c] || skip?.(r, c)) {
        c++
        continue
      }
      let end = c
      while (end < q.size && q.modules[r * q.size + end] && !skip?.(r, end)) end++
      d += `M${c + offset} ${r + offset}h${end - c}v1h-${end - c}z`
      c = end
    }
  }
  return d
}

/* ── Component ────────────────────────────────────────────────────────────── */

function prettyValue(value: string) {
  try {
    const u = new URL(value)
    return u.host + (u.pathname !== "/" ? u.pathname : "")
  } catch {
    return value.length > 40 ? value.slice(0, 37) + "…" : value
  }
}

/**
 * A QR code that needs no library. The encoder is in this file: byte mode,
 * versions 1 to 40, all four error correction levels, Reed-Solomon codewords
 * and spec penalty masking. Modules draw as one SVG path in `currentColor`,
 * so the code follows your tokens; a logo can sit in a cleared well at level
 * H; and Download SVG writes a standalone file.
 */
function QrCode({
  value = "https://ui.minidev.pro",
  size = 200,
  level = "M",
  fg = "currentColor",
  bg = "transparent",
  margin = 2,
  logoScale = 0.24,
  mask,
  caption,
  download = true,
  fileName = "qr-code.svg",
  bare = false,
  title,
  children,
  className,
}: QrCodeProps) {
  const qr = React.useMemo(() => encodeQr(value, level, mask), [value, level, mask])
  const [saved, setSaved] = React.useState(false)
  const savedTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(() => () => {
    if (savedTimer.current) clearTimeout(savedTimer.current)
  }, [])

  const hasLogo = Boolean(children) && level === "H"
  const m = Math.max(0, Math.round(margin))
  const view = qr ? qr.size + m * 2 : 1
  const well = React.useMemo(() => {
    if (!qr || !hasLogo) return null
    let n = Math.round(qr.size * logoScale)
    if (n % 2 !== qr.size % 2) n++
    n = Math.max(3, Math.min(qr.size - 16, n))
    const start = (qr.size - n) / 2
    return { start, end: start + n, n }
  }, [qr, hasLogo, logoScale])
  const path = React.useMemo(
    () => (qr ? modulePath(qr, m, well ? (r, c) => r >= well.start && r < well.end && c >= well.start && c < well.end : undefined) : ""),
    [qr, m, well]
  )
  const label = title ?? `QR code for ${value}`

  const svgFile = React.useCallback(() => {
    const fill = fg === "currentColor" ? "#000000" : fg
    const back = bg === "transparent" ? "#ffffff" : bg
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${view} ${view}" width="${view * 8}" height="${view * 8}" shape-rendering="crispEdges"><title>${label.replace(/[<>&]/g, "")}</title><rect width="${view}" height="${view}" fill="${back}"/><path d="${path}" fill="${fill}"/></svg>`
  }, [fg, bg, view, label, path])

  const save = () => {
    const blob = new Blob([svgFile()], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setSaved(true)
    if (savedTimer.current) clearTimeout(savedTimer.current)
    savedTimer.current = setTimeout(() => setSaved(false), 1600)
  }

  const px = size / view
  const svg = qr ? (
    <svg
      data-slot="qr-code-svg"
      role="img"
      aria-label={label}
      viewBox={`0 0 ${view} ${view}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className="block"
    >
      <rect width={view} height={view} fill={bg} />
      <path d={path} fill={fg} />
    </svg>
  ) : (
    <div role="img" aria-label="Value too long to encode" style={{ width: size, height: size }} className="grid place-items-center rounded-lg bg-hatch text-center text-xs text-fg-subtle">
      Too long for level {level}
    </div>
  )

  const stage = (
    <div data-slot="qr-code-stage" className="relative" style={{ width: size, height: size }}>
      {svg}
      {qr && well ? (
        <div
          data-slot="qr-code-logo"
          aria-hidden
          className="absolute grid place-items-center overflow-hidden"
          style={{
            left: (m + well.start) * px + px,
            top: (m + well.start) * px + px,
            width: well.n * px - px * 2,
            height: well.n * px - px * 2,
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  )

  if (bare) return <div data-slot="qr-code" className={cn("inline-block text-fg", className)}>{stage}</div>

  const cap = caption ?? prettyValue(value)
  return (
    <div data-slot="qr-code" className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-4 text-fg shadow-raised", className)}>
      {stage}
      {cap ? (
        <p className="max-w-full truncate font-mono text-xs text-fg-muted" style={{ maxWidth: size }} title={value}>
          {cap}
        </p>
      ) : null}
      {download && qr ? (
        <Button type="button" variant="outline" size="sm" onClick={save} aria-live="polite" className="min-w-32">
          {saved ? <CheckIcon className="text-success" /> : <DownloadIcon />}
          {saved ? "Saved" : "Download SVG"}
        </Button>
      ) : null}
    </div>
  )
}

export { QrCode, encodeQr }
export type { QrCodeProps, QrLevel, QrMatrix }
