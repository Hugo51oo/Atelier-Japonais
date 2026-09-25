#!/usr/bin/env python3
"""Assemble l'app en un seul fichier.

src/ -> index.html            page autonome (GitHub Pages, ouverture locale)
     -> atelier-japonais.html même page sans <html>/<head>, pour l'artifact Claude
"""
from pathlib import Path

root = Path(__file__).parent
src = root / "src"

page = src.joinpath("shell.html").read_text(encoding="utf-8")
page = page.replace("/*CONTENT*/", src.joinpath("content.js").read_text(encoding="utf-8"))
page = page.replace("/*STROKES*/", src.joinpath("strokes.json").read_text(encoding="utf-8"))
page = page.replace("/*APP*/", src.joinpath("app.js").read_text(encoding="utf-8"))

HEAD = """<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>
:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0}img{max-width:100%}[hidden]{display:none!important}
</style>
</head>
<body>
"""

for name, text in (("index.html", HEAD + page + "\n</body>\n</html>\n"),
                   ("atelier-japonais.html", page)):
    out = root / name
    out.write_text(text, encoding="utf-8")
    print(f"{name} — {out.stat().st_size // 1024} Ko")
