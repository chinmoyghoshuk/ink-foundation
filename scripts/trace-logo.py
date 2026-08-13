"""Trace the foundation logo bitmap into two SVGs: the full lockup and the wordmark mark.

  python scripts/trace-logo.py <source.png> src/assets/brand public

Needs potrace (brew install potrace) and Pillow.

Writes <dest-dir>/logo.svg (full lockup) and <dest-dir>/mark.svg (wordmark + leaf only).
Navy paths use `currentColor`; the leaf/heart use var(--logo-leaf) so both can be themed.
Also writes favicon.png / apple-touch-icon.png next to them (leaf on a navy rounded square).
"""

import re
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw

SRC = Path(sys.argv[1])
DEST = Path(sys.argv[2])
ICONS = Path(sys.argv[3]) if len(sys.argv) > 3 else DEST
DEST.mkdir(parents=True, exist_ok=True)
TMP = Path(__file__).parent / "trace"
TMP.mkdir(parents=True, exist_ok=True)

SCALE = 3          # supersample before thresholding → smoother traced curves
LEAF_HEX = "#89A748"
NAVY_RGB = (5, 39, 78)

base = Image.open(SRC).convert("RGB")
big = base.resize((base.width * SCALE, base.height * SCALE), Image.LANCZOS)
px = big.load()
W, H = big.size


def split(region=None):
    """Return (navy, green) 1-bit layers for the whole image or a (y0, y1) row range."""
    y0, y1 = region if region else (0, H)
    navy = Image.new("1", (W, y1 - y0), 1)
    green = Image.new("1", (W, y1 - y0), 1)
    nv, gr = navy.load(), green.load()
    for y in range(y0, y1):
        for x in range(W):
            r, g, b = px[x, y]
            if min(r, g, b) > 205:
                continue
            if (g - b) > 22 and min(r, g, b) > 30:
                gr[x, y - y0] = 0
            else:
                nv[x, y - y0] = 0
    return navy, green


def ink_bbox(img):
    return img.point(lambda v: 0 if v else 255, "L").getbbox()


def union_crop(layers, pad=2):
    boxes = [b for b in (ink_bbox(l) for l in layers) if b]
    x0 = max(0, min(b[0] for b in boxes) - pad)
    y0 = max(0, min(b[1] for b in boxes) - pad)
    x1 = min(layers[0].width, max(b[2] for b in boxes) + pad)
    y1 = min(layers[0].height, max(b[3] for b in boxes) + pad)
    return [l.crop((x0, y0, x1, y1)) for l in layers]


def trace(img, name):
    pbm, svg = TMP / f"{name}.pbm", TMP / f"{name}.svg"
    img.save(pbm)
    subprocess.run(
        ["potrace", str(pbm), "-s", "-o", str(svg), "--flat",
         "-a", "1.1", "-O", "0.35", "-t", "6", "-u", "10"],
        check=True,
    )
    text = svg.read_text()
    m = re.search(r"<g([^>]*)>(.*?)</g>", text, re.S)
    if not m:
        return "", []
    tm = re.search(r'transform="([^"]+)"', m.group(1))
    return (tm.group(1) if tm else ""), re.findall(r'<path d="([^"]+)"', m.group(2))


def build_svg(navy, green, name):
    navy, green = union_crop([navy, green])
    cw, ch = navy.size
    ntf, npaths = trace(navy, f"{name}-navy")
    gtf, gpaths = trace(green, f"{name}-green")

    def layer(tf, paths, fill):
        if not paths:
            return ""
        d = " ".join(p.strip() for p in paths)
        return f'  <g transform="{tf}" fill="{fill}" fill-rule="evenodd">\n    <path d="{d}"/>\n  </g>\n'

    out = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}" fill="none">\n'
        + layer(ntf, npaths, "currentColor")
        + layer(gtf, gpaths, f"var(--logo-leaf, {LEAF_HEX})")
        + "</svg>\n"
    )
    path = DEST / f"{name}.svg"
    path.write_text(out)
    print(f"{path.name}: {cw}x{ch}, navy {len(npaths)} / leaf {len(gpaths)} paths, "
          f"{path.stat().st_size / 1024:.1f} kB")


# --- full lockup ---
full_navy, full_green = split()
build_svg(full_navy, full_green, "logo")

# --- wordmark only: first horizontal band of ink ---
merged = Image.new("1", (W, H), 1)
mg = merged.load()
fn, fg = full_navy.load(), full_green.load()
for y in range(H):
    for x in range(W):
        if fn[x, y] == 0 or fg[x, y] == 0:
            mg[x, y] = 0

rows, run = [], None
for y in range(H):
    has = any(mg[x, y] == 0 for x in range(0, W, 3))
    if has and run is None:
        run = y
    elif not has and run is not None:
        if y - run > 8 * SCALE:      # ignore hairlines
            rows.append((run, y))
        run = None
if run is not None:
    rows.append((run, H))
print("bands:", rows)

band = rows[0]
mark_navy, mark_green = split(band)
build_svg(mark_navy, mark_green, "mark")

# --- favicon: the leaf sprig on a navy rounded square ---
gb = ink_bbox(mark_green)
if gb:
    leaf = base.crop(tuple(v // SCALE for v in gb)).convert("RGBA")
    lp = leaf.load()
    for y in range(leaf.height):
        for x in range(leaf.width):
            r, g, b, _ = lp[x, y]
            m = min(r, g, b)
            alpha = 0 if m > 235 else min(255, int((255 - m) / 190 * 255))
            lp[x, y] = (167, 209, 106, alpha)

    S, pad = 512, 74
    sc = min((S - 2 * pad) / leaf.width, (S - 2 * pad) / leaf.height)
    leaf = leaf.resize((round(leaf.width * sc), round(leaf.height * sc)), Image.LANCZOS)
    icon = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(icon).rounded_rectangle([0, 0, S - 1, S - 1], radius=112, fill=NAVY_RGB + (255,))
    icon.alpha_composite(leaf, ((S - leaf.width) // 2, (S - leaf.height) // 2))
    icon.save(ICONS / "favicon.png")
    icon.resize((180, 180), Image.LANCZOS).save(ICONS / "apple-touch-icon.png")
    print("favicon.png / apple-touch-icon.png written")

# --- social card: the light lockup centred on navy ---
flat = (DEST / "logo.svg").read_text()
flat = flat.replace("currentColor", "#FFFFFF").replace(f"var(--logo-leaf, {LEAF_HEX})", "#A7D16A")
tmp_svg = TMP / "og.svg"
tmp_svg.write_text(flat)
subprocess.run(
    ["magick", "-background", "none", str(tmp_svg), "-resize", "760x",
     "-gravity", "center", "-background", "#05274E", "-extent", "1200x630",
     str(ICONS / "og.png")],
    check=True,
)
print("og.png written")

# --- inline the traced art for the React components ---
import json as _json
_parts = ["// Generated by scripts/trace-logo.py — do not edit by hand.",
          "// Traced from the source logo artwork in brand/.", ""]
for _name in ("logo", "mark"):
    _svg = (DEST / f"{_name}.svg").read_text().strip()
    _parts.append(f"export const {_name}Svg = {_json.dumps(_svg)}\n")
(Path("components/brand-art.ts")).write_text("\n".join(_parts))
print("components/brand-art.ts written")
