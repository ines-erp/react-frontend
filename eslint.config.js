import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    {ignores: ['dist', '**.config.js']},
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {jsx: true},
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        linterOptions: {
            noInlineConfig: true
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            "array-callback-return": "error",
            "camelcase": "error",
            "no-async-promise-executor": "error",
            "no-await-in-loop":
                "warn",
            "no-console":
                "warn",
            "no-duplicate-imports": "error",
            "no-magic-numbers": "error",
            "no-nested-ternary": "error",
            "no-template-curly-in-string": "error",
            "no-unneeded-ternary": "error",
            "no-unreachable-loop": "error",
            "no-var": "error",
            "prefer-const": "error",
            "prefer-destructuring": ["error", {
                "array": false,
                "object": true
            }],
            "prefer-template": "error",
            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},
            ],
            'react/jsx-no-target-blank': 'off',

            "require-atomic-updates": "error",

            "require-await": "error",

            semi: "error",


            "sort-imports": ["error", {
                "allowSeparatedGroups": false,
                "ignoreCase": true,
                "ignoreDeclarationSort": false,
                "ignoreMemberSort": false,
                "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
            }],
            "sort-keys": ["error", "asc", {"caseSensitive": true, "natural": false, "minKeys": 2}]

        },
        settings: {react: {version: '18.3'}}
    },
]
;
