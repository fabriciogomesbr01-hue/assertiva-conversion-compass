import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Gera um site 100% estático (HTML pré-renderizado) em dist/client, publicado no GitHub Pages.
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true, failOnError: true },
      pages: [{ path: "/obrigado" }],
    }),
    viteReact(),
  ],
});
