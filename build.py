"""Собирает один автономный HTML из src/. Запуск: python3 build.py"""
import re, pathlib
root = pathlib.Path(__file__).parent
src = root / "src"
css = (src / "style.css").read_text(encoding="utf-8")
data = (src / "data.js").read_text(encoding="utf-8")
app = (src / "app.js").read_text(encoding="utf-8")
tg = (src / "tg-symbol.svg").read_text(encoding="utf-8")
import base64
img = lambda n: "data:image/jpeg;base64," + base64.b64encode((src / "img" / n).read_bytes()).decode()
IMGJS = "const IMG = {night:'" + img("medina-night.jpg") + "', day:'" + img("medina-day.jpg") + "'};"
import json
man = json.loads((src / "audio" / "manifest.json").read_text(encoding="utf-8"))
AUDJS = "const AUD = " + json.dumps({k: "data:audio/mpeg;base64," + base64.b64encode((src / "audio" / v).read_bytes()).decode() for k, v in man.items()}, ensure_ascii=False) + ";"
ver = re.search(r"const VERSION = (\d+);", data).group(1)
body = f'''<style>{css}</style>
<svg width="0" height="0" style="position:absolute" aria-hidden="true">{tg}</svg>
<div id="root"></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<noscript><p style="padding:1rem">FUSHA needs JavaScript.</p></noscript>
<script>const PWA = __PWA__;
{IMGJS}
{AUDJS}
{data}
{app}</script>
'''
def make(pwa):
    head_extra = '''<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="FUSHA">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
''' if pwa else ""
    return f'''<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#0c3b30">
<title>FUSHA</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230c3b30'/%3E%3Ccircle cx='32' cy='32' r='18' fill='%23c1932f'/%3E%3C/svg%3E">
{head_extra}</head>
<body>
{body.replace("__PWA__", "true" if pwa else "false")}</body>
</html>
'''
(root / "versions").mkdir(exist_ok=True)
(root / "versions" / f"Fusha_App_Prototype_v{ver}.html").write_text(make(False), encoding="utf-8")
(root / "index.html").write_text(make(True), encoding="utf-8")
(root / "version.json").write_text('{"version":' + ver + '}\n')
(root / "sw.js").write_text((root / "sw.template.js").read_text(encoding="utf-8").replace("__VER__", ver), encoding="utf-8")
print("built v" + ver)
