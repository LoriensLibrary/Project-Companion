import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config for the Project Companion prototype. The four dashboard files
// are independent components; src/main.jsx mounts the App chooser defined in
// src/App.jsx.
//
// /api/cama/* is proxied to a locally-running CAMA dashboard (`docker compose
// up` in the cama repo, or `python cama_dashboard.py` against an existing
// install). Set CAMA_PROXY_TARGET to override the default localhost:5555.
// Requests that arrive when CAMA isn't running fail fast — the
// useCamaMemory hook handles the fallback to sample data.
const CAMA_PROXY_TARGET = process.env.CAMA_PROXY_TARGET || "http://localhost:5555";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/cama": {
        target: CAMA_PROXY_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cama/, "/api"),
      },
    },
  },
});
