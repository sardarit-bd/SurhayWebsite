/* Tailwind 4 laeuft in Next ueber PostCSS statt ueber das Vite-Plugin.
   Dieselbe Engine, dieselbe global.css, dieselben @theme-Tokens. */
export default {
  plugins: { '@tailwindcss/postcss': {} },
};
