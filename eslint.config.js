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
  {
    ignores: ['dist', 'node_modules'],
  },

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },

  js.configs.recommended,

  {
    files: ['src/**/*.{js,jsx}'],

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
          extensions: ['.js', '.jsx'],
        },
      },
    },

    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      'import/no-unresolved': ['error', { ignore: ['^/'] }],

      'import/order': 'off',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^react-dom$'],

            ['^@?\\w'],

            ['^@/'],

            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

            ['^\\./(?!/?$)', '^\\./?$'],

            ['^.+\\.s?css$'],

            ['^.+\\.(png|jpe?g|svg|gif|webp)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'no-invalid-this': 'error',

      'prettier/prettier': 'error',
    },
  },
];
