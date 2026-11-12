// --- 1. BLOG DATA ---
const posts = [
    {
        id: 1,
        title: "Zero-Dependency Static Architecture",
        tag: "web",
        date: "2026-11-10",
        excerpt: "Why stripping out heavy bundlers makes your personal site faster and indestructible.",
        content: `
            <p>Modern web stacks often ship megabytes of JavaScript just to render plain text. By returning to raw HTML, CSS, and vanilla JS, load times drop to near zero.</p>
            <p>Combine CSS custom properties with native <code><canvas></code> pixel buffers and you get rich interactivity with zero build steps.</p>
        `
    },
    {
        id: 2,
        title: "Memory Allocation & Cat Naps",
        tag: "systems",
        date: "2026-11-04",
        excerpt: "Lessons on garbage collection pauses learned from watching a sleeping tabby.",
        content: `
            <p>Just like a cat aggressively reclaiming a sunbeam, manual memory management demands deliberate ownership boundaries.</p>
            <p>When designing low-latency loops, pre-allocating ring buffers prevents unexpected frame drops during critical execution windows.</p>
        `
    },
    {
        id: 3,
        title: "Building a Custom Split Mechanical Keyboard",
        tag: "hardware",
        date: "2026-10-28",
        excerpt: "Soldering diodes, flashing QMK firmware, and keeping cat hair out of tactile switches.",
        content: `
            <p>A 42-key columnar stagger layout eliminates unnecessary finger travel. Wiring the matrix took three hours; debugging a cold solder joint on column four took two more.</p>
            <p>Pro tip: always keep a dust cover handy when your feline QA engineer inspects the PCB.</p>
        `
    }
];

// --- 2. BLOG RENDERING & FILTERING ---
const postFeed = document.getElementById('postFeed');
const filterBtns = document.querySelectorAll('.filter-bar .pixel-btn');
const modal = document.getElementById('postModal');
const closeModal = document.getElementById('closeModal');

function renderPosts(filter = 'all') {
    postFeed.innerHTML = '';
    const filtered = filter === 'all' ? posts : posts.filter(p => p.tag === filter);

    filtered.forEach(post => {
        const card = document.createElement('article');
        card.className = 'post-card pixel-box';
        card.innerHTML = `
            <div>
                <span class="tag">#${post.tag}</span>
                <h3>${post.title}</h3>
                <p class="meta">${post.date}</p>
                <p>${post.excerpt}</p>
            </div>
            <div style="margin-top: 1rem;">
                <span class="pixel-btn">READ_LOG ></span>
            </div>
        `;
        card.addEventListener('click', () => openPost(post));
        postFeed.appendChild(card);
    });
}

function openPost(post) {
    document.getElementById('modalTag').textContent = `#${post.tag}`;
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalDate').textContent = `LOG_DATE: ${post.date} // AUTHOR: NASURIYA`;
    document.getElementById('modalBody').innerHTML = post.content;
    modal.classList.remove('hidden');
}

closeModal.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPosts(btn.dataset.tag);
    });
});

// --- 3. LIVE PIXEL CAT ANIMATION ENGINE ---
const canvas = document.getElementById('catCanvas');
const ctx = canvas.getContext('2d');
const petHint = document.getElementById('petHint');

const PIXEL_SIZE = 4;
let tick = 0;
let isPurring = false;
let purrTimer = 0;
let hearts = [];

// 16x14 Pixel Matrix (0: empty, 1: outline, 2: fur, 3: inner ear/nose, 4: eye, 5: white chest)
const catSpriteBase = [
    [0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0],
    [0,1,2,3,1,0,0,0,0,1,3,2,1,0,0,0],
    [0,1,2,3,2,1,1,1,1,2,3,2,1,0,0,0],
    [0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],
    [1,2,2,4,2,2,2,2,2,4,2,2,2,1,0,0],
    [1,2,2,2,2,2,3,2,2,2,2,2,2,1,0,0],
    [0,1,2,2,2,1,2,1,2,2,2,2,1,0,0,0],
    [0,0,1,1,2,5,5,5,2,2,1,1,0,0,0,0],
    [0,1,2,2,5,5,5,5,5,2,2,2,1,0,0,0],
    [0,1,2,2,5,5,5,5,5,2,2,2,1,0,1,1],
    [0,1,2,2,2,5,5,5,2,2,2,2,1,1,2,1],
    [0,1,2,1,2,2,2,2,2,1,2,2,2,2,1,0],
    [0,0,1,0,1,1,0,0,1,1,0,1,1,1,0,0]
];

const palette = {
    1: '#120e1c', // Outline
    2: '#ff9e7d', // Ginger fur
    3: '#ff77a8', // Pink nose/ears
    4: '#63c74d', // Green eyes
    5: '#ffffff'  // White bib
};

function drawPixelCat() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const bobOffset = Math.sin(tick * 0.15) > 0 ? 0 : 1;
    const isBlinking = (tick % 90 > 82) || isPurring;
    const tailWag = Math.floor(Math.sin(tick * 0.2) * 1.5);

    const startX = 32;
    const startY = 24 + bobOffset * PIXEL_SIZE;

    for (let r = 0; r < catSpriteBase.length; r++) {
        for (let c = 0; c < catSpriteBase[r].length; c++) {
            let colorCode = catSpriteBase[r][c];
            if (colorCode === 0) continue;

            // Animate blinking / happy eyes
            if (colorCode === 4 && isBlinking) {
                colorCode = 1;
            }

            // Animate tail tip
            let drawC = c;
            if (c >= 13 && r >= 9) {
                drawC += tailWag;
            }

            ctx.fillStyle = palette[colorCode];
            ctx.fillRect(
                startX + drawC * PIXEL_SIZE,
                startY + r * PIXEL_SIZE,
                PIXEL_SIZE,
                PIXEL_SIZE
            );
        }
    }

    // Draw floating pixel hearts when petted
    hearts.forEach((h, i) => {
        ctx.fillStyle = '#ff77a8';
        ctx.fillRect(h.x, h.y, 4, 4);
        ctx.fillRect(h.x + 8, h.y, 4, 4);
        ctx.fillRect(h.x - 4, h.y + 4, 20, 4);
        ctx.fillRect(h.x, h.y + 8, 12, 4);
        ctx.fillRect(h.x + 4, h.y + 12, 4, 4);

        h.y -= 1;
        h.life--;
        if (h.life <= 0) hearts.splice(i, 1);
    });

    if (isPurring) {
        purrTimer--;
        if (purrTimer <= 0) {
            isPurring = false;
            petHint.textContent = '[ click cat to pet ]';
        }
    }

    tick++;
    requestAnimationFrame(drawPixelCat);
}

canvas.addEventListener('click', () => {
    isPurring = true;
    purrTimer = 80;
    petHint.textContent = '*purrrrrr* <3';
    hearts.push({
        x: 52 + (Math.random() * 24 - 12),
        y: 20,
        life: 45
    });
});

// Initialize
renderPosts();
drawPixelCat();
