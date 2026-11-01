(function () {
'use strict';
const KEY = 'fusha-app', LATEST = 'fusha-latest';
const DEF = {onboarded:false, lang:'ru', theme:'auto', goal:'talk', level:'zero', daily:20, xp:0, xpDay:{d:'', n:0}, streak:{n:0, last:''}, done:{}, srs:{}, premium:false, region:'gcc', unlockAll:false, tutorDay:{d:'', n:0}, notes:'', seen:0, installed:false};
let st = load();
function load() { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY) || 'null') || {}); } catch (e) { return Object.assign({}, DEF); } }
function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
try { const lv = +localStorage.getItem(LATEST) || 0; if (lv < VERSION) localStorage.setItem(LATEST, String(VERSION)); } catch (e) {}

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const pad = n => String(n).padStart(2, '0');
const dstr = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => dstr(new Date());
const yest = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dstr(d); };
const xpToday = () => st.xpDay.d === today() ? st.xpDay.n : 0;
const streakNow = () => (st.streak.last === today() || st.streak.last === yest()) ? st.streak.n : 0;
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
function t(k, p) { let s = (S[st.lang] && S[st.lang][k]) || S.en[k] || S.ru[k] || k; if (p) for (const x in p) s = s.replace('{' + x + '}', '<bdi>' + p[x] + '</bdi>'); return s; }
function tp(k, p) { let s = (S[st.lang] && S[st.lang][k]) || S.en[k] || S.ru[k] || k; if (p) for (const x in p) s = s.replace('{' + x + '}', p[x]); return s; }
const ar = (s, c) => '<span class="ar ' + (c || '') + '" lang="ar" dir="rtl">' + esc(s) + '</span>';
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (a, n) => shuffle(a).slice(0, n);
const L2 = () => st.lang === 'ru' ? 'ru' : 'en';
const sndOf = it => it.snd[L2()], glOf = it => it.gl[L2()];
const labelOf = it => it.type === 'L' ? it.name : glOf(it);
const norm = s => s.replace(/[ً-ٰٟـ]/g, '').replace(/[إأآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/[،,؟?!.؛:]/g, ' ').replace(/\s+/g, ' ').trim();
const LET = Object.values(ITEMS).filter(i => i.type === 'L'), WRD = Object.values(ITEMS).filter(i => i.type === 'W');
const IC = {
 fire:'<svg viewBox="0 0 24 24"><path d="M12 2c1 4 5 5.500 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z"/></svg>',
 bolt:'<svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
 path:'<svg viewBox="0 0 24 24"><path d="M4 20V10l8-6 8 6v10h-5v-6H9v6z"/></svg>',
 rev:'<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5"/></svg>',
 chat:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
 me:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 15-5 16 0"/></svg>',
 x:'<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19"/></svg>',
 check:'<svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>',
 lock:'<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
 spk:'<svg viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6L8 10zM16 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/></svg>',
 mic:'<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
 stop:'<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>'
};

/* ---------- state ---------- */
let deferred = null, newVer = 0;
let ls = null, tut = null, sheet = null, banner = null, ob = {step:0}, toastT;
let TTS = false;
function initTTS() { if (!('speechSynthesis' in window)) return; const c = () => { TTS = speechSynthesis.getVoices().some(v => /^ar/i.test(v.lang)); }; c(); try { speechSynthesis.onvoiceschanged = c; } catch (e) {} }
function say(text) {
  if (!TTS) { toast(tp('tts.off')); return; }
  try { const u = new SpeechSynthesisUtterance(text); u.lang = 'ar-SA'; const v = speechSynthesis.getVoices().find(v => /^ar/i.test(v.lang)); if (v) u.voice = v; u.rate = .85; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {}
}
function toast(m) { const e = $('#toast'); e.textContent = m; e.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove('on'), 2400); }
function go(h) { if (location.hash === '#/' + h) render(); else location.hash = '#/' + h; }
const route = () => (location.hash.replace(/^#\/?/, '') || 'home');

/* ---------- progress logic ---------- */
function lockOf(l) {
  const i = ALL_LESSONS.indexOf(l);
  if (l.unit.premium && !st.premium) return 'plus';
  if (!st.unlockAll && i > 0 && !st.done[ALL_LESSONS[i - 1].id]) return 'seq';
  return null;
}
function nextLesson() { return ALL_LESSONS.find(l => !st.done[l.id] && !lockOf(l)) || null; }
function learnedIds() { return Object.keys(st.srs); }
function dueIds() { const n = Date.now(); return learnedIds().filter(i => st.srs[i].due <= n); }
function addXp(n) {
  st.xp += n;
  if (st.xpDay.d !== today()) st.xpDay = {d:today(), n:0};
  st.xpDay.n += n;
  if (st.streak.last !== today()) { st.streak.n = (st.streak.last === yest()) ? st.streak.n + 1 : 1; st.streak.last = today(); }
}
const INT = [0, 1, 3, 7, 14];

/* ---------- exercises ---------- */
function opts(correct, pool) {
  const d = sample([...new Set(pool.filter(x => x !== correct))], 3);
  return shuffle([{l:correct, ok:true}, ...d.map(l => ({l, ok:false}))]);
}
function mk(k, it, extra) {
  const e = Object.assign({k, it}, extra || {});
  if (k === 'sound') e.o = opts(sndOf(it), LET.map(sndOf));
  if (k === 'letter') { e.o = opts(it.ar, LET.map(x => x.ar)); e.arOpt = true; }
  if (k === 'tr') e.o = opts(glOf(it), WRD.map(glOf));
  if (k === 'pickar' || k === 'listen') { e.o = opts(it.ar, WRD.map(x => x.ar)); e.arOpt = true; }
  if (k === 'order') e.tokens = shuffle(it.ar.split(' ').map((w, i) => ({w, i})));
  return e;
}
function mkMatch(its) {
  return {k:'match', items:its, left:shuffle(its.map(i => i.id)), right:shuffle(its.map(i => i.id))};
}
function buildQueue(ids) {
  const its = ids.map(i => ITEMS[i]), out = [];
  if (its[0].type === 'L') {
    shuffle(its).forEach(i => out.push(mk('sound', i)));
    out.push(mkMatch(its));
    shuffle(its).forEach(i => out.push(mk('letter', i)));
    const h = its.find(i => i.hard); if (h) out.push(mk('speak', h));
  } else {
    shuffle(its).forEach(i => out.push(mk('tr', i)));
    if (its.length >= 3) out.push(mkMatch(its.slice(0, 4)));
    shuffle(its).forEach(i => out.push(mk('pickar', i)));
    if (TTS) sample(its, 2).forEach(i => out.push(mk('listen', i)));
    its.filter(i => i.ar.includes(' ')).slice(0, 2).forEach(i => out.push(mk('order', i)));
    sample(its.filter(i => i.ar.length <= 10), 2).forEach(i => out.push(mk('type', i)));
    out.push(mk('speak', its[0]));
  }
  return out;
}
function buildReview(ids) {
  return ids.map(id => { const it = ITEMS[id]; return it.type === 'L' ? mk('sound', it) : mk(Math.random() < .5 ? 'tr' : 'pickar', it); });
}
function startLesson(l) {
  cleanupRec();
  ls = {kind:'lesson', lesson:l, queue:buildQueue(l.items), i:0, first:0, total:0, itemRes:{}, sel:null, ans:null, typed:'', pick:[], m:null, done:false};
  go('lesson');
}
function startReview(all) {
  let ids = all ? learnedIds() : dueIds();
  if (!ids.length) return;
  ids = sample(ids, 8);
  cleanupRec();
  ls = {kind:'review', ids, queue:buildReview(ids), i:0, first:0, total:0, itemRes:{}, sel:null, ans:null, typed:'', pick:[], m:null, done:false};
  go('lesson');
}
function curEx() { return ls.queue[ls.i]; }
function resetEx() { ls.sel = null; ls.ans = null; ls.typed = ''; ls.pick = []; ls.m = null; ls.spoken = false; cleanupRec(); }
function grade(ok, correctText) {
  const ex = curEx();
  ls.ans = {ok, correct:correctText};
  if (!ex.retry && ex.k !== 'speak') {
    ls.total++; if (ok) ls.first++;
    const ids = ex.k === 'match' ? ex.items.map(i => i.id) : [ex.it.id];
    ids.forEach(id => { if (ls.itemRes[id] === undefined) ls.itemRes[id] = ok; else if (!ok) ls.itemRes[id] = false; });
  }
  if (!ok && !ex.retry && ex.k !== 'match') ls.queue.push(Object.assign({}, ex, {retry:true, o:ex.o && shuffle(ex.o), tokens:ex.tokens && shuffle(ex.tokens)}));
  render();
}
function check() {
  const ex = curEx();
  if (ex.o) {
    if (ls.sel === null) return;
    const c = ex.o.find(o => o.ok);
    return grade(ex.o[ls.sel].ok, c.l);
  }
  if (ex.k === 'order') {
    const got = ls.pick.map(i => ex.tokens[i].w).join(' ');
    return grade(norm(got) === norm(ex.it.ar), ex.it.ar);
  }
  if (ex.k === 'type') {
    if (!ls.typed.trim()) return;
    return grade(norm(ls.typed) === norm(ex.it.ar), ex.it.ar);
  }
}
function next() {
  if (ls.i + 1 >= ls.queue.length) return finish();
  ls.i++; resetEx(); render();
}
function finish() {
  const acc = ls.total ? Math.round(ls.first * 100 / ls.total) : 100;
  let xp, learned = 0;
  if (ls.kind === 'lesson') {
    xp = 10 + ls.first * 2;
    ls.lesson.items.forEach(id => { if (!st.srs[id]) { st.srs[id] = {box:1, due:Date.now() + 864e5}; learned++; } });
    Object.keys(ls.itemRes).forEach(id => { if (ls.itemRes[id] === false && st.srs[id]) st.srs[id] = {box:1, due:Date.now()}; });
    st.done[ls.lesson.id] = {acc, n:((st.done[ls.lesson.id] || {}).n || 0) + 1};
  } else {
    xp = 5 + ls.first * 2;
    Object.keys(ls.itemRes).forEach(id => {
      const s = st.srs[id] || {box:1};
      if (ls.itemRes[id]) { const b = Math.min(s.box + 1, 4); st.srs[id] = {box:b, due:Date.now() + INT[b] * 864e5}; }
      else st.srs[id] = {box:1, due:Date.now()};
    });
  }
  addXp(xp); save();
  ls.done = true; ls.result = {xp, acc, learned, streak:streakNow()};
  render();
}

/* ---------- recorder ---------- */
const rc = {state:'idle', url:null, dur:0, peak:0};
function cleanupRec() {
  try { if (rc.mr && rc.mr.state === 'recording') { rc.mr.onstop = null; rc.mr.stop(); } } catch (e) {}
  try { if (rc.stream) rc.stream.getTracks().forEach(x => x.stop()); } catch (e) {}
  try { cancelAnimationFrame(rc.raf); if (rc.ac) rc.ac.close(); } catch (e) {}
  if (rc.url) { try { URL.revokeObjectURL(rc.url); } catch (e) {} }
  rc.state = 'idle'; rc.url = null; rc.mr = null; rc.stream = null; rc.ac = null;
}
async function recStart() {
  cleanupRec();
  try {
    if (!navigator.mediaDevices || !window.MediaRecorder) throw new Error('nomic');
    const stream = await navigator.mediaDevices.getUserMedia({audio:true});
    rc.stream = stream; rc.chunks = []; rc.peak = 0;
    const mr = new MediaRecorder(stream); rc.mr = mr;
    mr.ondataavailable = e => { if (e.data && e.data.size) rc.chunks.push(e.data); };
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)(); rc.ac = ac;
      const an = ac.createAnalyser(); an.fftSize = 512; ac.createMediaStreamSource(stream).connect(an);
      const buf = new Uint8Array(an.fftSize);
      const tick = () => { an.getByteTimeDomainData(buf); let m = 0; for (let i = 0; i < buf.length; i++) m = Math.max(m, Math.abs(buf[i] - 128)); rc.peak = Math.max(rc.peak, m / 128); rc.raf = requestAnimationFrame(tick); };
      tick();
    } catch (e) {}
    mr.onstop = () => {
      rc.dur = (Date.now() - rc.t0) / 1000;
      rc.url = URL.createObjectURL(new Blob(rc.chunks, {type:mr.mimeType || 'audio/webm'}));
      rc.state = 'done';
      try { cancelAnimationFrame(rc.raf); stream.getTracks().forEach(x => x.stop()); rc.ac && rc.ac.close(); } catch (e) {}
      updateRec();
    };
    rc.t0 = Date.now(); mr.start(); rc.state = 'rec'; updateRec();
  } catch (e) { rc.state = 'err'; updateRec(); }
}
function recStop() { try { if (rc.mr && rc.mr.state === 'recording') rc.mr.stop(); } catch (e) {} }
function recHTML(mode) {
  mode = mode || (route() === 'reading' ? 'read' : '');
  if (rc.state === 'err') return '<p class="small" style="color:var(--bad)">' + esc(tp('mic.err')) + '</p><button class="btn ghost sm" data-act="rec">' + t('mic.again') + '</button>';
  if (rc.state === 'rec') return '<button class="recb on" data-act="recstop" aria-label="' + esc(tp('mic.stop')) + '">' + IC.stop + '</button><b>' + t('mic.stop') + '</b>';
  if (rc.state === 'done') {
    const lv = Math.min(100, Math.round(rc.peak * 100));
    if (mode === 'read') return '<audio controls src="' + rc.url + '"></audio><p class="small muted">' + t('mic.len', {s:rc.dur.toFixed(1)}) + ' · ' + t('mic.level', {p:lv}) + '</p>' +
      '<div class="mock"><b>' + t('read.sample') + '</b><p class="small">' + t('read.madd') + '</p><p class="small muted">' + t('mic.mock') + '</p></div><button class="btn gold block" data-act="sendteacher">' + t('read.teacher') + '</button><button class="btn ghost sm" data-act="rec">' + t('mic.again') + '</button>';
    return '<audio controls src="' + rc.url + '"></audio><p class="small muted">' + t('mic.len', {s:rc.dur.toFixed(1)}) + ' · ' + t('mic.level', {p:lv}) + '</p>' +
      '<div class="mock"><b>' + t('mic.overall') + ': <bdi>82%</bdi></b><div class="meter"><i style="width:82%"></i></div><p class="small">' + t('mic.hint') + '</p><p class="small muted">' + t('mic.mock') + '</p></div>' +
      '<button class="btn ghost sm" data-act="rec">' + t('mic.again') + '</button>';
  }
  return '<button class="recb" data-act="rec" aria-label="' + esc(tp('mic.rec')) + '">' + IC.mic + '</button><b>' + t('mic.rec') + '</b>';
}
function updateRec() { const b = $('#recbox'); if (b) b.innerHTML = recHTML(); }

/* ---------- views ---------- */
function authorBlock() { return '<div class="author"><span class="small muted">' + t('author.label') + '</span><b>' + esc(AUTHOR[st.lang]) + '</b>' + (st.lang !== 'ar' ? ar(AUTHOR.ar, 'acal') : '') + '</div>'; }
function medina() {
  const min = x => '<g transform="translate(' + x + ' 0)"><rect x="-4" y="34" width="8" height="70" fill="#e4dcc0"/><rect x="-4" y="34" width="3" height="70" fill="#cfc59f"/><rect x="-7" y="46" width="14" height="4" fill="#bfb283"/><rect x="-7" y="66" width="14" height="4" fill="#bfb283"/><path d="M-5 34 L0 18 L5 34 Z" fill="#2a9d73"/><circle cx="0" cy="16" r="2" fill="#e6c35c"/></g>';
  const palm = x => '<g transform="translate(' + x + ' 0)"><path d="M0 104 C1 92 -1 84 0 76" stroke="#5b4a2a" stroke-width="3" fill="none"/><path d="M0 76 q-14 -2 -20 8 M0 76 q-10 -9 -18 -6 M0 76 q14 -2 20 8 M0 76 q10 -9 18 -6 M0 76 q0 -12 0 -14" stroke="#2a9d73" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>';
  let w = '';
  for (let i = 0; i < 9; i++) w += '<path d="M' + (123 + i * 14) + ' 104 v-9 a3 3 0 0 1 6 0 v9 z" fill="#6b5f3a"/>';
  let s = '';
  [[22,12],[60,22],[96,9],[150,16],[210,10],[262,20],[300,10],[338,24],[330,52],[30,50]].forEach(q => { s += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="1.1" fill="#f6ecd2" opacity=".8"/>'; });
  return '<svg class="medina" viewBox="0 0 360 120" role="img" aria-label="Al-Madinah, Prophet’s Mosque skyline"><defs><linearGradient id="mdsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a2f26"/><stop offset=".65" stop-color="#1b5a47"/><stop offset="1" stop-color="#c1932f"/></linearGradient></defs>'
    + '<rect width="360" height="120" fill="url(#mdsky)"/>' + s + '<circle cx="300" cy="30" r="9" fill="#f6ecd2"/><circle cx="304" cy="27" r="8" fill="#14463a"/>'
    + '<rect y="104" width="360" height="16" fill="#07261e"/>' + palm(40) + palm(322) + palm(62)
    + '<rect x="112" y="82" width="136" height="22" fill="#e4dcc0"/><rect x="112" y="82" width="136" height="4" fill="#bfb283"/>' + w
    + '<path d="M129 82 a10 10 0 0 1 20 0 Z M211 82 a10 10 0 0 1 20 0 Z" fill="#cfd8cf"/>'
    + '<rect x="162" y="76" width="36" height="8" fill="#e4dcc0"/><path d="M160 76 C160 58 170 48 180 46 C190 48 200 58 200 76 Z" fill="#2a9d73"/><path d="M180 46 C170 48 160 58 160 76 L170 76 C170 60 174 52 180 46 Z" fill="#1f7a5a"/><line x1="180" y1="46" x2="180" y2="36" stroke="#e6c35c" stroke-width="2"/><circle cx="180" cy="34" r="3" fill="#e6c35c"/>'
    + min(96) + min(122) + min(238) + min(264) + '</svg>';
}
function tracksView() {
  const stl = {open:'st.open', demo:'st.demo', soon:'st.soon'};
  let h = '<h1 class="h1">' + t('tracks.title') + '</h1><p class="lead">' + t('tracks.lead') + '</p><div class="opts">';
  TRACKS.forEach((k, i) => { h += '<button class="opt tcard" data-act="track" data-id="' + k.id + '"><span class="uic">' + (i + 1) + '</span><span class="tx"><b>' + esc(k.n[st.lang]) + '</b><span class="small muted">' + esc(k.d[st.lang]) + '</span></span><span class="tag ' + k.st + '">' + t(stl[k.st]) + '</span></button>'; });
  h += '</div><div class="note"><p class="small">' + t('tracks.ijaza') + '</p></div>';
  return h;
}
function readingView() {
  return '<h1 class="h1">' + t('read.title') + '</h1><p class="muted">' + t('read.how') + '</p><div class="card"><p class="small muted">' + t('read.sub') + '</p><div class="big w"><span class="ar" style="font-size:2rem;line-height:1.9">' + esc(BASMALA) + '</span></div><p class="small muted">' + t('read.src') + '</p><div class="rec" id="recbox">' + recHTML('read') + '</div></div>';
}
function goalRing() {
  const p = Math.min(1, xpToday() / st.daily), c = 2 * Math.PI * 32;
  return '<div class="ring"><svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="32" fill="none" stroke="var(--soft)" stroke-width="9"/><circle cx="38" cy="38" r="32" fill="none" stroke="var(--gold)" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - p)).toFixed(1) + '"/></svg><b>' + Math.round(p * 100) + '%</b></div>';
}
function topBar() {
  return '<header class="top"><span class="logo"><button class="brand" data-act="nav" data-to="home" aria-label="FUSHA · ' + esc(tp('tab.path')) + '">FUSHA</button>' + VTAG + '</span><span class="chip fire" title="streak">' + IC.fire + '<bdi>' + streakNow() + '</bdi></span><span class="chip bolt" title="XP">' + IC.bolt + '<bdi>' + st.xp + '</bdi></span></header>';
}
function bannerHTML() {
  if (banner === 'new') return '<div class="banner" role="status"><b>' + t('upd.newv', {v:newVer || VERSION + 1}) + '</b><div class="row"><button class="btn sm" data-act="reload">' + t('upd.reload') + '</button></div></div>';
  if (st.onboarded && st.seen > 0 && st.seen < VERSION) {
    const c = CHANGELOG.find(x => x.v === VERSION), items = (c[st.lang] || c.en).map(x => '<li>' + esc(x) + '</li>').join('');
    return '<div class="banner" role="status"><b>' + t('upd.title', {v:VERSION}) + '</b><ul>' + items + '</ul><div class="row"><button class="btn sm" data-act="updclose">' + t('upd.close') + '</button></div></div>';
  }
  return '';
}
function tabs(cur) {
  const T = [['home', 'path', 'tab.path'], ['review', 'rev', 'tab.review'], ['tutor', 'chat', 'tab.tutor'], ['me', 'me', 'tab.me']];
  return '<nav class="tabs" aria-label="Menu">' + T.map(x => '<button data-act="nav" data-to="' + x[0] + '"' + (cur === x[0] ? ' aria-current="page"' : '') + '>' + IC[x[1]] + '<span>' + t(x[2]) + '</span></button>').join('') + '</nav>';
}
function homeView() {
  const nl = nextLesson();
  let h = '<div class="mdwrap">' + medina() + '</div>' + installCard();
  h += '<button class="card tbtn" data-act="nav" data-to="tracks"><b>' + t('tracks.title') + '</b><span class="small muted">' + t('tracks.lead') + '</span></button>';
  if (st.level !== 'zero') h += '<p class="small muted">' + t('me.reco', {n:2}) + '</p>';
  h += '<div class="card goal">' + goalRing() + '<div><h2 class="h2">' + t('home.goal') + '</h2><p class="muted">' + t('home.goalval', {a:xpToday(), b:st.daily}) + '</p></div></div>';
  if (nl) h += '<button class="btn gold block" data-act="lesson" data-id="' + nl.id + '">' + t('home.continue') + ' · ' + esc(nl.unit.t[st.lang]) + ' ' + nl.n + '</button>';
  UNITS.forEach(u => {
    h += '<section class="unit"><h2 class="h2"><span class="uic ar">' + u.ic + '</span><span>' + esc(u.t[st.lang]) + '</span>' + (u.premium ? '<span class="plus">Plus</span>' : '') + '</h2><div class="path">';
    u.lessons.forEach(l => {
      const lock = lockOf(l), done = st.done[l.id], isNext = nl && nl.id === l.id;
      const glyphs = l.items.map(i => ITEMS[i].ar).slice(0, 5).map(g => ar(g)).join(' ');
      const cls = 'node' + (done ? ' done' : '') + (isNext ? ' next' : '') + (lock ? ' lock' : '');
      const nb = done ? IC.check : lock ? IC.lock : '<bdi>' + l.n + '</bdi>';
      h += '<button class="' + cls + '" data-act="lesson" data-id="' + l.id + '"><span class="nb">' + nb + '</span><span class="tx"><b>' + t('home.lesson', {n:l.n}) + '</b><span class="glyphs">' + glyphs + '</span></span></button>';
    });
    h += '</div></section>';
  });
  return h;
}
function reviewView() {
  const due = dueIds().length, learned = learnedIds().length;
  let h = '<h1 class="h1">' + t('rev.title') + '</h1>';
  if (!learned) return h + '<div class="card"><p>' + t('rev.none') + '</p></div>';
  h += '<div class="stats"><div class="stat"><b>' + due + '</b><span>' + tp('rev.due', {n:''}).replace(/:\s*$/, '') + '</span></div><div class="stat"><b>' + learned + '</b><span>' + tp('rev.learned', {n:''}).replace(/:\s*$/, '') + '</span></div></div>';
  h += '<p class="muted">' + t('rev.why') + '</p>';
  h += due ? '<button class="btn gold block" data-act="rev">' + t('rev.start') + '</button>' : '';
  h += '<button class="btn ghost block" data-act="revall">' + t('rev.all') + '</button>';
  return h;
}
function tutorLeft() { const used = st.tutorDay.d === today() ? st.tutorDay.n : 0; return Math.max(0, 5 - used); }
function tutorView() {
  let h = '<h1 class="h1">' + t('tutor.title') + '</h1><p class="small muted">' + t('tutor.demo') + '</p>';
  if (!st.premium) h += '<p class="small">' + t('tutor.left', {n:tutorLeft(), m:5}) + '</p>';
  if (!tut) {
    h += '<h2 class="h2">' + t('tutor.pick') + '</h2><div class="opts"><button class="opt" data-act="scen" data-id="meet">👋 ' + t('sc.meet') + '</button><button class="opt" data-act="scen" data-id="cafe">☕ ' + t('sc.cafe') + '</button></div>';
    return h;
  }
  h += '<div class="chat" id="chat">' + tut.msgs.map(m => {
    if (m.r === 'f') return '<div class="msg f">' + m.h + '</div>';
    if (m.r === 'u') return '<div class="msg u">' + ar(m.ar) + '</div>';
    return '<div class="msg t">' + ar(m.say.ar) + '<span class="tr">' + esc(m.say[L2()]) + '</span><button class="btn ghost sm" style="margin-top:.4rem" data-act="say" data-t="' + esc(m.say.ar) + '">' + IC.spk.replace('<svg', '<svg width="18" height="18" style="stroke:currentColor;fill:none;stroke-width:2"') + ' ' + t('tts.play') + '</button></div>';
  }).join('') + '</div>';
  if (tut.done) h += '<div class="card"><b>' + t('tutor.end') + '</b><button class="btn gold block" data-act="scenreset">' + t('tutor.again') + '</button></div>';
  else {
    const step = SCEN[tut.sc].steps[tut.step];
    h += '<p class="small muted">' + t('tutor.tap') + '</p><div class="chips">' + step.chips.map((c, i) => '<button class="cbtn" data-act="chip" data-i="' + i + '">' + esc(c) + '</button>').join('') + '</div>';
    h += '<form class="send" data-form="tutor"><input id="tin" lang="ar" dir="rtl" autocomplete="off" placeholder="' + esc(tp('tutor.ph')) + '" aria-label="' + esc(tp('tutor.ph')) + '"><button class="btn" type="submit">' + t('tutor.send') + '</button></form>';
  }
  return h;
}
function tutorSend(text) {
  text = (text || '').trim(); if (!text || !tut || tut.done) return;
  if (!st.premium && tutorLeft() <= 0) { sheet = 'tutor'; render(); return; }
  if (st.tutorDay.d !== today()) st.tutorDay = {d:today(), n:0};
  st.tutorDay.n++; save();
  tut.msgs.push({r:'u', ar:text});
  const sc = SCEN[tut.sc], step = sc.steps[tut.step];
  if (step.ok(norm(text))) {
    tut.msgs.push({r:'f', h:'✓ ' + esc(tp('tutor.good'))});
    tut.step++;
    if (tut.step < sc.steps.length) tut.msgs.push({r:'t', say:sc.steps[tut.step].say});
    else { if (sc.close) tut.msgs.push({r:'t', say:sc.close}); tut.done = true; }
  } else {
    tut.msgs.push({r:'f', h:esc(tp('tutor.try')) + ' ' + ar(step.chips[0])});
  }
  render();
}
function payView() {
  const r = REGIONS.find(x => x[0] === st.region) || REGIONS[0];
  let h = '<h1 class="h1">' + t('pay.title') + '</h1><p class="small muted">' + t('pay.demo') + ' ' + t('pay.illus') + '</p>';
  h += '<h2 class="h2">' + t('pay.region') + '</h2><div class="opts">' + REGIONS.map(x => '<button class="opt" data-act="region" data-r="' + x[0] + '" aria-pressed="' + (x[0] === st.region) + '">' + t('reg.' + x[0]) + '<span style="margin-inline-start:auto;direction:ltr">$' + x[1] + '</span></button>').join('') + '</div>';
  h += '<div class="card"><h2 class="h2">' + t('plan.free') + '</h2><ul class="feat"><li>' + t('free.1') + '</li><li>' + t('free.2') + '</li><li>' + t('free.3') + '</li></ul></div>';
  h += '<div class="card" style="border-color:var(--gold)"><h2 class="h2">' + t('plan.plus') + '</h2><p class="price"><span dir="ltr">$' + r[1] + '</span> <small>' + t('per') + '</small></p><ul class="feat"><li>' + t('plus.1') + '</li><li>' + t('plus.2') + '</li><li>' + t('plus.3') + '</li><li>' + t('plus.4') + '</li></ul>';
  h += st.premium ? '<p><b>' + t('pay.active') + '</b></p><button class="btn ghost block" data-act="cancelplus">' + t('pay.cancel') + '</button>' : '<button class="btn gold block" data-act="buy">' + t('pay.buy') + '</button>';
  h += '</div><div class="card"><h2 class="h2">' + t('pay.soon') + '</h2><div class="soon"><div><b>Live</b><span>' + t('soon.live') + '</span></div><div><b>Quranic Arabic</b><span>' + t('soon.q') + '</span></div><div><b>Certification</b><span>' + t('soon.c') + '</span></div><div><b>Kids</b><span>' + t('soon.k') + '</span></div></div></div>';
  return h;
}
function segHTML(act, cur, list) { return '<div class="seg">' + list.map(x => '<button data-act="' + act + '" data-v="' + x[0] + '" aria-pressed="' + (String(cur) === String(x[0])) + '"' + (x[2] ? ' lang="' + x[2] + '"' : '') + '>' + x[1] + '</button>').join('') + '</div>'; }
const LANGS = [['ru', 'Русский', 'ru'], ['en', 'English', 'en'], ['ar', 'العربية', 'ar']];
function meView() {
  const lessons = Object.keys(st.done).length;
  let h = '<h1 class="h1">' + t('me.title') + '</h1>';
  h += '<div class="stats"><div class="stat"><b>' + st.xp + '</b><span>' + t('me.xp') + '</span></div><div class="stat"><b>' + streakNow() + '</b><span>' + t('me.streak') + '</span></div><div class="stat"><b>' + lessons + '</b><span>' + t('me.lessons') + '</span></div><div class="stat"><b>' + learnedIds().length + '</b><span>' + t('me.items') + '</span></div></div>';
  h += '<button class="btn gold block" data-act="nav" data-to="pay">' + t('me.plans') + (st.premium ? ' ✓' : '') + '</button>';
  h += '<div class="card"><h2 class="h2">' + t('me.settings') + '</h2><p class="small muted">' + t('me.lang') + '</p>' + segHTML('lang', st.lang, LANGS) + '<p class="small muted">' + t('me.theme') + '</p>' + segHTML('theme', st.theme, [['auto', tp('theme.auto')], ['light', tp('theme.light')], ['dark', tp('theme.dark')]]) + '<p class="small muted">' + t('me.daily') + '</p>' + segHTML('daily', st.daily, [[10, '10'], [20, '20'], [40, '40']]) +
    '<div class="toggle"><span>' + t('me.demo') + '</span><button class="sw" data-act="unlock" aria-pressed="' + st.unlockAll + '" aria-label="' + esc(tp('me.demo')) + '"></button></div></div>';
  h += '<div class="card">' + authorBlock() + '<button class="btn ghost block" data-act="nav" data-to="tracks">' + t('tracks.title') + '</button></div>';
  h += '<div class="card"><h2 class="h2">' + t('me.notes') + '</h2><textarea id="notes" placeholder="' + esc(tp('me.notes.ph')) + '">' + esc(st.notes) + '</textarea><button class="btn ghost block" data-act="copynotes">' + t('me.copy') + '</button></div>';
  h += '<button class="btn ghost block" data-act="nav" data-to="log">' + t('me.log') + ' · v' + VERSION + '</button>';
  h += '<button class="btn ghost block" data-act="reset" style="color:var(--bad);border-color:var(--bad)">' + t('me.reset') + '</button>';
  h += '<p class="sign"><span>Developer Alex Grey</span><a href="https://t.me/a7grey" target="_blank" rel="noopener noreferrer"><svg class="ico" aria-hidden="true"><use href="#tg" xlink:href="#tg"/></svg>@a7grey</a></p>';
  return h;
}
function logView() {
  return '<h1 class="h1">' + t('me.log') + '</h1>' + CHANGELOG.slice().reverse().map(c => '<div class="card"><h2 class="h2">v' + c.v + '</h2><ul class="feat">' + (c[st.lang] || c.en).map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></div>').join('');
}
function onbView() {
  const dots = '<div class="dots">' + [0, 1, 2, 3].map(i => '<i class="' + (i <= ob.step ? 'on' : '') + '"></i>').join('') + '</div>';
  let body = '';
  if (ob.step === 0) body = '<p class="h1">' + t('onb.welcome') + '</p><h2 class="h2">' + t('onb.lang') + '</h2>' + segHTML('lang', st.lang, LANGS) + authorBlock() + installCard() + '<div class="mdwrap">' + medina() + '</div>';
  if (ob.step === 1) body = '<h2 class="h1">' + t('onb.goal') + '</h2><div class="opts">' + [['talk', '💬'], ['quran', '📖'], ['work', '🎓']].map(x => '<button class="opt" data-act="goal" data-v="' + x[0] + '" aria-pressed="' + (st.goal === x[0]) + '"><span>' + x[1] + '</span>' + t('goal.' + x[0]) + '</button>').join('') + '</div>';
  if (ob.step === 2) body = '<h2 class="h1">' + t('onb.level') + '</h2><div class="opts">' + [['zero', 'level.zero'], ['letters', 'level.letters'], ['some', 'level.some']].map(x => '<button class="opt" data-act="level" data-v="' + x[0] + '" aria-pressed="' + (st.level === x[0]) + '">' + t(x[1]) + '</button>').join('') + '</div>';
  if (ob.step === 3) body = '<h2 class="h1">' + t('onb.daily') + '</h2><div class="opts">' + [10, 20, 40].map(n => '<button class="opt" data-act="daily" data-v="' + n + '" aria-pressed="' + (st.daily === n) + '">' + t('daily.' + n) + '</button>').join('') + '</div>';
  const last = ob.step === 3;
  return '<div class="app"><header class="top"><span class="logo"><span class="brand">FUSHA</span>' + VTAG + '</span></header><main>' + dots + body + '<div class="row" style="margin-top:1.5rem">' + (ob.step ? '<button class="btn ghost" data-act="onbback">' + t('onb.back') + '</button>' : '') + '<button class="btn gold" style="margin-inline-start:auto" data-act="' + (last ? 'onbdone' : 'onbnext') + '">' + t(last ? 'onb.start' : 'onb.next') + '</button></div></main></div>';
}

/* ----- lesson ----- */
const KB = 'ابتثجحخدذرزسشصضطظعغفقكلمنهويةءأى';
function exBody(ex) {
  let q = '', body = '';
  const dis = ls.ans ? ' disabled' : '';
  const choice = () => '<div class="choices' + (ex.arOpt ? ' g2' : '') + '">' + ex.o.map((o, i) => {
    let c = 'ch' + (ex.arOpt ? ' ar' : '') + (ls.sel === i ? ' sel' : '');
    if (ls.ans) { if (o.ok) c = 'ch' + (ex.arOpt ? ' ar' : '') + ' ok'; else if (ls.sel === i) c = 'ch' + (ex.arOpt ? ' ar' : '') + ' bad'; }
    return '<button class="' + c + '" data-act="opt" data-i="' + i + '"' + dis + '>' + (ex.arOpt ? '<span class="ar" lang="ar" dir="rtl">' + esc(o.l) + '</span>' : esc(o.l)) + '</button>';
  }).join('') + '</div>';
  switch (ex.k) {
    case 'sound': q = tp('ex.sound'); body = '<div class="big ar">' + esc(ex.it.ar) + '</div>' + choice(); break;
    case 'letter': q = tp('ex.letter', {name:ex.it.name}); body = choice(); break;
    case 'tr': q = tp('ex.tr'); body = '<div class="big w"><span class="ar">' + esc(ex.it.ar) + '</span><span class="tr">' + esc(ex.it.tr) + '</span></div>' + choice(); break;
    case 'pickar': q = tp('ex.pickar', {w:glOf(ex.it)}); body = choice(); break;
    case 'listen': q = tp('ex.listen'); body = '<button class="tts" data-act="say" data-t="' + esc(ex.it.ar) + '">' + IC.spk + ' ' + t('tts.play') + '</button>' + choice(); break;
    case 'order': {
      q = tp('ex.order', {w:glOf(ex.it)});
      body = '<div class="line">' + ls.pick.map((ti, n) => '<button class="tok" data-act="untok" data-n="' + n + '"' + dis + '>' + esc(ex.tokens[ti].w) + '</button>').join('') + '</div><div class="bank">' +
        ex.tokens.map((tk, i) => '<button class="tok' + (ls.pick.includes(i) ? ' used' : '') + '" data-act="tok" data-i="' + i + '"' + dis + '>' + esc(tk.w) + '</button>').join('') + '</div>';
      break; }
    case 'type': {
      q = tp('ex.type', {w:glOf(ex.it)});
      body = '<div class="typed" lang="ar" dir="rtl">' + esc(ls.typed) + '</div><div class="kb">' + KB.split('').map(c => '<button data-act="key" data-c="' + c + '"' + dis + '>' + c + '</button>').join('') + '<button class="sp" data-act="key" data-c=" "' + dis + '>␣</button><button class="wide" data-act="bksp" style="grid-column:span 4"' + dis + '>⌫</button></div>';
      break; }
    case 'match': {
      q = tp('ex.match'); if (!ls.m) ls.m = {L:null, R:null, done:{}, bad:null, mistake:false, busy:false}; const m = ls.m;
      const cell = (id, side) => { const it = ITEMS[id]; const done = m.done[id]; const sel = m[side] === id; const bad = m.bad && m.bad[side] === id;
        return '<button class="mt' + (side === 'L' ? ' ar' : '') + (sel ? ' sel' : '') + (done ? ' done' : '') + (bad ? ' bad' : '') + '" data-act="m' + side + '" data-id="' + id + '">' + (side === 'L' ? '<span class="ar" lang="ar" dir="rtl">' + esc(it.ar) + '</span>' : esc(labelOf(it))) + '</button>'; };
      body = '<div class="match"><div class="col">' + ex.left.map(id => cell(id, 'L')).join('') + '</div><div class="col">' + ex.right.map(id => cell(id, 'R')).join('') + '</div></div>';
      break; }
    case 'speak':
      q = tp('ex.speak'); body = '<div class="big w"><span class="ar" style="font-size:' + (ex.it.type === 'L' ? '4.5rem' : '2.6rem') + '">' + esc(ex.it.ar) + '</span><span class="tr">' + esc(ex.it.type === 'L' ? sndOf(ex.it) : ex.it.tr) + '</span></div><button class="tts" data-act="say" data-t="' + esc(ex.it.ar) + '">' + IC.spk + ' ' + t('tts.play') + '</button><div class="rec" id="recbox">' + recHTML() + '</div>';
      break;
  }
  return '<h1 class="q">' + esc(q) + '</h1>' + body;
}
function lessonView() {
  if (!ls) { setTimeout(() => go('home'), 0); return ''; }
  if (ls.done) {
    const r = ls.result;
    return '<div class="app"><main class="res"><div class="trophy" aria-hidden="true">🏆</div><h1 class="h1">' + t('res.done') + '</h1><div class="stats"><div class="stat"><b>' + t('res.xp', {n:r.xp}) + '</b></div><div class="stat"><b>' + r.acc + '%</b><span>' + tp('res.acc', {n:''}).replace(/:\s*%?$/, '') + '</span></div></div>' +
      (r.learned ? '<p class="muted">' + t('res.learned', {n:r.learned}) + '</p>' : '') + '<p class="muted">' + t('res.streak', {n:r.streak}) + '</p><button class="btn gold block" data-act="resdone">' + t('res.back') + '</button></main></div>';
  }
  const ex = curEx(), pct = Math.round(ls.i / ls.queue.length * 100);
  let foot = '';
  if (ls.ans) {
    const a = ls.ans;
    foot = '<div class="lfoot ' + (a.ok ? 'ok' : 'no') + '"><div class="fb">' + (a.ok ? '✓ ' + t('fb.ok') : '✗ ' + t('fb.no') + '<span class="ans">' + (ex.arOpt || ex.k === 'order' || ex.k === 'type' ? ar(a.correct) : esc(a.correct)) + '</span>') + '</div><button class="btn block" data-act="next">' + t('btn.cont') + '</button></div>';
  } else if (ex.k === 'speak') foot = '<div class="lfoot"><button class="btn block" data-act="skipnext">' + t(rc.state === 'done' ? 'btn.cont' : 'btn.skip') + '</button></div>';
  else if (ex.k === 'match') foot = '';
  else {
    const can = ex.o ? ls.sel !== null : ex.k === 'order' ? ls.pick.length > 0 : ls.typed.trim().length > 0;
    foot = '<div class="lfoot"><button class="btn block" data-act="check"' + (can ? '' : ' disabled') + '>' + t('btn.check') + '</button></div>';
  }
  return '<div class="app lesson"><div class="lhead"><button class="x" data-act="quit" aria-label="' + esc(tp('lesson.leave')) + '">' + IC.x + '</button><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div></div><div class="lbody">' + exBody(ex) + '</div>' + foot + '</div>';
}
function sheetHTML() {
  if (!sheet) return '';
  if (sheet === 'insios' || sheet === 'instand') return installSheet();
  if (sheet === 'quit') return '<div class="scrim" data-act="sheetx"><div class="sheet" role="dialog" aria-modal="true"><p class="h2">' + t('lesson.quit') + '</p><button class="btn gold block" data-act="stay">' + t('lesson.stay') + '</button><button class="btn ghost block" data-act="leave">' + t('lesson.leave') + '</button></div></div>';
  if (sheet === 'reset') return '<div class="scrim" data-act="sheetx"><div class="sheet" role="dialog" aria-modal="true"><p class="h2">' + t('me.reset.q') + '</p><button class="btn ghost block" data-act="sheetx">' + t('lesson.stay') + '</button><button class="btn block" style="background:var(--bad);border-color:var(--bad)" data-act="resetyes">' + t('me.reset') + '</button></div></div>';
  return '<div class="scrim" data-act="sheetx"><div class="sheet" role="dialog" aria-modal="true"><p class="h2">' + t('sheet.title') + '</p><p class="muted">' + t(sheet === 'tutor' ? 'sheet.tutor' : 'sheet.unit') + '</p><button class="btn gold block" data-act="seeplans">' + t('sheet.see') + '</button><button class="btn ghost block" data-act="sheetx">' + t('sheet.later') + '</button></div></div>';
}

/* ---------- install + updates ---------- */
const VTAG = '<span class="ver" dir="ltr">V' + VERSION + '</span>';
const HOSTED = PWA && /^https?:$/.test(location.protocol) && window.top === window;
const isStandalone = () => { try { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch (e) { return false; } };
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const SHARE_IC = '<svg class="shic" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3M8 7l4-4 4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
function installCard() {
  if (!HOSTED || st.installed || isStandalone()) return '';
  const A = '<button class="btn gold sm" data-act="instand">' + t('inst.android') + '</button>', I = '<button class="btn gold sm" data-act="insios">' + t('inst.ios') + '</button>';
  return '<div class="card inst"><h2 class="h2">' + t('inst.title') + '</h2><div class="irow">' + (isIOS() ? I + A : A + I) + '</div></div>';
}
function installSheet() {
  const steps = sheet === 'insios' ? ['s1', 's2', 's3', 's4'] : ['s1', 's2', 's3'], pre = sheet === 'insios' ? 'inst.ios.' : 'inst.and.';
  const li = steps.map((s, i) => '<li><span class="n">' + (i + 1) + '</span><span>' + t(pre + s) + (sheet === 'insios' && s === 's2' ? ' ' + SHARE_IC : '') + '</span></li>').join('');
  const done = sheet === 'insios' ? '<button class="btn gold block" data-act="instdone">' + t('inst.ios.done') + '</button>' : '';
  return '<div class="scrim" data-act="sheetx"><div class="sheet sheet-tall" role="dialog" aria-modal="true"><p class="h2">' + t(pre + 'title') + '</p><ol class="steps">' + li + '</ol>' + done + '<button class="btn ghost block" data-act="sheetx">' + t('inst.close') + '</button></div></div>';
}
function installAndroid() {
  if (!deferred) { sheet = 'instand'; render(); return; }
  const ev = deferred; deferred = null;
  ev.prompt();
  ev.userChoice.then(c => { if (c && c.outcome === 'accepted') markInstalled(); }).catch(() => {});
}
function markInstalled() { if (st.installed) return; st.installed = true; save(); sheet = null; toast(tp('inst.ok')); render(); }
function checkUpdate() {
  if (!HOSTED) return;
  fetch('version.json?t=' + Date.now(), {cache:'no-store'}).then(r => r.json()).then(j => {
    if (j && +j.version > VERSION && newVer !== +j.version) { newVer = +j.version; banner = 'new'; if (route() !== 'lesson' && route() !== 'reading') render(); }
  }).catch(() => {});
}
if (HOSTED) {
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; });
  window.addEventListener('appinstalled', markInstalled);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkUpdate(); });
  setInterval(checkUpdate, 600000);
  checkUpdate();
}

/* ---------- render ---------- */
function render() {
  const de = document.documentElement;
  de.lang = st.lang; de.dir = st.lang === 'ar' ? 'rtl' : 'ltr';
  if (st.theme === 'auto') de.removeAttribute('data-theme'); else de.setAttribute('data-theme', st.theme);
  let r = route();
  if (!st.onboarded) r = 'onb';
  else if (r === 'onb') r = 'home';
  let html;
  if (r === 'onb') html = onbView();
  else if (r === 'lesson') html = lessonView();
  else {
    const map = {home:homeView, review:reviewView, tutor:tutorView, me:meView, pay:payView, log:logView, tracks:tracksView, reading:readingView};
    const fn = map[r] || homeView;
    const tabCur = r === 'pay' || r === 'log' ? 'me' : (r === 'tracks' || r === 'reading') ? 'home' : (map[r] ? r : 'home');
    html = '<div class="app">' + bannerHTML() + topBar() + '<main>' + fn() + '</main>' + tabs(tabCur) + '</div>';
  }
  $('#root').innerHTML = html + sheetHTML();
  document.title = 'FUSHA';
  afterRender(r);
}
function afterRender(r) {
  if (r === 'tutor' && tut) { const c = $('#chat'); if (c) c.lastElementChild && c.lastElementChild.scrollIntoView({block:'nearest'}); }
  if (r === 'lesson' && ls && !ls.done && !ls.ans) { const ex = curEx(); if (ex.k === 'listen' && !ls.spoken) { ls.spoken = true; if (TTS) say(ex.it.ar); } }
  const n = $('#notes'); if (n) n.addEventListener('input', () => { st.notes = n.value; save(); });
}

/* ---------- events ---------- */
function copyText(txt) {
  const fallback = () => { try { const a = document.createElement('textarea'); a.value = txt; a.style.cssText = 'position:fixed;top:0;opacity:0'; document.body.appendChild(a); a.select(); const ok = document.execCommand('copy'); document.body.removeChild(a); return ok; } catch (e) { return false; } };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(() => toast(tp('toast.copied')), () => toast(fallback() ? tp('toast.copied') : tp('toast.sel')));
  else toast(fallback() ? tp('toast.copied') : tp('toast.sel'));
}
function matchTap(side, id) {
  const m = ls.m; if (m.done[id] || m.busy) return;
  m[side] = id;
  if (m.L && m.R) {
    if (m.L === m.R) { m.done[m.L] = 1; m.L = m.R = null; if (Object.keys(m.done).length === curEx().items.length) { grade(!m.mistake); return; } }
    else { m.mistake = true; m.bad = {L:m.L, R:m.R}; m.busy = true; render(); setTimeout(() => { m.bad = null; m.L = m.R = null; m.busy = false; render(); }, 450); return; }
  }
  render();
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const a = b.dataset.act, d = b.dataset;
  if (a === 'sheetx' && e.target.closest('.sheet') && !e.target.closest('button')) return;
  switch (a) {
    case 'nav': sheet = null; go(d.to); window.scrollTo(0, 0); break;
    case 'lang': st.lang = d.v; save(); render(); break;
    case 'theme': st.theme = d.v; save(); render(); break;
    case 'daily': st.daily = +d.v; save(); render(); break;
    case 'goal': st.goal = d.v; render(); break;
    case 'level': st.level = d.v; render(); break;
    case 'onbnext': ob.step++; render(); break;
    case 'onbback': ob.step--; render(); break;
    case 'onbdone': st.onboarded = true; st.seen = VERSION; save(); go('home'); break;
    case 'lesson': { const l = ALL_LESSONS.find(x => x.id === d.id), lock = lockOf(l); if (lock === 'plus') { sheet = 'unit'; render(); } else if (lock) toast(tp('home.locked')); else startLesson(l); break; }
    case 'opt': if (!ls.ans) { ls.sel = +d.i; render(); } break;
    case 'check': check(); break;
    case 'next': next(); break;
    case 'skipnext': ls.ans = null; next(); break;
    case 'tok': if (!ls.ans) { ls.pick.push(+d.i); render(); } break;
    case 'untok': if (!ls.ans) { ls.pick.splice(+d.n, 1); render(); } break;
    case 'key': if (!ls.ans && ls.typed.length < 40) { ls.typed += d.c; render(); } break;
    case 'bksp': if (!ls.ans) { ls.typed = ls.typed.slice(0, -1); render(); } break;
    case 'mL': case 'mR': {
      if (!ls.m) ls.m = {L:null, R:null, done:{}, bad:null, mistake:false, busy:false};
      matchTap(a === 'mL' ? 'L' : 'R', d.id); break; }
    case 'say': say(d.t); break;
    case 'track': if (d.id === 'zero') go('home'); else if (d.id === 'tajweed') { cleanupRec(); go('reading'); } else toast(tp('st.soon')); break;
    case 'sendteacher': toast(tp('read.sent')); break;
    case 'rec': recStart(); break;
    case 'recstop': recStop(); break;
    case 'quit': sheet = 'quit'; render(); break;
    case 'stay': case 'sheetx': sheet = null; render(); break;
    case 'leave': sheet = null; cleanupRec(); ls = null; go('home'); break;
    case 'resdone': ls = null; go(route() === 'lesson' ? 'home' : 'home'); break;
    case 'rev': startReview(false); break;
    case 'revall': startReview(true); break;
    case 'scen': tut = {sc:d.id, step:0, msgs:[{r:'t', say:SCEN[d.id].steps[0].say}], done:false}; render(); break;
    case 'scenreset': tut = null; render(); break;
    case 'chip': tutorSend(SCEN[tut.sc].steps[tut.step].chips[+d.i]); break;
    case 'region': st.region = d.r; save(); render(); break;
    case 'buy': st.premium = true; save(); toast(tp('toast.demo')); render(); break;
    case 'cancelplus': st.premium = false; save(); render(); break;
    case 'seeplans': sheet = null; go('pay'); break;
    case 'unlock': st.unlockAll = !st.unlockAll; save(); render(); break;
    case 'copynotes': copyText(st.notes || ''); break;
    case 'reset': sheet = 'reset'; render(); break;
    case 'resetyes': { const keep = {lang:st.lang, theme:st.theme}; st = Object.assign({}, DEF, keep, {onboarded:true, seen:VERSION}); save(); sheet = null; tut = null; ls = null; toast(tp('toast.reset')); render(); break; }
    case 'updclose': st.seen = VERSION; save(); render(); break;
    case 'reload': location.reload(); break;
    case 'instand': installAndroid(); break;
    case 'insios': sheet = 'insios'; render(); break;
    case 'instdone': markInstalled(); break;
  }
});
document.addEventListener('submit', e => { const f = e.target.closest('[data-form="tutor"]'); if (!f) return; e.preventDefault(); const i = $('#tin'); tutorSend(i.value); });
document.addEventListener('keydown', e => {
  if (!ls || ls.done || route() !== 'lesson' || e.target.closest('input,textarea')) return;
  const ex = curEx();
  if (ex.k === 'type' && !ls.ans) {
    if (e.key === 'Backspace') { ls.typed = ls.typed.slice(0, -1); render(); }
    else if (e.key === 'Enter') check();
    else if (e.key.length === 1 && /[؀-ۿ ]/.test(e.key)) { ls.typed += e.key; render(); }
  } else if (e.key === 'Enter') { if (ls.ans) next(); else if (ex.o) check(); }
});
window.addEventListener('hashchange', () => { if (route() !== 'reading' && route() !== 'lesson') cleanupRec(); sheet = null; render(); });
window.addEventListener('storage', e => { if (e.key === LATEST && +e.newValue > VERSION) { newVer = +e.newValue; banner = 'new'; render(); } });
initTTS();
if (location.hash === '#/lesson' && !ls) location.hash = '#/home';
render();
window.__fusha = {get st() { return st; }, get ls() { return ls; }, buildQueue, ITEMS};
})();
