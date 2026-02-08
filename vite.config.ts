import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  publicDir: "public",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@bm-types": resolve(__dirname, "src/types"),
      "@popup": resolve(__dirname, "src/popup"),
      "@background": resolve(__dirname, "src/background"),
      "@content": resolve(__dirname, "src/content"),
      "@assets": resolve(__dirname, "src/assets"),
      "@utility": resolve(__dirname, "src/utility")
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        contentScript: resolve(__dirname, "src/content/script.ts"),
        popupScript: resolve(__dirname, "src/popup/script.ts"),
        backgroundScript: resolve(__dirname, "src/background/script.ts"),
        style: resolve(__dirname, "src/style.css")
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.[0]?.endsWith(".css")) return "[name].css";
          return "[name][extname]";
        }
      }
    }
  }
});
