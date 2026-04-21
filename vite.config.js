import { defineConfig } from "vite";
import injectHtml from "vite-plugin-html-inject";
import { resolve } from "path";

export default defineConfig({
  plugins: [injectHtml()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "home.html"),
        producten: resolve(__dirname, "producten.html"),
        handtools: resolve(__dirname, "handtools.html"),
        powertools: resolve(__dirname, "powertools.html"),
        diagnose: resolve(__dirname, "diagnose.html"),
        specials: resolve(__dirname, "specials.html"),
        catalogus: resolve(__dirname, "catalogus.html"),
        contact: resolve(__dirname, "contact.html"),
        privacy: resolve(__dirname, "privacy.html"),
        404: resolve(__dirname, "404.html"),
      },
    },
  },
});
