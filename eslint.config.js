import globals from "globals";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended});

export default [
  ...compat.extends("xo-typescript"),
  pluginReactConfig,
  {
    languageOptions: {
      globals: globals.node
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      quotes: "off",
      "@typescript-eslint/quotes": ["error", "double"],
      indent: "off",
      "@typescript-eslint/indent": ["error", 2],
      "@typescript-eslint/no-unsafe-assignment": "off"
    },
  },
  {
    ignores: [
      "**/.netlify/*",
      "**/dist/*",
      "eslint.config.js",
      "eslintrc.js",
      "postcss.config.cjs",
      "tailwind.config.js",
      "vite.config.js"
    ]
  }
];
