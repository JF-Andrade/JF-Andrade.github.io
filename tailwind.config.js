/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./pt/**/*.html", "./assets/js/**/*.js", "./assets/js/components/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          dark: 'var(--color-accent-dark)',
        },
        background: {
          light: 'var(--color-background-light)',
          card: 'var(--color-background-card)',
        },
        border: 'var(--color-border)',
      },
      boxShadow: {
        subtle: 'var(--shadow-subtle)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
  safelist: [
    'text-blue-600',
    'font-semibold',
    'hover:text-blue-600',
    'transition-colors',
    'duration-200',
    'gap-4',
    'gap-6',
    'gap-8',
    'md:gap-8',
  ],
  plugins: [],
}
