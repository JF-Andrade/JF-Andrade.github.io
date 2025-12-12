// Este script é responsável por carregar e injetar o cabeçalho, o rodapé
// em todas as páginas, e também por destacar o link da página ativa.

document.addEventListener("DOMContentLoaded", () => {
  // Calcula o caminho relativo para a raiz do projeto a partir da página atual.
  const getPathToRoot = () => {
    const path = window.location.pathname;
    const segments = path.split("/").filter((s) => s.length > 0);
    // Se o último segmento for um arquivo HTML, remove-o para obter o caminho do diretório.
    const currentDirSegments = segments.filter((s) => !s.includes(".html"));
    let pathToRoot = "";
    for (let i = 0; i < currentDirSegments.length; i++) {
      pathToRoot += "../";
    }
    return pathToRoot;
  };

  const pathToRoot = getPathToRoot();

  // Determina o idioma atual com base na URL.
  const currentLang = window.location.pathname.startsWith("/pt/") ? "pt" : "en";

  // Função assíncrona para buscar e injetar o HTML do cabeçalho
  async function loadHeader() {
    try {
      const response = await fetch(
        `${pathToRoot}assets/js/components/header.html`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const headerHtml = await response.text();

      const body = document.body;
      body.insertAdjacentHTML("afterbegin", headerHtml);

      // Injeta os links de navegação
      injectNavLinks();

      loadLanguageSwitcher();
      loadThemeSwitcher();

      // Adiciona efeito de scroll no header
      const header = document.getElementById("main-header");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
          header.classList.add("shadow-sm");
        } else {
          header.classList.remove("shadow-sm");
        }
      });
    } catch (e) {
      console.error("Erro ao carregar o cabeçalho:", e);
    }
  }

  // Função para injetar e destacar os links de navegação
  function injectNavLinks() {
    const navContainer = document.getElementById("nav-links-container");
    if (!navContainer) return;

    const navLinksData = {
      pt: [
        { text: "Início", href: "index.html" },
        { text: "Projetos", href: "projects.html" },
        { text: "Currículo", href: "resume.html" },
        { text: "Sobre Mim", href: "about.html" },
        { text: "Contato", href: "contact.html" },
      ],
      en: [
        { text: "Home", href: "index.html" },
        { text: "Projects", href: "projects.html" },
        { text: "Resume", href: "resume.html" },
        { text: "About", href: "about.html" },
        { text: "Contact", href: "contact.html" },
      ],
    };

    const linksToUse = navLinksData[currentLang] || navLinksData.en;
    const currentFilename = window.location.pathname.split("/").pop();

    const linksHtml = linksToUse
      .map((link) => {
        // Lógica de Active Link
        const isActive =
          link.href === currentFilename ||
          (currentFilename === "" && link.href === "index.html");

        // Estilos Executive Minimalist
        const baseClasses =
          "text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent rounded-md px-2 py-1";
        const inactiveClasses =
          "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100";
        const activeClasses =
          "text-slate-900 dark:text-slate-100 font-semibold";

        const finalClasses = `${baseClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`;

        return `<a href="${pathToRoot}${currentLang === "pt" ? "pt/" : ""}${
          link.href
        }" class="${finalClasses}">${link.text}</a>`;
      })
      .join("");

    navContainer.innerHTML = linksHtml;
  }

  // Função para adicionar a lógica de troca de idioma (Rounded Toggle)
  function loadLanguageSwitcher() {
    const btnEn = document.getElementById("lang-en");
    const btnPt = document.getElementById("lang-pt");

    if (!btnEn || !btnPt) return;

    // Estilos de estado
    const activeClass = [
      "bg-white",
      "dark:bg-slate-700",
      "shadow-sm",
      "text-slate-900",
      "dark:text-slate-100",
    ];
    const inactiveClass = [
      "text-slate-600",
      "dark:text-slate-300",
      "hover:text-slate-900",
      "dark:hover:text-slate-100",
    ];

    // Função auxiliar para atualizar estado visual e ARIA
    const setLangState = (activeBtn, inactiveBtn) => {
      activeBtn.classList.add(...activeClass);
      activeBtn.classList.remove(...inactiveClass);
      activeBtn.setAttribute("aria-pressed", "true");

      inactiveBtn.classList.add(...inactiveClass);
      inactiveBtn.classList.remove(...activeClass);
      inactiveBtn.setAttribute("aria-pressed", "false");
    };

    // Aplica estilos iniciais
    if (currentLang === "en") {
      setLangState(btnEn, btnPt);
    } else {
      setLangState(btnPt, btnEn);
    }

    // Lógica de redirecionamento (Mantida igual)
    // Logic for URL redirection (Language Switch)
    const currentPathname = window.location.pathname;
    
    // Normalize path to remove leading slash for easier processing, but keep it for logic
    let cleanPath = currentPathname;
    
    // Remove '/pt/' prefix if present to get the "canonical" English path
    if (cleanPath.startsWith("/pt/")) {
        cleanPath = cleanPath.substring(3); // Remove '/pt'
    } else if (cleanPath === "/pt") {
        cleanPath = "/";
    }

    btnEn.addEventListener("click", () => {
      if (currentLang === "en") return;
      // Target is just the clean path (English is root)
      window.location.href = cleanPath || "/";
    });

    btnPt.addEventListener("click", () => {
      if (currentLang === "pt") return;
      // Target is /pt/ + clean path
      // Ensure we don't double slash if cleanPath starts with /
      let targetPath = cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath;
      window.location.href = "/pt" + targetPath;
    });
  }

  // Função assíncrona para buscar e injetar o HTML do rodapé
  async function loadFooter() {
    try {
      const response = await fetch(
        `${pathToRoot}assets/js/components/footer.html`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const footerHtml = await response.text();

      const body = document.body;
      body.insertAdjacentHTML("beforeend", footerHtml);

      // Atualiza o ano automaticamente
      const yearSpan = document.getElementById("current-year");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    } catch (e) {
      console.error("Erro ao carregar o rodapé:", e);
    }
  }

  // Nova função para carregar e injetar as tags de favicon no <head>
  async function loadFavicon() {
    try {
      const response = await fetch(
        `${pathToRoot}assets/js/components/favicon.html`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const faviconHtml = await response.text();

      const head = document.head;
      head.insertAdjacentHTML("beforeend", faviconHtml);
    } catch (e) {
      console.error("Erro ao carregar o favicon:", e);
    }
  }

  // Função para gerar o HTML de um "badge" de tecnologia.
  function createTechBadge(tech) {
    return `<span class="badge">${tech}</span>`;
  }

  // Função para gerar o HTML de um cartão de projeto a partir de um objeto.
  function createProjectCard(project) {
    const cardLink = document.createElement("a");
    const cardImage = document.createElement("img");
    const cardTitle = document.createElement("h4");
    const cardDescription = document.createElement("p");
    const cardTechsContainer = document.createElement("div");

    cardLink.className =
      "project-card block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent";

    if (
      project.link.startsWith("http://") ||
      project.link.startsWith("https://")
    ) {
      cardLink.href = project.link;
    } else {
      let projectLinkPath = project.link;
      if (currentLang === "pt" && !projectLinkPath.startsWith("pt/")) {
        projectLinkPath = `pt/${projectLinkPath}`;
      }
      cardLink.href = pathToRoot + projectLinkPath;
    }

    cardImage.className = "project-image w-full h-48 object-cover";
    cardImage.loading = "lazy";
    // Adiciona dimensões explícitas para evitar Layout Shift
    cardImage.width = 400;
    cardImage.height = 250;

    if (
      project.image.startsWith("http://") ||
      project.image.startsWith("https://")
    ) {
      cardImage.src = project.image;
    } else {
      cardImage.src = pathToRoot + project.image;
    }
    cardImage.alt = project.alt[currentLang];

    const cardContent = document.createElement("div");
    cardContent.className = "p-6";

    cardTitle.className = "project-title text-xl font-bold mb-2 text-gray-900";
    cardTitle.textContent = project.title[currentLang];

    cardDescription.className = "project-description text-gray-700 mb-4";
    cardDescription.textContent = project.description[currentLang];

    cardTechsContainer.className = "project-technologies flex flex-wrap gap-2";
    project.technologies.forEach((tech) => {
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
    const projectsContainer = document.getElementById(
      isFeatured ? "featured-projects-container" : "projects-container"
    );
    if (!projectsContainer) return;

    try {
      const response = await fetch(`${pathToRoot}assets/data/projects.json`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const projectsData = await response.json();

      const projectsToRender = isFeatured
        ? projectsData.slice(0, 3)
        : projectsData;

      projectsContainer.innerHTML = "";

      projectsToRender.forEach((project) => {
        const projectCard = createProjectCard(project);
        if (projectCard) {
          projectsContainer.appendChild(projectCard);
        }
      });
    } catch (e) {
      console.error("Erro ao carregar os projetos:", e);
      projectsContainer.innerHTML =
        '<p class="text-center text-red-500">Erro ao carregar projetos. Tente novamente mais tarde.</p>';
    }
  }

  // Função para carregar e injetar a tag do GA4 no <head>
  async function loadGa4() {
    try {
      const response = await fetch(
        `${pathToRoot}assets/js/components/ga4.html`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const ga4Html = await response.text();

      const head = document.head;
      head.insertAdjacentHTML("beforeend", ga4Html);
    } catch (e) {
      console.error("Erro ao carregar a tag do GA4:", e);
    }
  }

  loadFavicon();
  loadGa4();
  loadHeader();
  loadFooter();

  if (document.getElementById("projects-container")) {
    loadProjects();
  }
  if (document.getElementById("featured-projects-container")) {
    loadProjects(true);
  }

  // Função para adicionar a lógica de troca de tema
  function loadThemeSwitcher() {
    const themeToggle = document.getElementById("theme-toggle");
    const lightIcon = document.getElementById("theme-icon-light");
    const darkIcon = document.getElementById("theme-icon-dark");

    if (themeToggle && lightIcon && darkIcon) {
      const currentTheme = localStorage.getItem("theme");

      const updateIcons = (theme) => {
        if (theme === "dark") {
          lightIcon.classList.add("hidden");
          darkIcon.classList.remove("hidden");
        } else {
          lightIcon.classList.remove("hidden");
          darkIcon.classList.add("hidden");
        }
      };

      if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.classList.add("dark");
        updateIcons("dark");
      } else {
        document.documentElement.classList.remove("dark");
        updateIcons("light");
      }

      themeToggle.addEventListener("click", () => {
        const theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
          document.documentElement.removeAttribute("data-theme");
          document.documentElement.classList.remove("dark");
          localStorage.removeItem("theme");
          updateIcons("light");
          themeToggle.setAttribute('aria-pressed', 'false');
        } else {
          document.documentElement.setAttribute("data-theme", "dark");
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
          updateIcons("dark");
          themeToggle.setAttribute('aria-pressed', 'true');
        }
      });
      
      // Define estado inicial do aria-pressed
      themeToggle.setAttribute('aria-pressed', currentTheme === 'dark' ? 'true' : 'false');
    }
  }
});
