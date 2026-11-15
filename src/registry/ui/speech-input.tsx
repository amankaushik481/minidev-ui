"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { MicIcon, SquareIcon } from "lucide-react"
import { IconButton } from "@/registry/ui/icon-button"
import { Kbd } from "@/registry/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"
import { cn } from "@/lib/utils"

/**
 * SpeechInput — a mic button that turns speech into text with the browser's Web Speech API, with a ring that follows your voice.
 *
 * Put it in the toolbar of PromptInput or AiComposer. Click to start, click again or press Escape to
 * stop. `onTranscript(text, { final })` fires with grey-preview text (`final: false`) while you speak
 * and with settled text (`final: true`) when a phrase ends: append final text, replace the preview.
 * It needs `SpeechRecognition`, which Chrome, Edge and Safari have and Firefox does not; there the
 * button is disabled with a tooltip that says so. It calls no service of its own and needs no API
 * key. To record an audio file instead of text use AudioRecorder.
 *
 * @example
 * const [preview, setPreview] = React.useState("")
 * <SpeechInput onTranscript={(text, { final }) => {
 *   if (final) { setPrompt((p) => `${p} ${text.trim()}`.trim()); setPreview("") } else setPreview(text)
 * }} />
 */

type SpeechInputProps = {
  /** Fires with recognised text. `final: false` is a live guess that will be replaced; `final: true` is settled. */
  onTranscript?: (text: string, meta: { final: boolean }) => void
  /** BCP 47 language to recognise, e.g. "en-GB" or "hi-IN". Defaults to the browser language (`navigator.language`). */
  lang?: string
  /** Keep listening across pauses until stopped. When false, it stops after the first phrase. */
  continuous?: boolean
  /** Send interim guesses (`final: false`) while the user speaks. */
  interim?: boolean
  /** Fires with the Web Speech error code: "not-allowed", "audio-capture", "network", "no-speech"... */
  onError?: (error: string) => void
  /** Fires once after mount when the browser has no speech recognition. */
  onUnsupported?: () => void
  /** Disables the button and stops listening if it is on. */
  disabled?: boolean
  /** 32px (sm) or 36px (md). */
  size?: "sm" | "md"
  /** Accessible name of the button, also its tooltip. Defaults to "Dictate". */
  "aria-label"?: string
  className?: string
}

