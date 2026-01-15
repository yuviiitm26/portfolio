/* ... existing code ... */

// Canvas & AI Simulation
const canvas = document.getElementById('neural-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Config
    const particleCount = 60;
    const connectionDist = 120;
    const mouseDist = 150;

    // Resize
    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
        initParticles();
    }

    window.addEventListener('resize', resize);

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = `rgba(0, 243, 255, ${Math.random() * 0.5 + 0.2})`; // Neon Blue
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse Interaction
            if (mouse.x) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseDist) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouseDist - dist) / mouseDist; // stronger closer
                    const pushX = Math.cos(angle) * force * 0.5;
                    const pushY = Math.sin(angle) * force * 0.5;
                    this.x -= pushX;
                    this.y -= pushY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Mouse tracking relative to canvas
    const mouse = { x: null, y: null };
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections first
        particles.forEach((p, i) => {
            p.update();
            particles.slice(i + 1).forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDist) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    const alpha = 1 - (dist / connectionDist);
                    ctx.strokeStyle = `rgba(0, 243, 255, ${alpha * 0.2})`;
                    ctx.stroke();
                }
            });
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    // Init
    resize();
    animate();

    // Regen Button
    document.getElementById('regen-btn').addEventListener('click', () => {
        particles = [];
        // Blast effect
        for (let i = 0; i < particleCount; i++) {
            const p = new Particle();
            p.x = width / 2;
            p.y = height / 2;
            p.vx = (Math.random() - 0.5) * 10;
            p.vy = (Math.random() - 0.5) * 10;
            particles.push(p);
        }

        // Add log
        addLog("> Network Reset initiated.");
        setTimeout(() => addLog("> Re-calibrating weights..."), 800);
        setTimeout(() => addLog("> System operational."), 1600);
    });
}

// Terminal Log Simulation
const logContainer = document.getElementById('terminal-logs');
const logs = [
    "Loading pretrained weights (v4.2)...",
    "Connecting to Vector Store @ localhost:6379...",
    "RAG Pipeline: READY",
    "Monitoring inference latency...",
    "Optimizing TensorRT engine...",
    "New data ingestion stream detected."
];

function addLog(msg) {
    if (!logContainer) return;

    const line = document.createElement('div');
    line.className = 'log-line';
    line.innerText = msg;
    logContainer.appendChild(line);

    // Keep only last 6 lines
    if (logContainer.children.length > 6) {
        logContainer.removeChild(logContainer.children[0]);
    }
}

// Auto logs
if (logContainer) {
    let logIndex = 0;
    setInterval(() => {
        if (Math.random() > 0.7) { // Random interval
            addLog("> " + logs[Math.floor(Math.random() * logs.length)]);
        }
    }, 2500);
}

// ... existing IntersectionObserver and Nav code ...
// Console Easter Egg
console.log("%cHello There! 👋", "font-weight: bold; font-size: 20px; color: #00f3ff;");
console.log("%cBuilding systems? Let's talk.", "font-size: 14px; color: #a0a0a0;");

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Select elements to animate
    const animateElements = document.querySelectorAll('.hero-content, .section-title, .stack-column, .project-card, .timeline-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add class for animation
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});

// Smoth scroll offset for sticky nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.sticky-nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
