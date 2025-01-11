import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    {ignores: ['dist']},
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: {jsx: true},
                sourceType: 'module',
            },
        },
        settings: {react: {version: '18.3'}},
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
            'react/jsx-no-target-blank': 'off',
            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},
            ],
            semi: "error",
            "prefer-const": "error",
            "array-callback-return": "error",
            "no-async-promise-executor": "error",
            "no-duplicate-imports": "error",
            "no-template-curly-in-string": "error",
            "no-unreachable-loop": "error",
            "require-atomic-updates": "error",
            "camelcase": "error",
            "capitalized-comments": "error",
            "no-magic-numbers": "error",
            "no-nested-ternary": "error",
            "no-unneeded-ternary": "error",
            "no-var": "error",
            "prefer-template": "error",
            "require-await": "error",

            "prefer-destructuring": ["error", {
                "array": false,
                "object": true
            }],

            "sort-imports": ["error", {
                "ignoreCase": true,
                "ignoreDeclarationSort": false,
                "ignoreMemberSort": false,
                "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
                "allowSeparatedGroups": false
            }],

            "sort-keys": ["error", "asc", {"caseSensitive": true, "natural": false, "minKeys": 2}],


            "no-await-in-loop":
                "warning",
            "no-console":
                "warning"

        },
        linterOptions: {
            noInlineConfig: true
        }
    },
]
;
