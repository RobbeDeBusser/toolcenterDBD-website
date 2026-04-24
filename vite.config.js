import { defineConfig } from "vite";
import injectHtml from "vite-plugin-html-inject";
import { resolve } from "path";

export default defineConfig({
  plugins: [injectHtml()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        producten: resolve(__dirname, "pages/producten.html"),
        handtools: resolve(__dirname, "pages/handtools.html"),
        powertools: resolve(__dirname, "pages/powertools.html"),
        diagnose: resolve(__dirname, "pages/diagnose.html"),
        specials: resolve(__dirname, "pages/specials.html"),
        catalogus: resolve(__dirname, "pages/catalogus.html"),
        contact: resolve(__dirname, "pages/contact.html"),
        privacy: resolve(__dirname, "pages/privacy.html"),
        404: resolve(__dirname, "pages/404.html"),
      },
    },
  },
});
