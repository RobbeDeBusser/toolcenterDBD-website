import { defineConfig } from "vite";
import injectHtml from "vite-plugin-html-inject";
import { resolve } from "path";

export default defineConfig({
  plugins: [injectHtml()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
});
