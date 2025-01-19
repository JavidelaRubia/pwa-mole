/** @type {import('eslint').Linter.Config} */
import litPlugin from "eslint-plugin-lit";
import prettierPlugin from "eslint-plugin-prettier";
import typescriptParser from "@typescript-eslint/parser"; // Importar el parser de TypeScript

export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser, // Usar el parser de TypeScript
      globals: {
        browser: true,
        es2021: true,
      },
    },
    plugins: {
      lit: litPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
    settings: {
      eslint: {
        baseConfig: {
          extends: ["eslint:recommended", "plugin:lit/recommended", "plugin:prettier/recommended"],
        },
      },
    },
  },
  // Configuración para los archivos *.js, *.ts, *.html
  {
    files: ["*.js", "*.ts", "*.html"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-console": "warn", // Reglas específicas para estos archivos
    },
  },
];
