document.addEventListener('DOMContentLoaded', () => {

    /* 1. GESTION DU DARK / LIGHT MODE */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Vérifier si l'utilisateur avait déjà choisi un thème lors d'une visite précédente
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggleBtn.textContent = '☀️';
    }

    // Écouter le clic sur le bouton de changement de thème
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Changer l'icône et sauvegarder la préférence dans le navigateur
        if (body.classList.contains('light-mode')) {
            themeToggleBtn.textContent = '☀️';
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            themeToggleBtn.textContent = '🌙';
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });


    /* 2. FILTRAGE DES PROJETS PAR TECHNOLOGIE */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe 'active' de tous les boutons de filtres
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe 'active' uniquement sur le bouton cliqué
            button.classList.add('active');

            // Récupérer la catégorie ciblée via l'attribut data-filter
            const filterValue = button.getAttribute('data-filter');

            // Parcourir chaque carte de projet pour l'afficher ou la masquer
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

});