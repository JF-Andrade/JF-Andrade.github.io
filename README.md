# Portfólio de Machine Learning e Ciência de Dados - Jordão Fernandes de Andrade

Bem-vindo ao meu portfólio pessoal, um espaço dedicado a apresentar meus projetos e habilidades em Machine Learning, Ciência de Dados e Inteligência de Mercado. Este repositório serve como uma vitrine interativa das minhas capacidades técnicas e da minha paixão por transformar dados em soluções acionáveis.

## Sobre o Projeto

Este portfólio foi desenvolvido com foco em **modularidade**, **desempenho** e **experiência do usuário**, incluindo suporte a múltiplos idiomas (Português e Inglês). A arquitetura foi cuidadosamente planejada para ser escalável, de fácil manutenção e para garantir uma navegação fluida e responsiva em diversos dispositivos.

### Funcionalidades Principais

*   **Design Responsivo:** Adapta-se perfeitamente a desktops, tablets e smartphones.
*   **Conteúdo Dinâmico:** Projetos carregados dinamicamente a partir de um arquivo JSON, facilitando a atualização e expansão do portfólio.
*   **Suporte a Múltiplos Idiomas:** Conteúdo disponível em Português e Inglês, com alternância intuitiva.
*   **Modo Escuro:** Opção de tema claro/escuro para uma melhor experiência visual.
*   **Componentes Reutilizáveis:** Cabeçalho, rodapé e favicon injetados via JavaScript para consistência e manutenção simplificada.

### Tecnologias Utilizadas

*   **HTML5:** Estrutura semântica e acessível das páginas.
*   **CSS3:** Estilização moderna, com uso de variáveis CSS para fácil personalização.
*   **Tailwind CSS:** Framework CSS utilitário para um desenvolvimento rápido e um design responsivo e consistente.
*   **JavaScript (ES6+):** Lógica dinâmica para carregamento de componentes, manipulação do DOM, alternância de idioma e tema, e carregamento de dados de projetos.
*   **JSON:** Armazenamento estruturado dos dados dos projetos para carregamento dinâmico.
*   **GitHub Pages:** Plataforma de hospedagem para o site, garantindo fácil deploy e acesso global.

## Estrutura do Repositório

O projeto segue uma estrutura de pastas e arquivos organizada para facilitar a navegação e o desenvolvimento. As versões em Português e Inglês do site são mantidas em diretórios separados (`pt/` e `en/`), enquanto os arquivos HTML na raiz do projeto (`index.html`, `about.html`, etc.) servem como redirecionamentos para a versão em Português.

```text
.  
├── assets/  
│   ├── css/  
│   │   └── main.css           # Estilos principais da página
│   ├── data/  
│   │   └── projects.json      # Dados dos projetos (para carregamento dinâmico)
│   ├── docs/  
│   │   └── JordaoFernandes_PT_Resume_DataScience.pdf # Currículo em Português
│   │   └── JordaoFernandes_EN_Resume_DataScience.pdf # Currículo em Inglês
│   ├── img/  
│   │   ├── perfil_github.webp # Foto de perfil
│   │   └── ...                # Outras imagens e ícones (favicons, bandeiras)
│   └── js/  
│       ├── main.js            # Lógica principal do site
│       └── components/  
│           ├── header.html    # Componente do cabeçalho
│           ├── footer.html    # Componente do rodapé
│           └── favicon.html   # Componente do favicon
├── en/ # Versão em Inglês do site
│   ├── about.html
│   ├── contact.html
│   ├── index.html
│   ├── projects.html
│   ├── resume.html
│   └── projects/  
│       └── projeto-de-classificacao.html # Exemplo de página de projeto em Inglês
├── pt/ # Versão em Português do site
│   ├── about.html
│   ├── contact.html
│   ├── index.html
│   ├── projects.html
│   ├── resume.html
│   └── projects/  
│       └── projeto-de-classificacao.html # Exemplo de página de projeto em Português
├── index.html                 # Página inicial (redireciona para pt/index.html)
├── about.html                 # Página "Sobre Mim" (redireciona para pt/about.html)
├── contact.html               # Página de contato (redireciona para pt/contact.html)
├── projects.html              # Página de listagem de projetos (redireciona para pt/projects.html)
├── resume.html                # Página de currículo (redireciona para pt/resume.html)
└── README.md                  # Este arquivo
```

## Como Executar Localmente

Este projeto é um site estático e pode ser facilmente visualizado em seu ambiente local. Siga os passos abaixo:

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/JF-Andrade/JF-Andrade.github.io.git
    ```
2.  **Navegue até o Diretório:**
    ```bash
    cd JF-Andrade.github.io
    ```
3.  **Abra o `index.html`:**
    Simplesmente abra o arquivo `index.html` em seu navegador web preferido (por exemplo, Chrome, Firefox, Edge). Você pode fazer isso clicando duas vezes no arquivo ou arrastando-o para a janela do navegador.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Como Contribuir

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhoria, sinta-se à vontade para abrir uma issue ou enviar um pull request. Por favor, siga as diretrizes de código existentes e mantenha o padrão de qualidade.

## Contato

Conecte-se comigo e vamos conversar sobre ciência de dados, machine learning ou oportunidades de colaboração!

*   **LinkedIn:** [https://www.linkedin.com/in/jordaofernandes/](https://www.linkedin.com/in/jordaofernandes/)  
*   **E-mail:** [jordaoandrade@gmail.com](mailto:jordaoandrade@gmail.com)
