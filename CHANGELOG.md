# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2025-11-23

### Changed - Header & Footer Redesign
- **Complete header reconstruction** with Executive Minimalist design
  - Removed logo text for cleaner, more professional appearance
  - Navigation links now left-aligned for better visual hierarchy
  - Implemented rounded-square toggle for language switcher (EN/PT)
  - Enhanced glassmorphism effect with `backdrop-blur-sm` and 95% opacity
  - Improved spacing and alignment for desktop experience

- **Dark Mode optimization** for excellent readability
  - Updated text colors from `slate-400/500` to `slate-300/600`
  - Significantly improved contrast ratios for WCAG AAA compliance
  - Enhanced visibility of all interactive elements (buttons, links, icons)

- **Footer updates**
  - Updated name to full "Jordão Fernandes de Andrade"
  - Corrected LinkedIn URL to https://www.linkedin.com/in/jordaofernandes/
  - Increased icon size from 20px to 24px for better visibility
  - Changed email icon to "send" (paper plane) for clearer affordance
  - Improved Dark Mode contrast for footer text

### Technical Improvements
- Cleaned up `main.css` by removing unused legacy code (`.lang-switcher`)
- Optimized JavaScript color classes for better Dark Mode support
- Added proper accessibility attributes (`aria-label`, focus states)
- Reduced header height from `h-24` to `h-20` for more screen real estate

### Documentation
- Created comprehensive implementation plan for header rebuild
- Updated `WALKTHROUGH.md` with detailed verification checklist
- Added `PHASE_1_ANALYSIS.md`, `PHASE_2_EVALUATION.md`, `PHASE_3_RECOMMENDATIONS.md`
- Updated `README.md` with correct contact information

## [2.0.0] - 2025-11-22

### Added
- Local Tailwind CSS build replacing CDN for improved performance
- SEO meta tags (Open Graph, Twitter Cards) for rich social media previews
- Unified design system integrating CSS variables with Tailwind theme
- `.gitignore` file for cleaner repository management
- Contact form in English version (was missing)
- Comprehensive `README.md` with setup and usage instructions
- `LICENSE` file (MIT License)
- This `CHANGELOG.md` file

### Changed
- Migrated from Tailwind CDN (3+ MB) to local build (~100 KB optimized CSS)
- Updated all 14 HTML files to use local CSS instead of CDN script
- Enhanced `tailwind.config.js` with custom color and shadow tokens
- Improved accessibility (WCAG AA compliant color contrast)

### Fixed
- Missing contact form in English version (`contact.html`)
- Inconsistent styling between CDN and custom CSS

### Performance
- **90% reduction** in CSS download size (3+ MB → ~100 KB)
- Eliminated render-blocking CDN script
- Improved Largest Contentful Paint (LCP) metrics

## [1.0.0] - Initial Release

### Added
- Bilingual portfolio website (English and Portuguese)
- Home, About, Projects, Resume, and Contact pages
- Dynamic project loading from JSON
- Dark mode support with theme switcher
- Responsive design for mobile, tablet, and desktop
- Google Fonts integration (Inter)
- Formspree contact form integration
