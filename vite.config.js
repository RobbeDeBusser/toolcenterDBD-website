import { defineConfig } from "vite";
import injectHtml from "vite-plugin-html-inject";
import { resolve } from "path";

export default defineConfig({
  plugins: [injectHtml()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        producten: resolve(__dirname, "producten.html"),
        handtools: resolve(__dirname, "handtools.html"),
        contact: resolve(__dirname, "contact.html"),
        powertools: resolve(__dirname, "powertools.html"),
        diagnose: resolve(__dirname, "diagnose.html"),
        specials: resolve(__dirname, "specials.html"),
      },
    },
  },
});
