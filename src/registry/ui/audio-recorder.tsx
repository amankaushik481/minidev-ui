"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { DownloadIcon, MicIcon, PauseIcon, PlayIcon, RotateCcwIcon, SquareIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** A microphone recorder with start, pause and stop, an elapsed timer, live waveform bars, playback with a progress bar and a download button. */
type AudioRecorderProps = {
  /** Longest recording in seconds. Recording stops by itself when it is reached. */
  maxDuration?: number
  /** Called with the finished recording and its object URL. */
  onRecorded?: (blob: Blob, meta: { duration: number; url: string; mimeType: string }) => void
  title?: string
  /** Shown under the title. */
  description?: string
  /** Base name of the downloaded file. The extension follows the recording format. */
  fileName?: string
  /** Number of waveform bars. */
  bars?: number
  className?: string
}

type Status = "idle" | "recording" | "paused" | "done"
type Result = { blob: Blob; url: string; duration: number; mimeType: string }

const MIMES = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus", "audio/ogg"]
const SAMPLE_EVERY = 50
/** Resting bars: a quiet, symmetric shape instead of a flat line. */
const idle = (n: number) => Array.from({ length: n }, (_, i) => 0.1 + 0.16 * (0.5 + 0.5 * Math.sin(i * 0.42 + 0.6)) * (0.6 + 0.4 * Math.sin(i * 0.11)))

const DENIED = "Microphone access was blocked. Allow it in the browser's site settings, then try again."
const UNSUPPORTED = "Recording needs a browser with microphone support."

