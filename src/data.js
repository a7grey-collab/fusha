/* ===== version ===== */
const VERSION = 9;
const CHANGELOG = [
 {v:9, ru:['Алфавит по порядку: 28 букв в 7 уроках, трудные звуки больше не отдельно','Формы буквы в слове: отдельно, в начале, в середине, в конце','Новый раздел «Огласовки»: фатха, дамма, касра, долгие гласные','Раздел «Читаем слова»: первые 8 слов с огласовками','Короткие пояснения перед уроками'],
  en:['Alphabet in order: 28 letters in 7 lessons, hard sounds are no longer separate','Letter shapes inside a word: alone, start, middle, end','New “Vowel marks” unit: fatha, damma, kasra, long vowels','“Reading words” unit: first 8 words with vowel marks','Short explanations before lessons'],
  ar:['الأبجدية بالترتيب: 28 حرفًا في 7 دروس، ولم تعد الأصوات الصعبة منفصلة','أشكال الحرف داخل الكلمة: منفرد، أول، وسط، آخر','وحدة جديدة «الحركات»: الفتحة والضمة والكسرة وحروف المد','وحدة «نقرأ كلمات»: أول 8 كلمات بالحركات','شروح قصيرة قبل الدروس']},
 {v:8, ru:['Вместо рисунка — фото Медины: вечерняя на первом экране и на главной, дневная с зелёным куполом на втором экране и в «Направлениях»'],
  en:['Photos of Al-Madinah instead of the drawing: dusk on the first screen and home, daytime with the Green Dome on the second screen and in “Tracks”'],
  ar:['صور للمدينة المنورة بدل الرسم: وقت الغروب في الشاشة الأولى والرئيسية، ونهارًا مع القبة الخضراء في الشاشة الثانية وفي «المسارات»']},
 {v:7, ru:['На главной и на первом экране нарисована Медина: Масджид ан-Набави с зелёным куполом','Имя автора мельче и умещается в одну строку'],
  en:['Al-Madinah illustration on the home and first screens: the Prophet’s Mosque with its green dome','Author name is smaller and fits on one line'],
  ar:['رسم للمدينة المنورة في الشاشة الرئيسية والأولى: المسجد النبوي بقبته الخضراء','اسم المؤلف أصغر ويتسع في سطر واحد']},
 {v:6, ru:['Установка на экран: две небольшие кнопки «Android» и «iPhone / iPad» всегда рядом','iPhone / iPad: по нажатию показываются шаги установки'],
  en:['Add to home screen: two small buttons, “Android” and “iPhone / iPad”, always side by side','iPhone / iPad: tapping shows the install steps'],
  ar:['الإضافة إلى الشاشة: زران صغيران «Android» و«iPhone / iPad» دائمًا جنبًا إلى جنب','iPhone / iPad: عند الضغط تظهر خطوات التثبيت']},
 {v:5, ru:['Кнопки установки на экран теперь видны сразу, на первом экране','Номер версии (V5) показывается рядом с логотипом'],
  en:['Install buttons are now visible right on the first screen','The version number (V5) is shown next to the logo'],
  ar:['أزرار التثبيت تظهر الآن مباشرة في الشاشة الأولى','يظهر رقم الإصدار (V5) بجانب الشعار']},
 {v:4, ru:['Кнопки «Установить на экран»: Android — одним нажатием, iPhone/iPad — пошаговая инструкция','После установки кнопки исчезают, приложение открывается во весь экран','Автоуведомление: при выходе новой версии появляется «Доступно обновление → Обновить»'],
  en:['“Add to home screen” buttons: Android in one tap, iPhone/iPad with step-by-step instructions','After install the buttons disappear and the app opens full screen','Automatic notice: when a new version is out you see “Update available → Update”'],
  ar:['أزرار «إضافة إلى الشاشة الرئيسية»: أندرويد بضغطة واحدة، وآيفون/آيباد بخطوات مفصلة','بعد التثبيت تختفي الأزرار ويفتح التطبيق بملء الشاشة','إشعار تلقائي: عند صدور إصدار جديد يظهر «يتوفر تحديث ← تحديث»']},
 {v:3, ru:['Логотип FUSHA в шапке теперь ведёт на главную'], en:['The FUSHA logo in the header now takes you to the home screen'], ar:['شعار FUSHA في الأعلى يعيدك الآن إلى الشاشة الرئيسية']},
 {v:2, ru:['Добавлен автор: Хамза аш-Шишани аль-Мадани','Экран «Направления»: от первой буквы до чтения Корана, хифз, Kids, Академия','Демо «Проверка чтения» (таджвид с ИИ, макет)','Иджаза только через квалифицированного шейха'],
  en:['Author added: Hamza ash-Shishani al-Madani','New “Tracks” screen: from the first letter to Quran reading, hifz, Kids, Academy','“Reading check” demo (tajweed with AI, mock-up)','Ijazah only through a qualified sheikh'],
  ar:['إضافة المؤلف: حمزة الشيشاني المدني','شاشة «المسارات»: من الحرف الأول إلى قراءة القرآن والحفظ وKids والأكاديمية','عرض «فحص القراءة» (التجويد بالذكاء الاصطناعي، تصوّر)','الإجازة لا تُمنح إلا عبر شيخ مؤهَّل']},
 {v:1, ru:['Первый рабочий прототип сервиса','Путь по урокам: буквы, приветствия, трудные звуки, числа','6 типов упражнений, повторение по интервалам, XP и серия','AI-тьютор (демо по сценариям), запись голоса, тарифы по регионам','Русский, English, العربية с зеркальным интерфейсом'],
  en:['First working prototype of the service','Lesson path: letters, greetings, hard sounds, numbers','6 exercise types, spaced repetition, XP and streak','AI tutor (scripted demo), voice recording, regional plans','Russian, English and Arabic with a mirrored interface'],
  ar:['أول نموذج عملي للخدمة','مسار الدروس: الحروف والتحيات والأصوات الصعبة والأرقام','6 أنواع من التمارين ومراجعة متباعدة ونقاط وسلسلة أيام','معلّم ذكي (عرض تجريبي) وتسجيل الصوت وخطط حسب المنطقة','الروسية والإنجليزية والعربية بواجهة معكوسة']}
];

