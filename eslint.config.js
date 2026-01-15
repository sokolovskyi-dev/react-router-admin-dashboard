// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  // 1) Ignore build output + deps
  {
    ignores: ['dist', 'node_modules'],
  },

  // 2) Base JS rules
  js.configs.recommended,

  // 3) Main config for app source
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      },
    },

    rules: {
      // Recommended rule sets
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      // Import resolving (keep your ignore for absolute-like paths)
      'import/no-unresolved': ['error', { ignore: ['^/'] }],

      // Use simple-import-sort instead of import/order
      'import/order': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^react-dom$'], // React first
            ['^@?\\w'], // packages
            ['^@/'], // alias
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // parent
            ['^\\./(?!/?$)', '^\\./?$'], // same dir
            ['^.+\\.s?css$'], // styles
            ['^.+\\.(png|jpe?g|svg|gif|webp)$'], // assets
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Fast refresh warning is OK for component-only files
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // React 17+ JSX transform
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'no-invalid-this': 'error',

      // Prettier as lint rule
      'prettier/prettier': 'error',
    },
  },

  // 4) React Router route-modules export action/loader + component in one file.
  // Disable Fast Refresh rule only for routes.
  {
    files: ['src/routes/**/*.{js,jsx,ts,tsx}', 'src/app/routes/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
];
