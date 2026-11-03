#!/usr/bin/env python3
"""Subset the geist package's variable fonts into src/fonts/*.subset.woff2.

Keeps Latin, the punctuation, currency, arrows, maths and symbols the site
uses, every OpenType feature and the full weight axis; Mono also keeps box
drawing for code. Needs fontTools (pip install fonttools). WOFF2 needs brotli:
if the Python module is missing, Node's built-in brotli is used instead.

  python3 tools/subset-fonts.py
"""
from __future__ import annotations

import subprocess
import sys
import types
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "node_modules/geist/dist/fonts"
OUT = ROOT / "src/fonts"

LATIN = (
    "U+0000-00FF,U+0131,U+0152-0153,U+0160-0161,U+0178,U+017D-017E,U+0192,U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
    "U+2000-206F,U+20A0-20CF,U+2100-214F,U+2190-21FF,U+2200-22FF,U+2300-23FF,U+25A0-25FF,U+2713,U+2715,U+2717,U+FEFF,U+FFFD"
)
FONTS = [
    ("geist-sans/Geist-Variable.ttf", "Geist-Variable.subset.woff2", LATIN),
    ("geist-mono/GeistMono-Variable.ttf", "GeistMono-Variable.subset.woff2", LATIN + ",U+2500-259F"),
]


def node_brotli() -> types.ModuleType:
    js = (
        "const zlib=require('zlib'),fs=require('fs');const [op,mode,q]=process.argv.slice(1);const i=fs.readFileSync(0);"
        "process.stdout.write(op==='c'?zlib.brotliCompressSync(i,{params:{[zlib.constants.BROTLI_PARAM_MODE]:+mode,"
        "[zlib.constants.BROTLI_PARAM_QUALITY]:+q,[zlib.constants.BROTLI_PARAM_SIZE_HINT]:i.length}}):zlib.brotliDecompressSync(i))"
    )
    run = lambda args, data: subprocess.run(["node", "-e", js, *args], input=bytes(data), capture_output=True, check=True).stdout  # noqa: E731
    mod = types.ModuleType("brotli")
    mod.MODE_GENERIC, mod.MODE_TEXT, mod.MODE_FONT = 0, 1, 2
    mod.compress = lambda data, mode=0, quality=11, lgwin=22, lgblock=0: run(["c", str(mode), str(quality)], data)
    mod.decompress = lambda data: run(["d", "0", "0"], data)
    return mod


def unicodes(spec: str) -> list[int]:
    out: list[int] = []
    for part in spec.replace("U+", "").split(","):
        a, _, b = part.partition("-")
        out.extend(range(int(a, 16), int(b or a, 16) + 1))
    return out


def main() -> int:
    try:
        import brotli  # noqa: F401
    except ImportError:
        sys.modules["brotli"] = node_brotli()
    from fontTools import subset
    from fontTools.ttLib import TTFont

    for src, dest, spec in FONTS:
        opts = subset.Options()
        opts.flavor = "woff2"
        opts.layout_features = ["*"]
        opts.name_IDs = ["*"]
        opts.name_languages = ["*"]
        opts.notdef_outline = True
        font = TTFont(SRC / src)
        sub = subset.Subsetter(opts)
        sub.populate(unicodes=unicodes(spec))
        sub.subset(font)
        subset.save_font(font, str(OUT / dest), opts)
        print(f"{dest}: {(OUT / dest).stat().st_size / 1024:.1f} KB (from {(SRC / src).with_suffix('.woff2').stat().st_size / 1024:.1f} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
