document.addEventListener("DOMContentLoaded", () => {
    // 1. Effet curseur lumineux (Spotlight)
    const cursorGlow = document.createElement("div");
    cursorGlow.id = "cursor-glow";
    document.body.appendChild(cursorGlow);

    window.addEventListener("mousemove", (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    // 2. Thème Dark / Light Mode avec sauvegarde
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

    // 3. Filtres dynamiques des projets
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

    // 4. Système de Modale pour afficher les détails des projets au clic
    // Création de la modale dans le DOM
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

    // Données détaillées pour chaque projet
    const projectDetails = {
        "Memory Matrix": {
            title: "Memory Matrix — Jeu de Mémoire Visuelle",
            desc: "Développé en HTML, CSS et JavaScript pur. Ce projet implémente une grille dynamique qui teste et améliore la mémoire spatiale de l'utilisateur avec une gestion rigoureuse des états et des niveaux de difficulté progressifs.",
            links: `
                <a href="https://laurita003.github.io/memory-matrix/" target="_blank" class="btn btn-primary btn-sm">Live-Demo</a>
                <a href="https://github.com/Laurita003/memory-matrix" target="_blank" class="btn btn-outline btn-sm">GitHub</a>
            `
        },
        "Tortellini Timer": {
            title: "Tortellini Timer — Pomodoro & Tâches",
            desc: "Une application web interactive conçue pour la gestion du temps de cuisson et de productivité. Elle intègre un compteur précis, une liste de tâches et une persistance des données via le LocalStorage du navigateur.",
            links: `
                <a href="https://laurita003.github.io/Tortellini-Timer/" target="_blank" class="btn btn-primary btn-sm">Live-Demo</a>
                <a href="https://github.com/Laurita003/Tortellini-Timer" target="_blank" class="btn btn-outline btn-sm">GitHub</a>
            `
        },
        "Smart Mensa": {
            title: "Smart Mensa — Application Agile RPTU",
            desc: "Application full-stack développée en équipe universitaire avec Java (Spring Boot), React et MySQL. Permet de consulter les menus de la mensa de Kaiserslautern et de gérer ses plats favoris de façon fluide.",
            links: `
                <a href="https://gitlab.rhrk.uni-kl.de/ruw43piz/smart-mensa" target="_blank" class="btn btn-outline btn-sm">GitLab</a>
            `
        },
        "Ticketverkauf": {
            title: "Ticketverkauf — Gestion de Billetterie Java",
            desc: "Système de vente et de gestion de tickets développé en Java pur. L'architecture met l'accent sur la programmation concurrente (Multithreading) et la sécurité des données partagées en mémoire.",
            links: `
                <a href="https://github.com/Laurita003/Ticketverkauf" target="_blank" class="btn btn-outline btn-sm">GitHub</a>
            `
        }
    };

    // Ouvrir la modale lorsqu'on clique sur une carte de projet
    projectCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", (e) => {
            // Si on clique directement sur un lien de la carte, on ne déclenche pas la modale
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

    // 5. Arrière-plan animé : Particules Réseau Neuronal
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