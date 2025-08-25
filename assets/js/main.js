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

    // Executa as funções de carregamento
    loadHeader();
    loadFooter();
});
