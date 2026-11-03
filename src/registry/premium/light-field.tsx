"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * LightField: a living background drawn by a small WebGL shader. Colour
 * silk made of warped noise drifts slowly, the cursor carries a soft light
 * through it, and fine grain keeps it from looking digital. It starts when
 * the browser is idle, compiles its shader off the main thread where the GPU
 * allows, renders at half resolution and 30 fps, fades in on its first frame,
 * sleeps when off screen or in a background tab, stays empty without a real
 * GPU (put a still behind it), and draws a single still frame for reduced
 * motion. Glass surfaces placed over it frost it beautifully.
 */

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`

const FRAG = `precision highp float;
uniform vec2 r;uniform float t;uniform vec2 m;uniform float dk;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 R=mat2(.8,.6,-.6,.8);for(int i=0;i<5;i++){v+=a*n(p);p=R*p*2.02;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*1.6;
  float tt=t*.045;
  vec2 q=vec2(fbm(p+vec2(0.,tt)),fbm(p+vec2(5.2,1.3)-tt));
  vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+tt*1.3),fbm(p+3.*q+vec2(8.3,2.8)-tt));
  float f=fbm(p+2.5*w);
  vec3 col=mix(c1,c2,smoothstep(.2,.8,f));
  col=mix(col,c3,smoothstep(.45,.95,length(w)*.9));
  // silk highlights along the folds
  float silk=pow(smoothstep(.55,.9,f),3.);
  col+=silk*.35;
  // the light
  vec2 mm=m*vec2(r.x/r.y,1.)*1.6;float d=distance(p,mm);
  float glow=exp(-d*d*2.2);
  vec3 bg=mix(vec3(.985,.984,.99),vec3(.07,.07,.09),dk);
  float amt=mix(.72,.8,dk)+glow*.3;
  vec3 o=mix(bg,col,amt*smoothstep(1.05,.15,uv.y*.9+.1));
  o+=glow*mix(.18,.22,dk)*mix(vec3(1.),c1,.35);
  o+=(h(gl_FragCoord.xy+fract(t))-.5)*mix(.035,.05,dk);
  gl_FragColor=vec4(o,1.);
}`

type Palette = { c1: [number, number, number]; c2: [number, number, number]; c3: [number, number, number] }
const LIGHT: Palette = { c1: [0.66, 0.54, 1.0], c2: [0.55, 0.78, 1.0], c3: [1.0, 0.7, 0.86] }
const DARK: Palette = { c1: [0.42, 0.22, 0.95], c2: [0.1, 0.4, 0.9], c3: [0.8, 0.2, 0.6] }

type LightFieldProps = {
  className?: string
  palette?: { light?: Palette; dark?: Palette }
  /** Frames per second. The silk drifts slowly, so 30 looks the same as 60 for half the GPU work. */
  fps?: number
  /** Render scale in CSS pixels. The field is soft, so 0.5 (scaled up by the browser) is indistinguishable from full size. */
  resolution?: number
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

function LightField({ className, palette, fps = 30, resolution = 0.5 }: LightFieldProps) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let stop: (() => void) | undefined
    let cancelled = false
    // Start when the browser is idle: compiling the shader never competes with the first paint.
    const w = window as IdleWindow
    const idle = w.requestIdleCallback ? w.requestIdleCallback(() => start(), { timeout: 1500 }) : window.setTimeout(() => start(), 300)
    function start() {
      if (cancelled || !canvas) return
      stop = run(canvas, palette, fps, resolution)
    }
    return () => {
      cancelled = true
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      stop?.()
    }
  }, [palette, fps, resolution])
  return (
    <canvas
      ref={ref}
      data-slot="light-field"
      aria-hidden
      className={cn("block size-full opacity-0 transition-opacity duration-700 ease-out data-[ready]:opacity-100", className)}
    />
  )
}

/* Sets up WebGL on the canvas and runs the loop. Returns a function that stops it. */
function run(canvas: HTMLCanvasElement, palette: LightFieldProps["palette"], fps: number, resolution: number) {
  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false, powerPreference: "low-power", failIfMajorPerformanceCaveat: true })
  if (!gl) return
  // A software renderer (no usable GPU) would draw this shader on the CPU: leave the canvas empty instead.
  const info = gl.getExtension("WEBGL_debug_renderer_info")
  const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ""
  if (/swiftshader|llvmpipe|software|basic render/i.test(renderer)) return
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const prog = gl.createProgram()!
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)

  let raf = 0
  let dead = false
  const cleanups: (() => void)[] = []
  // With KHR_parallel_shader_compile the driver compiles off the main thread; poll until it is done.
  const parallel = gl.getExtension("KHR_parallel_shader_compile") as { COMPLETION_STATUS_KHR: number } | null
  const whenLinked = (cb: () => void) => {
    if (dead) return
    if (parallel && !gl.getProgramParameter(prog, parallel.COMPLETION_STATUS_KHR)) {
      raf = requestAnimationFrame(() => whenLinked(cb))
      return
    }
    cb()
  }

  whenLinked(() => {
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, "p")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = (k: string) => gl.getUniformLocation(prog, k)
    const uR = U("r"), uT = U("t"), uM = U("m"), uD = U("dk"), u1 = U("c1"), u2 = U("c2"), u3 = U("c3")

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const frame = 1000 / Math.max(1, fps)
    let visible = true
    const start = performance.now()
    let lastDraw = -Infinity
    const mouse = { x: 0.3, y: 0.7, tx: 0.3, ty: 0.7 }
    let dark = document.documentElement.classList.contains("dark") ? 1 : 0

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * resolution))
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * resolution))
      gl.viewport(0, 0, canvas.width, canvas.height)
      lastDraw = -Infinity
    }
    const setPalette = () => {
      const pal = dark ? (palette?.dark ?? DARK) : (palette?.light ?? LIGHT)
      gl.uniform3fv(u1, pal.c1)
      gl.uniform3fv(u2, pal.c2)
      gl.uniform3fv(u3, pal.c3)
      gl.uniform1f(uD, dark)
    }
    const draw = (now: number) => {
      // Frame-rate independent easing toward the pointer.
      const k = 1 - Math.pow(0.94, Math.min(100, now - lastDraw) / 16.7)
      mouse.x += (mouse.tx - mouse.x) * k
      mouse.y += (mouse.ty - mouse.y) * k
      gl.uniform2f(uR, canvas.width, canvas.height)
      gl.uniform1f(uT, reduce ? 12 : (now - start) / 1000)
      gl.uniform2f(uM, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      lastDraw = now
      if (!canvas.hasAttribute("data-ready")) canvas.setAttribute("data-ready", "")
    }
    const loop = (now: number) => {
      if (now - lastDraw >= frame - 1) draw(now)
      if (visible && !document.hidden && !reduce) raf = requestAnimationFrame(loop)
    }
    const kick = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(loop)
    }
    const move = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - b.left) / b.width
      mouse.ty = 1 - (e.clientY - b.top) / b.height
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) kick()
    })
    const mo = new MutationObserver(() => {
      dark = document.documentElement.classList.contains("dark") ? 1 : 0
      setPalette()
      lastDraw = -Infinity
      kick()
    })
    const ro = new ResizeObserver(() => {
      resize()
      kick()
    })
    resize()
    setPalette()
    io.observe(canvas)
    ro.observe(canvas)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    window.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("visibilitychange", kick)
    kick()
    cleanups.push(() => {
      io.disconnect()
      ro.disconnect()
      mo.disconnect()
      window.removeEventListener("pointermove", move)
      document.removeEventListener("visibilitychange", kick)
    })
  })

  return () => {
    dead = true
    cancelAnimationFrame(raf)
    cleanups.forEach((f) => f())
  }
}

export { LightField }
export type { LightFieldProps }
