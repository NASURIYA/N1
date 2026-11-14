const blogFeed = document.getElementById('blog-feed');
const canvas = document.getElementById('pixel-cat');
const ctx = canvas.getContext('2d');

// Hacker News Style Articles
const posts = [
    { title: "Rust vs C++ for System Programming", date: "Oct 12", tag: "DevOps" },
    { title: "Why I Love CSS Grid", date: "Sep 05", tag: "Frontend" },
    { title: "JavaScript Async/Await Deep Dive", date: "Aug 22", tag: "Backend" },
    { title: "Building a CLI Tool in Go", date: "Jul 14", tag: "Golang" },
    { title: "The Future of WebAssembly", date: "Jun 30", tag: "WebTech" },
    { title: "Optimizing React Performance", date: "May 18", tag: "React" },
    { title: "Docker Networking Explained", date: "Apr 05", tag: "DevOps" },
    { title: "Python for Data Science", date: "Mar 22", tag: "Data" },
    { title: "Serverless Architecture Patterns", date: "Feb 14", tag: "Cloud" },
    { title: "Understanding TCP Handshake", date: "Jan 08", tag: "Networking" }
];

// Render Posts
posts.forEach(post => {
    const div = document.createElement('article');
    div.innerHTML = `<h2>${post.title}</h2><span class="tag">${post.tag}</span><p>Posted on ${post.date}</p>`;
    blogFeed.appendChild(div);
});

// Pixel Cat Animation Logic
let frame = 0;
const catMap = [
    "  .--.  ",
    "/|     |\\",
    "| (o) (o)|",
    "|   ^    |",
    "\\_______/",
];

function drawCat() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Blink eyes randomly
    const blink = Math.random() > 0.95;
    let eyeChar = "o";
    if (blink) eyeChar = "_";

    // Draw simple pixel art based on frame
    ctx.fillStyle = "#ff9ff3"; // Pink cat
    for(let y=0; y<catMap.length; y++) {
        for(let x=0; x<catMap[y].length; x++) {
            if(catMap[y][x] !== ' ') {
                const px = (canvas.width / 2) - 4 + x;
                const py = (canvas.height / 2) - 3 + y;
                ctx.fillRect(px, py, 4, 4);
            }
        }
    }

    // Tail wagging effect
    if (frame % 10 === 0) {
        ctx.fillStyle = "#ff9ff3";
        ctx.fillRect(180, 160, 4, 20); 
    } else {
        ctx.clearRect(180, 160, 4, 20);
    }

    frame++;
    requestAnimationFrame(drawCat);
}

drawCat();
