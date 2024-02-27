/* eslint-disable @typescript-eslint/no-unused-vars */
import { exec } from "child_process";
import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "18kd2b",
  e2e: {
    baseUrl: "http://localhost:3100",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
