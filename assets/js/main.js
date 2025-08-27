// Este script é responsável por carregar e injetar o cabeçalho, o rodapé
// em todas as páginas, e também por destacar o link da página ativa.

document.addEventListener('DOMContentLoaded', () => {
    // Calcula o caminho relativo para a raiz do projeto a partir da página atual.
    const getPathToRoot = () => {
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s.length > 0);
        // Se o último segmento for um arquivo HTML, remove-o para obter o caminho do diretório.
        const currentDirSegments = segments.filter(s => !s.includes('.html'));
        let pathToRoot = '';
        for (let i = 0; i < currentDirSegments.length; i++) {
            pathToRoot += '../';
        }
        return pathToRoot;
    };

    const pathToRoot = getPathToRoot();

    // Determina o idioma atual com base na URL.
    const currentLang = window.location.pathname.startsWith('/pt/') ? 'pt' : 'en';

    // Função para gerar o HTML do menu de navegação
    function getNavigationLinksHtml() {
        const navLinksData = {
            pt: [
                { text: 'Projetos', href: 'projects.html' },
                { text: 'Currículo', href: 'resume.html' },
                { text: 'Sobre Mim', href: 'about.html' },
                { text: 'Contato', href: 'contact.html' }
            ],
            en: [
                { text: 'Projects', href: 'projects.html' },
                { text: 'Resume', href: 'resume.html' },
                { text: 'About', href: 'about.html' },
                { text: 'Contact', href: 'contact.html' }
            ]
        };

        const linksToUse = navLinksData[currentLang] || navLinksData.en;
        const currentFilename = window.location.pathname.split('/').pop();
        
        return linksToUse.map(link => {
            const isActive = (link.href === currentFilename) || (currentFilename === '' && link.href === 'index.html');
            const activeClasses = 'text-blue-600 font-semibold';
            const baseClasses = 'hover:text-blue-600 transition-colors duration-200';
            const finalClasses = isActive ? activeClasses : baseClasses;
            
            // Todos os links de navegação são relativos à raiz do projeto
            return `<a href="${pathToRoot}${currentLang === 'pt' && link.href !== 'index.html' ? 'pt/' : ''}${link.href}" class="${finalClasses}">${link.text}</a>`;
        }).join('');
    }

    // Função assíncrona para buscar e injetar o HTML do cabeçalho
    async function loadHeader() {
        try {
            const response = await fetch(`${pathToRoot}assets/js/components/header.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let headerHtml = await response.text();

            const navLinksHtml = getNavigationLinksHtml();
            headerHtml = headerHtml.replace('<!-- Os links de navegação serão injetados aqui pelo JavaScript -->', navLinksHtml);

            const body = document.body;
            body.insertAdjacentHTML('afterbegin', headerHtml);

            loadLanguageSwitcher();
            loadThemeSwitcher();

            // Corrige o link do logo para páginas aninhadas
            const logoLink = document.querySelector('header nav > a');
            if (logoLink) {
                logoLink.href = `${pathToRoot}${currentLang === 'pt' ? 'pt/' : ''}index.html`;
            }

        } catch (e) {
            console.error('Erro ao carregar o cabeçalho:', e);
        }
    }

    // Função para adicionar a lógica de troca de idioma
    function loadLanguageSwitcher() {
        const langSwitcher = document.querySelector('.lang-switcher');
        if (!langSwitcher) return;

        const enLink = langSwitcher.querySelector('a:first-child');
        const ptLink = langSwitcher.querySelector('a:last-child');
        
        const currentPathname = window.location.pathname;
        const currentFile = currentPathname.split('/').pop();
        const currentDir = currentPathname.substring(0, currentPathname.lastIndexOf('/') + 1);

        // Determine the base path for language switching
        let basePath = currentDir;
        if (basePath.endsWith('/')) {
            basePath = basePath.slice(0, -1); // Remove trailing slash
        }
        
        // Adjust basePath if it's a language subfolder
        if (basePath.endsWith('/pt')) {
            basePath = basePath.slice(0, -3); // Remove /pt
        } else if (basePath.endsWith('/en')) { // Assuming /en/ is not used, but for robustness
            basePath = basePath.slice(0, -3);
        }

        // Ensure basePath starts with a slash
        if (!basePath.startsWith('/')) {
            basePath = '/' + basePath;
        }
        if (basePath === '/') {
            basePath = ''; // For root, no prefix
        }


        if (currentLang === 'en') {
            enLink.classList.add('active');
            enLink.href = '#';
            ptLink.href = `${basePath}/pt/${currentFile}`;
            if (currentFile === '') { // If on root index.html
                ptLink.href = `${basePath}/pt/`;
            }
        } else { // currentLang is 'pt'
            ptLink.classList.add('active');
            ptLink.href = '#';
            enLink.href = `${basePath}/${currentFile}`;
            if (currentFile === '') { // If on /pt/index.html
                enLink.href = `${basePath}/`;
            }
        }
    }

    // Função assíncrona para buscar e injetar o HTML do rodapé
    async function loadFooter() {
        try {
            const response = await fetch(`${pathToRoot}assets/js/components/footer.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const footerHtml = await response.text();

            const body = document.body;
            body.insertAdjacentHTML('beforeend', footerHtml);

        } catch (e) {
            console.error('Erro ao carregar o rodapé:', e);
        }
    }

    // Nova função para carregar e injetar as tags de favicon no <head>
    async function loadFavicon() {
        try {
            const response = await fetch(`${pathToRoot}assets/js/components/favicon.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const faviconHtml = await response.text();
            
            const head = document.head;
            head.insertAdjacentHTML('beforeend', faviconHtml);
            
        } catch (e) {
            console.error('Erro ao carregar o favicon:', e);
        }
    }

    // Função para gerar o HTML de um "badge" de tecnologia.
    function createTechBadge(tech) {
        return `<span class="badge">${tech}</span>`;
    }

    // Função para gerar o HTML de um cartão de projeto a partir de um objeto.
    function createProjectCard(project) {
        const cardLink = document.createElement('a');
        const cardImage = document.createElement('img');
        const cardTitle = document.createElement('h4');
        const cardDescription = document.createElement('p');
        const cardTechsContainer = document.createElement('div');

        cardLink.className = 'project-card block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden';
        
        // Determine the correct href for the project link
        if (project.link.startsWith('http://') || project.link.startsWith('https://')) {
            cardLink.href = project.link;
        } else {
            // For internal links, use pathToRoot and adjust for language subfolder
            let projectLinkPath = project.link;
            if (currentLang === 'pt' && !projectLinkPath.startsWith('pt/')) {
                // If current language is PT and the link is not already in PT subfolder, add it
                projectLinkPath = `pt/${projectLinkPath}`;
            }
            cardLink.href = pathToRoot + projectLinkPath;
        }

        cardImage.className = 'project-image w-full h-48 object-cover';
        cardImage.loading = 'lazy';
        if (project.image.startsWith('http://') || project.image.startsWith('https://')) {
            cardImage.src = project.image;
        }
        else {
            cardImage.src = pathToRoot + project.image;
        }
        cardImage.alt = project.alt[currentLang];

        const cardContent = document.createElement('div');
        cardContent.className = 'p-6';

        cardTitle.className = 'project-title text-xl font-bold mb-2 text-gray-900';
        cardTitle.textContent = project.title[currentLang];

        cardDescription.className = 'project-description text-gray-700 mb-4';
        cardDescription.textContent = project.description[currentLang];

        cardTechsContainer.className = 'project-technologies flex flex-wrap gap-2';
        project.technologies.forEach(tech => {
            const badge = createTechBadge(tech);
            cardTechsContainer.innerHTML += badge;
        });

        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardDescription);
        cardContent.appendChild(cardTechsContainer);
        
        cardLink.appendChild(cardImage);
        cardLink.appendChild(cardContent);

        return cardLink;
    }

    // Função principal para carregar os projetos no DOM.
    async function loadProjects(isFeatured = false) {
        const projectsContainer = document.getElementById(isFeatured ? 'featured-projects-container' : 'projects-container');
        if (!projectsContainer) return;

        try {
            const response = await fetch(`${pathToRoot}assets/data/projects.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const projectsData = await response.json();

            const projectsToRender = isFeatured ? projectsData.slice(0, 3) : projectsData;

            projectsContainer.innerHTML = ''; 

            projectsToRender.forEach(project => {
                const projectCard = createProjectCard(project);
                if (projectCard) {
                    projectsContainer.appendChild(projectCard);
                }
            });

        } catch (e) {
            console.error('Erro ao carregar os projetos:', e);
            projectsContainer.innerHTML = '<p class="text-center text-red-500">Erro ao carregar projetos. Tente novamente mais tarde.</p>';
        }
    }

    // Executa as funções de carregamento
    loadFavicon();
    loadHeader();
    loadFooter();

    // Carrega os projetos se a página for a de projetos completos ou a página inicial
    if (document.getElementById('projects-container')) {
        loadProjects();
    }
    if (document.getElementById('featured-projects-container')) {
        loadProjects(true);
    }

    // Função para adicionar a lógica de troca de tema
    function loadThemeSwitcher() {
        const themeToggle = document.getElementById('theme-toggle');
        const lightIcon = document.getElementById('theme-icon-light');
        const darkIcon = document.getElementById('theme-icon-dark');

        if (themeToggle && lightIcon && darkIcon) {
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                lightIcon.classList.add('hidden');
                darkIcon.classList.remove('hidden');
            } else {
                lightIcon.classList.remove('hidden');
                darkIcon.classList.add('hidden');
            }

            themeToggle.addEventListener('click', () => {
                const theme = document.documentElement.getAttribute('data-theme');
                if (theme === 'dark') {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.removeItem('theme');
                    lightIcon.classList.remove('hidden');
                    darkIcon.classList.add('hidden');
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    lightIcon.classList.add('hidden');
                    darkIcon.classList.remove('hidden');
                }
            });
        }
    }
});
