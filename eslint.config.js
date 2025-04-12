import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
// import eslintPluginUnusedImports from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true, // Enable JSX
                },
            },
        },
        plugins: {
            "react-hooks": eslintPluginReactHooks,
            // "unused-imports": eslintPluginUnusedImports,
            // import: eslintPluginImport,
            // "unused-imports": eslintPluginUnusedImports,
        },
        rules: {
            ...eslintPluginReactHooks.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            // "unused-imports/no-unused-imports": "error",
            // "react-hooks/exhaustive-deps": "off",
            // "no-unused-vars": ["error"],
            // "no-unused-vars": ["error", { varsIgnorePattern: "React" }],
            // "react/no-unused-imports": "error",
            "no-unused-vars": ["error", { vars: "all", args: "none" }],
            // "import/no-unused-modules": ["error", { unusedExports: true }],
            // "import/no-unused-imports": "error", // Reports unused imports
            // "unused-imports/no-unused-imports": "error",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
];
