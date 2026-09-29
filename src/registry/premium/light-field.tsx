"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * LightField: a living background drawn by a small WebGL shader. Colour
 * silk made of warped noise drifts slowly, the cursor carries a soft light
 * through it, and fine grain keeps it from looking digital. It renders at
 * half resolution, sleeps when off screen or in a background tab, and draws
 * a single still frame for reduced motion. Glass surfaces placed over it
 * frost it beautifully.
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

type LightFieldProps = { className?: string; palette?: { light?: Palette; dark?: Palette } }

function LightField({ className, palette }: LightFieldProps) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false, powerPreference: "low-power" })
    if (!gl) return
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
    let raf = 0
    let visible = true
    const start = performance.now()
    const mouse = { x: 0.3, y: 0.7, tx: 0.3, ty: 0.7 }
    let dark = document.documentElement.classList.contains("dark") ? 1 : 0

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2) * 0.5
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * scale))
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const setPalette = () => {
      const pal = dark ? (palette?.dark ?? DARK) : (palette?.light ?? LIGHT)
      gl.uniform3fv(u1, pal.c1)
      gl.uniform3fv(u2, pal.c2)
      gl.uniform3fv(u3, pal.c3)
      gl.uniform1f(uD, dark)
    }
    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      gl.uniform2f(uR, canvas.width, canvas.height)
      gl.uniform1f(uT, reduce ? 12 : (now - start) / 1000)
      gl.uniform2f(uM, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    const loop = (now: number) => {
      draw(now)
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
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      mo.disconnect()
      window.removeEventListener("pointermove", move)
      document.removeEventListener("visibilitychange", kick)
    }
  }, [palette])
  return <canvas ref={ref} data-slot="light-field" aria-hidden className={cn("block size-full", className)} />
}

export { LightField }
export type { LightFieldProps }
