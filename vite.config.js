import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config for the Project Companion prototype. The four dashboard files
// are independent components; src/main.jsx mounts the App chooser defined in
// src/App.jsx.
export default defineConfig({
  plugins: [react()],
});
