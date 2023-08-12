// https://vitejs.dev/config/
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve("index.ts"),
      name: "spc-kit-ui",
      fileName: "spcKitUI",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
