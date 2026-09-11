import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Architecture Rules (Feature-Sliced Design)
 *
 * Dependency direction: shared → entities → features → widgets → pages → app/routes
 *
 * Read ARCHITECTURE.md for detailed rules and examples
 *
 * Key principles:
 * - entities CANNOT import from features/widgets/pages/app
 * - features CANNOT import from widgets/pages/app
 * - shared CANNOT import from any application layer
 * - Use index.ts for public API (barrel exports)
 * - Keep components small: if < 100 lines and used only in parent, keep in same file
 */

export default tseslint.config(
    { ignores: ['dist', 'src/routeTree.gen.ts'] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2023,
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'jsx-a11y': jsxA11y,
            'simple-import-sort': simpleImportSort,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
    prettier
);
