"""Собирает один автономный HTML из src/. Запуск: python3 build.py"""
import re, pathlib
root = pathlib.Path(__file__).parent
src = root / "src"
css = (src / "style.css").read_text(encoding="utf-8")
data = (src / "data.js").read_text(encoding="utf-8")
app = (src / "app.js").read_text(encoding="utf-8")
tg = (src / "tg-symbol.svg").read_text(encoding="utf-8")
ver = re.search(r"const VERSION = (\d+);", data).group(1)
body = f'''<style>{css}</style>
<svg width="0" height="0" style="position:absolute" aria-hidden="true">{tg}</svg>
<div id="root"></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<noscript><p style="padding:1rem">FUSHA needs JavaScript.</p></noscript>
<script>{data}
{app}</script>
'''
page = f'''<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#0c3b30">
<title>FUSHA</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230c3b30'/%3E%3Ccircle cx='32' cy='32' r='18' fill='%23c1932f'/%3E%3C/svg%3E">
</head>
<body>
{body}</body>
</html>
'''
(root / "versions").mkdir(exist_ok=True)
(root / "versions" / f"Fusha_App_Prototype_v{ver}.html").write_text(page, encoding="utf-8")
(root / "index.html").write_text(page, encoding="utf-8")
print("built v" + ver)
