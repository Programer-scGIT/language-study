// ================== app.js ==================

document.addEventListener('DOMContentLoaded', () => {

    // Элементы
    const startScreen = document.getElementById('startScreen');
    const quizScreen = document.getElementById('quizScreen');
    const questionEl = document.getElementById('question');
    const textInput = document.getElementById('textInput');
    const submitBtn = document.getElementById('submitBtn');
    const resultEl = document.getElementById('result');
    const currentEl = document.getElementById('current');
    const totalEl = document.getElementById('total');
    const themeBtn = document.getElementById('themeBtn');


    console.log('startScreen:', startScreen);
    console.log('quizScreen:', quizScreen);
    console.log('themeBtn:', themeBtn);


    let currentLang = null;
    let currentQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let mistakes = [];

    // ================== ВОПРОСЫ ==================
    const questionsDB = {
        ru: [ //  Русский
            {q: "Translate 'house' to Russian", a: ["дом"]},
            {q: "Translate 'cat' to Russian", a: ["кот", "кошка"]},
            {q: "Translate 'dog' to Russian", a: ["собака"]},
            {q: "Translate 'earthquake' to Russian", a: ["землетрясение"]},
            {q: "Translate 'water' to Russian", a: ["вода"]},
            {q: "Translate 'book' to Russian", a: ["книга", "книжка"]},
            {q: "Translate 'sun' to Russian", a: ["солнце"]},
            {q: "Translate 'school' to Russian", a: ["школа"]},
            {q: "Translate 'car' to Russian", a: ["машина", "автомобиль"]},
            {q: "Translate 'tree' to Russian", a: ["дерево"]},
            {q: "Translate 'i' to Russian", a: ["я"]},
            {q: "Translate 'they' to Russian", a: ["они"]},
            {q: "Translate 'free' to Russian", a: ["бесплатно"]},
            {q: "Translate 'weather' to Russian", a: ["погода"]},
            {q: "Translate 'arm' to Russian", a: ["рука"]},

        ],
        en: [ //  Английский
            {q: "Переведите 'дом' на английский", a: ["house"]},
            {q: "Переведите 'кот' на английский", a: ["cat"]},
            {q: "Переведите 'свобода' на английский", a: ["freedom"]},
            {q: "Переведите 'страна' на английский", a: ["country"]},
            {q: "Переведите 'тетрадь' на английский", a: ["notebook"]},
            {q: "Переведите 'ноутбук' на английский", a: ["laptop"]},
            {q: "Переведите 'мусор' на английский", a: ["trash", "garbage", "litter"]},
            {q: "Переведите 'деревня' на английский", a: ["village"]},
            {q: "Переведите 'семья' на английский", a: ["family"]},
            {q: "Переведите 'они' на английский", a: ["they"]},
            {q: "Переведите 'я' на английский", a: ["i"]},
            {q: "Переведите 'спасибо' на английский", a: ["Thank you", "thanks"]},
            {q: "Переведите 'ты' на английский", a: ["you", "thee"]},
            {q: "Переведите 'работа' на английский", a: ["work"]},
            {q: "Переведите 'изучение' на английский", a: ["studying"]},

        ],
        fr: [ // Французский
            {q: "Translate 'house' to French", a: ["maison"]},
            {q: "Translate 'freedom' to French", a: ["liberté", "liberте", "liberte"]},
            {q: "Translate 'apple' to French", a: ["pomme"]},
            {q: "Translate 'living room' to French", a: ["salon"]},
            {q: "Translate 'book' to French", a: ["livre"]},
            {q: "Translate 'sun' to French", a: ["soleil"]},
            {q: "Translate 'tree' to French", a: ["arbre"]},
            {q: "Translate 'car' to French", a: ["voiture"]},
            {q: "Translate 'cat' to French", a: ["chat"]},
            {q: "Translate 'pen' to French", a: ["stylo"]},
            {q: "Translate 'studying' to French", a: ["étudier", "etydje", "etyudje"]},
            {q: "Translate 'notebook' to French", a: ["carnet de notes"]},
            {q: "Translate 'laptop' to French", a: ["ordinateur portable"]},
            {q: "Translate 'Go to the store' to French", a: ["Aller au magasin"]},

        ],
        es: [ //  Испанский
            {q: "Translate 'house' to Spanish", a: ["casa"]},
            {q: "Translate 'cat' to Spanish", a: ["gato"]},
            {q: "Translate 'dog' to Spanish", a: ["perro"]},
            {q: "Translate 'apple' to Spanish", a: ["manzana"]},
            {q: "Translate 'water' to Spanish", a: ["agua"]},
            {q: "Translate 'book' to Spanish", a: ["libro"]},
            {q: "Translate 'sun' to Spanish", a: ["sol"]},
            {q: "Translate 'school' to Spanish", a: ["escuela"]},
            {q: "Translate 'car' to Spanish", a: ["coche", "auto"]},
            {q: "Translate 'tree' to Spanish", a: ["árbol", "arbol"]},
            {q: "Translate 'go to the store' to Spanish", a: ["árbol", "arbol"]},
            {q: "Translate 'go to the store' to Spanish", a: ["ir a la tienda"]},
        ],
        sv: [ // Шведский
            {q: "Translate 'house' to Swedish", a: ["hus"]},
            {q: "Translate 'cat' to Swedish", a: ["katt"]},
            {q: "Translate 'dog' to Swedish", a: ["hund"]},
            {q: "Translate 'apple' to Swedish", a: ["äpple", "epple"]},
            {q: "Translate 'water' to Swedish", a: ["vatten"]},
            {q: "Translate 'book' to Swedish", a: ["bok"]},
            {q: "Translate 'sun' to Swedish", a: ["sol"]},
            {q: "Translate 'school' to Swedish", a: ["skola"]},
            {q: "Translate 'car' to Swedish", a: ["bil"]},
            {q: "Translate 'tree' to Swedish", a: ["träd", "trad"]},
        ],
        tt: [ // Татарский
            {q: "Translate 'hi' to Tatar", a: ["сәлам", "салам"]},
            {q: "Translate 'cat' to Tatar", a: ["мәче", "мэче"]},
            {q: "Translate 'dog' to Tatar", a: ["эт"]},
            {q: "Translate 'water' to Tatar", a: ["су"]},
            {q: "Translate 'book' to Tatar", a: ["китап"]},
            {q: "Translate 'sun' to Tatar", a: ["кояш"]},
            {q: "Translate 'school' to Tatar", a: ["мәктәп", "мектеп"]},
            {q: "Translate 'car' to Tatar", a: ["машина"]},
            {q: "Translate 'tree' to Tatar", a: ["агач"]},
            {q: "Translate 'apple' to Tatar", a: ["алма"]},
        ],
        id: [ // Индонезийский
            {q: "Translate 'house' to Indonesian", a: ["rumah"]},
            {q: "Translate 'cat' to Indonesian", a: ["kucing"]},
            {q: "Translate 'dog' to Indonesian", a: ["anjing"]},
            {q: "Translate 'water' to Indonesian", a: ["air"]},
            {q: "Translate 'book' to Indonesian", a: ["buku"]},
            {q: "Translate 'sun' to Indonesian", a: ["matahari"]},
            {q: "Translate 'school' to Indonesian", a: ["sekolah"]},
            {q: "Translate 'car' to Indonesian", a: ["mobil"]},
            {q: "Translate 'tree' to Indonesian", a: ["pohon"]},
            {q: "Translate 'apple' to Indonesian", a: ["apel"]},
            {q: "Translate 'friend' to Indonesian", a: ["teman"]},
        ],
        be: [ // Белорусский
            {q: "Translate 'house' to Belarusian", a: ["дом", "хата"]},
            {q: "Translate 'cat' to Belarusian", a: ["кот", "кошка"]},
            {q: "Translate 'dog' to Belarusian", a: ["сабака"]},
            {q: "Translate 'water' to Belarusian", a: ["вада"]},
            {q: "Translate 'book' to Belarusian", a: ["кнiга", "кніга"]},
            {q: "Translate 'sun' to Belarusian", a: ["сонца"]},
            {q: "Translate 'school' to Belarusian", a: ["школа"]},
            {q: "Translate 'car' to Belarusian", a: ["машына", "аўтамабіль"]},
            {q: "Translate 'tree' to Belarusian", a: ["дрэва"]},
            {q: "Translate 'apple' to Belarusian", a: ["яблык"]},
            {q: "Translate 'friend' to Belarusian", a: ["сябар"]},
            {q: "Translate 'hi' to Belarusian", a: ["прывітанне", "прывiтанне"]},
        ],
        hi: [ // Хинди
            {q: "Translate 'house' to Hindi", a: ["ghar", "घर"]},
            {q: "Translate 'cat' to Hindi", a: ["billee", "बिल्ली"]},
            {q: "Translate 'dog' to Hindi", a: ["kutta", "कुत्ता"]},
            {q: "Translate 'water' to Hindi", a: ["pani", "पानी"]},
            {q: "Translate 'book' to Hindi", a: ["kitaab", "किताब", "kitab"]},
            {q: "Translate 'sun' to Hindi", a: ["sooraj", "सूरज"]},
            {q: "Translate 'school' to Hindi", a: ["vidyaalay", "विद्यालय"]},
            {q: "Translate 'car' to Hindi", a: ["kaar", "कार", "kar"]},
            {q: "Translate 'tree' to Hindi", a: ["ped", "पेड़"]},
            {q: "Translate 'apple' to Hindi", a: ["seb", "सेब"]},
            {q: "Translate 'friend' to Hindi", a: ["dost", "दोस्त"]},
        ],
        sa: [ // Арабский
            { q: "Translate 'hello' to Arabic", a: ["marhaba", "marhaban", "مرحبا", "مرحباً", "مرحبًا", "mrhban", "مرحب"] },
            { q: "Translate 'house' to Arabic", a: ["bayt", "بيت"] },
            { q: "Translate 'cat' to Arabic", a: ["qit", "قط"] },
            { q: "Translate 'water' to Arabic", a: ["ma", "ماء"] },
            { q: "Translate 'book' to Arabic", a: ["kitab", "كتاب"] },
            { q: "Translate 'sun' to Arabic", a: ["shams", "شمس"] },
            { q: "Translate 'school' to Arabic", a: ["madrasa", "مدرسة"] },
            { q: "Translate 'car' to Arabic", a: ["sayyara", "سيارة"] },
            { q: "Translate 'tree' to Arabic", a: ["shajara", "شجرة"] },
            { q: "Translate 'apple' to Arabic", a: ["tuffah", "تفاح"] },
            { q: "Translate 'friend' to Arabic", a: ["sadiq", "صديق"] }
        ],
        pt: [ // Португальский
            { q: "Translate 'hello' to Portuguese", a: ["olá", "ola", "oi"] },
            { q: "Translate 'house' to Portuguese", a: ["casa"] },
            { q: "Translate 'cat' to Portuguese", a: ["gato"] },
            { q: "Translate 'water' to Portuguese", a: ["água", "agua"] },
            { q: "Translate 'book' to Portuguese", a: ["livro"] },
            { q: "Translate 'sun' to Portuguese", a: ["sol"] },
            { q: "Translate 'school' to Portuguese", a: ["escola"] },
            { q: "Translate 'car' to Portuguese", a: ["carro"] },
            { q: "Translate 'tree' to Portuguese", a: ["árvore", "arvore"] },
            { q: "Translate 'apple' to Portuguese", a: ["maçã", "maca"] },
            { q: "Translate 'friend' to Portuguese", a: ["amigo", "amiga"] }
        ],
        zh: [ // Китайский
            { q: "Translate 'hello' to Chinese", a: ["ni hao", "nihao", "你好"] },
            { q: "Translate 'house' to Chinese", a: ["fangzi", "房子"] },
            { q: "Translate 'cat' to Chinese", a: ["mao", "猫"] },
            { q: "Translate 'water' to Chinese", a: ["shui", "水"] },
            { q: "Translate 'book' to Chinese", a: ["shu", "书", "shumu"] },
            { q: "Translate 'sun' to Chinese", a: ["taiyang", "太阳"] },
            { q: "Translate 'school' to Chinese", a: ["xuexiao", "学校"] },
            { q: "Translate 'car' to Chinese", a: ["qiche", "che", "汽车"] },
            { q: "Translate 'tree' to Chinese", a: ["shu", "树"] },
            { q: "Translate 'apple' to Chinese", a: ["pingguo", "苹果"] },
            { q: "Translate 'friend' to Chinese", a: ["pengyou", "朋友"] }
        ],
        de: [  // Немецкий
            { q: "Translate 'hello' to German", a: ["hallo", "guten tag"] },
            { q: "Translate 'house' to German", a: ["haus"] },
            { q: "Translate 'cat' to German", a: ["katze"] },
            { q: "Translate 'water' to German", a: ["wasser"] },
            { q: "Translate 'book' to German", a: ["buch"] },
            { q: "Translate 'sun' to German", a: ["sonne"] },
            { q: "Translate 'school' to German", a: ["schule"] },
            { q: "Translate 'car' to German", a: ["auto", "wagen"] },
            { q: "Translate 'tree' to German", a: ["baum"] },
            { q: "Translate 'apple' to German", a: ["apfel"] },
            { q: "Translate 'friend' to German", a: ["freund", "freundin"] },
            { q: "Translate 'oil' to German", a: ["öl", "oel"] },
            { q: "Translate 'exercise' to German", a: ["übung", "uebung"] },
            { q: "Translate 'cheese' to German", a: ["käse", "kaese"] },
            { q: "Translate 'train' to German", a: ["zug"] }

        ],
        ja: [ // Японский
            { q: "Translate 'hello' to Japanese", a: ["konnichiwa", "こんにちは"] },
            { q: "Translate 'house' to Japanese", a: ["ie", "uchi", "家"] },
            { q: "Translate 'cat' to Japanese", a: ["neko", "猫"] },
            { q: "Translate 'water' to Japanese", a: ["mizu", "水"] },
            { q: "Translate 'book' to Japanese", a: ["hon", "本"] },
            { q: "Translate 'sun' to Japanese", a: ["taiyou", "hi", "太陽"] },
            { q: "Translate 'school' to Japanese", a: ["gakkou", "学校"] },
            { q: "Translate 'car' to Japanese", a: ["kuruma", "車"] },
            { q: "Translate 'tree' to Japanese", a: ["ki", "木"] },
            { q: "Translate 'apple' to Japanese", a: ["ringo", "りんご"] },
            { q: "Translate 'friend' to Japanese", a: ["tomodachi", "友達"] }
        ],
        pl: [ // Польский
            { q: "Translate 'shop' to Polish", a: ["Sklep"] },
            { q: "Translate 'fruits' to Polish", a: ["Owoce"] },
            { q: "Translate 'forget' to Polish", a: ["Zapomnieć", "zapom-nyech", "zapomnyech", "zapomniech"] },
            { q: "Translate 'carpet' to Polish", a: ["Dywan"] },
            { q: "Translate 'book' to Polish", a: ["książka", "kshonshka"] },
            { q: "Translate 'sun' to Polish", a: ["słońce", "swon-tse", "swontse"] },
            { q: "Translate 'school' to Polish", a: ["szkoła", "shkowa"] },
            { q: "Translate 'car' to Polish", a: ["samochód", "samokhood"] },
            { q: "Translate 'tree' to Polish", a: ["drzewo", "dzhevo"] },
            { q: "Translate 'apple' to Polish", a: ["jabłko", "yablko", "yabvko"] },
            { q: "Translate 'friend' to Polish", a: ["przyjaciel", "pshizhyatsyel"] }
        ]



    };

    // ================== ТЕМА ==================
    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }


    if (localStorage.getItem('darkMode') === 'true') {
        setTheme(true);
    } else {
        setTheme(false);
    }


    themeBtn.onclick = () => {
        const isDark = !document.body.classList.contains('dark');
        setTheme(isDark);
    };

    // ================== ОЗВУЧКА ==================
    function speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);


            if (currentLang === 'ru' || currentLang === 'be' || currentLang === 'tt' || currentLang === 'en') {
                utterance.lang = 'ru-RU';
            } else if (currentLang === 'fr') utterance.lang = 'fr-FR';
            else if (currentLang === 'es') utterance.lang = 'es-ES';
            else if (currentLang === 'id') utterance.lang = 'id-ID';
            else if (currentLang === 'en') utterance.lang = 'en-US';

            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        } else {
            alert("Озвучка не поддерживается вашим браузером");
        }
    }

    window.speakQuestion = () => {
        if (currentQuestions[currentIndex]) {
            speak(currentQuestions[currentIndex].q);
        }
    };
    // ================== ПОДСКАЗКА ==================
    window.giveHint = () => {
        const q = currentQuestions[currentIndex];
        const correct = q.a[0];
        const hint = correct.length > 3
            ? correct.substring(0, Math.ceil(correct.length / 2)) + "..."
            : correct[0] + " _ _ _";

        resultEl.innerHTML = `<span style="color: #f59e0b;">💡 Подсказка /💡 Clue: <b>${hint}</b></span>`;
    };

    // ================== НАСТРОЙКИ ==================


    window.toggleMusic = () => {
        const audio = document.getElementById('bg-music');
        const btn = document.getElementById('musicToggleBtn');

        if (audio.paused) {
            audio.play();
            btn.innerText = "Выключить музыку";
        } else {
            audio.pause();
            btn.innerText = "Включить музыку";
        }
    };


    function showSettings() {
        function showSettings() {
            const modal = document.createElement('div');
            const audio = document.getElementById('bg-music');
            const musicStatus = audio.paused ? "Включить музыку" : "Выключить музыку";


            document.body.classList.add('modal-open');

            modal.id = 'settingsModal';

            modal.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: var(--card); padding: 30px; border-radius: 16px; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 2000; text-align: center; min-width: 300px;
    `;
            modal.innerHTML = `
        <h2 style="margin-top:0">Настройки</h2>
        <p><strong>Тема оформления:</strong></p>
        <button class="langBtn" onclick="setTheme(false)">Светлая</button>
        <button class="langBtn" onclick="setTheme(true)">Тёмная</button>
        <p><strong>Звук:</strong></p>
        <button id="musicToggleBtn" class="langBtn" onclick="toggleMusic()">${musicStatus}</button>
        <br><br>
        <button class="langBtn" onclick="closeSettings()" style="background: #2ecc71; color: white;">Закрыть</button>
    `;
            document.body.appendChild(modal);
        }


        window.closeSettings = () => {
            const modal = document.getElementById('settingsModal');
            if (modal) {
                modal.remove();
                document.body.classList.remove('modal-open');
            }
        };

        const modal = document.createElement('div');
        const audio = document.getElementById('bg-music');


        const musicStatus = audio.paused ? "Включить музыку" : "Выключить музыку";

        modal.id = 'settingsModal';
        modal.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: var(--card); padding: 30px; border-radius: 16px; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 1000; text-align: center; min-width: 300px;
    `;
        modal.innerHTML = `
        <h2>Настройки</h2>
        <p><strong>Тема оформления:</strong></p>
        <button onclick="setTheme(false)" style="margin: 8px; padding: 10px 20px;">Светлая</button>
        <button onclick="setTheme(true)" style="margin: 8px; padding: 10px 20px;">Тёмная</button>
        <br><br>
        <p><strong>Звук:</strong></p>
     
        <button id="musicToggleBtn" onclick="toggleMusic()" style="margin: 8px; padding: 10px 20px;">${musicStatus}</button>
        <br><br>
        <button onclick="closeSettings()" style="padding: 10px 25px;">Закрыть</button>
    `;
        document.body.appendChild(modal);
    }

    window.setTheme = setTheme;
    window.closeSettings = () => {
        const modal = document.getElementById('settingsModal');
        if (modal) modal.remove();
    };

    // ================== ВЫБОР ЯЗЫКА ==================
    document.querySelectorAll('.langBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;


            document.getElementById('backBtn').style.display = 'block';

            startQuiz();
        });
    });


    // ================== КВИЗ ==================

    function startQuiz() {
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');

        currentQuestions = [...questionsDB[currentLang]];
        shuffle(currentQuestions);

        currentIndex = 0;
        score = 0;
        mistakes = [];


        currentEl.textContent = 1;
        totalEl.textContent = currentQuestions.length;

        resultEl.innerHTML = '';
        showQuestion();
    }

    function showQuestion() {
        const q = currentQuestions[currentIndex];


        quizScreen.classList.remove('question-animate');
        void quizScreen.offsetWidth;
        quizScreen.classList.add('question-animate');


        questionEl.innerHTML = `
            ${q.q}
            <button onclick="speakQuestion()" class="speak-btn" title="Озвучить вопрос">🔊</button>
        `;

        textInput.value = '';
        textInput.focus();
        resultEl.innerHTML = '';
    }
    function playConfettiSound() {
        const audio = new Audio('music/confetti-pop-sound.mp3');
        audio.volume = 0.2;
        audio.play().catch(err => console.log("Ошибка воспроизведения звука:", err));
    }

    function checkAnswer() {
        const q = currentQuestions[currentIndex];
        const userAnswer = textInput.value.trim().toLowerCase();
        const isCorrect = q.a.some(ans => ans.toLowerCase() === userAnswer);

        if (isCorrect) {
            score++;
            resultEl.innerHTML = `<span style="color: var(--green);">✅ Правильно! / true! </span>`;
            spawnConfetti(30);
            playConfettiSound();
        } else {
            mistakes.push({
                question: q.q,
                correct: q.a[0],
                user: userAnswer || "пусто\empty"
            });
            resultEl.innerHTML = `<span style="color: #ef4444;">❌ Неправильно / false <br>Правильно: <b>${q.a[0]}</b></span>`;
        }

        currentIndex++;

        if (currentIndex < currentQuestions.length) {
            setTimeout(() => {
                currentEl.textContent = currentIndex + 1;
                showQuestion();
            }, 2000);
        } else {
            setTimeout(() => {
                showFinalResult();
                const percent = Math.round((score / currentQuestions.length) * 100);
                if (percent === 100) {
                    spawnConfetti(100);
                    playConfettiSound();
                }
            }, 2000);
        }
    }

    function showFinalResult() {
        const percent = Math.round((score / currentQuestions.length) * 100);
        let message = percent === 100 ? "🏆 Идеально! Ты гений! / Perfect! you are a genius!" :
            percent >= 80 ? "Отличный результат! 👏 / Excellent!" :
                percent >= 55 ? "Хорошо! Продолжай учить ✊/ Good!" : "Не сдавайся! 💪 / Try again";


        let mistakesHTML = '';
        if (mistakes.length > 0) {
            mistakesHTML = `
                <div style="margin-top: 30px; text-align: left; background: rgba(0,0,0,0.1); padding: 15px; border-radius: 10px; max-height: 200px; overflow-y: auto;">
                    <h3 style="font-size: 1rem; margin-bottom: 10px;">Работа над ошибками \ Work on mistakes:</h3>
                    ${mistakes.map(m => `
                        <p style="font-size: 0.9rem; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
                            ❓ ${m.question} → <span style="color: var(--green);">${m.correct}</span> 
                            <br><small style="opacity: 0.6;">Твой ответ \ Your answer : <span style="color: #ef4444;">${m.user}</span></small>
                        </p>
                    `).join('')}
                </div>
            `;
        }

        quizScreen.innerHTML = `
            <h2>Тест завершён! / Test completed!</h2>
            <div style="font-size: 4.5rem; font-weight: 700; margin: 10px 0; color: var(--green);">
                ${score} / ${currentQuestions.length}
            </div>
            <div style="font-size: 2rem; margin-bottom: 10px;">${percent}%</div>
            <p style="font-size: 1.1rem;">${message}</p>
            
            ${mistakesHTML}

            <button onclick="location.reload()" style="margin-top: 25px; padding: 14px 40px; font-size: 1.1rem;">
                Пройти снова / Restart
            </button>
        `;
    }
    function spawnConfetti(count = 50) {
        const audio = new Audio('music/confetti-pop-sound.mp3');
        audio.volume = 0.2;
        audio.play().catch(err => console.log("Ошибка воспроизведения звука:", err));

        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            const colors = ['#f94144','#f3722c','#f9c74f','#90be6d','#43aa8b','#577590'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.width = confetti.style.height = (5 + Math.random() * 10) + 'px';
            confetti.style.animationDuration = 2 + Math.random()*3 + 's';
            document.body.appendChild(confetti);
            confetti.addEventListener('animationend', () => confetti.remove());
        }
    }

    // ================== СОБЫТИЯ ==================
    submitBtn.addEventListener('click', checkAnswer);
    textInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') checkAnswer();
    });

    const settingsBtn = document.getElementById('settingsBtn');

    if (settingsBtn) {
        settingsBtn.onclick = showSettings;
    }

    // ЛОГИКА КНОПКИ НАЗАД (ВСТАВЛЕНО СЮДА)
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            quizScreen.classList.add('hidden');
            startScreen.classList.remove('hidden');
            backBtn.style.display = 'none';

            textInput.value = '';
            resultEl.innerHTML = '';
        });
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});

