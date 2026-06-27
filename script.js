// ─── Translations ─────────────────────────────────────────────
const translations = {
    en: {
        "bio": "Welcome to the <span class='text-purple-400 font-bold'>Digital Pantheon</span> — I'm LuxLiveGame, a variety streamer bringing you chill vibes and entertaining gameplay across all genres. Whether you're here to relax, laugh, or discover something new, you're in the right place.",
    },
    it: {
        "bio": "Benvenuto nel <span class='text-purple-400 font-bold'>Pantheon Digitale</span> — Sono LuxLiveGame, uno streamer variety che porta vibes rilassate e gameplay divertente in tutti i generi. Che tu sia qui per rilassarti, ridere o scoprire qualcosa di nuovo, sei nel posto giusto.",
    }
};

function setLang(lang) {
    document.getElementById('lang-en').className = lang === 'en'
        ? 'px-4 py-1.5 rounded-full text-xs font-bold tracking-widest font-sub transition-colors bg-purple-600/60 text-white border border-purple-500/40'
        : 'px-4 py-1.5 rounded-full text-xs font-bold tracking-widest font-sub transition-colors text-neutral-400 hover:text-white';
    document.getElementById('lang-it').className = lang === 'it'
        ? 'px-4 py-1.5 rounded-full text-xs font-bold tracking-widest font-sub transition-colors bg-purple-600/60 text-white border border-purple-500/40'
        : 'px-4 py-1.5 rounded-full text-xs font-bold tracking-widest font-sub transition-colors text-neutral-400 hover:text-white';

    const t = translations[lang];
    for (const [key, value] of Object.entries(t)) {
        const el = document.getElementById(key);
        if (el) el.innerHTML = value;
    }

    localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('lang') || 'en';
    setLang(saved);
});

// ─── Copy Email ───────────────────────────────────────────────
function copyEmail() {
    navigator.clipboard.writeText('luxlivegame@gmail.com').then(() => {
        const icon = document.getElementById('copy-icon');
        const label = document.getElementById('copy-label');

        icon.innerHTML = '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>';
        label.textContent = 'Copied!';
        document.getElementById('copy-email-btn').classList.add('bg-purple-600/40');

        setTimeout(() => {
            icon.innerHTML = '<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>';
            label.textContent = 'Copy';
            document.getElementById('copy-email-btn').classList.remove('bg-purple-600/40');
        }, 2000);
    });
}

// ─── Easter Egg ───────────────────────────────────────────────
const konamiCode = ['m', 'e', 'l', 'l', 'o', 'n'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            triggerEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function triggerEasterEgg() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: black;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        font-family: monospace;
        animation: fadeInOut 10s forwards;
    `;

    overlay.innerHTML = `
        <div style="text-align:center;">
            <img src="https://tenor.com/it/view/gandalf-decide-lord-of-the-rings-gif-12825539.gif" style="width: 400px; margin-bottom: 1rem; border-radius: 12px;">
            <div style="
                font-size: 1.1rem;
                font-weight: 900;
                letter-spacing: 0.3em;
                background: linear-gradient(90deg, #a855f7, #6366f1, #ec4899, #a855f7);
                background-size: 200%;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: shimmer 1.5s linear infinite;
            ">YOU FOUND THE SECRET</div>
            <div style="color: #6b7280; font-size: 0.75rem; margin-top: 1rem; letter-spacing: 0.2em;">
                WELCOME TO THE INNER SANCTUM, CHAMPION
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0%   { opacity: 0; }
            10%  { opacity: 1; }
            80%  { opacity: 1; }
            100% { opacity: 0; pointer-events: none; }
        }
        @keyframes shimmer {
            0%   { background-position: 0% }
            100% { background-position: 200% }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 10000);
}

// ─── YouTube Latest Video ─────────────────────────────────────
async function loadLatestVideo() {
    const API_KEY = 'AIzaSyDoPNznWweiiI5QQJONwWMvWQTFLWr06mI';
    const CHANNEL_ID = 'UCJ4N14OtfO_KEkWVzVXxMEQ';

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=1&type=video`
        );
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            console.warn('No videos found or API error:', data);
            return;
        }

        const videoId = data.items[0].id.videoId;
        document.getElementById('yt-embed').src = `https://www.youtube.com/embed/${videoId}`;
    } catch (err) {
        console.error('Failed to load latest YouTube video:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadLatestVideo);

// ─── Cursor Trail Effect ──────────────────────────────────────
const trail = [];
const TRAIL_LENGTH = 12;

for (let i = 0; i < TRAIL_LENGTH; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed;
        width: ${8 - i * 0.5}px;
        height: ${8 - i * 0.5}px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        opacity: ${1 - i / TRAIL_LENGTH};
        background: hsl(${270 + i * 8}, 100%, 70%);
        box-shadow: 0 0 ${6 - i * 0.3}px hsl(${270 + i * 8}, 100%, 70%);
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    let x = mouseX;
    let y = mouseY;

    trail.forEach((dot, i) => {
        const prev = i === 0 ? { x: mouseX, y: mouseY } : trail[i - 1];
        dot.x += (prev.x - dot.x) * 0.35;
        dot.y += (prev.y - dot.y) * 0.35;
        dot.el.style.left = dot.x + 'px';
        dot.el.style.top = dot.y + 'px';
    });

    requestAnimationFrame(animateTrail);
}

animateTrail();