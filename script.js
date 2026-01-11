/**
 * APP LOGIC
 */
const app = {
    // --- MOCK DATA ---
    data: {
        events: [
            { id: 1, title: "SaaS Product Buildathon", date: "Jan 18, 2026", registered: false },
            { id: 2, title: "Open Source Contribution Sprint", date: "Jan 25, 2026", registered: true },
            { id: 3, title: "Cybersecurity Capture The Flag", date: "Feb 02, 2026", registered: false }
        ],
        news: [
            { title: "Server Maintenance", snippet: "Portal downtime scheduled for Sunday 2 AM." },
            { title: "Project Submission Deadline", snippet: "Submit your final repos by Friday for evaluation." },
            { title: "New API Available", snippet: "The Club Inventory API is now open for dev use." }
        ],
        // UPDATED: Now showing Project Completions instead of generic workshops
        certificates: [
            { title: "E-Commerce Backend API", stack: "Java / Spring Boot", date: "Dec 2025" },
            { title: "Python Automation Bot", stack: "Python / Selenium", date: "Nov 2025" },
            { title: "Club Portfolio Website", stack: "HTML / CSS / JS", date: "Oct 2025" }
        ]
    },

    // --- LOGIC ---
    login: function() {
        const user = document.getElementById('username').value;
        document.getElementById('user-display').innerText = user || "Member";
        
        document.getElementById('login-view').style.display = 'none'; 
        const interface = document.getElementById('app-interface');
        interface.classList.remove('hidden');
        interface.style.animation = "slideUp 0.6s ease-out";
        
        this.renderAll();
    },

    navigate: function(viewId, navEl) {
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        navEl.classList.add('active');

        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active-view'));
        document.getElementById(`view-${viewId}`).classList.add('active-view');
    },

    // --- RENDERERS ---
    renderAll: function() {
        // Events
        document.getElementById('events-container').innerHTML = this.data.events.map(event => `
            <div class="glass-card">
                <div style="color:var(--accent-color); font-weight:600; font-size:0.9rem; margin-bottom:5px;">${event.date}</div>
                <h4 style="font-size:1.1rem; margin-bottom:10px;">${event.title}</h4>
                <button class="action-btn ${event.registered ? 'registered' : ''}" onclick="app.toggleEvent(${event.id})">
                    ${event.registered ? '<i class="fas fa-check"></i> Registered' : 'Register'}
                </button>
            </div>
        `).join('');

        // News
        document.getElementById('news-container').innerHTML = this.data.news.map(item => `
            <div class="news-item">
                <h4>${item.title}</h4>
                <p style="color:var(--text-muted); font-size:0.9rem;">${item.snippet}</p>
            </div>
        `).join('');

        // Project Certs (New Format)
        document.getElementById('certs-container').innerHTML = this.data.certificates.map(cert => `
            <div class="glass-card" style="display:flex; align-items:center; justify-content:space-between;">
                <div>
                    <h4 style="margin-bottom:0px;">${cert.title}</h4>
                    <span class="cert-tag">${cert.stack}</span>
                    <div style="color:var(--text-muted); font-size:0.8rem; margin-top:5px;">Completed: ${cert.date}</div>
                </div>
                <i class="fas fa-certificate" style="color:var(--accent-color); font-size:1.5rem; opacity:0.8;"></i>
            </div>
        `).join('');
    },

    toggleEvent: function(id) {
        const ev = this.data.events.find(e => e.id === id);
        if(ev) { ev.registered = !ev.registered; this.renderAll(); }
    }
};

// --- PARTICLES ---
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; 
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 120) {
                ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 - dist/800})`; 
                ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particles[a].x, particles[a].y); ctx.lineTo(particles[b].x, particles[b].y); ctx.stroke();
            }
        }
    }
}

function init() {
    particles = [];
    const count = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < count; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); }
    connect();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); });
init(); animate();