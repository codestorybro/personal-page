import { cp } from "node:fs/promises";
import { defineConfig } from "vite";
export default defineConfig({
  esbuild: { jsx: "automatic" },
  resolve: { dedupe: ["react", "react-dom"] },
  plugins: [
    {
      name: "pdf-resources",
      async closeBundle() {
        for (const directory of ["cmaps", "standard_fonts", "wasm"]) {
          await cp(
            `node_modules/pdfjs-dist/${directory}`,
            `dist/pdf/${directory}`,
            { recursive: true },
          );
        }
      },
    },
  ],
  server: {
    proxy: {
      "/api": { target: "http://127.0.0.1:8787", ws: true },
      "/pdf": { target: "http://127.0.0.1:8787" },
    },
  },
  build: { target: "es2022" },
});
