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
            'game-desc': '落ちてくるデザートをキャッチしよう！<br>サボテンには気をつけてね！<br>7つのデザートを集めるとクリア！',
            'game-start': 'GAME START',
            'game-over-desc': 'サボテンに当たっちゃった...',
            'game-retry': 'RETRY',
            'game-clear-desc': '7つのデザートを見つけた！<br>おめでとう！限定壁紙をプレゼント！',
            'game-dl': '壁紙をダウンロード',
            'game-play-again': 'もう一度プレイ',
            'game-rules-title': '【遊び方＆ルール】',
            'game-rule-1': '空から降ってくるデザート🍰🍩をキャッチしよう！',
            'game-rule-2': '左右キー（スマホは画面下の◀▶）でキヨシさんを動かします。',
            'game-rule-3': 'サボテン🌵に当たるとライフ減少！3回当たるとゲームオーバー。',
            'game-rule-4': '7つのデザートを集めるとクリア！特製壁紙をプレゼント🎁',
            'game-select-char': 'キャラクターを選んでね',
            'bundle-desc': '数量限定！特別なバンドルセットのご予約・ご購入はこちらから！',
            'bundle-buy-btn': 'バンドルセットを予約・購入する',
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
            'track-3': 'REMEMBER YOU <small>- Kiyoshiro Imawano Cover -</small>',
            'track-4': 'A Straight Face',
            'track-5': 'Tightrope',
            'track-6': 'The Bud',
            'track-7': 'Sekishun',
            'comment-kiyoshi': "For this album, we focused on creating music<br>that gently connects with people's emotions.<br><br>We carefully selected each song so the album<br>would feel neither too heavy nor too light.<br><br>During recording, the band was incredibly relaxed,<br>and I think that atmosphere is captured in the sound.<br><br>Instead of adding unnecessary production,<br>we valued the natural performance of the band<br>so you can truly feel our energy.<br><br>Please enjoy what we believe<br>is SABOTEN's best work in our 27th year.",
            'comment-yasso': "While making this album,<br>we struggled quite a bit choosing the songs,<br>and in the end we added one more track<br>than originally planned.<br><br>For the chorus work this time,<br>Sake brought in some great ideas<br>that helped shape the final sound.<br><br>Each song carries its own emotion,<br>and the album flows beautifully as a whole.<br><br>If this music brings joy and energy<br>to everyone listening,<br>that would make us truly happy.<br><br>Just imagining the faces of people listening<br>makes me excited.",
            'comment-sakecode': "This turned out to be a really fun album.<br><br>Every track has its own personality,<br>and together they create something<br>very unique and exciting.<br><br>I think the atmosphere we had<br>while making and recording this music<br>is fully captured in the album.<br><br>I'm also really looking forward<br>to how these songs will evolve live.<br><br>Let's enjoy \"Dessert in Desert\" together.",
            'game-desc': 'Catch the falling desserts!<br>Watch out for the cacti!<br>Collect 7 desserts to clear the game!',
            'game-start': 'GAME START',
            'game-over-desc': 'You hit a cactus...',
            'game-retry': 'RETRY',
            'game-clear-desc': 'You found 7 desserts!<br>Congratulations! Here is your exclusive wallpaper!',
            'game-dl': 'Download Wallpaper',
            'game-play-again': 'Play Again',
            'game-rules-title': '[ How to Play & Rules ]',
            'game-rule-1': 'Catch the falling desserts 🍰🍩 from the sky!',
            'game-rule-2': 'Use Left/Right keys (or ◀▶ buttons on mobile) to move your character.',
            'game-rule-3': 'Hitting a cactus 🌵 costs a life! 3 hits and game over.',
            'game-rule-4': 'Collect 7 desserts to clear the game! Win a special wallpaper! 🎁',
            'game-select-char': 'Choose your character',
            'bundle-desc': 'Limited quantity! Pre-order/purchase your special bundle set here!',
            'bundle-buy-btn': 'Pre-order / Purchase Bundle Set',
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

    // ─────────────────────────────────────────────
    // 6. Mini Game Logic
    // ─────────────────────────────────────────────
    const gameStartBtn = document.getElementById('game-start-btn');
    const gameRetryBtn = document.getElementById('game-retry-btn');
    const gameReplayBtn = document.getElementById('game-replay-btn');
    
    if (gameStartBtn) {
        const screens = document.querySelectorAll('.game-screen');
        const gameArea = document.getElementById('game-area');
        const player = document.getElementById('game-player');
        const scoreVal = document.getElementById('game-score-val');
        const livesVal = document.getElementById('game-lives-val');
        const btnLeft = document.getElementById('btn-left');
        const btnRight = document.getElementById('btn-right');
        
        let gameState = 'start';
        let score = 0;
        let lives = 3;
        let items = [];
        let playerX = 50;
        let gameLoop;
        let spawnTimeout;
        let spawnRate = 1200;
        
        const showScreen = (id) => {
            screens.forEach(s => s.classList.remove('active'));
            document.getElementById(id).classList.add('active');
        };
        
        const updateUI = () => {
            scoreVal.textContent = score;
            livesVal.textContent = '❤️'.repeat(lives);
        };
        
        const initGame = () => {
            // Get selected character image
            const selectedCharInput = document.querySelector('input[name="player-char"]:checked');
            if (selectedCharInput) {
                document.getElementById('player-img').src = selectedCharInput.value;
            }

            score = 0;
            lives = 3;
            items.forEach(item => item.el.remove());
            items = [];
            playerX = 50;
            player.style.left = `${playerX}%`;
            player.style.filter = '';
            updateUI();
        };
        
        const spawnItem = () => {
            if (gameState !== 'play') return;
            const isCactus = Math.random() > 0.6;
            const itemEl = document.createElement('div');
            itemEl.className = 'game-item ' + (isCactus ? 'item-cactus' : 'item-dessert');
            itemEl.innerHTML = isCactus ? '🌵' : ['🍰', '🍮', '🍨', '🍩', '🧁', '🍪', '🥞'][Math.floor(Math.random() * 7)];
            itemEl.dataset.type = isCactus ? 'cactus' : 'dessert';
            
            const startX = Math.random() * 80 + 10;
            itemEl.style.left = `${startX}%`;
            itemEl.style.top = `-10%`;
            
            gameArea.appendChild(itemEl);
            items.push({ el: itemEl, x: startX, y: -10, type: itemEl.dataset.type, speed: Math.random() * 0.3 + 0.6 + (score * 0.05) });
            
            spawnRate = Math.max(500, 1200 - (score * 80));
            spawnTimeout = setTimeout(spawnItem, spawnRate);
        };
        
        const checkCollision = (item) => {
            const playerRect = player.getBoundingClientRect();
            const itemRect = item.el.getBoundingClientRect();
            const padding = window.innerWidth < 768 ? 5 : 15;
            
            return !(
                playerRect.right - padding < itemRect.left + padding ||
                playerRect.left + padding > itemRect.right - padding ||
                playerRect.bottom - padding < itemRect.top + padding ||
                playerRect.top + padding > itemRect.bottom - padding
            );
        };
        
        const updateGame = () => {
            if (gameState !== 'play') return;
            
            for (let i = items.length - 1; i >= 0; i--) {
                const item = items[i];
                item.y += item.speed;
                item.el.style.top = `${item.y}%`;
                
                if (checkCollision(item)) {
                    if (item.type === 'cactus') {
                        lives--;
                        updateUI();
                        item.el.innerHTML = '💥';
                        player.style.filter = 'brightness(0) invert(1) sepia(100%) saturate(100%) hue-rotate(0deg)';
                        setTimeout(() => { if(gameState==='play') player.style.filter = ''; }, 200);
                        
                        if (lives <= 0) {
                            gameState = 'over';
                            clearTimeout(spawnTimeout);
                            setTimeout(() => showScreen('game-over-screen'), 500);
                        }
                    } else {
                        score++;
                        updateUI();
                        item.el.style.transform = 'scale(1.5)';
                        if (score >= 7) {
                            gameState = 'clear';
                            clearTimeout(spawnTimeout);
                            setTimeout(() => showScreen('game-clear-screen'), 500);
                        }
                    }
                    setTimeout(() => { if(item.el && item.el.parentNode) item.el.remove(); }, 100);
                    items.splice(i, 1);
                } else if (item.y > 110) {
                    item.el.remove();
                    items.splice(i, 1);
                }
            }
            
            if (isLeftPressed) {
                playerX -= window.innerWidth < 768 ? 2.5 : 2;
            }
            if (isRightPressed) {
                playerX += window.innerWidth < 768 ? 2.5 : 2;
            }
            playerX = Math.max(5, Math.min(95, playerX));
            player.style.left = `${playerX}%`;
            
            if (gameState === 'play') {
                gameLoop = requestAnimationFrame(updateGame);
            }
        };
        
        const startGame = () => {
            gameState = 'play';
            showScreen('game-play-screen');
            initGame();
            clearTimeout(spawnTimeout);
            spawnTimeout = setTimeout(spawnItem, 500);
            cancelAnimationFrame(gameLoop);
            gameLoop = requestAnimationFrame(updateGame);
        };
        
        gameStartBtn.addEventListener('click', startGame);
        gameRetryBtn.addEventListener('click', startGame);
        gameReplayBtn.addEventListener('click', startGame);
        
        let isLeftPressed = false;
        let isRightPressed = false;
        
        window.addEventListener('keydown', (e) => {
             if (e.key === 'ArrowLeft') isLeftPressed = true;
             if (e.key === 'ArrowRight') isRightPressed = true;
        });
        window.addEventListener('keyup', (e) => {
             if (e.key === 'ArrowLeft') isLeftPressed = false;
             if (e.key === 'ArrowRight') isRightPressed = false;
        });
        
        const addHoldEvents = (btn, isLeft) => {
            const press = (e) => { e.preventDefault(); if(isLeft) isLeftPressed=true; else isRightPressed=true; };
            const release = (e) => { e.preventDefault(); if(isLeft) isLeftPressed=false; else isRightPressed=false; };
            btn.addEventListener('mousedown', press);
            btn.addEventListener('touchstart', press, {passive: false});
            btn.addEventListener('mouseup', release);
            btn.addEventListener('mouseleave', release);
            btn.addEventListener('touchend', release);
        };
        
        if (btnLeft && btnRight) {
            addHoldEvents(btnLeft, true);
            addHoldEvents(btnRight, false);
        }
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
