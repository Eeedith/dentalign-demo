import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "static-app",
  base: "./",
  publicDir: "../public",
  plugins: [
    {
      name: "relative-public-assets",
      enforce: "pre",
      transform(code, id) {
        if (!id.replaceAll("\\", "/").endsWith("/app/page.tsx")) return;
        return {
          code: code.replaceAll('"/assets/', '"./assets/'),
          map: null,
        };
      },
    },
    react(),
  ],
  build: {
    outDir: "../dist-pages",
    emptyOutDir: true,
  },
});
