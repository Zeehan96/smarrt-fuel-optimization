import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Two env files only: `.env.dev` (development), `.env.prod` (production build / dev:prod)
  const envFile = mode === "production" ? ".env.prod" : ".env.dev";

  const envVars = {};
  const envPath = resolve(process.cwd(), envFile);
  if (existsSync(envPath)) {
    try {
      const envContent = readFileSync(envPath, "utf-8");
      envContent.split("\n").forEach((line) => {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith("#")) {
          const equalIndex = trimmedLine.indexOf("=");
          if (equalIndex > 0) {
            const key = trimmedLine.substring(0, equalIndex).trim();
            const value = trimmedLine.substring(equalIndex + 1).trim();
            if (key && key.startsWith("VITE_")) {
              process.env[key] = value;
              envVars[key] = value;
            }
          }
        }
      });
    } catch (error) {
      console.warn(
        `Could not load ${envFile}, using default env variables:`,
        error.message,
      );
    }
  }

  const env = loadEnv(mode, process.cwd(), "");
  const mergedEnv = { ...env, ...envVars };

  return {
    plugins: [react()],
    server: {
      port: 8001,
      host: true,
    },
    define: {
      "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
        mergedEnv.VITE_API_BASE_URL || "",
      ),
      "import.meta.env.VITE_PIC_BASE_URL": JSON.stringify(
        mergedEnv.VITE_PIC_BASE_URL || "",
      ),
      "import.meta.env.VITE_PROJECT_MODE": JSON.stringify(
        mergedEnv.VITE_PROJECT_MODE ||
          (mode === "production" ? "production" : "development"),
      ),
    },
  };
});
