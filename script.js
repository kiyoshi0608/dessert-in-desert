// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Album Cover Image Loading
    const img = document.querySelector('.album-cover');
    if (img) {
        img.src = 'media/cover.jpg';
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        img.onload = () => { img.style.opacity = '1'; };
    }

    // 2. Hamburger Menu Logic
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-links a');

    const closeMenu = () => {
        menuToggle.classList.remove('is-active');
        menuOverlay.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    };

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('is-active');
            menuOverlay.classList.toggle('is-open');
            document.body.classList.toggle('no-scroll');
        });

        if (menuClose) {
            menuClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMenu();
            });
        }

        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) { closeMenu(); }
        });

        menuLinks.forEach(link => { link.addEventListener('click', closeMenu); });
    }

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });

    // 4. Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.tour-item, .album-details, .comment-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ─────────────────────────────────────────────
    // 5. Language Switcher (i18n)
    // ─────────────────────────────────────────────
    const translations = {
        ja: {
            'catchphrase': '砂漠の中で見つけた、7つのデザート',
            'album-desc': '2026年、SABOTENが贈る<br>ニューミニアルバム「Dessert in Desert」<br>砂漠のような日々の中で見つけた<br>希望、勇気、愛。<br>心の栄養となる、7つのデザート。<br>結成27年目の最高傑作。',
            'buy-btn': '購入する',
            'tour-sub': '全国ツアー開催決定',
            'track-1': 'さよなら、ありがとう',
            'track-2': 'リユニバース',
            'track-3': 'REMEMBER YOU <small>- 忌野 清志郎 cover -</small>',
            'track-4': '何事もなかった顔',
            'track-5': 'タイトロープ',
            'track-6': 'つぼみ',
            'track-7': '赤春',
            'comment-kiyoshi': '今作は喜怒哀楽に寄り添うことをテーマに楽曲作り、楽曲選びを慎重に行いました！重すぎず軽すぎない、メンバーがとてもリラックスした状態で録音出来たと思います！<br>そして音質に関してはより人の演奏らしさを大切に、あえて無駄な加工をせずにバンドの空気感が伝わる仕上がりにこだわりました！<br>27年目のSABOTENの最高傑作をぜひ楽しんでください♪',
            'comment-yasso': '制作の時点で選曲からかなり悩み、最終当初の予定より1曲増え選曲しました。<br>今回はコーラスワークにサケのアイデアも入れて作り上げました。<br>"Dessert in Desert"<br>1曲ごとに色んな表情があり、アルバムを通して聴き応え抜群です。<br>皆んなに喜んでもらえたら元気になってくれたら嬉しいです。<br>聴いてくれているみんなの顔を想像すると、それだけでワクワクします。',
            'comment-sakecode': 'とにかくおもしろいCDが出来ました。全曲ともそれぞれの表情が引き立ってそれぞれが引き立て合っておもしろさがすごいです。<br>作ってる時から録ってる時の雰囲気も詰める事が出来た気がします。<br>ライブでの表情の変化も楽しみです。<br>Dessert in Desertで遊びましょう。',
            'btn-label': 'EN',
            'btn-aria': 'Switch to English',
            'html-lang': 'ja'
        },
        en: {
            'catchphrase': 'Seven Desserts Found in the Desert',
            'album-desc': 'In 2026, SABOTEN presents their new mini album<br>"Dessert in Desert".<br><br>Within the desert-like days of life,<br>we discovered hope, courage, and love.<br><br>Seven desserts that nourish the heart.<br><br>The finest work from SABOTEN<br>in their 27th year as a band.',
            'buy-btn': 'Buy Now',
            'tour-sub': '"Dessert in Desert" Japan Tour — Coming Soon',
            'track-1': 'Goodbye, Thank You',
            'track-2': 'Reuniverse',
            'track-3': 'Remember You <small>(Kiyoshi Oshino Cover)</small>',
            'track-4': 'A Straight Face',
            'track-5': 'Tightrope',
            'track-6': 'The Bud',
            'track-7': 'Sekishun',
            'comment-kiyoshi': "For this album, we focused on creating music<br>that gently connects with people's emotions.<br><br>We carefully selected each song so the album<br>would feel neither too heavy nor too light.<br><br>During recording, the band was incredibly relaxed,<br>and I think that atmosphere is captured in the sound.<br><br>Instead of adding unnecessary production,<br>we valued the natural performance of the band<br>so you can truly feel our energy.<br><br>Please enjoy what we believe<br>is SABOTEN's best work in our 27th year.",
            'comment-yasso': "While making this album,<br>we struggled quite a bit choosing the songs,<br>and in the end we added one more track<br>than originally planned.<br><br>For the chorus work this time,<br>Sake brought in some great ideas<br>that helped shape the final sound.<br><br>Each song carries its own emotion,<br>and the album flows beautifully as a whole.<br><br>If this music brings joy and energy<br>to everyone listening,<br>that would make us truly happy.<br><br>Just imagining the faces of people listening<br>makes me excited.",
            'comment-sakecode': "This turned out to be a really fun album.<br><br>Every track has its own personality,<br>and together they create something<br>very unique and exciting.<br><br>I think the atmosphere we had<br>while making and recording this music<br>is fully captured in the album.<br><br>I'm also really looking forward<br>to how these songs will evolve live.<br><br>Let's enjoy \"Dessert in Desert\" together.",
            'btn-label': 'JA',
            'btn-aria': '日本語に切り替え',
            'html-lang': 'en'
        }
    };

    const langBtn = document.getElementById('langBtn');

    const applyLanguage = (lang, animate) => {
        const t = translations[lang];
        if (!t) return;

        document.documentElement.lang = t['html-lang'];
        const targets = document.querySelectorAll('[data-i18n]');

        if (animate) {
            targets.forEach(el => {
                el.style.transition = 'opacity 0.2s ease';
                el.style.opacity = '0';
            });
            setTimeout(() => {
                targets.forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (t[key] !== undefined) el.innerHTML = t[key];
                });
                requestAnimationFrame(() => {
                    targets.forEach(el => { el.style.opacity = '1'; });
                });
            }, 220);
        } else {
            targets.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (t[key] !== undefined) el.innerHTML = t[key];
            });
        }

        if (langBtn) {
            // ✅ textContent は設定しない（子spanを上書きしてしまうため）
            langBtn.setAttribute('aria-label', t['btn-aria']);
            langBtn.dataset.lang = lang;
            langBtn.classList.toggle('lang-en-active', lang === 'en');
        }

        localStorage.setItem('saboten-lang', lang);
    };

    // Load saved preference (default: Japanese)
    const savedLang = localStorage.getItem('saboten-lang') || 'ja';
    applyLanguage(savedLang, false);

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const current = langBtn.dataset.lang || 'ja';
            applyLanguage(current === 'ja' ? 'en' : 'ja', true);
        });
    }
});

// ─────────────────────────────────────────────
// Parallax effect for hero background
// ─────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) { hero.style.transform = `translateY(${scrolled * 0.4}px)`; }
});

// ─────────────────────────────────────────────
// Ripple Effect for buttons
// ─────────────────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            this.appendChild(ripple);
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            setTimeout(() => ripple.remove(), 600);
        }
    });
});