const bgMusic = document.getElementById('bg-music');

document.body.addEventListener('click', () => {
    bgMusic.volume = 0.1; // громкость тише
    bgMusic.play().catch(e => console.log("Ошибка воспроизведения фоновой музыки:", e));
}, { once: true });

// ================== ВЫБОР ЯЗЫКА ==================
document.querySelectorAll('.langBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentLang = btn.dataset.lang;
        document.getElementById('backBtn').style.display = "block";
        startQuiz();
    });
    // Кнопка Назад
    document.getElementById('backBtn').addEventListener('click', () => {
        document.getElementById('quizScreen').classList.add('hidden');
        document.getElementById('startScreen').classList.remove('hidden');
        document.getElementById('backBtn').style.display = "none";
    });
});


function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    toggleBackButton(true);


}


function goBackToStart() {
    quizScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    toggleBackButton(false);
}


backBtn.addEventListener('click', goBackToStart);
function toggleBackButton(show) {
    const backButton = document.getElementById('backBtn');
    if (show) {
        backButton.classList.remove('hidden');
    } else {
        backButton.classList.add('hidden');
    }
}
function createFireflies() {

    const container = document.getElementById('fireflies-root');
    if (!container) return;


    const oldFireflies = container.querySelectorAll('.firefly');
    oldFireflies.forEach(f => f.remove());

    const count = 25; // Количество искорок
    for (let i = 0; i < count; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';

        firefly.style.top = Math.random() * 100 + '%';
        firefly.style.right = Math.random() * 100 + '%';

        firefly.style.animationDelay = Math.random() * 8 + 's';
        firefly.style.animationDuration = (Math.random() * 4 + 6) + 's';

        container.appendChild(firefly);
    }
}


window.addEventListener('load', createFireflies);

// ЖИВОЙ ПОИСК ЯЗЫКОВ
document.getElementById('langSearch').addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase(); // Берем текст из поиска маленькими буквами
    const buttons = document.querySelectorAll('.langBtn'); // Находим все кнопки языков

    buttons.forEach(button => {
        const buttonText = button.textContent.toLowerCase(); // Берем текст кнопки (например, "русский")

        if (buttonText.includes(searchText)) {
            button.style.display = 'block'; // Показываем кнопку, если текст совпал
        } else {
            button.style.display = 'none';  // Скрываем кнопку, если текст не совпал
        }
    });

});
