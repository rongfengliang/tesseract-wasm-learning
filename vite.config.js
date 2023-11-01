import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ['tesseract-wasm']
  },
  build: {
    rollupOptions:{
      output:{
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
  assetsInclude: ['**/*.wasm',"**/*.traineddata"],
});