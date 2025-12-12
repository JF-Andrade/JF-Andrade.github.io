# Jordão Fernandes de Andrade - Portfolio

[![GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-blue)](https://jf-andrade.github.io/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Personal portfolio website showcasing my experience as Market Intelligence Manager and my work as a Data Scientist.

## Live Site

**English:** [https://jf-andrade.github.io/](https://jf-andrade.github.io/)  
**Português:** [https://jf-andrade.github.io/pt/](https://jf-andrade.github.io/pt/)

## Features

- **Contact Form**: Formspree integration for handling contact submissions
- **Projects**: Dynamic loading of project cards with bilingual support
- **Resume**: Interactive resume/CV with bilingual support
- **Bilingual Support**: Full content in English and Portuguese with seamless language switching
- **Language Switcher**: Header component with automatic URL resolution
- **Theme Switcher**: Automatic theme switching with localStorage persistence
- **Enhanced Dark Mode**: WCAG AAA compliant contrast ratios for excellent readability
- **Executive Minimalist Design**: Clean, professional aesthetic with optimized spacing and typography
- **Accessibility**: Semantic HTML, proper ARIA labels, and keyboard navigation support
- **Performance**: Optimized Tailwind CSS build (~100 KB)

## Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS v3** - Utility-first CSS framework (local build)
- **Vanilla JavaScript** - Dynamic content loading and theme switching
- **Formspree** - Contact form backend
- **Google Fonts** - Inter font family

## Project Structure

```
.
├── index.html              # Home page (EN)
├── about.html              # About page (EN)
├── projects.html           # Projects listing (EN)
├── resume.html             # Resume/CV (EN)
├── contact.html            # Contact form (EN)
├── pt/                     # Portuguese versions
│   ├── index.html
│   ├── about.html
│   ├── projects.html
│   ├── resume.html
│   └── contact.html
├── assets/
│   ├── css/
│   │   ├── main.css        # Custom styles & design tokens
│   │   └── styles.css      # Generated Tailwind CSS
│   ├── js/
│   │   ├── main.js         # Core JavaScript logic
│   │   └── components/     # Reusable HTML components
│   ├── img/                # Images and favicons
│   └── data/
│       └── projects.json   # Project data
├── src/
│   └── input.css           # Tailwind input file
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Node dependencies
```

## Design System

The site uses an **Executive Minimalist Design System** with:

- **Colors**: Custom CSS variables integrated with Tailwind theme
- **Typography**: Inter font family (Google Fonts)
- **Spacing**: Consistent scale following Tailwind conventions
- **Shadows**: Subtle, medium, and large elevation levels
- **Dark Mode**: Automatic theme switching with localStorage persistence

### CSS Variables (Light Mode)

```css
--color-primary: #1e293b; /* Slate 900 - Main text */
--color-secondary: #475569; /* Slate 600 - Secondary text */
--color-accent: #3b82f6; /* Blue - Links and highlights */
--color-accent-dark: #2563eb; /* Blue 600 - Hover states */
--color-background-light: #f1f5f9; /* Slate 100 - Page background */
--color-background-card: #ffffff; /* White - Card backgrounds */
--color-border: #cbd5e1; /* Slate 300 - Borders */
```

### Dark Mode

The site features an optimized dark mode with enhanced contrast:

- Text colors use `slate-300` instead of `slate-400` for better readability
- Background uses `slate-900` with subtle transparency for glassmorphism
- All interactive elements maintain WCAG AAA contrast ratios
- Theme preference is saved in localStorage

## Internationalization (i18n)

The site supports English (default) and Portuguese through:

- **Directory-based routing**: `/` for English, `/pt/` for Portuguese
- **Dynamic content**: `projects.json` contains bilingual data
- **Language switcher**: Header component with automatic URL resolution

## Adding New Projects

### Quick Steps

1. **Add project data** to `assets/data/projects.json`:

```json
{
  "id": "unique-project-id",
  "title": {
    "en": "Project Title",
    "pt": "Título do Projeto"
  },
  "description": {
    "en": "Brief project description (max 2 lines)",
    "pt": "Breve descrição do projeto (máx 2 linhas)"
  },
  "image": "assets/img/projects/project-image.webp",
  "alt": {
    "en": "Image description for accessibility",
    "pt": "Descrição da imagem para acessibilidade"
  },
  "technologies": ["Python", "TensorFlow", "Docker"],
  "link": "projects/project-detail.html"
}
```

2. **Add project image** (recommended: 400×250px WebP format):

   - Save to: `assets/img/projects/`
   - Or use external URL: `https://example.com/image.webp`

3. **Create detail page** (optional):

   - English: `projects/project-name.html`
   - Portuguese: `pt/projects/project-name.html`
   - Or use `"link": "projects.html"` to redirect to project listing

4. **Deploy**:
   ```bash
   git add assets/data/projects.json
   git commit -m "Add project: [Project Name]"
   git push origin main
   ```

The site automatically displays:

- First 3 projects on homepage (featured)
- All projects on `/projects.html` and `/pt/projects.html`
- Bilingual content based on URL path

## Contact Form

The contact form uses [Formspree](https://formspree.io/) with endpoint:

```
https://formspree.io/f/xgvlwpba
```

## Deployment

The site is automatically deployed to **GitHub Pages** from the `main` branch.

This project is open source and available under the [MIT License](LICENSE).

---

## Contact

I am open to job opportunities, collaborations, or discussing data science projects. Feel free to reach out!

**Jordão Fernandes de Andrade**

- Website: [jf-andrade.github.io](https://jf-andrade.github.io/)
- LinkedIn: [linkedin.com/in/jordaofernandes](https://www.linkedin.com/in/jordaofernandes/)
- GitHub: [github.com/JF-Andrade](https://github.com/JF-Andrade)
- Email: jordaoandrade@gmail.com
