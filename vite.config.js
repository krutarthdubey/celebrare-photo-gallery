import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: false,
    cssMinify: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/gallery.js",
        chunkFileNames: "assets/chunks/[name].js",
        assetFileNames: (asset) =>
          asset.name?.endsWith(".css") ? "assets/gallery.css" : "assets/[name][extname]",
      },
    },
  },
});
