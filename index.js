// --- 1. 10 HACKER NEWS STYLE TECHNICAL ARTICLES ---
const articles = [
    {
        id: 10,
        title: "Show HN: Running 7B Quantized Vision-Language Models on 16GB Unified Memory",
        points: 412,
        comments: 138,
        date: "2026-11-14",
        spriteType: "chip",
        tags: ["nasuriya", "local-ai", "apple-silicon", "quantization"],
        summary: "Benchmarks and memory-bandwidth bottlenecks when running 4-bit and 8-bit weights locally without swap thrashing.",
        body: `
            <p>Unified memory architectures eliminate PCIe copy overhead, making memory bandwidth—rather than raw FLOPS—the primary bottleneck for single-batch local inference.</p>
            <p>When constraining a multimodal pipeline to a 16GB physical ceiling, OS wired memory leaves roughly 11.5GB usable before macOS compresses pages. Keeping KV-cache precision at FP16 while quantizing linear projection layers to Q4_K_M preserves spatial reasoning accuracy while maintaining 38 tokens/sec.</p>
            <pre>memory_footprint = (params * bits_per_weight / 8) + (2 * layers * hidden_dim * seq_len * 2)</pre>
            <p>Avoiding swap thrashing requires pinning weights via <code>mlock</code> and capping context windows at 4096 tokens during batch processing.</p>
        `
    },
    {
        id: 9,
        title: "Why I Replaced a 40MB Static Site Generator with Three Vanilla Files",
        points: 689,
        comments: 294,
        date: "2026-11-11",
        spriteType: "terminal",
        tags: ["nasuriya", "web-architecture", "minimalism", "performance"],
        summary: "Zero build steps, zero node_modules, and sub-15ms Time to First Byte on static edge hosts.",
        body: `
            <p>Dependency rot is the silent killer of personal technical blogs. Returning to a strict three-file contract (<code>index.html</code>, <code>style.css</code>, <code>script.js</code>) guarantees that a repository remains deployable ten years from now without broken lockfiles.</p>
            <p>By storing structured posts as a client-side JSON array and rendering DOM nodes via template literals, full-text tag filtering executes in under 0.4 milliseconds.</p>
        `
    },
    {
        id: 8,
        title: "Reverse-Engineering Booru Tag Indexing with Inverted Bitmaps",
        points: 345,
        comments: 87,
        date: "2026-11-08",
        spriteType: "database",
        tags: ["nasuriya", "algorithms", "data-structures", "search"],
        summary: "How classic imageboards evaluate multi-tag boolean intersections across millions of entries in milliseconds.",
        body: `
            <p>Booru-style search engines rely on intersection queries like <code>tag_a AND tag_b -tag_c</code>. Representing each tag as a compressed Roaring Bitmap turns complex SQL joins into hardware-accelerated bitwise <code>AND</code> and <code>ANDNOT</code> instructions.</p>
            <p>Even with 2 million indexed items, intersecting four dense tags takes less than 120 microseconds in RAM.</p>
        `
    },
    {
        id: 7,
        title: "Designing Deterministic 2D Pixel Art Pipelines Using Signed Distance Fields",
        points: 278,
        comments: 61,
        date: "2026-11-04",
        spriteType: "cat",
        tags: ["nasuriya", "graphics", "pixel-art", "shaders"],
        summary: "Generating crisp, rotation-invariant pixel sprites procedurally inside an HTML5 Canvas.",
        body: `
            <p>Standard nearest-neighbor rotation introduces jagged pixel swimming. By evaluating analytical Signed Distance Fields (SDFs) on a low-resolution integer grid before quantizing to a fixed 16-color palette, sprites retain clean silhouettes during real-time animation.</p>
        `
    },
    {
        id: 6,
        title: "Kei-Class EV Powertrains: Teardown of the 20kWh Air-Cooled Pack Architecture",
        points: 519,
        comments: 243,
        date: "2026-10-30",
        spriteType: "battery",
        tags: ["nasuriya", "hardware", "ev-engineering", "kei-cars"],
        summary: "Thermal tradeoffs, prismatic cell packaging, and urban efficiency metrics in sub-1100kg electric vehicles.",
        body: `
            <p>Micro-EVs built under Japanese Kei dimensions operate under strict 64-horsepower regulatory caps and tight wheelbase constraints. Rather than heavy liquid-cooled chiller loops, a 20kWh pack relies on low internal resistance LMO/NMC cells and passive underbody airflow.</p>
            <p>At city speeds under 60 km/h, rolling resistance dominates aerodynamic drag, yielding 7.8 km/kWh real-world efficiency.</p>
        `
    },
    {
        id: 5,
        title: "Single-File Offline Encryption in SwiftUI Using Apple CryptoKit",
        points: 231,
        comments: 49,
        date: "2026-10-25",
        spriteType: "lock",
        tags: ["nasuriya", "security", "swiftui", "cryptography"],
        summary: "Implementing ChaCha20-Poly1305 authenticated file sealing without third-party OpenSSL bindings.",
        body: `
            <p>When building local-first desktop utilities, avoiding external C-library dependencies simplifies code signing and notarization. Apple's native CryptoKit exposes hardware-accelerated <code>ChaChaPoly</code> sealing out of the box.</p>
            <pre>let sealedBox = try ChaChaPoly.seal(rawData, using: symmetricKey)</pre>
            <p>Combining Argon2id key derivation with 12-byte random nonces prevents rainbow-table attacks on exported vault files.</p>
        `
    },
    {
        id: 4,
        title: "Mechanical Properties of Gum Arabic and Honey in Hand-Mulled Watercolor Binders",
        points: 390,
        comments: 112,
        date: "2026-10-19",
        spriteType: "palette",
        tags: ["nasuriya", "materials-science", "chemistry", "craft"],
        summary: "Rheology, humectant ratios, and pigment dispersion physics when formulating archival paints from raw minerals.",
        body: `
            <p>Commercial watercolor pans balance viscosity and re-wetting speed using precise ratios of Kordofan gum arabic, vegetable glycerin, and wildflower honey. Too much humectant prevents curing in high humidity; too little causes cracking during shrinkage.</p>
            <p>Mulling inorganic iron oxides on frosted glass breaks down agglomerates below 15 microns for uniform glazing.</p>
        `
    },
    {
        id: 3,
        title: "Lessons from Scraping 300 Robotics Supply-Chain Pages Without Headless Browsers",
        points: 467,
        comments: 175,
        date: "2026-10-14",
        spriteType: "robot",
        tags: ["nasuriya", "data-engineering", "robotics", "python"],
        summary: "Why streaming HTML parsers and token-bucket rate limiters outperform Playwright clusters for structured extraction.",
        body: `
            <p>Spinning up headless Chromium instances consumes ~400MB RAM per worker just to parse static DOM trees. Switching to <code>httpx</code> with HTTP/2 connection pooling and <code>selectolax</code> reduced total crawl time for 300 technical datasheets from 14 minutes to 9 seconds.</p>
        `
    },
    {
        id: 2,
        title: "iOS App Sandboxing vs. Android Work Profiles: Isolation at the Kernel Level",
        points: 304,
        comments: 156,
        date: "2026-10-08",
        spriteType: "shield",
        tags: ["nasuriya", "os-internals", "mobile", "sandboxing"],
        summary: "Comparing XNU Seatbelt MACF policies against Linux user namespaces and SELinux contexts.",
        body: `
            <p>Android achieves multi-instance app isolation via distinct Linux UIDs mapped per user profile. iOS enforces strict containerization through XNU's Mandatory Access Control Framework (Seatbelt), binding bundle identifiers directly to cryptographic entitlements.</p>
        `
    },
    {
        id: 1,
        title: "Finite Automata and Regex Backtracking: Preventing Catastrophic CPU Stalls",
        points: 256,
        comments: 73,
        date: "2026-10-01",
        spriteType: "terminal",
        tags: ["nasuriya", "computer-science", "compilers", "algorithms"],
        summary: "Constructing Thompson NFAs to guarantee linear O(n) pattern matching on adversarial inputs.",
        body: `
            <p>Backtracking regex engines exhibit exponential O(2^n) worst-case complexity on nested quantifiers. Converting expressions into Nondeterministic Finite Automata (NFA) simulated in lockstep guarantees linear execution time proportional strictly to input string length.</p>
        `
    }
];

