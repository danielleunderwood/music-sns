import eslint from "@eslint/js";
import pluginHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";

export default [
  ...tseslint.config(eslint.configs.recommended, tseslint.configs.recommended),
  eslintPluginJsxA11y.flatConfigs.recommended,
  reactRefresh.configs.vite,
  {
    plugins: {
      "react-hooks": pluginHooks,
    },
    rules: {
      ...pluginHooks.configs.recommended.rules,
    },
    env: { browser: true },
  },
  eslintPluginPrettierRecommended,
];