function clock(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`
}

function extOf(mime: string) {
  if (mime.includes("mp4")) return "m4a"
  if (mime.includes("ogg")) return "ogg"
  return "webm"
}

const secondary =
  "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-[0.8125rem] font-medium text-fg shadow-key outline-none transition-[border-color,background-color] duration-[70ms] hover:border-border-strong hover:bg-sunken/50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:translate-y-[0.5px] [&_svg]:text-fg-muted"

/** Average the samples into `n` bins and normalise to the loudest bin. */
function bin(samples: number[], n: number) {
  if (!samples.length) return Array.from({ length: n }, () => 0)
  const out: number[] = []
  for (let i = 0; i < n; i++) {
    const a = Math.floor((i / n) * samples.length)
    const b = Math.max(a + 1, Math.floor(((i + 1) / n) * samples.length))
    let s = 0
    for (let j = a; j < b; j++) s += samples[j]
    out.push(s / (b - a))
  }
  const peak = Math.max(0.08, ...out)
  return out.map((v) => v / peak)
}

/**
 * A voice note recorder. The level bars scroll while you speak, and when
 * you stop they settle into the recording's waveform, which becomes the
 * playback scrubber: bars to the left of the playhead are lit. Without a
 * microphone or permission it stays in a calm idle state with a hint.
 */
function AudioRecorder({
  maxDuration = 120,
  onRecorded,
  title = "Voice note",
  description = "Attach to invoice INV-2041 for Northwind",
  fileName = "voice-note",
  bars = 48,
  className,
}: AudioRecorderProps) {
  const reduce = useReducedMotion()
  const [status, setStatus] = React.useState<Status>("idle")
  const [supported, setSupported] = React.useState<boolean | null>(null)
  const [hint, setHint] = React.useState<string | null>(null)
  const [elapsed, setElapsed] = React.useState(0)
  const [levels, setLevels] = React.useState<number[]>(() => idle(bars))
  const [result, setResult] = React.useState<Result | null>(null)
  const [playing, setPlaying] = React.useState(false)
  const [position, setPosition] = React.useState(0)
  const [mediaDuration, setMediaDuration] = React.useState<number | null>(null)
  const id = React.useId()

  const stream = React.useRef<MediaStream | null>(null)
  const ctx = React.useRef<AudioContext | null>(null)
  const analyser = React.useRef<AnalyserNode | null>(null)
  const recorder = React.useRef<MediaRecorder | null>(null)
  const chunks = React.useRef<Blob[]>([])
  const samples = React.useRef<number[]>([])
  const raf = React.useRef(0)
  const timing = React.useRef({ base: 0, since: 0, lastSample: 0, lastPaint: 0 })
  const audio = React.useRef<HTMLAudioElement>(null)
  const url = React.useRef<string | null>(null)

  React.useEffect(() => {
    setSupported(typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== "undefined")
  }, [])

  const release = React.useCallback(() => {
    cancelAnimationFrame(raf.current)
    stream.current?.getTracks().forEach((t) => t.stop())
    stream.current = null
    analyser.current = null
    ctx.current?.close().catch(() => {})
    ctx.current = null
  }, [])

  React.useEffect(
    () => () => {
      release()
      const rec = recorder.current
      if (rec && rec.state !== "inactive") {
        rec.onstop = null
        rec.stop()
      }
      if (url.current) URL.revokeObjectURL(url.current)
    },
    [release]
  )

  const elapsedNow = () => {
    const t = timing.current
    return t.base + (t.since ? performance.now() - t.since : 0)
  }

  const stop = React.useCallback(() => {
    const rec = recorder.current
    timing.current.base = elapsedNow()
    timing.current.since = 0
    cancelAnimationFrame(raf.current)
    if (rec && rec.state !== "inactive") rec.stop()
    else release()
  }, [release])

  const loop = React.useCallback(() => {
    const a = analyser.current
    const t = timing.current
    const now = performance.now()
    if (a && now - t.lastSample >= SAMPLE_EVERY) {
      const buf = new Uint8Array(a.fftSize)
      a.getByteTimeDomainData(buf)
      let sum = 0
      for (let i = 0; i < buf.length; i++) {
        const v = (buf[i] - 128) / 128
        sum += v * v
      }
      samples.current.push(Math.min(1, Math.sqrt(sum / buf.length) * 3.2))
      t.lastSample = now
    }
    const ms = elapsedNow()
    if (now - t.lastPaint >= (reduce ? 1000 / 12 : 1000 / 30)) {
      t.lastPaint = now
      setElapsed(ms)
      const s = samples.current
      const tail = s.slice(Math.max(0, s.length - bars))
      setLevels([...Array.from({ length: bars - tail.length }, () => 0), ...tail])
    }
    if (ms >= maxDuration * 1000) {
      stop()
      return
    }
    raf.current = requestAnimationFrame(loop)
  }, [bars, maxDuration, reduce, stop])

  const start = async () => {
    if (status === "recording" || status === "paused") return
    setHint(null)
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setHint(UNSUPPORTED)
      return
    }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.current = s
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (AC) {
        const c = new AC()
        ctx.current = c
        const an = c.createAnalyser()
        an.fftSize = 1024
        c.createMediaStreamSource(s).connect(an)
        analyser.current = an
      }
      const mimeType = MIMES.find((m) => MediaRecorder.isTypeSupported?.(m))
      const rec = new MediaRecorder(s, mimeType ? { mimeType } : undefined)
      recorder.current = rec
      chunks.current = []
      samples.current = []
      if (url.current) URL.revokeObjectURL(url.current)
      url.current = null
      setResult(null)
      setMediaDuration(null)
      setPosition(0)
      setPlaying(false)
      rec.ondataavailable = (e) => {
        if (e.data.size) chunks.current.push(e.data)
      }
      rec.onstop = () => {
        const type = rec.mimeType || mimeType || "audio/webm"
        const blob = new Blob(chunks.current, { type })
        const objectUrl = URL.createObjectURL(blob)
        url.current = objectUrl
        const duration = timing.current.base / 1000
        release()
        setLevels(bin(samples.current, bars))
        setElapsed(timing.current.base)
        setResult({ blob, url: objectUrl, duration, mimeType: type })
        setStatus("done")
        onRecorded?.(blob, { duration, url: objectUrl, mimeType: type })
      }
      rec.onerror = () => {
        release()
        setStatus("idle")
        setHint("Recording stopped unexpectedly. Try again.")
      }
      timing.current = { base: 0, since: performance.now(), lastSample: 0, lastPaint: 0 }
      setElapsed(0)
      setLevels(Array.from({ length: bars }, () => 0))
      rec.start(250)
      setStatus("recording")
      raf.current = requestAnimationFrame(loop)
    } catch (err) {
      release()
      const name = (err as { name?: string })?.name
      setHint(name === "NotAllowedError" || name === "SecurityError" ? DENIED : name === "NotFoundError" ? "No microphone was found on this device." : UNSUPPORTED)
      setStatus("idle")
    }
  }

  const pause = () => {
    const rec = recorder.current
    if (!rec || rec.state !== "recording") return
    rec.pause()
    timing.current.base = elapsedNow()
    timing.current.since = 0
    cancelAnimationFrame(raf.current)
    setElapsed(timing.current.base)
    setStatus("paused")
  }

  const resume = () => {
    const rec = recorder.current
    if (!rec || rec.state !== "paused") return
    rec.resume()
    timing.current.since = performance.now()
    setStatus("recording")
    raf.current = requestAnimationFrame(loop)
  }

  const reset = () => {
    const a = audio.current
    if (a) {
      a.pause()
      a.currentTime = 0
    }
    if (url.current) URL.revokeObjectURL(url.current)
    url.current = null
    setResult(null)
    setMediaDuration(null)
    setPlaying(false)
    setPosition(0)
    setElapsed(0)
    setLevels(idle(bars))
    setStatus("idle")
  }

  const duration = result ? (mediaDuration ?? result.duration) : 0

  const togglePlay = () => {
    const a = audio.current
    if (!a || !result) return
    if (a.paused) a.play().catch(() => setPlaying(false))
    else a.pause()
  }

  const seek = (to: number) => {
    const a = audio.current
    if (!a || !result) return
    const t = Math.max(0, Math.min(duration, to))
    a.currentTime = t
    setPosition(t)
  }

  const seekFromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    seek(((e.clientX - r.left) / r.width) * duration)
  }

  const live = status === "recording" || status === "paused"
  const progress = result && duration > 0 ? position / duration : 0
  const litBars = Math.round(progress * bars)
  const canRecord = supported !== false && !live
  const remaining = Math.max(0, maxDuration * 1000 - elapsed)
  const sentence = (s: Status) =>
    s === "recording" ? "Recording" : s === "paused" ? "Paused" : s === "done" ? "Recorded" : supported === false ? "Unavailable" : "Ready"

  return (
    <div data-slot="audio-recorder" className={cn("w-full max-w-md rounded-xl border border-border bg-surface p-4 shadow-raised", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.8125rem] font-medium text-fg">{title}</p>
          {description ? <p className="mt-0.5 truncate text-xs text-fg-muted">{description}</p> : null}
        </div>
        <div className="flex shrink-0 items-center gap-2 font-mono text-sm tabular-nums">
          {status === "recording" ? (
            <span aria-hidden className="relative grid size-2.5 place-items-center">
              <span className="absolute size-2.5 rounded-full bg-danger opacity-40 motion-safe:animate-ping" />
              <span className="size-2 rounded-full bg-danger" />
            </span>
          ) : null}
          <span className={cn(status === "recording" ? "text-danger" : "text-fg")}>{clock(status === "done" ? position * 1000 : elapsed)}</span>
          <span className="text-fg-subtle">/ {clock(status === "done" ? duration * 1000 : maxDuration * 1000)}</span>
        </div>
      </div>

      <div
        data-slot="audio-recorder-wave"
        role={status === "done" ? "slider" : "img"}
        tabIndex={status === "done" ? 0 : undefined}
        aria-label={status === "done" ? "Playback position" : live ? "Live input level" : "Waveform"}
        aria-valuemin={status === "done" ? 0 : undefined}
        aria-valuemax={status === "done" ? Math.round(duration) : undefined}
        aria-valuenow={status === "done" ? Math.round(position) : undefined}
        aria-valuetext={status === "done" ? `${clock(position * 1000)} of ${clock(duration * 1000)}` : undefined}
        onPointerDown={status === "done" ? seekFromPointer : undefined}
        onPointerMove={status === "done" ? (e) => e.buttons === 1 && seekFromPointer(e) : undefined}
        onKeyDown={
          status === "done"
            ? (e) => {
                const step = e.shiftKey ? 5 : 1
                if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); seek(position + step) }
                if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); seek(position - step) }
                if (e.key === "Home") { e.preventDefault(); seek(0) }
                if (e.key === "End") { e.preventDefault(); seek(duration) }
                if (e.key === " " || e.key === "Enter") { e.preventDefault(); togglePlay() }
              }
            : undefined
        }
        className={cn(
          "relative mt-4 flex h-16 items-center gap-[3px] overflow-hidden rounded-lg bg-sunken px-3 outline-none",
          status === "done" && "cursor-pointer touch-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        )}
      >
        {levels.map((v, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "min-w-0 flex-1 rounded-full",
              status === "done" ? (i < litBars ? "bg-accent" : "bg-fg-subtle/40") : status === "recording" ? "bg-accent" : status === "paused" ? "bg-fg-subtle/60" : "bg-border-strong"
            )}
            style={{ height: `${Math.max(3, Math.round(v * 56))}px` }}
          />
        ))}
        {status === "done" ? (
          <span aria-hidden className="pointer-events-none absolute top-1 bottom-1 w-px bg-fg" style={{ left: `calc(12px + (100% - 24px) * ${progress})` }} />
        ) : null}
        {live ? (
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-full bg-danger/60"
            style={{ transform: `scaleX(${Math.min(1, elapsed / (maxDuration * 1000))})` }}
          />
        ) : null}
      </div>

      <div className="mt-4 flex items-center gap-2">
        {status === "done" ? (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="grid size-11 place-items-center rounded-full bg-ink text-on-ink shadow-ink outline-none transition-[background-color] duration-[70ms] hover:bg-ink-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:translate-y-[0.5px]"
          >
            {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4 translate-x-px" />}
          </button>
        ) : (
          <button
            type="button"
            onClick={live ? stop : start}
            disabled={!live && !canRecord}
            aria-label={live ? "Stop recording" : "Start recording"}
            className={cn(
              "grid size-11 place-items-center rounded-full shadow-ink outline-none transition-[background-color] duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:translate-y-[0.5px] disabled:cursor-not-allowed disabled:opacity-45",
              live ? "bg-danger text-white hover:bg-danger/90" : "bg-ink text-on-ink hover:bg-ink-hover"
            )}
          >
            {live ? <SquareIcon className="size-3.5" fill="currentColor" /> : <MicIcon className="size-4" />}
          </button>
        )}

        {status === "recording" ? (
          <button type="button" onClick={pause} className={secondary}>
            <PauseIcon className="size-3.5" /> Pause
          </button>
        ) : status === "paused" ? (
          <button type="button" onClick={resume} className={secondary}>
            <PlayIcon className="size-3.5" /> Resume
          </button>
        ) : status === "done" && result ? (
          <>
            <button type="button" onClick={reset} className={secondary}>
              <RotateCcwIcon className="size-3.5" /> Record again
            </button>
            <a href={result.url} download={`${fileName}.${extOf(result.mimeType)}`} className={secondary}>
              <DownloadIcon className="size-3.5" /> Download
            </a>
          </>
        ) : null}
      </div>
      <p id={`${id}-hint`} aria-live="polite" className={cn("mt-3 min-h-[1.55em] text-xs", hint ? "text-fg" : "text-fg-muted")}>
          {hint ??
            (status === "recording"
              ? `${clock(remaining)} left`
              : status === "paused"
                ? "Paused. Resume or stop to finish."
                : status === "done" && result
                  ? `${clock(result.duration * 1000)} recorded. Play it back or download it.`
                  : supported === false
                    ? UNSUPPORTED
                    : `Press record to capture a note, up to ${clock(maxDuration * 1000)}.`)}
      </p>
      <span className="sr-only" aria-live="polite">
        {sentence(status)}
      </span>

      {result ? (
        <audio
          ref={audio}
          src={result.url}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setPosition(Math.min(e.currentTarget.currentTime, duration))}
          onDurationChange={(e) => {
            const d = e.currentTarget.duration
            if (Number.isFinite(d) && d > 0) setMediaDuration(d)
          }}
          onEnded={() => {
            setPlaying(false)
            setPosition(0)
          }}
          onLoadedMetadata={(e) => {
            // Chrome reports Infinity for fresh MediaRecorder blobs until a seek past the end.
            const a = e.currentTarget
            if (!Number.isFinite(a.duration)) {
              const fix = () => {
                a.removeEventListener("timeupdate", fix)
                a.currentTime = 0
              }
              a.addEventListener("timeupdate", fix)
              a.currentTime = 1e101
            }
          }}
          className="hidden"
        />
      ) : null}
    </div>
  )
}

export { AudioRecorder }
export type { AudioRecorderProps }
