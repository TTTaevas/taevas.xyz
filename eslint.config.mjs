import react from "eslint-plugin-react";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
  react.configs.flat.recommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylisticTypeChecked,
  {
    settings: {
      react: {
        version: "detect",
      }
    }
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      }
    }
  },
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/semi": ["error", "always"],
      "react/no-unescaped-entities": "off",
      "no-async-promise-executor": "off",
    }
  },
  {
    ignores: [
      "dist/*",
      "*.js",
      "*.cjs",
      "*.mjs",
    ],
  }
)
