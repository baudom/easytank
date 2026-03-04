import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: [
            ".next/*",
            "node_modules/*",
            "dist/*",
            "coverage/*",
            "playwright-report/*",
            "test-results/*",
            "next-env.d.ts",
            "*.config.js",
        ],
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            react: reactPlugin,
            "react-hooks": hooksPlugin,
            "@next/next": nextPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs["jsx-runtime"].rules,
            ...hooksPlugin.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            "prettier/prettier": "error",
            "react/no-array-index-key": "error",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
        settings: {
            react: {
                version: "19.0.0",
            },
        },
    },
);
