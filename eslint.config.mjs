import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            "**/node_modules/",
            "**/dist/",
            "**/.prettierrc.js",
            "**/.eslintrc.js",
            "**/env.d.ts",
            "**/vite.config.ts",
            "**/node_modules/",
            "**/dist/",
            "**/.prettierrc.js",
            "**/.eslintrc.js",
            "**/env.d.ts",
        ],
    },
    ...fixupConfigRules(
        compat.extends(
            "eslint:recommended",
            "plugin:react/recommended",
            "eslint-config-prettier",
            "plugin:prettier/recommended",
        ),
    ),
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
                myCustomGlobal: "readonly",
            },
        },
        settings: {
            react: {
                version: "detect",
            },

            "import/resolver": {
                node: {
                    paths: ["src"],
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
        },

        rules: {
            "no-unused-vars": [
                2,
                {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: false,
                },
            ],

            "react/prop-types": 0,
            "react/react-in-jsx-scope": "off",

            "react/jsx-filename-extension": [
                1,
                {
                    extensions: [".js", ".jsx"],
                },
            ],
        },
    },
];
