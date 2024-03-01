import { defineConfig, UserConfig } from "vitest/config";
import * as path from "path";

const config: UserConfig = {
  test: {
    coverage: {
      provider: "v8", // or 'istanbul'
      reporter: ["text", "json", "html"],
      reportsDirectory: "../frontend_coverage",
      exclude: [
        "**/__test__/**",
        "**/type/**",
        ".eslintrc.cjs",
        "**/**coverage/**",
        "**/index.tsx",
        "**/reportWebVitals.ts ",
        "**/build/**",
      ],
    },
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.{js,ts,jsx,tsx}"],
    setupFiles: ["src/__test__/mock/vitest.setup.ts"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};

export default defineConfig(config);
