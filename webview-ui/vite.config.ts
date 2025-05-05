import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "build",
    // lib: {
    //   entry: "./src/extension.ts", // Your extension's main entry file
    //   formats: ["cjs"], // VS Code extensions typically use CommonJS format
    //   fileName: "extension", // The output file name
    // },
    rollupOptions: {
      external: ["vscode"],
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
