#!/usr/bin/env python3
"""FUSIONIFY UI · ubah PNG pose maskot baru jadi WebP seperti pose lama.

Taruh PNG berlatar transparan di mascot/source/ dengan nama pose (mis. welcome.png, loading.png),
lalu jalankan:  python3 scripts/mascot-import.py
Hasil: mascot/<nama>.webp (tinggi 720px) dan mascot/<nama>-420.webp (tinggi 420px).
Butuh Pillow:  pip install pillow
"""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent / "mascot"
src = root / "source"
files = sorted(src.glob("*.png")) if src.exists() else []
if not files:
    raise SystemExit(f"Tidak ada PNG di {src}")
for f in files:
    im = Image.open(f).convert("RGBA")
    bbox = im.getbbox()  # buang ruang kosong transparan di sekeliling
    if bbox:
        im = im.crop(bbox)
    for h, suffix in ((720, ""), (420, "-420")):
        w = round(im.width * h / im.height)
        out = root / f"{f.stem}{suffix}.webp"
        im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=90, method=6)
        print(f"{out.name}  {w}x{h}")
