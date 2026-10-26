"""FUSIONIFY UI · rapikan file .docx hasil docx-js supaya lolos validasi Word.

  python3 scripts/dokumen/rapikan_docx.py dokumen/office/*.docx

- Nomor <wp:docPr id> dibuat unik di seluruh dokumen (docx-js memberi semua gambar id 1,
  Word bisa menganggap file rusak).
- fontKey huruf tertanam ditulis huruf besar sesuai skema OOXML.
"""
import re, sys, zipfile, shutil, tempfile, os

def rapikan(path):
    tmp = tempfile.mktemp(suffix=".docx")
    nomor = [0]
    def ganti_id(m):
        nomor[0] += 1
        return f'{m.group(1)}{nomor[0]}"'
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in sorted(zin.infolist(), key=lambda i: (i.filename != "[Content_Types].xml", i.filename)):
            data = zin.read(item.filename)
            if item.filename.startswith("word/") and item.filename.endswith(".xml"):
                teks = data.decode("utf-8")
                teks = re.sub(r'(<wp:docPr id=")\d+"', ganti_id, teks)
                teks = re.sub(r'(w:fontKey=")(\{[0-9a-fA-F-]+\})"', lambda m: m.group(1) + m.group(2).upper() + '"', teks)
                data = teks.encode("utf-8")
            zout.writestr(item, data)
    shutil.move(tmp, path)
    print(f"✓ dirapikan {path} ({nomor[0]} gambar)")

for p in sys.argv[1:]:
    rapikan(p)
