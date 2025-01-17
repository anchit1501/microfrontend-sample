import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  API_ROUTES,
  BASENAME,
  PORT,
  PROXY_TARGET,
} from "./src/customization/config-constants";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const apiRoutes = API_ROUTES || ["^/api/v1/", "/health"];

  const target =
    env.VITE_PROXY_TARGET || PROXY_TARGET || "http://127.0.0.1:7860";

  const port = Number(env.VITE_PORT) || PORT || 3000;

  const proxyTargets = apiRoutes.reduce((proxyObj, route) => {
    proxyObj[route] = {
      target: target,
      changeOrigin: true,
      secure: false,
      ws: true,
    };
    return proxyObj;
  }, {});

  return {
    base: BASENAME || "",
    build: {
      outDir: "dist",
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
      assetsDir: 'assets', // Directory for assets
    rollupOptions: {
      output: {
        // Ensure paths are resolved correctly
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
      
    },
    define: {
      "process.env.BACKEND_URL": JSON.stringify(env.BACKEND_URL),
      "process.env.ACCESS_TOKEN_EXPIRE_SECONDS": JSON.stringify(
        env.ACCESS_TOKEN_EXPIRE_SECONDS
      ),
      "process.env.CI": JSON.stringify(env.CI),
    },
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      federation({
        name: "langflow",
        filename: "remoteEntry.js",
        exposes: {
          "./langflow": "./src/App",
          "./langflowRoutes": "./src/routes",
        },
        shared: ["react", "react-dom","react-router-dom"],
      }),
    ],
    server: {
      port: port,
      proxy: {
        ...proxyTargets,
      },
      fs: {
        strict: false,
      },
    },
  };
});
