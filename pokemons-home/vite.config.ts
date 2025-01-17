import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "pokemonHome",
      remotes: {
        pokemonList: "http://localhost:5173/assets/remoteEntry.js",
        langflow: "http://localhost:4174/langflow/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom","react-router-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