// --- 2. STATE & DOM ELEMENTS ---
let activeTag = null;
let searchQuery = "";

const articleListEl = document.getElementById("articleList");
const tagListEl = document.getElementById("tagList");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const sortSelect = document.getElementById("sortSelect");
const resultCountEl = document.getElementById("resultCount");
const feedView = document.getElementById("feedView");
const readerView = document.getElementById("readerView");
const backBtn = document.getElementById("backBtn");

// --- 3. RENDER TAG SIDEBAR ---
function renderTags() {
    const counts = {};
    articles.forEach(a => a.tags.forEach(t => counts[t] = (counts[t] || 0) + 1));
    
    const sortedTags = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    tagListEl.innerHTML = "";

    sortedTags.forEach(([tag, count]) => {
        const li = document.createElement("li");
        const isAuthor = tag === "nasuriya";
        li.innerHTML = `
            <span class="tag-name ${isAuthor ? 'author' : ''}">? ${tag}</span>
            <span class="tag-count">${count}</span>
        `;
        li.addEventListener("click", () => {
            activeTag = activeTag === tag ? null : tag;
            renderFeed();
            showFeed();
        });
        tagListEl.appendChild(li);
    });
}

// --- 4. RENDER ARTICLE FEED ---
function renderFeed() {
    let filtered = articles.filter(art => {
        const matchesTag = !activeTag || art.tags.includes(activeTag);
        const q = searchQuery.toLowerCase();
        const matchesSearch = !q || 
            art.title.toLowerCase().includes(q) || 
            art.summary.toLowerCase().includes(q) ||
            art.tags.some(t => t.includes(q));
        return matchesTag && matchesSearch;
    });

    if (sortSelect.value === "points") {
        filtered.sort((a, b) => b.points - a.points);
    } else {
        filtered.sort((a, b) => b.id - a.id);
    }

    resultCountEl.textContent = `Showing ${filtered.length} entries` + (activeTag ? ` [tag: ${activeTag}]` : "");
    articleListEl.innerHTML = "";

    filtered.forEach((art, idx) => {
        const row = document.createElement("div");
        row.className = "article-row";
        
        const canvasId = `thumb-${art.id}`;
        const tagsHtml = art.tags.map(t => `<span class="inline-tag" data-tag="${t}">${t}</span>`).join("");

        row.innerHTML = `
            <canvas id="${canvasId}" class="thumb-canvas" width="32" height="32"></canvas>
            <div>
                <div>
                    <span>${idx + 1}. </span>
                    <a class="row-title" data-id="${art.id}">${art.title}</a>
                </div>
                <div class="row-meta">
                    ${art.points} points by <strong>nasuriya</strong> on ${art.date} | ${art.comments} comments
                </div>
                <p style="margin-bottom:4px;">${art.summary}</p>
                <div>${tagsHtml}</div>
            </div>
        `;
        articleListEl.appendChild(row);
        drawThumbnailSprite(document.getElementById(canvasId), art.spriteType, art.id);
    });

    // Attach click listeners
    document.querySelectorAll(".row-title").forEach(el => {
        el.addEventListener("click", () => openArticle(Number(el.dataset.id)));
    });
    document.querySelectorAll(".inline-tag").forEach(el => {
        el.addEventListener("click", (e) => {
            e.stopPropagation();
            activeTag = el.dataset.tag;
            renderFeed();
        });
    });
}