/* ===== letters: [glyph, name, soundRu, soundEn, hard] ===== */
const LETTERS = [
 ['ا','alif','а (долгий)','a (long)',0],['ب','ba','б','b',0],['ت','ta','т','t',0],['ث','tha','«th» как в think','th (think)',1],
 ['ج','jim','дж','j (jam)',0],['ح','Ha (throat)','горловое «х»','throat h',1],['خ','kha','х как в «хорошо»','kh (loch)',1],['د','dal','д','d',0],
 ['ذ','dhal','«th» как в this','th (this)',1],['ر','ra','р (раскатистая)','r (rolled)',0],['ز','zay','з','z',0],['س','sin','с','s',0],
 ['ش','shin','ш','sh',0],['ص','Sad','с эмфатическое','emphatic s',1],['ض','Dad','д эмфатическое','emphatic d',1],['ط','Ta (emph.)','т эмфатическое','emphatic t',1],
 ['ظ','Za (emph.)','з эмфатическое','emphatic z',1],['ع','ayn','гортанный «айн»','ayn (throat)',1],['غ','ghayn','гъ (картавое)','gh (French r)',1],['ف','fa','ф','f',0],
 ['ق','qaf','к глубокое','deep q',1],['ك','kaf','к','k',0],['ل','lam','л','l',0],['م','mim','м','m',0],
 ['ن','nun','н','n',0],['ه','ha (soft)','х (мягкий выдох)','h (soft)',0],['و','waw','в / долгий у','w / long u',0],['ي','ya','й / долгий и','y / long i',0]
];
/* ===== words: [id, ar, ru, en, translit] ===== */
const WORDS = [
 ['marhaban','مرحبا','привет','hello','marhaban'],
 ['ahlan','أهلا','здравствуйте (рад вас видеть)','hi (welcome)','ahlan'],
 ['salam','السلام عليكم','мир вам (приветствие)','peace be upon you (greeting)','as-salamu alaykum'],
 ['reply','وعليكم السلام','и вам мир (ответ)','and peace be upon you (reply)','wa alaykum as-salam'],
 ['sabah','صباح الخير','доброе утро','good morning','sabah al-khayr'],
 ['masa','مساء الخير','добрый вечер','good evening','masa’ al-khayr'],
 ['bye','مع السلامة','до свидания','goodbye','ma‘a as-salama'],
 ['yes','نعم','да','yes','na‘am'],
 ['no','لا','нет','no','la'],
 ['thanks','شكرا','спасибо','thank you','shukran'],
 ['welcome','عفوا','не за что','you’re welcome','‘afwan'],
 ['please','من فضلك','пожалуйста (просьба)','please','min fadlik'],
 ['how','كيف حالك','как дела?','how are you?','kayfa haluk'],
 ['fine','بخير','хорошо (в порядке)','fine (well)','bikhayr'],
 ['door','بَاب','дверь','door','bab'],['house','بَيْت','дом','house','bayt'],['book','كِتَاب','книга','book','kitab'],['pen','قَلَم','ручка','pen','qalam'],
 ['boy','وَلَد','мальчик','boy','walad'],['sun','شَمْس','солнце','sun','shams'],['moon','قَمَر','луна','moon','qamar'],['fish','سَمَك','рыба','fish','samak'],
 ['n1','واحد','один','one','wahid'],['n2','اثنان','два','two','ithnan'],['n3','ثلاثة','три','three','thalatha'],
 ['n4','أربعة','четыре','four','arba‘a'],['n5','خمسة','пять','five','khamsa'],['n6','ستة','шесть','six','sitta'],
 ['n7','سبعة','семь','seven','sab‘a'],['n8','ثمانية','восемь','eight','thamaniya'],['n9','تسعة','девять','nine','tis‘a'],['n10','عشرة','десять','ten','‘ashara']
];
const ITEMS = {};
LETTERS.forEach(l => { ITEMS['L:' + l[0]] = {id:'L:' + l[0], type:'L', ar:l[0], name:l[1], snd:{ru:l[2], en:l[3]}, hard:!!l[4]}; });
WORDS.forEach(w => { ITEMS['W:' + w[0]] = {id:'W:' + w[0], type:'W', ar:w[1], gl:{ru:w[2], en:w[3]}, tr:w[4]}; });
const L = g => 'L:' + g, W = i => 'W:' + i;
/* ===== syllables: consonant + vowel ===== */
const CONS = {'ب':['б','b'], 'ت':['т','t'], 'م':['м','m'], 'ل':['л','l'], 'ن':['н','n'], 'س':['с','s'], 'ك':['к','k'], 'ر':['р','r']};
const VOWS = {a:['\u064E','а','a'], u:['\u064F','у','u'], i:['\u0650','и','i'], A:['\u064E\u0627','аа (долгий)','aa (long)'], U:['\u064F\u0648','уу (долгий)','uu (long)'], I:['\u0650\u064A','ии (долгий)','ii (long)']};
const mkS = (c, v) => { const ar = c + VOWS[v][0], k = (v === 'A' || v === 'U' || v === 'I'); return {id:'S:' + ar, type:'S', ar, c, v, snd:{ru:CONS[c][0] + VOWS[v][1], en:CONS[c][1] + VOWS[v][2]}}; };
const SYLS = [];
'بتملنسكر'.split('').forEach(c => ['a', 'u', 'i', 'A', 'U', 'I'].forEach(v => { const s = mkS(c, v); SYLS.push(s); ITEMS[s.id] = s; }));
const SY = (c, v) => 'S:' + c + VOWS[v][0];
const W3 = a => a.map(w => 'W:' + w);
/* ===== lesson intros (info cards) ===== */
const INTRO = {
 alpha1:{t:{ru:'Арабское письмо', en:'Arabic writing', ar:'الكتابة العربية'},
  p:{ru:'Арабский пишется справа налево. В алфавите 28 букв. Внутри слова буква меняет форму: отдельно, в начале, в середине, в конце. Вот буква «ба» (ب) во всех четырёх формах.',
     en:'Arabic is written from right to left. The alphabet has 28 letters. Inside a word a letter changes shape: on its own, at the start, in the middle, at the end. Here is the letter “ba” (ب) in all four forms.',
     ar:'تُكتب العربية من اليمين إلى اليسار. في الأبجدية 28 حرفًا. وفي الكلمة يتغيّر شكل الحرف: منفردًا، في أولها، في وسطها، في آخرها. هذا حرف الباء (ب) بأشكاله الأربعة.'}, forms:'ب'},
 alpha2:{t:{ru:'Буквы, которые не соединяются', en:'Letters that do not join', ar:'حروف لا تتصل بما بعدها'},
  p:{ru:'Шесть букв не соединяются со следующей буквой, поэтому у них меньше форм. После них слово как будто «обрывается» и начинается заново.',
     en:'Six letters do not join to the letter after them, so they have fewer forms. After them the word seems to “break” and start again.',
     ar:'ستة حروف لا تتصل بالحرف الذي بعدها، لذلك أشكالها أقل. بعدها تنقطع الكلمة ثم تبدأ من جديد.'}, big:'ا  د  ذ  ر  ز  و'},
 fatha:{t:{ru:'Короткие гласные: фатха', en:'Short vowels: fatha', ar:'الحركات: الفتحة'},
  p:{ru:'Над или под буквой стоят маленькие знаки: это короткие гласные. Фатха, чёрточка над буквой, даёт звук «а». Например: بَ = ба.',
     en:'Small marks above or below a letter are short vowels. Fatha, a stroke above the letter, gives the sound “a”. For example: بَ = ba.',
     ar:'علامات صغيرة فوق الحرف أو تحته هي الحركات القصيرة. الفتحة، وهي شرطة فوق الحرف، تعطي صوت «a». مثال: بَ = ba.'}, big:'بَ  تَ  مَ  لَ'},
 damma:{t:{ru:'Дамма', en:'Damma', ar:'الضمة'},
  p:{ru:'Дамма, маленькая «و» над буквой, даёт звук «у». Например: بُ = бу.', en:'Damma, a tiny “و” above the letter, gives the sound “u”. For example: بُ = bu.', ar:'الضمة، وهي واو صغيرة فوق الحرف، تعطي صوت «u». مثال: بُ = bu.'}, big:'بُ  تُ  مُ  لُ'},
 kasra:{t:{ru:'Касра', en:'Kasra', ar:'الكسرة'},
  p:{ru:'Касра, чёрточка под буквой, даёт звук «и». Например: بِ = би.', en:'Kasra, a stroke below the letter, gives the sound “i”. For example: بِ = bi.', ar:'الكسرة، وهي شرطة تحت الحرف، تعطي صوت «i». مثال: بِ = bi.'}, big:'بِ  تِ  مِ  لِ'},
 long:{t:{ru:'Долгие гласные', en:'Long vowels', ar:'حروف المد'},
  p:{ru:'После фатхи стоит алиф (ا), после даммы вау (و), после касры йа (ي): гласный тянется вдвое дольше. بَا = баа, بُو = буу, بِي = бии.',
     en:'Alif (ا) after fatha, waw (و) after damma, ya (ي) after kasra: the vowel is held twice as long. بَا = baa, بُو = buu, بِي = bii.',
     ar:'الألف (ا) بعد الفتحة، والواو (و) بعد الضمة، والياء (ي) بعد الكسرة: يُمدّ الصوت ضعف المدة. بَا = baa، بُو = buu، بِي = bii.'}, big:'بَا  بُو  بِي'},
 sukun:{t:{ru:'Сукун', en:'Sukun', ar:'السكون'},
  p:{ru:'Сукун, маленький кружок над буквой, значит: после этой буквы нет гласного. Например: بَيْت = байт (дом). Теперь читаем целые слова.',
     en:'Sukun, a tiny circle above a letter, means there is no vowel after it. For example: بَيْت = bayt (house). Now we read whole words.',
     ar:'السكون، وهو دائرة صغيرة فوق الحرف، يعني أنه لا حركة بعده. مثال: بَيْت = bayt. والآن نقرأ كلمات كاملة.'}, big:'بَيْت'}
};
const LCH = (() => { const o = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'.split(''), r = []; for (let k = 0; k < 28; k += 4) r.push(o.slice(k, k + 4).map(L)); return r; })();
const UNITS = [
 {id:'ua', ic:'ا', premium:false, t:{ru:'Алфавит', en:'Alphabet', ar:'الأبجدية'}, lessons:LCH.map((items, k) => ({items, intro:k === 0 ? INTRO.alpha1 : k === 1 ? INTRO.alpha2 : null}))},
 {id:'uh', ic:'بَ', premium:false, t:{ru:'Огласовки', en:'Vowel marks', ar:'الحركات'}, lessons:[
   {items:['ب','ت','م','ل'].map(c => SY(c, 'a')), intro:INTRO.fatha}, {items:['ب','ت','م','ل'].map(c => SY(c, 'u')), intro:INTRO.damma}, {items:['ب','ت','م','ل'].map(c => SY(c, 'i')), intro:INTRO.kasra},
   {items:[SY('ن','a'), SY('س','u'), SY('ك','i'), SY('ر','a')]}, {items:[SY('ب','A'), SY('ب','U'), SY('ب','I'), SY('م','A')], intro:INTRO.long}]},
 {id:'ur', ic:'ك', premium:false, t:{ru:'Читаем слова', en:'Reading words', ar:'نقرأ كلمات'}, lessons:[
   {items:W3(['door','house','book','pen']), intro:INTRO.sukun}, {items:W3(['boy','sun','moon','fish'])}]},
 {id:'ug', ic:'م', premium:false, t:{ru:'Приветствия', en:'Greetings', ar:'التحيات'}, lessons:[
   ['marhaban','ahlan','salam','reply'].map(W), ['sabah','masa','bye','yes','no'].map(W), ['thanks','welcome','please','how','fine'].map(W)]},
 {id:'un', ic:'٤', premium:true, t:{ru:'Числа 1–10', en:'Numbers 1–10', ar:'الأرقام 1-10'}, lessons:[
   ['n1','n2','n3','n4','n5'].map(W), ['n6','n7','n8','n9','n10'].map(W)]}
];
UNITS.forEach(u => u.lessons = u.lessons.map((x, i) => { const o = Array.isArray(x) ? {items:x} : x; return {id:u.id + 'l' + (i + 1), unit:u, n:i + 1, items:o.items, intro:o.intro || null}; }));
const ALL_LESSONS = UNITS.flatMap(u => u.lessons);

/* ===== tutor scenarios ===== */
const SCEN = {
 meet:{ steps:[
  {say:{ar:'السلام عليكم', ru:'Мир вам (приветствие)', en:'Peace be upon you (greeting)'}, ok:n => n.includes('وعليكم السلام'), chips:['وعليكم السلام']},
  {say:{ar:'ما اسمك؟', ru:'Как вас зовут?', en:'What is your name?'}, ok:n => n.startsWith('اسمي') && n.length > 4, chips:['اسمي علي']},
  {say:{ar:'كيف حالك؟', ru:'Как у вас дела?', en:'How are you?'}, ok:n => n.includes('بخير'), chips:['أنا بخير، شكرا']},
  {say:{ar:'مع السلامة', ru:'До свидания', en:'Goodbye'}, ok:n => n.includes('مع السلامه') || n.includes('السلام'), chips:['مع السلامة']}
 ], close:null},
 cafe:{ steps:[
  {say:{ar:'أهلا! ماذا تريد؟', ru:'Здравствуйте! Что вы хотите?', en:'Hello! What would you like?'}, ok:n => n.includes('اريد') && n.length > 5, chips:['أريد قهوة','أريد شاي']},
  {say:{ar:'تفضل', ru:'Пожалуйста, вот ваш заказ', en:'Here you are'}, ok:n => n.includes('شكرا'), chips:['شكرا']}
 ], close:{ar:'عفوا', ru:'Не за что', en:'You’re welcome'}}
};

/* ===== UI strings ===== */
const S = {
ru:{
 'author.label':'Автор','tracks.title':'Направления','tracks.lead':'Один путь: от первой буквы до свободного арабского и уверенного чтения Корана','tracks.open':'Открыть','st.open':'Доступно','st.demo':'Демо','st.soon':'Скоро','tracks.ijaza':'Иджаза выдаётся только квалифицированным шейхом с соответствующей цепочкой передачи, а не автоматически через ИИ.',
 'read.title':'Проверка чтения','read.sub':'Прочитайте аят','read.src':'Текст взят из заметок автора. В сервисе текст берётся из проверенного источника и сверяется шейхом.','read.how':'Система оценивает чтение в пределах возможностей распознавания речи и отмечает предполагаемые ошибки. Сложные вопросы таджвида передаются преподавателю.','read.sample':'Пример замечаний (макет)','read.madd':'Мадд в «الرَّحْمَٰنِ»: естественный мадд, два счёта. Возможная ошибка, проверьте.','read.teacher':'Отправить преподавателю (макет)','read.sent':'Макет: в сервисе запись уйдёт преподавателю',
 'tab.path':'Путь','tab.review':'Повтор','tab.tutor':'Тьютор','tab.me':'Профиль',
 'onb.welcome':'Учите арабский (фусха) вместе с Institute TOBA','onb.lang':'Язык интерфейса','onb.goal':'Зачем вам арабский?',
 'goal.talk':'Свободное общение','goal.quran':'Язык Корана','goal.work':'Работа и учёба',
 'onb.level':'Ваш уровень','level.zero':'Начинаю с нуля','level.letters':'Знаю буквы','level.some':'Немного читаю и говорю',
 'onb.daily':'Цель на день','daily.10':'Лёгкая · 10 XP','daily.20':'Обычная · 20 XP','daily.40':'Серьёзная · 40 XP',
 'onb.start':'Начать','onb.next':'Далее','onb.back':'Назад',
 'home.goal':'Цель дня','home.goalval':'{a} из {b} XP','home.continue':'Продолжить','home.start':'Начать','home.lesson':'Урок {n}','home.locked':'Сначала пройдите предыдущий урок','home.done':'Пройден',
 'lesson.quit':'Выйти из урока? Прогресс этого урока будет потерян.','lesson.stay':'Остаться','lesson.leave':'Выйти',
 'ex.sound':'Какой звук у этой буквы?','ex.letter':'Выберите букву «{name}»','ex.tr':'Что значит это слово?','ex.pickar':'Выберите по-арабски: «{w}»','ex.listen':'Что вы услышали?','ex.match':'Соедините пары','ex.order':'Составьте фразу: «{w}»','ex.type':'Напишите по-арабски: «{w}»','ex.speak':'Произнесите вслух',
 'btn.check':'Проверить','btn.cont':'Далее','btn.skip':'Пропустить','fb.ok':'Верно!','fb.no':'Не совсем. Правильно:',
 'tts.off':'Озвучка арабского недоступна на этом устройстве. В сервисе будет аудио носителей языка.','tts.play':'Послушать',
 'mic.rec':'Записать','mic.stop':'Остановить','mic.again':'Ещё раз','mic.err':'Нет доступа к микрофону. Разрешите его в настройках браузера.','mic.len':'Длительность: {s} с','mic.level':'Громкость записи: {p}%','mic.mock':'Пример оценки (макет). В сервисе оценку даст подключённый провайдер распознавания речи.','mic.overall':'Общая оценка','mic.hint':'Подсказка по артикуляции: звук идёт из глубины горла, язык не касается зубов.',
 'res.done':'Урок пройден!','res.xp':'+{n} XP','res.acc':'Точность: {n}%','res.learned':'Новых элементов в повторении: {n}','res.streak':'Серия: {n} дн.','res.back':'К пути',
 'rev.title':'Повторение','rev.due':'К повторению сегодня: {n}','rev.learned':'Выучено элементов: {n}','rev.start':'Начать повторение','rev.none':'Пока нечего повторять. Пройдите первый урок.','rev.all':'Повторить всё выученное (демо)','rev.why':'Буквы и слова возвращаются через 1, 3, 7 и 14 дней, чтобы остаться в памяти.',
 'tutor.title':'AI-тьютор','tutor.demo':'Демо: ответы по сценарию. В сервисе тьютор работает на Claude и понимает свободный текст.','tutor.pick':'Выберите сценарий','sc.meet':'Знакомство','sc.cafe':'В кафе','tutor.ph':'Напишите по-арабски…','tutor.send':'Отправить','tutor.hint':'Подсказка','tutor.try':'Почти. Попробуйте так:','tutor.good':'Отлично!','tutor.end':'Сценарий завершён','tutor.again':'Другой сценарий','tutor.left':'Бесплатно сегодня: осталось {n} из {m}','tutor.tap':'Нажмите на фразу или напишите свою',
 'pay.title':'Тарифы','pay.region':'Ваш регион','reg.gcc':'Саудовская Аравия и GCC','reg.mena':'MENA (вне GCC)','reg.west':'Северная Америка и Европа','reg.row':'Остальной мир','per':'/ мес.',
 'plan.free':'Бесплатно','plan.plus':'Plus',
 'free.1':'Юниты 1–3: буквы, приветствия, трудные звуки','free.2':'Повторение по интервалам','free.3':'5 сообщений тьютору в день',
 'plus.1':'Все юниты и новые уроки','plus.2':'AI-тьютор без лимита','plus.3':'Голосовой диалог и проверка произношения','plus.4':'Персональный план обучения',
 'pay.buy':'Оформить Plus (демо)','pay.cancel':'Отключить Plus (демо)','pay.active':'Plus активен (демо)','pay.demo':'Демо: оплата не выполняется.','pay.illus':'Цены иллюстративные. Итоговую сетку определим после закрытой беты.','pay.soon':'Скоро',
 'soon.live':'занятия с преподавателями','soon.q':'язык Корана','soon.c':'экзамены и иджаза','soon.k':'для детей',
 'sheet.title':'Нужен Plus','sheet.unit':'Этот юнит входит в Plus.','sheet.tutor':'Бесплатный лимит сообщений на сегодня исчерпан.','sheet.see':'Смотреть тарифы','sheet.later':'Позже',
 'me.title':'Профиль','me.xp':'Всего XP','me.streak':'Серия, дн.','me.lessons':'Уроков пройдено','me.items':'Элементов выучено','me.settings':'Настройки','me.lang':'Язык','me.theme':'Тема','theme.auto':'Авто','theme.light':'Светлая','theme.dark':'Тёмная','me.daily':'Цель на день','me.demo':'Демо: открыть все уроки','me.reset':'Сбросить прогресс','me.reset.q':'Сбросить весь прогресс?','me.notes':'Заметки для следующей версии','me.notes.ph':'Что поправить, добавить, убрать…','me.copy':'Скопировать заметки','me.plans':'Тарифы и Plus','me.log':'Что нового','me.reco':'Рекомендуем начать с юнита {n}',
 'upd.title':'Приложение обновлено до v{v}','upd.new':'Доступно обновление','upd.reload':'Обновить','upd.close':'Понятно',
 'inst.title':'Установить на экран','inst.text':'Откроется как обычное приложение: во весь экран, быстрее, с запуском офлайн.','inst.android':'Android','inst.ios':'iPhone / iPad','inst.ios.title':'Как добавить на iPhone / iPad','inst.ios.s1':'Откройте эту страницу в Safari (в других браузерах кнопки «Поделиться» может не быть).','inst.ios.s2':'Нажмите «Поделиться» — квадрат со стрелкой вверх. На iPhone он внизу, на iPad вверху справа.','inst.ios.s3':'Прокрутите меню вниз и выберите «На экран «Домой»».','inst.ios.s4':'Нажмите «Добавить» в правом верхнем углу. Значок FUSHA появится на экране.','inst.ios.done':'Готово, добавил','inst.and.title':'Как установить на Android','inst.and.s1':'Откройте меню браузера — три точки ⋮ вверху справа.','inst.and.s2':'Выберите «Установить приложение» или «Добавить на главный экран».','inst.and.s3':'Подтвердите. Значок FUSHA появится на экране.','inst.close':'Закрыть','inst.ok':'Установлено. Ищите значок FUSHA на экране.','upd.newv':'Доступно обновление до v{v}',
 'ex.syl':'Как читается этот слог?','ex.sylpick':'Выберите слог «{name}»','ex.form':'Какая это буква? (форма внутри слова)','f.iso':'отдельно','f.ini':'в начале','f.med':'в середине','f.fin':'в конце',
 'toast.copied':'Скопировано','toast.sel':'Выделено. Скопируйте вручную','toast.demo':'Демо: оплата не выполняется','toast.reset':'Прогресс сброшен'
},
en:{
 'author.label':'Author','tracks.title':'Tracks','tracks.lead':'One path: from the first letter to fluent Arabic and confident Quran reading','tracks.open':'Open','st.open':'Available','st.demo':'Demo','st.soon':'Soon','tracks.ijaza':'Ijazah is granted only by a qualified sheikh with a proper chain of transmission, never automatically by AI.',
 'read.title':'Reading check','read.sub':'Read the verse','read.src':'Text taken from the author’s notes. In the service the text comes from a verified source and is reviewed by a sheikh.','read.how':'The system evaluates your reading within the limits of speech recognition and flags suspected mistakes. Complex tajweed questions go to a teacher.','read.sample':'Sample remarks (mock-up)','read.madd':'Madd in “الرَّحْمَٰنِ”: natural madd, two counts. Possible mistake, please check.','read.teacher':'Send to a teacher (mock-up)','read.sent':'Mock-up: in the service the recording goes to a teacher',
 'tab.path':'Path','tab.review':'Review','tab.tutor':'Tutor','tab.me':'Profile',
 'onb.welcome':'Learn Arabic (Fusha) with Institute TOBA','onb.lang':'Interface language','onb.goal':'Why do you want Arabic?',
 'goal.talk':'Everyday communication','goal.quran':'The language of the Quran','goal.work':'Work and study',
 'onb.level':'Your level','level.zero':'Starting from zero','level.letters':'I know the letters','level.some':'I read and speak a little',
 'onb.daily':'Daily goal','daily.10':'Light · 10 XP','daily.20':'Regular · 20 XP','daily.40':'Serious · 40 XP',
 'onb.start':'Start','onb.next':'Next','onb.back':'Back',
 'home.goal':'Daily goal','home.goalval':'{a} of {b} XP','home.continue':'Continue','home.start':'Start','home.lesson':'Lesson {n}','home.locked':'Finish the previous lesson first','home.done':'Completed',
 'lesson.quit':'Leave the lesson? Progress in this lesson will be lost.','lesson.stay':'Stay','lesson.leave':'Leave',
 'ex.sound':'What sound does this letter make?','ex.letter':'Choose the letter “{name}”','ex.tr':'What does this mean?','ex.pickar':'Choose in Arabic: “{w}”','ex.listen':'What did you hear?','ex.match':'Match the pairs','ex.order':'Build the phrase: “{w}”','ex.type':'Write in Arabic: “{w}”','ex.speak':'Say it out loud',
 'btn.check':'Check','btn.cont':'Continue','btn.skip':'Skip','fb.ok':'Correct!','fb.no':'Not quite. Correct answer:',
 'tts.off':'Arabic speech is not available on this device. The service will use native-speaker audio.','tts.play':'Listen',
 'mic.rec':'Record','mic.stop':'Stop','mic.again':'Again','mic.err':'No microphone access. Allow it in your browser settings.','mic.len':'Length: {s} s','mic.level':'Recording level: {p}%','mic.mock':'Sample result (mock-up). In the service, a speech-recognition provider will score this.','mic.overall':'Overall','mic.hint':'Articulation tip: the sound comes from deep in the throat; the tongue does not touch the teeth.',
 'res.done':'Lesson complete!','res.xp':'+{n} XP','res.acc':'Accuracy: {n}%','res.learned':'New items in review: {n}','res.streak':'Streak: {n} days','res.back':'Back to path',
 'rev.title':'Review','rev.due':'Due today: {n}','rev.learned':'Items learned: {n}','rev.start':'Start review','rev.none':'Nothing to review yet. Complete your first lesson.','rev.all':'Review everything learned (demo)','rev.why':'Letters and words return after 1, 3, 7 and 14 days so they stick.',
 'tutor.title':'AI tutor','tutor.demo':'Demo: scripted replies. In the service the tutor runs on Claude and understands free text.','tutor.pick':'Choose a scenario','sc.meet':'Meeting someone','sc.cafe':'At the café','tutor.ph':'Write in Arabic…','tutor.send':'Send','tutor.hint':'Hint','tutor.try':'Close. Try this:','tutor.good':'Great!','tutor.end':'Scenario complete','tutor.again':'Another scenario','tutor.left':'Free today: {n} of {m} left','tutor.tap':'Tap a phrase or write your own',
 'pay.title':'Plans','pay.region':'Your region','reg.gcc':'Saudi Arabia & GCC','reg.mena':'MENA (outside GCC)','reg.west':'North America & Europe','reg.row':'Rest of world','per':'/ mo',
 'plan.free':'Free','plan.plus':'Plus',
 'free.1':'Units 1–3: letters, greetings, hard sounds','free.2':'Spaced repetition','free.3':'5 tutor messages per day',
 'plus.1':'All units and new lessons','plus.2':'Unlimited AI tutor','plus.3':'Voice dialogue and pronunciation check','plus.4':'Personal study plan',
 'pay.buy':'Get Plus (demo)','pay.cancel':'Turn off Plus (demo)','pay.active':'Plus is active (demo)','pay.demo':'Demo: no payment is taken.','pay.illus':'Prices are illustrative. The final grid will be set after the closed beta.','pay.soon':'Coming soon',
 'soon.live':'lessons with teachers','soon.q':'the language of the Quran','soon.c':'exams and ijazah','soon.k':'for children',
 'sheet.title':'Plus required','sheet.unit':'This unit is part of Plus.','sheet.tutor':'You have used today’s free messages.','sheet.see':'See plans','sheet.later':'Later',
 'me.title':'Profile','me.xp':'Total XP','me.streak':'Streak, days','me.lessons':'Lessons completed','me.items':'Items learned','me.settings':'Settings','me.lang':'Language','me.theme':'Theme','theme.auto':'Auto','theme.light':'Light','theme.dark':'Dark','me.daily':'Daily goal','me.demo':'Demo: unlock all lessons','me.reset':'Reset progress','me.reset.q':'Reset all progress?','me.notes':'Notes for the next version','me.notes.ph':'What to fix, add or remove…','me.copy':'Copy notes','me.plans':'Plans and Plus','me.log':'What’s new','me.reco':'We recommend starting from unit {n}',
 'upd.title':'App updated to v{v}','upd.new':'Update available','upd.reload':'Update','upd.close':'Got it',
 'inst.title':'Add to home screen','inst.text':'Opens like a regular app: full screen, faster, and it starts offline.','inst.android':'Android','inst.ios':'iPhone / iPad','inst.ios.title':'How to add on iPhone / iPad','inst.ios.s1':'Open this page in Safari (other browsers may not have the Share button).','inst.ios.s2':'Tap Share, the square with an arrow pointing up. On iPhone it is at the bottom, on iPad at the top right.','inst.ios.s3':'Scroll the menu down and choose “Add to Home Screen”.','inst.ios.s4':'Tap “Add” in the top right corner. The FUSHA icon will appear on your screen.','inst.ios.done':'Done, I added it','inst.and.title':'How to install on Android','inst.and.s1':'Open the browser menu, the three dots ⋮ at the top right.','inst.and.s2':'Choose “Install app” or “Add to Home screen”.','inst.and.s3':'Confirm. The FUSHA icon will appear on your screen.','inst.close':'Close','inst.ok':'Installed. Look for the FUSHA icon on your screen.','upd.newv':'Update available: v{v}',
 'ex.syl':'How is this syllable read?','ex.sylpick':'Choose the syllable “{name}”','ex.form':'Which letter is this? (shape inside a word)','f.iso':'alone','f.ini':'start','f.med':'middle','f.fin':'end',
 'toast.copied':'Copied','toast.sel':'Selected. Copy it manually','toast.demo':'Demo: no payment is taken','toast.reset':'Progress reset'
},
ar:{
 'author.label':'المؤلف','tracks.title':'المسارات','tracks.lead':'مسار واحد: من الحرف الأول إلى العربية الفصيحة وقراءة القرآن بثقة','tracks.open':'افتح','st.open':'متاح','st.demo':'تجريبي','st.soon':'قريبًا','tracks.ijaza':'الإجازة لا يمنحها إلا شيخ مؤهَّل بسند متصل، وليست تلقائية عبر الذكاء الاصطناعي.',
 'read.title':'فحص القراءة','read.sub':'اقرأ الآية','read.src':'النص مأخوذ من ملاحظات المؤلف. في الخدمة يؤخذ النص من مصدر موثوق ويراجعه شيخ.','read.how':'يقيّم النظام قراءتك في حدود إمكانات التعرّف على الكلام ويشير إلى الأخطاء المحتملة، وتُحال مسائل التجويد الدقيقة إلى معلّم.','read.sample':'نموذج للملاحظات (تصوّر)','read.madd':'المدّ في «الرَّحْمَٰنِ»: مدّ طبيعي بمقدار حركتين. خطأ محتمل، يرجى التحقق.','read.teacher':'أرسل إلى معلّم (تصوّر)','read.sent':'تصوّر: في الخدمة يُرسل التسجيل إلى معلّم',
 'tab.path':'المسار','tab.review':'المراجعة','tab.tutor':'المعلّم','tab.me':'حسابي',
 'onb.welcome':'تعلّم العربية الفصحى مع Institute TOBA','onb.lang':'لغة الواجهة','onb.goal':'لماذا تريد تعلّم العربية؟',
 'goal.talk':'التواصل اليومي','goal.quran':'لغة القرآن','goal.work':'العمل والدراسة',
 'onb.level':'مستواك','level.zero':'مبتدئ من الصفر','level.letters':'أعرف الحروف','level.some':'أقرأ وأتحدث قليلًا',
 'onb.daily':'هدفك اليومي','daily.10':'خفيف · 10 XP','daily.20':'عادي · 20 XP','daily.40':'جاد · 40 XP',
 'onb.start':'ابدأ','onb.next':'التالي','onb.back':'رجوع',
 'home.goal':'هدف اليوم','home.goalval':'{a} من {b} XP','home.continue':'تابع','home.start':'ابدأ','home.lesson':'الدرس {n}','home.locked':'أكمل الدرس السابق أولًا','home.done':'مكتمل',
 'lesson.quit':'هل تريد مغادرة الدرس؟ سيُفقد تقدّم هذا الدرس.','lesson.stay':'ابقَ','lesson.leave':'مغادرة',
 'ex.sound':'ما صوت هذا الحرف؟','ex.letter':'اختر الحرف «{name}»','ex.tr':'ما معنى هذه الكلمة؟','ex.pickar':'اختر بالعربية: «{w}»','ex.listen':'ماذا سمعت؟','ex.match':'طابِق بين الأزواج','ex.order':'رتّب العبارة: «{w}»','ex.type':'اكتب بالعربية: «{w}»','ex.speak':'انطق بصوت عالٍ',
 'btn.check':'تحقّق','btn.cont':'التالي','btn.skip':'تخطَّ','fb.ok':'أحسنت!','fb.no':'ليست صحيحة. الإجابة الصحيحة:',
 'tts.off':'النطق العربي غير متاح على هذا الجهاز. ستستخدم الخدمة تسجيلات صوتية لمتحدثين أصليين.','tts.play':'استمع',
 'mic.rec':'سجّل','mic.stop':'أوقف','mic.again':'أعد','mic.err':'لا يمكن الوصول إلى الميكروفون. اسمح به من إعدادات المتصفح.','mic.len':'المدة: {s} ث','mic.level':'مستوى التسجيل: {p}%','mic.mock':'نموذج للنتيجة (تصوّر). في الخدمة سيقيّم مزوّد التعرّف على الكلام نطقك.','mic.overall':'التقييم العام','mic.hint':'نصيحة للنطق: يخرج الصوت من عمق الحلق ولا يلمس اللسان الأسنان.',
 'res.done':'اكتمل الدرس!','res.xp':'+{n} XP','res.acc':'الدقة: {n}%','res.learned':'عناصر جديدة في المراجعة: {n}','res.streak':'السلسلة: {n} يوم','res.back':'العودة إلى المسار',
 'rev.title':'المراجعة','rev.due':'للمراجعة اليوم: {n}','rev.learned':'العناصر المتعلَّمة: {n}','rev.start':'ابدأ المراجعة','rev.none':'لا شيء للمراجعة بعد. أكمل الدرس الأول.','rev.all':'راجع كل ما تعلّمته (تجريبي)','rev.why':'تعود الحروف والكلمات بعد 1 و3 و7 و14 يومًا لترسخ في الذاكرة.',
 'tutor.title':'المعلّم الذكي','tutor.demo':'تجريبي: ردود جاهزة. في الخدمة يعمل المعلّم بنموذج Claude ويفهم النص الحر.','tutor.pick':'اختر موقفًا','sc.meet':'التعارف','sc.cafe':'في المقهى','tutor.ph':'اكتب بالعربية…','tutor.send':'إرسال','tutor.hint':'تلميح','tutor.try':'قريب. جرّب هذا:','tutor.good':'ممتاز!','tutor.end':'انتهى الموقف','tutor.again':'موقف آخر','tutor.left':'المجاني اليوم: بقي {n} من {m}','tutor.tap':'اضغط على عبارة أو اكتب عبارتك',
 'pay.title':'الخطط','pay.region':'منطقتك','reg.gcc':'السعودية ودول الخليج','reg.mena':'الشرق الأوسط وشمال أفريقيا (خارج الخليج)','reg.west':'أمريكا الشمالية وأوروبا','reg.row':'بقية العالم','per':'/ شهر',
 'plan.free':'مجاني','plan.plus':'Plus',
 'free.1':'الوحدات 1-3: الحروف والتحيات والأصوات الصعبة','free.2':'مراجعة متباعدة','free.3':'5 رسائل يوميًا للمعلّم',
 'plus.1':'كل الوحدات والدروس الجديدة','plus.2':'معلّم ذكي بلا حدود','plus.3':'حوار صوتي وفحص النطق','plus.4':'خطة تعلّم شخصية',
 'pay.buy':'اشترك في Plus (تجريبي)','pay.cancel':'أوقف Plus (تجريبي)','pay.active':'Plus مفعّل (تجريبي)','pay.demo':'تجريبي: لا يتم أي دفع.','pay.illus':'الأسعار توضيحية؛ سنحدد الشبكة النهائية بعد النسخة التجريبية المغلقة.','pay.soon':'قريبًا',
 'soon.live':'دروس مع معلّمين','soon.q':'لغة القرآن','soon.c':'اختبارات وإجازة','soon.k':'للأطفال',
 'sheet.title':'يلزم Plus','sheet.unit':'هذه الوحدة ضمن Plus.','sheet.tutor':'انتهت رسائلك المجانية اليوم.','sheet.see':'عرض الخطط','sheet.later':'لاحقًا',
 'me.title':'حسابي','me.xp':'مجموع XP','me.streak':'السلسلة، أيام','me.lessons':'الدروس المكتملة','me.items':'العناصر المتعلَّمة','me.settings':'الإعدادات','me.lang':'اللغة','me.theme':'المظهر','theme.auto':'تلقائي','theme.light':'فاتح','theme.dark':'داكن','me.daily':'الهدف اليومي','me.demo':'تجريبي: افتح كل الدروس','me.reset':'مسح التقدّم','me.reset.q':'هل تريد مسح كل التقدّم؟','me.notes':'ملاحظات للإصدار القادم','me.notes.ph':'ما الذي يجب تعديله أو إضافته أو حذفه…','me.copy':'انسخ الملاحظات','me.plans':'الخطط وPlus','me.log':'الجديد','me.reco':'نوصي بالبدء من الوحدة {n}',
 'upd.title':'تم تحديث التطبيق إلى v{v}','upd.new':'يتوفر تحديث','upd.reload':'تحديث','upd.close':'حسنًا',
 'inst.title':'إضافة إلى الشاشة الرئيسية','inst.text':'يفتح كتطبيق عادي: بملء الشاشة وأسرع ويبدأ دون اتصال.','inst.android':'Android','inst.ios':'iPhone / iPad','inst.ios.title':'كيف تضيف على آيفون / آيباد','inst.ios.s1':'افتح هذه الصفحة في Safari (قد لا يوجد زر المشاركة في متصفحات أخرى).','inst.ios.s2':'اضغط «مشاركة»: المربع الذي يخرج منه سهم لأعلى. في آيفون يكون في الأسفل، وفي آيباد أعلى الشاشة.','inst.ios.s3':'مرّر القائمة لأسفل واختر «إضافة إلى الشاشة الرئيسية».','inst.ios.s4':'اضغط «إضافة» في الزاوية العلوية. ستظهر أيقونة FUSHA على شاشتك.','inst.ios.done':'تمّت الإضافة','inst.and.title':'كيف تثبّت على أندرويد','inst.and.s1':'افتح قائمة المتصفح: النقاط الثلاث ⋮ في الأعلى.','inst.and.s2':'اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».','inst.and.s3':'أكّد. ستظهر أيقونة FUSHA على شاشتك.','inst.close':'إغلاق','inst.ok':'تم التثبيت. ابحث عن أيقونة FUSHA على شاشتك.','upd.newv':'يتوفر تحديث: v{v}',
 'ex.syl':'كيف يُقرأ هذا المقطع؟','ex.sylpick':'اختر المقطع «{name}»','ex.form':'أي حرف هذا؟ (شكله داخل الكلمة)','f.iso':'منفرد','f.ini':'أول','f.med':'وسط','f.fin':'آخر',
 'toast.copied':'تم النسخ','toast.sel':'تم التحديد. انسخ يدويًا','toast.demo':'تجريبي: لا يتم أي دفع','toast.reset':'تم مسح التقدّم'
}};
const REGIONS = [['gcc', '14.99'], ['mena', '8.99'], ['west', '12.99'], ['row', '5.99']];

const AUTHOR = {ru:'Хамза аш-Шишани аль-Мадани', en:'Hamza ash-Shishani al-Madani', ar:'حمزة الشيشاني المدني'};
const TRACKS = [
 {id:'zero', st:'open', n:{ru:'Арабский с нуля', en:'Arabic from zero', ar:'العربية من الصفر'}, d:{ru:'Буквы, слова, грамматика, речь', en:'Letters, words, grammar, speech', ar:'الحروف والكلمات والقواعد والمحادثة'}},
 {id:'quran', st:'soon', n:{ru:'Чтение Корана', en:'Quran reading', ar:'قراءة القرآن'}, d:{ru:'От алиф до чтения мусхафа', en:'From alif to reading the mushaf', ar:'من الألف إلى قراءة المصحف'}},
 {id:'tajweed', st:'demo', n:{ru:'Таджвид с ИИ', en:'Tajweed with AI', ar:'التجويد بالذكاء الاصطناعي'}, d:{ru:'Практика и анализ произношения', en:'Practice and pronunciation analysis', ar:'تدريب وتحليل للنطق'}},
 {id:'hifz', st:'soon', n:{ru:'Хифз', en:'Hifz', ar:'الحفظ'}, d:{ru:'Заучивание и повторение', en:'Memorisation and review', ar:'الحفظ والمراجعة'}},
 {id:'kids', st:'soon', n:{ru:'FUSHA Kids', en:'FUSHA Kids', ar:'FUSHA Kids'}, d:{ru:'Игровое обучение детей', en:'Game-based learning for children', ar:'تعلّم الأطفال بالألعاب'}},
 {id:'academy', st:'soon', n:{ru:'Академия', en:'Academy', ar:'الأكاديمية'}, d:{ru:'Учителя, экзамены, сертификаты', en:'Teachers, exams, certificates', ar:'معلّمون واختبارات وشهادات'}}
];
const BASMALA = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
