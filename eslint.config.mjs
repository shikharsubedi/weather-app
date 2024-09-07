import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import mochaPlugin from "eslint-plugin-mocha";


export default [
  {ignores: ['dist/']},
  {files: ["src/**/*.ts"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  mochaPlugin.configs.flat.recommended,
  eslintConfigPrettier,
];