import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import react from "eslint-plugin-react";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from "@stylistic/eslint-plugin-ts";

/**
 * Rules to consider:
 * 
 * "@typescript-eslint/no-unsafe-assignment": "off",
 * "@typescript-eslint/dot-notation": "off",
 */

export default tseslint.config(
  pluginReactConfig,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@stylistic/ts": stylisticTs,
      react,
    },
    rules: {
      "@stylistic/ts/quotes": ["error", "double"],
      "@stylistic/ts/indent": ["error", 2],
      "react/no-unescaped-entities": "off",
    }
  },
  {
    ignores: [
      ".netlify/*",
      "dist/*",
      "*.js",
      "*.cjs",
      "*.mjs",
    ],
  }
)