// --- 5. ARTICLE READER ---
let readerAnimId = null;

function openArticle(id) {
    const art = articles.find(a => a.id === id);
    if (!art) return;

    feedView.classList.add("hidden");
    readerView.classList.remove("hidden");

    document.getElementById("readerMeta").textContent = `ID #${art.id} // ${art.points} HN Points // Published ${art.date}`;
    document.getElementById("readerTitle").textContent = art.title;
    document.getElementById("readerBody").innerHTML = art.body;
    document.getElementById("readerTags").innerHTML = "<strong>Indexed Tags:</strong> " + 
        art.tags.map(t => `<span class="inline-tag">${t}</span>`).join("");

    startArticleHeaderAnimation(art.spriteType);
}

function showFeed() {
    readerView.classList.add("hidden");
    feedView.classList.remove("hidden");
    if (readerAnimId) cancelAnimationFrame(readerAnimId);
}

backBtn.addEventListener("click", showFeed);
document.getElementById("homeLink").addEventListener("click", (e) => {
    e.preventDefault();
    activeTag = null;
    searchQuery = "";
    searchInput.value = "";
    showFeed();
    renderFeed();
});

searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderFeed();
});

clearBtn.addEventListener("click", () => {
    activeTag = null;
    searchQuery = "";
    searchInput.value = "";
    showFeed();
    renderFeed();
});

sortSelect.addEventListener("change", renderFeed);

// --- 6. MOVING PIXEL ART ENGINES ---

// A. Procedural 32x32 Thumbnail Sprites per Article
function drawThumbnailSprite(canvas, type, seed) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1b2e1a";
    ctx.fillRect(0, 0, 32, 32);

    const colors = ["#aae5a4", "#ff77a8", "#fee761", "#63c74d", "#4fc3f7"];
    const mainColor = colors[seed % colors.length];
    ctx.fillStyle = mainColor;

    // Symmetric pixel glyph generator seeded by article ID
    for (let y = 4; y < 28; y += 2) {
        for (let x = 4; x < 16; x += 2) {
            const hash = Math.sin(seed * 17 + x * 31 + y * 13);
            if (hash > 0.1) {
                ctx.fillRect(x, y, 2, 2);
                ctx.fillRect(30 - x, y, 2, 2); // Mirror symmetry
            }
        }
    }
}

// B. Sidebar Animated Pixel Cat Mascot
const mascotCanvas = document.getElementById("mascotCanvas");
const mCtx = mascotCanvas.getContext("2d");
const petStatus = document.getElementById("petStatus");
let mTick = 0;
let excited = 0;

