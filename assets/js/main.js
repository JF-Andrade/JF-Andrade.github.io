// Este script é responsável por carregar e injetar o cabeçalho e o rodapé
// em todas as páginas, e também por destacar o link da página ativa.

document.addEventListener('DOMContentLoaded', () => {
    // Determina o caminho base com base na localização do arquivo.
    const pathSegments = window.location.pathname.split('/').filter(segment => segment.length > 0);
    const isSubfolder = pathSegments.length > 1;
    const pathPrefix = isSubfolder ? '../' : '';

    // Função assíncrona para buscar e injetar o HTML do cabeçalho
    async function loadHeader() {
        try {
            // Usa o prefixo para carregar o arquivo do cabeçalho
            const response = await fetch(`${pathPrefix}assets/js/components/header.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const headerHtml = await response.text();
            
            // Encontra o elemento 'body' e insere o cabeçalho no início
            const body = document.body;
            body.insertAdjacentHTML('afterbegin', headerHtml);

            // Adiciona o menu de navegação dinamicamente
            loadNavigationMenu();

        } catch (e) {
            console.error('Erro ao carregar o cabeçalho:', e);
        }
    }

    // Função assíncrona para buscar e injetar o HTML do rodapé
    async function loadFooter() {
        try {
            // Usa o prefixo para carregar o arquivo do rodapé
            const response = await fetch(`${pathPrefix}assets/js/components/footer.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const footerHtml = await response.text();

            // Encontra o elemento 'body' e insere o rodapé no final
            const body = document.body;
            body.insertAdjacentHTML('beforeend', footerHtml);

        } catch (e) {
            console.error('Erro ao carregar o rodapé:', e);
        }
    }

    // Nova função para carregar e injetar as tags de favicon no <head>
    async function loadFavicon() {
        try {
            const response = await fetch(`${pathPrefix}assets/js/components/favicon.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const faviconHtml = await response.text();
            
            // Injeta o HTML do favicon na tag <head>
            const head = document.head;
            head.insertAdjacentHTML('beforeend', faviconHtml);
            
        } catch (e) {
            console.error('Erro ao carregar o favicon:', e);
        }
    }
    
    // Função para gerar o menu de navegação e destacar o item da página atual
    function loadNavigationMenu() {
        const navLinksData = [
            { text: 'Projetos', href: 'projects.html' },
            { text: 'Currículo', href: 'resume.html' },
            { text: 'Sobre Mim', href: 'about.html' },
            { text: 'Contato', href: 'contact.html' }
        ];

        const navContainer = document.querySelector('nav .flex');
        const currentPathname = window.location.pathname.split('/').pop();

        navLinksData.forEach(link => {
            const a = document.createElement('a');
            a.href = pathPrefix + link.href;
            a.textContent = link.text;
            a.classList.add('hover:text-gray-900', 'transition-colors', 'duration-200');

            // Destaca o link da página atual com base no nome do arquivo
            if (link.href === currentPathname || (currentPathname === '' && link.href === 'index.html')) {
                a.classList.add('text-blue-600', 'font-semibold');
                a.classList.remove('hover:text-gray-900');
            }

            navContainer.appendChild(a);
        });

        // Corrige o link para a página inicial
        const logoLink = document.querySelector('header nav > a');
        if (logoLink) {
            logoLink.href = pathPrefix + 'index.html';
        }
    }

    // Função para gerar o HTML de um "badge" de tecnologia.
    function createTechBadge(tech) {
        return `<span class="badge">${tech}</span>`;
    }

    // Função para gerar o HTML de um cartão de projeto a partir de um objeto.
    function createProjectCard(project) {
        const techBadges = project.technologies.map(createTechBadge).join('');

        // Ajusta o link do projeto para funcionar em subpastas
        const projectLink = isSubfolder ? project.link.replace('projects/', '') : project.link;

        return `
            <a href="${pathPrefix + projectLink}" class="project-card">
                <img src="${pathPrefix + project.image}" alt="${project.alt}" class="rounded-t-lg w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                    <p class="text-gray-600 text-sm mb-4">
                        ${project.description}
                    </p>
                    <div class="flex flex-wrap gap-2 text-xs font-medium text-gray-500">
                        ${techBadges}
                    </div>
                </div>
            </a>
        `;
    }

    // Função principal para carregar os projetos no DOM.
    async function loadProjects(isFeatured = false) {
        const projectsContainer = document.getElementById(isFeatured ? 'featured-projects-container' : 'projects-container');
        if (!projectsContainer) return;

        try {
            const response = await fetch(`${pathPrefix}assets/data/projects.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const projectsData = await response.json();

            // Filtra os 3 primeiros projetos se for a seção de destaque
            const projectsToRender = isFeatured ? projectsData.slice(0, 3) : projectsData;

            // Gera o HTML para os projetos e insere no contêiner.
            projectsContainer.innerHTML = projectsToRender.map(createProjectCard).join('');

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
});
