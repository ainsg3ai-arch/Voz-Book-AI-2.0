// --- DADOS (Mock Data para Static App) ---
const BOOKS = [
    {
        id: '1',
        title: 'A Arte da Guerra',
        author: 'Sun Tzu',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeRHY5uyk1mt6piSWS28GFiXAP4OOC2xzr5Qs5NwWDlWGQNX8jZCloNsYb9473eysxNaH53yAIvlZmdvjzSF5OdN7k43KA7fkLtGu28dCgpjLF4d3bMHXThgMt466qPz_2lvX5dtOeYTG6X7FHLiUW8lHDbYPRG6IoUUk9xU7va6KhDU8Tkohnb3WRtK_0EvuKlk94gHp9tb92JPN8uqCjvYQtV2SizEmuT9x2WCHRUQF4b6Z3v6AY-B3_x3t2CM2gI_zyG7T1',
        progress: 75,
        duration: '1h 15m'
    },
    {
        id: '2',
        title: '1984',
        author: 'George Orwell',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk0PUXfBR2-AORqyqDgNk1uOdkt0xwi08i6tv9yQVooJPV7GDFx9XRBK8u76NUMOmUuDR8IPUSsU9PwH9ADIDtmQhaBlRHSnCJA0uYxT3DlNw2off5A5PAyr9hrdJMCvVWZlXw8NWCBn2jsBIVrCnWHq0GN9hBTuPpqn5BxkqAdaWhWvXd-S6ZBX5M-RZnOwJtCJjULqQc2NZUMc20TYfkSzVExrf41yOLAaoVSeMr_S8umKGYsEf0eQqi1GkSAK0uXFDr7HdQ',
        progress: 10,
        duration: '11h 22m'
    },
    {
        id: '3',
        title: 'O Alquimista',
        author: 'Paulo Coelho',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdObnSzgZz51ZoIxQVZH-uqh4bJP-BhdAaSz3anNwRii-GDmkuDBHjcDkm94KxmexXzmQZ0InJUbl3e2PHEOdkcNe1_5GZbPWJ_Qw_tPiheZw6ZN3sc8qUtmUVFYBPoSJR0tLGkSKSIDCWEHjMUkrf4TWG28y20FKG6xz8X4_zhWgSxJZGG1DbAEUdR-2G3rS5FJTGP0T7qxlUrbUXQdoEXb_93ZMI9mo5StxjC5-b2XuBiaMrGU2ylR0a8sHKK5wMPl7PT5C3',
        progress: 0,
        duration: '4h 30m'
    },
    {
        id: '4',
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1Kvi9jGBK5-Ap6cZ5kwbiFyNc8i7Dx1JFKWlocN3aCYnAglf0jjozd75LXK9idALg1Zf38Lc6QxcB-vcnGQmPcq-L0gR01EMcTUOfelji0VeGrx_d7OmuU3AkaxLiu_4pt8oxAvx_EVJpRWmpoJVLHgJmuSsNQbowb5RDnLQXumIDXgrYrEIhWEilkRjObN3DmMOpbgH87u3FnB6-ruwIpM8017hYherEw3p340jfAEhFgBomrkqlgVUYFv6bv9SvmFUYWJoU',
        progress: 100,
        duration: '15h 20m'
    }
];

// --- RENDERIZAÇÃO DA BIBLIOTECA ---
function renderLibrary() {
    const grid = document.getElementById('book-grid');
    if (!grid) return;

    grid.innerHTML = BOOKS.map(book => `
        <div onclick="openPlayer('${book.id}')" class="flex flex-col gap-2 cursor-pointer group animate-fade-in">
            <div class="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-lg border border-white/5 bg-[#1a232d]">
                <img src="${book.cover}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" alt="${book.title}">
                ${book.progress > 0 ? `
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                    <div class="h-full bg-[#3AB8FF]" style="width: ${book.progress}%"></div>
                </div>` : ''}
            </div>
            <div>
                <h3 class="font-bold text-sm text-white truncate">${book.title}</h3>
                <p class="text-xs text-white/50 truncate">${book.author}</p>
            </div>
        </div>
    `).join('');
}

// --- PLAYER LOGIC ---
function openPlayer(bookId) {
    // Salva o livro atual no Storage para recuperar na página player.html
    const book = BOOKS.find(b => b.id === bookId);
    if (book) {
        localStorage.setItem('currentBook', JSON.stringify(book));
        window.location.href = 'player.html';
    }
}

function initPlayer() {
    const coverEl = document.getElementById('player-cover');
    const bgEl = document.getElementById('player-bg');
    const titleEl = document.getElementById('player-title');
    const authorEl = document.getElementById('player-author');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');

    const storedBook = localStorage.getItem('currentBook');
    if (!storedBook) {
        window.location.href = 'index.html';
        return;
    }

    const book = JSON.parse(storedBook);

    // Preenche UI
    if(coverEl) coverEl.src = book.cover;
    if(bgEl) bgEl.style.backgroundImage = `url('${book.cover}')`;
    if(titleEl) titleEl.textContent = book.title;
    if(authorEl) authorEl.textContent = book.author;

    // Lógica de Play/Pause Fake
    let isPlaying = false;
    if(playBtn) {
        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playIcon.textContent = isPlaying ? 'pause' : 'play_arrow';
            
            // Animação da capa
            if(isPlaying) {
                coverEl.classList.add('scale-105');
            } else {
                coverEl.classList.remove('scale-105');
            }
        });
    }
}

// --- LOGIN LOGIC ---
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('login-btn');
    const errorMsg = document.getElementById('error-msg');

    btn.textContent = 'Entrando...';
    btn.disabled = true;
    errorMsg.classList.add('hidden');

    // Simulação de login se Supabase não estiver configurado
    if (email) {
        setTimeout(() => {
            localStorage.setItem('user_session', 'true');
            window.location.href = 'index.html';
        }, 1000);
        return;
    }

    // Tenta Supabase (se configurado)
    const { error } = await window.appSupabase.login(email, password);
    
    if (error) {
        errorMsg.textContent = error.message;
        errorMsg.classList.remove('hidden');
        btn.textContent = 'Entrar';
        btn.disabled = false;
    } else {
        window.location.href = 'index.html';
    }
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    // Roteamento simples baseado no path
    const path = window.location.pathname;

    if (path.includes('biblioteca.html') || path.endsWith('index.html') || path === '/') {
        renderLibrary();
    } else if (path.includes('player.html')) {
        initPlayer();
    }

    // Formulário de Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});