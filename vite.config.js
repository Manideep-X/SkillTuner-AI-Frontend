import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from "fs"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  // Loads environment variables for current mdoe into node.js
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: env.VITE_IS_ENV_PROD === "true"
      ? undefined
      : {
          https: {
            key: fs.readFileSync("./certs/localhost-key.pem"),
            cert: fs.readFileSync("./certs/localhost.pem"),
          },
        },
  };
})
