/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "cypress";
// import codeCoverage from "@cypress/code-coverage/task";

export default defineConfig({
  projectId: "18kd2b",
  e2e: {
    baseUrl: "http://localhost:3100",
    env: {
      codeCoverageTasksRegistered: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // codeCoverage(on, config);
      return config;
    },
  },
});
