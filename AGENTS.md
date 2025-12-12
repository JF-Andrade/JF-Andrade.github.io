# AGENTS.md - AI Coding Assistant Guide

This document serves as the **authoritative instruction manual** for AI agents working on the **Jordão Fernandes Portfolio**. It defines the architectural constraints, coding standards, and operational workflows required to maintain the project's "Executive Minimalist" quality and functional stability.

## 1. Project Context & Philosophy

- **Project Name:** Jordão Fernandes Portfolio
- **Purpose:** Personal branding for a Senior Data Scientist/Manager. The site must convey professionalism, technical depth, and executive presence.
- **Design Philosophy:** "Executive Minimalist". High contrast, perfect spacing, clean typography (Inter), and subtle animations. No clutter.
- **Tech Stack:**
  - **Core:** HTML5, Vanilla JavaScript (ES6+).
  - **Styling:** Tailwind CSS v3 (Local Build) + Custom CSS variables for theming.
  - **Data:** JSON-based content management (`assets/data/projects.json`).
  - **Hosting:** GitHub Pages (Static).

## 2. Agent Role & Directives

### 2.1 Persona

Act as a **Senior Frontend Engineer & UX Specialist**. Your code should be robust, accessible, and performant. Your design suggestions should be elegant and professional.

### 2.2 Core Directives

- **Preserve Architecture:** Do NOT refactor the core architecture (HTML injection, Vanilla JS) to a framework (React, Vue) or SSG without explicit user request.
- **Tailwind First:** Always use Tailwind utility classes. Only use `assets/css/main.css` for custom components or theme variables.
- **Bilingual by Default:** Every new feature or text content MUST support both English (`en`) and Portuguese (`pt`).
- **Accessibility is Mandatory:** All interactive elements must have focus states and ARIA attributes. All images must have `alt` text and explicit dimensions.

## 3. Architecture & Patterns

### 3.1 Client-Side HTML Injection (CRITICAL)

The project uses a specific pattern to load shared components (`header.html`, `footer.html`) to avoid code duplication on a static host.

- **Mechanism:** `fetch` -> `text()` -> `insertAdjacentHTML`.
- **Constraint:** This causes Cumulative Layout Shift (CLS).
- **Mitigation:** You MUST ensure CSS rules in `main.css` reserve space for these elements (e.g., `body { padding-top: 5rem; }`, `#main-header { height: 5rem; }`) to prevent visual jumps.

### 3.2 Bilingual Routing

- **Structure:**
  - Root (`/`): English version.
  - Subfolder (`/pt/`): Portuguese version.
- **Logic:** `assets/js/main.js` detects the language based on the URL path and adjusts links dynamically.
- **Rule:** When creating a new page (e.g., `blog.html`), you MUST create its counterpart in `pt/blog.html`.

### 3.3 Dark Mode

- **Implementation:** Tailwind `darkMode: 'class'`.
- **Persistence:** `localStorage.getItem('theme')`.
- **Rule:** All color definitions in `tailwind.config.js` or `main.css` must have a dark mode counterpart (e.g., `--color-primary` vs `[data-theme="dark"] --color-primary`).

## 4. Development Workflows

### 4.1 Adding a New Project

1.  **Image:** Add a WebP image (400x250px recommended) to `assets/img/projects/`.
2.  **Data:** Append a new object to `assets/data/projects.json`.
    - **Required Fields:** `id`, `title` (en/pt), `description` (en/pt), `image`, `alt` (en/pt), `technologies`, `link`.
3.  **Verification:** Check if the project appears on both the Home page (Featured) and Projects page in both languages.

### 4.2 Modifying Styles

1.  **Edit:** Make changes in `src/input.css` or HTML classes.
2.  **Build:** Run `npm run build:css` to generate `assets/css/styles.css`.
3.  **Watch:** Use `npm run watch:css` during development.
4.  **Note:** Do not edit `assets/css/styles.css` directly; it is a generated file.

## 5. Coding Standards

### 5.1 HTML & Accessibility

- **Images:** `<img src="..." alt="..." width="400" height="250" loading="lazy">`. Explicit dimensions are required to prevent CLS.
- **Links:** Use semantic `<a>` tags. External links should have `rel="noopener noreferrer"`.
- **Interactive:** Buttons/Toggles must update `aria-pressed` or `aria-expanded` states via JS.

### 5.2 JavaScript

- **Style:** Functional, modular, ES6+.
- **Error Handling:** Wrap `fetch` calls in `try/catch` blocks.
- **DOM Manipulation:** Use `document.getElementById` or `querySelector`. Cache selectors if used repeatedly.

## 6. Operational Constraints (Dos and Don'ts)

- **DO** use `npm run watch:css` when changing Tailwind classes.
- **DO** test navigation links in both English and Portuguese modes.
- **DON'T** open `index.html` directly via file protocol (`file://`). Use a local server (Live Server) because `fetch` requests (CORS) and absolute paths require http/https.
- **DON'T** use `alert()` for debugging. Use `console.log` or UI feedback.
- **DON'T** commit `node_modules`.

## 7. Verification Checklist

Before finishing a task, verify:

1.  [ ] **Console:** No JavaScript errors.
2.  [ ] **Network:** No 404s for images or CSS/JS files.
3.  [ ] **Responsiveness:** Layout works on Mobile (320px), Tablet (768px), and Desktop (1024px+).
4.  [ ] **Language:** Switching language preserves the current page (if possible) and updates all text.
5.  [ ] **Dark Mode:** Toggling theme updates colors instantly and persists after reload.

## 8. Useful Commands

- `npm install`: Install dependencies.
- `npm run build:css`: Compile Tailwind for production.
- `npm run watch:css`: Watch for changes in Tailwind classes.