type Alternative = { transcript: string }
type RecognitionResult = ArrayLike<Alternative> & { isFinal: boolean }
type Recognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((e: { resultIndex: number; results: ArrayLike<RecognitionResult> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
}
type RecognitionCtor = new () => Recognition

const getRecognition = (): RecognitionCtor | undefined => {
  if (typeof window === "undefined") return undefined
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition
}
const noopSubscribe = () => () => {}
const isSupported = () => !!getRecognition()

const UNSUPPORTED = "Voice input is not supported in this browser"
const MESSAGES: Record<string, string> = {
  "not-allowed": "Microphone access is blocked. Allow it in the browser's site settings.",
  "service-not-allowed": "Microphone access is blocked. Allow it in the browser's site settings.",
  "audio-capture": "No microphone found.",
  network: "Voice input needs a network connection.",
  "no-speech": "No speech heard. Try again.",
}

function SpeechInput({
  onTranscript,
  lang,
  continuous = true,
  interim = true,
  onError,
  onUnsupported,
  disabled,
  size = "md",
  "aria-label": ariaLabel = "Dictate",
  className,
}: SpeechInputProps) {
  const reduce = useReducedMotion()
  // true on the server and during hydration, so supported browsers never flash a disabled button.
  const supported = React.useSyncExternalStore(noopSubscribe, isSupported, () => true)
  const [listening, setListening] = React.useState(false)
  const [message, setMessage] = React.useState<string | null>(null)
  const descId = React.useId()
  const recognition = React.useRef<Recognition | null>(null)
  const ring = React.useRef<HTMLSpanElement>(null)
  const meter = React.useRef<{ stream?: MediaStream; ctx?: AudioContext; raf: number; session: number }>({ raf: 0, session: 0 })
  // Read the latest callbacks when results arrive, not the ones captured when listening started.
  const cb = React.useRef({ onTranscript, onError })
  React.useEffect(() => {
    cb.current = { onTranscript, onError }
  })

  React.useEffect(() => {
    if (!supported) onUnsupported?.()
    // Only on the support answer: a new onUnsupported function each render must not fire it again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supported])

  const stopMeter = React.useCallback(() => {
    const m = meter.current
    m.session++
    cancelAnimationFrame(m.raf)
    m.stream?.getTracks().forEach((t) => t.stop())
    m.ctx?.close().catch(() => {})
    m.stream = undefined
    m.ctx = undefined
    if (ring.current) ring.current.style.transform = ""
  }, [])

  // The ring scales with the microphone level: a second, analysis-only stream, never recorded.
  const startMeter = () => {
    const m = meter.current
    const session = ++m.session
    if (reduce || !navigator.mediaDevices?.getUserMedia) return
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (session !== m.session) return stream.getTracks().forEach((t) => t.stop())
        const ctx = new AudioContext()
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 256
        ctx.createMediaStreamSource(stream).connect(analyser)
        m.stream = stream
        m.ctx = ctx
        const buf = new Uint8Array(analyser.fftSize)
        let level = 0
        const tick = () => {
          analyser.getByteTimeDomainData(buf)
          let sum = 0
          for (let i = 0; i < buf.length; i++) sum += ((buf[i] - 128) / 128) ** 2
          level = level * 0.75 + Math.min(1, Math.sqrt(sum / buf.length) * 5) * 0.25
          if (ring.current) ring.current.style.transform = `scale(${1 + level * 0.4})`
          m.raf = requestAnimationFrame(tick)
        }
        tick()
      })
      // The meter is decoration. A denied microphone is reported by the recognition error instead.
      .catch(() => {})
  }

  const stop = React.useCallback(() => recognition.current?.stop(), [])

  const start = () => {
    const Ctor = getRecognition()
    if (!Ctor) return
    const rec = new Ctor()
    rec.lang = lang ?? navigator.language
    rec.continuous = continuous
    rec.interimResults = interim
    rec.onresult = (e) => {
      let settled = ""
      let guess = ""
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i]
        if (r.isFinal) settled += r[0].transcript
        else guess += r[0].transcript
      }
      if (settled) cb.current.onTranscript?.(settled, { final: true })
      if (guess) cb.current.onTranscript?.(guess, { final: false })
    }
    rec.onerror = (e) => {
      if (e.error === "aborted") return
      setMessage(MESSAGES[e.error] ?? "Voice input stopped unexpectedly.")
      cb.current.onError?.(e.error)
    }
    rec.onend = () => {
      if (recognition.current === rec) recognition.current = null
      setListening(false)
      stopMeter()
    }
    setMessage(null)
    try {
      rec.start()
    } catch {
      setMessage("Voice input stopped unexpectedly.")
      return
    }
    recognition.current = rec
    setListening(true)
    startMeter()
  }

  // Escape stops dictation wherever focus is, so it works while typing in the prompt.
  React.useEffect(() => {
    if (!listening) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") stop()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [listening, stop])

  // Stop listening when disabled mid-session, and release the microphone on unmount.
  React.useEffect(() => {
    if (disabled) recognition.current?.stop()
  }, [disabled])
  React.useEffect(
    () => () => {
      const rec = recognition.current
      if (rec) {
        rec.onend = null
        rec.abort()
      }
      stopMeter()
    },
    [stopMeter]
  )

  const unavailable = !supported
  return (
    <span data-slot="speech-input" className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative inline-grid">
        <span
          ref={ring}
          aria-hidden
          data-slot="speech-input-ring"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full bg-accent-soft ring-1 ring-accent-line ring-inset",
            "transition-[opacity] duration-200 ease-hairline",
            listening ? "scale-[1.12] opacity-100" : "opacity-0"
          )}
        />
        <Tooltip>
          <TooltipTrigger
            render={
              <IconButton
                aria-label={ariaLabel}
                aria-pressed={listening}
                aria-describedby={unavailable ? descId : undefined}
                variant={listening ? "soft" : "ghost"}
                size={size === "sm" ? "icon-sm" : "icon"}
                disabled={disabled || unavailable}
                focusableWhenDisabled={unavailable}
                onClick={() => (listening ? stop() : start())}
                className="relative rounded-full focus-visible:ring-offset-surface data-[disabled]:pointer-events-auto data-[disabled]:cursor-not-allowed"
              >
                {listening ? <SquareIcon className="size-3 fill-current" /> : <MicIcon />}
              </IconButton>
            }
          />
          <TooltipContent>
            {unavailable ? (
              UNSUPPORTED
            ) : listening ? (
              <>
                Stop <Kbd>Esc</Kbd>
              </>
            ) : (
              ariaLabel
            )}
          </TooltipContent>
        </Tooltip>
      </span>
      {unavailable ? (
        <span id={descId} hidden>
          {UNSUPPORTED}
        </span>
      ) : null}
      {message && !listening ? (
        <span role="alert" className="text-xs text-fg-muted">
          {message}
        </span>
      ) : null}
    </span>
  )
}

export { SpeechInput }
export type { SpeechInputProps }
