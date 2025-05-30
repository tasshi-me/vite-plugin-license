import presetsNodeTypescriptPrettier from "@cybozu/eslint-config/flat/presets/node-typescript-prettier.js";
import eslintPluginPackageJson from "eslint-plugin-package-json";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...presetsNodeTypescriptPrettier,
  eslintPluginPackageJson.configs.recommended,
];
