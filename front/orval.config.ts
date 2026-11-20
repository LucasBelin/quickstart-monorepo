import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "http://localhost:3000/api-json",
    output: {
      target: "./src/api/generated/api.ts",
      client: "react-query",
      mode: "tags-split",
      schemas: "./src/api/generated/models",
      httpClient: "axios",
    },
  },
});
