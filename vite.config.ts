import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

import tsconfig from "./tsconfig.json";

const getAliasesFromTsConfig = () => {
  const { paths } = tsconfig.compilerOptions;
  const aliases = {};

  Object.entries(paths).forEach(([key, value]) => {
    const vitePath = value[0].replace("/*", "");
    const viteKey = key.replace("/*", "");
    aliases[viteKey] = path.resolve(__dirname, `${vitePath}`);
  });

  return aliases;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"', // for example, lint .ts & .tsx
      },
    }),
  ],
  resolve: {
    alias: {
      ...getAliasesFromTsConfig(),
    },
  },
});