const catGrid = [
    [0,0,1,1,0,0,0,0,0,0,1,1,0,0],
    [0,1,2,3,1,0,0,0,0,1,3,2,1,0],
    [0,1,2,2,2,1,1,1,1,2,2,2,1,0],
    [1,2,2,4,2,2,2,2,2,4,2,2,2,1],
    [1,2,2,2,2,2,3,2,2,2,2,2,2,1],
    [0,1,2,2,2,2,2,2,2,2,2,2,1,0],
    [0,0,1,2,5,5,5,5,5,2,1,0,0,0],
    [0,1,2,2,5,5,5,5,5,2,2,1,0,0],
    [0,1,2,2,2,5,5,5,2,2,2,1,1,0],
    [0,0,1,1,0,1,1,0,1,1,0,0,1,0]
];

const catPalette = { 1: "#0d170d", 2: "#aae5a4", 3: "#ff77a8", 4: "#fee761", 5: "#ffffff" };

function animateMascot() {
    mCtx.fillStyle = "#1b2e1a";
    mCtx.fillRect(0, 0, 128, 96);

    const bounce = Math.sin(mTick * (excited > 0 ? 0.4 : 0.1)) > 0 ? 0 : 4;
    const blink = (mTick % 100 > 92) || excited > 0;

    for (let r = 0; r < catGrid.length; r++) {
        for (let c = 0; c < catGrid[r].length; c++) {
            let val = catGrid[r][c];
            if (!val) continue;
            if (val === 4 && blink) val = 1;
            mCtx.fillStyle = catPalette[val];
            mCtx.fillRect(36 + c * 4, 24 + r * 4 + bounce, 4, 4);
        }
    }

    if (excited > 0) {
        excited--;
        mCtx.fillStyle = "#ff77a8";
        mCtx.fillRect(20, 16 + (excited % 6), 6, 6);
        mCtx.fillRect(100, 20 - (excited % 6), 6, 6);
        if (excited === 0) petStatus.textContent = "idle // click to ping";
    }

    mTick++;
    requestAnimationFrame(animateMascot);
}

mascotCanvas.addEventListener("click", () => {
    excited = 60;
    petStatus.textContent = "ACK // purr packet sent";
});

// C. Moving Pixel City & Walking Cat Banner
const bannerCanvas = document.getElementById("bannerCanvas");
const bCtx = bannerCanvas.getContext("2d");
let bTick = 0;

function animateBanner() {
    bCtx.fillStyle = "#1b2e1a";
    bCtx.fillRect(0, 0, 640, 64);

    // Scrolling background data blocks
    bCtx.fillStyle = "#294728";
    for (let i = 0; i < 16; i++) {
        const x = ((i * 48 - bTick * 0.5) % 680 + 680) % 680 - 40;
        const h = 16 + (i * 7) % 28;
        bCtx.fillRect(x, 64 - h, 32, h);
    }

    // Moving pixel cat runner
    const catX = (bTick * 1.5) % 640;
    const step = Math.floor(bTick / 6) % 2;
    bCtx.fillStyle = "#aae5a4";
    bCtx.fillRect(catX, 44, 16, 10); // Body
    bCtx.fillRect(catX + 12, 38, 10, 10); // Head
    bCtx.fillRect(catX + 12, 35, 3, 3); // Ear 1
    bCtx.fillRect(catX + 19, 35, 3, 3); // Ear 2
    // Animated legs
    bCtx.fillRect(catX + (step ? 2 : 0), 54, 3, 4);
    bCtx.fillRect(catX + (step ? 11 : 13), 54, 3, 4);

    // Ground grid line
    bCtx.fillStyle = "#6ab564";
    bCtx.fillRect(0, 58, 640, 2);

    bTick++;
    requestAnimationFrame(animateBanner);
}

// D. Live Oscilloscope / Pixel Visualizer inside Open Articles
function startArticleHeaderAnimation(type) {
    if (readerAnimId) cancelAnimationFrame(readerAnimId);
    const canvas = document.getElementById("articleArtCanvas");
    const ctx = canvas.getContext("2d");
    let t = 0;

    function loop() {
        ctx.fillStyle = "#1b2e1a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let x = 0; x < canvas.width; x += 8) {
            const wave = Math.sin(x * 0.04 + t * 0.08) * 28 + Math.cos(x * 0.02 - t * 0.05) * 14;
            const y = Math.floor((60 + wave) / 4) * 4;
            ctx.fillStyle = "#63c74d";
            ctx.fillRect(x, y, 6, 6);
            ctx.fillStyle = "#294728";
            ctx.fillRect(x, y + 8, 6, canvas.height - y);
        }

        t++;
        readerAnimId = requestAnimationFrame(loop);
    }
    loop();
}

// Boot
renderTags();
renderFeed();
animateMascot();
animateBanner();
