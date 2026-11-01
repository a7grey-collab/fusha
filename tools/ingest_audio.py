"""Принимает ZIP из FUSHA Voice Studio, конвертирует в mp3 (моно, 48 кбит/с),
выравнивает громкость, обрезает тишину и кладёт в src/audio/ вместо синтеза.
Запуск: python3 tools/ingest_audio.py Fusha_Voice_Clips_114of114.zip"""
import sys, zipfile, subprocess, pathlib, tempfile, json
root = pathlib.Path(__file__).resolve().parent.parent
out = root / "src" / "audio"
man = json.loads((out / "manifest.json").read_text(encoding="utf-8"))
known = {v[:-4] for v in man.values()}
z = zipfile.ZipFile(sys.argv[1]); n = 0
with tempfile.TemporaryDirectory() as td:
    for info in z.infolist():
        stem = pathlib.Path(info.filename).stem
        if stem not in known: continue
        src = pathlib.Path(td) / info.filename; src.write_bytes(z.read(info))
        trim = "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse"
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(src), "-ac", "1", "-ar", "24000",
                        "-af", trim + ",loudnorm=I=-18:TP=-2:LRA=7", "-b:a", "48k", str(out / (stem + ".mp3"))], check=True)
        n += 1
print("заменено клипов:", n, "из", len(known))
