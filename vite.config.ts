import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        contentScript: resolve(__dirname, 'src/contentScript.ts'),
        popupScript: resolve(__dirname, 'src/browserAction/script.ts'),
        style: resolve(__dirname, 'src/style.css')
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.[0]?.endsWith('.css'))
            return '[name].css';
          return '[name][extname]';
        }
      }
    }
  }
})
