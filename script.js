document.addEventListener("DOMContentLoaded", () => {
    // 1. Leuchtender Cursor-Effekt (Spotlight) einrichten
    const cursorGlow = document.createElement("div");
    cursorGlow.id = "cursor-glow";
    document.body.appendChild(cursorGlow);

    window.addEventListener("mousemove", (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    // 2. Dark / Light Mode Umschalter mit Speicherfunktion (LocalStorage)
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem("theme") || "dark";
    htmlElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
    }

    // 3. Dynamisches Filtern der Projekte
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 4. Modal-System zur Anzeige von Projektdetails beim Anklicken
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2 id="modal-title" style="margin-bottom: 1rem; color: var(--accent-cyan);"></h2>
            <p id="modal-desc" style="color: var(--text-secondary); margin-bottom: 1.5rem;"></p>
            <div id="modal-links" style="display: flex; gap: 1rem;"></div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalLinks = document.getElementById("modal-links");
    const modalClose = modalOverlay.querySelector(".modal-close");

    // Detaillierte Projektdaten
    const projectDetails = {
        "Memory Matrix": {
            title: "Memory Matrix — Visuelles Gedächtnisspiel",
            desc: "Entwickelt mit purem HTML, CSS und JavaScript. Dieses Projekt implementiert ein dynamisches Raster, das das räumliche Gedächtnis des Benutzers testet und verbessert, mit einer strengen Zustandsverwaltung und progressiven Schwierigkeitsstufen.",
            links: `
                <a href="https://laurita003.github.io/memory-matrix/" target="_blank" class="btn btn-primary btn-sm">Live-Demo</a>
                <a href="https://github.com/Laurita003/memory-matrix" target="_blank" class="btn btn-outline btn-sm">GitHub</a>
            `
        },
        "Tortellini Timer": {
            title: "Tortellini Timer — Pomodoro & Aufgabenverwaltung",
            desc: "Eine interaktive Webanwendung zur genauen Messung von Koch- und Produktivitätszeiten. Sie integriert einen präzisen Timer, eine Aufgabenliste und Datenspeicherung über den LocalStorage des Browsers.",
            links: `
                <a href="https://laurita003.github.io/Tortellini-Timer/" target="_blank" class="btn btn-primary btn-sm">Live-Demo</a>
                <a href="https://github.com/Laurita003/Tortellini-Timer" target="_blank" class="btn btn-outline btn-sm">GitHub</a>
            `
        },
        "Smart Mensa": {
            title: "Smart Mensa — RPTU Agile Anwendung",
            desc: "Full-Stack-Anwendung, die in einem universitären Team mit Java (Spring Boot), React und MySQL entwickelt wurde. Ermöglicht das Abrufen der Speisepläne der Mensa Kaiserslautern und die reibungslose Verwaltung von Lieblingsgerichten.",
            links: `
                <a href="https://gitlab.rhrk.uni-kl.de/ruw43piz/smart-mensa" target="_blank" class="btn btn-outline btn-sm">GitLab</a>
            `
        },
        "Ticketverkauf": {
            title: "Ticketverkauf — Java-Ticketverwaltungssystem",
            desc: "Ticketverkauf- und Verwaltungssystem in purem Java. Die Architektur legt den Schwerpunkt auf nebenläufige Programmierung (Multithreading) und die Sicherheit gemeinsam genutzter Speicherdaten.",
            links: `
                <a href="https://github.com/Laurita003/Ticketverkauf" target="_blank" class="btn btn-outline btn-sm">GitHub</a>
            `
        }
    };

    // Modal öffnen, wenn auf eine Projektkarte geklickt wird
    projectCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", (e) => {
            if (e.target.tagName === "A") return;

            const title = card.querySelector("h3").innerText;
            const details = projectDetails[title];

            if (details) {
                modalTitle.innerText = details.title;
                modalDesc.innerText = details.desc;
                modalLinks.innerHTML = details.links;
                modalOverlay.classList.add("active");
            }
        });
    });

    modalClose.addEventListener("click", () => {
        modalOverlay.classList.remove("active");
    });

    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove("active");
        }
    });

    // 5. Animierter Hintergrund: Neuronales Netzwerk-Partikelsystem
    const canvas = document.createElement("canvas");
    canvas.id = "particle-canvas";
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim();
            ctx.globalAlpha = 0.4;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.floor((width * height) / 15000);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim();
                    ctx.globalAlpha = (1 - (dist / 120)) * 0.15;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
});